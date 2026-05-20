'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'
import { CheckCircle2, ArrowRight, Loader2, Clock, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react'
import { clsx } from 'clsx'

interface Step {
  number:   number
  title:    string
  why:      string
  time:     string
  actions:  (string | { text: string; href: string })[]
  template?: { label: string; code: string }
  tip?:     string
}

const ALL_STEPS: Step[] = [
  {
    number: 1,
    title:  'Claim & fully complete your Google Business Profile',
    why:    'ChatGPT, Perplexity, and Gemini all pull from Google\'s Knowledge Graph. A complete GBP is the fastest single signal you can send — it tells every AI engine your business exists, what it does, and where.',
    time:   '45–60 min',
    actions: [
      'Go to business.google.com and search for your business name. If it exists, click "Claim this business." If not, click "Add your business."',
      'Choose the most specific primary category possible. "Roofing contractor" beats "Contractor." "Family law attorney" beats "Lawyer."',
      'Write your business description in plain customer language — 250–750 characters. Mention your city, your main service, and one differentiator. No buzzwords.',
      'Upload at least 10 photos: storefront exterior, interior, team photo, 3–5 photos of your work or products.',
      'Add every service you offer under the "Services" section with a name and description for each.',
      'Set accurate hours, phone number, and website URL.',
      'Respond to every existing review — even old ones. Write 2–3 sentences. AI engines weight businesses with active owner engagement much higher.',
      'Enable messaging and post one "Update" (even just an intro post) to show the profile is active.',
    ],
    template: {
      label: 'Business description template (copy & edit)',
      code:  `[Business name] is a [city]-based [category] serving [target customer] since [year]. We specialize in [main service 1], [main service 2], and [main service 3]. [One sentence differentiator — e.g. "All work is done by licensed technicians with a 5-year guarantee."] Call us at [phone] or visit [website].`,
    },
    tip: 'AI engines re-crawl GBP data frequently. Changes you make today can show up in AI responses within 2–4 weeks.',
  },
  {
    number: 2,
    title:  'Add schema markup (JSON-LD) to your website',
    why:    'Schema markup is invisible code in your HTML that tells AI crawlers exactly who you are, what you do, and where you\'re located — in a language machines understand perfectly. Without it, AI engines guess. With it, they know.',
    time:   '30–60 min',
    actions: [
      'Open your website\'s homepage in your CMS (WordPress, Squarespace, Wix, etc.) or code editor.',
      'Copy the template below and fill in your real details.',
      'In WordPress: install "Schema & Structured Data for WP" (free) and paste it in, or add it to your theme\'s <head> via a Custom HTML block.',
      'In Squarespace/Wix: go to Settings → Advanced → Code Injection → Header and paste it there.',
      'In raw HTML: paste it inside your <head> tag.',
      { text: 'After publishing, test it at validator.schema.org — paste your homepage URL and check for errors.', href: 'https://validator.schema.org' },
      { text: 'Also test at Google\'s Rich Results Test.', href: 'https://search.google.com/test/rich-results' },
    ],
    template: {
      label: 'JSON-LD schema template — paste into your <head>',
      code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "YOUR BUSINESS NAME",
  "url": "https://yourwebsite.com",
  "logo": "https://yourwebsite.com/logo.png",
  "image": "https://yourwebsite.com/storefront.jpg",
  "description": "YOUR 1-2 SENTENCE BUSINESS DESCRIPTION",
  "telephone": "+1-XXX-XXX-XXXX",
  "email": "hello@yourwebsite.com",
  "foundingDate": "YYYY",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Your City",
    "addressRegion": "ST",
    "postalCode": "00000",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 00.0000,
    "longitude": -00.0000
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/yourbusiness",
    "https://www.yelp.com/biz/yourbusiness",
    "https://www.linkedin.com/company/yourbusiness"
  ],
  "priceRange": "$$"
}
</script>`,
    },
    tip: 'Change "@type": "LocalBusiness" to match your exact type: Restaurant, LegalService, MedicalBusiness, HomeAndConstructionBusiness, HealthAndBeautyBusiness, FinancialService, etc. The full list is at schema.org/LocalBusiness.',
  },
  {
    number: 3,
    title:  'Submit to the 10 most important business directories',
    why:    'AI models verify that a business is real by finding consistent mentions across multiple independent sources — your Name, Address, and Phone number (NAP) appearing the same way everywhere. Each directory listing is a trust vote.',
    time:   '1–2 hours',
    actions: [
      'Create a text file with your exact NAP: business name spelled exactly as on your GBP, full street address, phone number in +1-XXX-XXX-XXXX format, website URL. Use this same info everywhere — never abbreviate or vary it.',
      'Submit to these 10 in order of priority:',
      { text: '1. Yelp — Claim your business listing', href: 'https://biz.yelp.com/claim/search' },
      { text: '2. Bing Places — feeds Microsoft Copilot directly', href: 'https://www.bingplaces.com' },
      { text: '3. Apple Maps Connect', href: 'https://mapsconnect.apple.com' },
      { text: '4. Facebook Business Page creation', href: 'https://www.facebook.com/pages/creation' },
      { text: '5. Foursquare — Add a place', href: 'https://foursquare.com/add-place' },
      { text: '6. Yellow Pages', href: 'https://www.yp.com/yellowpages/claim-business' },
      { text: '7. BBB listing (free listing, paid accreditation optional)', href: 'https://www.bbb.org/get-accredited' },
      { text: '8. Angi / HomeAdvisor (home services businesses)', href: 'https://pro.angi.com/listing' },
      'Search "[your city] chamber of commerce" and submit to their local directory.',
      'Find your top industry-specific directory (e.g. Avvo for lawyers, Zocdoc for doctors, Houzz for contractors) and submit there.',
      'After submitting all 10, do a Google search for your business name and city. Every listing that appears with wrong info (old address, old phone) needs to be corrected.',
      { text: 'Use Moz Local to audit NAP consistency across 50+ directories automatically.', href: 'https://moz.com/products/local' },
    ],
    tip: 'NAP consistency is critical. If Yelp says "St." and your GBP says "Street," fix it. AI engines that find conflicting info treat it as a red flag.',
  },
  {
    number: 4,
    title:  'Set up Google Search Console and request indexing',
    why:    'Google Search Console is the direct line between your website and Google\'s crawler. Without it, Google may not know your site\'s pages exist. Submitting your sitemap here gets every page crawled faster — and since ChatGPT, Perplexity, and Gemini all draw from Google\'s index, this directly accelerates your AI visibility.',
    time:   '20–30 min',
    actions: [
      { text: 'Go to Google Search Console and sign in with your Google account.', href: 'https://search.google.com/search-console' },
      'Click "Add property" and enter your website domain (e.g. yourwebsite.com). Choose "Domain" property type for full coverage.',
      'Verify ownership using the HTML meta tag method: copy the tag from GSC, paste it into your homepage\'s <head>, then click "Verify." See the template below.',
      'Once verified, click "Sitemaps" in the left sidebar. Enter your sitemap URL (usually yourwebsite.com/sitemap.xml) and click "Submit."',
      'If you don\'t have a sitemap: in WordPress use Yoast SEO (free). In Squarespace/Wix it\'s automatic. Otherwise generate one free at xml-sitemaps.com.',
      'Click "URL Inspection" and paste in your homepage URL. Click "Request Indexing." Repeat for your About, FAQ, and Facts pages.',
      'Return after 72 hours and check "Coverage" — any pages listed as "Excluded" or "Error" need to be fixed.',
      'Under "Performance," check which queries are generating impressions. This tells you how Google currently understands your business.',
    ],
    template: {
      label: 'Google Search Console HTML verification tag (paste into your <head>)',
      code: `<!-- Replace XXXXXXXXXXXXXXXXX with the code Google gives you -->
<meta name="google-site-verification" content="XXXXXXXXXXXXXXXXX" />`,
    },
    tip: 'After any major content update — new About page, new FAQ page — always come back here and request re-indexing for that specific URL. Changes can take 2–5 days to propagate to AI engines after Google re-crawls.',
  },
  {
    number: 5,
    title:  'Rewrite your About page so AI can quote it',
    why:    'When someone asks an AI "tell me about [business name]," the AI scans your About page first. Most About pages are vague marketing copy that AI can\'t quote. Rewrite yours to be specific, factual, and structured — like a Wikipedia article about your own company.',
    time:   '1–2 hours',
    actions: [
      'Open your current About page and delete anything with vague superlatives: "passionate," "dedicated," "best-in-class," "innovative," "committed to excellence." AI ignores these.',
      'Structure the page with clear H2 headings: "About [Business Name]", "Our Services", "Our Team", "Our Story", "Service Area".',
      'Open the page with a factual paragraph using the template below.',
      'Under "Our Services": list each service with a one-paragraph plain-language description of what it is, who it\'s for, and what it costs or how it\'s priced.',
      'Under "Our Story": one paragraph with founding year, founder name, why the business was started, and how it has grown.',
      'Under "Service Area": list every city, town, or region you serve. Spell them out — "We serve Boston, Cambridge, Somerville, Quincy, and surrounding Middlesex County."',
      'End with a direct contact section: phone, email, address, hours.',
    ],
    template: {
      label: 'About page opening paragraph formula',
      code: `[Business name] is a [city]-based [exact business type] founded in [year] by [founder name]. We provide [service 1], [service 2], and [service 3] to [target customers — e.g. "homeowners in the Greater Boston area"]. [One specific credential or differentiator — e.g. "Our team holds [certification] and has completed over 500 projects since 2015."] [Business name] is located at [address] and serves [cities/regions].`,
    },
    tip: 'After rewriting, submit the updated URL to Google Search Console under "URL Inspection → Request Indexing" to get it re-crawled within 48 hours.',
  },
  {
    number: 6,
    title:  'Create a /facts page — your AI knowledge base',
    why:    'AI engines love structured, encyclopedic content. A dedicated facts page gives them a single place to learn everything about your business in a scannable, quotable format. It also ranks well for branded searches.',
    time:   '1 hour',
    actions: [
      'Create a new page at yourwebsite.com/about/facts or /company-facts.',
      'Use the structure below — fill in real data for every field.',
      'Add this page to your main navigation under "About."',
      'Submit the URL to Google Search Console for indexing after publishing.',
    ],
    template: {
      label: 'Facts page structure — copy this exactly',
      code: `# [Business Name] — Company Facts

## At a Glance
- **Founded:** [Year]
- **Founder:** [Name]
- **Headquarters:** [City, State]
- **Service Area:** [List of cities/regions]
- **Employees:** [Number or range, e.g. "5–10"]
- **Website:** [URL]
- **Phone:** [Number]
- **Hours:** [Days and times]

## What We Do
[Business name] provides [main service category] to [target customers].
Our core services include:
- [Service 1]: [1-sentence description]
- [Service 2]: [1-sentence description]
- [Service 3]: [1-sentence description]

## Credentials & Recognition
- [License type and number, if applicable]
- [Certifications]
- [Awards or features in press]
- [Years of experience]

## Pricing
[General pricing info or range — e.g. "Projects typically range from $X to $Y depending on scope."]

## Frequently Asked Questions
**Q: [Most common customer question]**
A: [2–3 sentence answer]

**Q: [Second most common question]**
A: [2–3 sentence answer]

**Q: [Third question]**
A: [2–3 sentence answer]`,
    },
    tip: 'Keep this page updated. An outdated facts page with wrong hours or old phone numbers actively hurts AI visibility.',
  },
  {
    number: 7,
    title:  'Get cited in local press or industry publications',
    why:    'A single indexed news mention causes a dramatic jump in AI recognition. AI models treat third-party editorial coverage as the highest-trust signal — far more than anything on your own website. You don\'t need the New York Times; a local newspaper or industry blog is enough.',
    time:   '2–3 hours (outreach) + wait time',
    actions: [
      'Identify 5 targets: your local newspaper, a city lifestyle blog, an industry newsletter, a regional business journal, and one podcast in your field.',
      'Find the right contact: for newspapers, look for the "local business" or "community" reporter. For blogs, find the editor. Check their Twitter/LinkedIn for direct contact.',
      'Send the pitch email below — personalize the first line for each outlet.',
      'Follow up once after 5 business days if no response.',
      { text: 'If no organic coverage after 2 weeks: use EIN Presswire (~$99/release) to distribute a press release to 400+ indexed news sites.', href: 'https://www.einpresswire.com' },
      { text: 'Also consider PR Newswire for additional distribution reach.', href: 'https://www.prnewswire.com' },
    ],
    template: {
      label: 'Press pitch email + press release template',
      code: `── PITCH EMAIL ──
Subject: Story idea: [Local angle about your business]

Hi [Reporter/Editor name],

I'm [your name], owner of [business name] in [city]. I've been following your coverage of [relevant topic they cover] and thought you might be interested in a local angle.

[ONE specific, newsworthy hook — e.g.: "We just completed our 500th solar installation in [county]" / "We're the only [certification] provider in [region]" / "We've seen a 40% increase in [trend] requests this year and have data on why"]

I'd be happy to share more details, offer a site visit, or connect you with a recent customer who could speak to their experience.

Thank you for your time,
[Your name] | [Business name] | [Phone] | [Website]

── PRESS RELEASE (for EIN Presswire / PR Newswire) ──
FOR IMMEDIATE RELEASE

[BUSINESS NAME] [MILESTONE OR ANNOUNCEMENT]

[CITY, STATE] — [Business name], a [category] serving [region] since [year], today announced [specific milestone or news hook].

[Paragraph 2: context — what this means for customers or the community]

[Paragraph 3: quote from owner — "We're proud to [achievement]," said [name], founder of [business name]. "[One more sentence on why it matters.]"]

About [Business Name]: [2-sentence company description with founding year, location, and core services.]

Contact:
[Name] | [Title]
[Email] | [Phone]
[Website]`,
    },
    tip: 'The hook is everything. Reporters ignore "we\'re a great local business." They respond to data, milestones, trends, or unusual stories. What\'s genuinely interesting about what you do?',
  },
  {
    number: 8,
    title:  'Build a FAQ page optimized for AI question formats',
    why:    'The majority of AI queries are questions: "What does X cost?", "How long does Y take?", "Who is the best Z in [city]?" A well-structured FAQ page directly feeds these responses. AI engines frequently quote FAQ pages verbatim.',
    time:   '1–2 hours',
    actions: [
      'Create a new /faq page on your site.',
      'Write 10–15 questions your customers actually ask. Think about every question you\'ve ever answered in a sales call or email.',
      'Write each answer in 2–4 complete sentences — not bullet points. AI engines quote paragraph answers, not fragmented bullets.',
      'Include your city/region in at least 5 answers naturally.',
      'Add FAQPage schema markup using the template below.',
      'Link to the FAQ from your homepage and About page.',
    ],
    template: {
      label: 'FAQPage schema — paste into your FAQ page <head>',
      code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does [your service] cost in [city]?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most [service] projects in [city] range from $X to $Y depending on [key variable]. [Business name] provides free estimates — call us at [phone] or fill out our online form and we'll respond within 24 hours."
      }
    },
    {
      "@type": "Question",
      "name": "How long does [your service] take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A typical [service] takes [timeframe]. [Any relevant factors that affect timing]. We always give you a written timeline before starting any project."
      }
    },
    {
      "@type": "Question",
      "name": "What should I look for when hiring a [your category] in [city]?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Look for [credential 1], [credential 2], and [credential 3]. Ask for references from recent local projects and verify their license with [relevant licensing body]. [Business name] is [your credentials] and happy to provide references on request."
      }
    }
  ]
}
</script>`,
    },
    tip: 'The question "What should I look for when hiring a [category]?" is gold — AI engines answer it constantly, and your FAQ answer becomes the quoted source.',
  },
  {
    number: 9,
    title:  'Index your site in Bing Webmaster Tools',
    why:    'Bing powers Microsoft Copilot, one of the fastest-growing AI assistants. Businesses not indexed in Bing are completely invisible to Copilot users. Setup takes 15 minutes and has an outsized impact on AI visibility.',
    time:   '15–30 min',
    actions: [
      { text: 'Go to Bing Webmaster Tools and sign in with a Microsoft account (create one free if needed).', href: 'https://www.bing.com/webmasters' },
      'Click "Add a site" and enter your website URL.',
      'Verify ownership using the XML meta tag method: copy the tag from Bing, paste it into your homepage\'s <head>, then click "Verify." See the template below.',
      'After verification, click "Sitemaps" in the left sidebar and submit your sitemap URL (usually yourwebsite.com/sitemap.xml).',
      'Click "URL Inspection" and submit your homepage, About page, FAQ page, and Facts page for immediate crawling.',
      'Go to "SEO" → "Site Scan" and run a scan. Fix every issue flagged as "Critical" or "Warning."',
      'Return weekly for the first month to check the crawl stats.',
    ],
    template: {
      label: 'Bing Webmaster Tools XML verification tag (paste into your <head>)',
      code: `<!-- Replace XXXXXXXXXXXXXXXXX with the key Bing gives you -->
<meta name="msvalidate.01" content="XXXXXXXXXXXXXXXXX" />`,
    },
    tip: 'If you don\'t have a sitemap, generate one free at xml-sitemaps.com and upload the file to your site root.',
  },
  {
    number: 10,
    title:  'Create a Wikidata entry for your business',
    why:    'Wikidata is the structured knowledge database that powers Wikipedia\'s infoboxes and feeds directly into Google\'s Knowledge Graph and several AI training pipelines. A Wikidata entry is the closest thing that exists to an "official AI directory listing." Most small businesses don\'t have one — which means having one is a significant competitive advantage.',
    time:   '30–45 min',
    actions: [
      { text: 'Go to Wikidata and create a free account.', href: 'https://www.wikidata.org' },
      { text: 'Go to Special:NewItem on Wikidata to create your entry.', href: 'https://www.wikidata.org/wiki/Special:NewItem' },
      'Label: enter your business name. Description: enter a one-sentence description, e.g. "roofing contractor based in Asheville, North Carolina."',
      'Click "Create." You now have a Wikidata item.',
      'Add these 8 statements (click "+ add statement" for each):',
      '• instance of (P31): business (Q4830453)',
      '• official website (P856): your website URL',
      '• country (P17): United States of America (Q30)',
      '• located in administrative territorial entity (P131): [search for your city]',
      '• industry (P452): [search for your industry, e.g. "roofing" or "legal services"]',
      '• founded by (P112): [your name — create a person item if needed]',
      '• inception (P571): [founding year]',
      '• described at URL (P973): link to your /facts page',
      'Save each statement. Your entry is now live and will be picked up by Google\'s Knowledge Graph within 2–4 weeks.',
      { text: 'Bonus: create a LinkedIn Company page — heavily scraped by AI training pipelines.', href: 'https://www.linkedin.com/company/setup/new/' },
      { text: 'Bonus: create a Crunchbase profile — also scraped by AI data providers.', href: 'https://www.crunchbase.com/add-new-entity' },
    ],
    template: {
      label: 'Description formula for the Wikidata label field',
      code: `[business type] based in [city], [state]
Examples:
"family law firm based in Austin, Texas"
"Italian restaurant based in Chicago, Illinois"
"residential roofing contractor based in Denver, Colorado"`,
    },
    tip: 'Wikidata entries are public and editable by anyone — don\'t add anything you wouldn\'t want publicly visible. Stick to factual business information.',
  },
  {
    number: 11,
    title:  'Your 30-day execution calendar',
    why:    'The steps above work best in sequence — each one builds authority on top of the last. This calendar gives you a realistic weekly pace that won\'t overwhelm you while covering everything.',
    time:   '30 days total',
    actions: [
      '── WEEK 1: Foundation ──',
      'Day 1–2: Complete Google Business Profile (Step 1). Fill every field. Upload photos.',
      'Day 3–4: Add JSON-LD schema to your homepage (Step 2). Test at validator.schema.org.',
      'Day 5–7: Submit to all 10 directories (Step 3). Create your NAP reference file first.',
      '',
      '── WEEK 2: Indexing & Content ──',
      'Day 8: Set up Google Search Console and submit your sitemap (Step 4).',
      'Day 9–10: Rewrite your About page using the formula in Step 5.',
      'Day 11–12: Create your /facts page using the template in Step 6.',
      'Day 13–14: Submit both new pages to Google Search Console and Bing Webmaster Tools.',
      '',
      '── WEEK 3: Authority ──',
      'Day 15–16: Set up Bing Webmaster Tools and run your first site scan (Step 9). Fix critical issues.',
      'Day 17–18: Build your FAQ page with 10+ questions and add FAQPage schema (Step 8).',
      'Day 19–21: Send press pitch emails to your 5 targets (Step 7). Follow up after 5 days.',
      '',
      '── WEEK 4: Knowledge Graph ──',
      'Day 22–23: Create your Wikidata entry (Step 10). Add all 8 statements.',
      'Day 24: Create LinkedIn Company and Crunchbase profiles.',
      'Day 25: If no press coverage yet, submit an EIN Presswire release.',
      'Day 26–28: Review all 10 directory listings for NAP consistency. Fix any discrepancies.',
      'Day 29–30: Run your free MyGeoRadar snapshot again. You should see a measurable score increase.',
      '',
      '── AFTER 30 DAYS ──',
      'Run the full MyGeoRadar scan ($29.99) to see your per-engine breakdown across ChatGPT, Perplexity, Gemini, and Claude. Use the detailed report to prioritize your next 30 days.',
    ],
    tip: 'Don\'t skip ahead. Step 1 (GBP) makes Step 3 (directories) more effective. Step 4 (Search Console) makes Step 5 (About page) index faster. The order matters.',
  },
]

