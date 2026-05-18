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
  if (error) return true
  if ((count ?? 0) >= MAX_PER_DAY) return false
  try { await supabase.from('snapshot_rate_limits').insert({ ip_address: ip }) } catch {}
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

Assess the AI search visibility of this business.

Business name: ${businessName.trim()}
Website: ${cleanWebsite}

First, determine if you have REAL knowledge of this specific business (not just the industry).
A business is "known" if you have seen it in training data — its actual brand, services, location, or reputation.
A newly launched, very small, or purely local business with no web presence is NOT known.

Return ONLY valid JSON — no markdown, no explanation:
{
  "known": true,
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
- known: boolean — true only if you have genuine training data about this specific business
- score is an integer 0–100 (only meaningful when known is true; return 0 when known is false)
- level is exactly one of: "poor" (0-39), "weak" (40-59), "good" (60-79), "excellent" (80-100)
- topIssues must have exactly 3 items when known is true; empty array [] when known is false
- Most small/unknown local businesses score 15–45
- Be honest — if you are not sure whether you know them, return known: false`

    const completion = await openai.chat.completions.create({
      model:           'gpt-4o-mini',
      messages:        [{ role: 'user', content: prompt }],
      temperature:     0.1,
      response_format: { type: 'json_object' },
      max_tokens:      350,
    })

    const raw = JSON.parse(completion.choices[0].message.content!)

    // If GPT doesn't know this business, signal the client to redirect
    if (raw.known === false) {
      return NextResponse.json({
        known:        false,
        businessName: businessName.trim(),
        website:      cleanWebsite,
      })
    }

    const score = Math.min(100, Math.max(0, Math.round(Number(raw.score) || 0)))
    const level: string =
      score >= 80 ? 'excellent' :
      score >= 60 ? 'good' :
      score >= 40 ? 'weak' : 'poor'

    return NextResponse.json({
      known:        true,
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
