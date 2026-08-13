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
 *   🪜 ESCALERA P · el nombre de la prop     →  peldaños P1 a P6, al final
 *
 * ▸ EJERCICIO — 6 drills + 6 peldaños, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-05.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters de este archivo están rotos a propósito.
 *   ¿Atascado? Las pistas están en `exercise-05.pistas.md`, de una en una.
 *
 * ⚠️ Corre LOS DOS comandos. 1 de los 6 starters pasa el test con el fallo dentro,
 *    y no te digo cuál.
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

// 1) `BotonRecibeManejador` — un `<button>` "Avisar" cuyo manejador ya no nace
//    aquí dentro: llega por la prop `alPulsar`, ya tipada con el alias. El
//    componente no decide qué pasa al pulsar, solo dónde se cuelga.
//    Al hacer clic, `alPulsar` tiene que ejecutarse y recibir el evento entero.
//    El starter se lo pasa por el camino: llega, pero llega vacío.

// export type ManejadorDeClic = (e: MouseEvent<HTMLButtonElement>) => void
export function BotonRecibeManejador({ alPulsar }: { alPulsar: ManejadorDeClic }) {
  return (
    <button onClick={alPulsar}>
      Avisar
    </button>
  )
}
// <BotonRecibeManejador alPulsar={(e) => console.log(e.type)} />

// 2) `EnlaceRecibeManejador` — lo mismo sobre `<a href="/inicio">Ir</a>`. Cambia
//    el elemento, y por tanto cambia lo que se puede prometer sobre la prop.
//    Al hacer clic, `alPulsar` recibe el evento.

// export type ManejadorDeEnlace = (e: MouseEvent<HTMLAnchorElement>) => void
export function EnlaceRecibeManejador({ alPulsar }: { alPulsar: ManejadorDeEnlace }) {
  return (
    <a href="/inicio" onClick={alPulsar}>
      Ir
    </a>
  )
}
// <EnlaceRecibeManejador alPulsar={(e) => console.log(e.type)} />

// 3) `CampoRecibeManejador` — un `<input>` que recibe por props un manejador de
//    TECLADO. La prop ya viene bien tipada; el problema es dónde la han colgado,
//    porque ahora mismo al teclear no salta nada.

