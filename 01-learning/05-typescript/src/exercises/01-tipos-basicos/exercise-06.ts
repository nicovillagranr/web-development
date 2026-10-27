/* =============================================================================
 * EJERCICIO 06 — tipos básicos (6/?): unknown frente a any · bloque 01
 *
 * 🎯 OBJETIVOS
 * · Tipar con unknown un valor de tipo desconocido, en vez de con any.
 * · Estrechar un unknown con typeof o Array.isArray antes de usarlo.
 *
 * 🟢 CONTEXTO — a veces un valor llega y no sabes de qué tipo es: una respuesta de
 * API, un JSON.parse, lo que teclee un usuario. Hay dos formas de teclear «no sé»:
 * any (el agujero) y unknown (el honesto). Este proyecto prohíbe any; aquí vas a
 * sentir por qué, en tus propias manos.
 *
 * 🗺️ MAPA
 * TEORÍA · any apaga el chequeo; unknown obliga a comprobar → base de todo
 * BLOQUE A · unknown + estrechar con typeof → drills 1–2
 * BLOQUE B · el peligro de any en carne propia → drills 3–4
 * BLOQUE C · capstone: un formateador que aguanta cualquier entrada → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/01-tipos-basicos/exercise-06.test.ts
 * pnpm typecheck
 *
 * Cada starter usa any a propósito: compila en verde, pero el test revienta o da
 * resultados falsos en ejecución (esa es la trampa de any). Cámbialo a unknown y
 * estrecha con typeof o Array.isArray.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — any apaga el chequeo; unknown te obliga a comprobar
 *
 * DEFINICIÓN
 * any es «TS, no mires esto»: puedes hacer x.loQueSea() sin que nadie proteste…
 * hasta que revienta en ejecución. unknown es «puede ser cualquier cosa, pero
 * primero compruébalo»: TS no te deja usar x hasta que lo estrechas (typeof,
 * Array.isArray…).
 *
 * SINTAXIS
 * function f(x: any)     { return x.toUpperCase() } // compila; explota si x es 5
 * function g(x: unknown) { return x.toUpperCase() } // ❌ error de tipo: estrecha antes
 *
 * 🧠 ANALOGÍA — una caja cerrada sin etiqueta: any es abrirla a oscuras y meter la
 * mano (si dentro había un cuchillo, te cortas: el programa peta en ejecución);
 * unknown, que el guardia no te deje meter la mano hasta mirar qué hay. Más pasos,
 * cero sustos.
 *
 * ⚠️ TRAMPA — any compila en verde y falla en ejecución: el error no aparece donde
 * está, sino donde lo usas.
 *
 * 💡 Por dentro, unknown es el «tipo de arriba» (top type): todo es asignable a
 * unknown, pero unknown no es asignable a nada concreto sin estrechar. any rompe
 * esa regla en las dos direcciones: por eso es un agujero en el sistema.
 *
 * 💡 Caso real: const data: unknown = await res.json(). Te obliga a validar la
 * forma antes de leer data.precio, justo donde más fallan las apps. El estrechado a
 * fondo (typeof, in, is…) es el tema de 05-unions-narrowing; aquí solo lo justo
 * para usar unknown.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE A — unknown + estrechar con typeof
 *
 * El starter da por hecho que x es un string y llama a métodos de string. Con any,
 * eso pasa el compilador; en ejecución, si llega un number, peta.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) describir — describe el valor según su tipo.
 * 👉 Cambia any por unknown y estrecha: string → "texto: hola"
 *    (en mayúsculas), number → "número: 5", cualquier otra cosa → "otro".
 *   describir("hola") → "texto: hola"   describir(5) → "número: 5"
 *   describir(true)  → "otro"
 */
export function describir(x: unknown): string {
  if (typeof x === "string") {
    return `texto: ${x.toUpperCase()}`;
  } else if (typeof x === "number") {
    return `número: ${x}`;
  } else {
    return `otro`;
  }
}
// Return: texto: HOLA
describir("hola");
// Return: número: 5
describir(5);
// Return: otro
describir(true);

/* 2) longitud — largo si tiene sentido, -1 si no.
 * 👉 string → su .length, array → su .length, cualquier otra cosa → -1.
 *   longitud("hola") → 4   longitud([1, 2, 3]) → 3   longitud(5) → -1
 */
export function longitud(x: unknown): number {
  if (typeof x === "string") {
    return x.length;
  } else if (Array.isArray(x)) {
    return x.length;
  } else {
    return -1;
  }
}
// Return: 4
longitud("hola");
// Return: 3
longitud([1, 2, 3]);
// Return: -1
longitud(5);

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE B — el peligro de any en carne propia
 *
 * Mismo patrón, subiendo: si no compruebas antes, el any te deja escribir código
 * que el compilador bendice y la ejecución castiga.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 3) aMayusculas — string en mayúsculas; si no es string, "".
 * aMayusculas("hola") → "hola"   aMayusculas(5) → ""
 */
export function aMayusculas(x: unknown): string {
  if (typeof x === "string") {
    return x.toUpperCase();
  } else {
    return "";
  }
}

/* 4) sumarSiNumeros — suma solo si los dos son números; si no, 0.
 * 👉 Con any, "2" + "3" da "23" (concatena) en vez de avisar. Estrecha los
 *    dos antes de sumar.
 *   sumarSiNumeros(2, 3) → 5   sumarSiNumeros("2", "3") → 0
 */
export function sumarSiNumeros(a: unknown, b: unknown): number {
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  } else {
    return 0;
  }
}
// Return: 0
sumarSiNumeros("2", "3");
// Return: 5
sumarSiNumeros(2, 3);

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE C — capstone: un formateador que aguanta cualquier entrada
 *
 * Junta los tres casos en una escalera de typeof, con una salida segura al final
 * para «lo que no reconozco».
 * ───────────────────────────────────────────────────────────────────────────── */

/* 5) formatear — etiqueta el valor por tipo.
 * 👉 string → "texto: <x>", number → "número: <x>", boolean → "bool: <x>",
 *    cualquier otra cosa → "?".
 *   formatear("hola") → "texto: hola"   formatear(5) → "número: 5"
 *   formatear(true) → "bool: true"      formatear(null) → "?"
 */
export function formatear(x: unknown): string {
  if (typeof x === "string") {
    return `texto: ${x}`;
  } else if (typeof x === "number") {
    return `número: ${x}`;
  } else if (typeof x === "boolean") {
    return `bool: ${x}`;
  } else {
    return "?";
  }
}
