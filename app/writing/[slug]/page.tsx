import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getEssayBySlug, getAllEssays } from '@/lib/essays'
import { CopyPageButton } from '@/components/CopyPageButton'
import {
  Container,
  Kicker,
  Deck,
  Rule,
  MetaRow,
  Prose,
  EditorialButton,
} from '@/components/editorial'

// Revalidate every hour to pick up scheduled posts
export const revalidate = 3600  // 1 hour in seconds

export function generateStaticParams() {
  return getAllEssays().map((essay) => ({
    slug: essay.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const essay = getEssayBySlug(params.slug)
  if (!essay) return { title: { absolute: 'Writing · id8Labs' } }
  const description = essay.excerpt || essay.subtitle
  const url = `https://id8labs.app/writing/${essay.slug}`
  return {
    title: { absolute: `${essay.title} · id8Labs` },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: essay.title,
      description,
      type: 'article',
      url,
      siteName: 'id8Labs',
      ...(essay.heroImage ? { images: [{ url: essay.heroImage }] } : {}),
    },
    twitter: {
      card: essay.heroImage ? 'summary_large_image' : 'summary',
      title: essay.title,
      description,
    },
  }
}

export default function EssayPage({ params }: { params: { slug: string } }) {
  const essay = getEssayBySlug(params.slug)

  if (!essay) {
    notFound()
  }

  const categoryLabels = {
    essay: 'Essay',
    research: 'Research',
    release: 'Release Note'
  }

  const formattedDate = new Date(essay.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <article data-copy-root="article" className="min-h-screen bg-[var(--paper)]">
      {/* Masthead */}
      <section className="pt-16 pb-10">
        <Container narrow>
          <div
            data-copy-exclude="true"
            className="mb-10 flex flex-wrap items-center justify-between gap-3"
          >
            <EditorialButton href="/writing" variant="ghost">
              &larr; Back to Writing
            </EditorialButton>
            <CopyPageButton />
          </div>

          <Kicker dot>{categoryLabels[essay.category]}</Kicker>

          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.25rem,5.5vw,3.5rem)]">
            {essay.title}
          </h1>

          {essay.subtitle && (
            <Deck className="mt-6">{essay.subtitle}</Deck>
          )}

          <MetaRow
            className="mt-8"
            items={[
              { label: formattedDate },
              { label: essay.readTime },
            ]}
          />

          <Rule className="mt-8" />
        </Container>
      </section>

      {/* Hero Image */}
      {essay.heroImage && (
        <section className="pb-4">
          <Container narrow>
            <div className="relative w-full overflow-hidden border border-[var(--hair)]">
              <Image
                src={essay.heroImage}
                alt={essay.title}
                width={1920}
                height={1080}
                className="h-auto w-full"
                priority
              />
            </div>
          </Container>
        </section>
      )}

      {/* Content */}
      <section className="pb-16 pt-8">
        <Container narrow>
          <Prose>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => <h2>{children}</h2>,
                h2: ({ children }) => <h3>{children}</h3>,
                table: ({ children }) => (
                  <div className="mb-6 overflow-x-auto">
                    <table className="w-full border-collapse text-sm">{children}</table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="border-b border-[var(--hair)]">{children}</thead>
                ),
                tbody: ({ children }) => <tbody>{children}</tbody>,
                tr: ({ children }) => (
                  <tr className="border-b border-[var(--hair)]">{children}</tr>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-3 text-left font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--ink)]">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-3 text-[var(--body)]">{children}</td>
                ),
              }}
            >
              {essay.content}
            </ReactMarkdown>
          </Prose>
        </Container>
      </section>

      {/* Back Link */}
      <section className="border-t border-[var(--rule)] py-12" data-copy-exclude="true">
        <Container narrow>
          <EditorialButton href="/writing" variant="ghost">
            &larr; Back to all writing
          </EditorialButton>
        </Container>
      </section>
    </article>
  )
}
