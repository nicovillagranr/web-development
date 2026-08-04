/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — el evento del 02 y el de este archivo, uno al lado del otro:
 *
 *     onKeyDown  →  e.key           "a"        la tecla que acabas de pulsar
 *     onChange   →  e.target.value  "hola"     TODO lo que hay escrito ahora
 *
 *     e = {                      ← la caja entera es `e`
 *       target: {                ← el elemento donde ocurrió, con sus datos
 *         value: "hola",         ← lo escrito. SIEMPRE texto, aunque sea "42"
 *         checked: true,         ← solo lo traen las casillas
 *       },
 *       type: "change",
 *     }
 *
 * ⚠️ El apellido de este evento no es `Mouse` ni `Keyboard`: es `Change`.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 05 — lo que hay escrito en el campo
 * =============================================================================
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * Los cuatro archivos anteriores solo miraban `e.type` y `e.key`, que casi no se
 * usan en el trabajo real. Este es el que sí: el que te dice qué ha escrito la
 * persona. Y trae un `e` con otro apellido, así que el cartel del 03 cambia.
 *
 *
 * 🧠 ANALOGÍA — la fotocopia
 * ----------------------------------------------------------------------------
 * `onKeyDown` era un vigilante cantándote cada tecla: "a"… "b"… "borrar"…
 * `onChange` no canta teclas: cada vez que el campo cambia te pasa una FOTOCOPIA
 * del campo entero. No te dice qué has tocado, te dice cómo ha quedado. Y una
 * fotocopia es papel: aunque el campo pida números, lo que llega es texto.
 *
 *
 * ▸ UN EJEMPLO
 * ----------------------------------------------------------------------------
 *     const manejar = (e: ChangeEvent<HTMLInputElement>) => console.log(e.target.value)
 *     <input onChange={manejar} />
 *
 *     Escribes "ho" y sale "ho"; escribes la "y" y sale "hoy" entero, no "y".
 *
 *
 * 🗣️ CÓMO SE LLAMA ESTO
 * ----------------------------------------------------------------------------
 *   · EVENTO DE CAMBIO → `ChangeEvent<…>`, y el dato vive en `e.target.value`
 *
 *
 * ▸ EJERCICIO — 6 drills en escalera, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-05.test.tsx
 *
 * ⚠️ Igual que en el 03 y el 04: los drills 2 y 5 salen VERDES con el starter
 *    tal cual, porque su fallo es de cartel. `pnpm typecheck` los caza.
 *
 * 📝 Trazado en .tsx = ejemplo de uso comentado con `//`.
 * ===========================================================================*/

import type { ChangeEvent } from 'react'

// 1) `CampoAvisaValor` — un `<input>` que avisa de lo que hay escrito. Escribe el
//    manejador DENTRO del hueco, como en el 02: ahí no hace falta anotar nada.
//    👉 El starter pide la tecla, que es lo del archivo 02. En esta fotocopia no
//       hay teclas: TS2339 "Property 'key' does not exist on type 'ChangeEvent<…>'".
//    <CampoAvisaValor avisar={espia} />  →  al escribir "hola", espia recibe "hola"
export function CampoAvisaValor({ avisar }: { avisar: (texto: string) => void }) {
  return <input onChange={(e) => avisar(e.key)} />
}
// <CampoAvisaValor avisar={(t) => console.log(t)} />   // "hola"

// 2) `CampoAvisaLargo` — el mismo campo, pero avisa de CUÁNTAS letras hay escritas.
//    Saca el manejador del hueco, como en el 03, y ponle su cartel.
//    ⚠️ El apellido del cartel ya no es `MouseEvent`. Mira la chuleta.
//    👉 El starter lo sacó del hueco sin cartel: TS7006, otra vez el de casa.
//    <CampoAvisaLargo avisar={espia} />  →  al escribir "hola", espia recibe 4
export function CampoAvisaLargo({ avisar }: { avisar: (largo: number) => void }) {
  const manejar = (e) => avisar(e.target.value.length)
  return <input onChange={manejar} />
}
// <CampoAvisaLargo avisar={(n) => console.log(n)} />   // 4

