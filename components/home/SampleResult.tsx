'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import {
  ArrowRight, CheckCircle2, XCircle, AlertCircle,
  Code2, MessageSquareText, MapPin, Swords, TrendingUp
} from 'lucide-react'
import { clsx } from 'clsx'

const TABS = [
  { id: 'score',      label: 'Score Overview',   icon: TrendingUp },
  { id: 'schema',     label: 'Schema Checker',    icon: Code2 },
  { id: 'content',    label: 'Content Gaps',      icon: MessageSquareText },
  { id: 'gbp',        label: 'GBP Signals',       icon: MapPin },
  { id: 'competitor', label: 'Competitor Gap',     icon: Swords },
]

function ScoreOverviewMockup() {
  const engines = [
    { label: 'ChatGPT',    score: 34, color: '#10a37f', summary: 'Your business isn\'t mentioned in training data. Thin website with no structured data signals.' },
    { label: 'Perplexity', score: 61, color: '#4f8ef7', summary: 'Active web presence helps, but your site lacks recent authoritative content updates.' },
    { label: 'Gemini',     score: 22, color: '#8b5cf6', summary: 'No LocalBusiness schema detected. Google Business Profile signals are critically weak.' },
    { label: 'Claude',     score: 45, color: '#f59e0b', summary: 'Mentioned occasionally in legal directories. More editorial citations needed.' },
  ]
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-5">
        {/* Score ring */}
        <div className="relative flex items-center justify-center shrink-0" style={{ width: 88, height: 88 }}>
          <svg width={88} height={88} className="-rotate-90">
            <circle cx={44} cy={44} r={36} fill="none" stroke="#27272a" strokeWidth={8} />
            <circle cx={44} cy={44} r={36} fill="none" stroke="#f59e0b" strokeWidth={8}
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 36}
              strokeDashoffset={2 * Math.PI * 36 * (1 - 41/100)}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-warning">41</span>
            <span className="text-muted" style={{ fontSize: 9 }}>/100</span>
          </div>
        </div>
        <div>
          <span className="text-xs font-bold text-warning uppercase tracking-wide">Weak Visibility</span>
          <h4 className="font-bold text-foreground mt-0.5">Peak Legal Group</h4>
          <p className="text-xs text-muted">peaklegal.com · Personal Injury · Austin, TX</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {['Personal Injury Attorney', 'Car Accident Lawyer', 'Free Consultation'].map(t => (
              <span key={t} className="px-2 py-0.5 bg-surface-2 border border-border rounded-md text-xs text-muted">{t}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {engines.map(e => (
          <div key={e.label} className="p-3 bg-surface-2 rounded-xl">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-semibold text-foreground">{e.label}</span>
              <span className="text-sm font-bold" style={{ color: e.color }}>{e.score}/100</span>
            </div>
            <div className="h-1.5 bg-surface rounded-full overflow-hidden mb-2">
              <div className="h-full rounded-full" style={{ width: `${e.score}%`, backgroundColor: e.color }} />
            </div>
            <p className="text-xs text-foreground-dim leading-snug">{e.summary}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SchemaCheckerMockup() {
  const items = [
    { type: 'LocalBusiness',          found: false, impact: 'high',   note: 'Critical for Gemini and ChatGPT to understand your business type and location.' },
    { type: 'AggregateRating',        found: false, impact: 'high',   note: 'AI engines use review signals to gauge trust and authority.' },
    { type: 'FAQPage',                found: false, impact: 'medium', note: 'FAQ schema directly improves AI answer sourcing from your site.' },
    { type: 'Attorney (SpecialTy)',   found: false, impact: 'medium', note: 'Profession-specific schema boosts citation probability in legal queries.' },
    { type: 'BreadcrumbList',         found: true,  impact: 'low',    note: '' },
    { type: 'WebSite',                found: true,  impact: 'low',    note: '' },
  ]
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Schema Score</span>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-danger">18/100</span>
        </div>
      </div>
      <div className="bg-danger/5 border border-danger/20 rounded-xl p-3 mb-1">
        <p className="text-xs font-semibold text-danger">⚠ 4 missing schemas — 2 are critical for AI citation</p>
      </div>
      <div className="flex flex-col gap-2">
        {items.map(item => (
          <div key={item.type} className="flex items-start gap-3 p-3 bg-surface-2 rounded-lg">
            {item.found
              ? <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
              : <XCircle      className="w-4 h-4 text-danger  shrink-0 mt-0.5" />
            }
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-foreground">{item.type}</span>
                <span className={clsx(
                  'text-xs px-1.5 py-0.5 rounded border ml-auto',
                  item.impact === 'high'   ? 'text-danger  bg-danger/10  border-danger/20' :
                  item.impact === 'medium' ? 'text-warning bg-warning/10 border-warning/20' :
                                            'text-muted   bg-surface-2  border-border'
                )}>{item.impact}</span>
              </div>
              {!item.found && item.note && <p className="text-xs text-foreground-dim mt-0.5">{item.note}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ContentGapsMockup() {
  const gaps = [
    { engine: 'ChatGPT',    q: 'What should I look for when hiring a personal injury attorney?',      missing: 'No page on your site answers this. A competitor\'s blog ranks for it and gets cited instead.' },
    { engine: 'Perplexity', q: 'How long does a personal injury case take to settle in Texas?',        missing: 'State-specific timeline content is missing entirely from your site.' },
    { engine: 'Gemini',     q: 'What is the average settlement for a car accident?',                   missing: 'Settlement data pages are heavily cited by Gemini. You have no equivalent content.' },
    { engine: 'Claude',     q: 'What is contingency fee and how does it work for injury cases?',      missing: 'Your FAQ doesn\'t cover legal fee structures — a high-intent research query.' },
    { engine: 'ChatGPT',    q: 'Should I talk to insurance before hiring a lawyer after a car crash?', missing: 'No content addressing this critical decision point that drives attorney hires.' },
  ]
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-foreground-dim">5 questions AI engines are answering in your industry — that your site doesn&apos;t cover:</p>
      {gaps.map((g, i) => (
        <div key={i} className="p-3 bg-surface-2 border border-border rounded-xl flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-accent font-semibold">{g.engine}</span>
          </div>
          <p className="text-xs font-medium text-foreground leading-snug">&ldquo;{g.q}&rdquo;</p>
          <div className="flex items-start gap-1.5">
            <AlertCircle className="w-3 h-3 text-warning shrink-0 mt-0.5" />
            <p className="text-xs text-foreground-dim">{g.missing}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function GbpMockup() {
  const signals = [
    { label: 'LocalBusiness schema detected',      ok: false },
    { label: 'Review / AggregateRating schema',    ok: false },
    { label: 'Business name consistent in markup', ok: true  },
  ]
  const recs = [
    'Add LocalBusiness JSON-LD with name, address, phone, and openingHours to your homepage.',
    'Implement AggregateRating schema pulling from your Google review count and average.',
    'Embed your Google Maps iframe on your contact page to reinforce location signals.',
  ]
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-2">
        {signals.map(s => (
          <div key={s.label} className={clsx(
            'flex items-center gap-2.5 p-3 rounded-xl border text-sm',
            s.ok ? 'bg-success/5 border-success/20 text-success' : 'bg-surface-2 border-border text-muted'
          )}>
            {s.ok ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
            <span className="text-xs">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-accent uppercase tracking-wide">Recommendations</p>
        {recs.map((r, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
            <p className="text-xs text-foreground-dim leading-snug">{r}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function CompetitorGapMockup() {
  const competitors = [
    { name: 'Peak Legal Group (you)', domain: 'peaklegal.com',         score: 41, color: '#f59e0b', you: true  },
    { name: 'Johnston & Associates',  domain: 'johnstonlaw.com',       score: 67, color: '#10b981', you: false },
    { name: 'Atlas Law Firm',         domain: 'atlasinjurylaw.com',    score: 58, color: '#4f8ef7', you: false },
  ]
  const advantages = [
    'Has LocalBusiness + AggregateRating schema with 4.8★ (312 reviews)',
    'Publishes 2 blog posts/month answering common injury questions — each gets cited by Perplexity',
    'Wikipedia-linked attorneys and bar association mentions boost Claude training-data presence',
  ]
  const moves = [
    'Implement LocalBusiness + AggregateRating schema to match Johnston\'s markup advantage',
    'Publish one FAQ-style blog post per week targeting the content gaps identified above',
    'Submit your attorneys\' profiles to Martindale-Hubbell and Avvo to build editorial mentions',
  ]
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {competitors.map(c => (
          <div key={c.name}>
            <div className="flex items-center justify-between mb-1">
              <div>
                <span className={clsx('text-xs', c.you ? 'text-foreground font-semibold' : 'text-foreground-dim')}>{c.name}</span>
                {!c.you && <span className="text-xs text-muted ml-1.5">({c.domain})</span>}
              </div>
              <span className="text-xs font-bold" style={{ color: c.color }}>{c.score}/100</span>
            </div>
            <div className="h-2.5 bg-surface rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${c.score}%`, background: c.color }} />
            </div>
          </div>
        ))}
        <p className="text-xs font-semibold text-danger mt-1">⚠ 26 point gap vs Johnston &amp; Associates</p>
      </div>
      <div>
        <p className="text-xs font-semibold text-foreground-dim uppercase tracking-wide mb-2">What Johnston does better</p>
        {advantages.map((a, i) => (
          <div key={i} className="flex items-start gap-2 mb-1.5">
            <XCircle className="w-3.5 h-3.5 text-danger shrink-0 mt-0.5" />
            <p className="text-xs text-foreground-dim">{a}</p>
          </div>
        ))}
      </div>
      <div>
        <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">How to close the gap</p>
        {moves.map((m, i) => (
          <div key={i} className="flex items-start gap-2 mb-1.5">
            <span className="text-accent text-xs shrink-0 mt-0.5">→</span>
            <p className="text-xs text-foreground-dim">{m}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const MOCKUPS: Record<string, React.ReactNode> = {
  score:      <ScoreOverviewMockup />,
  schema:     <SchemaCheckerMockup />,
  content:    <ContentGapsMockup />,
  gbp:        <GbpMockup />,
  competitor: <CompetitorGapMockup />,
}

export function SampleResult() {
  const [active, setActive] = useState('score')

  return (
    <section className="section">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Sample report</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">See exactly what you\'re getting</h2>
        <p className="mt-4 text-foreground-dim max-w-xl mx-auto">
          Every section of your report — live mockup for a fictional law firm. Your report will show your real business, real scores, and real action items.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Tab bar */}
        <div className="flex gap-1 overflow-x-auto pb-1 mb-4 scrollbar-hide">
          {TABS.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={clsx(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0',
                  active === tab.id
                    ? 'bg-accent text-white'
                    : 'bg-surface-2 text-muted border border-border hover:text-foreground-dim'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Report card */}
        <div className="card p-6">
          {/* Consistent header */}
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-border">
            <div>
              <p className="text-xs text-muted">Sample Business</p>
              <p className="font-semibold text-foreground">Peak Legal Group</p>
              <p className="text-xs text-muted">peaklegal.com · Austin, TX</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs text-muted">Overall Score</p>
                <p className="text-2xl font-bold text-warning">41</p>
              </div>
              <span className="px-2.5 py-1 text-xs font-bold bg-warning/10 border border-warning/20 text-warning rounded-full">Weak</span>
            </div>
          </div>

          {/* Tab content */}
          <div>{MOCKUPS[active]}</div>
        </div>

        {/* CTA */}
        <div className="mt-8 p-6 rounded-2xl border border-accent/20 bg-accent/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-foreground text-lg">Ready to see your real scores?</p>
            <p className="text-sm text-muted mt-1">Get your full report — all 5 sections — for $1. Takes 30 seconds.</p>
          </div>
          <Button variant="primary" size="lg" onClick={() => window.location.href = '/scan'}>
            Scan my business
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
