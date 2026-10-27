/* =============================================================================
 * EJERCICIO 05 — genéricos con constraints (<T extends …>) · bloque 06
 *
 * 🎯 OBJETIVOS
 * · Poner una condición mínima a T con extends y usar esa parte garantizada.
 * · Conservar el tipo concreto que entró aunque solo se exija una parte.
 *
 * 🟢 CONTEXTO — un genérico pelado <T> acepta cualquier cosa, pero entonces no
 * puedes tocar sus campos. El extends pone una condición: «T, sea lo que sea, al
 * menos tiene esto». Así usas esa parte garantizada y sigues aceptando muchos
 * tipos.
 *
 * 🗺️ MAPA
 * TEORÍA · la condición mínima: extends → base de todo el archivo
 * BLOQUE A · extends { length } y { id } → drills 1–2
 * BLOQUE B · listas de cosas con id → drills 3–4
 * BLOQUE C · capstone: campeón por un criterio → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/06-generics-basicos/exercise-05.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — la condición mínima: extends
 *
 * DEFINICIÓN
 * <T extends { id: number }> acepta cualquier T que tenga, como mínimo, un id
 * numérico.
 *
 * SINTAXIS
 * function idDe<T extends { id: number }>(x: T): number {
 *   return x.id // garantizado: todo T tiene id: number
 * }
 *
 * Ejemplos:
 * idDe({ id: 1, nombre: "a" }) → ✅ tiene id (y más)
 * idDe({ nombre: "a" })        → ❌ no cumple el contrato
 *
 * 🧠 ANALOGÍA — «acepto cualquier vehículo, pero debe tener ruedas»: no te importa
 * si es moto o camión; cuentas con que hay ruedas.
 *
 * 💡 El constraint sirve al cuerpo (usa .id o .length) y filtra a quien llama
 * (solo pasa lo que cumple). Y el genérico recuerda el tipo concreto que entró.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE A — extends { length } y { id } */

/* 1) masLargo — el que tenga más length (vale para strings y arrays).
 * masLargo("abc", "de") → "abc" ; masLargo([1], [1, 2, 3]) → [1, 2, 3]
 */
export function masLargo<T extends { length: number }>(a: T, b: T): T {
  return a.length > b.length ? a : b;
}
masLargo("abc", "de"); // 'abc'
masLargo([1], [1, 2, 3]); // [1, 2, 3]

/* 2) idDe — el id de cualquier objeto que tenga id.
 * idDe({ id: 5, nombre: "x" }) → 5
 */
export function idDe<T extends { id: number }>(x: T): number {
  return x.id;
}
idDe({ id: 5, nombre: "x" }); // 5

/* ▸ BLOQUE B — listas de cosas con id */

/* 3) idsDe — los ids de una lista de objetos con id.
 * idsDe([{ id: 1 }, { id: 2 }]) → [1, 2]
 */
export function idsDe<T extends { id: number }>(xs: T[]): number[] {
  return xs.map((x) => x.id);
}
idsDe([{ id: 1 }, { id: 2 }]); // [1, 2]

/* 4) porId — el objeto con ese id, o undefined.
 * porId([{ id: 1 }, { id: 2 }], 2) → { id: 2 }
 */
export function porId<T extends { id: number }>(xs: T[], id: number): T | undefined {
  return xs.find((x) => x.id === id);
}
porId([{ id: 1 }, { id: 2 }], 2); // { id: 2 }

/* ▸ BLOQUE C — capstone: campeón por un criterio */

/* 5) maxPor — el elemento con mayor valor(x), o undefined si vacío.
 * maxPor([{ v: 1 }, { v: 5 }, { v: 3 }], (x) => x.v) → { v: 5 }
 */
export function maxPor<T>(xs: T[], valor: (x: T) => number): T | undefined {
  return xs.reduce<T | undefined>(
    (m, x) => (m === undefined || valor(x) > valor(m) ? x : m),
    undefined,
  );
}
maxPor([{ v: 1 }, { v: 5 }, { v: 3 }], (x) => x.v); // { v: 5 }
