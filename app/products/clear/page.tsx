import type { Metadata } from 'next'
import {
  Container,
  Kicker,
  Deck,
  Rule,
  SectionHead,
  MetaRow,
  EditorialButton,
} from '@/components/editorial'

export const metadata: Metadata = {
  title: 'Clearance - ID8Labs',
  description: 'Protect creators from copyright strikes by removing background music from footage. Save re-shoot costs, avoid takedowns, keep your content monetized.',
  alternates: { canonical: '/products/clear' },
  openGraph: {
    title: 'Clearance | id8Labs',
    description: 'Protect creators from copyright strikes by removing background music from footage.',
    url: 'https://id8labs.app/products/clear',
  },
}

const features = [
  {
    title: 'Copyright strike prevention',
    description: 'Remove copyrighted music before platforms flag your content.',
  },
  {
    title: 'Preserve dialogue',
    description: 'Strip music while keeping voices and natural ambience intact.',
  },
  {
    title: 'Save re-shoot costs',
    description: 'Rescue footage that would otherwise require expensive re-shoots.',
  },
  {
    title: 'Batch processing',
    description: 'Process entire projects at once.',
  },
  {
    title: 'Keep revenue flowing',
    description: 'Maintain monetization on content that would otherwise be demonetized or blocked.',
  },
]

export default function ClearPage() {
  return (
    <div className="bg-[var(--paper)] py-20 md:py-28">
      <Container narrow>
        {/* Hero */}
        <header className="border-b border-[var(--hair)] pb-14">
          <Kicker dot className="mb-5">Audio · Early exploration</Kicker>
          <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.03em] leading-[1.02] text-[var(--ink)] text-[clamp(2.75rem,6vw,5rem)] mb-7">
            Protect your content from <em className="italic text-id8-orange">copyright strikes</em>.
          </h1>
          <Deck className="mb-9">
            Remove background music from your footage before it gets flagged. Keep your
            content monetized, avoid takedowns, and skip expensive re-shoots.
          </Deck>
          <MetaRow
            className="border-t border-[var(--hair)] pt-6"
            items={[
              { value: 'Video / Audio', label: 'domain' },
              { value: 'Early exploration', label: 'status' },
            ]}
          />
        </header>

        {/* Description */}
        <section className="py-16">
          <div className="space-y-6 font-[family-name:var(--font-serif)] text-[1.0625rem] leading-[1.65] text-[var(--body)]">
            <p>
              You&apos;ve got great footage but there&apos;s copyrighted music in the background. Maybe someone walked past
              a store playing music. Maybe your subject had their TV on. Maybe you&apos;re in a location with ambient
              music you didn&apos;t notice until post.
            </p>
            <p>
              Clearance strips the music while preserving your dialogue and natural ambience. No more worrying
              about copyright claims destroying your content&apos;s revenue or getting your video taken down.
            </p>
          </div>
        </section>

        <Rule />

        {/* Planned Features */}
        <section className="py-16">
          <SectionHead title={<>Planned <em className="italic text-id8-orange">features</em></>} meta="Roadmap" />
          <div className="mt-10 divide-y divide-[var(--hair)] border-y border-[var(--hair)]">
            {features.map((feature) => (
              <div key={feature.title} className="py-6 grid md:grid-cols-[280px_1fr] gap-3 md:gap-8">
                <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">
                  {feature.title}
                </h3>
                <p className="text-[var(--body)] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Status */}
        <section className="pt-16 flex flex-wrap items-center gap-5">
          <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
            <b className="font-medium text-[var(--ink)]">Status</b> · Early exploration
          </p>
          <EditorialButton href="#clearance" variant="ghost" className="cursor-not-allowed opacity-60">
            In development
          </EditorialButton>
        </section>
      </Container>
    </div>
  )
}
