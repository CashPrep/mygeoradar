'use client'

import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ArrowRight, Radar, Zap } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 overflow-hidden">

      {/* Dot grid background */}
      <div className="absolute inset-0 bg-dots opacity-40" />

      {/* Top glow */}
      <div className="absolute inset-0 glow-top pointer-events-none" />

      {/* Animated radar rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-accent/10 animate-ping"
            style={{
              width:  `${i * 200}px`,
              height: `${i * 200}px`,
              top: `${-i * 100}px`,
              left: `${-i * 100}px`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: '3s',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">

        <Badge variant="accent" className="gap-2">
          <Zap className="w-3 h-3" />
          Built for the AI search era
        </Badge>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
          Most SEO tools were built{' '}
          <br className="hidden md:block" />
          <span className="text-gradient">before AI search existed.</span>
          <br />
          We weren&apos;t.
        </h1>

        <p className="text-lg md:text-xl text-foreground-dim max-w-2xl leading-relaxed">
          See exactly how ChatGPT, Perplexity, Gemini and Claude answer questions
          about your business — and get a clear, weekly action plan to show up more.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.location.href = '/scan'}
          >
            Run your AI radar scan
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
          >
            See how it works
          </Button>
        </div>

        <p className="text-sm text-muted">
          One-time scan &middot; <span className="text-foreground font-semibold">$1.00</span> &middot; Results in under 60 seconds
        </p>

        {/* Mini radar icon */}
        <div className="mt-6 relative">
          <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
            <Radar className="w-7 h-7 text-accent animate-pulse-slow" />
          </div>
          <div className="absolute inset-0 rounded-full border border-accent/20 animate-ping" style={{ animationDuration: '2s' }} />
        </div>
      </div>
    </section>
  )
}
