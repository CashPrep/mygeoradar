/**
 * /api/snapshot — Free score preview
 *
 * Runs the EXACT same scrape → score pipeline as the paid scan.
 * Returns only: score, level, headline, 3 teaser issues.
 * The paid report unlocks: per-engine breakdown, all topics, actions,
 * content gaps, schema check, competitor analysis, GBP signals.
 *
 * This means the free score is always honest and always matches
 * what the customer will see after paying.
 *
 * Zero web presence: if the site has no scrapeable content AND scores
 * below the "no presence" threshold, we return known=false so the
 * frontend redirects to the $9.99 Web Presence Starter Guide.
 */
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { supabase } from '@/lib/supabase'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const SNAPSHOT_MAX_TOPICS = 15
const MAX_PER_DAY = 3

const ZERO_PRESENCE_SCORE_THRESHOLD = 15

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

async function checkRateLimit(ip: string): Promise<boolean> {
  if (ip === 'unknown') return true
  const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const { count, error } = await supabase
    .from('snapshot_rate_limits')
    .select('*', { count: 'exact', head: true })
    .eq('ip_address', ip)
    .gte('created_at', dayAgo)
  if (error) return true
  if ((count ?? 0) >= MAX_PER_DAY) return false
  try { await supabase.from('snapshot_rate_limits').insert({ ip_address: ip }) } catch {}
  return true
}

const FETCH_OPTS = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; MyGeoRadar/1.0; +https://mygeoradar.com)',
    'Accept': 'text/html,application/xhtml+xml',
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
  const get = (pat: RegExp) =>
    matchAllCompat(html, pat).map(m => (m[1] ?? '').replace(/<[^>]+>/g, '').trim()).filter(Boolean)
  const title    = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ?? ''
  const metaDesc = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1]?.trim() ?? ''
  const h1s = get(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)
  const h2s = get(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)
  const ps  = get(/<p[^>]*>([\s\S]*?)<\/p>/gi).slice(0, 15)
  return [title && `TITLE: ${title}`, metaDesc && `META: ${metaDesc}`,
    h1s.length && `H1: ${h1s.join(' | ')}`,
    h2s.length && `H2: ${h2s.join(' | ')}`,
    ps.length  && `BODY: ${ps.join(' ')}`,
  ].filter(Boolean).join('\n').slice(0, 2000)
}

async function fetchSignal(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { ...FETCH_OPTS, signal: AbortSignal.timeout(6000) })
    if (!res.ok) return null
    const html = await res.text()
    const signal = extractSignal(html)
    return signal.length > 80 ? signal : null
  } catch { return null }
}

async function scrapeTopics(
  base: string,
  businessName: string
): Promise<{ topics: string[]; industry: string | null; location: string | null; hasContent: boolean }> {
  const pages = [base, `${base}/services`, `${base}/about`, `${base}/products`, `${base}/shop`]
  const results = await Promise.all(pages.map(fetchSignal))
  const signals = results.filter((s): s is string => s !== null)

  let rawFallbackUsed = false
  if (signals.length === 0) {
    try {
      const res = await fetch(base, { ...FETCH_OPTS, signal: AbortSignal.timeout(9000) })
      if (res.ok) {
        const html = await res.text()
        const raw = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 2000)
        if (raw.length > 80) {
          signals.push(`RAW: ${raw}`)
          rawFallbackUsed = true
        }
      }
    } catch { /* silent */ }
  }

  const hasContent = signals.length > 0 && !rawFallbackUsed
  const domainHint = base.replace(/https?:\/\/(www\.)?/, '').split('/')[0]
  const context = signals.slice(0, 3).join('\n\n---\n\n')

  const prompt = `Analyze this website and generate the most realistic search queries customers use.
URL: ${base}\nBusiness: ${businessName}
${
  context
    ? `Content:\n${context}`
    : `No content could be fetched. Infer from domain: "${domainHint}".`
}

Return ONLY JSON:
{
  "industry": "one of: Restaurant, Legal, Home Services, Health, Fitness, Real Estate, SaaS / Tech, E-commerce, Other",
  "location": "City, State or null",
  "topics": ["15-20 natural-language customer search queries, 4-10 words each"]
}

Rules: be specific to THIS business, cover transactional + informational + local queries, always return at least 10 topics.`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      response_format: { type: 'json_object' },
      max_tokens: 1200,
    })
    const raw = JSON.parse(completion.choices[0].message.content!)
    const topics = Array.isArray(raw.topics) ? raw.topics.slice(0, SNAPSHOT_MAX_TOPICS) : []
    return {
      topics:   topics.length > 0 ? topics : [`best ${domainHint} services`, `${domainHint} reviews`, `${domainHint} near me`],
      industry: raw.industry || null,
      location: raw.location || null,
      hasContent,
    }
  } catch {
    return { topics: [`best ${domainHint} services`, `${domainHint} reviews`, `${domainHint} near me`], industry: null, location: null, hasContent: false }
  }
}

