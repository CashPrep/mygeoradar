'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'

const faqs = [
  {
    q: 'What exactly does this scan check?',
    a: 'We simulate how ChatGPT, Perplexity, Gemini, and Claude respond to real search queries related to your business and topics. Each engine gets an independent score (0–100) based on how likely it is to mention your business by name, the sentiment of that mention, and how prominently you appear. You also get a prioritized action plan to improve your visibility.',
  },
  {
    q: 'Is this different from regular SEO?',
    a: 'Yes — significantly. Traditional SEO optimizes for Google\'s algorithm (keywords, backlinks, crawl signals). GEO (Generative Engine Optimization) optimizes for how AI models retrieve and cite businesses. The signals are different: structured data, entity recognition, review depth, editorial mentions, and E-E-A-T content all matter more to AI engines than raw keyword density.',
  },
  {
    q: 'How accurate are the scores?',
    a: 'The scan uses GPT-4o to simulate AI engine behavior based on realistic criteria for each platform — ChatGPT\'s training data patterns, Perplexity\'s real-time retrieval bias, Gemini\'s Google ecosystem weighting, and Claude\'s editorial content preference. Scores reflect probability of citation, not a live query. Think of it as a strategic benchmark, not a live ping.',
  },
  {
    q: 'Do I need an account to get my report?',
    a: 'No. You enter your business details, pay $1, and your full report loads on-screen within ~20 seconds. Your report has a permanent shareable URL you can bookmark or forward — no login required.',
  },
  {
    q: 'Why is it only $1?',
    a: 'We priced it to remove every possible barrier to trying it. At $1 there\'s no reason not to — and we\'d rather have you see the value firsthand than convince you with a sales page. If it helps your business, run another scan after you\'ve made improvements.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-surface-2 transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-sm font-medium text-foreground">{q}</span>
        <ChevronDown
          className={clsx('w-4 h-4 text-muted flex-shrink-0 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-sm text-foreground-dim leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export function FaqSection() {
  return (
    <section id="faq" className="section">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">FAQ</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Common questions</h2>
        <p className="mt-4 text-foreground-dim max-w-xl mx-auto">
          Everything you need to know before running your first scan.
        </p>
      </div>
      <div className="max-w-2xl mx-auto flex flex-col gap-3">
        {faqs.map((faq) => (
          <FaqItem key={faq.q} q={faq.q} a={faq.a} />
        ))}
      </div>
    </section>
  )
}
