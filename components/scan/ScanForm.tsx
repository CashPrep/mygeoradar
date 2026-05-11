'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { X, Plus, ArrowRight, ArrowLeft } from 'lucide-react'
import { clsx } from 'clsx'

const SUGGESTED_TOPICS: Record<string, string[]> = {
  'Legal':       ['personal injury lawyer', 'car accident attorney', 'divorce lawyer', 'criminal defense attorney'],
  'Home Services': ['roofer near me', 'plumber near me', 'HVAC repair', 'electrician near me'],
  'Health':      ['chiropractor near me', 'dentist near me', 'physical therapy', 'urgent care'],
  'Fitness':     ['gym near me', 'personal trainer', 'yoga classes', 'crossfit gym'],
  'Restaurant':  ['best pizza near me', 'sushi restaurant', 'brunch near me', 'Italian restaurant'],
  'Other':       [],
}

const INDUSTRIES = Object.keys(SUGGESTED_TOPICS)

export function ScanForm() {
  const [step, setStep]         = useState(1)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const [businessName, setBusinessName] = useState('')
  const [website, setWebsite]           = useState('')
  const [topics, setTopics]             = useState<string[]>([])
  const [topicInput, setTopicInput]     = useState('')
  const [industry, setIndustry]         = useState('')
  const [location, setLocation]         = useState('')

  function addTopic(t: string) {
    const clean = t.trim()
    if (!clean || topics.includes(clean) || topics.length >= 5) return
    setTopics([...topics, clean])
    setTopicInput('')
  }

  function removeTopic(t: string) {
    setTopics(topics.filter((x) => x !== t))
  }

  function nextStep() {
    if (step === 1) {
      if (!businessName.trim()) return setError('Enter your business name.')
      if (!website.trim())      return setError('Enter your website URL.')
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
      const res = await fetch('/api/scan/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, website, topics, location, industry }),
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

  const suggestions = industry ? SUGGESTED_TOPICS[industry] ?? [] : []

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
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">Topics to scan</h2>
          <p className="text-sm text-muted -mt-2">Add 1–5 search queries your customers use to find businesses like yours.</p>

          {/* Industry picker for suggestions */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground-dim">Your industry (for suggestions)</label>
            <div className="flex flex-wrap gap-2">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  type="button"
                  onClick={() => setIndustry(ind === industry ? '' : ind)}
                  className={clsx(
                    'px-3 py-1.5 rounded-lg text-sm border transition-all',
                    industry === ind
                      ? 'bg-accent/10 border-accent/40 text-accent'
                      : 'bg-surface-2 border-border text-foreground-dim hover:border-border-bright'
                  )}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground-dim">Suggestions — click to add</label>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    disabled={topics.includes(s) || topics.length >= 5}
                    onClick={() => addTopic(s)}
                    className={clsx(
                      'px-3 py-1.5 rounded-lg text-xs border transition-all',
                      topics.includes(s)
                        ? 'bg-success/10 border-success/30 text-success cursor-default'
                        : 'bg-surface-2 border-border text-foreground-dim hover:border-accent/40 hover:text-accent disabled:opacity-40'
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom topic input */}
          <div className="flex gap-2">
            <Input
              placeholder="Type a custom topic..."
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTopic(topicInput)}
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => addTopic(topicInput)}
              disabled={topics.length >= 5}
              className="px-3 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition-all disabled:opacity-40"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Added topics */}
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

      {/* Step 3 */}
      {step === 3 && (
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">Final details</h2>
          <p className="text-sm text-muted -mt-2">Optional — helps us write more accurate scan queries.</p>
          <Input
            label="City / State"
            placeholder="Boston, MA"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          {/* Summary */}
          <div className="bg-surface-2 border border-border rounded-xl p-4 flex flex-col gap-2 mt-2">
            <p className="text-xs font-semibold text-foreground-dim uppercase tracking-wider mb-1">Scan summary</p>
            <p className="text-sm"><span className="text-muted">Business:</span> {businessName}</p>
            <p className="text-sm"><span className="text-muted">Website:</span> {website}</p>
            <p className="text-sm"><span className="text-muted">Topics:</span> {topics.join(', ')}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {['ChatGPT', 'Perplexity', 'Gemini', 'Claude'].map((e) => (
                <Badge key={e} variant="neutral" className="text-xs">{e}</Badge>
              ))}
            </div>
          </div>

          <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
            <p className="text-sm font-semibold text-foreground">One-time payment: <span className="text-accent">$1.00</span></p>
            <p className="text-xs text-muted mt-1">Secure checkout via Stripe. Results ready in ~60 seconds.</p>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-danger -mt-2">{error}</p>}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => { setError(''); setStep(step - 1) }}
            className="flex items-center gap-1.5 text-sm text-foreground-dim hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        ) : <div />}

        {step < 3 ? (
          <Button variant="primary" onClick={nextStep}>
            Continue <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button variant="primary" loading={loading} onClick={handleSubmit}>
            Pay $1 & run scan <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
