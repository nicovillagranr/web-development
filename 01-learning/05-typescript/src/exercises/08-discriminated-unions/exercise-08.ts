/* =============================================================================
 * EJERCICIO 08 — estrechar sin etiqueta: el operador in (y campos comunes) · bloque 08
 *
 * 🎯 OBJETIVOS
 * · Leer sin estrechar un campo que existe en todas las variantes.
 * · Estrechar con in una unión de objetos que no tiene tag.
 *
 * 🟢 CONTEXTO — a veces heredas una unión de objetos que no comparte un tag
 * literal: cada variante simplemente tiene campos distintos. No puedes hacer
 * x.tipo === … porque no hay tipo. Para estos casos TS te da el operador in.
 *
 * 🗺️ MAPA
 * TEORÍA · el operador in → base de todo el archivo
 * BLOQUE A · campo común frente a campo exclusivo → drills 1–2
 * BLOQUE B · calcular estrechando con in → drills 3–5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/08-discriminated-unions/exercise-08.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — ¿y si la unión no tiene un campo tipo?
 *
 * DEFINICIÓN
 * in pregunta «¿existe esta propiedad en el objeto?» y estrecha según la
 * respuesta. Comprueba la existencia de la clave, no su valor.
 *
 * SINTAXIS
 * type Empleado =
 *   | { nombre: string; salario: number }                    // asalariado
 *   | { nombre: string; tarifaHora: number; horas: number }; // por horas
 *
 * function pago(e: Empleado): number {
 *   if ("salario" in e) return e.salario; // aquí e es el asalariado
 *   return e.tarifaHora * e.horas;        // aquí e es el por horas
 * }
 *
 * 🧠 ANALOGÍA — sin uniformes con etiqueta, distingues a un médico de un
 * electricista por lo que lleva: «¿lleva fonendoscopio?» → médico. Preguntas por
 * la presencia de un objeto ("fonendoscopio" in persona), no por una placa.
 *
 * 💡 in es el plan B cuando no hay un discriminante limpio. Si tú diseñas la unión,
 * sigue prefiriendo un tag literal (tipo, estado): es más explícito y aguanta mejor
 * el never exhaustivo. in es para lidiar con lo que ya existe.
 * ───────────────────────────────────────────────────────────────────────────── */

export type Empleado =
  { nombre: string; salario: number } | { nombre: string; tarifaHora: number; horas: number };

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE A — campo común frente a campo exclusivo
 *
 * Un campo que existe en todas las variantes (aquí nombre) se puede leer sin
 * estrechar: TS sabe que siempre está. El narrowing solo hace falta para los
 * campos exclusivos de una variante.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) nombreDe — devuelve e.nombre. Está en todas las variantes, así que no
 * necesitas estrechar nada.
 * nombreDe({ nombre: "Ana", salario: 3000 }) → "Ana"
 */
export function nombreDe(e: Empleado): string {
  return e.nombre;
}

/* 2) esPorHoras — true si el empleado es del tipo "por horas". Detéctalo con
 * "tarifaHora" in e.
 * esPorHoras({ nombre: "Beto", tarifaHora: 20, horas: 100 }) → true
 * esPorHoras({ nombre: "Ana", salario: 3000 }) → false
 */
export function esPorHoras(e: Empleado): boolean {
  return "tarifaHora" in e;
}

/* ▸ BLOQUE B — calcular estrechando con in */

/* 3) pagoMensual — el sueldo del mes: si es asalariado, salario; si es por
 * horas, tarifaHora * horas. Estrecha con in antes de leer el campo.
 * pagoMensual({ nombre: "Ana", salario: 3000 }) → 3000
 * pagoMensual({ nombre: "Beto", tarifaHora: 20, horas: 100 }) → 2000
 */
export function pagoMensual(e: Empleado): number {
  if ("salario" in e) {
    return e.salario;
  }
  return e.tarifaHora * e.horas;
}

/* 4) describirEmpleado — un texto que combina nombre + tipo + pago:
 *   asalariado → `${nombre}: asalariado (${pago})`
 *   por horas  → `${nombre}: por horas (${pago})`
 * (Reusa pagoMensual para el número.)
 */
export function describirEmpleado(e: Empleado): string {
  if ("salario" in e) {
    return `${e.nombre}: asalariado (${pagoMensual(e)})`;
  }
  return `${e.nombre}: por horas (${pagoMensual(e)})`;
}

/* 5) Capstone nominaTotal — suma el pagoMensual de una lista de empleados
 * mezclados (asalariados y por horas).
 * nominaTotal([{ nombre: "Ana", salario: 3000 }, { nombre: "Beto", tarifaHora: 20, horas: 100 }]) → 5000
 */
export function nominaTotal(empleados: Empleado[]): number {
  return empleados.reduce((acumulador, empleado) => acumulador + pagoMensual(empleado), 0);
}
