import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free AI Visibility Prompt Pack — 10 Prompts to Test ChatGPT, Perplexity & Gemini | MyGeoRadar',
  description:
    'Free: 10 copy-paste prompts to test your business visibility in ChatGPT, Perplexity, Gemini, and Claude. Run the AI awareness audit, competitor gap analysis, and hallucination detection prompts.',
  openGraph: {
    title: 'Free AI Visibility Prompt Pack — 10 Copy-Paste Prompts',
    description: '10 prompts to test your AI visibility in ChatGPT, Perplexity, Gemini & Claude. Free.',
    url: 'https://mygeoradar.com/playbook/prompts',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '10 Copy-Paste Prompts to Test Your AI Visibility in ChatGPT, Perplexity, Gemini & Claude',
  description: 'A free prompt pack for testing and improving business visibility in AI assistants. Covers brand awareness, competitor gap analysis, hallucination detection, citation sourcing, and category authority.',
  url: 'https://mygeoradar.com/playbook/prompts',
  author: { '@type': 'Organization', name: 'MyGeoRadar' },
  publisher: { '@type': 'Organization', name: 'MyGeoRadar', url: 'https://mygeoradar.com' },
}

const prompts = [
  {
    number: '01',
    title: 'AI Awareness Audit',
    category: 'Brand Awareness',
    instruction: 'Paste into ChatGPT, Perplexity, Gemini, and Claude. Run each separately.',
    prompt: 'I\'m looking for a [your business type] in [your city/area]. Who are the most trusted and well-reviewed options you\'d recommend, and why? Please be specific about what makes each one stand out.',
    whatToLookFor: 'Does your business appear? How is it described? Are competitors recommended instead?',
  },
  {
    number: '02',
    title: 'Brand Description Accuracy',
    category: 'Brand Accuracy',
    instruction: 'Run this to see how AI describes your business.',
    prompt: 'What can you tell me about [your business name] in [your city]? What do they do, how long have they been around, and what are they known for?',
    whatToLookFor: 'Is the description accurate? Does it mention the right services? Is it outdated or missing key details?',
  },
  {
    number: '03',
    title: 'Competitor Gap Analysis',
    category: 'Competitor Intel',
    instruction: 'Identify who is winning the AI recommendations in your category.',
    prompt: 'What are the top [your business type] businesses in [your city]? Which ones are most frequently recommended and why do customers prefer them?',
    whatToLookFor: 'Which competitors appear? What signals are making them rank? Use this to identify what they have that you don\'t.',
  },
  {
    number: '04',
    title: 'Category Authority Check',
    category: 'Category Authority',
    instruction: 'Test whether AI sees you as an authority in your category.',
    prompt: 'Who is considered an expert or authority in [your specialty/category] in [your city/region]? Who do people in the industry trust?',
    whatToLookFor: 'Do you appear as an authority? If not, which content or credentials are competitors using to establish theirs?',
  },
  {
    number: '05',
    title: 'Hallucination Detection',
    category: 'Accuracy Audit',
    instruction: 'Check for AI-generated misinformation about your business.',
    prompt: 'Tell me about [your business name] — their history, founding, services, team, and any notable achievements or recognitions.',
    whatToLookFor: 'Any facts that are wrong, outdated, or fabricated? Flag these — you need to publish accurate information to correct the AI\'s understanding.',
  },
  {
    number: '06',
    title: 'Citation Source Finder',
    category: 'Source Intelligence',
    instruction: 'Discover which sources AI is pulling from when it mentions your category.',
    prompt: 'If someone asked you about the best [your business type] services in [your city], what sources or websites would you rely on most to answer that question? Which directories or review platforms do you trust?',
    whatToLookFor: 'Which directories and review sites does the AI cite? Make sure you\'re listed and optimized on all of them.',
  },
  {
    number: '07',
    title: 'Service Coverage Test',
    category: 'Service Visibility',
    instruction: 'See if your specific services show up in AI answers.',
    prompt: 'Who offers [your specific service] in [your city/area]? I need someone with experience in this specifically — not just a general [business type].',
    whatToLookFor: 'Do you show up for specific service queries? If not, you need more targeted content and schema for those services.',
  },
  {
    number: '08',
    title: 'Review Sentiment Check',
    category: 'Reputation',
    instruction: 'Understand how AI interprets your reputation.',
    prompt: 'What do customers say about [your business name]? What do they like and what complaints or concerns come up most often?',
    whatToLookFor: 'Does the AI have an accurate and positive picture of your reputation? Negative patterns here indicate review response or volume issues.',
  },
  {
    number: '09',
    title: 'Local Trust Signal Audit',
    category: 'Local Authority',
    instruction: 'Test how AI evaluates local trust and community standing.',
    prompt: 'Which [business type] businesses in [city] have been around the longest, have the strongest community presence, or are most trusted by locals? What makes them stand out from newer or less established options?',
    whatToLookFor: 'What attributes is AI using to signal trust and longevity? Which of those do you have documented online?',
  },
  {
    number: '10',
    title: 'Post-Fix Baseline Comparison',
    category: 'Progress Tracking',
    instruction: 'Re-run Prompt #1 after completing the 30-day plan. Compare the two responses.',
    prompt: 'I\'m looking for a [your business type] in [your city/area]. Who are the most trusted and well-reviewed options you\'d recommend, and why? Please be specific about what makes each one stand out.',
    whatToLookFor: 'Compare this response to your original Prompt #1 result. Did you appear? Are you described more accurately? Did your position relative to competitors improve?',
  },
]

