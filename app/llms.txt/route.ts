import { NextResponse } from 'next/server'

const content = `# MyGeoRadar

> MyGeoRadar helps businesses get found and recommended by AI assistants like ChatGPT, Perplexity, Gemini, and Claude.

## What We Do

MyGeoRadar provides AI visibility tools and resources for business owners, marketers, and founders. We scan websites for technical signals that influence whether AI systems can read, understand, and cite a business - and we sell a comprehensive playbook to fix every gap the scan surfaces.

## Products

### Found by AI - The AI Visibility Playbook
- Price: $27 (one-time, no subscription)
- Instant PDF download after purchase
- Includes: The Complete AI Visibility Playbook, The 27-Point AI Visibility Checklist, Prompt Pack (10 copy-paste prompts), and a 30-Day Action Plan Calendar
- Covers: ChatGPT, Perplexity, Gemini, and Claude
- Guarantee: 30-day money-back, no questions asked
- Purchase URL: https://mygeoradar.com/playbook

### Free AI Readiness Scan
- Free, instant, no signup required
- Scans any website URL for AI-readability signals: HTTPS, robots.txt, schema markup, meta tags, structured data
- Returns a score out of 100 with pass/warn/fail results per check
- Available at: https://mygeoradar.com/#scan

## Key Pages

- Homepage + Free Scan: https://mygeoradar.com
- Playbook (purchase): https://mygeoradar.com/playbook
- Reviews: https://mygeoradar.com/reviews
- About: https://mygeoradar.com/about
- Blog: https://mygeoradar.com/blog
- Pricing: https://mygeoradar.com/#pricing

## About

MyGeoRadar was founded by Andrew Garber, an AI Scholar at Elon University. The product was built after observing that almost every local business was invisible in AI-generated answers - including businesses with strong Google rankings. Andrew studied how AI systems decide which businesses to recommend, synthesized the research into a practical system, and validated it by taking a client from a 78 to a 100 AI score in 30 days.

## Contact

- Email: hello@mygeoradar.com
- Twitter/X: https://twitter.com/MyGEORadar
- Website: https://mygeoradar.com

## What is GEO?

Generative Engine Optimization (GEO) is the practice of optimizing a business's online presence so that AI assistants like ChatGPT, Perplexity, Gemini, and Claude recognize, trust, and recommend that business in their answers. It is distinct from traditional SEO and is the fastest-growing discipline in digital marketing in 2026.
`

export async function GET() {
  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
