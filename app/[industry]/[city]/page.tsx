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
  BookOpen,
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
  const description = `${industry.plural} in ${city.label}, ${city.stateAbbr}: find out if your business shows up on Google, in local directories, and in AI search results. Free visibility scan — no signup required.`

  return {
    title,
    description,
    openGraph: { title, description, url: `https://mygeoradar.com/${params.industry}/${params.city}` },
    alternates: { canonical: `https://mygeoradar.com/${params.industry}/${params.city}` },
  }
}

export default function ProgrammaticPage({ params }: Props) {
  const industry = getIndustry(params.industry)
  const city = getCity(params.city)

  if (!industry || !city) notFound()

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${industry!.plural} in ${city!.label} — Business Visibility Scanner`,
      description: `Free visibility scan for ${industry!.plural.toLowerCase()} in ${city!.label}, ${city!.state}.`,
      url: `https://mygeoradar.com/${params.industry}/${params.city}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'MyGeoRadar',
      applicationCategory: 'BusinessApplication',
      description: `Scan your ${industry!.label.toLowerCase()} business in ${city!.label} for Google, directory, schema, and AI visibility gaps.`,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  ]

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
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/8 border border-accent/20 text-accent text-xs font-medium">
                <span>{industry!.emoji}</span> {industry!.plural}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface border border-border text-muted text-xs">
                <MapPin className="w-3 h-3" /> {city!.label}, {city!.stateAbbr}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 text-balance">
              Are {industry!.plural.toLowerCase()} in {city!.label}<br />
              <span className="text-gradient-accent">getting found online?</span>
            </h1>
            <p className="text-lg text-muted leading-relaxed mb-8 max-w-2xl">
              In {city!.metro}, {industry!.painPhrase}. The free scan checks your
              Google Business Profile, directory citations, schema markup, and AI search signals
              in 30 seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/#scan">
                <Button variant="primary" size="lg" className="gap-2 shadow-glow-sm w-full sm:w-auto">
                  <Radar className="w-4 h-4" />
                  Scan my {city!.label} {industry!.label.toLowerCase()}
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

        {/* TOP PROBLEM */}
        <section className="py-14 px-4 md:px-8 border-b border-border bg-surface/40">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4 p-5 rounded-xl border border-amber-200 bg-amber-50">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-amber-900 mb-1">The #1 problem for {industry!.plural.toLowerCase()} in {city!.label}</p>
                <p className="text-sm text-amber-800 leading-relaxed">{industry!.topProblem}</p>
              </div>
            </div>

            {/* ── INLINE FIX GUIDE UPSELL CARD (Issue #9) ── */}
            <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-xl border border-accent/30 bg-accent/5">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground">
                  {industry!.plural} Fix Guide — step-by-step solution
                </p>
                <p className="text-xs text-muted mt-0.5 leading-relaxed">
                  Exact fixes for the problem above: schema code, GBP checklist, citation cleanup, and a 30-day action plan built for {industry!.plural.toLowerCase()} in {city!.metro}.
                </p>
              </div>
              <Link
                href="/playbook"
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors whitespace-nowrap"
              >
                Get it — $27 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* WHAT WE CHECK */}
        <section className="py-16 px-4 md:px-8 border-b border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">What the scan checks</h2>
            <p className="text-muted text-sm mb-8">Four layers determine whether your {city!.label} {industry!.label.toLowerCase()} gets found — or gets passed over.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: MapPin, label: 'Google Business Profile', desc: `Complete, verified, and optimized for the ${city!.label} local map pack.` },
                { icon: Search, label: 'Directory Citations', desc: `Consistent NAP across Yelp, Apple Maps, Bing, and 40+ directories in the ${city!.metro} area.` },
                { icon: FileText, label: 'Schema Markup', desc: 'Structured data that tells search engines and AI models exactly what your business does and where it is.' },
                { icon: Zap, label: 'AI Search Visibility', desc: `Whether ChatGPT, Perplexity, and Gemini would recommend your ${city!.label} ${industry!.label.toLowerCase()} by name.` },
              ].map(({ icon: Icon, label, desc }) => (
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

        {/* AI ANGLE */}
        <section className="py-16 px-4 md:px-8 border-b border-border bg-surface/40">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">AI Search</span>
            </div>
            <h2 className="text-2xl font-bold mb-3">
              AI is recommending {industry!.plural.toLowerCase()} in {city!.label} by name
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              {industry!.aiExample}. In {city!.metro}, {industry!.plural.toLowerCase()} with clean structured data and strong directory signals are already being recommended by ChatGPT and Perplexity. If your signals are incomplete, you are invisible to this growing channel.
            </p>
            <div className="flex flex-col gap-2">
              {[
                `Consistent NAP across all ${city!.label} directories`,
                `Verified Google Business Profile listing in ${city!.metro}`,
                'LocalBusiness schema markup with correct city and service area',
                `Authority mentions on trusted ${city!.label} and industry sites`,
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

        {/* FINAL CTA */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-balance">
              Find every visibility gap for your {city!.label} {industry!.label.toLowerCase()}
            </h2>
            <p className="text-muted mb-8">
              The free scan checks GBP, citations, schema, and AI signals — and tells you exactly what is broken. No signup, no credit card, 30 seconds.
            </p>
            <Link href="/#scan">
              <Button variant="primary" size="lg" className="gap-2 shadow-glow-sm">
                <Radar className="w-4 h-4" />
                Scan my {city!.label} {industry!.label.toLowerCase()} — free
              </Button>
            </Link>
            <p className="text-xs text-muted mt-3">No signup · No credit card · 30 seconds</p>
          </div>
        </section>

        {/* RELATED LINKS */}
        <section className="py-10 px-4 md:px-8 border-t border-border bg-surface/40">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted mb-3">All cities — {industry!.plural}</p>
              <Link href={`/industries/${params.industry}`}>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-border bg-white text-xs text-muted hover:border-accent/30 hover:text-accent transition-colors cursor-pointer">
                  <span>{industry!.emoji}</span> {industry!.plural} visibility scanner
                </span>
              </Link>
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted mb-3">All industries — {city!.label}</p>
              <Link href={`/locations/${params.city}`}>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-border bg-white text-xs text-muted hover:border-accent/30 hover:text-accent transition-colors cursor-pointer">
                  <MapPin className="w-3 h-3" /> {city!.label} business visibility scanner
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
