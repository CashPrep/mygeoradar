import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// ─── In-memory IP rate limiter ────────────────────────────────────────────────
// Max 5 requests per IP per hour. Resets on next request after the window.
// This works fine on Vercel (single warm instance handles burst). If you ever
// move to multi-region edge, swap this for Upstash Redis.

const ipMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT   = 5
const WINDOW_MS    = 60 * 60 * 1000 // 1 hour

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now    = Date.now()
  const record = ipMap.get(ip)

  if (!record || now > record.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, remaining: RATE_LIMIT - 1 }
  }

  if (record.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 }
  }

  record.count += 1
  return { allowed: true, remaining: RATE_LIMIT - record.count }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const FETCH_OPTS = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; MyGeoRadar/1.0; +https://mygeoradar.com)',
    'Accept': 'text/html,application/xhtml+xml,text/xml',
    'Accept-Language': 'en-US,en;q=0.9',
  },
}

function matchAllCompat(str: string, pattern: RegExp): RegExpExecArray[] {
  const results: RegExpExecArray[] = []
  const re = new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g')
  let m: RegExpExecArray | null
  while ((m = re.exec(str)) !== null) results.push(m)
  return results
}

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

async function fetchHomepageRaw(base: string): Promise<string | null> {
  try {
    const res = await fetch(base, { ...FETCH_OPTS, signal: AbortSignal.timeout(10000) })
    if (!res.ok) return null
    const html = await res.text()
    if (html.length < 100) return null
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

// ─── Route ────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // IP rate limiting — protect GPT-4o spend
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  const { allowed, remaining } = checkRateLimit(ip)

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in an hour.' },
      {
        status: 429,
        headers: {
          'Retry-After':          '3600',
          'X-RateLimit-Limit':    String(RATE_LIMIT),
          'X-RateLimit-Remaining':'0',
        },
      }
    )
  }

  try {
    const { url } = await req.json()
    if (!url) return NextResponse.json({ error: 'URL required.' }, { status: 400 })

    const base = url.startsWith('http') ? url.replace(/\/$/, '') : `https://${url.replace(/\/$/, '')}`

    const priorityPages = [
      `${base}/services`,
      `${base}/products`,
      `${base}/solutions`,
      `${base}/offerings`,
      `${base}/collections/all`,
      `${base}/shop`,
      `${base}/menu`,
      `${base}/work`,
      base,
      `${base}/about`,
      `${base}/about-us`,
      `${base}/faq`,
      `${base}/pricing`,
    ]

    const priorityResults = await Promise.all(priorityPages.map(fetchSignal))
    let signals = priorityResults.filter((s): s is string => s !== null)

    if (signals.length < 2) {
      const sitemapUrls    = await getSitemapUrls(base)
      const sitemapResults = await Promise.all(sitemapUrls.map(fetchSignal))
      signals = [...signals, ...sitemapResults.filter((s): s is string => s !== null)]
    }

    if (signals.length === 0) {
      const raw = await fetchHomepageRaw(base)
      if (raw) signals = [raw]
    }

    const context    = signals.slice(0, 5).join('\n\n---\n\n')
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

    if (topics.length === 0) {
      return NextResponse.json(
        {
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
        },
        { headers: { 'X-RateLimit-Remaining': String(remaining) } }
      )
    }

    return NextResponse.json(
      {
        businessName: extracted.businessName || null,
        industry:     extracted.industry     || null,
        location:     extracted.location     || null,
        topics,
      },
      { headers: { 'X-RateLimit-Remaining': String(remaining) } }
    )
  } catch (err) {
    console.error('Scrape error:', err)
    return NextResponse.json({ error: 'Failed to extract info from that page.' }, { status: 500 })
  }
}
