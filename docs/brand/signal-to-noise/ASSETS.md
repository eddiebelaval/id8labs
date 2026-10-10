# Selected signal assets

Eddie selected concept 04. Final production assets are exported from the source
files in this directory into `public/brand/`.

- `signal-to-noise-wordmark.svg`: primary ink/orange lockup, outlined lettering.
- `signal-to-noise-wordmark-mono.svg`: single-ink lockup.
- `signal-to-noise-wordmark-knockout.svg`: reversed single-ink lockup.
- `signal-to-noise-symbol.svg`: dedicated 16px micro symbol, uses currentColor.
- `signal-to-noise-wordmark.png`: 900 by 392 pixel transparent raster (4x the
  225 by 98 email slot), rendered from the SVG. Referenced as `?v=2`: Cloudflare
  holds a year-long cached 404 for the unversioned URL from before launch.
- `vectorize.py`: builds SVG sources and site copies from the installed Bodoni 72
  outlines. No font binaries are redistributed or loaded by the site.
- `proof.html`: working proof surface, with mono/reversed and actual 16px tests.

The archive and both newsletter issue formats use a shared wordmark component.
Email templates use the PNG export and retain a readable alt label. No real
mailing was sent. Iris reviewed the rendered assets and desktop placement; see
REVIEW.md. Mobile page behavior remains unverified due to the connected browser
not applying its requested viewport override.

Published deployment: dpl_8aNp2nbcEbrEodaUKSsnfmHUDB1x.
https://id8labs.app/writing?filter=newsletter
