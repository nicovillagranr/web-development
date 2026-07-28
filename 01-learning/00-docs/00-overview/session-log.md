# Session Log

Bitacora minima para no perder contexto entre sesiones de estudio.

## Template

```md
## YYYY-MM-DD
- modulo:
- foco:
- que aprendi:
- que me falto:
- siguiente paso:
```

## Entries

## 2026-03-08
- modulo: repo-overview
- foco: auditoria de navegacion y memoria de estudio
- que aprendi: el mayor ruido estructural esta en `node_modules` versionados y assets masivos.
- que me falto: limpiar historial de dependencias versionadas sin romper practicas.
- siguiente paso: ejecutar limpieza de `node_modules` del tracking de git por fases.

## 2026-03-09 → 2026-07-26 (resumen de recuperacion)

Esta bitacora dejo de escribirse el 8 de marzo. En ese hueco hay **323 commits**, asi
que este bloque no reconstruye sesion por sesion: resume los hitos comprobables contra
`git log`, que es el registro real de ese periodo.

- El "siguiente paso" del 2026-03-08 esta **hecho**: hoy hay 0 archivos de
  `node_modules` rastreados (`scripts/repo-health.ps1` lo confirma).
- **05-typescript**: entrenamiento de TS completado de `01-tipos-basicos` a
  `09-react-props` (esta ultima, 171/171). `10-eventos-formularios` arrancado.
- **Migracion a TS**: `proyecto-1` completo; `proyecto-2`, andamiaje montado con los
  huecos de tipado pendientes a proposito.
- **Adelgazamiento**: las practicas de Three.js Journey salieron a su propio repo.
- **Dominio**: migracion de `nicovillagran.com` a `nico-villagran.com`.
- **Reestructura en dos puertas**: `00-portfolio/` y `01-learning/`, y despues las
  carpetas del portfolio renombradas al nombre real de cada proyecto.

## 2026-07-27
- modulo: repo-overview
- foco: segunda auditoria del repo y arreglo de la deuda documental
- que aprendi: dos cosas que solo se ven ejecutando. (1) Una carpeta `Components/`
  importada como `components/` compila en Windows y revienta en Linux — NTFS no
  distingue mayusculas y te oculta el fallo hasta que construyes fuera. (2) Un
  `no-unused-vars` que marca `<motion.div>` o `<Icon />` no es codigo muerto: es que
  al config le falta `eslint-plugin-react`, sin el cual el uso dentro de JSX es
  invisible para la regla.
- que me falto: los 5 huecos de tipado de `landing-layout-system` siguen abiertos, y
  el mock desincronizado de `00-hosting` deja su suite en 19/20.
- siguiente paso: cerrar los tipos de `landing-layout-system` y sincronizar el mock
  de `usePortfolioData.test.js` con `ProfileSchema`.
