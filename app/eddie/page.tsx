"use client";

import { Hero } from "@/components/eddie/sections/Hero";
import { Stats } from "@/components/eddie/sections/Stats";
import { Evolution } from "@/components/eddie/sections/Evolution";
import { Credits } from "@/components/eddie/sections/Credits";
import { Skills } from "@/components/eddie/sections/Skills";
import { CurrentWork } from "@/components/eddie/sections/CurrentWork";
import { Contact } from "@/components/eddie/sections/Contact";
import { VintageStatic } from "@/components/eddie/ui/VintageStatic";

export default function EddiePage() {
  return (
    <>
      {/* Fixed Vintage Static Background — retro TV color bars with VHS glitches */}
      <div className="fixed inset-0 -z-10">
        <VintageStatic />
      </div>

      {/* Main Content - scrolls over vintage static */}
      <main className="relative">
        <Hero />
        <Stats />
        <Evolution />
        <Credits />
        <Skills />
        <CurrentWork />
        <Contact />
      </main>
    </>
  );
}
