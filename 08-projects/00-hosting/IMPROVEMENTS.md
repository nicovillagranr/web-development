# 📋 Auditoría & Mejoras — 00-hosting

**Última auditoría:** 16 de mayo de 2026 (sesión 9: A1 — tabs accesibles + componetización Hero + skeletons)
**Status general:** Base sólida y lista para deploy. A1 cierra la última deuda de A11y (tabs del Hero accesibles). Hero componetizado y con skeleton de carga. Quedan H1/H2/H3 (alto), ninguno bloqueante.

---

## 🎯 Conclusiones

### ✅ Fortalezas reales

| Área                     | Calidad  | Notas                                                                                       |
| ------------------------ | -------- | ------------------------------------------------------------------------------------------- |
| **SEO**                  | ⭐⭐⭐⭐ | JSON-LD con `alternateName`, OG dual (landscape+square), Twitter Cards, sitemap+robots      |
| **Accesibilidad (A11y)** | ⭐⭐⭐⭐ | ARIA en ErrorBoundary/Catalog y **tabs del Hero accesibles** (patrón tablist completo, A1) |
| **Performance**          | ⭐⭐⭐⭐ | `fetchpriority`+lazy en cards, preconnect a API. GSAP eliminado → bundle ~50% más liviano   |
| **Arquitectura**         | ⭐⭐⭐⭐ | React 19 + Tailwind v4 + Vite 8. **3 deps en runtime** (react, react-dom, zod). Sin bloat        |
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
| **P2**     | Code-splitting: Catalog lazy + Suspense con placeholder min-h-[75vh]    | 13-05-2026 |
| **A2**     | EditorWindow: botones decorativos → span aria-hidden + alineados        | 13-05-2026 |
| **H5**     | ErrorBoundary: console.error + error + componentStack                    | 13-05-2026 |
| **O3**     | Catalog error: ícono ⚠ + animate-shake (1x) + aria-hidden                | 13-05-2026 |
| **N4**     | Header: lee profile?.role con fallback (fuente única de verdad)         | 13-05-2026 |
| **N3**     | Hero: activeIdx lifted to EditorWindow + key={tab.id} (sin eslint-disable) | 13-05-2026 |
| **N6**     | API + Hero: `availability` en profile, consumido por `status`            | 13-05-2026 |
| **L1**     | API: landing custom en `/` (HTML+CSS inline, ejemplos JSON, link al repo) | 13-05-2026 |
| **C5**     | Validación Zod: `ProjectsSchema`/`ProfileSchema` en `src/schemas/`, `.parse()` en useProjects | 16-05-2026 |
| **A1**     | Hero: tabs accesibles (role tab/tablist/tabpanel, aria-selected, aria-controls/labelledby, navegación ←/→, roving tabindex) | 16-05-2026 |
| **REF1**   | Hero componetizado: `PreviewPanel.jsx` + `EditorWindow.jsx` (Hero.jsx 350 → 75 líneas)        | 16-05-2026 |
| **UX1**    | Skeletons de carga: `HeroSkeleton.jsx` + skeleton inline en Header (above-the-fold)           | 16-05-2026 |

---

## 📌 Pendientes

### 🔴 CRÍTICO — Antes de producción

_(vacío — C5 cerrado en sesión 8)_

### 🟡 ALTO — Profesionalismo / entrevistas (~80 min)

| #      | Mejora                                                     | Esfuerzo | Impacto | Descripción                                                                                                                                                                          |
| ------ | ---------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **H1** | **Tests para useProjects**                                 | 35 min   | Alto    | Vitest + @testing-library/react. Tests: loading, error, success, AbortController.                                                                                                    |
| **H2** | **Tests para ProjectCard**                                 | 25 min   | Medio   | Renderizado, lazy loading, accessible links.                                                                                                                                         |
| **H3** | **README.md profesional**                                  | 20 min   | Medio   | El actual es el template default de Vite. Stack, setup, scripts, estructura.                                                                                                         |

**Subtotal:** ~80 min.

### 🟢 BAJO / NICE-TO-HAVE

_(vacío — L1 cerrado en sesión 7)_

---

## 🚀 Orden recomendado para entrevistas

### Si tienes 1 día (impresiona en entrevista):
1. **H1** — un solo archivo de tests transforma percepción.
2. **H3** — README profesional. Primero que abren en GitHub.

### Si tienes 1 semana (production-grade):
3. **H2** — tests adicionales para ProjectCard.

---

## 📝 Notas técnicas

- **Stack runtime:** React 19.2, Tailwind v4.2, Vite 8.0. **3 deps en `package.json`** (react, react-dom, zod). GSAP eliminado en sesión 5.
- **Bundle actual:** ~228 KB / ~69 KB gzipped (sin GSAP, ~50% más liviano que antes).
- **Deployment:** `.htaccess` Apache listo. Para Vercel falta `vercel.json` (ver D2).
- **API:** `https://00-portfolio-projects-api.vercel.app` — endpoints `/projects` y `/profile`. Repo en `C:/apis/00-portfolio-projects/`. Profile incluye `role`, `based`, `years`, `stack: {frontend, styling, tools}` (arrays nativos, consumidos por Hero).
- **Theme:** `localStorage("theme:mode")` + `prefers-color-scheme` fallback.
- **CSS:** `App.css` reorganizado en 13 secciones numeradas (tokens → base → tema → componentes → animaciones → utilidades → UI global → A11y).

---

**Última actualización:** 16-05-2026 (sesión 9: A1 + componetización Hero + skeletons)
**Responsable:** Claude Code
**Siguiente sesión recomendada:** H1 (tests useProjects) → H3 (README)
