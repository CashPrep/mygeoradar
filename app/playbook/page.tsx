import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import {
  CheckCircle, BookOpen, FileText, Zap, Shield,
  ArrowRight, Star, Eye, TrendingUp, Clock, AlertTriangle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Found by AI — The AI Visibility Playbook | MyGeoRadar',
  description:
    'The complete step-by-step playbook, 27-point checklist, prompt pack, and 30-day action plan to get your business found and recommended by ChatGPT, Perplexity, Gemini, and Claude. One time, $27.',
  openGraph: {
    title: 'Found by AI — The AI Visibility Playbook',
    description: 'Stop being invisible to AI assistants. Get the complete system to fix it — one time, $27.',
    url: 'https://mygeoradar.com/playbook',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Found by AI — The AI Visibility Playbook',
  description:
    'A complete step-by-step playbook, 27-point checklist, prompt pack, and 30-day action plan to get your business found and recommended by ChatGPT, Perplexity, Gemini, and Claude.',
  url: 'https://mygeoradar.com/playbook',
  brand: { '@type': 'Brand', name: 'MyGeoRadar' },
  offers: {
    '@type': 'Offer',
    price: '27.00',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    priceValidUntil: '2027-12-31',
    seller: { '@type': 'Organization', name: 'MyGeoRadar' },
  },
}

const deliverables = [
  {
    icon: BookOpen,
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
    title: '30-Day Action Plan Calendar',
    tagline: 'One task per day. No overwhelm.',
    bullets: [
      'A structured day-by-day calendar covering your first 30 days of implementation',
      'Week 1: Audit — run prompts, score your baseline, identify your biggest gaps',
      'Week 2: Foundation — fix profile completeness, citation consistency, and NAP accuracy',
      'Week 3: Authority — publish content, build structured data, and strengthen review signals',
      'Week 4: Validation — re-run prompts, compare to baseline, and set your 90-day maintenance schedule',
      'Each day takes 30–90 minutes — designed to fit around running a business, not replace it',
    ],
  },
]

const testimonials = [
  {
    quote:
      'I typed my business into ChatGPT and it recommended three competitors. My business wasn\'t mentioned once. After going through the checklist I ran the same prompt two weeks later — I was the second result.',
    name: 'Marcus T.',
    role: 'HVAC Business Owner',
  },
  {
    quote:
      'I had no idea this was even a problem until I used the prompt pack. Perplexity had no idea my business existed. The 30-day plan made it easy to fix without hiring anyone.',
    name: 'Priya S.',
    role: 'Marketing Consultant',
  },
  {
    quote:
      'Paid $27. Spent a weekend on the checklist. Two weeks later a client told me they found me by asking Perplexity. First time that\'s ever happened.',
    name: 'James R.',
    role: 'Independent Financial Advisor',
  },
]

const previewChecklist = [
  { done: true,  text: 'Claim and fully complete your Google Business Profile' },
  { done: true,  text: 'Add a clear, keyword-rich business description everywhere' },
  { done: true,  text: 'Ensure NAP (Name, Address, Phone) is identical across all directories' },
  { done: false, text: 'Publish at least 3 authoritative articles that cite your expertise' },
  { done: false, text: 'Add structured data (schema) for Organization, LocalBusiness, or Product' },
  { done: false, text: 'Build citations on the top 15 AI-trusted directories (list inside)' },
  { done: false, text: 'Create a dedicated "About" page written to be pulled by AI overviews' },
  { done: false, text: 'Run the 10-prompt audit to confirm your current AI visibility baseline' },
]

const faqs = [
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
    a: 'After checkout you will be redirected to a download page and receive an email with your download link. The PDF is yours to keep forever.',
  },
  {
    q: 'What if I am not satisfied?',
    a: 'If you follow the steps and are not satisfied within 30 days, email us at hello@mygeoradar.com for a full refund. No questions asked, no hassle.',
  },
]

