"use client";

import { resumeData } from "@/lib/eddie-constants";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Container, SectionHead, Deck } from "@/components/editorial";

export function Evolution() {
  return (
    <section className="border-b border-[var(--hair)] py-20 md:py-24">
      <Container>
        <SectionHead
          title={<>The <em className="italic">journey</em></>}
          meta="Career"
        />
        <Deck className="mt-6 max-w-2xl">
          From behind the camera to shaping narratives to building tools. Each
          chapter shaped the next.
        </Deck>

        {/* Timeline */}
        <div className="mt-14 border-l border-[var(--hair)] pl-8 md:pl-10">
          {resumeData.careerChapters.map((chapter, index) => (
            <ScrollReveal key={chapter.phase} delay={index * 0.05}>
              <div className="relative pb-14 last:pb-0">
                {/* Node */}
                <span className="absolute -left-[2.55rem] top-1.5 h-2.5 w-2.5 rounded-full bg-id8-orange md:-left-[3.05rem]" />

                <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-id8-orange">
                  {chapter.phase}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-normal tracking-[-0.015em] text-[var(--ink)] md:text-3xl">
                  {chapter.title}
                </h3>
                <p className="mt-1 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                  {chapter.years}
                </p>
                <p className="mt-4 max-w-2xl text-[1.0625rem] leading-[1.7] text-[var(--body)]">
                  {chapter.description}
                </p>
                <ul className="mt-5 max-w-2xl space-y-2.5">
                  {chapter.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--body)]"
                    >
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-id8-orange" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
