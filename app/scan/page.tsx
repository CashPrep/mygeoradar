'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  ArrowRight, ArrowLeft, X, Radar, Monitor, Mail,
  FileText, Sparkles, CheckCircle2, Loader2, Swords
} from 'lucide-react'
import { clsx } from 'clsx'

const INDUSTRY_SUGGESTIONS: Record<string, string[]> = {
  'Restaurant':         ['best restaurant near me', 'food delivery', 'date night spots', 'healthy lunch options'],
  'Law Firm':           ['personal injury lawyer', 'divorce attorney', 'DUI lawyer', 'free legal consultation'],
  'Real Estate':        ['homes for sale', 'real estate agent near me', 'sell my house fast', 'first time home buyer'],
  'Medical / Dental':   ['dentist near me', 'teeth whitening', 'family doctor', 'same day appointment'],
  'Home Services':      ['plumber near me', 'HVAC repair', 'roof replacement cost', 'emergency electrician'],
  'Fitness / Wellness': ['gym near me', 'personal trainer', 'yoga classes', 'weight loss program'],
  'E-commerce':         ['best price', 'free shipping', 'product reviews', 'buy online'],
  'SaaS / Tech':        ['best software for', 'alternatives to', 'pricing comparison', 'free trial'],
  'Other':              [],
}
const INDUSTRIES = Object.keys(INDUSTRY_SUGGESTIONS)
type Step = 1 | 2 | 3

