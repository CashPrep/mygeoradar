import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { INDUSTRIES, getIndustryBySlug } from '@/lib/industries'
import { ArrowRight, AlertTriangle, CheckCircle, Lock, TrendingUp, Radio } from 'lucide-react'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return INDUSTRIES.map(i => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = getIndustryBySlug(params.slug)
  if (!industry) return {}
  return {
    title: `AI Visibility for ${industry.plural} | MyGeoRadar`,
    description: `${industry.painPoint} Check your ${industry.name.toLowerCase()} AI GEO score and find out if ChatGPT, Perplexity, and Gemini recommend your business.`,
    alternates: { canonical: `https://www.mygeoradar.com/industries/${industry.slug}` },
    openGraph: {
      title: `AI Visibility for ${industry.plural} | MyGeoRadar`,
      description: industry.painPoint,
      url: `https://www.mygeoradar.com/industries/${industry.slug}`,
    },
  }
}

const AI_SOURCES = ['ChatGPT', 'Perplexity', 'Gemini', 'Claude', 'Microsoft Copilot']

const FREE_STEPS = [
  {
    number: 1,
    title: 'Claim & complete your Google Business Profile',
    body: 'AI engines pull heavily from Google\'s Knowledge Graph. A fully completed GBP — with categories, description, photos, hours, and recent reviews — is the fastest trust signal you can send to AI.',
  },
  {
    number: 2,
    title: 'Add LocalBusiness schema markup to your website',
    body: 'Schema markup tells AI crawlers exactly what your business does, where it is, and who it serves. Without it, AI engines are guessing. With it, they can cite you confidently.',
  },
  {
    number: 3,
    title: 'Get consistent citations across 10 top directories',
    body: 'AI models verify businesses by finding consistent NAP (Name, Address, Phone) data across multiple independent sources. Yelp, Bing Places, Apple Maps, BBB, and 6 more are the ones that matter most.',
  },
]

const LOCKED_STEPS = [
  'Rewrite your About page so AI can quote it directly (with formula)',
  'Create a /facts page — your AI knowledge base (with template)',
  'Build a FAQ page with FAQPage schema AI engines quote directly',
  'Get cited in local press — includes pitch email + press release template',
  'Index your site in Bing Webmaster Tools (powers Microsoft Copilot)',
  'Submit to Google Search Console & get indexed in under 48 hours',
  'Create a Wikidata entry — the closest thing to an AI directory listing',
  'Your 30-day execution calendar: day-by-day timeline + weekly checklist',
]

