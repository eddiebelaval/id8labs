import type { ReactNode } from 'react'

/**
 * Pipeline diagram — mono step boxes joined by arrows, with optional
 * "human" steps highlighted in orange. Used to depict ordered processes
 * (e.g. the weekly Shipped pipeline, a product flow, a service engagement).
 */

export type PipelineStep = {
  label: ReactNode
  human?: boolean
}

export function Pipeline({
  title,
  steps,
}: {
  title?: ReactNode
  steps: PipelineStep[]
}) {
  return (
    <div className="cut-frame">
      <div className="cut-fill bg-[var(--paper-shadow)] p-7 md:p-9">
        {title && (
          <div className="mb-4 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            {title}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3 font-[family-name:var(--font-mono)] text-[13px]">
          {steps.map((step, i) => (
            <span key={i} className="flex items-center gap-3">
              <span
                className={
                  step.human
                    ? 'cut-tr whitespace-nowrap bg-id8-orange px-3.5 py-2 font-semibold text-[var(--paper)]'
                    : 'cut-tr whitespace-nowrap border border-[var(--hair-hard)] bg-[var(--paper)] px-3.5 py-2 text-[var(--ink)]'
                }
              >
                {step.label}
              </span>
              {i < steps.length - 1 && (
                <span className="text-[var(--muted)]">&rarr;</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
