'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { PRODUCTS } from '@/lib/products'
import { Container, Kicker, Deck, Rule, EditorialButton } from '@/components/editorial'

const CalendarIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

const MailIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

const BookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
)

function NextStep({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <li className="flex items-start gap-4 border-b border-[var(--hair)] pb-5 last:border-b-0 last:pb-0">
      <span className="mt-0.5 shrink-0 text-id8-orange">{icon}</span>
      <div>
        <p className="font-[family-name:var(--font-narrow)] text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--ink)]">
          {title}
        </p>
        <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--body)]">{body}</p>
      </div>
    </li>
  )
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')

  // Get product info based on type
  const product = type ? PRODUCTS[type] : null

  // Determine what type of success this is
  const isBooking = product?.purchaseType === 'booking'
  const isCourse = product?.purchaseType === 'stripe'

  return (
    <Container narrow>
      <div className="pt-24 pb-24 md:pt-28">
        <Kicker dot className="mb-5">
          {isBooking ? 'Booking confirmed' : isCourse ? 'Enrollment confirmed' : 'Request received'}
        </Kicker>

        <h1 className="mb-6 font-[family-name:var(--font-display)] font-normal leading-[1.02] tracking-[-0.03em] text-[var(--ink)] text-[clamp(2.5rem,5.5vw,4rem)]">
          {isBooking ? (
            <>You&apos;re <em className="italic font-normal text-id8-orange">booked.</em></>
          ) : isCourse ? (
            <>Welcome <em className="italic font-normal text-id8-orange">aboard.</em></>
          ) : (
            <><em className="italic font-normal text-id8-orange">Got it.</em></>
          )}
        </h1>

        {product?.name ? (
          <Deck className="mb-10">
            Thank you for choosing {product.name}.
          </Deck>
        ) : (
          <Deck className="mb-10">Your request has been received.</Deck>
        )}

        <Rule className="mb-10" />

        <p className="mb-7 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
          What happens next
        </p>

        <ul className="mb-12 space-y-5">
          {isBooking && (
            <>
              <NextStep
                icon={<CalendarIcon />}
                title="Check your calendar"
                body="You'll receive a calendar invite with the session details and Zoom link."
              />
              <NextStep
                icon={<MailIcon />}
                title="Prep materials incoming"
                body="I'll send you a short questionnaire to make our time together as valuable as possible."
              />
            </>
          )}

          {isCourse && (
            <>
              <NextStep
                icon={<BookIcon />}
                title="Your access is active"
                body="All course modules are now unlocked. Start with Module 1 when you're ready."
              />
              <NextStep
                icon={<MailIcon />}
                title="Receipt sent"
                body="Check your email for your purchase confirmation and receipt."
              />
            </>
          )}

          {!isBooking && !isCourse && (
            <NextStep
              icon={<MailIcon />}
              title="Confirmation email sent"
              body="Check your inbox for next steps and access details."
            />
          )}
        </ul>

        {product?.accessInstructions && (
          <p className="mb-12 border-l-2 border-id8-orange pl-5 font-[family-name:var(--font-serif)] italic text-[var(--muted)]">
            {product.accessInstructions}
          </p>
        )}

        <Rule className="mb-10" />

        <div className="flex flex-col gap-3.5 sm:flex-row">
          {isCourse && (
            <EditorialButton href="/courses/claude-for-knowledge-workers/module-1">
              Start Module 1
            </EditorialButton>
          )}
          <EditorialButton href="/" variant="ghost">
            Back to home
          </EditorialButton>
        </div>

        <p className="mt-10 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
          Questions? Reach out at{' '}
          <a
            href="mailto:eb@id8labs.tech"
            className="text-[var(--ink)] underline decoration-[var(--hair)] underline-offset-2 transition-colors hover:decoration-id8-orange"
          >
            eb@id8labs.tech
          </a>
        </p>
      </div>
    </Container>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <Container narrow>
        <div className="py-32 font-[family-name:var(--font-mono)] text-sm text-[var(--muted)]">
          Loading…
        </div>
      </Container>
    }>
      <SuccessContent />
    </Suspense>
  )
}
