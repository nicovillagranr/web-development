/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — de dónde salía el tipo de `e` en el 02:
 *
 *     <button onClick={(e) => …}>    el HUECO decide Mouse/Keyboard
 *      ▲                             la ETIQUETA decide el Element
 *
 *     e = {                     ← la caja entera es `e`
 *       type: "click",          ← un campo suyo: `e.type`, y ESE sí es un string
 *       preventDefault(),       ← una FUNCIÓN suya: corta lo que iba a hacer el
 *     }                            navegador por su cuenta (navegar, enviar…)
 *
 * ⚠️ Hay DOS `MouseEvent`: el global (el del navegador) y el de React. Aquí
 *    quieres el de React, y ese se importa. El global no lleva `<…>`.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 03 — el manejador fuera del hueco
 * =============================================================================
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * En el 02 el molde te regalaba el tipo de `e` porque escribías la función DENTRO
 * del hueco. Aquí la sacas: la guardas en un `const` y luego se la entregas. Fuera
 * del hueco no hay molde, así que se acabó el regalo y el tipo lo escribes tú.
 *
 *
 * 🧠 ANALOGÍA — la ventanilla
 * ----------------------------------------------------------------------------
 * Rellenas el impreso EN la ventanilla: el mostrador ya tiene el cartel puesto,
 * así que nadie te pregunta de qué trámite va. Se sabe por dónde estás.
 * Rellénalo EN CASA y nadie lo sabe: ahí sí tienes que escribir arriba a qué
 * ventanilla va — y tiene que coincidir, o te lo devuelven.
 *
 *
 * ▸ UN EJEMPLO
 * ----------------------------------------------------------------------------
 *     const manejar = (e: MouseEvent<HTMLButtonElement>) => console.log(e.type)
 *     <button onClick={manejar}>Hola</button>
 *
 *     Ese `<HTMLButtonElement>` es el cartel. Lo escribes porque lo rellenaste
 *     en casa; en el 02 no hacía falta porque lo rellenabas en la ventanilla.
 *
 *
 * 🗣️ CÓMO SE LLAMA ESTO
 * ----------------------------------------------------------------------------
 *   · ANOTAR EL PARÁMETRO → escribir tú el tipo que antes ponía el contexto
 *
 *
 * ▸ EJERCICIO — 6 drills en escalera, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-03.test.tsx
 *
 * ⚠️ AQUÍ LOS TESTS NO BASTAN, y es la primera vez que te pasa en esta carpeta.
 *    Un cartel mal puesto no rompe nada al ejecutar: los drills 1, 2 y 4 salen
 *    VERDES con el starter tal cual. La otra mitad de la nota la da
 *    `pnpm typecheck`, que arranca con 6 errores. Corre los dos comandos.
 *
 * 📝 Trazado en .tsx = ejemplo de uso comentado con `//`.
 * ===========================================================================*/

import type { MouseEvent } from 'react'
import type { KeyboardEvent } from 'react'

// 1) `BotonFuera` — saca el manejador del hueco: guárdalo en un `const` dentro
//    del componente y entrégaselo al `onClick`. Al salir, `e` se queda sin cartel.
//    👉 El starter lo rellenó en casa y lo mandó sin poner el trámite arriba:
//       TS7006 "Parameter 'e' implicitly has an 'any' type".
//    <BotonFuera avisar={espia} />  →  espia recibe "click"


export function BotonFuera({ avisar }: { avisar: (tipo: string) => void }) {
  const manejar = (e: MouseEvent<HTMLButtonElement>) => avisar(e.type)
  return (
    <button onClick={manejar}>
      Avisar
    </button>
  )
}
<BotonFuera avisar={(t) => console.log(t)} />   // "click"

// 2) `EnlaceFuera` — la misma operación sobre un `<a href="/inicio">Ir</a>`.
//    Cambia la etiqueta, así que cambia el cartel.
//    👉 El starter lleva el cartel de la ventanilla de al lado y se lo devuelven:
//       TS2322, un manejador de `HTMLButtonElement` no entra en un `<a>`.
//    <EnlaceFuera avisar={espia} />  →  espia recibe "click"
export function EnlaceFuera({ avisar }: { avisar: (tipo: string) => void }) {
  const manejar = (e: MouseEvent<HTMLAnchorElement>) => avisar(e.type)
  return (
    <a href="/inicio" onClick={manejar}>
      Ir
    </a>
  )
}
// <EnlaceFuera avisar={(t) => console.log(t)} />   // "click"

