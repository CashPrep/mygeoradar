import { Metadata } from 'next'
import { InvisibleGuideClient } from '@/components/invisible/InvisibleGuideClient'

export const metadata: Metadata = {
  title: 'Your Business Is Invisible to AI — Fix It',
  description: 'AI assistants like ChatGPT, Perplexity, and Gemini have never heard of your business. Here is your step-by-step plan to change that.',
}

export default function InvisiblePage() {
  return <InvisibleGuideClient />
}
