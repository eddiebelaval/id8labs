"use client";

import { resumeData } from "@/lib/eddie-constants";
import { Container } from "@/components/editorial";

export function Stats() {
  return (
    <section className="border-b border-[var(--hair)] py-16">
      <Container>
        <div className="grid grid-cols-2 gap-px border border-[var(--hair)] bg-[var(--hair)] md:grid-cols-4">
          {resumeData.stats.map((stat) => (
            <div key={stat.label} className="bg-[var(--paper)] p-7 text-center">
              <div className="font-[family-name:var(--font-display)] text-4xl font-normal tracking-[-0.03em] text-[var(--ink)] md:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
