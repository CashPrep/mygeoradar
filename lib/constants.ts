export const AI_ENGINES = [
  { id: 'chatgpt',    label: 'ChatGPT',    color: '#10a37f' },
  { id: 'perplexity', label: 'Perplexity', color: '#4f8ef7' },
  { id: 'gemini',     label: 'Gemini',     color: '#8b5cf6' },
  { id: 'claude',     label: 'Claude',     color: '#f59e0b' },
] as const

// Pricing — edit here to update everywhere
export const SCAN_PRICE_CENTS       = 4999   // $49.99 full price
export const SCAN_PRICE_USD         = 49.99
export const PROMO_PRICE_CENTS      = 2500   // $24.99 (50% off first scan)
export const PROMO_PRICE_USD        = 24.99
export const PROMO_DISCOUNT_PCT     = 50
export const PROMO_LABEL            = '50% off — first scan only'

export const SCORE_LABELS = {
  excellent: { label: 'Excellent', color: 'text-success', bg: 'bg-success', hex: '#22c55e' },
  good:      { label: 'Good',      color: 'text-accent',  bg: 'bg-accent',  hex: '#4f8ef7' },
  weak:      { label: 'Weak',      color: 'text-warning', bg: 'bg-warning', hex: '#f59e0b' },
  poor:      { label: 'Poor',      color: 'text-danger',  bg: 'bg-danger',  hex: '#ef4444' },
} as const

export const MAX_TOPICS = 5

export const SAMPLE_BUSINESSES = [
  { name: 'Blue Ridge Roofing', website: 'blueridgeroofing.com', topics: ['roofer near me', 'roof repair', 'roofing contractor'] },
  { name: 'Zen Yoga Studio',    website: 'zenyoga.com',          topics: ['yoga classes near me', 'hot yoga', 'beginner yoga'] },
  { name: 'Peak Legal Group',   website: 'peaklegal.com',        topics: ['personal injury lawyer', 'car accident attorney'] },
]
