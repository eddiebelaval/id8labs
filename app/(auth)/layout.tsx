import BrandName from '@/components/BrandName'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <div className="mx-auto w-full px-6 md:px-9 py-10" style={{ maxWidth: '760px' }}>
        <header className="mb-16">
          <Link href="/" className="inline-block">
            <BrandName className="text-3xl" />
          </Link>
        </header>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
