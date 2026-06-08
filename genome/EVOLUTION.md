# EVOLUTION: the id8Labs Genome over time

> The DNA's changelog. A brand does not announce when it changes; it drifts, one output at a time, until the new way has quietly eaten the old. This log makes that visible and deliberate. We track the change so we can protect it. This file obeys the VOICE rules: no em or en dashes, no emojis.

## Why this exists

The Genome is the stable core, but "stable" does not mean "frozen." The brand's real expression moves as the work moves. The job of this log is to catch that movement early, name it, and route it through a human gate before it silently becomes the new normal.

Two questions, asked on a monthly cadence (the Genome Auditor, `/halo audit`):

1. **Has our north star moved?** Has the positioning, the ICP, the model, or what we are pointed at shifted?
2. **Has our DNA evolved?** Has the way we look (DESIGN), sound (VOICE), or decide (ETHOS) drifted from what the genes say?

Every change is classified: **stable** (no change), **emerging** (a pattern starting to spread, watch it), **evolved** (a real shift to ratify into the Genome), or **drift-to-correct** (off-brand creep to reject before it spreads). Only Eddie ratifies a change into the genes. The auditor proposes; it never edits the DNA or commits.

Entries are chronological, oldest first. Append new audits at the bottom.

---

## Founding entry, the Shipped language ate the studio (the pattern this log was built to catch)

The reason this log exists. id8Labs did not decide in a meeting to look the way it looks now. It happened by spread.

- **Origin (a single product).** "Shipped." (the weekly magazine) was built with its own editorial design language: a print-magazine-on-warm-paper aesthetic (serif headlines, mechanical condensed kickers, disciplined orange, paper grain, flat and light). It was scoped to `/shipped/*` only, deliberately walled off from the global id8Labs system.
- **The old studio DNA.** The id8Labs site itself was something else entirely: a Cal.com-tradition monochrome look, Inter everywhere, light-and-dark mode, the "lab coat." That was the studio's stated design law (the old `DESIGN.md`).
- **The spread.** The editorial language proved stronger than the lab coat. It started eating the other outputs. What was a magazine skin became the way every new artifact wanted to look, until the whole site was refaced to it (the reface landed as one large change, "Reface the entire site to the Shipped editorial language," but the pressure had been building output by output for weeks). The site adopted the editorial language with its own type choices (Fraunces and Archivo, where the magazine uses Libre Baskerville and Barlow Condensed); the warm paper, the flat sharp light discipline, and the disciplined orange carried straight over.
- **The lesson.** By the time it was refaced, the old dark Cal.com DNA was already dead; the brand had evolved and no one had written it down as it happened. We almost rebuilt against the stale DNA (the services rebrand was started against the old dark tokens on 2026-06-08 before the drift was caught). The cost of an untracked evolution is real: stale source of truth, work built against the past.

This is exactly the movement the monthly audit is built to catch the next time, while it is still emerging, so the evolution is deliberate and protected rather than discovered after the fact.

**Status:** evolved (the Shipped editorial language is now the canonical DESIGN gene; the old Cal.com DNA is retired).

---

## 2026-06-08, completeness pass (the DNA was deeper than the genes captured)

First audit after the founding. Triggered by a direct question: does the Genome encase everything about who we are?

- **North star moved?** No movement, but sharpened. The discipline got a precise name it did not have before: **AI system architecture and forward deployment**. Eddie's title crystallized: **AI System Architect** (was implicitly "filmmaker turned primitive chain architect").
- **DNA evolved?** Yes, in VOICE and ETHOS.
  - **VOICE:** new terms of art entered the working vocabulary and were not in the lexicon: AI harnesses, intelligence layers, agents with depth and breadth that create presence (not a chatbot), the Genome, the Spiral, the Membrane, Attunement, custodianship. A public-vs-internal split was added so the method names stay off public surfaces. The em-dash rule was reversed (the gene said "keep them"; the standing rule is never) and every genome file was scrubbed to model it.
  - **ETHOS:** the custodianship model, the founder story, the real ICP (professional-services and regulated firms), and the full values and would-never list were added. The public disclosure discipline ("inform, do not reveal the shape") was encoded after the services and method pages were found exposing the method mechanics.
- **Emerging (watch):** the genome lives in a public GitHub repo. It names the internal terms of art (not the deep mechanics). Watch whether this needs to move private.
- **Drift to correct:** none. The services page had been started against the stale dark DNA; corrected by syncing to the live design before shipping.
- **Ratified into the Genome:** ETHOS.md, VOICE.md, genome.json (v2), plus a HALO.md manifest. Committed `7e7f9b0`, deployed.

**Status:** evolved and ratified.


---

## 2026-06-08, monthly audit

First scheduled monthly drift check after the founding and completeness passes. Run against the live homepage, the live /services page, and 35 days of git log. Note: this audit lands the same day as the completeness pass (`7e7f9b0`), so most genes were ratified hours earlier; the findings below are what the live work shows that the just-ratified genes do not yet.

**North star moved?** No. Stable. The live homepage leads "Architecture, not tools. Primitive chains for AI-era operators" and "Forward Deployment / We deploy it inside your business"; the live /services leads "Forward Deployment" with "Custodians, not vendors" and "Human gates by design." That is ETHOS positioning verbatim ("Architecture, not tools", "custodians not vendors", "The human gate is structural"). Positioning, ICP, model, and what we are pointed at all match the gene. Worth recording: stable.

**DNA evolved?** Yes, in VOICE (one real shift). "the Genome" is listed in VOICE.md under "Internal terms of art (not for public surfaces)", yet the live /services page publicly names and explains it: "At its core is the Genome : the DNA of how you work, in three parts. Design ... Voice ... Ethos." The page was shipped deliberately (`refine(services,method): inform without giving away the shape`) with the disclosure discipline applied, and it informs what the client gets without revealing the operating mechanics (the Spiral, the Membrane, Attunement, the gates stay off the page). The Genome has graduated to public-safe while the lexicon still says otherwise. DESIGN: stable (no off-palette, off-type, or new motif in evidence; the Shipped reface already ratified). ETHOS: stable.

**Emerging (watch):** (1) The public four-movement vocabulary on /services, "Attune / Build / Verify / Tend", is the client-facing twin of internal mechanics; "Attune" sits one letter from the internal term "Attunement." The twin pattern is working, but watch whether "Attune" reads as a leak of "Attunement." (2) "resting frequency" is a new public metaphor on /services ("Every org has a resting frequency"); attractive and public-safe, watch whether it spreads into a fixed term of art. (3) The public-repo watch item from the completeness pass still stands.

**Drift to correct:** Em dashes are live on the homepage, against the 2026-06-08 ruling "No em dashes or en dashes. Anywhere. Internal or published." Three on the homepage: "Someone to talk to (em dash) powered by Claude" (Parallax), "across three stages (em dash) Workshop, Study, Press" (Rune), "eats the drudgery before the work (em dash) so you reach scale tools alone cannot deliver" (Forward Deployment). The gene is correct; the copy predates the ruling and was not scrubbed. Correction is a copy scrub, not a gene edit.

**Proposed for ratification:** (1) VOICE.md lexicon: move "the Genome" from "Internal terms of art (not for public surfaces)" to "Say (public-safe)." (2) VOICE.md lexicon names: add "HOMER" and "StackShack" (both ship live on the homepage nav and product grid; neither is in the names list). No DESIGN or ETHOS edits proposed.

**Status:** evolved (one VOICE shift proposed, pending Eddie's ratification; one drift to correct in live copy).