async function scoreTopics(
  businessName: string,
  website: string,
  topics: string[],
  industry: string | null,
  location: string | null,
): Promise<{ overallScore: number; topIssues: string[] }> {
  const locationStr = location ? ` in ${location}` : ''
  const prompt = `You are a senior GEO analyst. Score each topic 0–100 per AI engine for realistic citation probability.

Business: ${businessName} | ${website}${locationStr} | Industry: ${industry || 'Not specified'}
Topics: ${topics.join(', ')}

Engine behaviour:
- ChatGPT: training data + browsing, favours well-known brands, schema, reviews
- Perplexity: real-time retrieval, favours fresh content and active sites
- Gemini: Google ecosystem, weights GBP, Google reviews, local pack
- Claude: training data only, favours editorial/authoritative content

Also return 3 specific issues that are the BIGGEST reasons this business scores low across AI engines. These must be:
- Concrete and actionable (not generic)
- Based on the actual business/industry
- Honest — tell them what's really missing

Return ONLY valid JSON:
{
  "engines": [
    {
      "engine": "chatgpt",
      "overallScore": 42,
      "topics": [
        { "topic": "exact topic", "score": 35 }
      ]
    }
  ],
  "topIssues": [
    "Specific issue 1",
    "Specific issue 2",
    "Specific issue 3"
  ]
}

Rules:
- engines: exactly 4, in order: chatgpt, perplexity, gemini, claude
- All scores integers 0–100
- Most small/local businesses score 20–50 — be realistic
- topIssues: exactly 3 strings, specific to this business`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.1,
    response_format: { type: 'json_object' },
    max_tokens: 2000,
  })

  const raw = JSON.parse(completion.choices[0].message.content!)
  const engines: Array<{ overallScore: number; topics: Array<{ score: number }> }> = raw.engines ?? []

  let overallScore = 0
  if (engines.length > 0) {
    const engineAvgs = engines.map(e => {
      if (e.topics?.length) {
        return e.topics.reduce((s, t) => s + (t.score ?? 0), 0) / e.topics.length
      }
      return e.overallScore ?? 0
    })
    overallScore = Math.round(engineAvgs.reduce((s, a) => s + a, 0) / engineAvgs.length)
  }
  overallScore = Math.min(100, Math.max(0, overallScore))

  const topIssues = (raw.topIssues ?? []).slice(0, 3) as string[]

  return { overallScore, topIssues }
}

export async function POST(req: NextRequest) {
  try {
    const { businessName, website, email } = await req.json()

    if (!businessName?.trim() || !website?.trim()) {
      return NextResponse.json(
        { error: 'Business name and website are required.' },
        { status: 400 }
      )
    }

    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { error: 'A valid email address is required to get your free score.' },
        { status: 400 }
      )
    }

    const ip      = getClientIp(req)
    const allowed = await checkRateLimit(ip)
    if (!allowed) {
      return NextResponse.json(
        { error: "You've used your 3 free snapshots today. Come back tomorrow or run a full scan." },
        { status: 429 }
      )
    }

    // Save email lead to Supabase (non-blocking — never fail the scan over this)
    try {
      await supabase.from('email_leads').upsert(
        { email: email.trim().toLowerCase(), business_name: businessName.trim(), website: website.trim(), source: 'free_snapshot' },
        { onConflict: 'email', ignoreDuplicates: false }
      )
    } catch { /* silent — never block the scan */ }

    const cleanWebsite = website.trim().startsWith('http')
      ? website.trim().replace(/\/$/, '')
      : `https://${website.trim().replace(/\/$/, '')}`

    const { topics, industry, location, hasContent } = await scrapeTopics(cleanWebsite, businessName.trim())

    const { overallScore, topIssues } = await scoreTopics(
      businessName.trim(),
      cleanWebsite,
      topics,
      industry,
      location,
    )

    if (!hasContent && overallScore < ZERO_PRESENCE_SCORE_THRESHOLD) {
      return NextResponse.json({
        known:        false,
        score:        overallScore,
        businessName: businessName.trim(),
        website:      cleanWebsite.replace(/^https?:\/\//, '').replace(/\/$/, ''),
      })
    }

    const level =
      overallScore >= 80 ? 'excellent' :
      overallScore >= 60 ? 'good' :
      overallScore >= 40 ? 'weak' : 'poor'

    const headlines: Record<string, string> = {
      excellent: 'Strong AI visibility — a few refinements away from dominance.',
      good:      'Decent AI presence, but key gaps are costing you customers.',
      weak:      'AI engines are largely skipping your business right now.',
      poor:      'Your business is nearly invisible to AI search engines.',
    }

    return NextResponse.json({
      score:        overallScore,
      level,
      headline:     headlines[level],
      topIssues,
      businessName: businessName.trim(),
      website:      cleanWebsite.replace(/^https?:\/\//, '').replace(/\/$/, ''),
      industry,
      location,
      known:        true,
    })
  } catch (err) {
    console.error('[snapshot] error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
