'use client'

import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ScoreRing } from './ScoreRing'
import { EngineCard } from './EngineCard'
import { ActionPlan } from './ActionPlan'
import type { ScanReport } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { ArrowRight, Zap, Share2 } from 'lucide-react'

export function ResultsView({ report }: { report: ScanReport }) {
  function share() {
    if (navigator.share) {
      navigator.share({ title: 'My AI Visibility Report', url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied!')
    }
  }

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

      {/* Actions */}
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
