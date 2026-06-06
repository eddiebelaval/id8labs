"use client";

import { resumeData } from "@/lib/eddie-constants";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Container, SectionHead, Deck, EditorialCard, Tag } from "@/components/editorial";

export function Credits() {
  const featuredCredits = [
    ...resumeData.credits.realityTV.filter((c) => c.featured),
    ...resumeData.credits.scripted.filter((c) => c.featured),
    ...resumeData.credits.documentary.filter((c) => c.featured),
  ];

  const otherCredits = [
    ...resumeData.credits.realityTV.filter((c) => !c.featured),
    ...resumeData.credits.documentary.filter((c) => !c.featured),
  ];

  return (
    <section className="border-b border-[var(--hair)] py-20 md:py-24">
      <Container>
        <SectionHead title={<>The <em className="italic">work</em></>} meta="Selected credits" />
        <Deck className="mt-6 max-w-2xl">
          From MTV to TLC to A&amp;E. Stories captured across networks and
          continents.
        </Deck>

        {/* Featured Credits */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCredits.map((credit, index) => (
            <ScrollReveal key={credit.title} delay={index * 0.05}>
              <EditorialCard className="h-full">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-normal tracking-[-0.01em] text-[var(--ink)] md:text-2xl">
                  {credit.title}
                </h3>
                <p className="mt-1.5 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.18em] text-id8-orange">
                  {credit.network}
                </p>
                <p className="mt-2 text-[15px] text-[var(--body)]">{credit.role}</p>
                {credit.years && (
                  <p className="mt-1 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                    {credit.years}
                  </p>
                )}
              </EditorialCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Other Credits - Compact List */}
        <ScrollReveal delay={0.2}>
          <div className="mt-14 border border-[var(--hair)] bg-[var(--paper-shadow)] p-7 md:p-9">
            <h3 className="mb-6 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              Additional credits
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {otherCredits.map((credit) => (
                <div key={credit.title} className="flex items-baseline gap-2">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-id8-orange" />
                  <span className="text-[15px] leading-snug text-[var(--body)]">
                    {credit.title}{" "}
                    <span className="text-[var(--muted)]">({credit.network})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Commercial Work */}
        <ScrollReveal delay={0.3}>
          <div className="mt-14">
            <h3 className="mb-6 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              Brand collaborations
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {resumeData.credits.commercial.map((brand) => (
                <Tag key={brand.brand}>{brand.brand}</Tag>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
