import type { Metadata } from 'next'
import { Container, Kicker, Rule, Prose } from '@/components/editorial'
import { EditorialButton } from '@/components/editorial'

export const metadata: Metadata = {
  title: 'Privacy Policy - ID8Labs',
  description: 'ID8Labs privacy policy and data practices.',
}

export default function PrivacyPage() {
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
          Privacy <em className="italic font-normal text-id8-orange">Policy</em>
        </h1>

        <p className="mb-9 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
          Last updated {lastUpdated}
        </p>

        <Rule className="mb-12" />

        <Prose>
          <p>
            ID8Labs (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to
            protecting your privacy. This Privacy Policy explains how we collect, use, and
            safeguard your information.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect minimal information necessary to provide our services. This may include
            contact information you provide when reaching out to us, and anonymous usage analytics
            to improve our products.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            We use collected information solely to communicate with you, improve our services, and
            provide you with updates about our products when you&apos;ve opted in.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your information. However,
            no method of transmission over the internet is 100% secure.
          </p>

          <h2>Contact Us</h2>
          <p>
            Questions about this Privacy Policy? Contact us at{' '}
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
