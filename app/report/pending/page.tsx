'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'

export default function ReportPendingPage() {
  const params  = useSearchParams()
  const router  = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [attempt, setAttempt] = useState(0)

  const sessionId = params.get('session_id')

  useEffect(() => {
    if (!sessionId) { setStatus('error'); return }

    // Poll every 2s for up to 30s for the webhook to complete
    let tries = 0
    const maxTries = 15

    async function poll() {
      try {
        const res  = await fetch(`/api/report-token?session_id=${sessionId}`)
        const data = await res.json()
        if (data.token) {
          router.replace(`/report/${data.token}`)
          return
        }
      } catch { /* ignore */ }

      tries++
      setAttempt(tries)
      if (tries < maxTries) {
        setTimeout(poll, 2000)
      } else {
        setStatus('error')
      }
    }

    poll()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId])

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-12 h-12 text-accent mx-auto mb-4 animate-spin" />
            <h1 className="text-xl font-bold mb-2">Confirming your payment…</h1>
            <p className="text-sm text-muted">
              Unlocking your full report. This usually takes a few seconds.
            </p>
            {attempt > 5 && (
              <p className="text-xs text-muted/60 mt-4">
                Still working… webhooks can take up to 15 seconds.
              </p>
            )}
          </>
        )}
        {status === 'error' && (
          <>
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
            <p className="text-sm text-muted mb-4">
              Your payment was processed but we couldn&apos;t load your report automatically.
              Email us at{' '}
              <a href="mailto:hello@mygeoradar.com" className="underline text-accent">
                hello@mygeoradar.com
              </a>{' '}
              and we&apos;ll send your report link within 5 minutes.
            </p>
            <p className="text-xs text-muted/60">Session ID: {sessionId}</p>
          </>
        )}
      </div>
    </main>
  )
}
