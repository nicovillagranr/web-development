/* =============================================================================
 * EJERCICIO 06 — tipos básicos (6/?): `unknown` vs `any`
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * A veces un valor llega y NO sabes de qué tipo es (una respuesta de API, un
 * `JSON.parse`, lo que teclee un usuario). Tienes dos formas de teclear "no sé":
 * `any` (el agujero) y `unknown` (el honesto). Este proyecto PROHÍBE `any`; aquí
 * vas a sentir POR QUÉ, en tus propias manos.
 *
 *
 * ▸ EXPLICACIÓN — `any` apaga el chequeo; `unknown` te obliga a comprobar
 * ----------------------------------------------------------------------------
 * - `any`     → "TS, no mires esto". Puedes hacer `x.loQueSea()` sin que nadie
 *               proteste... hasta que REVIENTA en runtime. Apaga la seguridad.
 * - `unknown` → "puede ser cualquier cosa, pero PRIMERO compruébalo". TS NO te
 *               deja usar `x` hasta que lo estrechas (typeof, Array.isArray...).
 *
 *     function f(x: any)     { return x.toUpperCase() }   // compila; explota si x=5
 *     function g(x: unknown) { return x.toUpperCase() }   // ❌ error de TIPO: estrecha antes
 *
 * 🧠 ANALOGÍA: una caja cerrada sin etiqueta.
 *      `any`     = la abres a oscuras y metes la mano. Si dentro había un cuchillo,
 *                  te cortas (el programa peta en runtime).
 *      `unknown` = el guardia no te deja meter la mano hasta MIRAR qué hay. Más
 *                  pasos, cero sustos.
 *
 * 🔧 POR DENTRO: `unknown` es el "tipo de arriba" (top type): TODO es asignable A
 *    `unknown`, pero `unknown` NO es asignable a nada concreto sin estrechar. `any`
 *    rompe esa regla en las dos direcciones — por eso es un agujero en el sistema.
 *
 * 💼 CASO REAL: `const data: unknown = await res.json()`. Te obliga a validar la
 *    forma antes de leer `data.precio`, justo donde más fallan las apps.
 *
 * OJO — el ESTRECHADO a fondo (typeof, in, `is`...) es el tema de
 *    `05-unions-narrowing`. Aquí solo lo justo para usar `unknown`: el foco es el
 *    CONTRASTE con `any` y por qué se prohíbe.
 *
 *
 * ▸ EJERCICIO — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as`.
 * ----------------------------------------------------------------------------
 * Cada starter usa `any` a propósito: COMPILA en verde pero el test REVIENTA o
 * da resultados falsos en runtime (esa es la trampa de `any`). Cámbialo a
 * `unknown` y estrecha con `typeof` / `Array.isArray`. Corre el test tras cada uno:
 *     pnpm test:run src/exercises/01-tipos-basicos/exercise-06.test.ts
 * ===========================================================================*/


/* ---------------------------------------------------------------------------
 * BLOQUE A — `unknown` + estrechar con `typeof`
 * ---------------------------------------------------------------------------
 * El starter da por hecho que `x` es un string y llama métodos de string. Con
 * `any` eso pasa el compilador; en runtime, si llega un number, peta.
 * -------------------------------------------------------------------------- */

// 1) `describir` — describe el valor según su tipo.
//    👉 Cambia `any` por `unknown` y estrecha: string → "texto: HOLA"
//       (en mayúsculas), number → "número: 5", cualquier otra cosa → "otro".
//      describir("hola") → "texto: HOLA"   describir(5) → "número: 5"
//      describir(true)  → "otro"
export function describir(x: unknown): string {
  if (typeof x === "string") {
    return `texto: ${x.toUpperCase()}`
  }
  else if (typeof x === "number") {
    return `número: ${x}`
  }
  else {
    return `otro`
  }
}
// Return: texto: HOLA
describir("hola")
// Return: número: 5
describir(5)
// Return: otro
describir(true)


// 2) `longitud` — largo si tiene sentido, -1 si no.
//    👉 string → su .length, array → su .length, cualquier otra cosa → -1.
//      longitud("hola") → 4   longitud([1, 2, 3]) → 3   longitud(5) → -1
export function longitud(x: unknown): number {
  if (typeof x === "string") {
    return x.length
  }
  else if (Array.isArray(x)) {
    return x.length
  }
  else {
    return -1
  }
}
// Return: 4
longitud("hola")
// Return: 3
longitud([1, 2, 3])
// Return: -1
longitud(5)

/* ---------------------------------------------------------------------------
 * BLOQUE B — el peligro de `any` en carne propia
 * ---------------------------------------------------------------------------
 * Mismo patrón, subiendo: si NO compruebas antes, el `any` te deja escribir
 * código que el compilador bendice y el runtime castiga.
 * -------------------------------------------------------------------------- */

// 3) `aMayusculas` — string en mayúsculas; si no es string, "".
//      aMayusculas("hola") → "HOLA"   aMayusculas(5) → ""
export function aMayusculas(x: unknown): string {
  if (typeof x === "string") {
    return x.toUpperCase()
  }
  else {
    return ""
  }
}

// 4) `sumarSiNumeros` — suma SOLO si los dos son números; si no, 0.
//    👉 Con `any`, `"2" + "3"` da "23" (concatena) en vez de avisar. Estrecha los
//       DOS antes de sumar.
//      sumarSiNumeros(2, 3) → 5   sumarSiNumeros("2", "3") → 0
export function sumarSiNumeros(a: unknown, b: unknown): number {
  if (typeof a === "number" && typeof b === "number") {
    return a + b
  }
  else {
    return 0
  }
}
// Return: 0
sumarSiNumeros("2", "3")
// Return: 5
sumarSiNumeros(2, 3)

/* ---------------------------------------------------------------------------
 * BLOQUE C — CAPSTONE: un formateador que aguanta cualquier entrada
 * ---------------------------------------------------------------------------
 * Junta los tres casos en una escalera de `typeof`, con una salida segura al
 * final para "lo que no reconozco".
 * -------------------------------------------------------------------------- */

// 5) `formatear` — etiqueta el valor por tipo.
//    👉 string → "texto: <x>", number → "número: <x>", boolean → "bool: <x>",
//       cualquier otra cosa → "?".
//      formatear("hola") → "texto: hola"   formatear(5) → "número: 5"
//      formatear(true) → "bool: true"      formatear(null) → "?"
export function formatear(x: unknown): string {
  if (typeof x === "string") {
    return `texto: ${x}`
  }
  else if (typeof x === "number") {
    return `número: ${x}`
  }
  else if (typeof x === "boolean") {
    return `bool: ${x}`
  }
  else {
    return "?"
  }
}
