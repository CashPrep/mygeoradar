import OpenAI from 'openai'
import type {
  SchemaCheck, SchemaCheckItem, SchemaType,
  ContentGapItem, GbpSignal, CompetitorGap, CompetitorDetail
} from './types'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const ENRICHMENT_TIMEOUT_MS = 52_000 // 52s — safely under Vercel’s 60s function limit

function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ])
}

// ─── Shared HTML helpers ──────────────────────────────────────────────────

async function fetchHtml(url: string): Promise<string> {
  const fullUrl = url.startsWith('http') ? url : `https://${url}`
  try {
    const res = await fetch(fullUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MyGeoRadar/1.0; +https://mygeoradar.com)' },
      signal: AbortSignal.timeout(8000),
    })
    return await res.text()
  } catch {
    return ''
  }
}

function extractJsonLd(html: string): object[] {
  const results: object[] = []
  const regex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1])
      if (Array.isArray(parsed)) results.push(...parsed)
      else results.push(parsed)
    } catch { /* skip malformed */ }
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
    if (Array.isArray(o['@graph'])) (o['@graph'] as unknown[]).forEach(walk)
    for (const v of Object.values(o)) {
      if (v && typeof v === 'object' && !Array.isArray(v)) walk(v)
    }
  }
  schemas.forEach(walk)
  return Array.from(new Set(types))
}

function hasType(presentTypes: string[], target: string): boolean {
  return presentTypes.some(t => t.toLowerCase().includes(target.toLowerCase()))
}

// ─── Schema Checker ───────────────────────────────────────────────────

const SCHEMA_MATRIX: Array<{ type: SchemaType; impact: 'high' | 'medium' | 'low'; note: string }> = [
  { type: 'LocalBusiness',  impact: 'high',   note: 'Critical for Gemini & ChatGPT local citations. Add LocalBusiness JSON-LD with name, address, phone, url, and opening hours.' },
  { type: 'FAQPage',        impact: 'high',   note: 'FAQPage schema lets AI engines surface your answers directly. Add a FAQ section with JSON-LD matching your top topics.' },
  { type: 'Review',         impact: 'high',   note: 'Review/AggregateRating schema strongly boosts Perplexity and ChatGPT citations. Embed review markup from Google or Yelp.' },
  { type: 'Organization',   impact: 'medium', note: 'Organization schema anchors your brand entity across engines. Include logo, sameAs links to social profiles and Wikipedia if available.' },
  { type: 'WebSite',        impact: 'medium', note: 'WebSite schema with a SearchAction enables sitelinks. Low effort, meaningful entity signal.' },
  { type: 'BreadcrumbList', impact: 'low',    note: 'BreadcrumbList aids site structure understanding. Add to inner pages for better entity mapping.' },
]

async function checkSchema(url: string): Promise<SchemaCheck> {
  const fullUrl = url.startsWith('http') ? url : `https://${url}`
  const html = await fetchHtml(fullUrl)
  const fetchedOk = html.length > 0
  const schemas   = extractJsonLd(html)
  const typesList = flattenTypes(schemas)

  const checked: SchemaCheckItem[] = SCHEMA_MATRIX.map(({ type, impact, note }) => ({
    type, impact, note,
    found: hasType(typesList, type),
  }))

  const highImpactTotal   = checked.filter(c => c.impact === 'high').length
  const highImpactPresent = checked.filter(c => c.impact === 'high' && c.found).length
  const score = fetchedOk
    ? Math.round((highImpactPresent / highImpactTotal) * 70 + (checked.filter(c => c.found).length / checked.length) * 30)
    : 0

  return { url: fullUrl, checked, score, fetchedOk }
}

// ─── GBP Signal ──────────────────────────────────────────────────────

