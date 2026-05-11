import OpenAI from 'openai'
import type { ScanReport, EngineResult, ActionItem, VisibilityLevel } from './types'

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
You are a senior GEO (Generative Engine Optimization) analyst with deep knowledge of how ChatGPT, Perplexity, Gemini, and Claude retrieve and cite local businesses.

Your task: simulate how each AI engine would respond to queries about this business, then score their AI visibility.

## Business
- Name: ${scan.business_name}
- Website: ${scan.website}${locationStr}
- Industry: ${scan.industry || 'Not specified'}
- Topics to evaluate: ${topicList}

## Scoring Rubric (apply to EACH engine independently)
Score each topic 0–100 based on realistic probability of being cited:
- 80–100 (Excellent): Business is very likely to be mentioned by name. Strong online presence, lots of reviews, structured data, authoritative content.
- 60–79 (Good): Business may be mentioned. Has some digital footprint but gaps exist.
- 40–59 (Weak): Business is unlikely to be mentioned unless very local-specific query. Limited signals.
- 0–39 (Poor): Business would not be mentioned. Minimal or no AI-visible presence.

## Engine-Specific Behavior
- ChatGPT: Uses training data + browsing. Favors well-known brands, Wikipedia-level entities, businesses with strong review profiles and schema markup.
- Perplexity: Real-time web retrieval. Favors recent content, active websites, news mentions, fresh reviews. Penalizes outdated or thin sites.
- Gemini: Tightly integrated with Google ecosystem. Heavily weights Google Business Profile completeness, Google reviews, local pack signals.
- Claude: Training data only (no browsing by default). Favors businesses mentioned in editorial content, industry publications, and authoritative web pages.

## Output Format
Return ONLY valid JSON. No markdown, no explanation.
{
  "engines": [
    {
      "engine": "chatgpt",
      "engineLabel": "ChatGPT",
      "overallScore": 45,
      "summary": "2-3 sentence realistic summary of how ChatGPT currently handles queries about this business and why it scores this way.",
      "topics": [
        {
          "topic": "exact topic string from input",
          "score": 40,
          "level": "weak",
          "mentioned": false,
          "sentiment": "neutral",
          "snippet": "A short example of what this AI engine might actually say when asked about this topic — realistic, specific, 1-2 sentences."
        }
      ]
    }
  ],
  "overallScore": 45,
  "topActions": [
    {
      "priority": "high",
      "category": "schema",
      "title": "Concise action title (max 8 words)",
      "description": "Specific, implementable instruction. What exactly to do, why it matters for AI visibility, expected impact.",
      "effort": "easy"
    }
  ],
  "quickWins": [
    "Specific quick win with a concrete action — not generic advice",
    "Second quick win",
    "Third quick win"
  ]
}

Rules:
- engines array must contain exactly 4 items: chatgpt, perplexity, gemini, claude — in that order
- topics array inside each engine must contain exactly ${scan.topics.length} items matching the input topics
- topActions must contain exactly 5 items, ordered high → medium → low priority
- quickWins must contain exactly 3 items
- All scores are integers 0–100
- Be realistic — most small/unknown businesses will score 20–50, not 70+
- snippet should sound like an actual AI response, not a score description
`.trim()

  const completion = await openai.chat.completions.create({
    model:           'gpt-4o',
    messages:        [{ role: 'user', content: prompt }],
    temperature:     0.3,
    response_format: { type: 'json_object' },
    max_tokens:      4000,
  })

  const raw = JSON.parse(completion.choices[0].message.content!)

  const engines: EngineResult[] = (raw.engines ?? []).map((e: EngineResult) => ({
    ...e,
    overallScore: Math.round(e.overallScore),
    topics: e.topics.map((t) => ({
      ...t,
      score: Math.round(t.score),
      level: scoreToLevel(t.score),
    })),
  }))

  const overallScore: number = raw.overallScore != null
    ? Math.round(raw.overallScore)
    : Math.round(engines.reduce((sum, e) => sum + e.overallScore, 0) / engines.length)

  return {
    overallScore,
    level:      scoreToLevel(overallScore),
    engines,
    topActions: (raw.topActions ?? []) as ActionItem[],
    quickWins:  (raw.quickWins  ?? []) as string[],
  }
}
