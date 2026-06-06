import { Container } from '@/components/editorial'

interface Metric {
  label: string
  value: string
}

interface SocialProofStripProps {
  essayCount?: number
  productsShipping?: number
  activeProjects?: number
  startYear?: number
}

const DEFAULT_METRICS = {
  essayCount: 75,
  productsShipping: 4,
  activeProjects: 10,
  startYear: 2024,
}

export default function SocialProofStrip({
  essayCount = DEFAULT_METRICS.essayCount,
  productsShipping = DEFAULT_METRICS.productsShipping,
  activeProjects = DEFAULT_METRICS.activeProjects,
  startYear = DEFAULT_METRICS.startYear,
}: SocialProofStripProps) {
  const metrics: Metric[] = [
    { value: String(essayCount), label: 'Essays published' },
    { value: String(productsShipping), label: 'Products shipping' },
    { value: String(activeProjects), label: 'Active projects' },
    { value: String(startYear), label: 'Building in public since' },
  ]

  return (
    <section className="border-b border-[var(--hair)]">
      <Container>
        <div className="flex flex-wrap items-baseline justify-center gap-x-10 gap-y-3 py-6 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)] lg:justify-between">
          {metrics.map((metric) => (
            <span key={metric.label} className="flex items-baseline gap-2">
              <b className="font-[family-name:var(--font-display)] text-2xl font-normal leading-none text-[var(--ink)]">
                {metric.value}
              </b>
              {metric.label}
            </span>
          ))}
        </div>
      </Container>
    </section>
  )
}