export default function IndustryPage({ params }: Props) {
  const industry = getIndustryBySlug(params.slug)
  if (!industry) notFound()

  const scoreColor =
    industry.avgGeoScore >= 20 ? 'text-yellow-400' :
    industry.avgGeoScore >= 15 ? 'text-orange-400' :
    'text-red-400'

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">

        {/* Hero */}
        <section className="border-b border-border bg-surface/50 pt-24">
          <div className="max-w-2xl mx-auto px-4 py-12 flex flex-col gap-5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
                <Radio className="w-3 h-3" /> {industry.tag}
              </span>
              <Link
                href="/industries"
                className="text-xs text-muted hover:text-accent transition-colors"
              >
                ← All Industries
              </Link>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Are AI Assistants Recommending Your {industry.name}?
            </h1>

            <p className="text-muted leading-relaxed">
              {industry.painPoint} The average {industry.name.toLowerCase()} scores just{' '}
              <span className={`font-bold ${scoreColor}`}>{industry.avgGeoScore}/100</span> on AI
              visibility — meaning most {industry.plural.toLowerCase()} are completely invisible when
              someone asks an AI assistant for a recommendation.
            </p>

            {/* AI sources row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted">Check visibility on:</span>
              {AI_SOURCES.map(src => (
                <span
                  key={src}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface border border-border text-foreground"
                >
                  {src}
                </span>
              ))}
            </div>

            <Link
              href="/?industry=" + industry.slug
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-sm transition-colors w-fit shadow-lg"
            >
              {industry.ctaText} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Stats row */}
        <section className="border-b border-border bg-surface/30">
          <div className="max-w-2xl mx-auto px-4 py-6 grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <span className={`text-2xl font-bold ${scoreColor}`}>{industry.avgGeoScore}/100</span>
              <span className="text-xs text-muted">Avg AI score for {industry.plural.toLowerCase()}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-red-400">{100 - industry.avgGeoScore}%</span>
              <span className="text-xs text-muted">invisible to AI assistants</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-accent">5 AIs</span>
              <span className="text-xs text-muted">checked simultaneously</span>
            </div>
          </div>
        </section>

        {/* Pain point callout */}
        <section className="max-w-2xl mx-auto px-4 pt-10">
          <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-5 flex gap-4">
            <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">The problem for {industry.plural.toLowerCase()}</p>
              <p className="text-sm text-muted leading-relaxed">
                When a potential client or customer asks an AI assistant &ldquo;{industry.aiQuery}&rdquo;,
                only a small fraction of {industry.plural.toLowerCase()} ever get mentioned. If your
                business doesn&rsquo;t appear, that lead goes to a competitor — silently, with no
                chance to compete.
              </p>
            </div>
          </div>
        </section>

        {/* What AI looks for */}
        <section className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-bold">What AI assistants look for in a {industry.name.toLowerCase()}</h2>
            <p className="text-sm text-muted mt-1">The signals that determine whether your business gets recommended</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: '🗺️', title: 'Google Business Profile', body: 'A fully completed GBP is the #1 trust signal. Missing info means AI skips you.' },
              { icon: '🏷️', title: 'Schema Markup', body: 'Structured data tells AI exactly who you are. Without it, AI has to guess — and often guesses wrong.' },
              { icon: '📋', title: 'Directory Citations', body: 'Consistent NAP data across 10+ directories proves your business is real and credible.' },
              { icon: '⭐', title: 'Reviews & Ratings', body: 'AI models factor in review volume and recency. Recent 5-star reviews are a powerful ranking signal.' },
              { icon: '📝', title: 'Authoritative Content', body: 'AI cites businesses it can quote from. A strong About page and FAQ section get you mentioned.' },
              { icon: '🔗', title: 'Press & Backlinks', body: 'Mentions in local news and industry publications act as third-party endorsements AI engines trust.' },
            ].map(item => (
              <div key={item.title} className="bg-surface border border-border rounded-2xl p-4 flex gap-3">
                <span className="text-xl shrink-0">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-muted leading-relaxed mt-0.5">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Free starter steps */}
        <section className="max-w-2xl mx-auto px-4 pb-10 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Your AI Visibility Starter Plan</h2>
            <span className="text-xs text-green-400 font-semibold bg-green-400/10 border border-green-400/20 px-2 py-1 rounded-full">3 steps free</span>
          </div>
          <div className="flex flex-col gap-4">
            {FREE_STEPS.map(step => (
              <div key={step.number} className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-bold flex items-center justify-center shrink-0">
                    {step.number}
                  </span>
                  <h3 className="text-sm font-bold">{step.title}</h3>
                </div>
                <p className="text-sm text-muted leading-relaxed pl-10">{step.body}</p>
              </div>
            ))}
          </div>

          {/* Upgrade card */}
          <div className="rounded-2xl border-2 border-accent/40 bg-surface p-6 flex flex-col gap-4 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-bold">Steps 4–11 + all templates are in the Found by AI Playbook</p>
                <p className="text-sm text-muted mt-1">
                  The complete system to get your {industry.name.toLowerCase()} visible in AI answers —
                  including copy-paste schema code, a press pitch email, an About page formula,
                  and your full 30-day execution calendar.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              {LOCKED_STEPS.map(step => (
                <div key={step} className="flex items-center gap-2">
                  <Lock className="w-3 h-3 text-muted shrink-0" />
                  <span className="text-xs text-muted">{step}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 flex flex-col gap-3">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: '📋', label: '8 copy-paste templates' },
                  { icon: '📅', label: '30-day calendar' },
                  { icon: '✅', label: '27-point checklist' },
                ].map(v => (
                  <div key={v.label} className="flex flex-col items-center gap-1 text-center bg-surface-2 rounded-xl p-3">
                    <span className="text-lg">{v.icon}</span>
                    <span className="text-xs text-muted font-medium">{v.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">$27</span>
                <span className="text-sm text-muted">one-time &middot; instant download</span>
              </div>
              <Link
                href="/playbook"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white text-sm font-bold transition-colors"
              >
                Get the full Found by AI Playbook <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-muted text-center">Secure checkout via Stripe &middot; Instant download &middot; 30-day guarantee</p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <TrendingUp className="w-8 h-8 text-accent" />
            <p className="text-sm font-bold">Ready to check where your {industry.name.toLowerCase()} stands right now?</p>
            <Link
              href="/?industry=" + industry.slug
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-sm transition-colors"
            >
              {industry.ctaText} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Related industries */}
        <section className="border-t border-border bg-surface/30">
          <div className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-4">
            <h2 className="text-sm font-bold text-muted uppercase tracking-widest">More Industries</h2>
            <div className="flex flex-wrap gap-2">
              {INDUSTRIES.filter(i => i.slug !== industry.slug && i.tag === industry.tag)
                .slice(0, 8)
                .map(rel => (
                  <Link
                    key={rel.slug}
                    href={`/industries/${rel.slug}`}
                    className="text-xs px-3 py-1.5 rounded-full bg-surface border border-border hover:border-accent/50 hover:text-accent transition-colors"
                  >
                    {rel.plural}
                  </Link>
                ))}
              <Link
                href="/industries"
                className="text-xs px-3 py-1.5 rounded-full bg-surface border border-border hover:border-accent/50 hover:text-accent transition-colors"
              >
                All Industries →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
