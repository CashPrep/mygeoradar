'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Star, ArrowRight } from 'lucide-react'

interface Review {
  id: string
  name: string
  rating: number
  body: string
  created_at: string
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-border'
          }`}
        />
      ))}
    </div>
  )
}

export function HomepageReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/reviews')
      .then((r) => r.json())
      .then((d) => setReviews((d.reviews || []).slice(0, 3)))
      .finally(() => setLoading(false))
  }, [])

  // Don't render section at all if no reviews yet
  if (!loading && reviews.length === 0) return null

  return (
    <section className="py-24 px-4 md:px-8 border-t border-border bg-surface/40">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 mb-4">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            What customers are saying
          </h2>
          <p className="text-muted max-w-md mx-auto text-sm">
            Business owners and marketers who got visible to AI.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1,2,3].map((i) => (
              <div key={i} className="rounded-xl border border-border p-5 animate-pulse bg-white h-36" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-xl border border-border bg-white p-5 flex flex-col gap-3 hover:border-accent/25 hover:shadow-card-lift transition-all duration-200"
              >
                <StarRating rating={review.rating} />
                <p className="text-sm text-foreground leading-relaxed flex-1">&ldquo;{review.body}&rdquo;</p>
                <div className="pt-2 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-semibold">{review.name}</span>
                  <span className="text-xs text-muted">
                    {new Date(review.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline font-medium"
          >
            See all reviews <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
