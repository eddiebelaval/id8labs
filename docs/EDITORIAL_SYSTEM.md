# id8Labs Editorial Design System ("Shipped." language)

This is the **contract**. Every page, component, and cluster of the redesign
builds from it so the whole site reads as one publication. If a change needs a
color, font, radius, or effect not described here, it's wrong — fix the design,
not the token.

Reference implementation: `public/shipped/index.html` (+ issues `01`–`04`,
`monthly/2026-05`). React kit: `components/editorial/`. Global tokens:
`app/globals.css` + `tailwind.config.ts`.

---

## 1. The feeling

A print magazine on warm paper. Restrained, credible, high-craft. Big serif
headlines with italic-orange emphasis, narrow uppercase kickers, mono metadata,
hairline rules, generous whitespace. **Light only. Sharp corners. Flat.**

---

## 2. Palette (the only colors)

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#fafaf7` | page background |
| `--paper-shadow` | `#f2f0e8` | hover / inset panels |
| `--paper-mid` | `#ededdf` | tags, code chips |
| `--ink` | `#0b0b0b` | headings, primary text, rules, buttons |
| `--body` | `#2a2a2a` | body copy |
| `--muted` | `#5a5a5a` | secondary text, meta |
| `--hair` | `#d6d3c9` | hairline borders |
| `--hair-hard` | `#b4afa0` | stronger hairline / pipeline boxes |
| `--orange` | `#ff6b35` | the single accent — emphasis, kickers, hover |
| `--teal` | `#2a8d83` | sparingly: success, "new/free" tags |

**No** blues/purples/greens/ambers, **no** gradients, **no** dark mode. Orange is
emphasis, not decoration — one or two orange moments per view.

Legacy CSS var names (`--bg-primary`, `--text-primary`, `--border`, `--id8-orange`,
the `--accent-*` set) are aliased to these in `globals.css`, so old markup renders
correctly — but **new code uses the editorial tokens above.**

---

## 3. Type

Four families, loaded in `app/layout.tsx`:

- **Fraunces** (`--font-serif` / `--font-display`) — display headings + italic
  emphasis + decks/blockquotes. Variable optical size; use `<em>` for the
  italic-orange accent.
- **Archivo** (`--font-sans`) — UI and body text.
- **Archivo Narrow** (`--font-narrow`) — uppercase kickers, nav, buttons, tags.
  Always `uppercase` + `tracking-[0.22em]`-ish.
- **JetBrains Mono** (`--font-mono`) — dates, counts, metadata, code.

Headings are Fraunces `font-weight: 400` (not bold), tight tracking. Body is
Archivo ~17px / 1.65. The italic-orange `<em>` inside a headline is the signature.

---

## 4. Shape, depth, motion

- **Corners:** sharp (`border-radius: 0`) everywhere except pills/avatars.
- **Borders:** 1px hairlines (`--hair`); section dividers use ink (`--rule`).
- **Depth:** flat. No box-shadows, no glows. Separation comes from rules and
  paper-shadow fills.
- **Motion:** subtle color/opacity transitions only (~150ms). No float, pulse,
  parallax, gradient-shift, or animated backgrounds. Respect reduced-motion.

---

## 5. The kit — use it, don't reinvent

Import from `@/components/editorial`:

| Component | What |
|---|---|
| `Container` | 1200px (or `narrow` 760px) centered, editorial gutters |
| `Kicker` | narrow uppercase orange label (`dot` for the bullet variant) |
| `Deck` | italic serif standfirst |
| `SectionHead` | Fraunces title (supports `<em>`) + ink underline + side meta |
| `Rule` / `Hairline` | ink / hair dividers |
| `MetaRow` | mono key/value strip (e.g. hero stats) |
| `Tag` / `TagRow` | square narrow uppercase topic tags |
| `EditorialButton` | ink→orange (primary), outline→ink (secondary), ghost |
| `EditorialCard` | flat hairline surface (`featured` adds the orange top rule) |
| `IssueCard` | magazine archive row (index № · title/deck/tags · date/read) |
| `Pipeline` | mono step boxes + arrows; `human` steps go orange |
| `SubscribeForm` | newsletter capture (posts `/api/newsletter/subscribe`) |
| `PubBar` | publication masthead strip for editorial landing pages |
| `Prose` | long-form reader typography for articles/MDX |

Global utility classes also exist: `.kicker`, `.deck`, `.meta`, `.rule`,
`.hairline`, `.btn`/`.btn-primary`/`.btn-secondary`/`.btn-ghost`, `.card`,
`.container`. The retained `.btn`/`.card`/`.badge` names are already restyled
editorial, so existing markup upgrades for free.

---

## 6. Page composition

Think spreads, not hero-stacks:

1. **Kicker** (when/what) → **Fraunces headline with `<em>`** → **italic Deck** →
   **CTA row** (ink + ghost buttons) → **MetaRow** of mono stats, closed by a rule.
2. Sections open with `SectionHead` (title + right-aligned meta), separated by
   ink rules; content below in hairline cards or editorial grids.
3. Long-form pages: narrow 760px measure, `Prose`, mono bylines/dates.
4. Use real whitespace and hairlines for rhythm — not boxes-in-boxes or shadows.

---

## 7. Rules for cluster agents

1. **Read this file first.** Build from `components/editorial`, not from scratch.
2. **Touch only your cluster's files.** Never edit `globals.css`,
   `tailwind.config.ts`, `app/layout.tsx`, or `components/editorial/*` — those
   are foundation-owned. Need a new shared primitive? Flag it, don't fork it.
3. **No off-palette color, no shadow, no glow, no gradient, no rounded corner,
   no `dark:` class.** Strip `dark:` variants you encounter.
4. Replace decorative/animated elements with editorial equivalents (rules,
   tags, mono meta) rather than deleting structure wholesale.
5. Verify your routes build (`npm run build`) and screenshot them before
   reporting back.
