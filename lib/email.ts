import { Resend } from 'resend'
import type { ScanReport, ActionItem } from './types'
import { formatScore, getScoreHex } from './utils'

const BASE_STYLES = `
  body{margin:0;padding:0;background:#080810;font-family:Inter,system-ui,sans-serif;color:#e8e8f0}
  .wrap{max-width:560px;margin:0 auto;padding:32px 24px}
  .label{color:#4f8ef7;font-size:12px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;margin:0 0 8px;text-align:center}
  .card{background:#0d0d1a;border:1px solid #1e1e3a;border-radius:12px;padding:24px;margin-bottom:24px}
  .muted{color:#9898b0;font-size:14px;margin:0}
  .footer{text-align:center;color:#4a4a6a;font-size:12px;margin:24px 0 0}
`

function emailShell(body: string) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><style>${BASE_STYLES}</style></head><body><div class="wrap">${body}</div></body></html>`
}

// ─── 1. Scan Report ───────────────────────────────────────────────────────────

export async function sendScanReport(email: string, report: ScanReport) {
  const resend      = new Resend(process.env.RESEND_API_KEY)
  const scoreColor  = getScoreHex(report.overallScore)
  const topActions  = report.topActions.slice(0, 3)

  const html = emailShell(`
    <p class="label">MyGeoRadar</p>
    <h1 style="font-size:24px;font-weight:700;margin:0 0 8px;color:#e8e8f0;text-align:center">Your AI Visibility Report</h1>
    <p class="muted" style="text-align:center;margin-bottom:24px">${report.website}</p>

    <div class="card" style="text-align:center">
      <p class="muted" style="text-transform:uppercase;letter-spacing:.1em;font-size:12px;margin-bottom:8px">Overall Score</p>
      <p style="font-size:56px;font-weight:800;color:${scoreColor};margin:0 0 4px">${report.overallScore}</p>
      <p class="muted">${formatScore(report.overallScore)}</p>
    </div>

    <h2 style="font-size:16px;font-weight:600;margin:0 0 12px;color:#e8e8f0">Top Recommendations</h2>
    ${topActions.map((a: ActionItem) => `
      <div style="background:#0d0d1a;border:1px solid #1e1e3a;border-radius:8px;padding:12px 16px;margin-bottom:8px">
        <p style="font-size:14px;font-weight:600;color:#e8e8f0;margin:0 0 4px">${a.title}</p>
        <p style="font-size:13px;color:#c8c8d8;margin:0">${a.description}</p>
      </div>`).join('')}

    <div style="text-align:center;margin-top:28px">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/scan/${report.id}"
        style="display:inline-block;padding:12px 28px;background:#4f8ef7;color:#fff;font-weight:600;border-radius:10px;text-decoration:none;font-size:14px">
        View full report &rarr;
      </a>
    </div>
    <p class="footer">Sent by MyGeoRadar &mdash; AI Visibility Intelligence</p>
  `)

  await resend.emails.send({
    from:    'MyGeoRadar <reports@mygeoradar.com>',
    to:      email,
    subject: `Your AI Visibility Report — ${report.website}`,
    html,
  })
}

// ─── 2. Welcome Email ─────────────────────────────────────────────────────────

export async function sendWelcomeEmail({
  email, firstName, businessName, scanId, score,
}: {
  email: string
  firstName?: string
  businessName: string
  scanId: string
  score: number
}) {
  const resend     = new Resend(process.env.RESEND_API_KEY)
  const appUrl     = process.env.NEXT_PUBLIC_APP_URL || 'https://mygeoradar.com'
  const scoreColor = getScoreHex(score)
  const name       = firstName || businessName

  const html = emailShell(`
    <p class="label">MyGeoRadar</p>
    <h1 style="font-size:22px;font-weight:700;margin:0 0 12px;color:#e8e8f0;text-align:center">
      Welcome, ${name} 👋
    </h1>
    <p style="color:#c8c8d8;font-size:15px;text-align:center;margin-bottom:24px;line-height:1.6">
      Your AI visibility scan for <strong>${businessName}</strong> is ready.
      Here&rsquo;s what to do next.
    </p>

    <div class="card">
      <p style="font-size:13px;font-weight:600;color:#9898b0;text-transform:uppercase;letter-spacing:.08em;margin:0 0 6px">Your Score</p>
      <p style="font-size:48px;font-weight:800;color:${scoreColor};margin:0 0 4px">${score}<span style="font-size:18px;color:#9898b0">/100</span></p>
      <p style="color:#9898b0;font-size:13px;margin:0">${formatScore(score)}</p>
    </div>

    <h2 style="font-size:15px;font-weight:600;color:#e8e8f0;margin:0 0 12px">Your 3-step quick-start checklist</h2>

    <div style="background:#0d0d1a;border:1px solid #1e1e3a;border-radius:10px;padding:16px;margin-bottom:10px;display:flex;gap:12px">
      <span style="font-size:20px">1️⃣</span>
      <div>
        <p style="font-weight:600;color:#e8e8f0;margin:0 0 4px;font-size:14px">Read your full report</p>
        <p style="color:#9898b0;font-size:13px;margin:0">Your Quick Wins section has 3 fixes you can do today &mdash; no tech skills needed.</p>
      </div>
    </div>
    <div style="background:#0d0d1a;border:1px solid #1e1e3a;border-radius:10px;padding:16px;margin-bottom:10px;display:flex;gap:12px">
      <span style="font-size:20px">2️⃣</span>
      <div>
        <p style="font-weight:600;color:#e8e8f0;margin:0 0 4px;font-size:14px">Fix one thing this week</p>
        <p style="color:#9898b0;font-size:13px;margin:0">Start with the highest-priority action in your plan. Even one fix moves your score.</p>
      </div>
    </div>
    <div style="background:#0d0d1a;border:1px solid #1e1e3a;border-radius:10px;padding:16px;margin-bottom:24px;display:flex;gap:12px">
      <span style="font-size:20px">3️⃣</span>
      <div>
        <p style="font-weight:600;color:#e8e8f0;margin:0 0 4px;font-size:14px">Re-scan in 30 days</p>
        <p style="color:#9898b0;font-size:13px;margin:0">AI visibility changes fast. A monthly re-scan shows whether your fixes are working.</p>
      </div>
    </div>

    <div style="text-align:center">
      <a href="${appUrl}/scan/${scanId}"
        style="display:inline-block;padding:13px 32px;background:#4f8ef7;color:#fff;font-weight:700;border-radius:10px;text-decoration:none;font-size:14px">
        Open my report &rarr;
      </a>
    </div>
    <p class="footer" style="margin-top:28px">MyGeoRadar &mdash; reply to this email anytime if you need help</p>
  `)

  await resend.emails.send({
    from:    'Andrew at MyGeoRadar <andrew@mygeoradar.com>',
    to:      email,
    subject: `🎯 Your AI visibility score is ${score}/100 — here's what to fix first`,
    html,
  })
}

