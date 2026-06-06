'use client'

import { notFound } from 'next/navigation'
import {
  Container,
  Kicker,
  Deck,
  Rule,
  MetaRow,
  SectionHead,
  Prose,
  EditorialButton,
} from '@/components/editorial'

// Action Plan Data
const actionPlans: Record<string, {
  level: string
  score: string
  tagline: string
  insight: string
  insightExamples?: { wrong: string; right: string }
  firstChallenge: {
    time: string
    task: string
    sharePrompt: string
  }
  deeperChallenge: {
    time: string
    task: string
    outcome: string
    sharePrompt: string
  }
  weeks: { title: string; tasks: string[] }[]
  readyChecklist: string[]
  ctaTitle: string
  ctaDescription: string
  ctaLink: string
  ctaLinkText: string
  freeResource?: { title: string; url: string }
}> = {
  explorer: {
    level: 'Explorer',
    score: '5-8',
    tagline: "You're starting fresh. That's an advantage - no bad habits to unlearn.",
    insight: "Claude Code isn't a chatbot - it's a junior developer who reads everything before typing.",
    insightExamples: {
      wrong: '"How do I parse JSON in Node.js?"',
      right: '"Parse data.json and extract all email addresses into a CSV"'
    },
    firstChallenge: {
      time: '5 min',
      task: 'Open any project folder. Ask Claude: "Find all TODO comments in this project and create a markdown checklist I can work through." Watch it navigate, search, and format without you touching the keyboard.',
      sharePrompt: 'Just had Claude scan my entire codebase for TODOs in 30 seconds. Found 23 I forgot about. #id8labs #ClaudeCode'
    },
    deeperChallenge: {
      time: '30 min',
      task: 'Build a "Morning Standup" script. Ask Claude: "Create a shell script that shows me: git changes from yesterday, any new TODO comments, and failed tests. Save it to scripts/standup.sh"',
      outcome: 'A reusable script you\'ll actually run every morning. This is building WITH Claude, not just asking questions.',
      sharePrompt: 'Built my own standup automation with Claude. No copy-pasting. Just "do this" and it did. Here\'s what I learned: #id8labs #BuildInPublic'
    },
    weeks: [
      {
        title: 'Setup',
        tasks: [
          'Install Claude Code: npm install -g @anthropic-ai/claude-code',
          'Create ~/.claude/CLAUDE.md with your preferences',
          'Test: Ask Claude to rename a batch of files'
        ]
      },
      {
        title: 'First Hook',
        tasks: [
          'Clone the ID8Labs Hooks Starter Kit from GitHub',
          'Start with auto-approve-safe hook',
          'Approves read operations, prompts for destructive ones'
        ]
      },
      {
        title: 'First MCP Server',
        tasks: [
          'Install filesystem MCP: npm install -g @modelcontextprotocol/server-filesystem',
          'Install git MCP: npm install -g @modelcontextprotocol/server-git',
          'Claude can now navigate your project and manage version control'
        ]
      },
      {
        title: 'Build Something Real',
        tasks: [
          'Pick a project you\'ll actually use',
          'CLI tool, file organizer, or simple API',
          'Use Claude for the entire build. Commit with git. Ship it.'
        ]
      }
    ],
    readyChecklist: [
      'Claude runs commands without permission prompts',
      'You have a working CLAUDE.md with your preferences',
      "You've shipped one complete project with Claude",
      'You think in "tasks" not "questions"'
    ],
    ctaTitle: 'Hit a Wall?',
    ctaDescription: 'Most Explorers get stuck on context setup - Claude keeps forgetting your preferences.',
    ctaLink: 'https://discord.gg/id8labs',
    ctaLinkText: 'Join #explorer-help on Discord',
    freeResource: {
      title: 'ID8Labs Hooks Starter Kit',
      url: 'https://github.com/eddiebelaval/id8labs-starter'
    }
  },
  adopter: {
    level: 'Adopter',
    score: '9-13',
    tagline: "You use AI daily, but it's still ask-answer-copy-paste. Time to delegate.",
    insight: 'The shift from assistance to delegation is the shift from "help me with X" to "do X and show me the result."',
    firstChallenge: {
      time: '10 min',
      task: 'Find a pattern you repeat in Claude conversations (like "use TypeScript" or "add error handling"). Create a CLAUDE.md file in your project with that rule. Test it by starting a fresh conversation - does Claude follow it without being told?',
      sharePrompt: 'Finally codified my coding preferences in CLAUDE.md. No more repeating myself. This is how context should work. #id8labs #ClaudeCode'
    },
    deeperChallenge: {
      time: '1 hour',
      task: 'Build a "Code Review Agent" workflow: Create a CLAUDE.md that defines how you want PRs reviewed - what to check, what to ignore, your team\'s patterns. Then ask Claude to review your last 3 commits using those rules.',
      outcome: 'A reusable code review system that knows your standards. Your context file becomes institutional knowledge.',
      sharePrompt: 'Turned my code review checklist into a Claude workflow. Same standards, every time, without me nagging. Here\'s the CLAUDE.md: #id8labs #BuildInPublic'
    },
    weeks: [
      {
        title: 'Fix Context Rot',
        tasks: [
          'Create project-specific CLAUDE.md files',
          'Include: Stack, Key Files, Patterns',
          'Test: Start fresh conversation - does Claude follow your patterns?'
        ]
      },
      {
        title: 'Install MCPs That Matter',
        tasks: [
          '3-4 servers max: Filesystem, Git, Database, Brave Search',
          'Test each with a real task',
          '"Find all TODO comments" or "Show commits from last week"'
        ]
      },
      {
        title: 'The PEV Pattern',
        tasks: [
          'Plan: Before changes, Claude tells you what and why',
          'Execute: Make the changes',
          'Verify: Run tests, check for type errors, confirm it worked'
        ]
      },
      {
        title: 'Basic Governance',
        tasks: [
          'Create AGENT_LOG.md in your project',
          'Track: What you asked, tools used, outcome, time saved',
          'Review weekly. Double down on what works.'
        ]
      }
    ],
    readyChecklist: [
      'Context files are comprehensive and maintained',
      'You delegate entire workflows, not individual tasks',
      'PEV is automatic in your workflow',
      'You can show concrete time savings'
    ],
    ctaTitle: 'Hit a Wall?',
    ctaDescription: 'Most Adopters struggle with context rot (outdated CLAUDE.md) or over-trusting without verification.',
    ctaLink: 'https://cal.com/id8labs/adopter-audit',
    ctaLinkText: 'Book a Workflow Audit ($500)',
    freeResource: {
      title: 'Agentic Architecture Patterns',
      url: 'https://id8labs.app/resources/agentic-patterns'
    }
  },
  practitioner: {
    level: 'Practitioner',
    score: '14-17',
    tagline: "You're ahead of 90% of developers. Now make it reliable, secure, and repeatable.",
    insight: "Multi-agent isn't about more agents - it's about specialized agents with clear handoffs.",
    firstChallenge: {
      time: '15 min',
      task: 'Create two agent profiles in separate CLAUDE.md files: a "Builder" (optimizes for speed, accepts reasonable risk) and an "Auditor" (paranoid, checks everything, assumes code is wrong). Run the same task with each. Notice how the same prompt produces different results.',
      sharePrompt: 'Split my Claude workflow into Builder + Auditor profiles. Same prompt, wildly different outputs. This is how you get speed AND safety. #id8labs #AgenticAI'
    },
    deeperChallenge: {
      time: '2 hours',
      task: 'Build a "Security Gate" hook that runs before any git commit. It should: scan for API keys/secrets, check for console.log statements, verify no TODO comments in critical files. Use the ID8Labs Hooks Starter as a base. Open source it.',
      outcome: 'A production-ready security hook others can use. Your first contribution to the agentic ecosystem.',
      sharePrompt: 'Just open-sourced my pre-commit security hook for Claude Code. Catches secrets, debug logs, and unfinished TODOs. Link in thread. #id8labs #OpenSource'
    },
    weeks: [
      {
        title: 'Define Agent Roles',
        tasks: [
          'Create agent-roles.md with: Agent, Purpose, MCPs, Restrictions',
          'Builder (feature dev), Security (audits), Operations (deploys), Docs',
          'Each agent gets its own CLAUDE.md profile'
        ]
      },
      {
        title: 'Security Hardening',
        tasks: [
          'Audit every MCP: least-privilege, path restrictions, rate limiting',
          'Add "Never Auto-Approve" rules: rm -rf, sudo, production changes',
          'Test by trying to break your own rules'
        ]
      },
      {
        title: 'Monitoring & Observability',
        tasks: [
          'Track weekly: Tasks completed vs failed, tokens/cost, time saved',
          'Set alerts: policy violations, repeated failures, cost spikes',
          'Know what your agents are actually doing'
        ]
      },
      {
        title: 'Team Patterns',
        tasks: [
          'Document workflows as playbooks',
          'Example: Builder creates branch → Security audits → Docs updates → Operations deploys',
          'Create setup script: new team members running in <30 minutes'
        ]
      }
    ],
    readyChecklist: [
      'Multiple specialized agents working in coordination',
      'Security hardening in production',
      'Monitoring and cost tracking active',
      'Team-wide adoption with documented patterns'
    ],
    ctaTitle: 'Hit a Wall?',
    ctaDescription: 'Most Practitioners struggle with over-engineering orchestration or ignoring cost at scale.',
    ctaLink: 'https://cal.com/id8labs/practitioner-consult',
    ctaLinkText: 'Book Architecture Consultation ($5k)',
    freeResource: {
      title: 'MCP Security Checklist',
      url: 'https://id8labs.app/resources/MCP_Security_Checklist.md'
    }
  },
  pioneer: {
    level: 'Pioneer',
    score: '18-20',
    tagline: "You're not reading this for instructions. You're reading it to see if I know what I'm talking about.",
    insight: "The bottleneck isn't technology - it's shared knowledge.",
    firstChallenge: {
      time: '30 min',
      task: 'Write down one pattern you\'ve discovered that isn\'t documented anywhere. Could be an orchestration trick, a cost optimization, a security pattern. 500 words. Post it publicly.',
      sharePrompt: 'Documenting an agentic pattern I discovered that I haven\'t seen written up anywhere. Thread: #id8labs #AgenticAI'
    },
    deeperChallenge: {
      time: '1 week',
      task: 'Build and open-source something the ecosystem needs: an MCP server for a service that doesn\'t have one, a hook pattern that solves a common problem, or a monitoring solution for agent costs. Ship it, document it, share it.',
      outcome: 'A genuine contribution to the agentic ecosystem. At Pioneer level, the best way to learn is to build what doesn\'t exist yet.',
      sharePrompt: 'Just shipped [tool name] - an open-source [description]. Built because I needed it and couldn\'t find it. Hope it helps others. #id8labs #OpenSource'
    },
    weeks: [
      {
        title: 'Identify Your Bottleneck',
        tasks: [
          'What\'s actually slowing you down?',
          'Observability? Cost? Trust? Scale? Security?',
          'Pick one. Focus there.'
        ]
      },
      {
        title: 'Study Adjacent Industries',
        tasks: [
          'GitOps, Service Meshes, OPA/Kyverno, Kubecost',
          'These solved similar problems for infrastructure',
          'Steal patterns. Adapt for agents.'
        ]
      },
      {
        title: 'Build in Public',
        tasks: [
          'Case studies, architecture diagrams, open-source MCPs',
          'The ecosystem is tiny - you can shape it',
          'Attract your peer group'
        ]
      },
      {
        title: 'Find Your People',
        tasks: [
          'ID8Labs Pioneer channel, Anthropic Enterprise Forum',
          'MCP Working Group',
          'At this level, you need sparring partners, not tutorials'
        ]
      }
    ],
    readyChecklist: [
      'You\'re defining production patterns others will follow',
      'Your agents run without you watching',
      'You\'ve open-sourced something the ecosystem needed',
      'Other Pioneers know your name'
    ],
    ctaTitle: "Let's Talk",
    ctaDescription: "At this level, you're not looking for tutorials. You're looking for a sparring partner.",
    ctaLink: 'https://cal.com/id8labs/pioneer-chat',
    ctaLinkText: 'Book a Strategy Session',
    freeResource: undefined
  }
}

