/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — el mismo manejador, en los dos sitios:
 *
 *   DENTRO del hueco          <button onClick={(e) => …}>
 *     el tipo lo pone React. No anotas nada.          ← esto era el 02
 *
 *   FUERA del hueco           const manejar = (e: MouseEvent<HTMLButtonElement>) => …
 *     no hay contexto. El tipo lo escribes TÚ.        ← esto es este archivo
 *
 * ⚠️ Y para escribirlo hay que traerlo:
 *       import type { MouseEvent, KeyboardEvent } from 'react'
 *    Sin ese import, `MouseEvent` es OTRO tipo distinto — el del navegador.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 03 — el manejador fuera del hueco                ·  3/10 del bloque
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · anotar el parámetro de un manejador que vive fuera del JSX
 *   · elegir el argumento de tipo según la etiqueta donde lo vas a colgar
 *   · saber que ese tipo se IMPORTA de react, y por qué existen dos con el mismo
 *     nombre
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * En el 02 todo cabía dentro del hueco. En cuanto un manejador crece, o lo usan
 * dos elementos, o quieres testearlo aparte, lo sacas a un `const` — y ahí se
 * acaba el regalo: fuera del hueco nadie sabe qué recibe tu función, así que se
 * lo tienes que decir tú. Este archivo es aprender a escribir ese cartel.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 *   TEORÍA 1 · fuera no hay contexto: anotas e importas   →  drills 1, 2, 3
 *   TEORÍA 2 · el argumento de tipo dice sobre QUÉ        →  drills 4, 5, 6
 *
 * ▸ EJERCICIO — 6 drills en escalera, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-03.test.tsx
 *     pnpm typecheck
 *
 * ⚠️ AQUÍ EL TEST DEJA DE BASTAR, Y ES EL TEMA DEL ARCHIVO. Un cartel mal puesto
 *    no rompe nada al ejecutar: los starters de los drills 1, 2, 3 y 5 salen
 *    VERDES en el test y solo los caza `pnpm typecheck`. Corre LOS DOS comandos.
 *
 * 📝 LAS TRACES DE ESTE ARCHIVO VAN COMENTADAS, Y NO ES UNA MANÍA. En el 01, que
 *    era `.ts`, descomentar una trace la ejecutaba. Aquí no: escribir
 *    `<BotonFuera avisar={…} />` solo fabrica un objeto que DESCRIBE el elemento —
 *    el componente no se llama, así que no imprime nada. Y ni `lint` ni `typecheck`
 *    protestan, porque no está mal escrito: simplemente no hace nada.
 *    Es `avisar` vs `avisar()` un piso más arriba:
 *        <Boton />  es la receta   ·   renderizar es cocinar
 *    Lo único que ejecuta de verdad estos componentes es el test.
 * ===========================================================================*/

import type { MouseEvent, KeyboardEvent } from 'react'


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — fuera del hueco no hay contexto
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   El tipado contextual del 02 solo funciona DENTRO del hueco. Un `const` en el
 *   cuerpo del componente no está en ningún hueco: nadie le dice a TS qué recibe,
 *   así que el parámetro se queda sin tipo y salta `TS7006: Parameter 'e'
 *   implicitly has an 'any' type`. La solución es la ANOTACIÓN DE TIPO: escribir
 *   tú lo que el hueco decía por ti.
 *
 * SINTAXIS — y el import es parte de la sintaxis, no un detalle
 *     import type { MouseEvent } from 'react'
 *
 *     const manejar = (e: MouseEvent<HTMLButtonElement>) => console.log(e.type)
 *                         └──────── la anotación ────────┘
 *     <button onClick={manejar}>Avisar</button>
 *
 * 🧠 ANALOGÍA (de apoyo) — la ventanilla. Rellenas el impreso EN la ventanilla y
 *    nadie te pregunta de qué trámite va: el mostrador ya tiene el cartel puesto.
 *    Rellénalo EN CASA y tienes que escribir arriba a qué ventanilla va — y tiene
 *    que coincidir, o te lo devuelven.
 *
 * 🗣️ LAS PIEZAS
 *     import type   → trae un TIPO, no un valor. Desaparece al compilar
 *     MouseEvent<…> → el tipo del evento de ratón de React
 *     e: MouseEvent<…>  → la anotación de tipo del parámetro
 *
 * ⚠️ TRAMPA — los DOS HOMÓNIMOS. `MouseEvent` y `KeyboardEvent` existen dos veces:
 *    el del navegador (global, siempre disponible, NO admite `<…>`) y el de React
 *    (hay que importarlo). Si te olvidas del import, TS coge el global y te dice
 *    `TS2315: Type 'KeyboardEvent' is not generic`. Ese mensaje admite dos
 *    lecturas —"quita los `<…>`" y "coge el otro tipo"— y **solo una arregla**.
 *    Regla de la casa: si no entiendes por qué se fue un error, no se fue.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) `BotonFuera` — QUÉ CONSTRUIR: saca el manejador a un `const` dentro del
