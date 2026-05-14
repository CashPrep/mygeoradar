import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { supabase } from '@/lib/supabase'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const MAX_PER_DAY = 3

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

async function checkRateLimit(ip: string): Promise<boolean> {
  if (ip === 'unknown') return true

  const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

  const { count, error } = await supabase
    .from('snapshot_rate_limits')
    .select('*', { count: 'exact', head: true })
    .eq('ip_address', ip)
    .gte('created_at', dayAgo)

  if (error) {
    console.error('Rate limit check error:', error)
    return true // fail open if table missing
  }

  if ((count ?? 0) >= MAX_PER_DAY) return false

  // Record this attempt — Supabase builder is not a native Promise, use try/catch
  try {
    await supabase.from('snapshot_rate_limits').insert({ ip_address: ip })
  } catch (err) {
    console.error('Rate limit insert error:', err)
  }

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

    const ip      = getClientIp(req)
    const allowed = await checkRateLimit(ip)
    if (!allowed) {
      return NextResponse.json(
        { error: "You've used your 3 free snapshots today. Come back tomorrow or run a full scan." },
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
      temperature:     0.1,
      response_format: { type: 'json_object' },
      max_tokens:      300,
    })

    const raw = JSON.parse(completion.choices[0].message.content!)

    const score = Math.min(100, Math.max(0, Math.round(Number(raw.score) || 0)))
    const level: string =
      score >= 80 ? 'excellent' :
      score >= 60 ? 'good' :
      score >= 40 ? 'weak' : 'poor'

    return NextResponse.json({
      score,
      level,
      headline:     raw.headline   ?? 'Your AI visibility needs work.',
      topIssues:    (raw.topIssues ?? []).slice(0, 3) as string[],
      businessName: businessName.trim(),
      website:      cleanWebsite,
    })
  } catch (err) {
    console.error('[snapshot] error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