const CHECKLIST_ITEMS = [
  'Google Business Profile claimed and 100% complete',
  'JSON-LD schema added and validated',
  'Submitted to 10 directories with consistent NAP',
  'NAP consistency audited (Moz Local or BrightLocal)',
  'Google Search Console verified and sitemap submitted',
  'About page rewritten with factual, quotable content',
  '/facts page created and indexed',
  'Press pitch sent to 5 outlets (or EIN Presswire release submitted)',
  'FAQ page built with FAQPage schema',
  'Bing Webmaster Tools verified and sitemap submitted',
  'Wikidata entry created with all 8 statements',
  'LinkedIn Company + Crunchbase profiles created',
  '30-day calendar in progress',
]

const STORAGE_KEY = 'invisible-guide-checklist'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover font-semibold transition-colors"
    >
      {copied ? <><Check className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
    </button>
  )
}

type ActionItem = string | { text: string; href: string }

function ActionLine({ action, index }: { action: ActionItem; index: number }) {
  if (typeof action === 'object') {
    return (
      <li className="flex gap-2.5">
        <span className="w-5 h-5 rounded-full bg-surface-offset border border-border text-muted text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
          {index + 1}
        </span>
        <span className="text-sm text-foreground-dim leading-relaxed">
          {action.text.split(action.href)[0]}
          <a
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
          >
            {action.href.replace('https://', '').replace(/\/$/, '')}
          </a>
        </span>
      </li>
    )
  }
  if (action === '') return <div className="h-1" />
  if (action.startsWith('──')) return <li className="text-xs font-bold text-accent pt-1">{action}</li>
  if (action.match(/^\d+\./) || action.startsWith('•')) {
    return <li className="text-sm text-foreground-dim leading-relaxed pl-4">{action}</li>
  }
  return (
    <li className="flex gap-2.5">
      <span className="w-5 h-5 rounded-full bg-surface-offset border border-border text-muted text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
        {index + 1}
      </span>
      <span className="text-sm text-foreground-dim leading-relaxed">{action}</span>
    </li>
  )
}

