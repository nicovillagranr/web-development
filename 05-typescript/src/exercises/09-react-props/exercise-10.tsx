/* =============================================================================
 * EJERCICIO 10 — CAPSTONE: un ÁRBOL de componentes tipado de arriba abajo
 * =============================================================================
 *
 * 🟢 QUÉ ES ESTO
 * ----------------------------------------------------------------------------
 * No hay concepto nuevo (salvo una pieza pequeña, marcada abajo). Este archivo
 * es el examen de la carpeta: montar una pantalla real usando las nueve
 * herramientas de los ejercicios 01-09, cada una donde toca.
 *
 * Un componente aislado es un ejercicio. Un ÁRBOL es un programa: los datos
 * bajan por las props, los avisos suben por los callbacks, y cada nivel decide
 * qué sabe y qué no. Eso es lo que se escribe en el trabajo.
 *
 *
 * 🌳 EL ÁRBOL QUE VAS A CONSTRUIR (de la hoja a la raíz, en ese orden)
 * ----------------------------------------------------------------------------
 *     PaginaPedidos              ← 10  la raíz: junta todo
 *       └─ Panel                 ←  6  marco con slots (titulo, acciones, children)
 *            └─ Contenido        ←  8  unión discriminada: cargando/error/listo
 *                 └─ TablaPedidos←  5  la lista (map + key + estado vacío)
 *                      └─ FilaPedido      ← 4  props DERIVADAS + callback con id
 *                           ├─ EtiquetaEstado ← 2
 *                           └─ Dinero         ← 3  props nativas + rest
 *
 * De dónde sale cada pieza:
 *     01 props tipadas · 02 opcionales y `??` · 03 render condicional ·
 *     04 listas y `key` · 05 slots (`children` + nombrados) · 06 `Pick`/`Omit`
 *     y `extends` · 07 `ComponentProps` + `{...resto}` · 08 unión discriminada
 *     + guardia `never` · 09 callbacks con argumentos
 *
 * 🧩 LA ÚNICA PIEZA NUEVA — el acceso indexado a tipos:
 *
 *     Pedido['estado']   ← "el tipo de la propiedad `estado` DE `Pedido`"
 *
 * Es el hermano pequeño de `Pick`: `Pick` te devuelve un OBJETO recortado;
 * el acceso indexado te devuelve el tipo de UNA propiedad, suelto. Misma regla
 * de siempre: derivar, no copiar. Si mañana `Pedido` admite un cuarto estado,
 * todo lo que dependa de `Pedido['estado']` se entera solo.
 *
 *
 * ▸ EJERCICIO — drills en escalera, del 1 al 10. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/09-react-props/exercise-10.test.tsx
 *     pnpm typecheck
 *
 * 📝 Trazado en .tsx = ejemplo de uso comentado con `//`.
 * ===========================================================================*/

/* eslint-disable @typescript-eslint/no-empty-object-type, no-empty-pattern --
 * ANDAMIAJE DEL STARTER: los huecos `{}` sin rellenar disparan estas dos reglas.
 * 🧹 Al cerrar los 10 drills, BORRA estas 4 líneas y corre `pnpm lint`. */

import type { ComponentProps, ReactNode } from 'react'


/* ════════════════════════════════════════════════════════════════════════════
 * EL DOMINIO — la fuente de la verdad. NO se copia: se deriva de aquí.
 * ════════════════════════════════════════════════════════════════════════════ */

