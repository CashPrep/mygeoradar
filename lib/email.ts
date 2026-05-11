import { Resend } from 'resend'
import type { ScanReport } from './types'
import { formatScore, getScoreHex } from './utils'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function sendScanReport(email: string, report: ScanReport) {
  const scoreColor = getScoreHex(report.overallScore)
  const topActions = report.topActions.slice(0, 3)

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Your AI Visibility Report</title>
</head>
<body style="margin:0;padding:0;background:#080810;font-family:Inter,system-ui,sans-serif;color:#e8e8f0">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px">
      <p style="color:#4f8ef7;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 8px">MyGeoRadar</p>
      <h1 style="font-size:24px;font-weight:700;margin:0 0 8px;color:#e8e8f0">Your AI Visibility Report</h1>
      <p style="color:#a0a0b8;font-size:14px;margin:0">${report.businessName} &middot; ${report.website}</p>
    </div>

    <!-- Score card -->
    <div style="background:#0e0e1a;border:1px solid #1e1e3a;border-radius:16px;padding:28px;text-align:center;margin-bottom:24px">
      <p style="color:#6b7280;font-size:12px;margin:0 0 8px">Overall AI Visibility Score</p>
      <p style="font-size:64px;font-weight:800;color:${scoreColor};margin:0;line-height:1">${report.overallScore}</p>
      <p style="font-size:14px;font-weight:600;color:${scoreColor};margin:8px 0 0">${formatScore(report.overallScore)}</p>
    </div>

    <!-- Engine scores -->
    <div style="background:#0e0e1a;border:1px solid #1e1e3a;border-radius:16px;padding:24px;margin-bottom:24px">
      <p style="font-size:13px;font-weight:600;color:#a0a0b8;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 16px">Engine Breakdown</p>
      ${report.engines.map(e => `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
        <span style="font-size:14px;color:#e8e8f0">${e.engineLabel}</span>
        <span style="font-size:14px;font-weight:700;color:${getScoreHex(e.overallScore)}">${e.overallScore}/100</span>
      </div>
      `).join('')}
    </div>

    <!-- Top actions -->
    <div style="background:#0e0e1a;border:1px solid #1e1e3a;border-radius:16px;padding:24px;margin-bottom:24px">
      <p style="font-size:13px;font-weight:600;color:#a0a0b8;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 16px">Top 3 Actions</p>
      ${topActions.map((a, i) => `
      <div style="display:flex;gap:12px;margin-bottom:16px">
        <div style="width:24px;height:24px;background:#4f8ef720;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <span style="font-size:12px;font-weight:700;color:#4f8ef7">${i + 1}</span>
        </div>
        <div>
          <p style="font-size:14px;font-weight:600;color:#e8e8f0;margin:0 0 4px">${a.title}</p>
          <p style="font-size:13px;color:#a0a0b8;margin:0;line-height:1.5">${a.description}</p>
        </div>
      </div>
      `).join('')}
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:32px">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/scan/${report.id}"
         style="display:inline-block;background:#4f8ef7;color:#fff;font-size:14px;font-weight:600;padding:14px 28px;border-radius:10px;text-decoration:none">
        View Full Report
      </a>
    </div>

    <!-- Footer -->
    <p style="text-align:center;font-size:12px;color:#6b7280;margin:0">
      &copy; ${new Date().getFullYear()} MyGeoRadar &middot;
      <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color:#4f8ef7;text-decoration:none">mygeoradar.com</a>
    </p>
  </div>
</body>
</html>
`

  await resend.emails.send({
    from:    'MyGeoRadar <reports@mygeoradar.com>',
    to:      email,
    subject: `Your AI Visibility Report — ${report.businessName} scored ${report.overallScore}/100`,
    html,
  })
}
