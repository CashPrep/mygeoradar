import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import {
  CheckCircle, AlertTriangle, XCircle, ArrowRight,
  Clock, Lock, Download, Wrench,
} from 'lucide-react'
import { FIX_GUIDES, type FixGuide } from '@/lib/fixGuides'

export const dynamic = 'force-dynamic'

export const metadata = {
  robots: { index: false, follow: false },
}

type Status = 'pass' | 'warn' | 'fail'
interface Check {
  id: string
  label: string
  status: Status
  impact: 'High' | 'Medium'
  detail: string
  fix: string
}
interface ScanRow {
  url: string
  score: number
  business_name: string | null
  checks: Check[]
  created_at: string
  platform: string | null
}

// Human-readable platform names for display
const PLATFORM_LABELS: Record<string, string> = {
  shopify:    'Shopify',
  wix:        'Wix',
  wordpress:  'WordPress',
  squarespace:'Squarespace',
  webflow:    'Webflow',
  weebly:     'Weebly',
  godaddy:    'GoDaddy Website Builder',
  other:      'Your Platform',
}

function platformLabel(platform: string | null): string {
  if (!platform) return ''
  return PLATFORM_LABELS[platform] ?? platform
}

function safeHostname(url: string): string {
  try { return new URL(url).hostname } catch { return url }
}

async function getReport(token: string): Promise<ScanRow | null> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )

  const { data: purchase } = await supabase
    .from('report_purchases')
    .select('scan_id, paid_at')
    .eq('token', token)
    .not('paid_at', 'is', null)
    .maybeSingle()

  if (!purchase) return null

  const { data: scan } = await supabase
    .from('scans')
    .select('url, score, business_name, checks, created_at, platform')
    .eq('id', purchase.scan_id)
    .single()

  return scan ?? null
}

function scoreLabel(s: number) {
  if (s >= 80) return { label: 'AI-Ready',         color: 'text-emerald-600', ring: 'stroke-emerald-500', bg: 'bg-emerald-50  border-emerald-200' }
  if (s >= 55) return { label: 'Partially Visible', color: 'text-amber-500',   ring: 'stroke-amber-400',  bg: 'bg-amber-50   border-amber-200'   }
  return               { label: 'Hard to Read',     color: 'text-red-500',     ring: 'stroke-red-500',    bg: 'bg-red-50     border-red-200'     }
}

function ScoreRing({ score }: { score: number }) {
  const { color, ring } = scoreLabel(score)
  const r    = 44
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  return (
    <svg width="120" height="120" viewBox="0 0 100 100" className="-rotate-90">
      <circle cx="50" cy="50" r={r} fill="none" stroke="#e4e4e7" strokeWidth="10" />
      <circle cx="50" cy="50" r={r} fill="none" className={ring}
        strokeWidth="10" strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
      />
      <text
        x="50" y="46" textAnchor="middle" dominantBaseline="middle"
        className={`fill-current ${color}`}
        transform="rotate(90, 50, 50)"
        style={{ fontSize: '18px', fontWeight: 900 }}
      >{score}</text>
      <text
        x="50" y="60" textAnchor="middle"
        style={{ fontSize: '8px', fill: '#888' }}
        transform="rotate(90, 50, 60)"
      >/ 100</text>
    </svg>
  )
}

function StatusIcon({ status }: { status: Status }) {
  if (status === 'pass') return <CheckCircle   className="w-5 h-5 text-emerald-500 flex-shrink-0" />
  if (status === 'warn') return <AlertTriangle  className="w-5 h-5 text-amber-400  flex-shrink-0" />
  return                        <XCircle        className="w-5 h-5 text-red-500    flex-shrink-0" />
}

