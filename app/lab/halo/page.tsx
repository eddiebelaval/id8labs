import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Kicker, Deck, SectionHead, EditorialCard, Tag, TagRow } from '@/components/editorial'
import { halo } from '@/lib/lab-systems'

export const metadata: Metadata = {
  title: 'The HALO',
  description:
    'A brand’s DNA on disk. The four-gene envelope — Design, Voice, Ethos, Lexicon — that makes a brand’s work on-brand by construction, not by correction. A working system from the id8Labs studio, developed in the open.',
}

// PRIVACY RULE (periodic-table/LANDING-SPLIT-SPEC.md, Eddie 2026-07-22): this is a
// public surface. It describes the SYSTEM only. No client is ever named, counted,
// or hinted at. Examples are welcome; identities are not.

export default function HaloPage() {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      {/* Hero */}
      <section className="pt-24 pb-16">
        <Container>
          <Kicker dot>id8Labs &middot; The Lab</Kicker>
          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[0.95] text-[var(--ink)] text-[clamp(2.75rem,7vw,4.5rem)]">
            The HALO<span className="text-id8-orange">.</span>
          </h1>
          <Deck className="mt-6 max-w-[680px]">
            A brand&apos;s DNA on disk. The envelope that makes its work on-brand by construction, not by correction.
          </Deck>
        </Container>
      </section>

      <Container>
        {/* What it is */}
        <section className="pb-16 max-w-[720px]">
          <div className="space-y-6 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
            <p>
              Most brands live in a person&apos;s head and a folder of old files. Every new page, deck, or post is a fresh act of taste and a fresh chance to drift. The brand is only as consistent as whoever happened to make the last thing.
            </p>
            <p>
              A HALO is the fix. It is a brand&apos;s DNA written down as files the production tools read first, so an asset comes out on-brand the way a cell comes out with the right proteins &mdash; by construction, not by a correction pass at the end. We call it a HALO: Holistic, Attuned, Layered Orchestration. One directory per brand, held by the studio, outliving any single project.
            </p>
          </div>
        </section>

        {/* The four genes */}
        <section className="pb-16">
          <SectionHead title={<>The four <em className="italic text-id8-orange">genes</em></>} meta="The genome" />
          <div className="grid gap-6 pt-10 md:grid-cols-2">
            {[
              { gene: 'Design', line: 'How it looks. The palette, type, spacing, and shape rules, as tokens an agent can enforce, not a PDF a human has to remember.' },
              { gene: 'Voice', line: 'How it sounds. The register, the moves it makes, the words it never uses, held as verbatim exemplars rather than adjectives.' },
              { gene: 'Ethos', line: 'Who it is. What the brand believes and refuses, so the work has a spine and not just a surface.' },
              { gene: 'Lexicon', line: 'How it names things. The terms of art, locked to one authoritative wording, so the whole brand says the same word for the same thing.' },
            ].map((g) => (
              <div key={g.gene} className="border-t border-[var(--hair)] pt-6">
                <div className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-id8-orange">{g.gene}</div>
                <p className="mt-3 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">{g.line}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How: Attunement */}
        <section className="pb-16 max-w-[720px]">
          <SectionHead title={<>Mined, not <em className="italic text-id8-orange">invented</em></>} meta="Attunement" />
          <div className="space-y-6 pt-10 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
            <p>
              You cannot fake a genome. We do not sit in a room and decide what a brand should sound like. We read everything it has already made &mdash; its site, its writing, its decks &mdash; in place, read-only, and let the genome fall out of the corpus. The brand&apos;s own past work is the ground truth. We call the read Attunement.
            </p>
            <p>
              Then every asset is generated through that genome and checked against it before it ships: form-parity, the way you diff a render against a reference. On-brand pieces pass. Off-brand pieces are caught by the machine, not by a client noticing later. The brand structurally cannot drift, because drift never reaches the surface.
            </p>
          </div>
          <TagRow className="mt-8" tags={[`${halo.genes.length} Genes`, 'Attunement', 'Form-Parity Verified', 'On-Brand by Construction']} />
        </section>

        {/* Back to the Lab */}
        <section className="pb-24">
          <div className="border-t border-[var(--ink)] pt-6">
            <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
              A working system from the id8Labs studio. Developed in the open.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <EditorialCard href="/lab">
                <Tag>The Lab</Tag>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-medium text-[var(--ink)]">
                  Back to the workbench
                </h3>
                <p className="mt-2 font-[family-name:var(--font-sans)] text-sm text-[var(--muted)]">
                  The other systems we develop in the open.
                </p>
              </EditorialCard>
            </div>
          </div>
        </section>
      </Container>
    </div>
  )
}
