'use client'

import { useState, useRef } from 'react'
import { ArrowRight, AlertTriangle, CheckCircle2, TrendingUp, XCircle, Zap, Loader2 } from 'lucide-react'
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
  label:     string
  color:     string
  bg:        string
  border:    string
  ringColor: string
  icon:      React.ReactNode
}> = {
  poor:      { label: 'POOR',      color: 'text-danger',  bg: 'bg-danger/10',  border: 'border-danger/30',  ringColor: '#ef4444', icon: <XCircle      className="w-4 h-4" /> },
  weak:      { label: 'WEAK',      color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30', ringColor: '#f59e0b', icon: <AlertTriangle className="w-4 h-4" /> },
  good:      { label: 'GOOD',      color: 'text-accent',  bg: 'bg-accent/10',  border: 'border-accent/30',  ringColor: '#4f8ef7', icon: <TrendingUp   className="w-4 h-4" /> },
  excellent: { label: 'EXCELLENT', color: 'text-success', bg: 'bg-success/10', border: 'border-success/30', ringColor: '#22c55e', icon: <CheckCircle2  className="w-4 h-4" /> },
}

function normalizeUrl(raw: string): string {
  const s = raw.trim()
  if (!s) return s
  if (/^https?:\/\//i.test(s)) return s
  return 'https://' + s
}

function isValidUrl(raw: string): boolean {
  try {
    const url = new URL(normalizeUrl(raw))
    // must have a real-looking hostname (at least one dot)
    return url.hostname.includes('.')
  } catch {
    return false
  }
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
  const [result,       setResult]       = useState<SnapshotResult | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  // Per-field error state
  const [nameError, setNameError]   = useState('')
  const [urlError,  setUrlError]    = useState('')

  function validateFields(): boolean {
    let valid = true
    if (!businessName.trim()) {
      setNameError('Enter your business name.')
      valid = false
    } else {
      setNameError('')
    }
    if (!website.trim()) {
      setUrlError('Enter your website URL.')
      valid = false
    } else if (!isValidUrl(website)) {
      setUrlError('Enter a valid URL, e.g. yoursite.com')
      valid = false
    } else {
      setUrlError('')
    }
    return valid
  }

  async function handleScan() {
    if (!validateFields()) return
    setLoading(true)
    setResult(null)

    try {
      const res  = await fetch('/api/snapshot', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ businessName: businessName.trim(), website: normalizeUrl(website) }),
      })
      const data = await res.json()

      if (!res.ok) {
        setUrlError(data.error || 'Something went wrong. Please try again.')
        return
      }

      setResult(data as SnapshotResult)
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120)
    } catch {
      setUrlError('Network error \u2014 please try again.')
    } finally {
      setLoading(false)
    }
  }

  const cfg = result ? LEVEL_CONFIG[result.level] : null

  return (
    <div className="w-full max-w-md flex flex-col gap-3">

      {/* ── Input card ── */}
      {!result && (
        <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">Free AI Visibility Snapshot</p>
            <span className="text-xs font-bold text-success bg-success/10 border border-success/20 px-2 py-0.5 rounded-full">FREE</span>
          </div>

          <div className="flex flex-col gap-2">
            {/* Business name field */}
            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="Business name"
                value={businessName}
                disabled={loading}
                onChange={(e) => { setBusinessName(e.target.value); if (nameError) setNameError('') }}
                onKeyDown={(e) => { if (e.key === 'Enter') handleScan() }}
                aria-invalid={!!nameError}
                className={clsx(
                  'w-full px-3 py-2.5 rounded-xl bg-surface-2 border text-sm text-foreground placeholder:text-muted focus:outline-none transition-colors disabled:opacity-50',
                  nameError
                    ? 'border-danger/60 focus:border-danger'
                    : 'border-border focus:border-accent/60'
                )}
              />
              {nameError && (
                <p className="text-xs text-danger flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 shrink-0" />{nameError}
                </p>
              )}
            </div>

            {/* URL field */}
            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="yourwebsite.com"
                value={website}
                disabled={loading}
                onChange={(e) => { setWebsite(e.target.value); if (urlError) setUrlError('') }}
                onKeyDown={(e) => { if (e.key === 'Enter') handleScan() }}
                aria-invalid={!!urlError}
                className={clsx(
                  'w-full px-3 py-2.5 rounded-xl bg-surface-2 border text-sm text-foreground placeholder:text-muted focus:outline-none transition-colors disabled:opacity-50',
                  urlError
                    ? 'border-danger/60 focus:border-danger'
                    : 'border-border focus:border-accent/60'
                )}
              />
              {urlError && (
                <p className="text-xs text-danger flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 shrink-0" />{urlError}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleScan}
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition-all shadow-glow-sm hover:shadow-glow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Scanning&hellip;</>
            ) : (
              <><Zap className="w-4 h-4" /> Get My Free Score</>
            )}
          </button>

          <p className="text-xs text-muted text-center">No payment \u00b7 No account \u00b7 Takes ~5 seconds</p>
        </div>
      )}

      {/* ── Result card ── */}
      {result && cfg && (
        <div ref={resultRef} className={clsx('bg-surface border rounded-2xl p-5 flex flex-col gap-4', cfg.border)}>

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

          <p className={clsx('text-sm font-semibold leading-snug', cfg.color)}>{result.headline}</p>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-foreground-dim uppercase tracking-wider">What&apos;s hurting your score</p>
            {result.topIssues.map((issue, i) => (
              <div key={i} className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-danger shrink-0 mt-0.5" />
                <p className="text-xs text-foreground-dim leading-snug">{issue}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-3 border-t border-border">
            <p className="text-xs text-muted">
              This is your surface score. The full scan reveals your exact breakdown across{' '}
              <span className="text-foreground font-semibold">ChatGPT, Perplexity, Gemini &amp; Claude</span>{' '}
              \u2014 plus a complete fix-it action plan.
            </p>
            <button
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition-all shadow-glow-sm hover:shadow-glow-md"
              onClick={() => {
                const p = new URLSearchParams({ name: result.businessName, url: result.website })
                window.location.href = `/scan?${p.toString()}`
              }}
            >
              Fix my score \u2014 Full scan ${PROMO_PRICE_USD.toFixed(2)}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setResult(null); setBusinessName(''); setWebsite(''); setNameError(''); setUrlError('') }}
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
