import ExternalCoursePage from '@/components/ExternalCoursePage'

export const metadata = {
  title: 'Claude Code in Action | Anthropic Academy | ID8Labs',
  description: 'Learn to integrate Claude Code into your development workflow. Official Anthropic course, free with certificate.',
}

export default function ClaudeCodeInActionPage() {
  return (
    <ExternalCoursePage
      title="Claude Code"
      titleHighlight="in Action"
      subtitle="Your AI coding partner, properly configured."
      description="Learn how to integrate Claude Code into your development workflow. From generating code snippets to debugging complex applications — this is the developer's guide to Claude Code from the team that built it."
      provider="Anthropic Academy"
      externalUrl="https://anthropic.skilljar.com/claude-code-in-action"
      duration="30 min video"
      track="Developer"
      whyItMatters={{
        heading: "Claude Code is more than autocomplete",
        body: "Most developers use Claude Code like a fancy autocomplete. This course shows you the full picture — multi-file editing, codebase understanding, test generation, debugging, and the workflow patterns that 10x your development speed. This is the developer complement to our Claude Code for Knowledge Workers course, which teaches the same tool to non-programmers.",
      }}
      whoItsFor={[
        { title: "Software engineers", description: "Want to maximize Claude Code's capabilities" },
        { title: "Frontend developers", description: "Building UI components and applications" },
        { title: "Backend developers", description: "Working with APIs, databases, and infrastructure" },
        { title: "DevOps engineers", description: "Automating deployment and infrastructure tasks" },
        { title: "Technical leads", description: "Evaluating AI coding tools for your team" },
        { title: "Career switchers", description: "Learning to code with AI assistance" },
      ]}
      whatYoullLearn={[
        "Setting up Claude Code for your development environment",
        "Code generation from natural language descriptions",
        "Multi-file editing and refactoring",
        "Debugging complex issues with AI assistance",
        "Test generation and code review",
        "Codebase understanding and navigation",
        "Workflow patterns for maximum productivity",
        "Advanced configuration and customization",
      ]}
      relatedId8Course={{
        title: "Claude Code for Knowledge Workers",
        description: "Not a developer? Our course teaches non-programmers to use Claude Code through delegation, not coding.",
        href: "/courses/claude-for-knowledge-workers",
      }}
    />
  )
}
