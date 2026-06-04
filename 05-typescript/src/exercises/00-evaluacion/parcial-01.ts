/* =============================================================================
 * PARCIAL 01 — Diagnóstico TypeScript (versión simple)
 * =============================================================================
 *
 * CÓMO RESPONDER (cada ejercicio tiene UN solo hueco):
 *   • Tipos  → reemplaza la palabra `SIN_RESPONDER` por el tipo correcto.
 *   • Elegir → pon la letra "a", "b" o "c".
 *   • Código → completa el cuerpo o la firma donde dice "// completa aquí".
 *   • Donde diga "Por qué:", escribe tu razonamiento en el comentario.
 *
 * 👉 El ejercicio A1 ya está RESUELTO como ejemplo de cómo se ve todo respondido.
 *    Los demás están en blanco. Hazlos en orden.
 *
 * Reglas: ❌ nada de `any`, ❌ nada de `as X` (salvo `as const` donde se indique).
 * No abras `parcial-01.test.ts`: tiene las respuestas. Cuando termines, te corrijo.
 * ===========================================================================*/


/** Marcador de hueco sin responder. Reemplázalo por tu respuesta.
 *  Mientras quede algún `SIN_RESPONDER`, el ejercicio cuenta como no hecho. */
// type SIN_RESPONDER = "⚠️ reemplázame por tu respuesta"


/* ─────────────────────────────────────────────────────────────────────────────
 * PARTE A — ¿Qué tipo infiere TypeScript? (no se ejecuta nada, solo predices)
 * ───────────────────────────────────────────────────────────────────────────*/

// A1) ¿Qué tipo tiene `configA.mode`?   ◄── EJEMPLO YA RESUELTO
export const configA = { mode: "dark", retries: 3 }
export type A1 = string // string, mutable
// Por qué: el objeto es mutable (`const` solo fija la variable, no sus propiedades),
//   así que `mode` podría reasignarse a otro texto; por eso TS lo ensancha de
//   "dark" a `string` en vez de quedarse con el literal.


// A2) Mismo objeto, pero con `as const`. ¿Qué tipo tiene `configB.mode` ahora?
export const configB = { mode: "dark", retries: 3 } as const
export type A2 = "dark" // inmutable
// Por qué: as const hace que el objeto sea completamente inmutable: Las propiedades y valores las defino yo, y no espero que cambien. Por eso, en vez de ensanchar a string, se queda con el literal "dark".


// A3) ¿Qué tipo tiene `numerosA[0]`?  (el repo usa `noUncheckedIndexedAccess`)
export const numerosA = [10, 20, 30]
export type A3 = number | undefined // se pone undefined para cubrir el caso de acceder a un índice que no existe
// Por qué: numerosA[0] es de tipo number, pero como el repo tiene noUncheckedIndexedAccess, TS también incluye undefined para cubrir el caso de acceder a un índice que no existe (por ejemplo, numerosA[10]).
// Array mutable

/* ─────────────────────────────────────────────────────────────────────────────
 * PARTE B — Uniones y narrowing
 * ───────────────────────────────────────────────────────────────────────────*/

// B1) Si `valor` es string → devuélvelo en minúsculas y sin espacios al borde.
//     Si es number → devuélvelo con 2 decimales. (Estrecha sin `as`.)
//       formatear("  HOLA ") → "hola"   ·   formatear(3.5) → "3.50"
export function formatear(valor: string | number): string {
  if (typeof valor === "string") {
    return valor.trim().toLowerCase()
  }
  return valor.toFixed(2) // TS ya sabe que aquí valor es number, así que no hace falta un as number o un else if o un else
}


// B2) Calcula el área según la figura. Al final, agrega una rama que asigne la
//     figura a una variable de tipo `never` (chequeo de exhaustividad): así, si
//     algún día se añade una figura y no la manejas, TS avisa en compilación.
type Figura =
  | { tipo: "circulo"; radio: number }
  | { tipo: "rectangulo"; ancho: number; alto: number }
  | { tipo: "cuadrado"; lado: number }
export function area(figura: Figura): number {
  switch (figura.tipo) {
    case "circulo": return Math.PI * figura.radio ** 2
    case "rectangulo": return figura.ancho * figura.alto
    case "cuadrado": return figura.lado ** 2
    default: {
      const _exhaustivo: never = figura
      return _exhaustivo
    }
  }
}
// Por qué el `never` convierte "olvidar una figura" en error de compilación:
// El tipo never es un tipo especial que representa un valor que nunca ocurre. En el switch, si se olvida manejar una figura, el caso default se ejecutará y se intentará asignar la figura a una variable de tipo never. Sin embargo, como la figura no es de tipo never (es una de las otras figuras), esto generará un error de compilación, alertando al desarrollador de que hay un caso no manejado en el switch.

