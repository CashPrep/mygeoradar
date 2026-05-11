'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import type { ScanReport, EngineResult, ActionItem } from '@/lib/types'
import { getScoreColor, getScoreHex, formatScore } from '@/lib/utils'
import { Radar, Share2, RefreshCw, Zap } from 'lucide-react'
import { clsx } from 'clsx'

function ScoreRing({ score, size = 100, strokeWidth = 8 }: { score: number; size?: number; strokeWidth?: number }) {
  const radius       = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset       = circumference - (score / 100) * circumference
  const color        = getScoreHex(score)
  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#1e1e3a" strokeWidth={strokeWidth} />
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-bold leading-none" style={{ fontSize: size * 0.22, color }}>{score}</span>
        <span className="text-muted" style={{ fontSize: size * 0.1 }}>/100</span>
      </div>
    </div>
  )
}

const ENGINE_ICONS: Record<string, string> = { chatgpt: '🤖', perplexity: '🔍', gemini: '✨', claude: '🧠' }

function EngineCard({ engine }: { engine: EngineResult }) {
  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{ENGINE_ICONS[engine.engine] ?? '🔮'}</span>
          <span className="font-semibold text-foreground">{engine.engineLabel}</span>
        </div>
        <ScoreRing score={engine.overallScore} size={56} strokeWidth={5} />
      </div>
      <p className="text-sm text-foreground-dim leading-relaxed">{engine.summary}</p>
      <div className="flex flex-col gap-2">
        {engine.topics.map((t) => (
          <div key={t.topic}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-foreground-dim truncate max-w-[70%]">{t.topic}</span>
              <span className={clsx('text-xs font-bold', getScoreColor(t.score))}>{t.score}</span>
            </div>
            <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{
                width: `${t.score}%`,
                background: t.score >= 80 ? '#22c55e' : t.score >= 60 ? '#4f8ef7' : t.score >= 40 ? '#f59e0b' : '#ef4444'
              }} />
            </div>
            {t.snippet && <p className="text-xs text-muted mt-1.5 italic leading-relaxed">&ldquo;{t.snippet}&rdquo;</p>}
          </div>
        ))}
      </div>
    </div>
  )
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
  content: 'Content', schema: 'Schema', entity: 'Entity', authority: 'Authority', technical: 'Technical',
}

function ActionPlan({ actions, quickWins }: { actions: ActionItem[]; quickWins: string[] }) {
  return (
    <div className="flex flex-col gap-6">
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
      <div className="card p-5">
        <h3 className="font-semibold text-foreground mb-4">Full Action Plan</h3>
        <div className="flex flex-col gap-3">
          {actions.map((action, i) => (
            <div key={i} className="p-4 bg-surface-2 border border-border rounded-xl flex flex-col gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={clsx('text-xs px-2 py-0.5 rounded-full border font-medium', PRIORITY_COLORS[action.priority])}>{action.priority}</span>
                <span className="text-xs px-2 py-0.5 rounded-full border border-border bg-surface text-muted">{CATEGORY_LABELS[action.category] ?? action.category}</span>
                <span className={clsx('text-xs px-2 py-0.5 rounded-full border font-medium ml-auto', EFFORT_COLORS[action.effort])}>{action.effort}</span>
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

export default function ScanResultPage() {
  const { id }                     = useParams<{ id: string }>()
  const [report,    setReport]     = useState<ScanReport | null>(null)
  const [status,    setStatus]     = useState<'loading' | 'pending' | 'ready' | 'error'>('loading')
  const [pollCount, setPollCount]  = useState(0)

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
        } else {
          setStatus('pending')
          setPollCount((c) => c + 1)
        }
      } catch { setStatus('error') }
    }
    fetchReport()
    const interval = setInterval(fetchReport, 3000)
    return () => clearInterval(interval)
  }, [id])

  if (status !== 'ready') {
    const steps = [
      { label: 'Payment confirmed',      done: status !== 'loading' },
      { label: 'Querying ChatGPT',       done: pollCount > 2 },
      { label: 'Querying Perplexity',    done: pollCount > 4 },
      { label: 'Querying Gemini',        done: pollCount > 6 },
      { label: 'Querying Claude',        done: pollCount > 8 },
      { label: 'Generating action plan', done: pollCount > 10 },
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
                s.done ? 'border-success/30 bg-success/5 text-success' : 'border-border bg-surface text-muted'
              )}>
                <span className={clsx('w-2 h-2 rounded-full flex-shrink-0', s.done ? 'bg-success' : 'bg-border')} />
                {s.label}
              </div>
            ))}
          </div>
          {status === 'error' && <p className="text-danger text-sm text-center">Something went wrong. Please refresh or contact support.</p>}
        </div>
      </main>
    )
  }

  if (!report) return null

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-20">
        <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
          <div>
            <p className="text-sm text-muted mb-1">{report.businessName}</p>
            <h1 className="text-2xl md:text-3xl font-bold">AI Visibility Report</h1>
            <p className="text-sm text-muted mt-1">{report.website}{report.location ? ` · ${report.location}` : ''}</p>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="flex items-center gap-2 px-4 py-2 bg-surface-2 border border-border rounded-xl text-sm font-medium hover:border-accent transition-colors"
          >
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>

        <div className="card p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 mb-6">
          <ScoreRing score={report.overallScore} size={120} strokeWidth={10} />
          <div className="flex flex-col gap-2 text-center md:text-left">
            <span className={clsx('text-sm font-bold', getScoreColor(report.overallScore))}>{formatScore(report.overallScore)}</span>
            <h2 className="text-xl font-bold">Overall AI Visibility Score</h2>
            <p className="text-sm text-muted max-w-sm">
              Your business scores <span className={clsx('font-bold', getScoreColor(report.overallScore))}>{report.overallScore}/100</span> across ChatGPT, Perplexity, Gemini, and Claude.
            </p>
            <div className="flex flex-wrap gap-2 mt-1 justify-center md:justify-start">
              {report.topics.map((t) => (
                <span key={t} className="px-2 py-0.5 bg-surface-2 border border-border rounded-lg text-xs text-muted">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {report.engines.map((engine) => <EngineCard key={engine.engine} engine={engine} />)}
        </div>

        <ActionPlan actions={report.topActions} quickWins={report.quickWins} />

        <div className="mt-8 p-6 bg-surface-2 border border-border rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Run another scan</p>
            <p className="text-sm text-muted">Track your progress after making improvements.</p>
          </div>
          <button
            onClick={() => { window.location.href = '/scan' }}
            className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-colors text-sm"
          >
            <RefreshCw className="w-4 h-4" /> New scan
          </button>
        </div>
      </div>
    </main>
  )
}
