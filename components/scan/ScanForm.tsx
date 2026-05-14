'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { X, Plus, ArrowRight, ArrowLeft, Lock, Zap, Clock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { clsx } from 'clsx'
import { PROMO_PRICE_USD, FULL_PRICE_USD } from '@/lib/constants'

const SUGGESTED_TOPICS: Record<string, string[]> = {
  'Legal':         ['personal injury lawyer', 'car accident attorney', 'divorce lawyer', 'criminal defense attorney'],
  'Home Services': ['roofer near me', 'plumber near me', 'HVAC repair', 'electrician near me'],
  'Health':        ['chiropractor near me', 'dentist near me', 'physical therapy', 'urgent care'],
  'Fitness':       ['gym near me', 'personal trainer', 'yoga classes', 'crossfit gym'],
  'Restaurant':    ['best pizza near me', 'sushi restaurant', 'brunch near me', 'Italian restaurant'],
  'Other':         [],
}

const INDUSTRIES = Object.keys(SUGGESTED_TOPICS)

type CrawlStatus = 'idle' | 'crawling' | 'success' | 'failed'

interface ScanFormProps {
  initialName?: string
  initialUrl?:  string
}

export function ScanForm({ initialName = '', initialUrl = '' }: ScanFormProps) {
  const [step, setStep]       = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const [businessName, setBusinessName] = useState(initialName)
  const [website, setWebsite]           = useState(initialUrl)
  const [topics, setTopics]             = useState<string[]>([])
  const [topicInput, setTopicInput]     = useState('')
  const [industry, setIndustry]         = useState('')
  const [location, setLocation]         = useState('')
  const [geoLoading, setGeoLoading]     = useState(false)

  // Crawl state
  const [crawlStatus, setCrawlStatus]   = useState<CrawlStatus>('idle')
  const [crawlMessage, setCrawlMessage] = useState('')
  const lastCrawledUrl = useRef('')

  // Sync pre-fill values when search params hydrate after mount
  useEffect(() => {
    if (initialName && !businessName) setBusinessName(initialName)
  }, [initialName]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (initialUrl && !website) setWebsite(initialUrl)
  }, [initialUrl]) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-fill location on step 3 mount via browser geolocation
  useEffect(() => {
    if (step !== 3 || location) return
    if (!navigator.geolocation)  return
    setGeoLoading(true)
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res  = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`)
          const data = await res.json()
          const city  = data.address?.city || data.address?.town || data.address?.village || ''
          const state = data.address?.state || ''
          if (city && state)   setLocation(`${city}, ${state}`)
          else if (state)      setLocation(state)
        } catch { /* silent fail */ }
        finally  { setGeoLoading(false) }
      },
      () => setGeoLoading(false),
      { timeout: 6000 }
    )
  }, [step]) // eslint-disable-line react-hooks/exhaustive-deps

  async function crawlWebsite(url: string) {
    const normalized = url.trim().replace(/\/$/, '')
    if (!normalized || normalized === lastCrawledUrl.current) return
    lastCrawledUrl.current = normalized

    setCrawlStatus('crawling')
    setCrawlMessage('Scanning your website…')
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
        setCrawlMessage('Could not auto-detect topics. Add them manually below.')
        return
      }

      let filled = 0

      if (data.businessName && !businessName) {
        setBusinessName(data.businessName)
        filled++
      }
      if (data.industry && INDUSTRIES.includes(data.industry)) {
        setIndustry(data.industry)
        filled++
      }
      if (data.location && !location) {
        setLocation(data.location)
        filled++
      }
      if (Array.isArray(data.topics) && data.topics.length > 0) {
        setTopics(data.topics.slice(0, 5))
        filled++
      }

      if (filled > 0) {
        setCrawlStatus('success')
        setCrawlMessage(
          data.topics?.length > 0
            ? `Found ${data.topics.length} topics from your site — review and edit below.`
            : 'Website scanned — topics not detected, add them manually.'
        )
      } else {
        setCrawlStatus('failed')
        setCrawlMessage('Could not extract enough info. Please fill in manually.')
      }
    } catch {
      setCrawlStatus('failed')
      setCrawlMessage('Network error while scanning. Please fill in manually.')
    }
  }

  function addTopic(t: string) {
    const clean = t.trim()
    if (!clean || topics.includes(clean) || topics.length >= 5) return
    setTopics([...topics, clean])
    setTopicInput('')
  }

  function removeTopic(t: string) {
    setTopics(topics.filter((x) => x !== t))
  }

  async function nextStep() {
    if (step === 1) {
      if (!businessName.trim()) return setError('Enter your business name.')
      if (!website.trim())      return setError('Enter your website URL.')
      setError('')
      // Crawl first, then advance
      await crawlWebsite(website)
      setStep(2)
      return
    }
    if (step === 2) {
      if (topics.length === 0) return setError('Add at least one topic.')
    }
    setError('')
    setStep(step + 1)
  }

  async function handleSubmit() {
    setLoading(true)
    setError('')
    try {
      const res  = await fetch('/api/scan/create', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ businessName, website, topics, location, industry }),
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

  const suggestions = industry ? (SUGGESTED_TOPICS[industry] ?? []).filter(s => !topics.includes(s)) : []

  return (
    <div className="card p-6 flex flex-col gap-6">

      {/* Progress */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className={clsx(
            'flex-1 h-1.5 rounded-full transition-all duration-300',
            s <= step ? 'bg-accent' : 'bg-surface-2'
          )} />
        ))}
      </div>
      <p className="text-xs text-muted -mt-3">Step {step} of 3</p>

      {/* ── Step 1 ── */}
      {step === 1 && (
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">Your business</h2>
          <Input
            label="Business name *"
            placeholder="Blue Ridge Roofing"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
          <Input
            label="Website *"
            placeholder="blueridgeroofing.com"
            value={website}
            onChange={(e) => {
              setWebsite(e.target.value)
              // Reset crawl state when URL changes so we re-crawl
              if (crawlStatus !== 'idle') {
                setCrawlStatus('idle')
                lastCrawledUrl.current = ''
              }
            }}
          />
          <p className="text-xs text-muted -mt-1">
            We'll scan your website to auto-detect your topics.
          </p>
        </div>
      )}

      {/* ── Step 2 ── */}
      {step === 2 && (
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">Topics to scan</h2>

          {/* Crawl status banner */}
          {crawlStatus === 'crawling' && (
            <div className="flex items-center gap-2.5 bg-accent/5 border border-accent/20 rounded-xl px-4 py-3">
              <Loader2 className="w-4 h-4 text-accent animate-spin shrink-0" />
              <p className="text-sm text-accent">{crawlMessage}</p>
            </div>
          )}
          {crawlStatus === 'success' && (
            <div className="flex items-center gap-2.5 bg-success/5 border border-success/20 rounded-xl px-4 py-3">
              <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
              <p className="text-sm text-success">{crawlMessage}</p>
            </div>
          )}
          {crawlStatus === 'failed' && (
            <div className="flex items-center gap-2.5 bg-warning/5 border border-warning/20 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 text-warning shrink-0" />
              <p className="text-sm text-warning">{crawlMessage}</p>
            </div>
          )}

          <p className="text-sm text-muted -mt-2">Review auto-detected topics below. Add or remove to get 1–5 total.</p>

          {/* Industry picker */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground-dim">Industry</label>
            <div className="flex flex-wrap gap-2">
              {INDUSTRIES.map((ind) => (
                <button key={ind} type="button" onClick={() => setIndustry(ind === industry ? '' : ind)}
                  className={clsx('px-3 py-1.5 rounded-lg text-sm border transition-all',
                    industry === ind
                      ? 'bg-accent/10 border-accent/40 text-accent'
                      : 'bg-surface-2 border-border text-foreground-dim hover:border-border-bright'
                  )}>
                  {ind}
                </button>
              ))}
            </div>
          </div>

          {/* Suggestions only if there are un-added ones */}
          {suggestions.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground-dim">Suggestions — click to add</label>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button key={s} type="button" disabled={topics.length >= 5} onClick={() => addTopic(s)}
                    className="px-3 py-1.5 rounded-lg text-xs border transition-all bg-surface-2 border-border text-foreground-dim hover:border-accent/40 hover:text-accent disabled:opacity-40">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Manual input */}
          <div className="flex gap-2">
            <Input
              placeholder="Add a custom topic…"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTopic(topicInput)}
              className="flex-1"
            />
            <button type="button" onClick={() => addTopic(topicInput)} disabled={topics.length >= 5}
              className="px-3 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition-all disabled:opacity-40">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Current topics */}
          {topics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {topics.map((t) => (
                <span key={t} className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 border border-accent/20 text-accent text-sm rounded-lg">
                  {t}
                  <button type="button" onClick={() => removeTopic(t)} className="hover:text-white transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
          <p className="text-xs text-muted">{topics.length}/5 topics added</p>
        </div>
      )}

      {/* ── Step 3 ── */}
      {step === 3 && (
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">Final details</h2>
          <p className="text-sm text-muted -mt-2">Optional — helps us write more accurate scan queries.</p>
          <div className="relative">
            <Input
              label="City / State"
              placeholder={geoLoading ? 'Detecting your location...' : 'Boston, MA'}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={geoLoading}
            />
            {geoLoading && (
              <p className="text-xs text-accent mt-1 flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
                Auto-detecting your location…
              </p>
            )}
          </div>
          <div className="bg-surface-2 border border-border rounded-xl p-4 flex flex-col gap-2 mt-1">
            <p className="text-xs font-semibold text-foreground-dim uppercase tracking-wider mb-1">Scan summary</p>
            <p className="text-sm"><span className="text-muted">Business:</span> {businessName}</p>
            <p className="text-sm"><span className="text-muted">Website:</span> {website}</p>
            <p className="text-sm"><span className="text-muted">Topics:</span> {topics.join(', ')}</p>
            {location && <p className="text-sm"><span className="text-muted">Location:</span> {location}</p>}
            <div className="flex flex-wrap gap-1 mt-1">
              {['ChatGPT', 'Perplexity', 'Gemini', 'Claude'].map((e) => (
                <Badge key={e} variant="neutral" className="text-xs">{e}</Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-surface-2 border border-border rounded-xl px-4 py-3">
            <Clock className="w-4 h-4 text-accent shrink-0" />
            <p className="text-sm text-foreground-dim">
              🔍 Scanning 4 AI engines —{' '}
              <span className="font-semibold text-foreground">typically 45–90 seconds.</span>
            </p>
          </div>
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">One-time payment</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm line-through text-muted/60">${FULL_PRICE_USD.toFixed(2)}</span>
                <span className="text-lg font-bold text-accent">${PROMO_PRICE_USD.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 pt-1 border-t border-accent/10">
              <div className="flex items-center gap-2 text-xs text-foreground-dim">
                <Lock className="w-3.5 h-3.5 text-success shrink-0" />
                <span>256-bit SSL encryption — your data is fully secured</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-foreground-dim">
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="4" fill="#635BFF" />
                  <path d="M12 6.5c-2 0-3.5 1-3.5 2.8 0 3.2 4.5 2.8 4.5 4.5 0 .8-.7 1.2-1.8 1.2-1.6 0-2.8-.6-2.8-.6v2s1.2.5 2.9.5c2.2 0 3.7-1 3.7-2.9 0-3.1-4.5-2.9-4.5-4.4 0-.7.6-1.1 1.6-1.1 1.4 0 2.5.5 2.5.5V7s-1-.5-2.6-.5z" fill="white" />
                </svg>
                <span>Powered by Stripe — PCI-compliant, trusted by millions</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-foreground-dim">
                <Zap className="w-3.5 h-3.5 text-warning shrink-0" />
                <span>Instant results — your report is ready the moment the scan finishes</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-danger -mt-2">{error}</p>}

      <div className="flex items-center justify-between">
        {step > 1 ? (
          <button type="button" onClick={() => { setError(''); setStep(step - 1) }}
            className="flex items-center gap-1.5 text-sm text-foreground-dim hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        ) : <div />}
        {step < 3 ? (
          <Button variant="primary" onClick={nextStep} loading={crawlStatus === 'crawling'}>
            {step === 1 && crawlStatus === 'crawling' ? 'Scanning site…' : 'Continue'} <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button variant="primary" loading={loading} onClick={handleSubmit}>
            Pay ${PROMO_PRICE_USD.toFixed(2)} &amp; run scan <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
