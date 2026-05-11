'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Badge } from '@/components/ui/Badge'
import { formatDate, getScoreColor } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type ScanRow = {
  id: string
  created_at: string
  business_name: string
  website: string
  topics: string[]
  overall_score: number | null
  paid: boolean
}

export function ScansTable({ secretKey }: { secretKey: string }) {
  const [scans,   setScans]   = useState<ScanRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('scan_reports')
      .select('id, created_at, business_name, website, topics, overall_score, paid')
      .order('created_at', { ascending: false })
      .limit(100)
      .then(({ data }) => {
        setScans(data ?? [])
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="text-muted text-sm">Loading scans...</p>
  if (!scans.length) return <p className="text-muted text-sm">No scans yet.</p>

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {['Business', 'Website', 'Topics', 'Score', 'Paid', 'Date', ''].map((h) => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scans.map((s) => (
            <tr key={s.id} className="border-b border-border/50 hover:bg-surface-2/50 transition-colors">
              <td className="py-3 px-3 font-medium text-foreground">{s.business_name}</td>
              <td className="py-3 px-3 text-muted">{s.website}</td>
              <td className="py-3 px-3">
                <div className="flex flex-wrap gap-1">
                  {s.topics.slice(0, 2).map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-surface-2 border border-border rounded text-xs text-foreground-dim">{t}</span>
                  ))}
                  {s.topics.length > 2 && <span className="text-xs text-muted">+{s.topics.length - 2}</span>}
                </div>
              </td>
              <td className="py-3 px-3">
                {s.overall_score != null
                  ? <span className={`font-bold ${getScoreColor(s.overall_score)}`}>{s.overall_score}</span>
                  : <span className="text-muted">—</span>}
              </td>
              <td className="py-3 px-3">
                <Badge variant={s.paid ? 'success' : 'neutral'} className="text-xs">
                  {s.paid ? 'Paid' : 'Unpaid'}
                </Badge>
              </td>
              <td className="py-3 px-3 text-muted">{formatDate(s.created_at)}</td>
              <td className="py-3 px-3">
                <a
                  href={`/scan/${s.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
