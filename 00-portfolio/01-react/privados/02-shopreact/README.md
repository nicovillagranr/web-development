# ShopReact — E-commerce

E-commerce construido con React 19 y Tailwind CSS v4 que consume **mi propia
[Products API](https://01-products-api.vercel.app/)**. Fue mi primer proyecto de tienda
completa: catálogo remoto, filtros, búsqueda por URL y carrito con Context.

> **Archivado.** Este proyecto es el punto de partida de
> [`01-sport-mindset`](../01-sport-mindset), que es donde sigue el desarrollo. Hoy
> los 35 archivos de código de `src/` son **idénticos** entre los dos: solo cambian
> `index.html`, `package.json` y la `base` de Vite. Se conserva como referencia del
> estado en que se bifurcó.
>
> La marca que se ve en la interfaz es **"Nova Fashion"**; `shopreact` es el nombre de la
> carpeta y del proyecto, no el de la tienda.

## Configuración previa

La URL de la API entra por variable de entorno y **la app no arranca sin ella**:

```bash
cp .env.example .env
```

`src/main.jsx` comprueba `VITE_API_URL` antes de montar React y lanza un error si falta,
en vez de dejar que los fetch salgan contra `undefined/products`.

## Alcance implementado

- **Catálogo** servido por la Products API (`/products` y `/products/:id`).
- **Filtros** por categoría y por tipo, acumulativos y combinables entre sí.
- **Orden** por precio, ascendente y descendente.
- **Búsqueda** por nombre con el término en la URL (`/busqueda?q=…`).
- **Carrito** con Context: añadir, subir y bajar cantidad, y eliminar.
- **Tema claro/oscuro** con la preferencia guardada en `localStorage` y
  `prefers-color-scheme` como valor inicial en la primera visita.
- **Páginas estáticas** (ayuda, envíos, contacto, términos) cargadas con `lazy` +
  `Suspense`.

## Qué queda fuera

- **El carrito vive en memoria**: se vacía al recargar, no se persiste.
- La opción de orden **"Novedades" aparece en el desplegable pero no ordena**.
- Sin pasarela de pago, sin autenticación y sin backend propio más allá de la API de
  productos.
- Las imágenes de las categorías de la portada son *placeholders* de picsum.photos.
- Sin tests.

## Decisiones técnicas

- **Un solo `useFetch`** (`src/hooks/useFetch.js`) para todas las peticiones, con
  `AbortController` para cancelar la respuesta en vuelo al desmontar o al cambiar de URL.
- **`basename={import.meta.env.BASE_URL}`** en `BrowserRouter`, para que las mismas rutas
  funcionen en la raíz en local y bajo `/shopreact/` en producción.
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
> (`react-hooks/set-state-in-effect`), heredado por `sport-mindset`.
