# MyGeoRadar

> **AI Search Visibility for Your Business** — See how ChatGPT, Perplexity, Gemini & Claude answer questions about your business, and get a clear action plan to show up more.

## Stack
- **Next.js 14** (App Router + TypeScript)
- **Tailwind CSS** (custom dark design system, electric blue `#4f8ef7`)
- **OpenAI GPT-4o** (GEO analysis engine)
- **Stripe** ($1/scan one-time payment)
- **Resend** (transactional email)
- **Supabase** (scan reports + reviews storage)
- **Framer Motion** (animations)
- **Recharts** (score visualizations)

## Local Setup
```bash
npm install
cp .env.example .env   # fill in your API keys
npm run dev            # → http://localhost:3000
```

## Environment Variables
```
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
RESEND_API_KEY=re_...
NEXT_PUBLIC_SUPABASE_URL=https://zcawaskuichfxzgrpzzh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_GVf0Ct-XBfgPlgTOYk037g_NW_McQtd
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # Supabase dashboard → Settings → API
DASHBOARD_SECRET=your-secret-here
NEXT_PUBLIC_APP_URL=https://mygeoradar.vercel.app
```

## Deploy
1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Add all env vars above in Vercel project settings
4. Add Stripe webhook: `https://your-domain.com/api/webhooks/stripe` → event: `checkout.session.completed`
5. Deploy — live in ~60 seconds

## Admin Dashboard
Visit `/dashboard?key=YOUR_DASHBOARD_SECRET` to:
- See all scans + revenue
- Approve / reject user reviews

## Build Parts
| Part | Status | Description |
|------|--------|-------------|
| 1 | ✅ | Foundation: design system, layout, components, types, utils |
| 2 | ✅ | Homepage: hero, features, how-it-works, pricing, reviews CTA |
| 3 | ✅ | Scan form (multi-step) + results page + API routes + GEO engine |
| 4 | ✅ | Email delivery (Resend) + admin dashboard |
| 5 | ✅ | Blog (2 SEO posts) + privacy/terms + supabase-js + final polish |
