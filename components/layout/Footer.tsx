import Link from 'next/link'
import Image from 'next/image'
import { Radar } from 'lucide-react'

const footerLinks = {
  Product: [
    { href: '/#how-it-works', label: 'How it works' },
    { href: '/#pricing',      label: 'Pricing' },
    { href: '/scan',          label: 'Run a scan' },
  ],
  Resources: [
    { href: '/blog',                  label: 'Blog' },
    { href: '/blog/what-is-geo',      label: 'What is GEO?' },
    { href: '/blog/ai-search-guide',  label: 'AI Search Guide' },
    { href: '/about',                 label: 'About the Founder' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms',   label: 'Terms of Service' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/30 mt-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Radar className="w-5 h-5 text-accent" />
              <span className="font-bold">my<span className="text-accent">geo</span>radar</span>
            </Link>
            <p className="text-sm text-muted leading-relaxed">
              See how AI engines see your business — and get a clear plan to show up more.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="text-xs font-semibold text-foreground-dim uppercase tracking-wider mb-3">
                {section}
              </p>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <p className="text-xs text-muted">&copy; {new Date().getFullYear()} MyGeoRadar. All rights reserved.</p>
            <p className="text-xs text-muted hidden md:block">&mdash;</p>
            <p className="text-xs text-muted">Built by Andrew Garber &mdash; Incoming Elon University AI Scholar.</p>
          </div>
          <a
            href="https://launchboosts.com/project/my-geo-radar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://launchboosts.com/badges/featured-dark.svg"
              alt="Featured on LaunchBoosts"
              width={180}
              height={54}
              unoptimized
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
