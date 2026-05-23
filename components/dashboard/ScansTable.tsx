'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { formatDate, getScoreColor } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'

type ScanRow = {
  id: string
  created_at: string
  url: string
  business_name: string | null
  score: number | null
  paid: boolean
  report_token: string | null
}

export function ScansTable({ secretKey }: { secretKey: string }) {
  const [scans,   setScans]   = useState<ScanRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/dashboard/scans?key=${secretKey}`)
      .then((r) => r.json())
      .then(({ rows }) => {
        setScans(rows ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [secretKey])

  if (loading) return <p className="text-muted text-sm">Loading scans...</p>
  if (!scans.length) return <p className="text-muted text-sm">No scans yet.</p>

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {['URL', 'Business', 'Score', 'Paid', 'Date', 'Report'].map((h) => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scans.map((s) => (
            <tr key={s.id} className="border-b border-border/50 hover:bg-surface-2/50 transition-colors">
              <td className="py-3 px-3 text-muted max-w-[200px] truncate" title={s.url}>
                {s.url.replace(/^https?:\/\/(www\.)?/, '')}
              </td>
              <td className="py-3 px-3 font-medium text-foreground max-w-[140px] truncate">
                {s.business_name ?? <span className="text-muted/50">&mdash;</span>}
              </td>
              <td className="py-3 px-3">
                {s.score != null
                  ? <span className={`font-bold ${getScoreColor(s.score)}`}>{s.score}</span>
                  : <span className="text-muted">&mdash;</span>}
              </td>
              <td className="py-3 px-3">
                <Badge variant={s.paid ? 'success' : 'neutral'} className="text-xs">
                  {s.paid ? 'Paid $9.99' : 'Free'}
                </Badge>
              </td>
              <td className="py-3 px-3 text-muted whitespace-nowrap">{formatDate(s.created_at)}</td>
              <td className="py-3 px-3">
                {s.report_token ? (
                  <a
                    href={`/report/${s.report_token}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-hover transition-colors"
                    title="Open paid report"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-muted/30">&mdash;</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
