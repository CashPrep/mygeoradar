'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, CheckCircle, AlertTriangle, XCircle,
  Loader2, Radar, Lock, ExternalLink, RotateCcw, ChevronDown, Monitor,
} from 'lucide-react'
import { clsx } from 'clsx'
import { EmailGate } from '@/components/scan/EmailGate'
import { PlatformFeasibilityBadge } from '@/components/scan/PlatformFeasibilityBadge'
import {
  PLATFORM_LIST, PLATFORMS, type PlatformId,
  getCheckFeasibility, getPlatformNote,
} from '@/lib/platforms'

type Status = 'pass' | 'warn' | 'fail'
interface FreeCheck {
  id: string
  label: string
  status: Status
  impact: 'High' | 'Medium'
  feasibility?: string
  platformNote?: string
}
interface ScanResult {
  scanId: string | null
  score: number
  url: string
  checks: FreeCheck[]
  scannedAt: string
  platform?: string
}

function safeHostname(url: string): string {
  try { return new URL(url).hostname } catch { return url }
}

function scoreLabel(s: number) {
  if (s >= 80) return { label: 'AI-Ready',          color: 'text-emerald-600', ring: 'stroke-emerald-500' }
  if (s >= 55) return { label: 'Partially Visible',  color: 'text-amber-500',   ring: 'stroke-amber-400'  }
  return               { label: 'Hard to Read',      color: 'text-red-500',     ring: 'stroke-red-500'    }
}

