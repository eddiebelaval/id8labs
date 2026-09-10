/**
 * /llms.txt: a curated, LLM-friendly map of id8labs.app.
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

> id8Labs is Eddie Belaval's studio for AI-native software: working products built with Claude, an open marketplace of Claude Code configurations (StackShack), a hands-on Academy, and long-form writing on building in the age of AI.

id8Labs builds in public. The site hosts shipping products, a growing catalog of Claude Code skills, plugins, commands and settings, course material, and essays on AI-native software development.

## Products
- [Parallax](https://id8labs.app/products/parallax): Someone to talk to, powered by Claude. Ava listens, remembers, and helps you understand what is going on through 19 analytical lenses. Free and private.
- [Composer](https://id8labs.app/products/composer): AI writing partner that remembers your story world, with persistent context across sessions.
- [DeepStack](https://id8labs.app/products/deepstack): Trading research with Claude. 30+ analysis tools, thesis tracking, and emotion-aware journaling.
- [Rune](https://id8labs.app/products/rune): A voice-first scribe that turns spoken conversation into a manuscript across three stages: Workshop, Study, Press. Open source.
- [MILO](https://id8labs.app/products/milo): Signal-to-noise task manager with Claude Code integration and 17 MCP tools.
- [All products](https://id8labs.app/products): The full catalog of id8Labs products.

## StackShack (Claude Code marketplace)
- [StackShack](https://id8labs.app/stackshack): Open marketplace of Claude Code configurations: skills, plugins, commands, settings, and starter kits.
- [Starter kits](https://id8labs.app/stackshack/starter-kits): Bundled setups to get productive with Claude Code quickly.
- [Categories](https://id8labs.app/stackshack/categories): Browse the marketplace by category.

## Academy
- [Academy](https://id8labs.app/academy): Courses on working with Claude and Claude Code, from first principles to scale.

## Writing
- [Writing](https://id8labs.app/writing): Essays on AI-native software, building in public, and the craft of building with AI.
- [The Thesis](https://id8labs.app/thesis): The core argument behind id8Labs.

## Shipped
- [Shipped](https://id8labs.app/shipped): A magazine documenting what id8Labs ships, issue by issue.

## About
- [Eddie](https://id8labs.app/eddie): About Eddie Belaval, the builder behind id8Labs.
- [Contact](https://id8labs.app/contact): Book a call or get in touch.
`

export function GET() {
  return new Response(BODY, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
