# 📋 Auditoría & Mejoras — 00-hosting

**Última auditoría:** 12 de mayo de 2026 (sesión 4: auditoría profunda — nuevos hallazgos sin documentar previamente)
**Status general:** Base sólida y por encima del promedio para portfolio junior. Quedan 2 críticos de producción (C3, C5) + nuevos hallazgos de la sesión 4 detallados abajo.

---

## 🎯 Conclusiones de la Re-Auditoría

### ✅ Fortalezas reales

| Área                     | Calidad  | Notas                                                                                       |
| ------------------------ | -------- | ------------------------------------------------------------------------------------------- |
| **SEO**                  | ⭐⭐⭐⭐ | JSON-LD con `alternateName`, OG dual (landscape+square), Twitter Cards, sitemap+robots      |
| **Accesibilidad (A11y)** | ⭐⭐⭐   | ARIA en Preloader/ErrorBoundary/Catalog OK, pero **tabs del Hero no son accesibles** (A1)   |
| **Performance**          | ⭐⭐⭐   | `fetchpriority`+lazy en cards, preconnect a API. **Falta lazy-load de GSAP (~70KB)** (P1)   |
| **Arquitectura**         | ⭐⭐⭐⭐ | React 19 + Tailwind v4 + Vite 8. 3 deps en runtime. Sin bloat                               |
| **Estilos**              | ⭐⭐⭐⭐ | App.css reorganizado en 13 secciones, @theme + light override, animaciones custom           |
| **Hook useProjects**     | ⭐⭐⭐   | AbortController + Promise.all OK, **pero bug menor en error reporting** (B1)                |
| **Sofisticación visual** | ⭐⭐⭐⭐ | Preloader GSAP, glassmorphism, gradientes radiales — vende como portfolio                   |

### ⚠️ Diagnóstico honesto (sesión 4)

> Existe una **asimetría** entre la sofisticación visual (alta) y los fundamentos técnicos (con huecos: sin tests, datos duplicados en Hero, A11y de tabs incorrecta). Un entrevistador técnico va a notarlo. Prioridad: cerrar fundamentos antes de añadir más capas visuales.

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

---

## 📌 Pendientes

### 🔴 CRÍTICO — Antes de producción (~50 min)

| #      | Mejora                                            | Esfuerzo | Impacto | Descripción                                                                                                                                                                                              |
| ------ | ------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **C3** | **Preloader: Sincronizar con useProjects**        | 20 min   | Alto    | Pasar `isReady` (de `useProjects`) como prop. Quitar `delay: 1` hardcoded. **Corrige el pestañeo del Hero al cargar.**                                                                                   |
| **C5** | **Validación de datos API (Zod)**                 | 25 min   | Alto    | Instalar `zod`. Schemas para `Project[]` y `Profile` (incluye `role`, `based`, `years`, `stack`). Parsear respuesta antes de `setProjects`.                                                              |
| **B1** | **Bug en useProjects: error reporting incorrecto** | 5 min    | Medio   | `useProjects.js:20` reporta solo `projectsRes.status`. Si el que falla es `profile`, el mensaje miente. Fix: `throw new Error(\`HTTP ${projectsRes.ok ? profileRes.status : projectsRes.status}\`)`. |

**Subtotal:** ~50 min para deploy sin riesgo.

### 🟡 ALTO — Profesionalismo / entrevistas (~3h)

