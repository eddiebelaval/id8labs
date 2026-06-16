import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { checkRateLimit, getRateLimitKey, rateLimitHeaders, RATE_LIMITS } from '@/lib/rate-limit'
import { notifyNewSubscriber } from '@/lib/notifications/new-subscriber'

// POST - Subscribe to newsletter
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
    const { email, source } = await request.json()

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
              .update({ ...basePayload, lists: mergedLists })
              .eq('id', existing.id)
          ).error
          if (updateError && /column.*lists.*does not exist/i.test(updateError.message || '')) {
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
        .insert({ ...baseInsert, lists })
    ).error

    if (insertError && /column.*lists.*does not exist/i.test(insertError.message || '')) {
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
