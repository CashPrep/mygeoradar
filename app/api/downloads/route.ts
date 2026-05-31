import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase-server'
import { readFile } from 'fs/promises'
import path from 'path'

const ALLOWED_FILES: Record<string, { filename: string; contentType: string }> = {
  'found-by-ai-playbook.html': {
    filename: 'found-by-ai-playbook.html',
    contentType: 'text/html',
  },
  'ai-visibility-checklist.html': {
    filename: 'ai-visibility-checklist.html',
    contentType: 'text/html',
  },
  'prompt-pack.html': {
    filename: 'prompt-pack.html',
    contentType: 'text/html',
  },
  '30-day-action-plan.html': {
    filename: '30-day-action-plan.html',
    contentType: 'text/html',
  },
  'ai-readiness-fix-guides.html': {
    filename: 'ai-readiness-fix-guides.html',
    contentType: 'text/html',
  },
}

export async function GET(req: NextRequest) {
  // 1. Auth check
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  // 2. Purchase check
  const { data: purchase } = await supabase
    .from('playbook_purchases')
    .select('id')
    .eq('email', user.email!.toLowerCase())
    .limit(1)
  if (!purchase || purchase.length === 0) {
    return NextResponse.json({ error: 'No purchase found for this account.' }, { status: 403 })
  }

  // 3. File validation
  const fileKey = req.nextUrl.searchParams.get('file')
  if (!fileKey || !ALLOWED_FILES[fileKey]) {
    return NextResponse.json({ error: 'Invalid file.' }, { status: 400 })
  }

  // 4. Serve the file
  const { filename, contentType } = ALLOWED_FILES[fileKey]
  try {
    const filePath = path.join(process.cwd(), 'public', 'downloads', filename)
    const fileBuffer = await readFile(filePath)
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'private, no-store',
      },
    })
  } catch {
    return NextResponse.json({ error: 'File not found.' }, { status: 404 })
  }
}
