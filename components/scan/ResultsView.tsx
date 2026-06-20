'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ScoreRing } from './ScoreRing'
import { EngineCard } from './EngineCard'
import { ActionPlan } from './ActionPlan'
import type { ScanReport } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { ArrowRight, Zap, Share2, BookOpen, CheckCircle, BookMarked, Lock } from 'lucide-react'

// Maps scan check IDs to relevant guide slugs and labels
const ISSUE_GUIDE_MAP: Record<string, { label: string; href: string }> = {
  schema:           { label: 'How to Add Schema Markup',           href: '/guides' },
  'llms-txt':       { label: 'How to Create an llms.txt File',     href: '/guides' },
  robots:           { label: 'How to Fix Your robots.txt for AI',  href: '/guides' },
  gbp:              { label: 'How to Complete Your GBP',           href: '/guides' },
  nap:              { label: 'How to Fix NAP Inconsistency',       href: '/guides' },
  'meta-desc':      { label: 'How to Write AI-Optimized Meta Descriptions', href: '/guides' },
  citations:        { label: 'How to Build AI-Trusted Citations',  href: '/guides' },
  'page-speed':     { label: 'Core Web Vitals & AI Crawlability',  href: '/guides' },
}

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

  // Find top 3 actions that have a matching guide
  const topGuides = (report.topActions ?? [])
    .map((action: { checkId?: string; id?: string }) => {
      const id = action.checkId ?? action.id ?? ''
      return ISSUE_GUIDE_MAP[id] ? { ...ISSUE_GUIDE_MAP[id], id } : null
    })
    .filter(Boolean)
    .slice(0, 3) as { label: string; href: string; id: string }[]

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
            {report.quickWins.map((w: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground-dim">
                <span className="text-warning mt-0.5">&#8250;</span>
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── GUIDE FUNNEL — shown when we have matched guides ── */}
      {topGuides.length > 0 && (
        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-white flex items-center gap-2">
            <BookMarked className="w-4 h-4 text-accent" />
            <p className="font-semibold text-sm">Fix the easy wins yourself — free guides</p>
          </div>
          <div className="p-5 flex flex-col gap-3">
            <p className="text-xs text-muted mb-1">
              Based on your scan results, these guides are most relevant to your site:
            </p>
            {topGuides.map(({ label, href, id }) => (
              <Link
                key={id}
                href={href}
                className="flex items-center gap-3 p-3.5 rounded-lg bg-white border border-border hover:border-accent/25 hover:shadow-card-lift transition-all duration-200"
              >
                <BookOpen className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm font-medium flex-1">{label}</span>
                <ArrowRight className="w-4 h-4 text-accent flex-shrink-0" />
              </Link>
            ))}
            <p className="text-xs text-muted pt-1">
              Came from your scan? Fix one issue here, then{' '}
              <Link href="/playbook" className="text-accent font-semibold hover:underline">
                unlock your full report
              </Link>{' '}
              to see everything else.
            </p>
          </div>
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
              <Lock className="w-6 h-6 text-accent" />
            </div>

            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1.5">
                {hasGaps ? 'You have gaps. Here is the complete fix.' : 'Keep the momentum going.'}
              </p>
              <h3 className="text-xl font-bold mb-2 tracking-tight">
                Found by AI — The AI Visibility Playbook
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-1">
                {hasGaps
                  ? 'This scan shows you where the gaps are. The playbook gives you the exact step-by-step system to close them — a 27-point checklist, 10 copy-paste audit prompts, and a 30-day action plan.'
                  : 'Your technical structure is solid. The playbook takes you deeper — covering content authority, citation building, and review signals this scan does not measure.'}
              </p>
              <p className="text-xs text-accent font-semibold mb-4">
                ⚡ Beta pricing — price increases as we add more checks
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
                  <button className="btn-primary text-sm px-6 py-2.5 rounded-lg shadow-glow-xs inline-flex items-center gap-2">
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
        <Button variant="primary" onClick={() => window.location.href = '/#scan'}>
          Run another scan <ArrowRight className="w-4 h-4" />
        </Button>
        <Button variant="secondary" onClick={share}>
          <Share2 className="w-4 h-4" /> Share report
        </Button>
      </div>
    </div>
  )
}
