'use client'

import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Lock, ArrowRight } from 'lucide-react'

const sampleEngines = [
  { label: 'ChatGPT',    score: 34, color: '#10a37f' },
  { label: 'Perplexity', score: 61, color: '#4f8ef7' },
  { label: 'Gemini',     score: 22, color: '#8b5cf6' },
  { label: 'Claude',     score: 45, color: '#f59e0b' },
]

export function SampleResult() {
  return (
    <section className="section">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Sample output</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What your report looks like</h2>
        <p className="mt-4 text-foreground-dim max-w-xl mx-auto">
          Here&apos;s a preview of the report you get. The full version includes your scores, action plan, and engine breakdown.
        </p>
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Card */}
        <div className="card p-6 flex flex-col gap-6">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted mb-1">Sample Business</p>
              <h3 className="font-semibold text-foreground">Peak Legal Group</h3>
              <p className="text-xs text-muted">peaklegal.com</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted mb-1">Overall Score</p>
              <p className="text-3xl font-bold text-warning">41</p>
              <Badge variant="warning" className="text-xs">Weak</Badge>
            </div>
          </div>

          {/* Engine bars */}
          <div className="flex flex-col gap-3">
            {sampleEngines.map((e) => (
              <div key={e.label} className="flex items-center gap-3">
                <p className="text-sm text-foreground-dim w-20 shrink-0">{e.label}</p>
                <div className="flex-1 h-2 bg-surface-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${e.score}%`, backgroundColor: e.color }}
                  />
                </div>
                <p className="text-sm font-semibold w-8 text-right" style={{ color: e.color }}>
                  {e.score}
                </p>
              </div>
            ))}
          </div>

          {/* Blurred action plan */}
          <div className="relative">
            <div className="flex flex-col gap-2 blur-sm select-none pointer-events-none">
              {['Add FAQ schema markup to your homepage', 'Create a dedicated \'About\' page with E-E-A-T signals', 'Publish a case study mentioning your service area'].map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-surface-2 rounded-lg">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <span className="text-xs text-accent font-bold">{i + 1}</span>
                  </div>
                  <p className="text-sm text-foreground">{a}</p>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="flex items-center gap-2 bg-surface border border-border rounded-lg px-4 py-2">
                <Lock className="w-4 h-4 text-accent" />
                <p className="text-sm font-medium">Unlock your full action plan</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA below */}
        <div className="mt-6 flex justify-center">
          <Button variant="primary" size="lg" onClick={() => window.location.href = '/scan'}>
            Get my real report
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
