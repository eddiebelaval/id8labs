import Link from 'next/link'
import { Container, Kicker, Deck } from '@/components/editorial'

const principles = [
  {
    title: 'Problem-First, Always',
    body: (
      <>
        Every tool starts with friction I hit in production. Context rot on 90 Day scripts became{' '}
        <a
          href="https://id8composer.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-id8-orange hover:text-[var(--ink)] transition-colors"
        >
          Composer
        </a>
        . Revenge trades bleeding my account became{' '}
        <a
          href="https://deepstack.trade"
          target="_blank"
          rel="noopener noreferrer"
          className="text-id8-orange hover:text-[var(--ink)] transition-colors"
        >
          DeepStack&apos;s emotion detection
        </a>
        . Problems are never abstract&mdash;they&apos;re personally painful.
      </>
    ),
  },
  {
    title: 'Architecture Over Features',
    body: (
      <>
        Most builders add features. I design architecture.{' '}
        <Link href="/products/llc-ops" className="text-id8-orange hover:text-[var(--ink)] transition-colors">
          LLC Ops
        </Link>{' '}
        is not a tax tool, it is nine agents working as one chain.{' '}
        <Link href="/products/pipeline" className="text-id8-orange hover:text-[var(--ink)] transition-colors">
          Pipeline
        </Link>{' '}
        is not a tracker, it is decay mechanics that create urgency. The connections between primitives
        are where the leverage actually lives.
      </>
    ),
  },
  {
    title: 'Primitive Chains, Not Tools',
    body: (
      <>
        A tool sits and waits. A chain runs. We design primitive chain architectures with human gates in
        the right places, so the company gets the leverage of automation without giving up the judgment
        that only people can supply. The artifact is not an app. It is a working architecture inside the
        company.
      </>
    ),
  },
  {
    title: 'Build to Learn',
    body: (
      <>
        Don&apos;t wait until you understand&mdash;build something, watch it break, build it better.
        Composer started simple. Now it has canvas, sandbox, persistent story memory. The first version
        teaches what the real version needs.
      </>
    ),
  },
  {
    title: 'Multidisciplinary Translation',
    body: (
      <>
        Mycology teaches networks. Trading teaches emotional systems. Filmmaking teaches narrative
        structure. Pattern recognition is pulling insight from one field into another. DeepStack&apos;s
        &ldquo;process integrity&rdquo; came from production workflows, not finance.
      </>
    ),
  },
  {
    title: 'Working in Public',
    body: (
      <>
        The lab isn&apos;t hidden. Ship before it&apos;s polished, iterate on real feedback. The
        discomfort of public imperfection is offset by the acceleration of real-world validation.
      </>
    ),
  },
]

export default function Mission() {
  return (
    <section id="mission" className="py-20 md:py-24 scroll-mt-20">
      <Container>
        <div className="grid lg:grid-cols-[1fr_2fr] gap-14 lg:gap-24 items-start">
          {/* Left - Sticky Header */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Kicker className="mb-4">Philosophy</Kicker>
            <h2 className="mb-6 font-[family-name:var(--font-display)] font-normal leading-[1.05] tracking-[-0.02em] text-[var(--ink)] text-[clamp(2.25rem,4.5vw,3.5rem)]">
              How I <em className="italic font-normal text-id8-orange">build</em>
            </h2>
            <Deck>Six principles the lab runs on. Every product is an instance of them.</Deck>
          </div>

          {/* Right - Principles */}
          <div className="space-y-12">
            <div>
              {principles.map((p, i) => (
                <div
                  key={p.title}
                  className="py-8 border-b border-[var(--hair)]"
                  style={i === 0 ? { paddingTop: 0 } : undefined}
                >
                  <h3 className="mb-3 font-[family-name:var(--font-display)] font-normal tracking-[-0.015em] text-[var(--ink)] text-xl md:text-2xl">
                    {p.title}
                  </h3>
                  <p className="leading-relaxed text-[var(--body)]">{p.body}</p>
                </div>
              ))}
            </div>

            {/* Pull Quote */}
            <div>
              <blockquote className="font-[family-name:var(--font-serif)] italic text-2xl md:text-3xl leading-[1.35] text-[var(--ink)]">
                &ldquo;Products get personality. The lab stays focused.&rdquo;
              </blockquote>
              <div className="mt-8">
                <Link
                  href="/services"
                  className="font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.22em] text-id8-orange transition-colors hover:text-[var(--ink)]"
                >
                  Learn how I can help you build &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
