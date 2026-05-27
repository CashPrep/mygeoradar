'use client'

import { useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'

interface Props {
  label?: string
  className?: string
}

export function CheckoutButton({ label = 'Get instant access — $27', className }: Props) {
  const [loading, setLoading] = useState(false)
  const [gone,    setGone]    = useState(false)
  const [error,   setError]   = useState('')

  async function handleClick() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', { method: 'POST' })
      if (!res.ok) throw new Error('non-2xx')
      const redirectUrl = res.redirected ? res.url : (await res.json()).url
      if (!redirectUrl) throw new Error('no url')
      setGone(true)
      window.location.href = redirectUrl
    } catch {
      setError('Checkout unavailable — please try again in a moment.')
      setLoading(false)
    }
  }

  if (gone) {
    return (
      <div className="flex items-center justify-center gap-2 text-sm text-muted py-3">
        <Loader2 className="w-4 h-4 animate-spin text-accent" />
        <span>Redirecting to checkout&hellip;</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleClick}
        disabled={loading}
        className={className ?? 'btn-primary text-base px-8 py-3.5 rounded-xl shadow-glow-sm'}
      >
        {loading
          ? <><Loader2 className="w-4 h-4 animate-spin" /> One moment&hellip;</>
          : <>{label} <ArrowRight className="w-5 h-5" /></>}
      </button>
      {error && (
        <p className="text-xs text-red-600 text-center max-w-xs">{error}</p>
      )}
    </div>
  )
}
