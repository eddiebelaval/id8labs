'use client'

import { CheckCircle, Download, Star, Github } from 'lucide-react'

interface TrustBadgesProps {
  verified?: boolean
  installCount?: number
  rating?: number
  reviewCount?: number
  githubStars?: number
  variant?: 'inline' | 'stacked' | 'compact'
  className?: string
}

const metaCls = 'font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]'

export function TrustBadges({
  verified,
  installCount,
  rating,
  reviewCount,
  githubStars,
  variant = 'inline',
  className = '',
}: TrustBadgesProps) {
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 ${metaCls} ${className}`}>
        {verified && <span className="text-teal"><CheckCircle className="w-3.5 h-3.5" /></span>}
        {installCount !== undefined && installCount > 0 && (
          <span className="flex items-center gap-1">
            <Download className="w-3.5 h-3.5" />
            {formatNumber(installCount)}
          </span>
        )}
        {rating !== undefined && rating > 0 && (
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-id8-orange fill-id8-orange" />
            {rating.toFixed(1)}
          </span>
        )}
      </div>
    )
  }

  if (variant === 'stacked') {
    return (
      <div className={`space-y-2 ${className}`}>
        {verified && <VerifiedBadge size="lg" />}
        {installCount !== undefined && installCount > 0 && (
          <div className={`flex items-center gap-2 ${metaCls}`}>
            <Download className="w-4 h-4" />
            <span><b className="text-[var(--ink)] font-medium">{formatNumber(installCount)}</b> installs</span>
          </div>
        )}
        {rating !== undefined && rating > 0 && (
          <div className={`flex items-center gap-2 ${metaCls}`}>
            <Star className="w-4 h-4 text-id8-orange fill-id8-orange" />
            <span><b className="text-[var(--ink)] font-medium">{rating.toFixed(1)}</b> ({reviewCount || 0} reviews)</span>
          </div>
        )}
        {githubStars !== undefined && githubStars > 0 && (
          <div className={`flex items-center gap-2 ${metaCls}`}>
            <Github className="w-4 h-4" />
            <span><b className="text-[var(--ink)] font-medium">{formatNumber(githubStars)}</b> stars</span>
          </div>
        )}
      </div>
    )
  }

  // Default: inline
  return (
    <div className={`flex flex-wrap items-center gap-4 ${metaCls} ${className}`}>
      {verified && <VerifiedBadge />}
      {installCount !== undefined && installCount > 0 && (
        <span className="flex items-center gap-1.5">
          <Download className="w-4 h-4" />
          {formatNumber(installCount)} installs
        </span>
      )}
      {rating !== undefined && rating > 0 && (
        <span className="flex items-center gap-1.5">
          <Star className="w-4 h-4 text-id8-orange fill-id8-orange" />
          {rating.toFixed(1)}
          {reviewCount !== undefined && reviewCount > 0 && <span>({reviewCount})</span>}
        </span>
      )}
      {githubStars !== undefined && githubStars > 0 && (
        <span className="flex items-center gap-1.5">
          <Github className="w-4 h-4" />
          {formatNumber(githubStars)}
        </span>
      )}
    </div>
  )
}

const badgeBase =
  'inline-flex items-center font-[family-name:var(--font-narrow)] font-semibold uppercase tracking-[0.15em]'

const badgeSize: Record<string, string> = {
  sm: 'text-[9px] gap-1',
  default: 'text-[10px] gap-1',
  lg: 'text-[11px] gap-1.5',
}

const iconSize: Record<string, string> = {
  sm: 'w-3 h-3',
  default: 'w-3.5 h-3.5',
  lg: 'w-4 h-4',
}

// Individual badge components
export function VerifiedBadge({ size = 'default' }: { size?: 'sm' | 'default' | 'lg' }) {
  return (
    <span className={`${badgeBase} ${badgeSize[size]} text-teal`}>
      <CheckCircle className={iconSize[size]} />
      Verified
    </span>
  )
}

export function OfficialBadge({ size = 'default' }: { size?: 'sm' | 'default' | 'lg' }) {
  return (
    <span className={`${badgeBase} ${badgeSize[size]} text-id8-orange`}>
      id8Labs
    </span>
  )
}

export function FeaturedBadge({ size = 'default' }: { size?: 'sm' | 'default' | 'lg' }) {
  return (
    <span className={`${badgeBase} ${badgeSize[size]} text-id8-orange`}>
      <Star className={`${iconSize[size]} fill-current`} />
      Featured
    </span>
  )
}

// Complexity badge
export function ComplexityBadge({
  complexity,
  size = 'default',
}: {
  complexity: 'simple' | 'complex' | 'multi-agent'
  size?: 'sm' | 'default' | 'lg'
}) {
  const label =
    complexity === 'multi-agent' ? 'Multi-Agent' : complexity === 'complex' ? 'Complex' : 'Simple'
  const pad = size === 'lg' ? 'px-2.5 py-1' : 'px-2 py-1'

  return (
    <span className={`${badgeBase} ${badgeSize[size]} ${pad} bg-[var(--paper-mid)] text-[var(--muted)]`}>
      {label}
    </span>
  )
}

// Quality tier badge
export function QualityTierBadge({
  tier,
  size = 'default',
}: {
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  size?: 'sm' | 'default' | 'lg'
}) {
  const pad = size === 'lg' ? 'px-2.5 py-1' : 'px-2 py-1'
  return (
    <span className={`${badgeBase} ${badgeSize[size]} ${pad} bg-[var(--paper-mid)] text-[var(--muted)]`}>
      {tier}
    </span>
  )
}

// Star rating display
export function StarRating({
  rating,
  maxRating = 5,
  size = 'default',
  showValue = true,
}: {
  rating: number
  maxRating?: number
  size?: 'sm' | 'default' | 'lg'
  showValue?: boolean
}) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className={`${iconSize[size]} text-id8-orange fill-id8-orange`} />
      ))}
      {hasHalfStar && (
        <Star className={`${iconSize[size]} text-id8-orange fill-id8-orange opacity-60`} />
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className={`${iconSize[size]} text-[var(--hair-hard)]`} />
      ))}
      {showValue && (
        <span className="ml-1 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

// Helper function
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export default TrustBadges
