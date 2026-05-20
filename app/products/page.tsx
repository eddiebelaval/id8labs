import type { Metadata } from 'next'
import ProductsContent from './ProductsContent'

export const metadata: Metadata = {
  title: 'Products - ID8Labs',
  description: 'Primitive chains shipping from the lab. Each product is the architecture applied to a specific domain, battle-tested in production.',
}

export default function ProductsPage() {
  return <ProductsContent />
}
