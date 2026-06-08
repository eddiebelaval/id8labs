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
- For any PUBLIC asset, the public disclosure discipline below holds.

A failure is a fix-ticket, not a shrug. Report what failed and why, plus any shared component or kit gap you noticed but did not change.

## Public disclosure discipline (inform, do not reveal the shape)

When the asset is public facing (the marketing site, decks, posts, anything a prospect or competitor can see), apply the ETHOS rule "inform, do not reveal the shape":

- **Inform.** Name the product and the outcome. Use the distinctive vocabulary (HALO, the Genome, forward deployment, primitive chains, AI harnesses, intelligence layers, presence not a chatbot). Convey rigor and depth.
- **Do not reveal the shape.** Keep off public surfaces: the engagement gate names and step sequence, pricing tactics or rates, the post-launch gate mechanics, the tuning/Attunement loop, eval and golden-dataset internals, and any "how we keep you, why you cannot leave" framing.
- **The test.** A competitor should not be able to reconstruct the method from a public page, and a client should not see the commercial gears. Show what they get, not how the machine works.
- **Internal stays full.** This genome, the playbooks, and engagement docs keep the complete mechanics. That is where they belong. This discipline governs public surfaces only.
