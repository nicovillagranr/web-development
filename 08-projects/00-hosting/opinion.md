# 📋 Auditoría — 00-hosting

**Fecha:** 13 de mayo de 2026
**Auditor:** Claude Code (sesión 7)
**Scope:** repo completo — `src/`, `public/`, `index.html`, `package.json`, configs.

---

## Veredicto general

**Calidad: 8/10.** Por encima del nivel de un portfolio junior promedio. Tiene decisiones técnicas maduras (preconnect, lazy loading, ErrorBoundary, theme toggle bien hecho, sin dependencias innecesarias). El gap principal entre "junior" y "junior listo para entrevistar" hoy son **3 cosas**: A1 (tabs A11y), tests (H1/H2) y README (H3). Lo demás es polish.

---

## ✅ Lo que está muy bien

### Arquitectura
- **2 deps en runtime** (`react`, `react-dom`). En un mundo donde un Next.js fresh tiene 300 paquetes, esto es signal fuerte. Defendible en entrevistas.
- **Estructura `1-Header/`, `2-Main/`, `3-Footer/`** — orden visual del DOM coincide con orden de carpetas. Patrón propio, defendible.
- **Alias `@/`** configurado en Vite + usado consistentemente en imports.
- **Lazy Catalog + Suspense con placeholder de altura fija** (`min-h-[75vh]`) — evita CLS, demuestra conciencia de UX.

### Performance
- `preconnect` + `dns-prefetch` con comentario explicando el porqué — ese comentario es exactamente lo que un senior espera ver en un PR review.
- `fetchPriority="high"` en las primeras 3 cards, `loading="lazy"` en el resto.
- Bundle ~69 KB gzipped es excelente para una landing con datos remotos.

### SEO
- JSON-LD con `alternateName` (cubre variantes "Nico" / "Nicolás" / "Villagran") — nivel pro.
- OG dual (landscape + square) para LinkedIn vs WhatsApp.
- sitemap.xml + robots.txt.

### A11y (lo que SÍ está bien)
- `role="alert"` + `aria-live="assertive"` en ErrorBoundary.
- `role="status"` + `aria-live="polite"` en error del Catalog.
- `aria-pressed` en los filtros del Catalog.
- `aria-label` descriptivos en links de cards (`Abrir demo de ${name}`, `Repositorio de ${name} en GitHub`).

---

## 🟡 Lo bueno con asterisco

### `Hero.jsx` — 321 líneas en un archivo
**No es un bug, es un olor.** El archivo tiene 4 componentes inline (`KPI`, `PreviewAbout`, `PreviewStack`, `PreviewContact`, `EditorWindow`) + el `Hero` exportado. Funciona, pero:
- Difícil de testear cada uno por separado (problema cuando ataques H1/H2).
- El `TABS` se reconstruye en cada render del Hero (es un array con strings derivados de `data` — está OK pero podría memorizarse).
- `EditorWindow` tiene **hardcodeada otra vez la lista de tabs** (líneas 175-185) — duplicación del array `TABS` del padre. Si agregás una tab, hay que tocarla en 2 lugares. **Esto es un bug latente.**

### `useProjects.js` — algoritmo OK, ergonomía floja
- Indentación de 4 espacios en este archivo cuando el resto del repo usa 2. Inconsistencia menor.
- Maneja `AbortController` perfecto, pero **dispara 2 requests separados** cuando podrías hacer un único endpoint `/bootstrap` que devuelva `{ projects, profile }`. No es bug, es decisión de diseño — defendible diciendo "endpoints separados para que cada uno sea cacheable independientemente". Solo tenelo armado por si lo preguntan.
- No tiene retry ni timeout. Si la API tarda 30 segundos, el usuario ve "Cargando proyectos..." indefinidamente.

### ESLint config
La regla `'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }]` deja pasar vars no usadas que empiezan en mayúscula. Si te pasás de `T` a `Tab`, podés tener un componente importado sin usar y ESLint no lo marca. Lo cambiaría a un patrón más estricto, o sacaría la excepción.

---

## 🔴 Problemas concretos

### 1. `EditorWindow` duplica la definición de tabs (Hero.jsx:175-185 vs 270-305)
Si renombrás `about.json` → `profile.json`, hay que tocarlo en dos lugares y los tests fallarían silenciosamente.
**Fix de 3 min:** pasar `TABS` como prop al `EditorWindow` en vez de hardcodear el array adentro.

