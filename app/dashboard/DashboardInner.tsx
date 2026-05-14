'use client'
import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { ScansTable } from '@/components/dashboard/ScansTable'
import { ReviewsTable } from '@/components/dashboard/ReviewsTable'
import { Badge } from '@/components/ui/Badge'
import { Radar, DollarSign, BarChart2, Star } from 'lucide-react'
import { clsx } from 'clsx'

type Stats = {
  totalScans: number
  paidScans: number
  revenue: number
  avgScore: number
  totalReviews: number
  pendingReviews: number
}

type Tab = 'scans' | 'reviews'

export default function DashboardInner() {
  const params     = useSearchParams()
  const secretKey  = params.get('key') ?? ''

  const [stats,   setStats]   = useState<Stats | null>(null)
  const [tab,     setTab]     = useState<Tab>('scans')
  const [authed,  setAuthed]  = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchStats = useCallback(async () => {
    const res  = await fetch(`/api/dashboard/stats?key=${secretKey}`)
    const data = await res.json()
    if (data.error) { setAuthed(false); setLoading(false); return }
    setStats(data)
    setAuthed(true)
    setLoading(false)
  }, [secretKey])

  useEffect(() => { fetchStats() }, [fetchStats])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Radar className="w-8 h-8 text-accent animate-pulse" />
      </div>
    )
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Unauthorized</h2>
          <p className="text-muted">Add <code>?key=YOUR_DASHBOARD_SECRET</code> to the URL.</p>
        </div>
      </div>
    )
  }

  const statCards = [
    { label: 'Total scans',     value: stats!.totalScans,              icon: Radar,      color: 'text-accent' },
    { label: 'Revenue',         value: `$${stats!.revenue.toFixed(2)}`, icon: DollarSign, color: 'text-success' },
    { label: 'Avg score',       value: stats!.avgScore,                icon: BarChart2,  color: 'text-warning' },
    { label: 'Pending reviews', value: stats!.pendingReviews,          icon: Star,       color: 'text-accent' },
  ]

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Badge variant="neutral">Admin</Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4">
              <p className="text-muted text-sm mb-1">{s.label}</p>
              <div className="flex items-center gap-2">
                <Icon className={clsx('w-4 h-4', s.color)} />
                <span className="text-xl font-bold">{s.value}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        {(['scans', 'reviews'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={clsx(
              'px-4 py-2.5 text-sm font-medium capitalize transition-all border-b-2 -mb-px',
              tab === t
                ? 'border-accent text-accent'
                : 'border-transparent text-muted hover:text-foreground'
            )}
          >
            {t}
            {t === 'reviews' && stats!.pendingReviews > 0 && (
              <Badge className="ml-2">{stats!.pendingReviews}</Badge>
            )}
          </button>
        ))}
      </div>

      {tab === 'scans'   && <ScansTable   secretKey={secretKey} />}
      {tab === 'reviews' && <ReviewsTable secretKey={secretKey} />}
    </div>
  )
}
