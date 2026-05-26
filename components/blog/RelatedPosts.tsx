import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export interface RelatedPost {
  slug: string
  title: string
  tag: string
}

interface RelatedPostsProps {
  posts: RelatedPost[]
}

/**
 * Renders a "Keep reading" section with 2–3 related post links.
 * Placed just before <BlogCta> to keep readers on-site and improve
 * internal linking for AI crawler context.
 */
export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) return null

  return (
    <div className="mt-10 pt-8 border-t border-border">
      <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-4">Keep reading</p>
      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-surface border border-border hover:border-accent/40 transition-colors"
          >
            <div>
              <p className="text-xs text-accent font-medium mb-0.5">{post.tag}</p>
              <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
                {post.title}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted flex-shrink-0 group-hover:text-accent transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  )
}
