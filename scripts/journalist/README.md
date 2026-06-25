# The `journalist` chain — The Correspondent

A live journalist agent on staff at the lab. It keeps `/writing` fed on its own
cadence — a new piece every 2–3 days — with **no human in the happy path**. The
rubric is the gate, not you.

This is the thesis applied to our own publishing: a loop that does the work *and
proves the work is right* before it ships. Same shape as the `lab-log` chain, but
the founder's approval gate is replaced by an automated editorial rubric.

```
TRIGGER   GitHub Actions, daily            (.github/workflows/journalist.yml)
GATE 1    cadence — is a piece due? (2-3 day spacing)   else skip
BEAT      alternate: field (AI news, live web search) / work (the lab's public record)
DRAFT     Claude, as THE CORRESPONDENT, reports + writes one piece, in voice
GATE 2    Claude, as the MANAGING EDITOR, grades it against the rubric
          pass -> commit to main -> Vercel deploys to /writing   (hands-off)
          hold -> open a DRAFT PR with the scorecard             (human reads it)
```

**Automated:** deciding, reporting, drafting, grading, publishing.
**Human:** only when the rubric holds a piece back — it lands as a PR for you.

## The two beats

- **field** — what's happening in AI as it develops. Researched live through the
  Anthropic web-search tool; every claim traces to a real retrieved source, and
  the links are appended as a Sources section.
- **work** — the story of what the lab is building, drawn **only** from the public
  record (this repo's commit history + already-published essays). No secret sauce,
  no client names, no PII — same public-safety rules as `/services` and `lab-log`.

## The voice and the rubric

Both live in [`voice.md`](./voice.md) — the app-repo distillation of the private
HALO genome. It is the single source of truth: the agent reads it before drafting
and the editor grades against it before anything ships. Tune the writing by editing
that file; you don't touch the code.

The bar: every rubric axis ≥ 4 **and** zero public-safety violation. Anything less
is held. The loop never lowers its own bar to publish.

## Files

| File | Role |
|---|---|
| `generate.mjs` | the agent: cadence gate → beat → draft → grade → write/decide |
| `voice.md` | voice, public-safety rules, and the rubric (edit this to tune) |
| `ledger.json` | committed state: last post date, interval, beat rotation, history |
| `last-eval.json` | the latest editor scorecard (gitignored; for logs / the PR body) |

Generated pieces carry `generator: "journalist"` and `author: "The Correspondent"`
in their frontmatter, so they're distinguishable from human essays and excluded
from the exemplar set the agent learns from (no self-imitation drift).

## One-time activation (your only step — then you're out of the loop)

1. **Add the API key:** repo **Settings → Secrets and variables → Actions →**
   `New repository secret` → `ANTHROPIC_API_KEY`.
   *(Optional: a repo variable `JOURNALIST_MODEL` to pin a model; defaults to a
   sensible current model with fallbacks.)*
2. **Let Actions write:** **Settings → Actions → General → Workflow permissions →**
   "Read and write permissions" **and** check "Allow GitHub Actions to create and
   approve pull requests."
3. **Merge the PR** that adds this chain. Scheduled runs only fire from the default
   branch, so merging *is* turning the loop on.

That's it. The first eligible run files the first piece.

## Run it by hand

```bash
npm run journalist:dry          # force a draft, grade it, print it, write nothing
node scripts/journalist/generate.mjs            # respect the cadence
node scripts/journalist/generate.mjs --force            # file now
node scripts/journalist/generate.mjs --mode=field       # pick the beat
node scripts/journalist/generate.mjs --force --mode=work
```

Needs `ANTHROPIC_API_KEY` in the environment or in `.env.local`.

## The kill switch

Disable **The Correspondent** in the repo's **Actions** tab (or delete the
workflow file). The cadence and rotation resume cleanly whenever you re-enable it.
