'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'

export function BlogEmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/scan-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'blog_email_capture' }),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json().catch(() => ({}))
        setErrorMsg(data?.error || 'Something went wrong. Try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div className="mt-12 rounded-2xl border border-accent/25 bg-accent/5 px-6 py-7">
      {status === 'success' ? (
        <div className="flex flex-col items-center gap-3 text-center py-2">
          <CheckCircle className="w-8 h-8 text-accent" />
          <p className="font-semibold text-foreground">You're on the list.</p>
          <p className="text-sm text-muted">The AI Readiness Checklist is on its way to your inbox.</p>
        </div>
      ) : (
        <>
          <p className="font-semibold text-foreground mb-1 text-[15px]">Get the free AI Readiness Checklist</p>
          <p className="text-sm text-muted mb-4 leading-relaxed">
            27 concrete actions to make your business visible to ChatGPT, Perplexity, Gemini, and Claude.
            Delivered free to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-white text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent-hover transition-colors shadow-glow-xs disabled:opacity-60"
            >
              {status === 'loading' ? 'Sending…' : (<>Send it <ArrowRight className="w-3.5 h-3.5" /></>)}
            </button>
          </form>
          {status === 'error' && (
            <p className="text-xs text-red-600 mt-2">{errorMsg}</p>
          )}
          <p className="text-xs text-muted/60 mt-3">No spam. Unsubscribe any time.</p>
        </>
      )}
    </div>
  )
}