| #      | Mejora                                                     | Esfuerzo | Impacto | Descripción                                                                                                                                                                          |
| ------ | ---------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **H6** | **Hero: eliminar duplicación de datos** (sesión 4)         | 15 min   | Alto    | Líneas 243-278 (`TABS`) y 297-311 (`data`) repiten lo mismo. Fuente única de verdad — derivar uno del otro. Se va a desincronizar cuando se haga N2. **Combinar con N2.**            |
| **N2** | **Hero: consumir profile extendido**                       | 10 min   | Medio   | Consumir `profile.role`, `profile.based`, `profile.years`, `profile.stack.{frontend,styling,tools}` con fallbacks. Hacer junto con H6.                                               |
| **A1** | **Tabs del Hero: A11y completa** (sesión 4)                | 30 min   | Alto    | Los `<button>` (Hero.jsx:167-173) faltan `role="tab"`, contenedor `role="tablist"`, `aria-selected`, navegación con flechas ←/→. **Bandera roja en entrevistas A11y-conscientes.**   |
| **N3** | **Refactor Hero `useEffect`**                              | 10 min   | Medio   | Quitar `eslint-disable react-hooks/set-state-in-effect`. Usar `key={tabId}` o derivar.                                                                                               |
| **N4** | **Header: leer role del profile** (sesión 4)               | 5 min    | Medio   | `Header.jsx:10` tiene `"Frontend Developer"` hardcoded mientras Footer lo lee de `profile.role`. Inconsistencia.                                                                     |
| **A2** | **EditorWindow: botones decorativos** (sesión 4)           | 5 min    | Bajo    | `Hero.jsx:183-185` (`−`, `□`, `✕`) son `<button>` sin label → ruido para lectores de pantalla. Convertir a `<span aria-hidden="true">` o agrupar en `<div aria-hidden>`.             |
| **P1** | **Lazy-load del Preloader (GSAP)** (sesión 4)              | 15 min   | Alto    | GSAP pesa ~70KB gzipped y solo se usa una vez. Usar `React.lazy()` + dynamic import. Mejora LCP significativo.                                                                       |
| **H1** | **Tests para useProjects**                                 | 35 min   | Alto    | Vitest + @testing-library/react. Tests: loading, error, success, AbortController.                                                                                                    |
| **H2** | **Tests para ProjectCard**                                 | 25 min   | Medio   | Renderizado, lazy loading, accessible links.                                                                                                                                         |
| **H3** | **README.md profesional**                                  | 20 min   | Medio   | El actual es el template default de Vite. Stack, setup, scripts, estructura.                                                                                                         |
| **H5** | **ErrorBoundary logging**                                  | 5 min    | Medio   | Cambiar `console.log` por `console.error` y agregar `errorInfo` + stack. **Esfuerzo real: 5 min, no 10.**                                                                            |

**Subtotal:** ~175 min.

### 🟢 BAJO / NICE-TO-HAVE (~75 min)

| #      | Mejora                                                  | Esfuerzo | Impacto | Descripción                                                                                                                                                                                       |
| ------ | ------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **D1** | **API: stack como arrays, no CSV** (sesión 4)           | 15 min   | Medio   | API devuelve `stack.frontend: "React, Next.js, ..."` y el cliente hace `.split(",")`. Frágil. Cambiar API para devolver arrays nativos: `stack.frontend: ["React", "Next.js"]`. Repo en `C:/apis/`. |
| **P2** | **Code-splitting general** (sesión 4)                   | 15 min   | Medio   | Catálogo + ErrorBoundary + Hero con `React.lazy` + Suspense. Mejora carga inicial.                                                                                                                |
| **D2** | **Decidir target de deploy** (sesión 4)                 | -        | -       | Hay `.htaccess` (Apache) listo. Falta `vercel.json`. Elegir uno. Bloquea O2.                                                                                                                      |
| **O2** | **404 page custom**                                     | 15 min   | Bajo    | Depende de D2.                                                                                                                                                                                    |
| **O3** | **Animación shake en error del Catalog**                | 10 min   | Bajo    | Ícono `⚠` con keyframe `shake` + `aria-hidden`. Pasos detallados quedaron en chat sesión 3.                                                                                                       |
| **K1** | **Comentar PRELOADER_KEY behavior** (sesión 4)          | 5 min    | Bajo    | `useState(() => localStorage.getItem(PRELOADER_KEY) !== "1")` en App.jsx muestra preloader 1 sola vez por navegador. Decisión consciente pero alguien va a creer que es bug. Comentar el por qué.  |
| **N5** | **Renombrar prop `cyan` a `emerald` en KPI** (sesión 4) | 5 min    | Bajo    | `Hero.jsx:5` mapea `accent="cyan"` → `text-emerald`. El nombre del prop no coincide con la variable real. Confuso.                                                                                |
| **D3** | **manifest.json + iconos PWA** (sesión 4)               | 15 min   | Bajo    | Faltan para "agregar a inicio" en móviles.                                                                                                                                                        |
| **D4** | **Code-splitting de GSAP**                              | -        | -       | Ya cubierto por P1.                                                                                                                                                                               |

