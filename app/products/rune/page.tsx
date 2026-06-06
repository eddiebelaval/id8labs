import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Container,
  Kicker,
  Deck,
  Rule,
  SectionHead,
  MetaRow,
  EditorialButton,
  EditorialCard,
} from '@/components/editorial'

export const metadata: Metadata = {
  title: 'Rune - Speak Your Book Into Existence | id8Labs',
  description:
    'Meet Sam — your scribe. A voice-first book writer that listens, organizes, and helps you turn raw conversation into a finished manuscript. Import existing writing, let Sam route it. Three stages: Workshop, Study, Press.',
  openGraph: {
    title: 'Rune - Speak Your Book Into Existence',
    description:
      'Meet Sam — a voice-first book writer. Talk about your story world, Sam organizes everything. Import existing writing. Three stages to a finished manuscript.',
    url: 'https://id8labs.app/products/rune',
  },
}

const features = [
  {
    title: 'He Listens',
    description:
      'Voice or text. No forms, no templates. Talk about your characters, your world, your memories. Sam captures everything and files it into the right place — brainstorm notes, chapter drafts, character profiles.',
  },
  {
    title: 'He Organizes',
    description:
      'Three rooms: Brainstorm (raw material), Drafts (structured writing), Publish (finished work). Sam routes content automatically based on what it is. Characters go to characters. Chapters go to chapters.',
  },
  {
    title: 'He Remembers',
    description:
      'A hierarchical knowledge base grows with every session. Characters, locations, plot threads, timeline events, relationships. Sam brings all of it to every conversation — no context rot.',
  },
  {
    title: 'He Notices Things',
    description:
      'Contradictions in your timeline. Characters you mentioned once and forgot. Gaps in your world-building. Sam tracks it all in a prioritized backlog and surfaces the right question at the right time.',
  },
  {
    title: 'Import Existing Writing',
    description:
      'Paste text or upload files (.txt, .md, .docx). Sam parses the content, classifies every section — chapters, character notes, outlines, research — and routes each to the correct workspace location. Your existing work, organized in seconds.',
  },
  {
    title: 'Export Everything',
    description:
      'Full manuscript as markdown. Complete workspace backup as JSON. Knowledge base export. Everything you build in Rune belongs to you and can leave with you.',
  },
]

const conciergeTools = [
  { category: 'Books', tools: ['Create book', 'Update book', 'List books', 'Advance stage'] },
  { category: 'Workspace', tools: ['Create file', 'Update file', 'Import text'] },
  { category: 'Knowledge', tools: ['Search KB', 'Create entry', 'List backlog', 'Address items'] },
  { category: 'Manuscript', tools: ['Get manuscript', 'Export book'] },
  { category: 'Profile', tools: ['Get profile', 'Update settings'] },
]

const writingModes = [
  {
    title: 'Guided',
    description: 'Sam picks from the backlog and interviews you. He asks the questions you didn\'t know you needed to answer.',
  },
  {
    title: 'Freeform',
    description: 'Brain dump. Sam listens silently, captures everything, files it in the right place. No interruptions.',
  },
  {
    title: 'Review',
    description: 'Sam reads your drafts back to you and takes conversational feedback. Line edits through conversation.',
  },
]

const stages = [
  {
    name: 'The Workshop',
    stage: 'World-building',
    description: 'Build the foundation. Characters, locations, rules, relationships, timeline. Sam interviews you through it.',
  },
  {
    name: 'The Study',
    stage: 'Story-writing',
    description: 'Turn raw material into prose. Sam helps you write chapters, scenes, and sections from your knowledge base.',
  },
  {
    name: 'The Press',
    stage: 'Publishing',
    description: 'Assemble, review, and export. Your manuscript comes together from the drafts room into a finished work.',
  },
]

