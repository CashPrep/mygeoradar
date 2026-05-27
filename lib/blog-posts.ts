export interface BlogPost {
  slug:        string
  title:       string
  description: string
  date:        string
  lastMod:     string
  readTime:    string
  tag:         string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug:        'what-is-geo',
    title:       "What is GEO? The Beginner's Guide to Generative Engine Optimization",
    description: "Traditional SEO gets you on Google. GEO gets you cited in AI answers. Here's what it is, why it matters, and how to start.",
    date:        'May 10, 2026',
    lastMod:     '2026-05-10',
    readTime:    '5 min read',
    tag:         'GEO Basics',
  },
  {
    slug:        'geo-vs-seo',
    title:       'GEO vs SEO: What Is the Difference?',
    description: 'SEO and GEO both help people find your business — but they work on completely different surfaces, with different signals. Here is how they compare and why you need both.',
    date:        'May 20, 2026',
    lastMod:     '2026-05-20',
    readTime:    '6 min read',
    tag:         'GEO Basics',
  },
  {
    slug:        'does-my-business-need-geo',
    title:       'Does My Business Need GEO?',
    description: "Not every business has the same urgency around AI visibility — but most do. Here's how to tell if GEO should be a priority for you right now.",
    date:        'May 21, 2026',
    lastMod:     '2026-05-21',
    readTime:    '5 min read',
    tag:         'GEO Basics',
  },
  {
    slug:        'how-long-does-geo-take',
    title:       'How Long Does GEO Take to Work?',
    description: "GEO isn't instant — but it's also not as slow as traditional SEO. Here's a realistic timeline for when you can expect to start appearing in AI-generated answers.",
    date:        'May 22, 2026',
    lastMod:     '2026-05-22',
    readTime:    '5 min read',
    tag:         'GEO Basics',
  },
  {
    slug:        'ai-search-guide',
    title:       'How AI Search Engines Decide Which Businesses to Mention',
    description: "ChatGPT, Perplexity and Gemini don't rank websites — they generate answers. Here's exactly how they decide who gets cited.",
    date:        'May 12, 2026',
    lastMod:     '2026-05-12',
    readTime:    '7 min read',
    tag:         'AI Search',
  },
  {
    slug:        'ai-search-vs-google-search',
    title:       'AI Search vs. Google Search: What Is Actually Changing?',
    description: 'AI search and Google search feel similar but work completely differently. Here is an honest breakdown of what is changing and what it means for your business.',
    date:        'May 23, 2026',
    lastMod:     '2026-05-23',
    readTime:    '7 min read',
    tag:         'AI Search',
  },
  {
    slug:        'perplexity-vs-chatgpt-visibility',
    title:       'Perplexity vs. ChatGPT: Do You Show Up Differently on Each?',
    description: 'Your business may appear in ChatGPT answers but not Perplexity — or vice versa. Here is why the two platforms surface different results and what you can do about it.',
    date:        'May 23, 2026',
    lastMod:     '2026-05-23',
    readTime:    '6 min read',
    tag:         'AI Search',
  },
  {
    slug:        'ai-search-zero-click',
    title:       "The Zero-Click AI Era: Why Getting Traffic Now Requires Being the Answer",
    description: "AI search doesn't send clicks — it gives answers. If your business isn't mentioned in those answers, you're invisible. Here's what zero-click AI means for your growth strategy.",
    date:        'May 11, 2026',
    lastMod:     '2026-05-11',
    readTime:    '7 min read',
    tag:         'AI Search',
  },
  {
    slug:        'geo-score-benchmarks',
    title:       "What's a Good GEO Score? Industry Benchmarks for 2026",
    description: 'Most businesses score below 30 out of 100 on AI visibility. Here are real benchmark data points across industries — and what score you actually need to compete.',
    date:        'May 13, 2026',
    lastMod:     '2026-05-13',
    readTime:    '6 min read',
    tag:         'Strategy',
  },
  {
    slug:        'geo-for-saas',
    title:       'GEO for SaaS: How Software Companies Should Think About AI Visibility',
    description: 'When someone asks ChatGPT to recommend a project management tool or CRM, which software gets named? Here is how SaaS companies can build AI visibility.',
    date:        'May 23, 2026',
    lastMod:     '2026-05-23',
    readTime:    '7 min read',
    tag:         'Strategy',
  },
  {
    slug:        'geo-before-launch',
    title:       'Launch Day GEO: How to Set Up AI Visibility Before Your Business Goes Live',
    description: "Most new businesses lose their first 90 days of AI visibility by doing nothing. Here's how to build your GEO foundation before you open — so you show up from day one.",
    date:        'May 9, 2026',
    lastMod:     '2026-05-09',
    readTime:    '6 min read',
    tag:         'Strategy',
  },
  {
    slug:        'google-business-profile-geo',
    title:       'Why Google Business Profile Is Your Most Important GEO Asset',
    description: 'AI assistants like ChatGPT and Perplexity rely heavily on Google Business Profile data when answering local queries. Here is why it matters and what your profile needs to include.',
    date:        'May 23, 2026',
    lastMod:     '2026-05-23',
    readTime:    '6 min read',
    tag:         'Local GEO',
  },
  {
    slug:        'multi-location-geo',
    title:       'Multi-Location GEO: How Chains and Franchises Should Handle AI Visibility',
    description: "Single-location GEO is straightforward. Managing AI visibility across 10, 50, or 500 locations is a different challenge entirely. Here's the right architecture.",
    date:        'May 7, 2026',
    lastMod:     '2026-05-07',
    readTime:    '8 min read',
    tag:         'Local GEO',
  },
  {
    slug:        'schema-markup-for-geo',
    title:       'Schema Markup and GEO: Why Structured Data Is Critical for AI Visibility',
    description: 'Schema markup is one of the most direct signals you can give AI assistants about who your business is. Here is what it is, why it matters for GEO, and which types to prioritize.',
    date:        'May 23, 2026',
    lastMod:     '2026-05-23',
    readTime:    '7 min read',
    tag:         'Technical GEO',
  },
  {
    slug:        'ai-hallucination-fix',
    title:       'When AI Gets Your Business Wrong: How to Fix AI Hallucinations About Your Company',
    description: "AI engines sometimes generate confidently wrong information about businesses — wrong hours, wrong address, wrong services. Here's how to find it and fix it before it costs you customers.",
    date:        'May 5, 2026',
    lastMod:     '2026-05-05',
    readTime:    '7 min read',
    tag:         'Technical GEO',
  },
]

export const BLOG_TAGS = ['All', ...Array.from(new Set(BLOG_POSTS.map(p => p.tag)))]
