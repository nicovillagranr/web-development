/* =============================================================================
 * EJERCICIO 02 — narrowing: estrechar una unión antes de usarla · bloque 05
 *
 * 🎯 OBJETIVOS
 * · Estrechar con typeof una unión de primitivos antes de usar sus métodos.
 * · Descartar el undefined de un valor opcional antes de usarlo.
 *
 * 🟢 CONTEXTO — en los ejercicios 05 y 06 aprendiste a crear uniones:
 * string | number, "light" | "dark", o una propiedad opcional phone?, que por
 * dentro es string | undefined. Crear la unión es la mitad del trabajo; la otra
 * mitad es usarla sin que TypeScript se queje.
 *
 * 🗺️ MAPA
 * TEORÍA · narrowing con typeof y con undefined → drills 1–3
 *
 * ▸ 3 drills en orden. Prohibidos any y as X (type assertions). Estrecha con
 * typeof o con un chequeo de undefined o de truthiness.
 * pnpm test:run src/exercises/05-unions-narrowing/exercise-02.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — narrowing: preguntar antes de usar
 *
 * DEFINICIÓN
 * Si una variable es string | number, no puedes tratarla como si fuera solo un
 * número: x.toFixed(2) falla, porque x podría ser un string. Narrowing
 * (estrechamiento) es preguntar en ejecución «¿de qué tipo es esto ahora?» con un
 * if: dentro de esa rama, TS ya sabe el tipo exacto. typeof x === "number" es un
 * type guard: estrecha dentro del if, y fuera vuelve a ser string | number.
 *
 * SINTAXIS
 * function doblar(x: string | number) {
 *   if (typeof x === "number") {
 *     return x.toFixed(2); // ✅ aquí dentro x es number, sin duda
 *   }
 *   return x.toUpperCase(); // ✅ aquí x ya solo puede ser string
 * }
 *
 * Ejemplos, con nombre: string | undefined (una propiedad opcional):
 * if (nombre === undefined) return … → la rama «no vino nombre»; después, string
 * if (!nombre) return …              → truthiness: descarta undefined, null y ""
 *
 * 🗣️ LAS PIEZAS — los valores válidos para typeof son strings: "string",
 * "number", "boolean", "undefined", "object", "function", "symbol", "bigint".
 *
 * 🧠 ANALOGÍA — una caja con la etiqueta borrosa, «ropa o libros»: no puedes
 * doblarla como ropa ni leerla como libro hasta abrirla. La unión es la etiqueta
 * borrosa; if (typeof x === "number") es abrir la caja y comprobar.
 *
 * 💡 Patrón general: estrecha primero, usa después. typeof para elegir entre
 * primitivos; x === undefined o !x para descartar el «no hay valor» de algo
 * opcional.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) formatearPrecio(valor: string | number): string
 * - Si valor es number  → devuélvelo con 2 decimales y signo $:  "$19.90"
 *   (pista: "$" + valor.toFixed(2)).
 * - Si valor es string  → devuélvelo tal cual pero recortado de espacios
 *   al inicio/fin (pista: valor.trim()).
 * Usa typeof para estrechar antes de llamar a cada método.
 */
export function formatearPrecio(valor: string | number): string {
  if (typeof valor === "number") {
    return `$${valor.toFixed(2)}`;
  }
  return `${valor.trim()}`;
}

/* 2) saludarUsuario(nombre: string | undefined): string
 * - Si no hay nombre (undefined) → devuelve "Hola, invitado".
 * - Si hay nombre               → devuelve `Hola, ${nombre}`.
 * Descarta el undefined antes de usar nombre.
 */
export function saludarUsuario(nombre: string | undefined): string {
  if (typeof nombre === "undefined") {
    return `Hola, invitado`;
  }
  return `Hola, ${nombre}`;
}

/* 3) longitudMensaje(texto: string, extra?: string): number
 * Devuelve la cantidad total de caracteres sumando texto y, solo si
 * extra existe, también su longitud.
 * - longitudMensaje("hola")          → 4
 * - longitudMensaje("hola", "mundo") → 9
 * extra es opcional (string | undefined): estréchalo antes de leer
 * extra.length.
 */
export function longitudMensaje(texto: string, extra?: string): number {
  if (typeof extra === "undefined") {
    return texto.length;
  }
  return texto.length + extra.length;
}
