# ID8Labs - Advanced Claude Context

**Project:** id8Labs  
**Product:** Professional company website  
**Company:** id8Labs  

## 🎯 Karpathy Senior Software Engineer Principles

**BEFORE STARTING: Follow these principles religiously**

1. **Surface assumptions explicitly** before proceeding
2. **Stop and clarify** when encountering inconsistencies  
3. **Push back on bad approaches** with concrete alternatives
4. **Prefer simple, obvious solutions** over clever complexity
5. **Touch only what you're asked to touch** (surgical precision)
6. **List dead code for approval** before deleting

## 🚀 Anthropic Team Advanced Techniques

**Development Methodology (Boris Cherny - Claude Code Creator):**

1. **Plan mode first** - Pour energy into planning for 1-shot implementation
2. **Parallel worktrees** - Use 3-5 git worktrees, each with own Claude session
3. **Custom skills in git** - If you do something >1x/day, make it a skill
4. **Advanced prompting** - "Grill me on changes," "Prove this works," "Scrap and implement elegant solution"
5. **Subagents** - Append "use subagents" for more compute, keep main context clean
6. **Auto bug fixing** - Paste error logs, say "fix" - point at specific failure sources

## Project Philosophy
**"Professional tools for the AI era" - Clean, scientific, credible company presence.**

**Design Principle:** "NO feature creep. NO RGB glows. NO heavy animations. Just clean, fast, credible."

## Design Philosophy
### **Editorial Edition ("Shipped." language)**
The site is a **print magazine on warm paper** — restrained, credible, high-craft.
Big Fraunces serif headlines with italic-orange emphasis, narrow uppercase
kickers, mono metadata, hairline rules, generous whitespace. **Light only,
cut corners (chamfer — never a literal right angle on the box/chip/button
family; rounded is still out), flat (no shadows/glows/gradients).**

- **Brand DNA (HALO Genome):** `genome/` — `AGENT.md` is the enforcement contract every producing agent reads first; `DESIGN.md` / `VOICE.md` / `ETHOS.md` / `genome.json` are the genes. Assets must be on-brand *by construction*.
- Reference: `public/shipped/` · React kit: `components/editorial/`
- **Applied design contract:** `docs/EDITORIAL_SYSTEM.md` — read it before any UI work
- Orange is emphasis, not decoration: one or two orange moments per view
- **Generous whitespace** - breathing room everywhere
- **Maximum credibility** - every design decision reinforces trust

## Tech Stack Rules
- **Next.js 14** - App Router, TypeScript strict mode
- **Tailwind CSS** - Utility-first styling, design system compliance
- **Framer Motion** - Subtle color/opacity transitions only (no heavy effects)
- **Fonts** - Fraunces (serif display), Archivo + Archivo Narrow (sans/UI), JetBrains Mono (meta)
- **Lucide Icons** - Minimal iconography
- **React 18** - Modern patterns, no class components

## Color System (STRICT — editorial palette)
**Light only. No dark mode.** Canonical tokens live in `app/globals.css`;
legacy var names (`--bg-primary`, `--text-primary`, `--id8-orange`, …) are
aliased to these so existing markup renders correctly.

- Paper (bg): `#fafaf7` · Paper-shadow: `#f2f0e8` · Paper-mid: `#ededdf`
- Ink (headings/rules/buttons): `#0b0b0b` · Body: `#2a2a2a` · Muted: `#5a5a5a`
- Hairline: `#d6d3c9` · Hairline-hard: `#b4afa0`
- **Accent: orange `#ff6b35`** (emphasis only) · teal `#2a8d83` (sparingly)

**NO other colors** — no blues/purples/greens/ambers, no gradients, no glows.

## Typography System
- **Display/headings:** Fraunces, weight 400, tight tracking; italic-orange `<em>` for emphasis
- **Body/UI:** Archivo, ~17px / 1.65
- **Kickers/nav/buttons/tags:** Archivo Narrow, uppercase, ~0.22em tracking
- **Metadata/dates/code:** JetBrains Mono
- **H1:** clamp(2.75rem, 6vw, 6rem) · **H2:** clamp(2rem, 4vw, 2.75rem) · **H3:** clamp(1.5rem, 2.5vw, 1.875rem)

## Layout Standards
- **Max width:** 1200px (container) · 760px (reading measure)
- **Shape:** cut corners (chamfer, radius 0) — boxes/chips/buttons get a 45° top-right cut via `.cut-tr`, or the hairline-preserving `.cut-frame > .cut-fill` for paper boxes. Never a literal right angle on that family; rounded corners still out. Separation via 1px hairlines + ink rules (a hairline rule is a line, not a cornered box, so it stays straight)
- **Section spacing:** 6rem (96px) vertical
- **Component spacing:** 2rem-4rem depending on hierarchy
- **Mobile breakpoints:** sm:640px, md:768px, lg:1024px, xl:1280px