function ScoreRing({ score }: { score: number }) {
  const { label, color, ring } = scoreLabel(score)
  const r    = 40
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

function statusIcon(status: Status) {
  if (status === 'pass') return <CheckCircle  className="w-4 h-4 text-emerald-500 flex-shrink-0" />
  if (status === 'warn') return <AlertTriangle className="w-4 h-4 text-amber-400  flex-shrink-0" />
  return                        <XCircle       className="w-4 h-4 text-red-500    flex-shrink-0" />
}

function statusBg(status: Status) {
  if (status === 'pass') return 'bg-emerald-50 border-emerald-100'
  if (status === 'warn') return 'bg-amber-50   border-amber-100'
  return                        'bg-red-50     border-red-100'
}

const SCAN_PLATFORMS = PLATFORM_LIST.filter(p => p.id !== 'other')

export function AiReadinessScan() {
  const [url,        setUrl]        = useState('')
  const [bizName,    setBizName]    = useState('')
  const [platform,   setPlatform]   = useState<PlatformId | ''>('')
  const [loading,    setLoading]    = useState(false)
  const [progress,   setProgress]   = useState(0)
  const [result,     setResult]     = useState<ScanResult | null>(null)
  const [error,      setError]      = useState('')
  const [paying,     setPaying]     = useState(false)
  const [expandNote, setExpandNote] = useState<string | null>(null)

  function reset() {
    setResult(null); setProgress(0); setError('')
    setUrl(''); setBizName(''); setPlatform('')
    setExpandNote(null)
  }

  async function runScan(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return
    setLoading(true); setError(''); setResult(null); setProgress(0)

    const tick = setInterval(() => {
      setProgress(p => p < 85 ? p + Math.random() * 12 : p)
    }, 400)

    try {
      const res  = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim(), businessName: bizName.trim(), platform: platform || undefined }),
      })
      const data: ScanResult & { error?: string } = await res.json()
      clearInterval(tick)
      setProgress(100)
      await new Promise(r => setTimeout(r, 300))
      if (data.error) { setError(data.error); setLoading(false); return }

      // Sync platform state from API response so feasibility badges
      // always reflect what the server actually used for annotation
      if (data.platform) setPlatform(data.platform as PlatformId)

      setResult(data)
    } catch {
      clearInterval(tick)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function unlockReport() {
    if (!result?.scanId) return
    setPaying(true)
    try {
      const res  = await fetch('/api/report-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scanId: result.scanId }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setError('Could not start checkout. Please try again.')
    } catch {
      setError('Could not start checkout. Please try again.')
    } finally {
      setPaying(false)
    }
  }

  const failCount  = result?.checks.filter(c => c.status === 'fail').length ?? 0
  const warnCount  = result?.checks.filter(c => c.status === 'warn').length ?? 0
  const issueCount = failCount + warnCount

  const fixableCount = platform && result
    ? result.checks
        .filter(c => c.status !== 'pass')
        .filter(c => getCheckFeasibility(c.id, platform) === 'full')
        .length
    : null

  const selectedPlatform = platform ? PLATFORMS[platform] : null

  return (
    <div className="w-full max-w-2xl mx-auto">

      {/* ── Form ── */}
      {!result && (
        <form onSubmit={runScan} className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url" required value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://yourbusiness.com"
              className="input-base flex-1"
            />
            <input
              type="text" value={bizName}
              onChange={e => setBizName(e.target.value)}
              placeholder="Business name (optional)"
              className="input-base sm:w-52"
            />
          </div>

          {/* Platform selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-muted uppercase tracking-wide flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5" />
              What platform is your site on?
              <span className="normal-case font-normal text-muted/70">(optional — get platform-specific fixes)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {SCAN_PLATFORMS.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlatform(prev => prev === p.id ? '' : p.id as PlatformId)}
                  className={clsx(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                    platform === p.id
                      ? 'bg-accent/10 border-accent/40 text-accent'
                      : 'bg-surface-2 border-border text-muted hover:border-accent/30 hover:text-foreground',
                  )}
                >
                  <span>{p.emoji}</span>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
            {selectedPlatform ? (
              <p className="text-xs text-accent/80">
                ✓ Results will show exactly what you can fix on <strong>{selectedPlatform.label}</strong>. Tap again to deselect.
              </p>
            ) : (
              <p className="text-xs text-muted">
                Select your platform and every failing check will show whether you can fix it yourself or if it needs a developer.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="btn-primary w-full justify-center py-3.5 text-base"
          >
            {loading
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Scanning&hellip;</>
              : <><Radar   className="w-4 h-4" /> Run Free AI Readiness Scan</>}
          </button>
          <p className="text-xs text-muted text-center">
            Free &middot; Instant &middot; No signup required
          </p>
        </form>
      )}

      {/* ── Progress ── */}
      {loading && (
        <div className="mt-4">
          <div
            role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Scan progress"
            className="h-1.5 w-full bg-surface-2 rounded-full overflow-hidden"
          >
            <div className="h-full bg-accent rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-muted text-center mt-2 animate-pulse">
            Checking HTTPS &middot; robots.txt &middot; schema &middot; meta tags &middot; structured data&hellip;
          </p>
        </div>
      )}

      {/* ── Error ── */}
      {error && (
        <div className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
          <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* ── Results ── */}
      {result && (
        <div className="flex flex-col gap-5">

          <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-surface border border-border">
            <p className="text-sm text-muted">
              Results for{' '}
              <span className="font-mono font-medium text-foreground">{safeHostname(result.url)}</span>
              {selectedPlatform && (
                <span className="ml-2 text-muted">&middot; {selectedPlatform.emoji} {selectedPlatform.label}</span>
              )}
            </p>
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 transition-colors flex-shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Scan another site
            </button>
          </div>

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
                {failCount > 0 && (
                  <span className="text-red-600 font-semibold">
                    {failCount} critical issue{failCount > 1 ? 's' : ''}{warnCount > 0 ? ' · ' : ''}
                  </span>
                )}
                {warnCount > 0 && (
                  <span className="text-amber-500 font-semibold">
                    {warnCount} warning{warnCount > 1 ? 's' : ''}
                  </span>
                )}
                {failCount === 0 && warnCount === 0 && 'All checks passed.'}
              </p>
              {selectedPlatform && issueCount > 0 && fixableCount !== null && (
                <p className="text-xs text-muted mt-1.5">
                  On <span className="font-semibold text-foreground">{selectedPlatform.label}</span>:{' '}
                  <span className="text-emerald-600 font-semibold">{fixableCount} you can fix yourself</span>
                  {fixableCount < issueCount && (
                    <span className="text-amber-600 font-semibold">
                      {' '}· {issueCount - fixableCount} need an app or developer
                    </span>
                  )}
                </p>
              )}
              {!selectedPlatform && issueCount > 0 && (
                <p className="text-xs text-muted/70 mt-1.5 italic">
                  Tip: re-scan with your platform selected to see which issues you can fix yourself.
                </p>
              )}
            </div>
          </div>

          {/* Checks list */}
          <div className="flex flex-col gap-2">
            {result.checks.map(c => {
              const feasibility    = getCheckFeasibility(c.id, platform || null)
              const note           = getPlatformNote(c.id, platform || null)
              const showNote       = expandNote === c.id
              const hasPlatform    = !!platform
              const platformFixHint: string | null = hasPlatform && c.status !== 'pass' && note ? note : null

              return (
                <div key={c.id} className="flex flex-col rounded-lg border overflow-hidden">
                  <div className={clsx('flex items-center gap-3 px-4 py-3', statusBg(c.status))}>
                    {statusIcon(c.status)}
                    <span className="flex-1 text-sm font-medium text-foreground">{c.label}</span>
                    <span className={clsx(
                      'text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded flex-shrink-0',
                      c.impact === 'High' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500',
                    )}>
                      {c.impact}
                    </span>
                    {hasPlatform && c.status !== 'pass' && (
                      <PlatformFeasibilityBadge feasibility={feasibility} note={note} />
                    )}
                    {hasPlatform && c.status !== 'pass' && note && (
                      <button
                        onClick={() => setExpandNote(showNote ? null : c.id)}
                        aria-label={showNote ? 'Hide platform note' : 'Show platform note'}
                        className="flex-shrink-0 text-muted hover:text-foreground transition-colors"
                      >
                        <ChevronDown className={clsx('w-3.5 h-3.5 transition-transform', showNote && 'rotate-180')} />
                      </button>
                    )}
                  </div>
                  {showNote && platformFixHint && (
                    <div className="px-4 py-2.5 bg-white border-t border-border text-xs text-muted leading-relaxed">
                      <span className="font-semibold text-foreground">{selectedPlatform?.emoji} {selectedPlatform?.label}: </span>
                      {platformFixHint}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {platform && issueCount > 0 && (
            <div className="flex flex-wrap gap-3 px-1 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Fixable — you can do this in {selectedPlatform?.label}</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> Needs App — requires a plugin or app</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> Needs Dev — beyond platform limits</span>
            </div>
          )}

          <EmailGate
            scanId={result.scanId}
            score={result.score}
            url={result.url}
            failCount={failCount}
            warnCount={warnCount}
          />

          {issueCount > 0 && (
            <div className="rounded-xl border border-accent/25 bg-white shadow-card-accent overflow-hidden">
              <div className="p-5 text-center">
                <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-accent/8 border border-accent/15 mb-3">
                  <Lock className="w-4 h-4 text-accent" />
                </div>
                <p className="text-sm font-semibold mb-1">
                  {issueCount} issue{issueCount !== 1 ? 's' : ''} found on{' '}
                  <span className="font-mono">{safeHostname(result.url)}</span>
                </p>
                <p className="text-xs text-muted mb-4 max-w-xs mx-auto">
                  {selectedPlatform
                    ? `Get a step-by-step fix guide tailored for ${selectedPlatform.label} — including which issues you can fix yourself vs. which need help.`
                    : 'Get a step-by-step fix guide for each issue — exactly what to do, in what order, with validation steps.'}
                </p>
                <button
                  onClick={unlockReport}
                  disabled={paying}
                  className="btn-primary gap-2 text-sm px-6 py-2.5"
                >
                  {paying
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Redirecting&hellip;</>
                    : <>Get My {issueCount} Fix Guide{issueCount !== 1 ? 's' : ''} &mdash; $9.99 <ArrowRight className="w-4 h-4" /></>}
                </button>
                <p className="text-xs text-muted/60 mt-2.5">
                  One-time &middot; Instant access &middot; Only the fixes your site needs
                </p>
              </div>
            </div>
          )}

          {failCount === 0 && warnCount === 0 && (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-emerald-800 mb-1">Your site&apos;s technical foundation is solid.</p>
              <p className="text-xs text-emerald-700 mb-4 max-w-md mx-auto">
                Technical structure is only one layer. The playbook covers citation building,
                content authority, review signals, and ongoing monitoring —
                the things that actually make AI recommend you over competitors.
              </p>
              <Link
                href="/playbook"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors"
              >
                See the full AI visibility system <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
