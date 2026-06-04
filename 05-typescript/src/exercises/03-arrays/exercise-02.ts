/* =============================================================================
 * EJERCICIO 02 — Refuerzo: darle una "máquina" a una función para que la aplique
 *                (1 vez, N veces, sobre arrays y objetos). Prepara la PARTE C.
 * =============================================================================
 *
 * ▸ CONTEXTO
 * ----------------------------------------------------------------------------
 * En el parcial, la Parte C no salió sólida. El patrón en común: una función que
 * RECIBE otra función como ingrediente y la aplica. Aquí lo bajamos a 10 pasos
 * con nombres con sentido (nada de `fn`/`n`) y analogías de la vida real.
 *
 * ▸ OBJETIVO TÉCNICO
 * ----------------------------------------------------------------------------
 * Entender una función-parámetro (`transformar: (valor: number) => number`),
 * aplicarla (`transformar(num)`), aplicarla repetida (`transformar(transformar(num))`)
 * y combinarla con map / filter / reduce.
 *
 *
 * ════════════════════════════════════════════════════════════════════════════
 * ▸ EXPLICACIÓN — leer ANTES de tocar los drills
 * ════════════════════════════════════════════════════════════════════════════
 *
 * 🏭 LA ANALOGÍA: UNA MÁQUINA
 * ----------------------------------------------------------------------------
 * Una función es una MÁQUINA: le metes algo por un lado y te entrega algo por el
 * otro. Un exprimidor: entra una naranja, sale jugo.
 *
 *        entra              sale
 *      ┌──────────────┐
 *  3 → │  transformar  │ → 6
 *      └──────────────┘
 *
 *
 * 1) CÓMO SE LEE UNA MÁQUINA QUE TE PASAN
 * ----------------------------------------------------------------------------
 * Cuando una función recibe OTRA función, el parámetro lleva un tipo con flecha:
 *
 *   transformar: (valor: number) => number
 *   └────┬────┘   └─────┬──────┘    └──┬──┘
 *    su nombre    LO QUE ENTRA      LO QUE SALE
 *                (izq. del =>)     (der. del =>)
 *
 *   👉 La FLECHA `=>` parte la máquina en "qué recibe" y "qué devuelve".
 *      El tipo del resultado de `transformar(loquesea)` es SIEMPRE la derecha.
 *
 *
 * 2) APLICAR LA MÁQUINA = PONERLE PARÉNTESIS
 * ----------------------------------------------------------------------------
 *   transformar            → la máquina GUARDADA, apagada. No hace nada.
 *   transformar(num)       → APRETAR el botón con `num` adentro. Da un resultado.
 *
 *   👉 La diferencia entre "tener la máquina" y "usarla" son los `( )`.
 *
 *
 * 3) APLICARLA DOS VECES (meter el resultado de vuelta)
 * ----------------------------------------------------------------------------
 *   Como `transformar(num)` da un número, puedes meter ese número OTRA VEZ:
 *
 *   transformar( transformar(num) )
 *                └─────┬──────┘
 *           PASO 1: lo de adentro primero
 *
 *   Ej. con transformar = (valor) => valor + 10  y  num = 1:
 *     transformar(1)               = 11      ← 1ª pasada
 *     transformar( transformar(1) ) = transformar(11) = 21   ← 2ª pasada
 *
 *   Se lee de ADENTRO hacia AFUERA, como en mates: f(f(x)).
 *
 *
 * 4) APLICARLA A CADA ELEMENTO DE UN ARRAY (.map)
 * ----------------------------------------------------------------------------
 *   Una FÁBRICA: cada producto de la cinta pasa por la misma máquina.
 *
 *   nums.map(transformar)                    → cada uno pasa 1 vez
 *   nums.map((num) => transformar(transformar(num)))  → cada uno pasa 2 veces
 *
 *   [1, 2].map(transformar) con +10  →  [11, 12]
 *
 *
 * ▸ DRILLS — EN ORDEN. Cada cuerpo provisional está MAL a propósito: arréglalo y
 *   corre el test tras cada uno.
 *     pnpm test:run src/exercises/03-arrays/exercise-02.test.ts
 *   Reglas: ❌ nada de `any`, ❌ nada de `as X`, ❌ no mutes el array de entrada.
 * ═══════════════════════════════════════════════════════════════════════════*/


/* ── Bloque: aplicar la máquina a UN valor (sin array) ─────────────────────── */

// 1) 🍊 EL EXPRIMIDOR. `aplicar` recibe un número y una máquina, y devuelve el
//    resultado de pasar el número por la máquina UNA vez.
//      aplicar(5, (valor) => valor + 1) → 6 ; aplicar(3, (valor) => valor * 10) → 30
export function aplicar(num: number, transformar: (valor: number) => number): number {
  return transformar(num)
}
aplicar(1, (valor) => valor + 1)

// 2) 🏷️ LA ETIQUETADORA. Lo mismo pero con texto: recibe un texto y una máquina
//    de texto, y devuelve el texto ya transformado UNA vez.
//      aplicarTexto("hola", (palabra) => palabra.toUpperCase()) → "HOLA"
export function aplicarTexto(texto: string, transformar: (palabra: string) => string): string {
  return transformar(texto)
}
aplicarTexto("nicolas", (palabra) => palabra.toUpperCase())

