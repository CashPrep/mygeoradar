'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'
import { SCAN_PRICE_USD } from '@/lib/constants'

const faqs = [
  {
    q: 'What exactly does this scan check?',
    a: 'We simulate how ChatGPT, Perplexity, Gemini, and Claude respond to real search queries related to your business and topics. Each engine gets an independent score (0\u2013100) based on how likely it is to mention your business by name, the sentiment of that mention, and how prominently you appear. You also get a prioritized action plan to improve your visibility.',
  },
  {
    q: 'Is this different from regular SEO?',
    a: "Yes \u2014 significantly. Traditional SEO optimizes for Google's algorithm (keywords, backlinks, crawl signals). GEO (Generative Engine Optimization) optimizes for how AI models retrieve and cite businesses. The signals are different: structured data, entity recognition, review depth, editorial mentions, and E-E-A-T content all matter more to AI engines than raw keyword density.",
  },
  {
    q: 'How is this different from just asking ChatGPT myself?',
    a: 'Asking ChatGPT yourself gives you one unstructured answer with no scoring, no competitive context, and no action plan. MyGeoRadar runs structured queries across four AI engines simultaneously, scores each one on a consistent 0\u2013100 rubric, and delivers a prioritized list of exactly what to fix \u2014 not just what the AI said.',
  },
  {
    q: 'What happens to my data?',
    a: 'Your business name and website are used only to run your scan. We do not sell your data, share it with third parties, or use it for training. Your report lives at a unique URL tied to your scan \u2014 only people you share that link with can see it. See our Privacy Policy for full details.',
  },
  {
    q: 'How accurate are the scores?',
    a: "The scan uses GPT-4o to simulate AI engine behavior based on realistic criteria for each platform \u2014 ChatGPT's training data patterns, Perplexity's real-time retrieval bias, Gemini's Google ecosystem weighting, and Claude's editorial content preference. Scores reflect probability of citation, not a live query. Think of it as a strategic benchmark, not a live ping.",
  },
  {
    q: 'Do I need an account to get my report?',
    a: `No. You enter your business details, pay $${SCAN_PRICE_USD.toFixed(2)}, and your full report loads on-screen within ~60 seconds. Your report has a permanent shareable URL you can bookmark or forward \u2014 no login required.`,
  },
  {
    q: 'Can I rescan after making improvements?',
    a: `Yes \u2014 and we encourage it. Once you've acted on your report (updating your website, building citations, improving reviews), run a fresh scan to see how your scores change. Additional scans are also $${SCAN_PRICE_USD.toFixed(2)}.`,
  },
  {
    q: 'Why does the scan cost money?',
    a: `Each scan runs live queries across four AI engines using GPT-4o, which has real API costs. The $${SCAN_PRICE_USD.toFixed(2)} one-time fee covers the cost of the scan and gives you a permanent, shareable report with a full action plan \u2014 no subscription required.`,
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
