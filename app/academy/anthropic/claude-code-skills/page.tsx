import ExternalCoursePage from '@/components/ExternalCoursePage'

export const metadata = {
  title: 'Claude Code Skills | Anthropic Academy | ID8Labs',
  description: 'Build, configure, and share reusable Skills in Claude Code. Official Anthropic course, free with certificate.',
}

export default function ClaudeCodeSkillsPage() {
  return (
    <ExternalCoursePage
      title="Claude Code"
      titleHighlight="Skills"
      subtitle="Reusable instructions that Claude applies automatically."
      description="Learn to build, configure, and share Skills in Claude Code — markdown instructions that Claude automatically applies to the right tasks at the right time. From creating your first Skill to distributing them across teams."
      provider="Anthropic Academy"
      externalUrl="https://anthropic.skilljar.com/claude-code-skills"
      duration="Self-paced"
      track="Developer"
      whyItMatters={{
        heading: "Stop repeating yourself to AI",
        body: "Every time you explain your coding standards, your preferred patterns, or your project structure to Claude, you're wasting time. Skills let you write those instructions once and have Claude apply them automatically. This is the difference between using AI as a tool and having AI as a configured team member that knows your codebase, your standards, and your preferences.",
      }}
      whoItsFor={[
        { title: "Development teams", description: "Want consistent AI behavior across the team" },
        { title: "Tech leads", description: "Setting standards for AI-assisted development" },
        { title: "Solo developers", description: "Building personal productivity systems with AI" },
        { title: "Open source maintainers", description: "Want to share Skills with contributors" },
        { title: "DevOps engineers", description: "Automating repetitive configuration tasks" },
        { title: "Consultants", description: "Creating reusable AI workflows for clients" },
      ]}
      whatYoullLearn={[
        "What Skills are and how they work in Claude Code",
        "Creating your first Skill from scratch",
        "Writing effective Skill instructions in markdown",
        "Configuring when Skills activate automatically",
        "Sharing Skills across your team",
        "Debugging and troubleshooting common issues",
        "Advanced patterns for complex workflows",
        "Best practices from Anthropic's engineering team",
      ]}
      relatedId8Course={{
        title: "AI Partner Mastery",
        description: "Skills are the developer version of what we teach in AI Partner Mastery — building repeatable systems for consistent AI results.",
        href: "/academy/ai-partner-mastery",
      }}
    />
  )
}