**Subtotal:** ~80 min.

---

## 🚀 Orden recomendado para entrevistas

### Si tienes 1 hora (mínimo viable):
1. **C3** — pestañeo del Hero. Único defecto visible al usuario.
2. **B1** — bug del error message.
3. **H6 + N2** combinados — fuente única de verdad en Hero.

### Si tienes 1 día (impresiona en entrevista):
4. **A1** — tabs accesibles. Bandera roja si no está.
5. **H1** — un solo archivo de tests transforma percepción.
6. **H3** — README profesional. Primero que abren en GitHub.
7. **N4 + A2 + H5** — fixes cosméticos rápidos.
8. **P1** — lazy-load GSAP. LCP visible en Lighthouse.

### Si tienes 1 semana (production-grade):
9. **C5** — Zod.
10. **H2** — tests adicionales.
11. **N3** — refactor del useEffect del Hero.
12. **D1** — API devuelve arrays. Toca el repo del API.
13. **P2 + D2 + D3** — performance y deploy.
14. **K1 + N5 + O2 + O3** — polish.

---

## 📝 Notas técnicas

- **Stack runtime:** React 19.2, Tailwind v4.2, Vite 8.0, GSAP 3.14. 3 deps en `package.json`.
- **Deployment:** `.htaccess` Apache listo. Para Vercel falta `vercel.json` (ver D2).
- **API:** `https://00-portfolio-projects-api.vercel.app` — endpoints `/projects` y `/profile`. Repo en `C:/apis/00-portfolio-projects/`. Profile incluye `role`, `based`, `years`, `stack: {frontend, styling, tools}` (CSV — ver D1).
- **Theme:** `localStorage("theme:mode")` + `prefers-color-scheme` fallback.
- **CSS:** `App.css` reorganizado en 13 secciones numeradas (tokens → base → tema → componentes → animaciones → utilidades → UI global → A11y).

---

## 🆕 Hallazgos sesión 4 (nuevos, sin documentar antes)

Resumen para no perderlos. Detalles arriba.

- **B1** — bug error reporting en `useProjects.js:20` (🔴).
- **H6** — duplicación de datos en `Hero.jsx` entre TABS y `data` (🟡).
- **N4** — `Header.jsx` hardcodea role (🟡).
- **A1** — tabs del Hero sin semántica de tabs (🟡 alto impacto en A11y).
- **A2** — botones decorativos en EditorWindow sin label (🟡).
- **P1** — GSAP no está lazy-loaded (🟡).
- **P2** — sin code-splitting general (🟢).
- **D1** — `stack` como CSV en API en lugar de arrays (🟢).
- **D2** — falta decidir Apache vs Vercel (🟢).
- **D3** — falta `manifest.json` + iconos PWA (🟢).
- **K1** — `PRELOADER_KEY` merece comentario explicativo (🟢).
- **N5** — prop `cyan` apunta a `text-emerald` (🟢).

---

**Última actualización:** 12-05-2026 (sesión 4: auditoría profunda + 12 hallazgos nuevos)
**Responsable:** Claude Code re-audit
**Siguiente sesión recomendada:** C3 → B1 → H6+N2 (combinados) → A1
