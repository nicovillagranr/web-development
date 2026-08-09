/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — dos componentes, dos responsabilidades:
 *
 *   EL PADRE  define QUÉ pasa            const sumar = () => setTotal(total + 1)
 *             y se lo pasa al hijo       <Boton alPulsar={sumar} />
 *
 *   EL HIJO   define DÓNDE se cuelga     <button onClick={alPulsar}>
 *             y no sabe qué hace
 *
 * El hijo no decide nada: recibe una función y la enchufa. Por eso el mismo botón
 * sirve para guardar, borrar o sumar — depende de quién lo monte.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 05 — el manejador llega por props                ·  5/10 del bloque
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · tipar una prop cuyo valor es una FUNCIÓN, usando un alias
 *   · entregar esa prop al hueco sin envolverla cuando las firmas encajan
 *   · envolverla cuando el hijo tiene que añadir algo suyo
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * Hasta aquí el manejador siempre nacía dentro del componente que lo usaba. Eso
 * no escala: un `<Boton>` reutilizable no puede saber qué hace cada pantalla con
 * él. Así que el manejador se define fuera y entra por props — y el alias del 04
 * es justo lo que se escribe en el tipo de esa prop.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 *   TEORÍA 1 · una prop que es una función   →  drills 1, 2, 3
 *   TEORÍA 2 · cuando el hijo pone algo suyo →  drills 4, 5, 6
 *
 * ▸ EJERCICIO — 6 drills en escalera, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-05.test.tsx
 *     pnpm typecheck     ← el starter del 2 sale VERDE en el test. Corre los dos.
 *
 * 📝 Las traces van comentadas: en `.tsx` escribir `<Componente />` solo fabrica
 *    un objeto que lo describe, no lo ejecuta.
 * ===========================================================================*/

import { useState } from 'react'
import type { MouseEvent, KeyboardEvent } from 'react'

/* Los tres alias del 04, ya tallados. Aquí se usan en el TIPO DE UNA PROP. */
export type ManejadorDeClic = (e: MouseEvent<HTMLButtonElement>) => void
export type ManejadorDeEnlace = (e: MouseEvent<HTMLAnchorElement>) => void
export type ManejadorDeTecla = (e: KeyboardEvent<HTMLInputElement>) => void


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — una prop cuyo valor es una función
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Una prop puede llevar cualquier valor, y una función es un valor —eso lo
 *   sabes desde el drill 1 del 01—. Así que una prop puede llevar un manejador.
 *   Se tipa como cualquier otra: poniendo su tipo, que aquí es el alias.
 *
 * SINTAXIS
 *     function Boton({ alPulsar }: { alPulsar: ManejadorDeClic }) {
 *                      └ la prop      └── su tipo: una función entera
 *       return <button onClick={alPulsar}>Avisar</button>
 *     }                          └ y aquí se entrega PELADA: las firmas encajan
 *
 * EJEMPLO — quién es quién
 *     <Boton alPulsar={(e) => console.log(e.type)} />
 *            └ el PADRE define qué pasa. El hijo solo lo enchufa.
 *
 * 🧠 ANALOGÍA (de apoyo) — el enchufe y el aparato. El hijo es el enchufe: pone
 *    la toma en la pared y no sabe qué le vas a conectar. El padre trae el
 *    aparato. Cambias de aparato sin tocar el enchufe.
 *
 * 🗣️ LAS PIEZAS
 *     alPulsar         → la prop. Su valor es una función
 *     ManejadorDeClic  → el alias que la tipa
 *     onClick={alPulsar} → la entrega pelada, sin `()` y sin envolver
 *
 * ⚠️ TRAMPA — envolver por costumbre cuando no hace falta:
 *       onClick={alPulsar}          ✅ encaja: va pelada
 *       onClick={() => alPulsar()}  ❌ envoltorio de más, y encima se come el
 *                                      evento: `alPulsar` se queda sin argumento
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) `BotonRecibeManejador` — QUÉ CONSTRUIR: un `<button>` "Avisar" cuyo manejador
//    NO nace aquí: llega por la prop `alPulsar`, ya tipada con el alias. Entrégala
//    al hueco tal cual.
//    🔧 STARTER ROTO A PROPÓSITO: la envuelve sin necesidad y la llama sin
//       argumentos. `TS2554: Expected 1 arguments, but got 0`, y el test en ROJO
//       porque `alPulsar` recibe `undefined` en vez del evento.
//    📎 onClick espera: (e: MouseEvent<HTMLButtonElement>) => void
//       alPulsar:       ManejadorDeClic, que ES exactamente eso  → encajan
//    → click   →   alPulsar recibe el evento, y su `type` es "click"
export function BotonRecibeManejador({ alPulsar }: { alPulsar: ManejadorDeClic }) {
  return <button onClick={() => alPulsar()}>Avisar</button>
}
// <BotonRecibeManejador alPulsar={(e) => console.log(e.type)} />

