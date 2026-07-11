// ──────────────────────────────────────────────────────────────────────────────
// Shipped. subscriber endpoint
// Deploy to:  id8labs/app/api/newsletter/subscribe/route.ts  (copy verbatim)
//   id8labs is a Next.js App Router project, so this is a route handler —
//   a root-level api/ directory would be ignored by Vercel's Next.js preset.
// Runtime:    Edge (V8 isolate — Web APIs: fetch, atob, btoa, Request, Response)
// Env var:    GITHUB_TOKEN
//   A GitHub fine-grained PAT scoped to eddiebelaval/shipped-subscribers,
//   Contents: Read+Write. Add it in Vercel → Settings → Environment Variables.
//
// The list lives in a PRIVATE repo — subscriber names and emails must never
// land in the public shipped repo (its git history is permanent and scraped).
// If recipients.json doesn't exist yet the endpoint bootstraps it, so the
// private repo only needs to exist; no manual seeding.
// ──────────────────────────────────────────────────────────────────────────────

export const runtime = 'edge';

const REPO    = 'eddiebelaval/shipped-subscribers';
const FILE    = 'recipients.json';
const GH_API  = 'https://api.github.com';
const ORIGINS = ['https://id8labs.app', 'https://eddiebelaval.github.io'];
const CADENCES = new Set(['nightly', 'weekly', 'monthly']);

// Ceiling on list size — a runaway bot can't grow the file (and main's commit
// history) unbounded. Raise deliberately once the list legitimately nears it.
const MAX_RECIPIENTS = 500;

// ── helpers ──────────────────────────────────────────────────────────────────

function corsHeaders(origin: string): Record<string, string> {
  const allowed = ORIGINS.some(o => origin === o || origin.startsWith(o + '/'));
  if (!allowed) return { Vary: 'Origin' };
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

// atob/btoa alone are Latin-1 only: names outside that range make btoa throw,
// and anything non-ASCII already in the file gets mangled on the atob round
// trip. Bridge through TextEncoder/TextDecoder so the file stays valid UTF-8.
function b64ToUtf8(b64: string): string {
  const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function utf8ToB64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(bin);
}

function json(body: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...extra },
  });
}

// ── handlers ─────────────────────────────────────────────────────────────────
// Next.js routes by exported method — no manual dispatch, unhandled verbs 405.

export async function OPTIONS(req: Request): Promise<Response> {
  const cors = corsHeaders(req.headers.get('origin') ?? '');
  return new Response(null, { status: 204, headers: cors });
}

export async function POST(req: Request): Promise<Response> {
  const origin = req.headers.get('origin') ?? '';
  const cors = corsHeaders(origin);

  // Parse body
  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return json({ error: 'Invalid JSON' }, 400, cors); }

  // Honeypot — hidden "website" field in the form; humans never see it, bots
  // fill it. Report success so the bot doesn't learn it was filtered.
  if (String(body.website ?? '').trim()) {
    return json({ ok: true }, 200, cors);
  }

  // Validate + sanitize email
  const email = String(body.email ?? '').toLowerCase().trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Valid email required.' }, 400, cors);
  }

  // Sanitize name (optional — fall back to local-part of email)
  const name = String(body.name ?? '').trim().slice(0, 120) || email.split('@')[0];

  // Sanitize cadences — must be subset of the allowed set
  const rawCadences = Array.isArray(body.cadences) ? body.cadences : ['nightly', 'weekly'];
  const cadences = (rawCadences as unknown[])
    .filter((c): c is string => typeof c === 'string' && CADENCES.has(c));
  if (!cadences.length) cadences.push('nightly', 'weekly');

  // Signup provenance, e.g. "shipped-issue-02" (optional)
  const source = String(body.source ?? '').trim().slice(0, 60);

  const token = process.env.GITHUB_TOKEN;
  if (!token) return json({ error: 'Server configuration error.' }, 500, cors);

  const ghHeaders = {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'shipped-subscribe/1.0',
  };

  // Read current recipients.json from GitHub. A 404 means the file doesn't
  // exist yet in the private repo — bootstrap it (a PUT without a sha creates
  // the file), so the repo only needs to exist, no manual seeding.
  const fileRes = await fetch(`${GH_API}/repos/${REPO}/contents/${FILE}`, { headers: ghHeaders });

  let list: { recipients?: unknown; updated?: string };
  let sha: string | undefined;

  if (fileRes.status === 404) {
    list = {
      _doc: 'Shipped. self-serve subscriber list — written by the subscribe endpoint. Merged with the public pipeline/recipients.json by distribute-local.py. PRIVATE: never move this into a public repo.',
      recipients: [],
    } as typeof list;
  } else if (!fileRes.ok) {
    return json({ error: 'Could not read distribution list.' }, 502, cors);
  } else {
    const fileData = await fileRes.json() as { content: string; sha: string };
    sha = fileData.sha;
    try { list = JSON.parse(b64ToUtf8(fileData.content.replace(/\n/g, ''))); }
    catch { return json({ error: 'Could not read distribution list.' }, 502, cors); }
  }

  const recipients = list.recipients;
  if (!Array.isArray(recipients)) {
    return json({ error: 'Could not read distribution list.' }, 502, cors);
  }

  // Deduplicate — return 200 so the UI can show a friendly "already subscribed" message
  if (recipients.some((r: { email?: unknown }) =>
    typeof r?.email === 'string' && r.email.toLowerCase() === email)) {
    return json({ ok: true, alreadySubscribed: true }, 200, cors);
  }

  if (recipients.length >= MAX_RECIPIENTS) {
    return json({ error: 'Subscriptions are temporarily closed.' }, 503, cors);
  }

  // Append new subscriber
  recipients.push({
    name,
    email,
    cadences,
    subscribed: new Date().toISOString().slice(0, 10),
    ...(source && { source }),
  });
  list.updated = new Date().toISOString().slice(0, 10);

  // Write back via GitHub Contents API
  // If two requests race on the same SHA, GitHub returns 409 and the second caller
  // gets a 502 with "Try again" — rare enough not to warrant a retry loop here.
  const newContent = utf8ToB64(JSON.stringify(list, null, 2) + '\n');
  const writeRes = await fetch(`${GH_API}/repos/${REPO}/contents/${FILE}`, {
    method: 'PUT',
    headers: { ...ghHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `chore(subscribers): add ${email}`,
      content: newContent,
      ...(sha && { sha }),
    }),
  });

  if (!writeRes.ok) {
    const errData = await writeRes.json().catch(() => ({})) as { message?: string };
    return json({ error: errData.message ?? 'Could not save subscription.' }, 502, cors);
  }

  return json({ ok: true }, 200, cors);
}
