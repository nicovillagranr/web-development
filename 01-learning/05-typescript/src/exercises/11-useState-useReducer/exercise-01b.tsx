/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — la línea que este archivo existe para desarmar:
 *
 *     const mensajes = [errores.nombre, errores.email].filter(Boolean)
 *                       └──────── un array con huecos ───────┘ └── el filtro ──┘
 *
 * Viene del drill 4 del `exercise-01` y no la escribiste tú: venía puesta. Son
 * tres piezas que ya conoces por separado y que juntas no se reconocen.
 * ───────────────────────────────────────────────────────────────────────────── */
/* =============================================================================
 * EJERCICIO 01b — la función que le entregas a `filter`       ·  refuerzo del 01
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · distinguir entregar una función de llamarla, mirando los paréntesis
 *   · decir qué recibe y qué devuelve `filter`, sin dudar si muta el original
 *   · leer `filter(Boolean)` y traducirlo a la versión larga, y al revés
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * Lo pediste al revisar el drill 4: esas dos líneas te costaban. No es un hueco
 * tuyo — el starter las traía hechas y nadie las desarmó. Aquí se sube el mismo
 * escalón seis veces, y el último drill es esa línea exacta.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 *   TEORÍA 1 · filter recibe una función      →  drills 1, 2, 3
 *   TEORÍA 2 · Boolean es una de esas         →  drills 4, 5, 6
 *
 * ▸ EJERCICIO — 6 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/11-useState-useReducer/exercise-01b.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito, y los seis caen en el test. Uno
 *   además no compila: ese te lo dice `pnpm typecheck` antes de correr nada.
 *   ¿Atascado? Las pistas están en `exercise-01b.pistas.md`, de una en una.
 * ===========================================================================*/

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — `filter` recibe una función y la llama ÉL
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   `filter` recorre un array y, por cada elemento, llama a la función que le
 *   entregaste. Si esa llamada devuelve algo truthy, el elemento pasa. Al final
 *   devuelve un array NUEVO: el original se queda como estaba.
 *
 * SINTAXIS
 *     numeros.filter((n) => n > 2)
 *             ▲       └──────────┘
 *             │            └─ la función que entregas. `filter` la llamará
 *             └─ por cada elemento, una llamada
 *
 * EJEMPLO
 *     [1, 2, 3, 4].filter((n) => n > 2)   → [3, 4]
 *     [1, 2, 3, 4]                        → sigue siendo [1, 2, 3, 4]
 *
 * 🧠 ANALOGÍA (de apoyo) — el portero con una instrucción. Tú no estás en la
 *    puerta: le das al portero una regla escrita y él la aplica a cada uno que
 *    llega. Le entregas la regla; quien pregunta es él.
 *
 * 🗣️ LAS PIEZAS
 *     `(n) => n > 2`  → la función que entregas. Se llama CALLBACK
 *     `esLargo`       → entregar la función. Sin paréntesis
 *     `esLargo()`     → LLAMARLA ahora mismo, y entregar lo que devuelva
 *
 * ⚠️ TRAMPA — es el `exercise-01` del bloque 10 otra vez: entregar no es
 *    ejecutar. Si escribes `filter(esLargo())` estás llamándola tú, sin ningún
 *    elemento, y entregándole a `filter` el resultado en vez de la función.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) `soloLargos` — devuelve solo las palabras de más de 3 letras, en el mismo
//    orden. El array que te dan no se toca: quien te lo prestó tiene que poder
//    seguir usándolo entero.
export function soloLargos(palabras: string[]): string[] {
  return palabras.filter((palabra) => palabra.length > 3);
}
// soloLargos(["sol", "luna", "mar", "cielo"]) -> ["luna",  "cielo"]

// 2) `soloLargosConRegla` — lo mismo que el 1, pero la regla ya está escrita
//    arriba en `mideMasDeTres` y hay que reutilizarla en vez de repetirla.
function mideMasDeTres(palabra: string): boolean {
  return palabra.length > 3;
}
// mideMasDeTres("sol") -> false
// mideMasDeTres("luna") -> true

export function soloLargosConRegla(palabras: string[]): string[] {
  return palabras.filter(mideMasDeTres); // Todo string que cumpla la condición pasa
}
// soloLargosConRegla(["sol", "luna", "mar", "cielo"]) -> ["luna", "cielo"]

