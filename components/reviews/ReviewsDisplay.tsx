'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'

interface Review {
  id: string
  name: string
  business_name: string | null
  business_type: string | null
  rating: number
  review_text: string
  created_at: string
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-border'}`} />
      ))}
    </div>
  )
}

export function ReviewsDisplay() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/reviews').then((r) => r.json()).then((d) => setReviews(d.reviews || [])).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => <div key={i} className="rounded-xl border border-border p-5 animate-pulse bg-surface h-36" />)}
      </div>
    )
  }

  if (reviews.length === 0) {
    return <p className="text-center text-muted text-sm py-8">No reviews yet. Be the first!</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reviews.map((review) => (
        <div key={review.id} className="rounded-xl border border-border bg-white p-5 flex flex-col gap-3 hover:border-accent/25 hover:shadow-card-lift transition-all duration-200">
          <StarRating rating={review.rating} />
          <p className="text-sm text-foreground leading-relaxed">&ldquo;{review.review_text}&rdquo;</p>
          <div className="mt-auto pt-2 border-t border-border flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-foreground block">{review.name}</span>
              {review.business_name && <span className="text-xs text-muted">{review.business_name}{review.business_type ? ` · ${review.business_type}` : ''}</span>}
            </div>
            <span className="text-xs text-muted">{new Date(review.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
