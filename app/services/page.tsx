'use client'

import { useState, useEffect, type FormEvent } from 'react'
import {
  Container,
  Kicker,
  Deck,
  Rule,
  SectionHead,
  MetaRow,
  EditorialButton,
  EditorialCard,
  Pipeline,
} from '@/components/editorial'

// ─── Cal.com Script Loader ──────────────────────────────────
function useCalScript() {
  useEffect(() => {
    const win = window as unknown as { Cal?: CallableFunction & { loaded?: boolean; q?: unknown[]; ns?: Record<string, unknown> } }
    if (win.Cal?.loaded) return

    ;(function (C: Window, A: string, L: string) {
      const p = function (a: { q: unknown[] }, ar: unknown) { a.q.push(ar) }
      const d = C.document
      const w = C as unknown as { Cal: CallableFunction & { loaded?: boolean; q: unknown[]; ns: Record<string, CallableFunction & { q: unknown[] }> } }
      w.Cal = w.Cal || function (...args: unknown[]) {
        const cal = w.Cal as CallableFunction & { loaded?: boolean; q: unknown[]; ns: Record<string, CallableFunction & { q: unknown[] }> }
        if (!cal.loaded) {
          cal.ns = {}
          cal.q = cal.q || []
          d.head.appendChild(d.createElement('script')).src = A
          cal.loaded = true
        }
        if (args[0] === L) {
          const api = function (...apiArgs: unknown[]) { p(api as unknown as { q: unknown[] }, apiArgs) } as unknown as CallableFunction & { q: unknown[] }
          const namespace = args[1]
          api.q = api.q || []
          if (typeof namespace === 'string') {
            cal.ns[namespace] = cal.ns[namespace] || api
            p(cal.ns[namespace], args)
            p(cal as { q: unknown[] }, ['initNamespace', namespace])
          } else {
            p(cal as { q: unknown[] }, args)
          }
          return
        }
        p(cal as { q: unknown[] }, args)
      }
    })(window, 'https://app.cal.com/embed/embed.js', 'init')

    const Cal = win.Cal
    if (Cal) {
      Cal('init', { origin: 'https://cal.com' })
      Cal('ui', {
        styles: { branding: { brandColor: '#FF6B35' } },
        hideEventTypeDetails: false,
      })
    }
  }, [])
}

// ─── Shared Form Styles (editorial tokens, sharp corners) ───
const inputClassName =
  'w-full bg-[var(--paper)] border border-[var(--hair)] px-4 py-3 text-[15px] text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-id8-orange transition-colors'
const labelClassName =
  'block font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] mb-2'
const selectClassName = `${inputClassName} pr-10 appearance-none bg-[length:16px_16px] bg-[right_12px_center] bg-no-repeat`
const selectChevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235a5a5a' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`

// ─── Icon Components ────────────────────────────────────────
const ArrowRightIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const CheckIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

// ─── Data (HALO / the Spiral) ───────────────────────────────

const problems = [
  {
    title: 'Tools wait. Your work does not.',
    desc: 'A chat window answers questions. It does not run intake, follow-ups, reporting, or the hundred small judgments your operation makes every day while you sleep.',
  },
  {
    title: 'Generic AI does not know your edge cases.',
    desc: 'Off-the-shelf is built for the average user. Your business runs on the exceptions, and the exceptions are exactly where the value is.',
  },
  {
    title: 'Every org has a resting frequency.',
    desc: 'A current way of seeing, the questions it already knows to ask. A new tool does not shift it. A system tuned to how you actually work does.',
  },
]

const genome = [
  {
    title: 'Design',
    desc: 'How your work looks and feels. The standard a finished thing has to meet before it ships.',
  },
  {
    title: 'Voice',
    desc: 'How your business sounds. The words it uses, the words it never would, the register that reads as you.',
  },
  {
    title: 'Ethos',
    desc: 'The judgment underneath both. What you optimize for, what you refuse, how you decide when the rules run out.',
  },
  {
    title: 'Lexicon',
    desc: 'The language your business owns. Its terms of art, used exactly the way you use them, never renamed or paraphrased.',
  },
]

