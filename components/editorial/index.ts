/**
 * Editorial UI kit — the "Shipped." design language as reusable React.
 *
 * Import from '@/components/editorial'. Every cluster of the redesign
 * builds from these primitives so the whole site reads as one publication.
 * See docs/EDITORIAL_SYSTEM.md for the contract.
 */

export {
  Container,
  Kicker,
  Deck,
  Rule,
  Hairline,
  SectionHead,
  MetaRow,
  Tag,
  TagRow,
} from './primitives'
export { EditorialButton } from './Button'
export { EditorialCard, IssueCard } from './Card'
export { Pipeline } from './Pipeline'
export type { PipelineStep } from './Pipeline'
export { SubscribeForm } from './SubscribeForm'
export { Prose } from './Prose'
export { PubBar } from './PubBar'
