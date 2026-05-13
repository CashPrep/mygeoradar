import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ─── Load topics ───────────────────────────────────────────────────────────────
const topicsPath = path.resolve('scripts/topics.json')
const { topics } = JSON.parse(fs.readFileSync(topicsPath, 'utf8'))

// ─── Find next unwritten topic ─────────────────────────────────────────────────
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
}

const blogDir = path.resolve('app/blog')
const existingSlugs = fs.readdirSync(blogDir).filter(f =>
  fs.statSync(path.join(blogDir, f)).isDirectory()
)

let topicIndex = -1

if (process.env.FORCE_TOPIC_INDEX !== '' && process.env.FORCE_TOPIC_INDEX !== undefined) {
  topicIndex = parseInt(process.env.FORCE_TOPIC_INDEX, 10)
  console.log(`Forced topic index: ${topicIndex}`)
} else {
  for (let i = 0; i < topics.length; i++) {
    const slug = slugify(topics[i].title)
    if (!existingSlugs.includes(slug)) {
      topicIndex = i
      break
    }
  }
}

if (topicIndex === -1) {
  console.log('All topics have been written. Add more to scripts/topics.json.')
  process.exit(0)
}

const topic = topics[topicIndex]
const slug = slugify(topic.title)
const postDir = path.join(blogDir, slug)

console.log(`Generating post ${topicIndex}: "${topic.title}" → /blog/${slug}`)

// ─── Build prompt ──────────────────────────────────────────────────────────────
const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

const systemPrompt = `You are a senior content strategist writing for MyGeoRadar (mygeoradar.com), a SaaS tool that helps businesses improve their AI search visibility — showing up in ChatGPT, Perplexity, Gemini, and Claude answers.

Your job is to write long-form, authoritative blog posts optimized for both GEO (Generative Engine Optimization) and traditional SEO. These posts must be the kind of content that AI engines CITE when answering questions.

GEO WRITING RULES (follow every single one):
1. Open with a direct, definitive 1-2 sentence answer to the topic question. AI engines grab this as the cited snippet.
2. Use specific statistics, percentages, and data points throughout. Real numbers get cited more than vague claims.
3. Write in second person ("you", "your business") — directly address the reader.
4. Use clear H2 and H3 headers that are themselves search queries (e.g. "How does X work?" or "What is the difference between X and Y?").
5. Include a FAQ section at the end with 4-6 questions and direct answers. This is heavily weighted by AI for citation.
6. Every section should be a standalone, citable paragraph. No fluff, no filler.
7. Mention ChatGPT, Perplexity, Gemini, and Claude by name throughout — entity association matters.
8. End every post with a CTA to MyGeoRadar.
9. Write at a grade 8 reading level — clear, confident, authoritative.
10. Target 1200-1800 words total.

OUTPUT FORMAT: You must output a valid Next.js page.tsx file. Use EXACTLY this structure — no deviations:
- Import Navbar, Footer, Badge, ArrowRight, Link at the top
- Export metadata with title and description
- Export default function with a unique PascalCase name based on the slug
- Use the article/prose structure from existing posts
- The CTA box at the bottom must say: "Get your free AI visibility score" and "Free score in 5 seconds. Full report $24.99 (50% off your first scan)."
- Badge variant must be "accent"
- Use className patterns consistent with the existing codebase (bg-surface-2, border-border, text-accent, etc.)
- Do NOT use any markdown — output pure TSX only
- Escape apostrophes as &apos; and quotes as &ldquo; &rdquo; and em-dashes as &mdash;
- The function name must be unique — derive it from the slug in PascalCase + "Page" suffix

Here is the exact CTA block to use at the bottom of every post:
<div className="mt-10 p-6 bg-surface-2 border border-border rounded-xl flex flex-col gap-4">
  <p className="font-semibold text-foreground">Get your free AI visibility score</p>
  <p className="text-sm text-foreground-dim">Free score in 5 seconds. Full report $24.99 (50% off your first scan).</p>
  <Link href="/scan" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors w-fit">
    Run my free scan <ArrowRight className="w-4 h-4" />
  </Link>
</div>`

const userPrompt = `Write a blog post for MyGeoRadar on this topic:

Title: ${topic.title}
Tag: ${topic.tag}
Date: ${today}
Read time: ${topic.readTime}
Description: ${topic.description}

SEO focus keyword: ${topic.keyword}

Return ONLY the complete page.tsx file content. No explanation, no markdown fences, no commentary. Just the raw TSX.`

// ─── Call Claude ───────────────────────────────────────────────────────────────
console.log('Calling Claude API...')
const message = await client.messages.create({
  model: 'claude-opus-4-5',
  max_tokens: 8000,
  messages: [{ role: 'user', content: userPrompt }],
  system: systemPrompt,
})

const content = message.content[0].text.trim()

// Strip any accidental markdown fences
const tsx = content.startsWith('```')
  ? content.replace(/^```[a-z]*\n?/, '').replace(/\n?```$/, '').trim()
  : content

// ─── Write file ────────────────────────────────────────────────────────────────
fs.mkdirSync(postDir, { recursive: true })
fs.writeFileSync(path.join(postDir, 'page.tsx'), tsx, 'utf8')

console.log(`✅ Written: app/blog/${slug}/page.tsx`)

// ─── Update blog index (append to posts array) ─────────────────────────────────
const indexPath = path.resolve('app/blog/page.tsx')
let indexContent = fs.readFileSync(indexPath, 'utf8')

const newEntry = `  {
    slug:        '${slug}',
    title:       ${JSON.stringify(topic.title)},
    description: ${JSON.stringify(topic.description)},
    date:        '${today}',
    readTime:    '${topic.readTime}',
    tag:         ${JSON.stringify(topic.tag)},
  },`

// Insert before the closing bracket of the posts array
indexContent = indexContent.replace(
  /(const posts = \[)((?:.|\n)*?)(\])/,
  (_, open, middle, close) => `${open}${middle}${newEntry}\n${close}`
)

fs.writeFileSync(indexPath, indexContent, 'utf8')
console.log('✅ Updated: app/blog/page.tsx')
