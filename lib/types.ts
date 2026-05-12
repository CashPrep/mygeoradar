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
}

export interface ActionItem {
  priority:    'high' | 'medium' | 'low'
  category:    'content' | 'schema' | 'entity' | 'authority' | 'technical'
  title:       string
  description: string
  effort:      'easy' | 'medium' | 'hard'
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
  name:            string    // e.g. "Bright Now! Dental"
  domain:          string    // e.g. "brightnow.com"
  estimatedScore:  number    // 0–100 estimated AI visibility
  schemaTypes:     string[]  // schemas found on their site
  advantages:      string[]  // 2–3 things they do better for AI visibility
}

export interface CompetitorGap {
  yourScore:    number
  competitors:  CompetitorDetail[]
  closingMoves: string[]  // 3 specific actions to close the gap
  summary:      string    // 1–2 sentence narrative
}

export interface ScanReport {
  id:           string
  createdAt:    string
  businessName: string
  website:      string
  topics:       string[]
  location?:    string
  industry?:    string
  engines:      EngineResult[]
  overallScore: number
  level:        VisibilityLevel
  topActions:   ActionItem[]
  quickWins:    string[]
  paid:         boolean
  schemaCheck?:   SchemaCheck      | null
  contentGaps?:   ContentGapItem[] | null
  gbpSignal?:     GbpSignal        | null
  competitorGap?: CompetitorGap    | null
}

export interface ScanInput {
  businessName: string
  website:      string
  topics:       string[]
  location?:    string
  industry?:    string
}
