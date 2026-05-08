# Plan: Integración Supabase en proyecto-7

## Context
proyecto-7 es un clon de proyecto-6 (e-commerce React 19). La app consume actualmente una API REST propia en Vercel (`VITE_API_URL`). El objetivo es migrar a Supabase con datos reales de wisebikes.cl (303 productos de bicicletas, 1,657 imágenes) para tener un e-commerce real apto para portfolio.

**Datos fuente (NO modificar):**
- `C:\Users\norge\OneDrive\Escritorio\wisebikes-data\products.json`
- `C:\Users\norge\OneDrive\Escritorio\wisebikes-data\categories.json`
- `C:\Users\norge\OneDrive\Escritorio\wisebikes-data\images\` (1,657 imágenes .webp)

---

## Estado actual del proyecto (al momento de clonar)

### Ya existe
- `src/Components/2-Main/5-CartContext/CartContext.jsx` — CartContext en-memoria (sin localStorage)
- `src/Components/2-Main/5-CartContext/useCart.js` — hook de conveniencia
- `src/Components/2-Main/4-Cart/Cart.jsx` — página del carrito
- `src/Components/2-Main/7-ProductCard/ProductCard.jsx` — tarjeta de producto
- `src/Components/2-Main/6-SearchResults/SearchResults.jsx`
- `src/Components/1-Header/features/HeaderCart.jsx` — lee `carrito` de `useCart()`
- `src/hooks/useFetch.js` — fetch genérico con AbortController
- `src/Components/2-Main/2-Products/hooks/useProducts.js` — usa `useFetch` + `VITE_API_URL`
- `src/Components/2-Main/3-Details/hooks/useProduct.js` — usa `useFetch` + `VITE_API_URL`
- `src/main.jsx` — ya envuelve `<App>` con `<CartProvider>`, no hay que tocarlo

### No existe aún
- `src/lib/supabase.js`
- `src/hooks/useCategories.js`
- `scripts/` (carpeta de importación)
- `@supabase/supabase-js` no instalado

### Campos actuales vs Supabase
Los datos actuales usan español (`nombre`, `precio`, `imagen`). Supabase usará inglés (`name`, `price`, `product_images[0].url`). Todos los componentes que renderizan productos deben adaptarse.

### Imagen URL
Actualmente: `` `${API_URL}${producto.image}` `` (prefijo + path)
Con Supabase Storage: URL completa directa → eliminar la concatenación en `ProductCard.jsx`, `Cart.jsx`, `DetailsProduct.jsx`

---

## Fase 0 — ✅ COMPLETADO
proyecto-6 clonado como proyecto-7. proyecto-7 anterior renombrado a proyecto-8.

---

## Fase 1 — Supabase: Cuenta y proyecto (manual, ~20min)

Hacer directamente en el navegador:

1. Ir a **supabase.com** → crear cuenta gratuita
2. New Project → nombre: `wisebikes` → región: `South America (São Paulo)` → guardar contraseña
3. Copiar desde **Settings → API**:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon public key` → `VITE_SUPABASE_ANON_KEY`
   - `service_role key` → para el script de importación (nunca al browser)
4. Crear archivo `.env` en `proyecto-7/`:
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
5. Crear archivo `scripts/.env`:
   ```
   SUPABASE_URL=https://xxxx.supabase.co
   SUPABASE_SERVICE_KEY=eyJ...
   ```

---

## Fase 2 — Crear tablas en Supabase (SQL Editor, ~15min)

Ejecutar en el SQL Editor de Supabase:

```sql
-- Categorías (árbol con self-reference)
CREATE TABLE categories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  parent_id INTEGER REFERENCES categories(id),
  description TEXT,
  image_url TEXT,
  product_count INTEGER DEFAULT 0
);

-- Productos
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  sku TEXT,
  type TEXT CHECK (type IN ('simple', 'variable')),
  parent_id INTEGER REFERENCES products(id),
  short_description TEXT,
  description TEXT,
  price INTEGER,           -- en CLP (entero, sin decimales)
  regular_price INTEGER,
  sale_price INTEGER,
  on_sale BOOLEAN DEFAULT false,
  average_rating NUMERIC(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_in_stock BOOLEAN DEFAULT true,
  is_purchasable BOOLEAN DEFAULT true
);

-- Imágenes de productos
CREATE TABLE product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  position INTEGER DEFAULT 0,
  url TEXT NOT NULL,       -- URL pública en Supabase Storage
  alt TEXT,
  name TEXT
);

-- Relación productos ↔ categorías (muchos a muchos)
CREATE TABLE product_categories (
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
);

-- Políticas de lectura pública (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read" ON categories FOR SELECT USING (true);
CREATE POLICY "public read" ON products FOR SELECT USING (true);
CREATE POLICY "public read" ON product_images FOR SELECT USING (true);
CREATE POLICY "public read" ON product_categories FOR SELECT USING (true);
```

