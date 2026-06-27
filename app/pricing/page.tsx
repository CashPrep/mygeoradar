import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import {
  CheckCircle,
  ArrowRight,
  Radar,
  BookOpen,
  FileText,
  Zap,
  Shield,
  MapPin,
  Search,
  Star,
  HelpCircle,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing — MyGeoRadar | Free Scan + Affordable Fix Guides',
  description:
    'Start with a free business visibility scan. Then get only the fix guide you need — local SEO, citations, schema, or AI visibility — from $27. No subscription, no agency fees.',
  openGraph: {
    title: 'Pricing — MyGeoRadar | Free Scan + Affordable Fix Guides',
    description:
      'Free scan. Targeted fix guides from $27. No monthly fees. Fix your business visibility across Google, directories, and AI search.',
    url: 'https://mygeoradar.com/pricing',
  },
}

const fixPacks = [
  {
    icon: MapPin,
    title: 'Google Business Profile Fix Pack',
    price: '$19',
    description:
      'Step-by-step instructions to complete, optimize, and maintain your GBP listing so you rank in local map results and Google Search.',
    includes: [
      'Full GBP completion checklist',
      'Category and keyword strategy',
      'Photo and post optimization guide',
      'Review response templates',
    ],
    cta: 'Get GBP Fix Pack',
    href: '/playbook',
    highlight: false,
  },
  {
    icon: Search,
    title: 'Citation & NAP Consistency Fix Pack',
    price: '$19',
    description:
      'Find and fix inconsistent Name, Address, and Phone data across the top directories. NAP consistency is one of the highest-leverage local SEO fixes you can make.',
    includes: [
      'Top 50 directory submission checklist',
      'NAP audit template',
      'Step-by-step correction guide',
      'Priority directory list for your industry',
    ],
    cta: 'Get Citation Fix Pack',
    href: '/playbook',
    highlight: false,
  },
  {
    icon: FileText,
    title: 'Schema Markup Fix Pack',
    price: '$19',
    description:
      'Add the structured data that search engines and AI systems use to understand your business. Includes copy-paste schema templates for local businesses.',
    includes: [
      'LocalBusiness schema template',
      'Organization schema template',
      'FAQ schema guide',
      'Step-by-step implementation for any platform',
    ],
    cta: 'Get Schema Fix Pack',
    href: '/playbook',
    highlight: false,
  },
  {
    icon: Zap,
    title: 'AI Visibility Fix Pack',
    price: '$19',
    description:
      'Fix the exact signals that determine whether ChatGPT, Perplexity, Gemini, and Claude recommend your business — authority content, citation building, and brand clarity.',
    includes: [
      '10 copy-paste AI audit prompts',
      'AI citation building checklist',
      'Authority content guide',
      'Brand consistency fixes for AI systems',
    ],
    cta: 'Get AI Visibility Pack',
    href: '/playbook',
    highlight: false,
  },
]

const playbookIncludes = [
  'The Complete Business Visibility Playbook (all layers)',
  '27-Point Visibility Checklist',
  'Prompt Pack — 10 copy-paste AI audit prompts',
  '30-Day Visibility Action Plan calendar',
  'All four Fix Packs included',
  '30-day money-back guarantee',
  'All future updates free',
]

