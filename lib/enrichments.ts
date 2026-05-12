import OpenAI from 'openai'
import type { SchemaCheck, SchemaCheckItem, SchemaType, ContentGapItem, GbpSignal } from './types'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// ─── Schema Checker ──────────────────────────────────────────────────────────

const SCHEMA_MATRIX: Array<{ type: SchemaType; impact: 'high' | 'medium' | 'low'; note: string }> = [
  { type: 'LocalBusiness',   impact: 'high',   note: 'Critical for Gemini & ChatGPT local citations. Add LocalBusiness JSON-LD with name, address, phone, url, and opening hours.' },
  { type: 'FAQPage',         impact: 'high',   note: 'FAQPage schema lets AI engines surface your answers directly. Add a FAQ section with JSON-LD matching your top topics.' },
  { type: 'Review',          impact: 'high',   note: 'Review/AggregateRating schema strongly boosts Perplexity and ChatGPT citations. Embed review markup from Google or Yelp.' },
  { type: 'Organization',    impact: 'medium', note: 'Organization schema anchors your brand entity across engines. Include logo, sameAs links to social profiles and Wikipedia if available.' },
  { type: 'WebSite',         impact: 'medium', note: 'WebSite schema with a SearchAction enables sitelinks. Low effort, meaningful entity signal.' },
  { type: 'BreadcrumbList',  impact: 'low',    note: 'BreadcrumbList aids site structure understanding. Add to inner pages for better entity mapping.' },
]

function extractJsonLd(html: string): object[] {
  const results: object[] = []
  const regex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1])
      if (Array.isArray(parsed)) results.push(...parsed)
      else results.push(parsed)
    } catch { /* malformed JSON-LD, skip */ }
  }
  return results
}

function flattenTypes(schemas: object[]): string[] {
  const types: string[] = []
  function walk(obj: unknown) {
    if (!obj || typeof obj !== 'object') return
    const o = obj as Record<string, unknown>
    if (typeof o['@type'] === 'string') types.push(o['@type'])
    if (Array.isArray(o['@type'])) types.push(...(o['@type'] as string[]))
    // Walk @graph array
    if (Array.isArray(o['@graph'])) (o['@graph'] as unknown[]).forEach(walk)
    // Walk nested objects
    for (const v of Object.values(o)) {
      if (v && typeof v === 'object' && !Array.isArray(v)) walk(v)
    }
  }
  schemas.forEach(walk)
  return types
}

function hasType(presentTypes: string[], target: string): boolean {
  return presentTypes.some(t => t.toLowerCase().includes(target.toLowerCase()))
}

async function checkSchema(url: string): Promise<SchemaCheck> {
  const fullUrl = url.startsWith('http') ? url : `https://${url}`
  let html = ''
  let fetchedOk = false

  try {
    const res = await fetch(fullUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MyGeoRadar/1.0; +https://mygeoradar.com)' },
      signal:  AbortSignal.timeout(10000),
    })
    html = await res.text()
    fetchedOk = true
  } catch { /* site unreachable */ }

  const schemas    = extractJsonLd(html)
  const typesList  = flattenTypes(schemas)

  const checked: SchemaCheckItem[] = SCHEMA_MATRIX.map(({ type, impact, note }) => ({
    type,
    found:  hasType(typesList, type),
    impact,
    note,
  }))

  const highImpactTotal   = checked.filter(c => c.impact === 'high').length
  const highImpactPresent = checked.filter(c => c.impact === 'high' && c.found).length
  const score = fetchedOk
    ? Math.round((highImpactPresent / highImpactTotal) * 70 + (checked.filter(c => c.found).length / checked.length) * 30)
    : 0

  return { url: fullUrl, checked, score, fetchedOk }
}

// ─── GBP Signal ──────────────────────────────────────────────────────────────

