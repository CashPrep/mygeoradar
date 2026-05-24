import Link from 'next/link'
import { Radar } from 'lucide-react'

const footerLinks = {
  Product: [
    { href: '/playbook',      label: 'Found by AI — Playbook' },
    { href: '/#what-you-get', label: 'What you get' },
    { href: '/#pricing',      label: 'Pricing' },
    { href: '/account',       label: 'My purchases' },
  ],
  Resources: [
    { href: '/blog',   label: 'GEO Blog' },
    { href: '/about',  label: 'About the founder' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms',   label: 'Terms of Service' },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface/30 mt-20">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 transition-transform duration-200 hover:scale-[1.02]">
              <Radar className="w-5 h-5 text-accent" />
              <span className="font-bold">my<span className="text-accent">geo</span>radar</span>
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-[220px]">
              Get your business found and recommended by AI assistants — ChatGPT, Perplexity, Gemini, and Claude.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="text-xs font-semibold text-foreground-dim uppercase tracking-wider mb-4">
                {section}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-foreground transition-colors relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <p className="text-[11px] font-mono text-muted">&copy; {new Date().getFullYear()} MyGeoRadar. All rights reserved.</p>
            <p className="text-[11px] text-muted hidden md:block">&mdash;</p>
            <p className="text-[11px] font-mono text-muted">Built by Andrew Garber &mdash; Incoming Elon University AI Scholar.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://launchboosts.com/project/my-geo-radar"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border p-1.5 opacity-70 hover:opacity-100 hover:border-accent/40 transition-all"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://launchboosts.com/badges/featured-dark.svg"
                alt="Featured on LaunchBoosts"
                width={110}
                height={32}
                style={{ height: 32, width: 'auto' }}
              />
            </a>
            <a
              href="https://dang.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border p-1.5 opacity-70 hover:opacity-100 hover:border-accent/40 transition-all"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.prod.website-files.com/63d8afd87da01fb58ea3fbcb/6487e2868c6c8f93b4828827_dang-badge.png"
                alt="Dang.ai"
                width={110}
                height={32}
                style={{ height: 32, width: 'auto' }}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
