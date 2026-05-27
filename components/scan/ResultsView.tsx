'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ScoreRing } from './ScoreRing'
import { EngineCard } from './EngineCard'
import { ActionPlan } from './ActionPlan'
import type { ScanReport } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { ArrowRight, Zap, Share2, BookOpen, CheckCircle } from 'lucide-react'

export function ResultsView({ report }: { report: ScanReport }) {
  function share() {
    if (navigator.share) {
      navigator.share({ title: 'My AI Visibility Report', url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied!')
    }
  }

  const hasGaps = report.overallScore < 80

  return (
    <div className="max-w-4xl mx-auto px-4 flex flex-col gap-10">

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4">
        <Badge variant="accent">AI Visibility Report</Badge>
        <h1 className="text-3xl font-bold">{report.businessName}</h1>
        <p className="text-muted text-sm">{report.website} &middot; {formatDate(report.createdAt)}</p>
        <ScoreRing score={report.overallScore} size={160} />
        <p className="text-foreground-dim max-w-md text-sm leading-relaxed">
          Your overall AI visibility score across {report.engines.length} engines and {report.topics.length} topics.
        </p>
      </div>

      {/* Engine breakdown */}
      <div>
        <h2 className="text-xl font-bold mb-4">Engine Breakdown</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {report.engines.map((e) => (
            <EngineCard key={e.engine} result={e} />
          ))}
        </div>
      </div>

      {/* Action plan */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Your Action Plan</h2>
          <Badge variant="accent" className="text-xs">{report.topActions.length} actions</Badge>
        </div>
        <ActionPlan actions={report.topActions} />
      </div>

      {/* Quick wins */}
      {report.quickWins?.length > 0 && (
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-warning" />
            <h2 className="font-bold">Quick wins</h2>
          </div>
          <ul className="flex flex-col gap-2">
            {report.quickWins.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground-dim">
                <span className="text-warning mt-0.5">&#8250;</span>
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── PLAYBOOK UPSELL — shown after the user sees their gaps ── */}
      <div className="relative rounded-2xl border border-accent/30 bg-white overflow-hidden shadow-card-accent">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent" />

        <div className="p-7 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">

            {/* Icon */}
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/8 border border-accent/15 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-accent" />
            </div>

            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1.5">
                {hasGaps ? 'You have gaps. Here’s the complete fix.' : 'Keep the momentum going.'}
              </p>
              <h3 className="text-xl font-bold mb-2 tracking-tight">
                Found by AI — The AI Visibility Playbook
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-5">
                {hasGaps
                  ? 'This scan shows you where the gaps are. The playbook gives you the exact step-by-step system to close them — a 27-point checklist, 10 copy-paste audit prompts, and a 30-day action plan. One time, $27.'
                  : 'Your technical structure is solid. The playbook takes you deeper — covering content authority, citation building, and review signals that this scan doesn’t measure. One time, $27.'}
              </p>

              <ul className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
                {[
                  '27-point AI visibility checklist',
                  '10 copy-paste audit prompts',
                  '30-day action plan calendar',
                  '30-day money-back guarantee',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-1.5 text-xs text-muted">
                    <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Link href="/playbook">
                  <button className="btn-primary text-sm px-6 py-2.5 rounded-lg shadow-glow-xs">
                    Get the Playbook — $27 <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <span className="text-xs text-muted">One-time · Instant download · 30-day guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pb-10">
        <Button variant="primary" onClick={() => window.location.href = '/scan'}>
          Run another scan <ArrowRight className="w-4 h-4" />
        </Button>
        <Button variant="secondary" onClick={share}>
          <Share2 className="w-4 h-4" /> Share report
        </Button>
      </div>
    </div>
  )
}
