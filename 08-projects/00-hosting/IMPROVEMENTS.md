# 📋 Mejoras Sugeridas — 00-hosting

Auditoría completa del 13 de mayo de 2026.

| # | Mejora | Severidad | Effort | Impacto | Descripción |
|---|--------|-----------|--------|--------|-------------|
| 1 | Optimizar `index.html` meta tags | Media | 10 min | Alto | Agregar description, OG tags, favicon, viewport. Mejora SEO y compartir en redes |
| 2 | Crear Error Boundary | Alta | 15 min | Alto | Envolver Catalog/Hero en error boundary. Evita crashes por fallos de API |
| 3 | Tests para useProjects hook | Alta | 30 min | Alto | Test loading, error, success. Demuestra calidad de código |
| 4 | Code-split GSAP | Baja | 20 min | Medio | Lazy import en Preloader. Reduce bundle inicial |
| 5 | Centralizar localStorage keys | Baja | 5 min | Bajo | Constante `STORAGE_KEYS` reutilizable |
| 6 | Tests para Catalog (filtros) | Media | 25 min | Medio | Validar que filtros funcionan correctamente |
| 7 | ESLint con react plugin | Baja | 10 min | Bajo | Añadir validación de props y hooks |
| 8 | README.md completo | Media | 15 min | Medio | Documentar setup, stack, estructura, cómo correr |
| 9 | Leer versión desde package.json | Baja | 10 min | Bajo | Preloader muestra v1.0.0 dinámicamente |
| 10 | Preloader accesible mejorado | Baja | 15 min | Bajo | Agregar role="status" y describir animación |
| 11 | Agregar Sentry/error tracking | Media | 20 min | Medio | Detectar errores en producción |
| 12 | Optimizar imágenes con srcset | Baja | 20 min | Medio | Diferentes tamaños para diferentes viewports |
| 13 | Agregar sitemap.xml | Baja | 10 min | Bajo | Para indexación en buscadores |
| 14 | Tests para Header (theme toggle) | Baja | 15 min | Bajo | Validar cambio de tema y localStorage |
| 15 | Documentar estructura de API | Media | 10 min | Medio | Explicar qué consume cada componente |

## 🎯 Prioridad Recomendada

1. **Error Boundary** (#2) — Evita crashes en producción
2. **Meta tags** (#1) — SEO + presentación
3. **Tests useProjects** (#3) — Calidad de código
4. **Tests Catalog** (#6) — Funcionalidad crítica
5. **localStorage keys** (#5) — Mantenibilidad
6. **README** (#8) — Documentación
7. **Code-split GSAP** (#4) — Rendimiento
8. **Sentry** (#11) — Monitoreo producción
