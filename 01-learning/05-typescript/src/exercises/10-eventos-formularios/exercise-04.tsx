/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — no confundas las DOS piezas que hay aquí:
 *
 *   MouseEvent<HTMLButtonElement>                 ← el EVENTO. Un objeto.
 *   (e: MouseEvent<HTMLButtonElement>) => void    ← el MANEJADOR. Una función
 *                                                   que recibe ese objeto.
 *
 * Al que le pones nombre en este archivo es al SEGUNDO: la función entera, con su
 * hueco de entrada y su salida.
 *
 * ⚠️ `void` a la derecha de la flecha significa "no devuelve nada". No es un valor
 *    que retornes: es la promesa de que no retornas ninguno.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 04 — ponerle nombre al tipo                      ·  4/10 del bloque
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · declarar un alias de tipo para una FUNCIÓN, no solo para un objeto
 *   · usarlo de forma que el parámetro vuelva a tiparse solo
 *   · reconocer los alias que React ya trae hechos, por su terminación
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * En el 03 escribiste `MouseEvent<HTMLButtonElement>` media docena de veces. Aquí
 * lo escribes UNA y le pones nombre. Y al ponerle nombre pasa algo que no es solo
 * ahorro de tecleo: recuperas el tipado contextual del 02, pero con un contexto
 * que has escrito tú.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 *   TEORÍA 1 · el alias de tipo             →  drills 1, 2, 3
 *   TEORÍA 2 · los alias que trae React     →  drills 4, 5, 6
 *
 * ▸ EJERCICIO — 6 drills en escalera, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-04.test.tsx
 *     pnpm typecheck
 *
 * ⚠️ COMO EN EL 03, EL TEST NO BASTA: un alias mal tallado no rompe la ejecución.
 *    Los starters de los drills 1, 2, 4 y 5 salen VERDES. Corre LOS DOS comandos.
 *
 * 📝 Las traces van comentadas: en `.tsx` escribir `<Componente />` solo fabrica
 *    un objeto que lo describe, no lo ejecuta.
 * ===========================================================================*/

import type { MouseEvent, KeyboardEvent, MouseEventHandler, KeyboardEventHandler } from 'react'


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el ALIAS DE TIPO
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Un alias de tipo le pone un NOMBRE a un tipo que ya existía. No crea nada
 *   nuevo: es un sinónimo, y vale para cualquier tipo — un objeto, una unión, o
 *   una función entera con sus parámetros y su retorno.
 *
 * SINTAXIS
 *     type ManejadorDeClic = (e: MouseEvent<HTMLButtonElement>) => void
 *     └┬─┘ └──── nombre ───┘   └────────── el tipo de siempre ──────────┘
 *      └ la palabra clave
 *
 * EJEMPLO — y aquí está lo que de verdad compras
 *     const manejar: ManejadorDeClic = (e) => console.log(e.type)
 *                    └── el alias ──┘        └ sin anotar, y llega tipada
 *
 *     Fíjate: al poner el alias en el `const`, vuelve a haber CONTEXTO, así que
 *     la `e` se tipa sola otra vez — como en el 02, pero el contexto lo pusiste
 *     tú. El nombre trae dentro todo lo que antes escribías en el paréntesis.
 *
 * 🧠 ANALOGÍA (de apoyo) — el sello de goma. Escribir la misma dirección a mano
 *    en cien sobres es lo que hiciste en el 03. Tallas el sello una vez y lo
 *    estampas; si la dirección cambia, retallas el sello y cambian los cien.
 *    Pero un sello sirve para SU dirección: el de los botones no vale para los
 *    enlaces, por parecidos que se vean.
 *
 * 🗣️ LAS PIEZAS
 *     type            → la palabra clave que declara un alias
 *     ManejadorDeClic → el alias. Desaparece al compilar, como todo lo de tipos
 *     => void         → la parte del alias que dice que no devuelve nada
 *
 * ⚠️ TRAMPA — nombrar la CAJA en vez de a QUIEN LA ABRE:
 *       type M = MouseEvent<HTMLButtonElement>              ← eso nombra el EVENTO
 *       type M = (e: MouseEvent<HTMLButtonElement>) => void ← esto el MANEJADOR
 *    Los dos compilan como declaración; el error salta después, al usarlos.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) `ManejadorDeClic` + `BotonConSello` — QUÉ CONSTRUIR: declara el alias del
