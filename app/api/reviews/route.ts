import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// POST /api/reviews — anyone can submit a review
export async function POST(req: NextRequest) {
  try {
    const { name, email, rating, body } = await req.json()

    if (!name || !rating || !body) {
      return NextResponse.json({ error: 'Name, rating, and review text are required.' }, { status: 400 })
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5.' }, { status: 400 })
    }
    if (body.trim().length < 10) {
      return NextResponse.json({ error: 'Review must be at least 10 characters.' }, { status: 400 })
    }

    const supabase = await createClient()
    const { error } = await supabase
      .from('reviews')
      .insert({ name: name.trim(), email: email?.trim() || null, rating, body: body.trim() })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Review submit error:', err)
    return NextResponse.json({ error: 'Failed to submit review.' }, { status: 500 })
  }
}

// GET /api/reviews — returns only published (4-5 star) reviews for public display
export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('reviews')
      .select('id, name, rating, body, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) throw error

    return NextResponse.json({ reviews: data })
  } catch (err) {
    console.error('Review fetch error:', err)
    return NextResponse.json({ error: 'Failed to fetch reviews.' }, { status: 500 })
  }
}
