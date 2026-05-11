'use client'

import { Button } from '@/components/ui/Button'
import { ArrowRight, Radar } from 'lucide-react'

export function CtaBanner() {
  return (
    <section className="px-4 md:px-8 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-surface border border-border p-8 md:p-14 text-center flex flex-col items-center gap-6">

          {/* Background glow */}
          <div className="absolute inset-0 glow-top pointer-events-none" />
          <div className="absolute inset-0 bg-dots opacity-20" />

          <div className="relative z-10 flex flex-col items-center gap-6 w-full">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Radar className="w-7 h-7 text-accent" />
            </div>

            <div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                Is your business on the{' '}
                <span className="text-gradient">AI radar?</span>
              </h2>
              <p className="mt-4 text-foreground-dim max-w-lg mx-auto text-sm md:text-base">
                Most businesses have no idea how AI engines talk about them. Find out in 60 seconds.
              </p>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => window.location.href = '/scan'}
            >
              Run your scan for $1
              <ArrowRight className="w-4 h-4" />
            </Button>

            <p className="text-xs text-muted">No account required &middot; Results in under 60 seconds</p>
          </div>
        </div>
      </div>
    </section>
  )
}
