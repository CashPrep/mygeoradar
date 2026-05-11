'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ArrowRight, ArrowLeft, X, Radar } from 'lucide-react'
import { clsx } from 'clsx'

const INDUSTRY_SUGGESTIONS: Record<string, string[]> = {
  'Restaurant':        ['best restaurant near me', 'food delivery', 'date night spots', 'healthy lunch options'],
  'Law Firm':          ['personal injury lawyer', 'divorce attorney', 'DUI lawyer', 'free legal consultation'],
  'Real Estate':       ['homes for sale', 'real estate agent near me', 'sell my house fast', 'first time home buyer'],
  'Medical / Dental':  ['dentist near me', 'teeth whitening', 'family doctor', 'same day appointment'],
  'Home Services':     ['plumber near me', 'HVAC repair', 'roof replacement cost', 'emergency electrician'],
  'Fitness / Wellness':['gym near me', 'personal trainer', 'yoga classes', 'weight loss program'],
  'E-commerce':        ['best price', 'free shipping', 'product reviews', 'buy online'],
  'SaaS / Tech':       ['best software for', 'alternatives to', 'pricing comparison', 'free trial'],
  'Other':             [],
}

const INDUSTRIES = Object.keys(INDUSTRY_SUGGESTIONS)

type Step = 1 | 2 | 3

export default function ScanPage() {
  const router = useRouter()

  const [step,         setStep]         = useState<Step>(1)
  const [businessName, setBusinessName] = useState('')
  const [website,      setWebsite]      = useState('')
  const [industry,     setIndustry]     = useState('')
  const [topics,       setTopics]       = useState<string[]>([])
  const [topicInput,   setTopicInput]   = useState('')
  const [location,     setLocation]     = useState('')
  const [email,        setEmail]        = useState('')
  const [loading,      setLoading]      = useState(false)
  const [error,        setError]        = useState('')

  const suggestions = INDUSTRY_SUGGESTIONS[industry] ?? []

  function addTopic(t: string) {
    const trimmed = t.trim()
    if (!trimmed || topics.includes(trimmed) || topics.length >= 5) return
    setTopics((prev) => [...prev, trimmed])
  }

  function removeTopic(t: string) {
    setTopics((prev) => prev.filter((x) => x !== t))
  }

  function handleTopicKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTopic(topicInput)
      setTopicInput('')
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
        body:    JSON.stringify({ businessName, website, topics, location, industry, email }),
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

          {/* Step 1 */}
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <div>
                <h1 className="text-2xl font-bold mb-1">Your business</h1>
                <p className="text-sm text-muted">Tell us who you are so we can run the scan.</p>
              </div>
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
                <label className="text-sm font-medium">Website <span className="text-danger">*</span></label>
                <input
                  className="input"
                  placeholder="e.g. sunrisedental.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
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
                className="w-full mt-2"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="flex flex-col gap-5">
              <div>
                <h1 className="text-2xl font-bold mb-1">Search topics</h1>
                <p className="text-sm text-muted">What do people search for when looking for a business like yours? Add up to 5 topics.</p>
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

          {/* Step 3 */}
          {step === 3 && (
            <div className="flex flex-col gap-5">
              <div>
                <h1 className="text-2xl font-bold mb-1">Almost there</h1>
                <p className="text-sm text-muted">Optional details to improve accuracy, plus where to send your report.</p>
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
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Email <span className="text-muted text-xs">(optional — get your report by email)</span></label>
                <input
                  className="input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Summary */}
              <div className="bg-surface-2 border border-border rounded-xl p-4 flex flex-col gap-2 text-sm">
                <p className="font-semibold text-foreground">Scan summary</p>
                <p className="text-muted">{businessName} &middot; {website}</p>
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
                  <p className="text-xs text-muted">One-time payment &middot; Full report instantly</p>
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
                  Pay $1 & Run Scan <Radar className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-center text-muted">Secure payment by Stripe &middot; No subscription</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
