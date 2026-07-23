#!/bin/bash
#
# Shipped. — manifest refresh.
#
# The /shipped hub renders from two AUTO-GENERATED data files:
#
#   lib/shipped/dailies.data.ts   daily editions
#   lib/shipped/sweeps.data.ts    weekly + monthly sweeps
#
# Both are derived from the shipped repo's origin/daily-pages branch, which the
# publishing routines push to. Nothing regenerated them, so they drifted: on
# 2026-07-23 the hub advertised 40 dailies ending Jun 15 while 77 were live
# through Jul 22, and every weekly/monthly sweep was unlinked entirely.
#
# This closes that loop. Runs daily via com.id8labs.shipped-manifest-refresh
# (23:15, after the 21:00 nightly publish and 22:45 distribute).
#
# Safety properties, in order of importance:
#   - Only ever stages the two generated files. A dirty working tree elsewhere
#     is untouched: commits use an explicit pathspec, so a parallel session's
#     in-progress work can never be swept into a commit.
#   - No-ops silently when nothing changed (the common case), doing zero git
#     surgery on the repo.
#   - Refuses to run off main, where a push would go somewhere unintended.
#
# Usage:
#   refresh-shipped-manifest.sh            regenerate, commit, push if changed
#   refresh-shipped-manifest.sh --dry-run  regenerate and report; never commit

set -euo pipefail

# Overridable so the guards can be exercised against a throwaway worktree.
# Production (launchd) passes neither and gets these defaults.
ID8LABS="${ID8LABS_ROOT:-/Users/eddiebelaval/Development/id8/id8labs}"
SHIPPED="${SHIPPED_ROOT:-/Users/eddiebelaval/Development/id8/shipped}"
LOG_DIR="$HOME/Library/Logs/shipped"
LOG="$LOG_DIR/manifest-refresh.log"

DATA_FILES=("lib/shipped/dailies.data.ts" "lib/shipped/sweeps.data.ts")

DRY_RUN=0
if [ "${1:-}" = "--dry-run" ]; then
  DRY_RUN=1
fi

mkdir -p "$LOG_DIR"

log() {
  printf '%s  %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$1" >> "$LOG"
}

die() {
  log "ABORT: $1"
  echo "refresh-shipped-manifest: $1" >&2
  exit 1
}

# PATH for launchd, which runs with a minimal environment and no node on PATH.
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.nvm/versions/node/v22.21.1/bin:$PATH"
command -v node >/dev/null 2>&1 || die "node not found on PATH"

# Ask git rather than testing for a .git DIRECTORY — in a linked worktree .git
# is a file, and a -d test would abort on a perfectly valid checkout.
git -C "$ID8LABS" rev-parse --git-dir >/dev/null 2>&1 ||
  die "id8labs is not a git repo at $ID8LABS"
git -C "$SHIPPED" rev-parse --git-dir >/dev/null 2>&1 ||
  die "shipped is not a git repo at $SHIPPED"

cd "$ID8LABS"

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$BRANCH" != "main" ]; then
  log "SKIP: id8labs is on '$BRANCH', not main (a push would go somewhere unintended)"
  exit 0
fi

# Step 1 — refresh the source branch. Fetch only; never checkout, so a parallel
# session working in the shipped repo is unaffected.
if ! git -C "$SHIPPED" fetch --quiet origin daily-pages 2>>"$LOG"; then
  die "could not fetch origin/daily-pages in the shipped repo"
fi

# Step 2 — regenerate. The builder fully rewrites both files from the branch,
# so it is idempotent: unchanged input produces a byte-identical file.
if ! node scripts/build-daily-manifest.mjs >>"$LOG" 2>&1; then
  die "manifest builder failed (see $LOG)"
fi

# Step 3 — did the generated data actually change?
if git diff --quiet -- "${DATA_FILES[@]}"; then
  log "no change (hub already current)"
  exit 0
fi

DAILY_COUNT="$(grep -c "^    date: " "$ID8LABS/lib/shipped/dailies.data.ts" || true)"
SWEEP_COUNT="$(grep -c "^    period: " "$ID8LABS/lib/shipped/sweeps.data.ts" || true)"
SUMMARY="$DAILY_COUNT dailies, $SWEEP_COUNT sweeps"

if [ "$DRY_RUN" -eq 1 ]; then
  log "DRY RUN: manifests changed ($SUMMARY) — not committing"
  git --no-pager diff --stat -- "${DATA_FILES[@]}" | tee -a "$LOG"
  exit 0
fi

# Step 4 — commit ONLY the generated files. The explicit pathspec on both add
# and commit is what makes this safe to run while other work is in flight.
git add -- "${DATA_FILES[@]}"
git commit -q -m "chore(shipped): refresh hub manifests ($SUMMARY)" \
  -m "Auto-generated from origin/daily-pages by refresh-shipped-manifest.sh." \
  -- "${DATA_FILES[@]}" 2>>"$LOG" || die "commit failed"

log "committed: $SUMMARY"

# Step 5 — push. Rebase first only if actually behind; --autostash keeps a dirty
# tree intact across the rebase.
git fetch --quiet origin main 2>>"$LOG" || die "fetch origin main failed"
BEHIND="$(git rev-list --count HEAD..origin/main)"
if [ "$BEHIND" -gt 0 ]; then
  log "behind origin/main by $BEHIND — rebasing"
  git pull --rebase --autostash --quiet origin main 2>>"$LOG" || die "rebase failed"
fi

if git push --quiet origin main 2>>"$LOG"; then
  log "pushed to origin/main — Vercel will redeploy"
else
  die "push failed (commit is local; next run will retry)"
fi