const faqs = [
  {
    q: 'What is the difference between a Fix Pack and the full Playbook?',
    a: 'A Fix Pack covers one specific problem — GBP, citations, schema, or AI visibility — for $19. The full Playbook ($27) includes all four Fix Packs plus the 27-point checklist, prompt pack, and 30-day calendar. If you already know your main issue, a Fix Pack is faster. If you want the complete system, the Playbook is the better value.',
  },
  {
    q: 'Do I need to buy a subscription?',
    a: 'No. Every product is a one-time purchase. No monthly fees, no recurring charges. All future updates are included at no extra cost.',
  },
  {
    q: 'How do I receive my purchase?',
    a: 'After checkout you are redirected to a download page. Sign in with the email you used at checkout — we send a magic link, no password needed. Your files are available instantly.',
  },
  {
    q: 'Can I start with a Fix Pack and upgrade to the full Playbook later?',
    a: 'Yes. If you buy a Fix Pack and later want the full Playbook, just purchase it directly. The Fix Packs and Playbook are priced so the Playbook is the clear value for anyone with more than one visibility issue.',
  },
  {
    q: 'What if I am not satisfied?',
    a: 'Email hello@mygeoradar.com within 30 days for a full refund. No questions asked.',
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── HEADER ── */}
      <section className="pt-28 pb-16 px-4 md:px-8 border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/8 border border-accent/20 text-accent text-xs font-medium mb-6">
            <Radar className="w-3 h-3" />
            Simple, transparent pricing
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
            Fix exactly what&#39;s broken.
            <br />
            <span className="text-gradient-accent">Nothing more, nothing less.</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-8 max-w-xl mx-auto text-balance">
            Start with a free scan to find your visibility gaps. Then get only the fix guide you
            need — or grab the complete system for $27.
          </p>
          <Link href="/#scan">
            <Button variant="secondary" size="lg" className="gap-2">
              <Radar className="w-4 h-4" />
              Run my free scan first
            </Button>
          </Link>
        </div>
      </section>

      {/* ── OFFER LADDER ── */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Step 1: Free */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-7 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-xs font-bold text-accent">1</span>
              <h2 className="text-xl font-bold">Start free — no signup required</h2>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl font-black text-foreground">Free</span>
                  <span className="text-sm text-muted font-medium">forever</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Business Visibility Scan</h3>
                <p className="text-sm text-muted leading-relaxed mb-4 max-w-lg">
                  Paste your URL and get a scored breakdown of your visibility gaps across local SEO,
                  schema, and AI search signals. Takes 30 seconds. No credit card, no email required.
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {['No signup', 'Results in 30 seconds', 'Specific findings, not vague scores'].map((t) => (
                    <div key={t} className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                      <span className="text-xs text-muted">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0">
                <Link href="/#scan">
                  <Button variant="secondary" size="lg" className="gap-2 whitespace-nowrap">
                    Run free scan <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Step 2: Fix Packs */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-7 h-7 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-xs font-bold text-accent">2</span>
              <h2 className="text-xl font-bold">Fix one specific problem — $19 each</h2>
            </div>
            <p className="text-sm text-muted mb-6 ml-10">
              Know exactly which visibility layer is broken? Get just the fix guide for that issue.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fixPacks.map(({ icon: Icon, title, price, description, includes, cta, href }) => (
                <div
                  key={title}
                  className="rounded-xl border border-border bg-white p-6 hover:border-accent/30 hover:shadow-card-lift transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-accent/8 border border-accent/15 flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5 text-accent" />
                    </div>
                    <span className="text-xl font-black text-foreground">{price}</span>
                  </div>
                  <h3 className="font-semibold text-[15px] mb-2">{title}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">{description}</p>
                  <ul className="flex flex-col gap-1.5 mb-5">
                    {includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-muted">
                        <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={href}>
                    <Button variant="secondary" size="sm" className="w-full gap-1.5">
                      {cta} <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Full Playbook — hero offer */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-7 h-7 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-xs font-bold text-accent">3</span>
              <h2 className="text-xl font-bold">Fix everything at once — $27 one time</h2>
            </div>
            <p className="text-sm text-muted mb-6 ml-10">
              The complete system. All four Fix Packs plus the checklist, prompt pack, and 30-day calendar.
            </p>
            <div className="relative rounded-2xl border border-accent/40 bg-white p-8 shadow-card-accent overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent" />
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
                  <Star className="w-3 h-3" /> Best value
                </span>
              </div>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent mb-3">
                    Complete Business Visibility Bundle
                  </p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-5xl font-black text-gradient tracking-tight">$27</span>
                    <span className="text-sm text-muted">one time</span>
                  </div>
                  <p className="text-xs text-muted mb-6">No subscription &middot; Instant download &middot; All updates free</p>
                  <ul className="flex flex-col gap-2.5">
                    {playbookIncludes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-shrink-0 flex flex-col gap-3 w-full md:w-52">
                  <Link href="/playbook">
                    <Button variant="primary" size="lg" className="w-full gap-2 shadow-glow-sm">
                      Get the full playbook <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  {/* ── 30-DAY GUARANTEE TRUST BADGE ── */}
                  <div className="flex items-start gap-2.5 rounded-xl border border-green-200 bg-green-50 px-3 py-2.5">
                    <Shield className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-green-800 leading-tight">30-Day Money-Back Guarantee</p>
                      <p className="text-[11px] text-green-700 leading-snug mt-0.5">
                        Not happy? Email{' '}
                        <a href="mailto:hello@mygeoradar.com" className="underline font-medium">hello@mygeoradar.com</a>{' '}
                        within 30 days for a full refund. No questions asked.{' '}
                        <Link href="/refund" className="underline font-medium">See refund policy →</Link>
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-center text-muted">
                    🔒 Secure checkout via Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Custom Audit */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-7 h-7 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-xs font-bold text-accent">4</span>
              <h2 className="text-xl font-bold">Done-for-you custom audit</h2>
            </div>
            <p className="text-sm text-muted mb-6 ml-10">
              Want a human to review your specific business and tell you exactly what to fix?
            </p>
            <div className="rounded-2xl border border-border bg-surface p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-5 h-5 text-accent" />
                  <span className="text-xl font-black text-foreground">Custom</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Manual Visibility Audit</h3>
                <p className="text-sm text-muted leading-relaxed mb-4 max-w-lg">
                  A personalized review of your GBP, citations, schema, and AI presence — with a
                  prioritized fix list written specifically for your business. Delivered within 48 hours.
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {[
                    'Personalized to your business',
                    'Prioritized fix list',
                    'Delivered in 48 hours',
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                      <span className="text-xs text-muted">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0">
                <a href="mailto:hello@mygeoradar.com?subject=Custom Visibility Audit">
                  <Button variant="secondary" size="lg" className="gap-2 whitespace-nowrap">
                    Request a custom audit <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="py-16 px-4 md:px-8 border-t border-border bg-surface/40">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Which option is right for you?</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="text-left px-4 py-3 font-semibold text-foreground"></th>
                  <th className="px-4 py-3 font-semibold text-foreground text-center">Free Scan</th>
                  <th className="px-4 py-3 font-semibold text-foreground text-center">Fix Pack<br/><span className="font-normal text-muted text-xs">$19 each</span></th>
                  <th className="px-4 py-3 font-semibold text-accent text-center">Full Playbook<br/><span className="font-normal text-xs">$27</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ['Visibility score & findings', true, false, true],
                  ['Fix guide for one issue', false, true, true],
                  ['All four fix guides', false, false, true],
                  ['27-point visibility checklist', false, false, true],
                  ['10 AI audit prompts', false, 'AI pack only', true],
                  ['30-day action calendar', false, false, true],
                  ['Future updates included', false, true, true],
                  ['30-day money-back guarantee', false, true, true],
                ].map(([feature, free, pack, full]) => (
                  <tr key={String(feature)} className="hover:bg-surface/60 transition-colors">
                    <td className="px-4 py-3 text-muted">{feature}</td>
                    <td className="px-4 py-3 text-center">
                      {free === true ? (
                        <CheckCircle className="w-4 h-4 text-accent mx-auto" />
                      ) : free === false ? (
                        <span className="text-muted/40">—</span>
                      ) : (
                        <span className="text-xs text-muted">{free}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {pack === true ? (
                        <CheckCircle className="w-4 h-4 text-accent mx-auto" />
                      ) : pack === false ? (
                        <span className="text-muted/40">—</span>
                      ) : (
                        <span className="text-xs text-muted">{pack}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center bg-accent/3">
                      {full === true ? (
                        <CheckCircle className="w-4 h-4 text-accent mx-auto" />
                      ) : full === false ? (
                        <span className="text-muted/40">—</span>
                      ) : (
                        <span className="text-xs text-muted">{full}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-4 md:px-8 border-t border-border">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 justify-center mb-8">
            <HelpCircle className="w-5 h-5 text-accent" />
            <h2 className="text-2xl font-bold">Pricing questions</h2>
          </div>
          <div className="divide-y divide-border">
            {faqs.map(({ q, a }) => (
              <div key={q} className="py-5">
                <h3 className="font-semibold text-[15px] mb-2">{q}</h3>
                <p className="text-sm text-muted leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 px-4 md:px-8 border-t border-border bg-surface/40">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-balance">
            Not sure where to start?
          </h2>
          <p className="text-muted mb-8">
            Run the free scan first. It will show you exactly which of the four visibility layers
            is most broken — then you&#39;ll know exactly which fix guide you need.
          </p>
          <Link href="/#scan">
            <Button variant="primary" size="lg" className="gap-2 shadow-glow-sm">
              Run my free visibility scan <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <p className="text-xs text-muted mt-3">No signup &middot; No credit card &middot; 30 seconds</p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
