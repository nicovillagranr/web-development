/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — lo del 01, ahora con React de por medio:
 *
 *     onClick={avisar}       se lo das a React. Lo llamará él.        ✅
 *     onClick={(e) => …}     lo escribes ahí mismo. `e` llega solo.   ✅
 *     onClick={avisar()}     lo llamas TÚ al pintar la página.        ❌
 *
 * De todo lo que trae `e`, este archivo solo usa dos cosas:
 *     e.type          "click", "dblclick", "keydown"… el nombre del suceso
 *     e.nativeEvent   el evento del navegador, envuelto dentro del de React
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 02 — el evento llega solo
 * =============================================================================
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * En el drill 6 del 01, quien llamaba a tu función era `llamaConObjeto` y te
 * pasaba `{ type: "click" }`. Aquí quien llama es React, y lo que te pasa es el
 * EVENTO. Es el mismo drill, con un botón de verdad encima.
 *
 * Y viene con regalo: si escribes la función DENTRO del hueco, no tienes que
 * anotar nada. TypeScript ya sabe qué te va a llegar.
 *
 *
 * 🧠 ANALOGÍA — el molde
 * ----------------------------------------------------------------------------
 * A la masa no le dices qué forma tiene: se la da el molde donde la echas.
 *
 * `onClick=` es un molde. Ya lleva escrito qué recibe la función que metas ahí,
 * así que tu `e` sale con forma sin que tú digas una palabra. Y cada molde da
 * la suya: el del teclado te da la tecla, el del ratón no. Saca la función del
 * molde y la forma se pierde — pero eso es el 03.
 *
 *
 * ▸ UN EJEMPLO
 * ----------------------------------------------------------------------------
 *     <button onClick={(e) => console.log(e.type)}>Hola</button>
 *
 *     Ni `e: algo`, ni imports. Pon el ratón encima de `e` en el editor: dice
 *     `MouseEvent<HTMLButtonElement>`. Eso no lo escribiste tú, lo puso el molde.
 *
 *
 * 🗣️ CÓMO SE LLAMA ESTO
 * ----------------------------------------------------------------------------
 *   · TIPADO CONTEXTUAL → el tipo lo pone el sitio donde escribes la función
 *
 *
 * ▸ EJERCICIO — 6 drills en escalera, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-02.test.tsx
 *
 * 📝 Trazado en .tsx = ejemplo de uso comentado con `//`.
 * ===========================================================================*/

// 1) `BotonPelado` — el puente desde el 01. Recibe `avisar`, que no pide nada.
//    Devuelve un <button> con el texto "Avisar" que se lo entregue a React.
//    👉 El starter lo cocina al pintar. Apaga el fuego: quita los ().
//    <BotonPelado avisar={espia} />  →  espia se llama al hacer clic, no antes
export function BotonPelado({ avisar }: { avisar: () => void }) {
  return <button onClick={avisar()}>Avisar</button>
}
// <BotonPelado avisar={() => console.log('clic')} />

// 2) `BotonAvisaTipo` — ahora `avisar` sí pide algo: el nombre del suceso.
//    Escribe el manejador DENTRO del hueco, recibe el evento y sácale el `type`.
//    ⚠️ No anotes el parámetro. Es el molde quien le da forma.
//    👉 El starter le pasa el evento ENTERO. Solo pedían el nombre.
//    <BotonAvisaTipo avisar={espia} />  →  espia recibe "click"
export function BotonAvisaTipo({ avisar }: { avisar: (tipo: string) => void }) {
  return <button onClick={(e) => avisar(e)}>Avisar</button>
}
// <BotonAvisaTipo avisar={(t) => console.log(t)} />   // "click"

// 3) `BotonAvisaDobleClic` — el mismo botón y el mismo `avisar`, pero el aviso
//    tiene que salir al DOBLE clic, no al clic.
//    ⚠️ Ese texto no lo escribes tú en ningún sitio: lo trae el evento.
//    👉 El starter está en el hueco de al lado, así que no se entera del doble clic.
//    <BotonAvisaDobleClic avisar={espia} />  →  espia recibe "dblclick"
export function BotonAvisaDobleClic({ avisar }: { avisar: (tipo: string) => void }) {
  return <button onClick={(e) => avisar(e.type)}>Avisar</button>
}
// <BotonAvisaDobleClic avisar={(t) => console.log(t)} />   // "dblclick"

// 4) `CampoAvisaTecla` — cambia el elemento: un <input>. `avisar` pide la TECLA
//    que se pulsó, y el evento del teclado la trae en `e.key`.
//    ⚠️ Aquí se ve que cada molde da lo suyo: `.key` existe en el del teclado.
//    👉 El starter pide la tecla en el hueco del ratón, y TS te lo canta:
//       "Property 'key' does not exist on type 'MouseEvent<HTMLInputElement>'".
//       Traducido: en ese molde no hay teclas. Cámbiate de molde.
//    <CampoAvisaTecla avisar={espia} />  →  al pulsar la "a", espia recibe "a"
export function CampoAvisaTecla({ avisar }: { avisar: (tecla: string) => void }) {
  return <input onClick={(e) => avisar(e.key)} />
}
// <CampoAvisaTecla avisar={(k) => console.log(k)} />   // "a"

// 5) `BotonAvisaNativo` — el `e` de React es un ENVOLTORIO. Dentro trae el
//    evento de verdad, el del navegador, en `e.nativeEvent`. Aquí `avisar` pide
//    ese, el de dentro. Sácalo y pásaselo.
//    ⚠️ El `MouseEvent` de la firma es el del navegador, el global. React tiene
//       otro con el mismo nombre. Se parecen, pero no son el mismo.
//    👉 El starter entrega el sobre de React donde pedían el de dentro.
//    <BotonAvisaNativo avisar={espia} />  →  espia recibe un MouseEvent del DOM
export function BotonAvisaNativo({ avisar }: { avisar: (nativo: MouseEvent) => void }) {
  return <button onClick={(e) => avisar(e)}>Avisar</button>
}
// <BotonAvisaNativo avisar={(n) => console.log(n.type)} />   // "click"

// 6) `BotonAvisaConId` — el cierre: `avisar` pide DOS cosas, el `id` y el tipo.
//    El `id` ya lo tienes (te llega por props); el tipo lo trae el evento. No
//    puedes entregarlo pelado, igual que en el drill 5 del 01: envuélvelo.
//    👉 El starter lo entrega pelado, y no encaja: el molde solo pasa el evento.
//    <BotonAvisaConId id={7} avisar={espia} />  →  espia recibe (7, "click")
export function BotonAvisaConId(
  { id, avisar }: { id: number; avisar: (id: number, tipo: string) => void },
) {
  return <button onClick={avisar}>Avisar</button>
}
// <BotonAvisaConId id={7} avisar={(i, t) => console.log(i, t)} />   // 7 "click"

/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 6 estén en verde: aquí el molde te ha regalado el tipo porque
 * escribiste la función DENTRO del hueco. En el 03 la sacas fuera, el regalo se
 * acaba, y te toca escribir tú lo que hasta ahora ponía el molde.
 * ───────────────────────────────────────────────────────────────────────────── */
