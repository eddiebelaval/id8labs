import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

// POST /api/newsletter/send-shipped — send a Shipped. issue as the email body.
//
// The pipeline stages an email-safe render of each issue at
// public/shipped/NN/email.html (shipped repo, `pnpm render:email`). This route
// fetches that artifact from our own public URL and sends it via Resend to
// active subscribers on the `shipped` list, filtered by cadence, logging each
// send to newsletter_sends under the Shipped issue namespace (1000 + NN, see
// migration 20260423120000_shipped_list_and_sends.sql).
//
// The human gate stays human: this route only fires when Eddie calls it
// (admin session or ADMIN_SECRET bearer), and test mode sends to one address.
// Re-runs are idempotent — anyone already logged for the issue is skipped.

const EMAIL_FROM = 'Shipped. <hello@id8labs.tech>'
const SITE_ORIGIN = process.env.NEXT_PUBLIC_APP_URL || 'https://id8labs.app'
const SHIPPED_ISSUE_NAMESPACE = 1000
const CADENCES = ['nightly', 'weekly', 'monthly'] as const
type Cadence = (typeof CADENCES)[number]

const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables')
  }
  return createClient(supabaseUrl, supabaseServiceKey)
}

const getResend = () => {
  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    throw new Error('Missing RESEND_API_KEY')
  }
  return new Resend(resendApiKey)
}

// Same access rule as /api/newsletter/send: ADMIN_SECRET/CRON_SECRET bearer
// for scripts, or an admin session for the UI.
async function verifyAdminAccess(request: NextRequest): Promise<boolean> {
  const authHeader = request.headers.get('authorization')
  const adminSecret = process.env.ADMIN_SECRET || process.env.CRON_SECRET
  if (adminSecret && authHeader === `Bearer ${adminSecret}`) return true

  const { createServerClient } = await import('@supabase/ssr')
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return request.cookies.getAll() }, setAll() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user?.email === process.env.ADMIN_EMAIL
}

interface Subscriber {
  email: string
  cadences: string[] | null
}

// Fetch subscribers on the shipped list matching a cadence. NULL cadences
// means "no preference recorded" and gets the form default (nightly+weekly).
// Tolerates a pre-migration schema where the cadences column doesn't exist.
async function fetchShippedSubscribers(
  supabase: ReturnType<typeof getSupabase>,
  cadence: Cadence
): Promise<{ subscribers: Subscriber[]; error?: string }> {
  const base = () =>
    supabase
      .from('newsletter_subscribers')
      .select('email, cadences')
      .eq('status', 'active')
      .contains('lists', ['shipped'])

  const { data, error } = await base().or(`cadences.is.null,cadences.cs.{${cadence}}`)
  if (!error) return { subscribers: (data ?? []) as Subscriber[] }

  if (/column.*does not exist/i.test(error.message || '')) {
    // cadences column pre-migration: everyone on the shipped list gets the
    // default treatment. Select without the column.
    const { data: plain, error: plainError } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('status', 'active')
      .contains('lists', ['shipped'])
    if (plainError) return { subscribers: [], error: plainError.message }
    return {
      subscribers: ((plain ?? []) as Array<{ email: string }>).map((s) => ({
        email: s.email,
        cadences: null,
      })),
    }
  }
  return { subscribers: [], error: error.message }
}

