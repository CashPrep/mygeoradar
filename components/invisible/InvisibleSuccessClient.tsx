'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react'

const ALL_STEPS = [
  {
    number: 1,
    title: 'Claim & complete your Google Business Profile',
    body: 'Go to business.google.com and claim your listing. Fill every single field: business category (be specific), description (use natural language your customers speak), photos (interior, exterior, team, products), hours, phone, and website. Respond to every review — AI engines weight businesses with active owner engagement higher.',
  },
  {
    number: 2,
    title: 'Add structured data (schema markup) to your website',
    body: 'Add JSON-LD schema to your homepage <head>. Use LocalBusiness (or a more specific subtype like Restaurant, LegalService, MedicalBusiness), Organization, and Service schemas. Include name, url, logo, address, telephone, openingHours, and description. Test at validator.schema.org before publishing. This is the single most direct signal to AI crawlers.',
  },
  {
    number: 3,
    title: 'Get mentioned on authoritative third-party directories',
    body: 'Submit to: Yelp, Google Business, Bing Places, Apple Maps, Foursquare, and the top 2–3 directories specific to your industry. Each mention with consistent NAP (Name, Address, Phone) is a citation. AI models cross-reference citations to verify a business exists. Inconsistent or missing NAP across directories actively suppresses visibility.',
  },
  {
    number: 4,
    title: 'Write an "About" page that AI can actually quote',
    body: 'AI assistants frequently quote "About" pages when summarizing a business. Your About page should read like a Wikipedia entry: founding year, founder name, mission, specific services with plain-language descriptions, location, and what makes you different. Avoid vague superlatives. Write: "Founded in 2018, Blue Ridge Roofing installs asphalt shingle and metal roofs for homeowners in Asheville, NC" — not "We are passionate about quality."',
  },
  {
    number: 5,
    title: 'Build a Wikipedia-style facts page for your business',
    body: 'Create a dedicated /facts or /about/company page structured like a Wikipedia article: key facts in a definition list, founding date, team size, service area, notable projects or clients, awards, and a short history. Use clear H2/H3 headings. This page becomes highly crawlable and quotable by AI engines that prefer structured, encyclopedic content over marketing copy.',
  },
  {
    number: 6,
    title: 'Get cited in local news (even one article changes everything)',
    body: 'A single local newspaper mention, press release, or journalist quote causes an outsized jump in AI recognition. Reach out to your local newspaper, city blog, or industry newsletter with a genuine story angle: a business milestone, a community contribution, an unusual service, a data point only you have. Services like EIN Presswire ($99/release) distribute to hundreds of indexed news outlets.',
  },
  {
    number: 7,
    title: 'Optimize for question-based queries AI engines answer',
    body: 'Create a detailed FAQ page targeting the exact questions customers ask AI: "What does [your service] cost in [city]?", "How long does [your process] take?", "What should I look for in a [your category]?". Write answers in 2–4 sentence paragraphs, not bullet points — this matches the format AI engines use when generating responses. Mark up the FAQ with FAQPage schema.',
  },
  {
    number: 8,
    title: 'Set up and verify your Bing Webmaster Tools profile',
    body: 'Bing powers many AI products including Microsoft Copilot and some Perplexity sources. Go to bing.com/webmasters, add your site, and submit your sitemap. Verify via DNS TXT record or meta tag. Then open the "SEO" tab and fix every issue listed. Bing\'s crawl data feeds directly into Copilot\'s business knowledge — businesses not indexed here are invisible to an entire ecosystem.',
  },
  {
    number: 9,
    title: 'Create a branded knowledge panel with Wikidata',
    body: 'Wikidata is the structured database behind Wikipedia, and it feeds directly into Google\'s Knowledge Graph and several AI training pipelines. Create a Wikidata entry for your business (wikidata.org/wiki/Special:NewItem). Add: official name, website, founding date, location (link to the Wikidata item for your city), industry, and founder. This is the closest thing to an official AI directory entry.',
  },
  {
    number: 10,
    title: 'The 30-day momentum plan',
    body: `Execute in order for fastest results:

Week 1 — Foundation: Complete GBP, add schema markup to homepage, submit to 5 top directories.
Week 2 — Content: Publish your About page rewrite + Facts page. Submit sitemap to Google Search Console and Bing Webmaster Tools.
Week 3 — Authority: Reach out to 3 local news outlets or industry blogs with a story pitch. Publish your FAQ page with FAQPage schema.
Week 4 — Knowledge graph: Create Wikidata entry. Submit a press release via EIN Presswire or PR Newswire.

After 30 days, run your free MyGeoRadar snapshot again — you should see a meaningful score increase as AI engines index your new signals.`,
  },
]

function InvisibleSuccessInner() {
  const params       = useSearchParams()
  const businessName = params.get('name') || 'Your Business'
  const website      = params.get('url')  || ''

  return (
    <main className="min-h-screen bg-bg text-foreground">
      {/* Hero */}
      <section className="border-b border-border bg-surface">
        <div className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-success/15 border border-success/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-xs text-muted uppercase tracking-wider font-semibold">Full guide unlocked</p>
              <h1 className="text-xl font-bold text-foreground">{businessName} — Your AI Visibility Fix Plan</h1>
            </div>
          </div>
          <p className="text-sm text-foreground-dim leading-relaxed">
            Below is your complete 10-step action plan to get {businessName} recognised by ChatGPT, Perplexity, Gemini, and Claude.
            Start at Step 1 and work through in order — each step builds on the last.
          </p>
          {website && (
            <p className="text-xs text-muted">Site: <span className="text-accent">{website}</span></p>
          )}
        </div>
      </section>

      {/* All steps */}
      <section className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-4">
        {ALL_STEPS.map(step => (
          <div key={step.number} className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-success/15 border border-success/30 text-success text-xs font-bold flex items-center justify-center shrink-0">
                {step.number}
              </span>
              <h2 className="text-sm font-bold text-foreground">{step.title}</h2>
            </div>
            <p className="text-sm text-foreground-dim leading-relaxed pl-10 whitespace-pre-line">{step.body}</p>
          </div>
        ))}
      </section>

      {/* CTA to full scan */}
      <section className="border-t border-border bg-surface">
        <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-3 items-center text-center">
          <p className="text-sm font-semibold text-foreground">Once you&apos;ve completed these steps, run a full AI scan to see your exact score.</p>
          <p className="text-xs text-muted max-w-md">
            The full scan checks your visibility across ChatGPT, Perplexity, Gemini &amp; Claude with 40–50 real customer queries and gives you a detailed per-engine breakdown.
          </p>
          <a
            href={`/scan?name=${encodeURIComponent(businessName)}&url=${encodeURIComponent(website)}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-bold transition-all shadow-glow-sm hover:shadow-glow-md"
          >
            Run my full AI visibility scan <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-xs text-muted">$29.99 &middot; Results in ~60 seconds</p>
        </div>
      </section>
    </main>
  )
}

export function InvisibleSuccessClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-accent animate-spin" />
      </div>
    }>
      <InvisibleSuccessInner />
    </Suspense>
  )
}
