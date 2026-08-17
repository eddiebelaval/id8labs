// Access for ONE person who is not a user of this site.
//
// Yadira is an ACCPAC operator at the client. She exports from Sage and attaches
// to email. The first attempt at this handed her a `curl -X POST` with a bearer
// token, and six weeks later the endpoint had received one 2-byte self-test while
// every real file came by email. So: no account, no password, no install. A link
// that works, and a file picker.
//
// The key rides in the link once, is exchanged for an httpOnly cookie, and never
// appears in the page, in the markup, or in any document we send. The ingest
// token it eventually authorises against is server-side only and is never handed
// to the browser at all.
import { cookies } from 'next/headers'

export const UPLOAD_COOKIE = 'dt_upload'

/** Constant-time compare, so a wrong key cannot be found a character at a time. */
function sameKey(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export function keyIsValid(provided: string | undefined | null): boolean {
  const expected = process.env.UPLOAD_ACCESS_KEY
  // Fail CLOSED. An unset key must never mean "let everyone in".
  if (!expected || expected.length < 16) return false
  if (!provided) return false
  return sameKey(provided, expected)
}

/** Already carrying a valid cookie from a previous visit? */
export async function hasUploadCookie(): Promise<boolean> {
  const jar = await cookies()
  return keyIsValid(jar.get(UPLOAD_COOKIE)?.value)
}
