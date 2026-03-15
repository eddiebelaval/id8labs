import { CourseConfig, ExternalCourseConfig } from './types'

// All academy courses with their configuration
export const COURSES: Record<string, CourseConfig> = {
  'ai-conversation-fundamentals': {
    slug: 'ai-conversation-fundamentals',
    title: 'AI Conversation Fundamentals',
    path: '/courses/ai-conversation-fundamentals',
    modules: 6,
    isFoundation: true,
    recommendedOrder: 1,
    description: 'Master the basics of AI interaction',
  },
  'ai-partner-mastery': {
    slug: 'ai-partner-mastery',
    title: 'AI Partner Mastery',
    path: '/academy/ai-partner-mastery',
    modules: 8,
    isFoundation: false,
    recommendedOrder: 2,
    description: 'Day-to-day AI collaboration',
  },
  'prompt-engineering-creators': {
    slug: 'prompt-engineering-creators',
    title: 'Prompt Engineering for Creators',
    path: '/academy/prompt-engineering-creators',
    modules: 9,
    isFoundation: false,
    recommendedOrder: 3,
    description: 'Better prompts & outputs',
  },
  'claude-for-knowledge-workers': {
    slug: 'claude-for-knowledge-workers',
    title: 'Claude for Knowledge Workers',
    path: '/courses/claude-for-knowledge-workers',
    modules: 10,
    isFoundation: false,
    recommendedOrder: 4,
    description: 'Deep workflow mastery',
  },
  'ai-for-leaders': {
    slug: 'ai-for-leaders',
    title: 'AI for Leaders',
    path: '/academy/ai-for-leaders',
    modules: 8,
    isFoundation: false,
    recommendedOrder: 5,
    description: 'Organizational strategy',
  },
  'ai-at-scale': {
    slug: 'ai-at-scale',
    title: 'AI at Scale',
    path: '/academy/ai-at-scale',
    modules: 8,
    isFoundation: false,
    recommendedOrder: 6,
    description: 'Team adoption',
  },
  'private-ai': {
    slug: 'private-ai',
    title: 'Private AI',
    path: '/academy/private-ai',
    modules: 8,
    isFoundation: false,
    recommendedOrder: 7,
    description: 'Security & compliance',
  },
}

// External courses from Anthropic Academy (Skilljar)
export const EXTERNAL_COURSES: Record<string, ExternalCourseConfig> = {
  'claude-101': {
    slug: 'claude-101',
    title: 'Claude 101',
    path: '/academy/anthropic/claude-101',
    externalUrl: 'https://anthropic.skilljar.com/claude-101',
    provider: 'Anthropic Academy',
    description: 'Official introduction to Claude — core features, effective prompting, and real-world use cases.',
    duration: 'Self-paced',
    track: 'fluency',
  },
  'building-with-claude-api': {
    slug: 'building-with-claude-api',
    title: 'Building with the Claude API',
    path: '/academy/anthropic/building-with-claude-api',
    externalUrl: 'https://anthropic.skilljar.com/claude-with-the-anthropic-api',
    provider: 'Anthropic Academy',
    description: 'Build AI-powered applications with the Claude API — authentication, tool use, streaming, and production patterns.',
    duration: 'Self-paced',
    track: 'developer',
  },
  'claude-code-in-action': {
    slug: 'claude-code-in-action',
    title: 'Claude Code in Action',
    path: '/academy/anthropic/claude-code-in-action',
    externalUrl: 'https://anthropic.skilljar.com/claude-code-in-action',
    provider: 'Anthropic Academy',
    description: 'Integrate Claude Code into your development workflow — from code generation to debugging complex applications.',
    duration: '30 min video',
    track: 'developer',
  },
  'claude-code-skills': {
    slug: 'claude-code-skills',
    title: 'Claude Code Skills',
    path: '/academy/anthropic/claude-code-skills',
    externalUrl: 'https://anthropic.skilljar.com/claude-code-skills',
    provider: 'Anthropic Academy',
    description: 'Build, configure, and share reusable Skills in Claude Code — markdown instructions that Claude applies automatically.',
    duration: 'Self-paced',
    track: 'developer',
  },
  'introduction-to-mcp': {
    slug: 'introduction-to-mcp',
    title: 'Introduction to MCP',
    path: '/academy/anthropic/introduction-to-mcp',
    externalUrl: 'https://anthropic.skilljar.com/introduction-to-model-context-protocol',
    provider: 'Anthropic Academy',
    description: 'Learn the Model Context Protocol — build MCP servers and clients, master tools, resources, and prompts primitives.',
    duration: 'Self-paced',
    track: 'developer',
  },
  'introduction-to-agent-skills': {
    slug: 'introduction-to-agent-skills',
    title: 'Introduction to Agent Skills',
    path: '/academy/anthropic/introduction-to-agent-skills',
    externalUrl: 'https://anthropic.skilljar.com/introduction-to-agent-skills',
    provider: 'Anthropic Academy',
    description: 'Build autonomous AI agents — design agent architectures, implement tool use, and create multi-step workflows.',
    duration: '30 min video',
    track: 'developer',
  },
}

// External courses grouped by track
export const EXTERNAL_COURSES_BY_TRACK = {
  developer: Object.values(EXTERNAL_COURSES).filter((c) => c.track === 'developer'),
  fluency: Object.values(EXTERNAL_COURSES).filter((c) => c.track === 'fluency'),
  platform: Object.values(EXTERNAL_COURSES).filter((c) => c.track === 'platform'),
}

// Foundation course slug
export const FOUNDATION_COURSE = 'ai-conversation-fundamentals'

// Total modules across all courses
export const TOTAL_MODULES = Object.values(COURSES).reduce(
  (sum, course) => sum + course.modules,
  0
)

// Get courses in recommended order
export const COURSES_BY_ORDER = Object.values(COURSES).sort(
  (a, b) => a.recommendedOrder - b.recommendedOrder
)

// Get next recommended course after a given course
export function getNextRecommendedCourse(currentSlug: string): CourseConfig | null {
  const current = COURSES[currentSlug]
  if (!current) return null

  const next = COURSES_BY_ORDER.find(
    (course) => course.recommendedOrder === current.recommendedOrder + 1
  )
  return next || null
}

// Get module path for a course
export function getModulePath(courseSlug: string, moduleNumber: number): string {
  const course = COURSES[courseSlug]
  if (!course) return ''
  return `${course.path}/module-${moduleNumber}`
}

// Check if a course requires foundation
export function requiresFoundation(courseSlug: string): boolean {
  const course = COURSES[courseSlug]
  return course ? !course.isFoundation : false
}
