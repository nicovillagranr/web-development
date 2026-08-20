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

De ahí sale todo lo demás. La UI no sabe qué es el tiempo de picking: sabe leer una definición y pintarla.
**Añadir una métrica nueva es añadir una entrada al registro** — aparece sola en las tarjetas, en el
selector de orden del ranking, en los gráficos y en los mocks, sin tocar un solo componente.

Eso importa porque la lista definitiva de métricas todavía no está cerrada: falta confirmarla con el
local. En vez de esperar a tenerla, la arquitectura está hecha para que llegar tarde no cueste nada.

### La consecuencia más visible

`direction` resuelve el error que se cuela en todos los paneles de este tipo:

|           | Movimiento | ¿Es bueno? |
| --------- | ---------- | ---------- |
| Prep ▼    | baja       | 🟢 mejora  |
| Pedidos ▼ | baja       | 🔴 empeora |

La flecha sale de hacia dónde se movió el número; el color, de si eso es una mejora. Son dos
preguntas distintas, y en `src/metrics/compare.ts` son dos campos distintos. Deducir el color de la
flecha pinta la mitad de las métricas al revés, y la pantalla sigue pareciendo correcta.

## Estado

**Fase 0 (descubrimiento) abierta.** El 18 de agosto de 2026 apareció el listado de indicadores que
usa el local, y cambió el registro sin cerrar la fase:

- **Confirma los nombres.** Los doce indicadores reales están ahora en el registro con su nombre en
  español y, aparte, con la cadena literal de la fuente (`sourceLabel`) que el importador de la Fase
  6 buscará como cabecera de columna en el Excel.
- **Trajo tres métricas que faltaban**: tamaño de cesta, tiempo de picking por artículo y retrasos
  Dmart.
- **No confirma ningún significado.** Las 14 métricas siguen en `status: "assumed"`, y quedan diez
  preguntas abiertas para el local.

El aviso del final del panel cuenta las dos dudas por separado —las que no sabemos qué miden y la
que ni siquiera aparece en el listado— y se calcula desde el registro, así que encoge solo y
desaparece cuando no quede ninguna.

Los umbrales de cumplimiento (`DEFAULT_TIERS`) siguen siendo la hipótesis más floja que no
contradice los dos únicos ejemplos reales conocidos. Están documentados como provisionales, y el
listado no trajo objetivos nuevos: siguen siendo dos.

Construido: los tres niveles de la app, el registro, los objetivos, los gráficos, los dos temas y la PWA.
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
  separación para daltonismo y contraste, en los dos temas. El resultado tiene una curiosidad: en
  oscuro los tres pasan el mínimo de 3:1, y en claro la aqua se queda en 2,82:1. Ver la nota en
  `src/App.css`.
- **El modo oscuro no es el claro invertido.** Cada valor está medido contra la superficie oscura,
  porque un verde que contrasta 5,5:1 sobre blanco contrasta 1,9:1 sobre un fondo oscuro. Y el acento
  sigue siendo índigo y no un rojo de marca: aquí el rojo ya significa "esta métrica empeoró", y un
  botón primario del mismo rojo haría ambiguo justo lo que la app existe para desambiguar.
- **El nombre visible y el nombre de la fuente son dos campos.** La app se lee en español; el
  importador del Excel busca columnas por su cadena literal, con la ortografía que tenga —en las
  notas del local se leen "Inacuracy" y "Assigment", con una letra menos. Si fueran el mismo campo,
  traducir la app rompería la ingesta.
- **El tamaño de cesta no tiene dirección buena ni mala.** `neutral` no es un hueco por rellenar: que
  la cesta suba depende de lo que compre la gente, no de cómo trabaje nadie. Al no tener "mejor", no
  se evalúa ni se colorea, y puede aparecer en la ficha de una persona como contexto sin convertirse
  en una nota. Es el denominador que explica por qué un pedido tardó más.
- **Recharts va en su propio chunk.** Pesa más que todo lo demás junto y los gráficos están bajo el
  pliegue: cargarlo aparte deja el bundle inicial en ~100 kB comprimidos en vez de ~199 kB.

## Lo que falta

| Fase | Qué                                                                  |
| ---- | -------------------------------------------------------------------- |
| 0    | Confirmar qué mide cada métrica con el local — 10 preguntas abiertas |
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
