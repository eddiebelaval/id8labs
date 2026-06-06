export default function BrandName({ className = '' }: { className?: string }) {
  return (
    <span
      className={`font-[family-name:var(--font-serif)] font-medium tracking-tight ${className}`}
    >
      <span className="text-id8-orange">id8</span>Labs
    </span>
  )
}
