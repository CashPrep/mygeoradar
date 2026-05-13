'use client'
import { useState } from 'react'
import { Mail, X, CheckCircle2, Loader2, AlertTriangle } from 'lucide-react'
import { createSupabaseBrowser } from '@/lib/supabase-browser'
import { clsx } from 'clsx'

export function EmailVerifyBanner({ email }: { email: string }) {
  const [dismissed,  setDismissed]  = useState(false)
  const [showModal,  setShowModal]  = useState(true)  // show modal first
  const [sending,    setSending]    = useState(false)
  const [sent,       setSent]       = useState(false)
  const [error,      setError]      = useState('')

  const supabase = createSupabaseBrowser()

  async function resend() {
    setSending(true)
    setError('')
    const { error } = await supabase.auth.resend({
      type:  'signup',
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    })
    setSending(false)
    if (error) { setError(error.message); return }
    setSent(true)
  }

  if (dismissed) return null

  return (
    <>
      {/* ── Sticky banner ── */}
      {!showModal && (
        <div className="sticky top-16 z-40 w-full">
          <div className="bg-warning/10 border-b border-warning/30 px-4 py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0" />
              <span className="text-warning font-medium">Please verify your email address.</span>
              <button
                onClick={() => setShowModal(true)}
                className="text-warning underline underline-offset-2 hover:no-underline text-sm"
              >
                Resend email
              </button>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="text-warning/70 hover:text-warning transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />

          <div className="relative w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-2xl flex flex-col items-center text-center gap-5">
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {sent ? (
              <>
                <div className="w-14 h-14 rounded-full bg-success/10 border border-success/20 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-success" />
                </div>
                <div>
                  <p className="font-bold text-lg">Email sent!</p>
                  <p className="text-sm text-muted mt-1">
                    Check your inbox at <strong>{email}</strong> and click the link to verify your account.
                  </p>
                </div>
                <button
                  onClick={() => { setShowModal(false); setSent(false) }}
                  className="w-full py-2.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl text-sm transition-colors"
                >
                  Got it
                </button>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-full bg-warning/10 border border-warning/20 flex items-center justify-center">
                  <Mail className="w-7 h-7 text-warning" />
                </div>
                <div>
                  <p className="font-bold text-lg">Verify your email</p>
                  <p className="text-sm text-muted mt-1 leading-relaxed">
                    We sent a confirmation link to <strong>{email}</strong>.
                    Please click it to activate your account and keep access to your scans.
                  </p>
                </div>

                {error && (
                  <p className="text-xs text-danger bg-danger/10 border border-danger/20 rounded-lg px-3 py-2 w-full">{error}</p>
                )}

                <div className="flex flex-col gap-2 w-full">
                  <button
                    onClick={resend}
                    disabled={sending}
                    className={clsx(
                      'w-full flex items-center justify-center gap-2 py-2.5 font-semibold rounded-xl text-sm transition-colors',
                      'bg-accent hover:bg-accent-hover text-white disabled:opacity-50'
                    )}
                  >
                    {sending
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                      : <><Mail className="w-4 h-4" /> Resend verification email</>
                    }
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full py-2 text-sm text-muted hover:text-foreground transition-colors"
                  >
                    I'll do it later
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