const bookTypes = [
  { type: 'Memoir', categories: 'People, eras, places, emotions, artifacts, themes' },
  { type: 'Fiction', categories: 'Characters, world-bible, plot-threads, magic-systems, themes' },
  { type: 'Non-Fiction', categories: 'Concepts, frameworks, case-studies, arguments, research' },
]

const buildStats = [
  { value: '52', label: 'Tasks Shipped' },
  { value: '33', label: 'Pull Requests' },
  { value: '15', label: 'Concierge Tools' },
  { value: '3', label: 'AI Models' },
]

const modelTiers = [
  { tier: 'Economy', detail: 'Haiku for most tasks. Sonnet for prose. Opus for final manuscript.' },
  { tier: 'Standard', detail: 'Haiku for detection. Sonnet for filing. Opus for writing and review.' },
  { tier: 'Premium', detail: 'Sonnet minimum. Opus for everything creative. Maximum quality.' },
]

export default function RunePage() {
  return (
    <div className="bg-[var(--paper)] py-20 md:py-28">
      <Container>
        {/* Hero */}
        <header className="border-b border-[var(--hair)] pb-14">
          <Kicker dot className="mb-5">Voice-First Writer · Beta · Open Source</Kicker>
          <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.03em] leading-[1.02] text-[var(--ink)] text-[clamp(2.75rem,6vw,5rem)] max-w-3xl mb-7">
            Speak your book <em className="italic text-id8-orange">into existence</em>.
          </h1>
          <Deck className="max-w-2xl mb-9">
            Sam &mdash; your scribe &mdash; listens, organizes, and helps you turn raw
            conversation into a finished manuscript. Voice-first. Import your existing work. MIT License.
          </Deck>
          <div className="flex flex-wrap gap-3.5">
            <EditorialButton href="https://rune.id8labs.app" external>
              Start Writing
            </EditorialButton>
            <EditorialButton href="https://github.com/eddiebelaval/rune" external variant="ghost">
              View Source
            </EditorialButton>
          </div>
          <MetaRow
            className="mt-12 border-t border-[var(--hair)] pt-6"
            items={[
              { value: '3', label: 'stages' },
              { value: '15', label: 'concierge tools' },
              { value: '3', label: 'book types' },
              { value: 'MIT', label: 'license' },
            ]}
          />
        </header>

        {/* Meet Sam */}
        <section className="py-16">
          <EditorialCard featured>
            <Kicker className="mb-4">Meet Sam</Kicker>
            <div className="space-y-4 font-[family-name:var(--font-serif)] text-[1.0625rem] leading-[1.6] text-[var(--body)] max-w-2xl">
              <p>
                Sam isn&apos;t an autocomplete engine. He&apos;s a scribe &mdash; a
                creative partner who holds the structure while you hold the vision.
                Talk about your world, your characters, your memories. Sam captures
                everything, files it in the right place, notices what you missed,
                and asks the questions that unlock the next chapter.
              </p>
              <p>
                Built with consciousness files, Sam has a consistent voice and
                personality across every session. He remembers your story world,
                tracks your characters, and knows when something contradicts what
                you said three sessions ago.
              </p>
            </div>
            <p className="mt-5 font-[family-name:var(--font-serif)] italic text-[var(--muted)]">
              &quot;Your voice, your story. I just hold the structure.&quot; &mdash; Sam
            </p>
          </EditorialCard>
        </section>

        <Rule />

        {/* Three Stages */}
        <section className="py-16">
          <SectionHead title={<>Three <em className="italic text-id8-orange">stages</em></>} meta="Workshop · Study · Press" />
          <div className="mt-10 divide-y divide-[var(--hair)] border-y border-[var(--hair)]">
            {stages.map((stage, i) => (
              <div key={stage.name} className="py-6 grid md:grid-cols-[48px_1fr] gap-4 md:gap-6">
                <span className="font-[family-name:var(--font-display)] font-normal text-3xl text-id8-orange leading-none">{i + 1}</span>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-1">
                    {stage.name}{' '}
                    <span className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                      {stage.stage}
                    </span>
                  </h3>
                  <p className="text-[var(--body)] leading-relaxed">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Writing Modes */}
        <section className="py-16">
          <SectionHead title="Writing modes" meta="Auto-detected" />
          <p className="mt-8 mb-10 max-w-2xl text-lg text-[var(--muted)]">
            Detected automatically by Sam&apos;s intent classifier. You never
            pick a mode &mdash; Sam reads what you need and adapts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {writingModes.map((mode) => (
              <div key={mode.title} className="bg-[var(--paper)] p-7">
                <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-2">{mode.title}</h3>
                <p className="text-sm text-[var(--muted)]">{mode.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Import / Export */}
        <section className="py-16">
          <SectionHead title="Bring your words. Take them with you." />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            <div className="bg-[var(--paper)] p-7">
              <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-3">Import</h3>
              <p className="text-[var(--body)] mb-4 leading-relaxed">
                Upload .txt, .md, or .docx files &mdash; or paste text directly.
                Sam&apos;s classification engine parses sections, identifies
                what each one is (chapters, character notes, outlines, research),
                and routes them to the correct workspace location. Your existing
                manuscript, organized in seconds.
              </p>
              <p className="text-sm text-id8-orange">Works from the Files tab, the empty state, or through conversation with Sam.</p>
            </div>
            <div className="bg-[var(--paper-shadow)] p-7">
              <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-3">Export</h3>
              <p className="text-[var(--body)] mb-4 leading-relaxed">
                Four formats: full JSON backup (everything), manuscript as
                markdown, workspace files, or knowledge base. Everything you
                build in Rune is yours. No lock-in. Export from the Files tab
                or ask Sam.
              </p>
              <p className="text-sm text-[var(--muted)]">Your words belong to you.</p>
            </div>
          </div>
        </section>

        <Rule />

        {/* Concierge Tools */}
        <section className="py-16">
          <SectionHead title="Sam&apos;s concierge tools" meta="15 tools" />
          <p className="mt-8 mb-10 max-w-2xl text-lg text-[var(--muted)]">
            Sam doesn&apos;t just talk &mdash; he acts. 15 tools give him full CRUD
            access to the platform. Create books, advance stages, draft chapters,
            manage your backlog, import writing, export manuscripts. All through
            natural conversation. No menus needed.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {conciergeTools.map((group) => (
              <div key={group.category} className="bg-[var(--paper)] p-5">
                <h4 className="font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.2em] text-id8-orange mb-3">
                  {group.category}
                </h4>
                <div className="space-y-1.5">
                  {group.tools.map((tool) => (
                    <div key={tool} className="flex items-baseline gap-1.5 text-xs text-[var(--body)]">
                      <span className="text-id8-orange font-[family-name:var(--font-mono)]">&#9670;</span>
                      {tool}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Book Types */}
        <section className="py-16">
          <SectionHead title="Three book types" meta="Adaptive workspace" />
          <p className="mt-8 mb-10 max-w-2xl text-lg text-[var(--muted)]">
            The workspace adapts to what you&apos;re writing. Each book type
            gets its own category structure &mdash; the brainstorm room for a memoir
            looks different from a fantasy novel.
          </p>
          <div className="divide-y divide-[var(--hair)] border-y border-[var(--hair)]">
            {bookTypes.map((bt) => (
              <div key={bt.type} className="py-5 grid md:grid-cols-[160px_1fr] gap-1.5 md:gap-8">
                <h4 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">{bt.type}</h4>
                <p className="text-sm text-[var(--muted)] self-center">{bt.categories}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Capabilities */}
        <section className="py-16">
          <SectionHead title="Capabilities" meta="6 systems" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {features.map((feature) => (
              <div key={feature.title} className="bg-[var(--paper)] p-7">
                <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-2">{feature.title}</h3>
                <p className="text-[var(--body)] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Model Routing */}
        <section className="py-16">
          <SectionHead title="Under the hood: model routing" />
          <p className="mt-8 mb-10 max-w-2xl text-lg text-[var(--muted)]">
            Rune uses a three-tier model routing system. You set a quality level
            once (Economy, Standard, Premium) and Sam routes every internal task
            to the right Claude model automatically. Intent detection on Haiku.
            Prose generation on Opus. Filing on Sonnet. Nine task types, three
            models, one slider.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {modelTiers.map((t) => (
              <div key={t.tier} className="bg-[var(--paper)] p-7">
                <div className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-2">{t.tier}</div>
                <p className="text-sm text-[var(--muted)]">{t.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* The Entity */}
        <section className="py-16 max-w-2xl">
          <SectionHead title="The entity" />
          <div className="mt-8 space-y-4 text-[var(--body)] leading-relaxed">
            <p>
              Sam is an entity &mdash; built with consciousness files using the same
              Consciousness as Filesystem (CaF) framework that powers Ava in
              Parallax. Identity, drives, emotional models, habits, memory,
              runtime behaviors, and unconscious constraints. He has a consistent
              voice, a perspective on your work, and a personality that doesn&apos;t
              reset between sessions.
            </p>
            <p>
              When you start your first session, Sam introduces himself. Not a
              product tour &mdash; a person showing you around. That onboarding script
              lives in his consciousness files alongside everything else that
              makes him Sam.
            </p>
          </div>
        </section>

        <Rule />

        {/* The Build */}
        <section className="py-16">
          <SectionHead title="The build" meta="By the numbers" />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--hair)] border border-[var(--hair)] mb-10">
            {buildStats.map((stat) => (
              <div key={stat.label} className="bg-[var(--paper)] p-7 text-center">
                <div className="font-[family-name:var(--font-display)] font-normal text-4xl text-[var(--ink)] mb-1">{stat.value}</div>
                <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--muted)]">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="max-w-2xl text-[var(--body)] leading-relaxed">
            Rune is a Next.js 16 application on Supabase with real-time
            subscriptions, Deepgram voice transcription, and Claude&apos;s
            multi-model API. The workspace updates live as Sam files content.
            The knowledge base versions every change. The backlog engine
            auto-generates questions after each session. Open source under MIT.
          </p>
        </section>

        <Rule />

        {/* Related Reading */}
        <section className="py-16">
          <SectionHead title="Related reading" />
          <div className="mt-10 divide-y divide-[var(--hair)] border-y border-[var(--hair)]">
            <Link
              href="/writing/consciousness-as-filesystem"
              className="block py-6 transition-colors hover:bg-[var(--paper-shadow)]"
            >
              <h4 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-1">Consciousness as Filesystem</h4>
              <p className="text-sm text-[var(--muted)]">The theoretical framework behind Sam&apos;s consciousness architecture &mdash; mind as directory structure.</p>
            </Link>
            <Link
              href="/products/parallax"
              className="block py-6 transition-colors hover:bg-[var(--paper-shadow)]"
            >
              <h4 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-1">Parallax &mdash; Meet Ava</h4>
              <p className="text-sm text-[var(--muted)]">Sam&apos;s sister entity. Same CaF framework, different purpose. Ava listens to relationships. Sam listens to stories.</p>
            </Link>
          </div>
        </section>

        <Rule />

        {/* CTA */}
        <section className="pt-16 text-center">
          <p className="font-[family-name:var(--font-serif)] italic text-xl text-[var(--ink)] mb-2">
            Every book starts as a conversation.
          </p>
          <p className="text-lg text-[var(--muted)] mb-7">Sam is ready when you are.</p>
          <EditorialButton href="https://rune.id8labs.app" external>
            Start Writing
          </EditorialButton>
          <p className="mt-4 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
            rune.id8labs.app
          </p>
        </section>
      </Container>
    </div>
  )
}
