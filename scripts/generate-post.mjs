#!/usr/bin/env node
/**
 * Usage: node scripts/generate-post.mjs "Your Post Title"
 * Scaffolds a new blog post under app/blog/<slug>/page.tsx
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

const title = process.argv[2]
if (!title) {
  console.error('Usage: node scripts/generate-post.mjs "Your Post Title"')
  process.exit(1)
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const slug      = slugify(title)
const dir       = join('app', 'blog', slug)
const filePath  = join(dir, 'page.tsx')
const today     = new Date().toISOString().split('T')[0]

if (existsSync(filePath)) {
  console.error(`Post already exists: ${filePath}`)
  process.exit(1)
}

mkdirSync(dir, { recursive: true })

const template = `import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'

export const metadata = {
  title: '${title}',
  description: 'TODO: Add description.',
  openGraph: {
    title: '${title}',
    description: 'TODO: Add description.',
    url: 'https://mygeoradar.com/blog/${slug}',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'MyGeoRadar' }],
    type: 'article',
    publishedTime: '${today}T00:00:00.000Z',
    authors: ['https://mygeoradar.com'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    creator: '@MyGEORadar',
    title: '${title}',
    description: 'TODO: Add description.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function ${slug.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())}Page() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">TODO: Category</Badge>
            <span className="text-xs text-muted">${today} &middot; X min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            ${title}
          </h1>
          <p className="text-lg text-foreground-dim leading-relaxed">
            TODO: Lede paragraph.
          </p>
        </div>
        <div className="flex flex-col gap-6 text-foreground-dim leading-relaxed">
          {/* TODO: Add content sections */}
        </div>
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
`

writeFileSync(filePath, template)
console.log(`\u2713 Created: ${filePath}`)
console.log(`  Edit: app/blog/${slug}/page.tsx`)
console.log(`  URL:  https://mygeoradar.com/blog/${slug}`)
