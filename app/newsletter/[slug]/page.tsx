import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getIssueBySlug, getAllIssues, isEssay } from '@/lib/newsletter/issues'
import { NewsletterSubscribe } from '@/components/newsletter'
import {
  Container,
  Kicker,
  Deck,
  Rule,
  MetaRow,
  Prose,
  EditorialButton,
} from '@/components/editorial'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const issue = getIssueBySlug(slug)

  if (!issue) {
    return {
      title: 'Issue Not Found | Signal:Noise',
    }
  }

  // Get description based on format
  const description = isEssay(issue)
    ? issue.content.substring(0, 155).replace(/[*#_\-]/g, '')
    : issue.bigIdea.content.substring(0, 155).replace(/<[^>]*>/g, '')

  const title = isEssay(issue) ? issue.title : issue.subject

  return {
    title: `${title} | Signal:Noise`,
    description,
    openGraph: {
      title,
      description,
    },
  }
}

export async function generateStaticParams() {
  const issues = getAllIssues()
  return issues.map((issue) => ({
    slug: issue.slug,
  }))
}

/**
 * Parse content with simple formatting (bold tags only)
 * Content comes from our own templates - not user input
 */
function renderContent(content: string): React.ReactNode[] {
  // Split content into paragraphs
  const paragraphs = content.split('\n\n').filter(p => p.trim())

  return paragraphs.map((para, idx) => {
    // Handle <strong> tags by splitting and reconstructing
    const parts = para.split(/(<strong>.*?<\/strong>)/g)
    const rendered = parts.map((part, partIdx) => {
      if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
        const text = part.replace(/<\/?strong>/g, '')
        return <strong key={partIdx}>{text}</strong>
      }
      return part
    })

    return (
      <p key={idx}>
        {rendered}
      </p>
    )
  })
}

/**
 * Render list items with bold text support
 */
function renderListItem(html: string): React.ReactNode {
  const parts = html.split(/(<strong>.*?<\/strong>)/g)
  return parts.map((part, idx) => {
    if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
      const text = part.replace(/<\/?strong>/g, '')
      return <strong key={idx}>{text}</strong>
    }
    return part
  })
}

/**
 * Render markdown-style essay content
 */
function renderEssayContent(content: string): React.ReactNode[] {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let currentParagraph: string[] = []
  let inList = false
  let listItems: string[] = []

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ')
      if (text.trim()) {
        elements.push(
          <p key={elements.length}>
            {renderMarkdownInline(text)}
          </p>
        )
      }
      currentParagraph = []
    }
  }

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={elements.length}>
          {listItems.map((item, idx) => (
            <li key={idx}>{renderMarkdownInline(item)}</li>
          ))}
        </ul>
      )
      listItems = []
      inList = false
    }
  }

  for (const line of lines) {
    // Horizontal rule
    if (line.match(/^-{3,}$/)) {
      flushParagraph()
      flushList()
      elements.push(<hr key={elements.length} />)
      continue
    }

    // Headers
    if (line.startsWith('## ')) {
      flushParagraph()
      flushList()
      elements.push(
        <h2 key={elements.length}>{line.substring(3)}</h2>
      )
      continue
    }

    if (line.startsWith('### ')) {
      flushParagraph()
      flushList()
      elements.push(
        <h3 key={elements.length}>{line.substring(4)}</h3>
      )
      continue
    }

    // List items
    if (line.startsWith('- ')) {
      flushParagraph()
      inList = true
      listItems.push(line.substring(2))
      continue
    }

    // Numbered list items
    if (line.match(/^\d+\.\s/)) {
      flushParagraph()
      if (!inList) {
        flushList()
      }
      inList = true
      listItems.push(line.replace(/^\d+\.\s/, ''))
      continue
    }

    // Empty line - flush paragraph
    if (line.trim() === '') {
      flushParagraph()
      flushList()
      continue
    }

    // Regular text
    if (inList) {
      flushList()
    }
    currentParagraph.push(line)
  }

  flushParagraph()
  flushList()

  return elements
}

