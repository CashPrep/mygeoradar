import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const FETCH_OPTS = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; MyGeoRadar/1.0; +https://mygeoradar.com)',
    'Accept': 'text/html,application/xhtml+xml,text/xml',
    'Accept-Language': 'en-US,en;q=0.9',
  },
}

/** Polyfill for matchAll — works on any TS target */
function matchAllCompat(str: string, pattern: RegExp): RegExpExecArray[] {
  const results: RegExpExecArray[] = []
  const re = new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g')
  let m: RegExpExecArray | null
  while ((m = re.exec(str)) !== null) results.push(m)
  return results
}

/** Extract only high-signal text: title, meta desc, headings, list items, paragraphs */
function extractSignal(html: string): string {
  const get = (pattern: RegExp) =>
    matchAllCompat(html, pattern)
      .map(m => (m[1] ?? m[0]).replace(/<[^>]+>/g, '').trim())
      .filter(Boolean)

  const title    = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ?? ''
  const metaDesc = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1]?.trim() ?? ''
  const h1s      = get(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)
  const h2s      = get(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)
  const h3s      = get(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)
  const lis      = get(/<li[^>]*>([\s\S]*?)<\/li>/gi).slice(0, 30)
  const ps       = get(/<p[^>]*>([\s\S]*?)<\/p>/gi).slice(0, 20)

  return [
    title       && `TITLE: ${title}`,
    metaDesc    && `META: ${metaDesc}`,
    h1s.length  && `H1: ${h1s.join(' | ')}`,
    h2s.length  && `H2: ${h2s.join(' | ')}`,
    h3s.length  && `H3: ${h3s.join(' | ')}`,
    lis.length  && `ITEMS: ${lis.join(' | ')}`,
    ps.length   && `BODY: ${ps.join(' ')}`,
  ].filter(Boolean).join('\n').slice(0, 2500)
}

/**
 * Attempt to fetch a URL and extract signal text.
 * Returns null on any failure or empty result.
 */
async function fetchSignal(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { ...FETCH_OPTS, signal: AbortSignal.timeout(7000) })
    if (!res.ok) return null
    const html = await res.text()
    if (html.length < 200) return null
    const signal = extractSignal(html)
    return signal.length > 80 ? signal : null
  } catch {
    return null
  }
}

/**
 * Fetch homepage HTML raw (no signal extraction) — last resort before domain-only fallback.
 * Returns the raw stripped text up to 2500 chars.
 */
async function fetchHomepageRaw(base: string): Promise<string | null> {
  try {
    const res = await fetch(base, { ...FETCH_OPTS, signal: AbortSignal.timeout(10000) })
    if (!res.ok) return null
    const html = await res.text()
    if (html.length < 100) return null
    // Strip all tags and collapse whitespace
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 2500)
    return text.length > 80 ? `RAW_TEXT: ${text}` : null
  } catch {
    return null
  }
}

