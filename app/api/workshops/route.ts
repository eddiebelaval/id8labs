import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { isValidEmail } from '@/lib/validation'
import { checkRateLimit, getRateLimitKey, rateLimitHeaders, RATE_LIMITS } from '@/lib/rate-limit'
import { getWorkshop, formatPrice, schedulingSummary, type Workshop } from '@/lib/workshops'
import { notifyWorkshopInterest } from '@/lib/notifications/workshop-interest'

// Initialize Resend lazily to avoid build-time errors
let resend: Resend | null = null

function getResend(): Resend {
  if (!resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured')
    }
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

interface WorkshopRegistrationPayload {
  workshopSlug: string
  name: string
  email: string
  company?: string
  role?: string
  /** 'in-person' (Miami) or 'virtual'. */
  attendance?: string
  notes?: string
}

export async function POST(request: NextRequest) {
  // Rate limit check
  const rateLimitKey = getRateLimitKey(request)
  const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMITS.publicForm)

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: rateLimitHeaders(rateLimit, RATE_LIMITS.publicForm) }
    )
  }

  try {
    const body: WorkshopRegistrationPayload = await request.json()
    const { workshopSlug, name, email, company, role, attendance, notes } = body

    // Validate required fields
    if (!workshopSlug || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Email validation
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Workshop must exist
    const workshop = getWorkshop(workshopSlug)
    if (!workshop) {
      return NextResponse.json({ error: 'Unknown workshop' }, { status: 400 })
    }

    const registeredAt = new Date().toISOString()

    // 1. Notify the host first — this is the "I got interest" ping. It never
    //    throws, so a notification hiccup can't cost us the registration.
    await notifyWorkshopInterest({
      workshop,
      name,
      email,
      company,
      role,
      attendance,
      notes,
      registeredAt,
    })

    // 2. Confirm to the registrant.
    const { data, error } = await getResend().emails.send({
      from: 'ID8Labs Workshops <hello@id8labs.tech>',
      to: email,
      subject: `You're on the list for ${workshop.name}`,
      html: generateConfirmationEmail(workshop, name, attendance),
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    // 3. Best-effort: add to the audience for future updates.
    try {
      await getResend().contacts.create({
        email,
        firstName: name,
        unsubscribed: false,
        audienceId: process.env.RESEND_AUDIENCE_ID || '',
      })
    } catch (contactError) {
      console.log('Could not add to audience:', contactError)
    }

    return NextResponse.json({ success: true, messageId: data?.id })
  } catch (error) {
    console.error('Workshop registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function generateConfirmationEmail(workshop: Workshop, name: string, attendance?: string): string {
  const safeName = escapeHtml(name)
  const seat = attendance === 'in-person' ? 'In person, in Miami' : attendance === 'virtual' ? 'Remote' : null

  const detail = (label: string, value: string) => `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px; color: #999; width: 40%;">${label}</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px; color: #1a1a1a;">${value}</td>
    </tr>`

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're on the list for ${escapeHtml(workshop.name)}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #fafaf7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td style="padding: 40px 30px; text-align: center; background-color: #0b0b0b;">
        <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: bold;">
          <span style="color: #FF6B35;">id8</span>Labs
        </h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 30px;">
        <p style="margin: 0 0 6px; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #FF6B35;">Workshop · Interest received</p>
        <h2 style="margin: 0 0 20px; color: #0b0b0b; font-size: 24px;">You're on the list, ${safeName}.</h2>

        <p style="margin: 0 0 24px; color: #5a5a5a; font-size: 16px; line-height: 1.65;">
          Thanks for registering your interest in <strong>${escapeHtml(workshop.name)}</strong>. ${escapeHtml(schedulingSummary(workshop))}
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafaf7; border-radius: 12px; margin-bottom: 28px;">
          <tr><td style="padding: 6px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${detail('Workshop', escapeHtml(workshop.name))}
              ${detail('Format', workshop.format === 'hybrid' ? 'Hybrid — in person (Miami) or remote' : escapeHtml(workshop.format))}
              ${seat ? detail('Your seat', seat) : ''}
              ${detail('Length', escapeHtml(workshop.duration))}
              ${detail('Price', formatPrice(workshop))}
            </table>
          </td></tr>
        </table>

        <h3 style="margin: 0 0 12px; color: #0b0b0b; font-size: 16px;">What happens next</h3>
        <p style="margin: 0 0 24px; color: #5a5a5a; font-size: 15px; line-height: 1.65;">
          I read every registration myself. I'll reach out to confirm your seat and lock the date — and to make sure the room is the right fit before you commit anything.
        </p>

        <p style="margin: 0; color: #5a5a5a; font-size: 15px; line-height: 1.65;">
          Questions in the meantime? Just reply to this email, or reach me at
          <a href="mailto:eb@id8labs.tech" style="color: #FF6B35; text-decoration: none;">eb@id8labs.tech</a>.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 28px 30px; background-color: #fafaf7; text-align: center;">
        <p style="margin: 0 0 8px; color: #5a5a5a; font-size: 13px;">ID8Labs — Professional tools for the AI era</p>
        <p style="margin: 0; color: #999; font-size: 12px;">
          Miami, FL • <a href="https://id8labs.app" style="color: #999;">id8labs.app</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`
}
