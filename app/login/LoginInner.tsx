'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Radar, Mail, Chrome } from 'lucide-react'
import { createSupabaseBrowser } from '@/lib/supabase-browser'
import { Button } from '@/components/ui/Button'

export default function LoginInner() {
  const router       = useRouter()
  const params       = useSearchParams()
  const hint         = params.get('hint') ?? ''
  const next         = params.get('next') ?? '/account'

  const [email, setEmail]     = useState(hint)
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const supabase = createSupabaseBrowser()

  useEffect(() => {
    if (params.get('error')) setError('Authentication failed. Please try again.')
  }, [params])

  useEffect(() => {
    if (hint) setEmail(hint)
  }, [hint])

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })
    setLoading(false)
    if (error) { setError(error.message); return }
    setSent(true)
  }

  async function handleGoogle() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })
    if (error) { setError(error.message); setLoading(false) }
  }

  const fromPurchase = !!params.get('hint')

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Subtle background glow */}
      <div className="absolute inset-0 glow-top pointer-events-none" aria-hidden="true" />

      {/* Logo */}
      <Link
        href="/"
        className="relative flex items-center gap-2 mb-8 transition-transform duration-200 hover:scale-[1.04]"
      >
        <Radar className="w-5 h-5 text-accent" />
        <span className="font-bold text-base tracking-tight">
          my<span className="text-accent">geo</span>radar
        </span>
      </Link>

      <div className="relative w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-card-hover">
        <h1 className="text-xl font-bold mb-1 text-center">Sign in</h1>
        <p className="text-sm text-muted text-center mb-6">
          {fromPurchase
            ? 'Sign in to access your purchased downloads'
            : 'Access your purchases & downloads'}
        </p>

        {sent ? (
          <div className="text-center">
            <div className="w-14 h-14 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Mail className="w-7 h-7 text-accent" />
            </div>
            <p className="font-semibold mb-1">Check your email</p>
            <p className="text-sm text-muted">We sent a magic link to <strong>{email}</strong></p>
            {fromPurchase && (
              <p className="text-xs text-muted mt-3">
                Click the link in your email to unlock your downloads.
              </p>
            )}
          </div>
        ) : (
          <>
            {/* Google OAuth */}
            <button
              onClick={handleGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-surface-2 hover:border-accent/40 transition-all mb-4 disabled:opacity-50"
            >
              <Chrome className="w-4 h-4 text-blue-500" />
              Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Magic Link */}
            <form onSubmit={handleMagicLink} className="flex flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-base"
              />
              <Button variant="primary" size="sm" type="submit" disabled={loading} className="w-full">
                {loading ? 'Sending…' : 'Send magic link'}
              </Button>
            </form>

            {error && (
              <p className="mt-3 text-xs text-red-500 text-center">{error}</p>
            )}
          </>
        )}
      </div>

      <p className="mt-6 text-xs text-muted">
        No account needed — just enter your email
      </p>
    </div>
  )
}
