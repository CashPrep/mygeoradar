import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { getAllPairs, getIndustry, getCity } from '@/lib/programmatic-data'
import {
  Radar,
  ArrowRight,
  CheckCircle,
  MapPin,
  Search,
  FileText,
  Zap,
  AlertCircle,
} from 'lucide-react'

type Props = {
  params: { industry: string; city: string }
}

// Pre-render all valid pairs at build time
export async function generateStaticParams() {
  return getAllPairs()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = getIndustry(params.industry)
  const city = getCity(params.city)
  if (!industry || !city) return {}

  const title = `${industry.plural} in ${city.label} — Is Your Business Visible? | MyGeoRadar`
  const description = `${industry.plural} in ${city.label}, ${city.stateAbbr}: find out if your business shows up on Google, in directories, and in AI search results. Free visibility scan — no signup required.`

  return {
    title,
    description,
    openGraph: { title, description, url: `https://mygeoradar.com/${params.industry}/${params.city}` },
    alternates: { canonical: `https://mygeoradar.com/${params.industry}/${params.city}` },
  }
}

const VISIBILITY_LAYERS = [
  {
    icon: MapPin,
    label: 'Google Business Profile',
    desc: 'Complete, verified, and optimized for local map pack ranking.',
  },
  {
    icon: Search,
    label: 'Directory Citations',
    desc: 'Consistent NAP across Yelp, Apple Maps, Bing, and 40+ other directories.',
  },
  {
    icon: FileText,
    label: 'Schema Markup',
    desc: 'Structured data that tells search engines and AI exactly what you do.',
  },
  {
    icon: Zap,
    label: 'AI Search Visibility',
    desc: 'Whether ChatGPT, Perplexity, and Gemini recommend your business by name.',
  },
]

export default function ProgrammaticPage({ params }: Props) {
  const industry = getIndustry(params.industry)
  const city = getCity(params.city)

  if (!industry || !city) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${industry.plural} in ${city.label} — Business Visibility Scan`,
    description: `Free business visibility scan for ${industry.plural} in ${city.label}, ${city.state}.`,
    url: `https://mygeoradar.com/${params.industry}/${params.city}`,
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'MyGeoRadar Visibility Scanner',
      applicationCategory: 'BusinessApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  }

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* ── HERO ── */}
      <section className="pt-28 pb-16 px-4 md:px-8 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/8 border border-accent/20 text-accent text-xs font-medium mb-6">
            <MapPin className="w-3 h-3" />
            {city.label}, {city.stateAbbr} · {industry.plural}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 text-balance">
            Are {industry.plural} in {city.label} visible
            <br />
            <span className="text-gradient-accent">where patients actually search?</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-4 max-w-2xl">
            In {city.metro}, {industry.painPhrase}. But most {industry.plural.toLowerCase()} have
            at least one critical visibility gap — and don't know it.
          </p>
          <div className="flex items-start gap-2 bg-warning/6 border border-warning/20 rounded-xl px-4 py-3 mb-8 max-w-xl">
            <AlertCircle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted">
              <strong className="text-foreground">Most common issue for {industry.plural.toLowerCase()} in {city.label}:</strong>{' '}
              {industry.topProblem}.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/#scan">
              <Button variant="primary" size="lg" className="gap-2 shadow-glow-sm w-full sm:w-auto">
                <Radar className="w-4 h-4" />
                Scan my {industry.label.toLowerCase()} business
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="secondary" size="lg" className="gap-2 w-full sm:w-auto">
                See fix guides <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <p className="text-xs text-muted mt-3">Free · No signup · Results in 30 seconds</p>
        </div>
      </section>

      {/* ── WHAT WE CHECK ── */}
      <section className="py-16 px-4 md:px-8 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">What the scan checks for {industry.plural.toLowerCase()} in {city.label}</h2>
          <p className="text-muted text-sm mb-8">
            Four visibility layers determine whether your {industry.label.toLowerCase()} practice shows up — or gets passed over.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VISIBILITY_LAYERS.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex gap-3 p-4 rounded-xl border border-border bg-surface hover:border-accent/20 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-accent/8 border border-accent/15 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-0.5">{label}</p>
                  <p className="text-xs text-muted leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI ANGLE ── */}
      <section className="py-16 px-4 md:px-8 border-b border-border bg-surface/40">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">AI Search</span>
          </div>
          <h2 className="text-2xl font-bold mb-3">
            ChatGPT and Perplexity are recommending {industry.plural.toLowerCase()} in {city.label} by name
          </h2>
          <p className="text-muted leading-relaxed mb-6">
            {industry.aiExample}. If your structured data, citations, and GBP are incomplete,
            you won't be in that recommendation — even if you have 200 five-star reviews.
          </p>
          <div className="rounded-xl border border-accent/20 bg-accent/4 p-5">
            <p className="text-sm font-medium mb-3">The AI visibility checklist for {industry.plural.toLowerCase()}:</p>
            <ul className="flex flex-col gap-2">
              {[
                'Consistent business name, address, and phone across all directories',
                'Complete and verified Google Business Profile with correct categories',
                'LocalBusiness schema markup on your website',
                'Authoritative mentions on trusted local and industry sites',
                'AI-readable FAQ content on your site answering common patient questions',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-balance">
            Find out exactly where your {city.label} {industry.label.toLowerCase()} practice is invisible
          </h2>
          <p className="text-muted mb-8">
            The free scan takes 30 seconds and shows you a scored breakdown across all four
            visibility layers — GBP, citations, schema, and AI search signals.
          </p>
          <Link href="/#scan">
            <Button variant="primary" size="lg" className="gap-2 shadow-glow-sm">
              <Radar className="w-4 h-4" />
              Scan my {industry.label.toLowerCase()} business — free
            </Button>
          </Link>
          <p className="text-xs text-muted mt-3">No signup &middot; No credit card &middot; 30 seconds</p>
        </div>
      </section>

      {/* ── RELATED LINKS ── */}
      <section className="py-10 px-4 md:px-8 border-t border-border bg-surface/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted mb-4">Also check</p>
          <div className="flex flex-wrap gap-2">
            <Link href={`/${params.industry}`}>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-border bg-white text-xs text-muted hover:border-accent/30 hover:text-accent transition-colors cursor-pointer">
                All cities — {industry.plural}
              </span>
            </Link>
            <Link href={`/${params.city}`}>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-border bg-white text-xs text-muted hover:border-accent/30 hover:text-accent transition-colors cursor-pointer">
                All industries — {city.label}
              </span>
            </Link>
            <Link href="/pricing">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-border bg-white text-xs text-muted hover:border-accent/30 hover:text-accent transition-colors cursor-pointer">
                Fix guides from $19
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
