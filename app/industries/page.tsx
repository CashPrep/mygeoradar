import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { INDUSTRIES, INDUSTRY_TAGS } from '@/lib/industries'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Visibility by Industry | MyGeoRadar',
  description:
    'See how ChatGPT, Perplexity, and Gemini rank local businesses in your industry. Check your AI GEO score for dentists, lawyers, restaurants, HVAC, and 70+ more industries.',
  alternates: { canonical: 'https://www.mygeoradar.com/industries' },
}

export default function IndustriesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">

        {/* Hero */}
        <section className="border-b border-border bg-surface/50 pt-24">
          <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              AI Visibility by Industry
            </h1>
            <p className="text-muted leading-relaxed max-w-xl">
              ChatGPT, Perplexity, and Gemini are now the first stop for local business
              recommendations. See how AI ranks businesses in your industry — and find out
              if your business shows up.
            </p>
          </div>
        </section>

        {/* Industry grid by tag */}
        <section className="max-w-5xl mx-auto px-4 py-12 flex flex-col gap-14">
          {INDUSTRY_TAGS.map(tag => {
            const tagIndustries = INDUSTRIES.filter(i => i.tag === tag)
            return (
              <div key={tag}>
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted mb-4">{tag}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {tagIndustries.map(industry => (
                    <Link
                      key={industry.slug}
                      href={`/industries/${industry.slug}`}
                      className="group bg-surface border border-border hover:border-accent/50 rounded-2xl p-5 flex flex-col gap-2 transition-all hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold group-hover:text-accent transition-colors">{industry.plural}</span>
                        <ArrowRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-xs text-muted leading-relaxed line-clamp-2">{industry.painPoint}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs text-muted">Avg AI score:</span>
                        <span className="text-xs font-bold text-orange-400">{industry.avgGeoScore}/100</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </section>

      </main>
      <Footer />
    </>
  )
}
