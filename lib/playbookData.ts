import { BookOpen, FileText, Zap, Shield } from 'lucide-react'

export const deliverables = [
  {
    icon: BookOpen,
    id: 'playbook',
    title: 'The Complete AI Visibility Playbook (PDF)',
    tagline: 'The step-by-step blueprint — nothing left out.',
    bullets: [
      'Explains exactly how ChatGPT, Perplexity, Gemini, and Claude decide which businesses to recommend — and why most get skipped',
      'Covers the 6 core trust signals AI assistants look for before citing a business',
      'Walks through every category of fix: citations, structured data, content authority, brand consistency, and review signals',
      'Written for non-technical founders and business owners — plain language, no jargon',
      'Organized in the exact order to work through it, from audit to implementation to monitoring',
      'Includes real before/after examples of how AI descriptions change after each fix',
    ],
  },
  {
    icon: FileText,
    id: 'checklist',
    title: 'The 27-Point AI Visibility Checklist',
    tagline: 'Run it once. Know exactly where you stand.',
    bullets: [
      '27 concrete, checkbox-style action items — no vague advice, every item is something you can do today',
      'Organized into 5 categories: Profile Completeness, Citation Consistency, Content Authority, Structured Data, and Review Signals',
      'Each item rated by impact level (High / Medium) so you prioritize the biggest wins first',
      'Includes links to the exact tools and directories for each action',
      'Designed to be run repeatedly — use it every 90 days as an ongoing audit',
    ],
  },
  {
    icon: Zap,
    id: 'prompts',
    title: 'Prompt Pack — 10 Copy-Paste Prompts',
    tagline: 'Know your AI visibility score in 10 minutes.',
    bullets: [
      '10 prompts covering: brand awareness, competitor gap analysis, hallucination detection, citation sourcing, and category authority',
      'Run each across all 4 assistants to get a full picture of where you stand today',
      'Includes a scoring framework — grade your results after each run so you can track improvement over time',
      'Prompt #1 alone (the AI Awareness Audit) is worth the entire $27 for most business owners',
      'Re-run the same prompts after completing the 30-day plan to measure the exact shift',
    ],
  },
  {
    icon: Shield,
    id: 'plan',
    title: '30-Day Action Plan Calendar',
    tagline: 'One task per day. No overwhelm.',
    bullets: [
      'A structured day-by-day calendar covering your first 30 days of implementation',
      'Week 1: Audit — run prompts, score your baseline, identify your biggest gaps',
      'Week 2: Foundation — fix profile completeness, citation consistency, and NAP accuracy',
      'Week 3: Authority — publish content, build structured data, and strengthen review signals',
      'Week 4: Validation — re-run prompts, compare to baseline, and set your 90-day maintenance schedule',
      'Each day takes 30\u201390 minutes — designed to fit around running a business, not replace it',
    ],
  },
]

export const previewChecklist = [
  { done: true,  text: 'Claim and fully complete your Google Business Profile' },
  { done: true,  text: 'Add a clear, keyword-rich business description everywhere' },
  { done: true,  text: 'Ensure NAP (Name, Address, Phone) is identical across all directories' },
  { done: false, text: 'Publish at least 3 authoritative articles that cite your expertise' },
  { done: false, text: 'Add structured data (schema) for Organization, LocalBusiness, or Product' },
  { done: false, text: 'Build citations on the top 15 AI-trusted directories (list inside)' },
  { done: false, text: 'Create a dedicated \u201cAbout\u201d page written to be pulled by AI overviews' },
  { done: false, text: 'Run the 10-prompt audit to confirm your current AI visibility baseline' },
]

export const faqs = [
  {
    q: 'Do I need to be technical or know SEO to use this?',
    a: 'Not at all. The playbook is written for business owners, marketers, and founders with no coding or deep SEO background. If you can edit your website or Google Business Profile, you can do everything in this guide.',
  },
  {
    q: 'What AI assistants does this cover?',
    a: 'ChatGPT, Perplexity, Gemini, and Claude — the four assistants that handle the vast majority of AI search traffic today. The principles also apply to future assistants as they grow.',
  },
  {
    q: 'How is this different from free blog posts about GEO or AI SEO?',
    a: 'Free articles tell you what to do in general terms. This playbook tells you exactly how, in what order, with copy-paste prompts and a 30-day calendar so you do not waste time piecing it together yourself.',
  },
  {
    q: 'Is this a subscription or recurring charge?',
    a: 'No. You pay $27 once and get the full playbook, checklist, prompt pack, and 30-day plan. No recurring charges. Ever. All future updates are included at no extra cost.',
  },
  {
    q: 'How do I receive the playbook after purchase?',
    a: 'After checkout you will be redirected to a download page. Sign in with the email you used at checkout — we send a magic link, no password needed. Your files are then available instantly.',
  },
  {
    q: 'What if I am not satisfied?',
    a: 'If you follow the steps and are not satisfied within 30 days, email us at mygeoradar@gmail.com for a full refund. No questions asked, no hassle.',
  },
]
