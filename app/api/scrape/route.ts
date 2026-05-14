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

    // Crawl homepage + key sub-pages in parallel
    const pagesToTry = [
      base,
      `${base}/about`,
      `${base}/about-us`,
      `${base}/services`,
      `${base}/products`,
      `${base}/faq`,
    ]

    const results = await Promise.allSettled(pagesToTry.map(fetchPage))

    const combinedText = results
      .filter((r): r is PromiseFulfilledResult<string> => r.status === 'fulfilled')
      .map(r => r.value)
      .join('\n\n---\n\n')
      .slice(0, 16000)

    if (!combinedText.trim()) {
      return NextResponse.json({ error: 'Could not fetch that website. Please check the URL.' }, { status: 422 })
    }

    const prompt = `You are an expert at understanding businesses and generating the exact search queries real customers type into AI engines like ChatGPT, Perplexity, Google, and Claude.

Website URL: ${base}
Combined page content (homepage, about, services, faq):
${combinedText}

Your job: deeply understand what this business does, who their customers are, and generate 15-20 highly specific, realistic search queries that potential customers would type to find this business or a business like it.

Return ONLY valid JSON with this exact structure:
{
  "businessName": "The exact brand/company name",
  "industry": "Exactly one of: Restaurant, Legal, Home Services, Health, Fitness, Real Estate, SaaS / Tech, E-commerce, Other",
  "location": "City and state if the business is local (e.g. 'Austin, TX'), or null for online businesses",
  "topics": [
    "...15-20 search queries here..."
  ]
}

Rules for generating topics (CRITICAL):
- Generate EXACTLY 15-20 queries. More is better as long as they are distinct and realistic.
- Each query must be 4-10 words, phrased as a natural search question or phrase
- Cover ALL of these intent categories (at least 2 queries per category):
  1. TRANSACTIONAL: 'best [service] near me', 'hire a [role] in [city]', '[service] cost'
  2. INFORMATIONAL: 'how to find a good [service]', 'what does [service] include', 'signs you need [service]'
  3. COMPARISON: 'best [service] options in [city]', '[type A] vs [type B]'
  4. PROBLEM-AWARE: describe the customer\'s problem, not the solution ('roof is leaking who to call', 'tooth pain no insurance dentist')
  5. BRAND-ADJACENT: queries about this type of business that a competitor might rank for
- If the business is local (has a city/state), include the location in at least 4 queries
- Queries must be specific to what THIS business actually does — not generic industry phrases
- Do NOT use marketing language, taglines, or brand names in the topics
- Do NOT repeat the same concept twice
- Return exactly the JSON object, nothing else`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      response_format: { type: 'json_object' },
      max_tokens: 1200,
    })

    const extracted = JSON.parse(completion.choices[0].message.content!)

    return NextResponse.json({
      businessName: extracted.businessName || null,
      industry:     extracted.industry     || null,
      location:     extracted.location     || null,
      topics:       Array.isArray(extracted.topics) ? extracted.topics.slice(0, 20) : [],
    })
  } catch (err) {
    console.error('Scrape error:', err)
    return NextResponse.json({ error: 'Failed to extract info from that page.' }, { status: 500 })
  }
}
