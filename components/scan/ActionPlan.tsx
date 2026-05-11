import { Badge } from '@/components/ui/Badge'
import type { ActionItem } from '@/lib/types'
import { clsx } from 'clsx'

const EFFORT_VARIANT: Record<string, 'success' | 'warning' | 'danger'> = {
  easy:   'success',
  medium: 'warning',
  hard:   'danger',
}

const PRIORITY_DOT: Record<string, string> = {
  high:   'bg-danger',
  medium: 'bg-warning',
  low:    'bg-success',
}

export function ActionPlan({ actions }: { actions: ActionItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      {actions.map((a, i) => (
        <div
          key={i}
          className="flex items-start gap-4 p-4 bg-surface border border-border rounded-xl hover:border-border-bright transition-all"
        >
          <div className="flex items-center gap-2 shrink-0 mt-0.5">
            <span className="text-sm font-bold text-foreground-dim w-5">{i + 1}</span>
            <div className={clsx('w-2 h-2 rounded-full', PRIORITY_DOT[a.priority])} />
          </div>
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">{a.title}</p>
            <p className="text-sm text-foreground-dim leading-relaxed">{a.description}</p>
            <div className="flex gap-2 mt-1">
              <Badge variant="neutral" className="text-xs capitalize">{a.category}</Badge>
              <Badge variant={EFFORT_VARIANT[a.effort]} className="text-xs capitalize">{a.effort} effort</Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
