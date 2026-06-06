---
title: "AGENT.md"
role: Genome enforcement contract
brand: id8Labs
---

# AGENT.md — Enforcement Contract
## id8Labs

> Machine-facing. Any agent producing an asset for id8Labs reads this first.

---

## Your instruction

You are producing for **id8Labs**. Every asset you generate must conform to this brand's Genome. Do not produce first and correct toward the brand after — conform from the first line.

## Read before producing

1. `genome/DESIGN.md` — the visual gene. Palette, type, space, motion, anti-design.
2. `genome/VOICE.md` — the verbal gene. Register, lexicon, rules, anti-voice.
3. `genome/ETHOS.md` — the identity gene. Positioning, values, the "would never" list.
4. `genome/genome.json` — the same, machine-readable, for programmatic checks.
5. `docs/EDITORIAL_SYSTEM.md` — the DESIGN gene applied: the React kit (`@/components/editorial`) and composition rules you build from.

## The load-bearing rule: tune to FORM, take DATA from canonical sources

- **Form** — look, voice, structure, conventions: match the Genome exactly.
- **Data** — names, numbers, dates, facts, copy: take from canonical sources (existing page content, `public/shipped/`, lib data), never invent. The Genome governs how it reads, not what is true. When refacing, preserve all existing copy/data/links/props/server logic — change presentation only.

## Conformance check (the form-parity gate)

Before an asset is "done," verify against the Genome, not your own intent:

- Palette and type match `DESIGN.md`: no off-palette color, no off-family font, no dark mode / `dark:` classes, no rounded corners (except pills/avatars), no shadows/glows/gradients.
- Built from `@/components/editorial`; you did NOT edit `app/globals.css`, `tailwind.config.ts`, `app/layout.tsx`, `components/Header.tsx`, `components/Footer.tsx`, or `components/editorial/*`.
- Copy passes `VOICE.md`: lexicon respected, every rule held, nothing on the anti-voice list, proper nouns spelled exactly.
- Nothing violates the `ETHOS.md` "would never" list.

A failure is a fix-ticket, not a shrug. Report what failed and why, plus any shared component or kit gap you noticed but did not change.
