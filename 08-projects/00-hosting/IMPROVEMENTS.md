# 📋 Mejoras Sugeridas — 00-hosting

Auditoría completa del 13 de mayo de 2026.

| # | Mejora | Severidad | Effort | Impacto | Estado | Descripción |
|---|--------|-----------|--------|--------|--------|-------------|
| 1 | Optimizar `index.html` meta tags | Media | 10 min | Alto | ✅ Completado 13-05 | Agregar description, OG tags, favicon, viewport. Mejora SEO y compartir en redes |
| 2 | Crear Error Boundary | Alta | 15 min | Alto | ⏳ Pendiente | Envolver Catalog/Hero en error boundary. Evita crashes por fallos de API |
| 3 | Tests para useProjects hook | Alta | 30 min | Alto | ⏳ Pendiente | Test loading, error, success. Demuestra calidad de código |
| 4 | Code-split GSAP | Baja | 20 min | Medio | ⏳ Pendiente | Lazy import en Preloader. Reduce bundle inicial |
| 5 | Centralizar localStorage keys | Baja | 5 min | Bajo | ⏳ Pendiente | Constante `STORAGE_KEYS` reutilizable |
| 6 | Tests para Catalog (filtros) | Media | 25 min | Medio | ⏳ Pendiente | Validar que filtros funcionan correctamente |
| 7 | ESLint con react plugin | Baja | 10 min | Bajo | ⏳ Pendiente | Añadir validación de props y hooks |
| 8 | README.md completo | Media | 15 min | Medio | ⏳ Pendiente | Documentar setup, stack, estructura, cómo correr |
| 9 | Leer versión desde package.json | Baja | 10 min | Bajo | ⏳ Pendiente | Preloader muestra v1.0.0 dinámicamente |
| 10 | Preloader accesible mejorado | Baja | 15 min | Bajo | ⏳ Pendiente | Agregar role="status" y describir animación |
| 11 | Agregar Sentry/error tracking | Media | 20 min | Medio | ⏳ Pendiente | Detectar errores en producción |
| 12 | Optimizar imágenes con srcset | Baja | 20 min | Medio | ⏳ Pendiente | Diferentes tamaños para diferentes viewports |
| 13 | Agregar sitemap.xml | Baja | 10 min | Bajo | ⏳ Pendiente | Para indexación en buscadores |
| 14 | Tests para Header (theme toggle) | Baja | 15 min | Bajo | ⏳ Pendiente | Validar cambio de tema y localStorage |
| 15 | Documentar estructura de API | Media | 10 min | Medio | ⏳ Pendiente | Explicar qué consume cada componente |

## 🎯 Prioridad Recomendada

1. **Error Boundary** (#2) — Evita crashes en producción
2. **Tests useProjects** (#3) — Calidad de código
3. **Tests Catalog** (#6) — Funcionalidad crítica
4. **localStorage keys** (#5) — Mantenibilidad
5. **README** (#8) — Documentación
6. **Code-split GSAP** (#4) — Rendimiento
7. **Sentry** (#11) — Monitoreo producción

## ✅ Completados

- **13-05-2026**: Punto #1 - Meta tags para SEO y redes sociales
  - Open Graph tags (og:type, og:title, og:description, og:url)
  - Twitter Card
  - Theme color y author
  - og-image-square.png (1200x1200px) para WhatsApp/móvil
  - og-image.png (1200x630px) como alternativa
  - Funciona correctamente en WhatsApp, LinkedIn, Twitter