// NULL cadences → the form default (nightly + weekly).
function wantsCadence(subscriber: Subscriber, cadence: Cadence): boolean {
  if (!subscriber.cadences || subscriber.cadences.length === 0) {
    return cadence === 'nightly' || cadence === 'weekly'
  }
  return subscriber.cadences.includes(cadence)
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdminAccess(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { issue, cadence: rawCadence, testEmail, subject: subjectOverride } = await request.json()

    const issueNum = Number(issue)
    if (!Number.isInteger(issueNum) || issueNum < 0 || issueNum > 999) {
      return NextResponse.json(
        { error: 'issue must be an integer 0-999 (the Shipped. issue number)' },
        { status: 400 }
      )
    }
    const cadence: Cadence = CADENCES.includes(rawCadence) ? rawCadence : 'weekly'

    // Fetch the staged email render from our own public tree. The URL is
    // built from a bounds-checked integer only — no caller-controlled paths.
    const padded = String(issueNum).padStart(2, '0')
    const emailUrl = `${SITE_ORIGIN}/shipped/${padded}/email.html`
    const htmlRes = await fetch(emailUrl, { cache: 'no-store' })
    if (!htmlRes.ok) {
      return NextResponse.json(
        { error: `No staged email render at ${emailUrl} (${htmlRes.status}). Run pnpm render:email in the pipeline and deploy first.` },
        { status: 404 }
      )
    }
    const html = await htmlRes.text()

    const titleMatch = html.match(/<title>([^<]+)<\/title>/i)
    const subject = subjectOverride || titleMatch?.[1] || `Shipped. ${padded}`
    const namespacedIssue = SHIPPED_ISSUE_NAMESPACE + issueNum

    const resend = getResend()
    const headers = {
      'List-Unsubscribe': '<mailto:hello@id8labs.tech?subject=unsubscribe>',
    }

    // Test mode — one address, no logging.
    if (testEmail) {
      const { error: sendError } = await resend.emails.send({
        from: EMAIL_FROM,
        to: testEmail,
        subject: `[TEST] ${subject}`,
        html,
        headers,
      })
      if (sendError) {
        return NextResponse.json({ error: `Failed to send test: ${sendError.message}` }, { status: 500 })
      }
      return NextResponse.json({
        success: true,
        mode: 'test',
        message: `Test email sent to ${testEmail}`,
        subject,
        sizeKb: Math.round(Buffer.byteLength(html, 'utf-8') / 102.4) / 10,
      })
    }

    const supabase = getSupabase()

    const { subscribers, error: fetchError } = await fetchShippedSubscribers(supabase, cadence)
    if (fetchError) {
      console.error('Error fetching shipped subscribers:', fetchError)
      return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 })
    }

    // Idempotent re-runs: skip anyone already logged for this issue.
    const { data: priorSends } = await supabase
      .from('newsletter_sends')
      .select('email')
      .eq('issue_number', namespacedIssue)
    const alreadySent = new Set(
      ((priorSends ?? []) as Array<{ email: string }>).map((s) => s.email.toLowerCase())
    )

    const targets = subscribers.filter(
      (s) => wantsCadence(s, cadence) && !alreadySent.has(s.email.toLowerCase())
    )

    const results = {
      total: targets.length,
      skippedAlreadySent: alreadySent.size,
      sent: 0,
      failed: 0,
      errors: [] as string[],
    }

    if (targets.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No subscribers to send to (empty list or all already sent).',
        results,
      })
    }

    for (const subscriber of targets) {
      try {
        const { error: sendError } = await resend.emails.send({
          from: EMAIL_FROM,
          to: subscriber.email,
          subject,
          html,
          headers,
        })
        if (sendError) {
          results.failed++
          results.errors.push(`${subscriber.email}: ${sendError.message}`)
          continue
        }
        results.sent++
        await supabase.from('newsletter_sends').insert({
          email: subscriber.email,
          issue_number: namespacedIssue,
          sent_at: new Date().toISOString(),
          is_academy_version: false,
        })
      } catch (error) {
        results.failed++
        results.errors.push(`${subscriber.email}: ${String(error)}`)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Shipped. ${padded} sent to ${results.sent}/${results.total} subscribers (${cadence})`,
      subject,
      results,
    })
  } catch (error) {
    console.error('Error sending Shipped. issue:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    )
  }
}

// GET — usage instructions.
export async function GET() {
  return NextResponse.json({
    instructions: {
      testSend: 'POST with { issue: 2, testEmail: "you@example.com" } — sends the staged email render of Issue 02 to one address, no logging',
      productionSend: 'POST with { issue: 2 } — sends to active `shipped`-list subscribers wanting the weekly cadence; re-runs skip anyone already sent',
      options: 'cadence: "nightly" | "weekly" (default) | "monthly"; subject: override the <title>-derived subject',
      auth: 'Authorization: Bearer <ADMIN_SECRET>, or an admin session',
      prerequisite: 'The pipeline must have staged public/shipped/NN/email.html (pnpm render:email) and it must be deployed',
    },
  })
}
