import { createSupabaseServer } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '').toLowerCase().split(',').map(e => e.trim()).filter(Boolean)

export async function GET() {
  try {
    const supabase = await createSupabaseServer()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (!ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? '')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json({ reviews: data })
  } catch (err) {
    console.error('Admin review fetch error:', err)
    return NextResponse.json({ error: 'Failed to fetch reviews.' }, { status: 500 })
  }
}
