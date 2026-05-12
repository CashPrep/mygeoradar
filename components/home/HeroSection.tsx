'use client'

import { Button } from '@/components/ui/Button'
import { ArrowRight, AlertTriangle, CheckCircle2, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PROMO_PRICE_USD, FULL_PRICE_USD } from '@/lib/constants'

const engines = [
  { name: 'ChatGPT',    color: '#10a37f', score: 12 },
  { name: 'Perplexity', color: '#4f8ef7', score: 22 },
  { name: 'Gemini',     color: '#8b5cf6', score:  8 },
  { name: 'Claude',     color: '#f59e0b', score: 30 },
]

export function HeroSection() {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300)
    return () => clearTimeout(t)
  }, [])

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
          In 60 seconds, find out exactly where you stand — and what to fix.
        </p>

        {/* Mini score preview — animated bars */}
        <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-5 text-left flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">Sample AI Visibility Score</p>
            <span className="text-xs text-danger font-bold bg-danger/10 px-2 py-0.5 rounded-full animate-pulse">POOR</span>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-bold text-danger">18</span>
            <span className="text-2xl text-muted font-bold mb-1">/100</span>
          </div>
          <div className="flex flex-col gap-2">
            {engines.map((e) => (
              <div key={e.name} className="flex items-center gap-3">
                <span className="text-xs text-muted w-20 shrink-0">{e.name}</span>
                <div className="flex-1 h-1.5 bg-surface-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: animated ? `${e.score}%` : '0%',
                      backgroundColor: e.color,
                      transition: 'width 1s ease',
                    }}
                  />
                </div>
                <span className="text-xs text-muted w-6 text-right">{e.score}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted border-t border-border pt-3">
            ↑ This is what most businesses look like. Your scan shows your real numbers.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto px-8"
            onClick={() => window.location.href = '/scan'}
          >
            Scan my business now
            <ArrowRight className="w-4 h-4" />
          </Button>
          <p className="text-sm text-muted">
            <span className="line-through text-muted/60">${FULL_PRICE_USD.toFixed(2)}</span>{' '}
            <span className="text-green-400 font-semibold">${PROMO_PRICE_USD.toFixed(2)} first scan</span>
            {' '}· No account needed · Results in 60s
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <Users className="w-3.5 h-3.5 text-accent" />
            <span>
              <span className="font-semibold text-foreground-dim">1,247 businesses</span> scanned this week
            </span>
          </div>
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {[
            'One-time payment, no subscription',
            'Scans all 4 major AI engines',
            'Secure checkout via Stripe',
          ].map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span className="text-xs text-muted">{item}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