//    manejador de clic de un `<button>`, y úsalo poniéndoselo al `const` de
//    `BotonConSello`. Con el alias puesto NO anotes la `e`: llega tipada sola.
//    🔧 STARTER ROTO A PROPÓSITO: el alias nombra el EVENTO en vez del MANEJADOR,
//       y eso desencadena TRES errores en cascada — léelos en orden, cuentan una
//       historia: `TS2322: Type '(e: any) => void' is not assignable to type
//       'ManejadorDeClic'` (le das una función donde el alias dice que va un
//       objeto) → `TS7006: Parameter 'e' implicitly has an 'any' type` (como el
//       alias no es una función, no hay contexto y la `e` se queda sin tipo) →
//       `TS2322: Type 'ManejadorDeClic' is not assignable to type
//       'MouseEventHandler<HTMLButtonElement>'` (y por eso el `onClick` lo rechaza).
//       Los tres se curan con un solo cambio. ⚠️ Test VERDE: solo lo caza typecheck.
//    💡 Fíjate en que el error dice `ManejadorDeClic`, con tu nombre. Ponerle
//       nombre a un tipo también se lo pone a los mensajes de error.
//    📎 el EVENTO:    MouseEvent<HTMLButtonElement>
//       el MANEJADOR: (e: MouseEvent<HTMLButtonElement>) => void
//    → click   →   avisar recibe "click"
export type ManejadorDeClic = (evento: MouseEvent<HTMLButtonElement>) => void

export function BotonConSello({ avisar }: { avisar: (t: string) => void }) {
  const manejar: ManejadorDeClic = (evento) => avisar(evento.type)
  return (
    <button onClick={manejar}>
      Avisar
    </button>
  )
}
<BotonConSello avisar={(t) => console.log(t)} />   // "click"

// 2) `ManejadorDeEnlace` + `EnlaceConSello` — QUÉ CONSTRUIR: el segundo alias, el
//    de los `<a>`, y móntalo igual sobre `<a href="/inicio">Ir</a>`.
//    ⚠️ Aquí se ve por qué un alias no vale para todo: cambia una sola palabra
//       dentro de `<…>` y ya no entra en la misma etiqueta.
//    🔧 STARTER ROTO A PROPÓSITO: talló el alias nuevo copiando el de los botones.
//       `TS2322: Type 'ManejadorDeEnlace' is not assignable to type
//       'MouseEventHandler<HTMLAnchorElement>'`. Ojo a la ironía del mensaje: el
//       alias se LLAMA "DeEnlace" y por dentro dice botón. El nombre no comprueba
//       nada; lo que cuenta es lo que hay a la derecha del `=`.
//       ⚠️ Test VERDE otra vez.
//    📎 <button> → MouseEvent<HTMLButtonElement>
//       <a>      → MouseEvent<HTMLAnchorElement>
//    → click   →   avisar recibe "click"
export type ManejadorDeEnlace = (e: MouseEvent<HTMLAnchorElement>) => void

export function EnlaceConSello({ avisar }: { avisar: (t: string) => void }) {
  const manejar: ManejadorDeEnlace = (e) => avisar(e.type)
  return (
    <a href="/inicio" onClick={manejar}>
      Ir
    </a>
  )
}
<EnlaceConSello avisar={(t) => console.log(t)} />   // "click"

// 3) `ManejadorDeTecla` + `CampoConSello` — QUÉ CONSTRUIR: el tercer alias, el del
//    teclado sobre un `<input>` con `onKeyDown`, montado igual que los dos
//    anteriores. Avisa con `e.key`.
//    ⚠️ El alias tiene que tener los MISMOS huecos que el sitio donde lo estampas.
//    🔧 STARTER ROTO A PROPÓSITO: el alias pide DOS parámetros —el evento y la
//       tecla suelta— y el hueco solo pasa uno. `TS2322: Type 'ManejadorDeTecla'
//       is not assignable to type 'KeyboardEventHandler<HTMLInputElement>'`, y
//       debajo la línea que lo explica: `Target signature provides too few
//       arguments. Expected 2 or more, but got 1`. Y el test sale ROJO además,
//       porque ese segundo parámetro nunca llega: avisa "a-undefined".
//    📎 onKeyDown pasa 1 argumento:  (e)
//       el alias del starter pide 2: (e, tecla)
//    → tecleas "a"   →   avisar recibe "a"
export type ManejadorDeTecla = (e: KeyboardEvent<HTMLInputElement>) => void

