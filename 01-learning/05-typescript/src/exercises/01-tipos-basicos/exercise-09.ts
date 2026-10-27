/* =============================================================================
 * EJERCICIO 09 — tipos básicos (9/?): interface y extends · bloque 01
 *
 * 🎯 OBJETIVOS
 * · Declarar un tipo de objeto con interface.
 * · Construir un tipo nuevo encima de otro con extends, sin repetir sus campos.
 *
 * 🟢 CONTEXTO — interface es la otra forma de dar nombre a un tipo de objeto,
 * junto a type. Su superpoder propio es extends: construir un tipo nuevo encima de
 * otro sin repetir sus campos. «Un Empleado es una Persona… y además cobra un
 * salario».
 *
 * 🗺️ MAPA
 * TEORÍA · declarar y extender → base de todo el archivo
 * BLOQUE A · usar la base y usar la extendida → drills 1–2
 * BLOQUE B · construir la extendida a partir de la base → drills 3–4
 * BLOQUE C · capstone: lista de la interface extendida → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/01-tipos-basicos/exercise-09.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — declarar y extender
 *
 * DEFINICIÓN
 * Una interface que extiende otra hereda sus campos y añade los suyos. No copias
 * nada: si mañana la base gana un campo, la extendida lo gana sola.
 *
 * SINTAXIS
 * interface Persona  { nombre: string; edad: number }
 * interface Empleado extends Persona { salario: number }
 * // Empleado = { nombre: string; edad: number; salario: number }
 *
 * 🧠 ANALOGÍA — un formulario base, «Datos personales» (Persona), y uno de «Alta de
 * empleado» que empieza con ese base y le añade una hoja de nómina. No reescribes
 * los datos personales: los heredas y sumas lo nuevo.
 *
 * ⚠️ TRAMPA — pasar una Persona donde se pide un Empleado falla (le falta salario);
 * al revés sí vale (un Empleado es una Persona, y le sobra información). El subtipo,
 * el más completo, encaja donde se pide el supertipo; no a la inversa.
 *
 * 💡 Por dentro, type e interface son casi intercambiables para objetos. Dos
 * diferencias prácticas: interface se extiende con extends (y se puede declarar
 * dos veces para fusionarse, cosa rara que casi nunca quieres), y type además sirve
 * para uniones, primitivos y tuplas. Para objetos que vas a componer en jerarquía,
 * interface se lee muy bien.
 *
 * 💡 Caso real: interface BaseProps { id: string }, y luego
 * interface BotonProps extends BaseProps { onClick(): void }. Reutilizas la base en
 * muchos componentes (lo verás en FASE 2).
 * ───────────────────────────────────────────────────────────────────────────── */

interface Persona {
  nombre: string;
  edad: number;
}

interface Empleado extends Persona {
  salario: number;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE A — usar la base y usar la extendida
 *
 * El drill 1 trabaja con Persona; el drill 2 necesita el campo extra de Empleado.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) presentar — "Soy <nombre>, <edad> años".
 * 👉 Dos arreglos: el tipo del parámetro (ahora solo exige { nombre }, así no
 *    puedes leer la edad) y el cuerpo (se deja la edad).
 *   presentar({ nombre: "Ana", edad: 30 }) → "Soy Ana, 30 años"
 */
export function presentar(p: Persona): string {
  return `Soy ${p.nombre}, ${p.edad} años`;
}

/* 2) ficha — "<nombre>: $<salario>".
 * 👉 Dos arreglos: el tipo del parámetro (ahora Persona, que no tiene salario)
 *    y el cuerpo (devuelve ""). Necesitas el tipo extendido.
 *   ficha({ nombre: "Ana", edad: 30, salario: 1000 }) → "Ana: $1000"
 */
export function ficha(e: Empleado): string {
  return `${e.nombre}: $${e.salario}`;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE B — construir la extendida a partir de la base (extends en el retorno)
 *
 * Recibes una Persona y la «asciendes» a Empleado añadiéndole el salario.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 3) contratar — toma una Persona y un salario, devuelve un Empleado.
 * 👉 Dos arreglos: el tipo de retorno (ahora Persona, sin salario) y el cuerpo
 *    (copia la persona pero se olvida del salario).
 *   contratar({ nombre: "Ana", edad: 30 }, 1000)
 *     → { nombre: "Ana", edad: 30, salario: 1000 }
 */
export function contratar(p: Persona, salario: number): Empleado {
  return { ...p, salario };
}

interface Vehiculo {
  marca: string;
}

interface Coche extends Vehiculo {
  puertas: number;
}

/* 4) describirCoche — "<marca> de <puertas> puertas".
 * 👉 Mismo patrón que el drill 2 con otra jerarquía: el parámetro debe ser el
 *    tipo extendido (Coche), no la base.
 *   describirCoche({ marca: "Seat", puertas: 5 }) → "Seat de 5 puertas"
 */
export function describirCoche(c: Coche): string {
  return `${c.marca} de ${c.puertas} puertas`;
}

/* ▸ BLOQUE C — capstone: lista de la interface extendida (filter + map) */

/* 5) bienPagados — nombres de los empleados que cobran al menos minimo.
 * 👉 Dos arreglos: el tipo de retorno (ahora Empleado[]) y el cuerpo (devuelve
 *    la lista entera sin filtrar ni quedarse con el nombre).
 *   bienPagados([{ nombre: "Ana", edad: 30, salario: 1000 }, { nombre: "Leo", edad: 25, salario: 500 }], 800) → ["Ana"]
 */
export function bienPagados(empleados: Empleado[], minimo: number): string[] {
  return empleados.filter((e) => e.salario >= minimo).map((e) => e.nombre);
}
bienPagados(
  [
    { nombre: "Ana", edad: 30, salario: 1000 },
    { nombre: "Leo", edad: 25, salario: 500 },
  ],
  800,
); // ["Ana"]