function StepCard({ step }: { step: Step }) {
  const [open, setOpen] = useState(step.number <= 3)
  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 p-5 text-left hover:bg-surface-2 transition-colors"
      >
        <span className="w-7 h-7 rounded-full bg-success/15 border border-success/30 text-success text-xs font-bold flex items-center justify-center shrink-0">
          {step.number}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-foreground">{step.title}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <Clock className="w-3 h-3 text-muted" />
            <span className="text-xs text-muted">{step.time}</span>
          </div>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted shrink-0" />}
      </button>

      {open && (
        <div className="px-5 pb-5 flex flex-col gap-4 border-t border-border">
          {/* Why */}
          <div className="pt-4">
            <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1.5">Why this works</p>
            <p className="text-sm text-foreground-dim leading-relaxed">{step.why}</p>
          </div>

          {/* Actions */}
          <div>
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Exact steps</p>
            <ol className="flex flex-col gap-2">
              {step.actions.map((action, i) => (
                <ActionLine key={i} action={action} index={i} />
              ))}
            </ol>
          </div>

          {/* Template */}
          {step.template && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider">{step.template.label}</p>
                <CopyButton text={step.template.code} />
              </div>
              <pre className="bg-surface-offset border border-border rounded-xl p-4 text-xs text-foreground-dim leading-relaxed whitespace-pre-wrap overflow-x-auto font-mono">
                {step.template.code}
              </pre>
            </div>
          )}

          {/* Tip */}
          {step.tip && (
            <div className="flex gap-2.5 bg-accent/8 border border-accent/20 rounded-xl px-4 py-3">
              <span className="text-accent text-xs font-bold shrink-0 mt-0.5">💡 Pro tip</span>
              <p className="text-xs text-foreground-dim leading-relaxed">{step.tip}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function InvisibleSuccessInner() {
  const params       = useSearchParams()
  const businessName = params.get('name') || 'Your Business'
  const website      = params.get('url')  || ''

  const [checked, setChecked] = useState<boolean[]>(() => {
    if (typeof window === 'undefined') return new Array(CHECKLIST_ITEMS.length).fill(false)
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as boolean[]
        if (Array.isArray(parsed) && parsed.length === CHECKLIST_ITEMS.length) return parsed
      }
    } catch {}
    return new Array(CHECKLIST_ITEMS.length).fill(false)
  })

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(checked)) } catch {}
  }, [checked])

  function toggle(i: number) {
    setChecked(prev => { const n = [...prev]; n[i] = !n[i]; return n })
  }
  const doneCount = checked.filter(Boolean).length

  return (
    <main className="min-h-screen bg-bg text-foreground">
      {/* Hero */}
      <section className="border-b border-border bg-surface">
        <div className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-success/15 border border-success/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-xs text-muted uppercase tracking-wider font-semibold">Full guide unlocked</p>
              <h1 className="text-xl font-bold text-foreground">{businessName} — Your AI Visibility Fix Plan</h1>
            </div>
          </div>
          <p className="text-sm text-foreground-dim leading-relaxed">
            Below is your complete 11-step action plan to get <strong className="text-foreground">{businessName}</strong> recognised
            by ChatGPT, Perplexity, Gemini, and Claude. Every step includes exact actions, copy-paste templates, and time estimates.
            Steps 1–3 are open by default — click any step to expand it.
          </p>
          {website && <p className="text-xs text-muted">Site: <span className="text-accent">{website}</span></p>}
        </div>
      </section>

      {/* Progress checklist */}
      <section className="border-b border-border bg-surface-2">
        <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-foreground">Your progress</p>
            <span className="text-xs font-bold text-accent">{doneCount}/{CHECKLIST_ITEMS.length} complete</span>
          </div>
          <div className="w-full bg-surface-offset rounded-full h-1.5">
            <div
              className="bg-accent h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(doneCount / CHECKLIST_ITEMS.length) * 100}%` }}
            />
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {CHECKLIST_ITEMS.map((item, i) => (
              <button
                key={i}
                onClick={() => toggle(i)}
                className="flex items-center gap-2.5 text-left group"
              >
                <div className={clsx(
                  'w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors',
                  checked[i]
                    ? 'bg-success border-success'
                    : 'border-border group-hover:border-accent'
                )}>
                  {checked[i] && <Check className="w-2.5 h-2.5 text-white" />}
                </div>
                <span className={clsx(
                  'text-xs transition-colors',
                  checked[i] ? 'text-muted line-through' : 'text-foreground-dim'
                )}>
                  {item}
                </span>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted">Your progress is automatically saved — it will still be here when you come back.</p>
        </div>
      </section>

      {/* All steps */}
      <section className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-3">
        {ALL_STEPS.map(step => <StepCard key={step.number} step={step} />)}
      </section>

      {/* Mid-page upsell — shown after Step 11 calendar */}
      <section className="max-w-2xl mx-auto px-4 pb-6">
        <div className="bg-surface border border-accent/30 rounded-2xl p-6 flex flex-col gap-3">
          <p className="text-sm font-bold text-foreground">✅ You now have everything you need to get found by AI.</p>
          <p className="text-sm text-foreground-dim leading-relaxed">
            Once you&apos;ve worked through the 30-day calendar, run the full MyGeoRadar scan to measure exactly
            how far you&apos;ve moved — broken down per engine: ChatGPT, Perplexity, Gemini, and Claude.
            Most businesses that complete this guide see a 15–30 point score increase.
          </p>
          <a
            href={`/scan?name=${encodeURIComponent(businessName)}&url=${encodeURIComponent(website)}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-bold transition-all shadow-glow-sm hover:shadow-glow-md w-fit"
          >
            Measure my progress — Full AI scan <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-xs text-muted">$29.99 &middot; Results in ~60 seconds &middot; Full per-engine breakdown</p>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-border bg-surface">
        <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-3 items-center text-center">
          <p className="text-sm font-semibold text-foreground">Once you&apos;ve completed these steps, measure exactly how far you&apos;ve come.</p>
          <p className="text-xs text-muted max-w-md">
            The full scan checks your live visibility across ChatGPT, Perplexity, Gemini &amp; Claude with 40–50 real customer queries
            and gives you a detailed per-engine breakdown with a personalised fix-it report.
          </p>
          <a
            href={`/scan?name=${encodeURIComponent(businessName)}&url=${encodeURIComponent(website)}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-bold transition-all shadow-glow-sm hover:shadow-glow-md"
          >
            Run my full AI visibility scan <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-xs text-muted">$29.99 &middot; Results in ~60 seconds</p>
        </div>
      </section>
    </main>
  )
}

export function InvisibleSuccessClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-accent animate-spin" />
      </div>
    }>
      <InvisibleSuccessInner />
    </Suspense>
  )
}
