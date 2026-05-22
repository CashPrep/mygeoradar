import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface BlogMidCtaProps {
  /** Short topic hook — what specific thing the playbook covers relevant to this article */
  topic: string
  /** One-line description of what the buyer gets in context of this article's subject */
  hook: string
}

/**
 * Compact inline CTA injected at the natural midpoint of a blog post.
 * Each post passes a topic-specific `topic` and `hook` so the message
 * feels contextual — not generic.
 */
export function BlogMidCta({ topic, hook }: BlogMidCtaProps) {
  return (
    <div className="my-8 p-5 rounded-xl bg-accent/5 border border-accent/25 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">
          Found by AI Playbook &mdash; {topic}
        </p>
        <p className="text-sm text-muted leading-relaxed">{hook}</p>
      </div>
      <Link
        href="/playbook"
        className="flex-shrink-0 inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap"
      >
        Get it &mdash; $27 <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  )
}
