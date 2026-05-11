import { Search, Cpu, FileText } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Enter your business',
    description: 'Tell us your business name, website, and the 1–5 topics you want to be found for. Takes under a minute.',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'We scan 4 AI engines',
    description: 'Our system checks how ChatGPT, Perplexity, Gemini and Claude respond to queries related to your business and topics.',
  },
  {
    number: '03',
    icon: FileText,
    title: 'Get your action plan',
    description: 'Receive a full visibility score, engine-by-engine breakdown, and a prioritized list of fixes to implement this week.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Simple process</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How it works</h2>
        <p className="mt-4 text-foreground-dim max-w-xl mx-auto">
          From zero to a full AI visibility report in under 60 seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Connector line (desktop) */}
        <div className="hidden md:block absolute top-10 left-[calc(16.66%+16px)] right-[calc(16.66%+16px)] h-px bg-border z-0" />

        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <div key={i} className="relative z-10 flex flex-col items-center text-center gap-4 p-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-border flex items-center justify-center">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-foreground-dim leading-relaxed">{step.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
