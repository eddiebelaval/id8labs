export function AuthLoadingFallback(): React.ReactElement {
  return (
    <div className="bg-[var(--paper)] border border-[var(--hair)] p-8">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-[var(--paper-shadow)] w-3/4" />
        <div className="h-4 bg-[var(--paper-shadow)] w-1/2" />
        <div className="h-12 bg-[var(--paper-shadow)] mt-8" />
      </div>
    </div>
  )
}
