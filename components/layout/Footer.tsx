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
    { href: '/blog',   label: 'Free AI visibility tips' },
    { href: '/about',  label: 'About the founder' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms',   label: 'Terms of Service' },
  ],
}

export function Footer() {
  return (
    <footer className="mt-20">
      {/* Top glow strip */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="border-t border-border bg-surface/40">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4 group">
                <Radar className="w-5 h-5 text-accent transition-transform duration-200 group-hover:scale-110" />
                <span className="font-bold group-hover:text-accent transition-colors duration-200">
                  my<span className="text-accent">geo</span>radar
                </span>
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
                        className="text-sm text-muted hover:text-accent transition-colors duration-150 hover:underline underline-offset-2"
                      >
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
              <p className="text-[11px] font-mono text-muted">&copy; {new Date().getFullYear()} MyGeoRadar. All rights reserved.</p>
              <p className="text-[11px] font-mono text-muted hidden md:block">&mdash;</p>
              <p className="text-[11px] font-mono text-muted">Built by Andrew Garber — Incoming Elon University AI Scholar.</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://launchboosts.com/project/my-geo-radar"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity rounded-lg border border-border p-1.5 bg-surface hover:border-accent/30"
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
                className="opacity-70 hover:opacity-100 transition-opacity rounded-lg border border-border p-1.5 bg-surface hover:border-accent/30"
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
      </div>
    </footer>
  )
}