## Component Patterns
### **Page Structure**
> Header/Footer are rendered globally in `app/layout.tsx`. Page files render
> their own content directly. Build from `@/components/editorial`.

```tsx
import { Container, Kicker, SectionHead, Deck } from '@/components/editorial'

export default function PageName() {
  return (
    <Container className="py-16">
      <Kicker dot>Section label</Kicker>
      <h1>A headline with <em>emphasis</em>.</h1>
      <Deck>The italic serif standfirst that frames the page.</Deck>
      {/* Page content */}
    </Container>
  )
}
```

### **Section Pattern**
```tsx
<section className="section-spacing">
  <Container>
    <SectionHead title={<>The <em>archive</em>.</>} meta="About" />
    {/* Section content — hairline cards / editorial grids */}
  </Container>
</section>
```

## Content Standards
### **Writing Voice**
- **Professional** but not corporate
- **Technical accuracy** without jargon
- **Confidence** without arrogance
- **Helpful** without being sales-y

### **Content Structure**
- **Headlines** should be clear and direct
- **Descriptions** should explain value, not features
- **Call-to-actions** should be obvious and low-friction

## Performance Requirements
- **Lighthouse score** >90 for Performance, Accessibility, SEO
- **Initial page load** <2 seconds
- **Core Web Vitals** all green
- **Bundle size** optimized (<500KB initial JS)

## What NOT to Do
### **Design Violations**
- **NO colors** except the editorial palette (paper/ink/body/muted/hair + orange + teal)
- **NO dark mode**, no `dark:` classes — the system is paper-only
- **NO rounded corners** (except pills/avatars) and **NO square right-angle boxes** — the box/chip/button family is chamfered (cut top-right corner); **no shadows, glows, or gradients**
- **NO heavy animations** - subtle color/opacity transitions only
- **NO feature creep** - every addition must justify its existence
- **NO decorative elements** that don't serve function

### **Code Violations**
- **NO inline styles** - use Tailwind classes
- **NO hardcoded colors** - use design tokens
- **NO complex state** unless absolutely necessary
- **NO external dependencies** without justification
- **NO client-side rendering** for static content

## File Structure
```
/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
│   ├── ui/          # Base components (Button, Container, etc.)
│   └── sections/    # Page sections (Hero, Features, etc.)
├── lib/             # Utilities and helpers
├── public/          # Static assets
├── styles/          # Global styles
└── types/           # TypeScript type definitions
```

## Testing Standards
- **Unit tests** for utility functions
- **Component tests** for UI components
- **E2E tests** for critical user flows (contact forms, navigation)
- **Accessibility tests** for WCAG compliance
- **Performance tests** for Core Web Vitals

## SEO Requirements
- **Meta tags** properly configured
- **Open Graph** and Twitter cards
- **Sitemap** generated and up-to-date
- **Schema.org** markup for business info
- **Mobile-friendly** design
- **Page speed** optimized

## Content Management
- **Markdown** for blog posts and articles
- **Static generation** for all content
- **Image optimization** with Next.js Image component
- **Font optimization** with Next.js Font system

## Essay Frontmatter Schema (STRICT)

All articles in `content/essays/` MUST use this exact frontmatter schema. The build will fail if required fields are missing. The parser auto-corrects common aliases but warns loudly.

```yaml
---
title: "Article Title"              # REQUIRED — the article heading
subtitle: "Subtitle for preview"    # Optional — shown below title
date: "YYYY-MM-DD"                  # REQUIRED — publication date, quoted string
category: "essay"                   # Recommended — "essay" | "research" | "release"
readTime: "X min read"              # Optional — auto-calculated if missing
excerpt: "First paragraph preview"  # Recommended — shown in article list
tags: ["tag1", "tag2"]              # Recommended — array of strings
featured: false                     # Optional — show on homepage
---
```

**DO NOT use these field names** (common mistakes the validator catches):
- `publishedAt` / `published_at` / `createdAt` — use `date`
- `description` / `summary` / `abstract` — use `excerpt`
- `readingTime` / `reading_time` — use `readTime`
- `image` / `cover` / `coverImage` — use `heroImage`

**Validation:** Run `npm run validate:essays` to check all articles. This also runs automatically before every build.

## Deployment Standards
- **Vercel** for hosting and deployment
- **Environment variables** for configuration
- **Build optimization** for production
- **Analytics** integration (privacy-focused)

---

**Remember:** This site represents id8Labs as a serious, professional company building tools for the AI era. Every pixel should reinforce credibility and trust.