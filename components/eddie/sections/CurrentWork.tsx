"use client";

import { resumeData } from "@/lib/eddie-constants";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Container } from "@/components/editorial";

export function CurrentWork() {
  return (
    <section className="border-b border-[var(--hair)] py-20 md:py-24">
      <Container>
        <ScrollReveal>
          <div className="bg-[var(--ink)] p-9 md:p-14">
            <p className="mb-6 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-id8-orange">
              Currently
            </p>

            <h2 className="font-[family-name:var(--font-display)] font-normal leading-[1.05] tracking-[-0.02em] text-[var(--paper)] text-[clamp(1.875rem,4vw,2.75rem)]">
              {resumeData.currentWork.company}
            </h2>

            <p className="mt-4 max-w-2xl font-[family-name:var(--font-serif)] text-xl italic leading-[1.45] text-[rgba(250,250,247,0.82)]">
              {resumeData.currentWork.tagline}
            </p>

            <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-[rgba(250,250,247,0.68)]">
              {resumeData.currentWork.description}
            </p>

            <p className="mt-8 inline-flex items-center gap-2 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.22em] text-id8-orange">
              Building in public
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
