import { Container, Kicker, Deck, MetaRow, Hairline } from '@/components/editorial'
import { featuredHomeProducts, showcaseHomeProducts } from '@/lib/home-products'

const activeProjectCount = featuredHomeProducts.length + showcaseHomeProducts.length

export default function Builder() {
  return (
    <section id="builder" className="py-20 md:py-24 scroll-mt-20">
      <Container>
        <div className="grid lg:grid-cols-[1fr_2fr] gap-14 lg:gap-24 items-start">
          {/* Left - Sticky Header */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Kicker className="mb-4">The Builder</Kicker>
            <h2 className="mb-6 font-[family-name:var(--font-display)] font-normal leading-[1.05] tracking-[-0.02em] text-[var(--ink)] text-[clamp(2.25rem,4.5vw,3.5rem)]">
              Eddie <em className="italic font-normal text-id8-orange">Belaval</em>
            </h2>
            <Deck>AI system architect, forward deployment. Miami, FL.</Deck>
          </div>

          {/* Right - Content */}
          <div className="space-y-12">
            {/* Role lines */}
            <div className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)] space-y-1.5">
              <p>AI System Architect</p>
              <p>Forward Deployment for AI-era Operators</p>
              <p>Pattern Recognition Across Domains</p>
            </div>

            {/* Bio Content */}
            <div className="space-y-6 font-[family-name:var(--font-serif)] text-lg md:text-xl leading-[1.55] text-[var(--body)]">
              <p>
                I work in <span className="text-id8-orange">AI system architecture</span> and forward
                deployment. I build primitive chains, AI harnesses, and intelligence layers, agents with
                depth and breadth that create presence, not a chatbot. Twenty years on set,{' '}
                <span className="text-id8-orange">First 48</span>, Orange County Choppers, 90 Day Fiancé,
                reading how teams decide and where work leaks, now pointed at the architecture between the
                tools.
              </p>
              <p className="text-[var(--muted)]">
                Multidisciplinary: filmmaking, AI, mycology, biology, finance, music, writing, complex
                systems. Pattern recognition is the superpower.
              </p>
            </div>

            {/* Pull Quote */}
            <blockquote className="font-[family-name:var(--font-serif)] italic text-2xl md:text-3xl leading-[1.35] text-[var(--ink)]">
              &ldquo;ID8Labs is where I work through problems in public and ship solutions.&rdquo;
            </blockquote>

            {/* Stats */}
            <div>
              <Hairline className="mb-6" />
              <MetaRow
                items={[
                  { value: '20+', label: 'Years reading human systems' },
                  { value: String(activeProjectCount), label: 'Active projects' },
                ]}
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
