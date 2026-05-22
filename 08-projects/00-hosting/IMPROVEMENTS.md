# 📋 Auditoría & Mejoras — 00-hosting

**Última auditoría:** 21 de mayo de 2026 (sesión 10: tests de hook + ProjectCard, restyling Hero, auditoría completa)
**Status general:** Base sólida y lista para deploy. **H1, H2, H3, B2 y B3 cerrados** (suite de 20 tests + README profesional + schema alineado + label de `status` corregido). Queda solo C6 (bajo), no bloqueante.

---

## 🎯 Conclusiones

### ✅ Fortalezas reales

| Área                       | Calidad  | Notas                                                                                       |
| -------------------------- | -------- | ------------------------------------------------------------------------------------------- |
| **SEO**                    | ⭐⭐⭐⭐ | JSON-LD con `alternateName`, OG dual (landscape+square), Twitter Cards, sitemap+robots      |
| **Accesibilidad (A11y)**   | ⭐⭐⭐⭐ | ARIA en ErrorBoundary/Catalog y tabs del Hero accesibles (patrón tablist completo, A1)      |
| **Performance**            | ⭐⭐⭐⭐ | `fetchpriority`+lazy en cards, preconnect a API, Catalog code-split. GSAP eliminado          |
| **Arquitectura**           | ⭐⭐⭐⭐ | React 19 + Tailwind v4 + Vite 8. 3 deps en runtime (react, react-dom, zod). Sin bloat        |
| **Estilos**                | ⭐⭐⭐⭐ | App.css reorganizado en 13 secciones, @theme + light override, animaciones custom           |
| **Testing**                | ⭐⭐⭐⭐ | Vitest + Testing Library + jest-dom. 20 tests (hook + ProjectCard), lint y build limpios     |
| **Hook usePortfolioData**  | ⭐⭐⭐⭐ | AbortController + Promise.all + validación Zod + error reporting por endpoint. Con tests     |

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
| **REF2**   | Hook `useProjects` renombrado a `usePortfolioData` (refleja que carga projects + profile)     | 18-05-2026 |
| **REF3**   | ErrorBoundary movido a su propia carpeta `src/Components/ErrorBoundary/`                       | 19-05-2026 |
| **B7**     | Hero/Footer: fallbacks honestos ("—") cuando falla la API                                     | 18-05-2026 |
| **N7**     | API + perfil: stack reorganizado en 6 categorías (languages, frontend, styling, testing, tools, copilots) | 19-05-2026 |
| **STY1**   | Restyling del Hero: EditorWindow y panel de preview renovados                                 | 19-05-2026 |
| **H1**     | Tests del hook `usePortfolioData` (loading, success, error HTTP, abort al desmontar) — 4 tests | 18-05-2026 |
| **TEST1**  | Config de testing: `@testing-library/jest-dom` + `src/setupTest.js` + `setupFiles` en vitest  | 21-05-2026 |
| **H2**     | Tests de `ProjectCard` — 16 tests (imagen, badges, stack, enlaces, casos negativos)           | 21-05-2026 |
| **STY2**   | EditorWindow: arrays del editor en dos líneas; fix de overflow del Hero (min-w-0)             | 21-05-2026 |
| **H3**     | README.md profesional: stack, características, setup, estructura, datos, testing y deploy      | 21-05-2026 |
| **B2**     | ProjectSchema: `repo`, `deploy` y `framework` marcados como `.optional()` (alineados con el uso real del componente) | 21-05-2026 |
| **B3**     | `status`: la API devuelve `online`/`in-progress`; el badge no-online ahora muestra "En desarrollo" (antes "Mantenimiento") y los mocks de test usan valores reales | 21-05-2026 |

---

## 📌 Pendientes

### 🔴 CRÍTICO — Antes de producción

_(vacío)_

### 🟡 ALTO — Profesionalismo / entrevistas

_(vacío)_

### 🟢 BAJO / NICE-TO-HAVE

| #      | Mejora                          | Esfuerzo | Impacto | Descripción                                                                                                       |
| ------ | ------------------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| **C6** | **Comentarios incorrectos en schemas** | 5 min    | Bajo    | `projectsSchema.js` y `profileSchema.js` tienen el typo "shcema/shema" y afirman que sirven "en el backend" y "para generar OpenAPI/Swagger" — falso: son schemas Zod de frontend consumidos por `usePortfolioData`. |

---

## 🚀 Orden recomendado

1. **C6** — limpieza de comentarios en los schemas (rápido).

---

## 📝 Notas técnicas

- **Stack runtime:** React 19.2, Tailwind v4.2, Vite 8.0. **3 deps en `package.json`** (react, react-dom, zod). GSAP eliminado en sesión 5.
- **Testing:** Vitest 4.1 + Testing Library + `@testing-library/jest-dom`. Setup en `src/setupTest.js` (registrado vía `setupFiles` en `vite.config.js`). 20 tests en 2 archivos: `usePortfolioData.test.js` (4) y `ProjectCard.test.jsx` (16).
- **Bundle actual:** chunk principal ~283 KB / ~85 KB gzipped + Catalog (lazy) ~16 KB / ~3.6 KB gzipped. CSS ~40 KB / ~7.8 KB gzipped.
- **Deployment:** `.htaccess` Apache listo en `public/`. Target decidido: Apache/Hostinger (no se usa Vercel para el front).
- **API:** `https://00-portfolio-projects-api.vercel.app` — endpoints `/projects` y `/profile`. Repo en `C:/apis/00-portfolio-projects/`. Profile incluye `role`, `based`, `years`, `availability`, `intro`, `philosophy` y `stack` con **6 categorías** (languages, frontend, styling, testing, tools, copilots).
- **Hook:** `usePortfolioData` — carga projects + profile en paralelo (`Promise.all`), valida con Zod, aborta al desmontar.
- **Theme:** `localStorage("theme:mode")` + `prefers-color-scheme` fallback.
- **CSS:** `App.css` reorganizado en 13 secciones numeradas (tokens → base → tema → componentes → animaciones → utilidades → UI global → A11y).

---

**Última actualización:** 21-05-2026 (sesión 10: tests hook + ProjectCard, restyling Hero, auditoría completa)
**Responsable:** Claude Code
**Siguiente sesión recomendada:** C6 (limpieza de comentarios en schemas)
