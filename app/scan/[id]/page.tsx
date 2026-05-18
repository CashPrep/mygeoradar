'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { OnboardingChecklist } from '@/components/scan/OnboardingChecklist'
import { createSupabaseBrowser } from '@/lib/supabase-browser'
import type {
  ScanReport, EngineResult, ActionItem,
  SchemaCheck, ContentGapItem, GbpSignal, CompetitorGap
} from '@/lib/types'
import { getScoreColor, getScoreHex, formatScore } from '@/lib/utils'
import {
  Radar, Share2, RefreshCw, Zap, Code2, MessageSquareText,
  MapPin, CheckCircle2, XCircle, AlertCircle, ChevronDown, ChevronUp,
  Swords, TrendingUp, ArrowRight, LineChart, Wrench, CalendarClock,
  Mail, Loader2, Search, Eye, EyeOff
} from 'lucide-react'
import { clsx } from 'clsx'

// ─── Enrichment Skeleton ─────────────────────────────────────────────────────

function EnrichmentSkeleton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="card p-5 flex flex-col gap-4 animate-pulse">
      <div className="flex items-center gap-2">
        <span className="text-accent opacity-50">{icon}</span>
        <span className="text-sm font-semibold text-muted">{label}</span>
        <span className="ml-auto text-xs text-muted">Analyzing…</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-3 bg-surface-2 rounded-full w-full" />
        <div className="h-3 bg-surface-2 rounded-full w-4/5" />
        <div className="h-3 bg-surface-2 rounded-full w-3/5" />
      </div>
      <div className="flex gap-2">
        <div className="h-7 bg-surface-2 rounded-lg w-24" />
        <div className="h-7 bg-surface-2 rounded-lg w-20" />
        <div className="h-7 bg-surface-2 rounded-lg w-28" />
      </div>
    </div>
  )
}

// ─── Score Ring ───────────────────────────────────────────────────────────────