export default function PromptsPage() {
  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="min-h-screen bg-background">
        <Navbar />

        <section className="relative pt-20 pb-14 px-4 md:px-8 text-center overflow-hidden border-b border-border">
          <div className="absolute inset-0 hero-bg opacity-70 pointer-events-none" aria-hidden="true" />
          <div className="relative max-w-3xl mx-auto">
            <Link href="/playbook" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Playbook
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-3 text-gradient text-balance">
              10 Copy-Paste AI Visibility Prompts
            </h1>
            <p className="text-base text-muted leading-relaxed mb-4 max-w-2xl mx-auto">
              Paste these into ChatGPT, Perplexity, Gemini, and Claude to see exactly
              how each AI describes and recommends your business — and where the gaps are.
            </p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/8 border border-accent/20 text-accent text-xs font-medium">
              Free · No signup required · Run all 4 AI assistants for a full picture
            </span>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="flex flex-col gap-8">
            {prompts.map(({ number, title, category, instruction, prompt, whatToLookFor }) => (
              <div key={number} className="rounded-2xl border border-border bg-white p-7">
                <div className="flex items-start gap-4 mb-4">
                  <span className="step-num flex-shrink-0">{number}</span>
                  <div>
                    <h2 className="font-bold text-[15px] leading-tight">{title}</h2>
                    <span className="text-xs text-accent font-medium">{category}</span>
                  </div>
                </div>
                <p className="text-xs text-muted mb-3">{instruction}</p>
                <div className="rounded-lg bg-surface-2 border border-border p-4 font-mono text-xs leading-relaxed text-foreground/80 select-all mb-4">
                  {prompt}
                </div>
                <p className="text-xs text-muted">
                  <strong className="text-foreground">What to look for: </strong>{whatToLookFor}
                </p>
              </div>
            ))}
          </div>

          {/* Scoring guide */}
          <div className="mt-10 p-6 rounded-2xl border border-border bg-white">
            <h2 className="font-bold text-base mb-4">How to score your results</h2>
            <div className="flex flex-col gap-3">
              {[
                { score: 'A (Visible + Accurate)', desc: 'Your business appears and is described correctly. Focus on maintaining and improving position.' },
                { score: 'B (Visible, Inaccurate)', desc: 'You appear but the description is wrong or outdated. Fix your citation consistency and publish corrective content.' },
                { score: 'C (Not Visible)', desc: 'You don\'t appear at all. Start with Signals 1–3 from the guide and work through the full checklist.' },
                { score: 'D (Competitor Dominated)', desc: 'Competitors appear but you don\'t. Run Prompt #3 to understand exactly what they have that you don\'t.' },
              ].map(({ score, desc }) => (
                <div key={score} className="flex items-start gap-3">
                  <span className="flex-shrink-0 font-bold text-sm text-accent w-40">{score}</span>
                  <p className="text-sm text-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Next steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            <Link
              href="/playbook/30-day-plan"
              className="flex items-center justify-between gap-3 p-5 rounded-xl border border-border bg-white hover:border-accent/30 hover:shadow-card-lift transition-all"
            >
              <div>
                <p className="font-semibold text-sm">Next: 30-Day Action Plan</p>
                <p className="text-xs text-muted mt-0.5">Day-by-day calendar →</p>
              </div>
              <ArrowRight className="w-4 h-4 text-accent flex-shrink-0" />
            </Link>
            <Link
              href="/playbook/checklist"
              className="flex items-center justify-between gap-3 p-5 rounded-xl border border-border bg-white hover:border-accent/30 hover:shadow-card-lift transition-all"
            >
              <div>
                <p className="font-semibold text-sm">27-Point Checklist</p>
                <p className="text-xs text-muted mt-0.5">Full audit →</p>
              </div>
              <ArrowRight className="w-4 h-4 text-accent flex-shrink-0" />
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    </>
  )
}