### 2. `Footer` — link "top" usa `href="#hero"` sin smooth scroll
Funciona, pero salta seco. Un `scroll-behavior: smooth` en el CSS global lo arregla en 1 línea. **Trivial.**

### 3. `ProjectCard` — `path.endsWith("/")` puede romper si `path` es URL absoluta
```js
const demoHref = path.endsWith("/") ? path : `${path}/`;
```
Para el item "Portfolio Projects API" donde `path: "https://...vercel.app/projects"`, agrega `/` al final → `/projects/` que devuelve 404 (json-server no acepta trailing slash). **Esto es el problema que motivó L1 en `IMPROVEMENTS.md`.** Si arreglás L1 cambiando el `path` a `/`, también se arregla esto.

### 4. `Hero.jsx:312` — `<div key={tabId}>` fuerza remount del Preview en cada cambio de tab
Es intencional (para animar `animate-fade-up`), pero **destruye y recrea el subárbol**. Para previews tan livianos no se nota, pero es señal a entender. Una alternativa sería usar CSS animation con `animation-iteration-count: 1` disparada por una clase que toggleás, no remount.

---

## 🎯 Opinión sin filtros

**Lo que más impacta en una entrevista hoy:**

1. **README profesional (H3)** — el reclutador abre GitHub primero. Si ve "React + Vite Template" generado por Vite, perdiste 30 segundos de atención. **Esto es lo primero que haría.**

2. **Tabs accesibles (A1)** — cualquier reclutador con experiencia A11y prueba Tab/Enter/flechas en una entrevista en vivo. Es una pregunta-trampa clásica.

3. **Un solo archivo de tests (H1 o H2)** — `useProjects.test.js` con 4 casos (loading/success/error/abort) transforma percepción. Pasás de "junior con buen ojo" a "junior con disciplina".

**Lo que NO haría todavía:**
- **Zod (C5):** cool pero no se nota en una entrevista visual. Importa más cuando consumís APIs de terceros.
- **Migrar a TypeScript:** trampa. Mucho trabajo, poco visual. Hacelo cuando tengas oferta o cuando un equipo te lo pida.
- **Más optimizaciones de bundle:** ya estás en 69 KB. Ganancia marginal.

---

## 🚀 Recomendación de orden (~2 horas)

| Paso | Tarea | Esfuerzo | Razón |
|------|-------|----------|-------|
| 1 | **H3** — README | 20 min | Primero que abre el reclutador en GitHub. |
| 2 | **A1** — tabs A11y | 30 min | Bandera roja si lo prueban con teclado. |
| 3 | **Fix duplicación TABS** en EditorWindow | 5 min | Bug latente, no está listado en IMPROVEMENTS. |
| 4 | **H1** — tests useProjects | 35 min | Un solo archivo de tests transforma percepción. |
| 5 | **L1** — landing API | 25 min | Si queda energía. La card de la API hoy muestra JSON crudo. |

**Total:** ~2 horas para un portfolio que pasa el filtro "primer pantallazo del reclutador" sin compromisos.

---

## 📊 Resumen ejecutivo

| Área | Nota | Comentario |
|------|------|------------|
| Arquitectura | 9/10 | 2 deps, estructura clara, aliases bien. |
| Performance | 9/10 | preconnect, lazy, fetchPriority. Bundle 69 KB. |
| SEO | 9/10 | JSON-LD + OG dual + sitemap. Falta poco. |
| A11y | 6/10 | Buena base, **tabs del Hero rompen el flow** (A1). |
| Testing | 0/10 | Sin tests. Es el gap más visible. |
| Documentación | 2/10 | README es template default. |
| Manejo de errores | 8/10 | ErrorBoundary + estado error en Catalog OK. Falta timeout/retry. |
| Calidad de código | 8/10 | Limpio, pero duplicación de TABS en Hero. |

**Fortaleza diferencial:** decisiones técnicas explicadas con comentarios (preconnect, ErrorBoundary). Esto es lo que separa "junior que copió un template" de "junior que sabe lo que hace".

**Debilidad diferencial:** ausencia total de tests + README sin tocar. Ambos son arreglos baratos con impacto desproporcionado.
