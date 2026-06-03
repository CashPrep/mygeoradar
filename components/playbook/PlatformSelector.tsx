'use client'

import { PLATFORM_LIST } from '@/lib/platforms'
import type { PlatformId } from '@/lib/platforms'
import { X } from 'lucide-react'
import { clsx } from 'clsx'

interface Props {
  value:    PlatformId | null
  onChange: (id: PlatformId | null) => void
}

export function PlatformSelector({ value, onChange }: Props) {
  // Only show platforms that have a guide
  const options = PLATFORM_LIST.filter(p => p.hasGuide)

  return (
    <div className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-4">
      <div>
        <p className="text-sm font-semibold text-foreground">
          Are you on a website builder?
        </p>
        <p className="text-xs text-muted mt-0.5 leading-relaxed">
          Select yours to receive a platform-specific GEO guide alongside the playbook — free.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((p) => {
          const selected = value === p.id
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onChange(selected ? null : p.id)}
              className={clsx(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all',
                selected
                  ? 'bg-accent/10 border-accent/40 text-accent'
                  : 'bg-white border-border text-foreground hover:border-accent/30 hover:bg-accent/5',
              )}
            >
              <span aria-hidden="true">{p.emoji}</span>
              {p.label}
              {selected && (
                <X className="w-3 h-3 ml-0.5 opacity-60" aria-hidden="true" />
              )}
            </button>
          )
        })}
      </div>

      {value && (() => {
        const p = PLATFORM_LIST.find(pl => pl.id === value)
        if (!p) return null
        return (
          <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-accent/5 border border-accent/20">
            <span className="text-base leading-none mt-0.5" aria-hidden="true">{p.emoji}</span>
            <p className="text-xs text-accent leading-relaxed">
              <strong>+ {p.label}-Specific GEO Guide</strong> will be included because you&apos;re
              on {p.label}. Step-by-step instructions for your exact platform.
            </p>
          </div>
        )
      })()}
    </div>
  )
}
