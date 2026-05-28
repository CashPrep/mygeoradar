import Link from 'next/link'
import { Radar, Mail } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">

        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-10">

          {/* Brand */}
          <div className="max-w-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-[15px] tracking-tight mb-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center shadow-glow-xs">
                <Radar className="w-4 h-4 text-white" />
              </div>
              <span>
                My<span className="text-accent">Geo</span>Radar
              </span>
            </Link>
            <p className="text-sm text-muted leading-relaxed">
              Helping businesses get found and recommended by AI assistants like ChatGPT,
              Perplexity, Gemini, and Claude.
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex flex-wrap gap-10">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted/70 mb-3">
                Product
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  { href: '/playbook', label: 'Found by AI Playbook' },
                  { href: '/#scan',    label: 'Free AI Readiness Scan' },
                  { href: '/#what-you-get', label: "What's Included" },
                  { href: '/#pricing', label: 'Pricing' },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-muted hover:text-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted/70 mb-3">
                Company
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  { href: '/privacy', label: 'Privacy Policy' },
                  { href: '/terms',   label: 'Terms of Service' },
                  { href: '/refund',  label: 'Refund Policy' },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-muted hover:text-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="divider mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {year} MyGeoRadar. All rights reserved.</p>

          {/* Product Hunt Badge */}
          <a
            href="https://www.producthunt.com/products/become-suggested-by-ai?utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-become-suggested-by-ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Become suggested by AI - Helping small businesses survive Ai! | Product Hunt"
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1157613&theme=dark&t=1779967684776"
              width={250}
              height={54}
              style={{ width: '250px', height: '54px' }}
            />
          </a>

          <a
            href="mailto:hello@mygeoradar.com"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            hello@mygeoradar.com
          </a>
        </div>

      </div>
    </footer>
  )
}
