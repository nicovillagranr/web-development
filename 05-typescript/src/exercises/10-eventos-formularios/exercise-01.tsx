/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — los tipos de evento de esta carpeta, todos de la misma casa:
 *
 *     import type { MouseEvent, ChangeEvent, FormEvent, KeyboardEvent } from 'react'
 *
 *   MouseEvent<HTMLButtonElement>    clic (o hover, o doble clic) en un <button>
 *   MouseEvent<HTMLAnchorElement>    lo mismo, pero ocurrido en un <a>
 *   ChangeEvent<HTMLInputElement>    escribir en un <input>        (ejercicio 03)
 *   FormEvent<HTMLFormElement>       enviar un <form>              (ejercicio 05)
 *
 *   El `<...>` NO es decoración: dice SOBRE QUÉ ELEMENTO ocurrió el suceso.
 *   `MouseEvent<HTMLButtonElement>` se lee "evento de ratón en un botón".
 *   Es el mismo mecanismo de `Array<string>` o `Pick<Usuario, 'id'>`: un hueco
 *   que rellenas al usar el tipo.
 *
 * ⚠️ Hay DOS `MouseEvent` en el mundo y NO son el mismo:
 *      · el GLOBAL del navegador → existe siempre, sin importar nada
 *      · el de React             → `import type { MouseEvent } from 'react'`
 *    Si te olvidas del import, TS coge el global y te suelta un error que no
 *    parece tener nada que ver: **TS2315 "Type 'MouseEvent' is not generic"**.
 *    Traducción: "ese MouseEvent no admite `<...>`". Es el aviso de que estás
 *    usando el del DOM donde querías el de React.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 01 — El HANDLER y el tipo del evento
 * =============================================================================
 *
 * 🟢 EL CONCEPTO
 * ----------------------------------------------------------------------------
 * Un handler (o "manejador") es una función que TÚ escribes y ENTREGAS, y que
 * React llama cuando pasa algo. Eso ya lo tienes: es la CAFETERA del
 * 02-funciones y el `onAccion` del 09-react-props/01.
 *
 *     <button onClick={alPulsar}>   ← ENTREGAS la función (React la llamará)
 *     <button onClick={alPulsar()}> ← la EJECUTAS TÚ al pintar (casi siempre un bug)
 *
 * Lo NUEVO de esta carpeta es lo que pasa cuando React la llama: no la llama a
 * secas. La llama con UN argumento, el EVENTO — un objeto con todos los detalles
 * del suceso (qué tipo fue, sobre qué elemento, si había una tecla pulsada...).
 *
 *     onClick={(e) => ...}
 *              └─ esto no lo pones tú al llamar: lo pone React
 *
 * Y ahí aparece la pregunta que ordena TODO este archivo: ¿de qué tipo es `e`?
 *
 *
 * 🎁 LA RESPUESTA CORTA: casi siempre, de ninguno que tengas que escribir
 * ----------------------------------------------------------------------------
 * Cuando escribes la flecha DENTRO del `onClick={...}`, TS ya sabe qué es `e`.
 * Lo sabe porque `onClick` tiene un tipo declarado en `@types/react`, y de ese
 * tipo deduce el del parámetro. Se llama **TIPADO CONTEXTUAL**: el tipo baja
 * desde el sitio donde colocas la función, no desde la función misma.
 *
 *     <button onClick={(e) => console.log(e.type)}>   ✅ `e` ya está tipado, no anotes
 *
 * Pero en cuanto SACAS la función del JSX y la declaras aparte, ese hilo se
 * corta. La función ya no está "dentro" de ningún `onClick`, así que nadie le
 * dice qué recibe — y con `strict` activado, un parámetro sin tipo es un error
 * (**TS7006, "implicitly has an 'any' type"**). Ahí SÍ lo escribes tú:
 *
 *     function alClic(e: MouseEvent<HTMLButtonElement>) { ... }   ✅ anotado a mano
 *
 * 🧠 ANALOGÍA — la ventanilla y el impreso.
 *    Rellenar el handler DENTRO del `onClick` es rellenar el impreso EN LA
 *    VENTANILLA: el mostrador ya tiene su cartel, así que no hace falta que
 *    expliques a qué vienes; el contexto lo dice por ti.
 *    Extraer el handler a una función aparte es rellenar ese mismo impreso EN
 *    CASA: fuera de la ventanilla nadie sabe para qué trámite es, así que tienes
 *    que escribirlo tú arriba del todo. Eso es la anotación de tipo.
 *
 *
 * 🗣️ VOCABULARIO — nombrar las piezas
 * ----------------------------------------------------------------------------
 *   · HANDLER (manejador)  la función que entregas: `alPulsar`.
 *   · EVENTO               el objeto que React le pasa cuando ocurre el suceso.
 *   · `e`                  es el PARÁMETRO del handler (el hueco). El ARGUMENTO
 *                          real lo pone React al llamarlo. No se llama `e` por
 *                          obligación: `evento` o `ev` valen igual.
 *   · DISPARAR             lo que hace el usuario (clic) provoca que React LLAME
 *                          a tu handler. Tu handler no "escucha": lo llaman.
 *
 * ⚠️ El evento de React es SINTÉTICO: no es el evento del navegador, es un
 *    envoltorio de React con la misma forma. El de verdad sigue ahí dentro, en
 *    `e.nativeEvent`. React envuelve para que todos los navegadores se
 *    comporten igual; no reemplaza nada.
 *
 * 🧭 CÓMO LEER EL ERROR QUE MÁS VAS A VER HOY
 * ----------------------------------------------------------------------------
 * Mientras el drill esté sin resolver, el typecheck te va a soltar esto:
 *
 *     TS2322: Type '{ alPulsar: ... }' is not assignable to type 'IntrinsicAttributes'
 *
 * Da miedo y no dice nada... hasta que sabes que `IntrinsicAttributes` es "las
 * props que este componente admite". Si el componente declaró `{}` (ninguna) y
 * el test le pasa `alPulsar`, TS dice: "no me consta que esa prop exista aquí".
 * 👉 Traducción práctica: **te falta declarar el tipo de las props**. El error no
 *    está en el test que las pasa, está en la firma que no las acepta.
 *
 * ▸ EJERCICIO — drills en escalera, del 1 al 10. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-01.test.tsx
 *     pnpm typecheck
 * ===========================================================================*/