async function inferGbpSignal(url: string, businessName: string): Promise<GbpSignal> {
  const html      = await fetchHtml(url)
  const schemas   = extractJsonLd(html)
  const typesList = flattenTypes(schemas)

  const hasLocalBusiness = hasType(typesList, 'LocalBusiness')
  const hasReviewSchema  = hasType(typesList, 'Review') || hasType(typesList, 'AggregateRating')
  const nameInSchema     = schemas.some(s => JSON.stringify(s).toLowerCase().includes(businessName.toLowerCase()))
  const nameInHtml       = html.toLowerCase().includes(businessName.toLowerCase())
  const hasNapConsistency = nameInSchema && nameInHtml

  const recommendations: string[] = []
  if (!hasLocalBusiness)  recommendations.push('Add LocalBusiness JSON-LD — Gemini heavily weights this for local search citations.')
  if (!hasReviewSchema)   recommendations.push('Embed AggregateRating schema — shows star ratings in AI engine responses and Google snippets.')
  if (!hasNapConsistency) recommendations.push('Ensure your business name in structured data exactly matches your Google Business Profile name.')
  if (recommendations.length === 0) recommendations.push('Your on-page GBP signals look solid. Focus on keeping your Google Business Profile updated with fresh posts and photos.')

  return { detected: hasLocalBusiness, hasReviewSchema, hasNapConsistency, recommendations }
}

// ─── Content Gap ──────────────────────────────────────────────────────

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
Topics they care about: ${topics.slice(0, 20).join(', ')}

Generate exactly 5 high-value questions that:
1. People are actively asking ChatGPT, Perplexity, Gemini, or Claude related to this business’s industry and location
2. The business website likely does NOT have a dedicated answer for
3. If answered well on their site, would directly improve their AI visibility score

Return ONLY valid JSON:
{
  "gaps": [
    {
      "question": "Specific question someone would ask an AI (natural language, 8-15 words)",
      "engine": "chatgpt",
      "missing": "One sentence: what type of content page or section would answer this"
    }
  ]
}`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', messages: [{ role: 'user', content: prompt }],
      temperature: 0.4, response_format: { type: 'json_object' }, max_tokens: 800,
    })
    const raw = JSON.parse(completion.choices[0].message.content!)
    return (raw.gaps ?? []).slice(0, 5) as ContentGapItem[]
  } catch { return [] }
}

// ─── Competitor Gap ─────────────────────────────────────────────────────

async function analyzeCompetitorGap(
  businessName: string,
  website: string,
  industry: string,
  topics: string[],
  location: string | null | undefined,
  yourScore: number,
  competitorUrl?: string | null  // customer-provided competitor — used as first entry if present
): Promise<CompetitorGap | null> {
  const locationStr = location ? ` in ${location}` : ''

  let competitorList: Array<{ name: string; domain: string }> = []

  // If the customer provided their own competitor URL, use it as the first entry.
  // We still ask GPT to identify one additional competitor for comparison richness.
  if (competitorUrl) {
    const cleanDomain = competitorUrl
      .replace(/https?:\/\/(www\.)?/, '')
      .split('/')[0]
      .toLowerCase()
    // Use the domain as a best-guess name — the analyze prompt will use real schema data anyway
    competitorList.push({ name: cleanDomain, domain: competitorUrl.startsWith('http') ? competitorUrl : `https://${cleanDomain}` })
  }

  // Ask GPT to fill remaining slots (1 if competitor provided, 2 if not)
  const slotsNeeded = competitorUrl ? 1 : 2
  const identifyPrompt = `You are a competitive research expert.

Business: ${businessName} (${website})${locationStr}
Industry: ${industry || 'General'}
Topics: ${topics.slice(0, 15).join(', ')}
${
  competitorUrl
    ? `The customer has already identified one competitor (${competitorUrl}). Identify ${slotsNeeded} additional direct competitor(s) that are DIFFERENT from that one.`
    : `Identify exactly ${slotsNeeded} realistic direct competitors for this business.`
}

These should be:
- Actual businesses that exist and compete for the same customers
- Have a real website you can name confidently
- Be in the same geographic market if location is specified

Return ONLY valid JSON:
{
  "competitors": [
    { "name": "Competitor Business Name", "domain": "competitordomain.com" }
  ]
}`

  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-4o', messages: [{ role: 'user', content: identifyPrompt }],
      temperature: 0.1, response_format: { type: 'json_object' }, max_tokens: 200,
    })
    const raw = JSON.parse(res.choices[0].message.content!)
    const gptuggested = (raw.competitors ?? []).slice(0, slotsNeeded) as Array<{ name: string; domain: string }>
    competitorList = [...competitorList, ...gptuggested]
  } catch { /* proceed with what we have */ }

  if (!competitorList.length) return null

  // Fetch schema data for all competitors in parallel
  const competitorData = await Promise.all(
    competitorList.slice(0, 2).map(async (c) => {
      const html      = await fetchHtml(c.domain)
      const schemas   = extractJsonLd(html)
      const typesList = flattenTypes(schemas)
      return { ...c, schemaTypes: typesList, fetchedOk: html.length > 0 }
    })
  )

  const analyzePrompt = `You are a GEO analyst comparing a business against its competitors for AI search visibility.

Business: ${businessName} | ${website}${locationStr} | Industry: ${industry || 'General'}
Current AI visibility score: ${yourScore}/100

Competitors:
${competitorData.map((c, i) => `${i + 1}. ${c.name} (${c.domain}) — Schema: ${c.schemaTypes.length > 0 ? c.schemaTypes.join(', ') : 'none'} — Reachable: ${c.fetchedOk}`).join('\n')}

For each competitor estimate their AI visibility score and list 2–3 specific advantages.
Provide 3 specific closing moves our business can implement.

Return ONLY valid JSON:
{
  "competitors": [
    { "name": "name", "domain": "domain.com", "estimatedScore": 65, "schemaTypes": [], "advantages": ["adv1", "adv2"] }
  ],
  "closingMoves": ["move1", "move2", "move3"],
  "summary": "1-2 sentence narrative."
}`

  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-4o', messages: [{ role: 'user', content: analyzePrompt }],
      temperature: 0.1, response_format: { type: 'json_object' }, max_tokens: 800,
    })
    const raw = JSON.parse(res.choices[0].message.content!) as {
      competitors: CompetitorDetail[]
      closingMoves: string[]
      summary: string
    }
    return {
      yourScore,
      competitors:  raw.competitors  ?? [],
      closingMoves: raw.closingMoves ?? [],
      summary:      raw.summary      ?? '',
    }
  } catch { return null }
}

