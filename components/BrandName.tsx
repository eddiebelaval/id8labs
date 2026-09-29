// The id8Labs horizontal lockup (dial i + wordmark, orange i dot).
// Source of truth: id8 repo, identity/id8labs-mark/family/ (tag id8labs-brand-v1.0),
// copied into public/brand/ by export/site.mjs. Never redraw it here.
// viewBox is 755.48 x 240, so width follows height at about 3.15:1.
export default function BrandName({ className = 'h-9' }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/id8labs-lockup.svg"
      alt="id8Labs"
      width={113}
      height={36}
      className={`block w-auto ${className}`}
    />
  )
}
