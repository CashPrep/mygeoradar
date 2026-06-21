import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Visibility Guide — How to Get Found by ChatGPT, Perplexity & Gemini | MyGeoRadar',
  description:
    'Free step-by-step guide: learn how ChatGPT, Perplexity, Gemini, and Claude decide which businesses to recommend — and the 6 trust signals you need to fix to show up.',
  openGraph: {
    title: 'AI Visibility Guide — How to Get Found by AI Assistants',
    description: 'Free guide: the 6 trust signals AI assistants look for and how to fix every gap.',
    url: 'https://mygeoradar.com/playbook/guide',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'AI Visibility Guide — How to Get Found by ChatGPT, Perplexity, Gemini, and Claude',
  description: 'The complete free guide to AI search visibility (GEO) — covering how AI assistants choose which businesses to recommend and the exact fixes to rank in AI answers.',
  url: 'https://mygeoradar.com/playbook/guide',
  author: { '@type': 'Organization', name: 'MyGeoRadar' },
  publisher: { '@type': 'Organization', name: 'MyGeoRadar', url: 'https://mygeoradar.com' },
}

const trustSignals = [
  {
    number: '01',
    title: 'Citation Consistency (NAP)',
    description:
      'Your business Name, Address, and Phone must be identical across every directory — Google Business Profile, Yelp, Apple Maps, Facebook, and the top 15 AI-trusted citation sites. Even small differences ("St." vs "Street") erode AI confidence in your business.',
    fixes: [
      'Audit all directory listings using a tool like Moz Local or BrightLocal',
      'Standardize your exact NAP format and apply it everywhere',
      'Submit to the 15 directories AI systems most commonly cite as sources',
    ],
  },
  {
    number: '02',
    title: 'Google Business Profile Completeness',
    description:
      'An incomplete GBP is the #1 reason local businesses are missing from AI answers. AI assistants treat GBP as a primary source of truth for local business information. Every field matters.',
    fixes: [
      'Complete every field: business description, hours, services, photos, attributes',
      'Add at least 10 photos — inside, outside, team, products',
      'Post a GBP update at least once per month to signal activity',
      'Respond to every review within 48 hours',
    ],
  },
  {
    number: '03',
    title: 'Structured Data (Schema Markup)',
    description:
      'Schema markup is machine-readable code that tells AI systems exactly what your business is, what you sell, and how to describe you. Without it, AI has to guess — and usually gets it wrong or skips you entirely.',
    fixes: [
      'Add LocalBusiness or Organization schema to your homepage',
      'Add Product or Service schema for each core offering',
      'Add FAQ schema to your most important content pages',
      'Validate everything using Google\'s Rich Results Test',
    ],
  },
  {
    number: '04',
    title: 'Content Authority',
    description:
      'AI assistants prefer to cite businesses that have published authoritative, specific content about their domain. Generic placeholder text signals low authority. Specific, expert content signals that you are the real answer.',
    fixes: [
      'Publish at least 3 long-form articles (800+ words) covering your core expertise',
      'Create a dedicated About page written to answer AI overview-style questions',
      'Answer the specific questions customers ask AI assistants about your category',
      'Keep your content updated — AI systems weight recency',
    ],
  },
  {
    number: '05',
    title: 'Brand Consistency Across the Web',
    description:
      'AI systems cross-reference multiple sources before recommending a business. If your business is described differently on your website, LinkedIn, GBP, and Yelp, the AI loses confidence in which version is correct.',
    fixes: [
      'Write one canonical business description and use it everywhere',
      'Ensure your website, social profiles, and directories all use the same tagline and category',
      'Add an llms.txt file to your site root to give AI crawlers a structured summary of your business',
    ],
  },
  {
    number: '06',
    title: 'Review Signals',
    description:
      'Volume, recency, and sentiment of reviews are one of the most powerful signals AI uses to evaluate business quality. A business with 200 recent 4.8-star reviews will outrank one with 20 old reviews in AI recommendations.',
    fixes: [
      'Systematically ask every satisfied customer for a Google review',
      'Target 3–5 new reviews per month as a baseline',
      'Respond to negative reviews professionally — AI reads responses too',
      'Build reviews on secondary platforms (Yelp, TripAdvisor, industry-specific sites)',
    ],
  },
]

