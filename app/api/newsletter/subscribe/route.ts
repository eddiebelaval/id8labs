import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { checkRateLimit, getRateLimitKey, rateLimitHeaders, RATE_LIMITS } from '@/lib/rate-limit'
import { notifyNewSubscriber } from '@/lib/notifications/new-subscriber'

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

    // Honeypot — hidden "website" field on the Shipped. form; humans never
    // see it, bots fill it. Report success so the bot doesn't learn.
    if (typeof website === 'string' && website.trim()) {
      return NextResponse.json({ success: true, message: 'Successfully subscribed to Shipped.!', isNewSubscriber: true })
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
    const missingColumn = (msg?: string) => /column.*does not exist/i.test(msg || '')

    const supabase = createAdminClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    // Check if already subscribed
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id, status')
      .eq('email', email.toLowerCase())
      .single()

    if (existing) {
      if (existing.status === 'active') {
        return NextResponse.json({
          success: true,
          message: 'Already subscribed',
          isNewSubscriber: false,
        })
      }

      // Resubscribe if previously unsubscribed. If source starts with
      // 'shipped', also ensure they're on the Shipped. list (idempotent).
      // Tolerant of pre-migration schema where `lists` column doesn't exist.
      const srcLower = (source || 'website').toLowerCase()
      const basePayload = {
        status: 'active',
        unsubscribed_at: null as null,
      }
      let updateError: { message?: string } | null = null
      if (srcLower.startsWith('shipped')) {
        const { data: current, error: selectError } = await supabase
          .from('newsletter_subscribers')
          .select('lists')
          .eq('id', existing.id)
          .single<{ lists: string[] | null }>()
        if (selectError && !/column.*lists.*does not exist/i.test(selectError.message || '')) {
          updateError = selectError
        } else {
          const existingLists: string[] = current?.lists ?? ['newsletter']
          const mergedLists = existingLists.includes('shipped')
            ? existingLists
            : [...existingLists, 'shipped']
          updateError = (
            await supabase
              .from('newsletter_subscribers')
              .update({ ...basePayload, lists: mergedLists, ...shippedFields })
              .eq('id', existing.id)
          ).error
          if (updateError && missingColumn(updateError.message)) {
            updateError = (
              await supabase
                .from('newsletter_subscribers')
                .update({ ...basePayload, lists: mergedLists })
                .eq('id', existing.id)
            ).error
          }
          if (updateError && missingColumn(updateError.message)) {
            updateError = (
              await supabase.from('newsletter_subscribers').update(basePayload).eq('id', existing.id)
            ).error
          }
        }
      } else {
        updateError = (
          await supabase.from('newsletter_subscribers').update(basePayload).eq('id', existing.id)
        ).error
      }

      if (updateError) {
        console.error('Error resubscribing:', updateError)
        return NextResponse.json(
          { error: 'Failed to resubscribe' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Welcome back! You\'ve been resubscribed.',
        isNewSubscriber: false,
      })
    }

    // Determine which lists this subscriber lands on. Shipped-sourced
    // signups opt into both the Shipped. weekly and the general newsletter
    // by default; non-Shipped sources are newsletter-only.
    const srcLower = (source || 'website').toLowerCase()
    const lists = srcLower.startsWith('shipped')
      ? ['newsletter', 'shipped']
      : ['newsletter']

    // New subscriber — try with lists column first (post-migration). If the
    // column doesn't exist yet (code ahead of migration), retry without.
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

    if (insertError && missingColumn(insertError.message)) {
      // Schema is pre-migration. Insert without lists; list segmentation
      // is recoverable from source after migration lands.
      console.warn('[subscribe] newsletter_subscribers.lists not found; inserting without. Apply migration 20260423120000_shipped_list_and_sends.sql.')
      insertError = (await supabase.from('newsletter_subscribers').insert(baseInsert)).error
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
      message: 'Successfully subscribed to Shipped.!',
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
