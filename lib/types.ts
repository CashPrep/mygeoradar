import type { PlatformId } from './platforms'

export type AiEngine = 'chatgpt' | 'perplexity' | 'gemini' | 'claude'

export type VisibilityLevel = 'excellent' | 'good' | 'weak' | 'poor'

export interface TopicResult {
  topic:     string
  score:     number
  level:     VisibilityLevel
  mentioned: boolean
  snippet?:  string
  sentiment?: 'positive' | 'neutral' | 'negative'
}

export interface EngineResult {
  engine:       AiEngine
  engineLabel:  string
  overallScore: number
  topics:       TopicResult[]
  summary:      string
  /** The exact query/queries sent to this engine */
  prompts?:     string[]
  /** The raw simulated AI response (full text, unscored) */
  rawResponse?: string
  /** Competitor brand names that appeared in the raw response */
  competitorsInResponse?: string[]
}

export interface ActionItem {
  priority:    'high' | 'medium' | 'low'
  category:    'content' | 'schema' | 'entity' | 'authority' | 'technical'
  title:       string
  description: string
  effort:      'easy' | 'medium' | 'hard'
  /** The scan check ID this action maps to (used for platform feasibility lookup) */
  checkId?:    string
}

// --- Schema Checker ---
export type SchemaType = 'LocalBusiness' | 'FAQPage' | 'Review' | 'Organization' | 'WebSite' | 'BreadcrumbList' | 'Product' | 'Article'

export interface SchemaCheckItem {
  type:    SchemaType | string
  found:   boolean
  impact:  'high' | 'medium' | 'low'
  note:    string
}

export interface SchemaCheck {
  url:       string
  checked:   SchemaCheckItem[]
  score:     number
  fetchedOk: boolean
}

// --- Content Gap ---
export interface ContentGapItem {
  question: string
  engine:   string
  missing:  string
}

// --- Google Business Profile Signal ---
export interface GbpSignal {
  detected:          boolean
  hasReviewSchema:   boolean
  hasNapConsistency: boolean
  recommendations:   string[]
}

// --- Competitor Gap ---
export interface CompetitorDetail {
  name:            string
  domain:          string
  estimatedScore:  number
  schemaTypes:     string[]
  advantages:      string[]
}

export interface CompetitorGap {
  yourScore:    number
  competitors:  CompetitorDetail[]
  closingMoves: string[]
  summary:      string
}

export interface ScanReport {
  id:            string
  createdAt:     string
  businessName:  string
  website:       string
  topics:        string[]
  location?:     string
  industry?:     string
  platform?:     PlatformId | null
  competitorUrl?: string | null
  engines:       EngineResult[]
  overallScore:  number
  level:         VisibilityLevel
  topActions:    ActionItem[]
  quickWins:     string[]
  paid:          boolean
  schemaCheck?:   SchemaCheck      | null
  contentGaps?:   ContentGapItem[] | null
  gbpSignal?:     GbpSignal        | null
  competitorGap?: CompetitorGap    | null
}

export interface ScanInput {
  businessName:  string
  website:       string
  topics:        string[]
  location?:     string
  industry?:     string
  platform?:     PlatformId | null
  competitorUrl?: string | null
}
