/* =============================================================================
 * EJERCICIO 08 — Estrechar SIN etiqueta: el operador `in` (y campos comunes)
 * =============================================================================
 *
 * ▸ EXPLICACIÓN — ¿y si la unión no tiene un campo "tipo"?
 * ----------------------------------------------------------------------------
 * A veces heredas una unión de objetos que NO comparte un tag literal: cada
 * variante simplemente tiene campos distintos. No puedes hacer `x.tipo === ...`
 * porque no hay `tipo`. Para estos casos TS te da el operador `in`, que pregunta
 * "¿existe esta propiedad en el objeto?" y estrecha según la respuesta:
 *
 *   type Empleado =
 *     | { nombre: string; salario: number }                       // asalariado
 *     | { nombre: string; tarifaHora: number; horas: number };    // por horas
 *
 *   function pago(e: Empleado): number {
 *     if ("salario" in e) return e.salario;          // aquí e es el asalariado
 *     return e.tarifaHora * e.horas;                 // aquí e es el por horas
 *   }
 *
 * Dos detalles clave:
 *   • Un campo que existe en TODAS las variantes (aquí `nombre`) se puede leer
 *     SIN estrechar: TS sabe que siempre está. El narrowing solo hace falta para
 *     los campos que son exclusivos de una variante.
 *   • `in` comprueba la EXISTENCIA de la clave, no su valor. Es el plan B cuando
 *     no hay un discriminante limpio. Si TÚ diseñas la unión, sigue prefiriendo
 *     un tag literal (`tipo`/`estado`): es más explícito y aguanta mejor el
 *     `never` exhaustivo. `in` es para cuando te toca lidiar con lo que ya existe.
 *
 *
 * ▸ ANALOGÍA — distinguir por lo que alguien LLEVA
 * ----------------------------------------------------------------------------
 * Sin uniformes con etiqueta, distingues a un médico de un electricista por lo
 * que cargan: "¿lleva fonendoscopio?" → médico; si no, electricista. Preguntas
 * por la PRESENCIA de un objeto característico (`"fonendoscopio" in persona`),
 * no por una placa con su nombre. Eso es el operador `in`.
 *
 *
 * ▸ EJERCICIO — drills en escalera. EN ORDEN. ❌ nada de `any` ni `as`.
 *     pnpm test:run src/exercises/08-discriminated-unions/exercise-08.test.ts
 * ===========================================================================*/

export type Empleado =
  | { nombre: string; salario: number }
  | { nombre: string; tarifaHora: number; horas: number }


/* ── BLOQUE A — campo común vs campo exclusivo ─────────────────────────────── */

// 1) `nombreDe` — devuelve `e.nombre`. Está en TODAS las variantes, así que NO
//    necesitas estrechar nada.
//    nombreDe({ nombre: "Ana", salario: 3000 }) → "Ana"
export function nombreDe(e: Empleado): string {
  // completa aquí (una línea, sin `in`)
  return ""
}

// 2) `esPorHoras` — true si el empleado es del tipo "por horas". Detéctalo con
//    `"tarifaHora" in e`.
//    esPorHoras({ nombre: "Beto", tarifaHora: 20, horas: 100 }) → true
//    esPorHoras({ nombre: "Ana", salario: 3000 }) → false
export function esPorHoras(e: Empleado): boolean {
  // completa aquí
  return false
}


/* ── BLOQUE B — calcular estrechando con `in` ──────────────────────────────── */

// 3) `pagoMensual` — el sueldo del mes: si es asalariado, `salario`; si es por
//    horas, `tarifaHora * horas`. Estrecha con `in` antes de leer el campo.
//    pagoMensual({ nombre: "Ana", salario: 3000 }) → 3000
//    pagoMensual({ nombre: "Beto", tarifaHora: 20, horas: 100 }) → 2000
export function pagoMensual(e: Empleado): number {
  // completa aquí (if ("salario" in e) ... else ...)
  return 0
}

// 4) `describirEmpleado` — un texto que combina nombre + tipo + pago:
//      asalariado → `${nombre}: asalariado (${pago})`
//      por horas  → `${nombre}: por horas (${pago})`
//    (Reusa pagoMensual para el número.)
export function describirEmpleado(e: Empleado): string {
  // completa aquí
  return ""
}

// 5) CAPSTONE `nominaTotal` — suma el `pagoMensual` de una lista de empleados
//    mezclados (asalariados y por horas).
//    nominaTotal([{ nombre: "Ana", salario: 3000 }, { nombre: "Beto", tarifaHora: 20, horas: 100 }]) → 5000
export function nominaTotal(empleados: Empleado[]): number {
  // completa aquí (reduce o for sumando pagoMensual)
  return 0
}
