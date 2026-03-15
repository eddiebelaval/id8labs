import ExternalCoursePage from '@/components/ExternalCoursePage'

export const metadata = {
  title: 'Claude 101 | Anthropic Academy | ID8Labs',
  description: 'Official Anthropic introduction to Claude — core features, effective prompting, and real-world use cases. Free with certificate.',
}

export default function Claude101Page() {
  return (
    <ExternalCoursePage
      title="Claude"
      titleHighlight="101"
      subtitle="The official starting point for Claude."
      description="Anthropic's own introduction to Claude. Learn core features, write effective prompts, understand capabilities and limitations, and get hands-on experience with real-world use cases."
      provider="Anthropic Academy"
      externalUrl="https://anthropic.skilljar.com/claude-101"
      duration="Self-paced"
      track="AI Fluency"
      whyItMatters={{
        heading: "Learn Claude from the team that built it",
        body: "There's no better way to understand Claude than learning directly from Anthropic. This course covers the official baseline — how Claude works, what it's good at, where it struggles, and how to get the most out of every conversation. If you've completed our AI Conversation Fundamentals course, this gives you the Anthropic-specific depth to go further.",
      }}
      whoItsFor={[
        { title: "New to Claude", description: "Haven't used Claude before or just getting started" },
        { title: "Switching from ChatGPT", description: "Want to understand what makes Claude different" },
        { title: "Business users", description: "Need to evaluate Claude for your team or organization" },
        { title: "Curious learners", description: "Want to understand AI capabilities from the source" },
        { title: "Creators", description: "Looking to integrate Claude into your creative workflow" },
        { title: "Professionals", description: "Want to level up your AI skills with official training" },
      ]}
      whatYoullLearn={[
        "Claude's core capabilities and how they differ from other AI models",
        "Writing effective prompts that get consistent results",
        "Understanding Claude's limitations and when to use other tools",
        "Real-world use cases across writing, analysis, and coding",
        "How to structure conversations for complex tasks",
        "Claude's safety features and responsible AI use",
        "Tips for getting the most out of Claude Pro and Team plans",
        "Hands-on exercises with immediate feedback",
      ]}
      relatedId8Course={{
        title: "AI Conversation Fundamentals",
        description: "Our foundation course teaches the mental models that work across any AI tool, not just Claude.",
        href: "/courses/ai-conversation-fundamentals",
      }}
    />
  )
}