// export type ManejadorDeTecla = (e: KeyboardEvent<HTMLInputElement>) => void
export function CampoRecibeManejador({ alTeclear }: { alTeclear: ManejadorDeTecla }) {
  return (
    <input onKeyDown={alTeclear} />
  )
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

// 4) `BotonConIdRecibeManejador` — un manejador reutilizable no puede saber sobre
//    CUÁL de los botones se pulsó: ese dato solo lo tiene el hijo. Por eso el que
//    llega por props aquí pide dos cosas —el evento y un id—, y el hijo tiene que
//    apañárselas para darle las dos.
//    Monta un <button> "Avisar" que lleve ese id como atributo y que al pulsarlo
//    ejecute el manejador con la información completa.
export type ManejadorConId = (e: MouseEvent<HTMLButtonElement>, id: string) => void

export function BotonConIdRecibeManejador({ id, alPulsar }: { id: string; alPulsar: ManejadorConId }) {
  return (
    <button id={id} onClick={(e) => alPulsar(e, id)}>
      Avisar
    </button>
  )
}
// <BotonConIdRecibeManejador id="guardar" alPulsar={(e, id) => console.log(e.type, id)} /> // "click", "guardar"

// 5) `BarraRecibeDos` — un componente que recibe DOS manejadores por props, cada
//    uno con su alias, y los reparte entre sus dos elementos: `alGuardar` en un
//    `<button>` "Guardar" y `alSalir` en un `<a href="/salir">Salir</a>`.
//    Al pulsar cada uno tiene que saltar el suyo, y solo el suyo.

// export type ManejadorDeClic = (e: MouseEvent<HTMLButtonElement>) => void
// export type ManejadorDeEnlace = (e: MouseEvent<HTMLAnchorElement>) => void
// export type ManejadorDeTecla = (e: KeyboardEvent<HTMLInputElement>) => void

export function BarraRecibeDos({ alGuardar, alSalir, }: { alGuardar: ManejadorDeClic, alSalir: ManejadorDeEnlace }) {
  return (
    <>
      <button onClick={alGuardar}>Guardar</button>
      <a href="/salir" onClick={alSalir}>Salir</a>
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

// 6) `BotonDeAccion` — el cierre, y el hijo que monta `PanelDeConteo` aquí arriba.
//    Recibe el `texto` que se lee en el botón y el `alPulsar` que ejecuta, y con eso
//    pinta su `<button>`. Tres clics en "Sumar" y el panel de arriba marca "Total: 3".
//    Ahora mismo se queda en 0 y typecheck no te va a decir por qué: este lo razonas
//    tú, mirando qué le llega de verdad al hueco.
//    Restricción: la firma es la que `PanelDeConteo` espera. Si la cambias, arreglas
//    el botón y rompes el padre.

// export type ManejadorDeClic = (e: MouseEvent<HTMLButtonElement>) => void
export function BotonDeAccion({ texto, alPulsar }: { texto: string; alPulsar: ManejadorDeClic }) {
  return (
    <button type="button" onClick={alPulsar}>
      {texto}
    </button>
  )
}
// <BotonDeAccion texto="Sumar" alPulsar={(e) => console.log(e.type)} />

/* =============================================================================
 * 🪜 ESCALERA P — el nombre de la prop
 * =============================================================================
 *
 * Una sola idea, en seis peldaños:
 *
 *     EL NOMBRE DE UNA PROP NO HACE NADA. SOLO TIENE QUE COINCIDIR ARRIBA Y ABAJO.
 *
 * `onClick` escrito sobre un `<button>` es un hueco de React: engancha el clic.
 * `onClick` escrito sobre un componente tuyo es un nombre y nada más — no engancha
 * nada, no dispara nada, y podrías haberlo llamado `pepe`.
 *
 * P1 y P2 no tienen eventos: props de texto, para ver el contrato desnudo. En P3 y
 * P4 entra la función, la misma dos veces con la prop llamada de dos maneras. P5 y
 * P6 la montan en un padre de verdad.
 *
 * En todos hay algo roto a propósito, y no siempre está en el cuerpo: unas veces la
 * que viene mal es la firma.
 *
 * Aquí ninguno pasa el test con el fallo dentro: los seis se quejan por los dos
 * lados. Si un peldaño te sale verde, es que está bien.
 * ───────────────────────────────────────────────────────────────────────────── */

// P1) `TarjetaDeUsuario` — pinta dentro de un <p> el nombre que le pasen. El padre
//     que la monta está en la trace de aquí abajo: míralo, porque es él quien decide
//     cómo se llama la prop. El <p> debe mostrar "Nico".
//     Restricción: el padre no se toca. Y como aquí ese padre es el test, el error de
//     tipos de este peldaño sale en el `.test.tsx`, no en este archivo.
export function TarjetaDeUsuario({ nombre }: { nombre: string }) {
  return (
    <p>{nombre}</p>
  )
}
// <TarjetaDeUsuario nombre="Nico" />   // <p>Nico</p>


// P2) `Insignia` — recibe una prop llamada `onClick` cuyo valor es un TEXTO, y lo
//     pinta dentro de un <span>. No hay ningún clic aquí: es una etiqueta de texto
//     y ya está.
//     Sí, se llama `onClick` a propósito. Sobre un componente tuyo ese nombre no
//     tiene ningún poder — cabe un string igual que cabría un número.
export function Insignia({ onClick }: { onClick: string }) {
  return (
    <span>
      {onClick}
    </span>
  )
}
// <Insignia onClick="nuevo" />   // <span>nuevo</span>


// P3) `BotonCastellano` — el primero de un par: dos botones idénticos, cada uno con
//     la prop llamada de una manera. Este recibe la suya en castellano, `alPulsar`,
//     y monta un <button> "Pulsa".
//     Al hacer clic tiene que ejecutarse lo que el padre le haya pasado en esa prop.
export function BotonCastellano({ alPulsar }: { alPulsar: () => void }) {
  return (
    <button type="button" onClick={alPulsar}>
      Pulsa
    </button>
  )
}
// <BotonCastellano alPulsar={() => console.log('clic')} />


// P4) `BotonIngles` — el mismo botón exacto que P3, con la prop llamada `onClick` en
//     vez de `alPulsar`. Ojo, que aquí `onClick` va a aparecer dos veces y no son la
//     misma cosa: una es el nombre que el padre eligió para la prop y la otra es el
//     hueco del <button>. Que coincidan no las conecta.
//     Al hacer clic tiene que ejecutarse lo que el padre le haya pasado en la prop.
export function BotonIngles({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}>
      Pulsa
    </button>
  )
}
// <BotonIngles onClick={() => console.log('clic')} />


/* ⬇️ ESTE PADRE YA ESTÁ ESCRITO. No lo toques: es el peldaño P5 visto desde arriba. */
export function PanelMini() {
  const [total, setTotal] = useState(0)
  const subir = () => setTotal(total + 1)
  return (
    <div>
      <p>Mini: {total}</p>
      <BotonMini alSubir={subir} />
    </div>
  )
}

// P5) `BotonMini` — el hijo que `PanelMini` monta aquí arriba. Pinta un <button>
//     "Subir" que ejecute lo que le llega. El padre ya está escrito ahí arriba, y
//     ahí está escrito también el nombre de la prop.
//     Restricción: el padre no se toca. El que se adapta es el hijo.
export function BotonMini({ alSubir }: { alSubir: () => void }) {
  return (
    <button type="button" onClick={alSubir}>
      Subir
    </button>
  )
}
// (se ve montado dentro de <PanelMini />)


// P6) `PanelBilingue` — el cierre. Guarda un total con `useState` y monta DOS
//     botones que suben ese mismo total: el `BotonCastellano` de P3 y el
//     `BotonIngles` de P4, cada uno con el nombre de prop que pide el suyo.
//     Pinta el total en un <p> con el texto "Bilingüe: 0".
//     Los dos hijos son el mismo botón escrito dos veces con la prop llamada
//     distinto, y los dos suman. Esa es la frase de la escalera, ya en verde.
export function PanelBilingue() {
  const [total, setTotal] = useState(0)
  const sumar = () => setTotal(total + 1)
  return (
    <div>
      <p>Bilingüe: {total}</p>
      <BotonCastellano alPulsar={sumar} />
      <BotonIngles onClick={sumar} />
    </div>
  )
}
// <PanelBilingue />


/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 6 drills y los 6 peldaños estén en verde: llevas cinco archivos
 * mirando `e.type` y `e.key`, que casi no se usan en el trabajo real. En el 06
 * entra el que sí — el que te dice qué hay ESCRITO en un campo — y con él un `e`
 * con otro apellido.
 * ───────────────────────────────────────────────────────────────────────────── */