/** Parse sitemap.xml and return up to 8 useful URLs */
async function getSitemapUrls(base: string): Promise<string[]> {
  try {
    const res = await fetch(`${base}/sitemap.xml`, { ...FETCH_OPTS, signal: AbortSignal.timeout(5000) })
    if (!res.ok) return []
    const xml  = await res.text()
    const urls = matchAllCompat(xml, /<loc>([^<]+)<\/loc>/g)
      .map(m => m[1].trim())
      .filter(u => !/\.(jpg|png|gif|pdf|webp|svg)/i.test(u))
      .filter(u => /(service|product|about|faq|offer|solution|feature|pricing|how|collection|category)/i.test(u))
    return urls.slice(0, 8)
  } catch {
    return []
  }
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    if (!url) return NextResponse.json({ error: 'URL required.' }, { status: 400 })

    const base = url.startsWith('http') ? url.replace(/\/$/, '') : `https://${url.replace(/\/$/, '')}`

    // Tier 1: priority pages (expanded to cover more site types)
    const priorityPages = [
      `${base}/services`,
      `${base}/products`,
      `${base}/solutions`,
      `${base}/offerings`,
      `${base}/collections/all`,      // Shopify
      `${base}/shop`,                  // WooCommerce / generic
      `${base}/menu`,                  // Restaurants
      `${base}/work`,                  // Agencies / portfolios
      base,
      `${base}/about`,
      `${base}/about-us`,
      `${base}/faq`,
      `${base}/pricing`,
    ]

    const priorityResults = await Promise.all(priorityPages.map(fetchSignal))
    let signals = priorityResults.filter((s): s is string => s !== null)

    // Tier 2: sitemap URLs
    if (signals.length < 2) {
      const sitemapUrls    = await getSitemapUrls(base)
      const sitemapResults = await Promise.all(sitemapUrls.map(fetchSignal))
      signals = [...signals, ...sitemapResults.filter((s): s is string => s !== null)]
    }

    // Tier 3: raw homepage text (catches SPAs that return minimal structured HTML)
    if (signals.length === 0) {
      const raw = await fetchHomepageRaw(base)
      if (raw) signals = [raw]
    }

    // Build the best available context string
    const context = signals.slice(0, 5).join('\n\n---\n\n')

    // Even if context is empty, extract domain name as a last-resort hint
    const domainHint = base.replace(/https?:\/\/(www\.)?/, '').split('/')[0]

    const prompt = `You are an expert business analyst. Analyze this website and generate realistic search queries customers use to find this type of business.

URL: ${base}
${
  context
    ? `Extracted content:\n${context}`
    : `No page content could be extracted. Use the domain name "${domainHint}" and your knowledge to infer the industry and generate realistic topics.`
}

Return ONLY this JSON:
{
  "businessName": "exact brand name from content, or best guess from domain if unavailable",
  "industry": "one of: Restaurant, Legal, Home Services, Health, Fitness, Real Estate, SaaS / Tech, E-commerce, Other",
  "location": "City, State if local — else null",
  "topics": ["30-40 search queries"]
}

Topic rules:
- 30-40 queries total, each 4-10 words
- Natural language a real customer types — no marketing speak, no brand names
- Cover: transactional (best X near me, hire X, X cost), informational (how to X, what does X include), comparison (top X in city, X vs Y), problem-aware (customer's pain not the solution), long-tail (emergency X city state), question-based (who is best X in city)
- If local, include location in 8+ queries
- Be specific to THIS business — not generic industry boilerplate
- No duplicate concepts
- CRITICAL: always return at least 20 topics even if content is sparse`

    const completion = await openai.chat.completions.create({
      model:           'gpt-4o',
      messages:        [{ role: 'user', content: prompt }],
      temperature:     0.2,
      response_format: { type: 'json_object' },
      max_tokens:      2200,
    })

    const extracted = JSON.parse(completion.choices[0].message.content!)
    const topics = Array.isArray(extracted.topics) ? extracted.topics.slice(0, 40) : []

    // Safety net: if GPT somehow returns 0 topics (shouldn\'t happen), generate generic ones
    if (topics.length === 0) {
      return NextResponse.json({
        businessName: extracted.businessName || domainHint,
        industry:     extracted.industry     || 'Other',
        location:     extracted.location     || null,
        topics: [
          `best ${domainHint} services`,
          `${domainHint} reviews`,
          `how to contact ${domainHint}`,
          `${domainHint} pricing`,
          `${domainHint} near me`,
          `top rated ${domainHint}`,
          `${domainHint} alternatives`,
          `is ${domainHint} legit`,
          `${domainHint} customer service`,
          `${domainHint} how it works`,
        ],
      })
    }

    return NextResponse.json({
      businessName: extracted.businessName || null,
      industry:     extracted.industry     || null,
      location:     extracted.location     || null,
      topics,
    })
  } catch (err) {
    console.error('Scrape error:', err)
    return NextResponse.json({ error: 'Failed to extract info from that page.' }, { status: 500 })
  }
}