// 3) `EnlaceSinNavegar` — el mismo enlace, pero al hacer clic NO debe navegar.
//    Ese "no hagas lo tuyo" se lo dices al navegador con una función que viene
//    dentro del propio evento. Está en la chuleta de arriba.
//    👉 El starter avisa, pero deja que el navegador se vaya a "/inicio".
//    <EnlaceSinNavegar avisar={espia} />  →  avisa Y se queda en la página
export function EnlaceSinNavegar({ avisar }: { avisar: (tipo: string) => void }) {
  const manejar = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    avisar(e.type)
  }
  return (
    <a href="/inicio" onClick={manejar}>
      Ir
    </a>
  )
}
// <EnlaceSinNavegar avisar={(t) => console.log(t)} />   // "click", sin navegar

// 4) `CampoFuera` — otro molde y otra ventanilla: un `<input>` que avisa de la
//    tecla. El cartel que escribas tiene que decir las dos cosas correctas.
//    ⚠️ Si te equivocas en la primera mitad no habrá `.key`; si te equivocas en
//       la segunda, el `<input>` te lo rechaza. Son dos huecos, no uno.
//    ⚠️ Este se toca en DOS sitios: aquí y en el import de la línea 60. El tipo
//       que necesitas no está traído, y hay otro homónimo listo para colarse.
//    👉 El starter deja el cartel del ratón donde se piden teclas.
//    <CampoFuera avisar={espia} />  →  al pulsar la "a", espia recibe "a"
export function CampoFuera({ avisar }: { avisar: (tecla: string) => void }) {
  const manejar = (e: KeyboardEvent<HTMLInputElement>) => avisar(e.key)
  return (
    <input onKeyDown={manejar} />
  )
}
// <CampoFuera avisar={(k) => console.log(k)} />   // "a"

// 5) `BotonFueraConId` — el manejador de fuera pide DOS cosas: el `id` y el tipo.
//    El hueco solo pasa el evento, así que ya no encaja pelado: envuélvelo.
//    ⚠️ Lo de FUERA se anota; lo que escribas DENTRO del hueco, no — ahí vuelve
//       a haber molde. En una misma línea puedes tener las dos cosas.
//    👉 El starter entrega el de fuera pelado, y por ahí no pasa el `id`.
//    <BotonFueraConId id={7} avisar={espia} />  →  espia recibe (7, "click")
export function BotonFueraConId({ id, avisar }: { id: number; avisar: (id: number, tipo: string) => void }) {
  const manejar = (id: number, evento: MouseEvent<HTMLButtonElement>) => avisar(id, evento.type)
  return (
    <button onClick={(e) => manejar(id, e)}>
      Avisar
    </button>
  )
}
// <BotonFueraConId id={7} avisar={(i, t) => console.log(i, t)} />   // 7 "click"

// 6) `EnlaceCompleto` — el cierre, y van juntas las tres cosas del archivo: el
//    destino llega por props y se pinta en el `href`; al clic corta la navegación
//    y avisa con el destino y el tipo del suceso.
//    👉 El starter tiene el cartel puesto y nada más: ni corta ni pasa el destino.
//    <EnlaceCompleto destino="/perfil" avisar={espia} />  →  ("/perfil", "click")
export function EnlaceCompleto({ destino, avisar }: { destino: string; avisar: (destino: string, tipo: string) => void }) {
  const manejar = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    avisar(destino, e.type)
  }
  return (
    <a href={destino} onClick={manejar}>
      Ir
    </a>
  )
}
// <EnlaceCompleto destino="/perfil" avisar={(d, t) => console.log(d, t)} />

/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 6 estén en verde: has escrito `MouseEvent<HTMLButtonElement>` cinco
 * veces. En el 04 le pones NOMBRE a eso una sola vez y dejas de repetirlo — y de
 * paso el manejador deja de nacer en el componente y empieza a llegar por props.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * 🔁 BLOQUE V — REFUERZO: qué significa `void`
 * =============================================================================
 *
 * Montado sobre tu pregunta: «no entiendo el uso del `void` si perfectamente el
 * retorno podría ser un string». La intuición es CORRECTA — el retorno puede ser
 * un string. Lo que falla es lo que crees que promete la palabra:
 *
 *     ❌ "no devuelvas nada"
 *     ✅ "devuelvas lo que devuelvas, nadie va a mirarlo"
 *
 *
 * 🧠 ANALOGÍA — el timbre y la calculadora
 * ----------------------------------------------------------------------------
 * El timbre lo pulsas por lo que HACE: suena. Nadie pregunta "¿qué me ha devuelto
 * el timbre?". La calculadora la usas por lo que TE DA: si no te da un número, no
 * sirve para nada. Un manejador es un timbre, no una calculadora.
 *
 *
 * ▸ 4 drills + 1 experimento, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-03.test.tsx
 * ===========================================================================*/

