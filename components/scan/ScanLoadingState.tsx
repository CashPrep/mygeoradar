'use client'

import { useEffect, useState } from 'react'
import { Radar } from 'lucide-react'

const STEPS = [
  'Scanning ChatGPT...',
  'Scanning Perplexity...',
  'Scanning Gemini...',
  'Scanning Claude...',
  'Calculating your visibility score...',
  'Building your action plan...',
]

export function ScanLoadingState() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s < STEPS.length - 1 ? s + 1 : s))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-24 px-4 text-center">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
          <Radar className="w-10 h-10 text-accent animate-pulse-slow" />
        </div>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-accent/15 animate-ping"
            style={{
              width: `${i * 60 + 24}px`,
              height: `${i * 60 + 24}px`,
              top: `${-(i * 30)}px`,
              left: `${-(i * 30)}px`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '2.5s',
            }}
          />
        ))}
      </div>

      <div>
        <p className="text-xl font-semibold text-foreground mb-2">{STEPS[step]}</p>
        <p className="text-sm text-muted">This takes about 30–60 seconds</p>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-xs">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full shrink-0 transition-all duration-500 ${
              i < step ? 'bg-success' : i === step ? 'bg-accent animate-pulse' : 'bg-border'
            }`} />
            <p className={`text-sm transition-colors duration-300 ${
              i < step ? 'text-success' : i === step ? 'text-foreground' : 'text-muted'
            }`}>{s}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
