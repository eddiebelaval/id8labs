import ExternalCoursePage from '@/components/ExternalCoursePage'

export const metadata = {
  title: 'Introduction to Agent Skills | Anthropic Academy | ID8Labs',
  description: 'Build autonomous AI agents with tool use and multi-step workflows. Official Anthropic course, free with certificate.',
}

export default function IntroductionToAgentSkillsPage() {
  return (
    <ExternalCoursePage
      title="Introduction to"
      titleHighlight="Agent Skills"
      subtitle="AI that works autonomously on your behalf."
      description="Learn to build autonomous AI agents — from simple tool-using assistants to multi-step autonomous workflows. Understand agent architectures, implement tool use patterns, and create agents that can reason, plan, and execute."
      provider="Anthropic Academy"
      externalUrl="https://anthropic.skilljar.com/introduction-to-agent-skills"
      duration="30 min video"
      track="Developer"
      whyItMatters={{
        heading: "The next step beyond prompting",
        body: "Prompting is asking AI to do one thing. Agents are AI that can do many things autonomously — research, analyze, decide, and act across multiple steps. This is where AI goes from assistant to autonomous worker. Understanding agent patterns now positions you to build the next generation of AI-powered tools and workflows.",
      }}
      whoItsFor={[
        { title: "AI engineers", description: "Building autonomous AI systems" },
        { title: "Backend developers", description: "Want to add agent capabilities to applications" },
        { title: "Product managers", description: "Evaluating agent architectures for products" },
        { title: "Technical founders", description: "Building AI-first products and services" },
        { title: "Researchers", description: "Exploring autonomous AI patterns" },
        { title: "Full-stack developers", description: "Building end-to-end agent-powered features" },
      ]}
      whatYoullLearn={[
        "What AI agents are and how they differ from simple prompting",
        "Agent architecture patterns and design decisions",
        "Implementing tool use for agent capabilities",
        "Multi-step reasoning and planning",
        "Error handling and recovery in autonomous workflows",
        "Building agents with the Claude API",
        "Testing and evaluating agent performance",
        "Production deployment considerations for agents",
      ]}
      relatedId8Course={{
        title: "AI at Scale",
        description: "Once you've built agents, learn how to deploy AI capabilities across your entire organization.",
        href: "/academy/ai-at-scale",
      }}
    />
  )
}
