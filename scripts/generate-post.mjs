// Auto-generate a new blog post page from a topic
// Usage: node scripts/generate-post.mjs

// Template CTA rules:
// - The CTA box at the bottom must say: "Get your free AI visibility score" and "Free score in 5 seconds. Full report $29.99."
// - Badge variant must be "accent"

import { readFileSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// CTA HTML block to inject at the bottom of every post
export const CTA_BLOCK = `
        <div className="mt-10 p-6 bg-surface-2 border border-border rounded-xl flex flex-col gap-4">
          <p className="font-semibold text-foreground">Get your free AI visibility score</p>
          <p className="text-sm text-foreground-dim">Free score in 5 seconds. Full report $29.99.</p>
          <Link href="/scan" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors w-fit">
            Run my free scan <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
`
