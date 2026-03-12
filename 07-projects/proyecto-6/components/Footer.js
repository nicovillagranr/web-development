// components/Footer.js
// Server Component — estático, sin interactividad, sin "use client".
// Vive en app/layout.js y se renderiza en el servidor una sola vez.

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-auto py-8 text-center text-sm text-gray-500">
      <p>
        proyecto-6 —{' '}
        <span className="text-primary font-medium">Next.js 15 App Router Demo</span>
      </p>
      <p className="mt-1 text-xs">
        Server Components · Client Components · API Routes · Dynamic Routes · Metadata API
      </p>
    </footer>
  )
}
