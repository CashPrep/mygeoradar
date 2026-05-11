import { Resend } from 'resend'
import type { ScanReport } from './types'
import { formatScore, getScoreHex } from './utils'

export async function sendScanReport(
  email: string,
  report: ScanReport
) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const scoreColor = getScoreHex(report.overallScore)
  const topActions = report.topActions.slice(0, 3)

  const html = `<!DOCTYPE html>
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
      <p style="color:#9898b0;font-size:14px;margin:0">${report.website}</p>
    </div>

    <!-- Score card -->
    <div style="background:#0d0d1a;border:1px solid #1e1e3a;border-radius:12px;padding:24px;text-align:center;margin-bottom:24px">
      <p style="color:#9898b0;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px">Overall Score</p>
      <p style="font-size:56px;font-weight:800;color:${scoreColor};margin:0 0 4px">${report.overallScore}</p>
      <p style="color:#9898b0;font-size:14px;margin:0">${formatScore(report.overallScore)}</p>
    </div>

    <!-- Top actions -->
    <div style="margin-bottom:24px">
      <h2 style="font-size:16px;font-weight:600;margin:0 0 12px;color:#e8e8f0">Top Recommendations</h2>
      ${topActions.map((action: string) => `
      <div style="background:#0d0d1a;border:1px solid #1e1e3a;border-radius:8px;padding:12px 16px;margin-bottom:8px;font-size:14px;color:#c8c8d8">
        ${action}
      </div>`).join('')}
    </div>

    <!-- Footer -->
    <p style="text-align:center;color:#4a4a6a;font-size:12px;margin:24px 0 0">
      Sent by MyGeoRadar &mdash; AI Visibility Intelligence
    </p>
  </div>
</body>
</html>`

  await resend.emails.send({
    from: 'MyGeoRadar <reports@mygeoradar.com>',
    to: email,
    subject: `Your AI Visibility Report — ${report.website}`,
    html,
  })
}
