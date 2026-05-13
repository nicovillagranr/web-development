# 📋 Auditoría & Mejoras — 00-hosting

**Última auditoría:** 12 de mayo de 2026 (sesión 6: Hero consume profile extendido del API)
**Status general:** Base sólida. Hero refactorizado — `data` derivado del API, fuente única de verdad. Cierra H6, N2, D1. Quedan C5 + B1 (críticos) y alto/medio abajo.

---

## 🎯 Conclusiones

### ✅ Fortalezas reales

| Área                     | Calidad  | Notas                                                                                       |
| ------------------------ | -------- | ------------------------------------------------------------------------------------------- |
| **SEO**                  | ⭐⭐⭐⭐ | JSON-LD con `alternateName`, OG dual (landscape+square), Twitter Cards, sitemap+robots      |
| **Accesibilidad (A11y)** | ⭐⭐⭐   | ARIA en ErrorBoundary/Catalog OK, pero **tabs del Hero no son accesibles** (A1)             |
| **Performance**          | ⭐⭐⭐⭐ | `fetchpriority`+lazy en cards, preconnect a API. GSAP eliminado → bundle ~50% más liviano   |
| **Arquitectura**         | ⭐⭐⭐⭐ | React 19 + Tailwind v4 + Vite 8. **2 deps en runtime** (react, react-dom). Sin bloat        |
| **Estilos**              | ⭐⭐⭐⭐ | App.css reorganizado en 13 secciones, @theme + light override, animaciones custom           |
| **Hook useProjects**     | ⭐⭐⭐   | AbortController + Promise.all OK, **pero bug menor en error reporting** (B1)                |

---

## ✅ Completados

| #          | Mejora                                              | Fecha      |
| ---------- | --------------------------------------------------- | ---------- |
| 1          | Meta tags SEO (OG, Twitter, schema.org)             | 13-05-2026 |
| 5          | Centralizar localStorage keys en `storageKeys.js`   | 09-05-2026 |
| 9          | Leer versión desde package.json en Preloader        | 09-05-2026 |
| 10         | ARIA mejorado en Preloader (`role="status"`)        | 09-05-2026 |
| 13         | sitemap.xml + robots.txt en public/                 | 09-05-2026 |
| Catalyst   | Estilos en loading/error del Catalog                | 11-05-2026 |
| Catalyst   | Footer layout estable durante carga                 | 11-05-2026 |
| **C1**     | ProjectCard fragment sin key                        | 11-05-2026 |
| **C4**     | Preloader color en light mode                       | 11-05-2026 |
| **N1**     | JSON-LD trailing comma                              | 11-05-2026 |
| **API**    | Profile extendido (role/based/years/stack)          | 11-05-2026 |
| **C2**     | ErrorBoundary styled (alert + recargar + email)     | 12-05-2026 |
| **O5**     | preconnect + dns-prefetch a la API en index.html    | 12-05-2026 |
| **H4**     | scrollbar-color + scrollbar-width en App.css        | 12-05-2026 |
| **O4**     | aria-live="polite" + role="status" en error Catalog | 12-05-2026 |
| **O1**     | Footer mejorado: logo + nombre + role + año         | 12-05-2026 |
| **CSS**    | App.css reorganizado en 13 secciones numeradas      | 12-05-2026 |
| **C3**     | ~~Preloader sincronizado con useProjects~~ → Preloader eliminado por completo | 12-05-2026 |
| **P1**     | ~~Lazy-load del Preloader~~ → GSAP desinstalado     | 12-05-2026 |
| **K1**     | ~~Comentar PRELOADER_KEY~~ → key eliminada          | 12-05-2026 |
| **D4**     | Code-splitting de GSAP → GSAP eliminado             | 12-05-2026 |
| **H6**     | Hero: fuente única de verdad (`data` desde profile, `TABS` derivado) | 12-05-2026 |
| **N2**     | Hero: consumir profile extendido (role, based, years, stack)         | 12-05-2026 |
| **D1**     | API: stack ya devuelve arrays; cliente refactorizado para consumirlos | 12-05-2026 |
| **D2**     | Target de deploy decidido: Apache/Hostinger (`.htaccess` ya en repo)  | 12-05-2026 |
| **N5**     | KPI: prop `cyan` renombrado a `emerald` (coincide con la variable real) | 12-05-2026 |
| **D3**     | manifest.json + iconos PWA (favicon/ + site.webmanifest)                | 13-05-2026 |
| **O2**     | 404 page custom + ErrorDocument en .htaccess                            | 13-05-2026 |
| **B1**     | useProjects: error message reporta qué endpoint falló y su status       | 13-05-2026 |

---

## 📌 Pendientes

### 🔴 CRÍTICO — Antes de producción (~30 min)

