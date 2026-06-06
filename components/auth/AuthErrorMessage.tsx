interface AuthErrorMessageProps {
  error: string | null
}

export function AuthErrorMessage({ error }: AuthErrorMessageProps): React.ReactElement | null {
  if (!error) return null

  return (
    <div className="p-3 border-l-2 border-id8-orange bg-[var(--paper-shadow)]">
      <p className="text-sm text-[var(--body)]">{error}</p>
    </div>
  )
}
