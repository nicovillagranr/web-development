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
 *   Todos los starters de este archivo están rotos a propósito.
 *   ¿Atascado? Las pistas están en `exercise-04.pistas.md`, de una en una.
 *
 * ⚠️ COMO EN EL 03, EL TEST NO BASTA: un alias mal tallado no rompe la ejecución.
 *    **4 de los 6 starters pasan el test con el fallo dentro**, y no te digo
 *    cuáles. Corre LOS DOS comandos.
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

// 1) `ManejadorDeClic` + `BotonConSello` — el botón "Avisar" de siempre, que avisa
//    con el tipo del evento. Lo nuevo es que el tipo del manejador ya no se escribe
//    en el parámetro: se declara UNA vez ahí arriba como alias, y se le estampa al
//    `const`. Con el alias puesto no anotes la `e` y mira qué pasa.
//    El alias del starter no está tallado sobre lo que hay que nombrar, y por eso
//    todo lo que viene después se cae en cascada. Lee los errores EN ORDEN: cuentan
//    una historia, y los cura un solo cambio.
//    💡 De propina, fíjate en que los mensajes de error ahora dicen
//       `ManejadorDeClic`. Ponerle nombre a un tipo también se lo pone a sus fallos.
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

// 2) `ManejadorDeEnlace` + `EnlaceConSello` — el segundo alias, ahora para un
//    `<a href="/inicio">Ir</a>`, montado igual que el anterior y avisando igual.
//    Alguien talló este sello copiando el de los botones y cambiándole el nombre.
//    Se llama "DeEnlace" y compila tan feliz — el nombre de un alias no comprueba
//    nada, lo que cuenta es lo que hay a la derecha del `=`.
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

// 3) `ManejadorDeTecla` + `CampoConSello` — el tercer alias, el del teclado sobre
//    un `<input>`, montado igual que los dos anteriores: al teclear, `avisar`
//    recibe la tecla pulsada.
//    Este alias está tallado con una pieza de más, así que ya no encaja donde lo
//    vas a estampar. Cuenta lo que pide el alias y lo que da el sitio.
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

// 4) `BotonConSelloDeReact` — el mismo botón del drill 1, pero deja de tallar
//    sellos: React ya trae los suyos y este está en el import de arriba.
//    El starter lo tiene puesto en el sitio equivocado. Lee bien el primero de los
//    dos errores: te está diciendo qué cree TypeScript que es `e`, y con eso solo
//    ya sabes dónde está la etiqueta mal colocada.
export function BotonConSelloDeReact({ avisar }: { avisar: (t: string) => void }) {
  const manejar: MouseEventHandler<HTMLButtonElement> = (e) => avisar(e.type)
  return (
    <button onClick={manejar}>
      Avisar
    </button>
  )
}
<BotonConSelloDeReact avisar={(t) => console.log(t)} />   // "click"

// 5) `CampoConSelloDeReact` — lo mismo sobre el `<input>` que avisa con la tecla,
//    también con el sello de fábrica. Aquí es donde la regla del nombre que acabas
//    de leer se gana el sueldo: dedúcelo tú, no lo busques.
//    Restricción: el alias que necesitas NO está en el import de arriba. Añádelo.
//    Es la primera vez en el bloque que te toca a ti, y saber qué traer es parte
//    del ejercicio.
//    (El `const` del starter ya lleva etiqueta y aun así se cae en la misma
//     cascada que el drill 1: tener etiqueta no basta si no es la que toca.)
export function CampoConSelloDeReact({ avisar }: { avisar: (t: string) => void }) {
  // Importé el manejador de React: `KeyboardEventHandler<HTMLInputElement>` y lo apliqué al drill
  const manejar: KeyboardEventHandler<HTMLInputElement> = (e) => avisar(e.key)
  return (
    <input onKeyDown={manejar} />
  )
}
<CampoConSelloDeReact avisar={(t) => console.log(t)} />   // "a"

// 6) `BarraConSellos` — el cierre. Un `<button>` "Guardar" que avisa "boton:click"
//    y un `<a href="/salir">Salir</a>` que avisa "enlace:click", cada uno con su
//    manejador. El starter intenta apañarse con uno solo para los dos.
//    Restricción, y es lo que se demuestra aquí: usa el sello de React en el botón
//    y TU `ManejadorDeEnlace` del drill 2 en el enlace. Mézclalos a propósito, para
//    comprobar que son intercambiables — los dos son solo nombres de lo mismo.

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

// T1) `doblar` — recibe un número y devuelve el doble.
//    La etiqueta ya está puesta; tú solo escribes el cuerpo.
//    👀 FÍJATE EN LA `n`: en la línea de abajo no pone `n: number` por ningún
//       lado. Y aun así puedes multiplicarla como número. Pregúntate de dónde
//       salió su tipo — la respuesta es el título de la escalera.
//    🔧 El cuerpo devuelve la entrada tal cual, sin doblarla.
//    → doblar(4)   →   8
type Duplicador = (n: number) => number

export const doblar: Duplicador = (n) => n * 2
// console.log(doblar(4))   // 8


// T2) `triplicar` — lo mismo, por tres. Pero aquí NO HAY ETIQUETA:
//    el `const` va desnudo y el tipo se escribe en el parámetro.
//    👀 EL CONTRASTE ES EL EJERCICIO: T1 y T2 hacen el mismo trabajo y los dos
//       están bien tipados. Lo único que cambia es DÓNDE pusiste la información:
//       en la etiqueta del `const` (T1) o en el parámetro (T2). Una de las dos.
//    🔧 El cuerpo devuelve la entrada tal cual.
//    → triplicar(4)   →   12
export const triplicar = (n: number) => n * 3
// console.log(triplicar(4))   // 12


// T3) `gritar` — recibe un texto y lo devuelve en MAYÚSCULAS.
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


// T4) `repetir` — repite un texto tantas veces como diga el número.
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


// T5) `BotonEscalera` — vuelve el evento. Un `<button>` "Pulsa"
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


// T6) `BotonEscaleraDeReact` — el mismo botón, pero sin alias
//    tuyo: con el que trae React, que ya está en el import de arriba.
//    👀 AQUÍ FALTA LA ETIQUETA. Es el único peldaño donde TypeScript se queja, y
//       la queja es justo la prueba de la escalera: sin etiqueta en el `const` y
//       sin anotación en el parámetro, no tiene de dónde deducir la `e`.
//    🔧 El `const` va desnudo. El cuerpo YA ESTÁ BIEN — no lo toques.
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
<BotonEscaleraDeReact avisar={(t) => console.log(t)} />   // "click"
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