function ScoreRing({ score, size = 100, strokeWidth = 8 }: { score: number; size?: number; strokeWidth?: number }) {
  const radius        = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset        = circumference - (score / 100) * circumference
  const color         = getScoreHex(score)
  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#27272a" strokeWidth={strokeWidth} />
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

// ─── Engine Card ──────────────────────────────────────────────────────────────

const ENGINE_ICONS: Record<string, string> = { chatgpt: '🤖', perplexity: '🔍', gemini: '✨', claude: '🧠' }

function HighlightedResponse({ text, businessName }: { text: string; businessName: string }) {
  if (!businessName || !text.toLowerCase().includes(businessName.toLowerCase())) {
    return <span>{text}</span>
  }
  const parts = text.split(new RegExp(`(${businessName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'))
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === businessName.toLowerCase()
          ? <mark key={i} className="bg-accent/20 text-accent rounded px-0.5 font-semibold not-italic">{part}</mark>
          : <span key={i}>{part}</span>
      )}
    </>
  )
}

function EngineCard({ engine, businessName }: { engine: EngineResult; businessName: string }) {
  const [showResponse, setShowResponse] = useState(false)
  const isMentioned = engine.rawResponse &&
    engine.rawResponse.toLowerCase().includes(businessName.toLowerCase())

  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{ENGINE_ICONS[engine.engine] ?? '🔮'}</span>
          <span className="font-semibold text-foreground">{engine.engineLabel}</span>
        </div>
        <ScoreRing score={engine.overallScore} size={56} strokeWidth={5} />
      </div>

      {engine.prompts && engine.prompts.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-muted uppercase tracking-wide font-semibold flex items-center gap-1">
            <Search className="w-3 h-3" /> Queries tested
          </span>
          <div className="flex flex-col gap-1">
            {engine.prompts.map((p, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-foreground-dim bg-surface-2 border border-border rounded-lg px-2.5 py-1.5 font-mono">
                <Search className="w-3 h-3 text-muted flex-shrink-0" />
                &ldquo;{p}&rdquo;
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-sm text-foreground-dim leading-relaxed">{engine.summary}</p>

      {engine.rawResponse && (
        <div className="border border-border rounded-xl overflow-hidden">
          <button
            onClick={() => setShowResponse(v => !v)}
            className={clsx(
              'w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold transition-colors',
              isMentioned
                ? 'bg-success/8 text-success hover:bg-success/12'
                : 'bg-danger/8 text-danger hover:bg-danger/12'
            )}
          >
            <span className="flex items-center gap-1.5">
              {showResponse ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {isMentioned
                ? `✓ ${engine.engineLabel} mentioned your brand — see what it said`
                : `✗ ${engine.engineLabel} didn't mention you — see what it said instead`
              }
            </span>
            {showResponse ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {showResponse && (
            <div className="px-3 py-3 bg-surface-2 text-sm text-foreground-dim leading-relaxed italic border-t border-border">
              <HighlightedResponse text={engine.rawResponse} businessName={businessName} />
              {engine.competitorsInResponse && engine.competitorsInResponse.length > 0 && (
                <div className="mt-2.5 pt-2.5 border-t border-border not-italic">
                  <span className="text-xs text-muted uppercase tracking-wide font-semibold">Competitors named instead:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {engine.competitorsInResponse.map((c) => (
                      <span key={c} className="text-xs px-2 py-0.5 bg-danger/8 border border-danger/20 rounded-full text-danger font-medium">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2">
        {engine.topics.map((t) => (
          <div key={t.topic}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-foreground-dim truncate max-w-[70%]">{t.topic}</span>
              <span className={clsx('text-xs font-bold', getScoreColor(t.score))}>{t.score}</span>
            </div>
            <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{
                width: `${t.score}%`,
                background: t.score >= 80 ? '#22c55e' : t.score >= 60 ? '#10b981' : t.score >= 40 ? '#f59e0b' : '#ef4444'
              }} />
            </div>
            {t.snippet && <p className="text-xs text-muted mt-1.5 italic leading-relaxed">&ldquo;{t.snippet}&rdquo;</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Action Plan ──────────────────────────────────────────────────────────────

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

// ─── Done-For-You Upsell ──────────────────────────────────────────────────────

function DfyUpsell() {
  return (
    <div className="card p-6 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center flex-shrink-0">
          <Wrench className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-bold text-foreground">Don&apos;t want to do this yourself?</h3>
          <p className="text-sm text-foreground-dim mt-1 leading-relaxed">
            We&apos;ll implement every fix in your action plan — Schema markup, content pages, GBP optimization — directly on your website. No tech skills needed.
          </p>
        </div>
      </div>
      <ul className="flex flex-col gap-1.5 text-sm text-foreground-dim">
        <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" /> Schema markup installed & validated</li>
        <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" /> Content gap pages written & published</li>
        <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" /> Google Business Profile signals fixed</li>
        <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" /> Re-scan after 30 days to confirm improvement</li>
      </ul>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-2xl font-bold text-foreground">$199 <span className="text-sm font-normal text-muted">one-time</span></p>
          <p className="text-xs text-muted">Flat rate — no hourly billing, no surprises</p>
        </div>
        <a
          href="mailto:andrew@mygeoradar.com?subject=Done-For-You%20GEO%20Implementation&body=Hi%20Andrew%2C%20I%20just%20ran%20a%20scan%20and%20I%27d%20like%20help%20implementing%20the%20fixes."
          className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-colors text-sm"
        >
          <Mail className="w-4 h-4" /> Get it done for me
        </a>
      </div>
    </div>
  )
}

// ─── Monthly Tracking Upsell ──────────────────────────────────────────────────

function MonthlyTrackingUpsell({ scanId, reportEmail }: { scanId: string; reportEmail?: string }) {
  const searchParams = useSearchParams()
  const alreadySubscribed = searchParams.get('subscribed') === '1'

  const [email,   setEmail]   = useState(reportEmail ?? '')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  if (alreadySubscribed) {
    return (
      <div className="card p-6 flex items-start gap-3">
        <CalendarClock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-foreground">You&apos;re subscribed to monthly tracking!</p>
          <p className="text-sm text-foreground-dim mt-1">We&apos;ll automatically re-scan your business every month and email you the results so you can see your score improve over time.</p>
        </div>
      </div>
    )
  }

  async function handleSubscribe() {
    if (!email.trim()) { setError('Please enter your email.'); return }
    setLoading(true)
    setError('')
    try {
      const res  = await fetch('/api/subscribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, website: '', scanId }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Something went wrong.')
        setLoading(false)
      }
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="card p-6 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center flex-shrink-0">
          <CalendarClock className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-bold text-foreground">Track your score every month</h3>
          <p className="text-sm text-foreground-dim mt-1 leading-relaxed">
            We&apos;ll automatically run this scan every 30 days and email you the results. See exactly whether your AI visibility is improving — or if a competitor is closing in.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Your email</label>
        <div className="flex gap-2">
          <input
            className="input flex-1"
            type="email"
            placeholder="you@yourbusiness.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError('') }}
            disabled={loading}
          />
          <button
            onClick={handleSubscribe}
            disabled={loading || !email.trim()}
            className={clsx(
              'flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all',
              'bg-accent text-white hover:bg-accent-hover active:scale-[0.98]',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {loading
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Starting&hellip;</>
              : <>Subscribe — $5/mo</>
            }
          </button>
        </div>
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
      <p className="text-xs text-muted">Cancel anytime &middot; No long-term commitment &middot; Powered by Stripe</p>
    </div>
  )
}

// ─── Score Trend Section ──────────────────────────────────────────────────────

interface HistoryPoint {
  id:            string
  created_at:    string
  overall_score: number
  level:         string
  business_name: string
}

function ScoreTrendSection({ website, currentId }: { website: string; currentId: string }) {
  const [history, setHistory] = useState<HistoryPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; point: HistoryPoint } | null>(null)
  const svgRef    = useRef<SVGSVGElement>(null)
  const wrapRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch(`/api/scan/history?website=${encodeURIComponent(website)}`)
      .then(r => r.json())
      .then(d => { setHistory(d.history ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [website])

  if (loading) return null
  if (history.length < 2) return null

  const W = 560, H = 160
  const PAD_L = 36, PAD_R = 16, PAD_T = 16, PAD_B = 28
  const chartW = W - PAD_L - PAD_R
  const chartH = H - PAD_T - PAD_B

  const scores   = history.map(p => p.overall_score)
  const minScore = Math.max(0,   Math.min(...scores) - 10)
  const maxScore = Math.min(100, Math.max(...scores) + 10)

  const toX = (i: number) => PAD_L + (i / (history.length - 1)) * chartW
  const toY = (s: number) => PAD_T + chartH - ((s - minScore) / (maxScore - minScore)) * chartH

  const polyline = history.map((p, i) => `${toX(i)},${toY(p.overall_score)}`).join(' ')
  const baseY    = PAD_T + chartH
  const area     = `M${toX(0)},${baseY} ` +
    history.map((p, i) => `L${toX(i)},${toY(p.overall_score)}`).join(' ') +
    ` L${toX(history.length - 1)},${baseY} Z`

  const gridLines = [0, 25, 50, 75, 100].filter(v => v >= minScore - 5 && v <= maxScore + 5)
  const delta     = scores[scores.length - 1] - scores[0]

  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LineChart className="w-4 h-4 text-accent" />
          <h3 className="font-semibold text-foreground">Score Progress</h3>
          <span className="text-xs text-muted">{history.length} scans</span>
        </div>
        <span className={clsx(
          'text-xs font-bold px-2.5 py-1 rounded-full border',
          delta > 0 ? 'bg-success/10 border-success/20 text-success' :
          delta < 0 ? 'bg-danger/10  border-danger/20  text-danger'  :
                      'bg-surface-2  border-border      text-muted'
        )}>
          {delta > 0 ? `+${delta}` : delta} pts since first scan
        </span>
      </div>

      <div ref={wrapRef} className="w-full overflow-x-auto" style={{ position: 'relative' }}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          style={{ minWidth: 280, maxHeight: 180 }}
          onMouseLeave={() => setTooltip(null)}
        >
          <defs>
            <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#6366f1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0"   />
            </linearGradient>
          </defs>

          {gridLines.map(v => (
            <g key={v}>
              <line x1={PAD_L} y1={toY(v)} x2={W - PAD_R} y2={toY(v)}
                stroke="#27272a" strokeWidth="1" strokeDasharray="3 3" />
              <text x={PAD_L - 6} y={toY(v) + 4} fontSize="9" fill="#71717a" textAnchor="end">{v}</text>
            </g>
          ))}

          <path d={area} fill="url(#trend-fill)" />
          <polyline points={polyline} fill="none" stroke="#6366f1" strokeWidth="2"
            strokeLinejoin="round" strokeLinecap="round" />

          {history.map((p, i) => {
            const showLabel = i === 0 || i === history.length - 1 || p.id === currentId
            if (!showLabel) return null
            return (
              <text key={p.id} x={toX(i)} y={H - 4} fontSize="9" fill="#71717a" textAnchor="middle">
                {new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </text>
            )
          })}

          {history.map((p, i) => {
            const cx        = toX(i)
            const cy        = toY(p.overall_score)
            const isCurrent = p.id === currentId
            const color     = p.overall_score >= 80 ? '#22c55e' : p.overall_score >= 60 ? '#10b981' : p.overall_score >= 40 ? '#f59e0b' : '#ef4444'
            return (
              <g key={p.id} style={{ cursor: isCurrent ? 'default' : 'pointer' }}
                onClick={() => { if (!isCurrent) window.location.href = `/scan/${p.id}` }}
                onMouseEnter={() => {
                  const svg  = svgRef.current
                  const wrap = wrapRef.current
                  if (!svg || !wrap) return
                  const svgRect  = svg.getBoundingClientRect()
                  const wrapRect = wrap.getBoundingClientRect()
                  const scaleX   = svgRect.width  / W
                  const scaleY   = svgRect.height / H
                  setTooltip({
                    x: (svgRect.left - wrapRect.left) + cx * scaleX,
                    y: (svgRect.top  - wrapRect.top)  + cy * scaleY,
                    point: p,
                  })
                }}
                onMouseLeave={() => setTooltip(null)}
              >
                {isCurrent && <circle cx={cx} cy={cy} r={9} fill="none" stroke="#6366f1" strokeWidth="1.5" opacity="0.4" />}
                <circle cx={cx} cy={cy} r={isCurrent ? 5 : 4} fill={color} stroke="#09090b" strokeWidth="2" />
              </g>
            )
          })}
        </svg>

        {tooltip && (
          <div
            className="absolute z-10 pointer-events-none px-3 py-2 bg-surface border border-border rounded-xl shadow-lg text-xs flex flex-col gap-0.5"
            style={{ left: tooltip.x + 12, top: tooltip.y, transform: 'translateY(-100%)' }}
          >
            <span className={clsx('font-bold', getScoreColor(tooltip.point.overall_score))}>
              {tooltip.point.overall_score}/100
            </span>
            <span className="text-muted">
              {new Date(tooltip.point.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            {tooltip.point.id !== currentId && <span className="text-accent">Click to view →</span>}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 mt-1">
        {[...history].reverse().map((p) => {
          const isCurrent = p.id === currentId
          return (
            <div key={p.id}
              onClick={() => { if (!isCurrent) window.location.href = `/scan/${p.id}` }}
              className={clsx(
                'flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors',
                isCurrent
                  ? 'bg-accent/10 border border-accent/20 cursor-default'
                  : 'bg-surface-2 border border-border hover:border-accent/40 cursor-pointer'
              )}
            >
              <div className="flex items-center gap-2">
                {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />}
                <span className="text-muted">
                  {new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                {isCurrent && <span className="text-accent font-medium">current</span>}
              </div>
              <span className={clsx('font-bold', getScoreColor(p.overall_score))}>{p.overall_score}/100</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Competitor Gap Section ───────────────────────────────────────────────────

function CompetitorGapSection({ gap, businessName }: { gap: CompetitorGap; businessName: string }) {
  const topCompetitor = gap.competitors[0]
  const scoreDiff     = topCompetitor ? topCompetitor.estimatedScore - gap.yourScore : 0
  const isAhead       = scoreDiff <= 0

  return (
    <div className="card p-5 flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Swords className="w-4 h-4 text-accent" />
        <h3 className="font-semibold text-foreground">Competitor Gap Analysis</h3>
      </div>
      <p className="text-sm text-foreground-dim leading-relaxed">{gap.summary}</p>
      {topCompetitor && (
        <div className="p-4 bg-surface-2 border border-border rounded-xl flex flex-col gap-3">
          <p className="text-xs text-muted uppercase tracking-wide font-semibold">AI Visibility Score Comparison</p>
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-foreground">{businessName}</span>
                <span className={clsx('text-xs font-bold', getScoreColor(gap.yourScore))}>{gap.yourScore}/100</span>
              </div>
              <div className="h-2.5 bg-surface rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all"
                  style={{ width: `${gap.yourScore}%`, background: getScoreHex(gap.yourScore) }} />
              </div>
            </div>
            {gap.competitors.map((c) => (
              <div key={c.domain}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-foreground-dim">{c.name}</span>
                    <span className="text-xs text-muted">({c.domain})</span>
                  </div>
                  <span className={clsx('text-xs font-bold', getScoreColor(c.estimatedScore))}>{c.estimatedScore}/100</span>
                </div>
                <div className="h-2.5 bg-surface rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all"
                    style={{ width: `${c.estimatedScore}%`, background: getScoreHex(c.estimatedScore) }} />
                </div>
              </div>
            ))}
          </div>
          <div className={clsx(
            'self-start flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border',
            isAhead ? 'bg-success/10 border-success/20 text-success' : 'bg-danger/10 border-danger/20 text-danger'
          )}>
            <TrendingUp className="w-3.5 h-3.5" />
            {isAhead ? `You're ahead by ${Math.abs(scoreDiff)} points` : `${scoreDiff} point gap vs ${topCompetitor.name}`}
          </div>
        </div>
      )}
      {gap.competitors.map((c) => (
        <div key={c.domain} className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-foreground-dim uppercase tracking-wide">What {c.name} does better</p>
          {c.advantages.map((adv, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <XCircle className="w-4 h-4 text-danger flex-shrink-0 mt-0.5" />
              <p className="text-foreground-dim">{adv}</p>
            </div>
          ))}
          {c.schemaTypes.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {c.schemaTypes.map(t => (
                <span key={t} className="text-xs px-2 py-0.5 bg-surface-2 border border-border rounded-md text-muted">{t}</span>
              ))}
            </div>
          )}
        </div>
      ))}
      {gap.closingMoves.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-accent uppercase tracking-wide">How to close the gap</p>
          {gap.closingMoves.map((move, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <ArrowRight className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-foreground-dim">{move}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Schema Checker Section ───────────────────────────────────────────────────

const IMPACT_BADGE: Record<string, string> = {
  high:   'text-danger  bg-danger/10  border-danger/20',
  medium: 'text-warning bg-warning/10 border-warning/20',
  low:    'text-muted   bg-surface-2  border-border',
}

function SchemaCheckerSection({ schema }: { schema: SchemaCheck }) {
  const [expanded, setExpanded] = useState(false)
  const missing = schema.checked.filter(c => !c.found && c.impact === 'high')
  const present = schema.checked.filter(c => c.found)

  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-accent" />
          <h3 className="font-semibold text-foreground">Schema / Structured Data</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className={clsx('text-sm font-bold', schema.score >= 60 ? 'text-success' : schema.score >= 30 ? 'text-warning' : 'text-danger')}>
            {schema.score}/100
          </span>
          {!schema.fetchedOk && (
            <span className="text-xs text-muted border border-border rounded-full px-2 py-0.5">site unreachable</span>
          )}
        </div>
      </div>
      {missing.length > 0 && (
        <div className="bg-danger/5 border border-danger/20 rounded-xl p-4 flex flex-col gap-2">
          <p className="text-xs font-semibold text-danger uppercase tracking-wide">Critical gaps ({missing.length} missing high-impact schemas)</p>
          {missing.map((item) => (
            <div key={item.type} className="flex items-start gap-2 text-sm">
              <XCircle className="w-4 h-4 text-danger flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-foreground">{item.type}</span>
                <p className="text-xs text-foreground-dim mt-0.5">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {present.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {present.map((item) => (
            <span key={item.type} className="flex items-center gap-1.5 px-2.5 py-1 bg-success/10 border border-success/20 rounded-lg text-xs text-success">
              <CheckCircle2 className="w-3 h-3" /> {item.type}
            </span>
          ))}
        </div>
      )}
      <button
        onClick={() => setExpanded(e => !e)}
        className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground-dim transition-colors self-start"
      >
        {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        {expanded ? 'Hide' : 'Show'} all {schema.checked.length} schema checks
      </button>
      {expanded && (
        <div className="flex flex-col gap-2">
          {schema.checked.map((item) => (
            <div key={item.type} className="flex items-start gap-3 p-3 bg-surface-2 rounded-lg">
              {item.found
                ? <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                : <XCircle      className="w-4 h-4 text-muted   flex-shrink-0 mt-0.5" />
              }
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{item.type}</span>
                  <span className={clsx('text-xs px-1.5 py-0.5 rounded border', IMPACT_BADGE[item.impact])}>{item.impact}</span>
                </div>
                {!item.found && <p className="text-xs text-foreground-dim mt-1">{item.note}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Content Gaps Section ─────────────────────────────────────────────────────

const ENGINE_LABEL: Record<string, string> = {
  chatgpt: 'ChatGPT', perplexity: 'Perplexity', gemini: 'Gemini', claude: 'Claude'
}

function ContentGapsSection({ gaps }: { gaps: ContentGapItem[] }) {
  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <MessageSquareText className="w-4 h-4 text-accent" />
        <h3 className="font-semibold text-foreground">Content Gap Analysis</h3>
      </div>
      <p className="text-sm text-foreground-dim">
        These are questions AI engines are actively answering about your industry that your site doesn&apos;t adequately cover.
      </p>
      <div className="flex flex-col gap-3">
        {gaps.map((gap, i) => (
          <div key={i} className="p-4 bg-surface-2 border border-border rounded-xl flex flex-col gap-2">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium text-foreground leading-snug">&ldquo;{gap.question}&rdquo;</p>
              <span className="text-xs px-2 py-0.5 bg-surface border border-border rounded-full text-muted flex-shrink-0">
                {ENGINE_LABEL[gap.engine] ?? gap.engine}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-warning flex-shrink-0 mt-0.5" />
              <p className="text-xs text-foreground-dim">{gap.missing}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── GBP Signal Section ───────────────────────────────────────────────────────

function GbpSignalSection({ gbp }: { gbp: GbpSignal }) {
  const signals = [
    { label: 'LocalBusiness schema detected',      ok: gbp.detected },
    { label: 'Review / AggregateRating schema',    ok: gbp.hasReviewSchema },
    { label: 'Business name consistent in markup', ok: gbp.hasNapConsistency },
  ]
  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-accent" />
        <h3 className="font-semibold text-foreground">Google Business Profile Signals</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {signals.map((s) => (
          <div key={s.label} className={clsx(
            'flex items-center gap-2 p-3 rounded-xl border text-sm',
            s.ok ? 'bg-success/5 border-success/20 text-success' : 'bg-surface-2 border-border text-muted'
          )}>
            {s.ok ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <XCircle className="w-4 h-4 flex-shrink-0" />}
            <span className="leading-snug text-xs">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {gbp.recommendations.map((rec, i) => (
          <div key={i} className="flex items-start gap-2 text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" />
            <p className="text-foreground-dim">{rec}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ScanResultPage() {
  const { id }                    = useParams<{ id: string }>()
  const [report,    setReport]    = useState<ScanReport | null>(null)
  const [status,    setStatus]    = useState<'loading' | 'pending' | 'ready' | 'error'>('loading')
  const [scanError, setScanError] = useState<string | null>(null)
  const [pollCount, setPollCount] = useState(0)
  const [enrichmentsDone, setEnrichmentsDone] = useState(false)
  const [reportEmail, setReportEmail] = useState<string | undefined>(undefined)
  const [hasAccount,  setHasAccount]  = useState(false)

  // Check if user is logged in (for checklist)
  useEffect(() => {
    const sb = createSupabaseBrowser()
    sb.auth.getUser().then(({ data }) => setHasAccount(!!data.user))
  }, [])

  // BUG FIX: use useCallback + refs so the interval always sees fresh state
  const statusRef         = useRef(status)
  const enrichmentsDoneRef = useRef(enrichmentsDone)
  useEffect(() => { statusRef.current = status }, [status])
  useEffect(() => { enrichmentsDoneRef.current = enrichmentsDone }, [enrichmentsDone])

  const fetchReport = useCallback(async () => {
    if (!id) return
    try {
      const res  = await fetch(`/api/scan/${id}`)
      const data = await res.json()
      if (!res.ok) { setStatus('error'); return }

      if (data.scan_error) {
        setScanError(data.scan_error)
        setStatus('error')
        return
      }

      if (data.paid && data.overall_score != null) {
        const mapped: ScanReport = {
          id:            data.id,
          createdAt:     data.created_at,
          businessName:  data.business_name,
          website:       data.website,
          topics:        data.topics,
          location:      data.location,
          industry:      data.industry,
          competitorUrl: data.competitor_url ?? null,
          paid:          data.paid,
          overallScore:  data.overall_score,
          level:         data.level,
          engines:       data.engines,
          topActions:    data.top_actions,
          quickWins:     data.quick_wins,
          schemaCheck:   data.schema_check   ?? null,
          contentGaps:   data.content_gaps   ?? null,
          gbpSignal:     data.gbp_signal     ?? null,
          competitorGap: data.competitor_gap ?? null,
        }
        setReport(mapped)
        setStatus('ready')
        if (data.email) setReportEmail(data.email)
        if (data.schema_check && data.content_gaps && data.gbp_signal && data.competitor_gap) {
          setEnrichmentsDone(true)
        }
      } else {
        setStatus('pending')
        setPollCount(c => c + 1)
      }
    } catch { setStatus('error') }
  }, [id])

  useEffect(() => {
    if (!id) return
    fetchReport()
    const interval = setInterval(() => {
      // Read fresh values from refs — avoids stale closure bug
      if (statusRef.current === 'ready' && enrichmentsDoneRef.current) return
      if (statusRef.current === 'error') return
      fetchReport()
    }, 3000)
    return () => clearInterval(interval)
  }, [id, fetchReport])

  if (status !== 'ready') {
    const steps = [
      { label: 'Payment confirmed',      done: status !== 'loading' },
      { label: 'Querying ChatGPT',       done: pollCount > 2 },
      { label: 'Querying Perplexity',    done: pollCount > 4 },
      { label: 'Querying Gemini',        done: pollCount > 6 },
      { label: 'Querying Claude',        done: pollCount > 8 },
      { label: 'Generating action plan', done: pollCount > 10 },
    ]

    const isScanFailed = status === 'error' && scanError !== null

    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-md mx-auto px-4 pt-32 pb-20 flex flex-col items-center gap-8">
          {isScanFailed ? (
            <>
              <div className="w-16 h-16 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center">
                <XCircle className="w-8 h-8 text-danger" />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-2">Your scan hit a snag</h1>
                <p className="text-muted text-sm leading-relaxed">
                  Your payment went through successfully, but our AI scan ran into an error.
                  We&apos;ve been automatically notified.
                </p>
              </div>
              <div className="w-full card p-5 flex flex-col gap-3">
                <p className="text-sm text-foreground-dim leading-relaxed">
                  If your report isn&apos;t ready within the next hour, reply to the confirmation email
                  or contact us directly — we&apos;ll re-run your scan or issue a full refund immediately.
                </p>
                <a
                  href={`mailto:andrew@mygeoradar.com?subject=Scan%20failed&body=My%20scan%20ID%20is%3A%20${id}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" /> Email support
                </a>
                <p className="text-xs text-muted text-center">Scan ID: <code className="text-foreground-dim">{id}</code></p>
              </div>
            </>
          ) : (
            <>
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
              {status === 'error' && (
                <p className="text-danger text-sm text-center">
                  Something went wrong. Please refresh or{' '}
                  <a href="mailto:andrew@mygeoradar.com" className="underline">contact support</a>.
                </p>
              )}
            </>
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
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="flex items-center gap-2 px-4 py-2 bg-surface-2 border border-border rounded-xl text-sm font-medium hover:border-accent transition-colors"
          >
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>

        {/* Overall score */}
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

        {/* Onboarding Checklist */}
        <div className="mb-6">
          <OnboardingChecklist scanId={report.id} hasAccount={hasAccount} />
        </div>

        {/* Score trend */}
        <div className="relative mb-6">
          <ScoreTrendSection website={report.website} currentId={report.id} />
        </div>

        {/* Engine cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {report.engines.map((engine) => (
            <EngineCard key={engine.engine} engine={engine} businessName={report.businessName} />
          ))}
        </div>

        {/* Action plan */}
        <div className="mb-6">
          <ActionPlan actions={report.topActions} quickWins={report.quickWins} />
        </div>

        {/* Done-For-You Upsell */}
        <div className="mb-6">
          <DfyUpsell />
        </div>

        {/* Competitor Gap */}
        <div className="mb-6">
          {report.competitorGap
            ? <CompetitorGapSection gap={report.competitorGap} businessName={report.businessName} />
            : <EnrichmentSkeleton icon={<Swords className="w-4 h-4" />} label="Competitor Gap Analysis" />
          }
        </div>

        {/* Schema Checker */}
        <div className="mb-6">
          {report.schemaCheck
            ? <SchemaCheckerSection schema={report.schemaCheck} />
            : <EnrichmentSkeleton icon={<Code2 className="w-4 h-4" />} label="Schema / Structured Data" />
          }
        </div>

        {/* Content Gaps */}
        <div className="mb-6">
          {report.contentGaps
            ? <ContentGapsSection gaps={report.contentGaps} />
            : <EnrichmentSkeleton icon={<MessageSquareText className="w-4 h-4" />} label="Content Gap Analysis" />
          }
        </div>

        {/* GBP Signals */}
        <div className="mb-6">
          {report.gbpSignal
            ? <GbpSignalSection gbp={report.gbpSignal} />
            : <EnrichmentSkeleton icon={<MapPin className="w-4 h-4" />} label="Google Business Profile Signals" />
          }
        </div>

        {/* Monthly Tracking */}
        <div className="mb-6">
          <MonthlyTrackingUpsell scanId={report.id} reportEmail={reportEmail} />
        </div>

        {/* Run again CTA */}
        <div className="mt-2 p-6 bg-surface-2 border border-border rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
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
