/**
 * Is this signed-in email the site admin? Fails CLOSED.
 *
 * `user?.email === process.env.ADMIN_EMAIL` was true for an anonymous caller
 * whenever ADMIN_EMAIL was unset (undefined === undefined), which opened the
 * newsletter bulk-send routes to anyone in any environment missing the var.
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  const admin = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const candidate = email?.trim().toLowerCase()
  return !!admin && !!candidate && candidate === admin
}
