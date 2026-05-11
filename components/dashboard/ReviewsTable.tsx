'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import { Star } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type ReviewRow = {
  id: string
  created_at: string
  name: string
  business_name: string | null
  business_type: string | null
  rating: number
  review_text: string
  website: string | null
  approved: boolean
}

export function ReviewsTable({ secretKey, onUpdate }: { secretKey: string; onUpdate?: () => void }) {
  const [reviews, setReviews] = useState<ReviewRow[]>([])
  const [loading, setLoading] = useState(true)
  const [busy,    setBusy]    = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)
      .then(({ data }) => {
        setReviews(data ?? [])
        setLoading(false)
      })
  }, [])

  async function setApproval(id: string, approved: boolean) {
    setBusy(id)
    await fetch('/api/reviews/approve', {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key':  secretKey,
      },
      body: JSON.stringify({ id, approved }),
    })
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, approved } : r))
    setBusy(null)
    onUpdate?.()
  }

  if (loading) return <p className="text-muted text-sm">Loading reviews...</p>
  if (!reviews.length) return <p className="text-muted text-sm">No reviews yet.</p>

  return (
    <div className="flex flex-col gap-4">
      {reviews.map((r) => (
        <div key={r.id} className="card p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-foreground">{r.name}</p>
              {r.business_name && <p className="text-sm text-muted">{r.business_name}{r.business_type ? ` · ${r.business_type}` : ''}</p>}
              {r.website && <p className="text-xs text-accent mt-0.5">{r.website}</p>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="w-4 h-4" fill={s <= r.rating ? '#f59e0b' : 'transparent'} stroke={s <= r.rating ? '#f59e0b' : '#6b7280'} />
                ))}
              </div>
              <Badge variant={r.approved ? 'success' : 'neutral'} className="text-xs">
                {r.approved ? 'Approved' : 'Pending'}
              </Badge>
            </div>
          </div>

          <p className="text-sm text-foreground-dim leading-relaxed">{r.review_text}</p>

          <div className="flex items-center justify-between">
            <p className="text-xs text-muted">{formatDate(r.created_at)}</p>
            <div className="flex gap-2">
              {r.approved ? (
                <Button
                  variant="danger" size="sm"
                  loading={busy === r.id}
                  onClick={() => setApproval(r.id, false)}
                >
                  Unapprove
                </Button>
              ) : (
                <Button
                  variant="primary" size="sm"
                  loading={busy === r.id}
                  onClick={() => setApproval(r.id, true)}
                >
                  Approve
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
