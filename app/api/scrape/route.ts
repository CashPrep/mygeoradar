import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

async function fetchPage(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; MyGeoRadar/1.0; +https://mygeoradar.com)',
      'Accept': 'text/html,application/xhtml+xml',
      'Accept-Language': 'en-US,en;q=0.9',
    },
    signal: AbortSignal.timeout(8000),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const html = await res.text()
  return stripHtml(html)
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    if (!url) return NextResponse.json({ error: 'URL required.' }, { status: 400 })

    const base = url.startsWith('http') ? url.replace(/\/$/, '') : `https://${url.replace(/\/$/, '')}`

    // Crawl homepage + /about + /services in parallel for maximum data
    const pagesToTry = [
      base,
      `${base}/about`,
      `${base}/about-us`,
      `${base}/services`,
    ]

    const results = await Promise.allSettled(pagesToTry.map(fetchPage))

    const combinedText = results
      .filter((r): r is PromiseFulfilledResult<string> => r.status === 'fulfilled')
      .map(r => r.value)
      .join('\n\n---\n\n')
      .slice(0, 12000) // ~3k tokens of clean text across all pages

    if (!combinedText.trim()) {
      return NextResponse.json({ error: 'Could not fetch that website. Please check the URL.' }, { status: 422 })
    }

    const prompt = `You are an expert at extracting precise business information from website content to power AI visibility scans.

Website URL: ${base}
Combined page text (homepage + about + services):
${combinedText}

Your task: extract the most accurate possible information and generate search topics that real customers would type into ChatGPT, Perplexity, or Google to find this exact business.

Return ONLY valid JSON with this exact structure:
{
  "businessName": "The exact brand name (string, or null if unclear)",
  "industry": "Exactly one of: Restaurant, Legal, Home Services, Health, Fitness, Real Estate, SaaS / Tech, E-commerce, Other",
  "location": "City and state/country if mentioned (e.g. 'Boston, MA'), or null",
  "topics": [
    "3-5 search queries (5-8 words each) that potential customers type into AI search engines to find this type of business"
  ]
}

Rules for topics (CRITICAL — this is the most important output):
- Topics must be natural language queries, NOT keywords or marketing copy
- Include location in 1-2 topics if the business is local (e.g. 'best dentist in Austin TX')
- Topics should reflect what the business ACTUALLY does, not generic industry phrases
- Good example: 'emergency plumber available 24 hours Boston'
- Bad example: 'plumbing services' (too short, not a real query)
- Vary the query intent: some informational ('how to find a good...'), some transactional ('best X near me'), some comparison ('X vs Y')
- If you cannot determine something confidently, use null
- Return exactly the JSON object, nothing else`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
      response_format: { type: 'json_object' },
      max_tokens: 600,
    })

    const extracted = JSON.parse(completion.choices[0].message.content!)

    return NextResponse.json({
      businessName: extracted.businessName || null,
      industry:     extracted.industry     || null,
      location:     extracted.location     || null,
      topics:       Array.isArray(extracted.topics) ? extracted.topics.slice(0, 5) : [],
    })
  } catch (err) {
    console.error('Scrape error:', err)
    return NextResponse.json({ error: 'Failed to extract info from that page.' }, { status: 500 })
  }
}
