import { Resend } from 'resend'
import { formatPrice, type Workshop } from '@/lib/workshops'

/**
 * Fire-and-forget notification for new workshop interest. When someone
 * registers for a workshop, this pings you so you can confirm them into the
 * cohort. Email goes to WORKSHOP_NOTIFY_EMAIL (default eb@id8labs.tech); an
 * optional Slack ping fires if SLACK_WORKSHOP_WEBHOOK_URL is set.
 *
 * Never throws — logs on failure and continues, so a notification problem
 * can't break the registrant's confirmation.
 */

export interface WorkshopInterest {
  workshop: Workshop
  name: string
  email: string
  company?: string
  role?: string
  /** Which seat they want: in-person (Miami) or remote. */
  attendance?: string
  notes?: string
  registeredAt?: string
}

const NOTIFY_FALLBACK = 'eb@id8labs.tech'

function notifyAddress(): string {
  return process.env.WORKSHOP_NOTIFY_EMAIL || process.env.ADMIN_EMAIL || NOTIFY_FALLBACK
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

let resendClient: Resend | null = null
function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null
  if (!resendClient) resendClient = new Resend(process.env.RESEND_API_KEY)
  return resendClient
}

async function pingSlack(interest: WorkshopInterest): Promise<void> {
  const webhook = process.env.SLACK_WORKSHOP_WEBHOOK_URL
  if (!webhook) return

  const { workshop, name, email, company, attendance } = interest
  const text = `New workshop interest — *${name}* (${email}) for *${workshop.name}*`

  await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      blocks: [
        { type: 'section', text: { type: 'mrkdwn', text } },
        {
          type: 'context',
          elements: [
            { type: 'mrkdwn', text: company ? `Company: ${company}` : 'Company: —' },
            { type: 'mrkdwn', text: `Seat: ${attendance || '—'}` },
            { type: 'mrkdwn', text: `Registered: ${interest.registeredAt || new Date().toISOString()}` },
          ],
        },
      ],
    }),
  })
}

async function pingEmail(interest: WorkshopInterest): Promise<void> {
  const resend = getResend()
  if (!resend) return

  const { workshop, name, email, company, role, attendance, notes } = interest
  const registeredAt = interest.registeredAt || new Date().toISOString()

  const row = (label: string, value?: string) =>
    value
      ? `<tr>
           <td style="padding: 6px 16px 6px 0; font-size: 13px; color: #999; white-space: nowrap; vertical-align: top;">${label}</td>
           <td style="padding: 6px 0; font-size: 14px; color: #1a1a1a;">${escapeHtml(value)}</td>
         </tr>`
      : ''

  await resend.emails.send({
    from: 'ID8Labs Workshops <hello@id8labs.tech>',
    to: notifyAddress(),
    replyTo: email,
    subject: `Workshop interest — ${name} · ${workshop.name}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
        <p style="margin: 0 0 4px; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #FF6B35;">New workshop interest</p>
        <h2 style="margin: 0 0 20px; font-size: 20px; color: #1a1a1a;">${escapeHtml(name)} wants in on ${escapeHtml(workshop.name)}</h2>
        <table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
          ${row('Name', name)}
          ${row('Email', email)}
          ${row('Company', company)}
          ${row('Role', role)}
          ${row('Seat', attendance)}
          ${row('Workshop', `${workshop.name} — ${formatPrice(workshop)}, ${workshop.format}`)}
          ${row('Notes', notes)}
          ${row('Registered', registeredAt)}
        </table>
        <hr style="margin: 24px 0; border: 0; border-top: 1px solid #e5e5e5;">
        <p style="margin: 0; font-size: 13px; color: #6b6b6b;">
          Reply to this email to reach ${escapeHtml(name)} directly and confirm their seat.
        </p>
      </div>
    `,
  })
}

export async function notifyWorkshopInterest(interest: WorkshopInterest): Promise<void> {
  const results = await Promise.allSettled([pingSlack(interest), pingEmail(interest)])
  for (const r of results) {
    if (r.status === 'rejected') {
      console.error('notifyWorkshopInterest:', r.reason)
    }
  }
}