// ─── Main export ──────────────────────────────────────────────────────────

export async function runEnrichments(scan: {
  business_name:  string
  website:        string
  industry?:      string | null
  topics:         string[]
  location?:      string | null
  overall_score?: number
  competitor_url?: string | null  // passed from process/route.ts
}): Promise<{
  schemaCheck:   SchemaCheck
  contentGaps:   ContentGapItem[]
  gbpSignal:     GbpSignal
  competitorGap: CompetitorGap | null
}> {
  const fallbackSchema: SchemaCheck = { url: scan.website, checked: [], score: 0, fetchedOk: false }
  const fallbackGbp: GbpSignal = { detected: false, hasReviewSchema: false, hasNapConsistency: false, recommendations: [] }

  const [schemaCheck, contentGaps, gbpSignal, competitorGap] = await Promise.all([
    withTimeout(checkSchema(scan.website), ENRICHMENT_TIMEOUT_MS, fallbackSchema),
    withTimeout(generateContentGaps(scan.business_name, scan.website, scan.industry ?? 'General', scan.topics, scan.location), ENRICHMENT_TIMEOUT_MS, []),
    withTimeout(inferGbpSignal(scan.website, scan.business_name), ENRICHMENT_TIMEOUT_MS, fallbackGbp),
    withTimeout(
      analyzeCompetitorGap(
        scan.business_name,
        scan.website,
        scan.industry ?? 'General',
        scan.topics,
        scan.location,
        scan.overall_score ?? 0,
        scan.competitor_url,  // ← pass customer’s competitor through
      ),
      ENRICHMENT_TIMEOUT_MS,
      null
    ),
  ])

  return { schemaCheck, contentGaps, gbpSignal, competitorGap }
}
