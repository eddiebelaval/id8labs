export function AuthDivider(): React.ReactElement {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[var(--hair)]" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-4 bg-[var(--paper)] font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
          or continue with email
        </span>
      </div>
    </div>
  )
}
