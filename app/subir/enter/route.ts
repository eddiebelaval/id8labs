// The link Yadira actually clicks.
//
// A Server Component cannot set a cookie during render: Next throws, and the
// page 500s. The build is happy either way, which is why this was only visible
// once it was deployed and requested. So the key exchange lives in a route
// handler, where setting a cookie on the response is legal.
//
// Landing here also keeps the key off any rendered page: it is spent on this
// request and the browser is sent on to /subir carrying only the cookie.
import { NextResponse } from 'next/server'
import { keyIsValid, UPLOAD_COOKIE } from '@/lib/upload/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const k = new URL(req.url).searchParams.get('k')
  const target = new URL('/subir', req.url)
  const res = NextResponse.redirect(target)

  // An invalid key is not told it is invalid here: it lands on /subir, which
  // shows the same page a missing key gets.
  if (keyIsValid(k)) {
    res.cookies.set(UPLOAD_COOKIE, k as string, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })
  }
  return res
}