// 3) 🧺 DOS LAVADAS SEGUIDAS. `dosVeces` pasa el número por la máquina DOS veces
//    (el resultado de la primera entra a la segunda).
//      dosVeces(1, (valor) => valor + 10) → 21 ; dosVeces(2, (valor) => valor * 2) → 8
export function dosVeces(
  num: number,
  transformar: (valor: number) => number
): number {
  return transformar(transformar(num))
}
dosVeces(1, (valor) => valor + 100)


/* ── Bloque: aplicar la máquina sobre cada elemento de un array (fábrica) ───── */

// 4) 🏭 LA CINTA. `mapear` pasa CADA número del array por la máquina UNA vez.
//    (Es tu propio `.map`: le entregas la máquina y él la aplica a cada uno.)
//      mapear([1, 2, 3], (valor) => valor + 10) → [11, 12, 13]
export function mapear(nums: number[], transformar: (valor: number) => number): number[] {
  return nums.map(transformar)
}
mapear([1, 2, 3], (valor) => valor + 10) // resultado: [11, 12, 13]

// 5) 🏭🏭🏭 TRES PASADAS. `aplicaTresVeces` pasa CADA número por la máquina TRES
//    veces. (Adentro del .map repites la idea del drill 3, pero una vez más.)
//      aplicaTresVeces([1, 2], (valor) => valor + 10) → [31, 32]
//      aplicaTresVeces([1, 2], (valor) => valor * 2)  → [8, 16]
export function aplicaTresVeces(nums: number[], transformar: (valor: number) => number): number[] {
  return nums.map((num) => transformar(transformar(transformar(num))))
}
aplicaTresVeces([1], valor => valor + 10) // resultado 31

// 6) 🏭 PASADAS A PEDIDO. `aplicaNVeces` pasa cada número por la máquina la
//    cantidad de veces que diga `cuantasVeces`. Si es 0, el número sale igual.
//    (Pista: aquí un bucle `for` dentro del map sí vale.)
//      aplicaNVeces([1], (valor) => valor + 1, 3) → [4]    (1 → 2 → 3 → 4)
//      aplicaNVeces([2], (valor) => valor * 2, 2) → [8]    (2 → 4 → 8)
export function aplicaNVeces(nums: number[], transformar: (valor: number) => number, cuantasVeces: number,): number[] {
  return nums.map((num) => {
    let resultado = num
    for (let i = 0; i < cuantasVeces; i++) {
      resultado = transformar(resultado)
    }
    return resultado
  })
}
aplicaNVeces([1], (valor) => valor + 1, 3) // resultado: [4]


/* ── Bloque: la máquina cambia el tipo / trabaja sobre objetos ─────────────── */

// 7) 🔖 CÓDIGO DE BARRAS. `etiquetas` recibe productos con `id: number` y le pone
//    a cada uno su código "#<id>" (de objeto sale un texto).
//      etiquetas([{ id: 1 }, { id: 2 }]) → ["#1", "#2"]
export function etiquetas(productos: { id: number }[]): string[] {
  return productos.map((producto) => String(`#${producto.id}`)) // ← provisional: le falta el "#".
}
etiquetas([{ id: 1 }, { id: 2 }]) // resultado: ["#1", "#2"]

// 8) 📢 CARTEL EN MAYÚSCULAS. `nombresEnMayuscula` recibe usuarios con `nombre` y
//    devuelve cada nombre en MAYÚSCULAS.
//      nombresEnMayuscula([{ nombre: "ana" }, { nombre: "leo" }]) → ["ANA", "LEO"]
export function nombresEnMayuscula(usuarios: { nombre: string }[]): string[] {
  return usuarios.map((usuario) => usuario.nombre.toUpperCase()) // ← provisional: no los pone en mayúscula.
}


/* ── Bloque: combinar dos máquinas / encadenar ─────────────────────────────── */

// 9) 🏭✅ LÍNEA + CONTROL DE CALIDAD. Primero pasa cada número por la máquina
//    `transformar`, y luego deja SOLO los que aprueban la prueba `cumpleCondicion`.
//    (Pista: .map(transformar) y luego .filter(cumpleCondicion), encadenados.)
//      transformarYFiltrar([1, 2, 3], (valor) => valor * 10, (valor) => valor > 15) → [20, 30]
export function transformarYFiltrar(nums: number[], transformar: (valor: number) => number, cumpleCondicion: (valor: number) => boolean,): number[] {
  return nums.map(transformar).filter(cumpleCondicion)
}
transformarYFiltrar([1, 2, 3], (valor) => valor * 10, (valor) => valor > 15) // resultado: [20, 30]

// 10) 🧾 CAJA REGISTRADORA (capstone). Pasa cada número por la máquina y devuelve
//     la SUMA de todos los resultados (un solo número, no un array).
//     (Pista: transforma con .map(transformar) y suma con .reduce.)
//       aplicaYSuma([1, 2, 3], (valor) => valor * 2) → 12    (2 + 4 + 6)
//       aplicaYSuma([], (valor) => valor + 1)        → 0
export function aplicaYSuma(nums: number[], transformar: (valor: number) => number): number {
  return nums.map(transformar).reduce((acum, valor) => acum + valor, 0)
}
aplicaYSuma([1, 2, 3], (valor) => valor * 2) // resultado: 12
