'use client'

import { useState } from 'react'
import {
  Radar, BarChart2, ListChecks, Code2, TrendingUp, RefreshCw,
  Swords, MapPin, ChevronRight, CheckCircle2, XCircle
} from 'lucide-react'
import { clsx } from 'clsx'

const features = [
  {
    icon:    Radar,
    accent:  '#4f8ef7',
    tag:     'Core Engine',
    title:   'Your score across all 4 AI engines',
    value:   'See whether ChatGPT, Perplexity, Gemini, and Claude mention your business when customers ask — and exactly how well you rank on each one.',
    outcome: 'Businesses that appear in AI answers see 2–3x more inbound inquiries.',
    mockup: (
      <div className="flex flex-col gap-2.5">
        {[
          { label: 'ChatGPT',    score: 34, color: '#10a37f' },
          { label: 'Perplexity', score: 61, color: '#4f8ef7' },
          { label: 'Gemini',     score: 22, color: '#8b5cf6' },
          { label: 'Claude',     score: 45, color: '#f59e0b' },
        ].map(e => (
          <div key={e.label} className="flex items-center gap-3">
            <span className="text-xs text-muted w-20 shrink-0">{e.label}</span>
            <div className="flex-1 h-2 bg-surface-2 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${e.score}%`, backgroundColor: e.color }} />
            </div>
            <span className="text-xs font-bold w-6 text-right" style={{ color: e.color }}>{e.score}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon:    ListChecks,
    accent:  '#22c55e',
    tag:     'Action Plan',
    title:   'Exactly what to fix, in order',
    value:   '5 prioritized actions — high to low — each with specific steps. No 40-page PDF. No guesswork.',
    outcome: 'Users who act on the top 3 fixes see an average +18 point score increase within 30 days.',
    mockup: (
      <div className="flex flex-col gap-2">
        {[
          { priority: 'high',   effort: 'easy',   title: 'Add LocalBusiness JSON-LD to homepage' },
          { priority: 'high',   effort: 'medium', title: 'Create an About page with E-E-A-T signals' },
          { priority: 'medium', effort: 'easy',   title: 'Add FAQ schema to your service pages' },
        ].map((a, i) => (
          <div key={i} className="flex items-start gap-3 p-2.5 bg-surface-2 rounded-lg">
            <span className={clsx(
              'text-xs px-2 py-0.5 rounded-full border font-medium shrink-0 mt-0.5',
              a.priority === 'high' ? 'bg-danger/10 text-danger border-danger/20' : 'bg-warning/10 text-warning border-warning/20'
            )}>{a.priority}</span>
            <p className="text-xs text-foreground-dim leading-snug">{a.title}</p>
            <span className={clsx(
              'text-xs px-1.5 py-0.5 rounded border ml-auto shrink-0 mt-0.5',
              a.effort === 'easy' ? 'text-success border-success/30 bg-success/10' : 'text-warning border-warning/30 bg-warning/10'
            )}>{a.effort}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon:    Code2,
    accent:  '#f59e0b',
    tag:     'Schema Checker',
    title:   'Find out why AI engines skip your site',
    value:   'AI engines rely on structured data to understand your business. We scan your live site and flag exactly what\u2019s missing.',
    outcome: 'Adding LocalBusiness + Review schema can improve AI citation probability by up to 40%.',
    mockup: (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-foreground">Schema Score</span>
          <span className="text-sm font-bold text-warning">28/100</span>
        </div>
        {[
          { type: 'LocalBusiness',    found: false, impact: 'high' },
          { type: 'AggregateRating',  found: false, impact: 'high' },
          { type: 'FAQPage',          found: false, impact: 'medium' },
          { type: 'BreadcrumbList',   found: true,  impact: 'low' },
        ].map(s => (
          <div key={s.type} className="flex items-center gap-2 p-2 bg-surface-2 rounded-lg">
            {s.found
              ? <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
              : <XCircle      className="w-3.5 h-3.5 text-danger  shrink-0" />
            }
            <span className="text-xs text-foreground-dim flex-1">{s.type}</span>
            <span className={clsx(
              'text-xs px-1.5 py-0.5 rounded border',
              s.impact === 'high' ? 'text-danger border-danger/20 bg-danger/10' :
              s.impact === 'medium' ? 'text-warning border-warning/20 bg-warning/10' :
              'text-muted border-border bg-surface-2'
            )}>{s.impact}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon:    TrendingUp,
    accent:  '#ef4444',
    tag:     'Content Gaps',
    title:   'Questions your customers ask AI — that your site doesn\u2019t answer',
    value:   'We surface the top questions AI is answering in your industry right now. Each one is a content opportunity you\u2019re missing.',
    outcome: 'Each new page targeting an AI-answer gap increases citation probability by ~12%.',
    mockup: (
      <div className="flex flex-col gap-2">
        {[
          { engine: 'ChatGPT',    q: 'What should I look for when hiring a personal injury attorney?' },
          { engine: 'Perplexity', q: 'How long does a personal injury case take to settle?' },
          { engine: 'Gemini',     q: 'What is the average settlement for a car accident in Texas?' },
        ].map((g, i) => (
          <div key={i} className="p-2.5 bg-surface-2 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-accent font-medium">{g.engine}</span>
            </div>
            <p className="text-xs text-foreground-dim leading-snug">&ldquo;{g.q}&rdquo;</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon:    Swords,
    accent:  '#8b5cf6',
    tag:     'Competitor Gap',
    title:   'See why your competitors get cited and you don\u2019t',
    value:   'Side-by-side AI visibility scores against your top 2 competitors — plus the exact steps to close the gap.',
    outcome: 'Knowing what competitors do better cuts optimization time by 60%.',
    mockup: (
      <div className="flex flex-col gap-3">
        {[
          { name: 'Peak Legal Group (you)', score: 41, color: '#f59e0b', you: true },
          { name: 'Johnston & Associates',  score: 67, color: '#10b981', you: false },
          { name: 'Atlas Law Firm',         score: 58, color: '#4f8ef7', you: false },
        ].map(c => (
          <div key={c.name}>
            <div className="flex items-center justify-between mb-1">
              <span className={clsx('text-xs', c.you ? 'text-foreground font-semibold' : 'text-foreground-dim')}>{c.name}</span>
              <span className="text-xs font-bold" style={{ color: c.color }}>{c.score}/100</span>
            </div>
            <div className="h-2.5 bg-surface rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${c.score}%`, background: c.color }} />
            </div>
          </div>
        ))}
        <p className="text-xs text-danger font-medium mt-1">⚠ 26 point gap vs top competitor</p>
      </div>
    ),
  },
  {
    icon:    MapPin,
    accent:  '#10b981',
    tag:     'GBP Signals',
    title:   'Fix the signals Gemini runs on',
    value:   'Gemini pulls from Google\u2019s ecosystem. We audit your site\u2019s Google signals and tell you exactly what to fix.',
    outcome: 'Fixing GBP schema is the single highest-ROI action for improving Gemini citation rates.',
    mockup: (
      <div className="flex flex-col gap-2">
        {[
          { label: 'LocalBusiness schema detected',      ok: false },
          { label: 'Review / AggregateRating schema',    ok: false },
          { label: 'Business name consistent in markup', ok: true  },
        ].map(s => (
          <div key={s.label} className={clsx(
            'flex items-center gap-2.5 p-2.5 rounded-xl border text-xs',
            s.ok ? 'bg-success/5 border-success/20 text-success' : 'bg-surface-2 border-border text-muted'
          )}>
            {s.ok ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> : <XCircle className="w-3.5 h-3.5 shrink-0" />}
            {s.label}
          </div>
        ))}
        <div className="p-2.5 bg-warning/5 border border-warning/20 rounded-xl">
          <p className="text-xs text-warning">Add LocalBusiness + Review schema to boost Gemini visibility by an estimated +35%</p>
        </div>
      </div>
    ),
  },
  {
    icon:    RefreshCw,
    accent:  '#10a37f',
    tag:     'Score Trend',
    title:   'Track your progress over time',
    value:   'Every scan is saved. See your score history, compare reports, and confirm that your fixes are actually working.',
    outcome: 'Customers who run 3+ scans improve their score by an average of +31 points over 90 days.',
    mockup: (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted">3 scans</span>
          <span className="text-xs font-bold text-success px-2 py-0.5 rounded-full bg-success/10 border border-success/20">+22 pts since first scan</span>
        </div>
        <svg viewBox="0 0 260 70" className="w-full" style={{ maxHeight: 70 }}>
          <defs>
            <linearGradient id="feat-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#6366f1" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M20,55 L130,35 L240,18 L240,65 L20,65 Z" fill="url(#feat-fill)" />
          <polyline points="20,55 130,35 240,18" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx="20"  cy="55" r="4" fill="#ef4444" stroke="#09090b" strokeWidth="1.5" />
          <circle cx="130" cy="35" r="4" fill="#f59e0b" stroke="#09090b" strokeWidth="1.5" />
          <circle cx="240" cy="18" r="5" fill="#10b981" stroke="#09090b" strokeWidth="1.5" />
          <circle cx="240" cy="18" r="9" fill="none" stroke="#6366f1" strokeWidth="1.5" opacity="0.4" />
          <text x="20"  y="64" fontSize="7" fill="#71717a" textAnchor="middle">Jan 12</text>
          <text x="130" y="64" fontSize="7" fill="#71717a" textAnchor="middle">Feb 8</text>
          <text x="240" y="64" fontSize="7" fill="#71717a" textAnchor="middle">Mar 3</text>
        </svg>
        <div className="flex flex-col gap-1">
          {[
            { date: 'Mar 3',  score: 63, current: true },
            { date: 'Feb 8',  score: 49, current: false },
            { date: 'Jan 12', score: 41, current: false },
          ].map(p => (
            <div key={p.date} className={clsx(
              'flex items-center justify-between px-3 py-1.5 rounded-lg text-xs',
              p.current ? 'bg-accent/10 border border-accent/20' : 'bg-surface-2 border border-border'
            )}>
              <div className="flex items-center gap-2">
                {p.current && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                <span className="text-muted">{p.date}</span>
                {p.current && <span className="text-accent font-medium">current</span>}
              </div>
              <span className={clsx('font-bold', p.score >= 60 ? 'text-success' : p.score >= 40 ? 'text-warning' : 'text-danger')}>
                {p.score}/100
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

export function FeaturesGrid() {
  const [active, setActive] = useState(0)
  const f = features[active]
  const Icon = f.icon

  return (
    <section className="section">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">What you get</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Everything in one scan</h2>
        <p className="mt-4 text-foreground-dim max-w-xl mx-auto">
          One payment. Seven reports. No subscriptions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 max-w-5xl mx-auto">
        <div className="flex flex-col gap-1">
          {features.map((feat, i) => {
            const FIcon = feat.icon
            return (
              <button
                key={feat.tag}
                onClick={() => setActive(i)}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all text-sm',
                  active === i
                    ? 'bg-accent/10 border border-accent/30 text-foreground'
                    : 'border border-transparent text-muted hover:text-foreground-dim hover:bg-surface-2'
                )}
              >
                <FIcon className="w-4 h-4 shrink-0" style={{ color: active === i ? feat.accent : undefined }} />
                <span className="font-medium">{feat.tag}</span>
                {active === i && <ChevronRight className="w-3.5 h-3.5 ml-auto text-accent" />}
              </button>
            )
          })}
        </div>

        <div className="card p-6 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: f.accent + '15', border: `1px solid ${f.accent}30` }}
            >
              <Icon className="w-5 h-5" style={{ color: f.accent }} />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: f.accent }}>{f.tag}</span>
              <h3 className="font-bold text-foreground leading-snug text-lg">{f.title}</h3>
            </div>
          </div>

          <p className="text-sm text-foreground-dim leading-relaxed">{f.value}</p>

          <div className="flex items-start gap-3 p-3.5 rounded-xl border border-success/20 bg-success/5">
            <span className="text-success text-base shrink-0">📈</span>
            <p className="text-sm text-success font-medium leading-snug">{f.outcome}</p>
          </div>

          <div>
            <p className="text-xs text-muted uppercase tracking-wider font-semibold mb-3">Live preview</p>
            <div className="p-4 bg-surface-2 border border-border rounded-xl">
              {f.mockup}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
