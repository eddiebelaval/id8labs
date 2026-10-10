/**
 * /llms.txt: a curated, LLM-friendly map of id8labs.si.
 *
 * Follows the llmstxt.org convention: a short intro, then sections of the
 * most important pages with one-line descriptions, so an assistant can
 * understand what id8Labs is and where its real content lives without
 * crawling the whole site. This is deliberately curated, not a sitemap dump
 * (the full URL set lives in /sitemap.xml).
 *
 * Product descriptions are trimmed from the copy already live on the
 * homepage, so this file does not introduce new public positioning.
 */

export const dynamic = 'force-static'

const BODY = `# id8Labs

> id8Labs is an independent software studio in Miami, founded by filmmaker and AI System Architect Eddie Belaval. The lab makes useful software, explores questions in public, and shares its discoveries in an open notebook.

Explore available software and beta projects, interactive research, free self-paced Academy courses, the StackShack marketplace, and essays on building with AI. For commissioned systems and forward deployment, visit Hamato at https://hamato.systems.

## Products
- [Parallax](https://id8labs.si/products/parallax): Someone to talk to, powered by Claude. Ava listens, remembers, and helps you understand what is going on through 19 analytical lenses. Free and private.
- [Composer](https://id8labs.si/products/composer): AI writing partner that remembers your story world, with persistent context across sessions.
- [DeepStack](https://id8labs.si/products/deepstack): Trading research with Claude. 30+ analysis tools, thesis tracking, and emotion-aware journaling.
- [Rune](https://id8labs.si/products/rune): A voice-first scribe that turns spoken conversation into a manuscript across three stages: Workshop, Study, Press. Open source.
- [MILO](https://id8labs.si/products/milo): Signal-to-noise task manager with Claude Code integration and 17 MCP tools.
- [All products](https://id8labs.si/products): The full catalog of id8Labs products.

## StackShack (Claude Code marketplace)
- [StackShack](https://id8labs.si/stackshack): Open marketplace of Claude Code configurations: skills, plugins, commands, settings, and starter kits.
- [Starter kits](https://id8labs.si/stackshack/starter-kits): Bundled setups to get productive with Claude Code quickly.
- [Categories](https://id8labs.si/stackshack/categories): Browse the marketplace by category.

## Academy
- [Academy](https://id8labs.si/academy): Free self-paced courses on working with AI and Claude Code, from first principles to scale.

## The open notebook
- [Notebook](https://id8labs.si/writing): Essays, research, and field notes from building software with AI.
- [The Thesis](https://id8labs.si/thesis): The core argument behind id8Labs.

## Shipped
- [Shipped](https://id8labs.si/shipped): The magazine from id8Labs on what the AI labs release, with daily editions, deeper reads, and an archive.

## About
- [Eddie](https://id8labs.si/eddie): About Eddie Belaval, the builder behind id8Labs.
- [Contact](https://id8labs.si/contact): Book a call or get in touch.
`

export function GET() {
  return new Response(BODY, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