export type Pedido = {
  id: number
  cliente: string
  total: number
  estado: 'pendiente' | 'enviado' | 'entregado'
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 0 — CALENTAMIENTO: derivar el tipo de UNA propiedad
 * ════════════════════════════════════════════════════════════════════════════ */

// 1) Define y exporta el tipo `EstadoPedido` como el tipo de la propiedad
//    `estado` de `Pedido`. Una línea, con acceso indexado. ❌ No lo copies a mano.
export type EstadoPedido = {}

// 2) `EtiquetaEstado` (hoja) — recibe `estado` (EstadoPedido). Retorna un <span>
//    con `className` = el estado y, dentro, el texto en castellano:
//      'pendiente' → "Pendiente"   'enviado' → "Enviado"   'entregado' → "Entregado"
//    Usa `switch` con guardia `never` (exercise-08): si mañana el dominio gana un
//    cuarto estado, quieres que TE LO DIGA el compilador, no un hueco en blanco.
//    <EtiquetaEstado estado="enviado" />  →  <span class="enviado">Enviado</span>
export function EtiquetaEstado({}: {}) {
  return <span></span>
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 1 — LA OTRA HOJA: props nativas + rest (exercise-07)
 * ════════════════════════════════════════════════════════════════════════════ */

// 3) Define y exporta la `interface DineroProps` que extienda las props nativas
//    de `<span>` y añada:
//      · `cantidad` number
export interface DineroProps {}

//    `Dinero` — usa `DineroProps`. Saca `cantidad`, deja el resto. Retorna un
//    <span> con el resto derramado y, dentro, la cantidad con dos decimales
//    seguida de " €"  (`cantidad.toFixed(2)`).
//    ⚠️ El derrame va de forma que quien llame PUEDA ponerle su className.
//    <Dinero cantidad={12} className="precio" />  →  <span class="precio">12.00 €</span>
export function Dinero({}: DineroProps) {
  return <span></span>
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 2 — LA FILA: props DERIVADAS del dominio + callback con argumento
 * ════════════════════════════════════════════════════════════════════════════
 * La fila no necesita el `Pedido` entero para pintar, pero sí necesita el `id`
 * para poder avisar de CUÁL se pulsó. Recorta lo justo (06) y añade lo que es
 * asunto de la UI (09).
 */

// 4) Define y exporta la `interface FilaPedidoProps` que EXTIENDA el recorte de
//    `Pedido` con `id`, `cliente`, `total` y `estado` (usa `Pick` en el
//    `extends`), y añada:
//      · `onVer` función que recibe un number (el id) y no devuelve nada
export interface FilaPedidoProps {}

//    `FilaPedido` — usa `FilaPedidoProps`. Retorna un <tr> con TRES <td>, en
//    este orden:
//      · el `cliente`
//      · un `Dinero` con el `total` y `className="total"`
//      · un `EtiquetaEstado` con el `estado`, y después un <button> con el texto
//        "Ver" que al clic llame a `onVer` con el `id`
//    <FilaPedido id={1} cliente="Ana" total={12} estado="enviado" onVer={ver} />
export function FilaPedido({}: FilaPedidoProps) {
  return <tr></tr>
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 3 — LA LISTA: map + key + estado vacío (exercises 03 y 04)
 * ════════════════════════════════════════════════════════════════════════════ */

// 5) `TablaPedidos` — recibe `pedidos` (Pedido[]) y `onVer` (la misma función
//    del drill 4). Si la lista está vacía, early return de un
//    <p>No hay pedidos</p>. Si no, retorna una <table> con un <tbody> dentro que
//    contenga un `FilaPedido` por pedido (`key` = el id), pasándole sus campos.
//    💡 Aquí `onVer` se entrega PELADO: el id lo mete cada fila, no la tabla.
//    <TablaPedidos pedidos={[]} onVer={ver} />  →  <p>No hay pedidos</p>
export function TablaPedidos({}: {}) {
  return <table></table>
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 4 — EL MARCO: slots (exercise-05)
 * ════════════════════════════════════════════════════════════════════════════
 * `Panel` no sabe NADA de pedidos, y ese es el punto: es un marco reutilizable.
 * Todo lo que pinta se lo dan hecho por props.
 */

// 6) Define y exporta el tipo `PanelProps` con:
//      · `titulo`   string, obligatoria
//      · `acciones` ReactNode, OPCIONAL     ← slot con nombre
//      · `children` ReactNode, obligatoria  ← slot por posición
export type PanelProps = {}

// 7) `Panel` — usa `PanelProps`. Retorna una <section> que contenga:
//      · un <header> con un <h2> con el `titulo` dentro y, SOLO si hay
//        `acciones`, un <div> con `className="acciones"` que las contenga
//      · un <div> con `className="cuerpo"` que contenga el `children`
//    <Panel titulo="Pedidos"><p>Hola</p></Panel>
//      →  <section><header><h2>Pedidos</h2></header>
//          <div class="cuerpo"><p>Hola</p></div></section>
export function Panel({}: PanelProps) {
  return <section></section>
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 5 — EL ESTADO DE LA PETICIÓN: unión discriminada (exercise-08)
 * ════════════════════════════════════════════════════════════════════════════
 * Los datos de una pantalla real no están ahí sin más: se están cargando, o
 * fallaron, o llegaron. Tres estados con equipajes DISTINTOS — el caso de libro
 * de la unión discriminada. Y el que evita el clásico "spinner infinito porque
 * `datos` era `undefined` y nadie lo miró".
 */

// 8) Define y exporta `EstadoCarga` como la unión de estas TRES formas:
//      · { fase: 'cargando' }
//      · { fase: 'error';  mensaje: string }
//      · { fase: 'listo';  pedidos: Pedido[] }
export type EstadoCarga = {}

//    `Contenido` — recibe `estado` (EstadoCarga) y `onVer` (función que recibe
//    un number y no devuelve nada). `switch` sobre `estado.fase`, con guardia
//    `never`:
//      · 'cargando' → <p>Cargando…</p>
//      · 'error'    → <p className="error"> con el `mensaje`
//      · 'listo'    → un `TablaPedidos` con los pedidos y el `onVer`
//    ⚠️ Recibe `estado` como UN objeto para poder interrogarlo: no desestructures
//       la unión en la firma (la trampa nº1 del exercise-08).
export function Contenido({}: {}) {
  return <p></p>
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 6 — LA RAÍZ
 * ════════════════════════════════════════════════════════════════════════════ */

// 9) `resumen` — recibe `pedidos` (Pedido[]) y retorna un `string`. NO hay JSX
//    aquí: es FASE 1 pura, y sigue siendo tu trabajo.
//      · con lista vacía → "Sin pedidos"
//      · si no           → nº de pedidos + " pedidos · " + suma de totales + "€"
//    ⚠️ Anota el tipo de retorno.
//    resumen([])  →  'Sin pedidos'
//    resumen([{…total:10}, {…total:5}])  →  '2 pedidos · 15€'
// eslint-disable-next-line react-refresh/only-export-components -- no es un componente; la regla vigila el hot-reload de Vite y aquí no aplica
export function resumen(pedidos: Pedido[]) {}

// 10) Define y exporta el tipo `PaginaPedidosProps` con:
//       · `titulo`   string
//       · `estado`   EstadoCarga
//       · `onVer`    función que recibe un number y no devuelve nada
//       · `acciones` ReactNode, OPCIONAL
export type PaginaPedidosProps = {}

//     `PaginaPedidos` — usa `PaginaPedidosProps`. Retorna un `Panel` con el
//     `titulo` y las `acciones` que le llegaron y, como children, EN ESTE ORDEN:
//       · un `Contenido` con el estado y el onVer
//       · SOLO si la fase es 'listo', un <footer> con el `resumen` de esos pedidos
//     ⚠️ Ese `solo si` vuelve a necesitar preguntar por el discriminante: el
//        `resumen` necesita los pedidos, y los pedidos solo existen en 'listo'.
//     ⚠️ `acciones` es opcional aquí Y en `PanelProps`. Con
//        `exactOptionalPropertyTypes` (tu tsconfig), pasarla de largo tal cual
//        es lo correcto: `acciones={acciones}`.
//     <PaginaPedidos titulo="Pedidos" estado={{ fase: 'cargando' }} onVer={ver} />
export function PaginaPedidos({}: PaginaPedidosProps) {
  return <section></section>
}
