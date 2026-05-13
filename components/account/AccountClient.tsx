'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Radar, ExternalLink, LogOut, BarChart2, Plus,
  TrendingUp, Calendar, Target, ChevronRight, RefreshCw,
  User, Clock
} from 'lucide-react'
import { createSupabaseBrowser } from '@/lib/supabase-browser'
import { EmailVerifyBanner } from './EmailVerifyBanner'
import { clsx } from 'clsx'
import type { User as SupabaseUser } from '@supabase/supabase-js'

type Scan = {
  id: string
  created_at: string
  business_name: string
  website: string
  overall_score: number | null
  level: string | null
  paid: boolean
}

const LEVEL_STYLES: Record<string, string> = {
  excellent: 'bg-success/10 text-success   border-success/25',
  good:      'bg-sky-500/10 text-sky-400   border-sky-500/25',
  weak:      'bg-warning/10 text-warning   border-warning/25',
  poor:      'bg-danger/10  text-danger    border-danger/25',
}

function getScoreHex(score: number) {
  if (score >= 80) return '#22c55e'
  if (score >= 60) return '#10b981'
  if (score >= 40) return '#f59e0b'
  return '#ef4444'
}

function MiniRing({ score }: { score: number }) {
  const size = 44, sw = 4
  const r    = (size - sw) / 2
  const circ = 2 * Math.PI * r
  const off  = circ - (score / 100) * circ
  const col  = getScoreHex(score)
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#27272a" strokeWidth={sw} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={col} strokeWidth={sw}
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={off}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-bold" style={{ color: col }}>{score}</span>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon, label, value, sub, color,
}: {
  icon: React.ElementType; label: string; value: string | number; sub?: string; color: string
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className={clsx('w-7 h-7 rounded-lg flex items-center justify-center', color)}>
          <Icon className="w-3.5 h-3.5" />
        </div>
        <p className="text-xs text-muted font-medium uppercase tracking-wide">{label}</p>
      </div>
      <p className="text-2xl font-bold text-foreground leading-none">{value}</p>
      {sub && <p className="text-xs text-muted">{sub}</p>}
    </div>
  )
}

export function AccountClient({
  user, scans, emailVerified,
}: {
  user: SupabaseUser
  scans: Scan[]
  emailVerified: boolean
}) {
  const router   = useRouter()
  const supabase = createSupabaseBrowser()
  const [signingOut, setSigningOut] = useState(false)

  async function handleSignOut() {
    setSigningOut(true)
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  // Derived stats
  const scores     = scans.map(s => s.overall_score).filter((s): s is number => s !== null)
  const avgScore   = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null
  const bestScore  = scores.length ? Math.max(...scores) : null
  const lastScan   = scans[0]
  const firstName  = user.user_metadata?.full_name?.split(' ')[0] || user.user_metadata?.name?.split(' ')[0] || null

  const lastScanDate = lastScan
    ? new Date(lastScan.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null

  return (
    <div className="min-h-screen bg-background">

      {/* Email verification modal/banner */}
      {!emailVerified && <EmailVerifyBanner email={user.email!} />}

      {/* Header */}
      <header className="border-b border-border bg-background/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Radar className="w-5 h-5 text-accent" />
            <span className="font-bold text-base tracking-tight">
              my<span className="text-accent">geo</span>radar
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-surface-2 border border-border rounded-xl">
              <div className="w-5 h-5 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
                <User className="w-2.5 h-2.5 text-accent" />
              </div>
              <span className="text-xs text-muted truncate max-w-[160px]">{user.email}</span>
            </div>
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-10">

        {/* Welcome */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-sm text-muted mb-1">Welcome back{firstName ? `, ${firstName}` : ''} 👋</p>
            <h1 className="text-2xl md:text-3xl font-bold">My Dashboard</h1>
          </div>
          <Link
            href="/scan"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white font-semibold text-sm rounded-xl transition-colors self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> New scan
          </Link>
        </div>

        {/* Stats row */}
        {scans.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <StatCard
              icon={BarChart2}
              label="Total scans"
              value={scans.length}
              sub={`${scans.length === 1 ? '1 report' : `${scans.length} reports`} saved`}
              color="bg-accent/10 text-accent"
            />
            <StatCard
              icon={Target}
              label="Avg score"
              value={avgScore !== null ? `${avgScore}/100` : '—'}
              sub={avgScore !== null ? (avgScore >= 70 ? 'Good visibility' : avgScore >= 40 ? 'Needs work' : 'Low visibility') : 'No data yet'}
              color="bg-warning/10 text-warning"
            />
            <StatCard
              icon={TrendingUp}
              label="Best score"
              value={bestScore !== null ? `${bestScore}/100` : '—'}
              sub="Across all scans"
              color="bg-success/10 text-success"
            />
            <StatCard
              icon={Clock}
              label="Last scan"
              value={lastScanDate ?? '—'}
              sub={lastScan?.business_name}
              color="bg-purple-500/10 text-purple-400"
            />
          </div>
        )}

        {/* Scan history */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground">Scan history</h2>
          {scans.length > 0 && (
            <span className="text-xs text-muted">{scans.length} {scans.length === 1 ? 'scan' : 'scans'}</span>
          )}
        </div>

        {scans.length === 0 ? (
          // Empty state
          <div className="border border-dashed border-border rounded-2xl p-12 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Radar className="w-8 h-8 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">No scans yet</p>
              <p className="text-sm text-muted max-w-xs">
                Run your first AI visibility scan to see how ChatGPT, Perplexity, Gemini, and Claude talk about your business.
              </p>
            </div>
            <Link
              href="/scan"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white font-semibold text-sm rounded-xl transition-colors"
            >
              <Plus className="w-4 h-4" /> Run your first scan
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {scans.map((scan) => (
              <Link
                key={scan.id}
                href={`/scan/${scan.id}`}
                className="group bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-accent/50 hover:bg-card/80 transition-all"
              >
                {/* Score ring */}
                {scan.overall_score !== null
                  ? <MiniRing score={scan.overall_score} />
                  : (
                    <div className="w-11 h-11 rounded-full bg-surface-2 border border-border flex items-center justify-center flex-shrink-0">
                      <BarChart2 className="w-4 h-4 text-muted" />
                    </div>
                  )
                }

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">{scan.business_name}</p>
                  <p className="text-xs text-muted truncate mt-0.5">{scan.website}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-3 h-3 text-muted flex-shrink-0" />
                    <p className="text-xs text-muted">
                      {new Date(scan.created_at).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </p>
                    {scan.level && (
                      <span className={clsx(
                        'text-[10px] font-semibold px-1.5 py-0.5 rounded-full border capitalize',
                        LEVEL_STYLES[scan.level] ?? 'bg-surface-2 text-muted border-border'
                      )}>
                        {scan.level}
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </Link>
            ))}
          </div>
        )}

        {/* Bottom CTA rail */}
        {scans.length > 0 && (
          <div className="mt-8 p-5 bg-surface-2 border border-border rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-sm">Track your progress over time</p>
              <p className="text-xs text-muted mt-0.5">Run a new scan after making improvements to see your score change.</p>
            </div>
            <Link
              href="/scan"
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white font-semibold text-sm rounded-xl transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Re-scan
            </Link>
          </div>
        )}

      </main>
    </div>
  )
}