---

## Fase 3 — Script de importación (Node.js, ~1h)

**Archivos a crear en `scripts/`:**

### `scripts/package.json`
```json
{ "type": "module", "dependencies": { "@supabase/supabase-js": "^2" } }
```

### `scripts/import-supabase.mjs`
Flujo del script:
1. Lee `categories.json` y `products.json` desde `C:\Users\norge\OneDrive\Escritorio\wisebikes-data\`
2. Crea bucket `product-images` en Supabase Storage (si no existe, público)
3. Para cada producto: sube imágenes locales `.webp` → Storage path `{product_id}/{index}.webp` → obtiene URL pública
4. Inserta en orden: `categories` → `products` → `product_images` → `product_categories`
5. Usa `upsert` (idempotente, re-ejecutable sin duplicados)
6. Procesa en lotes de 50 para no saturar la API

**Ejecutar con:**
```
cd scripts
npm install
node import-supabase.mjs
```

> La `service_role key` se usa solo aquí. Corre en local, nunca en el browser.

---

## Fase 4 — Integración React con Supabase (~1.5h)

### 4.1 Instalar dependencia
```
npm install @supabase/supabase-js
```

### 4.2 Archivos a crear/modificar

| Archivo | Acción | Descripción |
|---|---|---|
| `src/lib/supabase.js` | **Crear** | `createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)` |
| `src/hooks/useCategories.js` | **Crear** | Query categorías raíz (`parent_id IS NULL`) |
| `src/Components/2-Main/2-Products/hooks/useProducts.js` | **Reescribir** | Reemplazar `useFetch` → query Supabase con paginación |
| `src/Components/2-Main/3-Details/hooks/useProduct.js` | **Reescribir** | Single product con JOIN a `product_images` |
| `src/utils/constants.js` | **Modificar** | Eliminar `API_CONFIG`/`VITE_API_URL` |
| `src/Components/2-Main/1-Home/home.data.js` | **Modificar** | Eliminar categorías hardcodeadas |
| `src/Components/2-Main/1-Home/Home.jsx` | **Modificar** | Usar `useCategories()` |
| `src/Components/2-Main/7-ProductCard/ProductCard.jsx` | **Modificar** | Adaptar campos (`name`, `price`, `product_images[0].url`) |
| `src/Components/2-Main/3-Details/DetailsProduct.jsx` | **Modificar** | Adaptar campos + botón "Agregar al carrito" |
| `src/Components/2-Main/4-Cart/Cart.jsx` | **Modificar** | Adaptar campo de imagen |

**Patrón de query (useProducts):**
```js
const { data } = await supabase
  .from('products')
  .select('*, product_images(url, alt, position), product_categories(category_id)')
  .eq('is_purchasable', true)
  .order('id')
  .range(offset, offset + PAGE_SIZE - 1)
```

---

## Fase 5 — Carrito persistente con localStorage (~1h)

El `CartContext` ya existe en `src/Components/2-Main/5-CartContext/CartContext.jsx` pero es in-memory.

### Cambios en `CartContext.jsx`
- Inicializar `carrito` desde `localStorage.getItem('cart')`
- `useEffect` que guarda en `localStorage.setItem('cart', JSON.stringify(carrito))` en cada cambio
- Adaptar item shape a: `{ id, name, price, image, quantity, selectedSize }`

### CartDrawer (nuevo)
- `src/Components/2-Main/4-Cart/CartDrawer.jsx` — drawer lateral con lista de items, subtotal en CLP, botón checkout (dummy)
- `src/Components/1-Header/features/HeaderCart.jsx` — agregar apertura del drawer al click

---

## Fase 6 — Filtros reales por categoría (~45min)

- `src/Components/2-Main/2-Products/hooks/useFiltrosProductos.js` — reemplazar filtro local por `category_id` en la query Supabase
- `src/Components/2-Main/2-Products/Products.jsx` — mostrar categorías reales desde `useCategories()`, pasar `categoryId` al hook

---

## Orden de ejecución

```
Fase 0 ✅ → Fase 1 (manual) → Fase 2 (SQL) → Fase 3 (script) → Fase 4 → Fase 5 → Fase 6
```

---

## Verificación final

- [ ] `npm run dev` sin errores de consola
- [ ] `/productos` muestra los 303 productos reales con imágenes de Supabase Storage
- [ ] Filtro por categoría funciona (bicicletas, repuestos, accesorios, etc.)
- [ ] `/productos/:id` muestra galería de imágenes del producto
- [ ] Ícono de carrito en header muestra cantidad actualizada
- [ ] Agregar producto → persiste al recargar la página (localStorage)
- [ ] CartDrawer muestra items con subtotal correcto en CLP
