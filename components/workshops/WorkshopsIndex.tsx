import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Container, Deck, Kicker, Rule } from '@/components/editorial'

/**
 * Teaching index at /workshops. Facts in the two stories come from the
 * journal posts they link to. Miami Lakes is the home base. The journal
 * essay still says Doral for Presencia; leave that sentence as written.
 * The bank-night headcount stays the journal's words: thirty to forty.
 */

export type WorkshopsLocale = 'en' | 'es'

const textLink =
  'inline-flex items-center gap-2 py-2 font-[family-name:var(--font-narrow)] text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink)] transition-colors hover:text-id8-orange'

const meta = 'font-[family-name:var(--font-mono)] text-[11px] text-[var(--muted)]'

type StoryLink = { href: string; label: string }

type Story = {
  meta: string
  title: string
  summary: string
  links: StoryLink[]
}

type Copy = {
  kicker: string
  titleLead: string
  titleEm: string
  titleTail: string
  deck: string
  section: string
  stories: Story[]
}

const copy: Record<WorkshopsLocale, Copy> = {
  en: {
    kicker: 'Miami Lakes',
    titleLead: 'Teaching from ',
    titleEm: 'Miami Lakes',
    titleTail: '.',
    deck: 'Eddie helps small-business owners and people learn AI tools such as Claude Code, so they can build their own infrastructure for their own work. Miami Lakes is the home base. The teaching happens wherever it fits: a room, a small group, or one person at a time, in English and in Spanish. Sessions vary.',
    section: 'From the journal',
    stories: [
      {
        meta: 'September 24 · Miami Lakes',
        title: 'The US Century Bank night',
        summary:
          'Written September 17, the week before the night, and left as it was. US Century Bank hosted thirty to forty of its small-business clients, owners who run clinics and firms and crews, in a university room in Miami Lakes. They are not technical. Half of them listened in Spanish. Jose opened, Eddie took three topics, Cameron took three, Allie took one, and Jose closed by handing every person a one-page AI policy they can put in front of their team on Monday. The three topics Eddie took are about what you type: what never goes into a chatbot, what to ask yourself before you paste, and why a team is already using AI in secret.',
        links: [{ href: '/writing/the-paper-stays', label: 'Read the journal' }],
      },
      {
        meta: 'Late May · UAGM, Miami Lakes',
        title: 'Presencia',
        summary:
          'A session for professionals, with Jose and Profesa, at UAGM (Universidad Ana G. Méndez) in Miami Lakes. It is called Presencia, the Spanish word for what that series is building. The journal calls it the essay made visceral: a room of business owners, live demos, and a single Monday action, set for late May. Presence, Not Tools is the third article written for that room.',
        links: [
          { href: '/writing/presence-not-tools', label: 'Presence, Not Tools' },
          {
            href: '/writing/your-next-ai-hire-is-already-on-your-payroll',
            label: 'Your Next AI Hire Is Already on Your Payroll',
          },
        ],
      },
    ],
  },
  es: {
    kicker: 'Miami Lakes',
    titleLead: 'Enseñanza desde ',
    titleEm: 'Miami Lakes',
    titleTail: '.',
    deck: 'Eddie ayuda a dueños de pequeños negocios y a otras personas a aprender herramientas de inteligencia artificial, como Claude Code, para construir su propia infraestructura para su propio trabajo. Miami Lakes es la base. La enseñanza ocurre donde haga falta: en una sala, en un grupo pequeño o de uno en uno, en inglés y en español. Las sesiones varían.',
    section: 'Del diario',
    stories: [
      {
        meta: '24 de septiembre · Miami Lakes',
        title: 'La noche de US Century Bank',
        summary:
          'Escrito el 17 de septiembre, la semana antes de la noche, y dejado tal cual. US Century Bank reunió a entre treinta y cuarenta de sus clientes, dueños de clínicas, firmas y cuadrillas, en un salón universitario en Miami Lakes. No eran un público técnico. La mitad escuchó en español. Jose abrió, Eddie tomó tres temas, Cameron tomó tres, Allie tomó uno, y Jose cerró entregándole a cada persona una política de IA de una página para poner frente a su equipo el lunes. Los tres temas de Eddie son sobre lo que uno escribe: qué nunca debe entrar en un chatbot, qué preguntarse antes de pegar un texto y por qué el equipo ya está usando inteligencia artificial en secreto.',
        links: [{ href: '/writing/the-paper-stays', label: 'Leer el diario' }],
      },
      {
        meta: 'Finales de mayo · UAGM, Miami Lakes',
        title: 'Presencia',
        summary:
          'Una sesión para profesionales, con Jose y Profesa, en la UAGM (Universidad Ana G. Méndez), en Miami Lakes. Se llama Presencia, la palabra en español que nombra lo que esa serie está construyendo. El diario lo llama el ensayo vuelto experiencia: una sala de dueños de negocios, demostraciones en vivo y una sola acción para el lunes, fijado para finales de mayo. Presence, Not Tools es el tercer artículo escrito para esa sala.',
        links: [
          { href: '/writing/presence-not-tools', label: 'Presence, Not Tools' },
          {
            href: '/writing/your-next-ai-hire-is-already-on-your-payroll',
            label: 'Your Next AI Hire Is Already on Your Payroll',
          },
        ],
      },
    ],
  },
}

function LanguageToggle({ locale }: { locale: WorkshopsLocale }) {
  const item = (active: boolean) =>
    active ? 'text-[var(--ink)]' : 'text-[var(--muted)] hover:text-[var(--ink)]'
  const label = locale === 'es' ? 'Idioma' : 'Language'
  return (
    <nav
      aria-label={label}
      className="flex items-center gap-3 font-[family-name:var(--font-narrow)] text-xs font-semibold uppercase tracking-[0.18em]"
    >
      <Link href="/workshops" hrefLang="en" lang="en" aria-current={locale === 'en' ? 'page' : undefined} className={item(locale === 'en')}>
        English
      </Link>
      <span aria-hidden="true" className="text-[var(--hair-hard)]">
        /
      </span>
      <Link href="/es/workshops" hrefLang="es" lang="es" aria-current={locale === 'es' ? 'page' : undefined} className={item(locale === 'es')}>
        Español
      </Link>
    </nav>
  )
}

export function WorkshopsIndex({ locale }: { locale: WorkshopsLocale }) {
  const page = copy[locale]
  return (
    <article lang={locale} className="bg-[var(--paper)] text-[var(--body)]">
      <Container className="pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Kicker dot>{page.kicker}</Kicker>
          <LanguageToggle locale={locale} />
        </div>
        <h1 className="mt-6 max-w-4xl">
          {page.titleLead}
          <em>{page.titleEm}</em>
          {page.titleTail}
        </h1>
        <Deck className="mt-6 max-w-2xl">{page.deck}</Deck>
        <Rule className="mt-12" />
        <p className={`${meta} mb-0 mt-8 uppercase tracking-[0.18em]`}>{page.section}</p>
        <div className="mt-2">
          {page.stories.map((story) => (
            <section key={story.title} className="border-b border-[var(--hair)] py-10">
              <p className={`${meta} mb-0`}>{story.meta}</p>
              <h2 className="mt-3 max-w-3xl">{story.title}</h2>
              <p className="mb-0 mt-4 max-w-2xl text-base leading-relaxed text-[var(--body)]">{story.summary}</p>
              <div className="mt-5 flex flex-col items-start gap-1 sm:flex-row sm:flex-wrap sm:gap-x-8">
                {story.links.map((link) => (
                  <Link key={link.href} href={link.href} className={textLink}>
                    {link.label}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </article>
  )
}
