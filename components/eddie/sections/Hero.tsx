"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { resumeData } from "@/lib/eddie-constants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Container, Kicker, Deck, MetaRow, Rule } from "@/components/editorial";

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % resumeData.titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section className="border-b border-[var(--hair)]">
      <Container>
        <div className="max-w-4xl pt-28 pb-16 md:pt-36 md:pb-20">
          <Kicker dot className="mb-6">
            {resumeData.location} · id8Labs
          </Kicker>

          {/* Name */}
          <h1 className="mb-5 font-[family-name:var(--font-display)] font-normal leading-[0.95] tracking-[-0.03em] text-[var(--ink)] text-[clamp(3rem,7vw,6rem)]">
            Eddie <em className="italic font-normal text-id8-orange">Belaval</em>
          </h1>

          {/* Rotating Title */}
          <div className="mb-8 h-7 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={titleIndex}
                className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]"
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {prefersReducedMotion
                  ? resumeData.titles.join(" · ")
                  : resumeData.titles[titleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Tagline */}
          <Deck className="mb-10 max-w-2xl">{resumeData.tagline}</Deck>

          <Rule className="mb-6" />

          <MetaRow
            items={[
              { value: "15+", label: "years in production" },
              { value: "30+", label: "productions" },
              { value: "6", label: "countries filmed" },
              { value: resumeData.location, label: "" },
            ]}
          />
        </div>
      </Container>
    </section>
  );
}
