import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { QUESTIONS } from '@/lib/questions'
import { HelpCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'GEO & AI Visibility FAQ | MyGeoRadar',
  description: 'Answers to the most common questions about GEO, AI visibility, and how to get your business recommended by ChatGPT, Perplexity, Gemini, and Claude.',
  alternates: { canonical: 'https://www.mygeoradar.com/questions' },
}

export default function QuestionsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border bg-surface/50 pt-24">
          <div className="max-w-2xl mx-auto px-4 py-12 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold text-accent uppercase tracking-widest">FAQ</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">GEO & AI Visibility — Your Questions Answered</h1>
            <p className="text-muted leading-relaxed max-w-xl">
              Everything you need to know about Generative Engine Optimization, AI visibility scores, and how to get your business recommended by ChatGPT, Perplexity, Gemini, and Claude.
            </p>
          </div>
        </section>

        <section className="max-w-2xl mx-auto px-4 py-10">
          <div className="flex flex-col gap-3">
            {QUESTIONS.map(q => (
              <Link
                key={q.slug}
                href={`/questions/${q.slug}`}
                className="flex items-start justify-between gap-4 bg-surface border border-border rounded-2xl p-5 hover:border-accent/50 transition-colors group"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold group-hover:text-accent transition-colors">{q.question}</p>
                  <p className="text-xs text-muted leading-relaxed">{q.shortAnswer}</p>
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
