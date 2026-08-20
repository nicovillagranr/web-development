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

## 2026-07-28 → 2026-08-19 (resumen)

La bitacora volvio a quedarse parada, esta vez tres semanas y **45 commits**. Igual que
el bloque anterior, esto no reconstruye sesion por sesion: resume lo comprobable contra
`git log`.

- Los dos "siguiente paso" del 2026-07-27 estan **hechos**, y llevaban semanas hechos
  sin que el log se enterara: `landing-layout-system` pasa `tsc -b` sin errores, y la
  suite de `00-hosting` esta en **26/26**, no en 19/20.
- **05-typescript**: cerrado el parcial-02 y el parcial-03 (11/11), y despues el bloque
  `10-eventos-formularios` entero, rehecho dos veces hasta el formato v3. La spec de
  autoria salio del README a su propio documento.
- **00-hosting**: chip de lenguaje en las tarjetas, molde fijo por subgrid, stack como
  tabla de columnas, favicon que sobrevive al build, og-image aligeradas y con el
  dominio corregido (les faltaba el guion).
- **Store Pulse**: proyecto nuevo montado del 18 al 19 de agosto. TypeScript estricto,
  Zod en la frontera, PWA instalable y 82 tests.
- **Portfolio**: dividido `01-react` en `portfolio/` y `privados/`, y corregidas las
  descripciones de Projex y Smart Cooler, que anunciaban funciones inexistentes.

## 2026-08-20
- modulo: repo-overview
- foco: tercera auditoria del repo, cambio de la regla de escaparate y limpieza
- que aprendi: tres cosas.
  (1) **Una descripcion corregida en dos sitios de cuatro sigue siendo falsa.** El
  arreglo del 16 de agosto llego a la API y a los README de proyecto, pero no a los dos
  indices, que son justo los que se leen primero. Antes de dar por corregido un texto
  hay que contar cuantas superficies lo repiten.
  (2) **De todos los campos de la API, `repo` es el unico que lleva la ruta completa de
  GitHub**, asi que es el unico que se rompe al mover o renombrar una carpeta. El
  `path`, el `base` de Vite y los `og:url` van por slug y no se enteran.
  (3) **Un chequeo que siempre esta en rojo deja de ser un chequeo.**
  `check-duplicate-projects.ps1` llevaba meses gritando por el archivo de cinco
  versiones; al borrarlo sale limpio por primera vez y vuelve a significar algo.
- que me falto: `usePortfolioDataWithFallback.js` sigue sin un solo test, y es la pieza
  de la que mas presumo en el README. Los dos `react-hooks/set-state-in-effect` de
  `smart-cooler-ui` y `sport-mindset` siguen en rojo. Y `03-projex` y
  `04-landing-layout-system` todavia declaran `react-portfolio-3` y `react-portfolio-2`
  en su `package.json`, restos de la numeracion vieja.
- siguiente paso: subir a Hostinger el `dist/` de `00-hosting` ya construido con el
  snapshot nuevo, y escribir los tres tests del fallback: API caida -> snapshot,
  snapshot corrupto -> error, y `stale` en true.
