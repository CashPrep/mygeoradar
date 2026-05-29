'use client'

import { useState } from 'react'
import { Mail, ArrowRight, Loader2, CheckCircle } from 'lucide-react'

interface EmailGateProps {
  scanId:     string | null
  score:      number
  url:        string
  failCount:  number
  warnCount:  number
}

export function EmailGate({ scanId, score, url, failCount, warnCount }: EmailGateProps) {
  const [email,     setEmail]     = useState('')
  const [consent,   setConsent]   = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [done,      setDone]      = useState(false)
  const [error,     setError]     = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !consent) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/scan-lead', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email:     email.trim().toLowerCase(),
          scanId:    scanId ?? '',
          score,
          url,
          failCount,
          warnCount,
          consent: true,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        return
      }
      setDone(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-5 flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-emerald-800 mb-1">
            Check your inbox!
          </p>
          <p className="text-xs text-emerald-700">
            We just emailed your full scan results to <strong>{email}</strong>. Check your spam folder if you don&apos;t see it within a minute.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-4 rounded-xl border border-accent/25 bg-white shadow-card-accent overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-accent/8 border border-accent/15 flex items-center justify-center flex-shrink-0">
            <Mail className="w-4 h-4 text-accent" />
          </div>
          <p className="text-sm font-semibold">
            Get your full results + fix guide emailed to you
          </p>
        </div>
        <p className="text-xs text-muted mb-4">
          We&apos;ll send your score breakdown, what each issue means, and exactly how to fix it — free.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/60 transition-colors"
          />

          {/* GDPR / CAN-SPAM consent checkbox */}
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={e => setConsent(e.target.checked)}
              className="mt-0.5 w-3.5 h-3.5 rounded accent-violet-600 flex-shrink-0"
            />
            <span className="text-xs text-muted leading-relaxed">
              I agree to receive my scan report and occasional AI visibility tips from MyGeoRadar.
              Unsubscribe anytime.
            </span>
          </label>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={!email.trim() || !consent || loading}
            className="btn-primary gap-2 text-sm py-2.5 w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending&hellip;</>
              : <>Email me my results <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>
      </div>
    </div>
  )
}
