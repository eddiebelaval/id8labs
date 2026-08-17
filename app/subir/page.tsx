// The page Yadira actually opens. One link, one file picker, done.
//
// Gated by a cookie. The key is spent once at /subir/enter, which is where the
// link points, so it never reaches a rendered page. No account and no password:
// adding a login here reproduces exactly the friction that made the last channel
// go unused.
import { UploadForm } from '@/components/upload/upload-form'
import { hasUploadCookie } from '@/lib/upload/auth'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Enviar archivo', robots: { index: false, follow: false } }

export default async function SubirPage() {
  if (!(await hasUploadCookie())) {
    // Reveal nothing: same page for a bad key and for no key at all.
    return (
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
        <h1 className="text-xl font-semibold">Enlace no válido</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Este enlace no es válido o ya expiró. Escríbenos y te enviamos uno nuevo.
        </p>
      </main>
    )
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-6 py-12">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Enviar archivo a Data-Tech</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Elige el archivo que exportaste y presiona enviar. No hace falta cuenta ni
          contraseña, y el enlace sigue funcionando la próxima vez.
        </p>
      </header>
      <UploadForm />
      <p className="text-xs text-muted-foreground">
        El archivo llega directo a nuestro sistema y solo lo vemos nosotros.
      </p>
    </main>
  )
}
