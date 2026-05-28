import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET /api/admin/reviews — returns ALL reviews including 1-3 star (bad) ones
// Requires authenticated session (you must be logged in)
export async function GET() {
  try {
    const supabase = await createClient()

    // Auth check — only you (logged-in admin) can see bad reviews
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('reviews')
      .select('id, name, email, rating, body, published, created_at')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ reviews: data })
  } catch (err) {
    console.error('Admin review fetch error:', err)
    return NextResponse.json({ error: 'Failed to fetch reviews.' }, { status: 500 })
  }
}