export default function PlaybookPage() {
  return (
    <>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <main className="min-h-screen bg-background">
        <Navbar />

        {/* ─── HERO ─── */}
        <section className="pt-32 pb-16 px-4 md:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-6">
              <Star className="w-3 h-3" /> Digital product — instant download after payment
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
              Found by AI
            </h1>
            <p className="text-xl text-muted mb-5 font-medium">The AI Visibility Playbook</p>
            <p className="text-base text-muted leading-relaxed mb-6 max-w-2xl mx-auto">
              Most businesses are completely invisible to ChatGPT, Perplexity, Gemini, and Claude.
              This is the complete system to fix that — a step-by-step playbook, 27-point checklist,
              10 copy-paste prompts, and a 30-day action plan. One time, $27.
            </p>
            {/* Urgency banner */}
            <div className="flex items-center justify-center gap-2 mb-8 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 max-w-xl mx-auto">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <p className="text-sm text-amber-300 text-left">
                <strong>GEO is still early.</strong> The businesses that establish AI visibility in 2026
                will be the defaults AI recommends for years — before competitors even know this game exists.
              </p>
            </div>
            <form action="/api/checkout" method="POST">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-accent/20"
              >
                Get instant access — $27 <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            <p className="text-xs text-muted mt-4">One-time payment &middot; Instant PDF download &middot; 30-day money-back guarantee</p>
          </div>
        </section>

        {/* ─── SOCIAL PROOF BAR ─── */}
        <section className="py-8 px-4 border-y border-border bg-surface/40">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 text-center">
            {[
              'Covers all 4 major AI assistants',
              'No recurring subscription — ever',
              '30-day money-back guarantee',
              'Future updates included free',
            ].map((label) => (
              <div key={label} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm text-muted">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── DEEP DIVE: WHAT'S INSIDE ─── */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">What’s inside — in detail</h2>
              <p className="text-muted max-w-xl mx-auto">
                Most digital products tell you the names of what’s included. Here’s exactly what each asset
                contains so you know precisely what you’re getting before you buy.
              </p>
            </div>
            <div className="flex flex-col gap-8">
              {deliverables.map(({ icon: Icon, title, tagline, bullets }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-surface p-7 hover:border-accent/40 transition-colors"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{title}</h3>
                      <p className="text-sm text-accent mt-0.5">{tagline}</p>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PEEK INSIDE ─── */}
        <section className="py-20 px-4 md:px-8 bg-surface/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-4">
                <Eye className="w-3.5 h-3.5" />
                Live preview
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">See it before you buy</h2>
              <p className="text-muted max-w-xl mx-auto">
                A real sample from two of the four assets — the checklist and the prompt pack.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* CHECKLIST PREVIEW */}
              <div className="rounded-2xl border border-border bg-background overflow-hidden shadow-lg">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-surface">
                  <FileText className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-sm">27-Point AI Visibility Checklist</span>
                  <span className="ml-auto text-xs text-muted">Items 1–8 of 27</span>
                </div>
                <div className="p-5 flex flex-col gap-3">
                  {previewChecklist.map(({ done, text }) => (
                    <div key={text} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-4 h-4 mt-0.5 rounded border ${
                        done ? 'bg-accent border-accent' : 'border-border'
                      } flex items-center justify-center`}>
                        {done && (
                          <svg className="w-2.5 h-2.5 text-background" fill="none" viewBox="0 0 10 8">
                            <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm leading-snug ${
                        done ? 'line-through text-muted/50' : 'text-foreground'
                      }`}>{text}</span>
                    </div>
                  ))}
                  <p className="text-xs text-muted italic border-t border-border pt-3 mt-1">
                    + 19 more items inside the full checklist…
                  </p>
                </div>
              </div>

              {/* PROMPT PACK PREVIEW */}
              <div className="rounded-2xl border border-border bg-background overflow-hidden shadow-lg">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-surface">
                  <Zap className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-sm">Prompt Pack — Sample Prompt</span>
                  <span className="ml-auto text-xs text-muted">1 of 10 prompts</span>
                </div>
                <div className="p-5 flex flex-col gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">Prompt #1 — AI Awareness Audit</p>
                    <p className="text-xs text-muted mb-3">Paste into ChatGPT, Perplexity, Gemini, and Claude. Run each separately.</p>
                    <div className="rounded-lg bg-surface border border-border p-4 font-mono text-xs leading-relaxed text-foreground/80 select-all">
                      {`"I'm looking for a [your business type] in [your city/area]. Who are the most trusted and well-reviewed options you'd recommend, and why? Please be specific about what makes each one stand out."`}
                    </div>
                    <p className="text-xs text-muted mt-3">
                      <strong className="text-foreground">What to look for:</strong> Does your business appear?
                      How is it described? Are competitors recommended instead? The playbook explains exactly
                      what each answer means and what to fix.
                    </p>
                  </div>
                  <p className="text-xs text-muted italic border-t border-border pt-3">
                    + 9 more prompts covering competitor gap analysis, hallucination detection, citation sourcing, and brand accuracy…
                  </p>
                </div>
              </div>

            </div>

            <div className="text-center mt-10">
              <form action="/api/checkout" method="POST">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-accent/20"
                >
                  Get the full bundle — $27 <ArrowRight className="w-5 h-5" />
                </button>
              </form>
              <p className="text-xs text-muted mt-3">Instant download &middot; 30-day money-back guarantee</p>
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Real results from real businesses</h2>
              <p className="text-muted">Business owners who fixed their AI visibility with this exact playbook.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map(({ quote, name, role }) => (
                <div key={name} className="flex flex-col p-6 rounded-xl bg-surface border border-border">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-sm text-muted leading-relaxed mb-5 flex-1">&ldquo;{quote}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-sm">{name}</p>
                    <p className="text-xs text-muted">{role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── URGENCY ─── */}
        <section className="py-20 px-4 md:px-8 bg-surface/50">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-6">
              <TrendingUp className="w-3.5 h-3.5" />
              Why acting in 2026 is different
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              GEO is still early. The window is open — but not for long.
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Traditional SEO took years before most businesses took it seriously.
              The ones who acted in 2005 are still reaping the compounding benefits today.
              GEO is at that same inflection point right now — in 2026, most of your
              competitors have no idea AI visibility is even a category.
            </p>
            <p className="text-muted leading-relaxed mb-6">
              AI assistants build citation patterns over time. Once a competitor becomes the
              default recommended answer for your category in your market, they become harder
              and harder to displace — not impossible, but significantly more expensive.
              <strong className="text-foreground"> The businesses acting now are building a moat.</strong>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {[
                {
                  icon: Clock,
                  heading: 'The early-mover window',
                  body: 'GEO is where SEO was in 2005. The market hasn’t priced it in yet — your competitors almost certainly haven’t started.',
                },
                {
                  icon: TrendingUp,
                  heading: 'Compounding returns',
                  body: 'AI recommendations reinforce themselves. Being cited builds more citations. Acting early creates a lead that grows over time.',
                },
                {
                  icon: Shield,
                  heading: '$27 vs. $2,000/month',
                  body: 'Agencies charge $2,000–5,000/month for this work. This playbook gives you the same system for one flat $27.',
                },
              ].map(({ icon: Icon, heading, body }) => (
                <div key={heading} className="p-5 rounded-xl bg-surface border border-border text-left">
                  <Icon className="w-5 h-5 text-accent mb-3" />
                  <p className="font-semibold text-sm mb-1">{heading}</p>
                  <p className="text-xs text-muted leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHO THIS IS FOR ─── */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">This is for you if…</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {[
                'You own or market a local or online business',
                'AI assistants don’t mention your business at all when you test them',
                'You’ve read GEO articles but still don’t know what to actually do',
                'You don’t want to pay $100+/month for a tracking tool',
                'You want a clear, done-for-you action plan — not more theory',
                'You want to establish AI visibility before your competitors do',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 rounded-lg bg-surface border border-border">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PRICING ─── */}
        <section className="py-20 px-4 md:px-8 bg-surface/50">
          <div className="max-w-md mx-auto">
            <div className="rounded-2xl border-2 border-accent bg-surface p-8 text-center shadow-xl shadow-accent/10">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Found by AI — Complete Bundle</p>
              <div className="flex items-end justify-center gap-1 mb-1">
                <span className="text-6xl font-black">$27</span>
              </div>
              <p className="text-sm text-muted mb-8">One-time payment &middot; No subscription &middot; Instant download</p>
              <ul className="flex flex-col gap-3 text-left mb-8">
                {[
                  'The Complete AI Visibility Playbook (PDF)',
                  'The 27-Point AI Visibility Checklist',
                  'Prompt Pack — 10 copy-paste prompts',
                  '30-Day Action Plan calendar',
                  '30-day money-back guarantee',
                  'All future updates included free',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <form action="/api/checkout" method="POST">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-4 rounded-xl text-base transition-colors"
                >
                  Get instant access — $27 <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              <p className="text-xs text-muted mt-4">Secure checkout via Stripe &middot; PDF delivered instantly after payment</p>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Questions answered</h2>
            <div className="flex flex-col gap-6">
              {faqs.map(({ q, a }) => (
                <div key={q} className="border-b border-border pb-6">
                  <h3 className="font-semibold mb-2">{q}</h3>
                  <p className="text-sm text-muted leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="py-20 px-4 md:px-8 bg-surface/50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The window is open. Act before your market closes it.
            </h2>
            <p className="text-muted mb-3">
              GEO is still early enough that a $27 playbook can put you ahead of 95% of your
              competitors. That won’t be true forever.
            </p>
            <p className="text-muted mb-8">
              One-time. Instant download. Everything you need to get found by AI
              before the businesses around you figure out this game exists.
            </p>
            <form action="/api/checkout" method="POST">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-accent/20"
              >
                Get the Found by AI Playbook — $27 <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            <p className="text-xs text-muted mt-4">30-day money-back guarantee &middot; Instant download &middot; No subscription</p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
