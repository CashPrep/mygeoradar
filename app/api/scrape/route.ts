import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

function stripHtml(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .slice(0, 6000)
    .trim()
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    if (!url) return NextResponse.json({ error: 'URL required.' }, { status: 400 })

    // Normalise URL
    const fullUrl = url.startsWith('http') ? url : `https://${url}`

    let pageText = ''
    try {
      const res = await fetch(fullUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MyGeoRadar/1.0)' },
        signal: AbortSignal.timeout(8000),
      })
      const html = await res.text()
      pageText = stripHtml(html)
    } catch {
      return NextResponse.json({ error: 'Could not fetch that URL. Please check it and try again.' }, { status: 422 })
    }

    const prompt = `You are extracting business information from a website's text content.

Website URL: ${fullUrl}
Page text (truncated):
${pageText}

Extract the following and return ONLY valid JSON, no explanation:
{
  "businessName": "The business name (string, or null if unclear)",
  "industry": "One of: Restaurant, Law Firm, Real Estate, Medical / Dental, Home Services, Fitness / Wellness, E-commerce, SaaS / Tech, Other (pick the closest match)",
  "location": "City and state/country if found (e.g. 'Boston, MA'), or null",
  "topics": ["3-5 short search phrases (3-7 words each) that people would type into Google or ChatGPT to find this business. Be specific to this business type and location."]
}

Rules:
- businessName should be the actual brand name, not a tagline
- topics must be realistic search queries, not marketing copy
- If you cannot determine something confidently, use null
- Return exactly the JSON object above, nothing else`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
      response_format: { type: 'json_object' },
      max_tokens: 500,
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
