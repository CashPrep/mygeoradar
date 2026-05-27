'use client'

import { useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'

interface Props {
  label?: string
  className?: string
}

export function CheckoutButton({ label = 'Get instant access — $27', className }: Props) {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  async function handleClick() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', { method: 'POST' })
      if (!res.ok) throw new Error('non-2xx')
      // API returns a redirect — follow the Location header the browser received,
      // or parse JSON if we ever switch to returning { url }
      // With NextResponse.redirect the browser follows automatically for fetch,
      // but we need to grab the final URL from res.url
      if (res.redirected) {
        window.location.href = res.url
        return
      }
      const data = await res.json()
      if (data.url) { window.location.href = data.url; return }
      throw new Error('no redirect url')
    } catch {
      setError('Checkout unavailable — please try again in a moment.')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleClick}
        disabled={loading}
        className={className ?? 'btn-primary text-base px-8 py-3.5 rounded-xl shadow-glow-sm'}
      >
        {loading
          ? <><Loader2 className="w-4 h-4 animate-spin" /> Redirecting to checkout&hellip;</>
          : <>{label} <ArrowRight className="w-5 h-5" /></>}
      </button>
      {error && (
        <p className="text-xs text-red-600 text-center max-w-xs">{error}</p>
      )}
    </div>
  )
}
