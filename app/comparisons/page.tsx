import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { COMPARISONS } from '@/lib/comparisons'
import { Scale, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'GEO & AI Visibility Comparisons | MyGeoRadar',
  description: 'Side-by-side comparisons of GEO vs SEO, ChatGPT vs Google, Perplexity vs ChatGPT, and more. Find out which strategies and tools matter most for AI visibility.',
  alternates: { canonical: 'https://www.mygeoradar.com/comparisons' },
}

export default function ComparisonsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border bg-surface/50 pt-24">
          <div className="max-w-2xl mx-auto px-4 py-12 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold text-accent uppercase tracking-widest">Comparisons</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">GEO vs. Everything</h1>
            <p className="text-muted leading-relaxed max-w-xl">
              Side-by-side breakdowns of AI visibility strategies, platforms, and tools — so you know exactly where to focus your effort.
            </p>
          </div>
        </section>

        <section className="max-w-2xl mx-auto px-4 py-10">
          <div className="flex flex-col gap-3">
            {COMPARISONS.map(c => (
              <Link
                key={c.slug}
                href={`/comparisons/${c.slug}`}
                className="flex items-start justify-between gap-4 bg-surface border border-border rounded-2xl p-5 hover:border-accent/50 transition-colors group"
              >
                <div className="flex flex-col gap-1.5">
                  <p className="text-sm font-semibold group-hover:text-accent transition-colors">{c.title}</p>
                  <p className="text-xs text-muted leading-relaxed">{c.summary}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent">{c.entityA}</span>
                    <span className="text-xs text-muted">vs</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-surface-2 border border-border text-foreground">{c.entityB}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted group-hover:text-accent shrink-0 mt-0.5 transition-colors" />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
