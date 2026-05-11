# MyGeoRadar

> **AI Search Visibility for Your Business** — See how ChatGPT, Perplexity, Gemini & Claude answer questions about your business, and get a clear action plan to show up more.

## Stack
- **Next.js 14** (App Router + TypeScript)
- **Tailwind CSS** (custom dark design system, electric blue `#4f8ef7`)
- **OpenAI GPT-4o** (GEO analysis engine)
- **Stripe** ($1/scan one-time payment)
- **Resend** (transactional email)
- **Vercel KV** (Redis — scan report storage)
- **Framer Motion** (animations)
- **Recharts** (score visualizations)

## Local Setup
```bash
npm install
cp .env.example .env   # fill in your API keys
npm run dev            # → http://localhost:3000
```

## Deploy
1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Add all env vars from `.env.example`
4. Deploy — live in ~60 seconds

## Build Parts
| Part | Status | Description |
|------|--------|-------------|
| 1 | ✅ Done | Foundation: design system, layout, components, types, utils |
| 2 | 🔄 Next | Homepage: hero, features, how-it-works, pricing, CTA, social proof |
| 3 | ⏳ | Scan tool UI + animated results page |
| 4 | ⏳ | API routes: GEO analysis (OpenAI) + Stripe $1 payment |
| 5 | ⏳ | Dashboard + email capture (Resend) |
| 6 | ⏳ | Blog, SEO polish, mobile final pass |
