import OpenAI from 'openai'
import type { ScanReport, EngineResult, ActionItem, VisibilityLevel } from './types'
import { AI_ENGINES } from './constants'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

function scoreToLevel(score: number): VisibilityLevel {
  if (score >= 80) return 'excellent'
  if (score >= 60) return 'good'
  if (score >= 40) return 'weak'
  return 'poor'
}

export async function runGeoScan(scan: {
  id: string
  business_name: string
  website: string
  topics: string[]
  location?: string | null
  industry?: string | null
}): Promise<Omit<ScanReport, 'id' | 'createdAt' | 'businessName' | 'website' | 'topics' | 'location' | 'industry' | 'paid'>> {

  const locationStr = scan.location ? ` in ${scan.location}` : ''
  const topicList   = scan.topics.join(', ')

  const prompt = `
You are a Generative Engine Optimization (GEO) analyst. Simulate how 4 major AI engines (ChatGPT, Perplexity, Gemini, Claude) would respond to search queries related to a business, and score their visibility.

Business: ${scan.business_name}
Website: ${scan.website}${locationStr}
Topics to evaluate: ${topicList}

For each AI engine, simulate realistic AI search behavior and score the business 0-100 on how likely it is to be mentioned, cited, or recommended for each topic.

Return ONLY valid JSON in this exact structure:
{
  "engines": [
    {
      "engine": "chatgpt",
      "engineLabel": "ChatGPT",
      "overallScore": 45,
      "summary": "2-3 sentence summary of visibility on this engine",
      "topics": [
        { "topic": "topic name", "score": 40, "level": "weak", "mentioned": false, "sentiment": "neutral" }
      ]
    }
  ],
  "overallScore": 45,
  "topActions": [
    {
      "priority": "high",
      "category": "content",
      "title": "Short action title",
      "description": "Specific, actionable 1-2 sentence description",
      "effort": "easy"
    }
  ],
  "quickWins": ["Short quick win tip 1", "Short quick win tip 2", "Short quick win tip 3"]
}

Engines to include: chatgpt, perplexity, gemini, claude
Topics to score: ${scan.topics.map((t) => `"${t}"`).join(', ')}
Provide 5 topActions ordered by priority (high first).
Provide 3 quickWins.
All scores are integers 0-100.
Level values: "excellent" (80+), "good" (60-79), "weak" (40-59), "poor" (0-39)
`.trim()

  const completion = await openai.chat.completions.create({
    model:       'gpt-4o',
    messages:    [{ role: 'user', content: prompt }],
    temperature: 0.4,
    response_format: { type: 'json_object' },
  })

  const raw = JSON.parse(completion.choices[0].message.content!)

  const engines: EngineResult[] = (raw.engines ?? []).map((e: EngineResult) => ({
    ...e,
    topics: e.topics.map((t) => ({ ...t, level: scoreToLevel(t.score) })),
  }))

  const overallScore: number = raw.overallScore ?? Math.round(
    engines.reduce((sum, e) => sum + e.overallScore, 0) / engines.length
  )

  return {
    overallScore,
    level:      scoreToLevel(overallScore),
    engines,
    topActions: (raw.topActions ?? []) as ActionItem[],
    quickWins:  (raw.quickWins  ?? []) as string[],
  }
}