// V1) `Aviso` + `ejecutar` — el tipo de una función que se llama por lo que HACE.
//     `Aviso` no recibe nada y no devuelve nada. `ejecutar` recibe una función
//     así y la llama UNA vez; lo que salga de ella, se tira.
//     👉 El starter nombró la SALIDA en vez de la función entera (lo mismo que te
//        pasó en el drill 1 del 04), y `ejecutar` no llama a nadie.
//     ejecutar(espia)  →  espia se llama 1 vez
export type Aviso = () => void

// eslint-disable-next-line react-refresh/only-export-components -- archivo de ejercicios: aquí conviven funciones sueltas con componentes
export function ejecutar(accion: Aviso): void {
  return accion()
}
ejecutar(() => console.log('sonó'))   // imprime "sonó"

// V2) `Medida` + `medirDoble` — el espejo, para que se vea el contraste.
//     `Medida` no recibe nada y devuelve un `number`. `medirDoble` la llama y
//     devuelve el DOBLE de lo que salga.
//     ⚠️ Aquí sí se mira lo que sale, y por eso no puede ser `void`: si nadie
//        pudiera mirarlo, no habría nada que duplicar.
//     👉 El starter devuelve un 0 fijo sin llamar a nadie.
//     medirDoble(() => 21)  →  42
export type Medida = () => number

// eslint-disable-next-line react-refresh/only-export-components -- archivo de ejercicios: aquí conviven funciones sueltas con componentes
export function medirDoble(m: Medida): number {
  return m() * 2
}
medirDoble(() => 21)   // 42

// V3) `apuntar` — TU PREGUNTA, en código. `apuntar` es de tipo `Aviso`, o sea
//     `=> void`. Su cuerpo tiene que ser `registro.push('visita')`, y resulta que
//     `.push` DEVUELVE UN NÚMERO (la nueva longitud de la lista).
//     ⚠️ Antes de escribirlo, predice: ¿cuántos errores da `pnpm typecheck`?
//        Apunta tu respuesta, escríbelo, y compruébalo. Ahí está la lección.
//     👉 El starter tiene el cuerpo vacío: no apunta nada.
//     apuntar()  →  registro pasa a contener 'visita'
// 📌 type Aviso = () => void          ← el de V1, para no subir a buscarlo
// eslint-disable-next-line react-refresh/only-export-components -- archivo de ejercicios: aquí conviven funciones sueltas con componentes
export const registro: string[] = []

// eslint-disable-next-line react-refresh/only-export-components -- archivo de ejercicios: aquí conviven funciones sueltas con componentes
export const apuntar: Aviso = () => {
  return registro.push('visita')
}
apuntar()   // 1

// V4) `BotonTimbre` — de vuelta a lo tuyo. Talla `ManejadorSimple`: recibe el
//     evento de clic de un `<button>` y no devuelve nada. Anota el `const` con él
//     y entrégaselo al hueco, como en el drill 1 de este archivo.
//     ⚠️ Es el mismo `=> void` de V1, con un parámetro delante. Nada más.
//     👉 El starter promete un `string` a la salida, y de ahí no sale ninguno.
//        Ojo: este drill sale VERDE en el test aunque esté mal. Lo caza typecheck.
//     <BotonTimbre avisar={espia} />  →  espia recibe "click"
export type ManejadorSimple = (e: MouseEvent<HTMLButtonElement>) => void

export function BotonTimbre({ avisar }: { avisar: (tipo: string) => void }) {
  const manejar: ManejadorSimple = (e) => avisar(e.type)
  return (
    <button onClick={manejar}>
      Timbre
    </button>
  )
}
<BotonTimbre avisar={(t) => console.log(t)} />   // "click"

/* ─────────────────────────────────────────────────────────────────────────────
 * 🔬 EXPERIMENTO — no lo entregas, lo corres y lo deshaces.
 *
 * Ya has visto que DEVOLVER algo a un `=> void` está permitido. Ahora mira lo
 * único que `void` sí te prohíbe. Pega esto al final del archivo y corre
 * `pnpm typecheck`:
 *
 *     const cuantos: number = ejecutar(apuntar)
 *
 * `apuntar` devuelve un número de verdad (lo viste en V3) y `ejecutar` lo llama.
 * Aun así no puedes recogerlo. Lee el error y quédate con la frase:
 *
 *     `void` no prohíbe DEVOLVER. Prohíbe USAR lo devuelto.
 *
 * Por eso un manejador se tipa `=> void` y no `=> string`: no es que no pueda
 * salir un string — es que React no lo va a recoger, y el tipo lo dice en alto.
 * Borra la línea cuando acabes.
 * ───────────────────────────────────────────────────────────────────────────── */
