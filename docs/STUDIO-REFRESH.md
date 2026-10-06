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
  `/Users/eddiebelaval/.codex/worktrees/studio-refresh/id8labs`.
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

## Production release and live Writing sweep · September 30, 2026

Eddie confirmed the recovered preview and explicitly authorized deployment in
the War Room. The earlier local-only authorization above describes the original
review, not this release.

- [x] Preserve the newer published magazine manifests by fast-forwarding this
  isolated branch to `c2b3524`; all saved refresh edits remained intact.
- [x] Re-run six studio tests, lint, diff checks, and a fresh production build
  (607 generated pages, homepage 103 kB first-load JavaScript).
- [x] Deploy through the existing Vercel id8Labs project and promote the verified
  deployment to https://id8labs.app.
- Deployment: `dpl_8BU4V3pJhGHAkkzCgh65kXFe2gwn`.
- Deployment URL: https://id8labs-pdfftqmbu-eddies-projects-b49c74d7.vercel.app
- Prior production, retained for rollback: `dpl_67E97VmNuF3xb2Ajbj7n2ko1fGeF`.
- [x] Verify the hosted homepage contains the new studio headline, structured
  data, three selected products, and local Shipped entry.
- [x] Sweep all 102 article links rendered in the live Writing index: full HTTP
  requests and actual browser clicks from the index. Every destination returned
  200; every browser destination matched the expected final URL and displayed
  a nonempty heading. No 404 was reproduced after this deployment.
- Writing sweep evidence: `verification/studio-refresh-live-writing-2026-09-30.json`.
- The standard link-audit command could not run its browser phase because its
  pinned Chromium is absent on this Mac. The completed sweep used the connected
  Codex browser instead; no browser package was installed.
- Article runtime tracing includes all 87 essay files for the Writing index,
  individual article route, and sitemap.

Pending: identify a specific earlier failing article/browser state if Eddie
continues to see a 404. A prior cache or old deployment is a possibility, not a
confirmed cause. No article-routing code was changed without a reproduced failure.

Source preservation: the release was deployed directly from this worktree.
The refresh remains uncommitted and unpushed; Eddie's global Git approval gate
remains in force. Future Git-based production releases must include this refresh
to retain it. The wider SEO/analytics review remains deferred.

## Publication correction release — September 30, 2026

Eddie approved Magazine opening the existing Shipped publication, identified
Signal to Noise as the personal newsletter, chose separate subscriptions, and
explicitly authorized publishing this correction.

- [x] Magazine links to `/shipped`; old `/writing?filter=magazine` bookmarks redirect.
- [x] `/newsletter` opens the newsletter filter. Verified in the actual live browser.
- [x] Signal to Noise replaces the misplaced Shipped branding on the newsletter
  archive, issue pages, signup copy, and email templates. Its current masthead is
  typography, not a newly designed custom wordmark.
- [x] Future Shipped signups save only `shipped`; personal-newsletter signups save
  only `newsletter`. A second signup adds the other choice without deleting the first.
- [x] Existing active subscribers can add a second publication. Read/save failures
  return errors instead of false success; publication choices are never omitted
  from a database fallback.
- [x] Newsletter delivery targets newsletter memberships (plus legacy null lists);
  Shipped delivery already filters its own membership.
- [x] 35 focused tests passed, with database and notification services mocked.
  Lint passed. Hosted production compilation, type checks, and page generation passed.
- [x] Read-only database probes accepted the membership column and the newsletter
  audience filter. No subscriber data was retrieved or modified by these probes.
- [x] Promoted `dpl_4x4HoWHtuCTozZQE4kRGUvBcfQLo` to https://id8labs.app.
  Candidate: https://id8labs-e79pb8qnr-eddies-projects-b49c74d7.vercel.app.
- Live release checks: `verification/publication-release-2026-09-30.json`.

Existing subscriber records were not reclassified. No real signup or mailing was
submitted during QA, so inbox delivery has not been verified. Existing unsubscribe
behavior remains global across publications; publication-specific unsubscribe is
a separate maintenance decision. The signup success copy also still refers to
checking the inbox, though this signup route does not itself send a welcome email.

All release source remains saved in this isolated worktree, uncommitted and
unpushed. A future Git-based release must preserve these files. Custom Signal to
Noise wordmark design was not yet authorized at that release checkpoint.

## Signal to Noise identity pass

Eddie subsequently requested a recognizable symbol and a stronger wordmark,
rejecting the plain typographic heading. This authorizes the focused identity
pass, not changes to Shipped's locked identity or unrelated site design.

- [x] Brief: `brand/signal-to-noise/BRIEF.md`.
- [x] Generated and visually inspected four directions with the built-in image
  tool: clear frequency, filter, S/N monogram, selected signal.
- [x] Presented the concept board in the War Room; saved project copy:
  `brand/signal-to-noise/candidates/concept-board-v1.png`.
- [x] Iris review: `brand/signal-to-noise/REVIEW.md`; recommends 01, Clear frequency.
- [x] Eddie chose 04, Selected signal.
- [x] Vectorize the chosen mark, verify actual 16px/mono/reversed proofs, and
  preview the lockup in the newsletter archive and issue header.
- [x] Iris cleared the selected vector and desktop layout, scoring 26/28.
- [x] 35 focused tests, lint, and diff checks passed after integration.
- [x] Verify hosted archive, issue header, and exact vector contents; promote
  `dpl_8aNp2nbcEbrEodaUKSsnfmHUDB1x` to https://id8labs.app.
- [x] Inspect the public archive in the connected browser and confirm the new
  wordmark loaded successfully. The live page is the user-facing deliverable.

Outlined production sources and exports are saved under
`brand/signal-to-noise/`, with generated site assets in `public/brand/`.
The archive and issue pages use the SVG lockup; newsletter email templates use a
PNG export. Mono, knockout, and a dedicated 16px symbol are included. The live
masthead now uses the selected mark on the public archive and newsletter issues.
Candidate: https://id8labs-n2vl5dtzy-eddies-projects-b49c74d7.vercel.app.
The final release also normalizes the issue illustration's first-party URL to
its existing local asset, repairing a reproduced development preview failure.
Source remains uncommitted and unpushed in the isolated worktree.

Full-page mobile testing is still unverified: the connected browser's viewport
override returned desktop dimensions. The rendered desktop and actual 16px
light/dark proofs were inspected; responsive image sizes and max-width bounds are
implemented. No email was sent during this identity pass.
