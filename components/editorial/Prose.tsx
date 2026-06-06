import type { ReactNode } from 'react'

/**
 * Prose — editorial long-form body. Serif-friendly measure, hairline rules
 * for hr, orange link underlines, mono code. Wrap article/MDX content in
 * this to get consistent reader typography across writing, essays, thesis,
 * and academy modules.
 *
 * Pairs with the `.prose-essay` rules in globals.css for code blocks.
 */
export function Prose({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={[
        'prose-essay max-w-[680px]',
        // headings
        '[&_h1]:font-[family-name:var(--font-display)] [&_h2]:font-[family-name:var(--font-display)] [&_h3]:font-[family-name:var(--font-display)]',
        '[&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:mt-9 [&_h3]:mb-3',
        // body
        '[&_p]:text-[1.0625rem] [&_p]:leading-[1.7] [&_p]:text-[var(--body)] [&_p]:mb-5',
        // links
        '[&_a]:text-[var(--ink)] [&_a]:border-b [&_a]:border-[var(--hair)] hover:[&_a]:border-id8-orange [&_a]:transition-colors',
        // lists
        '[&_ul]:my-5 [&_ul]:pl-5 [&_ul]:list-disc [&_ol]:my-5 [&_ol]:pl-5 [&_ol]:list-decimal [&_li]:mb-2 [&_li]:text-[var(--body)]',
        // blockquote — italic serif, orange rule
        '[&_blockquote]:my-7 [&_blockquote]:border-l-2 [&_blockquote]:border-id8-orange [&_blockquote]:pl-5 [&_blockquote]:font-[family-name:var(--font-serif)] [&_blockquote]:italic [&_blockquote]:text-[var(--muted)]',
        // inline code
        '[&_code]:font-[family-name:var(--font-mono)] [&_code]:text-[0.9em] [&_code]:bg-[var(--paper-mid)] [&_code]:px-1.5 [&_code]:py-0.5',
        // hr
        '[&_hr]:my-10 [&_hr]:h-px [&_hr]:border-0 [&_hr]:bg-[var(--hair)]',
        // images sharp
        '[&_img]:rounded-none [&_img]:border [&_img]:border-[var(--hair)]',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}