async function inferGbpSignal(url: string, businessName: string): Promise<GbpSignal> {
  const fullUrl = url.startsWith('http') ? url : `https://${url}`
  let html = ''

  try {
    const res = await fetch(fullUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MyGeoRadar/1.0)' },
      signal:  AbortSignal.timeout(10000),
    })
    html = await res.text()
  } catch { /* unreachable */ }

  const schemas = extractJsonLd(html)
  const typesList = flattenTypes(schemas)

  const hasLocalBusiness = hasType(typesList, 'LocalBusiness')
  const hasReviewSchema  = hasType(typesList, 'Review') || hasType(typesList, 'AggregateRating')

  // NAP consistency: check if business name appears in JSON-LD AND in visible text
  const nameInSchema = schemas.some(s => JSON.stringify(s).toLowerCase().includes(businessName.toLowerCase()))
  const nameInHtml   = html.toLowerCase().includes(businessName.toLowerCase())
  const hasNapConsistency = nameInSchema && nameInHtml

  const recommendations: string[] = []
  if (!hasLocalBusiness)  recommendations.push('Add LocalBusiness JSON-LD — Gemini heavily weights this for local search citations.')
  if (!hasReviewSchema)   recommendations.push('Embed AggregateRating schema — shows star ratings in AI engine responses and Google snippets.')
  if (!hasNapConsistency) recommendations.push('Ensure your business name in structured data exactly matches your Google Business Profile name.')
  if (recommendations.length === 0) recommendations.push('Your on-page GBP signals look solid. Focus on keeping your Google Business Profile updated with fresh posts and photos.')

  return {
    detected:          hasLocalBusiness,
    hasReviewSchema,
    hasNapConsistency,
    recommendations,
  }
}

// ─── Content Gap ─────────────────────────────────────────────────────────────

async function generateContentGaps(
  businessName: string,
  website: string,
  industry: string,
  topics: string[],
  location?: string | null
): Promise<ContentGapItem[]> {
  const locationStr = location ? ` in ${location}` : ''
  const prompt = `You are a GEO content strategist. A business needs to know what questions AI engines are currently answering about their industry that their website does NOT adequately cover.

Business: ${businessName} (${website})${locationStr}
Industry: ${industry || 'General'}
Topics they care about: ${topics.join(', ')}

Generate exactly 5 high-value questions that:
1. People are actively asking ChatGPT, Perplexity, Gemini, or Claude related to this business\'s industry and location
2. The business website likely does NOT have a dedicated answer for (based on typical sites in this industry)
3. If answered well on their site, would directly improve their AI visibility score

Return ONLY valid JSON:
{
  "gaps": [
    {
      "question": "Specific question someone would ask an AI (natural language, 8-15 words)",
      "engine": "chatgpt" | "perplexity" | "gemini" | "claude",
      "missing": "One sentence: what type of content page or section would answer this (e.g. \'A dedicated FAQ page about insurance coverage for dental implants\')"
    }
  ]
}`

  try {
    const completion = await openai.chat.completions.create({
      model:           'gpt-4o-mini',
      messages:        [{ role: 'user', content: prompt }],
      temperature:     0.4,
      response_format: { type: 'json_object' },
      max_tokens:      800,
    })
    const raw = JSON.parse(completion.choices[0].message.content!)
    return (raw.gaps ?? []).slice(0, 5) as ContentGapItem[]
  } catch {
    return []
  }
}

// ─── Main export ─────────────────────────────────────────────────────────────

export async function runEnrichments(scan: {
  business_name: string
  website:       string
  industry?:     string | null
  topics:        string[]
  location?:     string | null
}): Promise<{
  schemaCheck: SchemaCheck
  contentGaps: ContentGapItem[]
  gbpSignal:   GbpSignal
}> {
  // All three run in parallel — none blocks the others
  const [schemaCheck, contentGaps, gbpSignal] = await Promise.all([
    checkSchema(scan.website),
    generateContentGaps(scan.business_name, scan.website, scan.industry ?? 'General', scan.topics, scan.location),
    inferGbpSignal(scan.website, scan.business_name),
  ])

  return { schemaCheck, contentGaps, gbpSignal }
}