// ─── 3. Scan Error Email ──────────────────────────────────────────────────────
// Sent when runGeoScan throws after a successful payment.

export async function sendScanErrorEmail({
  email, businessName, scanId,
}: {
  email: string
  businessName: string
  scanId: string
}) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mygeoradar.com'

  const html = emailShell(`
    <p class="label">MyGeoRadar</p>
    <h1 style="font-size:22px;font-weight:700;margin:0 0 12px;color:#e8e8f0;text-align:center">
      Your scan hit a snag 😔
    </h1>
    <p style="color:#c8c8d8;font-size:15px;text-align:center;margin-bottom:24px;line-height:1.6">
      We successfully received your payment for <strong>${businessName}</strong>,
      but the AI scan ran into an error. This is on us.
    </p>

    <div class="card">
      <p style="color:#e8e8f0;font-size:14px;line-height:1.65;margin:0 0 16px">
        We&rsquo;ve been automatically notified and will re-run your scan shortly.
        If it isn&rsquo;t ready within the next hour, just reply to this email and
        we&rsquo;ll sort it out immediately &mdash; including a full refund if needed.
      </p>
      <div style="text-align:center">
        <a href="${appUrl}/scan/${scanId}"
          style="display:inline-block;padding:11px 26px;background:#4f8ef7;color:#fff;font-weight:600;border-radius:10px;text-decoration:none;font-size:14px">
          Check my report status &rarr;
        </a>
      </div>
    </div>

    <p style="color:#9898b0;font-size:13px;text-align:center;line-height:1.6">
      Scan ID: <code style="color:#c8c8d8">${scanId}</code> &mdash; include this if you email us.
    </p>
    <p class="footer" style="margin-top:16px">— Andrew, MyGeoRadar founder &mdash; <a href="mailto:andrew@mygeoradar.com" style="color:#4f8ef7;text-decoration:none">andrew@mygeoradar.com</a></p>
  `)

  await resend.emails.send({
    from:    'Andrew at MyGeoRadar <andrew@mygeoradar.com>',
    to:      email,
    subject: `Action needed: your MyGeoRadar scan for ${businessName}`,
    html,
  })
}

