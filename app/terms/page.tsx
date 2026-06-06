import type { Metadata } from 'next'
import { Container, Kicker, Rule, Prose, EditorialButton } from '@/components/editorial'

export const metadata: Metadata = {
  title: 'Terms of Service - ID8Labs',
  description: 'ID8Labs terms of service and usage policies.',
}

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Container narrow>
      <article className="pt-20 pb-24 md:pt-24">
        <Kicker dot className="mb-5">
          Legal · id8Labs
        </Kicker>

        <h1 className="mb-6 font-[family-name:var(--font-display)] font-normal leading-[1.02] tracking-[-0.03em] text-[var(--ink)] text-[clamp(2.5rem,5.5vw,4rem)]">
          Terms of <em className="italic font-normal text-id8-orange">Service</em>
        </h1>

        <p className="mb-9 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
          Last updated {lastUpdated}
        </p>

        <Rule className="mb-12" />

        <Prose>
          <p>
            Welcome to ID8Labs. By accessing our website and using our products, you agree to
            comply with and be bound by the following terms and conditions.
          </p>

          <h2>Use of Services</h2>
          <p>
            Our products are intended for professional use in creative production environments. You
            agree to use our services in compliance with all applicable laws and regulations.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content, features, and functionality on our website and in our products are owned
            by ID8Labs and are protected by international copyright, trademark, and other
            intellectual property laws.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            ID8Labs products are provided &ldquo;as is&rdquo; without warranties of any kind. We are
            not liable for any damages arising from your use of our products or services.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of our services
            constitutes acceptance of updated terms.
          </p>

          <h2>Contact Us</h2>
          <p>
            Questions about these Terms? Contact us at{' '}
            <a href="mailto:eb@id8labs.tech">eb@id8labs.tech</a>
          </p>
        </Prose>

        <Rule className="mt-12 mb-9" />

        <EditorialButton href="/" variant="ghost">
          &larr; Back to home
        </EditorialButton>
      </article>
    </Container>
  )
}
