import { Card } from '@/components/ui/Card'
import {
  Radar, BarChart2, ListChecks, RefreshCw, Code2, TrendingUp
} from 'lucide-react'

const features = [
  {
    icon: Radar,
    title: 'AI Citation Tracking',
    description: 'Find out if ChatGPT, Perplexity, Gemini and Claude are mentioning your business when people ask questions in your industry.',
    accent: '#4f8ef7',
  },
  {
    icon: BarChart2,
    title: 'Visibility Score',
    description: 'Get a clear 0–100 score per AI engine and per topic so you know exactly where you stand and what to prioritize.',
    accent: '#8b5cf6',
  },
  {
    icon: ListChecks,
    title: 'Actionable Plan',
    description: "No fluff. Get 3–5 specific things to fix this week — ordered by impact so you're never guessing what to do next.",
    accent: '#22c55e',
  },
  {
    icon: Code2,
    title: 'Schema & Entity Tips',
    description: 'AI engines rely on structured data to understand who you are. We flag exactly what markup you\'re missing.',
    accent: '#f59e0b',
  },
  {
    icon: TrendingUp,
    title: 'Content Gap Analysis',
    description: 'See which topics and questions you should be answering on your site to get cited more often by AI answers.',
    accent: '#ef4444',
  },
  {
    icon: RefreshCw,
    title: 'Track Over Time',
    description: 'Run scans monthly and watch your score improve as you implement changes. Know what\'s working and what isn\'t.',
    accent: '#10a37f',
  },
]

export function FeaturesGrid() {
  return (
    <section className="section">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">What you get</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Everything you need to show up in AI answers
        </h2>
        <p className="mt-4 text-foreground-dim max-w-xl mx-auto">
          One $1 scan gives you a complete picture of your AI search visibility — no subscription required.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f) => {
          const Icon = f.icon
          return (
            <Card key={f.title} hover className="p-6 flex flex-col gap-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: f.accent + '15', border: `1px solid ${f.accent}30` }}
              >
                <Icon className="w-5 h-5" style={{ color: f.accent }} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-foreground-dim leading-relaxed">{f.description}</p>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
