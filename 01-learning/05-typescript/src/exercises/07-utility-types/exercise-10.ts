/* =============================================================================
 * EJERCICIO 10 — utility types (7/?): Required<T> · bloque 07
 *
 * 🎯 OBJETIVOS
 * · Volver obligatorias todas las propiedades de un tipo con Required<T>.
 * · Completar un borrador con huecos usando defaults y ??.
 *
 * 🟢 CONTEXTO — Partial<T> afloja: pone un ? en cada propiedad. Required<T> es su
 * espejo exacto: quita el ? de todas. Es la herramienta del momento «ya no es un
 * borrador, ahora va en serio»: un objeto que se llenaba a trozos y que, antes de
 * publicarse o guardarse, debe estar completo.
 *
 * 🗺️ MAPA
 * TEORÍA · qué es Required<T> → base de todo el archivo
 * BLOQUE A · Required en el parámetro: exigir el objeto completo → drills 1–2
 * BLOQUE B · Required en el retorno: prometer que sale completo → drills 3–4
 * BLOQUE C · capstone: de borrador a medias a completo → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/07-utility-types/exercise-10.test.ts
 * pnpm typecheck
 *
 * Cada starter va mal a propósito: typecheck y/o test en rojo. Corre el test tras
 * cada uno.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — qué es Required<T>
 *
 * DEFINICIÓN
 * Required<T> toma un tipo T y devuelve una copia con todas sus propiedades
 * obligatorias: les arranca el ?.
 *
 * Ejemplos:
 * type Borrador = { titulo?: string; cuerpo?: string; autor?: string }
 * Required<Borrador> → { titulo: string; cuerpo: string; autor: string }
 *
 * 🧠 ANALOGÍA — un formulario en dos fases: mientras es borrador puedes dejar
 * campos en blanco (Partial), pero el botón «Publicar» exige que estén todos
 * rellenos (Required). Si falta uno, no te deja enviar.
 *
 * 💡 Por dentro es un mapped type con el modificador -?, que resta la
 * opcionalidad: type Required<T> = { [K in keyof T]-?: T[K] }. Compáralo con
 * Partial<T> = { [K in keyof T]?: T[K] }: el ? añade opcionalidad y el -? la quita.
 * Es la misma maquinaria, al revés.
 *
 * 💡 Caso real: validar antes de guardar. Recoges datos parciales de un formulario
 * (Partial), los completas con defaults, y la función que finalmente persiste
 * exige Required<…>: el tipo te garantiza que ningún campo viene undefined, así
 * que dentro no necesitas ?. ni ??.
 * ───────────────────────────────────────────────────────────────────────────── */

type Borrador = { titulo?: string; cuerpo?: string; autor?: string };

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE A — Required en el parámetro: exigir el objeto completo
 *
 * Con Required en la puerta, quien llama está obligado a traer todos los campos; y
 * dentro tú trabajas tranquilo, porque ninguno puede ser undefined.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) publicar — recibe un borrador que ya debe estar completo y devuelve el
 * texto publicado.
 * 👉 Dos arreglos: el tipo del parámetro (ahora acepta campos opcionales, así
 *    que el test podría colar un borrador a medias) y el cuerpo (devuelve "").
 *   publicar({ titulo: "Hola", cuerpo: "texto", autor: "Ana" }) → "Hola por Ana"
 */
export function publicar(b: Required<Borrador>): string {
  return `${b.titulo} por ${b.autor}`;
}
publicar({ titulo: "Hola", cuerpo: "texto", autor: "Ana" }); // return: "Hola por Ana"

type Pedido = { producto?: string; cantidad?: number };

/* 2) confirmar — refuerzo: recibe un pedido completo y devuelve el resumen.
 * confirmar({ producto: "Té", cantidad: 3 }) → "3x Té"
 */
export function confirmar(p: Required<Pedido>): string {
  return `${p.cantidad}x ${p.producto}`;
}
confirmar({ producto: "Té", cantidad: 3 }); // return: "3x Té"

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE B — Required en el retorno: prometer que sale completo
 *
 * La función construye y devuelve un objeto con todas las propiedades. El tipo de
 * retorno Required<…> te obliga a no dejarte ninguna.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 3) crearBorrador — recibe los tres campos sueltos y devuelve un borrador
 * completo (ya publicable).
 * 👉 Dos arreglos: el tipo de retorno (ahora permite huecos) y el cuerpo (el
 *    starter se deja cuerpo y autor).
 *   crearBorrador("Hola", "texto", "Ana")
 *     → { titulo: "Hola", cuerpo: "texto", autor: "Ana" }
 */
export function crearBorrador(titulo: string, cuerpo: string, autor: string): Required<Borrador> {
  return { titulo, cuerpo, autor };
}

/* 4) crearPedido — refuerzo: devuelve un pedido completo.
 * crearPedido("Té", 3) → { producto: "Té", cantidad: 3 }
 */
export function crearPedido(producto: string, cantidad: number): Required<Pedido> {
  return { producto, cantidad };
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE C — capstone: de borrador a medias a completo (Partial-ish + defaults)
 *
 * Se juntan las dos caras: entra un borrador con huecos, unos defaults completos
 * (Required) rellenan lo que falte, y sale algo completo (Required). Reaparece tu
 * ??: cada campo es «el del borrador o, si falta, el default».
 * ───────────────────────────────────────────────────────────────────────────── */

/* 5) completar — recibe un borrador con posibles huecos y unos defaults
 * completos; devuelve un borrador completo usando el valor del borrador cuando
 * está, y el default cuando falta.
 * 👉 Arreglos: el tipo de defaults (debe estar completo), el tipo de retorno
 *    (completo) y el cuerpo (el starter ignora el borrador y devuelve los
 *    defaults tal cual). Pista: borrador.titulo ?? defaults.titulo, etc.
 *   completar({ titulo: "Mío" }, { titulo: "X", cuerpo: "C", autor: "A" })
 *     → { titulo: "Mío", cuerpo: "C", autor: "A" }
 */
export function completar(borrador: Borrador, defaults: Required<Borrador>): Required<Borrador> {
  return {
    titulo: borrador.titulo ?? defaults.titulo,
    cuerpo: borrador.cuerpo ?? defaults.cuerpo,
    autor: borrador.autor ?? defaults.autor,
  };
}
