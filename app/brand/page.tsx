import type { Metadata } from 'next'
import { Container, Kicker, Deck, SectionHead, MetaRow } from '@/components/editorial'

// The id8Labs instrument family, v1.0 (locked 2026-09-24). Every file here is
// copied from the id8 repo (identity/id8labs-mark/, tag id8labs-brand-v1.0) by
// family/export/brand-assets.mjs. Never redraw a mark in this page.

export const metadata: Metadata = {
  title: 'Brand | id8Labs',
  description:
    'The id8Labs instrument family: the marks, their jobs, the rules, and the files.',
  openGraph: {
    title: 'Brand | id8Labs',
    description: 'The id8Labs instrument family: the marks, their jobs, the rules, and the files.',
    type: 'website',
  },
}

type Piece = { file: string; role: string; use: string; min: string; wide?: boolean }

const PIECES: Piece[] = [
  { file: 'wordmark-id8-scale-labs-caps', role: 'Primary wordmark', use: 'The default signature. Footers, documents, end cards.', min: '72 px wide' },
  { file: 'lockup-horizontal-wordonly-orange', role: 'Horizontal lockup', use: 'Nav bars and headers. Anywhere wide and short.', min: '120 px wide', wide: true },
  { file: 'monogram-i-in-8', role: 'Monogram', use: 'Avatars, app icons, tight squares.', min: '24 px' },
  { file: 'wordmark-id8-scale', role: 'Short wordmark', use: 'The "from id8" signature on Shipped.', min: '48 px wide' },
  { file: 'favicon', role: 'Favicon', use: 'Browser tabs and anything under 24 px.', min: '16 px' },
  { file: 'seal-plate', role: 'Seal', use: 'Card backs, stamps, sign-offs.', min: '48 px' },
  { file: 'symbol-8-scale', role: 'Symbol', use: 'Decorative. Never alone as the brand.', min: '32 px' },
]

const GLYPHS = [
  { file: 'glyph-bolt', name: 'Bolt' },
  { file: 'glyph-iris', name: 'Iris' },
  { file: 'glyph-leaf', name: 'Leaf' },
  { file: 'glyph-index-i', name: 'Index i' },
]

const ENGRAVED = [
  { file: 'glyph-bolt-engraved', name: 'Fig. 1, bolt' },
  { file: 'glyph-iris-engraved', name: 'Fig. 2, iris' },
  { file: 'glyph-leaf-engraved', name: 'Fig. 3, leaf' },
  { file: 'glyph-index-i-engraved', name: 'Fig. 4, index i' },
  { file: 'seal-plate-engraved', name: 'Fig. 5, plate seal' },
]

const RULES = [
  'One orange per mark. Beside another orange, the second mark takes an ink dot.',
  'Pull the file. Never redraw, stretch, respace, recolour, or retype a mark.',
  'Clean under 64 px. Engraved over 256 px.',
  'Clear space of a quarter of the mark’s height on every side.',
  'Light paper first. Knockout only on photography or film.',
  'No glow, gradients, bevels, or drop shadows.',
]

const download =
  'inline-flex items-center justify-center rounded-[10px] border px-6 py-3.5 font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] no-underline transition-colors duration-200'

function Mark({ file, dir = 'family', alt, className = '' }: { file: string; dir?: string; alt: string; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/brand/${dir}/${file}.svg`} alt={alt} className={`block h-full w-auto max-w-full ${className}`} />
}

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <section className="pt-16 pb-10">
        <Container>
          <Kicker dot>Brand</Kicker>
          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[0.95] text-[var(--ink)] text-[clamp(2.75rem,7vw,4.5rem)]">
            The instrument family<span className="text-id8-orange">.</span>
          </h1>
          <Deck className="mt-6 max-w-[660px]">
            id8Labs is signed by a family of marks built on one instrument: one ring, forty ticks,
            one orange. Each mark has a job. The files below are the source.
          </Deck>
          <MetaRow
            className="mt-8"
            items={[
              { value: 'v1.0', label: 'Locked Sep 24, 2026' },
              { value: '15', label: 'Marks' },
              { value: '5', label: 'Engraved plates' },
              { value: '#FF6B35', label: 'The one orange' },
            ]}
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/brand/id8labs-brand-v1.0.zip" download className={`${download} border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:bg-id8-orange hover:border-id8-orange`}>
              Download the kit (SVG + PNG)
            </a>
            <a href="/brand/id8labs-brand-sheet-v1.0.pdf" className={`${download} border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]`}>
              Brand sheet (PDF)
            </a>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <SectionHead title="The marks and their jobs" meta="Clean tier" />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PIECES.map((p) => (
              <figure
                key={p.file}
                className={`flex flex-col gap-4 border border-[var(--rule)] bg-[var(--paper)] p-6 ${p.wide ? 'sm:col-span-2' : ''}`}
              >
                <div className="flex h-36 items-center justify-center text-[var(--ink)]">
                  <Mark file={p.file} alt={p.role} />
                </div>
                <figcaption className="border-t border-[var(--rule)] pt-4">
                  <p className="font-[family-name:var(--font-display)] text-xl text-[var(--ink)]">{p.role}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{p.use}</p>
                  <p className="mt-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                    min {p.min}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {GLYPHS.map((g) => (
              <figure key={g.file} className="flex flex-col items-center gap-3 border border-[var(--rule)] p-5">
                <div className="h-24">
                  <Mark file={g.file} alt={`Glyph: ${g.name}`} />
                </div>
                <figcaption className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  {g.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <SectionHead title="The engraved tier" meta="Over 256 px" />
          <Deck className="mt-6 max-w-[660px]">
            For posters, title slides and card backs: the clean mark at the centre, untouched, set in a
            finer instrument of 180 ticks, degree labels and registration marks.
          </Deck>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ENGRAVED.map((e) => (
              <figure key={e.file} className="border border-[var(--rule)] p-4">
                <div className="aspect-[500/540]">
                  <Mark dir="engraved" file={e.file} alt={e.name} className="mx-auto" />
                </div>
                <figcaption className="mt-3 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  {e.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 pb-24">
        <Container>
          <SectionHead title="Colour, type, rules" />
          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div>
              <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Colour</p>
              <ul className="mt-4 space-y-3">
                {[
                  ['Ink', '#0B0B0B', 'bg-[#0b0b0b]'],
                  ['Paper', '#FAFAF7', 'bg-[#fafaf7] border border-[var(--rule)]'],
                  ['Signal orange', '#FF6B35', 'bg-id8-orange'],
                ].map(([name, hex, sw]) => (
                  <li key={name} className="flex items-center gap-3">
                    <span className={`inline-block h-8 w-8 ${sw}`} />
                    <span className="text-sm text-[var(--ink)]">{name}</span>
                    <span className="ml-auto font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">{hex}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Type</p>
              <p className="mt-4 font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">Fraunces, the letters of the marks</p>
              <p className="mt-2 font-[family-name:var(--font-narrow)] text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink)]">Archivo Narrow, labels and scales</p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Rules</p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--ink)]">
                {RULES.map((r) => (
                  <li key={r} className="border-b border-[var(--rule)] pb-2">{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
