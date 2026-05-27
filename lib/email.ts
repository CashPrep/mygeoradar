import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = 'MyGeoRadar <hello@mygeoradar.com>'
const BASE = 'https://mygeoradar.com'

export async function sendPlaybookPurchaseEmail(email: string): Promise<void> {
  await resend.emails.send({
    from: FROM,
    to:   email,
    subject: 'Your Found by AI Playbook is ready to download',
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9f9f9;font-family:system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid #e4e4e7;overflow:hidden;">
        <!-- Header -->
        <tr>
          <td style="background:#0ea5e9;padding:28px 32px;">
            <p style="margin:0;color:#ffffff;font-size:18px;font-weight:700;">MyGeoRadar</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 32px;">
            <h1 style="margin:0 0 12px;font-size:22px;font-weight:800;color:#09090b;">Your playbook is ready 🎉</h1>
            <p style="margin:0 0 24px;font-size:15px;color:#52525b;line-height:1.6;">
              Thank you for purchasing <strong>Found by AI — The AI Visibility Playbook</strong>.
              Your files are available for instant download below.
            </p>
            <!-- CTA -->
            <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
              <tr>
                <td style="background:#0ea5e9;border-radius:10px;">
                  <a href="${BASE}/account" style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;">Go to My Downloads →</a>
                </td>
              </tr>
            </table>
            <p style="margin:0 0 8px;font-size:13px;color:#71717a;">Or paste this link into your browser:</p>
            <p style="margin:0 0 28px;font-size:13px;"><a href="${BASE}/account" style="color:#0ea5e9;">${BASE}/account</a></p>
            <!-- What's inside recap -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;border-radius:10px;padding:20px 24px;margin:0 0 24px;">
              <tr><td>
                <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#09090b;">What you have access to:</p>
                <ul style="margin:0;padding-left:18px;font-size:13px;color:#52525b;line-height:2;">
                  <li>The Complete AI Visibility Playbook (PDF)</li>
                  <li>The 27-Point AI Visibility Checklist</li>
                  <li>Prompt Pack — 10 copy-paste prompts</li>
                  <li>30-Day Action Plan Calendar</li>
                </ul>
              </td></tr>
            </table>
            <p style="margin:0;font-size:13px;color:#71717a;line-height:1.6;">
              Questions? Reply to this email or write to
              <a href="mailto:hello@mygeoradar.com" style="color:#0ea5e9;">hello@mygeoradar.com</a>.
              We offer a full 30-day refund — no questions asked.
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px;border-top:1px solid #e4e4e7;">
            <p style="margin:0;font-size:12px;color:#a1a1aa;">MyGeoRadar · Canton, MA · You received this because you purchased Found by AI.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  })
}
