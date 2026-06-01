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
    shortAnswer: 'ChatGPT, Perplexity, Google Gemini, and Claude are the four AI tools that drive the most business-related queries in 2026.',
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
      'Both matter in 2026. A complete digital strategy uses SEO to drive search traffic and GEO to capture the growing share of intent that is moving from traditional search to AI assistants.',
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
  {
    slug: 'what-is-schema-markup',
    question: 'What is schema markup and does it help AI visibility?',
    shortAnswer: 'Schema markup is structured code on your website that tells search engines and AI crawlers exactly what your business is, where it is, and what it offers.',
    body: [
      'Schema markup uses a standardized vocabulary (Schema.org) to label your business data — name, address, phone, hours, reviews, and more — in a machine-readable format that AI models can parse accurately.',
      'Businesses with complete LocalBusiness schema are more likely to be cited correctly by AI tools because the information is unambiguous. Without schema, AI models have to guess from unstructured text — and they often get it wrong.',
      'Adding schema is a one-time technical fix that delivers lasting GEO benefits. MyGeoRadar checks your schema implementation and flags missing or incorrect fields in your audit report.',
    ],
    relatedSlugs: ['how-to-improve-ai-visibility', 'what-is-geo'],
  },
  {
    slug: 'does-social-media-help-geo',
    question: 'Does social media presence help AI visibility?',
    shortAnswer: 'Yes — active social media profiles with consistent business information contribute to AI visibility by adding to the breadth of your online presence.',
    body: [
      'AI models are trained on data from across the web, and social media platforms like Facebook, Instagram, LinkedIn, and X are part of that training corpus. Businesses with active, well-maintained social profiles are more likely to be recognized by AI tools.',
      'The key is consistency. Your business name, address, phone number, and description should be identical on every social platform and match your website exactly.',
      'Social media engagement — posts, responses, check-ins — also creates fresh content signals that AI models associate with active, legitimate businesses.',
    ],
    relatedSlugs: ['how-to-improve-ai-visibility', 'do-reviews-help-ai-visibility'],
  },
  {
    slug: 'what-is-nap-consistency',
    question: 'What is NAP consistency and why does it matter for AI visibility?',
    shortAnswer: 'NAP stands for Name, Address, and Phone Number. Consistent NAP data across all online platforms is essential for AI models to accurately identify and recommend your business.',
    body: [
      'When your business name, address, or phone number varies across directories, review sites, and your own website, AI models see what looks like multiple different businesses. This fragmentation dramatically reduces the likelihood of being recommended.',
      'Common NAP inconsistencies include abbreviations ("St." vs "Street"), suite numbers appearing in some listings but not others, and old phone numbers still listed on outdated directories.',
      'A NAP audit — checking every place your business is listed online and correcting inconsistencies — is one of the highest-ROI GEO fixes and can show results within weeks.',
    ],
    relatedSlugs: ['how-to-improve-ai-visibility', 'how-does-ai-find-businesses'],
  },
  {
    slug: 'how-does-perplexity-rank-businesses',
    question: 'How does Perplexity rank and recommend local businesses?',
    shortAnswer: 'Perplexity searches the live web in real time and synthesizes sourced answers, so businesses with strong current online presence and authoritative mentions rank higher.',
    body: [
      'Unlike ChatGPT which relies primarily on training data, Perplexity performs live web searches and cites sources in its answers. This means your current website content, recent reviews, and up-to-date directory listings all directly influence Perplexity recommendations.',
      'Perplexity tends to cite high-authority sources — local news coverage, industry publications, and well-ranked websites. Earning press mentions and being listed on authoritative directories is especially valuable for Perplexity visibility.',
      'Because Perplexity is real-time, improvements to your online presence can show results faster than with ChatGPT or Claude, which require retraining cycles to fully reflect changes.',
    ],
    relatedSlugs: ['which-ai-tools-matter-most', 'how-does-ai-find-businesses'],
  },
  {
    slug: 'can-i-advertise-on-chatgpt',
    question: 'Can I advertise or pay to appear in ChatGPT answers?',
    shortAnswer: 'Not directly. ChatGPT does not currently offer paid placement in its answers. Visibility is earned organically through GEO signals, not purchased.',
    body: [
      'As of 2026, there is no way to pay ChatGPT, Claude, or Gemini to include your business in their answers. Recommendations are generated based on training data and real-world signals, not advertising budgets.',
      'This is actually good news for small businesses. Unlike Google Ads where larger companies can outbid you, AI visibility is an even playing field based on your actual online reputation and presence.',
      'The only way to reliably appear in AI answers is through organic GEO work: earning reviews, building authoritative mentions, maintaining consistent listings, and creating AI-friendly content.',
    ],
    relatedSlugs: ['what-is-geo', 'how-to-improve-ai-visibility'],
  },
  {
    slug: 'what-is-a-geo-audit',
    question: 'What is a GEO audit and what does it include?',
    shortAnswer: 'A GEO audit is a comprehensive scan of your business across AI platforms that identifies where you appear, where you are invisible, and exactly what to fix to improve your AI visibility.',
    body: [
      'A MyGeoRadar GEO audit queries ChatGPT, Perplexity, Gemini, and Claude with the exact searches your target customers use. It records whether and how your business appears in each answer.',
      'The audit also checks technical factors: schema markup, NAP consistency, llms.txt presence, website structure, and review volume and recency across platforms.',
      'The result is an AI Visibility Score from 0–100 plus a prioritized action plan — the GEO Playbook — that tells you exactly what to fix first for maximum impact.',
    ],
    relatedSlugs: ['what-is-ai-visibility-score', 'how-to-improve-ai-visibility'],
  },
  {
    slug: 'how-often-should-i-scan-ai-visibility',
    question: 'How often should I scan my AI visibility?',
    shortAnswer: 'Scanning every 60–90 days lets you track progress, catch new gaps, and measure the impact of GEO improvements over time.',
    body: [
      'AI models update and retrain regularly, which means your visibility can shift even without changes on your end. Competitors making GEO improvements can displace you in AI answers over time.',
      'A quarterly scan cadence — roughly every 90 days — gives you enough time for improvements to take effect while catching problems before they compound.',
      'MyGeoRadar offers discounted rescans so you can track your AI Visibility Score over time and see exactly how your GEO efforts are moving the needle.',
    ],
    relatedSlugs: ['what-is-ai-visibility-score', 'what-is-a-geo-audit'],
  },
  {
    slug: 'what-is-citation-building',
    question: 'What is citation building and how does it help AI visibility?',
    shortAnswer: 'Citation building is the process of getting your business listed and mentioned across authoritative online directories, review sites, and industry platforms.',
    body: [
      'Every time your business is mentioned with accurate NAP data on a credible website, it creates a citation. The more high-quality citations your business has, the more AI models trust its existence and legitimacy.',
      'Priority citation sources for AI visibility include Google Business Profile, Yelp, BBB, Angi, Houzz, Healthgrades (for healthcare), Avvo (for legal), and industry-specific directories relevant to your niche.',
      'Citation building is a foundational GEO tactic that benefits both traditional SEO and AI visibility simultaneously, making it one of the best investments of your time.',
    ],
    relatedSlugs: ['what-is-nap-consistency', 'how-to-improve-ai-visibility'],
  },
  {
    slug: 'does-website-speed-affect-geo',
    question: 'Does website speed and technical performance affect AI visibility?',
    shortAnswer: 'Indirectly yes — a fast, well-structured website is easier for AI crawlers to parse and index, and it signals legitimacy that improves your overall digital authority.',
    body: [
      'AI models that perform live web searches (like Perplexity) are more likely to successfully crawl and cite a fast, well-structured website. Slow or broken websites get deprioritized or skipped entirely.',
      'Core Web Vitals — Google\'s performance metrics — also influence where your website appears in the training data that models like ChatGPT and Gemini learn from. Better performance correlates with higher-quality content signals.',
      'Technical fixes like improving page speed, fixing broken links, and adding proper meta descriptions are GEO improvements as much as they are SEO improvements.',
    ],
    relatedSlugs: ['how-to-improve-ai-visibility', 'what-is-geo'],
  },
  {
    slug: 'what-are-ai-citations',
    question: 'What are AI citations and how do they work?',
    shortAnswer: 'AI citations are references in AI-generated answers that point to your business as a source or recommendation, often with your name, location, or website.',
    body: [
      'When an AI tool like Perplexity or ChatGPT with Browse mentions your business in an answer and links back to a source, that is an AI citation. These citations drive direct referral traffic and build brand awareness.',
      'Even when AI answers don\'t include clickable links, the mention of your business name in an AI recommendation influences consumer behavior — users search for you directly after hearing your name from an AI.',
      'Building the signals that earn AI citations — reviews, directory listings, press mentions, and structured website content — is the core of a GEO strategy.',
    ],
    relatedSlugs: ['how-does-ai-find-businesses', 'what-is-geo'],
  },
  {
    slug: 'should-i-use-geo-or-google-ads',
    question: 'Should I invest in GEO or Google Ads for my local business?',
    shortAnswer: 'Both serve different purposes. Google Ads delivers immediate traffic. GEO builds compounding organic visibility across AI platforms that grows over time without ongoing spend.',
    body: [
      'Google Ads is a paid channel — when you stop spending, leads stop. GEO is an organic channel — improvements compound and persist, delivering returns long after the initial investment.',
      'For businesses with immediate cash flow needs, Google Ads provides faster results. For businesses building long-term visibility and reducing customer acquisition cost, GEO is the more strategic investment.',
      'The smartest approach combines both: use Google Ads to generate immediate leads while building your GEO foundation for sustainable, compounding organic growth.',
    ],
    relatedSlugs: ['what-is-geo', 'how-much-does-geo-cost'],
  },
  {
    slug: 'how-do-i-know-if-ai-is-sending-me-traffic',
    question: 'How do I know if AI tools are sending my business traffic or customers?',
    shortAnswer: 'Track direct traffic spikes, monitor referrer data for AI platform domains, and watch for "how did you find us" survey responses mentioning ChatGPT or Perplexity.',
    body: [
      'AI-referred traffic often shows up as direct traffic in Google Analytics because users hear a business name from an AI and then type it directly into a browser. Spikes in branded search volume alongside direct traffic growth are a strong AI traffic signal.',
      'Perplexity and some ChatGPT browsing features do pass referrer data, so check your Analytics for traffic from perplexity.ai or openai.com domains.',
      'Adding a simple "How did you find us?" question to your intake form or booking flow is one of the most reliable ways to identify AI-referred customers, and the answers are often surprising.',
    ],
    relatedSlugs: ['what-is-ai-visibility-score', 'how-does-ai-find-businesses'],
  },
  {
    slug: 'what-is-google-business-profile',
    question: 'Does Google Business Profile help AI visibility?',
    shortAnswer: 'Yes — Google Business Profile is one of the most important signals for both Google Gemini and other AI tools that incorporate Google data into their recommendations.',
    body: [
      'Google Business Profile (formerly Google My Business) is the single most authoritative source of local business data on the internet. Gemini pulls directly from GBP data, making a complete and accurate profile essential for AI visibility on Google\'s platforms.',
      'Beyond Gemini, other AI models are trained on web data that includes GBP information, Google Maps listings, and Google Reviews — making GBP improvements beneficial across all AI platforms.',
      'Ensure your GBP is 100% complete: hours, photos, services, description, Q&A, and regular posts all contribute to a stronger AI presence.',
    ],
    relatedSlugs: ['how-to-improve-ai-visibility', 'do-reviews-help-ai-visibility'],
  },
  {
    slug: 'is-geo-the-same-as-aiseo',
    question: 'Is GEO the same as AI SEO or LLMO?',
    shortAnswer: 'GEO, AI SEO, and LLMO (Large Language Model Optimization) all refer to the same emerging practice of optimizing for visibility in AI-generated answers.',
    body: [
      'The industry hasn\'t settled on a single term yet. You may see GEO (Generative Engine Optimization), AI SEO, LLMO (Large Language Model Optimization), AEO (Answer Engine Optimization), or SGE Optimization used interchangeably.',
      'MyGeoRadar uses GEO because it is the most descriptive: it\'s about being found by generative AI engines, just as traditional SEO is about being found by search engines.',
      'Regardless of the label, the underlying practice is the same: building the digital signals that cause AI language models to recognize, trust, and recommend your business.',
    ],
    relatedSlugs: ['what-is-geo', 'how-is-geo-different-from-seo'],
  },
  {
    slug: 'what-content-helps-geo',
    question: 'What type of content best improves AI visibility?',
    shortAnswer: 'Clear, factual, well-structured content that directly answers common customer questions performs best for AI visibility.',
    body: [
      'AI models are trained to answer questions. Content that is structured as direct answers — FAQ pages, service pages with clear descriptions, how-to guides — is more likely to be cited than vague, keyword-stuffed content.',
      'Use plain language, real specifics, and structured headings. Include your business name, location, and services naturally throughout your content so AI models can unambiguously identify what you do and where you do it.',
      'Long-form content (1,000+ words) that comprehensively covers a topic tends to earn more AI citations than thin pages, because AI models favor depth and authority.',
    ],
    relatedSlugs: ['how-to-improve-ai-visibility', 'what-is-geo'],
  },
  {
    slug: 'does-yelp-help-ai-visibility',
    question: 'Does Yelp help AI visibility?',
    shortAnswer: 'Yes — Yelp is one of the most-cited sources in AI recommendations for local businesses, particularly for restaurants, home services, and healthcare.',
    body: [
      'Yelp data is part of the training corpus for major AI models and is frequently cited by Perplexity in real-time local business answers. A strong Yelp presence with consistent NAP data and positive reviews directly improves AI visibility.',
      'Yelp reviews are especially influential for service categories where trust and reputation are paramount — lawyers, doctors, contractors, and restaurants all benefit significantly from Yelp authority.',
      'Claiming your Yelp profile, completing all business information, and actively managing reviews should be part of every local business GEO strategy.',
    ],
    relatedSlugs: ['do-reviews-help-ai-visibility', 'what-is-citation-building'],
  },
]

export function getQuestionBySlug(slug: string): Question | undefined {
  return QUESTIONS.find(q => q.slug === slug)
}
