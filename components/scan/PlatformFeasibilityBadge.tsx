'use client'

import { clsx } from 'clsx'
import type { PlatformFeasibility } from '@/lib/platforms'

interface Props {
  feasibility: PlatformFeasibility
  note?: string | null
}

const CONFIG: Record<PlatformFeasibility, { label: string; classes: string; dot: string }> = {
  full:          { label: 'Fixable',      classes: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  partial:       { label: 'Needs App',    classes: 'bg-amber-50  text-amber-700  border-amber-200',  dot: 'bg-amber-400'  },
  'requires-dev':{ label: 'Needs Dev',   classes: 'bg-red-50    text-red-700    border-red-200',    dot: 'bg-red-500'    },
}

export function PlatformFeasibilityBadge({ feasibility, note }: Props) {
  const cfg = CONFIG[feasibility]
  return (
    <span
      title={note ?? undefined}
      className={clsx(
        'inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide',
        'px-1.5 py-0.5 rounded border flex-shrink-0 cursor-default',
        cfg.classes,
      )}
    >
      <span className={clsx('w-1.5 h-1.5 rounded-full flex-shrink-0', cfg.dot)} />
      {cfg.label}
    </span>
  )
}