export function CampoConSello({ avisar }: { avisar: (t: string) => void }) {
  const manejar: ManejadorDeTecla = (e) => avisar(e.key)
  return (
    <input onKeyDown={manejar} />
  )
}
<CampoConSello avisar={(t) => console.log(t)} />   // "a"


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — los alias que React ya trae tallados
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Los tres alias que acabas de escribir ya existen. React los publica, y son
 *   exactamente eso — alias, no un mecanismo nuevo:
 *
 *       type MouseEventHandler<T> = (event: MouseEvent<T>) => void
 *
 * LA REGLA DEL NOMBRE, que es lo que hay que llevarse
 *     XEvent<T>          →  el EVENTO      (el objeto que llega)
 *     XEventHandler<T>   →  el MANEJADOR   (la función que lo recibe)
 *
 *   La terminación `Handler` es toda la diferencia. Y funciona con la familia
 *   entera: `KeyboardEventHandler<T>`, `ChangeEventHandler<T>`, `FocusEventHandler<T>`…
 *
 * EJEMPLO
 *     const manejar: MouseEventHandler<HTMLButtonElement> = (e) => console.log(e.type)
 *
 *     Es el drill 1, con el alias de fábrica en vez del tuyo. Lo tuyo no estaba
 *     mal: esto es saber que ya existe y cómo se llama.
 *
 * 🗣️ LAS PIEZAS
 *     MouseEventHandler<T> → alias de React para el manejador
 *     T                    → el mismo argumento de tipo de siempre: el elemento
 *
 * ⚠️ TRAMPA — usar el alias del MANEJADOR en el sitio del EVENTO:
 *       const manejar = (e: MouseEventHandler<…>) => …   ❌ eso dice que `e` es
 *                                                           una función
 *       const manejar: MouseEventHandler<…> = (e) => …   ✅ el alias va al `const`
 *    Es la trampa de la TEORÍA 1 otra vez, ahora con el nombre de React.
 * ───────────────────────────────────────────────────────────────────────────── */

// 4) `BotonConSelloDeReact` — QUÉ CONSTRUIR: el mismo botón del drill 1, pero
//    usando el alias que trae React en vez de declarar uno tuyo. Está en el
//    import de arriba.
//    🔧 STARTER ROTO A PROPÓSITO: pone el alias del manejador en el sitio del
//       evento, o sea anotando la `e`. Eso dice que `e` es una función, y por eso
//       `TS2339: Property 'type' does not exist on type
//       'MouseEventHandler<HTMLButtonElement>'` — claro que no: las funciones no
//       tienen `.type`. Y detrás, el segundo: `TS2322: Type '(e:
//       MouseEventHandler<…>) => void' is not assignable to type
//       'MouseEventHandler<…>'`. ⚠️ Test VERDE.
//    📎 ❌ (e: MouseEventHandler<HTMLButtonElement>) => …
//       ✅ const manejar: MouseEventHandler<HTMLButtonElement> = (e) => …
//    → click   →   avisar recibe "click"
export function BotonConSelloDeReact({ avisar }: { avisar: (t: string) => void }) {
  const manejar: MouseEventHandler<HTMLButtonElement> = (e) => avisar(e.type)
  return (
    <button onClick={manejar}>
      Avisar
    </button>
  )
}
<BotonConSelloDeReact avisar={(t) => console.log(t)} />   // "click"

// 5) `CampoConSelloDeReact` — QUÉ CONSTRUIR: lo mismo sobre el `<input>` con
//    `onKeyDown`, con el alias de fábrica del teclado. Aplica la regla del nombre:
//    si el evento es `KeyboardEvent<T>`, el manejador es…
//    ⚠️ ESTE DRILL EXIGE TOCAR EL IMPORT: el alias que necesitas NO está en la
//       línea de import de arriba. Añádelo tú — es la primera vez en el bloque que
//       te toca a ti, y saber qué traer es parte del ejercicio.
//    🔧 STARTER ROTO A PROPÓSITO: se dejó la terminación `Handler`, así que le
//       está diciendo al `const` que es un EVENTO. Mismo trío en cascada que el
//       drill 1: `TS2322: Type '(e: any) => void' is not assignable to type
//       'KeyboardEvent<HTMLInputElement>'` → `TS7006` en la `e` → y el rechazo del
//       hueco. ⚠️ Test VERDE.
//    📎 KeyboardEvent<HTMLInputElement>          ← el objeto que llega
//       KeyboardEventHandler<HTMLInputElement>   ← la función que lo recibe
//    → tecleas "a"   →   avisar recibe "a"
export function CampoConSelloDeReact({ avisar }: { avisar: (t: string) => void }) {
  // Importé el manejador de React: `KeyboardEventHandler<HTMLInputElement>` y lo apliqué al drill
  const manejar: KeyboardEventHandler<HTMLInputElement> = (e) => avisar(e.key)
  return (
    <input onKeyDown={manejar} />
  )
}
<CampoConSelloDeReact avisar={(t) => console.log(t)} />   // "a"

