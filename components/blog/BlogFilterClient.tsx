'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { BLOG_POSTS, BLOG_TAGS } from '@/lib/blog-posts'

export function BlogFilterClient() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? BLOG_POSTS : BLOG_POSTS.filter(p => p.tag === active)

  return (
    <>
      {/* Tag filter pills */}
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter posts by category">
        {BLOG_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            aria-pressed={active === tag}
            className={[
              'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
              active === tag
                ? 'bg-accent text-white'
                : 'bg-surface border border-border text-muted hover:text-foreground hover:border-accent/50',
            ].join(' ')}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        {filtered.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <div className="p-6 rounded-xl bg-surface border border-border hover:border-accent/40 transition-colors flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Badge variant="accent" className="text-xs">{post.tag}</Badge>
                <span className="text-xs text-muted">{post.date} &middot; {post.readTime}</span>
              </div>
              <h2 className="text-lg font-semibold group-hover:text-accent transition-colors">{post.title}</h2>
              <p className="text-sm text-muted leading-relaxed">{post.description}</p>
              <div className="flex items-center gap-1 text-accent text-sm font-medium mt-1">
                Read more <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted">
          <p className="text-sm">No posts in this category yet.</p>
        </div>
      )}
    </>
  )
}
