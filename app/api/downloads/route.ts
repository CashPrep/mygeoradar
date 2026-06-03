import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase-server'
import { PLATFORMS } from '@/lib/platforms'
import type { PlatformId } from '@/lib/platforms'
import { readFile } from 'fs/promises'
import path from 'path'

// ─── Standard playbook bundle ─────────────────────────────────────────────────
const BUNDLE_FILES: Record<string, { filename: string; contentType: string }> = {
  'found-by-ai-playbook.html':    { filename: 'found-by-ai-playbook.html',    contentType: 'text/html' },
  'ai-visibility-checklist.html': { filename: 'ai-visibility-checklist.html', contentType: 'text/html' },
  'prompt-pack.html':             { filename: 'prompt-pack.html',             contentType: 'text/html' },
  '30-day-action-plan.html':      { filename: '30-day-action-plan.html',      contentType: 'text/html' },
  'ai-readiness-fix-guides.html': { filename: 'ai-readiness-fix-guides.html', contentType: 'text/html' },
}

// ─── Platform-specific guides (derived from PLATFORMS registry) ───────────────
const PLATFORM_GUIDE_FILES: Record<string, { filename: string; contentType: string }> = 
  Object.values(PLATFORMS)
    .filter((p) => p.hasGuide && p.guideFile)
    .reduce((acc, p) => {
      acc[p.guideFile!] = { filename: p.guideFile!, contentType: 'text/html' }
      return acc
    }, {} as Record<string, { filename: string; contentType: string }>)

const ALLOWED_FILES = { ...BUNDLE_FILES, ...PLATFORM_GUIDE_FILES }

export async function GET(req: NextRequest) {
  // 1. Auth check
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  // 2. File validation — do this before the DB hit so bad requests fail fast
  const fileKey = req.nextUrl.searchParams.get('file')
  if (!fileKey || !ALLOWED_FILES[fileKey]) {
    return NextResponse.json({ error: 'Invalid file.' }, { status: 400 })
  }

  const isPlatformGuide = fileKey in PLATFORM_GUIDE_FILES

  // 3. Purchase check
  const { data: purchase } = await supabase
    .from('playbook_purchases')
    .select('id, platform')
    .eq('email', user.email!.toLowerCase())
    .limit(1)
    .maybeSingle()

  if (!purchase) {
    return NextResponse.json({ error: 'No purchase found for this account.' }, { status: 403 })
  }

  // 4. For platform guides, verify the purchase includes that platform
  if (isPlatformGuide) {
    const purchasedPlatform = purchase.platform as PlatformId | null
    const expectedGuide = purchasedPlatform
      ? PLATFORMS[purchasedPlatform]?.guideFile
      : null

    if (!expectedGuide || expectedGuide !== fileKey) {
      return NextResponse.json(
        { error: 'This guide was not included in your purchase.' },
        { status: 403 }
      )
    }
  }

  // 5. Serve the file
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
