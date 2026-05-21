import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ArrowRight, CheckCircle, Lock, Radio } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Is Your Business Invisible to AI? | MyGeoRadar',
  description:
    'AI assistants like ChatGPT, Perplexity, and Gemini have never heard of most businesses. Find out why — and get the complete system to fix it.',
}

const FREE_STEPS = [
  {
    number: 1,
    title: 'Claim & complete your Google Business Profile',
    body: 'AI engines like ChatGPT and Perplexity pull heavily from Google’s Knowledge Graph. A fully filled GBP — with categories, description, photos, and hours — is the single fastest signal you can send. Go to business.google.com, claim your listing, and fill every field.',
  },
  {
    number: 2,
    title: 'Add structured data (schema markup) to your website',
    body: 'Schema markup is invisible HTML code that tells AI crawlers exactly what your business does, where it is, and who it serves. Add LocalBusiness, Organization, and FAQPage schemas to your homepage and key pages. Without this, AI engines are guessing — with it, they know.',
  },
  {
    number: 3,
    title: 'Submit to the 10 most important business directories',
    body: 'AI models verify a business is real by finding consistent mentions across multiple independent sources. Your Name, Address, and Phone number appearing the same way on Yelp, Bing Places, Apple Maps, BBB, and 6 others is a trust signal that directly lifts your AI visibility.',
  },
]

const LOCKED_STEPS = [
  'Set up Google Search Console & submit your sitemap for fast indexing',
  'Rewrite your About page so AI can quote it (with formula)',
  'Create a /facts page — your AI knowledge base (with template)',
  'Get cited in local press — includes pitch email + press release template',
  'Build a FAQ page with FAQPage schema AI engines quote directly',
  'Index your site in Bing Webmaster Tools (powers Microsoft Copilot)',
  'Create a Wikidata entry — the closest thing to an AI directory listing',
  'Your 30-day execution calendar: day-by-day timeline + weekly checklist',
]

export default function InvisiblePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">

        {/* Hero */}
        <section className="border-b border-border bg-surface/50 pt-24">
          <div className="max-w-2xl mx-auto px-4 py-12 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
                <Radio className="w-3 h-3" /> AI Invisible
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Most businesses are completely invisible to AI assistants
            </h1>
            <p className="text-muted leading-relaxed">
              ChatGPT, Perplexity, Gemini, and Claude have zero knowledge of most small businesses.
              When anyone asks an AI for a recommendation in your category, your name never comes up.
              Here are the first 3 steps to fix that — free.
            </p>
          </div>
        </section>

        {/* Free steps */}
        <section className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Your AI Visibility Starter Plan</h2>
            <span className="text-xs text-green-400 font-semibold bg-green-400/10 border border-green-400/20 px-2 py-1 rounded-full">3 steps free</span>
          </div>
          <div className="flex flex-col gap-4">
            {FREE_STEPS.map(step => (
              <div key={step.number} className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-bold flex items-center justify-center shrink-0">
                    {step.number}
                  </span>
                  <h3 className="text-sm font-bold">{step.title}</h3>
                </div>
                <p className="text-sm text-muted leading-relaxed pl-10">{step.body}</p>
              </div>
            ))}
          </div>

          {/* Paywall upgrade card */}
          <div className="rounded-2xl border-2 border-accent/40 bg-surface p-6 flex flex-col gap-4 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-bold">Steps 4–11 + all templates are in the Found by AI Playbook</p>
                <p className="text-sm text-muted mt-1">
                  The remaining 8 steps include copy-paste schema code, a press pitch email, an About page formula,
                  a Google Search Console walkthrough, a Wikidata entry guide, and your full 30-day
                  day-by-day execution calendar.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              {LOCKED_STEPS.map(step => (
                <div key={step} className="flex items-center gap-2">
                  <Lock className="w-3 h-3 text-muted shrink-0" />
                  <span className="text-xs text-muted">{step}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 flex flex-col gap-3">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: '📋', label: '8 copy-paste templates' },
                  { icon: '📅', label: '30-day calendar' },
                  { icon: '✅', label: '27-point checklist' },
                ].map(v => (
                  <div key={v.label} className="flex flex-col items-center gap-1 text-center bg-surface-2 rounded-xl p-3">
                    <span className="text-lg">{v.icon}</span>
                    <span className="text-xs text-muted font-medium">{v.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">$27</span>
                <span className="text-sm text-muted">one-time &middot; instant download</span>
              </div>
              <Link
                href="/playbook"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white text-sm font-bold transition-colors"
              >
                Get the full Found by AI Playbook <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-muted text-center">Secure checkout via Stripe &middot; Instant download &middot; 30-day guarantee</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