//    componente, anótalo, y entrégalo al hueco `onClick` de un `<button>`
//    "Avisar". El manejador le pasa `e.type` a `avisar`.
//    🔧 STARTER ROTO A PROPÓSITO: el manejador ya está fuera, pero sin anotar.
//       `TS7006: Parameter 'e' implicitly has an 'any' type.`
//       ⚠️ El test de este drill sale VERDE con el starter tal cual: sin tipo
//       funciona igual al ejecutar. Este fallo solo lo caza `pnpm typecheck`.
//    📎 import type { MouseEvent } from 'react'   ← ya está arriba
//       e: MouseEvent<HTMLButtonElement>          ← lo que hay que escribir
//    → click   →   avisar recibe "click"
export function BotonFuera({ avisar }: { avisar: (t: string) => void }) {
  const manejar = (e: MouseEvent<HTMLButtonElement>) => avisar(e.type)
  return (
    <button onClick={manejar}>
      Avisar
    </button>
  )
}
<BotonFuera avisar={(t) => console.log(t)} />   // "click"

// 2) `EnlaceFuera` — QUÉ CONSTRUIR: lo mismo sobre un `<a href="/inicio">Ir</a>`.
//    El manejador va fuera y anotado, pero el argumento de tipo YA NO es el del
//    botón: un `<a>` es otro elemento del DOM y tiene su propio nombre.
//    🔧 STARTER ROTO A PROPÓSITO: copió el cartel del botón. `TS2322: Type
//       '(e: MouseEvent<HTMLButtonElement>) => void' is not assignable to type
//       'MouseEventHandler<HTMLAnchorElement>'`. Lee el final de la línea: te
//       está diciendo qué esperaba esa etiqueta.
//       ⚠️ Otro que sale VERDE en el test. Solo lo caza `typecheck`.
//    📎 <button> → HTMLButtonElement
//       <a>      → HTMLAnchorElement
//    → click   →   avisar recibe "click"
export function EnlaceFuera({ avisar }: { avisar: (t: string) => void }) {
  const manejar = (e: MouseEvent<HTMLAnchorElement>) => avisar(e.type)
  return (
    <a href="/inicio" onClick={manejar}>
      Ir
    </a>
  )
}
<EnlaceFuera avisar={(t) => console.log(t)} />   // "click"

// 3) `CampoFuera` — QUÉ CONSTRUIR: un `<input>` con `onKeyDown`, y el manejador
//    fuera. Le pasa `e.key` a `avisar`.
//    ⚠️ ESTE DRILL EXIGE TOCAR EL IMPORT: el evento de teclado no es `MouseEvent`,
//       se llama `KeyboardEvent`, y también hay que traerlo de `'react'`. Está ya
//       en la línea de import de arriba — pero si no estuviera, ese sería el
//       primer paso, no el último.
//    🔧 STARTER ROTO A PROPÓSITO: trae el cartel del ratón a un evento de teclado,
//       y por eso da DOS errores que dicen lo mismo desde los dos lados:
//       `TS2339: Property 'key' does not exist on type 'MouseEvent<…>'` (dentro:
//       en ese molde no hay teclas) y `TS2322 … '(e: MouseEvent<HTMLInputElement>)
//       => void' is not assignable to type 'KeyboardEventHandler<HTMLInputElement>'`
//       (fuera: el hueco esperaba otra cosa). Se curan los dos con un solo cambio.
//       ⚠️ Y otra vez VERDE en el test.
//    📎 onClick   → MouseEvent<HTMLInputElement>      → sin `key`
//       onKeyDown → KeyboardEvent<HTMLInputElement>   → con `key`
//    → tecleas "a"   →   avisar recibe "a"
export function CampoFuera({ avisar }: { avisar: (t: string) => void }) {
  const manejar = (e: KeyboardEvent<HTMLInputElement>) => avisar(e.key)
  return (
    <input onKeyDown={manejar} />
  )
}
<CampoFuera avisar={(t) => console.log(t)} />   // "a"


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — el argumento de tipo dice sobre QUÉ elemento
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   `MouseEvent<T>` es genérico, y esa `T` no es decoración: es el elemento donde
 *   cuelga el manejador. De ella sale el tipo de `e.currentTarget`, o sea lo que
 *   el editor te deja pedirle al elemento que disparó el evento. Rellenarla no es
 *   burocracia: es lo que hace que `.value` exista o no.
 *
 * SINTAXIS
 *     KeyboardEvent<HTMLInputElement>   →  e.currentTarget es un <input> …
 *     e.currentTarget.value             →  …y por eso `.value` existe
 *
 * 🗣️ LAS PIEZAS
 *     T (el argumento de tipo) → el elemento donde cuelga el manejador
 *     e.currentTarget          → el elemento que tiene puesto el manejador
 *
 * ⚠️ TRAMPA — LA PEOR DEL ARCHIVO, porque no la caza NINGÚN comando. La firma
 *    real es `interface KeyboardEvent<T = Element>`: ese `= Element` es un valor
 *    POR DEFECTO. Si escribes `KeyboardEvent` a secas, el hueco no se queda vacío
 *    —se rellena solo con `Element`— y el manejador sigue encajando en el `<input>`
 *    (quien acepta cualquier elemento cabe donde piden uno concreto). Resultado:
 *    typecheck en 0, test en verde, y el cartel a medias.
 *    Cómo destaparla, y esto lo puedes hacer TÚ ahora mismo: pídele
 *    `e.currentTarget.value`. Sobre `Element` no existe. Eso es lo que compras
 *    rellenando el hueco: que el editor sepa qué hay al otro lado.
 * ───────────────────────────────────────────────────────────────────────────── */

