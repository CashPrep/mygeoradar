'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, CheckCircle, AlertTriangle, XCircle,
  Loader2, Radar, ChevronDown, ChevronUp, ExternalLink,
} from 'lucide-react'
import { clsx } from 'clsx'

// ── Types ─────────────────────────────────────────────────
type Status = 'pass' | 'warn' | 'fail'
interface Check {
  id: string
  label: string
  status: Status
  impact: 'High' | 'Medium'
  detail: string
  fix: string
}
interface ScanResult {
  score: number
  url: string
  checks: Check[]
  meta: { title: string; description: string }
  scannedAt: string
}

// ── Score helpers ────────────────────────────────────────

function scoreLabel(s: number) {
  if (s >= 80) return { label: 'AI-Ready', color: 'text-emerald-600', ring: 'stroke-emerald-500' }
  if (s >= 55) return { label: 'Partially Visible', color: 'text-amber-500', ring: 'stroke-amber-400' }
  return { label: 'Hard to Read', color: 'text-red-500', ring: 'stroke-red-500' }
}

function ScoreRing({ score }: { score: number }) {
  const { label, color, ring } = scoreLabel(score)
  const r = 40
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="110" height="110" viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#e4e4e7" strokeWidth="10" />
        <circle
          cx="50" cy="50" r={r} fill="none" className={ring}
          strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          style={{ transition: 'stroke-dasharray 1s ease' }}
        />
      </svg>
      <div className="-mt-[82px] flex flex-col items-center">
        <span className={clsx('text-3xl font-black', color)}>{score}</span>
        <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">/ 100</span>
      </div>
      <p className={clsx('text-sm font-semibold mt-8', color)}>{label}</p>
    </div>
  )
}

// ── Check row ─────────────────────────────────────────────

function CheckRow({ check }: { check: Check }) {
  const [open, setOpen] = useState(false)
  const icon = check.status === 'pass'
    ? <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
    : check.status === 'warn'
    ? <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
    : <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />

  const rowBg = check.status === 'pass' ? 'bg-emerald-50 border-emerald-100'
    : check.status === 'warn' ? 'bg-amber-50 border-amber-100'
    : 'bg-red-50 border-red-100'

  return (
    <div className={clsx('rounded-lg border overflow-hidden', rowBg)}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:opacity-80 transition-opacity"
      >
        {icon}
        <span className="flex-1 text-sm font-medium text-foreground">{check.label}</span>
        <span className={clsx(
          'text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded',
          check.impact === 'High' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
        )}>
          {check.impact}
        </span>
        {open
          ? <ChevronUp className="w-3.5 h-3.5 text-muted flex-shrink-0" />
          : <ChevronDown className="w-3.5 h-3.5 text-muted flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 flex flex-col gap-2 border-t border-current/10">
          <p className="text-xs text-foreground/80 leading-relaxed">{check.detail}</p>
          {check.status !== 'pass' && (
            <div className="flex items-start gap-2 bg-white/60 rounded-md p-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent mt-0.5 flex-shrink-0">Fix</span>
              <p className="text-xs text-foreground/70 leading-relaxed">{check.fix}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Main component ───────────────────────────────────────

export function AiReadinessScan() {
  const [url, setUrl]           = useState('')
  const [bizName, setBizName]   = useState('')
  const [loading, setLoading]   = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult]     = useState<ScanResult | null>(null)
  const [error, setError]       = useState('')

  async function runScan(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    setProgress(0)

    // Fake progress animation while waiting
    const tick = setInterval(() => {
      setProgress(p => p < 85 ? p + Math.random() * 12 : p)
    }, 400)

    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim(), businessName: bizName.trim() }),
      })
      const data = await res.json()
      clearInterval(tick)
      setProgress(100)
      await new Promise(r => setTimeout(r, 300))
      if (data.error) { setError(data.error); setLoading(false); return }
      setResult(data)
    } catch {
      clearInterval(tick)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const failCount = result?.checks.filter(c => c.status === 'fail').length ?? 0
  const warnCount = result?.checks.filter(c => c.status === 'warn').length ?? 0
  const needsHelp = result && result.score < 75

  return (
    <div className="w-full max-w-2xl mx-auto">

      {/* ─ Form ─ */}
      {!result && (
        <form onSubmit={runScan} className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              required
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://yourbusiness.com"
              className="input-base flex-1"
            />
            <input
              type="text"
              value={bizName}
              onChange={e => setBizName(e.target.value)}
              placeholder="Business name (optional)"
              className="input-base sm:w-52"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="btn-primary w-full justify-center py-3.5 text-base"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Scanning…</>
            ) : (
              <><Radar className="w-4 h-4" /> Run Free AI Readiness Scan</>
            )}
          </button>
          <p className="text-xs text-muted text-center">
            Free, instant, no signup required · We only check publicly visible signals
          </p>
        </form>
      )}

      {/* ─ Progress bar ─ */}
      {loading && (
        <div className="mt-4">
          <div className="h-1.5 w-full bg-surface-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted text-center mt-2 animate-pulse">
            Checking HTTPS · robots.txt · schema · meta tags · structured data…
          </p>
        </div>
      )}

      {/* ─ Error ─ */}
      {error && (
        <div className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
          <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* ─ Results ─ */}
      {result && (
        <div className="flex flex-col gap-5">

          {/* Score header */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-surface border border-border shadow-card-hover">
            <ScoreRing score={result.score} />
            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs text-muted font-mono mb-1 break-all">{result.url}</p>
              <h3 className="text-lg font-bold mb-1">
                {result.score >= 80
                  ? 'Your site is well-structured for AI.'
                  : result.score >= 55
                  ? 'Your site has gaps AI crawlers will notice.'
                  : 'AI crawlers are likely struggling to read your site.'}
              </h3>
              <p className="text-sm text-muted">
                {failCount > 0 && `${failCount} critical issue${failCount > 1 ? 's' : ''} found. `}
                {warnCount > 0 && `${warnCount} warning${warnCount > 1 ? 's' : ''} to review. `}
                {failCount === 0 && warnCount === 0 && 'All checks passed. '}
                Click any row below for details and a fix.
              </p>
            </div>
          </div>

          {/* Checks list */}
          <div className="flex flex-col gap-2">
            {result.checks.map(c => <CheckRow key={c.id} check={c} />)}
          </div>

          {/* CTA — contextual */}
          {needsHelp ? (
            <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20 text-center">
              <p className="text-sm font-semibold mb-1">
                {failCount} critical issue{failCount !== 1 ? 's' : ''} are holding your site back from AI visibility.
              </p>
              <p className="text-xs text-muted mb-4 max-w-md mx-auto">
                The <strong className="text-foreground">Found by AI Playbook</strong> has a step-by-step fix for every one of these —
                with a 27-point checklist, prompt pack, and 30-day plan. One-time, $27.
              </p>
              <Link href="/playbook" className="btn-primary text-sm px-6 py-2.5">
                Fix these issues — Get the Playbook <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-emerald-800 mb-1">Your site\'s technical foundation is solid.</p>
              <p className="text-xs text-emerald-700 mb-4 max-w-md mx-auto">
                Technical structure is only one layer of AI visibility. The playbook covers the full picture:
                citation building, content authority, review signals, and ongoing monitoring —
                the things that actually make AI recommend you over competitors.
              </p>
              <Link href="/playbook" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
                See the full AI visibility system <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Scan again */}
          <button
            onClick={() => { setResult(null); setProgress(0); setError('') }}
            className="text-xs text-muted hover:text-accent transition-colors text-center"
          >
            ← Scan a different site
          </button>
        </div>
      )}
    </div>
  )
}
