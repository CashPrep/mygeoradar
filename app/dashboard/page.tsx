'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { ScansTable } from '@/components/dashboard/ScansTable'
import { ReviewsTable } from '@/components/dashboard/ReviewsTable'
import { Badge } from '@/components/ui/Badge'
import { Radar, DollarSign, BarChart2, Clock, Star } from 'lucide-react'
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

export default function DashboardPage() {
  const params    = useSearchParams()
  const secretKey = params.get('key') ?? ''

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
        <div className="card p-8 text-center">
          <p className="text-danger font-semibold">Unauthorized</p>
          <p className="text-sm text-muted mt-2">Add <code className="text-accent">?key=YOUR_DASHBOARD_SECRET</code> to the URL.</p>
        </div>
      </div>
    )
  }

  const statCards = [
    { label: 'Total scans',    value: stats!.totalScans,              icon: Radar,     color: 'text-accent' },
    { label: 'Revenue',        value: `$${stats!.revenue.toFixed(2)}`, icon: DollarSign, color: 'text-success' },
    { label: 'Avg score',      value: stats!.avgScore,                icon: BarChart2,  color: 'text-warning' },
    { label: 'Pending reviews',value: stats!.pendingReviews,          icon: Star,       color: 'text-accent' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Radar className="w-6 h-6 text-accent" />
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Badge variant="accent" className="text-xs">Admin</Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.label} className="card p-5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted">{s.label}</p>
                  <Icon className={clsx('w-4 h-4', s.color)} />
                </div>
                <p className={clsx('text-2xl font-bold', s.color)}>{s.value}</p>
              </div>
            )
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-border">
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
                <span className="ml-2 px-1.5 py-0.5 bg-accent text-white text-xs rounded-full">
                  {stats!.pendingReviews}
                </span>
              )}
            </button>
          ))}
        </div>

        {tab === 'scans'   && <ScansTable   secretKey={secretKey} />}
        {tab === 'reviews' && <ReviewsTable secretKey={secretKey} onUpdate={fetchStats} />}
      </div>
    </div>
  )
}
