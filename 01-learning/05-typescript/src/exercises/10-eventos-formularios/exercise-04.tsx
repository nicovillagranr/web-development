/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — no confundas las dos piezas del 03:
 *
 *     MouseEvent<HTMLButtonElement>                 ← el EVENTO (la caja)
 *     (e: MouseEvent<HTMLButtonElement>) => void    ← el MANEJADOR (quien la abre)
 *
 * Al que le pones nombre aquí es al de abajo: la función entera, con su hueco de
 * entrada y su salida. Un `type` no es más que un nombre corto para algo largo:
 *
 *     type ManejadorDeClic = (e: MouseEvent<HTMLButtonElement>) => void
 *
 * ⚠️ `void` a la derecha de la flecha significa "no devuelve nada". No es un
 *    valor que retornes: es la promesa de que no retornas ninguno.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 04 — ponerle nombre al tipo
 * =============================================================================
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * En el 03 escribiste `MouseEvent<HTMLButtonElement>` cinco veces. Aquí lo
 * escribes UNA y le pones nombre. Y con el nombre puesto pasa lo interesante: el
 * manejador deja de nacer dentro del componente y empieza a llegar por props.
 *
 *
 * 🧠 ANALOGÍA — el sello de goma
 * ----------------------------------------------------------------------------
 * Escribir la misma dirección a mano en cien sobres es lo que hiciste en el 03.
 * Tallas el sello una vez y lo estampas: si la dirección cambia, retallas el
 * sello y cambian los cien sobres. Pero un sello sirve para SU dirección — el de
 * los botones no vale para los enlaces, por muy parecidos que se vean.
 *
 *
 * ▸ UN EJEMPLO
 * ----------------------------------------------------------------------------
 *     type ManejadorDeClic = (e: MouseEvent<HTMLButtonElement>) => void
 *
 *     const manejar: ManejadorDeClic = (e) => console.log(e.type)
 *
 *     Fíjate: con el sello puesto en el `const`, la `e` vuelve a llegar tipada
 *     sola. El nombre trae dentro lo que antes escribías en el paréntesis.
 *
 *
 * 🗣️ CÓMO SE LLAMA ESTO
 * ----------------------------------------------------------------------------
 *   · ALIAS DE TIPO → un nombre propio para un tipo que ya existía
 *
 *
 * ▸ EJERCICIO — 6 drills en escalera, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-04.test.tsx
 *
 * ⚠️ COMO EN EL 03, LOS TESTS NO BASTAN: los sellos son tipos, y un tipo mal
 *    tallado no rompe la ejecución. Los drills 1, 3, 4 y 5 salen VERDES con el
 *    starter tal cual. `pnpm typecheck` arranca con 11 errores. Corre los dos.
 *
 * 📝 Trazado en .tsx = ejemplo de uso comentado con `//`.
 * ===========================================================================*/

import type { MouseEvent, KeyboardEvent, MouseEventHandler } from 'react'

// 1) `ManejadorDeClic` — talla el sello. Es el tipo de una FUNCIÓN que recibe el
//    evento de clic de un `<button>` y no devuelve nada. Úsalo en `BotonConSello`
//    poniéndoselo al `const`, y verás que ya no hace falta anotar la `e`.
//    👉 El starter nombró la CAJA en vez de a QUIEN LA ABRE. TS2322 te lo canta:
//       "Type '(e: MouseEvent<…>) => void' is not assignable to type 'MouseEvent<…>'".
//    ⚠️ Hasta que este sello esté bien tallado verás un error en el ARCHIVO DE
//       TEST también. No lo toques: es este mismo fallo visto desde el otro lado
//       — un sello mal tallado rompe a todo el que lo estampe. Se cura aquí.
//    <BotonConSello avisar={espia} />  →  espia recibe "click"
export type ManejadorDeClic = (e: MouseEvent<HTMLButtonElement>) => void

export function BotonConSello({ avisar }: { avisar: (tipo: string) => void }) {
  const manejar: ManejadorDeClic = (e) => avisar(e.type)
  return (
    <button onClick={manejar}>
      Avisar
    </button>
  )
}
// <BotonConSello avisar={(t) => console.log(t)} />   // "click"

