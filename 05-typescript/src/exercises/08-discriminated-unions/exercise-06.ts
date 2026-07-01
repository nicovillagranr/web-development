/* =============================================================================
 * EJERCICIO 06 — Errores como DATOS: encadenar y secuenciar Resultados
 * =============================================================================
 *
 * ▸ EXPLICACIÓN — el fallo es un valor que se MANEJA, no una excepción que vuela
 * ----------------------------------------------------------------------------
 * Con `throw`, el error sale "volando" hacia arriba y rompe el flujo: quien
 * llama puede olvidarse de envolver en try/catch y el programa se cae. Con
 * `Resultado<T>` el fallo es un VALOR normal que viaja por el `return`; el tipo
 * te OBLIGA a abrir el sobre y mirar `ok` antes de tocar el contenido. El error
 * deja de ser una sorpresa: es parte de la firma.
 *
 *   type Resultado<T> =
 *     | { ok: true;  valor: T }
 *     | { ok: false; error: string };
 *
 * Lo potente es COMBINAR varios pasos que pueden fallar. La regla de oro: en
 * cuanto uno falla, el error se propaga y los siguientes pasos NO se ejecutan
 * (no tiene sentido seguir con un valor que no existe). Eso es lo que practican
 * `andThen` (encadenar un paso) y `secuenciar` (juntar una lista entera).
 *
 *
 * ▸ ANALOGÍA — la cadena de aprobaciones de un trámite
 * ----------------------------------------------------------------------------
 * Un expediente pasa por ventanillas en orden: registro → revisión → firma. Si
 * UNA ventanilla lo rechaza, el expediente vuelve con el motivo y ya no avanza a
 * las siguientes: no firmas algo que revisión tumbó. `andThen` es "pásalo a la
 * próxima ventanilla SOLO si la anterior lo aprobó"; el sello rojo corta la fila.
 *
 *
 * ▸ EJEMPLO — encadenar dos pasos que pueden fallar
 * ----------------------------------------------------------------------------
 *
 *   // parseNumero("4") → ok 4 ; raiz(4) → ok 2
 *   const r = andThen(parseNumero("4"), raiz);   // ok 2
 *   const m = andThen(parseNumero("ab"), raiz);  // error de parseNumero; raiz ni corre
 *
 *
 * ▸ EJERCICIO — drills en escalera. EN ORDEN. ❌ nada de `any` ni `as`.
 *     pnpm test:run src/exercises/08-discriminated-unions/exercise-06.test.ts
 * ===========================================================================*/

export type Resultado<T> =
  | { ok: true; valor: T }
  | { ok: false; error: string }


/* ── BLOQUE A — fábricas de Resultado ──────────────────────────────────────── */

// 1) `parseNumero` — convierte un string a número. Usa `Number(s)`. Si sale
//    `NaN`, error "no es un número"; si no, ok con el número.
//    parseNumero("42") → { ok: true, valor: 42 }
//    parseNumero("abc") → { ok: false, error: "no es un número" }
//    Pista: `Number.isNaN(n)` para detectar el fallo.
export function parseNumero(s: string): Resultado<number> {
  // completa aquí
  return { ok: false, error: "" }
}

// 2) `raiz` — raíz cuadrada. Si `n` es negativo, error "negativo"; si no, ok con
//    `Math.sqrt(n)`.
//    raiz(9) → { ok: true, valor: 3 }
//    raiz(-1) → { ok: false, error: "negativo" }
export function raiz(n: number): Resultado<number> {
  // completa aquí
  return { ok: false, error: "" }
}


/* ── BLOQUE B — combinar pasos ─────────────────────────────────────────────── */

// 3) `andThen` — encadena: si `r` salió bien, aplica `f` a su valor (que a su vez
//    devuelve un Resultado); si `r` ya era error, déjalo pasar SIN llamar a `f`.
//    andThen({ ok: true, valor: 9 }, raiz) → { ok: true, valor: 3 }
//    andThen({ ok: false, error: "x" }, raiz) → { ok: false, error: "x" }
export function andThen<T, U>(r: Resultado<T>, f: (valor: T) => Resultado<U>): Resultado<U> {
  // completa aquí (estrecha por r.ok)
  return { ok: false, error: "" }
}

// 4) `primerError` — recorre una lista de Resultados y devuelve el mensaje del
//    PRIMER error que encuentre; si están todos ok, devuelve null.
//    primerError([{ ok: true, valor: 1 }, { ok: false, error: "a" }]) → "a"
//    primerError([{ ok: true, valor: 1 }]) → null
export function primerError<T>(rs: Resultado<T>[]): string | null {
  // completa aquí (un for/for...of, o .find)
  return null
}

// 5) CAPSTONE `secuenciar` — junta una lista de Resultados en un SOLO Resultado:
//    si TODOS son ok, devuelve ok con el array de todos los valores; si ALGUNO
//    falla, devuelve ese primer error (y descarta lo demás).
//    secuenciar([{ ok: true, valor: 1 }, { ok: true, valor: 2 }]) → { ok: true, valor: [1, 2] }
//    secuenciar([{ ok: true, valor: 1 }, { ok: false, error: "x" }]) → { ok: false, error: "x" }
export function secuenciar<T>(rs: Resultado<T>[]): Resultado<T[]> {
  // completa aquí (acumula los valores; corta al primer error)
  return { ok: false, error: "" }
}
