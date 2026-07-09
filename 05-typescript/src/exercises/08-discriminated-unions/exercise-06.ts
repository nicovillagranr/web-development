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
  const n = Number(s) // Puede ser un number o NaN
  if (!Number.isNaN(n)) {
    // Si n no es NaN retorna true y n
    return { ok: true, valor: n }
  }
  // Si n es NaN, retorna false y error: "no es un número"
  return { ok: false, error: "no es un número" }
}

// 2) `raiz` — raíz cuadrada. Si `n` es negativo, error "negativo"; si no, ok con
//    `Math.sqrt(n)`.
//    raiz(9) → { ok: true, valor: 3 }
//    raiz(-1) → { ok: false, error: "negativo" }
export function raiz(n: number): Resultado<number> {
  if (n < 0) {
    return { ok: false, error: "negativo" }
  }
  return { ok: true, valor: Math.sqrt(n) }
}


/* ── BLOQUE B — combinar pasos ─────────────────────────────────────────────── */

// 3) `andThen` — encadena: si `r` salió bien, aplica `f` a su valor (que a su vez
//    devuelve un Resultado); si `r` ya era error, déjalo pasar SIN llamar a `f`.
//    andThen({ ok: true, valor: 9 }, raiz) → { ok: true, valor: 3 }
//    andThen({ ok: false, error: "x" }, raiz) → { ok: false, error: "x" }
export function andThen<T, U>(r: Resultado<T>, f: (valor: T) => Resultado<U>): Resultado<U> {
  if (r.ok) {
    return f(r.valor)
  }
  return { ok: false, error: r.error }
}

// 4) `primerError` — recorre una lista de Resultados y devuelve el mensaje del
//    PRIMER error que encuentre; si están todos ok, devuelve null.
//    primerError([{ ok: true, valor: 1 }, { ok: false, error: "a" }]) → "a"
//    primerError([{ ok: true, valor: 1 }]) → null
export function primerError<T>(rs: Resultado<T>[]): string | null {
  for (const r of rs) {
    if (!r.ok) {
      return r.error
    }
  }
  return null
}

