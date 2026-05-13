'use client'
import { useState, useEffect } from 'react'
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Zap } from 'lucide-react'
import { clsx } from 'clsx'

type Step = {
  id:    string
  label: string
  desc:  string
  cta?:  string
  href?: string
}

const STEPS: Step[] = [
  {
    id:    'read_report',
    label: 'Read your full report',
    desc:  'Scroll through your engine scores, action plan, and Quick Wins below.',
  },
  {
    id:    'quick_win',
    label: 'Complete one Quick Win today',
    desc:  'Pick the easiest fix in your action plan and do it now — even a small change moves your score.',
  },
  {
    id:    'share',
    label: 'Share your report',
    desc:  'Copy your report link and share it with your web developer or marketing team.',
    cta:   'Copy link',
  },
  {
    id:    'account',
    label: 'Save your scan to your account',
    desc:  'Create a free account to access this scan anytime and track your progress over time.',
    cta:   'Create account',
    href:  '/login',
  },
  {
    id:    'rescan',
    label: 'Schedule a re-scan in 30 days',
    desc:  'After making fixes, re-scan to see your score improve. Monthly tracking is $5/mo.',
  },
]

const STORAGE_KEY = (scanId: string) => `mgr_checklist_${scanId}`

export function OnboardingChecklist({ scanId, hasAccount }: { scanId: string; hasAccount?: boolean }) {
  const [checked,   setChecked]   = useState<Record<string, boolean>>({})
  const [collapsed, setCollapsed] = useState(false)

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY(scanId))
      if (saved) setChecked(JSON.parse(saved))
      // Auto-mark read_report after 10s
      const t = setTimeout(() => {
        setChecked(prev => {
          const next = { ...prev, read_report: true }
          localStorage.setItem(STORAGE_KEY(scanId), JSON.stringify(next))
          return next
        })
      }, 10000)
      return () => clearTimeout(t)
    } catch { /* ignore */ }
  }, [scanId])

  function toggle(id: string) {
    setChecked(prev => {
      const next = { ...prev, [id]: !prev[id] }
      try { localStorage.setItem(STORAGE_KEY(scanId), JSON.stringify(next)) } catch { /* ignore */ }
      return next
    })
  }

  function handleCta(step: Step) {
    if (step.id === 'share') {
      navigator.clipboard.writeText(window.location.href).catch(() => {})
      toggle('share')
      return
    }
    if (step.href) {
      window.location.href = step.href
    }
  }

  // Hide the account step if user is already logged in
  const steps = hasAccount ? STEPS.filter(s => s.id !== 'account') : STEPS
  const doneCount = steps.filter(s => checked[s.id]).length
  const allDone   = doneCount === steps.length

  return (
    <div className={clsx(
      'rounded-2xl border transition-all',
      allDone
        ? 'border-success/30 bg-success/5'
        : 'border-accent/25 bg-gradient-to-br from-accent/5 to-transparent'
    )}>
      {/* Header */}
      <button
        onClick={() => setCollapsed(c => !c)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-accent" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">
              {allDone ? '🎉 You&apos;re all set!' : 'Get started checklist'}
            </p>
            <p className="text-xs text-muted">
              {doneCount}/{steps.length} steps done
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Progress bar */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-24 h-1.5 bg-surface-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{ width: `${(doneCount / steps.length) * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted">{Math.round((doneCount / steps.length) * 100)}%</span>
          </div>
          {collapsed
            ? <ChevronDown className="w-4 h-4 text-muted" />
            : <ChevronUp   className="w-4 h-4 text-muted" />
          }
        </div>
      </button>

      {/* Steps */}
      {!collapsed && (
        <div className="px-5 pb-5 flex flex-col gap-2">
          {steps.map((step) => {
            const done = !!checked[step.id]
            return (
              <div
                key={step.id}
                className={clsx(
                  'flex items-start gap-3 p-3.5 rounded-xl border transition-all',
                  done
                    ? 'border-success/20 bg-success/5'
                    : 'border-border bg-surface hover:border-accent/30'
                )}
              >
                <button
                  onClick={() => toggle(step.id)}
                  className="flex-shrink-0 mt-0.5"
                  aria-label={done ? 'Mark incomplete' : 'Mark complete'}
                >
                  {done
                    ? <CheckCircle2 className="w-5 h-5 text-success" />
                    : <Circle       className="w-5 h-5 text-muted hover:text-accent transition-colors" />
                  }
                </button>
                <div className="flex-1 min-w-0">
                  <p className={clsx(
                    'text-sm font-medium',
                    done ? 'text-muted line-through' : 'text-foreground'
                  )}>
                    {step.label}
                  </p>
                  {!done && (
                    <p className="text-xs text-muted mt-0.5 leading-relaxed">{step.desc}</p>
                  )}
                </div>
                {step.cta && !done && (
                  <button
                    onClick={() => handleCta(step)}
                    className="flex-shrink-0 text-xs font-semibold text-accent hover:underline"
                  >
                    {step.cta} →
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
