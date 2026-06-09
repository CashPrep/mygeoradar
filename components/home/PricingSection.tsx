'use client'

import { Button } from '@/components/ui/Button'
import { Check, ArrowRight, Lock, RefreshCw } from 'lucide-react'
import { SCAN_PRICE_USD, RESCAN_PRICE_USD } from '@/lib/constants'

const included = [
  'Scores across ChatGPT, Perplexity, Gemini & Claude',
  'Prioritized 5-step fix plan',
  'Schema & content gap analysis',
  'Permanent shareable report link',
]

export function PricingSection() {
  return (
    <section id="pricing" className="section">
      <div className="text-center mb-10 md:mb-14">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Pricing</p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">One scan. One payment.</h2>
        <p className="mt-4 text-foreground-dim max-w-xl mx-auto">
          No monthly fees. No subscriptions. Pay only when you scan.
        </p>
      </div>

      <div className="max-w-sm mx-auto flex flex-col gap-4">

        <div className="card p-6 md:p-8 flex flex-col gap-6 border-accent/20 shadow-glow-sm">
          <div className="text-center">
            <div className="flex items-end justify-center gap-1">
              <span className="text-5xl md:text-6xl font-extrabold text-accent">${Math.floor(SCAN_PRICE_USD)}</span>
              <span className="text-accent text-xl md:text-2xl font-bold mb-2">.{String(SCAN_PRICE_USD.toFixed(2).split('.')[1])}</span>
            </div>
            <p className="text-sm font-semibold text-foreground-dim mt-1">one-time · no subscription</p>
          </div>

          <ul className="flex flex-col gap-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
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
            Get my report
            <ArrowRight className="w-4 h-4" />
          </Button>

          <div className="flex items-center justify-center gap-2 text-xs text-muted">
            <Lock className="w-3 h-3" />
            <span>Secure payment via Stripe &middot; Results in ~60 seconds</span>
          </div>
        </div>

        {/* Rescan pricing */}
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
