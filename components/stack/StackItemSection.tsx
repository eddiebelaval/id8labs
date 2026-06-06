import Link from 'next/link'

interface StackItem {
  id: string
  name: string
  description: string
  slug?: string
  type: string
}

interface StackItemSectionProps {
  title: string
  emoji: string
  items: StackItem[]
  linkPrefix?: string
}

export function StackItemSection({ title, emoji, items, linkPrefix }: StackItemSectionProps): React.ReactElement | null {
  if (items.length === 0) return null

  const content = items.map((item) => {
    const itemContent = (
      <>
        <h4 className="font-[family-name:var(--font-display)] font-normal text-[var(--ink)]">{item.name}</h4>
        <p className="text-sm text-[var(--body)] line-clamp-2">
          {item.description}
        </p>
      </>
    )

    if (linkPrefix && item.slug) {
      return (
        <Link
          key={item.id}
          href={`${linkPrefix}${item.slug}`}
          className="block p-3 border border-[var(--hair)] transition-colors duration-150 hover:bg-[var(--paper-shadow)] hover:border-[var(--hair-hard)]"
        >
          {itemContent}
        </Link>
      )
    }

    return (
      <div
        key={item.id}
        className="p-3 border border-[var(--hair)]"
      >
        {itemContent}
      </div>
    )
  })

  return (
    <div className="border border-[var(--hair)] p-6">
      <h3 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-4">
        {title} ({items.length})
      </h3>
      <div className="space-y-2">{content}</div>
    </div>
  )
}
