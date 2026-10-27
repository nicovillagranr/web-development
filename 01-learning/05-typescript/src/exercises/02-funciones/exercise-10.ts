/* =============================================================================
 * EJERCICIO 10 — capstone: un mini-procesador de pasos · bloque 02 · reforzado
 *
 * 🎯 OBJETIVOS
 * · Tejer en una herramienta real los conceptos del 02 al 09.
 * · Devolver un objeto con dos funciones que comparten un mismo estado.
 *
 * 🟢 CONTEXTO — cierre de la carpeta, sin concepto nuevo: se tejen los del 02 al 09
 * en una herramientita real, un «procesador» que aplica una serie de pasos y lleva
 * la cuenta de cuántas veces se ha usado. Como refuerzo, antes del capstone (drill
 * 7) hay un calentamiento (drills 5–6) que aísla su única pieza nueva: un objeto
 * con dos funciones que comparten un estado (el closure del 07, pero compartido).
 *
 * 🗺️ MAPA
 * TEORÍA · lo que se junta → base de todo el archivo
 * BLOQUE A · del paso suelto a la lista variable → drills 1–2
 * BLOQUE B · montar la tubería y observar lo que pasa por ella → drills 3–4
 * BLOQUE C · calentamiento: funciones que comparten un estado → drills 5–6
 * BLOQUE D · capstone: procesador con contador de usos → drill 7
 *
 * ▸ 7 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/02-funciones/exercise-10.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — lo que se junta
 *
 * DEFINICIÓN
 * El procesador es una factory: recibe los pasos y devuelve un objeto cuyas
 * funciones aplican la tubería y cuentan los usos.
 *
 * 🗣️ LAS PIEZAS
 * type Paso = (n: number) => number → alias de tipo función: ejercicio 04
 * ...pasos                          → rest: ejercicio 03
 * pipe con reduce                   → ejercicio 09
 * efecto sobre una lista registro   → ejercicio 05 (void)
 * closure con estado (contador)     → ejercicio 07
 *
 * 🧠 ANALOGÍA — una máquina de fábrica configurable: le cargas la lista de pasos y
 * luego le metes piezas; cada una sale procesada, y un contador interno lleva la
 * cuenta de cuántas piezas pasaron.
 *
 * ⚠️ TRAMPA — el capstone devuelve un objeto con dos funciones dentro (ejecutar y
 * vecesUsado) que comparten la misma variable de estado: las dos ven el mismo usos.
 *
 * 💡 Caso real: un formateador reutilizable con telemetría («¿cuántas veces se
 * llamó?»), o un middleware que encadena transformaciones.
 * ───────────────────────────────────────────────────────────────────────────── */

type Paso = (n: number) => number;

/* ▸ BLOQUE A — del paso suelto a la lista variable */

/* 1) aplicarUno — aplica un solo paso a n.
 * 👉 Un arreglo: el cuerpo (el starter ignora paso y devuelve n).
 *   aplicarUno(5, (n) => n * 2) → 10
 */
export function aplicarUno(n: number, paso: Paso): number {
  return paso(n);
}

/* 2) aplicarVarios — aplica todos los pasos que reciba (cantidad variable).
 * 👉 Dos arreglos: el parámetro (ahora pide un array, así no puedes pasar pasos
 *    sueltos) → ponlo ...pasos. Y el cuerpo (devuelve n sin procesar).
 *   aplicarVarios(3, (n) => n + 1, (n) => n * 2) → 8
 */
export function aplicarVarios(n: number, ...pasos: Paso[]): number {
  return pasos.reduce((acum, paso) => paso(acum), n);
}

/* ▸ BLOQUE B — montar la tubería y observar lo que pasa por ella */

/* 3) crearPipeline — devuelve un paso que es la unión de todos los pasos dados.
 * 👉 Dos arreglos: el parámetro (...pasos) y el cuerpo (el starter devuelve
 *    una función identidad).
 *   const p = crearPipeline((n) => n + 1, (n) => n * 2); p(3) → 8
 */
export function crearPipeline(...pasos: Paso[]): (n: number) => number {
  return (n) => pasos.reduce((acum, paso) => paso(acum), n);
}
const primerPipeline = crearPipeline(
  (n) => n + 1,
  (n) => n * 2,
);
primerPipeline(3); // 8