// 5) CAPSTONE `secuenciar` — junta una lista de Resultados en un SOLO Resultado:
//    si TODOS son ok, devuelve ok con el array de todos los valores; si ALGUNO
//    falla, devuelve ese primer error (y descarta lo demás).
//    secuenciar([{ ok: true, valor: 1 }, { ok: true, valor: 2 }]) → { ok: true, valor: [1, 2] }
//    secuenciar([{ ok: true, valor: 1 }, { ok: false, error: "x" }]) → { ok: false, error: "x" }
export function secuenciar<T>(rs: Resultado<T>[]): Resultado<T[]> {
  const salida: T[] = []
  for (const r of rs) {
    if (!r.ok) {
      return { ok: false, error: r.error }
    }
    salida.push(r.valor)
  }
  return { ok: true, valor: salida }
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE C — ENTENDER `secuenciar` DESDE EL SUELO (escalera de refuerzo)
 * ════════════════════════════════════════════════════════════════════════════
 *
 * `secuenciar` cuesta porque hace TRES cosas al mismo tiempo:
 *   (a) ACUMULAR: ir metiendo valores en un array nuevo mientras recorres,
 *   (b) CORTAR: si aparece uno malo, abandonar y devolver ese fallo (short-circuit),
 *   (c) ENVOLVER: al final, meter el array acumulado dentro de un `Resultado`.
 *
 * Vamos a aislar cada pieza y subir de a un escalón. Cuando termines C1→C3,
 * vuelve a mirar `secuenciar` y lo vas a ver como "C3 pero con Resultado".
 *
 * Reglas de siempre: ❌ nada de `any` ni `as`. Resuelve EN ORDEN.
 * ==========================================================================*/


/* ── C1 — ACUMULADOR PURO ──────────────────────────────────────────────────────
 * La pieza (a), sola. Recibes un array de números y devuelves un array NUEVO con
 * cada número por 10. Nada de cortes, nada de Resultado: solo aprender a
 * "construir un array a mano mientras recorres".
 *
 * El patrón acumulador, que vas a repetir toda tu vida:
 *   1. antes del bucle: crea el array vacío   → const out: number[] = []
 *   2. dentro del for...of: mételo con push    → out.push(n * 10)
 *   3. después del bucle: devuélvelo           → return out
 *
 * Analogía: una cesta vacía en la entrada del súper; recorres los pasillos y vas
 * ECHANDO cosas a la cesta; al final sales con la cesta llena.
 *
 *   por10([1, 2, 3]) → [10, 20, 30]
 *   por10([])        → []            (cesta que nunca se llenó = array vacío)
 */
export function por10(ns: number[]): number[] {
  const salida: number[] = []
  for (const n of ns) {
    salida.push(n * 10)
  }
  return salida
}
// por10([1, 2, 3]) // → [10, 20, 30]
// por10([])        // → []


/* ── C2 — ACUMULAR CON CORTE (short-circuit) ───────────────────────────────────
 * Ahora piezas (a)+(b) juntas, todavía SIN Resultado. Recorres números y los vas
 * acumulando; PERO si aparece un número negativo, ABANDONAS todo y devuelves
 * `null` (el negativo "envenena" la lista entera). Si llegas al final sin ningún
 * negativo, devuelves el array acumulado.
 *
 * Es C1 + el corte que ya practicaste en `primerError`:
 *   1. const out: number[] = []
 *   2. for...of: si (n < 0) return null   ← corta YA, descarta lo acumulado
 *                si no, out.push(n)
 *   3. si el bucle termina entero → return out
 *
 * Analogía: llenas la cesta, pero si encuentras UN producto vencido, sueltas la
 * cesta entera y sales con las manos vacías (null). No sirve media compra.
 *
 *   soloPositivos([1, 2, 3])  → [1, 2, 3]
 *   soloPositivos([1, -5, 3]) → null       (el -5 tumba toda la lista)
 *   soloPositivos([])         → []          (nada malo = array vacío)
 */
export function soloPositivos(ns: number[]): number[] | null {
  const salida: number[] = []
  for (const n of ns) {
    if (n < 0) {
      return null
    }
    salida.push(n)
  }
  return salida
}
// soloPositivos([1, 2, 3])  // → [1, 2, 3]
// soloPositivos([1, -5, 3]) // → null


/* ── C3 — LO MISMO, PERO EL "MALO" ES UN Resultado con ok:false ────────────────
 * Último escalón antes del capstone. Idéntico a C2, pero en vez de números sueltos
 * recibes `Resultado<number>[]`, y "malo" ya no es `n < 0` sino `!r.ok`. Si todos
 * son ok, devuelves el array de sus VALORES (los `r.valor`); si alguno falla,
 * devuelves `null`.
 *
 * Cambios respecto a C2, uno a uno:
 *   - la condición de corte:  n < 0        →   !r.ok
 *   - lo que acumulas:        n            →   r.valor   (dentro del if !r.ok, TS
 *                                                sabe que en el else hay r.valor)
 *
 *   valoresSiTodoOk([{ ok: true, valor: 1 }, { ok: true, valor: 2 }]) → [1, 2]
 *   valoresSiTodoOk([{ ok: true, valor: 1 }, { ok: false, error: "x" }]) → null
 *   valoresSiTodoOk([]) → []
 */
export function valoresSiTodoOk(rs: Resultado<number>[]): number[] | null {
  const salida: number[] = []   // (1) la cesta vacía — igual que en tu soloPositivos
  for (const r of rs) {         //     recorro cada SOBRE (Resultado) de la lista
    if (!r.ok) {                // (2) ¿sello rojo? → suelto la cesta entera y CORTO
      return null               //     el `return` en un for...of SÍ sale de la función
    }                           //     entera (esto es lo que reduce no puede hacer)
    // (3) si el `return null` de arriba no disparó, TS SABE que aquí el sello es
    //     ok:true → en esta rama el sobre SÍ tiene `.valor`. Lo echo a la cesta.
    salida.push(r.valor)
  }
  return salida                 // (4) sobreviví el bucle entero → todos ok → cesta llena
}
// valoresSiTodoOk([{ ok: true, valor: 1 }, { ok: true, valor: 2 }]) // → [1, 2]
// valoresSiTodoOk([{ ok: true, valor: 1 }, { ok: false, error: "x" }]) // → null


/* ── VUELTA AL CAPSTONE ────────────────────────────────────────────────────────
 * `secuenciar` = C3 con DOS cambios mínimos:
 *   - cuando cortas, en vez de `return null` devuelves el error como Resultado:
 *         return r            (r ya es { ok: false; error }, aprovéchalo)
 *   - cuando terminas ok, en vez de `return out` lo ENVUELVES:
 *         return { ok: true, valor: out }
 * Eso es todo. Sube y complétalo.
 * ==========================================================================*/