// ─── 4. Day-3 Tip Email ───────────────────────────────────────────────────────

export async function sendDay3TipEmail({
  email, businessName, scanId, topAction,
}: {
  email: string
  businessName: string
  scanId: string
  topAction?: string
}) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mygeoradar.com'

  const tip = topAction
    ? topAction
    : 'Add an FAQ section to your homepage answering the top 5 questions your customers ask. AI engines quote FAQ content 3× more often than regular pages.'

  const html = emailShell(`
    <p class="label">Quick tip from MyGeoRadar</p>
    <h1 style="font-size:20px;font-weight:700;margin:0 0 12px;color:#e8e8f0;text-align:center">
      The #1 fix for <strong>${businessName}</strong>
    </h1>
    <p style="color:#c8c8d8;font-size:14px;text-align:center;margin-bottom:24px;line-height:1.6">
      You ran your scan 3 days ago. Here&rsquo;s the single highest-impact thing you can do right now:
    </p>

    <div style="background:#0d0d1a;border-left:3px solid #4f8ef7;border-radius:0 10px 10px 0;padding:18px 20px;margin-bottom:24px">
      <p style="color:#e8e8f0;font-size:15px;line-height:1.65;margin:0">${tip}</p>
    </div>

    <p style="color:#9898b0;font-size:13px;line-height:1.6;margin-bottom:24px">
      Most business owners who do this one thing see their AI visibility score jump 8–15 points within 30 days.
    </p>

    <div style="text-align:center">
      <a href="${appUrl}/scan/${scanId}"
        style="display:inline-block;padding:12px 28px;background:#4f8ef7;color:#fff;font-weight:600;border-radius:10px;text-decoration:none;font-size:14px">
        View my full action plan &rarr;
      </a>
    </div>
    <p class="footer" style="margin-top:28px">MyGeoRadar &mdash; <a href="${appUrl}" style="color:#4f8ef7;text-decoration:none">mygeoradar.com</a></p>
  `)

  await resend.emails.send({
    from:    'Andrew at MyGeoRadar <andrew@mygeoradar.com>',
    to:      email,
    subject: `The #1 fix for ${businessName}'s AI visibility`,
    html,
  })
}

// ─── 5. Day-7 Review Request Email ───────────────────────────────────────────

export async function sendDay7ReviewRequestEmail({
  email, businessName, scanId,
}: {
  email: string
  businessName: string
  scanId: string
}) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mygeoradar.com'

  const html = emailShell(`
    <p class="label">One quick thing</p>
    <h1 style="font-size:20px;font-weight:700;margin:0 0 12px;color:#e8e8f0;text-align:center">
      How&rsquo;s it going with your scan? 🙏
    </h1>
    <p style="color:#c8c8d8;font-size:14px;text-align:center;margin-bottom:24px;line-height:1.6">
      It&rsquo;s been a week since you scanned <strong>${businessName}</strong>.
      I&rsquo;d love to hear how it went &mdash; and if you got any value from the report.
    </p>

    <div class="card">
      <p style="color:#e8e8f0;font-size:14px;line-height:1.65;margin:0 0 16px">
        If MyGeoRadar helped you understand your AI visibility, a quick review goes a long way for a bootstrapped product like this.
        Takes 60 seconds and genuinely makes a difference.
      </p>
      <div style="text-align:center">
        <a href="https://mygeoradar.com/reviews"
          style="display:inline-block;padding:11px 26px;background:#22c55e;color:#fff;font-weight:600;border-radius:10px;text-decoration:none;font-size:14px">
          Leave a quick review ⭐
        </a>
      </div>
    </div>

    <p style="color:#9898b0;font-size:13px;text-align:center;margin-bottom:24px;line-height:1.6">
      Or if something didn&rsquo;t work right, just reply to this email &mdash; I read every one.
    </p>

    <div style="text-align:center">
      <a href="${appUrl}/scan/${scanId}"
        style="color:#4f8ef7;font-size:13px;text-decoration:none">
        View my report again &rarr;
      </a>
    </div>
    <p class="footer" style="margin-top:28px">&mdash; Andrew, MyGeoRadar founder</p>
  `)

  await resend.emails.send({
    from:    'Andrew at MyGeoRadar <andrew@mygeoradar.com>',
    to:      email,
    subject: `Quick check-in on your AI visibility scan`,
    html,
  })
}
