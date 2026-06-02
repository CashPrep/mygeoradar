// ─────────────────────────────────────────────────────────────────────────────
// MyGeoRadar — Email nurture sequence templates
// All 5 emails sent via Resend → from: hello@mygeoradar.com
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.mygeoradar.com'

function footer(unsubUrl: string) {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:40px;border-top:1px solid #e4e4e7;padding-top:20px">
      <tr>
        <td align="center" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:12px;color:#a1a1aa;line-height:1.8">
          MyGeoRadar &middot; Canton, MA 02021 &middot;
          <a href="mailto:hello@mygeoradar.com" style="color:#a1a1aa">hello@mygeoradar.com</a><br/>
          You received this because you ran a free AI readiness scan on our site.<br/>
          <a href="${unsubUrl}" style="color:#a1a1aa;text-decoration:underline">Unsubscribe</a>
        </td>
      </tr>
    </table>
  `
}

function wrap(body: string, unsubUrl: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>MyGeoRadar</title></head>
<body style="margin:0;padding:0;background:#f4f4f5">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;border:1px solid #e4e4e7;overflow:hidden">
        <tr><td style="background:#0f172a;padding:20px 32px">
          <a href="${BASE_URL}" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:18px;font-weight:800;color:#ffffff;text-decoration:none">MyGeoRadar</a>
        </td></tr>
        <tr><td style="padding:36px 32px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:15px;color:#18181b;line-height:1.7">
          ${body}
          ${footer(unsubUrl)}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function h1(text: string) {
  return `<h1 style="margin:0 0 20px;font-size:24px;font-weight:800;color:#0f172a;line-height:1.3">${text}</h1>`
}
function p(text: string) {
  return `<p style="margin:0 0 16px">${text}</p>`
}
function cta(text: string, href: string) {
  return `
    <table cellpadding="0" cellspacing="0" style="margin:24px 0">
      <tr><td style="background:#01696f;border-radius:8px">
        <a href="${href}" style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none">${text}</a>
      </td></tr>
    </table>
  `
}
function scoreBlock(score: number, url: string) {
  const color = score >= 80 ? '#10b981' : score >= 55 ? '#f59e0b' : '#ef4444'
  const label = score >= 80 ? 'AI-Ready' : score >= 55 ? 'Partially Visible' : 'Hard to Read'
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;background:#f8fafc;border:1px solid #e4e4e7;border-radius:10px">
      <tr><td style="padding:18px 22px">
        <p style="margin:0 0 4px;font-size:12px;color:#71717a;font-weight:600;text-transform:uppercase;letter-spacing:0.06em">Your AI Readiness Score</p>
        <p style="margin:0;font-size:36px;font-weight:900;color:${color}">${score}<span style="font-size:16px;color:#71717a">/100</span></p>
        <p style="margin:4px 0 0;font-size:13px;font-weight:600;color:${color}">${label}</p>
        <p style="margin:6px 0 0;font-size:12px;color:#71717a">${url}</p>
      </td></tr>
    </table>
  `
}