// 2) `EnlaceRecibeManejador` — QUÉ CONSTRUIR: lo mismo sobre
//    `<a href="/inicio">Ir</a>`. Cambia el elemento, así que cambia el alias de
//    la prop.
//    🔧 STARTER ROTO A PROPÓSITO: tipa la prop con el alias del botón.
//       `TS2322: Type 'ManejadorDeClic' is not assignable to type
//       'MouseEventHandler<HTMLAnchorElement>'`.
//       ⚠️ ES EL ÚNICO DRILL DEL ARCHIVO QUE SALE VERDE EN EL TEST: al ejecutar
//       funciona igual de bien con el alias equivocado. Solo lo caza typecheck.
//    📎 <button> → ManejadorDeClic
//       <a>      → ManejadorDeEnlace
//    → click   →   alPulsar recibe el evento
export function EnlaceRecibeManejador({ alPulsar }: { alPulsar: ManejadorDeClic }) {
  return <a href="/inicio" onClick={alPulsar}>Ir</a>
}
// <EnlaceRecibeManejador alPulsar={(e) => console.log(e.type)} />

// 3) `CampoRecibeManejador` — QUÉ CONSTRUIR: un `<input>` que recibe por props un
//    manejador de teclado y lo cuelga del hueco `onKeyDown`.
//    🔧 STARTER ROTO A PROPÓSITO: la prop está bien tipada, pero la cuelga del
//       hueco equivocado — `onClick`. `TS2322 … 'ManejadorDeTecla' is not
//       assignable to type 'MouseEventHandler<HTMLInputElement>'`, y el test en
//       ROJO porque al teclear no salta nada.
//    📎 ManejadorDeTecla recibe KeyboardEvent  →  su hueco es onKeyDown
//    → tecleas "a"   →   alTeclear recibe el evento, y su `key` es "a"
export function CampoRecibeManejador({ alTeclear }: { alTeclear: ManejadorDeTecla }) {
  return <input onClick={alTeclear} />
}
// <CampoRecibeManejador alTeclear={(e) => console.log(e.key)} />


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — cuando el hijo tiene algo que aportar
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   A veces el padre necesita saber algo que solo el hijo tiene: cuál de los tres
 *   botones se pulsó, qué fila de la lista, qué `id`. El padre no puede ponerlo
 *   porque no lo sabe. Entonces el manejador pide DOS cosas, y el hijo envuelve
 *   para añadir la suya.
 *
 * SINTAXIS
 *     type ManejadorConId = (e: MouseEvent<HTMLButtonElement>, id: string) => void
 *
 *     function Boton({ id, alPulsar }: { id: string; alPulsar: ManejadorConId }) {
 *       return <button onClick={(e) => alPulsar(e, id)}>Avisar</button>
 *     }                          └ el hueco pasa el evento; el `id` lo pones tú
 *
 * 🗣️ LAS PIEZAS
 *     envoltorio → la función anónima del hueco, que junta las dos fuentes
 *     el evento  → lo pone React        ·   el `id` → lo pone el hijo
 *
 * ⚠️ TRAMPA — dentro del envoltorio sigue habiendo tipado contextual, así que la
 *    `e` del `(e) =>` NO se anota. Lo que va anotado es el alias de la prop.
 *
 * 🔭 Y EN EL DRILL 6 APARECE ALGO NUEVO, ya escrito, que NO tienes que tocar: el
 *    padre guarda un número que cambia con cada clic, con `useState`. Míralo,
 *    no lo estudies — es de la carpeta 11. Aquí solo se ve pasar.
 * ───────────────────────────────────────────────────────────────────────────── */

// 4) `BotonConIdRecibeManejador` — QUÉ CONSTRUIR: el hijo recibe un `id` por props
//    y un manejador que pide DOS cosas, el evento y ese `id`. Como el hueco solo
//    pasa el evento, envuelve y añade tú el `id`.
//    🔧 STARTER ROTO A PROPÓSITO: entrega el manejador pelado, como si encajara.
//       `TS2322: Type 'ManejadorConId' is not assignable to type
//       'MouseEventHandler<HTMLButtonElement>'`, y debajo la línea que lo explica:
//       `Target signature provides too few arguments. Expected 2 or more, but got
//       1`. El test también en ROJO, porque el `id` llega `undefined`.
//    📎 onClick pasa 1 argumento:   (e)
//       ManejadorConId pide 2:      (e, id)
//    → click con id="guardar"   →   alPulsar recibe el evento Y "guardar"
export type ManejadorConId = (e: MouseEvent<HTMLButtonElement>, id: string) => void