// B3) ¿Cuál de estos chequeos NO estrecha bien el tipo? Pon la letra.
//     (a)  if (typeof x === "string") { x.trim() }      con  x: string | number
//     (b)  if (typeof x === "object") { x.nombre }       con  x: { nombre: string } | null
//     (c)  if ("radio" in f) { f.radio }                 con  f: Figura
export const B3: "a" | "b" | "c" = "a" // ← pon "a", "b" o "c"
// Por qué esa opción está rota:


/* ─────────────────────────────────────────────────────────────────────────────
 * PARTE C — Funciones y arrays
 * ───────────────────────────────────────────────────────────────────────────*/

// C1) Devuelve un array donde a cada número se le aplicó `fn` DOS veces.
//       aplicaDosVeces([1, 2], (n) => n + 10) → [21, 22]
export function aplicaDosVeces(nums: number[], fn: (n: number) => number): number[] {
  return nums.map((n) => fn(fn(n)))
}
aplicaDosVeces([1, 2], (n) => n + 10) // → [21, 22]


// C2) Devuelve un array de strings "#<id>", aunque `id` sea number.
//       etiquetas([{ id: 1 }, { id: 2 }]) → ["#1", "#2"]
export function etiquetas(productos: { id: number }[]): string[] {
  // completa aquí
  return productos.map((p) => String(p.id)) // ← provisional, cámbialo
}


/* ─────────────────────────────────────────────────────────────────────────────
 * PARTE D — Genéricos, keyof y T[K]
 * ───────────────────────────────────────────────────────────────────────────*/

// D1) Completa la FIRMA (restricciones + tipo de retorno) para que devuelva el
//     valor con su tipo exacto y rechace claves que no existen. NO toques el cuerpo.
//     Pista: `<T, K extends keyof T>` ... `: T[K]`
//       tomar({ nombre: "Ana", edad: 30 }, "edad") → 30 (number)
export function tomar<T, K extends keyof T>(obj: T, clave: K): T[K] {
  return obj[clave] // dará error hasta que la firma sea correcta — es normal
}
tomar({ nombre: "Nico", edad: 23 }, "nombre") // resultado: "Nico" (string)


// D2) Igual que D1 pero sobre un array: saca la columna `clave` de cada objeto,
//     conservando su tipo (number[] / string[] / ...). Completa solo la firma.
//       columna([{ v: 1 }, { v: 2 }], "v") → [1, 2] (number[])
export function columna<T, K>(arr: T[], clave: K): unknown {
  return arr.map((o) => o[clave]) // dará error hasta completar la firma — normal
}


// D3) ¿Cuál firma usa genéricos de forma INNECESARIA (el genérico no relaciona
//     la entrada con la salida)? Pon la letra.
//     (a)  function primero<T>(arr: T[]): T | undefined
//     (b)  function imprimir<T>(x: T): void
//     (c)  function mapear<T, U>(arr: T[], fn: (x: T) => U): U[]
export const D3: "a" | "b" | "c" = "a" // ← pon "a", "b" o "c"
// Por qué (y cuál sería la firma mínima sin genérico para esa función):


/* ─────────────────────────────────────────────────────────────────────────────
 * PARTE E — Debugging: arregla la FIRMA, no el cuerpo
 * ───────────────────────────────────────────────────────────────────────────*/

// E1) `maximoPor` busca el objeto con el mayor valor numérico en `clave`. El
//     cuerpo es correcto, pero la firma está mal: hay que exigir (1) que `clave`
//     sea una llave real de T y (2) que esa propiedad sea `number` (para poder
//     compararla con `>`). Arregla SOLO la firma.
//     Pista: en vez de `<T, K>`, piensa en `Record<K, number>`.
//       maximoPor([{ n: "a", v: 1 }, { n: "b", v: 9 }], "v") → { n: "b", v: 9 }
export function maximoPor<T, K>(arr: T[], clave: K): T | undefined {
  return arr.reduce<T | undefined>((mejor, actual) => {
    if (mejor === undefined) {
      return actual
    }
    return actual[clave] > mejor[clave] ? actual : mejor
  }, undefined)
}
// Por qué el cuerpo obliga a que la propiedad sea `number` y no solo `keyof T`:
