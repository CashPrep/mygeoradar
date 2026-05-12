'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { ArrowRight, AlertTriangle, CheckCircle2, TrendingUp, XCircle, Zap } from 'lucide-react'
import { clsx } from 'clsx'
import { PROMO_PRICE_USD } from '@/lib/constants'

type Level = 'poor' | 'weak' | 'good' | 'excellent'

interface SnapshotResult {
  score:        number
  level:        Level
  headline:     string
  topIssues:    string[]
  businessName: string
  website:      string
}

const LEVEL_CONFIG: Record<Level, {
  label:       string
  color:       string
  bg:          string
  border:      string
  ringColor:   string
  icon:        React.ReactNode
}> = {
  poor:      { label: 'POOR',      color: 'text-danger',  bg: 'bg-danger/10',  border: 'border-danger/30',  ringColor: '#ef4444', icon: <XCircle      className="w-4 h-4" /> },
  weak:      { label: 'WEAK',      color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30', ringColor: '#f59e0b', icon: <AlertTriangle className="w-4 h-4" /> },
  good:      { label: 'GOOD',      color: 'text-accent',  bg: 'bg-accent/10',  border: 'border-accent/30',  ringColor: '#4f8ef7', icon: <TrendingUp   className="w-4 h-4" /> },
  excellent: { label: 'EXCELLENT', color: 'text-success', bg: 'bg-success/10', border: 'border-success/30', ringColor: '#22c55e', icon: <CheckCircle2  className="w-4 h-4" /> },
}

function ScoreRingMini({ score, level }: { score: number; level: Level }) {
  const size   = 96
  const sw     = 8
  const radius = (size - sw) / 2
  const circ   = 2 * Math.PI * radius
  const offset = circ - (score / 100) * circ
  const color  = LEVEL_CONFIG[level].ringColor

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#1e1e3a" strokeWidth={sw} />
        <circle
          cx={size/2} cy={size/2} r={radius}
          fill="none" stroke={color} strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-bold text-xl leading-none" style={{ color }}>{score}</span>
        <span className="text-muted text-[9px]">/100</span>
      </div>
    </div>
  )
}

export function SnapshotWidget() {
  const [businessName, setBusinessName] = useState('')
  const [website,      setWebsite]      = useState('')
  const [loading,      setLoading]      = useState(false)
  const [error,        setError]        = useState('')
  const [result,       setResult]       = useState<SnapshotResult | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  async function handleScan() {
    if (!businessName.trim()) return setError('Enter your business name.')
    if (!website.trim())      return setError('Enter your website URL.')
    setError('')
    setLoading(true)
    setResult(null)

    try {
      const res  = await fetch('/api/snapshot', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ businessName, website }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong.')
        setLoading(false)
        return
      }

      setResult(data)
      // Scroll to result smoothly after state update
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
    } catch {
      setError('Network error — please try again.')
    } finally {
      setLoading(false)
    }
  }

  const cfg = result ? LEVEL_CONFIG[result.level] : null

  return (
    <div className="w-full max-w-md flex flex-col gap-3">

      {/* Input card */}
      {!result && (
        <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">Free AI Visibility Snapshot</p>
            <span className="text-xs font-bold text-success bg-success/10 border border-success/20 px-2 py-0.5 rounded-full">
              FREE
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Business name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleScan()}
              className="w-full px-3 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/60 transition-colors"
            />
            <input
              type="text"
              placeholder="yourwebsite.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleScan()}
              className="w-full px-3 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/60 transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs text-danger flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> {error}
            </p>
          )}

          <Button
            variant="primary"
            className="w-full"
            loading={loading}
            onClick={handleScan}
          >
            {loading ? 'Scanning...' : 'Get My Free Score'}
            {!loading && <Zap className="w-4 h-4" />}
          </Button>

          <p className="text-xs text-muted text-center">
            No payment · No account · Takes ~5 seconds
          </p>
        </div>
      )}

      {/* Result card */}
      {result && cfg && (
        <div ref={resultRef} className={clsx('bg-surface border rounded-2xl p-5 flex flex-col gap-4', cfg.border)}>

          {/* Score header */}
          <div className="flex items-center gap-4">
            <ScoreRingMini score={result.score} level={result.level} />
            <div className="flex flex-col gap-1">
              <span className={clsx('text-xs font-bold px-2 py-0.5 rounded-full border w-fit flex items-center gap-1', cfg.color, cfg.bg, cfg.border)}>
                {cfg.icon} {cfg.label}
              </span>
              <p className="text-sm font-bold text-foreground leading-snug mt-1">{result.businessName}</p>
              <p className="text-xs text-muted">{result.website}</p>
            </div>
          </div>

          {/* Headline */}
          <p className={clsx('text-sm font-semibold leading-snug', cfg.color)}>
            {result.headline}
          </p>

          {/* Top issues */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-foreground-dim uppercase tracking-wider">What&apos;s hurting your score</p>
            {result.topIssues.map((issue, i) => (
              <div key={i} className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-danger shrink-0 mt-0.5" />
                <p className="text-xs text-foreground-dim leading-snug">{issue}</p>
              </div>
            ))}
          </div>

          {/* Upsell */}
          <div className="flex flex-col gap-2 pt-3 border-t border-border">
            <p className="text-xs text-muted">
              This is just your surface score. The full scan shows your exact breakdown across{' '}
              <span className="text-foreground font-semibold">ChatGPT, Perplexity, Gemini &amp; Claude</span>{' '}
              — plus a complete action plan to fix it.
            </p>
            <Button
              variant="primary"
              className="w-full"
              onClick={() => {
                const params = new URLSearchParams({
                  name: result.businessName,
                  url:  result.website,
                })
                window.location.href = `/scan?${params.toString()}`
              }}
            >
              Fix my score — Full scan ${PROMO_PRICE_USD.toFixed(2)}
              <ArrowRight className="w-4 h-4" />
            </Button>
            <button
              onClick={() => { setResult(null); setBusinessName(''); setWebsite('') }}
              className="text-xs text-muted hover:text-foreground-dim transition-colors text-center"
            >
              Scan a different business
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
