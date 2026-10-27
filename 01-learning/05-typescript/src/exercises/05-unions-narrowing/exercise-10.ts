/* =============================================================================
 * EJERCICIO 10 — capstone: procesar valores de formulario (teje 04–09) · bloque 05
 *
 * 🎯 OBJETIVOS
 * · Combinar typeof, el descarte de null y los filtros con predicado de tipo.
 * · Limpiar y resumir una lista de valores de formulario.
 *
 * 🟢 CONTEXTO — cierre de la carpeta. Un valor de formulario puede ser texto,
 * número o estar vacío (string | number | null). Combinas narrowing por typeof,
 * descarte de null y filtros con predicado de tipo para limpiarlos y resumirlos.
 *
 * 🧠 ANALOGÍA — revisar un formulario lleno a mano: algunas casillas con texto,
 * otras con números, otras en blanco. Las clasificas, descartas las vacías y haces
 * el resumen.
 *
 * 🗺️ MAPA
 * BLOQUE A · un valor → drills 1–2
 * BLOQUE B · una lista: limpiar y sumar → drills 3–4
 * BLOQUE C · capstone: resumen → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/05-unions-narrowing/exercise-10.test.ts
 * pnpm typecheck
 *
 * 💡 v === null descarta el vacío; typeof v === 'number' separa los números; el
 * predicado v is number limpia el tipo de la lista filtrada.
 * ============================================================================= */

export type Valor = string | number | null;

/* ▸ BLOQUE A — un valor */

/* 1) aTexto — null → "—" ; number → "$<n>" ; string → tal cual.
 * aTexto(null) → "—" ; aTexto(5) → "$5" ; aTexto("hi") → "hi"
 */
export function aTexto(v: Valor): string {
  switch (typeof v) {
    case "number":
      return `$${v}`;
    case "string":
      return v;
    default:
      return "—";
  }
}

/* 2) esVacio — ¿está vacío? (null o string vacío)
 * esVacio(null) → true ; esVacio("") → true ; esVacio("a") → false ; esVacio(0) → false
 */
export function esVacio(v: Valor): boolean {
  switch (typeof v) {
    case "string":
      return v === "";
    default:
      return v === null;
  }
}
esVacio(10); // false porque

/* ▸ BLOQUE B — una lista: limpiar y sumar */

/* 3) soloValidos — quita los null (deja (string | number)[]).
 * soloValidos(["a", null, 5]) → ["a", 5]
 */
export function soloValidos(vs: Valor[]): (string | number)[] {
  return vs.filter((v) => v !== null);
}

/* 4) sumarNumericos — suma solo los números.
 * sumarNumericos([1, "a", 2, null]) → 3
 */
export function sumarNumericos(vs: Valor[]): number {
  return vs.filter((v) => typeof v === "number").reduce((a, b) => a + b, 0);
}

/* ▸ BLOQUE C — capstone: resumen */

/* 5) resumen — "<n> válidos, suma <total>".
 * resumen(["a", null, 5, "b"]) → "3 válidos, suma 5"
 */
export function resumen(vs: Valor[]): string {
  return vs.filter((v) => v !== null).length + " válidos, suma " + sumarNumericos(vs);
}
