'use client'

import { Button } from '@/components/ui/Button'
import { Check, ArrowRight, Tag } from 'lucide-react'

const FULL_PRICE  = 49.99
const PROMO_PRICE = 24.99
const PROMO_PCT   = 50

const included = [
  'Visibility scan across 4 AI engines',
  'Topic-by-topic score breakdown',
  'Overall AI visibility score (0–100)',
  'Prioritized 5-item action plan',
  'Schema & entity improvement tips',
  'Content gap analysis',
  'Shareable report link',
  'No subscription required',
]

export function PricingSection() {
  return (
    <section id="pricing" className="section">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Pricing</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Simple, honest pricing</h2>
        <p className="mt-4 text-foreground-dim max-w-xl mx-auto">
          No subscriptions. No hidden fees. Pay once, get your full report.
        </p>
      </div>

      <div className="max-w-sm mx-auto">
        {/* Promo banner above card */}
        <div className="mb-4 flex items-center gap-2 px-4 py-2.5 bg-green-500/10 border border-green-500/30 rounded-xl">
          <Tag className="w-4 h-4 text-green-400 flex-shrink-0" />
          <p className="text-sm text-green-400 font-semibold">
            🎉 {PROMO_PCT}% off your first scan — applied automatically at checkout
          </p>
        </div>

        <div className="card p-8 flex flex-col gap-6 shadow-glow-sm border-accent/30">

          {/* Price */}
          <div className="text-center">
            <p className="text-sm text-muted line-through mb-1">${FULL_PRICE.toFixed(2)}</p>
            <div className="flex items-end justify-center gap-1">
              <span className="text-5xl font-bold text-green-400">${Math.floor(PROMO_PRICE)}</span>
              <span className="text-green-400 text-2xl font-bold mb-1">.{String(PROMO_PRICE.toFixed(2).split('.')[1])}</span>
            </div>
            <p className="text-sm text-muted mt-1">first scan &middot; one-time &middot; no account needed</p>
            <p className="text-xs text-muted mt-0.5">${FULL_PRICE.toFixed(2)} per scan after that</p>
          </div>

          {/* Features */}
          <ul className="flex flex-col gap-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
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
            Run my scan now
            <ArrowRight className="w-4 h-4" />
          </Button>

          <p className="text-center text-xs text-muted">
            Powered by GPT-4o &middot; Secure payment via Stripe
          </p>
        </div>
      </div>
    </section>
  )
}
