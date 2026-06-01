import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { COMPARISONS, getComparisonBySlug } from '@/lib/comparisons'
import { ArrowRight, Scale, CheckCircle } from 'lucide-react'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return COMPARISONS.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getComparisonBySlug(params.slug)
  if (!c) return {}
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `https://www.mygeoradar.com/comparisons/${c.slug}` },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: `https://www.mygeoradar.com/comparisons/${c.slug}`,
    },
  }
}

export default function ComparisonPage({ params }: Props) {
  const c = getComparisonBySlug(params.slug)
  if (!c) notFound()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">

        {/* Hero */}
        <section className="border-b border-border bg-surface/50 pt-24">
          <div className="max-w-2xl mx-auto px-4 py-12 flex flex-col gap-5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
                <Scale className="w-3 h-3" /> Comparison
              </span>
              <Link href="/comparisons" className="text-xs text-muted hover:text-accent transition-colors">
                ← All Comparisons
              </Link>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold leading-tight">{c.title}</h1>

            <div className="flex items-center gap-3">
              <span className="font-bold px-3 py-1.5 rounded-xl bg-accent/10 border border-accent/30 text-accent text-sm">{c.entityA}</span>
              <span className="text-sm text-muted font-medium">vs</span>
              <span className="font-bold px-3 py-1.5 rounded-xl bg-surface-2 border border-border text-foreground text-sm">{c.entityB}</span>
            </div>

            <p className="text-muted leading-relaxed">{c.summary}</p>
          </div>
        </section>

        {/* Comparison table */}
        <section className="max-w-2xl mx-auto px-4 py-10">
          <h2 className="text-lg font-bold mb-4">{c.entityA} vs {c.entityB}: Point by Point</h2>
          <div className="rounded-2xl border border-border overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-surface-2 border-b border-border">
              <div className="px-4 py-3 text-xs font-bold text-muted uppercase tracking-wider">Category</div>
              <div className="px-4 py-3 text-xs font-bold text-accent uppercase tracking-wider border-l border-border">{c.entityA}</div>
              <div className="px-4 py-3 text-xs font-bold text-muted uppercase tracking-wider border-l border-border">{c.entityB}</div>
            </div>
            {/* Rows */}
            {c.points.map((pt, i) => (
              <div key={pt.label} className={`grid grid-cols-3 border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-surface' : 'bg-background'}`}>
                <div className="px-4 py-3 text-xs font-semibold text-muted">{pt.label}</div>
                <div className="px-4 py-3 text-xs text-foreground border-l border-border leading-relaxed">{pt.a}</div>
                <div className="px-4 py-3 text-xs text-muted border-l border-border leading-relaxed">{pt.b}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Verdict */}
        <section className="max-w-2xl mx-auto px-4 pb-10">
          <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-5 flex gap-4">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">The Verdict</p>
              <p className="text-sm text-muted leading-relaxed">{c.verdict}</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-2xl mx-auto px-4 pb-10">
          <div className="rounded-2xl border-2 border-accent/40 bg-surface p-6 flex flex-col gap-4 shadow-lg">
            <div>
              <p className="text-sm font-bold">See where you stand right now</p>
              <p className="text-sm text-muted mt-1">
                Understanding the difference is one thing. Knowing exactly where your business scores
                across all five AI platforms is what lets you take action.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white text-sm font-bold transition-colors"
              >
                {c.ctaText} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/playbook"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-accent/40 text-accent hover:bg-accent/5 text-sm font-semibold transition-colors"
              >
                View the Playbook <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Related comparisons */}
        <section className="border-t border-border bg-surface/30">
          <div className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-4">
            <h2 className="text-sm font-bold text-muted uppercase tracking-widest">More Comparisons</h2>
            <div className="flex flex-wrap gap-2">
              {COMPARISONS.filter(r => r.slug !== c.slug)
                .slice(0, 6)
                .map(rel => (
                  <Link
                    key={rel.slug}
                    href={`/comparisons/${rel.slug}`}
                    className="text-xs px-3 py-1.5 rounded-full bg-surface border border-border hover:border-accent/50 hover:text-accent transition-colors"
                  >
                    {rel.entityA} vs {rel.entityB}
                  </Link>
                ))}
              <Link
                href="/comparisons"
                className="text-xs px-3 py-1.5 rounded-full bg-surface border border-border hover:border-accent/50 hover:text-accent transition-colors"
              >
                All Comparisons →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