const movements = [
  {
    step: 'Attune',
    title: 'We learn how you actually work',
    desc: 'From your real work, not a survey. We tune the system to your standards and the way your team actually decides.',
  },
  {
    step: 'Build',
    title: 'We build the system',
    desc: 'Primitive chains with human gates, built deep for your operation. A person stays in the loop wherever judgment belongs.',
  },
  {
    step: 'Verify',
    title: 'We check it against your work',
    desc: 'Graded against your team’s real output before it ships. It ships because it meets your bar, not because it runs.',
  },
  {
    step: 'Tend',
    title: 'It keeps matching you',
    desc: 'After launch it keeps improving as your work changes, so it never goes stale.',
  },
]

const arc = [
  { step: '01', title: 'Workshop', price: 'A small ticket', desc: 'A short working session that shows your team what the work could look like, and tells us both whether there is a fit.' },
  { step: '02', title: 'Audit', price: 'Paid', desc: 'A full read of your operation. You leave with the findings, the recommended approach, and a quote to build it.' },
  { step: '03', title: 'Build and install', price: 'Quoted to the work', desc: 'We build your product and install it inside your operation, wired to your tools, with your data posture set from day one. Going live is included.' },
  { step: '04', title: 'Custodianship', price: 'Ongoing', desc: 'We stay on after launch. The system stays healthy and keeps improving as your work changes.' },
]

const engagements = [
  {
    tag: 'Legal',
    title: 'A chat-first operations system for a law firm',
    desc: 'Built around the firm’s intake and a data posture a regulated practice can stand behind. A front door their team actually talks to.',
  },
  {
    tag: 'Data',
    title: 'A full system for a data company',
    desc: 'The complete envelope, from the brand’s operating DNA to the chains that run the work, with us on as custodians.',
  },
  {
    tag: 'Workshop',
    title: 'A working session, delivered live',
    desc: 'Run with a professional team to show what the work could look like. Proven in the field.',
  },
]

const audiences = [
  'Professional-services firms (legal, advisory, agencies)',
  'Regulated operators who need a real data posture',
  'Studios and teams drowning in operational admin',
  'Founders who ship but cannot scale the operation',
]

const notFor = [
  'Teams who want to self-serve a tool and tune it themselves',
  'Enterprises needing a six-month procurement cycle',
  'Anyone looking for a chatbot widget on their website',
]

const faqs = [
  {
    q: 'What is HALO, exactly?',
    a: 'HALO is our engine: your operating DNA, your design sense, your voice, your judgment, plus the chains that produce your work on brand by construction, not by reminder. We build, version, and run it for you. We do not hand it off; HALO stays ours, the moat. What goes into your operation is the product it builds and an agent layer that handles your change requests, and we run HALO as your custodian, tuned to your DNA.',
  },
  {
    q: 'Do I own the system, or do you?',
    a: 'You own the outcome; we own the engine. HALO is ours, the moat we keep and run as your custodian, so you never have to operate it. What is yours is the result: the product it builds, the work it produces, your data. What lives in your operation is that product and an agent layer that handles your change requests. Most studios hand off and the work drifts within a month. We stay, by design.',
  },
  {
    q: 'How is this priced?',
    a: 'Transparently, and scoped to the work. A small workshop to start, a paid audit, then a build quoted to scope. After launch, a retainer keeps the system healthy. No surprise line items.',
  },
  {
    q: 'We are regulated. What about our data?',
    a: 'Data posture is part of the build, not an afterthought. For regulated clients we design for sovereign data and zero data retention, and we name every place your data flows before anything ships.',
  },
  {
    q: 'How fast can we be running?',
    a: 'The workshop and audit come first. Most first builds install within a few weeks of a signed scope, and the system keeps improving from there.',
  },
  {
    q: 'What happens after launch?',
    a: 'The retainer begins. The system keeps tuning to how your team actually works, so it improves over time instead of going stale. There is always a person in the loop, by design.',
  },
]

// ─── Main Page Component ────────────────────────────────────

