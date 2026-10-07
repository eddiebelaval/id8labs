# Studio website refresh

Built September 29, 2026; shipped in PR #152.

## What changed

- The homepage leads with "Good questions. Useful software." and presents id8Labs as an
  independent software studio with an open notebook.
- Navigation is four destinations: Software, The lab, Notebook, Academy.
- Three featured products on the homepage: Composer, Parallax, Rune (Rune keeps its Beta
  label). Every other project remains on /products.
- Commissioned systems and forward deployment route to Hamato through a footer link and the
  contact page.

## Editorial decisions

- id8Labs is the independent lab and software studio. Hamato owns commissioned systems.
- Product imagery is existing published preview imagery, not an invented demo.
- The approved instrument-mark family and the Shipped. wordmark are unchanged.
- No invented prices, testimonials, usage figures or results.

## Preserved

- All public routes, free courses, redirects (legacy routes keep their 308s), robots and
  crawl directives, sitemap generation (all essay URLs), essay file tracing, and
  server-rendered structured data.
- Search stays noindex/follow; marketplace facets canonicalize to /stackshack.
- The homepage restates the full Open Graph and Twitter metadata (preview image,
  summary_large_image): Next.js replaces the layout's blocks with a page's rather than
  merging them.

## Follow-ups

- Wider SEO and analytics review.
- Legacy homepage components are still on disk (dead code) and can be removed.
