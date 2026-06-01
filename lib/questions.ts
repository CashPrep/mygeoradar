export interface Question {
  slug: string
  question: string
  shortAnswer: string
  body: string[]
  relatedSlugs: string[]
}

export const QUESTIONS: Question[] = [
  {
    slug: 'what-is-geo',
    question: 'What is GEO (Generative Engine Optimization)?',
    shortAnswer: 'GEO is the practice of optimizing your business so it appears in AI-generated answers from tools like ChatGPT, Perplexity, Gemini, and Claude.',
    body: [
      'Traditional SEO gets you ranked on Google. GEO gets you cited in AI answers. As more people use ChatGPT and Perplexity to find businesses and services, showing up in those AI-generated responses is becoming just as important as ranking on page one.',
      'GEO works by ensuring your business has the right signals across the web — authoritative mentions, structured data, reviews, and content that AI models trust and cite when answering user queries.',
      'Businesses that invest in GEO now are positioning themselves ahead of competitors who are still focused exclusively on traditional search.',
    ],
    relatedSlugs: ['how-does-ai-find-businesses', 'what-is-ai-visibility-score'],
  },
  {
    slug: 'how-does-ai-find-businesses',
    question: 'How do AI tools like ChatGPT find and recommend local businesses?',
    shortAnswer: 'AI models are trained on web data and pull from sources like review sites, directories, news mentions, and structured content when answering questions about local businesses.',
    body: [
      'When someone asks ChatGPT "best dentist near me," the model draws on its training data — which includes review aggregators, business directories, local news, and authoritative websites that mentioned your business.',
      'The more your business is cited, reviewed, and mentioned across trusted online sources, the more likely AI models are to include you in their recommendations.',
      'This is different from Google, which crawls and indexes pages in real time. AI models form "opinions" about businesses based on patterns in their training data, so consistency and breadth of online presence matters most.',
    ],
    relatedSlugs: ['what-is-geo', 'does-google-seo-help-ai-visibility'],
  },
  {
    slug: 'what-is-ai-visibility-score',
    question: 'What is an AI Visibility Score?',
    shortAnswer: 'An AI Visibility Score measures how likely your business is to appear in AI-generated answers across tools like ChatGPT, Perplexity, Gemini, and Claude.',
    body: [
      'MyGeoRadar calculates your AI Visibility Score by querying multiple AI engines with the searches your potential customers use, then measuring how often and how prominently your business appears in the responses.',
      'Scores range from 0–100. Most local businesses score under 20 on their first scan, meaning AI tools are almost never recommending them.',
      'A higher score means more AI-driven referrals, more organic visibility, and more customers finding you through AI assistants — without paying for ads.',
    ],
    relatedSlugs: ['what-is-geo', 'how-to-improve-ai-visibility'],
  },
  {
    slug: 'does-google-seo-help-ai-visibility',
    question: 'Does good Google SEO automatically mean good AI visibility?',
    shortAnswer: 'Not always. Google SEO and AI visibility overlap but are not the same — many businesses with strong Google rankings have poor AI visibility, and vice versa.',
    body: [
      'Google SEO focuses on technical optimization, keyword targeting, and link building to rank in search results. AI visibility depends on whether AI models have encountered and trust your business across the full breadth of the web.',
      'A business can rank #1 on Google and still be invisible to ChatGPT if it lacks strong review signals, third-party mentions, and the kind of authoritative content that AI models cite.',
      'GEO requires its own strategy that builds on SEO fundamentals but extends to AI-specific signals like consistent NAP data, structured schema, AI-friendly content formats, and presence on the platforms AI models train on.',
    ],
    relatedSlugs: ['what-is-geo', 'how-to-improve-ai-visibility'],
  },
  {
    slug: 'how-to-improve-ai-visibility',
    question: 'How can a local business improve its AI visibility?',
    shortAnswer: 'Improve AI visibility by building authoritative third-party mentions, accumulating reviews, optimizing your website for AI crawlers, and ensuring consistent business information across all platforms.',
    body: [
      'The most impactful steps are: (1) earn more reviews on Google, Yelp, and industry-specific platforms; (2) get mentioned by local news, blogs, and directories; (3) add structured schema markup to your website; (4) create clear, factual content that AI models can easily parse and cite.',
      'Consistency is critical. Make sure your business name, address, phone number, and description are identical everywhere they appear online. Inconsistencies confuse AI models and reduce your citation likelihood.',
      'MyGeoRadar\'s playbook gives you a step-by-step action plan specific to your business, scan results, and industry so you can prioritize the fixes that will move your AI score the fastest.',
    ],
    relatedSlugs: ['what-is-geo', 'what-is-ai-visibility-score', 'how-long-to-improve-geo'],
  },
  {
    slug: 'how-long-to-improve-geo',
    question: 'How long does it take to improve AI visibility?',
    shortAnswer: 'Most businesses see measurable improvements in 60–90 days after implementing GEO fixes, with some quick wins showing up within a few weeks.',
    body: [
      'Quick wins — like correcting business listing inconsistencies and adding schema markup — can have an effect within 2–4 weeks as AI models recrawl and retrain.',
      'Longer-term signals like review accumulation, third-party press mentions, and domain authority growth take 2–3 months to meaningfully shift your AI visibility score.',
      'The key is consistent, compounding effort. Unlike paid ads that stop working the moment you pause spending, GEO improvements build permanent digital authority that compounds over time.',
    ],
    relatedSlugs: ['how-to-improve-ai-visibility', 'what-is-ai-visibility-score'],
  },
  {
    slug: 'which-ai-tools-matter-most',
    question: 'Which AI tools matter most for local business visibility?',
    shortAnswer: 'ChatGPT, Perplexity, Google Gemini, and Claude are the four AI tools that drive the most business-related queries in 2025.',
    body: [
      'ChatGPT has the largest user base and is the most commonly used AI assistant for local business recommendations. Perplexity is growing fast among research-oriented users who want sourced answers. Gemini is tightly integrated with Google Search, making it especially important for local businesses.',
      'Claude is popular with professionals and is used heavily for research and recommendations. Each AI tool weights sources differently, so a complete GEO strategy covers all four.',
      'MyGeoRadar scans all four engines simultaneously so you get a complete picture of your visibility across the AI ecosystem, not just one platform.',
    ],
    relatedSlugs: ['what-is-geo', 'how-does-ai-find-businesses'],
  },
  {
    slug: 'what-is-llms-txt',
    question: 'What is llms.txt and does my business need one?',
    shortAnswer: 'llms.txt is a proposed standard that helps AI crawlers understand your website, similar to how robots.txt guides search engine crawlers.',
    body: [
      'An llms.txt file sits at your domain root and tells AI language models what content on your site is most important and how to interpret it. It is an emerging standard that is gaining adoption among websites that want better AI indexing.',
      'While not yet universally supported by all AI tools, adding an llms.txt file is a low-effort signal that shows AI crawlers which pages and content to prioritize — particularly useful for businesses with large or complex websites.',
      'MyGeoRadar checks for llms.txt as part of its site audit and flags its absence as a fixable GEO gap in your report.',
    ],
    relatedSlugs: ['how-to-improve-ai-visibility', 'what-is-geo'],
  },
  {
    slug: 'do-reviews-help-ai-visibility',
    question: 'Do online reviews help AI visibility?',
    shortAnswer: 'Yes — reviews are one of the strongest signals that AI models use to form opinions about local businesses and decide whether to recommend them.',
    body: [
      'When AI models are trained on web data, review content from Google, Yelp, TripAdvisor, and industry-specific platforms is weighted heavily. A business with hundreds of positive reviews is far more likely to appear in AI recommendations than one with few or none.',
      'Review recency also matters. AI models tend to favor businesses that have current, active review streams rather than a spike of old reviews.',
      'Responding to reviews also helps — it creates additional content around your business that AI models can parse, and demonstrates active engagement that AI tools associate with legitimacy.',
    ],
    relatedSlugs: ['how-to-improve-ai-visibility', 'what-is-geo'],
  },
  {
    slug: 'how-is-geo-different-from-seo',
    question: 'How is GEO different from traditional SEO?',
    shortAnswer: 'SEO optimizes for search engine rankings and website traffic. GEO optimizes for AI citations and mentions in AI-generated answers.',
    body: [
      'Traditional SEO is about getting your web pages to rank higher on Google and Bing by optimizing for keywords, links, and technical factors. The goal is clicks to your website.',
      'GEO is about getting your business cited as a recommendation by AI assistants. The user may never visit your website — they simply receive your business as an answer and act on that recommendation directly.',
      'Both matter in 2025. A complete digital strategy uses SEO to drive search traffic and GEO to capture the growing share of intent that is moving from traditional search to AI assistants.',
    ],
    relatedSlugs: ['what-is-geo', 'does-google-seo-help-ai-visibility'],
  },
  {
    slug: 'what-industries-benefit-most-from-geo',
    question: 'Which industries benefit most from GEO?',
    shortAnswer: 'Any local service business where customers research before buying benefits from GEO — especially healthcare, legal, home services, and restaurants.',
    body: [
      'Industries where customers use AI assistants to find and vet businesses before making contact see the highest ROI from GEO: dentists, lawyers, HVAC companies, plumbers, restaurants, med spas, and financial advisors.',
      'High-ticket service businesses — where one new customer is worth hundreds or thousands of dollars — get the fastest payback on GEO investment because even a small lift in AI visibility translates directly to revenue.',
      'Commodity businesses and e-commerce are less impacted today, but the trend is clear: as AI becomes the default first step in consumer research, every business category will eventually be affected.',
    ],
    relatedSlugs: ['what-is-geo', 'how-to-improve-ai-visibility'],
  },
  {
    slug: 'how-much-does-geo-cost',
    question: 'How much does improving AI visibility cost?',
    shortAnswer: 'Many GEO improvements cost nothing but time. A professional AI visibility scan and playbook from MyGeoRadar costs $29.99 and gives you a prioritized action plan.',
    body: [
      'The core GEO fixes — claiming and correcting business listings, responding to reviews, adding schema markup, and creating clear website content — are free to implement. They require effort, not budget.',
      'A professional GEO audit saves you time by identifying exactly which fixes matter most for your specific business and industry, rather than working through a generic checklist.',
      'Paid services like PR outreach, content creation, and review management platforms can accelerate results but are optional. Many businesses see significant score improvements with just the free tactics done well.',
    ],
    relatedSlugs: ['how-to-improve-ai-visibility', 'what-is-ai-visibility-score'],
  },
  {
    slug: 'is-ai-visibility-important-for-small-business',
    question: 'Is AI visibility important for small businesses?',
    shortAnswer: 'Yes — in fact, small local businesses have the most to gain from GEO because they rely heavily on word-of-mouth and local discovery, exactly where AI assistants are now taking over.',
    body: [
      'Large brands are already visible in AI answers by default because of their scale and media coverage. Small local businesses are the ones being left behind as consumers shift to AI for local recommendations.',
      'A plumber in a mid-sized city who shows up when ChatGPT is asked "best plumber near me" gains a massive advantage over competitors who are invisible to AI — often without spending more on advertising.',
      'The window to get ahead is still open. Most small businesses have done nothing about AI visibility. Acting now means building an advantage that compounds over time.',
    ],
    relatedSlugs: ['what-is-geo', 'how-to-improve-ai-visibility', 'which-ai-tools-matter-most'],
  },
]

export function getQuestionBySlug(slug: string): Question | undefined {
  return QUESTIONS.find(q => q.slug === slug)
}
