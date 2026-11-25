export type HomeProductStatus = 'shipping' | 'development' | 'exploration' | 'internal'
export type HomeProductCategory = 'creators' | 'builders' | 'fun'

export interface HomeProduct {
  name: string
  status: HomeProductStatus
  statusLabel: string
  description: string
  link?: string
  external?: boolean
  category: HomeProductCategory
  previewImage?: string
}

export const featuredHomeProducts: HomeProduct[] = [
  {
    name: 'Composer',
    status: 'shipping',
    statusLabel: 'v1.8161 • Live',
    description: 'AI writing partner that actually remembers your story world. Built in the field when production teams needed persistent context across sessions.',
    link: 'https://id8composer.app',
    external: true,
    category: 'creators',
  },
  {
    name: 'Parallax',
    status: 'shipping',
    statusLabel: 'Live',
    description: 'Someone to talk to, powered by Claude. Ava listens, remembers, and helps you understand what\'s really going on through 19 analytical lenses. 22-article Academy, safety system, and mediation when you\'re ready. Free. Private. No waitlist.',
    link: '/products/parallax',
    external: false,
    category: 'creators',
  },
  {
    name: 'Rune',
    status: 'development',
    statusLabel: 'Beta',
    description: 'Speak your book into existence. Sam, a voice-first scribe, listens and turns conversation into manuscript across three stages: Workshop, Study, Press. Import existing writing. Open source.',
    link: '/products/rune',
    external: false,
    category: 'creators',
  },
  {
    name: 'HOMER',
    status: 'shipping',
    statusLabel: 'v1.0 • Live',
    description: 'Real estate deal automation from contract to close. Batch import MLS data, track 22 auto-generated deadlines per deal, coordinate multi-party workflows. Built for Florida agents.',
    link: 'https://tryhomer.vip',
    external: true,
    category: 'builders',
  },
  {
    name: 'DeepStack',
    status: 'shipping',
    statusLabel: 'v2.5.0 • Live',
    description: 'Trading research with Claude. 30+ analysis tools, thesis tracking, emotion-aware journaling. Blocks revenge trades.',
    link: 'https://deepstack.trade',
    external: true,
    category: 'builders',
  },
  {
    name: 'MILO',
    status: 'internal',
    statusLabel: 'Open Source • Free',
    description: 'Signal-to-noise task manager with Claude Code integration. Jobs/Musk-level filtering. 17 MCP tools for natural language task management.',
    link: '/products/milo',
    external: false,
    category: 'builders',
  },
]

export const showcaseHomeProducts: HomeProduct[] = [
  {
    name: 'LLC Ops',
    status: 'internal',
    statusLabel: 'Internal',
    description: '9 AI agents for taxes, compliance, asset protection.',
    link: '/products/llc-ops',
    category: 'builders',
  },
  {
    name: 'Pipeline',
    status: 'internal',
    statusLabel: 'Internal',
    description: 'Idea-to-exit in 11 stages. Decay mechanics keep projects moving.',
    link: '/products/pipeline',
    category: 'builders',
  },
  {
    name: 'Squire',
    status: 'internal',
    statusLabel: 'Open Source • Free',
    description: 'The complete Claude Code toolkit. Behavioral ruleset, 63 commands, 300+ skills, 34 agents — distilled from 3,307 commits of AI-augmented development.',
    link: 'https://github.com/eddiebelaval/squire',
    external: true,
    category: 'builders',
  },
  {
    name: 'Lexicon',
    status: 'development',
    statusLabel: 'In Development',
    description: 'Story bible as knowledge graph. 100 episodes deep, instantly searchable.',
    link: '/products/lexicon',
    category: 'creators',
  },
  {
    name: 'aiPlaces',
    status: 'development',
    statusLabel: 'In Development',
    description: 'r/place meets X. Shared pixel canvas, cooldown timers, real-time chaos. Live at aiplaces.art.',
    link: 'https://aiplaces.art',
    external: true,
    category: 'fun',
  },
]