// What's Coming section for Pioneer
const futureOpportunities = [
  { trend: 'Agent Marketplaces', opportunity: 'Package and sell specialized agents' },
  { trend: 'Agent Mesh Architectures', opportunity: 'Build the orchestration layer' },
  { trend: 'Agent-Native IDEs', opportunity: 'Build tooling for agent-first workflows' },
  { trend: 'Regulatory Clarity', opportunity: 'Be the compliant option before rules exist' },
  { trend: 'Cost Optimization Tools', opportunity: 'Build Kubecost for agents' },
]

export default function ActionPlanPage({ params }: { params: { level: string } }) {
  const { level } = params
  const plan = actionPlans[level.toLowerCase()]

  if (!plan) {
    notFound()
  }

  const isPioneer = level.toLowerCase() === 'pioneer'

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      {/* Hero */}
      <section className="pt-20 pb-12">
        <Container>
          <Kicker dot>{plan.level} Level · Score {plan.score}</Kicker>

          <h1 className="mt-6 max-w-4xl font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.5rem,6vw,4rem)]">
            {plan.level} <em className="italic text-id8-orange">Action Plan</em>
          </h1>

          <Deck className="mt-7 max-w-2xl">{plan.tagline}</Deck>

          <div className="mt-10 flex flex-wrap gap-3">
            <EditorialButton
              href={`/resources/action-plans/${level.toLowerCase()}.pdf`}
              variant="primary"
              external
            >
              Download PDF
            </EditorialButton>
            <EditorialButton href="#roadmap" variant="secondary">
              View Roadmap
            </EditorialButton>
          </div>

          <Rule className="mt-10" />
        </Container>
      </section>

      {/* The One Thing */}
      <section className="py-16 border-t border-[var(--rule)]">
        <Container narrow>
          <div className="text-center">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)] mb-8">
              The One Thing to Understand
            </p>
            <blockquote className="font-[family-name:var(--font-display)] font-normal italic text-[var(--ink)] text-[clamp(1.5rem,3.5vw,2.25rem)] leading-snug border-l-2 border-id8-orange pl-6 text-left">
              {plan.insight}
            </blockquote>

            {plan.insightExamples && (
              <div className="grid md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)] mt-8 text-left">
                <div className="bg-[var(--paper)] p-4">
                  <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-2">Don&apos;t do this</p>
                  <p className="font-[family-name:var(--font-mono)] text-sm text-[var(--muted)]">{plan.insightExamples.wrong}</p>
                </div>
                <div className="bg-[var(--paper-shadow)] p-4 border-t-2 md:border-t-0 md:border-l-2 border-id8-orange">
                  <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">Do this</p>
                  <p className="font-[family-name:var(--font-mono)] text-sm text-[var(--ink)]">{plan.insightExamples.right}</p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Your First Challenge */}
      <section className="py-16 border-t border-[var(--rule)]">
        <Container narrow>
          <SectionHead title="Your First Challenge" meta={plan.firstChallenge.time} className="mb-8" />
          <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-8">
            <p className="text-lg text-[var(--body)] leading-[1.7] mb-6">{plan.firstChallenge.task}</p>
            <div className="border border-[var(--hair)] bg-[var(--paper)] p-4">
              <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-2">Share your win</p>
              <p className="font-[family-name:var(--font-serif)] italic text-sm text-[var(--body)]">&quot;{plan.firstChallenge.sharePrompt}&quot;</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 30-Day Roadmap */}
      <section id="roadmap" className="py-16 border-t border-[var(--rule)]">
        <Container>
          <SectionHead title="Week by Week Roadmap" meta="Your 30-Day Focus" className="mb-8" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {plan.weeks.map((week, index) => (
              <div key={index} className="bg-[var(--paper)] p-6">
                <p className="font-[family-name:var(--font-mono)] text-xs text-id8-orange mb-3">Week {index + 1}</p>
                <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-4">{week.title}</h3>
                <ul className="space-y-3">
                  {week.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-start gap-3 text-sm text-[var(--body)]">
                      <span className="text-id8-orange flex-shrink-0">&rarr;</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Want to Go Deeper? */}
      <section className="py-16 border-t border-[var(--rule)]">
        <Container narrow>
          <SectionHead title="Want to Go Deeper?" meta={plan.deeperChallenge.time} className="mb-8" />
          <div className="border border-[var(--hair)] p-7">
            <div className="mb-6">
              <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-3">The Challenge</h3>
              <p className="text-[var(--body)] leading-[1.7]">{plan.deeperChallenge.task}</p>
            </div>
            <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-4 mb-6">
              <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">What You&apos;ll Build</p>
              <p className="text-[var(--ink)]">{plan.deeperChallenge.outcome}</p>
            </div>
            <div className="border border-[var(--hair)] bg-[var(--paper-shadow)] p-4">
              <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-2">Share your work</p>
              <p className="font-[family-name:var(--font-serif)] italic text-sm text-[var(--body)]">&quot;{plan.deeperChallenge.sharePrompt}&quot;</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Pioneer-only: What's Coming */}
      {isPioneer && (
        <section className="py-16 border-t border-[var(--rule)]">
          <Container narrow>
            <SectionHead title="What's Coming" meta="2025-2026 Trends" className="mb-8" />
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="border-b border-[var(--hair-hard)]">
                  <tr>
                    <th className="py-3 px-4 text-left font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">Trend</th>
                    <th className="py-3 px-4 text-left font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">Opportunity</th>
                  </tr>
                </thead>
                <tbody>
                  {futureOpportunities.map((item, index) => (
                    <tr key={index} className="border-b border-[var(--hair)]">
                      <td className="py-3 px-4 font-medium text-[var(--ink)]">{item.trend}</td>
                      <td className="py-3 px-4 text-[var(--body)]">{item.opportunity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </section>
      )}

      {/* Ready Checklist */}
      <section className="py-16 border-t border-[var(--rule)]">
        <Container narrow>
          <SectionHead
            title={`You're Ready for ${plan.level === 'Pioneer' ? 'Enterprise' : 'Next'} Level When...`}
            meta="Level Up Checklist"
            className="mb-8"
          />
          <ul className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            {plan.readyChecklist.map((item, index) => (
              <li key={index} className="flex items-center gap-4 bg-[var(--paper)] p-4">
                <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange flex-shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[var(--body)]">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-[var(--rule)]">
        <Container narrow>
          <div className="text-center">
            <Kicker dot className="justify-center">Next Step</Kicker>
            <h2 className="mt-6 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.05] text-[var(--ink)] text-[clamp(2rem,4.5vw,3rem)]">
              {plan.ctaTitle}
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-[1.7] text-[var(--body)]">{plan.ctaDescription}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              {plan.freeResource && (
                <EditorialButton href={plan.freeResource.url} variant="secondary" external>
                  Free: {plan.freeResource.title}
                </EditorialButton>
              )}
              <EditorialButton href={plan.ctaLink} variant="primary" external>
                {plan.ctaLinkText} &rarr;
              </EditorialButton>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <section className="py-8 border-t border-[var(--hair)]">
        <Container>
          <p className="text-center font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
            Built by{' '}
            <a href="/" className="text-id8-orange hover:underline">id8Labs</a>
            {' '}— Tools for Builders
          </p>
        </Container>
      </section>
    </div>
  )
}
