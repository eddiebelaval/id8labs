import { Resend } from 'resend'

interface NewSubscriberNotification {
  email: string
  source: string
  subscribedAt?: string
}

const SHIPPED_PREFIX = 'shipped-magazine-'

function formatIssueName(source: string): string {
  if (!source.startsWith(SHIPPED_PREFIX)) return source
  const rest = source.replace(SHIPPED_PREFIX, '')
  return rest.replace(/^issue-/, 'Issue ').replace(/-/g, ' ')
}

async function pingSlack(payload: NewSubscriberNotification): Promise<void> {
  const webhook = process.env.SLACK_SHIPPED_WEBHOOK_URL
  if (!webhook) return

  const issue = formatIssueName(payload.source)
  const text = `New Shipped. subscriber — *${payload.email}* via *${issue}*`

  await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      blocks: [
        {
          type: 'section',
          text: { type: 'mrkdwn', text },
        },
        {
          type: 'context',
          elements: [
            { type: 'mrkdwn', text: `Source: \`${payload.source}\`` },
            { type: 'mrkdwn', text: `Subscribed: ${payload.subscribedAt || new Date().toISOString()}` },
          ],
        },
      ],
    }),
  })
}

let resendClient: Resend | null = null
function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null
  if (!resendClient) resendClient = new Resend(process.env.RESEND_API_KEY)
  return resendClient
}

async function pingEmail(payload: NewSubscriberNotification): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL
  const resend = getResend()
  if (!adminEmail || !resend) return

  const issue = formatIssueName(payload.source)

  await resend.emails.send({
    from: 'Shipped. <hello@id8labs.tech>',
    to: adminEmail,
    subject: `New Shipped. subscriber — ${issue}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px;">
        <h2 style="margin: 0 0 16px; font-size: 18px; color: #1a1a1a;">New Shipped. subscriber</h2>
        <p style="margin: 0 0 8px; font-size: 15px; color: #1a1a1a;">
          <strong>${payload.email}</strong>
        </p>
        <p style="margin: 0 0 16px; font-size: 13px; color: #6b6b6b;">
          via <code style="background: #f5f5f5; padding: 2px 6px; border-radius: 3px;">${payload.source}</code> — ${issue}
        </p>
        <p style="margin: 0; font-size: 12px; color: #999;">
          Subscribed: ${payload.subscribedAt || new Date().toISOString()}
        </p>
        <hr style="margin: 24px 0; border: 0; border-top: 1px solid #e5e5e5;">
        <p style="margin: 0; font-size: 12px; color: #999;">
          <a href="https://id8labs.app/admin/newsletter/shipped" style="color: #FF6B35;">Open Shipped. dashboard →</a>
        </p>
      </div>
    `,
  })
}

/**
 * Fire-and-forget notification for new Shipped. subscribers.
 * Only pings for sources starting with `shipped-magazine-`.
 * Never throws — logs on failure and continues.
 */
export async function notifyNewSubscriber(payload: NewSubscriberNotification): Promise<void> {
  if (!payload.source.startsWith(SHIPPED_PREFIX)) return

  const results = await Promise.allSettled([pingSlack(payload), pingEmail(payload)])
  for (const r of results) {
    if (r.status === 'rejected') {
      console.error('notifyNewSubscriber:', r.reason)
    }
  }
}
