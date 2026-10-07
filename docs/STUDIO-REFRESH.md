# Studio website refresh

Local project queue and review record for the September 29, 2026 refresh.
No existing active site task queue was found in this repository. The older
REDESIGN_PLAN.md describes the completed editorial migration, not this refresh.

## Authorized work

- [x] Refresh the homepage around an independent software studio and open notebook.
- [x] Simplify navigation and align Software, Lab, Notebook, and Academy introductions.
- [x] Preserve existing public routes, free courses, redirects, crawl directives,
      sitemap generation, essay file tracing, and server-rendered structured data.
- [x] Verify targeted tests, lint, build, desktop/mobile layout, navigation, and links.
- [x] Open the local preview for review. No commit, push, merge, or deployment authorized.

## Pending follow-up

- [ ] Return to Boriana's wider SEO preservation review after the visual refresh.
      Existing read-only findings: production search noindex and marketplace facet
      canonicals intact; live sitemap contains 555 URLs; homepage JSON-LD is
      server rendered. Analytics CSP excludes Google/Umami/Cloudflare script hosts.
      Further traffic/query analysis is deferred at Eddie's explicit direction.

## Editorial decisions for this review

- id8Labs is the independent lab/software studio. Hamato owns commissioned
  systems and forward deployment. A discreet footer link routes those visitors.
- Composer, Parallax, and Rune form the provisional homepage selection; Rune
  retains its Beta label. All other projects remain on /products.
- Product imagery is existing published preview imagery, not an invented demo.
- The approved instrument family and locked Shipped. wordmark remain unchanged.
- Current user instructions govern soft corners and the brand split; older
  sharp-corner/FDE positioning in the genome and editorial guide is superseded.

## Validation and handoff

Ready for local review. No commit, push, merge, deployment, database mutation,
external message, or dependency installation performed.

- Branch: `codex/studio-refresh`, isolated managed worktree at
  `/Users/eddiebelaval/Development/.worktrees/id8labs/studio-refresh`.
- Base: latest published `origin/main` at `a76cbad`, retaining today's approved
  brand family and Shipped. wordmark work. Shared main checkout left untouched.
- Preview: http://127.0.0.1:3059 (production server, process session 47984).
  Opened in this chat's Codex browser panel and kept as a Chrome review tab.
- Review images:
  - `/Users/eddiebelaval/.codex/visualizations/2026/09/29/01a0ef3d-860e-7642-b1a0-38f99203e6b1/studio-refresh-desktop.jpg`
  - `/Users/eddiebelaval/.codex/visualizations/2026/09/29/01a0ef3d-860e-7642-b1a0-38f99203e6b1/studio-refresh-mobile.jpg`
- Production build: PASS, 607 generated pages, homepage first-load JS 103 kB.
  Log: `/tmp/id8-studio-refresh-build.log`.
- Lint and diff whitespace: PASS.
- Targeted tests: PASS, 6 tests in `tests/components/StudioRefresh.test.tsx`.
  Covers navigation disclosure/Escape/focus/link selection, product availability,
  server HTML structured data, and the local Shipped entry.
- Application TypeScript: PASS (all application sources, excluding test files and
  generated build files). Standard whole-repository `tsc` still reports existing
  errors in purchase.test.ts and tool-factory test fixtures. No errors in the
  refreshed application files; no test files deleted or broad exclusions saved.
- Browser QA: homepage examined at desktop and phone widths; all product images
  loaded, exactly three selected cards, no body overflow. Mobile menu opened,
  closed with Escape, and navigated to Notebook with the menu closing. Notebook,
  Academy, Software, and Rune detail render; free self-paced intro remains visible.
- Contact now routes commissioned systems to Hamato. Booking and offers unchanged.
- Final homepage latest-edition anchor verified as `/shipped`, not the off-domain
  daily URL. The existing daily title/date still derive from the manifest.
- Preservation: final local sitemap 555 URLs, including all 87 essay URLs;
  sitemap function trace includes all 87 essay files. Search remains noindex/follow;
  marketplace facets canonicalize to `/stackshack`. Eight sampled legacy routes
  retain HTTP 308 and correct Location headers, including /commands, /settings,
  /gallery, a retired agent, a legacy skill, graduated writing, and /services.
  Source of robots, sitemap, redirects, and file tracing is unchanged.
- Homepage metadata, llms.txt, and server-rendered schema now describe the
  independent software studio. No invented prices, testimonials, usage, or results.

Residual follow-up: wider Boriana SEO/analytics work is deferred. Existing daily
publication hosting outside the studio is preserved in the magazine archive;
this refresh only keeps the homepage magazine entry local. Existing test typing
issues and frontmatter warnings remain outside this scope. Legacy homepage
components remain on disk; no dead-code cleanup performed.
