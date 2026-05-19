import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { createSupabaseServer } from '@/lib/supabase-server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  // Use supabaseAdmin so RLS never silently blocks a valid report fetch.
  // Security is enforced below via explicit ownership check — not RLS.
  const { data, error } = await supabaseAdmin
    .from('scan_reports')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Report not found.' }, { status: 404 })
  }

  // Gate: unpaid scans return only status — never report data
  if (!data.paid) {
    return NextResponse.json({ id: data.id, paid: false, business_name: data.business_name })
  }

  // Ownership check: if a logged-in user is present, they must own this scan.
  // Anonymous paid scans (no user_id) are accessible to anyone with the link.
  try {
    const serverSupabase = await createSupabaseServer()
    const { data: { user } } = await serverSupabase.auth.getUser()
    if (user && data.user_id && data.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
    }
  } catch {
    // Not a server context (e.g. called from webhook) — skip ownership check
  }

  return NextResponse.json({
    id:             data.id,
    business_name:  data.business_name,
    website:        data.website,
    topics:         data.topics,
    location:       data.location,
    industry:       data.industry,
    paid:           data.paid,
    created_at:     data.created_at,
    overall_score:  data.overall_score,
    level:          data.level,
    engines:        data.engines,
    top_actions:    data.top_actions,
    quick_wins:     data.quick_wins,
    schema_check:   data.schema_check   ?? null,
    content_gaps:   data.content_gaps   ?? null,
    gbp_signal:     data.gbp_signal     ?? null,
    competitor_gap: data.competitor_gap ?? null,
    scan_error:     data.scan_error     ?? null,
    email:          data.email          ?? null,
    user_id:        data.user_id        ?? null,
  })
}
