import Link from 'next/link'
import Image from 'next/image'
import {
  Container,
  Kicker,
  Deck,
  EditorialCard,
  Tag,
} from '@/components/editorial'
import {
  featuredHomeProducts,
  showcaseHomeProducts,
  type HomeProduct,
} from '@/lib/home-products'

const PREVIEW_IMAGES: Record<string, { src: string; alt: string }> = {
  Composer: {
    src: '/images/composer-preview.webp',
    alt: 'id8Composer - AI Writing Partner with Knowledge Base, Canvas, and Sandbox',
  },
  DeepStack: {
    src: '/images/deepstack-preview.webp',
    alt: 'DeepStack - Trading Research Platform with AI Analysis and Process Integrity',
  },
  MILO: {
    src: '/products/milo/milo-dashboard.png',
    alt: 'MILO - Signal-to-noise task manager with Claude Code integration',
  },
  Parallax: {
    src: '/images/parallax-preview.webp',
    alt: 'Parallax - Someone to talk to, powered by Claude. Ava helps you process and prepare for hard conversations.',
  },
  Rune: {
    src: '/images/rune-preview.webp',
    alt: 'Rune - Voice-first book writer. Speak your book into existence with Sam.',
  },
  HOMER: {
    src: '/products/homer/homer-dashboard.png',
    alt: 'HOMER - Deal and negotiation automation platform',
  },
}

function ProductPreview({ product }: { product: HomeProduct }) {
  const img = PREVIEW_IMAGES[product.name]
  if (!img) return null
  return (
    <div className="relative h-48 w-full overflow-hidden border border-[var(--hair)] md:h-64 lg:h-72">
      <Image
        src={img.src}
        alt={img.alt}
        fill
        className="object-cover object-top"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />
    </div>
  )
}

function FeaturedCard({ product }: { product: HomeProduct }) {
  const content = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Left - Content */}
      <div>
        <div className="mb-6 flex items-center gap-3">
          <Tag>{product.statusLabel}</Tag>
          <span className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            {product.status === 'shipping' ? 'Shipping now' : 'In the lab'}
          </span>
        </div>

        <h3 className="mb-6 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] text-[var(--ink)] text-4xl md:text-5xl">
          {product.name}
        </h3>

        <p className="mb-8 font-[family-name:var(--font-serif)] text-lg md:text-xl leading-relaxed text-[var(--body)]">
          {product.description}
        </p>

        <span className="font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.22em] text-id8-orange">
          {product.external ? 'Launch app' : 'Learn more'} &rarr;
        </span>
      </div>

      {/* Right - Product Preview */}
      <div className="order-first lg:order-last">
        <ProductPreview product={product} />
      </div>
    </div>
  )

  if (product.external) {
    return (
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block border border-[var(--hair)] p-7 transition-colors duration-200 hover:bg-[var(--paper-shadow)] hover:border-[var(--hair-hard)]"
      >
        {content}
      </a>
    )
  }

  return (
    <EditorialCard href={product.link || '#'}>{content}</EditorialCard>
  )
}

function ProductCard({ product }: { product: HomeProduct }) {
  const content = (
    <div className="flex h-full flex-col">
      <div className="mb-4">
        <Tag>{product.statusLabel}</Tag>
      </div>

      <h3 className="mb-4 font-[family-name:var(--font-display)] font-normal tracking-[-0.015em] text-[var(--ink)] text-2xl md:text-3xl">
        {product.name}
      </h3>

      <p className="mb-6 flex-grow leading-relaxed text-[var(--body)]">
        {product.description}
      </p>

      {product.link && (
        <span className="font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.22em] text-id8-orange">
          Learn more &rarr;
        </span>
      )}
    </div>
  )

  if (!product.link) {
    return (
      <div className="border border-[var(--hair)] p-7 opacity-75">{content}</div>
    )
  }

  if (product.external) {
    return (
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full border border-[var(--hair)] p-7 transition-colors duration-200 hover:bg-[var(--paper-shadow)] hover:border-[var(--hair-hard)]"
      >
        {content}
      </a>
    )
  }

  return (
    <EditorialCard href={product.link} className="h-full">
      {content}
    </EditorialCard>
  )
}

export default function ProductGrid() {
  return (
    <section id="products" className="py-20 md:py-24 scroll-mt-20">
      <Container>
        <div className="grid lg:grid-cols-[1fr_2fr] gap-14 lg:gap-24">
          {/* Left - Sticky Section Header */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Kicker className="mb-4">The Work</Kicker>
            <h2 className="mb-6 font-[family-name:var(--font-display)] font-normal leading-[1.05] tracking-[-0.02em] text-[var(--ink)] text-[clamp(2.25rem,4.5vw,3.5rem)]">
              Proof, not a{' '}
              <em className="italic font-normal text-id8-orange">portfolio</em>
            </h2>
            <Deck>
              We run the method on our own problems first. Every product here is the same
              primitive-chain architecture, proven by shipping it ourselves.
            </Deck>
          </div>

          {/* Right - Products Content */}
          <div className="space-y-12">
            {/* Featured Products - Shipping Now */}
            <div className="space-y-8">
              {featuredHomeProducts.map((product) => (
                <FeaturedCard key={product.name} product={product} />
              ))}
            </div>

            {/* More from the Lab - Compact Grid */}
            <div>
              <h3 className="mb-6 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                More from the Lab
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {showcaseHomeProducts.map((product) => (
                  <ProductCard key={product.name} product={product} />
                ))}
              </div>

              {/* See All Link */}
              <div className="mt-8">
                <Link
                  href="/products"
                  className="font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.22em] text-id8-orange transition-colors hover:text-[var(--ink)]"
                >
                  See all products &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