/* eslint-disable @typescript-eslint/no-empty-object-type, no-empty-pattern, @typescript-eslint/no-unused-vars --
 * ANDAMIAJE DEL STARTER: los huecos `{}` sin rellenar disparan las dos primeras,
 * y el import de `MouseEvent` está "sin usar" hasta que llegues al drill 4.
 * 🧹 Al cerrar los 10 drills, BORRA estas 5 líneas y corre `pnpm lint`. */

import type { MouseEvent } from 'react'


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 0 — CALENTAMIENTO: entregar ≠ ejecutar
 * ════════════════════════════════════════════════════════════════════════════
 * Sin tipos de evento todavía. Solo para volver a poner el gesto: el handler se
 * entrega PELADO, sin paréntesis. Es tu `onClick={handleClick}` de siempre.
 */

// 1) `BotonSimple` — recibe la prop `alPulsar` (una función sin parámetros que
//    no devuelve nada) y retorna un <button> con el texto "Pulsar" que la
//    entregue a su `onClick`.
//    <BotonSimple alPulsar={avisar} />  →  <button>Pulsar</button>  y al hacer
//    clic, React llama a `avisar`.
export function BotonSimple({}: {}) {
  return null
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 1 — El evento LLEGA SOLO: tipado contextual (aquí NO anotas nada)
 * ════════════════════════════════════════════════════════════════════════════
 * En estos dos drills escribes la flecha dentro del propio `onClick`. Prueba a
 * pasar el ratón por encima de `e` en el editor: verás que TS ya sabe que es un
 * `MouseEvent<HTMLButtonElement>` sin que se lo hayas dicho.
 *
 *     onClick={(e) => alAvisar(e.type)}
 *
 * 👉 Regla del bloque: si TS ya lo sabe, no lo escribas. Anotar de más no es
 *    "más seguro", es ruido que hay que mantener.
 */

// 2) `BotonTipo` — recibe la prop `alAvisar` (una función que recibe un string
//    y no devuelve nada). Retorna un <button> con el texto "Pulsar" cuyo
//    `onClick` sea una flecha que llame a `alAvisar` con el TIPO del evento
//    (`e.type`, que para un clic vale "click").
//    ⚠️ NO anotes `e`. Deja que TS te lo regale.
//    <BotonTipo alAvisar={espia} />  →  al hacer clic, espia("click")
export function BotonTipo({}: {}) {
  return null
}

// 3) `BotonSintetico` — igual que el 2, pero avisa con el tipo del evento
//    NATIVO que viaja dentro del sintético: `e.nativeEvent.type`.
//    Los dos valen "click", y esa es justo la lección: el evento de React
//    envuelve al del navegador, no lo sustituye ni lo cambia.
//    <BotonSintetico alAvisar={espia} />  →  al hacer clic, espia("click")
export function BotonSintetico({}: {}) {
  return null
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 2 — Al SACAR el handler se acaba el regalo: anótalo tú
 * ════════════════════════════════════════════════════════════════════════════
 * Sacar el handler a una función aparte es lo normal en cuanto tiene más de una
 * línea. Y ahí es donde hay que escribir el tipo:
 *
 *     function alClic(e: MouseEvent<HTMLButtonElement>) { ... }
 *                        └─ el evento        └─ el elemento donde ocurrió
 *
 * ⚠️ El `<...>` NO es siempre `HTMLButtonElement`: cambia con la etiqueta que
 *    lleva el `onClick`. En un <a> es `HTMLAnchorElement`, en un <div> es
 *    `HTMLDivElement`. Si te equivocas, TS protesta al entregar el handler
 *    (TS2322), no al escribirlo.
 */

// 4) `BotonExtraido` — mismo comportamiento que el drill 2 (avisa con `e.type`),
//    pero el handler va DECLARADO APARTE dentro del componente, con su tipo
//    anotado a mano, y luego se entrega al `onClick`.
//    Si dejas el parámetro sin tipo, TS7006 te lo recuerda.
//    <BotonExtraido alAvisar={espia} />  →  al hacer clic, espia("click")
export function BotonExtraido({}: {}) {
  return null
}

// 5) `EnlaceSeguro` — un <a href="https://ejemplo.com"> con el texto "Ir" que NO
//    navegue a ninguna parte. Handler extraído y anotado (ojo: aquí el elemento
//    NO es un botón), que haga dos cosas en este orden:
//      · cancelar el comportamiento por defecto del navegador con `e.preventDefault()`
//      · llamar a `alPulsar` pasándole `e.defaultPrevented` (true si se canceló)
//    🧠 `preventDefault` es la frase "no hagas lo que ibas a hacer": en un enlace,
//       navegar; en un formulario, recargar la página (ejercicio 05).
//    <EnlaceSeguro alPulsar={espia} />  →  al hacer clic, espia(true) y sigues en la página
export function EnlaceSeguro({}: {}) {
  return null
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 3 — Ponerle NOMBRE al tipo del handler (y recuperar el regalo)
 * ════════════════════════════════════════════════════════════════════════════
 * `(e: MouseEvent<HTMLButtonElement>) => void` escrito cuatro veces cansa y se
 * desincroniza. Es un tipo función como los de 02-funciones/04 (`type Operacion`,
 * `type Predicado`), así que se le pone nombre igual:
 *
 *     type ManejadorDeClic = (e: MouseEvent<HTMLButtonElement>) => void
 *
 * Y aquí viene lo bonito: hay DOS SITIOS donde puede vivir el tipo, y solo hace
 * falta uno.
 *
 *     const alClic = (e: MouseEvent<HTMLButtonElement>) => {...}   ① en el PARÁMETRO
 *     const alClic: ManejadorDeClic = (e) => {...}                 ② en la CONSTANTE
 *
 * En la ② el `e` vuelve a ir pelado: al declarar de qué tipo es la constante, el
 * contexto reaparece y TS deduce otra vez el parámetro. Volvemos a la ventanilla.
 */

// 6) Define y exporta el tipo `ManejadorDeClic`: una función que recibe un
//    evento de ratón ocurrido en un <button> y no devuelve nada.
export type ManejadorDeClic = () => void

//    `BotonAlias` — mismo comportamiento que el drill 4 (avisa con `e.type`),
//    pero el handler se declara como una CONSTANTE anotada con `ManejadorDeClic`.
//    ⚠️ Aquí el `e` va SIN anotar: el tipo ya está en la constante.
//    <BotonAlias alAvisar={espia} />  →  al hacer clic, espia("click")
export function BotonAlias({}: {}) {
  return null
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 4 — El handler como PROP: quien decide qué pasa es el padre
 * ════════════════════════════════════════════════════════════════════════════
 * Hasta aquí el handler nacía dentro del componente. El patrón real de React es
 * el contrario: el hijo dice "yo tengo un botón", y el padre dice "y cuando lo
 * pulsen, haz ESTO". El hijo recibe el handler como una prop más y lo entrega.
 *
 *     type BotonIconoProps = { icono: string; onPulsar: ManejadorDeClic }
 *
 * Convención: las props que son handlers se llaman `onAlgo`, igual que las
 * nativas. Ya lo hiciste en 09-react-props con `onAccion` y `onVer`.
 */

// 7) Define y exporta el tipo `BotonIconoProps` con:
//      · `icono`    string, obligatoria
//      · `onPulsar` un `ManejadorDeClic` (reusa el alias del 6), obligatoria
export type BotonIconoProps = {}

//    `BotonIcono` — retorna un <button> con el `icono` dentro que entregue
//    `onPulsar` a su `onClick`, PELADO (sin envolverlo en otra flecha: la forma
//    ya encaja).
//    <BotonIcono icono="🗑" onPulsar={espia} />  →  al hacer clic, espia recibe el evento
export function BotonIcono({}: BotonIconoProps) {
  return null
}

// 8) `BotonOpcional` — recibe `texto` (string, obligatoria) y `onPulsar`
//    (`ManejadorDeClic`, OPCIONAL). Retorna un <button> con el texto que entregue
//    `onPulsar` a su `onClick` TAL CUAL.
//    ⚠️ Aquí NO hace falta el `?? () => {}` que pedía el `??` de 09-react-props:
//       mira el tipo de `onClick` en @types/react y verás que ya admite
//       `undefined`. Un componente sin handler es un botón que no hace nada, y
//       eso es legal. Rellenar el hueco con una función vacía sería trabajo falso.
//    <BotonOpcional texto="Nada" />  →  clic sin efecto y sin reventar
export function BotonOpcional({}: {}) {
  return null
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 5 — CAPSTONE
 * ════════════════════════════════════════════════════════════════════════════
 * Nada nuevo: los cinco bloques a la vez. El 9 es el mismo tipo sirviendo a dos
 * eventos distintos; el 10 junta prop-handler + handler extraído + anotación +
 * `preventDefault` + una decisión dentro del handler.
 */

// 9) `BotonDoble` — recibe `onPulsar` y `onDoblePulsar` (los dos
//    `ManejadorDeClic`) y retorna un <button> con el texto "Doble" que entregue
//    el primero a `onClick` y el segundo a `onDoubleClick`.
//    🧠 Fíjate en que el MISMO tipo sirve para los dos: `MouseEvent` no es "el
//       evento del clic", es "un evento de ratón" — clic, doble clic, entrar,
//       salir. Lo que cambia es el hueco `<...>`, no el evento.
//    ⚠️ Un doble clic dispara ANTES dos clics sueltos. No es un bug del test.
export function BotonDoble({}: {}) {
  return null
}

// 10) CAPSTONE. Define y exporta `BotonConfirmarProps` con:
//       · `texto`       string, obligatoria
//       · `onConfirmar` un `ManejadorDeClic`, obligatoria
//       · `bloqueado`   boolean, OPCIONAL
export type BotonConfirmarProps = {}

//     `BotonConfirmar` — retorna un <button> con el `texto`. Su handler va
//     EXTRAÍDO y anotado (no inline), y hace esto:
//       · si `bloqueado` es true  → `e.preventDefault()` y NO llamar a `onConfirmar`
//       · si no                   → llamar a `onConfirmar(e)` pasándole el evento
//     ⚠️ Condiciona la LLAMADA, no la existencia del botón: el <button> se pinta
//        siempre y nunca lleva `disabled`. Es la lección del capstone de
//        09-react-props/10, en versión handler.
//     <BotonConfirmar texto="Ok" onConfirmar={espia} />                  →  clic: espia llamado
//     <BotonConfirmar texto="Ok" onConfirmar={espia} bloqueado={true} /> →  clic: espia NO llamado
export function BotonConfirmar({}: BotonConfirmarProps) {
  return null
}
