import { Resend } from 'resend'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('Missing env var: RESEND_API_KEY')
  return new Resend(key)
}

export async function sendEmail(opts: {
  to: string
  subject: string
  html: string
}) {
  const from = process.env.RESEND_FROM_EMAIL
  if (!from) throw new Error('Missing env var: RESEND_FROM_EMAIL')

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