function CheckCard({
  check,
  guide,
  platform,
}: {
  check: Check
  guide: FixGuide | undefined
  platform: string | null
}) {
  const rowBg =
    check.status === 'pass' ? 'border-emerald-200 bg-emerald-50/40' :
    check.status === 'warn' ? 'border-amber-200   bg-amber-50/40'   :
                              'border-red-200     bg-red-50/40'

  // Use platform-specific steps when available, otherwise fall back to generic steps
  const platformSpecificSteps =
    platform && guide?.platformSteps?.[platform]
      ? guide.platformSteps[platform]
      : null

  const stepsToShow = platformSpecificSteps ?? guide?.steps
  const hasPlatformSteps = !!platformSpecificSteps
  const pLabel = platformLabel(platform)

  return (
    <div className={`rounded-2xl border overflow-hidden ${rowBg}`}>
      <div className="flex items-center gap-3 px-5 py-4">
        <StatusIcon status={check.status} />
        <div className="flex-1">
          <p className="font-semibold text-sm">{check.label}</p>
          <p className="text-xs text-muted mt-0.5 leading-relaxed">{check.detail}</p>
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded flex-shrink-0 ${
          check.impact === 'High' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
        }`}>
          {check.impact}
        </span>
      </div>

      {check.status !== 'pass' && guide && (
        <div className="border-t border-current/10 px-5 py-5 bg-white/60 flex flex-col gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-accent mb-2">Why This Matters</p>
            <p className="text-sm text-foreground/80 leading-relaxed">{guide.why}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <p className="text-xs font-bold uppercase tracking-wider text-accent">
                How to Fix It — Step by Step
              </p>
              {hasPlatformSteps && pLabel && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold">
                  <Wrench className="w-2.5 h-2.5" />
                  {pLabel} steps
                </span>
              )}
            </div>
            {hasPlatformSteps && (
              <p className="text-xs text-muted mb-3 italic">
                These steps are specific to {pLabel}. They replace the generic instructions with exact navigation paths for your platform.
              </p>
            )}
            <ol className="flex flex-col gap-3">
              {stepsToShow?.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-accent/15">
            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-accent mb-0.5">How to Confirm It&apos;s Fixed</p>
              <p className="text-xs text-foreground/70 leading-relaxed">{guide.validate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <Clock className="w-3.5 h-3.5" />
            <span>Estimated time: <strong className="text-foreground">{guide.timeEstimate}</strong></span>
          </div>
        </div>
      )}

      {check.status === 'pass' && (
        <div className="border-t border-emerald-100 px-5 py-3 bg-white/40">
          <p className="text-xs text-emerald-700 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            This check passed — no action needed.
          </p>
        </div>
      )}
    </div>
  )
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const scan = await getReport(token)
  if (!scan) notFound()

  const { label, color, bg } = scoreLabel(scan.score)
  const failChecks = scan.checks.filter(c => c.status === 'fail')
  const warnChecks = scan.checks.filter(c => c.status === 'warn')
  const passChecks = scan.checks.filter(c => c.status === 'pass')
  const issueCount = failChecks.length + warnChecks.length
  const hostname   = safeHostname(scan.url)
  const platform   = scan.platform ?? null
  const pLabel     = platformLabel(platform)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-24">

        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-6">
            <Lock className="w-3.5 h-3.5" />
            {issueCount} custom fix guide{issueCount !== 1 ? 's' : ''} for {hostname}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Your AI Readiness Report</h1>
          <p className="text-muted font-mono text-sm break-all mb-6">{scan.url}</p>

          {pLabel && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border text-muted text-xs font-medium mb-4">
              <Wrench className="w-3 h-3" />
              Fix guides tailored for <strong className="text-foreground">{pLabel}</strong>
            </div>
          )}

          <div className={`inline-flex flex-col sm:flex-row items-center gap-6 px-8 py-6 rounded-2xl border ${bg} shadow-card-hover`}>
            <ScoreRing score={scan.score} />
            <div className="text-center sm:text-left">
              <p className={`text-2xl font-black ${color}`}>{label}</p>
              <p className="text-sm text-muted mt-1">
                {failChecks.length > 0 && <span className="text-red-600 font-semibold">{failChecks.length} critical issue{failChecks.length > 1 ? 's' : ''}&nbsp;</span>}
                {warnChecks.length > 0 && <span className="text-amber-600 font-semibold">{warnChecks.length} warning{warnChecks.length > 1 ? 's' : ''}&nbsp;</span>}
                {passChecks.length > 0 && <span className="text-emerald-600 font-semibold">{passChecks.length} passed</span>}
              </p>
              <p className="text-xs text-muted/60 mt-1">
                Scanned {new Date(scan.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8 flex justify-center">
          <a
            href={`/api/report-download?token=${token}`}
            download="AI-Readiness-Fix-Guides-MyGeoRadar.html"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-accent/30 bg-accent/5 text-accent text-sm font-semibold hover:bg-accent/10 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Fix Guides (PDF-ready)
          </a>
        </div>

        <div className="mb-10 p-5 rounded-xl bg-surface border border-border">
          <p className="text-xs font-bold uppercase tracking-wider text-accent mb-2">How to Use This Report</p>
          <p className="text-sm text-muted leading-relaxed">
            This report contains {issueCount > 0 ? `${issueCount} fix guide${issueCount !== 1 ? 's' : ''} — one for each issue found on ${hostname}` : 'a full breakdown of your site'}.
            {pLabel && ` Each guide shows exact steps for ${pLabel}.`} Start with <strong className="text-foreground">Critical Issues</strong> first. Each card has a full explanation of why the issue matters, a numbered step-by-step guide to fix it, and a validation step to confirm it worked. When you&apos;re done, re-run the free scan to watch your score improve.
          </p>
        </div>

        {failChecks.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              Critical Issues ({failChecks.length})
            </h2>
            <div className="flex flex-col gap-4">
              {failChecks.map(c => (
                <CheckCard key={c.id} check={c} guide={FIX_GUIDES[c.id]} platform={platform} />
              ))}
            </div>
          </section>
        )}

        {failChecks.length > 0 && warnChecks.length > 0 && (
          <div className="my-8 p-6 rounded-2xl border border-accent/20 bg-accent/3 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">While you&apos;re fixing things</p>
            <p className="text-sm text-muted mb-3 max-w-md mx-auto">
              Technical fixes are only one layer. The Found by AI Playbook covers the full picture — citation building, content authority, and the 30-day plan that makes AI actually recommend you.
            </p>
            <Link href="/playbook" className="btn-primary inline-flex text-sm px-5 py-2.5 rounded-lg shadow-glow-xs gap-2">
              See the full playbook — $27 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {warnChecks.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Warnings ({warnChecks.length})
            </h2>
            <div className="flex flex-col gap-4">
              {warnChecks.map(c => (
                <CheckCard key={c.id} check={c} guide={FIX_GUIDES[c.id]} platform={platform} />
              ))}
            </div>
          </section>
        )}

        {passChecks.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              Passing ({passChecks.length})
            </h2>
            <div className="flex flex-col gap-3">
              {passChecks.map(c => (
                <CheckCard key={c.id} check={c} guide={undefined} platform={platform} />
              ))}
            </div>
          </section>
        )}

        <div className="p-7 ro