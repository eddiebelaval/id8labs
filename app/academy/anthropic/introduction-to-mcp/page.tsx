import ExternalCoursePage from '@/components/ExternalCoursePage'

export const metadata = {
  title: 'Introduction to MCP | Anthropic Academy | ID8Labs',
  description: 'Learn the Model Context Protocol — build MCP servers and clients from scratch. Official Anthropic course, free with certificate.',
}

export default function IntroductionToMCPPage() {
  return (
    <ExternalCoursePage
      title="Introduction to"
      titleHighlight="MCP"
      subtitle="The protocol that connects AI to everything else."
      description="Learn the Model Context Protocol (MCP) — Anthropic's open standard for connecting AI to external tools and services. Build MCP servers and clients from scratch, master tools, resources, and prompts primitives."
      provider="Anthropic Academy"
      externalUrl="https://anthropic.skilljar.com/introduction-to-model-context-protocol"
      duration="Self-paced"
      track="Developer"
      whyItMatters={{
        heading: "AI that can actually do things",
        body: "AI that can only talk is limited. MCP is the open standard that lets AI interact with databases, APIs, file systems, and any external service. Think of it as USB-C for AI — one protocol that connects Claude to everything. This is the foundation of agentic AI, and learning it now puts you ahead of the curve.",
      }}
      whoItsFor={[
        { title: "Backend developers", description: "Building AI integrations with existing systems" },
        { title: "Full-stack developers", description: "Creating end-to-end AI-powered applications" },
        { title: "Platform engineers", description: "Building infrastructure for AI-first teams" },
        { title: "Technical architects", description: "Designing systems that leverage AI capabilities" },
        { title: "AI engineers", description: "Building production-grade AI tooling" },
        { title: "Open source contributors", description: "Building MCP servers for the community" },
      ]}
      whatYoullLearn={[
        "What MCP is and why it exists",
        "The three core primitives: tools, resources, and prompts",
        "Building your first MCP server from scratch",
        "Creating MCP clients that connect to servers",
        "Python SDK for MCP development",
        "Connecting Claude to external data sources",
        "Security considerations for MCP deployments",
        "Real-world patterns for production MCP servers",
      ]}
      relatedId8Course={{
        title: "Private AI",
        description: "Concerned about data security with AI integrations? Our Private AI course covers the security and compliance foundations.",
        href: "/academy/private-ai",
      }}
    />
  )
}
