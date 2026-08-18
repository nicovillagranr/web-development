# Store Pulse

PWA mobile-first para consultar las métricas operativas de un local de reparto desde el teléfono:
rendimiento individual, del equipo y del local, con objetivos, cumplimiento y evolución semanal.

> **Los datos son ficticios.** Todo lo que se ve está generado por `src/mocks/`. Este repositorio no
> contiene ni contendrá datos reales de ningún local ni de ninguna persona. Es un proyecto personal
> y no está asociado a ninguna empresa.

---

## El problema

Las métricas del local viven en una plataforma interna que vuelca hojas de cálculo. Consultarlas
desde el móvil, entre pedido y pedido, es incómodo: hay que buscar la fila, cruzar columnas y
compararlas de cabeza con la semana anterior. La información existe, pero no se puede leer de un
vistazo, y quien quiere saber cómo va tiene que preguntarle al encargado.

La app coge esos mismos datos y los convierte en indicadores, objetivos y tendencias.

## La decisión de diseño que sostiene el proyecto

**La lista de métricas es un dato, no código.**

Cada métrica se declara una vez en `src/metrics/definitions.ts` con su unidad, su precisión y —lo
más importante— **hacia qué lado está "mejor"**:

```ts
picking_time: {
  unit: "minutes",
  direction: "lower-is-better",   // en tiempos, menos es mejor
  ...
}
total_orders: {
  unit: "count",
  direction: "higher-is-better",  // en pedidos, más es mejor
  ...
}
```

De ahí sale todo lo demás. La UI no sabe qué es "Picking Time": sabe leer una definición y pintarla.
**Añadir una métrica nueva es añadir una entrada al registro** — aparece sola en las tarjetas, en el
selector de orden del ranking, en los gráficos y en los mocks, sin tocar un solo componente.

Eso importa porque la lista definitiva de métricas todavía no está cerrada: falta confirmarla con el
local. En vez de esperar a tenerla, la arquitectura está hecha para que llegar tarde no cueste nada.

### La consecuencia más visible

`direction` resuelve el error que se cuela en todos los paneles de este tipo:

|             | Movimiento | ¿Es bueno? |
| ----------- | ---------- | ---------- |
| Prep Time ▼ | baja       | 🟢 mejora  |
| Pedidos ▼   | baja       | 🔴 empeora |

La flecha sale de hacia dónde se movió el número; el color, de si eso es una mejora. Son dos
preguntas distintas, y en `src/metrics/compare.ts` son dos campos distintos. Deducir el color de la
flecha pinta la mitad de las métricas al revés, y la pantalla sigue pareciendo correcta.

## Estado

**Fase 0 (descubrimiento) abierta.** Las 11 métricas del registro están marcadas `status: "assumed"`:
sus nombres y significados están leídos de capturas, no de una definición oficial. La propia app lo
dice al final del panel, y ese aviso se calcula desde el registro — encoge solo según se vayan
confirmando y desaparece cuando no quede ninguna.

Los umbrales de cumplimiento (`DEFAULT_TIERS`) son la hipótesis más floja que no contradice los dos
únicos ejemplos reales conocidos. Están documentados como provisionales.

Construido: los tres niveles de la app, el registro, los objetivos, los gráficos y la PWA.
Pendiente: backend, base de datos, importador del Excel y autenticación (ver _Lo que falta_).

## Correrlo

```bash
pnpm install
pnpm dev          # http://localhost:5173
```

| Comando          | Qué hace                                                |
| ---------------- | ------------------------------------------------------- |
| `pnpm dev`       | servidor de desarrollo (con service worker activo)      |
| `pnpm test`      | Vitest en modo watch                                    |
| `pnpm test:run`  | la suite entera una vez                                 |
| `pnpm typecheck` | `tsc -b --noEmit`                                       |
| `pnpm lint`      | ESLint                                                  |
| `pnpm format`    | Prettier                                                |
| `pnpm build`     | build de producción + service worker                    |
| `pnpm preview`   | sirve el build (necesario para probar la PWA de verdad) |

Los iconos de la PWA se regeneran con `node scripts/generate-icons.mjs` cuando cambie el diseño; no
se rasterizan en cada build para no meter una dependencia nativa en el camino crítico.

## Estructura

```
src/
  metrics/      el registro y las funciones puras — sin React, sin red
  data/         contrato de datos, schemas Zod, selectores y la costura DataSource
  mocks/        generador determinista de datos ficticios
  components/   piezas que se pintan desde una MetricDefinition
  features/     store · team · worker — los tres niveles de la app
docs/
  arquitectura-informacion.md   qué pregunta responde cada bloque de cada pantalla
```

Dos límites que el proyecto respeta a propósito:

- **`src/metrics/` no importa nada de React.** Así puede moverse tal cual a un paquete compartido con
  el backend el día que exista, sin reescribirlo.
- **Ningún componente hace `fetch` ni importa los mocks.** Todo pasa por `data/dataSource.ts`, que
  hoy resuelve contra datos ficticios y mañana contra la API. Cambiar la fuente es cambiar un
  archivo, no cada pantalla.

## Decisiones que quizá no se ven

- **Ausencia ≠ cero.** Quien no trabajó una semana no aparece en el ranking en vez de aparecer con un
  0, y su serie histórica dibuja un hueco en vez de una caída. Un cero fantasma pondría al que no
  vino como el más rápido en tiempos y como el peor en pedidos: las dos cosas, mentira.
- **Mediana y no media** como referencia del equipo, y sin podio ni medallas. Un ranking desnudo de
  personas con datos laborales reales convierte una herramienta de consulta en una tabla de
  humillación pública, y la van a abrir los propios compañeros.
- **La cabecera de frescura no es adorno.** Con caché offline, la app puede estar enseñando datos de
  hace una semana con toda normalidad, así que tiene que decir de cuándo son.
- **La relación `assignment + picking + packaging = prep_time` se comprueba, no se calcula.** Es una
  observación tomada de una captura, no una ley: son promedios y solo cuadran si todos los pedidos
  pasan por las tres etapas. Si dejan de sumar, la app avisa en vez de taparlo.
- **Los colores de los gráficos están validados, no elegidos a ojo** — banda de luminosidad, croma,
  separación para daltonismo y contraste. Ver la nota en `src/index.css`.
- **Recharts va en su propio chunk.** Pesa más que todo lo demás junto y los gráficos están bajo el
  pliegue: cargarlo aparte deja el bundle inicial en ~99 kB comprimidos en vez de ~207 kB.

## Lo que falta

| Fase | Qué                                                                  |
| ---- | -------------------------------------------------------------------- |
| 0    | Confirmar las métricas con el local _(en curso, fuera del código)_   |
| 5    | Modelo de datos y API — Vercel Functions + Postgres + Prisma         |
| 6    | Importador del Excel: allowlist, validación, upsert idempotente      |
| 7    | Conectar la PWA a la API (cambiar la implementación de `DataSource`) |
| 8    | Fuente real y automatización semanal                                 |
| 9    | Autenticación por roles y despliegue                                 |

El modelo de datos, el pipeline de ingesta y el análisis de riesgos ya están diseñados; lo que falta
es construirlos.

## Stack

React 19 · TypeScript (`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`) · Vite ·
Tailwind v4 · React Router · Zod · Recharts · vite-plugin-pwa · Vitest