// 2) `BotonRecibeManejador` — ahora el manejador NO nace aquí: llega ya hecho por
//    props, y se lo entregas al hueco tal cual. La prop se tipa con tu sello.
//    ⚠️ Es el `entregarPelado` del 01 otra vez: si la forma encaja, va pelado.
//    👉 El starter hace DOS cosas mal, una de cada archivo: escribe el tipo largo
//       a mano teniendo el sello (lo de aquí), y cocina al pintar (lo del 01).
//    <BotonRecibeManejador alPulsar={espia} />  →  espia recibe el evento entero
export function BotonRecibeManejador({ alPulsar }: { alPulsar: ManejadorDeClic }) {
  return (
    <button onClick={alPulsar}>
      Avisar
    </button>
  )
}
// <BotonRecibeManejador alPulsar={(e) => console.log(e.type)} />   // "click"

// 3) `ManejadorDeEnlace` + `EnlaceRecibeManejador` — talla el segundo sello, el
//    de los `<a>`, y móntalo igual que el 2 sobre `<a href="/inicio">Ir</a>`.
//    ⚠️ Aquí se ve por qué un sello no vale para todo: cambia una sola palabra
//       dentro de `<…>` y ya no entra en la misma etiqueta.
//    👉 El starter talló el sello nuevo copiando el de los botones. TS2322.
//    <EnlaceRecibeManejador alPulsar={espia} />  →  espia recibe el evento
export type ManejadorDeEnlace = (e: MouseEvent<HTMLAnchorElement>) => void

export function EnlaceRecibeManejador({ alPulsar }: { alPulsar: ManejadorDeEnlace }) {
  return (
    <a href="/inicio" onClick={alPulsar}>
      Ir
    </a>
  )
}
// <EnlaceRecibeManejador alPulsar={(e) => console.log(e.type)} />   // "click"

// 4) `ManejadorDeTecla` + `CampoRecibeManejador` — el tercer sello, el del
//    teclado sobre un `<input>`, montado igual que los dos anteriores.
//    ⚠️ El sello tiene que tener los MISMOS huecos que el molde donde lo estampas.
//    👉 El starter talló un hueco de más: pide el evento Y la tecla suelta, y el
//       molde solo pasa una cosa. TS2322 "Target signature provides too few
//       arguments. Expected 2 or more, but got 1".
//    <CampoRecibeManejador alTeclear={espia} />  →  espia recibe el evento
export type ManejadorDeTecla = (e: KeyboardEvent<HTMLInputElement>, tecla: string) => void

export function CampoRecibeManejador({ alTeclear }: { alTeclear: ManejadorDeTecla }) {
  return (
    <input onKeyDown={(e) => alTeclear(e, e.key)} />
  )
}
<CampoRecibeManejador alTeclear={(e) => console.log(e.key)} />   // "a"

// 5) `BotonConSelloDeReact` — el sello del drill 1 ya venía tallado de fábrica:
//    React lo llama `MouseEventHandler<HTMLButtonElement>` y está en el import.
//    Monta el mismo botón del 1 usándolo, sin declarar ningún `type` tuyo.
//    ⚠️ Lo tuyo no estaba mal; esto es saber que existe y cómo se llama.
//    👉 El starter sigue anotando a mano. Por eso el import de arriba te sale
//       marcado como "declared but never used": ese aviso ES el enunciado.
//    <BotonConSelloDeReact avisar={espia} />  →  espia recibe "click"
export function BotonConSelloDeReact({ avisar }: { avisar: (tipo: string) => void }) {
  const manejar = (e: MouseEventHandler<HTMLButtonElement>) => avisar(e.type)
  return (
    <button onClick={manejar}>
      Avisar
    </button>
  )
}
// <BotonConSelloDeReact avisar={(t) => console.log(t)} />   // "click"

// 6) `BarraDeAcciones` — el cierre: un componente con DOS manejadores por props,
//    cada uno con su sello, y cada uno en su etiqueta. Pinta el `<button>` con
//    texto "Guardar" y el `<a href="/salir">` con texto "Salir".
//    👉 El starter pinta los dos elementos pero solo cablea uno.
//    <BarraDeAcciones alGuardar={espiaA} alSalir={espiaB} />
export function BarraDeAcciones({ alGuardar, alSalir }: { alGuardar: ManejadorDeClic; alSalir: ManejadorDeEnlace }) {
  return (
    <>
      <button onClick={alGuardar}>Guardar</button>
      <a href="/salir" onClick={alSalir}>Salir</a>
    </>
  )
}
// <BarraDeAcciones alGuardar={(e) => console.log(e.type)} alSalir={(e) => console.log(e.type)} />

/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 6 estén en verde: llevas cuatro archivos con eventos que solo miran
 * `e.type` y `e.key`. En el 05 entra el que de verdad se usa a diario — el que
 * te dice qué hay ESCRITO en el campo — y con él, un `e` con otro apellido.
 * ───────────────────────────────────────────────────────────────────────────── */
