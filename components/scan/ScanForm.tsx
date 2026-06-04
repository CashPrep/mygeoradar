'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import {
  X, Plus, Lock, Zap, Clock, CheckCircle2, AlertCircle,
  Loader2, Globe, Sparkles, MapPin, Monitor,
} from 'lucide-react'
import { clsx } from 'clsx'
import { SCAN_PRICE_USD } from '@/lib/constants'
import { PLATFORM_LIST, type PlatformId } from '@/lib/platforms'

const MAX_TOPICS = 50
type CrawlStatus = 'idle' | 'crawling' | 'success' | 'failed'

interface ScanFormProps {
  initialName?: string
  initialUrl?:  string
}

function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number) {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}

export function ScanForm({ initialName = '', initialUrl = '' }: ScanFormProps) {
  const [loading,      setLoading]      = useState(false)
  const [error,        setError]        = useState('')
  const [businessName, setBusinessName] = useState(initialName)
  const [website,      setWebsite]      = useState(initialUrl)
  const [topics,       setTopics]       = useState<string[]>([])
  const [topicInput,   setTopicInput]   = useState('')
  const [industry,     setIndustry]     = useState('')
  const [location,     setLocation]     = useState('')
  const [platform,     setPlatform]     = useState<PlatformId | ''>('')
  const [geoLoading,   setGeoLoading]   = useState(false)
  const geoResolved = useRef(false)
  const [crawlStatus,  setCrawlStatus]  = useState<CrawlStatus>('idle')
  const [crawlMessage, setCrawlMessage] = useState('')
  const lastCrawledUrl = useRef('')

  // Auto-detect location on mount
  useEffect(() => {
    if (!navigator.geolocation) return
    setGeoLoading(true)
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res  = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`)
          const data = await res.json()
          const city  = data.address?.city || data.address?.town || data.address?.village || ''
          const state = data.address?.state || ''
          if (city && state)  setLocation(`${city}, ${state}`)
          else if (state)     setLocation(state)
        } catch { /* silent */ }
        finally {
          geoResolved.current = true
          setGeoLoading(false)
        }
      },
      () => {
        geoResolved.current = true
        setGeoLoading(false)
      },
      { timeout: 6000 }
    )
  }, [])

  useEffect(() => {
    if (initialName) setBusinessName(initialName)
    if (initialUrl)  {
      setWebsite(initialUrl)
      triggerCrawl(initialUrl)
    }
  // triggerCrawl is stable via useCallback below — safe to omit from deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialName, initialUrl])

  const triggerCrawl = useCallback(async (url: string) => {
    const normalized = url.trim().replace(/\/$/, '')
    if (!normalized || normalized === lastCrawledUrl.current) return
    lastCrawledUrl.current = normalized

    setCrawlStatus('crawling')
    setCrawlMessage('Scanning your website\u2026')
    setError('')

    try {
      const res  = await fetch('/api/scrape', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ url: normalized }),
      })
      const data = await res.json()

      if (!res.ok || data.error) {
        setCrawlStatus('failed')
        setCrawlMessage('Could not scan site \u2014 fill in topics manually below.')
        return
      }

      let filled = 0
      if (data.businessName && !businessName) { setBusinessName(data.businessName); filled++ }
      if (data.industry)                       { setIndustry(data.industry); filled++ }
      if (data.location && geoResolved.current) {
        setLocation(prev => prev === '' ? data.location : prev)
        filled++
      }
      if (Array.isArray(data.topics) && data.topics.length > 0) {
        setTopics(data.topics.slice(0, MAX_TOPICS))
        filled++
      }

      if (data.topics?.length > 0) {
        setCrawlStatus('success')
        setCrawlMessage(`Auto-filled ${data.topics.length} topics from your site \u2014 review or edit below.`)
      } else if (filled > 0) {
        setCrawlStatus('success')
        setCrawlMessage('Site scanned \u2014 no topics detected, add them below.')
      } else {
        setCrawlStatus('failed')
        setCrawlMessage('Could not extract enough info \u2014 fill in manually.')
      }
    } catch {
      setCrawlStatus('failed')
      setCrawlMessage('Network error while scanning \u2014 fill in manually.')
    }
  }, [businessName])

  const debouncedCrawl = useCallback(
    debounce((url: string) => {
      if (url.length > 4) triggerCrawl(url)
    }, 800),
    [triggerCrawl]
  )

  function handleUrlChange(val: string) {
    setWebsite(val)
    if (crawlStatus !== 'idle') {
      setCrawlStatus('idle')
      lastCrawledUrl.current = ''
    }
    debouncedCrawl(val)
  }

  function addTopic(t: string) {
    const clean = t.trim()
    if (!clean || topics.includes(clean) || topics.length >= MAX_TOPICS) return
    setTopics(prev => [...prev, clean])
    setTopicInput('')
  }

  // Fixed: single setState call with correct filter expression
  function removeTopic(t: string) {
    setTopics(prev => prev.filter(x => x !== t))
  }

  async function handleSubmit() {
    if (!businessName.trim()) return setError('Enter your business name.')
    if (!website.trim())      return setError('Enter your website URL.')
    if (topics.length === 0)  return setError('Add at least one topic \u2014 or wait for the scan to finish.')

    setLoading(true)
    setError('')
    try {
      const res  = await fetch('/api/scan/create', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ businessName, website, topics, location, industry, platform: platform || null }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Something went wrong.')
        setLoading(false)
      }
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  const canSubmit = businessName.trim() && website.trim() && topics.length > 0

  const selectedPlatform = platform ? PLATFORM_LIST.find(p => p.id === platform) : null

  return (
    <div className="card p-6 flex flex-col gap-5">

      {/* ── URL field ── */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground-dim flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5" /> Website *
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="yoursite.com"
            value={website}
            onChange={e => handleUrlChange(e.target.value)}
            onBlur={e => { if (e.target.value) triggerCrawl(e.target.value) }}
            className="w-full px-3 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/60 transition-colors"
          />
          {crawlStatus === 'crawling' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="w-4 h-4 text-accent animate-spin" />
            </div>
          )}
          {crawlStatus === 'success' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <CheckCircle2 className="w-4 h-4 text-success" />
            </div>
          )}
        </div>
        {crawlStatus === 'crawling' && (
          <p className="text-xs text-accent flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 animate-pulse" /> Auto-filling your details\u2026
          </p>
        )}
        {crawlStatus === 'success' && (
          <p className="text-xs text-success flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3" /> {crawlMessage}
          </p>
        )}
        {crawlStatus === 'failed' && (
          <p className="text-xs text-warning flex items-center gap-1.5">
            <AlertCircle className="w-3 h-3" /> {crawlMessage}
          </p>
        )}
      </div>

      {/* ── Business name ── */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground-dim">Business name *</label>
        <input
          type="text"
          placeholder={crawlStatus === 'crawling' ? 'Detecting\u2026' : 'Blue Ridge Roofing'}
          value={businessName}
          onChange={e => setBusinessName(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/60 transition-colors"
        />
      </div>

      {/* ── Industry + Location row ── */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground-dim">Industry</label>
          <input
            type="text"
            placeholder="Roofing, Legal\u2026"
            value={industry}
            onChange={e => setIndustry(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/60 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground-dim flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> Location
            {geoLoading && <Loader2 className="w-3 h-3 animate-spin text-accent ml-1" />}
          </label>
          <input
            type="text"
            placeholder={geoLoading ? 'Detecting\u2026' : 'Boston, MA'}
            value={location}
            disabled={geoLoading}
            onChange={e => setLocation(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/60 transition-colors disabled:opacity-50"
          />
        </div>
      </div>

      {/* ── Platform selector (optional) ── */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground-dim flex items-center gap-1.5">
          <Monitor className="w-3.5 h-3.5" />
          Website builder
          <span className="text-xs text-muted font-normal">(optional)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {PLATFORM_LIST.filter(p => p.id !== 'other').map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlatform(prev => prev === p.id ? '' : p.id as PlatformId)}
              className={clsx(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                platform === p.id
                  ? 'bg-accent/10 border-accent/40 text-accent'
                  : 'bg-surface-2 border-border text-muted hover:border-accent/30 hover:text-foreground'
              )}
            >
              <span>{p.emoji}</span>
              <span>{p.label}</span>
            </button>
          ))}
        </div>
        {selectedPlatform && (
          <p className="text-xs text-accent/80 flex items-center gap-1.5 mt-0.5">
            <CheckCircle2 className="w-3 h-3" />
            Results will show what you can fix on <strong>{selectedPlatform.label}</strong>. Click again to deselect.
          </p>
        )}
        {!selectedPlatform && (
          <p className="text-xs text-muted">
            Select your platform to filter results to changes you can actually make. Skip if you have a custom-coded site.
          </p>
        )}
      </div>

      {/* ── Topics ── */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground-dim">Topics to scan</label>
          <span className="text-xs text-muted">{topics.length}/{MAX_TOPICS}</span>
        </div>

        {topics.length > 0 && (
          <div className="max-h-52 overflow-y-auto flex flex-col gap-1.5 pr-1">
            {topics.map((t, i) => (
              <div key={t} className="flex items-center gap-2 px-3 py-2 bg-surface-2 border border-border rounded-lg group">
                <span className="text-xs text-muted w-5 shrink-0">{i + 1}.</span>
                <span className="text-sm flex-1 truncate">{t}</span>
                <button
                  type="button"
                  onClick={() => removeTopic(t)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-muted hover:text-danger shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {topics.length === 0 && crawlStatus === 'idle' && (
          <p className="text-xs text-muted">
            Enter your URL above \u2014 we\u2019ll auto-detect up to 50 topics from your site.
          </p>
        )}
        {topics.length === 0 && crawlStatus === 'failed' && (
          <p className="text-xs text-warning">No topics detected \u2014 add them manually below.</p>
        )}

        {topics.length < MAX_TOPICS && (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a topic manually (e.g. best roofer near me)"
              value={topicInput}
              onChange={e => setTopicInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTopic(topicInput)}
              className="flex-1 px-3 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/60 transition-colors"
            />
            <button
              type="button"
              onClick={() => addTopic(topicInput)}
              disabled={topics.length >= MAX_TOPICS}
              className="px-3 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition-all disabled:opacity-40"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* ── Submit ── */}
      {error && (
        <p className="text-xs text-danger flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5" /> {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit || loading}
        className="btn-primary w-full py-3 rounded-xl font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading
          ? <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Running scan\u2026</span>
          : <span className="flex items-center justify-center gap-2"><Zap className="w-4 h-4" /> Run AI Visibility Scan</span>
        }
      </button>

      <p className="text-xs text-muted text-center">
        Free \u00b7 No account required \u00b7 Results in ~10 seconds
      </p>

    </div>
  )
}
