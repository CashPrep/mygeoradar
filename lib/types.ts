export type AiEngine = 'chatgpt' | 'perplexity' | 'gemini' | 'claude'

export type VisibilityLevel = 'excellent' | 'good' | 'weak' | 'poor'

export interface TopicResult {
  topic: string
  score: number          // 0–100
  level: VisibilityLevel
  mentioned: boolean
  snippet?: string       // excerpt from simulated AI answer
  sentiment?: 'positive' | 'neutral' | 'negative'
}

export interface EngineResult {
  engine: AiEngine
  engineLabel: string
  overallScore: number
  topics: TopicResult[]
  summary: string
}

export interface ActionItem {
  priority: 'high' | 'medium' | 'low'
  category: 'content' | 'schema' | 'entity' | 'authority' | 'technical'
  title: string
  description: string
  effort: 'easy' | 'medium' | 'hard'
}

export interface ScanReport {
  id: string
  createdAt: string
  businessName: string
  website: string
  topics: string[]
  location?: string
  industry?: string
  engines: EngineResult[]
  overallScore: number
  level: VisibilityLevel
  topActions: ActionItem[]
  quickWins: string[]
  paid: boolean
}

export interface ScanInput {
  businessName: string
  website: string
  topics: string[]
  location?: string
  industry?: string
}
