import { featuredHomeProducts } from '@/lib/home-products'

export const STUDIO_DESCRIPTION =
  'id8Labs is an independent software studio in Miami. Explore AI tools for writing and conversation, discoveries from the lab, and an open notebook on building with AI.'

export const studioNavigation = [
  { href: '/products', label: 'Software', description: 'Useful tools, built in the lab' },
  { href: '/lab', label: 'The lab', description: 'Discoveries and experiments' },
  { href: '/writing', label: 'Notebook', description: 'Essays, research, and Shipped.' },
  { href: '/academy', label: 'Academy', description: 'Free courses to learn with AI' },
] as const

// The front-door selection derives availability from the complete portfolio.
// Selecting a product here never removes the others from /products.
const selection = [
  { name: 'Composer', href: '/products/composer', image: '/images/composer-preview.webp',
    outcome: 'A writing partner that remembers your story.',
    summary: 'Keep your characters, research, and drafts together. Pick up the work without starting the conversation over.' },
  { name: 'Parallax', href: '/products/parallax', image: '/images/parallax-preview.webp',
    outcome: 'Someone to talk things through with.',
    summary: 'Ava listens, remembers, and helps you make sense of what is happening. A place to prepare for the conversations that matter.' },
  { name: 'Rune', href: '/products/rune', image: '/images/rune-preview.webp',
    outcome: 'Speak your way into a manuscript.',
    summary: 'Talk with Sam, your scribe. Turn memories and raw conversation into a book, from the first interview to the finished draft.' },
] as const

export const studioProducts = selection.map((selection) => {
  const product = featuredHomeProducts.find((product) => product.name === selection.name)
  if (!product) throw new Error(`Studio selection missing from portfolio: ${selection.name}`)
  return { ...product, ...selection }
})
