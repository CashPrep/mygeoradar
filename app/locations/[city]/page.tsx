import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { CITIES, INDUSTRIES, getCity } from '@/lib/programmatic-data'
import {
  Radar,
  ArrowRight,
  MapPin,
  Search,
  FileText,
  Zap,
  CheckCircle,
  HelpCircle,
  TrendingUp,
} from 'lucide-react'

type Props = { params: { city: string } }

export async function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCity(params.city)
  if (!city) return {}
  const title = `${city.label} Business Visibility Scanner — Google, Citations & AI Search | MyGeoRadar`
  const description = `Is your ${city.label} business showing up on Google, in local directories, and in AI search results? Free visibility scan for local businesses in ${city.label}, ${city.stateAbbr}. Takes 30 seconds.`
  return {
    title,
    description,
    openGraph: { title, description, url: `https://mygeoradar.com/locations/${params.city}` },
    alternates: { canonical: `https://mygeoradar.com/locations/${params.city}` },
  }
}

const VISIBILITY_STATS = [
  { stat: '68%', label: 'of local searches end without a click', sub: 'AI Overviews and map packs answer the question before users reach your site' },
  { stat: '46%', label: 'of all Google searches are local intent', sub: 'Your city is a massive opportunity — if your visibility signals are clean' },
  { stat: '5%', label: 'of local businesses have correct schema', sub: 'Schema markup is the lowest-competition, highest-leverage fix available right now' },
]

const FAQS = [
  {
    q: 'Why isn\'t my {city} business showing up on Google?',
    a: 'The most common reasons are an incomplete or unverified Google Business Profile, inconsistent name/address/phone data across directories, and missing schema markup on your website.',
  },
  {
    q: 'Does my {city} business need to appear in AI search results?',
    a: 'Yes — AI tools like ChatGPT, Perplexity, and Google Gemini are increasingly the first stop for local business searches. They recommend businesses by name based on structured data, directory citations, and authority signals.',
  },
  {
    q: 'How competitive is local SEO in {city}?',
    a: 'In most major metros, the businesses that rank are not necessarily the best — they are the ones with the most complete visibility signals. A fully optimized GBP, clean citations, and proper schema markup can move a business from page 3 to the local map pack within weeks.',
  },
  {
    q: 'What does the free visibility scan check?',
    a: 'The scan evaluates your Google Business Profile completeness, citation consistency across directories, schema markup presence, and AI search signals. You get a scored breakdown of each layer with specific findings.',
  },
]

export default function CityHubPage({ params }: Props) {
  const city = getCity(params.city)
  if (!city) notFound()

  const faqs = FAQS.map((f) => ({
    q: f.q.replace(/{city}/g, city!.label),
    a: f.a.replace(/{city}/g, city!.label),
  }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${city!.label} Business Visibility Scanner`,
    description: `Free local business visibility scan for ${city!.label}, ${city!.state}.`,
    url: `https://mygeoradar.com/locations/${params.city}`,
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        {/* HERO */}
        <section className="pt-28 pb-16 px-4 md:px-8 border-b border-border">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/8 border border-accent/20 text-accent text-xs font-medium mb-6">
              <MapPin className="w-3 h-3" />
              {city!.label}, {city!.stateAbbr}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 text-balance">
              Is your {city!.label} business<br />
              <span className="text-gradient-accent">getting found online?</span>
            </h1>
            <p className="text-lg text-muted leading-relaxed mb-8 max-w-2xl">
              In {city!.metro}, customers search Google, check AI assistants, and browse directories before contacting a local business. The free scan shows you exactly which visibility gaps are costing you customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/#scan">
                <Button variant="primary" size="lg" className="gap-2 shadow-glow-sm w-full sm:w-auto">
                  <Radar className="w-4 h-4" />
                  Scan my {city!.label} business
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="secondary" size="lg" className="gap-2 w-full sm:w-auto">
                  View fix guides <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <p className="text-xs text-muted mt-3">Free · No signup · 30 seconds</p>
          </div>
        </section>

        {/* STATS */}
        <section className="py-14 px-4 md:px-8 border-b border-border bg-surface/40">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">Local search in {city!.label}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {VISIBILITY_STATS.map(({ stat, label, sub }) => (
                <div key={stat} className="flex flex-col gap-1">
                  <span className="text-4xl font-black text-gradient tracking-tight">{stat}</span>
                  <span className="text-sm font-semibold">{label}</span>
                  <span className="text-xs text-muted leading-relaxed">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INDUSTRY GRID */}
        <section className="py-16 px-4 md:px-8 border-b border-border bg-surface/40">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Scan by business type in {city!.label}</h2>
            <p className="text-muted text-sm mb-8">Select your industry for a tailored visibility breakdown.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {INDUSTRIES.map((industry) => (
                <Link key={industry.slug} href={`/${industry.slug}/${params.city}`}>
                  <div className="flex flex-col gap-1 p-3 rounded-xl border border-border bg-white hover:border-accent/30 hover:shadow-sm transition-all cursor-pointer">
                    <span className="text-lg">{industry.emoji}</span>
                    <span className="text-sm font-semibold leading-tight">{industry.plural}</span>
                    <span className="text-xs text-muted">{city!.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* AI ANGLE */}
        <section className="py-16 px-4 md:px-8 border-b border-border">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">AI Search in {city!.label}</span>
            </div>
            <h2 className="text-2xl font-bold mb-3">
              AI is recommending {city!.label} businesses by name
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              ChatGPT, Perplexity, and Google Gemini now answer &ldquo;best [business type] in {city!.label}&rdquo; with specific recommendations. If your signals are incomplete, you are invisible to this growing channel.
            </p>
            <div className="flex flex-col gap-2">
              {[
                `Consistent NAP across all ${city!.label} directory listings`,
                'Verified and complete Google Business Profile',
                'LocalBusiness schema markup with correct city and service area',
                'Authority mentions on trusted local and industry sites',
                'FAQ content answering common local customer questions',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 md:px-8 border-b border-border bg-surface/40">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <HelpCircle className="w-5 h-5 text-accent" />
              <h2 className="text-2xl font-bold">Common questions</h2>
            </div>
            <div className="divide-y divide-border">
              {faqs.map(({ q, a }) => (
                <div key={q} className="py-5">
                  <h3 className="font-semibold text-[15px] mb-2">{q}</h3>
                  <p className="text-sm text-muted leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-balance">
              Find every visibility gap in your {city!.label} business
            </h2>
            <p className="text-muted mb-8">
              The free scan checks GBP, citations, schema, and AI signals — and tells you exactly what is broken. No signup, no credit card, 30 seconds.
            </p>
            <Link href="/#scan">
              <Button variant="primary" size="lg" className="gap-2 shadow-glow-sm">
                <Radar className="w-4 h-4" />
                Scan my {city!.label} business — free
              </Button>
            </Link>
            <p className="text-xs text-muted mt-3">No signup · No credit card · 30 seconds</p>
          </div>
        </section>

        {/* RELATED CITIES */}
        <section className="py-10 px-4 md:px-8 border-t border-border bg-surface/40">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted mb-4">Other cities</p>
            <div className="flex flex-wrap gap-2">
              {CITIES.filter((c) => c.slug !== params.city).map((c) => (
                <Link key={c.slug} href={`/locations/${c.slug}`}>
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-border bg-white text-xs text-muted hover:border-accent/30 hover:text-accent transition-colors cursor-pointer">
                    {c.label}, {c.stateAbbr}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
