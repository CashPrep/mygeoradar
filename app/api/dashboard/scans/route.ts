import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

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

  // Fetch scans + their purchase status in parallel
  const [scansRes, purchasesRes] = await Promise.all([
    db
      .from('scans')
      .select('id, created_at, url, business_name, score')
      .order('created_at', { ascending: false })
      .limit(200),
    db
      .from('report_purchases')
      .select('scan_id, token, paid_at')
      .not('paid_at', 'is', null),
  ])

  const scans     = scansRes.data     ?? []
  const purchases = purchasesRes.data ?? []

  // Build a lookup map: scan_id -> { token }
  const purchaseMap = new Map<string, { token: string }>()
  for (const p of purchases) {
    if (p.scan_id) purchaseMap.set(p.scan_id, { token: p.token })
  }

  const rows = scans.map((s) => {
    const purchase = purchaseMap.get(s.id)
    return {
      id:            s.id,
      created_at:    s.created_at,
      url:           s.url,
      business_name: s.business_name ?? null,
      score:         s.score,
      paid:          !!purchase,
      report_token:  purchase?.token ?? null,
    }
  })

  return NextResponse.json({ rows })
}
