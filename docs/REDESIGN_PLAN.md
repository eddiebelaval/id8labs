# Reface id8Labs → "Shipped." editorial language

**Status:** Approved direction, pre-implementation
**Branch:** `claude/website-redesign-plan-pRa3q`
**Decisions locked:** entire site (all ~130 routes) · paper-only (drop dark mode) · editorial rebuild (true compositions, not a reskin)

---

## The one thing that makes or breaks a swarm here

130 routes rebuilt by parallel agents will look like 130 different websites **unless every agent builds against one locked contract**. This is *not* "spawn 12 agents on 12 folders." It is **one foundation, merged and frozen, then fan-out.** The foundation is the entire ballgame; the page work is comparatively mechanical once it exists.

Canonical reference = `public/shipped/index.html` + `public/shipped/01–04` + `public/shipped/monthly/2026-05`. That static site **is** the design spec. We are porting its DNA into the Next.js app.

### The gap to close

| | Current (`globals.css` v2.1) | Target (Shipped) |
|---|---|---|
| Surface | pure white + full dark mode | warm paper `#fafaf7`, light only |
| Type | Inter / Crimson / Fraunces-900 | Fraunces (variable opsz) + Archivo + Archivo Narrow + JetBrains Mono |
| Corners | "NO 90° ANGLES" — all rounded | sharp, hairline rules |
| Depth | multi-layer shadows, orange/blue glows, gradient text | flat; hairlines only |
| Motion | float, pulse-glow, gradient-shift, neural-net bg | near-static, restrained |
| Accent | orange + blue/purple/green/amber | orange `#FF6B35` + teal `#2a8d83`, nothing else |

These are near-inverse systems — a rebuild, not a touch-up.

### Reference design tokens (from `public/shipped/index.html`)

```
--paper:#fafaf7;  --paper-shadow:#f2f0e8;  --paper-mid:#ededdf;
--ink:#0b0b0b;    --body:#2a2a2a;          --muted:#5a5a5a;
--hair:#d6d3c9;   --hair-hard:#b4afa0;     --rule:#0b0b0b;
--orange:#FF6B35; --orange-soft:rgba(255,107,53,.12);  --teal:#2a8d83;

--serif:'Fraunces',Georgia,serif;       /* display + body emphasis (italic) */
--sans:'Archivo',system-ui,sans-serif;  /* UI / body */
--narrow:'Archivo Narrow';              /* uppercase kickers, letterspaced */
--mono:'JetBrains Mono';                /* metadata, dates, counts */
```

Signature moves: large Fraunces display with **italic-orange emphasis** (`<em>`), narrow uppercase kickers at `.22em` tracking, mono metadata rows, hairline section rules, ink buttons that flip to orange on hover, structured editorial grids (e.g. issue cards `120px 1fr auto`).

---

## Phase 0 — Foundation (BLOCKING, single owner, merged before anything fans out)

Built/supervised directly because it is the contract. Nothing else starts until it is merged to the base branch.

- **Tokens & global CSS** — rewrite `globals.css` + `tailwind.config.ts`: paper/ink/body/muted/hair/orange/teal palette; delete the rounded-everything rule, all shadows, glows, gradient-text, and the float/pulse/gradient keyframes. Editorial type scale (Fraunces clamp display, narrow uppercase kickers, mono meta).
- **Fonts** — in `layout.tsx`: add Fraunces (variable), Archivo, Archivo Narrow, JetBrains Mono via `next/font`; remove Inter / Instrument_Serif / Press_Start.
- **Kill dark mode** — strip `ThemeProvider`, `.dark` blocks, theme toggle, and remove `NeuralNetworkBg` from layout. (Phase-1 agents strip `dark:` classes within their own files.)
- **Editorial component kit** — new `components/editorial/`: `Container`, `PubBar/Masthead`, `Kicker`, `Deck`, `SectionHead`, `Rule`, `EditorialCard`/`IssueCard`, `Button` (ink→orange flip), `Tag`, `MetaRow`, `Pipeline`, `SubscribeForm`, and a `prose-editorial` article style.
- **Global chrome** — rebuild `Header.tsx` + `Footer.tsx` into masthead/colophon style (every page renders these, so they must land in Phase 0).
- **The Style Bible** — `docs/EDITORIAL_SYSTEM.md`: the do/don't contract every downstream agent reads first. Plus rewrite the stale design sections of `CLAUDE.md` (it still describes the old "monochromatic Inter" system, which no longer matches reality).

**Gate to exit Phase 0:** `npm run build` passes; homepage + one product + one article render correctly in the new system; kit visually matches the Shipped reference.

---

## Phase 1 — Swarm fan-out (parallel, each agent owns a disjoint file set)

Each agent works in its **own git worktree**, reads the Style Bible first, consumes the frozen kit, and touches *only* its cluster. Foundation owns all global files; nobody else edits `globals.css`/`tailwind`/`layout` → near-zero merge conflicts.

| Agent | Cluster | Routes |
|---|---|---|
| A · Marketing | home sections, products index + 12 product pages, services | ~20 |
| B · Reader | writing/essays templates, thesis, lab, newsletter, prose | ~12 |
| C · Academy | academy + courses landings **+ shared module template → 57 module pages** | ~70 |
| D · Marketplace | stackshack, skills, commands, gallery (cards/grids) | ~20 |
| E · App/auth | dashboard, profile, settings, admin, contact, auth, privacy/terms, claude-corner | ~20 |
| F · Embedded UI | tool-factory, workspace, annotations components | components |

Agent C is the giant — it first builds **one** module-reading template, gets it approved, then applies it across all 57 module pages (mechanical once locked). Likely split into 2–3 sub-agents by course family.

Realistically **~8–10 parallel agents**, staggered so template-defining agents (C's module template, B's article template) land before their bulk pages.

---

## Phase 2 — Integration & QA

- Playwright screenshot sweep across all clusters → visual-consistency review against the bible.
- Accessibility (contrast on paper, focus states), responsive (Shipped 720px breakpoint behavior), `npm run build` + `validate:essays` + lint green.
- Sweep for leftover `dark:` classes, old tokens, dead CSS/components from the retired system.
- One PR per phase (draft), or a stacked series, so review stays digestible.

---

## Coordination mechanics

- **Base branch:** `claude/website-redesign-plan-pRa3q`. Foundation merges here first.
- **Worktrees:** one per Phase-1 agent, branched off the post-foundation base.
- **Contract enforcement:** every agent's first step is reading `docs/EDITORIAL_SYSTEM.md`; no agent may add a color/shadow/radius outside the tokens.
- **Verification per agent:** build + lint + screenshots of owned routes before reporting back.

---

## Risks / open calls

1. **Scale is real.** Editorial-rebuilding 130 routes (esp. 57 academy modules) is the bulk of the effort. Craft lives in the module/article *templates*; the rest is application. Confirm whether academy modules truly need full rebuild vs. a strong shared template — that single call swings size by ~half.
2. **Foundation-first is non-negotiable.** Parallelizing before the kit is frozen produces drift and rework.
3. **Ship in reviewable phases** (foundation PR → marketing PR → reader PR → …) rather than one 130-file megamerge.

---

## Next action

Start **Phase 0**: rewrite tokens/fonts/layout, build `components/editorial/` + Header/Footer, write the Style Bible, open the foundation PR for review before any agents fan out.