/* 4) aplicarYregistrar — aplica los pasos uno a uno y va apuntando cada resultado
 * intermedio en registro (efecto). Devuelve el resultado final.
 * 👉 Dos arreglos: el cuerpo (recorre los pasos guardando cada intermedio) y
 *    nada más (registro es el efecto, como en el ejercicio 05).
 *   const reg: number[] = []; aplicarYregistrar(3, [(n)=>n+1,(n)=>n*2], reg) → 8; reg = [4, 8]
 */
export function aplicarYregistrar(n: number, pasos: Paso[], registro: number[]): number {
  return pasos.reduce((acum, paso) => {
    registro.push(paso(acum));
    return paso(acum);
  }, n);
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE C — calentamiento: un objeto de funciones que comparten un estado
 *
 * DEFINICIÓN
 * El capstone (drill 7) devuelve un objeto con dos funciones que ven la misma
 * variable. Es el closure del 07, pero con varias funciones compartiendo un solo
 * let.
 *
 * SINTAXIS
 * function crearCaja() {
 *   let contenido = ''                           // una variable
 *   return {
 *     guardar: (s: string) => { contenido = s }, // la escribe
 *     ver: () => contenido,                      // la lee
 *   }
 * }
 * const c = crearCaja()
 * c.guardar('hola')
 * c.ver() // 'hola': las dos funciones ven la misma contenido
 *
 * 🧠 ANALOGÍA — dos empleados con copia de la llave de la misma caja fuerte: uno
 * mete, otro saca, y es la misma caja. Si cada uno tuviera la suya, no se verían el
 * contenido.
 *
 * 💡 El let va en la factory: fuera de las dos funciones, dentro de crearCaja. Cada
 * crearCaja() fabrica su propia caja independiente, como las máquinas del 07.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 5) crearCaja — devuelve { guardar, ver } que comparten un texto interno.
 * 👉 El starter no comparte estado (guardar no hace nada, ver devuelve ""). Pon
 *    un let contenido en la factory que las dos funciones toquen.
 *   const c = crearCaja(); c.guardar("hola"); c.ver() → "hola"
 */
export function crearCaja(): { guardar: (s: string) => void; ver: () => string } {
  let contenido = "";
  return {
    guardar: (s: string) => {
      contenido = s;
    },
    ver: () => contenido,
  };
}
const miPrimeraCaja = crearCaja();
miPrimeraCaja.guardar("hola");
miPrimeraCaja.ver();

/* 6) crearContadorObj — devuelve { incrementar, valor } que comparten un número.
 * 👉 El starter no comparte estado. Pon un let n que las dos funciones compartan:
 *    incrementar lo sube, valor lo lee.
 *   const c = crearContadorObj(); c.incrementar(); c.incrementar(); c.valor() → 2
 */
export function crearContadorObj(): { incrementar: () => void; valor: () => number } {
  let cant = 0;
  return {
    incrementar: () => {
      cant = cant + 1;
    },
    valor: () => cant,
  };
}
const miContador = crearContadorObj();
miContador.incrementar();
miContador.incrementar();
miContador.valor(); // 2

/* ▸ BLOQUE D — capstone: procesador con contador de usos (objeto de closures) */

/* 7) crearProcesador — recibe una lista de pasos y devuelve un objeto con:
 *   - ejecutar(n) → aplica todos los pasos a n (y cuenta el uso)
 *   - vecesUsado() → cuántas veces se llamó a ejecutar
 * 👉 Arreglos: el cuerpo (el starter no procesa ni cuenta). Necesitas un let
 *    usos en la factory que las dos funciones del objeto compartan (como el
 *    drill 5/6), y ejecutar aplica la tubería de pasos (como el 09).
 *   const proc = crearProcesador([(n) => n + 1, (n) => n * 2])
 *   proc.ejecutar(3) → 8; proc.ejecutar(10) → 22; proc.vecesUsado() → 2
 */
export function crearProcesador(pasos: Paso[]): {
  ejecutar: (n: number) => number;
  vecesUsado: () => number;
} {
  let usos = 0;
  return {
    ejecutar: (n: number) => {
      usos = usos + 1;
      return pasos.reduce((acum, paso) => paso(acum), n);
    },
    vecesUsado: () => usos,
  };
}
const i9 = crearProcesador([(n) => n + 1, (n) => n * 2]);
i9.ejecutar(3); // 8
i9.ejecutar(10); // 22
i9.vecesUsado(); // 2