// 6) `BarraConSellos` — QUÉ CONSTRUIR: el cierre. Un `<button>` "Guardar" que
//    avisa "boton:click" y un `<a href="/salir">Salir</a>` que avisa
//    "enlace:click", cada uno con su manejador. Usa el alias de React para el
//    botón y TU `ManejadorDeEnlace` del drill 2 para el enlace — mézclalos a
//    propósito, para ver que son intercambiables: los dos son solo nombres.
//    🔧 STARTER ROTO A PROPÓSITO: escribe un solo manejador y lo cuelga de los
//       dos elementos. `TS2322` en el `<a>`, y el test en ROJO porque al pulsar
//       "Salir" avisa "boton:click".
//    📎 botón:  MouseEventHandler<HTMLButtonElement>   ← el de React
//       enlace: ManejadorDeEnlace                      ← el tuyo, del drill 2
//    → click en Guardar → "boton:click"   ·   click en Salir → "enlace:click"

// Combiné ambos handlers en un solo que proporciona React y los apliqué a ambas etiquetas HTML
export function BarraConSellos({ avisar }: { avisar: (t: string) => void }) {
  const alBoton: MouseEventHandler<HTMLButtonElement> = (e) => avisar(`boton:${e.type}`)
  const alEnlace: MouseEventHandler<HTMLAnchorElement> = (e) => avisar(`enlace:${e.type}`)
  return (
    <>
      <button onClick={alBoton}>Guardar</button>
      <a href="/salir" onClick={alEnlace}>Salir</a>
    </>
  )
}
// <BarraConSellos avisar={(t) => console.log(t)} />

/* =============================================================================
 * 🪜 ESCALERA T — quién le pone el tipo a la `e`
 * =============================================================================
 *
 * Una sola idea, en seis peldaños:
 *
 *     LA ETIQUETA DEL `const` ES LA QUE LE DICE AL PARÁMETRO QUÉ ES.
 *
 * T1–T4 no tienen React, ni eventos, ni JSX: números y textos, para ver la
 * maquinaria desnuda. En T5 y T6 vuelve el evento, y comprobarás que por el
 * camino no había cambiado nada.
 *
 * En todos, el cuerpo viene MAL a propósito. Lo escribes tú.
 * ───────────────────────────────────────────────────────────────────────────── */

// T1) `doblar` — QUÉ CONSTRUIR: recibe un número y devuelve el doble.
//    La etiqueta ya está puesta; tú solo escribes el cuerpo.
//    👀 FÍJATE EN LA `n`: en la línea de abajo no pone `n: number` por ningún
//       lado. Y aun así puedes multiplicarla como número. Pregúntate de dónde
//       salió su tipo — la respuesta es el título de la escalera.
//    🔧 El cuerpo devuelve la entrada tal cual, sin doblarla.
//    → doblar(4)   →   8
type Duplicador = (n: number) => number

export const doblar: Duplicador = (n) => n * 2
// console.log(doblar(4))   // 8


// T2) `triplicar` — QUÉ CONSTRUIR: lo mismo, por tres. Pero aquí NO HAY ETIQUETA:
//    el `const` va desnudo y el tipo se escribe en el parámetro.
//    👀 EL CONTRASTE ES EL EJERCICIO: T1 y T2 hacen el mismo trabajo y los dos
//       están bien tipados. Lo único que cambia es DÓNDE pusiste la información:
//       en la etiqueta del `const` (T1) o en el parámetro (T2). Una de las dos.
//    🔧 El cuerpo devuelve la entrada tal cual.
//    → triplicar(4)   →   12
export const triplicar = (n: number) => n * 3
// console.log(triplicar(4))   // 12


// T3) `gritar` — QUÉ CONSTRUIR: recibe un texto y lo devuelve en MAYÚSCULAS.
//    Etiqueta puesta, como en T1.
//    📌 type Transformador = (t: string) => string
//    👀 La `t` va desnuda otra vez, y aun así `.toUpperCase()` te autocompleta al
//       escribir el punto. Eso solo ocurre si TypeScript ya sabe que es un
//       string. ¿Quién se lo dijo, si tú no lo escribiste?
//    🔧 El cuerpo devuelve el texto sin tocar.
//    → gritar("hola")   →   "HOLA"
type Transformador = (t: string) => string

