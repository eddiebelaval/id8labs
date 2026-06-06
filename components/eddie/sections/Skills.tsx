"use client";

import { resumeData } from "@/lib/eddie-constants";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Container, SectionHead, Tag, TagRow } from "@/components/editorial";

export function Skills() {
  return (
    <section className="border-b border-[var(--hair)] py-20 md:py-24">
      <Container>
        <SectionHead title={<>The <em className="italic">craft</em></>} meta="Skills & certs" />

        {/* Certifications */}
        <ScrollReveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-1.5">
            {resumeData.certifications.map((cert) => (
              <Tag key={cert.name}>{cert.name}</Tag>
            ))}
          </div>
        </ScrollReveal>

        {/* Skills Grid */}
        <div className="mt-10 grid gap-px border border-[var(--hair)] bg-[var(--hair)] md:grid-cols-2">
          <ScrollReveal delay={0.2}>
            <div className="h-full bg-[var(--paper)] p-7 md:p-9">
              <h3 className="mb-6 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-id8-orange">
                Production
              </h3>
              <TagRow tags={resumeData.skills.map((s) => s)} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="h-full bg-[var(--paper)] p-7 md:p-9">
              <h3 className="mb-6 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-id8-orange">
                Technology
              </h3>
              <TagRow tags={resumeData.techSkills.map((s) => s)} />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