export default function ServicesPage() {
  useCalScript()

  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamType: '',
    teamSize: '',
    timeDrain: '',
    stage: '',
    timeline: '',
  })
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const scrollToForm = () => {
    document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('submitting')

    try {
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_AI_SETUP_ID
      if (!formspreeId) {
        console.error('Missing NEXT_PUBLIC_FORMSPREE_AI_SETUP_ID env var')
        setFormState('error')
        return
      }

      const { timeDrain, ...rest } = formData
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...rest, message: timeDrain }),
      })

      if (response.ok) {
        setFormState('success')
        setFormData({ name: '', email: '', company: '', teamType: '', teamSize: '', timeDrain: '', stage: '', timeline: '' })
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  return (
    <div className="min-h-screen bg-[var(--paper)]">

      {/* ── 1. HERO ───────────────────────────────────── */}
      <section className="border-b border-[var(--hair)]">
        <Container>
          <div className="max-w-4xl pt-28 pb-16 md:pt-36 md:pb-20">
            <Kicker dot className="mb-5">
              Forward Deployment
            </Kicker>
            <h1 className="mb-7 font-[family-name:var(--font-display)] font-normal leading-[0.98] tracking-[-0.03em] text-[var(--ink)] text-[clamp(2.75rem,6.2vw,5.5rem)]">
              Your business has a way of working.{' '}
              <em className="italic font-normal text-id8-orange">We turn it into a system, and keep it true.</em>
            </h1>
            <Deck className="mb-9 max-w-2xl">
              We design primitive chains with human gates and deploy them inside your operation. Your domain, your tools, your judgment. A workshop opens it, an audit confirms the fit, we build and install, then we stay on as custodians so the work never drifts.
            </Deck>
            <div className="mb-10 flex flex-col gap-3.5 sm:flex-row">
              <button
                data-cal-link="id8labs/workshop"
                data-cal-config='{"layout":"month_view"}'
                className="inline-flex cursor-pointer items-center justify-center gap-2.5 border border-[var(--ink)] bg-[var(--ink)] px-6 py-3.5 font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] text-[var(--paper)] transition-colors duration-150 hover:border-id8-orange hover:bg-id8-orange"
              >
                Book the workshop
                <ArrowRightIcon />
              </button>
              <EditorialButton variant="ghost" onClick={scrollToForm}>
                Apply for an audit
              </EditorialButton>
            </div>
            <Rule className="mb-6" />
            <MetaRow
              items={[
                { label: 'HALO installed in place' },
                { label: 'Human gates by design' },
                { label: 'Custodians, not vendors' },
              ]}
            />
          </div>
        </Container>
      </section>

      {/* ── 2. THE PROBLEM ─────────────────────────────── */}
      <section className="py-20 md:py-24">
        <Container>
          <SectionHead
            title={<>AI has not changed how your business <em className="italic">works.</em></>}
            meta="The gap"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {problems.map((card, i) => (
              <EditorialCard key={i}>
                <span className="mb-5 block font-[family-name:var(--font-mono)] text-xs tabular-nums text-[var(--muted)]">
                  {`0${i + 1}`}
                </span>
                <h3 className="mb-3 font-[family-name:var(--font-display)] text-lg font-normal leading-snug tracking-[-0.01em] text-[var(--ink)]">
                  {card.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[var(--body)]">{card.desc}</p>
              </EditorialCard>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 3. HALO (THE PRODUCT) ──────────────────────── */}
      <section id="halo" className="border-t border-[var(--hair)] py-20 md:py-24">
        <Container>
          <SectionHead
            title={<>HALO: your operating DNA, <em className="italic">installed</em></>}
            meta="The product"
          />

          <div className="mt-12 mb-12 max-w-3xl">
            <p className="mb-6 text-[1.0625rem] leading-[1.7] text-[var(--body)]">
              We capture how your business actually works, its design sense, its voice, its judgment, into a system we call{' '}
              <span className="font-[family-name:var(--font-serif)] italic text-[var(--ink)]">HALO</span>. It runs your day-to-day work on brand and on standard by construction, not by reminder.
            </p>
            <p className="text-[1.0625rem] leading-[1.7] text-[var(--body)]">
              At its core is the{' '}
              <span className="font-[family-name:var(--font-serif)] italic text-[var(--ink)]">Genome</span>: the DNA of how you work, in four parts.
            </p>
          </div>

          <div className="mb-16 grid max-w-4xl gap-px border border-[var(--hair)] bg-[var(--hair)] sm:grid-cols-2 md:grid-cols-4">
            {genome.map((item, i) => (
              <div key={i} className="bg-[var(--paper)] p-7">
                <h3 className="mb-2 font-[family-name:var(--font-display)] text-[1.0625rem] font-normal tracking-[-0.01em] text-[var(--ink)]">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[var(--body)]">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mb-8 max-w-3xl">
            <Kicker className="mb-5">How HALO goes in: four movements</Kicker>
          </div>
          <div className="max-w-3xl">
            {movements.map((m, i) => (
              <div key={m.step} className="flex gap-6 border-b border-[var(--hair)] py-7 last:border-b-0 md:gap-8">
                <span className="shrink-0 font-[family-name:var(--font-mono)] text-sm font-medium tabular-nums text-id8-orange">
                  {`0${i + 1}`}
                </span>
                <div>
                  <p className="mb-2 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-id8-orange">
                    {m.step}
                  </p>
                  <h3 className="mb-2 font-[family-name:var(--font-display)] text-xl font-normal tracking-[-0.01em] text-[var(--ink)]">
                    {m.title}
                  </h3>
                  <p className="text-[1.0625rem] leading-[1.65] text-[var(--body)]">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 4. THE SPIRAL (HOW WE ENGAGE) ──────────────── */}
      <section id="how-we-work" className="border-t border-[var(--hair)] py-20 md:py-24">
        <Container>
          <SectionHead
            title={<>An engagement that compounds, <em className="italic">not a project that ends.</em></>}
            meta="How it works"
          />
          <Deck className="mt-6 max-w-2xl">
            It starts with a workshop and an audit, moves into a build, and continues as an ongoing partnership. Each engagement builds on the last, and each step is priced to its value, so you always know what you are paying for.
          </Deck>

          <div className="mt-12 mb-12">
            <Pipeline
              title="How an engagement runs"
              steps={[
                { label: '01 Workshop', human: true },
                { label: '02 Audit' },
                { label: '03 Build + install' },
                { label: '04 Custodianship', human: true },
              ]}
            />
          </div>

          <div className="max-w-3xl border-t border-[var(--hair)]">
            {arc.map((item) => (
              <div key={item.step} className="flex gap-6 border-b border-[var(--hair)] py-7 md:gap-8">
                <span className="shrink-0 font-[family-name:var(--font-mono)] text-sm font-medium tabular-nums text-id8-orange">
                  {item.step}
                </span>
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-normal tracking-[-0.01em] text-[var(--ink)]">
                      {item.title}
                    </h3>
                    <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange">{item.price}</span>
                  </div>
                  <p className="text-[1.0625rem] leading-[1.65] text-[var(--body)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl font-[family-name:var(--font-mono)] text-xs leading-relaxed text-[var(--muted)]">
            Transparent, and scoped to the work. No surprise line items, and going live is included, never a separate charge.
          </p>

          <div className="mt-10 max-w-3xl">
            <EditorialButton href="/method" variant="ghost">
              See the full method
              <ArrowRightIcon />
            </EditorialButton>
          </div>
        </Container>
      </section>

      {/* ── 5. THE MEMBRANE (THE MOAT) ─────────────────── */}
      <section className="border-t border-[var(--hair)] py-20 md:py-24">
        <Container>
          <SectionHead
            title={<>You run it. <em className="italic">We keep it true.</em></>}
            meta="After launch"
          />
          <div className="mt-12 max-w-3xl">
            <p className="mb-6 text-[1.0625rem] leading-[1.7] text-[var(--body)]">
              When the system is live, you run it. The everyday, on-brand work happens freely on your side. Anything structural comes back to us. You get autonomy and an anchor at once.
            </p>
            <p className="mb-12 font-[family-name:var(--font-serif)] text-xl italic leading-[1.5] text-[var(--ink)]">
              Most studios hand off and the work drifts within a month. We stay on as custodians, so the brand is still true a year after launch.
            </p>
          </div>

          <div className="grid max-w-4xl gap-6 md:grid-cols-2">
            <EditorialCard>
              <div className="mb-5 flex items-center gap-3">
                <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Day to day</span>
                <span className="h-px flex-1 bg-[var(--hair)]" />
              </div>
              <h3 className="mb-2 font-[family-name:var(--font-display)] text-xl font-normal tracking-[-0.01em] text-[var(--ink)]">
                You and the system
              </h3>
              <p className="text-[15px] leading-relaxed text-[var(--body)]">
                The everyday, on-brand changes happen on your side, fast and on standard. Nothing irreversible happens without a person.
              </p>
            </EditorialCard>
            <EditorialCard featured>
              <div className="mb-5 flex items-center gap-3">
                <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-id8-orange">Structural</span>
                <span className="h-px flex-1 bg-[var(--hair)]" />
              </div>
              <h3 className="mb-2 font-[family-name:var(--font-display)] text-xl font-normal tracking-[-0.01em] text-[var(--ink)]">
                Comes to us
              </h3>
              <p className="text-[15px] leading-relaxed text-[var(--body)]">
                A new look, a shift in voice, a change in the judgment underneath, that is our work. The system never reshapes itself on its own.
              </p>
            </EditorialCard>
          </div>
        </Container>
      </section>

      {/* ── 6. WHO THIS IS FOR / ISN'T FOR ─────────────── */}
      <section className="border-t border-[var(--hair)] py-20 md:py-24">
        <Container>
          <div className="grid max-w-5xl gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-7 flex items-center gap-3 font-[family-name:var(--font-display)] text-2xl font-normal tracking-[-0.01em] text-[var(--ink)]">
                <span className="h-2 w-2 rounded-full bg-id8-orange" />
                Built for operators
              </h2>
              <div>
                {audiences.map((profile, i) => (
                  <div key={i} className="flex items-start gap-3 border-b border-[var(--hair)] py-4 last:border-b-0">
                    <span className="mt-0.5 shrink-0 text-id8-orange">
                      <CheckIcon />
                    </span>
                    <p className="text-[15px] text-[var(--body)]">{profile}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-7 flex items-center gap-3 font-[family-name:var(--font-display)] text-2xl font-normal tracking-[-0.01em] text-[var(--muted)]">
                <span className="h-2 w-2 rounded-full bg-[var(--hair-hard)]" />
                Not for everyone
              </h2>
              <div>
                {notFor.map((profile, i) => (
                  <div key={i} className="flex items-start gap-3 border-b border-[var(--hair)] py-4 last:border-b-0">
                    <span className="mt-1 shrink-0 text-[var(--muted)]">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </span>
                    <p className="text-[15px] text-[var(--muted)]">{profile}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 8. IN THE FIELD ────────────────────────────── */}
      <section className="border-t border-[var(--hair)] py-20 md:py-24">
        <Container>
          <SectionHead
            title={<>Engagements <em className="italic">in the field</em></>}
            meta="Running now"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {engagements.map((e, i) => (
              <EditorialCard key={i} className="flex flex-col">
                <div className="mb-5 flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-id8-orange" />
                  <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange">
                    {e.tag}
                  </p>
                </div>
                <h3 className="mb-3 font-[family-name:var(--font-display)] text-lg font-normal leading-snug tracking-[-0.01em] text-[var(--ink)]">
                  {e.title}
                </h3>
                <p className="flex-grow text-[15px] leading-relaxed text-[var(--body)]">{e.desc}</p>
              </EditorialCard>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 9. CREDIBILITY ─────────────────────────────── */}
      <section className="border-t border-[var(--hair)] py-20 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <Kicker className="mb-5">The studio</Kicker>
            <h2 className="mb-6 font-[family-name:var(--font-display)] font-normal leading-[1.05] tracking-[-0.02em] text-[var(--ink)] text-[clamp(1.875rem,3.5vw,2.5rem)]">
              Built by someone who designs the{' '}
              <em className="italic text-id8-orange">architecture between the tools</em>
            </h2>
            <p className="mb-6 text-[1.0625rem] leading-[1.7] text-[var(--body)]">
              id8Labs is a studio, not an AI lab. We do not sell you a model. We design primitive chains with human gates and deploy them inside your operation, the way a forward-deployed team works: in the building, on your problem, until the system is genuinely carrying the load.
            </p>
            <p className="text-[1.0625rem] leading-[1.7] text-[var(--body)]">
              Twenty years reading human systems, narrative, conflict, how teams actually decide, now applied to the architecture that lets a business reach a scale tools alone cannot deliver.
            </p>
          </div>
        </Container>
      </section>

      {/* ── 10. FAQ ────────────────────────────────────── */}
      <section className="border-t border-[var(--hair)] py-20 md:py-24">
        <Container>
          <SectionHead title={<>Common <em className="italic">questions</em></>} meta="FAQ" />
          <div className="mx-auto mt-12 max-w-3xl">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-[var(--hair)]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-[family-name:var(--font-display)] text-lg font-normal tracking-[-0.01em] text-[var(--ink)]">{faq.q}</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-[var(--muted)] transition-transform duration-200 ${
                      openFaq === i ? 'rotate-45' : ''
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                <div
                  className="grid transition-all duration-300 ease-in-out"
                  style={{ gridTemplateRows: openFaq === i ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6 pr-8">
                      <p className="text-[15px] leading-relaxed text-[var(--body)]">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 11. APPLICATION FORM ────────────────────────── */}
      <section id="apply-form" className="border-t border-[var(--hair)] py-20 md:py-24">
        <Container narrow>
          <div className="mb-12 text-center">
            <Kicker dot className="mb-5 justify-center">
              Start here
            </Kicker>
            <h2 className="mb-5 font-[family-name:var(--font-display)] font-normal leading-[1.02] tracking-[-0.03em] text-[var(--ink)] text-[clamp(2.25rem,5vw,3.5rem)]">
              Start the <em className="italic text-id8-orange">conversation</em>
            </h2>
            <p className="mx-auto max-w-md text-[1.0625rem] leading-[1.6] text-[var(--body)]">
              We take on a limited number of engagements at a time. Tell us how your operation actually runs, and we will tell you whether the workshop or a full audit is the right first step.
            </p>
          </div>

          {formState === 'success' ? (
            <div className="border border-[var(--hair)] border-t-2 border-t-id8-orange bg-[var(--paper-shadow)] py-16 text-center">
              <p className="mb-2 font-[family-name:var(--font-display)] text-2xl font-normal text-[var(--ink)]">You are in.</p>
              <p className="text-[var(--body)]">We will read what you sent and reach out within 48 hours with the right first step.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 border border-[var(--hair)] bg-[var(--paper-shadow)] p-7 md:p-10">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClassName}>Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClassName}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClassName}>Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClassName}
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="company" className={labelClassName}>Company / Firm</label>
                  <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={inputClassName}
                    placeholder="Your company or firm"
                  />
                </div>
                <div>
                  <label htmlFor="teamType" className={labelClassName}>What does your team do?</label>
                  <select
                    id="teamType"
                    value={formData.teamType}
                    onChange={(e) => setFormData({ ...formData, teamType: e.target.value })}
                    className={selectClassName}
                    style={{ backgroundImage: selectChevron }}
                  >
                    <option value="">Select...</option>
                    <option value="professional-services">Professional services (legal, advisory)</option>
                    <option value="agency-studio">Agency / studio</option>
                    <option value="founder">Founder / small operator</option>
                    <option value="media-company">Media / production company</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="teamSize" className={labelClassName}>Team size</label>
                  <select
                    id="teamSize"
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className={selectClassName}
                    style={{ backgroundImage: selectChevron }}
                  >
                    <option value="">Select...</option>
                    <option value="1-3">1-3 people</option>
                    <option value="4-10">4-10 people</option>
                    <option value="11-25">11-25 people</option>
                    <option value="25+">25+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="stage" className={labelClassName}>Where do you want to start?</label>
                  <select
                    id="stage"
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                    className={selectClassName}
                    style={{ backgroundImage: selectChevron }}
                  >
                    <option value="">Not sure yet</option>
                    <option value="workshop">A workshop</option>
                    <option value="audit">A full audit</option>
                    <option value="build">Ready to build</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="timeDrain" className={labelClassName}>
                  How does your operation actually run today? Where does it leak?
                </label>
                <textarea
                  id="timeDrain"
                  required
                  rows={3}
                  value={formData.timeDrain}
                  onChange={(e) => setFormData({ ...formData, timeDrain: e.target.value })}
                  className={`${inputClassName} resize-none`}
                  placeholder="E.g., client intake and follow-ups eat a day a week, and nothing stays consistent across the team..."
                />
              </div>

              <div>
                <label htmlFor="timeline" className={labelClassName}>When do you want to be running?</label>
                <select
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className={selectClassName}
                  style={{ backgroundImage: selectChevron }}
                >
                  <option value="">Select...</option>
                  <option value="asap">As soon as possible</option>
                  <option value="1-month">Within a month</option>
                  <option value="2-3-months">2-3 months</option>
                  <option value="exploring">Just exploring</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={formState === 'submitting'}
                className="w-full cursor-pointer border border-[var(--ink)] bg-[var(--ink)] px-6 py-4 font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] text-[var(--paper)] transition-colors duration-150 hover:border-id8-orange hover:bg-id8-orange disabled:cursor-not-allowed disabled:opacity-50"
              >
                {formState === 'submitting' ? 'Sending...' : 'Start the conversation'}
              </button>

              <p className="text-center font-[family-name:var(--font-mono)] text-xs leading-relaxed text-[var(--muted)]">
                No commitment. We will read what you sent and tell you the right first step, or if this is not the right fit.
              </p>

              {formState === 'error' && (
                <p className="text-center text-sm text-id8-orange">
                  Something went wrong. Try again or email us directly at eb@id8labs.tech
                </p>
              )}
            </form>
          )}
        </Container>
      </section>

    </div>
  )
}