// ─────────────────────────────────────────────────────────────────────────────
// EMAIL 1 — Immediate: scan results
// ─────────────────────────────────────────────────────────────────────────────
export function email1_scanResults(opts: {
  score: number; url: string; failCount: number; warnCount: number; unsubUrl: string
}) {
  const { score, url, failCount, warnCount, unsubUrl } = opts
  const issueCount = failCount + warnCount
  const subject = score >= 80
    ? `Your AI readiness score: ${score}/100 ✅`
    : `Your AI readiness score: ${score}/100 — ${issueCount} issue${issueCount !== 1 ? 's' : ''} found`

  const body = `
    ${h1('Here are your AI readiness scan results.')}
    ${p(`You just ran a free AI readiness scan on <strong>${url}</strong>. Here's what we found.`)}
    ${scoreBlock(score, url)}
    ${score >= 80
      ? p('Your site\'s technical structure is solid. But technical signals are only one layer of AI visibility. The businesses that actually get recommended by ChatGPT, Perplexity, and Gemini have also built content authority, citation presence, and review signals — the rest of the system.')
      : p(`Your site has <strong>${failCount} critical issue${failCount !== 1 ? 's' : ''}</strong>${warnCount > 0 ? ` and <strong>${warnCount} warning${warnCount !== 1 ? 's' : ''}</strong>` : ''}. These are the signals AI crawlers use to decide whether your business is trustworthy enough to recommend. Right now, yours are sending the wrong signals.`)}
    ${p('The <strong>Found by AI Playbook</strong> gives you the complete step-by-step system to fix every gap — a 27-point checklist, 10 copy-paste audit prompts, and a 30-day action plan. One time, $27.')}
    ${cta('Get the Playbook — $27 →', `${BASE_URL}/playbook`)}
    ${p('Reply to this email with any questions.<br/>— The MyGeoRadar Team')}
  `
  return { subject, html: wrap(body, unsubUrl) }
}

// ─────────────────────────────────────────────────────────────────────────────
// EMAIL 2 — Day 1: Problem agitation
// ─────────────────────────────────────────────────────────────────────────────
export function email2_problemAgitation(opts: {
  score: number; url: string; unsubUrl: string
}) {
  const { score, url, unsubUrl } = opts
  const subject = `Someone just asked ChatGPT about your industry. Did you show up?`
  const body = `
    ${h1('Someone is asking AI about your industry right now.')}
    ${p('Open a new tab and type this into ChatGPT or Perplexity:')}
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0">
      <tr><td style="background:#f1f5f9;border-left:3px solid #01696f;border-radius:0 6px 6px 0;padding:14px 18px;font-family:monospace;font-size:13px;color:#1e293b">
        &ldquo;Who are the most trusted [your type of business] in [your city]?&rdquo;
      </td></tr>
    </table>
    ${p('If your business isn\'t in the answer, that potential customer was just sent to a competitor.')}
    ${p(`Yesterday your site scored <strong>${score}/100</strong> on our AI readiness scan for <strong>${url}</strong>. That score reflects how well AI systems can read, understand, and trust your site right now.`)}
    ${p('The Found by AI Playbook walks you through fixing all of it. One time, $27.')}
    ${cta('Fix My AI Visibility — $27 →', `${BASE_URL}/playbook`)}
    ${p('— The MyGeoRadar Team')}
  `
  return { subject, html: wrap(body, unsubUrl) }
}

// ─────────────────────────────────────────────────────────────────────────────
// EMAIL 3 — Day 2: Solution + soft pitch
// ─────────────────────────────────────────────────────────────────────────────
export function email3_solution(opts: {
  score: number; unsubUrl: string
}) {
  const { score, unsubUrl } = opts
  const subject = `The 3 things that actually make AI recommend your business`
  const body = `
    ${h1('What actually makes AI recommend a business?')}
    ${p('After analyzing hundreds of sites, the businesses that get recommended by ChatGPT, Perplexity, Gemini, and Claude consistently have three things in common:')}
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0">
      <tr><td style="padding:0">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:12px 0;border-bottom:1px solid #f1f5f9">
            <p style="margin:0"><strong style="color:#01696f">1. Structured authority signals.</strong> Schema markup, clear entity definition, and consistent NAP data across the web. AI uses these to verify you\'re a real, legitimate business.</p>
          </td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #f1f5f9">
            <p style="margin:0"><strong style="color:#01696f">2. Citation presence.</strong> Being mentioned on directories, publications, and platforms that AI systems are trained on. This is the single biggest driver of AI recommendations.</p>
          </td></tr>
          <tr><td style="padding:12px 0">
            <p style="margin:0"><strong style="color:#01696f">3. Content that AI can quote.</strong> Specific, authoritative pages that answer the exact questions AI users are asking about your category.</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
    ${p(`Your scan score was <strong>${score}/100</strong>. The playbook gives you the exact checklist and 30-day action plan to build all three — no agency needed.`)}
    ${p('$27. One time. Most businesses spend that on a single ad that nobody remembers. This compounds forever.')}
    ${cta('Get the Found by AI Playbook →', `${BASE_URL}/playbook`)}
    ${p('— The MyGeoRadar Team')}
  `
  return { subject, html: wrap(body, unsubUrl) }
}

// ─────────────────────────────────────────────────────────────────────────────
// EMAIL 4 — Day 4: Social proof + hard pitch
// ─────────────────────────────────────────────────────────────────────────────
export function email4_socialProof(opts: { unsubUrl: string }) {
  const { unsubUrl } = opts
  const subject = `"I went from invisible to recommended in 3 weeks"`
  const body = `
    ${h1('What happens when you actually fix this.')}
    ${p('Here\'s the pattern we see over and over:')}
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0">
      <tr><td style="background:#f0fafa;border:1px solid #b2d8d8;border-radius:10px;padding:20px 24px">
        <p style="margin:0 0 10px;font-size:24px">&ldquo;</p>
        <p style="margin:0 0 12px;font-size:15px;color:#1e293b;line-height:1.7">I ran the scan, got a 34/100, and honestly didn't expect much. Worked through the playbook over 3 weekends. Checked ChatGPT again last week — my business showed up in 3 out of 5 prompts I tested. Before it was zero.</p>
        <p style="margin:0;font-size:13px;color:#71717a">— Marketing consultant, Boston MA</p>
      </td></tr>
    </table>
    ${p('The playbook is a structured system that tells AI exactly what your business is, why it\'s credible, and when to recommend it. Most people complete the core checklist in 2–3 weekends.')}
    ${p('$27. One time. No subscription.')}
    ${cta('Get Instant Access — $27 →', `${BASE_URL}/playbook`)}
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 16px">
      <tr><td style="padding:8px 0;font-size:14px">✅ &nbsp;27-point AI visibility checklist</td></tr>
      <tr><td style="padding:8px 0;font-size:14px">✅ &nbsp;10 copy-paste audit prompts</td></tr>
      <tr><td style="padding:8px 0;font-size:14px">✅ &nbsp;30-day action plan calendar</td></tr>
      <tr><td style="padding:8px 0;font-size:14px">✅ &nbsp;30-day money-back guarantee</td></tr>
    </table>
    ${p('— The MyGeoRadar Team')}
  `
  return { subject, html: wrap(body, unsubUrl) }
}

// ─────────────────────────────────────────────────────────────────────────────
// EMAIL 5 — Day 7: Last chance
// ─────────────────────────────────────────────────────────────────────────────
export function email5_lastChance(opts: {
  score: number; url: string; unsubUrl: string
}) {
  const { score, url, unsubUrl } = opts
  const subject = `Last note from me about your AI visibility`
  const body = `
    ${h1('I\'ll keep this short.')}
    ${p(`A week ago you scanned <strong>${url}</strong> and got a <strong>${score}/100</strong> AI readiness score.`)}
    ${p('Every week you wait, competitors who are doing this get more deeply embedded in AI training data and citation networks. It gets harder to displace them.')}
    ${p('AI search is not slowing down. The businesses that act in the next 90 days will have a compounding advantage over everyone who waits.')}
    ${p('The playbook is $27. One time. 30-day money-back guarantee. This is the last email I\'ll send about it.')}
    ${cta('Get the Playbook — $27 →', `${BASE_URL}/playbook`)}
    ${p('Whatever you decide — good luck.<br/>— The MyGeoRadar Team')}
  `
  return { subject, html: wrap(body, unsubUrl) }
}
