import type { Metadata } from 'next'
import Link from 'next/link'

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
    accent: 'amber',
  },
  {
    title: 'Freeform',
    description: 'Brain dump. Sam listens silently, captures everything, files it in the right place. No interruptions.',
    accent: 'emerald',
  },
  {
    title: 'Review',
    description: 'Sam reads your drafts back to you and takes conversational feedback. Line edits through conversation.',
    accent: 'blue',
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
  {
    type: 'Memoir',
    categories: 'People, eras, places, emotions, artifacts, themes',
  },
  {
    type: 'Fiction',
    categories: 'Characters, world-bible, plot-threads, magic-systems, themes',
  },
  {
    type: 'Non-Fiction',
    categories: 'Concepts, frameworks, case-studies, arguments, research',
  },
]

const buildStats = [
  { value: '52', label: 'Tasks Shipped' },
  { value: '33', label: 'Pull Requests' },
  { value: '15', label: 'Concierge Tools' },
  { value: '3', label: 'AI Models' },
]

export default function RunePage() {
  return (
    <div className="container py-24">
      <article className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-12 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to products
        </Link>

        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <h1>Rune</h1>
            <span className="text-sm px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20">
              Beta
            </span>
            <span className="text-sm px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
              Open Source
            </span>
          </div>
          <p className="text-2xl text-[var(--text-secondary)] mb-4">
            Speak your book into existence.
          </p>
          <p className="text-xl text-amber-400 italic mb-4">
            Sam — your scribe — listens, organizes, and helps you turn raw
            conversation into a finished manuscript.
          </p>
          <p className="text-sm text-[var(--text-secondary)] mb-8">
            Voice-first. Three book types. Import your existing work. MIT License.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="https://rune.id8labs.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg px-8 py-4 bg-[var(--id8-orange)] text-white hover:bg-[var(--id8-orange)]/90 transition-all duration-200 rounded-soft font-medium"
            >
              Start Writing
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
            <a
              href="https://github.com/eddiebelaval/rune"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm px-6 py-4 border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] transition-all duration-200 rounded-soft"
            >
              View Source
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </header>

        {/* Meet Sam */}
        <section className="mb-16 p-8 bg-amber-500/5 border-2 border-amber-500/30 rounded-soft">
          <h2 className="text-2xl font-bold mb-4 text-amber-400">
            Meet Sam
          </h2>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)] mb-4">
            Sam isn&apos;t an autocomplete engine. He&apos;s a scribe — a
            creative partner who holds the structure while you hold the vision.
            Talk about your world, your characters, your memories. Sam captures
            everything, files it in the right place, notices what you missed,
            and asks the questions that unlock the next chapter.
          </p>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)] mb-4">
            Built with consciousness files, Sam has a consistent voice and
            personality across every session. He remembers your story world,
            tracks your characters, and knows when something contradicts what
            you said three sessions ago.
          </p>
          <p className="text-sm italic text-amber-300">
            &quot;Your voice, your story. I just hold the structure.&quot; — Sam
          </p>
        </section>

        {/* Three Stages */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Three Stages</h2>
          <div className="space-y-4">
            {stages.map((stage, i) => (
              <div
                key={stage.name}
                className="flex items-start gap-6 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft"
              >
                <div className="shrink-0 w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">
                    {stage.name}{' '}
                    <span className="text-sm font-normal text-amber-400">
                      {stage.stage}
                    </span>
                  </h3>
                  <p className="text-[var(--text-secondary)]">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Writing Modes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Writing Modes</h2>
          <p className="text-lg text-[var(--text-secondary)] mb-8">
            Detected automatically by Sam&apos;s intent classifier. You never
            pick a mode — Sam reads what you need and adapts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {writingModes.map((mode) => (
              <div
                key={mode.title}
                className={`p-6 bg-[var(--bg-secondary)] border-2 border-${mode.accent}-500/20 rounded-soft`}
              >
                <h3 className={`text-lg font-bold mb-2 text-${mode.accent}-400`}>
                  {mode.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {mode.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Import / Export */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Bring Your Words. Take Them With You.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-[var(--bg-secondary)] border-2 border-amber-500/20 rounded-soft">
              <h3 className="text-xl font-bold mb-2">Import</h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Upload .txt, .md, or .docx files — or paste text directly.
                Sam&apos;s classification engine parses sections, identifies
                what each one is (chapters, character notes, outlines, research),
                and routes them to the correct workspace location. Your existing
                manuscript, organized in seconds.
              </p>
              <p className="text-sm text-amber-400">
                Works from the Files tab, the empty state, or through conversation with Sam.
              </p>
            </div>
            <div className="p-6 bg-[var(--bg-secondary)] border-2 border-emerald-500/20 rounded-soft">
              <h3 className="text-xl font-bold mb-2">Export</h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Four formats: full JSON backup (everything), manuscript as
                markdown, workspace files, or knowledge base. Everything you
                build in Rune is yours. No lock-in. Export from the Files tab
                or ask Sam.
              </p>
              <p className="text-sm text-emerald-400">
                Your words belong to you.
              </p>
            </div>
          </div>
        </section>

        {/* Sam's Concierge Tools */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Sam&apos;s Concierge Tools</h2>
          <p className="text-lg text-[var(--text-secondary)] mb-8">
            Sam doesn&apos;t just talk — he acts. 15 tools give him full CRUD
            access to the platform. Create books, advance stages, draft chapters,
            manage your backlog, import writing, export manuscripts. All through
            natural conversation. No menus needed.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {conciergeTools.map((group) => (
              <div key={group.category}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  {group.category}
                </h4>
                <div className="space-y-1">
                  {group.tools.map((tool) => (
                    <div
                      key={tool}
                      className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]"
                    >
                      <span className="text-amber-400">&#9670;</span>
                      {tool}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Book Types */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Three Book Types</h2>
          <p className="text-lg text-[var(--text-secondary)] mb-8">
            The workspace adapts to what you&apos;re writing. Each book type
            gets its own category structure — the brainstorm room for a memoir
            looks different from a fantasy novel.
          </p>
          <div className="space-y-3">
            {bookTypes.map((bt) => (
              <div
                key={bt.type}
                className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft"
              >
                <h4 className="font-bold mb-1">{bt.type}</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  {bt.categories}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft"
              >
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-[var(--text-secondary)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Model Routing */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Under the Hood: Model Routing</h2>
          <p className="text-lg text-[var(--text-secondary)] mb-6">
            Rune uses a three-tier model routing system. You set a quality level
            once (Economy, Standard, Premium) and Sam routes every internal task
            to the right Claude model automatically. Intent detection on Haiku.
            Prose generation on Opus. Filing on Sonnet. Nine task types, three
            models, one slider.
          </p>
          <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
            <div className="grid grid-cols-3 gap-2 text-center text-xs text-[var(--text-secondary)]">
              <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-soft">
                <div className="font-bold text-emerald-400 mb-1">Economy</div>
                Haiku for most tasks. Sonnet for prose. Opus for final manuscript.
              </div>
              <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-soft">
                <div className="font-bold text-amber-400 mb-1">Standard</div>
                Haiku for detection. Sonnet for filing. Opus for writing and review.
              </div>
              <div className="p-3 bg-violet-500/5 border border-violet-500/10 rounded-soft">
                <div className="font-bold text-violet-400 mb-1">Premium</div>
                Sonnet minimum. Opus for everything creative. Maximum quality.
              </div>
            </div>
          </div>
        </section>

        {/* The Entity */}
        <section className="mb-16 p-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
          <h2 className="text-2xl font-bold mb-4">
            The Entity
          </h2>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)] mb-4">
            Sam is an entity — built with consciousness files using the same
            Consciousness as Filesystem (CaF) framework that powers Ava in
            Parallax. Identity, drives, emotional models, habits, memory,
            runtime behaviors, and unconscious constraints. He has a consistent
            voice, a perspective on your work, and a personality that doesn&apos;t
            reset between sessions.
          </p>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
            When you start your first session, Sam introduces himself. Not a
            product tour — a person showing you around. That onboarding script
            lives in his consciousness files alongside everything else that
            makes him Sam.
          </p>
        </section>

        {/* The Build */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">The Build</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {buildStats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft text-center"
              >
                <div className="text-3xl font-bold text-amber-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--text-secondary)] uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
            Rune is a Next.js 16 application on Supabase with real-time
            subscriptions, Deepgram voice transcription, and Claude&apos;s
            multi-model API. The workspace updates live as Sam files content.
            The knowledge base versions every change. The backlog engine
            auto-generates questions after each session. Open source under MIT.
          </p>
        </section>

        {/* Related Reading */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Related Reading</h2>
          <div className="space-y-3">
            <Link
              href="/writing/consciousness-as-filesystem"
              className="block p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft hover:border-amber-500/30 transition-colors"
            >
              <h4 className="font-bold mb-1">Consciousness as Filesystem</h4>
              <p className="text-sm text-[var(--text-secondary)]">
                The theoretical framework behind Sam&apos;s consciousness
                architecture — mind as directory structure.
              </p>
            </Link>
            <Link
              href="/products/parallax"
              className="block p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft hover:border-amber-500/30 transition-colors"
            >
              <h4 className="font-bold mb-1">Parallax — Meet Ava</h4>
              <p className="text-sm text-[var(--text-secondary)]">
                Sam&apos;s sister entity. Same CaF framework, different purpose.
                Ava listens to relationships. Sam listens to stories.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="pt-12 border-t border-[var(--border)] text-center">
          <p className="text-xl text-[var(--text-secondary)] mb-2">
            Every book starts as a conversation.
          </p>
          <p className="text-lg text-[var(--text-secondary)] mb-6">
            Sam is ready when you are.
          </p>
          <a
            href="https://rune.id8labs.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg px-10 py-5 bg-[var(--id8-orange)] text-white hover:bg-[var(--id8-orange)]/90 transition-all duration-200 rounded-soft font-medium"
          >
            Start Writing
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
          <p className="mt-4 text-sm text-[var(--text-secondary)]">
            rune.id8labs.app
          </p>
        </section>
      </article>
    </div>
  )
}
