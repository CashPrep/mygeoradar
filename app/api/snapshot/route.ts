import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// In-memory rate limit: max 3 free snapshots per IP per day
// (resets on server restart / redeploy — fine for Edge/Vercel serverless)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

const MAX_PER_DAY = 3

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const dayMs = 24 * 60 * 60 * 1000
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + dayMs })
    return true
  }
  if (entry.count >= MAX_PER_DAY) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  try {
    const { businessName, website } = await req.json()

    if (!businessName?.trim() || !website?.trim()) {
      return NextResponse.json(
        { error: 'Business name and website are required.' },
        { status: 400 }
      )
    }

    const ip = getClientIp(req)
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'You\'ve used your 3 free snapshots today. Come back tomorrow or run a full scan.' },
        { status: 429 }
      )
    }

    const cleanWebsite = website.trim().replace(/^https?:\/\//, '').replace(/\/$/, '')

    const prompt = `You are a GEO (Generative Engine Optimization) analyst.

Quickly assess the AI search visibility of this business based on what you know about it and typical signals for businesses of its type.

Business name: ${businessName.trim()}
Website: ${cleanWebsite}

Return ONLY valid JSON — no markdown, no explanation:
{
  "score": 28,
  "level": "poor",
  "headline": "One punchy sentence describing their AI visibility situation (max 12 words)",
  "topIssues": [
    "Specific issue #1 that is hurting their AI visibility score",
    "Specific issue #2",
    "Specific issue #3"
  ]
}

Rules:
- score is an integer 0–100
- level is exactly one of: "poor" (0-39), "weak" (40-59), "good" (60-79), "excellent" (80-100)
- topIssues must have exactly 3 items — each is 1 sentence, specific to this business type, not generic
- Most small/unknown local businesses score 15–45
- Be honest and realistic — a low score is more useful to the user than flattery
- headline should feel urgent and personal, e.g. "AI engines can't find you — you're missing critical signals"`

    const completion = await openai.chat.completions.create({
      model:           'gpt-4o-mini',
      messages:        [{ role: 'user', content: prompt }],
      temperature:     0.3,
      response_format: { type: 'json_object' },
      max_tokens:      300,
    })

    const raw = JSON.parse(completion.choices[0].message.content!)

    const score = Math.min(100, Math.max(0, Math.round(Number(raw.score) || 0)))
    const levelMap: Record<number, string> = {}
    const level: string =
      score >= 80 ? 'excellent' :
      score >= 60 ? 'good' :
      score >= 40 ? 'weak' : 'poor'

    return NextResponse.json({
      score,
      level,
      headline:   raw.headline   ?? 'Your AI visibility needs work.',
      topIssues:  (raw.topIssues ?? []).slice(0, 3) as string[],
      businessName: businessName.trim(),
      website:    cleanWebsite,
    })
  } catch (err) {
    console.error('[snapshot] error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
