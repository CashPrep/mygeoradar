'use client'

import type { ActionItem } from '@/lib/types'
import { clsx } from 'clsx'
import { Zap } from 'lucide-react'

const EFFORT_LABELS: Record<string, string> = {
  easy:   'Easy',
  medium: 'Medium',
  hard:   'Hard',
}

const EFFORT_COLORS: Record<string, string> = {
  easy:   'text-success border-success/30 bg-success/10',
  medium: 'text-warning border-warning/30 bg-warning/10',
  hard:   'text-danger  border-danger/30  bg-danger/10',
}

const PRIORITY_COLORS: Record<string, string> = {
  high:   'bg-danger/10  text-danger  border-danger/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  low:    'bg-surface-2  text-muted   border-border',
}

const CATEGORY_LABELS: Record<string, string> = {
  content:   'Content',
  schema:    'Schema',
  entity:    'Entity',
  authority: 'Authority',
  technical: 'Technical',
}

interface ActionPlanProps {
  actions:    ActionItem[]
  quickWins:  string[]
}

export function ActionPlan({ actions, quickWins }: ActionPlanProps) {
  return (
    <div className="flex flex-col gap-6">

      {/* Quick wins */}
      {quickWins.length > 0 && (
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-warning" />
            <h3 className="font-semibold text-foreground">Quick Wins</h3>
            <span className="text-xs text-muted">Do these first</span>
          </div>
          <div className="flex flex-col gap-2">
            {quickWins.map((win, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="w-5 h-5 rounded-full bg-warning/10 border border-warning/20 text-warning text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-foreground-dim leading-relaxed">{win}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full action plan */}
      <div className="card p-5">
        <h3 className="font-semibold text-foreground mb-4">Full Action Plan</h3>
        <div className="flex flex-col gap-3">
          {actions.map((action, i) => (
            <div key={i} className="p-4 bg-surface-2 border border-border rounded-xl flex flex-col gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={clsx('text-xs px-2 py-0.5 rounded-full border font-medium', PRIORITY_COLORS[action.priority])}>
                  {action.priority}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full border border-border bg-surface text-muted">
                  {CATEGORY_LABELS[action.category] ?? action.category}
                </span>
                <span className={clsx('text-xs px-2 py-0.5 rounded-full border font-medium ml-auto', EFFORT_COLORS[action.effort])}>
                  {EFFORT_LABELS[action.effort]}
                </span>
              </div>
              <p className="text-sm font-semibold text-foreground">{action.title}</p>
              <p className="text-sm text-foreground-dim leading-relaxed">{action.description}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
