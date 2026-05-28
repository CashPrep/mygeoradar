import { createSupabaseServer } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, business_name, business_type, website, rating, review_text } = await req.json()

    if (!name || !rating || !review_text) {
      return NextResponse.json({ error: 'Name, rating, and review are required.' }, { status: 400 })
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5.' }, { status: 400 })
    }
    if (review_text.trim().length < 10) {
      return NextResponse.json({ error: 'Review must be at least 10 characters.' }, { status: 400 })
    }

    const supabase = await createSupabaseServer()
    const { error } = await supabase.from('reviews').insert({
      name: name.trim(),
      business_name: business_name?.trim() || null,
      business_type: business_type?.trim() || null,
      website: website?.trim() || null,
      rating,
      review_text: review_text.trim(),
    })

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Review submit error:', err)
    return NextResponse.json({ error: 'Failed to submit review.' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = await createSupabaseServer()
    const { data, error } = await supabase
      .from('reviews')
      .select('id, name, business_name, business_type, rating, review_text, created_at')
      .eq('approved', true)
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) throw error
    return NextResponse.json({ reviews: data })
  } catch (err) {
    console.error('Review fetch error:', err)
    return NextResponse.json({ error: 'Failed to fetch reviews.' }, { status: 500 })
  }
}