// 4) `BotonFueraConId` — QUÉ CONSTRUIR: el manejador de fuera necesita DOS cosas,
//    el evento y el `id` que llega por props, así que declara los dos parámetros.
//    Como el hueco solo pasa el evento, no puedes entregarlo pelado: envuélvelo
//    EN el hueco. Avisa con "guardar:click".
//    ⚠️ Dentro del hueco sigue habiendo tipado contextual; fuera no. Por eso el
//       `const` va anotado y el envoltorio del hueco no.
//    🔧 STARTER ROTO A PROPÓSITO: lo entrega pelado. `TS2322 … Target signature
//       provides too few arguments. Expected 2 or more, but got 1`. Y el test lo
//       caza además en rojo, porque el `id` nunca llega.
//    📎 onClick pasa 1 argumento:  (e)
//       manejar pide 2:            (e, id)
//    (el `id={id}` del `<button>` ya está puesto y no es parte del ejercicio:
//     está para que el elemento lleve su propio id, como en cualquier página)
//    → click con id="guardar"   →   avisar recibe "guardar:click"
export function BotonFueraConId({ id, avisar }: { id: string; avisar: (t: string) => void }) {
  const manejar = (e: MouseEvent<HTMLButtonElement>, idBoton: string) => avisar(`${idBoton}:${e.type}`)
  return (
    <button id={id} onClick={(e) => manejar(e, id)}>
      Avisar
    </button>
  )
}
<BotonFueraConId id="guardar" avisar={(t) => console.log(t)} />   // "guardar:click"

// 5) `CampoLeeValor` — QUÉ CONSTRUIR: un `<input>` cuyo manejador, fuera y
//    anotado, le pase a `avisar` lo que hay ESCRITO en el campo:
//    `e.currentTarget.value`.
//    ⚠️ El hueco aquí es `onKeyUp`, no `onKeyDown`, y no es capricho: en el
//       `keyDown` la tecla todavía NO ha entrado en el campo, así que el valor
//       iría siempre una letra por detrás. Al soltar ya está dentro.
//    🔧 STARTER ROTO A PROPÓSITO: escribe `KeyboardEvent` sin el argumento de
//       tipo, y ahí se rellena solo con `Element`. `TS2339: Property 'value' does
//       not exist on type 'EventTarget & Element'`. Es la trampa de arriba, en
//       vivo: sin ese hueco relleno, el editor no sabe que al otro lado hay un
//       `<input>`. ⚠️ El test sale VERDE — al ejecutar el `.value` está ahí.
//    📎 KeyboardEvent                        → currentTarget: Element   (sin .value)
//       KeyboardEvent<HTMLInputElement>      → currentTarget: <input>   (con .value)
//    → escribes "hola" y pulsas una tecla   →   avisar recibe "hola"
export function CampoLeeValor({ avisar }: { avisar: (t: string) => void }) {
  const manejar = (e: KeyboardEvent<HTMLInputElement>) => avisar(e.currentTarget.value)
  return (
    <input onKeyUp={manejar} />
  )
}
<CampoLeeValor avisar={(t) => console.log(t)} />   // "hola"

// 6) `BarraFuera` — QUÉ CONSTRUIR: el cierre. Dos elementos en el mismo
//    componente, cada uno con SU manejador fuera y SU cartel: un `<button>` con
//    texto "Guardar" que avisa "boton:click", y un `<a href="/salir">Salir</a>`
//    que avisa "enlace:click".
//    🔧 STARTER ROTO A PROPÓSITO: escribe un solo manejador y lo cuelga de los
//       dos. `TS2322` en el `<a>`, porque el cartel dice `HTMLButtonElement`; y el
//       test en rojo, porque al pulsar "Salir" avisa "boton:click".
//    📎 <button> → MouseEvent<HTMLButtonElement>
//       <a>      → MouseEvent<HTMLAnchorElement>
//    → click en Guardar → "boton:click"   ·   click en Salir → "enlace:click"
export function BarraFuera({ avisar }: { avisar: (t: string) => void }) {
  const alBoton = (e: MouseEvent<HTMLButtonElement>) => avisar(`Boton:${e.type}`)
  const alEnlace = (e: MouseEvent<HTMLAnchorElement>) => avisar(`Enlace:${e.type}`)
  return (
    <>
      <button onClick={alBoton}>Guardar</button>
      <a href="/salir" onClick={alEnlace}>Salir</a>
    </>
  )
}
<BarraFuera avisar={(t) => console.log(t)} />

/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 6 estén en verde —los dos comandos, no solo el test— llevarás
 * escrito `MouseEvent<HTMLButtonElement>` media docena de veces. En el 04 lo
 * escribes UNA y le pones nombre.
 * ───────────────────────────────────────────────────────────────────────────── */
