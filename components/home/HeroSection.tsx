'use client'

import { Button } from '@/components/ui/Button'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { PROMO_PRICE_USD } from '@/lib/constants'
import { SnapshotWidget } from './SnapshotWidget'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 md:pt-28 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 glow-top pointer-events-none" />
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center gap-6 md:gap-8">

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
          Does AI recommend<br />
          <span className="text-gradient">your business?</span>
        </h1>

        <p className="text-sm md:text-base md:text-lg text-foreground-dim max-w-md leading-relaxed">
          Get a free score in seconds. See exactly where you stand on ChatGPT, Perplexity, Gemini, and Claude.
        </p>

        {/* FREE score widget */}
        <div className="w-full">
          <SnapshotWidget />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {[
            'Free score — no account needed',
            'Covers all 4 major AI engines',
            'Secure checkout via Stripe',
          ].map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span className="text-xs text-muted">{item}</span>
            </div>
          ))}
        </div>

        {/* Visual separator before paid CTA */}
        <div className="w-full max-w-sm flex items-center gap-3 mt-1 md:mt-2">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* PAID full report CTA — visually distinct */}
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-xs text-muted">Want the full deep-dive right now?</p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.location.href = '/scan'}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Get full AI report — ${PROMO_PRICE_USD.toFixed(2)}
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
          <p className="text-xs text-muted opacity-70">One-time payment &middot; Instant results</p>
        </div>

      </div>
    </section>
  )
}
