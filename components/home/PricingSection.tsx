'use client'

import { Button } from '@/components/ui/Button'
import { Check, ArrowRight, Zap, Lock, RefreshCw } from 'lucide-react'
import { SCAN_PRICE_USD, PROMO_PRICE_USD, PROMO_DISCOUNT_PCT, RESCAN_PRICE_USD } from '@/lib/constants'

const included = [
  'Scores across ChatGPT, Perplexity, Gemini & Claude',
  'Prioritized 5-step fix plan',
  'Schema & content gap analysis',
  'Permanent shareable report link',
]

export function PricingSection() {
  return (
    <section id="pricing" className="section">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Pricing</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">One scan. One payment.</h2>
        <p className="mt-4 text-foreground-dim max-w-xl mx-auto">
          No monthly fees. No subscriptions. Pay only when you scan.
        </p>
      </div>

      <div className="max-w-sm mx-auto flex flex-col gap-4">

        {/* First scan promo card */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 bg-green-500/10 border border-green-500/30 rounded-xl">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-green-400 shrink-0" />
            <p className="text-sm font-bold text-green-400">First scan — {PROMO_DISCOUNT_PCT}% off</p>
          </div>
          <p className="text-xs text-muted whitespace-nowrap">Applied at checkout</p>
        </div>

        <div className="card p-8 flex flex-col gap-6 border-accent/20 shadow-glow-sm">
          <div className="text-center">
            <p className="text-sm text-muted line-through mb-1">${SCAN_PRICE_USD.toFixed(2)}</p>
            <div className="flex items-end justify-center gap-1">
              <span className="text-6xl font-extrabold text-green-400">${Math.floor(PROMO_PRICE_USD)}</span>
              <span className="text-green-400 text-2xl font-bold mb-2">.{String(PROMO_PRICE_USD.toFixed(2).split('.')[1])}</span>
            </div>
            <p className="text-sm font-semibold text-green-400 mt-1">your first scan</p>
          </div>

          <ul className="flex flex-col gap-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span className="text-sm text-foreground-dim">{item}</span>
              </li>
            ))}
          </ul>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => window.location.href = '/scan'}
          >
            Get my report for ${PROMO_PRICE_USD.toFixed(2)}
            <ArrowRight className="w-4 h-4" />
          </Button>

          <div className="flex items-center justify-center gap-2 text-xs text-muted">
            <Lock className="w-3 h-3" />
            <span>Secure payment via Stripe &middot; Results in ~60 seconds</span>
          </div>
        </div>

        {/* Rescan pricing — transparent, no sticker shock */}
        <div className="flex items-center gap-3 px-4 py-3 bg-surface border border-border rounded-xl">
          <RefreshCw className="w-4 h-4 text-muted shrink-0" />
          <p className="text-sm text-muted">
            Already a customer?{' '}
            <span className="text-foreground font-medium">Rescans are ${RESCAN_PRICE_USD.toFixed(2)}</span>
            {' '}— a loyalty discount applied automatically at checkout.
          </p>
        </div>

      </div>
    </section>
  )
}
