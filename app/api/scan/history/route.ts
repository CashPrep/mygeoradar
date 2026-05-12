import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/scan/history?website=example.com
// Returns all paid, scored scans for a given domain, oldest→newest
export async function GET(req: NextRequest) {
  const website = req.nextUrl.searchParams.get('website')
  if (!website) {
    return NextResponse.json({ error: 'Missing website param.' }, { status: 400 })
  }

  // Normalise: strip protocol + trailing slash so "https://example.com/" == "example.com"
  const normalised = website
    .replace(/^https?:\/\//, '')
    .replace(/\/+$/, '')
    .toLowerCase()

  const { data, error } = await supabase
    .from('scan_reports')
    .select('id, created_at, overall_score, level, business_name')
    .eq('paid', true)
    .not('overall_score', 'is', null)
    .ilike('website', `%${normalised}%`)
    .order('created_at', { ascending: true })
    .limit(20)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ history: data ?? [] })
}
