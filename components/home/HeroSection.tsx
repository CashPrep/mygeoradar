'use client'

import { Button } from '@/components/ui/Button'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const stats = [
  { value: '4', label: 'AI engines checked' },
  { value: '$1', label: 'one-time, no account' },
  { value: '<60s', label: 'to your full report' },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-28 pb-24 overflow-hidden">

      {/* Subtle top glow only — no dot grid, no rings */}
      <div className="absolute inset-0 glow-top pointer-events-none" />
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-7">

        {/* Eyebrow */}
        <div className="flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-medium text-foreground-dim tracking-wide">
            AI search is replacing Google. Is your business ready?
          </span>
        </div>

        {/* Headline — no gradient text on the main message, gradient only on the pivot word */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight">
          Your business is invisible
          <br />
          <span className="text-gradient">to AI search.</span>
          <br />
          <span className="text-foreground">We’ll show you why.</span>
        </h1>

        <p className="text-base md:text-lg text-foreground-dim max-w-xl leading-relaxed">
          ChatGPT, Perplexity, Gemini and Claude are answering millions of
          purchase decisions every day. See exactly where your business stands
          — and get a real plan to fix it.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto px-8"
            onClick={() => window.location.href = '/scan'}
          >
            Run your AI radar scan
            <ArrowRight className="w-4 h-4" />
          </Button>
          <button
            className="text-sm text-muted hover:text-foreground-dim transition-colors"
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
          >
            See how it works ↓
          </button>
        </div>

        {/* Trust micro-copy */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {[
            'One-time $1 payment',
            'No account required',
            'Secure checkout via Stripe',
          ].map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span className="text-xs text-muted">{item}</span>
            </div>
          ))}
        </div>

        {/* Stat bar */}
        <div className="w-full max-w-lg mt-2 grid grid-cols-3 divide-x divide-border border border-border rounded-xl bg-surface overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center py-4 px-2">
              <span className="text-xl font-bold text-foreground">{s.value}</span>
              <span className="text-xs text-muted mt-0.5 text-center leading-snug">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Founder line */}
        <p className="text-xs text-muted">
          Built by Andrew Garber &middot; Elon University AI Scholar
        </p>

      </div>
    </section>
  )
}
