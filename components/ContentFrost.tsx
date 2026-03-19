'use client'

import { usePathname } from 'next/navigation'

export default function ContentFrost({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Homepage and thesis page manage their own backgrounds — no frost needed.
  // Always render the wrapper div to avoid hydration mismatch (server vs client tree).
  const skipFrost = pathname === '/' || pathname === '/thesis'

  return (
    <div className={skipFrost ? undefined : 'attractor-frost'}>
      {children}
    </div>
  )
}
