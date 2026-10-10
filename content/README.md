# ID8Labs Content Assets

> Central home for all marketing, social, and educational content.

---

## Directory Structure

```
content/
├── README.md                 # This file
├── essays/                   # Long-form SEO content (MDX)
│   ├── claude-code-isnt-for-coders.mdx
│   └── the-70-percent-problem.mdx
├── social/
│   ├── linkedin/             # LinkedIn posts and slices
│   │   └── essay-1-linkedin-slices.md
│   ├── twitter/              # X/Twitter posts (future)
│   └── carousel-assets/      # Carousel graphics and copy
├── email/
│   ├── sequences/            # Nurture sequences
│   └── templates/            # Reusable email templates
├── research/                 # Market research and analysis
│   └── market-research-ai-dev-tools-2025.md
└── calendar/                 # Content calendars and schedules
    └── CONTENT_CALENDAR_30_DAY.md
```

---

## Content Types

### Essays (`/essays`)
Long-form SEO content in MDX format.

**Frontmatter:**
```yaml
---
title: "Essay Title"
subtitle: "Supporting tagline"
date: "YYYY-MM-DD"
author: "Eddie Belaval"
tags: ["tag1", "tag2"]
featured: true
---
```

**Naming:** `kebab-case-title.mdx`

---

### LinkedIn Posts (`/social/linkedin`)
Organized by source content.

**Naming:** `{source}-linkedin-slices.md`
- `essay-1-linkedin-slices.md` (from Essay 1)
- `essay-2-linkedin-slices.md` (from Essay 2)
- `standalone-posts.md` (original content)

**Structure:**
Each file contains multiple posts with:
- Post text (copy-paste ready)
- CTA
- Recommended posting day
- Format (text/carousel/poll)

---

### Email Sequences (`/email/sequences`)
Nurture sequences triggered by user actions.

**Naming:** `{trigger}-sequence.md`
- `free-course-signup-sequence.md`
- `masterclass-interest-sequence.md`

---

### Research (`/research`)
Market research, competitor analysis, audience insights.

**Naming:** `{topic}-{date}.md`
- `market-research-ai-dev-tools-2025.md`

---

### Calendar (`/calendar`)
Content calendars and publishing schedules.

**Naming:** `{period}-calendar.md`
- `CONTENT_CALENDAR_30_DAY.md`
- `q1-2025-calendar.md` (future)

---

## Content Pipeline

```
Research → Essay → Social Slices → Scheduler
                ↓
           Email Sequence
```

1. **Research** informs positioning and topics
2. **Essays** are anchor content (SEO + authority)
3. **Social slices** are extracted from essays (6+ posts per essay)
4. **Scheduler** queues and posts automatically
5. **Email sequences** nurture leads from content

---

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Essays | `kebab-case.mdx` | `the-70-percent-problem.mdx` |
| LinkedIn | `{source}-linkedin-slices.md` | `essay-1-linkedin-slices.md` |
| Research | `{topic}-{year}.md` | `market-research-ai-dev-tools-2025.md` |
| Email | `{trigger}-sequence.md` | `free-course-signup-sequence.md` |
| Calendar | `{period}-calendar.md` | `q1-2025-calendar.md` |

---

## Quick Reference

### Current Assets

**Essays (2):**
- ✅ Claude Code Isn't For Coders
- ✅ The 70% Problem

**LinkedIn Slices:**
- ✅ Essay 1 slices (6 posts)
- ✅ Essay 1 schedule manifest (ready for automation)

**Research:**
- ✅ AI Dev Tools Market Research 2025

**Calendars:**
- ✅ 30-Day Content Calendar

**Email Sequences:**
- 🔲 Free course signup (7 emails) - defined in calendar, not yet created

---

## Adding New Content

### New Essay
1. Create `content/essays/your-title.mdx`
2. Add frontmatter with date, tags, etc.
3. Create `content/social/linkedin/essay-N-linkedin-slices.md`
4. Extract 4-6 posts from essay sections

### New LinkedIn Post (Standalone)
1. Add to `content/social/linkedin/standalone-posts.md`
2. Include: hook, body, CTA, format, suggested date

### New Email Sequence
1. Create `content/email/sequences/{trigger}-sequence.md`
2. Define: subject, body, CTA, send timing for each email

---

## Integration with Scheduler

The social media scheduler reads from:
- `content/social/linkedin/*.md` (or `.json` when formatted)
- `content/calendar/*.md` for timing

### Scheduling Files

| File | Purpose |
|------|---------|
| `essay-1-posts.json` | Source content (6 posts with text, hashtags, CTAs) |
| `essay-1-schedule.json` | Machine-readable schedule with exact dates/times |
| `SCHEDULING_MANIFEST.md` | Human-readable agent instructions |

### Agent Workflow
1. Agent reads `SCHEDULING_MANIFEST.md` for instructions
2. Agent uses `essay-1-schedule.json` for exact timing
3. Posts go out automatically on schedule
4. Eddie handles engagement manually

### Schedule Structure (JSON)
```json
{
  "schedule": {
    "date": "2025-01-06",
    "time": "09:00",
    "dayOfWeek": "Monday"
  },
  "content": "...",
  "firstComment": { "required": true, "content": "..." }
}
```

---

## Integration with Website

Essays in `content/essays/*.mdx` are **automatically rendered** on the website at:
- List: `id8labs.si/essays`
- Individual: `id8labs.si/essays/{slug}`

**How it works:**
1. `lib/mdx-essays.ts` reads MDX files from this directory
2. `lib/essays.ts` merges them with legacy inline essays
3. MDX essays take precedence (if same slug exists in both)

**Required frontmatter for essays:**
```yaml
---
title: "Essay Title"           # Required
subtitle: "Tagline"            # Optional, displayed in header
date: "YYYY-MM-DD"             # Required for sorting
publishDate: "YYYY-MM-DD"      # Optional: schedule for future publication
author: "Eddie Belaval"        # Optional
tags: ["tag1", "tag2"]         # Optional, used for category inference
featured: true                 # Optional
category: "essay"              # Optional: essay, research, or release
---
```

**Scheduled Publishing:**
- If `publishDate` is omitted, essay publishes immediately on deploy
- If `publishDate` is set to a future date, essay is hidden until that date
- Site revalidates hourly via Vercel ISR to pick up newly-published essays
- Use `date` for display/sorting, `publishDate` for scheduling

**Example scheduled post:**
```yaml
---
title: "2026 Resolution"
date: "2026-01-01"             # Display date
publishDate: "2026-01-01"      # Won't appear until Jan 1, 2026
---
```

**Auto-generated fields:**
- `readTime` - calculated from word count (~200 wpm)
- `excerpt` - extracted from first paragraph
- `category` - inferred from tags if not specified
