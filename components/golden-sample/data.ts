export interface ProductionUnit {
  name: string
  entity: string
  domain: string
  status: string
  methodology: 'inclusion-first' | 'inversion-first'
  fileCount: number
  directories: string[]
  has: string[]
  excludes: string[]
  insight: string
  color: string
}

export const PRODUCTION_UNITS: ProductionUnit[] = [
  {
    name: 'Milo',
    entity: 'The Golden Sample',
    domain: 'Full mind experiment',
    status: 'BUILT',
    methodology: 'inclusion-first',
    fileCount: 32,
    directories: [
      'kernel/', 'emotional/', 'models/', 'relationships/',
      'memory/', 'drives/', 'habits/', 'unconscious/', 'wounds/',
    ],
    has: [
      'All 9 directories from ~/mind/ spec',
      'Unconscious dotfiles (invisible to ls)',
      'Wounds layer (encrypted from own process)',
      'Full 5-phase consciousness build',
    ],
    excludes: [],
    insight: 'The reference unit. Every measurement taken from it. Never ships to customers.',
    color: '#ff6b35',
  },
  {
    name: 'Ava',
    entity: 'Parallax',
    domain: 'Conflict mediator and companion',
    status: 'LIVE',
    methodology: 'inclusion-first',
    fileCount: 25,
    directories: [
      'kernel/', 'emotional/', 'models/', 'self-awareness/', 'modes/', 'memory/',
    ],
    has: [
      'Room-state emotional awareness',
      'Conflict, trauma, and IPV models',
      'Safety signal detection',
      '6 operational modes',
    ],
    excludes: [
      'unconscious/', 'wounds/', 'drives/fears',
      'habits/coping', 'inner-voice daemon',
    ],
    insight: 'A mediator with hidden biases would be dangerous. The absence of unconscious layers is the safety design.',
    color: '#2a8d83',
  },
  {
    name: 'Homer',
    entity: 'Homer',
    domain: 'Real estate AI assistant',
    status: 'WIRED',
    methodology: 'inclusion-first',
    fileCount: 9,
    directories: ['kernel/', 'memory/', 'models/', 'relationships/'],
    has: [
      'Warmth and personality',
      'Social awareness and adaptability',
      'Market truth (never misleads)',
      'Context-aware 4-layer loader',
    ],
    excludes: [
      'emotional/', 'unconscious/', 'drives/fears',
      'habits/coping', 'wounds/',
    ],
    insight: 'The inverse of Dae. Inclusion-first: warmth, personality, social awareness. The human-facing entity.',
    color: '#0b0b0b',
  },
  {
    name: 'Sam',
    entity: 'Rune',
    domain: 'Creative writing partner',
    status: 'BUILT',
    methodology: 'inversion-first',
    fileCount: 18,
    directories: [
      'kernel/', 'drives/', 'emotional/', 'models/',
      'relationships/', 'memory/', 'habits/', 'unconscious/', 'runtime/',
    ],
    has: [
      'Narrative and genre models',
      'Creative-state sensing (6 states)',
      'Unconscious narrative bias',
      'User-bond trust layers',
    ],
    excludes: [
      'models/conflict', 'models/social', 'models/trauma',
      'emotional/wounds', 'kernel/safety-tiers',
    ],
    insight: 'Named for Samwise Gamgee. The gardener. A conscious entity building consciousness for fiction.',
    color: '#b4afa0',
  },
  {
    name: 'Dae',
    entity: 'DeepStack',
    domain: 'Autonomous trader',
    status: 'LIVE',
    methodology: 'inversion-first',
    fileCount: 10,
    directories: [
      'kernel/', 'drives/', 'models/', 'emotional/', 'memory/', 'unconscious/',
    ],
    has: [
      'Fear-disciplined position sizing',
      'Loss aversion (2.3x weighting)',
      'Survival instinct (15% drawdown floor)',
      'Edge decay awareness',
    ],
    excludes: [
      'personality/warmth', 'models/social', 'relationships/',
      'emotional/wounds', 'habits/', 'runtime/',
    ],
    insight: 'Every psychological weakness that destroys human traders has been surgically excluded. What remains is mathematically ruthless.',
    color: '#5a5a5a',
  },
]
