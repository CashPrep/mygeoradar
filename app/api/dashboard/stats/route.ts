import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  const key = new URL(req.url).searchParams.get('key')
  if (key !== process.env.DASHBOARD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [scansRes, reviewsRes] = await Promise.all([
    adminSupabase.from('scan_reports').select('overall_score, paid, created_at'),
    adminSupabase.from('reviews').select('approved, rating'),
  ])

  const scans   = scansRes.data   ?? []
  const reviews = reviewsRes.data ?? []

  const paidScans    = scans.filter((s) => s.paid)
  const avgScore     = paidScans.length
    ? Math.round(paidScans.reduce((sum, s) => sum + (s.overall_score ?? 0), 0) / paidScans.length)
    : 0
  const pendingReviews = reviews.filter((r) => !r.approved).length

  return NextResponse.json({
    totalScans:    scans.length,
    paidScans:     paidScans.length,
    revenue:       paidScans.length * 1,
    avgScore,
    totalReviews:  reviews.length,
    pendingReviews,
  })
}
