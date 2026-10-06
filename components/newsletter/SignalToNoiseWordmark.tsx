import Image from 'next/image'
import { NEWSLETTER_NAME } from '@/lib/newsletter/brand'

/** Selected-signal lockup: outlined lettering keeps its identity independent of page fonts. */
export default function SignalToNoiseWordmark({ className = '' }: { className?: string }) {
  return <Image src="/brand/signal-to-noise-wordmark.svg" alt={NEWSLETTER_NAME}
    width={450} height={196} className={`h-auto max-w-full ${className}`} />
}