export default function ScanPage() {
  const router = useRouter()

  const [step,          setStep]          = useState<Step>(1)
  const [businessName,  setBusinessName]  = useState('')
  const [website,       setWebsite]       = useState('')
  const [competitorUrl, setCompetitorUrl] = useState('')
  const [industry,      setIndustry]      = useState('')
  const [topics,        setTopics]        = useState<string[]>([])
  const [topicInput,    setTopicInput]    = useState('')
  const [location,      setLocation]      = useState('')
  const [email,         setEmail]         = useState('')
  const [loading,       setLoading]       = useState(false)
  const [error,         setError]         = useState('')

  const [autofillUrl,   setAutofillUrl]   = useState('')
  const [scraping,      setScraping]      = useState(false)
  const [scrapeError,   setScrapeError]   = useState('')
  const [autofilled,    setAutofilled]    = useState(false)

  const suggestions = INDUSTRY_SUGGESTIONS[industry] ?? []

  function addTopic(t: string) {
    const trimmed = t.trim()
    if (!trimmed || topics.includes(trimmed) || topics.length >= 5) return
    setTopics((prev) => [...prev, trimmed])
  }
  function removeTopic(t: string) {
    setTopics((prev) => prev.filter((x) => x !== x && x !== t))
    setTopics((prev) => prev.filter((x) => x !== t))
  }
  function handleTopicKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTopic(topicInput)
      setTopicInput('')
    }
  }

  async function handleAutofill() {
    if (!autofillUrl.trim()) return
    setScraping(true)
    setScrapeError('')
    setAutofilled(false)
    try {
      const res  = await fetch('/api/scrape', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ url: autofillUrl.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setScrapeError(data.error || 'Could not read that page.')
        return
      }
      if (data.businessName) setBusinessName(data.businessName)
      if (data.industry && INDUSTRIES.includes(data.industry)) setIndustry(data.industry)
      if (data.location) setLocation(data.location)
      if (!website) setWebsite(autofillUrl.trim().replace(/^https?:\/\//, '').replace(/\/$/, ''))
      if (data.topics?.length) {
        setTopics((prev) => {
          const merged = [...prev]
          for (const t of data.topics) {
            if (!merged.includes(t) && merged.length < 5) merged.push(t)
          }
          return merged
        })
      }
      setAutofilled(true)
    } catch {
      setScrapeError('Network error — please try again.')
    } finally {
      setScraping(false)
    }
  }

  async function handleSubmit() {
    if (!businessName || !website || topics.length === 0) {
      setError('Please complete all required fields.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res  = await fetch('/api/scan/create', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ businessName, website, topics, location, industry, email, competitorUrl: competitorUrl.trim() || null }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
        setLoading(false)
      }
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  const canStep1 = businessName.trim().length > 1 && website.trim().length > 3
  const canStep2 = topics.length > 0

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 pt-28 pb-20">

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {([1, 2, 3] as Step[]).map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={clsx(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                step >= s ? 'bg-accent text-white' : 'bg-surface-2 text-muted'
              )}>{s}</div>
              {s < 3 && <div className={clsx('flex-1 h-0.5 transition-all', step > s ? 'bg-accent' : 'bg-border')} />}
            </div>
          ))}
        </div>

        <div className="card p-8">

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-2xl font-bold mb-1">Your business</h1>
                <p className="text-sm text-muted">Tell us who you are so we can run the scan.</p>
              </div>

              {/* Autofill block */}
              <div className="flex flex-col gap-3 bg-surface-2 border border-border rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <p className="text-sm font-semibold text-foreground">Autofill from your website</p>
                </div>
                <p className="text-xs text-muted -mt-1">
                  Paste your URL and we&apos;ll read your site and pre-fill what we can. You can edit everything after.
                </p>
                <div className="flex gap-2">
                  <input
                    className="input flex-1"
                    placeholder="yourbusiness.com"
                    value={autofillUrl}
                    onChange={(e) => { setAutofillUrl(e.target.value); setAutofilled(false); setScrapeError('') }}
                    onKeyDown={(e) => e.key === 'Enter' && handleAutofill()}
                    disabled={scraping}
                  />
                  <button
                    onClick={handleAutofill}
                    disabled={!autofillUrl.trim() || scraping}
                    className={clsx(
                      'flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all',
                      'bg-accent text-white hover:bg-accent-hover active:scale-[0.98]',
                      'disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                  >
                    {scraping
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> Reading&hellip;</>
                      : <><Sparkles className="w-4 h-4" /> Autofill</>
                    }
                  </button>
                </div>
                {scrapeError && (
                  <p className="text-xs text-danger flex items-center gap-1.5">
                    <X className="w-3.5 h-3.5" /> {scrapeError}
                  </p>
                )}
                {autofilled && (
                  <p className="text-xs text-accent flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Fields pre-filled — review and edit below before continuing.
                  </p>
                )}
              </div>

              {/* Manual fields */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Business name <span className="text-danger">*</span></label>
                <input
                  className="input"
                  placeholder="e.g. Sunrise Dental"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Your website <span className="text-danger">*</span></label>
                <input
                  className="input"
                  placeholder="e.g. sunrisedental.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              {/* Competitor URL */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Swords className="w-3.5 h-3.5 text-accent" />
                  Competitor&apos;s website <span className="text-muted text-xs">(optional — see a side-by-side)</span>
                </label>
                <input
                  className="input"
                  placeholder="e.g. competitordental.com"
                  value={competitorUrl}
                  onChange={(e) => setCompetitorUrl(e.target.value)}
                />
                <p className="text-xs text-muted">We&apos;ll show you exactly where they beat you — and how to close the gap.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Industry</label>
                <select
                  className="input"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  <option value="">Select your industry (optional)</option>
                  {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>

              <Button
                variant="primary"
                disabled={!canStep1}
                onClick={() => setStep(2)}
                className="w-full mt-1"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <div className="flex flex-col gap-5">
              <div>
                <h1 className="text-2xl font-bold mb-1">Search topics</h1>
                <p className="text-sm text-muted">What do people search for when looking for a business like yours? Add up to 5.</p>
              </div>

              {suggestions.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-muted font-medium">Suggestions for {industry}</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => addTopic(s)}
                        disabled={topics.includes(s) || topics.length >= 5}
                        className={clsx(
                          'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all',
                          topics.includes(s)
                            ? 'bg-accent/20 border-accent text-accent cursor-default'
                            : 'bg-surface-2 border-border text-foreground-dim hover:border-accent hover:text-accent'
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Add custom topic</label>
                <div className="flex gap-2">
                  <input
                    className="input flex-1"
                    placeholder="Type a topic and press Enter"
                    value={topicInput}
                    onChange={(e) => setTopicInput(e.target.value)}
                    onKeyDown={handleTopicKeyDown}
                    disabled={topics.length >= 5}
                  />
                  <Button
                    variant="secondary"
                    onClick={() => { addTopic(topicInput); setTopicInput('') }}
                    disabled={!topicInput.trim() || topics.length >= 5}
                  >
                    Add
                  </Button>
                </div>
              </div>

              {topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {topics.map((t) => (
                    <span key={t} className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 border border-accent/30 rounded-lg text-sm text-accent">
                      {t}
                      <button onClick={() => removeTopic(t)} className="hover:text-white transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <p className="text-xs text-muted">{topics.length}/5 topics added</p>

              <div className="flex gap-3 mt-2">
                <Button variant="ghost" onClick={() => setStep(1)} className="flex-1">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button variant="primary" disabled={!canStep2} onClick={() => setStep(3)} className="flex-1">
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* ── STEP 3 ── */}
          {step === 3 && (
            <div className="flex flex-col gap-5">
              <div>
                <h1 className="text-2xl font-bold mb-1">Almost there</h1>
                <p className="text-sm text-muted">One last step before your AI audit.</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">City / Region <span className="text-muted text-xs">(optional)</span></label>
                <input
                  className="input"
                  placeholder="e.g. Boston, MA"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* Email — more compelling copy */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-accent" />
                  Your email <span className="text-muted text-xs">(optional)</span>
                </label>
                <input
                  className="input"
                  type="email"
                  placeholder="you@yourbusiness.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-xs text-muted">We&apos;ll send your receipt + a permanent backup link to your report. We won&apos;t spam you.</p>
              </div>

              {/* What you get */}
              <div className="bg-surface-2 border border-border rounded-xl p-4 flex flex-col gap-3">
                <p className="text-xs font-semibold text-muted uppercase tracking-wide">What you get after paying</p>
                <div className="flex items-start gap-3 text-sm">
                  <Monitor className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-foreground-dim"><span className="text-foreground font-medium">Instant report on-screen</span> — redirected while we run the scan (~20 sec).</p>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Mail className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-foreground-dim"><span className="text-foreground font-medium">Receipt + backup link emailed</span> — if you enter your email above.</p>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <FileText className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-foreground-dim"><span className="text-foreground font-medium">Permanent shareable link</span> — bookmark or share with your team.</p>
                </div>
                {competitorUrl && (
                  <div className="flex items-start gap-3 text-sm">
                    <Swords className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-foreground-dim"><span className="text-foreground font-medium">Competitor side-by-side</span> — vs. {competitorUrl.replace(/^https?:\/\//, '')}.</p>
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="bg-surface-2 border border-border rounded-xl p-4 flex flex-col gap-2 text-sm">
                <p className="font-semibold text-foreground">Scan summary</p>
                <p className="text-muted">{businessName} &middot; {website}</p>
                {competitorUrl && <p className="text-xs text-accent">vs. {competitorUrl.replace(/^https?:\/\//, '')}</p>}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {topics.map((t) => (
                    <Badge key={t} variant="accent" className="text-xs">{t}</Badge>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between px-4 py-3 bg-accent/10 border border-accent/20 rounded-xl">
                <div>
                  <p className="font-semibold text-foreground">AI Visibility Scan</p>
                  <p className="text-xs text-muted">One-time payment &middot; Report ready in ~20 seconds</p>
                </div>
                <p className="text-2xl font-bold text-accent">$1</p>
              </div>

              {error && <p className="text-sm text-danger">{error}</p>}

              <div className="flex gap-3 mt-2">
                <Button variant="ghost" onClick={() => setStep(2)} className="flex-1">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button
                  variant="primary"
                  loading={loading}
                  onClick={handleSubmit}
                  className="flex-1"
                >
                  Pay $1 &amp; Run Scan <Radar className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-center text-muted">Secure payment by Stripe &middot; No subscription &middot; No account required</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
