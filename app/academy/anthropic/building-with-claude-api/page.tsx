import ExternalCoursePage from '@/components/ExternalCoursePage'

export const metadata = {
  title: 'Building with the Claude API | Anthropic Academy | ID8Labs',
  description: 'Comprehensive Anthropic course on building AI-powered applications with the Claude API. Free with certificate.',
}

export default function BuildingWithClaudeAPIPage() {
  return (
    <ExternalCoursePage
      title="Building with the"
      titleHighlight="Claude API"
      subtitle="From first API call to production application."
      description="Anthropic's comprehensive course covering the full spectrum of working with Claude through the API. Authentication, tool use, streaming, system prompts, and architecture patterns for building real applications."
      provider="Anthropic Academy"
      externalUrl="https://anthropic.skilljar.com/claude-with-the-anthropic-api"
      duration="Self-paced"
      track="Developer"
      whyItMatters={{
        heading: "Build what you've been imagining",
        body: "You've seen what Claude can do in conversations. Now build it into your own applications. This course takes you from your first API call to production-ready patterns — tool use, streaming, context management, and the architecture decisions that matter. Whether you're building an internal tool, a customer-facing product, or automating workflows, this is the official guide.",
      }}
      whoItsFor={[
        { title: "Developers", description: "Want to integrate Claude into applications" },
        { title: "Technical founders", description: "Building AI-powered products" },
        { title: "Backend engineers", description: "Adding AI capabilities to existing systems" },
        { title: "Full-stack developers", description: "Building end-to-end AI features" },
        { title: "DevOps engineers", description: "Setting up AI infrastructure" },
        { title: "Technical leads", description: "Evaluating Claude for team adoption" },
      ]}
      whatYoullLearn={[
        "API authentication and request handling",
        "System prompts and conversation design",
        "Tool use — giving Claude access to external functions",
        "Streaming responses for real-time user experiences",
        "Context window management and optimization",
        "Error handling and retry strategies",
        "Architecture patterns for production applications",
        "Best practices from Anthropic's engineering team",
      ]}
      relatedId8Course={{
        title: "Claude Code for Knowledge Workers",
        description: "Not a developer? Learn to use Claude Code without writing code — delegation, not programming.",
        href: "/courses/claude-for-knowledge-workers",
      }}
    />
  )
}
