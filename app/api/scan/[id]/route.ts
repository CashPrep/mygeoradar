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

  const report = {
    id:            data.id,
    createdAt:     data.created_at,
    businessName:  data.business_name,
    website:       data.website,
    topics:        data.topics,
    location:      data.location,
    industry:      data.industry,
    overallScore:  data.overall_score ?? 0,
    level:         data.level ?? 'poor',
    engines:       data.engines ?? [],
    topActions:    data.top_actions ?? [],
    quickWins:     data.quick_wins ?? [],
    paid:          data.paid,
  }

  return NextResponse.json({ report })
}
