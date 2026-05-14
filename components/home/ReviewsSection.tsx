'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Star, X, MessageSquarePlus, CheckCircle2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className="w-7 h-7"
            fill={(hover || value) >= star ? '#f59e0b' : 'transparent'}
            stroke={(hover || value) >= star ? '#f59e0b' : '#6b7280'}
          />
        </button>
      ))}
    </div>
  )
}

function ReviewModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    name: '',
    business_name: '',
    business_type: '',
    rating: 0,
    review_text: '',
    website: '',
  })
  const [loading, setLoading]     = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]         = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim())        return setError('Please enter your name.')
    if (form.rating === 0)        return setError('Please select a star rating.')
    if (!form.review_text.trim()) return setError('Please write a short review.')

    setError('')
    setLoading(true)
    const { error: sbError } = await supabase!.from('reviews').insert([{
      name:          form.name.trim(),
      business_name: form.business_name.trim() || null,
      business_type: form.business_type.trim() || null,
      rating:        form.rating,
      review_text:   form.review_text.trim(),
      website:       form.website.trim() || null,
    }])
    setLoading(false)
    if (sbError) {
      setError('Something went wrong. Please try again.')
    } else {
      setSubmitted(true)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg bg-surface border border-border rounded-2xl p-6 flex flex-col gap-5 shadow-glow-md">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">Leave a review</h3>
            <p className="text-sm text-muted mt-0.5">Help other businesses discover MyGeoRadar.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-2 text-muted hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-success" />
            <div>
              <p className="font-semibold text-foreground text-lg">Thank you!</p>
              <p className="text-sm text-muted mt-1">Your review will appear once approved.</p>
            </div>
            <Button variant="secondary" onClick={onClose}>Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Your name *"
              placeholder="Jane Smith"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Business name"
                placeholder="Acme Corp"
                value={form.business_name}
                onChange={(e) => setForm({ ...form, business_name: e.target.value })}
              />
              <Input
                label="Business type"
                placeholder="Law firm, Gym..."
                value={form.business_type}
                onChange={(e) => setForm({ ...form, business_type: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground-dim">Rating *</label>
              <StarRating value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground-dim">Your review *</label>
              <textarea
                rows={4}
                placeholder="How did MyGeoRadar help your business?"
                value={form.review_text}
                onChange={(e) => setForm({ ...form, review_text: e.target.value })}
                className="input-base resize-none"
              />
            </div>

            <Input
              label="Website (optional)"
              placeholder="yoursite.com"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />

            {error && <p className="text-sm text-danger">{error}</p>}

            <Button type="submit" variant="primary" loading={loading} className="w-full">
              Submit review
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

export function ReviewsSection() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="section">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Reviews</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What users say</h2>
        <p className="mt-4 text-foreground-dim max-w-xl mx-auto">
          Be one of the first to share your experience.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="card p-8 flex flex-col items-center text-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
            <MessageSquarePlus className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-lg">No reviews yet</p>
            <p className="text-sm text-muted mt-2">Run a scan and let others know how it helped.</p>
          </div>
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} className="w-5 h-5" fill="#f59e0b" stroke="#f59e0b" />
            ))}
          </div>
          <Button variant="primary" onClick={() => setModalOpen(true)}>
            <MessageSquarePlus className="w-4 h-4" />
            Write a review
          </Button>
          <Badge variant="neutral" className="text-xs">Moderated before publishing</Badge>
        </div>
      </div>

      {modalOpen && <ReviewModal onClose={() => setModalOpen(false)} />}
    </section>
  )
}
