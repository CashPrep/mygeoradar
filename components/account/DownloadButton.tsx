'use client'
import { useState } from 'react'
import { Download, ArrowRight, Loader2, AlertCircle } from 'lucide-react'

interface Props {
  file: string
  label: string
}

export function DownloadButton({ file, label }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleDownload() {
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch(`/api/downloads?file=${encodeURIComponent(file)}`)
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        if (res.status === 401) {
          // Session expired — redirect to login
          window.location.href = '/login?next=/account'
          return
        }
        throw new Error(json.error ?? `Download failed (${res.status})`)
      }
      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href     = url
      a.download = file
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
      setStatus('idle')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Download failed. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleDownload}
        disabled={status === 'loading'}
        className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium hover:bg-surface transition-colors disabled:opacity-60 disabled:cursor-not-allowed w-full"
      >
        <span className="flex items-center gap-2">
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 text-accent animate-spin" />
          ) : status === 'error' ? (
            <AlertCircle className="w-4 h-4 text-red-500" />
          ) : (
            <Download className="w-4 h-4 text-accent" />
          )}
          {label}
        </span>
        <ArrowRight className="w-4 h-4 text-muted" />
      </button>
      {status === 'error' && (
        <p className="text-xs text-red-500 px-1">
          {errorMsg} —{' '}
          <a href="mailto:hello@mygeoradar.com" className="underline">Email us if this persists.</a>
        </p>
      )}
    </div>
  )
}
