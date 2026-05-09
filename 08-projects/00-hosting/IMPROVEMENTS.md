# 📋 Mejoras Sugeridas — 00-hosting

Auditoría completa del 13 de mayo de 2026 + actualización 09-05-2026.

---

## ✅ Completados

| # | Mejora | Completado |
|---|--------|-----------|
| 1 | Optimizar `index.html` meta tags | ✅ 13-05-2026 |

---

## 🔴 CRÍTICO — Bugs (Tomar primero)

| # | Bug | Effort | Impacto | Estado | Descripción |
|---|-----|--------|--------|--------|-------------|
| 0 | **useProjects llamado dos veces** | 15 min | Alto | ⏳ Pendiente | Hero y Catalog hacen fetch independiente → 2 peticiones API paralelas. Elevar estado a App.jsx |
| 1 | **AbortController faltante** | 10 min | Alto | ⏳ Pendiente | useProjects sin cleanup → memory leak si componente desmunta. Agregar `AbortController` y cleanup |

---

## 🟢 SIMPLES (< 10 min) — Haz primero

| # | Mejora | Effort | Impacto | Estado | Descripción |
|---|--------|--------|--------|--------|-------------|
| 5 | Centralizar localStorage keys | 5 min | Bajo | ⏳ Pendiente | Mover `PRELOADER_KEY` y `THEME_KEY` de App.jsx a `src/data/storageKeys.js` |
| 9 | Leer versión desde package.json | 5 min | Bajo | ⏳ Pendiente | Preloader muestra "v1.0.0" hardcodeado. Leer desde `package.json` y actualizar versión a "1.0.0" |
| 10 | ARIA mejorado en Preloader | 5 min | Bajo | ⏳ Pendiente | Agregar `role="status"` y `aria-label` al contenedor del preloader |
| 13 | Agregar sitemap.xml + robots.txt | 10 min | Bajo | ⏳ Pendiente | Crear en `public/`. Para indexación en buscadores |

---

## 🟡 MEDIAS (10–20 min) — Haz después

| # | Mejora | Effort | Impacto | Estado | Descripción |
|---|--------|--------|--------|--------|-------------|
| 2 | Error Boundary | 15 min | Alto | ⏳ Pendiente | Crear class component `ErrorBoundary.jsx`. Envolver Hero y Catalog. Evita crashes totales |
| 8 | README.md completo | 15 min | Medio | ⏳ Pendiente | Documentar stack, setup, scripts, estructura. Profesionalidad |

---

## 🟠 COMPLEJAS (30+ min) — Requieren setup

| # | Mejora | Effort | Impacto | Estado | Descripción |
|---|--------|--------|--------|--------|-------------|
| 3 | Tests para useProjects | 30 min | Alto | ⏳ Pendiente | Instalar Vitest + @testing-library/react. Test loading, error, success |
| 6 | Tests para Catalog (filtros) | 25 min | Medio | ⏳ Pendiente | Test: "Todos", "React", "Next.js". Validar agrupación y sin agrupación |

---

## ⚫ NO PRIORITARIO — Costo > Beneficio

| # | Mejora | Razón |
|---|--------|-------|
| 4 | Code-split GSAP | GSAP ya tiene tree-shaking. Micro-optimización sin impacto real en el bundle actual |
| 7 | ESLint jsx-a11y | Ruido de warnings bajo el beneficio. El código ya es accesible a mano |
| 11 | Sentry/error tracking | Overhead para un portfolio estático. Error Boundary (#2) cubre el caso |
| 12 | Optimizar imágenes srcset | Las imágenes son previews (webp). No hay problema de tamaño |
| 14 | Tests Header (theme toggle) | Funcionalidad trivial, bajo valor demostrativo |
| 15 | Documentar API | Código lo explica suficientemente |

---

## 🎯 Orden recomendado para llegar a 10/10

1. **Bugs críticos** (#0, #1) — 25 min
   - Corregir doble fetch + AbortController
2. **Simples** (#5, #9, #10, #13) — 25 min
   - Wins rápidos, mejora inmediata
3. **Medias** (#2, #8) — 30 min
   - Error Boundary + documentación
4. **Complejas** (#3, #6) — 55 min
   - Setup testing, demuestra calidad

**Total:** ~2 horas para nivel profesional

## ✅ Completados

- **13-05-2026**: Punto #1 - Meta tags para SEO y redes sociales
  - Open Graph tags (og:type, og:title, og:description, og:url)
  - Twitter Card
  - Theme color y author
  - og-image-square.png (1200x1200px) para WhatsApp/móvil
  - og-image.png (1200x630px) como alternativa
  - Funciona correctamente en WhatsApp, LinkedIn, Twitter
