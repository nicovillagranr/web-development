# Plan: Integración Supabase en ShopReact (WiseBikes E-Commerce)

> **Documento histórico.** Se escribió cuando este proyecto se llamaba `proyecto-6`
> y vivía en `08-projects/01-react/`. Hoy es `00-portfolio/01-react/privados/02-shopreact/`.
> El texto de abajo conserva la nomenclatura original: donde diga *proyecto-6*, lee
> **shopreact**; donde diga *proyecto-7*, lee **sport-mindset**.

## Context
El proyecto-6 es un e-commerce React 19 que actualmente consume una API json-server propia desplegada en Vercel (`https://01-products-api.vercel.app`). Se dispone de datos reales de 303 productos de bicicletas y accesorios (5.2MB JSON) con 1,657 imágenes .webp locales, scrapeados de wisebikes.cl. El objetivo es migrar a Supabase para tener un e-commerce real y funcional apto para portfolio, con catálogo completo + carrito persistente.

El Escritorio original (`C:\Users\norge\Desktop`) fue vaciado — NO modificar ni tocar la carpeta `C:\Users\norge\OneDrive\Escritorio\wisebikes-data`.

---

## Fases del plan

### Fase 1 — Supabase: Cuenta y proyecto (manual, ~20min)

El usuario hace esto directamente en el navegador:

1. Ir a **supabase.com** → crear cuenta gratuita
2. New Project → nombre: `wisebikes` → región: `South America (São Paulo)` → guardar contraseña
3. Copiar desde **Settings → API**:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon public key` → `VITE_SUPABASE_ANON_KEY`
4. Agregar ambas al archivo `.env` del proyecto

**Archivo afectado:** `C:\web-development\00-portfolio\01-react\shopreact\.env`

---

### Fase 2 — Crear tablas en Supabase (SQL Editor, ~15min)

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

### Fase 3 — Script de importación (Node.js, ~1h)

Crear carpeta `scripts/` en la raíz del proyecto con un script Node.js que:

1. Lee `products.json` y `categories.json` desde `C:\Users\norge\OneDrive\Escritorio\wisebikes-data\`
2. Crea bucket `product-images` en Supabase Storage (si no existe)
3. Sube cada imagen `.webp` local → path en Storage: `{product_id}/{index}.webp`
4. Inserta categorías → products → product_images (con URL pública de Storage) → product_categories

**Archivos a crear:**
- `scripts/import-supabase.mjs` — script principal
- `scripts/package.json` — solo `{ "@supabase/supabase-js": "^2" }`
- `scripts/.env` — SUPABASE_URL y SUPABASE_SERVICE_KEY (service_role key, NO la anon)

> La service_role key se usa solo en el script de importación (corre en local, nunca en el browser).

---

### Fase 4 — Integración React con Supabase (~1.5h)

**Instalar en el proyecto React:**
```
npm install @supabase/supabase-js
```

**Archivos a crear/modificar:**

| Archivo | Acción | Descripción |
|---|---|---|
| `src/lib/supabase.js` | Crear | Cliente Supabase (usa VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY) |
| `src/hooks/useProducts.js` | Modificar | Reemplazar useFetch → query Supabase con paginación |
| `src/hooks/useProduct.js` | Modificar | Single product query con JOIN a product_images |
| `src/hooks/useCategories.js` | Crear | Query de categorías raíz desde Supabase |
| `src/Components/2-Main/1-Home/home.data.js` | Modificar | Eliminar categorías estáticas (pasarán a venir de Supabase) |
| `src/Components/2-Main/1-Home/Home.jsx` | Modificar | Usar useCategories() en vez de datos estáticos |
| `src/utils/constants.js` | Modificar | Eliminar VITE_API_URL, agregar config Supabase |
| `.env` | Modificar | Agregar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY |

**Patrón de query (ejemplo useProducts):**
```js
const { data } = await supabase
  .from('products')
  .select('*, product_images(url, alt, position), product_categories(category_id)')
  .eq('is_purchasable', true)
  .order('id')
  .range(offset, offset + PAGE_SIZE - 1)
```

---

### Fase 5 — Carrito (CartContext + localStorage, ~1.5h)

**Archivos a crear/modificar:**

| Archivo | Acción | Descripción |
|---|---|---|
| `src/context/CartContext.jsx` | Crear | Provider: items, addItem, removeItem, clearCart — persistido en localStorage |
| `src/main.jsx` | Modificar | Envolver `<App>` con `<CartProvider>` |
| `src/Components/1-Header/Cart/Cart.jsx` | Modificar | Mostrar cantidad real desde contexto, abrir drawer |
| `src/Components/1-Header/Cart/CartDrawer.jsx` | Crear | Drawer lateral con lista de items, subtotal, botón checkout (dummy) |
| `src/Components/2-Main/3-Details/DetailsProduct.jsx` | Modificar | Botón "Agregar al carrito" que llama addItem del contexto |

**Estructura del item en carrito:**
```js
{ id, name, price, image, quantity, selectedSize }
```

---

### Fase 6 — Filtros reales por categoría (~45min)

- Actualizar `useFiltrosProductos.js` para filtrar usando `category_id` desde Supabase
- El filtro de categorías en `Products.jsx` pasará a mostrar las 16 categorías raíz reales
- Reemplazar categorías hardcodeadas en `constants.js`

**Archivo afectado:** `src/Components/2-Main/2-Products/hooks/useFiltrosProductos.js`

---

## Orden de ejecución

```
Fase 1 (manual) → Fase 2 (SQL) → Fase 3 (script importación) → Fase 4 → Fase 5 → Fase 6
```

Las fases 1-3 son setup previo. Las fases 4-6 son código React puro.

---

## Verificación

- [ ] `npm run dev` sin errores de consola
- [ ] Página `/productos` muestra los 303 productos reales con imágenes
- [ ] Filtro por categoría funciona (bicicletas, repuestos, etc.)
- [ ] Página `/productos/:id` muestra galería de imágenes del producto
- [ ] Ícono de carrito en header muestra cantidad actualizada
- [ ] Agregar producto → persiste al recargar la página (localStorage)
- [ ] CartDrawer muestra items con subtotal correcto en CLP

---

## Archivos de datos (NO modificar)
- `C:\Users\norge\OneDrive\Escritorio\wisebikes-data\products.json`
- `C:\Users\norge\OneDrive\Escritorio\wisebikes-data\categories.json`
- `C:\Users\norge\OneDrive\Escritorio\wisebikes-data\images\` (1,657 imágenes)
