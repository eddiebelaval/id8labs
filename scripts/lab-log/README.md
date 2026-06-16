# The `lab-log` chain

Keeps the witness's log on `/lab/story` current as the story progresses. It is the
thesis applied to the lab's own story: a chain that watches the work happen and
keeps the record, with the human at the one gate that matters.

```
TRIGGER   launchd, monthly on the 13th        (com.id8labs.lab-log.plist)
DRAW      FIELD_NOTES.md + git, since the last published entry's date
DRAFT     Claude, as THE WITNESS, distills the period into ONE entry      (draft.mjs)
          public-safe, anonymized (a law firm / a data company), witness voice
GATE      writes scripts/lab-log/pending.json — does NOT publish          ← human gate
PUBLISH   founder reads it, runs approve.mjs, then commits + deploys       (approve.mjs)
```

**Automated:** watching, distilling, drafting (the drudgery).
**Human:** is this true, is this us, is it safe to be public (the judgment).

## Files

- `draft.mjs` — the witness drafts. Gathers events since the newest entry in
  `lib/lab-log.json`, asks Claude for one witness-voice entry, stages `pending.json`.
- `approve.mjs` — the founder publishes. Prepends `pending.json` to `lib/lab-log.json`
  (newest first), clears the staging file. Does not commit/deploy.
- `com.id8labs.lab-log.plist` — the monthly schedule (staged; install after approval).
- `pending.json` — the staged, unpublished draft (gitignored; transient).

## Data

`lib/lab-log.json` is the record — an append-only array, newest first. `lib/lab-log.ts`
types it and the Lab page renders it. Existing entries are never rewritten.

## By hand

```
node scripts/lab-log/draft.mjs     # stage the next entry from recent events
cat  scripts/lab-log/pending.json  # read what the witness wrote
node scripts/lab-log/approve.mjs   # publish it to lib/lab-log.json
# then: review the diff, commit lib/lab-log.json, deploy (the gate)
```

## Install the schedule (after approval)

```
cp scripts/lab-log/com.id8labs.lab-log.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.id8labs.lab-log.plist
```

Re-point the node path in the plist if node is upgraded (it is nvm-versioned).
