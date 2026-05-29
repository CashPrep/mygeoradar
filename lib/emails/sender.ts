// ─────────────────────────────────────────────────────────────────────────────
// Resend email sender helper
// Sends from mygeoradar@gmail.com via Resend
// ─────────────────────────────────────────────────────────────────────────────
import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}

export async function sendEmail(opts: {
  to: string
  subject: string
  html: string
}) {
  const from = process.env.RESEND_FROM_EMAIL ?? 'MyGeoRadar <mygeoradar@gmail.com>'
  const resend = getResend()
  const { data, error } = await resend.emails.send({
    from,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
  })
  if (error) throw new Error(`Resend error: ${error.message}`)
  return data
}
