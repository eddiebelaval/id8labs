import Image from 'next/image'
import { NEWSLETTER_NAME } from '@/lib/newsletter/brand'

// Served as-is: Next only bypasses the optimizer for a src ending in `.svg`, and
// the cache-busting `?v=2` (Cloudflare held a pre-launch 404) breaks that test,
// so without `unoptimized` the SVG went to /_next/image, which refuses SVG (400).
export const SIGNAL_TO_NOISE_WORDMARK_SRC = '/brand/signal-to-noise-wordmark.svg?v=2'

/** Selected-signal lockup: outlined lettering keeps its identity independent of page fonts. */
export default function SignalToNoiseWordmark({ className = '' }: { className?: string }) {
  return <Image src={SIGNAL_TO_NOISE_WORDMARK_SRC} alt={NEWSLETTER_NAME} unoptimized
    width={450} height={196} className={`h-auto max-w-full ${className}`} />
}
