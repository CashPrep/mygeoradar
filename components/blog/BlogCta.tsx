import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

interface BlogCtaProps {
  heading?:    string
  subheading?: string
}

export function BlogCta({
  heading    = 'Want the complete system, not just the theory?',
  subheading = 'The Found by AI Playbook gives you the exact step-by-step process, 27-point checklist, copy-paste prompts, and 30-day calendar to get your business found by ChatGPT, Perplexity, Gemini, and Claude.',
}: BlogCtaProps) {
  return (
    <div className="mt-10 p-6 bg-surface border-2 border-accent/30 rounded-xl flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-4 h-4 text-accent" />
        </div>
        <div>
          <p className="font-semibold text-foreground">{heading}</p>
          <p className="text-sm text-muted mt-1 leading-relaxed">{subheading}</p>
        </div>
      </div>
      <Link
        href="/playbook"
        className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors w-fit"
      >
        Get the Found by AI Playbook — $27 <ArrowRight className="w-4 h-4" />
      </Link>
      <p className="text-xs text-muted">One-time payment &middot; Instant download &middot; 30-day guarantee</p>
    </div>
  )
}
