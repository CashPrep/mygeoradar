import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  if (!supabase) {
    return NextResponse.json({ error: 'Supabase client not initialized.' }, { status: 500 })
  }

  const { data, error } = await supabase
    .from('scan_reports')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Report not found.' }, { status: 404 })
  }

  return NextResponse.json({
    id:            data.id,
    business_name: data.business_name,
    website:       data.website,
    topics:        data.topics,
    location:      data.location,
    industry:      data.industry,
    paid:          data.paid,
    created_at:    data.created_at,
    overall_score: data.overall_score,
    level:         data.level,
    engines:       data.engines,
    top_actions:   data.top_actions,
    quick_wins:    data.quick_wins,
    schema_check:  data.schema_check  ?? null,
    content_gaps:  data.content_gaps  ?? null,
    gbp_signal:    data.gbp_signal    ?? null,
  })
}