// 3) `sinVacios` — quita los textos vacíos y deja el resto. Un texto con
//    espacios, como `"  "`, NO está vacío y se queda.
export function sinVacios(textos: string[]): string[] {
  return textos.filter((texto) => texto !== ""); // Todo texto que sea diferente a "" se queda
}
// sinVacios(["hola", "", "  ", "adios"]) -> ["hola", "  ", "adios"]

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — `Boolean` también es una función, y sirve de callback
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   `Boolean(x)` responde a una sola pregunta: ¿`x` es truthy? Devuelve `true`
 *   o `false`, y nada más. Como es una función de un argumento que devuelve un
 *   booleano, encaja exactamente en lo que `filter` pide.
 *
 * SINTAXIS
 *     valores.filter((v) => Boolean(v))   // la versión larga
 *     valores.filter(Boolean)             // la misma, entregando la función
 *
 * EJEMPLO — los seis falsy y nadie más:
 *     Boolean("hola")  → true      Boolean("")        → false
 *     Boolean(1)       → true      Boolean(0)         → false
 *     Boolean([])      → true      Boolean(undefined) → false
 *
 * 🧠 ANALOGÍA (de apoyo) — la del filtro de la puerta del `exercise-03` del
 *    vocabulario: falsy es la lista de a quién no dejan entrar, y son seis.
 *    `filter(Boolean)` pone esa misma puerta delante de cada elemento.
 *
 * 🗣️ LAS PIEZAS
 *     `Boolean`        → la función. Esto es lo que se entrega
 *     `Boolean(v)`     → una llamada, con su respuesta `true` o `false`
 *     `filter(Boolean)` → forma corta de `filter((v) => Boolean(v))`
 *
 * ⚠️ TRAMPA — descartar solo `undefined` en vez de todos los falsy. Parece lo
 *    mismo mientras los huecos sean `undefined`, y deja de serlo en cuanto llega
 *    un `""`. Es la distinción `false` / falsy, ahora en un `filter`.
 *
 * 👀 UN BORDE QUE SE DECLARA, no se esconde: `filter` limpia el array en ejecución
 *    pero NO estrecha el tipo. Por eso los drills 5 y 6 devuelven
 *    `(string | undefined)[]` y no `string[]`, aunque dentro ya no quede ningún
 *    hueco. Estrecharlo de verdad se hace con un predicado de tipo, y eso es de
 *    otro archivo — aquí no hace falta, y `as` está prohibido.
 * ───────────────────────────────────────────────────────────────────────────── */

// 4) `esTruthy` — responde si el valor que le llega es truthy.
//    ❌ Sin `if` y sin comparar con `true`.
export function esTruthy(valor: unknown): boolean {
  return Boolean(valor); // Devuelve true si el valor es truthy, false si es falsy
}
// esTruthy("hola") -> true
// esTruthy(0) -> false
// esTruthy([]) -> true

// 5) `sinHuecos` — de un array que puede traer textos y huecos, devuelve solo
//    los textos que dicen algo. Un hueco puede ser `undefined` o un texto vacío,
//    y los dos sobran.
//    👀 El tipo de salida sigue arrastrando el `undefined` aunque en ejecución ya
//    no quede ninguno: `filter` limpia el array y no se lo cuenta a TypeScript.
export function sinHuecos(valores: (string | undefined)[]): (string | undefined)[] {
  return valores.filter((v) => v !== undefined && v !== ""); // Todo valor que sea diferente a undefined y diferente a "" se queda
}
// sinHuecos(["hola", undefined, "", "adios"]) -> ["hola", "adios"]

// 📌 La caja de errores del drill 4 del `exercise-01`: puede no traer ninguno.
export interface ErroresForm {
  nombre?: string;
  email?: string;
}

// 6) `mensajesDe` — reúne en un array los mensajes que traiga la caja de
//    errores, descartando los campos que no vengan. Sin errores devuelve un
//    array vacío, no `null`.
//    Es la línea del drill 4 del `01`, ahora escrita por ti.
export function mensajesDe(errores: ErroresForm): (string | undefined)[] {
  return [errores.nombre, errores.email].filter((error) => error !== undefined && error !== ""); // Todo mensaje que sea diferente a undefined y diferente a "" se queda
}
// mensajesDe({ nombre: "Falta el nombre" }) -> ["Falta el nombre"]
// mensajesDe({}) -> []
// mensajesDe({ nombre: "", email: "Falta el email" }) -> ["Falta el email"]

/* ─────────────────────────────────────────────────────────────────────────────
 * Al terminar, vuelve al drill 4 del `exercise-01` y lee sus dos líneas otra vez.
 * Si ahora puedes decir en voz alta qué recibe `filter`, quién llama a `Boolean`
 * y por qué no lleva paréntesis, el archivo ha hecho su trabajo.
 * ───────────────────────────────────────────────────────────────────────────── */
