import { Metadata } from 'next'
import { InvisibleSuccessClient } from '@/components/invisible/InvisibleSuccessClient'

export const metadata: Metadata = {
  title: 'Your AI Visibility Fix Guide | MyGeoRadar',
  description: 'Your 10-step action plan to get your business seen by ChatGPT, Perplexity, Gemini & Claude.',
}

export default function InvisibleSuccessPage() {
  return <InvisibleSuccessClient />
}
