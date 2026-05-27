import type { Metadata } from 'next'
import Script from 'next/script'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CheckoutButton } from '@/components/playbook/CheckoutButton'
import {
  CheckCircle, BookOpen, FileText, Zap, Shield,
  Star, Eye, Clock, AlertTriangle,
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
    a: 'After checkout you will be redirected to a download page. Sign in with the email you used at checkout — we send a magic link, no password needed. Your files are then available instantly.',
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

        {/* ── URGENCY BANNER ─────────────────────────────────────────── */}
        <div className="bg-accent/10 border-b border-accent/20 text-center py-2.5 px-4">
          <p className="text-xs font-medium text-accent tracking-wide">
            Launch price · <strong className="font-semibold">$27</strong> · Increases after the first 200 copies
          </p>
        </div>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="relative pt-20 pb-24 px-4 md:px-8 text-center overflow-hidden">
          <div className="absolute inset-0 hero-bg opacity-70 pointer-events-none" aria-hidden="true" />
          <div className="relative max-w-3xl mx-auto">

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/8 border border-accent/20 text-accent text-xs font-medium mb-8">
              <Star className="w-3 h-3 fill-accent" />
              Digital product — instant download after payment
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-3 text-gradient text-balance">
              Found by AI
            </h1>
            <p className="text-xl text-muted mb-5 font-medium">The AI Visibility Playbook</p>

            <p className="text-base text-muted leading-relaxed mb-8 max-w-2xl mx-auto text-pretty">
              Most businesses are completely invisible to ChatGPT, Perplexity, Gemini, and Claude.
              This is the complete system to fix that — a step-by-step playbook, 27-point checklist,
              10 copy-paste prompts, and a 30-day action plan. One time, $27.
            </p>

            <div className="flex items-start gap-3 mb-4 px-4 py-4 rounded-xl bg-amber-50 border border-amber-200 max-w-xl mx-auto text-left">
              <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                <strong>GEO is still early.</strong> The businesses that establish AI visibility in
                2026 will build a compounding advantage before competitors even know this game exists.
              </p>
            </div>
            <p className="text-xs text-muted/55 italic mb-10 max-w-xl mx-auto">
              AI systems are regularly retrained and change over time. Results and visibility vary by
              business, market, and implementation effort. No specific outcome is guaranteed.
            </p>

            <CheckoutButton />
            <p className="text-xs text-muted mt-4">
              One-time payment · Instant PDF download · 30-day money-back guarantee
            </p>
          </div>
        </section>

        {/* ── WHAT'S INSIDE ────────────────────────────────────────── */}
        <section className="py-24 px-4 md:px-8 border-t border-border">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                What&apos;s inside — in detail
              </h2>
              <p className="text-muted max-w-xl mx-auto">
                Most digital products tell you the names of what&apos;s included. Here&apos;s exactly
                what each asset contains so you know precisely what you&apos;re getting before you buy.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {deliverables.map(({ icon: Icon, title, tagline, bullets }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-white p-7 hover:border-accent/30 hover:shadow-card-lift transition-all duration-200"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/8 border border-accent/15 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[15px] leading-tight">{title}</h3>
                      <p className="text-sm text-accent font-medium mt-0.5">{tagline}</p>
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

        {/* ── PEEK INSIDE ─────────────────────────────────────────── */}
        <section className="py-24 px-4 md:px-8 border-t border-border bg-surface/40">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                See it before you buy
              </h2>
              <p className="text-muted max-w-xl mx-auto">
                A real sample from two of the four assets — the checklist and the prompt pack.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Checklist preview */}
              <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-card-lift">
                <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-surface">
                  <FileText className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-sm">27-Point AI Visibility Checklist</span>
                  <span className="ml-auto text-xs text-muted bg-surface-2 px-2 py-0.5 rounded-full">1–8 of 27</span>
                </div>
                <div className="p-5 flex flex-col gap-3">
                  {previewChecklist.map(({ done, text }) => (
                    <div key={text} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-4 h-4 mt-0.5 rounded border flex items-center justify-center ${
                        done ? 'bg-accent border-accent' : 'border-border'
                      }`}>
                        {done && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8">
                            <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

              {/* Prompt pack preview */}
              <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-card-lift">
                <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-surface">
                  <Zap className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-sm">Prompt Pack — Sample Prompt</span>
                  <span className="ml-auto text-xs text-muted bg-surface-2 px-2 py-0.5 rounded-full">1 of 10</span>
                </div>
                <div className="p-5 flex flex-col gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">Prompt #1 — AI Awareness Audit</p>
                    <p className="text-xs text-muted mb-3">Paste into ChatGPT, Perplexity, Gemini, and Claude. Run each separately.</p>
                    <div className="rounded-lg bg-surface-2 border border-border p-4 font-mono text-xs leading-relaxed text-foreground/80 select-all">
                      {`"I'm looking for a [your business type] in [your city/area]. Who are the most trusted and well-reviewed options you'd recommend, and why? Please be specific about what makes each one stand out."`}
                    </div>
                    <p className="text-xs text-muted mt-3">
                      <strong className="text-foreground">What to look for:</strong> Does your business appear? How is it described? Are competitors recommended instead?
                    </p>
                  </div>
                  <p className="text-xs text-muted italic border-t border-border pt-3">
                    + 9 more prompts covering competitor gap analysis, hallucination detection, citation sourcing, and brand accuracy…
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-10">
              <CheckoutButton label="Get the full bundle — $27" />
              <p className="text-xs text-muted mt-3">Instant download · 30-day money-back guarantee</p>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
        <section className="py-24 px-4 md:px-8 border-t border-border">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">What working through this looks like</h2>
              <p className="text-muted max-w-xl mx-auto">Step by step, from the moment you download to a measurable before/after.</p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { step: '01', heading: 'Run the prompt pack — see the truth in 10 minutes', body: 'Paste the 10 included prompts into ChatGPT, Perplexity, Gemini, and Claude. You will know exactly whether your business appears, how it\u2019s described, and where the gaps are.' },
                { step: '02', heading: 'Work through the 27-point checklist', body: 'The checklist tells you precisely what to fix, in what order, starting with the highest-impact items. Each checkbox is a concrete action — no guessing, no wasted effort.' },
                { step: '03', heading: 'Follow the 30-day plan — one task per day', body: 'A structured day-by-day calendar for your first 30 days. Each task takes 30–90 minutes and is designed to fit around running a business, not replace it.' },
                { step: '04', heading: 'Re-run the prompts and measure your shift', body: 'After 30 days, run the same audit prompts again. You will have a concrete before/after comparison showing exactly how your AI visibility changed.' },
              ].map(({ step, heading, body }) => (
                <div key={step} className="flex gap-5 text-left p-5 rounded-xl bg-white border border-border hover:border-accent/25 hover:shadow-card-lift transition-all duration-200">
                  <span className="step-num flex-shrink-0 mt-0.5">{step}</span>
                  <div>
                    <h3 className="font-semibold text-[15px] mb-1.5">{heading}</h3>
                    <p className="text-sm text-muted leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY NOW ───────────────────────────────────────────────── */}
        <section className="py-24 px-4 md:px-8 border-t border-border bg-surface/40">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-5 text-balance">GEO is still early. The window is open — but not for long.</h2>
            <p className="text-muted leading-relaxed mb-4 text-pretty">
              Traditional SEO took years before most businesses took it seriously. The ones who acted
              in 2005 are still reaping the compounding benefits today. GEO is at that same inflection
              point right now — in 2026, most of your competitors have no idea AI visibility is even a category.
            </p>
            <p className="text-muted leading-relaxed mb-3 text-pretty">
              AI assistants build citation patterns over time. Once a competitor becomes the default
              recommended answer for your category,{' '}
              <strong className="text-foreground">displacing them gets exponentially more expensive.</strong>
            </p>
            <p className="text-xs text-muted/55 italic mb-10 max-w-lg mx-auto">
              AI systems are regularly retrained. Results vary by business, market, and effort. No specific outcome is guaranteed.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Clock,  heading: 'The early-mover window',  body: "GEO is where SEO was in 2005. Your competitors almost certainly haven't started." },
                { icon: Eye,    heading: 'Compounding returns',       body: 'AI recommendations reinforce themselves. Being cited builds more citations. Acting early creates a lead that grows.' },
                { icon: Shield, heading: '$27 vs. $2,000+/month',    body: 'Based on publicly available agency pricing as of 2026, specialist firms charge $2,000–5,000/month for this work. This is a flat $27.' },
              ].map(({ icon: Icon, heading, body }) => (
                <div key={heading} className="p-5 rounded-xl bg-white border border-border text-left hover:border-accent/25 hover:shadow-card-lift transition-all">
                  <div className="w-8 h-8 rounded-lg bg-accent/8 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <p className="font-semibold text-sm mb-1">{heading}</p>
                  <p className="text-xs text-muted leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO IT'S FOR ──────────────────────────────────────────── */}
        <section className="py-24 px-4 md:px-8 border-t border-border">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 tracking-tight">This is for you if…</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
              {[
                'You own or market a local or online business',
                "AI assistants don't mention your business when you test them",
                "You've read GEO articles but still don't know what to actually do",
                "You don't want to pay $100+/month for a tracking tool",
                'You want a clear, done-for-you action plan — not more theory',
                'You want to establish AI visibility before your competitors do',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 px-4 py-3.5 rounded-lg bg-white border border-border hover:border-accent/25 transition-colors">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ───────────────────────────────────────────────── */}
        <section className="py-24 px-4 md:px-8 border-t border-border bg-surface/40">
          <div className="max-w-md mx-auto">
            <div className="relative rounded-2xl border border-accent/40 bg-white p-8 text-center shadow-card-accent overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent mb-5 mt-1">Found by AI — Complete Bundle</p>
              <div className="mb-1">
                <span className="text-6xl font-black text-gradient tracking-tight">$27</span>
              </div>
              <p className="text-sm text-muted mb-2">One-time · No subscription · Instant download</p>
              <p className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 inline-block mb-6">
                Launch price — limited to first 200 copies
              </p>
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
              <CheckoutButton className="btn-primary w-full text-base px-6 py-3.5 rounded-xl shadow-glow-sm" />
              <p className="text-xs text-muted mt-4">Secure checkout via Stripe · PDF delivered instantly</p>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section className="py-24 px-4 md:px-8 border-t border-border">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 tracking-tight">Questions answered</h2>
            <div className="divide-y divide-border">
              {faqs.map(({ q, a }) => (
                <div key={q} className="py-6">
                  <h3 className="font-semibold text-[15px] mb-2">{q}</h3>
                  <p className="text-sm text-muted leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────── */}
        <section className="py-24 px-4 md:px-8 border-t border-border bg-surface/40">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-balance">
              The window is open. Act before your market closes it.
            </h2>
            <p className="text-muted mb-8 text-pretty">
              GEO is still early enough that a $27 playbook can put you ahead of 95% of your
              competitors. One-time. Instant download. Everything you need to get found by AI before
              the businesses around you figure out this game exists.
            </p>
            <CheckoutButton label="Get the Found by AI Playbook — $27" />
            <p className="text-xs text-muted mt-4">30-day money-back guarantee · Instant download · No subscription</p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
