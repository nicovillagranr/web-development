// lib/posts.js
// Este archivo es JavaScript puro — sin React, sin Next.js.
// Es importado tanto por la API route como por generateStaticParams en [slug]/page.js.
// Esto demuestra que en Next.js puedes compartir lógica entre el frontend y el backend
// dentro del mismo proyecto. En Vite esto no existía: todo era frontend.

export const posts = [
  {
    slug: 'file-based-routing',
    title: 'File-Based Routing en Next.js',
    excerpt: 'Cómo las carpetas se convierten en URLs automáticamente con el App Router.',
    date: '2026-03-01',
    content: `En Next.js App Router, crear una ruta es tan simple como crear una carpeta.
Si creas app/blog/page.js, la URL /blog existe automáticamente.
Si creas app/blog/[slug]/page.js, la URL /blog/cualquier-cosa funciona.

No hay ningún archivo de configuración de rutas (como el App.jsx con <Route> de React Router).
La estructura de carpetas ES el router.

Ventaja: puedes ver toda la estructura de rutas de tu app mirando solo las carpetas en app/.
Desventaja: si mueves un archivo, la URL cambia. Hay que ser cuidadoso.`,
  },
  {
    slug: 'server-vs-client',
    title: 'Server vs Client Components',
    excerpt: 'El cambio de mentalidad más importante al aprender Next.js.',
    date: '2026-03-05',
    content: `Por defecto, TODOS los componentes en Next.js son Server Components.
Esto significa que se ejecutan en el servidor y envían HTML estático al navegador.
No tienen JavaScript en el cliente. No pueden usar useState, useEffect, ni event handlers.

Para hacer un componente interactivo, agrega "use client" al inicio del archivo.
Ese componente (y todos sus hijos) se vuelven Client Components — se hidratan en el navegador.

Regla práctica: Empieza con Server Component. Solo agrega "use client" cuando necesites:
- useState / useReducer
- useEffect
- Event handlers (onClick, onChange, onSubmit)
- APIs del browser (window, localStorage)
- Hooks de librerías de UI

La mayoría de tu app debería ser Server Components. Solo las "hojas" interactivas necesitan "use client".`,
  },
  {
    slug: 'api-routes',
    title: 'API Routes: Backend dentro del Frontend',
    excerpt: 'Cómo app/api/ te permite escribir endpoints serverless en el mismo repo.',
    date: '2026-03-10',
    content: `En Vite, si necesitabas un backend, tenías que crear un proyecto separado (Express, Fastify, etc.).
En Next.js, puedes crear endpoints HTTP directamente en tu proyecto frontend.

Crea app/api/posts/route.js y exporta funciones con el nombre del método HTTP:
export async function GET() { ... }
export async function POST(request) { ... }

Next.js mapea automáticamente GET /api/posts a tu función GET.

Esto es especialmente útil para:
- Procesar formularios sin exponer lógica al cliente
- Hacer llamadas a servicios externos con claves API secretas
- Crear webhooks
- Proteger rutas con autenticación en el servidor

En producción, estas funciones se despliegan como serverless functions en Vercel.`,
  },
  {
    slug: 'metadata-api',
    title: 'Metadata API: SEO por Página',
    excerpt: 'Cómo configurar title, description y Open Graph en cada ruta.',
    date: '2026-03-11',
    content: `En proyectos Vite, para manejar el <title> y las meta tags necesitabas react-helmet o similar.
En Next.js, exportas un objeto metadata desde cualquier page.js o layout.js (Server Component).

Ejemplo básico:
export const metadata = {
  title: 'Mi Página',
  description: 'Descripción para SEO',
}

Next.js también soporta un template en el layout raíz:
export const metadata = {
  title: {
    template: '%s | Mi App',  // %s se reemplaza con el title de cada página
    default: 'Mi App',
  },
}

Para metadata dinámica (títulos basados en datos), usa generateMetadata:
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  return { title: post.title }
}

Limitación: metadata solo funciona en Server Components. Si tu página tiene "use client",
debes mover la metadata a un layout padre.`,
  },
]

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) ?? null
}
