'use client'

import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import { PROMO_PRICE_USD, SCAN_PRICE_USD } from '@/lib/constants'

export function CtaBanner() {
  return (
    <section className="px-4 md:px-8 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-surface border border-border p-10 md:p-16 text-center flex flex-col items-center gap-6">

          <div className="absolute inset-0 glow-top pointer-events-none" />
          <div className="absolute inset-0 bg-dots opacity-20" />

          <div className="relative z-10 flex flex-col items-center gap-6 w-full">

            <div className="flex items-center gap-2 bg-danger/10 border border-danger/30 rounded-full px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />
              <span className="text-xs font-semibold text-danger">Your competitors are already optimizing for AI search</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-bold tracking-tight max-w-2xl">
              Every day you wait,<br />
              <span className="text-gradient">someone else gets the recommendation.</span>
            </h2>

            <p className="text-foreground-dim max-w-lg mx-auto text-sm md:text-base">
              Find out exactly where your business stands across all 4 major AI engines — and get a real plan to fix it.
            </p>

            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto px-10"
              onClick={() => window.location.href = '/scan'}
            >
              Run my scan — ${PROMO_PRICE_USD.toFixed(2)} first scan
              <ArrowRight className="w-4 h-4" />
            </Button>

            <p className="text-xs text-muted">
              50% off your first scan &middot; normally{' '}
              <span className="line-through text-muted/60">${SCAN_PRICE_USD.toFixed(2)}</span>{' '}
              &middot; No account &middot; Secure Stripe checkout
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