| #      | Mejora                                            | Esfuerzo | Impacto | Descripción                                                                                                                                                                                              |
| ------ | ------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **C5** | **Validación de datos API (Zod)**                 | 25 min   | Alto    | Instalar `zod`. Schemas para `Project[]` y `Profile` (incluye `role`, `based`, `years`, `stack`). Parsear respuesta antes de `setProjects`.                                                              |

**Subtotal:** ~25 min para deploy sin riesgo.

### 🟡 ALTO — Profesionalismo / entrevistas (~135 min)

| #      | Mejora                                                     | Esfuerzo | Impacto | Descripción                                                                                                                                                                          |
| ------ | ---------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **A1** | **Tabs del Hero: A11y completa**                           | 30 min   | Alto    | Los `<button>` (Hero.jsx:167-173) faltan `role="tab"`, contenedor `role="tablist"`, `aria-selected`, navegación con flechas ←/→. **Bandera roja en entrevistas A11y-conscientes.**   |
| **N3** | **Refactor Hero `useEffect`**                              | 10 min   | Medio   | Quitar `eslint-disable react-hooks/set-state-in-effect`. Usar `key={tabId}` o derivar.                                                                                               |
| **N4** | **Header: leer role del profile**                          | 5 min    | Medio   | `Header.jsx:10` tiene `"Frontend Developer"` hardcoded mientras Footer lo lee de `profile.role`. Inconsistencia.                                                                     |
| **A2** | **EditorWindow: botones decorativos**                      | 5 min    | Bajo    | `Hero.jsx:183-185` (`−`, `□`, `✕`) son `<button>` sin label → ruido para lectores de pantalla. Convertir a `<span aria-hidden="true">` o agrupar en `<div aria-hidden>`.             |
| **H1** | **Tests para useProjects**                                 | 35 min   | Alto    | Vitest + @testing-library/react. Tests: loading, error, success, AbortController.                                                                                                    |
| **H2** | **Tests para ProjectCard**                                 | 25 min   | Medio   | Renderizado, lazy loading, accessible links.                                                                                                                                         |
| **H3** | **README.md profesional**                                  | 20 min   | Medio   | El actual es el template default de Vite. Stack, setup, scripts, estructura.                                                                                                         |
| **H5** | **ErrorBoundary logging**                                  | 5 min    | Medio   | Cambiar `console.log` por `console.error` y agregar `errorInfo` + stack.                                                                                                             |

**Subtotal:** ~135 min.

### 🟢 BAJO / NICE-TO-HAVE (~60 min)

| #      | Mejora                                                  | Esfuerzo | Impacto | Descripción                                                                                                                                                                                       |
| ------ | ------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **P2** | **Code-splitting general**                              | 15 min   | Medio   | Catálogo + ErrorBoundary + Hero con `React.lazy` + Suspense. Mejora carga inicial.                                                                                                                |
| **O3** | **Animación shake en error del Catalog**                | 10 min   | Bajo    | Ícono `⚠` con keyframe `shake` + `aria-hidden`.                                                                                                                                                   |

**Subtotal:** ~25 min.

---

## 🚀 Orden recomendado para entrevistas

### Si tienes 1 hora (mínimo viable):
1. **B1** — bug del error message (5 min).
2. **N4 + A2 + H5** — fixes cosméticos rápidos (~15 min).
3. **A1** — tabs accesibles (~30 min).

### Si tienes 1 día (impresiona en entrevista):
4. **H1** — un solo archivo de tests transforma percepción.
5. **H3** — README profesional. Primero que abren en GitHub.
6. **C5** — Zod.

### Si tienes 1 semana (production-grade):
7. **H2** — tests adicionales.
8. **N3** — refactor del useEffect del Hero.
9. **P2 + D2 + D3** — performance y deploy.
10. **N5 + O2 + O3** — polish.

---

## 📝 Notas técnicas

- **Stack runtime:** React 19.2, Tailwind v4.2, Vite 8.0. **2 deps en `package.json`** (react, react-dom). GSAP eliminado en sesión 5.
- **Bundle actual:** ~228 KB / ~69 KB gzipped (sin GSAP, ~50% más liviano que antes).
- **Deployment:** `.htaccess` Apache listo. Para Vercel falta `vercel.json` (ver D2).
- **API:** `https://00-portfolio-projects-api.vercel.app` — endpoints `/projects` y `/profile`. Repo en `C:/apis/00-portfolio-projects/`. Profile incluye `role`, `based`, `years`, `stack: {frontend, styling, tools}` (arrays nativos, consumidos por Hero).
- **Theme:** `localStorage("theme:mode")` + `prefers-color-scheme` fallback.
- **CSS:** `App.css` reorganizado en 13 secciones numeradas (tokens → base → tema → componentes → animaciones → utilidades → UI global → A11y).

---

**Última actualización:** 12-05-2026 (sesión 6: H6 + N2 + D1 — Hero consume profile del API)
**Responsable:** Claude Code
**Siguiente sesión recomendada:** B1 → N4+A2+H5 → A1
