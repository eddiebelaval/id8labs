"use client";

import { Hero } from "@/components/eddie/sections/Hero";
import { Stats } from "@/components/eddie/sections/Stats";
import { Evolution } from "@/components/eddie/sections/Evolution";
import { Credits } from "@/components/eddie/sections/Credits";
import { Skills } from "@/components/eddie/sections/Skills";
import { CurrentWork } from "@/components/eddie/sections/CurrentWork";
import { Contact } from "@/components/eddie/sections/Contact";

export default function EddiePage() {
  return (
    <main className="relative bg-[var(--paper)]">
      <Hero />
      <Stats />
      <Evolution />
      <Credits />
      <Skills />
      <CurrentWork />
      <Contact />
    </main>
  );
}
