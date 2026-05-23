import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { readFile } from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

// GET /api/report-download?token=xxx
// Verifies the token belongs to a paid purchase, then serves the PDF guide.
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) {
    return NextResponse.json({ error: 'token required' }, { status: 400 })
  }

  // Verify token is valid and paid
  const supabase = getSupabase()
  const { data: purchase } = await supabase
    .from('report_purchases')
    .select('id, paid_at')
    .eq('token', token)
    .not('paid_at', 'is', null)
    .maybeSingle()

  if (!purchase) {
    return NextResponse.json({ error: 'Invalid or unpaid token.' }, { status: 403 })
  }

  // Serve the fix guides HTML file
  try {
    const filePath = path.join(process.cwd(), 'public', 'downloads', 'ai-readiness-fix-guides.html')
    const fileBuffer = await readFile(filePath)
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': 'attachment; filename="AI-Readiness-Fix-Guides-MyGeoRadar.html"',
        'Cache-Control': 'private, no-store',
      },
    })
  } catch {
    return NextResponse.json({ error: 'File not found.' }, { status: 404 })
  }
}
