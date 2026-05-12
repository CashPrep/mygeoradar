'use client'

import { Button } from '@/components/ui/Button'
import { ArrowRight, AlertTriangle, CheckCircle2, Users } from 'lucide-react'
import { PROMO_PRICE_USD, FULL_PRICE_USD } from '@/lib/constants'
import { SnapshotWidget } from './SnapshotWidget'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-28 pb-24 overflow-hidden">
      <div className="absolute inset-0 glow-top pointer-events-none" />
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-8">

        {/* Urgency pill */}
        <div className="flex items-center gap-2 bg-danger/10 border border-danger/30 rounded-full px-4 py-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-danger" />
          <span className="text-xs font-semibold text-danger tracking-wide">
            92% of local businesses score under 30/100 on AI search
          </span>
        </div>

        {/* Headline — pain first */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight">
          You&apos;re invisible<br />
          <span className="text-gradient">to AI search.</span><br />
          <span className="text-foreground-dim text-3xl sm:text-4xl md:text-5xl font-semibold">
            Find out how bad it is.
          </span>
        </h1>

        <p className="text-base md:text-lg text-foreground-dim max-w-xl leading-relaxed">
          ChatGPT, Perplexity, Gemini, and Claude are replacing Google for buying decisions.
          Get your free score in 5 seconds — then unlock the full breakdown.
        </p>

        {/* FREE snapshot widget — the hero CTA */}
        <SnapshotWidget />

        {/* Secondary CTA — skip to full scan */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-muted">Want the full 5-section report right away?</p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.location.href = '/scan'}
          >
            Skip to full scan — ${PROMO_PRICE_USD.toFixed(2)}
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Social proof + trust strip */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <Users className="w-3.5 h-3.5 text-accent" />
            <span>
              <span className="font-semibold text-foreground-dim">1,247 businesses</span> scanned this week
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {[
              'Free score, no account needed',
              'Full scan across 4 AI engines',
              'Secure checkout via Stripe',
            ].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                <span className="text-xs text-muted">{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
