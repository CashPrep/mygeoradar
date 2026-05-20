import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SCAN_PRICE_USD } from '@/lib/constants'

interface BlogCtaProps {
  heading?: string
  subheading?: string
}

export function BlogCta({
  heading   = 'See how your business shows up in AI answers',
  subheading = `Free score in 5 seconds. Full report $${SCAN_PRICE_USD.toFixed(2)}.`,
}: BlogCtaProps) {
  return (
    <div className="mt-10 p-6 bg-surface-2 border border-border rounded-xl flex flex-col gap-4">
      <p className="font-semibold text-foreground">{heading}</p>
      <p className="text-sm text-foreground-dim">{subheading}</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors w-fit"
      >
        Get my free score <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
