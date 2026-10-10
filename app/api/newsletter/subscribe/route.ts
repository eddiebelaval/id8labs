import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { checkRateLimit, getRateLimitKey, rateLimitHeaders, RATE_LIMITS } from '@/lib/rate-limit'
import { notifyNewSubscriber } from '@/lib/notifications/new-subscriber'
import { subscriptionListsForSource } from '@/lib/newsletter/subscriptions'
import { NEWSLETTER_NAME } from '@/lib/newsletter/brand'

// Shipped. issue pages POST here from two origins: id8labs.app (weekly,
// same-origin) and eddiebelaval.github.io (daily pages on GitHub Pages,
// cross-origin — these need CORS or the browser blocks the response).
const CORS_ORIGINS = ['https://id8labs.app', 'https://eddiebelaval.github.io']

// Cadences a Shipped. subscriber can pick on the form.
const SHIPPED_CADENCES = ['nightly', 'weekly', 'monthly']

function corsHeaders(request: NextRequest): Record<string, string> {
  const origin = request.headers.get('origin') ?? ''
  if (!CORS_ORIGINS.includes(origin)) return { Vary: 'Origin' }
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  }
}

function sanitizeCadences(raw: unknown): string[] | null {
  if (!Array.isArray(raw)) return null
  const cadences = raw.filter(
    (c): c is string => typeof c === 'string' && SHIPPED_CADENCES.includes(c)
  )
  return cadences.length ? cadences : null
}

// OPTIONS - CORS preflight for the cross-origin Shipped. daily pages
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request) })
}

// POST - Subscribe to newsletter
export async function POST(request: NextRequest) {
  const response = await handleSubscribe(request)
  for (const [key, value] of Object.entries(corsHeaders(request))) {
    response.headers.set(key, value)
  }
  return response
}

