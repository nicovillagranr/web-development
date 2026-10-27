/* =============================================================================
 * EJERCICIO 08 — type guards propios (x is Tipo) · bloque 05
 *
 * 🎯 OBJETIVOS
 * · Encapsular una comprobación en una función que devuelve x is Tipo.
 * · Usar ese portero para estrechar y para filtrar listas.
 *
 * 🟢 CONTEXTO — a veces la comprobación se repite, o es a medida. La encapsulas en
 * una función cuyo retorno es x is Tipo: un portero reutilizable. TS confía en él
 * para estrechar, y puedes pasarlo directo a .filter.
 *
 * 🗺️ MAPA
 * TEORÍA · el type guard propio → base de todo el archivo
 * BLOQUE A · definir los porteros → drills 1–2
 * BLOQUE B · usar los porteros en filter → drills 3–4
 * BLOQUE C · capstone: contar por tipo → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/05-unions-narrowing/exercise-08.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — el type guard propio
 *
 * DEFINICIÓN
 * Una función con retorno x is Tipo promete a TS que, si devuelve true, el
 * argumento es de ese tipo. TS estrecha con ella como con typeof.
 *
 * SINTAXIS
 * function esString(x: unknown): x is string {
 *   return typeof x === 'string'
 * }
 * xs.filter(esString) // → string[]: el guard limpia el tipo
 *
 * 🧠 ANALOGÍA — un portero de discoteca con una norma fija: en vez de repetir la
 * norma en cada puerta, contratas a un portero (la función) y lo pones donde haga
 * falta.
 *
 * ⚠️ TRAMPA — el cuerpo debe devolver un boolean coherente con la promesa
 * x is Tipo. Si mientes (devuelves true para algo que no es), TS confía y luego
 * revienta.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE A — definir los porteros */

/* 1) esString — ¿es un string?
 * esString("a") → true ; esString(5) → false
 */
export function esString(x: unknown): x is string {
  return typeof x === "string";
}

/* 2) esNumero — ¿es un number?
 * esNumero(5) → true ; esNumero("a") → false
 */
export function esNumero(x: unknown): x is number {
  return typeof x === "number";
}

/* ▸ BLOQUE B — usar los porteros en filter */

/* 3) soloStrings — quédate solo con los strings (resultado string[]).
 * soloStrings([1, "a", 2, "b"]) → ["a", "b"]
 */
export function soloStrings(xs: unknown[]): string[] {
  return xs.filter(esString);
}

/* 4) soloNumeros — quédate solo con los números (resultado number[]).
 * soloNumeros([1, "a", 2, "b"]) → [1, 2]
 */
export function soloNumeros(xs: unknown[]): number[] {
  return xs.filter(esNumero);
}

/* ▸ BLOQUE C — capstone: contar por tipo */

/* 5) contarTipos — cuántos strings y cuántos números hay.
 * contarTipos([1, "a", 2, "b", "c"]) → { strings: 3, numeros: 2 }
 */
export function contarTipos(xs: unknown[]): { strings: number; numeros: number } {
  return xs.reduce(
    (acum: { strings: number; numeros: number }, valor) => {
      if (esString(valor)) {
        return { ...acum, strings: acum.strings + 1 };
      } else {
        if (esNumero(valor)) {
          return { ...acum, numeros: acum.numeros + 1 };
        }
      }
      return acum;
    },
    { strings: 0, numeros: 0 },
  );
}