/**
 * Render inline markdown (bold, italic)
 */
function renderMarkdownInline(text: string): React.ReactNode[] {
  // Handle **bold** and *italic*
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g)
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
      return <em key={idx}>{part.slice(1, -1)}</em>
    }
    return part
  })
}

export default async function NewsletterIssuePage({ params }: PageProps) {
  const { slug } = await params
  const issue = getIssueBySlug(slug)

  if (!issue) {
    notFound()
  }

  // Essay format
  if (isEssay(issue)) {
    return (
      <article className="min-h-screen bg-[var(--paper)]">
        {/* Masthead */}
        <section className="pt-16 pb-10">
          <Container narrow>
            <div className="mb-10">
              <EditorialButton href="/newsletter" variant="ghost">
                &larr; Back to Archive
              </EditorialButton>
            </div>

            <Kicker dot>Signal:Noise · Issue {issue.issueNumber}</Kicker>

            <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.25rem,5.5vw,3.5rem)]">
              {issue.title}
            </h1>

            {issue.subtitle && <Deck className="mt-6">{issue.subtitle}</Deck>}

            <MetaRow
              className="mt-8"
              items={[
                { label: issue.date },
                { label: `by ${issue.author}` },
              ]}
            />

            <Rule className="mt-8" />
          </Container>
        </section>

        {issue.heroImage && (
          <section className="pb-4">
            <Container narrow>
              <div className="relative w-full overflow-hidden border border-[var(--hair)]">
                <Image
                  src={issue.heroImage}
                  alt={issue.heroAlt || issue.title}
                  width={1200}
                  height={675}
                  sizes="(min-width: 1024px) 768px, 100vw"
                  className="h-auto w-full"
                />
              </div>
            </Container>
          </section>
        )}

        {/* Essay Body */}
        <section className="pb-16 pt-8">
          <Container narrow>
            <Prose>{renderEssayContent(issue.content)}</Prose>

            {/* Author Bio */}
            {issue.authorBio && (
              <div className="mt-12 border-t border-[var(--hair)] pt-8 font-[family-name:var(--font-serif)] text-[var(--muted)] italic">
                {issue.authorBio}
              </div>
            )}
          </Container>
        </section>

        {/* Subscribe CTA */}
        <section className="border-t border-[var(--rule)] bg-[var(--paper-shadow)] py-20">
          <Container narrow>
            <div className="text-center">
              <Kicker dot className="justify-center">Subscribe</Kicker>
              <h2 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] text-[var(--ink)] text-[clamp(1.75rem,4vw,2.5rem)]">
                Want more essays like this?
              </h2>
              <p className="mx-auto mt-4 mb-8 max-w-xl font-[family-name:var(--font-sans)] text-[var(--body)] leading-relaxed">
                Subscribe to Signal:Noise for essays on building, thinking, and the patterns that transfer.
              </p>
              <div className="mx-auto max-w-md">
                <NewsletterSubscribe
                  variant="inline"
                  source={`newsletter-issue-${issue.issueNumber}`}
                  title=""
                  description=""
                  buttonText="Subscribe"
                />
              </div>
            </div>
          </Container>
        </section>
      </article>
    )
  }

  // Legacy structured format
  return (
    <article className="min-h-screen bg-[var(--paper)]">
      {/* Masthead */}
      <section className="pt-16 pb-10">
        <Container narrow>
          <div className="mb-10">
            <EditorialButton href="/newsletter" variant="ghost">
              &larr; Back to Archive
            </EditorialButton>
          </div>

          <Kicker dot>Signal:Noise · Issue {issue.issueNumber}</Kicker>

          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.25rem,5.5vw,3.5rem)]">
            {issue.subject}
          </h1>

          <MetaRow className="mt-8" items={[{ label: issue.date }]} />

          <Rule className="mt-8" />
        </Container>
      </section>

      {/* Issue Content */}
      <section className="pb-16 pt-8">
        <Container narrow>
          {/* The Big Idea */}
          <Kicker>The Big Idea</Kicker>
          <h2 className="mt-3 mb-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.015em] text-[var(--ink)] text-[clamp(1.5rem,3vw,2rem)]">
            {issue.bigIdea.title}
          </h2>
          <Prose>{renderContent(issue.bigIdea.content)}</Prose>

          <Rule className="my-12" />

          {/* Framework */}
          <Kicker>Framework</Kicker>
          <h2 className="mt-3 mb-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.015em] text-[var(--ink)] text-[clamp(1.5rem,3vw,2rem)]">
            {issue.framework.name}
          </h2>
          <Prose>
            <p>{issue.framework.description}</p>
            {issue.framework.steps && (
              <ol>
                {issue.framework.steps.map((step: string, idx: number) => (
                  <li key={idx}>{renderListItem(step)}</li>
                ))}
              </ol>
            )}
          </Prose>

          <Rule className="my-12" />

          {/* Case Study */}
          <Kicker>Case Study</Kicker>
          <h2 className="mt-3 mb-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.015em] text-[var(--ink)] text-[clamp(1.5rem,3vw,2rem)]">
            {issue.caseStudy.title}
          </h2>
          <Prose>
            <p>
              <strong>The problem:</strong> {issue.caseStudy.problem}
            </p>
            <p>
              <strong>What worked:</strong> {issue.caseStudy.solution}
            </p>
            <p className="font-medium text-id8-orange">
              <strong>Result:</strong> {issue.caseStudy.result}
            </p>
          </Prose>

          {/* MILO Tip (Academy Only Preview) */}
          {issue.miloTip && (
            <div className="mt-12 border border-[var(--hair)] p-7">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Kicker>Academy Exclusive</Kicker>
                <span className="bg-[var(--paper-mid)] px-2 py-1 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] text-id8-orange">
                  MILO Tip
                </span>
              </div>
              <h3 className="mb-2 font-[family-name:var(--font-display)] text-lg font-medium text-[var(--ink)]">
                {issue.miloTip.title}
              </h3>
              <p className="mb-4 font-[family-name:var(--font-sans)] text-sm text-[var(--body)] leading-relaxed">
                {issue.miloTip.explanation}
              </p>
              <div className="border border-[var(--hair)] bg-[var(--paper-shadow)] p-4 font-[family-name:var(--font-mono)] text-sm text-[var(--body)]">
                &ldquo;{issue.miloTip.prompt}&rdquo;
              </div>
              <EditorialButton href="/academy" variant="ghost" className="mt-5">
                Join the Academy to unlock all tips &rarr;
              </EditorialButton>
            </div>
          )}

          {/* Closing Note */}
          <div className="mt-12 border-t border-[var(--hair)] pt-8">
            <Prose>
              <p>{issue.closingNote}</p>
              <p>
                See you next month,
                <br />
                <strong>Eddie</strong>
              </p>
            </Prose>
          </div>
        </Container>
      </section>

      {/* Subscribe CTA */}
      <section className="border-t border-[var(--rule)] bg-[var(--paper-shadow)] py-20">
        <Container narrow>
          <div className="text-center">
            <Kicker dot className="justify-center">Subscribe</Kicker>
            <h2 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] text-[var(--ink)] text-[clamp(1.75rem,4vw,2.5rem)]">
              Want more insights like this?
            </h2>
            <p className="mx-auto mt-4 mb-8 max-w-xl font-[family-name:var(--font-sans)] text-[var(--body)] leading-relaxed">
              Subscribe to Signal:Noise for essays on building, thinking, and the patterns that transfer.
            </p>
            <div className="mx-auto max-w-md">
              <NewsletterSubscribe
                variant="inline"
                source={`newsletter-issue-${issue.issueNumber}`}
                title=""
                description=""
                buttonText="Subscribe"
              />
            </div>
          </div>
        </Container>
      </section>
    </article>
  )
}
