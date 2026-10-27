/* =============================================================================
 * EJERCICIO 07 — quitar null y undefined de una unión (y de una lista) · bloque 05
 *
 * 🎯 OBJETIVOS
 * · Dar un respaldo a un valor que puede faltar, con ?? y ?..
 * · Filtrar los huecos de una lista y dejar un tipo limpio.
 *
 * 🟢 CONTEXTO — null y undefined se cuelan en datos reales: campos opcionales,
 * respuestas de API. Para un valor los resuelves con ?. y ??; para una lista, los
 * filtras con un predicado de tipo, y así el resultado deja de incluir null.
 *
 * 🗺️ MAPA
 * TEORÍA · el respaldo y el filtro → base de todo el archivo
 * BLOQUE A · un valor: respaldo → drills 1–2
 * BLOQUE B · una lista: filtrar los huecos → drills 3–4
 * BLOQUE C · capstone: extraer un campo y limpiar → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/05-unions-narrowing/exercise-07.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — el respaldo y el filtro
 *
 * SINTAXIS
 * x ?? 'respaldo'                           // un valor: respaldo si es null o undefined
 * xs.filter((x): x is string => x !== null) // una lista: fuera los null → string[]
 *
 * 🧠 ANALOGÍA — una caja de fruta con algunas casillas vacías. ?? es «si está
 * vacía, pon una de plástico»; el filtro es «tira las casillas vacías y quédate
 * solo con fruta real».
 *
 * ⚠️ TRAMPA — desde TS 5.5, filter(x => x !== null) ya deduce solo el predicado y
 * deja string[]. Pero la deducción se rompe si anotas (x): boolean o usas
 * filter(Boolean): ahí el (string | null)[] se queda, y el x is string escrito a
 * mano es lo que limpia el tipo.
 * ───────────────────────────────────────────────────────────────────────────── */

export type Usuario = { nombre: string | null };

/* ▸ BLOQUE A — un valor: respaldo */

/* 1) oVacio — el string, o "" si es null.
 * oVacio("a") → "a" ; oVacio(null) → ""
 */
export function oVacio(x: string | null): string {
  return x ?? "";
}
oVacio(null); // ""
oVacio("a"); // "a"
oVacio("Nicolás Villagrán"); // "Nicolás Villagrán"

/* 2) longitudSegura — la longitud, o 0 si no hay valor.
 * longitudSegura("hola") → 4 ; longitudSegura(null) → 0
 */
export function longitudSegura(x: string | null | undefined): number {
  return x?.length ?? 0; // si x tiene existe, devuelve su longitud; si no, 0
}

/* ▸ BLOQUE B — una lista: filtrar los huecos */

/* 3) sinNulos — quita los null y deja string[].
 * sinNulos(["a", null, "b"]) → ["a", "b"]
 */
export function sinNulos(xs: (string | null)[]): string[] {
  return xs.filter((x): x is string => x !== null);
}
sinNulos(["a", null, "b"]); // ["a", "b"]

/* 4) sumarDefinidos — suma los números, ignorando los undefined.
 * sumarDefinidos([1, undefined, 2]) → 3
 */
export function sumarDefinidos(xs: (number | undefined)[]): number {
  return xs.map((x) => x ?? 0).reduce((a, b) => a + b, 0);
}

/* ▸ BLOQUE C — capstone: extraer un campo y limpiar */

/* 5) nombresValidos — los nombres no nulos de los usuarios.
 * nombresValidos([{nombre:"a"},{nombre:null},{nombre:"b"}]) → ["a", "b"]
 */
export function nombresValidos(usuarios: Usuario[]): string[] {
  return usuarios.map((u) => u.nombre ?? "").filter((x) => x !== "");
}
nombresValidos([{ nombre: "a" }, { nombre: null }, { nombre: "b" }]); // ["a", "b"]
nombresValidos([{ nombre: "a" }, { nombre: "b" }]); // ["a", "b"]
nombresValidos([]); // []
nombresValidos([{ nombre: null }]); // []
nombresValidos([{ nombre: null }, { nombre: "" }]); // []
