import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/scan/promo-check
// Returns { eligible: boolean } — whether this IP has never paid before
export async function GET(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    null

  if (!ip) {
    // Can't determine IP — be generous and show promo
    return NextResponse.json({ eligible: true })
  }

  const { data, error } = await supabase
    .from('scan_reports')
    .select('id')
    .eq('ip_address', ip)
    .eq('paid', true)
    .limit(1)

  if (error) {
    // On DB error, default to showing promo (fail open)
    return NextResponse.json({ eligible: true })
  }

  const eligible = !data || data.length === 0
  return NextResponse.json({ eligible })
}
