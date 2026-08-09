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

import type { MouseEvent, KeyboardEvent, MouseEventHandler } from 'react'


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
export type ManejadorDeEnlace = (e: MouseEvent<HTMLButtonElement>) => void

export function EnlaceConSello({ avisar }: { avisar: (t: string) => void }) {
  const manejar: ManejadorDeEnlace = (e) => avisar(e.type)
  return <a href="/inicio" onClick={manejar}>Ir</a>
}
// <EnlaceConSello avisar={(t) => console.log(t)} />   // "click"

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
export type ManejadorDeTecla = (e: KeyboardEvent<HTMLInputElement>, tecla: string) => void

export function CampoConSello({ avisar }: { avisar: (t: string) => void }) {
  const manejar: ManejadorDeTecla = (e, tecla) => avisar(`${e.key}-${tecla}`)
  return <input onKeyDown={manejar} />
}
// <CampoConSello avisar={(t) => console.log(t)} />   // "a"


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
  const manejar = (e: MouseEventHandler<HTMLButtonElement>) => avisar(e.type)
  return <button onClick={manejar}>Avisar</button>
}
// <BotonConSelloDeReact avisar={(t) => console.log(t)} />   // "click"

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
  const manejar: KeyboardEvent<HTMLInputElement> = (e) => avisar(e.key)
  return <input onKeyDown={manejar} />
}
// <CampoConSelloDeReact avisar={(t) => console.log(t)} />   // "a"

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
export function BarraConSellos({ avisar }: { avisar: (t: string) => void }) {
  const alBoton: MouseEventHandler<HTMLButtonElement> = (e) => avisar(`boton:${e.type}`)
  return (
    <>
      <button onClick={alBoton}>Guardar</button>
      <a href="/salir" onClick={alBoton}>Salir</a>
    </>
  )
}
// <BarraConSellos avisar={(t) => console.log(t)} />

/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 6 estén en verde: hasta aquí el manejador siempre nacía DENTRO del
 * componente que lo usa. En el 05 deja de nacer ahí y llega por props — y el
 * alias que acabas de aprender es justo lo que se pone en la prop.
 * ───────────────────────────────────────────────────────────────────────────── */
