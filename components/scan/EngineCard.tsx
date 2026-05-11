import { Badge } from '@/components/ui/Badge'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { ScoreRing } from './ScoreRing'
import type { EngineResult } from '@/lib/types'
import { AI_ENGINES } from '@/lib/constants'

export function EngineCard({ result }: { result: EngineResult }) {
  const meta = AI_ENGINES.find((e) => e.id === result.engine)

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: (meta?.color ?? '#4f8ef7') + '20', color: meta?.color ?? '#4f8ef7', border: `1px solid ${meta?.color ?? '#4f8ef7'}30` }}
          >
            {result.engineLabel[0]}
          </div>
          <span className="font-semibold text-sm">{result.engineLabel}</span>
        </div>
        <ScoreRing score={result.overallScore} size={80} />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-sm text-foreground-dim leading-relaxed">{result.summary}</p>
        <div className="flex flex-col gap-2">
          {result.topics.map((t) => (
            <div key={t.topic} className="flex items-center gap-3">
              <p className="text-xs text-muted w-28 shrink-0 truncate">{t.topic}</p>
              <div className="flex-1 h-1.5 bg-surface-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${t.score}%`, backgroundColor: meta?.color ?? '#4f8ef7', opacity: 0.8 }}
                />
              </div>
              <p className="text-xs font-semibold w-6 text-right text-foreground-dim">{t.score}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
