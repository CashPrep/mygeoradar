'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Mail, Download, Loader2 } from 'lucide-react'

interface Props {
  /** Already confirmed server-side on initial render */
  initialConfirmed: boolean
  /** The email used at checkout, shown in the magic-link CTA */
  customerEmail: string | null
  /** True when the user was already signed in on page load */
  isSignedIn: boolean
}

const POLL_INTERVAL_MS = 3000
const MAX_POLLS = 5 // give up after 15 s

export function SuccessClient({ initialConfirmed, customerEmail, isSignedIn }: Props) {
  const router = useRouter()
  const [confirmed, setConfirmed] = useState(initialConfirmed)
  const [polling,   setPolling]   = useState(isSignedIn && !initialConfirmed)
  const pollCount = useRef(0)

  useEffect(() => {
    // Only poll if the user is signed in but the purchase isn't confirmed yet.
    // Once confirmed, redirect straight to /account.
    if (!isSignedIn || initialConfirmed) return

    const id = setInterval(async () => {
      pollCount.current += 1
      try {
        const res  = await fetch('/api/purchase-status', { cache: 'no-store' })
        const data = await res.json() as { confirmed: boolean }
        if (data.confirmed) {
          clearInterval(id)
          setConfirmed(true)
          setPolling(false)
          router.replace('/account')
          return
        }
      } catch { /* network hiccup — keep trying */ }

      if (pollCount.current >= MAX_POLLS) {
        clearInterval(id)
        setPolling(false)
      }
    }, POLL_INTERVAL_MS)

    return () => clearInterval(id)
  }, [isSignedIn, initialConfirmed, router])

  /* ── Already confirmed (or confirmed via polling) ───────────── */
  if (confirmed) {
    return (
      <div className="rounded-2xl border border-accent/40 bg-surface p-8 text-left">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-accent" /> You&apos;re all set
        </h2>
        <p className="text-sm text-muted mb-6">
          Your purchase is saved to your account. Download your files now and
          re-access them any time from your account page.
        </p>
        <Link
          href="/account"
          className="inline-flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-4 rounded-xl text-base transition-colors"
        >
          <Download className="w-4 h-4" /> Go to My Downloads <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  /* ── Signed in but polling ──────────────────────────────────── */
  if (isSignedIn && polling) {
    return (
      <div className="rounded-2xl border border-accent/40 bg-surface p-8 text-left">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Loader2 className="w-5 h-5 text-accent animate-spin" /> Activating your downloads…
        </h2>
        <p className="text-sm text-muted mb-6">
          We&apos;re confirming your purchase. This takes just a few seconds.
        </p>
        <div className="w-full h-1.5 bg-surface-offset rounded-full overflow-hidden">
          <div className="h-full bg-accent/60 rounded-full animate-pulse" style={{ width: '60%' }} />
        </div>
      </div>
    )
  }

  /* ── Signed in but polling timed out without confirmation ───── */
  if (isSignedIn && !polling && !confirmed) {
    return (
      <div className="rounded-2xl border border-accent/40 bg-surface p-8 text-left flex flex-col gap-5">
        <div>
          <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-accent" /> Purchase received
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-4">
            Your payment is confirmed. If your downloads aren&apos;t showing yet, refresh
            your account page in a moment — it usually resolves within 30 seconds.
          </p>
          <Link
            href="/account"
            className="inline-flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-4 rounded-xl text-base transition-colors"
          >
            <Download className="w-4 h-4" /> Go to My Account <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  /* ── Default: not signed in — magic link flow ───────────────── */
  return (
    <div className="rounded-2xl border border-accent/40 bg-surface p-8 text-left flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
          <Mail className="w-5 h-5 text-accent" /> One step to unlock your downloads
        </h2>
        <p className="text-sm text-muted leading-relaxed mb-4">
          Sign in with{' '}
          {customerEmail
            ? <strong className="text-foreground">{customerEmail}</strong>
            : <>the email you used at checkout</>}{' '}
          to access your files. We&apos;ll send a magic link — no password needed.
        </p>
        <p className="text-xs text-muted mb-4">
          A confirmation email with your download link is also on its way to you now.
        </p>
        <Link
          href={`/login?next=/account&hint=${encodeURIComponent(customerEmail ?? '')}`}
          className="inline-flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-4 rounded-xl text-base transition-colors"
        >
          <ArrowRight className="w-4 h-4" /> Sign in &amp; download now
        </Link>
      </div>
      <p className="text-xs text-muted text-center">
        Your purchase is saved permanently. Sign in any time at{' '}
        <Link href="/account" className="text-accent hover:underline">mygeoradar.com/account</Link>.
      </p>
    </div>
  )
}
