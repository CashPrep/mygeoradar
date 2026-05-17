'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { X, Plus, ArrowRight, ArrowLeft, Lock, Zap, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
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
const MAX_TOPICS = 50

const STEPS = [
  { label: 'Business' },
  { label: 'Topics'   },
  { label: 'Review'   },
]

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

  const [crawlStatus, setCrawlStatus]   = useState<CrawlStatus>('idle')
  const [crawlMessage, setCrawlMessage] = useState('')
  const lastCrawledUrl = useRef('')

  useEffect(() => {
    if (initialName && !businessName) setBusinessName(initialName)
  }, [initialName]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (initialUrl && !website) setWebsite(initialUrl)
  }, [initialUrl]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (step !== 3 || location) return
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
        finally { setGeoLoading(false) }
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
        setCrawlMessage('Could not auto-detect topics. Add them manually below.')
        return
      }

      let filled = 0
      if (data.businessName && !businessName) { setBusinessName(data.businessName); filled++ }
      if (data.industry && INDUSTRIES.includes(data.industry)) { setIndustry(data.industry); filled++ }
      if (data.location && !location) { setLocation(data.location); filled++ }
      if (Array.isArray(data.topics) && data.topics.length > 0) {
        setTopics(data.topics.slice(0, MAX_TOPICS))
        filled++
      }

      if (filled > 0 && data.topics?.length > 0) {
        setCrawlStatus('success')
        setCrawlMessage(`Detected ${data.topics.length} topics from your site \u2014 review, remove, or add more below.`)
      } else if (filled > 0) {
        setCrawlStatus('success')
        setCrawlMessage('Website scanned \u2014 no topics detected, please add them manually.')
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
    if (!clean || topics.includes(clean) || topics.length >= MAX_TOPICS) return
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

  const suggestions = industry
    ? (SUGGESTED_TOPICS[industry] ?? []).filter(s => !topics.includes(s))
    : []

  return (
    <div className="card p-6 flex flex-col gap-6">

      {/* ── Progress bar with named step labels ── */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          {STEPS.map((s, i) => (
            <div
              key={s.label}
              className={clsx(
                'flex-1 h-1.5 rounded-full transition-all duration-300',
                i + 1 <= step ? 'bg-accent' : 'bg-surface-2'
              )}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => (
            <span
              key={s.label}
              className={clsx(
                'text-[11px] font-medium transition-colors',
                i + 1 === step
                  ? 'text-accent'
                  : i + 1 < step
                    ? 'text-muted/70'
                    : 'text-muted/40'
              )}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Step 1 */}
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
              if (crawlStatus !== 'idle') {
                setCrawlStatus('idle')
                lastCrawledUrl.current = ''
              }
            }}
          />
          <p className="text-xs text-muted -mt-1">
            We&apos;ll scan your website to auto-detect up to 50 topics.
          </p>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="font-semibold text-lg">Topics to scan</h2>
            <p className="text-sm text-muted mt-1">These are the queries we&apos;ll check across ChatGPT, Perplexity, Gemini &amp; Claude.</p>
          </div>

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

          {topics.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground-dim">Detected topics</label>
                <span className="text-xs text-muted">{topics.length}/{MAX_TOPICS}</span>
              </div>
              <div className="max-h-64 overflow-y-auto flex flex-col gap-1.5 pr-1">
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
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground-dim">Industry (for extra suggestions)</label>
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

          {suggestions.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground-dim">Suggestions \u2014 click to add</label>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button key={s} type="button" disabled={topics.length >= MAX_TOPICS} onClick={() => addTopic(s)}
                    className="px-3 py-1.5 rounded-lg text-xs border transition-all bg-surface-2 border-border text-foreground-dim hover:border-accent/40 hover:text-accent disabled:opacity-40">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {topics.length < MAX_TOPICS && (
            <div className="flex gap-2">
              <Input
                placeholder="Add a custom topic\u2026"
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTopic(topicInput)}
                className="flex-1"
              />
              <button type="button" onClick={() => addTopic(topicInput)} disabled={topics.length >= MAX_TOPICS}
                className="px-3 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition-all disabled:opacity-40">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}

          {topics.length === 0 && crawlStatus !== 'crawling' && (
            <p className="text-xs text-warning">No topics yet \u2014 type one above or select an industry for suggestions.</p>
          )}
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">Final details</h2>
          <p className="text-sm text-muted -mt-2">Optional \u2014 helps us write more accurate scan queries.</p>
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
                Auto-detecting your location\u2026
              </p>
            )}
          </div>
          <div className="bg-surface-2 border border-border rounded-xl p-4 flex flex-col gap-2 mt-1">
            <p className="text-xs font-semibold text-foreground-dim uppercase tracking-wider mb-1">Scan summary</p>
            <p className="text-sm"><span className="text-muted">Business:</span> {businessName}</p>
            <p className="text-sm"><span className="text-muted">Website:</span> {website}</p>
            <p className="text-sm"><span className="text-muted">Topics:</span> <span className="font-medium text-accent">{topics.length} topics</span></p>
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
              \ud83d\udd0d Scanning 4 AI engines \u2014{' '}
              <span className="font-semibold text-foreground">typically 45\u201390 seconds.</span>
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
                <span>256-bit SSL encryption \u2014 your data is fully secured</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-foreground-dim">
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="4" fill="#635BFF" />
                  <path d="M12 6.5c-2 0-3.5 1-3.5 2.8 0 3.2 4.5 2.8 4.5 4.5 0 .8-.7 1.2-1.8 1.2-1.6 0-2.8-.6-2.8-.6v2s1.2.5 2.9.5c2.2 0 3.7-1 3.7-2.9 0-3.1-4.5-2.9-4.5-4.4 0-.7.6-1.1 1.6-1.1 1.4 0 2.5.5 2.5.5V7s-1-.5-2.6-.5z" fill="white" />
                </svg>
                <span>Powered by Stripe \u2014 PCI-compliant, trusted by millions</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-foreground-dim">
                <Zap className="w-3.5 h-3.5 text-warning shrink-0" />
                <span>Instant results \u2014 your report is ready the moment the scan finishes</span>
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
            {step === 1 && crawlStatus === 'crawling' ? 'Scanning site\u2026' : 'Continue'} <ArrowRight className="w-4 h-4" />
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
