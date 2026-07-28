# Next.js — Fundamentos

Proyecto mínimo para aprender el App Router de Next.js sin ruido: un listado de
usuarios traído de una API externa y su página de detalle. Deliberadamente pequeño —
cinco archivos de ruta y un componente.

## Qué practica

- **Server Components con `fetch`** — `page.jsx` es `async` y hace `await` del fetch
  directamente en el cuerpo del componente. Sin `useEffect`, sin `useState`, sin
  estado de carga: el HTML llega ya con los datos dentro.
- **Ruta dinámica** — `/users/[id]`, con el `id` recibido como parámetro de ruta.
- **`notFound()`** — si la API devuelve un objeto sin `id`, se invoca y Next entrega
  la página 404 en lugar de reventar.
- **Estados por convención** — `not-found.jsx` y `error.jsx` en la raíz de `app/`.
- **Cliente vs servidor** — `Users.jsx` documenta en su primera línea *por qué* no
  lleva `"use client"`: no tiene eventos, así que no necesita hidratarse.

También queda comentado en `users/[id]/page.jsx` el `generateStaticParams()` que haría
falta para un build estático con `output: "export"` — apuntado como referencia para
cuando toque.

## Estructura

```
src/
├── app/
│   ├── page.jsx           listado de usuarios
│   ├── layout.jsx         layout raíz
│   ├── error.jsx          error boundary
│   ├── not-found.jsx      404
│   └── users/[id]/        detalle de usuario
├── components/Users.jsx
└── styles/globals.css
```

**Datos:** `jsonplaceholder.typicode.com`.

## Stack

| Herramienta  | Versión | Uso                 |
| ------------ | ------- | ------------------- |
| Next.js      | 16.2    | App Router, SSR     |
| React        | 19.2    | UI por componentes  |
| Tailwind CSS | 4       | Estilos utilitarios |

## Cómo ejecutar

```bash
pnpm install
pnpm dev        # servidor de desarrollo en localhost:3000
pnpm build      # build de producción
pnpm start      # servir el build
pnpm lint       # linting con ESLint
```

No está desplegado: es material de estudio, no una pieza de portfolio.