export const gritar: Transformador = (t) => t.toUpperCase()
// console.log(gritar("hola"))   // "HOLA"


// T4) `repetir` — QUÉ CONSTRUIR: repite un texto tantas veces como diga el número.
//    Dos parámetros, los dos desnudos.
//    📌 type Repetidor = (t: string, veces: number) => string
//    👀 La etiqueta no tipa solo el primero: tipa TODOS, y por POSICIÓN. El primer
//       hueco del alias cae en `t`, el segundo en `veces`. Los nombres que les
//       pongas abajo dan igual — podrías llamarlos `a` y `b` y funcionaría igual.
//       Lo que manda es el orden.
//    🔧 El cuerpo los pega en vez de repetir: sale "ab3".
//    → repetir("ab", 3)   →   "ababab"

// El type Repetidor es una función. Esta recibe un string y un número y retorna un string
type Repetidor = (t: string, veces: number) => string

// Repetir es una variable que llama a la Función Repetidor
export const repetir: Repetidor = (t, veces) => t.repeat(veces)
// console.log(repetir("ab", 3))   // "ababab"


// T5) `BotonEscalera` — QUÉ CONSTRUIR: vuelve el evento. Un `<button>` "Pulsa"
//    cuyo manejador avisa con el TIPO del suceso.
//    📌 type AlPulsar = (e: MouseEvent<HTMLButtonElement>) => void
//    👀 La `e` va desnuda, exactamente igual que la `n` de T1. Mismo mecanismo,
//       solo que lo que llega ahora es un objeto evento en vez de un número.
//       Si entendiste T1, esto ya lo sabes.
//    🔧 El cuerpo entrega la CAJA entera en vez de sacarle el campo: avisa
//       "[object Object]". Es tu trampa vieja de `e` contra `e.type`.
//    → click   →   avisar recibe "click"

// AlPulsar es un alias de tipo
type AlPulsar = (e: MouseEvent<HTMLButtonElement>) => void

export function BotonEscalera({ avisar }: { avisar: (t: string) => void }) {
  const alPulsar: AlPulsar = (e) => avisar(`${e.type}`)
  return (
    <button onClick={alPulsar}>
      Pulsa
    </button>
  )
}
// <BotonEscalera avisar={(t) => console.log(t)} />   // "click"


// T6) `BotonEscaleraDeReact` — QUÉ CONSTRUIR: el mismo botón, pero sin alias
//    tuyo: con el que trae React, que ya está en el import de arriba.
//    👀 AQUÍ FALTA LA ETIQUETA. Es el único peldaño donde TypeScript se queja, y
//       la queja es justo la prueba de la escalera: sin etiqueta en el `const` y
//       sin anotación en el parámetro, no tiene de dónde deducir la `e`.
//    🔧 El `const` va desnudo:
//       `TS7006: Parameter 'e' implicitly has an 'any' type.`
//       El cuerpo YA ESTÁ BIEN — no lo toques. Se cura poniendo la etiqueta.
//       ⚠️ Y el test sale VERDE: en ejecución la `e` es el evento de verdad.
//          Este peldaño solo lo caza `pnpm typecheck`.
//    → click   →   avisar recibe "click"

export function BotonEscaleraDeReact({ avisar }: { avisar: (t: string) => void }) {
  const alPulsar: MouseEventHandler<HTMLButtonElement> = (e) => avisar(e.type)
  return (
    <button onClick={alPulsar}>
      Pulsa
    </button>
  )
}
// <BotonEscaleraDeReact avisar={(t) => console.log(t)} />   // "click"
/* ─────────────────────────────────────────────────────────────────────────────
 * 🗣️ DILO EN VOZ ALTA antes de pasar al 05 — sin mirar arriba:
 *   · En `const f: Alias = (x) => …`, ¿qué describe `Alias`?
 *   · En `const f = (x: Tipo) => …`, ¿qué describe `Tipo`?
 *   · ¿Por qué no hace falta escribir los dos?
 * ───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 6 estén en verde: hasta aquí el manejador siempre nacía DENTRO del
 * componente que lo usa. En el 05 deja de nacer ahí y llega por props — y el
 * alias que acabas de aprender es justo lo que se pone en la prop.
 * ───────────────────────────────────────────────────────────────────────────── */
