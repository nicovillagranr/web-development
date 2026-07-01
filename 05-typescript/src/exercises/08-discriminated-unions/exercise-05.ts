/* =============================================================================
 * EJERCICIO 05 — El discriminante puede ser un booleano: el tipo `Resultado<T>`
 * =============================================================================
 *
 * ▸ EXPLICACIÓN — el "tag" no tiene por qué llamarse "tipo" ni ser un string
 * ----------------------------------------------------------------------------
 * Hasta ahora el discriminante era un string ("circulo", "exito"…) en un campo
 * llamado `tipo` o `estado`. Pero la regla real es más amplia: el discriminante
 * es CUALQUIER campo común cuyo valor sea un LITERAL distinto en cada variante.
 * Y `true` y `false` son literales perfectamente válidos.
 *
 * El patrón más famoso que explota esto es `Resultado<T>` (en otros lenguajes
 * lo llaman `Result`, `Either`): representa "salió bien con un valor" o "salió
 * mal con un error", usando un booleano `ok` como etiqueta:
 *
 *   type Resultado<T> =
 *     | { ok: true;  valor: T }
 *     | { ok: false; error: string };
 *
 * Como `ok` es `true` en una variante y `false` en la otra, basta `if (r.ok)`
 * para que TS sepa que ahí dentro existe `r.valor` (y en el `else`, `r.error`):
 *
 *   function mostrar(r: Resultado<number>): string {
 *     if (r.ok) return `Valor: ${r.valor}`;   // r es { ok: true; valor }
 *     return `Error: ${r.error}`;             // r es { ok: false; error }
 *   }
 *
 *
 * ▸ ANALOGÍA — el sobre con sello de "PAGADO" o "DEVUELTO"
 * ----------------------------------------------------------------------------
 * Un sobre del banco trae un sello: verde "PAGADO" (dentro, el comprobante con
 * el importe) o rojo "DEVUELTO" (dentro, el motivo del rechazo). El sello
 * booleano —pagado sí/no— te dice de antemano qué papel vas a encontrar. Nunca
 * encuentras importe Y motivo a la vez: el sello manda.
 *
 *
 * ▸ CUÁNDO USAR
 * ----------------------------------------------------------------------------
 *   - Cuando una operación puede fallar y quieres OBLIGAR a quien la usa a
 *     contemplar el fallo, sin lanzar excepciones. Lo profundizamos en el 06.
 *
 *
 * ▸ EJERCICIO — drills en escalera. EN ORDEN. ❌ nada de `any` ni `as`.
 *     pnpm test:run src/exercises/08-discriminated-unions/exercise-05.test.ts
 * ===========================================================================*/

export type Resultado<T> =
  | { ok: true; valor: T }
  | { ok: false; error: string }


/* ── BLOQUE A — leer un Resultado ──────────────────────────────────────────── */

// 1) `esExito` — ¿salió bien? Pista: el propio campo discriminante ES la
//    respuesta. (No necesitas if/else.)
//    esExito({ ok: true, valor: 5 }) → true
export function esExito<T>(r: Resultado<T>): boolean {
  // completa aquí (una línea)
  return false
}

// 2) `valorODefecto` — el valor si salió bien; si no, el `porDefecto` que te pasan.
//    valorODefecto({ ok: true, valor: 5 }, 0) → 5
//    valorODefecto({ ok: false, error: "x" }, 0) → 0
export function valorODefecto<T>(r: Resultado<T>, porDefecto: T): T {
  // completa aquí (estrecha por r.ok)
  return porDefecto
}

// 3) `mensajeError` — el error si salió mal; si salió bien, null.
//    mensajeError({ ok: false, error: "boom" }) → "boom"
//    mensajeError({ ok: true, valor: 5 }) → null
export function mensajeError<T>(r: Resultado<T>): string | null {
  // completa aquí
  return null
}


/* ── BLOQUE B — producir y transformar Resultados ──────────────────────────── */

// 4) `dividir` — devuelve un Resultado<number>: si `b` es 0, error
//    "división por cero"; si no, ok con a/b. (Errores como DATO, no excepción.)
//    dividir(6, 2) → { ok: true, valor: 3 }
//    dividir(1, 0) → { ok: false, error: "división por cero" }
export function dividir(a: number, b: number): Resultado<number> {
  // completa aquí
  return { ok: false, error: "" }
}

// 5) CAPSTONE `mapResultado` — transforma el valor de éxito con `f`, dejando el
//    error intacto. Si era ok, devuelve ok con `f(valor)`; si era error, lo
//    deja pasar tal cual.
//    mapResultado({ ok: true, valor: 4 }, (n) => n * 10) → { ok: true, valor: 40 }
//    mapResultado({ ok: false, error: "x" }, (n) => n * 10) → { ok: false, error: "x" }
export function mapResultado<T, U>(r: Resultado<T>, f: (valor: T) => U): Resultado<U> {
  // completa aquí (estrecha por r.ok; aplica f solo en la rama de éxito)
  return { ok: false, error: "" }
}
