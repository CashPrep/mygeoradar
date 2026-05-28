'use client'

import { useState } from 'react'
import { Star, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function ReviewForm() {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [body, setBody] = useState('')
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
        body: JSON.stringify({ name, email, rating, body }),
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
        <label htmlFor="review-name" className="block text-sm font-medium mb-1.5">Your Name *</label>
        <input
          id="review-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Smith"
          className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
        />
      </div>

      {/* Email (optional) */}
      <div>
        <label htmlFor="review-email" className="block text-sm font-medium mb-1.5">
          Email <span className="text-muted font-normal">(optional, never shown)</span>
        </label>
        <input
          id="review-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@example.com"
          className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
        />
      </div>

      {/* Review Body */}
      <div>
        <label htmlFor="review-body" className="block text-sm font-medium mb-1.5">Your Review *</label>
        <textarea
          id="review-body"
          required
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share your experience with MyGeoRadar..."
          className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-none"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" variant="primary" disabled={loading} className="gap-2 self-start">
        {loading ? 'Submitting…' : (<><Send className="w-4 h-4" /> Submit Review</>)}
      </Button>
    </form>
  )
}
