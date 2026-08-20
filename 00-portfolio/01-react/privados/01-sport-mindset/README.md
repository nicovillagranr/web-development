# Sport Mindset — E-commerce

Tienda de ropa construida con React 19 y Tailwind CSS v4 que consume **mi propia
[Products API](https://01-products-api.vercel.app/)**. El foco de la práctica está en el
consumo de datos remotos, el estado compartido con Context y la composición de filtros,
orden y búsqueda sobre una misma lista.

## Configuración previa

La URL de la API entra por variable de entorno y **la app no arranca sin ella**:

```bash
cp .env.example .env
```

`src/main.jsx` comprueba `VITE_API_URL` antes de montar React y lanza un error si falta.
Es deliberado: prefiero fallar al arrancar, con un mensaje que dice qué hacer, a servir
una tienda vacía porque los fetch salieron contra `undefined/products`.

## Alcance implementado

- **Catálogo** servido por la Products API (`/products` y `/products/:id`).
- **Filtros** por categoría y por tipo, acumulativos y combinables entre sí.
- **Orden** por precio, ascendente y descendente.
- **Búsqueda** por nombre con el término en la URL (`/busqueda?q=…`), así que el
  resultado se puede compartir y sobrevive a un refresco.
- **Carrito** con Context: añadir, subir y bajar cantidad, y eliminar.
- **Tema claro/oscuro** con la preferencia guardada en `localStorage` y
  `prefers-color-scheme` como valor inicial en la primera visita.
- **Páginas estáticas** (ayuda, envíos, contacto, términos) cargadas con `lazy` +
  `Suspense`.

## Qué queda fuera

- **El carrito vive en memoria**: se vacía al recargar, no se persiste.
- La opción de orden **"Novedades" aparece en el desplegable pero todavía no ordena**.
- Sin pasarela de pago, sin autenticación y sin backend propio más allá de la API de
  productos.
- Las imágenes de las categorías de la portada son *placeholders* de picsum.photos.
- Sin tests.
- La migración a Supabase con catálogo de ciclismo está **planificada, no implementada**.

## Decisiones técnicas

- **Un solo `useFetch`** (`src/hooks/useFetch.js`) para todas las peticiones, con
  `AbortController`: si el componente se desmonta o cambia la URL, la respuesta en vuelo
  se cancela y no toca el estado del efecto que ya no manda.
- **`basename={import.meta.env.BASE_URL}`** en `BrowserRouter`, para que las mismas rutas
  funcionen en la raíz durante el desarrollo y bajo `/sport-mindset/` en producción, sin
  tocar código entre entornos.
- **React Compiler** activado con `babel-plugin-react-compiler`.

## Stack

| Herramienta      | Versión | Uso                        |
| ---------------- | ------- | -------------------------- |
| React            | 19.2    | UI por componentes         |
| Tailwind CSS     | 4.2     | Estilos utilitarios        |
| React Router DOM | 7       | Navegación (BrowserRouter) |
| React Icons      | 5       | Iconografía                |
| Vite             | 8       | Build y dev server         |

## Cómo ejecutar

```bash
pnpm install
cp .env.example .env   # VITE_API_URL, obligatoria
pnpm dev               # servidor de desarrollo
pnpm build             # build de producción
pnpm preview           # previsualizar el build
pnpm lint              # linting con ESLint
```

> `pnpm lint` sale hoy con **1 error conocido** en `src/hooks/useFetch.js:15`
> (`react-hooks/set-state-in-effect`), pendiente de arreglar.

## Relación con ShopReact

[`02-shopreact`](../02-shopreact) es el origen de este proyecto. Hoy los
35 archivos de código de `src/` son **idénticos** entre los dos: solo cambian
`index.html`, `package.json` y la `base` de Vite. Sport Mindset es la línea que sigue en
desarrollo; ShopReact se queda como el punto de partida.

Todavía no está desplegado, y por eso vive en `privados/`: la regla del repo es que
`portfolio/` es solo para lo que está en la API *y* responde en el dominio. Sube en cuanto
cumpla las dos.
