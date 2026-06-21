import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free 27-Point AI Visibility Checklist — GEO Audit for ChatGPT & Perplexity | MyGeoRadar',
  description:
    'Free 27-point checklist to audit your AI search visibility. Check every GEO signal — Google Business Profile, schema, citations, content, and reviews — and know exactly what to fix.',
  openGraph: {
    title: 'Free 27-Point AI Visibility Checklist',
    description: 'Audit your GEO visibility in minutes. 27 concrete action items across 5 categories.',
    url: 'https://mygeoradar.com/playbook/checklist',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The 27-Point AI Visibility Checklist — Free GEO Audit',
  description: 'A free 27-point checklist covering every GEO signal — schema, citations, Google Business Profile, content authority, and reviews — to help businesses get found by AI assistants.',
  url: 'https://mygeoradar.com/playbook/checklist',
  author: { '@type': 'Organization', name: 'MyGeoRadar' },
  publisher: { '@type': 'Organization', name: 'MyGeoRadar', url: 'https://mygeoradar.com' },
}

const categories = [
  {
    id: 'profile',
    title: 'Profile Completeness',
    impact: 'High',
    color: 'red',
    items: [
      { text: 'Google Business Profile is fully claimed and verified', impact: 'High' },
      { text: 'GBP business description is keyword-rich and at least 150 words', impact: 'High' },
      { text: 'All GBP fields completed: hours, services, attributes, categories', impact: 'High' },
      { text: 'At least 10 photos uploaded to GBP (interior, exterior, team)', impact: 'Medium' },
      { text: 'GBP has a post published within the last 30 days', impact: 'Medium' },
      { text: 'Primary and secondary GBP categories accurately reflect your business', impact: 'High' },
    ],
  },
  {
    id: 'citations',
    title: 'Citation Consistency',
    impact: 'High',
    color: 'red',
    items: [
      { text: 'NAP (Name, Address, Phone) is identical across all major directories', impact: 'High' },
      { text: 'Business is listed on Yelp, Apple Maps, Bing Places, and Facebook', impact: 'High' },
      { text: 'Listed on at least 10 of the top 15 AI-trusted citation directories', impact: 'High' },
      { text: 'No duplicate or conflicting listings exist for your business', impact: 'Medium' },
      { text: 'Industry-specific directories are claimed (e.g. Healthgrades, Avvo, Houzz)', impact: 'Medium' },
    ],
  },
  {
    id: 'content',
    title: 'Content Authority',
    impact: 'High',
    color: 'amber',
    items: [
      { text: 'Dedicated About page written to answer AI overview-style questions', impact: 'High' },
      { text: 'At least 3 long-form articles (800+ words) covering your core expertise', impact: 'High' },
      { text: 'Content answers the exact questions customers ask AI about your category', impact: 'High' },
      { text: 'Website content has been updated in the last 90 days', impact: 'Medium' },
      { text: 'llms.txt file exists at your domain root with a structured business summary', impact: 'High' },
      { text: 'No AI crawlers (GPTBot, PerplexityBot, Googlebot) are blocked in robots.txt', impact: 'High' },
    ],
  },
  {
    id: 'schema',
    title: 'Structured Data (Schema)',
    impact: 'High',
    color: 'red',
    items: [
      { text: 'LocalBusiness or Organization schema present on homepage', impact: 'High' },
      { text: 'Product or Service schema added for each core offering', impact: 'High' },
      { text: 'FAQ schema added to key content pages', impact: 'Medium' },
      { text: 'Schema validated with Google Rich Results Test — zero errors', impact: 'High' },
      { text: 'Open Graph tags correctly configured for AI link previews', impact: 'Medium' },
    ],
  },
  {
    id: 'reviews',
    title: 'Review Signals',
    impact: 'Medium',
    color: 'amber',
    items: [
      { text: 'Google review rating is 4.0 or higher', impact: 'High' },
      { text: 'At least 20 Google reviews (50+ is competitive in most categories)', impact: 'High' },
      { text: 'At least 3 new reviews received in the last 30 days', impact: 'Medium' },
      { text: 'All negative reviews have a professional owner response', impact: 'Medium' },
      { text: 'Reviews exist on secondary platforms (Yelp, industry-specific sites)', impact: 'Medium' },
    ],
  },
]

export default function ChecklistPage() {
  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="min-h-screen bg-background">
        <Navbar />

        <section className="relative pt-20 pb-14 px-4 md:px-8 text-center overflow-hidden border-b border-border">
          <div className="absolute inset-0 hero-bg opacity-70 pointer-events-none" aria-hidden="true" />
          <div className="relative max-w-3xl mx-auto">
            <Link href="/playbook" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Playbook
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-3 text-gradient text-balance">
              27-Point AI Visibility Checklist
            </h1>
            <p className="text-base text-muted leading-relaxed mb-4 max-w-2xl mx-auto">
              Run this audit to know exactly where your business stands with AI assistants.
              Each item is a concrete action — check it off or fix it.
            </p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/8 border border-accent/20 text-accent text-xs font-medium">
              Free · No signup required · Re-run every 90 days
            </span>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="flex flex-col gap-8">
            {categories.map(({ id, title, items }) => (
              <section key={id}>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  {title}
                  <span className="text-xs font-medium text-muted">({items.length} items)</span>
                </h2>
                <div className="flex flex-col gap-2">
                  {items.map(({ text, impact }) => (
                    <div
                      key={text}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white border border-border"
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded border-2 border-border mt-0.5" aria-hidden="true" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground leading-snug">{text}</p>
                      </div>
                      <span className={`flex-shrink-0 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded mt-0.5 ${
                        impact === 'High' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        {impact}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Next steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
            <Link
              href="/playbook/prompts"
              className="flex items-center justify-between gap-3 p-5 rounded-xl border border-border bg-white hover:border-accent/30 hover:shadow-card-lift transition-all"
            >
              <div>
                <p className="font-semibold text-sm">Next: 10 Copy-Paste Prompts</p>
                <p className="text-xs text-muted mt-0.5">Test your AI visibility now →</p>
              </div>
              <ArrowRight className="w-4 h-4 text-accent flex-shrink-0" />
            </Link>
            <Link
              href="/playbook/30-day-plan"
              className="flex items-center justify-between gap-3 p-5 rounded-xl border border-border bg-white hover:border-accent/30 hover:shadow-card-lift transition-all"
            >
              <div>
                <p className="font-semibold text-sm">30-Day Action Plan</p>
                <p className="text-xs text-muted mt-0.5">Day-by-day calendar →</p>
              </div>
              <ArrowRight className="w-4 h-4 text-accent flex-shrink-0" />
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    </>
  )
}
