import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { QUESTIONS, getQuestionBySlug } from '@/lib/questions'
import { ArrowRight, HelpCircle, Lock } from 'lucide-react'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return QUESTIONS.map(q => ({ slug: q.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const q = getQuestionBySlug(params.slug)
  if (!q) return {}
  return {
    title: `${q.question} | MyGeoRadar`,
    description: q.shortAnswer,
    alternates: { canonical: `https://www.mygeoradar.com/questions/${q.slug}` },
    openGraph: {
      title: q.question,
      description: q.shortAnswer,
      url: `https://www.mygeoradar.com/questions/${q.slug}`,
    },
  }
}

export default function QuestionPage({ params }: Props) {
  const q = getQuestionBySlug(params.slug)
  if (!q) notFound()

  const related = QUESTIONS.filter(r => q.relatedSlugs.includes(r.slug))

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">

        {/* Hero */}
        <section className="border-b border-border bg-surface/50 pt-24">
          <div className="max-w-2xl mx-auto px-4 py-12 flex flex-col gap-5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
                <HelpCircle className="w-3 h-3" /> GEO FAQ
              </span>
              <Link href="/questions" className="text-xs text-muted hover:text-accent transition-colors">
                ← All Questions
              </Link>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold leading-tight">{q.question}</h1>

            <div className="rounded-2xl border border-accent/30 bg-accent/5 px-5 py-4">
              <p className="text-sm font-semibold leading-relaxed">{q.shortAnswer}</p>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-5">
          {q.body.map((para, i) => (
            <p key={i} className="text-sm text-muted leading-relaxed">{para}</p>
          ))}
        </section>

        {/* CTA */}
        <section className="max-w-2xl mx-auto px-4 pb-10">
          <div className="rounded-2xl border-2 border-accent/40 bg-surface p-6 flex flex-col gap-4 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-bold">Ready to act on this?</p>
                <p className="text-sm text-muted mt-1">
                  Run a free AI visibility scan to see exactly where your business stands — then get the
                  complete Found by AI Playbook with step-by-step fixes, copy-paste templates, and your
                  30-day action calendar.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white text-sm font-bold transition-colors"
              >
                Get My Free AI Score <ArrowRight className="w-4 h-4" />
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

        {/* Related questions */}
        {related.length > 0 && (
          <section className="border-t border-border bg-surface/30">
            <div className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-4">
              <h2 className="text-sm font-bold text-muted uppercase tracking-widest">Related Questions</h2>
              <div className="flex flex-col gap-2">
                {related.map(r => (
                  <Link
                    key={r.slug}
                    href={`/questions/${r.slug}`}
                    className="flex items-center justify-between gap-3 bg-surface border border-border rounded-xl px-4 py-3 hover:border-accent/50 hover:text-accent transition-colors group"
                  >
                    <span className="text-sm font-medium">{r.question}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted group-hover:text-accent shrink-0" />
                  </Link>
                ))}
              </div>
              <Link href="/questions" className="text-xs text-muted hover:text-accent transition-colors">
                View all questions →
              </Link>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  )
}