// 3) `CampoNumeroAvisaNumero` — un `<input type="number" />`. Aunque el campo solo
//    acepte cifras, la fotocopia sigue siendo papel: `value` es `"42"`, un texto.
//    Y aquí `avisar` pide un número de verdad. Conviértelo.
//    👉 El starter entrega el texto tal cual: TS2345 "Argument of type 'string'
//       is not assignable to parameter of type 'number'".
//    <CampoNumeroAvisaNumero avisar={espia} />  →  al escribir 42, espia recibe 42
export function CampoNumeroAvisaNumero({ avisar }: { avisar: (n: number) => void }) {
  const manejar = (e: ChangeEvent<HTMLInputElement>) => avisar(e.target.value)
  return <input type="number" onChange={manejar} />
}
// <CampoNumeroAvisaNumero avisar={(n) => console.log(n)} />   // 42, no "42"

// 4) `CasillaAvisaMarcada` — un `<input type="checkbox" />`. Una casilla no tiene
//    texto escrito: tiene un sí o un no. Ese dato está en otro campo de `target`.
//    ⚠️ El cartel no cambia (sigue siendo un `<input>`); lo que cambia es qué le
//       pides al `target`. Está en la chuleta.
//    👉 El starter le pide lo escrito a algo que no se escribe: TS2345, un
//       `string` donde `avisar` pedía un `boolean`.
//    <CasillaAvisaMarcada avisar={espia} />  →  al marcarla, espia recibe true
export function CasillaAvisaMarcada({ avisar }: { avisar: (marcada: boolean) => void }) {
  const manejar = (e: ChangeEvent<HTMLInputElement>) => avisar(e.target.value)
  return <input type="checkbox" onChange={manejar} />
}
// <CasillaAvisaMarcada avisar={(m) => console.log(m)} />   // true

// 5) `SelectorAvisa` — cambia la etiqueta: un `<select>` con dos `<option>`,
//    "perro" y "gato". Avisa del valor elegido.
//    ⚠️ Es la lección del drill 2 del 03: el apellido lo decide el hueco, pero la
//       segunda mitad del cartel la decide la ETIQUETA, y esta ya no es un input.
//    👉 El starter dejó puesta la mitad del `<input>`. TS2322.
//    <SelectorAvisa avisar={espia} />  →  al elegir "gato", espia recibe "gato"
export function SelectorAvisa({ avisar }: { avisar: (elegido: string) => void }) {
  const manejar = (e: ChangeEvent<HTMLInputElement>) => avisar(e.target.value)
  return (
    <select onChange={manejar}>
      <option value="perro">Perro</option>
      <option value="gato">Gato</option>
    </select>
  )
}
// <SelectorAvisa avisar={(v) => console.log(v)} />   // "gato"

// 6) `FiltroDeLista` — el cierre: los dos carteles del archivo en un componente.
//    Un `<input>` que avisa del texto por `alEscribir`, y el mismo `<select>` del
//    drill 5 que avisa del animal por `alElegir`. Cada uno con el suyo.
//    👉 El starter cablea el input y deja el select sin manejador.
//    <FiltroDeLista alEscribir={espiaA} alElegir={espiaB} />
export function FiltroDeLista({ alEscribir, alElegir }: { alEscribir: (texto: string) => void; alElegir: (animal: string) => void }) {
  const escribir = (e: ChangeEvent<HTMLInputElement>) => alEscribir(e.target.value)
  return (
    <div>
      <input onChange={escribir} />
      <select>
        <option value="perro">Perro</option>
        <option value="gato">Gato</option>
      </select>
    </div>
  )
}
// <FiltroDeLista alEscribir={(t) => console.log(t)} alElegir={(a) => console.log(a)} />

/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 6 estén en verde: has usado `e.target` seis veces sin preguntarte
 * qué es exactamente. En el 06 resulta que hay DOS formas de llegar al elemento
 * (`target` y `currentTarget`), no significan lo mismo, y una te va a morder.
 * ───────────────────────────────────────────────────────────────────────────── */
