import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Container, EditorialButton, Kicker, Rule, SectionHead } from '@/components/editorial'
import { studioProducts } from '@/lib/studio'
import { periodicTable } from '@/lib/lab-systems'
import { getAllEssays } from '@/lib/mdx-essays'
import { writingHref } from '@/lib/writing-href'
import { getLeadDaily } from '@/lib/shipped/frontpage'

const meta = 'font-[family-name:var(--font-mono)] text-[11px] text-[var(--muted)]'
const textLink = 'inline-flex items-center gap-2 py-2 font-[family-name:var(--font-narrow)] text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink)] transition-colors hover:text-id8-orange'

function dateLabel(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  })
}

export default function StudioHome() {
  const notes = getAllEssays().slice(0, 2)
  const edition = getLeadDaily()

  return (
    <>
      <section className="pb-16 pt-16 md:pb-20 md:pt-24" aria-labelledby="studio-heading">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Kicker className="!text-[var(--muted)]">Independent software studio</Kicker>
            <span className={`${meta} hidden sm:block`}>Miami, Florida · Building in public</span>
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-16">
            <h1 id="studio-heading" className="font-[family-name:var(--font-display)] text-[clamp(3.25rem,7.8vw,6.5rem)] font-normal leading-[0.98] tracking-[-0.045em] text-[var(--ink)]">
              Good questions.<br />Useful <em className="italic text-id8-orange">software.</em>
            </h1>
            <div className="max-w-md lg:pb-1">
              <p className="text-lg leading-relaxed text-[var(--body)]">We make tools for writing, thinking, and working with AI. Then we open the notebook and share what we learn.</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                <EditorialButton href="#software">Explore the software <ArrowRight size={16} aria-hidden="true" /></EditorialButton>
                <Link href="/lab" className={textLink}>Inside the lab <ArrowUpRight size={15} aria-hidden="true" /></Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="software" className="scroll-mt-28 pb-24" aria-labelledby="software-heading">
        <Container>
          <div className="flex items-baseline justify-between gap-5 border-t border-[var(--ink)] pb-8 pt-5">
            <h2 id="software-heading" className="font-[family-name:var(--font-narrow)] text-xs font-semibold uppercase tracking-[0.2em]">Selected software</h2>
            <Link href="/products" className={textLink}>The full collection <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
          <div className="grid gap-12 md:grid-cols-3 md:gap-7">
            {studioProducts.map((product, index) => (
              <article key={product.name}>
                <Link href={product.href} aria-label={`Explore ${product.name}`} className="group relative block aspect-[4/3] overflow-hidden rounded-[14px] border border-[var(--hair)] bg-[var(--paper-shadow)] transition-opacity hover:opacity-90">
                  <Image src={product.image} alt={`${product.name} product preview`} fill sizes="(max-width: 767px) 100vw, 33vw" priority={index === 0} className="object-cover object-top" />
                </Link>
                <div className="mt-5 flex items-baseline justify-between gap-3">
                  <h3 className="font-[family-name:var(--font-display)] text-3xl font-normal tracking-[-0.02em]">
                    <Link href={product.href} className="transition-colors hover:text-id8-orange">{product.name}</Link>
                  </h3>
                  <span className={`${meta} rounded-[7px] border border-[var(--hair)] px-2 py-1`}>{product.status === 'shipping' ? 'Available' : product.statusLabel}</span>
                </div>
                <p className="mt-3 text-base font-medium leading-relaxed text-[var(--ink)]">{product.outcome}</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{product.summary}</p>
                <Link href={product.href} className={`${textLink} mt-4`}>Explore {product.name} <ArrowUpRight size={15} aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-[var(--hair)] bg-[var(--paper-shadow)] py-16 md:py-20" aria-labelledby="discovery-heading">
        <Container>
          <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
            <div>
              <Kicker className="!text-[var(--muted)]">An open lab</Kicker>
              <h2 id="discovery-heading" className="mt-6 max-w-sm font-[family-name:var(--font-display)] text-[clamp(2.5rem,4.5vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.03em]">Follow a question.<br />See where it leads.</h2>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-[var(--muted)]">Some ideas become software. Others become a map, an essay, or the next question. The work stays open.</p>
              <Link href="/lab" className={`${textLink} mt-6`}>Explore the discoveries <ArrowRight size={15} aria-hidden="true" /></Link>
            </div>
            <Link href={periodicTable.instrumentHref} className="group flex flex-col justify-between rounded-[14px] border border-[var(--hair-hard)] bg-[var(--paper)] p-7 transition-colors hover:border-[var(--ink)] sm:p-9">
              <div className="flex items-start justify-between gap-5">
                <span className={meta}>Interactive research</span>
                <Image src="/brand/engraved/glyph-iris-engraved.svg" alt="" width={96} height={96} className="h-20 w-20 sm:h-24 sm:w-24" />
              </div>
              <div className="mt-6">
                <h3 className="max-w-md font-[family-name:var(--font-display)] text-3xl font-normal leading-tight tracking-[-0.02em] sm:text-4xl">The Periodic Table<br />of Primitives</h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--muted)]">Look up a fact. Capture a record. Verify a claim. Make a decision. A living map of the small moves that make a system work.</p>
                <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--hair)] pt-5">
                  <span className={meta}>{periodicTable.placed} elements · {periodicTable.openGaps} open questions</span>
                  <span className={textLink}>Open the table <ArrowUpRight size={16} aria-hidden="true" /></span>
                </div>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-24" aria-labelledby="notebook-heading">
        <Container>
          <SectionHead title={<span id="notebook-heading">The open notebook.</span>} meta="Observations from the work" />
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              {notes.map((note) => (
                <article key={note.slug} className="border-b border-[var(--hair)] py-6 first:pt-0">
                  <p className={meta}>{dateLabel(note.date)} · {note.category === 'research' ? 'Research' : 'Field note'}</p>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-normal leading-tight tracking-[-0.02em]">
                    <Link href={writingHref(note)} className="transition-colors hover:text-id8-orange">{note.title}</Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--muted)]">{note.excerpt || note.subtitle}</p>
                </article>
              ))}
              <Link href="/writing" className={`${textLink} mt-5`}>Read the notebook <ArrowRight size={15} aria-hidden="true" /></Link>
            </div>
            <div className="rounded-[14px] border border-[var(--hair)] p-7 sm:p-9">
              <Kicker className="!text-[var(--muted)]">The magazine from id8Labs</Kicker>
              <h3 className="mt-6"><Image src="/brand/shipped-wordmark.svg" alt="Shipped." width={776} height={259} className="h-16 w-auto" /></h3>
              <p className="mt-6 text-base leading-relaxed text-[var(--muted)]">The notebook follows what we are building. Shipped. follows what the AI labs are releasing, with daily editions and deeper reads.</p>
              {edition && (
                <Link href="/shipped" className="mt-7 block border-t border-[var(--hair)] pt-5 transition-colors hover:text-id8-orange">
                  <span className={`${meta} block`}>Latest edition · {dateLabel(edition.date)}</span>
                  <span className="mt-3 block font-[family-name:var(--font-display)] text-2xl leading-tight">{edition.title}</span>
                </Link>
              )}
              <Link href="/shipped" className={`${textLink} mt-6`}>Read Shipped. <ArrowUpRight size={15} aria-hidden="true" /></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-16 md:pb-24" aria-labelledby="founder-heading">
        <Container>
          <Rule />
          <div className="grid gap-10 pt-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
            <div>
              <Kicker className="!text-[var(--muted)]">The builder behind the lab</Kicker>
              <h2 id="founder-heading" className="mt-5 font-[family-name:var(--font-display)] text-4xl font-normal tracking-[-0.03em]">Eddie Belaval.</h2>
              <p className={`${meta} mt-4`}>Filmmaker · AI System Architect · Miami</p>
            </div>
            <div>
              <p className="max-w-2xl font-[family-name:var(--font-display)] text-2xl font-normal leading-relaxed text-[var(--body)]">Twenty years in television taught me to pay attention to how people work. The lab is where those observations become things people can use.</p>
              <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2">
                <Link href="/eddie" className={textLink}>Meet Eddie <ArrowRight size={15} aria-hidden="true" /></Link>
                <Link href="/academy" className={textLink}>Learn with the lab <ArrowRight size={15} aria-hidden="true" /></Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
