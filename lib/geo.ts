import OpenAI from 'openai'
import type { ScanReport, EngineResult, ActionItem, VisibilityLevel, AiEngine } from './types'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// Reduced from 15 to 10 — fewer tokens per call = faster GPT-4o response,
// keeping total scan time under 45s even on slow OpenAI days.
const BATCH_SIZE = 10

function scoreToLevel(score: number): VisibilityLevel {
  if (score >= 80) return 'excellent'
  if (score >= 60) return 'good'
  if (score >= 40) return 'weak'
  return 'poor'
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size))
  return chunks
}

async function scoreBatch(
  scan: { business_name: string; website: string; location?: string | null; industry?: string | null },
  topics: string[],
  isFirst: boolean
): Promise<any[]> {
  const locationStr = scan.location ? ` in ${scan.location}` : ''
  const topicList   = topics.join(', ')

  const prompt = `You are a senior GEO (Generative Engine Optimization) analyst.

Business: ${scan.business_name} | Website: ${scan.website}${locationStr} | Industry: ${scan.industry || 'Not specified'}
Topics to score: ${topicList}

Score each topic 0–100 per AI engine based on realistic probability of being cited:
- 80–100: Very likely cited. Strong reviews, schema, authoritative content.
- 60–79: May be cited. Some digital footprint, gaps exist.
- 40–59: Unlikely cited. Limited signals.
- 0–39: Would not be cited. Minimal/no AI-visible presence.

Engine behavior:
- ChatGPT: Training data + browsing. Favors well-known brands, reviews, schema markup.
- Perplexity: Real-time retrieval. Favors fresh content, active sites, recent reviews.
- Gemini: Google ecosystem. Weights Google Business Profile, Google reviews, local pack.
- Claude: Training data only. Favors editorial content, industry publications, authoritative pages.

${isFirst ? `Also include for each engine:
- overallScore (integer 0–100)
- summary (2–3 sentences on how this engine handles queries about this business)
- prompts (array of 2 realistic search queries)
- rawResponse (3–5 sentence realistic AI response — write as if you ARE the engine; only mention ${scan.business_name} if realistic)
- competitorsInResponse (array of competitor brand names appearing in rawResponse)` : `Set overallScore to the average of your topic scores. Omit summary, prompts, rawResponse, competitorsInResponse.`}

Return ONLY valid JSON:
{
  "engines": [
    {
      "engine": "chatgpt",
      "engineLabel": "ChatGPT",
      "overallScore": 45,
      ${isFirst ? '"summary": "...",\n      "prompts": ["...", "..."],\n      "rawResponse": "...",\n      "competitorsInResponse": ["..."],' : ''}
      "topics": [
        { "topic": "exact topic string", "score": 40, "level": "weak", "mentioned": false, "sentiment": "neutral", "snippet": "1–2 sentences of what this engine would say about this topic." }
      ]
    }
  ]
}

Rules:
- engines array: exactly 4 items in order: chatgpt, perplexity, gemini, claude
- topics array inside each engine: exactly ${topics.length} items matching input topics exactly
- All scores are integers 0–100
- Most small/unknown businesses score 20–50, not 70+
- snippet sounds like an actual AI response, not a score description`.trim()

  const completion = await openai.chat.completions.create({
    model:           'gpt-4o',
    messages:        [{ role: 'user', content: prompt }],
    temperature:     0.1,
    response_format: { type: 'json_object' },
    max_tokens:      3000,
  })

  const raw = JSON.parse(completion.choices[0].message.content!)
  return raw.engines ?? []
}

export async function runGeoScan(scan: {
  id: string
  business_name: string
  website: string
  topics: string[]
  location?: string | null
  industry?: string | null
}): Promise<Omit<ScanReport, 'id' | 'createdAt' | 'businessName' | 'website' | 'topics' | 'location' | 'industry' | 'paid'>> {

  // Topics already capped at 30 by process/route.ts
  const batches = chunkArray(scan.topics, BATCH_SIZE)

  // Run all batches in PARALLEL — max speed
  const batchResults = await Promise.all(
    batches.map((batch, idx) => scoreBatch(scan, batch, idx === 0))
  )

  const engineOrder: AiEngine[] = ['chatgpt', 'perplexity', 'gemini', 'claude']
  const engineLabels: Record<AiEngine, string> = {
    chatgpt:    'ChatGPT',
    perplexity: 'Perplexity',
    gemini:     'Gemini',
    claude:     'Claude',
  }

  const engines: EngineResult[] = engineOrder.map((engineId, eIdx) => {
    const firstBatchEngine = batchResults[0]?.[eIdx] ?? {}
    const allTopics = batchResults.flatMap((batchEngines: any[]) => {
      const eng = batchEngines?.[eIdx]
      return (eng?.topics ?? []).map((t: any) => ({
        ...t,
        score: Math.round(t.score ?? 0),
        level: scoreToLevel(t.score ?? 0),
      }))
    })

    const avgScore = allTopics.length
      ? Math.round(allTopics.reduce((s: number, t: any) => s + t.score, 0) / allTopics.length)
      : 0

    return {
      engine:                engineId,
      engineLabel:           engineLabels[engineId],
      overallScore:          Math.round(firstBatchEngine.overallScore ?? avgScore),
      summary:               firstBatchEngine.summary               ?? '',
      prompts:               firstBatchEngine.prompts               ?? [],
      rawResponse:           firstBatchEngine.rawResponse           ?? '',
      competitorsInResponse: firstBatchEngine.competitorsInResponse ?? [],
      topics:                allTopics,
    }
  })

  // Generate action items with gpt-4o-mini (faster + cheaper)
  const actionPrompt = `You are a GEO analyst. Based on this business profile, return exactly 5 prioritised action items and 3 quick wins.

Business: ${scan.business_name} | ${scan.website}${scan.location ? ` in ${scan.location}` : ''} | Industry: ${scan.industry || 'Not specified'}
Average AI visibility score: ${Math.round(engines.reduce((s, e) => s + e.overallScore, 0) / engines.length)}/100

Return ONLY valid JSON:
{
  "topActions": [
    { "priority": "high", "category": "schema", "title": "max 8 words", "description": "specific implementable instruction", "effort": "easy" }
  ],
  "quickWins": ["Specific quick win 1", "Specific quick win 2", "Specific quick win 3"]
}

Rules: topActions has exactly 5 items ordered high→medium→low. quickWins has exactly 3 items. No generic advice.`

  const actionCompletion = await openai.chat.completions.create({
    model:           'gpt-4o-mini',
    messages:        [{ role: 'user', content: actionPrompt }],
    temperature:     0.1,
    response_format: { type: 'json_object' },
    max_tokens:      1000,
  })

  const actionRaw = JSON.parse(actionCompletion.choices[0].message.content!)

  const overallScore = Math.round(
    engines.reduce((s, e) => s + e.overallScore, 0) / engines.length
  )

  return {
    overallScore,
    level:      scoreToLevel(overallScore),
    engines,
    topActions: (actionRaw.topActions ?? []) as ActionItem[],
    quickWins:  (actionRaw.quickWins  ?? []) as string[],
  }
}
