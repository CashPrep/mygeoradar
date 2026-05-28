'use client'

import { useState } from 'react'
import { Star, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function ReviewForm() {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [name, setName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [website, setWebsite] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (rating === 0) { setError('Please select a star rating.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          business_name: businessName,
          business_type: businessType,
          website,
          rating,
          review_text: reviewText,
        }),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error || 'Something went wrong.'); return }
      setSubmitted(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <CheckCircle className="w-10 h-10 text-accent" />
        <p className="font-semibold text-[15px]">Thank you for your review!</p>
        <p className="text-sm text-muted">We appreciate your feedback.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Star Rating */}
      <div>
        <label className="block text-sm font-medium mb-2">Your Rating *</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-7 h-7 transition-colors ${
                  star <= (hovered || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-border'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="r-name" className="block text-sm font-medium mb-1.5">Your Name *</label>
        <input id="r-name" type="text" required value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Jane Smith"
          className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors" />
      </div>

      {/* Business Name (optional) */}
      <div>
        <label htmlFor="r-biz" className="block text-sm font-medium mb-1.5">
          Business Name <span className="text-muted font-normal">(optional)</span>
        </label>
        <input id="r-biz" type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)}
          placeholder="Acme Plumbing"
          className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors" />
      </div>

      {/* Business Type (optional) */}
      <div>
        <label htmlFor="r-type" className="block text-sm font-medium mb-1.5">
          Business Type <span className="text-muted font-normal">(optional)</span>
        </label>
        <input id="r-type" type="text" value={businessType} onChange={(e) => setBusinessType(e.target.value)}
          placeholder="Local service, e-commerce, SaaS…"
          className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors" />
      </div>

      {/* Website (optional) */}
      <div>
        <label htmlFor="r-web" className="block text-sm font-medium mb-1.5">
          Your Website <span className="text-muted font-normal">(optional)</span>
        </label>
        <input id="r-web" type="url" value={website} onChange={(e) => setWebsite(e.target.value)}
          placeholder="https://yourbusiness.com"
          className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors" />
      </div>

      {/* Review Body */}
      <div>
        <label htmlFor="r-body" className="block text-sm font-medium mb-1.5">Your Review *</label>
        <textarea id="r-body" required rows={4} value={reviewText} onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your experience with MyGeoRadar…"
          className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-none" />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" variant="primary" disabled={loading} className="gap-2 self-start">
        {loading ? 'Submitting…' : (<><Send className="w-4 h-4" /> Submit Review</>)}
      </Button>
    </form>
  )
}