export default function PlaybookGuidePage() {
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
              The AI Visibility Guide
            </h1>
            <p className="text-base text-muted leading-relaxed mb-4 max-w-2xl mx-auto">
              How ChatGPT, Perplexity, Gemini, and Claude decide which businesses to recommend —
              and the 6 trust signals you need to fix to show up.
            </p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/8 border border-accent/20 text-accent text-xs font-medium">
              Free · No signup required
            </span>
          </div>
        </section>

        <article className="max-w-3xl mx-auto px-4 py-16">

          <section className="mb-14">
            <h2 className="text-2xl font-bold mb-4">Why most businesses are invisible to AI</h2>
            <p className="text-base text-muted leading-relaxed mb-4">
              When someone asks ChatGPT "who is the best plumber in Austin" or Perplexity "what\'s a
              trusted accountant in Chicago," those AI assistants don\'t search the web in real time.
              They pull from structured knowledge they\'ve already built — based on patterns in training
              data, crawled content, and trusted citation sources.
            </p>
            <p className="text-base text-muted leading-relaxed mb-4">
              If your business isn\'t represented clearly and consistently in those sources, the AI
              either skips you or describes you inaccurately. The businesses that win AI recommendations
              are not necessarily the best — they\'re the ones that have done the work to be legible
              to AI systems.
            </p>
            <p className="text-base text-muted leading-relaxed">
              That\'s what GEO (Generative Engine Optimization) is: the practice of making your business
              clearly understood and trusted by AI assistants. Below are the 6 signals that matter most.
            </p>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl font-bold mb-8">The 6 trust signals AI assistants look for</h2>
            <div className="flex flex-col gap-8">
              {trustSignals.map(({ number, title, description, fixes }) => (
                <div key={number} className="rounded-2xl border border-border bg-white p-7">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="step-num flex-shrink-0">{number}</span>
                    <h3 className="font-bold text-lg leading-tight pt-0.5">{title}</h3>
                  </div>
                  <p className="text-sm text-muted leading-relaxed mb-5">{description}</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">How to fix it</p>
                  <ul className="flex flex-col gap-2.5">
                    {fixes.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl font-bold mb-4">The AI visibility compounding effect</h2>
            <p className="text-base text-muted leading-relaxed mb-4">
              GEO is not a one-time fix — it\'s a compounding system. Once AI assistants start
              recommending your business, it reinforces itself: more recommendations generate more
              citations, which signal more authority, which generates more recommendations.
            </p>
            <p className="text-base text-muted leading-relaxed">
              The businesses acting in 2026 are building that compound lead now, before most
              competitors even understand this is a category. The window to establish early authority
              is open — but it closes as AI systems accumulate more training data.
            </p>
          </section>

          {/* Next steps nav */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            <Link
              href="/playbook/checklist"
              className="flex items-center justify-between gap-3 p-5 rounded-xl border border-border bg-white hover:border-accent/30 hover:shadow-card-lift transition-all"
            >
              <div>
                <p className="font-semibold text-sm">Next: 27-Point Checklist</p>
                <p className="text-xs text-muted mt-0.5">Run your full audit →</p>
              </div>
              <ArrowRight className="w-4 h-4 text-accent flex-shrink-0" />
            </Link>
            <Link
              href="/playbook/prompts"
              className="flex items-center justify-between gap-3 p-5 rounded-xl border border-border bg-white hover:border-accent/30 hover:shadow-card-lift transition-all"
            >
              <div>
                <p className="font-semibold text-sm">10 Copy-Paste Prompts</p>
                <p className="text-xs text-muted mt-0.5">Test your AI visibility now →</p>
              </div>
              <ArrowRight className="w-4 h-4 text-accent flex-shrink-0" />
            </Link>
          </div>
        </article>

        <Footer />
      </main>
    </>
  )
}