export function BotonConIdRecibeManejador({ id, alPulsar }: { id: string; alPulsar: ManejadorConId }) {
  return <button id={id} onClick={alPulsar}>Avisar</button>
}
// <BotonConIdRecibeManejador id="guardar" alPulsar={(e, id) => console.log(id)} />

// 5) `BarraRecibeDos` — QUÉ CONSTRUIR: un componente que recibe DOS manejadores
//    por props, cada uno con su alias, y los cuelga en su elemento: `alGuardar`
//    en un `<button>` "Guardar", y `alSalir` en un `<a href="/salir">Salir</a>`.
//    🔧 STARTER ROTO A PROPÓSITO: los tiene CRUZADOS —`alSalir` en el botón y
//       `alGuardar` en el enlace—, así que da DOS `TS2322`, uno por elemento:
//       `Type 'ManejadorDeEnlace' is not assignable to type
//       'MouseEventHandler<HTMLButtonElement>'` y su espejo en el `<a>`. Y el test
//       en ROJO: al pulsar "Guardar" se dispara el manejador de salir.
//    📎 alGuardar: ManejadorDeClic     → va en el <button>
//       alSalir:   ManejadorDeEnlace   → va en el <a>
//    → click en Guardar → salta alGuardar   ·   click en Salir → salta alSalir
export function BarraRecibeDos({
  alGuardar,
  alSalir,
}: {
  alGuardar: ManejadorDeClic
  alSalir: ManejadorDeEnlace
}) {
  return (
    <>
      <button onClick={alSalir}>Guardar</button>
      <a href="/salir" onClick={alGuardar}>Salir</a>
    </>
  )
}
// <BarraRecibeDos alGuardar={(e) => console.log(e.type)} alSalir={(e) => console.log(e.type)} />

/* ⬇️ ESTE PADRE YA ESTÁ ESCRITO. No lo toques: es el drill 6 visto desde arriba.
 * Guarda un número con `useState` y le pasa al hijo una función que lo sube. Fíjate
 * en que el hijo no sabe nada de ese número — solo recibe algo que llamar. */
export function PanelDeConteo() {
  const [total, setTotal] = useState(0)
  const sumar: ManejadorDeClic = () => setTotal(total + 1)
  return (
    <div>
      <p>Total: {total}</p>
      <BotonDeAccion texto="Sumar" alPulsar={sumar} />
    </div>
  )
}

// 6) `BotonDeAccion` — QUÉ CONSTRUIR: el cierre, y el hijo que usa `PanelDeConteo`
//    justo aquí arriba. Recibe dos props —`texto`, que es lo que se lee en el
//    botón, y `alPulsar`— y monta un `<button>` con ese texto y ese manejador.
//    🔧 STARTER ROTO A PROPÓSITO: envuelve y dentro del envoltorio ENTREGA la
//       función en vez de llamarla, así que al pulsar no pasa nada y el contador
//       se queda en 0. ⚠️ Y aquí typecheck NO te va a ayudar: se queda callado,
//       porque el hueco es `=> void` y en un `void` cualquier retorno vale,
//       incluido devolver una función. Es el drill 14 del `exercise-01` otra vez:
//       la permisividad de `void` es la que te deja sin red. Solo el test lo caza.
//    📎 alPulsar   → la función que hay que ENTREGAR al hueco
//       alPulsar() → su llamada. Ninguna de las dos es lo que quieres aquí dentro
//    → tres clics en "Sumar"   →   el panel muestra "Total: 3"
export function BotonDeAccion({ texto, alPulsar }: { texto: string; alPulsar: ManejadorDeClic }) {
  return <button onClick={() => alPulsar}>{texto}</button>
}
// <BotonDeAccion texto="Sumar" alPulsar={(e) => console.log(e.type)} />

/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 6 estén en verde: llevas cinco archivos mirando `e.type` y `e.key`,
 * que casi no se usan en el trabajo real. En el 06 entra el que sí — el que te
 * dice qué hay ESCRITO en un campo — y con él un `e` con otro apellido.
 * ───────────────────────────────────────────────────────────────────────────── */
