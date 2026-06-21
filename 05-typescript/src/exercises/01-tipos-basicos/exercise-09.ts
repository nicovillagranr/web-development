/* =============================================================================
 * EJERCICIO 09 — tipos básicos (9/?): `interface` y `extends`
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * `interface` es la OTRA forma de dar nombre a un tipo de objeto (junto a `type`).
 * Su superpoder propio es `extends`: construir un tipo NUEVO encima de otro sin
 * repetir sus campos. "Un Empleado es una Persona... y además cobra un salario".
 *
 *
 * ▸ EXPLICACIÓN — declarar y EXTENDER
 * ----------------------------------------------------------------------------
 *     interface Persona  { nombre: string; edad: number }
 *     interface Empleado extends Persona { salario: number }
 *     //        Empleado = { nombre: string; edad: number; salario: number }
 *
 * `Empleado` HEREDA los campos de `Persona` y añade `salario`. No copias nada: si
 * mañana `Persona` gana un campo, `Empleado` lo gana solo.
 *
 * 🧠 ANALOGÍA: un formulario base "Datos personales" (Persona) y un formulario
 *    "Alta de empleado" que EMPIEZA con ese base y le añade una hoja de nómina.
 *    No reescribes los datos personales: los heredas y sumas lo nuevo.
 *
 * 🔧 POR DENTRO: `type` vs `interface` para objetos son casi intercambiables. Dos
 *    diferencias prácticas: `interface` se EXTIENDE con `extends` (y se puede
 *    declarar dos veces para fusionarse, cosa rara que casi nunca quieres); `type`
 *    además sirve para uniones/primitivos/tuplas. Para objetos que vas a componer
 *    en jerarquía, `interface` se lee muy bien.
 *
 * 💼 CASO REAL: `interface BaseProps { id: string }` y luego
 *    `interface BotonProps extends BaseProps { onClick(): void }`. Reutilizas la
 *    base en muchos componentes (lo verás en FASE 2).
 *
 * OJO — pasar una `Persona` donde se pide un `Empleado` FALLA (le falta salario);
 *    al revés SÍ vale (un Empleado ES una Persona y le sobra info). El subtipo
 *    (el más completo) encaja donde se pide el supertipo, no a la inversa.
 *
 *
 * ▸ EJERCICIO — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as`.
 * ----------------------------------------------------------------------------
 * Corre el test tras cada uno:
 *     pnpm test:run src/exercises/01-tipos-basicos/exercise-09.test.ts
 * ===========================================================================*/


interface Persona {
  nombre: string
  edad: number
}

interface Empleado extends Persona {
  salario: number
}

/* ---------------------------------------------------------------------------
 * BLOQUE A — usar la base y usar la extendida
 * ---------------------------------------------------------------------------
 * Drill 1 trabaja con `Persona`; drill 2 necesita el campo extra de `Empleado`.
 * -------------------------------------------------------------------------- */

// 1) `presentar` — "Soy <nombre>, <edad> años".
//    👉 Dos arreglos: el tipo del parámetro (ahora solo exige `{ nombre }`, así no
//       puedes leer la edad) y el cuerpo (se deja la edad).
//      presentar({ nombre: "Ana", edad: 30 }) → "Soy Ana, 30 años"
export function presentar(p: { nombre: string }): string {
  return ""
}

// 2) `ficha` — "<nombre>: $<salario>".
//    👉 Dos arreglos: el tipo del parámetro (ahora `Persona`, que NO tiene salario)
//       y el cuerpo (devuelve ""). Necesitas el tipo EXTENDIDO.
//      ficha({ nombre: "Ana", edad: 30, salario: 1000 }) → "Ana: $1000"
export function ficha(e: Persona): string {
  return ""
}


/* ---------------------------------------------------------------------------
 * BLOQUE B — construir la extendida a partir de la base (extends en el RETORNO)
 * ---------------------------------------------------------------------------
 * Recibes una Persona y la "asciendes" a Empleado añadiéndole el salario.
 * -------------------------------------------------------------------------- */

// 3) `contratar` — toma una Persona y un salario, devuelve un Empleado.
//    👉 Dos arreglos: el tipo de retorno (ahora `Persona`, sin salario) y el cuerpo
//       (copia la persona pero se olvida del salario).
//      contratar({ nombre: "Ana", edad: 30 }, 1000)
//        → { nombre: "Ana", edad: 30, salario: 1000 }
export function contratar(p: Persona, salario: number): Persona {
  return {}
}


interface Vehiculo {
  marca: string
}

interface Coche extends Vehiculo {
  puertas: number
}

// 4) `describirCoche` — "<marca> de <puertas> puertas".
//    👉 Mismo patrón que el drill 2 con otra jerarquía: el parámetro debe ser el
//       tipo EXTENDIDO (`Coche`), no la base.
//      describirCoche({ marca: "Seat", puertas: 5 }) → "Seat de 5 puertas"
export function describirCoche(c: Vehiculo): string {
  return ""
}


/* ---------------------------------------------------------------------------
 * BLOQUE C — CAPSTONE: lista de la interface extendida (filter + map)
 * ---------------------------------------------------------------------------
 * -------------------------------------------------------------------------- */

// 5) `bienPagados` — nombres de los empleados que cobran AL MENOS `minimo`.
//    👉 Dos arreglos: el tipo de retorno (ahora `Empleado[]`) y el cuerpo (devuelve
//       la lista entera sin filtrar ni quedarse con el nombre).
//      bienPagados([{ nombre: "Ana", edad: 30, salario: 1000 },
//                   { nombre: "Leo", edad: 25, salario: 500 }], 800) → ["Ana"]
export function bienPagados(empleados: Empleado[], minimo: number): Empleado[] {
  return []
}
