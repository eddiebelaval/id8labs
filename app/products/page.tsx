import type { Metadata } from 'next'
import ProductsContent from './ProductsContent'

export const metadata: Metadata = {
  title: 'Software from the Lab',
  description: 'Explore software from id8Labs for writing, conversation, research, and everyday work. Available tools, beta projects, and experiments, with their status clearly marked.',
  alternates: { canonical: '/products' },
}

export default function ProductsPage() {
  return <ProductsContent />
}
