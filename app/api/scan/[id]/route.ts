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

  const client = supabase

  const { data, error } = await client
    .from('scan_reports')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Report not found.' }, { status: 404 })
  }

  const report = {
    id:           data.id,
    domain:       data.domain,
    score:        data.score,
    issues:       data.issues,
    website:      data.website,
    topics:       data.topics,
    createdAt:    data.created_at,
  }

  return NextResponse.json(report)
}
