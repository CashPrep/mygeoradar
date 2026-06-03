import { NextResponse } from 'next/server'

const INDUSTRIES = [
  { slug: 'dentists', label: 'Dentists' },
  { slug: 'plumbers', label: 'Plumbers' },
  { slug: 'lawyers', label: 'Lawyers' },
  { slug: 'restaurants', label: 'Restaurants' },
  { slug: 'med-spas', label: 'Med Spas' },
  { slug: 'chiropractors', label: 'Chiropractors' },
  { slug: 'contractors', label: 'Contractors' },
  { slug: 'real-estate-agents', label: 'Real Estate Agents' },
]

const CITIES = [
  { slug: 'new-york', label: 'New York' },
  { slug: 'los-angeles', label: 'Los Angeles' },
  { slug: 'chicago', label: 'Chicago' },
  { slug: 'houston', label: 'Houston' },
  { slug: 'phoenix', label: 'Phoenix' },
  { slug: 'philadelphia', label: 'Philadelphia' },
  { slug: 'san-antonio', label: 'San Antonio' },
  { slug: 'san-diego', label: 'San Diego' },
  { slug: 'dallas', label: 'Dallas' },
  { slug: 'miami', label: 'Miami' },
  { slug: 'austin', label: 'Austin' },
  { slug: 'seattle', label: 'Seattle' },
  { slug: 'denver', label: 'Denver' },
  { slug: 'boston', label: 'Boston' },
  { slug: 'atlanta', label: 'Atlanta' },
  { slug: 'nashville', label: 'Nashville' },
  { slug: 'portland', label: 'Portland' },
  { slug: 'las-vegas', label: 'Las Vegas' },
  { slug: 'charlotte', label: 'Charlotte' },
  { slug: 'minneapolis', label: 'Minneapolis' },
]

const BASE = 'https://mygeoradar.com'

const industryHubLinks = INDUSTRIES.map(
  (i) => `- ${i.label}: ${BASE}/${i.slug}`
).join('\n')

const cityHubLinks = CITIES.map(
  (c) => `- ${c.label}: ${BASE}/locations/${c.slug}`
).join('\n')

// Representative sample of industry×city pages (not all 160)
const sampleCityIndustryLinks = [
  'dentists/chicago', 'plumbers/houston', 'lawyers/new-york',
  'restaurants/miami', 'med-spas/los-angeles', 'chiropractors/dallas',
  'contractors/austin', 'real-estate-agents/boston',
].map((p) => `- ${BASE}/${p}`).join('\n')

const content = `# MyGeoRadar

> MyGeoRadar helps local businesses get found on Google, in directories, and recommended by AI assistants like ChatGPT, Perplexity, Gemini, and Claude.

## What We Do

MyGeoRadar provides a free business visibility scanner and targeted fix guides for local business owners. We check four visibility layers that determine whether a business appears in local search results and AI-generated recommendations:

1. Google Business Profile — completeness, verification, categories
2. Directory Citations — NAP consistency across Yelp, Apple Maps, Bing, and 40+ directories
3. Schema Markup — LocalBusiness structured data on the business website
4. AI Search Visibility — signals that influence ChatGPT, Perplexity, and Gemini recommendations

## Products

### Free Business Visibility Scan
- Free, instant, no signup required
- Paste any business URL and get a scored breakdown across all four visibility layers
- Returns specific findings per layer — not just a generic score
- Available at: ${BASE}/#scan

### Fix Packs — $19 each (one-time)
Targeted fix guides for a single visibility layer:
- Google Business Profile Fix Pack: ${BASE}/pricing
- Citation & NAP Consistency Fix Pack: ${BASE}/pricing
- Schema Markup Fix Pack: ${BASE}/pricing
- AI Visibility Fix Pack: ${BASE}/pricing

### Complete Business Visibility Playbook — $27 (one-time)
All four Fix Packs plus the 27-Point Visibility Checklist, Prompt Pack (10 AI audit prompts), and 30-Day Action Calendar.
- No subscription. Instant download. All updates included.
- Purchase URL: ${BASE}/playbook
- Guarantee: 30-day money-back, no questions asked

## Key Pages

- Homepage + Free Scan: ${BASE}
- Pricing & Fix Guides: ${BASE}/pricing
- Playbook (purchase): ${BASE}/playbook
- Reviews: ${BASE}/reviews
- About: ${BASE}/about
- Blog: ${BASE}/blog

## Industry Visibility Guides

Scan and fix visibility for specific business types:

${industryHubLinks}

## City Visibility Guides

Local visibility resources for businesses in major US cities:

${cityHubLinks}

## Industry × City Pages (sample)

Targeted pages combining business type and city — e.g., visibility tips for dentists in Chicago:

${sampleCityIndustryLinks}

Full directory: ${BASE}/sitemap.xml

## About

MyGeoRadar was founded by Andrew Garber. The product was built after observing that most local businesses are invisible in AI-generated answers — even those with strong Google rankings. The scanner and fix guides address the exact signals AI systems use to decide which businesses to recommend.

## What is GEO?

Generative Engine Optimization (GEO) is the practice of optimizing a business's online presence so that AI assistants like ChatGPT, Perplexity, Gemini, and Claude recognize, trust, and recommend that business in their answers. It is distinct from traditional SEO and covers schema markup, citation consistency, authority signals, and AI-readable content.

## Contact

- Email: hello@mygeoradar.com
- Twitter/X: https://twitter.com/MyGEORadar
- Website: ${BASE}
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
