'use client'

import type { EngineResult } from '@/lib/types'
import { ScoreRing } from './ScoreRing'
import { getScoreColor } from '@/lib/utils'
import { clsx } from 'clsx'

const ENGINE_ICONS: Record<string, string> = {
  chatgpt:    '🤖',
  perplexity: '🔍',
  gemini:     '✨',
  claude:     '🧠',
}

interface EngineCardProps {
  engine: EngineResult
}

export function EngineCard({ engine }: EngineCardProps) {
  return (
    <div className="card p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{ENGINE_ICONS[engine.engine] ?? '🔮'}</span>
          <span className="font-semibold text-foreground">{engine.engineLabel}</span>
        </div>
        <ScoreRing score={engine.overallScore} size={56} strokeWidth={5} />
      </div>

      {/* Summary */}
      <p className="text-sm text-foreground-dim leading-relaxed">{engine.summary}</p>

      {/* Topics */}
      <div className="flex flex-col gap-2">
        {engine.topics.map((t) => (
          <div key={t.topic}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-foreground-dim truncate max-w-[70%]">{t.topic}</span>
              <span className={clsx('text-xs font-bold', getScoreColor(t.score))}>{t.score}</span>
            </div>
            <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${t.score}%`, background: t.score >= 80 ? '#22c55e' : t.score >= 60 ? '#4f8ef7' : t.score >= 40 ? '#f59e0b' : '#ef4444' }}
              />
            </div>
            {t.snippet && (
              <p className="text-xs text-muted mt-1.5 italic leading-relaxed">&ldquo;{t.snippet}&rdquo;</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
