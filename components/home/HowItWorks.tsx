import { ClipboardList, ScanLine, Lightbulb } from 'lucide-react'

const steps = [
  {
    icon: ClipboardList,
    number: '01',
    title: 'Enter your business',
    description: 'Name and website. That\u2019s it. Takes 30 seconds.',
  },
  {
    icon: ScanLine,
    number: '02',
    title: 'We scan all 4 AI engines',
    description: 'ChatGPT, Perplexity, Gemini, and Claude — all at once.',
  },
  {
    icon: Lightbulb,
    number: '03',
    title: 'You get a fix plan',
    description: 'A ranked list of exactly what to fix. No fluff.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">How it works</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Three steps. Under 60 seconds.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <div className="hidden md:block absolute top-10 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px bg-border z-0" />

        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <div key={i} className="relative z-10 flex flex-col items-center text-center gap-5 p-6 rounded-2xl bg-surface border border-border hover:border-accent/40 transition-colors">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2 text-lg">{step.title}</h3>
                <p className="text-sm text-foreground-dim leading-relaxed">{step.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
