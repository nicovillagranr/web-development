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
 *   Todos los starters de este archivo están rotos a propósito.
 *   ¿Atascado? Las pistas están en `exercise-03.pistas.md`, de una en una.
 *
 * ⚠️ AQUÍ EL TEST DEJA DE BASTAR, Y ES EL TEMA DEL ARCHIVO. Un cartel mal puesto
 *    no rompe nada al ejecutar: **4 de los 6 starters pasan el test con el fallo
 *    dentro** y solo los caza `pnpm typecheck`. No te digo cuáles. Corre los dos
 *    comandos siempre, y no des por bueno un verde que no hayas comprobado.
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
 *   así que el parámetro se queda sin tipo y TS protesta de que es "implícitamente
 *   `any`". La solución es la ANOTACIÓN DE TIPO: escribir tú, a mano, lo que el
 *   hueco decía por ti.
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
 * 📐 Y OJO A LA FRONTERA, que es más fina de lo que parece: lo que decide si hay
 *    contexto no es dónde estás en el archivo, es si estás DENTRO del hueco. Una
 *    función escrita ahí mismo sigue teniendo su `e` tipada sola —eso era el 02—
 *    aunque el archivo entero vaya de anotar. Anotas lo que vive fuera; dentro, no.
 *
 * ⚠️ TRAMPA — los DOS HOMÓNIMOS. `MouseEvent` y `KeyboardEvent` existen dos veces:
 *    el del navegador (global, siempre disponible, NO admite `<…>`) y el de React
 *    (hay que importarlo). Si te olvidas del import, TS coge el global y te dice
 *    `TS2315: Type 'KeyboardEvent' is not generic`. Ese mensaje admite dos
 *    lecturas —"quita los `<…>`" y "coge el otro tipo"— y **solo una arregla**.
 *    Regla de la casa: si no entiendes por qué se fue un error, no se fue.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) `BotonFuera` — un `<button>` "Avisar" cuyo manejador ya no vive dentro del
//    hueco: está sacado a un `const` en el cuerpo del componente. Ahí fuera nadie
//    le dice a TypeScript qué recibe, y eso es lo que tienes que arreglar.
//    Al pulsar, `avisar` recibe el tipo del evento.
export function BotonFuera({ avisar }: { avisar: (t: string) => void }) {
  const manejar = (e: MouseEvent<HTMLButtonElement>) => avisar(e.type)
  return (
    <button onClick={manejar}>
      Avisar
    </button>
  )
}
// <BotonFuera avisar={(t) => console.log(t)} />   // "click"

// 2) `EnlaceFuera` — lo mismo que el 1, pero sobre un `<a href="/inicio">Ir</a>`.
//    Alguien copió el manejador del botón y lo pegó aquí tal cual. Funciona al
//    ejecutarlo, y aun así hay algo que ya no es verdad: un `<a>` no es un
//    `<button>`. Al pulsar, `avisar` recibe el tipo del evento.
export function EnlaceFuera({ avisar }: { avisar: (t: string) => void }) {
  const manejar = (e: MouseEvent<HTMLAnchorElement>) => avisar(e.type)
  return (
    <a href="/inicio" onClick={manejar}>
      Ir
    </a>
  )
}
// <EnlaceFuera avisar={(t) => console.log(t)} />   // "click"

// 3) `CampoFuera` — hasta ahora los manejadores respondían a clics. Este responde
//    a TECLAS, sobre un `<input>`, y tiene que contarle a `avisar` qué tecla se
//    pulsó. El manejador sigue viviendo fuera del JSX y anotado, como los dos
//    anteriores.
//    Restricción: el evento de teclado no es el mismo tipo que el del ratón, y
//    también viene de 'react' — puede que tengas que tocar el import de arriba.
export function CampoFuera({ avisar }: { avisar: (t: string) => void }) {
  const manejar = (e: KeyboardEvent<HTMLInputElement>) => avisar(e.key)
  return (
    <input onKeyDown={manejar} />
  )
}
// <CampoFuera avisar={(t) => console.log(t)} />   // "a"


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

// 4) `BotonFueraConId` — el manejador de fuera ya no se apaña solo con el evento:
//    necesita también el `id` que llega por props, porque tiene que avisar con las
//    dos cosas juntas, separadas por dos puntos — con `id="guardar"`, un clic
//    manda "guardar:click". El hueco, en cambio, sigue pasando lo de siempre.
//    Apáñatelas para que al manejador le lleguen las dos.
//    (El `id={id}` del `<button>` ya está puesto y no es parte del ejercicio.)
export function BotonFueraConId({ id, avisar }: { id: string; avisar: (t: string) => void }) {
  const manejar = (e: MouseEvent<HTMLButtonElement>, idBoton: string) => avisar(`${idBoton}:${e.type}`)
  return (
    <button id={id} onClick={(e) => manejar(e, id)}>
      Avisar
    </button>
  )
}
// <BotonFueraConId id="guardar" avisar={(t) => console.log(t)} />   // "guardar:click"

// 5) `CampoLeeValor` — este es el primero que sirve para algo de verdad: un
//    `<input>` que, en vez del nombre de la tecla, le pasa a `avisar` lo que hay
//    ESCRITO en el campo entero. Escribes "hola" y `avisar` recibe "hola".
//    El manejador va fuera y anotado, como siempre. Léelo del elemento que tiene
//    puesto el manejador, no de otro sitio — y aquí es donde la trampa de arriba
//    deja de ser teoría.
//    Restricción: el hueco es `onKeyUp`, no `onKeyDown`, y no es capricho — al
//    bajar la tecla todavía no ha entrado en el campo y el valor iría por detrás.
export function CampoLeeValor({ avisar }: { avisar: (t: string) => void }) {
  const manejar = (e: KeyboardEvent<HTMLInputElement>) => avisar(e.currentTarget.value)
  return (
    <input onKeyUp={manejar} />
  )
}
// <CampoLeeValor avisar={(t) => console.log(t)} />   // "hola"

// 6) `BarraFuera` — el cierre: dos elementos distintos en el mismo componente, un
//    `<button>` "Guardar" y un `<a href="/salir">Salir</a>`, y cada uno tiene que
//    avisar de quién fue el clic — "boton:click" y "enlace:click" respectivamente.
//    El starter intenta salir del paso con un manejador para los dos. No cuela.
export function BarraFuera({ avisar }: { avisar: (t: string) => void }) {
  const alBoton = (e: MouseEvent<HTMLButtonElement>) => avisar(`boton:${e.type}`)
  const alEnlace = (e: MouseEvent<HTMLAnchorElement>) => avisar(`enlace:${e.type}`)
  return (
    <>
      <button onClick={alBoton}>Guardar</button>
      <a href="/salir" onClick={alEnlace}>Salir</a>
    </>
  )
}
// <BarraFuera avisar={(t) => console.log(t)} />   // ← te falta la traza: ¿qué dos strings salen?

/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 6 estén en verde —los dos comandos, no solo el test— llevarás
 * escrito `MouseEvent<HTMLButtonElement>` media docena de veces. En el 04 lo
 * escribes UNA y le pones nombre.
 * ───────────────────────────────────────────────────────────────────────────── */
