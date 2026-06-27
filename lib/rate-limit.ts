// In-memory rate limiter for Edge/Node API routes.
// Uses a sliding window: max `limit` requests per `windowMs` per IP.
// Note: resets on cold starts — sufficient for abuse prevention on Vercel.

const store = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(
  ip: string,
  opts: { limit?: number; windowMs?: number } = {},
): { allowed: boolean; remaining: number; resetAt: number } {
  const limit    = opts.limit    ?? 5
  const windowMs = opts.windowMs ?? 60 * 60 * 1000 // 1 hour default
  const now      = Date.now()

  const entry = store.get(ip)

  if (!entry || now > entry.resetAt) {
    // Fresh window
    store.set(ip, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs }
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return { allowed: true, remaining: limit - entry.count, resetAt: entry.resetAt }
}

// Extract real IP from Next.js request headers (respects Vercel / Cloudflare proxies)
export function getIp(req: Request): string {
  return (
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    'unknown'
  )
}

/**
 * Returns true if the IP is in the OWNER_IPS env var (comma-separated).
 * These IPs bypass all scan limits — for owner/demo use.
 * Set OWNER_IPS in your Vercel env: e.g. "12.34.56.78,98.76.54.32"
 */
export function isOwnerIp(ip: string): boolean {
  const raw = process.env.OWNER_IPS ?? ''
  if (!raw) return false
  return raw.split(',').map(s => s.trim()).includes(ip)
}
