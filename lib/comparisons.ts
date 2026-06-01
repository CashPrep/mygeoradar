export interface Comparison {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  entityA: string
  entityB: string
  summary: string
  points: { label: string; a: string; b: string }[]
  verdict: string
  ctaText: string
}

export const COMPARISONS: Comparison[] = [
  {
    slug: 'geo-vs-seo',
    title: 'GEO vs SEO: What\'s the Difference?',
    metaTitle: 'GEO vs SEO: Key Differences Explained | MyGeoRadar',
    metaDescription: 'GEO and SEO both drive business visibility, but they work very differently. Learn which one your business needs in 2025.',
    entityA: 'GEO',
    entityB: 'SEO',
    summary: 'SEO gets your website ranked on Google. GEO gets your business recommended by AI tools like ChatGPT and Perplexity. In 2025, you need both.',
    points: [
      { label: 'Goal', a: 'Appear in AI-generated answers', b: 'Rank high in search engine results' },
      { label: 'Primary channel', a: 'ChatGPT, Perplexity, Gemini, Claude', b: 'Google, Bing' },
      { label: 'What signals matter', a: 'Reviews, citations, structured data, AI-readable content', b: 'Backlinks, keywords, page speed, technical optimization' },
      { label: 'Traffic type', a: 'Direct AI referrals, zero-click recommendations', b: 'Click-through traffic to your website' },
      { label: 'Time to results', a: '60–90 days for score improvements', b: '3–6 months for ranking gains' },
      { label: 'Cost to start', a: 'Free fixes + optional $29.99 audit', b: 'Free fixes or paid agency ($500–$5K+/mo)' },
    ],
    verdict: 'Do both. SEO builds website traffic; GEO captures the growing share of discovery happening inside AI assistants. Businesses that master both will dominate local search in the AI era.',
    ctaText: 'Get Your Free AI Visibility Score',
  },
  {
    slug: 'chatgpt-vs-google-for-local-search',
    title: 'ChatGPT vs Google for Local Business Search',
    metaTitle: 'ChatGPT vs Google: Which Drives More Local Business Leads? | MyGeoRadar',
    metaDescription: 'More consumers are using ChatGPT instead of Google to find local businesses. Here\'s how the two compare and what it means for your business.',
    entityA: 'ChatGPT',
    entityB: 'Google',
    summary: 'Google still handles the majority of searches, but ChatGPT is growing rapidly for local business discovery — especially among high-intent buyers.',
    points: [
      { label: 'User intent', a: 'Direct recommendation request', b: 'Research and comparison' },
      { label: 'Result format', a: 'Conversational answer with business names', b: 'List of links and map pack' },
      { label: 'Click behavior', a: 'User acts on the recommendation directly', b: 'User clicks through to compare websites' },
      { label: 'How to appear', a: 'GEO: reviews, citations, structured content', b: 'SEO: keywords, links, GMB optimization' },
      { label: 'Personalization', a: 'Can factor in location and preferences from context', b: 'Location-based results from IP/device' },
      { label: 'Trust signal', a: 'Being named by AI implies authority', b: 'High ranking implies authority' },
    ],
    verdict: 'Optimize for both. Google Maps and organic rankings still deliver volume. But the quality of leads from AI-driven recommendations tends to be higher because the user arrives with a specific intent.',
    ctaText: 'See How Visible You Are on Both',
  },
  {
    slug: 'mygeoradar-vs-traditional-seo-audit',
    title: 'MyGeoRadar vs Traditional SEO Audit Tools',
    metaTitle: 'MyGeoRadar vs SEO Audit Tools: What\'s the Difference? | MyGeoRadar',
    metaDescription: 'Traditional SEO audit tools check your website for Google. MyGeoRadar checks how visible your business is to AI. Here\'s the difference.',
    entityA: 'MyGeoRadar',
    entityB: 'Traditional SEO Audits',
    summary: 'SEO audit tools like Semrush and Ahrefs tell you how to rank on Google. MyGeoRadar tells you how visible you are when AI tools answer local search queries.',
    points: [
      { label: 'What it measures', a: 'AI visibility across ChatGPT, Perplexity, Gemini, Claude', b: 'Keyword rankings, backlinks, technical site health' },
      { label: 'Scan method', a: 'Queries live AI engines with real search terms', b: 'Crawls your website and checks SEO metrics' },
      { label: 'Output', a: 'AI Visibility Score + prioritized fix playbook', b: 'Technical issues list + keyword opportunities' },
      { label: 'Time to complete', a: 'Under 5 minutes', b: '30 minutes to hours depending on site size' },
      { label: 'Price', a: '$29.99 one-time per scan', b: '$99–$499/month for leading tools' },
      { label: 'Best for', a: 'Local businesses wanting AI discovery', b: 'Businesses focused on Google traffic' },
    ],
    verdict: 'Use MyGeoRadar alongside your existing SEO tools. They answer different questions. SEO tools optimize for Google; MyGeoRadar optimizes for the AI layer that is increasingly mediating how consumers find local businesses.',
    ctaText: 'Run Your AI Visibility Scan',
  },
  {
    slug: 'perplexity-vs-chatgpt-for-business-visibility',
    title: 'Perplexity vs ChatGPT: Which AI Matters More for Business Visibility?',
    metaTitle: 'Perplexity vs ChatGPT for Business Visibility | MyGeoRadar',
    metaDescription: 'Perplexity and ChatGPT both influence local business discovery. Here\'s how they differ and why you need visibility on both.',
    entityA: 'Perplexity',
    entityB: 'ChatGPT',
    summary: 'Both Perplexity and ChatGPT are used by consumers to find local businesses, but they work differently and require different optimization strategies.',
    points: [
      { label: 'How it finds information', a: 'Real-time web search with citations', b: 'Training data + optional browsing' },
      { label: 'User type', a: 'Research-focused, fact-checking users', b: 'General consumers, quick recommendation seekers' },
      { label: 'Citation behavior', a: 'Always shows sources', b: 'Varies by query and model version' },
      { label: 'How to appear', a: 'Current web presence, authoritative pages', b: 'Broad web signals in training data' },
      { label: 'User intent quality', a: 'High — users want sourced, accurate results', b: 'High — users want fast, direct answers' },
      { label: 'Growth rate', a: 'Fastest growing AI search tool in 2024–25', b: 'Largest user base overall' },
    ],
    verdict: 'Both matter. Perplexity favors businesses with current, crawlable web content. ChatGPT draws from broader training data. A complete GEO strategy addresses both with strong web presence and consistent, authoritative content.',
    ctaText: 'Check Your Visibility on Both Engines',
  },
  {
    slug: 'local-seo-vs-geo',
    title: 'Local SEO vs GEO: Which Drives More Local Business Leads?',
    metaTitle: 'Local SEO vs GEO: Which One Should Local Businesses Prioritize? | MyGeoRadar',
    metaDescription: 'Local SEO and GEO both drive local business leads, but they work on different channels. Here\'s how to think about both in 2025.',
    entityA: 'GEO',
    entityB: 'Local SEO',
    summary: 'Local SEO targets Google Maps and local organic rankings. GEO targets AI-generated recommendations. Both are important — but GEO is where early movers gain the biggest edge.',
    points: [
      { label: 'Primary target', a: 'AI assistants (ChatGPT, Perplexity, Gemini)', b: 'Google Maps, local pack, organic results' },
      { label: 'Key ranking signal', a: 'Reviews, citations, AI-readable content', b: 'Google Business Profile, local links, reviews' },
      { label: 'Competition level', a: 'Low — most businesses haven\'t started', b: 'High — most businesses have some optimization' },
      { label: 'Speed to visibility', a: '60–90 days with focused effort', b: '3–6 months minimum for new optimization' },
      { label: 'Early mover advantage', a: 'Significant — get in before AI habits solidify', b: 'Limited — incumbents are already established' },
      { label: 'Cost', a: 'Low cost with big upside if done early', b: 'Moderate to high due to competition' },
    ],
    verdict: 'Local SEO maintains your Google presence. GEO captures the new wave of AI-driven discovery. Businesses that build GEO advantage now will lock in a first-mover position that compounds as AI usage grows.',
    ctaText: 'Start Your AI Visibility Scan',
  },
]

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return COMPARISONS.find(c => c.slug === slug)
}
