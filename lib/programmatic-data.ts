// Programmatic SEO data — industries × cities
// Each combination generates a unique landing page at /[industry]/[city]

export type Industry = {
  slug: string
  label: string
  plural: string
  emoji: string
  painPhrase: string   // "dentists in Chicago aren't ranking" style pain
  topProblem: string   // most common visibility gap for this niche
  aiExample: string    // what AI says (or doesn't say) about this niche
}

export type City = {
  slug: string
  label: string
  state: string
  stateAbbr: string
  population: string
  metro: string
}

export const INDUSTRIES: Industry[] = [
  {
    slug: 'dentists',
    label: 'Dentist',
    plural: 'Dentists',
    emoji: '🦷',
    painPhrase: 'most patients search on Google or ask ChatGPT before calling',
    topProblem: 'incomplete Google Business Profile and missing LocalBusiness schema',
    aiExample: 'ChatGPT recommends dentists by name — but only if your online citations are consistent',
  },
  {
    slug: 'plumbers',
    label: 'Plumber',
    plural: 'Plumbers',
    emoji: '🔧',
    painPhrase: 'emergency plumber searches happen in seconds — you either show up or you don't',
    topProblem: 'missing or inconsistent NAP data across directories',
    aiExample: 'Perplexity and Google AI Overviews pull from citation data — outdated listings mean invisible rankings',
  },
  {
    slug: 'lawyers',
    label: 'Lawyer',
    plural: 'Lawyers',
    emoji: '⚖️',
    painPhrase: 'people searching for an attorney use Google, AI chat, and review sites before calling',
    topProblem: 'weak or absent schema markup and thin Google Business Profile',
    aiExample: 'AI systems recommend attorneys from authoritative, well-structured profiles — not just review count',
  },
  {
    slug: 'restaurants',
    label: 'Restaurant',
    plural: 'Restaurants',
    emoji: '🍽️',
    painPhrase: 'diners ask Google and AI assistants where to eat — before they ever open Yelp',
    topProblem: 'outdated hours, missing menu schema, and citation inconsistencies across delivery platforms',
    aiExample: 'ChatGPT and Gemini recommend restaurants by name when structured data and citations are clean',
  },
  {
    slug: 'med-spas',
    label: 'Med Spa',
    plural: 'Med Spas',
    emoji: '💆',
    painPhrase: 'med spa clients research heavily before booking — across Google, AI, and Instagram',
    topProblem: 'no LocalBusiness or MedicalBusiness schema and weak citation presence',
    aiExample: 'AI assistants surface med spas with complete, trustworthy structured data — not just star ratings',
  },
  {
    slug: 'chiropractors',
    label: 'Chiropractor',
    plural: 'Chiropractors',
    emoji: '🩺',
    painPhrase: 'patients in pain search fast — your GBP and schema determine if they find you first',
    topProblem: 'incomplete GBP categories and missing HealthAndBeautyBusiness schema',
    aiExample: 'Perplexity surfaces chiropractors with complete authority signals — not just proximity',
  },
  {
    slug: 'contractors',
    label: 'Contractor',
    plural: 'Contractors',
    emoji: '🏗️',
    painPhrase: 'homeowners search for contractors online — and AI is now the first stop',
    topProblem: 'missing service area pages, inconsistent NAP, and no HomeAndConstructionBusiness schema',
    aiExample: 'AI tools recommend contractors from trusted, structured, consistently cited sources',
  },
  {
    slug: 'real-estate-agents',
    label: 'Real Estate Agent',
    plural: 'Real Estate Agents',
    emoji: '🏠',
    painPhrase: 'buyers and sellers research agents across Google, Zillow, and AI before reaching out',
    topProblem: 'thin Google Business Profile and missing RealEstateAgent schema',
    aiExample: 'AI assistants cite real estate agents from platforms with rich, consistent structured data',
  },
]

export const CITIES: City[] = [
  { slug: 'new-york', label: 'New York', state: 'New York', stateAbbr: 'NY', population: '8.3M', metro: 'New York metro' },
  { slug: 'los-angeles', label: 'Los Angeles', state: 'California', stateAbbr: 'CA', population: '3.9M', metro: 'LA metro' },
  { slug: 'chicago', label: 'Chicago', state: 'Illinois', stateAbbr: 'IL', population: '2.7M', metro: 'Chicagoland' },
  { slug: 'houston', label: 'Houston', state: 'Texas', stateAbbr: 'TX', population: '2.3M', metro: 'Greater Houston' },
  { slug: 'phoenix', label: 'Phoenix', state: 'Arizona', stateAbbr: 'AZ', population: '1.6M', metro: 'Phoenix metro' },
  { slug: 'philadelphia', label: 'Philadelphia', state: 'Pennsylvania', stateAbbr: 'PA', population: '1.6M', metro: 'Greater Philadelphia' },
  { slug: 'san-antonio', label: 'San Antonio', state: 'Texas', stateAbbr: 'TX', population: '1.4M', metro: 'San Antonio metro' },
  { slug: 'san-diego', label: 'San Diego', state: 'California', stateAbbr: 'CA', population: '1.4M', metro: 'San Diego metro' },
  { slug: 'dallas', label: 'Dallas', state: 'Texas', stateAbbr: 'TX', population: '1.3M', metro: 'DFW metro' },
  { slug: 'miami', label: 'Miami', state: 'Florida', stateAbbr: 'FL', population: '468K', metro: 'South Florida' },
  { slug: 'austin', label: 'Austin', state: 'Texas', stateAbbr: 'TX', population: '978K', metro: 'Greater Austin' },
  { slug: 'seattle', label: 'Seattle', state: 'Washington', stateAbbr: 'WA', population: '749K', metro: 'Puget Sound' },
  { slug: 'denver', label: 'Denver', state: 'Colorado', stateAbbr: 'CO', population: '715K', metro: 'Denver metro' },
  { slug: 'boston', label: 'Boston', state: 'Massachusetts', stateAbbr: 'MA', population: '675K', metro: 'Greater Boston' },
  { slug: 'atlanta', label: 'Atlanta', state: 'Georgia', stateAbbr: 'GA', population: '498K', metro: 'Metro Atlanta' },
  { slug: 'nashville', label: 'Nashville', state: 'Tennessee', stateAbbr: 'TN', population: '689K', metro: 'Nashville metro' },
  { slug: 'portland', label: 'Portland', state: 'Oregon', stateAbbr: 'OR', population: '652K', metro: 'Portland metro' },
  { slug: 'las-vegas', label: 'Las Vegas', state: 'Nevada', stateAbbr: 'NV', population: '641K', metro: 'Las Vegas metro' },
  { slug: 'charlotte', label: 'Charlotte', state: 'North Carolina', stateAbbr: 'NC', population: '874K', metro: 'Charlotte metro' },
  { slug: 'minneapolis', label: 'Minneapolis', state: 'Minnesota', stateAbbr: 'MN', population: '429K', metro: 'Twin Cities' },
]

// Helper: get industry by slug
export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug)
}

// Helper: get city by slug
export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug)
}

// All valid [industry, city] slug pairs for generateStaticParams
export function getAllPairs(): { industry: string; city: string }[] {
  return INDUSTRIES.flatMap((i) =>
    CITIES.map((c) => ({ industry: i.slug, city: c.slug }))
  )
}
