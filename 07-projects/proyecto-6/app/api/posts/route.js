// app/api/posts/route.js
// ─────────────────────────────────────────────────────────────────────────────
// CONCEPTO: API Route
//
// Este archivo crea el endpoint GET /api/posts automáticamente.
// El nombre "route.js" es especial — Next.js lo reconoce como un handler HTTP.
// Las funciones exportadas se nombran igual que los métodos HTTP: GET, POST, PUT, DELETE.
//
// DIFERENCIA con Vite:
// En Vite no hay backend — necesitarías un servidor Express/Fastify separado.
// Aquí el backend vive en el mismo proyecto, mismo repositorio, mismo deploy.
//
// En producción (Vercel), este archivo se convierte en una serverless function.
// ─────────────────────────────────────────────────────────────────────────────

export const dynamic = 'force-static'

import { posts } from '../../../lib/posts'

export async function GET() {
  // Response.json() es parte del Web Fetch API estándar — no es específico de Next.js.
  // Next.js expone el mismo estándar que usarías en un Service Worker o Deno.
  return Response.json(posts)
}
