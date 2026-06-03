import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { INDUSTRIES, CITIES, getIndustry } from '@/lib/programmatic-data'
import {
  Radar,
  ArrowRight,
  MapPin,
  Search,
  FileText,
  Zap,
  CheckCircle,
  HelpCircle,
} from 'lucide-react'

type Props = { params: { industry: string } }

export async function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ industry: i.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = getIndustry(params.industry)
  if (!industry) return {}
  const title = `${industry.plural} Visibility Scanner — Google, Citations & AI Search | MyGeoRadar`
  const description = `Free visibility scan for ${industry.plural.toLowerCase()}. Find out if your business shows up on Google, in local directories, and in AI search results like ChatGPT and Perplexity. Takes 30 seconds.`
  return {
    title,
    description,
    openGraph: { title, description, url: `https://mygeoradar.com/${params.industry}` },
    alternates: { canonical: `https://mygeoradar.com/${params.industry}` },
  }
}

const VISIBILITY_PROBLEMS = [
  { icon: MapPin, label: 'Incomplete Google Business Profile', desc: 'Missing categories, no service descriptions, unverified listing — you won’t rank in the local map pack.' },
  { icon: Search, label: 'Inconsistent citations', desc: 'Your name, address, or phone number doesn’t match across directories. Google and AI systems distrust inconsistent data.' },
  { icon: FileText, label: 'Missing schema markup', desc: 'No structured data means search engines and AI models can’t confirm what your business does or where you are.' },
  { icon: Zap, label: 'Not visible in AI search', desc: 'ChatGPT, Perplexity, and Gemini recommend businesses by name — but only from sources with clean, authoritative signals.' },
]

const FAQS = [
  {
    q: 'Why do {plural} struggle with local search visibility?',
    a: '{Plural} often focus on service quality and word of mouth — which means the technical side of local SEO gets neglected. A single missing category on your GBP or a mismatched phone number across directories can quietly cost you dozens of new patients or clients every month.',
  },
  {
    q: 'Does it matter if ChatGPT or Perplexity recommends my business?',
    a: 'Yes — increasingly so. AI search tools are now the first stop for many consumers researching local {plural_lower}. These systems pull from structured data, trusted directories, and authoritative websites. If your signals are weak, you won’t appear in AI-generated recommendations even if your Google reviews are strong.',
  },
  {
    q: 'How long does the free scan take?',
    a: 'About 30 seconds. Paste your business URL and get a scored breakdown across all four visibility layers: GBP, citations, schema, and AI search signals. No signup required.',
  },
  {
    q: 'What can I do after the scan?',
    a: 'The scan tells you exactly which layers have gaps. You can then use the free findings to fix issues yourself, or grab one of the targeted fix guides ($19 each) that give you step-by-step instructions for that specific problem.',
  },
]

export default function IndustryHubPage({ params }: Props) {
  const industry = getIndustry(params.industry)
  if (!industry) notFound()

  const faqs = FAQS.map((f) => ({
    q: f.q.replace('{plural}', industry.plural.toLowerCase()).replace('{Plural}', industry.plural),
    a: f.a
      .replace(/{plural}/g, industry.plural.toLowerCase())
      .replace(/{plural_lower}/g, industry.plural.toLowerCase())
      .replace(/{Plural}/g, industry.plural),
  }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${industry.plural} Visibility Scanner`,
    description: `Free visibility scan for ${industry.plural.toLowerCase()} across Google, directories, and AI search.`,
    url: `https://mygeoradar.com/${params.industry}`,
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
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      {/* HERO */}
      <section className="pt-28 pb-16 px-4 md:px-8 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/8 border border-accent/20 text-accent text-xs font-medium mb-6">
            <span>{industry.emoji}</span>
            {industry.plural}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 text-balance">
            Is your {industry.label.toLowerCase()} business
            <br />
            <span className="text-gradient-accent">visible where it counts?</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-8 max-w-2xl">
            For {industry.plural.toLowerCase()}, {industry.painPhrase}. The free scan checks your
            Google Business Profile, directory citations, schema markup, and AI search signals in
            30 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/#scan">
              <Button variant="primary" size="lg" className="gap-2 shadow-glow-sm w-full sm:w-auto">
                <Radar className="w-4 h-4" />
                Scan my {industry.label.toLowerCase()} business
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

      {/* TOP PROBLEMS */}
      <section className="py-16 px-4 md:px-8 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">The 4 visibility gaps most {industry.plural.toLowerCase()} don’t know they have</h2>
          <p className="text-muted text-sm mb-8">Each one silently costs you new customers every week.</p>
          <div className="flex flex-col gap-4">
            {VISIBILITY_PROBLEMS.map(({ icon: Icon, label, desc }, i) => (
              <div key={label} className="flex gap-4 p-5 rounded-xl border border-border bg-surface hover:border-accent/20 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/8 border border-accent/15 flex items-center justify-center">
                  <span className="text-xs font-bold text-accent">{i + 1}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-3.5 h-3.5 text-accent" />
                    <p className="font-semibold text-sm">{label}</p>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CITY GRID */}
      <section className="py-16 px-4 md:px-8 border-b border-border bg-surface/40">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">{industry.plural} by city</h2>
          <p className="text-muted text-sm mb-8">
            Select your city for a tailored visibility breakdown.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {CITIES.map((city) => (
              <Link key={city.slug} href={`/${params.industry}/${city.slug}`}>
                <div className="flex flex-col gap-0.5 p-3 rounded-xl border border-border bg-white hover:border-accent/30 hover:shadow-sm transition-all cursor-pointer">
                  <span className="text-sm font-semibold">{city.label}</span>
                  <span className="text-xs text-muted">{city.stateAbbr}</span>
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
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">AI Search</span>
          </div>
          <h2 className="text-2xl font-bold mb-3">AI is now recommending {industry.plural.toLowerCase()} by name</h2>
          <p className="text-muted leading-relaxed mb-6">
            {industry.aiExample}. If you’re not optimized for AI search, you’re invisible to a
            growing share of potential customers — even if your Google reviews are strong.
          </p>
          <div className="flex flex-col gap-2">
            {[
              'Consistent NAP across all directories',
              'Verified and complete Google Business Profile',
              'LocalBusiness schema markup on your website',
              'Authority mentions on trusted local sites',
              'FAQ content that answers common patient/client questions',
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
            Find every visibility gap in your {industry.label.toLowerCase()} business
          </h2>
          <p className="text-muted mb-8">
            The free scan checks all four layers — GBP, citations, schema, and AI signals — and
            tells you exactly what’s broken. No signup, no credit card.
          </p>
          <Link href="/#scan">
            <Button variant="primary" size="lg" className="gap-2 shadow-glow-sm">
              <Radar className="w-4 h-4" />
              Scan my {industry.label.toLowerCase()} business — free
            </Button>
          </Link>
          <p className="text-xs text-muted mt-3">No signup · No credit card · 30 seconds</p>
        </div>
      </section>

      {/* RELATED INDUSTRIES */}
      <section className="py-10 px-4 md:px-8 border-t border-border bg-surface/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted mb-4">Other industries</p>
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.filter((i) => i.slug !== params.industry).map((i) => (
              <Link key={i.slug} href={`/${i.slug}`}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-white text-xs text-muted hover:border-accent/30 hover:text-accent transition-colors cursor-pointer">
                  <span>{i.emoji}</span> {i.plural}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
