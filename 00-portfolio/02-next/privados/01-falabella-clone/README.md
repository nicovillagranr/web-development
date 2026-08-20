# Clon de Falabella.com

**Ejercicio académico.** Reproducción de la estructura de navegación y catálogo de
Falabella.com para practicar el App Router de Next.js. No está afiliado a Falabella
ni tiene fin comercial: las marcas y el diseño original pertenecen a sus dueños, y
los datos del catálogo son de relleno generados para el ejercicio.

> Demo: **[proyecto-next-2.vercel.app](https://proyecto-next-2.vercel.app/)**

## Qué practica

El objetivo era recorrer las piezas del App Router que no existen en una SPA de React:

- **Rutas dinámicas anidadas** — `/tienda/[categoria]/[productoId]`, con categoría y
  producto resueltos en el servidor.
- **Layouts anidados** — el layout de `/tienda` añade su `SidebarNav` sin volver a
  montar el layout raíz.
- **Estados de ruta por convención** — `loading.jsx` en `/tienda` y `/posts`,
  `error.jsx` en `/tienda` y `not-found.jsx` global.
- **Route Handlers** — `/api/users` y `/api/users/[userId]`: la parte *backend* del
  framework.
- **Server Components con `fetch`** — los datos se piden con `await` dentro del propio
  componente: sin `useEffect`, sin estado de carga y sin `useState`.

## Rutas

| Ruta                                 | Qué hace                                 |
| ------------------------------------ | ---------------------------------------- |
| `/`                                  | Hero + categorías + productos destacados |
| `/tienda`                            | Índice de categorías                     |
| `/tienda/[categoria]`                | Listado filtrado por categoría           |
| `/tienda/[categoria]/[productoId]`   | Ficha de producto                        |
| `/posts` · `/posts/[id]`             | Listado y detalle de posts               |
| `/users/[id]`                        | Ficha de usuario                         |
| `/about`                             | Página estática                          |
| `/api/users` · `/api/users/[userId]` | Route Handlers (JSON)                    |

## Datos

- **Catálogo**: módulo estático en `src/data/products.js`, expuesto mediante
  `getCategories()`, `getProducts()`, `getProductsByCategory()`, `getProductById()`
  y `getFeaturedProducts()`. Las imágenes son *placeholders* de picsum.photos con
  semilla fija, para que no cambien entre recargas.
- **Posts y usuarios**: `jsonplaceholder.typicode.com`.

## Stack

| Herramienta  | Versión | Uso                  |
| ------------ | ------- | -------------------- |
| Next.js      | 16.2    | App Router, SSR, API |
| React        | 19      | UI por componentes   |
| Tailwind CSS | 4       | Estilos utilitarios  |

## Cómo ejecutar

```bash
pnpm install
pnpm dev        # servidor de desarrollo en localhost:3000
pnpm build      # build de producción
pnpm start      # servir el build
pnpm lint       # linting con ESLint
```

**Despliegue:** Vercel. Este proyecto usa Route Handlers, así que no admite
`output: 'export'` y no puede servirse como sitio estático desde Hostinger como el
resto del portfolio.
