/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — el gesto de toda la carpeta, en dos líneas:
 *
 *     onClick={avisar}     le das la función a React. La llamará él.   ✅
 *     onClick={avisar()}   la llamas TÚ al pintar la página.           ❌
 *
 * 🧠 La receta y el plato: el papel se entrega, el plato se cocina.
 *    Los paréntesis son el fuego.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 01 — entregar una función no es ejecutarla
 * =============================================================================
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * Toda esta carpeta va de eventos: clics, teclas, formularios. Pero debajo de
 * todos ellos hay un único gesto, y si ese gesto no está automático, lo de
 * arriba se cae. El gesto es: le das una función a otro, y NO la llamas tú.
 *
 * Aquí no hay React. Ni botones, ni JSX, ni `e`. Solo funciones, para que el
 * gesto se te quede en el dedo antes de ponerle nada encima.
 *
 *
 * 🧠 ANALOGÍA — la receta y el plato
 * ----------------------------------------------------------------------------
 * Una función es una RECETA: un papel con instrucciones. Llamarla es COCINAR, y
 * lo que sale es el PLATO.
 *
 * Cuando le pasas una función a otro, le das el PAPEL, y él cocinará cuando le
 * toque. Si le pones los paréntesis, cocinas tú ahora mismo y le entregas el
 * plato — que casi nunca es lo que te estaba pidiendo.
 *
 *
 * ▸ UN EJEMPLO
 * ----------------------------------------------------------------------------
 *     const receta = () => "café"
 *
 *     receta      // el papel. Aquí no se ha cocinado nada.
 *     receta()    // "café". Aquí sí.
 *
 *
 * 🗣️ CÓMO SE LLAMA ESTO
 * ----------------------------------------------------------------------------
 *   · ENTREGAR una función  →  pasarla sin paréntesis
 *   · EJECUTARLA (o LLAMARLA)  →  ponerle los paréntesis
 *   · HANDLER  →  la función que entregas para que otro la llame cuando pase algo
 *
 *
 * ▸ EJERCICIO — 6 drills en escalera, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-01.test.ts
 * ===========================================================================*/

/* Estos dos ayudantes ya están escritos. Hacen de "el otro": reciben tu función
 * y la llaman ellos. Los necesitas en los drills 4, 5 y 6. No los toques. */
export function llamaConTexto(fn: (t: string) => void): void {
  fn("click");
}
llamaConTexto((t) => console.log(t)) // imprime "click" · no retorna nada

export function llamaConObjeto(fn: (suceso: { type: string }) => void): void {
  fn({ type: "click" });
}
llamaConObjeto((objeto) => console.log(objeto)) // imprime { type: "click" } · no retorna nada

// 1) `guardarEnLista` — una función se puede guardar en una variable o en un
//    array, igual que un número. Mete `receta` en un array y devuélvelo, sin
//    cocinarla.
//    👉 El starter la cocina y guarda el plato. Guarda el papel: quita los ().
//      guardarEnLista(() => "café")  →  un array con la función dentro
export function guardarEnLista(receta: () => string): Array<() => string> {
  return [receta];
}
guardarEnLista(() => "café") // → [ () => "café" ]

// 2) `ejecutar` — te dan una receta y tú quieres el plato. Cocínala y devuelve
//    lo que salga.
//    👉 El starter devuelve la receta en vez del plato, y TS te lo dice así:
//       "Type '() => string' is not assignable to type 'string'".
//       Traducido: le has dado el papel donde pedía comida. Enciende el fuego.
//      ejecutar(() => "café")  →  "café"
export function ejecutar(receta: () => string): string {
  return receta();
}
ejecutar(() => "café") // → "café"

// 3) `entregar` — la misma receta, pero al contrario: NO la cocines. Devuelve el
//    papel tal cual, para que lo cocine otro más tarde.
//    Mira el tipo de retorno: no es `string`, es `() => string`. Sale el papel.
//    👉 El starter cocina y devuelve el plato. TS dice
//       "Type 'string' is not assignable to type '() => string'".
//       Traducido: pedías papel y has dado comida. Apaga el fuego.
//      entregar(() => "café")    →  la función, sin cocinar
//      entregar(() => "café")()  →  "café"   ← los () de fuera son los que cocinan
export function entregar(receta: () => string): () => string {
  return receta;
}
entregar(() => "café")()   // → "café"

// 4) `entregarPelado` — aquí aparece OTRO que llama. `llamaConTexto` (arriba)
//    recibe una función y la llama él, pasándole un texto. Tú tienes `avisar`,
//    que pide un texto. Encaja: entrégasela y quítate de en medio.
//    👉 El starter llama a `avisar` él mismo. Tú no tienes que llamarlo: dáselo a
//       `llamaConTexto`, sin paréntesis, para que lo llame él.
//      entregarPelado(espia)  →  espia recibe "click"
export function entregarPelado(avisar: (t: string) => void): void {
  return llamaConTexto(avisar);
}
// entregarPelado((t) => console.log(t))   // "click"

// 5) `entregarEnvuelto` — el mismo `llamaConTexto`, que pasa un TEXTO. Pero
//    `avisarLargo` pide un NÚMERO. No encaja, así que no puedes dársela pelada.
//    Escribe ahí mismo una función de una línea que reciba el texto y llame a
//    `avisarLargo` con su longitud (`.length`).
//    👉 El starter se inventa el número. Tiene que salir del texto que llega.
//      entregarEnvuelto(espia)  →  espia recibe 5   ("click" tiene 5 letras)
export function entregarEnvuelto(avisarLargo: (n: number) => void): void {
  return llamaConTexto((t) => avisarLargo(t.length));
}
entregarEnvuelto((n) => console.log(n))   // retornará 5 en consola

// 6) `entregarSacandoDelObjeto` — ahora el que llama es `llamaConObjeto`, y no
//    pasa un texto: pasa un OBJETO, `{ type: "click" }`. Tu `avisar` sigue
//    pidiendo un texto, y el texto está DENTRO del objeto. Envuelve otra vez y
//    saca de ahí el campo que hace falta.
//    👉 El starter avisa con un texto vacío. El bueno viene dentro del objeto.
//      entregarSacandoDelObjeto(espia)  →  espia recibe "click"
export function entregarSacandoDelObjeto(avisar: (t: string) => void): void {
  return llamaConObjeto((objeto) => avisar(objeto.type));
}
// entregarSacandoDelObjeto((t) => console.log(t))   // "click"

/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 6 estén en verde, el 02 hace esto mismo con un botón de verdad:
 * el que llama es React, y lo que te pasa es un objeto — el EVENTO. O sea, el
 * drill 6, pero con React encima.
 * ───────────────────────────────────────────────────────────────────────────── */
