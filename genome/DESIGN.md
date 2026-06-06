---
title: "DESIGN.md"
gene: design (how the brand looks)
brand: id8Labs
date: "2026-06-06"
derived-from: ["public/shipped/", "app/globals.css", "docs/EDITORIAL_SYSTEM.md"]
---

# DESIGN.md — Visual Gene
## id8Labs

> The visual DNA every asset conforms to. Read by the Build and Taste loops so output is on-brand by construction. The full React kit + usage rules live in `docs/EDITORIAL_SYSTEM.md`; this file is the gene.

The brand looks like a **print magazine on warm paper** — the "Shipped." editorial language. Restrained, credible, high-craft. Light only. Sharp corners. Flat.

---

## Palette

| Role | Value | Use |
|------|-------|-----|
| Surface | `#fafaf7` (paper) | page background |
| Surface-2 | `#f2f0e8` (paper-shadow) | hover, inset panels |
| Surface-3 | `#ededdf` (paper-mid) | tags, code chips |
| Ink | `#0b0b0b` | headings, primary text, rules, buttons |
| Body | `#2a2a2a` | body copy |
| Muted | `#5a5a5a` | secondary text, metadata |
| Hairline | `#d6d3c9` | borders |
| Hairline-hard | `#b4afa0` | stronger hairline |
| Accent | `#ff6b35` (orange) | emphasis only |
| Signal | `#2a8d83` (teal) | sparingly: success, "new/free" |

**Discipline:** orange is emphasis, not decoration — one or two orange moments per view. No other colors: no blues/purples/greens/ambers, no gradients.

## Type

- **Display / headlines:** Fraunces (variable opsz), weight 400, tight tracking; the signature is one italic-orange `<em>` per headline.
- **Body / UI:** Archivo, ~17px / 1.65.
- **Kickers / nav / buttons / tags:** Archivo Narrow, uppercase, ~0.22em tracking.
- **Metadata / dates / figures / code:** JetBrains Mono.

## Space and grid

Max content width 1200px; reading measure 760px. Generous whitespace. Rhythm comes from hairlines and ink rules, not boxes-in-boxes. Section dividers are ink (`--rule`); inline dividers are hair.

## Components

Build from `@/components/editorial`: Container, Kicker, Deck, SectionHead, Rule/Hairline, MetaRow, Tag/TagRow, EditorialButton (ink→orange), EditorialCard/IssueCard, Pipeline, SubscribeForm, PubBar, Prose. Buttons and tags are sharp and narrow-uppercase; cards are flat hairline surfaces.

## Motion

Subtle color/opacity transitions only (~150ms). Respect `prefers-reduced-motion`. Nothing else moves.

## Anti-design

Never looks like: dark mode; rounded corners (except pills/avatars); drop shadows, glows, or neon; gradients or gradient text; animated/parallax/LED backgrounds; off-palette accent colors; bold sans headlines; cramped, decorative, or "tech-startup glossy."