async function handleSubscribe(request: NextRequest): Promise<NextResponse> {
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
    const { email, source, name, cadences, website } = await request.json()
    const requestedLists = subscriptionListsForSource(source)
    const publicationName = requestedLists.includes('shipped') ? 'Shipped.' : NEWSLETTER_NAME

    // Honeypot — hidden "website" field on the Shipped. form; humans never
    // see it, bots fill it. Report success so the bot doesn't learn.
    if (typeof website === 'string' && website.trim()) {
      return NextResponse.json({ success: true, message: `Successfully subscribed to ${publicationName}`, isNewSubscriber: true })
    }

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Optional Shipped. form fields. Tolerated pre-migration: inserts and
    // updates retry without them if the columns don't exist yet.
    const subName = typeof name === 'string' ? name.trim().slice(0, 120) : ''
    const subCadences = sanitizeCadences(cadences)
    const shippedFields = {
      ...(subName && { name: subName }),
      ...(subCadences && { cadences: subCadences }),
    }
    // A write naming an unapplied column fails as PostgREST PGRST204 ("Could not
    // find the 'cadences' column ... in the schema cache"), not Postgres 42703
    // ("column ... does not exist"). Match both so the retry without the optional
    // fields fires; prod lacked name/cadences (migration 20260711) and the narrow
    // match turned every magazine signup into a 500.
    const missingColumn = (msg?: string) =>
      /column.*does not exist|could not find the .*column|PGRST204/i.test(msg || '')

    const supabase = createAdminClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    // Check if already subscribed
    const { data: existing, error: lookupError } = await supabase
      .from('newsletter_subscribers')
      .select('id, status')
      .eq('email', email.toLowerCase())
      .single()

    if (lookupError && lookupError.code !== 'PGRST116') {
      console.error('Error checking subscriber:', lookupError)
      return NextResponse.json({ error: 'Could not verify subscription choices' }, { status: 503 })
    }

    if (existing) {
      const { data: current, error: selectError } = await supabase
        .from('newsletter_subscribers')
        .select('lists')
        .eq('id', existing.id)
        .single<{ lists: string[] | null }>()

      if (selectError) {
        console.error('Error reading subscription choices:', selectError)
        return NextResponse.json({ error: 'Could not verify subscription choices' }, { status: 503 })
      }

      // Null is the legacy personal-newsletter membership, not a magazine opt-in.
      const existingLists = current?.lists ?? ['newsletter']
      const mergedLists = Array.from(new Set([...existingLists, ...requestedLists]))
      if (existing.status === 'active' && mergedLists.length === existingLists.length && !Object.keys(shippedFields).length) {
        return NextResponse.json({
          success: true,
          message: 'Already subscribed',
          isNewSubscriber: false,
        })
      }

      const basePayload = {
        status: 'active',
        unsubscribed_at: null as null,
        lists: mergedLists,
      }
      let updateError = (
        await supabase.from('newsletter_subscribers').update({ ...basePayload, ...shippedFields }).eq('id', existing.id)
      ).error
      if (updateError && missingColumn(updateError.message)) {
        updateError = (
          await supabase.from('newsletter_subscribers').update(basePayload).eq('id', existing.id)
        ).error
      }

      if (updateError) {
        console.error('Error resubscribing:', updateError)
        return NextResponse.json(
          { error: 'Failed to save subscription choices' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: existing.status === 'active'
          ? `Successfully subscribed to ${publicationName}`
          : 'Welcome back! You\'ve been resubscribed.',
        isNewSubscriber: false,
      })
    }

    // Each form opts into its own publication. A second signup adds the other.
    const lists = requestedLists

    // Optional profile columns can lag deployment; publication choices must save.
    const baseInsert = {
      email: email.toLowerCase(),
      source: source || 'website',
      status: 'active',
      is_academy_member: false,
    }
    let insertError = (
      await supabase
        .from('newsletter_subscribers')
        .insert({ ...baseInsert, lists, ...shippedFields })
    ).error

    if (insertError && missingColumn(insertError.message)) {
      // name/cadences columns are pre-migration. Retry without them.
      console.warn('[subscribe] name/cadences column not found; inserting without. Apply migration 20260711000000_add_name_cadences_to_subscribers.sql.')
      insertError = (
        await supabase.from('newsletter_subscribers').insert({ ...baseInsert, lists })
      ).error
    }

    if (insertError) {
      console.error('Error subscribing:', insertError)
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      )
    }

    // Fire-and-forget Shipped. notification (Slack + email, no-op for non-shipped sources)
    notifyNewSubscriber({
      email: email.toLowerCase(),
      source: source || 'website',
      subscribedAt: new Date().toISOString(),
    }).catch((err) => console.error('notifyNewSubscriber failed:', err))

    return NextResponse.json({
      success: true,
      message: `Successfully subscribed to ${publicationName}`,
      isNewSubscriber: true,
    })

  } catch (error) {
    console.error('Error in newsletter subscribe:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Unsubscribe from newsletter
export async function DELETE(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const { error: updateError } = await supabase
      .from('newsletter_subscribers')
      .update({
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString(),
      })
      .eq('email', email.toLowerCase())

    if (updateError) {
      console.error('Error unsubscribing:', updateError)
      return NextResponse.json(
        { error: 'Failed to unsubscribe' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed',
    })

  } catch (error) {
    console.error('Error in newsletter unsubscribe:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET - Check subscription status
export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email')

  if (!email) {
    return NextResponse.json(
      { error: 'Email parameter is required' },
      { status: 400 }
    )
  }

  try {
    const supabase = createAdminClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('status, is_academy_member, subscribed_at')
      .eq('email', email.toLowerCase())
      .single()

    if (error || !data) {
      return NextResponse.json({
        isSubscribed: false,
        isAcademyMember: false,
      })
    }

    return NextResponse.json({
      isSubscribed: data.status === 'active',
      isAcademyMember: data.is_academy_member,
      subscribedAt: data.subscribed_at,
    })

  } catch (error) {
    console.error('Error checking subscription:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
