"use client";

import { resumeData } from "@/lib/eddie-constants";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Container, Kicker, Deck, Rule, EditorialButton, MetaRow } from "@/components/editorial";

export function Contact() {
  return (
    <section className="py-20 md:py-28">
      <Container narrow>
        <ScrollReveal>
          <Kicker dot className="mb-5">
            {resumeData.location}
          </Kicker>

          <h2 className="mb-6 font-[family-name:var(--font-display)] font-normal leading-[1.0] tracking-[-0.03em] text-[var(--ink)] text-[clamp(2.5rem,5.5vw,4rem)]">
            Let&apos;s <em className="italic text-id8-orange">connect.</em>
          </h2>

          <Deck className="mb-10 max-w-xl">
            Available for cinematography, story production, and creative
            consulting work.
          </Deck>

          <div className="mb-12 flex flex-col gap-3.5 sm:flex-row">
            <EditorialButton href={`mailto:${resumeData.social.email}`} external>
              Email
            </EditorialButton>
            <EditorialButton
              href={`https://${resumeData.social.linkedin}`}
              external
              variant="ghost"
            >
              LinkedIn
            </EditorialButton>
          </div>

          <Rule className="mb-6" />

          <MetaRow
            items={[
              { value: "Email", label: resumeData.social.email },
              { value: "Based in", label: resumeData.location },
            ]}
          />

          <p className="mt-10 font-[family-name:var(--font-serif)] italic text-[var(--muted)]">
            Designed with early morning Miami light in mind.
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
