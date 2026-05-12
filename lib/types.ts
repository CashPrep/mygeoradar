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
  note:    string   // e.g. "Missing — add LocalBusiness JSON-LD for Gemini visibility"
}

export interface SchemaCheck {
  url:     string
  checked: SchemaCheckItem[]
  score:   number   // 0–100 based on how many high-impact schemas are present
  fetchedOk: boolean
}

// --- Content Gap ---
export interface ContentGapItem {
  question:   string   // e.g. "What are the best dentists in Boston for teeth whitening?"
  engine:     string   // which AI engine surfaces this most
  missing:    string   // what's missing from the site that would answer it
}

// --- Google Business Profile Signal ---
export interface GbpSignal {
  detected:        boolean   // did we find GBP schema / structured data signals?
  hasReviewSchema: boolean
  hasNapConsistency: boolean  // Name/Address/Phone consistent in schema vs page text
  recommendations: string[]
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
  // Enrichments (may be null if not yet computed)
  schemaCheck?:  SchemaCheck  | null
  contentGaps?:  ContentGapItem[] | null
  gbpSignal?:    GbpSignal    | null
}

export interface ScanInput {
  businessName: string
  website:      string
  topics:       string[]
  location?:    string
  industry?:    string
}
