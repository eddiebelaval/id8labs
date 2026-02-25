'use client'

import { usePathname } from 'next/navigation'

export default function ContentFrost({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Homepage manages its own frost zones (hero stays clear, content below gets frost)
  if (pathname === '/') return <>{children}</>

  // All other pages get the frosted layer so the attractor doesn't fight UI content
  return <div className="attractor-frost">{children}</div>
}
