'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { ScoreRing } from '@/components/results/ScoreRing'
import { EngineCard } from '@/components/results/EngineCard'
import { ActionPlan } from '@/components/results/ActionPlan'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { ScanReport } from '@/lib/types'
import { getScoreColor, getScoreLabel } from '@/lib/utils'
import { Radar, Share2, RefreshCw } from 'lucide-react'
import { clsx } from 'clsx'

export default function ScanResultPage() {
  const { id }                    = useParams<{ id: string }>()
  const [report,   setReport]     = useState<ScanReport | null>(null)
  const [status,   setStatus]     = useState<'loading' | 'pending' | 'ready' | 'error'>('loading')
  const [pollCount, setPollCount] = useState(0)

  useEffect(() => {
    if (!id) return

    async function fetchReport() {
      try {
        const res  = await fetch(`/api/scan/${id}`)
        const data = await res.json()

        if (!res.ok) { setStatus('error'); return }

        if (data.paid && data.overall_score != null) {
          setReport({
            id:           data.id,
            createdAt:    data.created_at,
            businessName: data.business_name,
            website:      data.website,
            topics:       data.topics,
            location:     data.location,
            industry:     data.industry,
            paid:         data.paid,
            overallScore: data.overall_score,
            level:        data.level,
            engines:      data.engines,
            topActions:   data.top_actions,
            quickWins:    data.quick_wins,
          })
          setStatus('ready')
        } else if (data.paid) {
          setStatus('pending')
          setPollCount((c) => c + 1)
        } else {
          setStatus('pending')
          setPollCount((c) => c + 1)
        }
      } catch {
        setStatus('error')
      }
    }

    fetchReport()
    const interval = setInterval(fetchReport, 3000)
    return () => clearInterval(interval)
  }, [id])

  // Loading / pending state
  if (status !== 'ready') {
    const steps = [
      { label: 'Payment confirmed',        done: status !== 'loading' },
      { label: 'Querying ChatGPT',         done: pollCount > 2 },
      { label: 'Querying Perplexity',      done: pollCount > 4 },
      { label: 'Querying Gemini',          done: pollCount > 6 },
      { label: 'Querying Claude',          done: pollCount > 8 },
      { label: 'Generating action plan',   done: pollCount > 10 },
    ]
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-md mx-auto px-4 pt-32 pb-20 flex flex-col items-center gap-8">
          <div className="relative">
            <Radar className="w-16 h-16 text-accent animate-pulse" />
            <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-ping" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Scanning your business</h1>
            <p className="text-muted text-sm">Simulating AI engine queries. This takes about 20–30 seconds.</p>
          </div>
          <div className="w-full flex flex-col gap-2">
            {steps.map((s) => (
              <div key={s.label} className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-sm',
                s.done
                  ? 'border-success/30 bg-success/5 text-success'
                  : 'border-border bg-surface text-muted'
              )}>
                <span className={clsx('w-2 h-2 rounded-full flex-shrink-0', s.done ? 'bg-success' : 'bg-border')} />
                {s.label}
              </div>
            ))}
          </div>
          {status === 'error' && (
            <p className="text-danger text-sm text-center">Something went wrong. Please refresh or contact support.</p>
          )}
        </div>
      </main>
    )
  }

  if (!report) return null

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-20">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
          <div>
            <p className="text-sm text-muted mb-1">{report.businessName}</p>
            <h1 className="text-2xl md:text-3xl font-bold">AI Visibility Report</h1>
            <p className="text-sm text-muted mt-1">{report.website}{report.location ? ` · ${report.location}` : ''}</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigator.clipboard.writeText(window.location.href)}
          >
            <Share2 className="w-4 h-4" /> Share report
          </Button>
        </div>

        {/* Overall score */}
        <div className="card p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 mb-6">
          <ScoreRing score={report.overallScore} size={120} strokeWidth={10} />
          <div className="flex flex-col gap-2 text-center md:text-left">
            <Badge variant={report.level === 'excellent' ? 'success' : report.level === 'good' ? 'accent' : report.level === 'weak' ? 'warning' : 'danger'}>
              {getScoreLabel(report.overallScore)}
            </Badge>
            <h2 className="text-xl font-bold">Overall AI Visibility Score</h2>
            <p className="text-sm text-muted max-w-sm">
              Your business scores <span className={clsx('font-bold', getScoreColor(report.overallScore))}>{report.overallScore}/100</span> across ChatGPT, Perplexity, Gemini, and Claude.
            </p>
            <div className="flex flex-wrap gap-2 mt-1 justify-center md:justify-start">
              {report.topics.map((t) => <Badge key={t} variant="neutral" className="text-xs">{t}</Badge>)}
            </div>
          </div>
        </div>

        {/* Engine cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {report.engines.map((engine) => (
            <EngineCard key={engine.engine} engine={engine} />
          ))}
        </div>

        {/* Action plan */}
        <ActionPlan actions={report.topActions} quickWins={report.quickWins} />

        {/* Run again CTA */}
        <div className="mt-8 p-6 bg-surface-2 border border-border rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Run another scan</p>
            <p className="text-sm text-muted">Track your progress after making improvements.</p>
          </div>
          <Button variant="primary" onClick={() => window.location.href = '/scan'}>
            <RefreshCw className="w-4 h-4" /> New scan
          </Button>
        </div>
      </div>
    </main>
  )
}
