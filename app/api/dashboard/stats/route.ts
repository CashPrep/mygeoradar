import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function GET(req: NextRequest) {
  const key = new URL(req.url).searchParams.get('key')
  if (key !== process.env.DASHBOARD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const db = getAdmin()

  const [scansRes, reportPurchasesRes, playbookPurchasesRes, reviewsRes] = await Promise.all([
    db.from('scans').select('id, score'),
    db.from('report_purchases').select('id').not('paid_at', 'is', null),
    db.from('playbook_purchases').select('id'),
    db.from('reviews').select('approved, rating'),
  ])

  const scans              = scansRes.data              ?? []
  const reportPurchases    = reportPurchasesRes.data    ?? []
  const playbookPurchases  = playbookPurchasesRes.data  ?? []
  const reviews            = reviewsRes.data            ?? []

  const avgScore = scans.length
    ? Math.round(scans.reduce((sum, s) => sum + (s.score ?? 0), 0) / scans.length)
    : 0

  const revenue = (reportPurchases.length * 9.99) + (playbookPurchases.length * 27)

  return NextResponse.json({
    totalScans:      scans.length,
    paidScans:       reportPurchases.length,
    playbookSales:   playbookPurchases.length,
    revenue:         parseFloat(revenue.toFixed(2)),
    avgScore,
    totalReviews:    reviews.length,
    pendingReviews:  reviews.filter((r) => !r.approved).length,
  })
}
