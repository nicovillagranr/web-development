/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — los tres primos de `Object` (sobre `{ a: 1, b: 5, c: 3 }`):
 *
 *   Object.keys(obj)     // → ["a", "b", "c"]              los NOMBRES (siempre strings)
 *   Object.values(obj)   // → [1, 5, 3]                    los VALORES (aquí, números)
 *   Object.entries(obj)  // → [["a",1], ["b",5], ["c",3]]  los PARES [nombre, valor]
 *
 * 🧠 Un casillero con etiquetas: keys = las etiquetas · values = lo de dentro ·
 *    entries = etiqueta + contenido, juntos, casillero por casillero.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 05 — Objetos: recorrer con Object.keys / values / entries
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Un array lo recorres directo. Un objeto no: primero sacas sus CLAVES, sus
 * VALORES, o sus PARES [clave, valor], y eso ya es un array que sí puedes
 * recorrer con map/filter/reduce.
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 *     const o = { a: 1, b: 2 }
 *     Object.keys(o)     // ["a", "b"]
 *     Object.values(o)   // [1, 2]
 *     Object.entries(o)  // [["a", 1], ["b", 2]]   ← cada par es una tupla [clave, valor]
 *
 * 🧠 ANALOGÍA: un casillero con etiquetas. `keys` = lista de etiquetas, `values` =
 *    lo guardado en cada uno, `entries` = parejas etiqueta→contenido.
 *
 * OJO — `entries` da TUPLAS `[string, number]`. En el callback las desestructuras:
 *    `.map(([clave, valor]) => ...)`.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/04-objetos/exercise-05.test.ts
 * ===========================================================================*/

/* --- BLOQUE A — keys y values --- */

// 1) `clavesDe` — las claves del objeto.
//    clavesDe({ a: 1, b: 2 }) → ["a", "b"]
export function clavesDe(obj: Record<string, number>): string[] {
  return Object.keys(obj)
}
// return: ["a", "b"]
clavesDe({ a: 1, b: 2 })

// 2) `valoresDe` — los valores del objeto.
//    valoresDe({ a: 1, b: 2 }) → [1, 2]
export function valoresDe(obj: Record<string, number>): number[] {
  return Object.values(obj)
}
// return: [1, 2]
valoresDe({ a: 1, b: 2 })

/* --- BLOQUE B — values + reduce, y entries --- */

// 3) `sumaDeValores` — la suma de todos los valores.
//    sumaDeValores({ a: 1, b: 2, c: 3 }) → 6
export function sumaDeValores(obj: Record<string, number>): number {
  return Object.values(obj).reduce((acumulador, valor) => acumulador + valor, 0)
}
// return: 6
sumaDeValores({ a: 1, b: 2, c: 3 })

// 4) `paresClaveValor` — los pares [clave, valor].
//    paresClaveValor({ a: 1 }) → [["a", 1]]
export function paresClaveValor(obj: Record<string, number>): [string, number][] {
  return Object.entries(obj)
}

/* --- BLOQUE C — CAPSTONE: entries + map + join --- */

// 5) `describir` — "clave=valor" de cada par, unidos por ", ".
//    describir({ a: 1, b: 2 }) → "a=1, b=2"
export function describir(obj: Record<string, number>): string {
  return Object.entries(obj).map(([clave, valor]) => `${clave}=${valor}`).join(", ")
}

/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE R — ESCALERA DE REFUERZO: desarmar `.map(([clave, valor]) => ...)`
 * ════════════════════════════════════════════════════════════════════════════
 *
 * El lío del paréntesis→corchete→paréntesis es que son TRES CAPAS distintas
 * pegadas. Cada símbolo pertenece a una:
 *
 *     .map( ([clave, valor]) => `${clave}=${valor}` )
 *         │ ││            ││
 *         │ ││            ││
 *         │ ││            │└─ 3. cierra la LISTA DE PARÁMETROS de la flecha
 *         │ ││            └── 2. cierra el PATRÓN de desestructuración
 *         │ │└─────────────── 2. abre  el PATRÓN: "lo que llega es un array de 2;
 *         │ │                     llama `clave` al 1º y `valor` al 2º"
 *         │ └──────────────── 3. abre  la LISTA DE PARÁMETROS de la flecha
 *         └────────────────── 1. paréntesis de la LLAMADA a map()
 *
 * Capa 1 → estás LLAMANDO a map. Todo lo de dentro es UN solo argumento.
 * Capa 3 → la flecha declara sus parámetros, como en `(x) => x * 2`.
 * Capa 2 → el corchete NO es un array: es un PATRÓN que desempaqueta.
 *
 * 🔑 LA CLAVE: la flecha recibe UN parámetro (la entrada, una tupla `[string, number]`).
 *    El corchete no añade un parámetro más — abre el que ya hay. Estas dos líneas
 *    hacen EXACTAMENTE lo mismo:
 *
 *      .map((entrada)       => `${entrada[0]}=${entrada[1]}`)   // sin desempaquetar
 *      .map(([clave, valor]) => `${clave}=${valor}`)            // desempaquetando
 *
 * 🧠 ANALOGÍA: te llega UN paquete de Correos con dos cosas dentro. Puedes dejarlo
 *    cerrado y rebuscar por posición (`paquete[0]`, `paquete[1]`), o abrirlo en la
 *    puerta y sacar las dos cosas ya con su nombre. Sigue siendo UN paquete.
 *
 * La escalera sube de "tupla desnuda" → "desempaquetar en el parámetro" → "todo
 * dentro de map". ❌ Prohibido `any` y `as`.
 * ==========================================================================*/

/* ── R1 — la tupla, a pelo (sin flechas, sin map) ── */

// R1) `laClave` — la clave de UNA entrada. Accede por POSICIÓN: la clave es la 0.
//     laClave(["a", 1]) → "a"
export function laClave(entrada: [string, number]): string {
  return entrada[0]
}
laClave(["a", 1]) // "a"

// R2) `elValor` — el valor de UNA entrada. El valor es la posición 1.
//     elValor(["a", 1]) → 1
export function elValor(entrada: [string, number]): number {
  return entrada[1]
}

// R3) `formatearConIndices` — "clave=valor", usando SOLO índices (nada de corchetes
//     en el parámetro todavía). Es el cuerpo del drill 5, pero sin desempaquetar.
//     formatearConIndices(["a", 1]) → "a=1"
export function formatearConIndices(entrada: [string, number]): string {
  return `${entrada[0]}=${entrada[1]}`
}

/* ── R2 — EL SALTO: desempaquetar EN EL PARÁMETRO ── */

// R4) `formatearDesestructurando` — MISMO resultado que R3, pero el parámetro ya no
//     se llama `entrada`: en su lugar pones el PATRÓN `[clave, valor]`. Fíjate en que
//     el tipo `: [string, number]` sigue siendo el mismo — sigue llegando UNA tupla.
//     En el cuerpo ya no hay índices: usas `clave` y `valor` por su nombre.
//     formatearDesestructurando(["a", 1]) → "a=1"
export function formatearDesestructurando([clave, valor]: [string, number]): string {
  return `${clave}=${valor}`
}
formatearDesestructurando(["a", 1]) // "a=1"

/* ── R3 — ahora sí, dentro de map ── */

//  const o = { a: 1, b: 2 }
//  Object.keys(o)     // ["a", "b"]
//  Object.values(o)   // [1, 2]
//  Object.entries(o)  // [["a", 1], ["b", 2]]   ← cada par es una tupla [clave, valor]

// R5) `describirConIndices` — como el drill 5, pero SIN desestructurar: la flecha
//     recibe `entrada` y tú sacas las piezas con `entrada[0]` / `entrada[1]`.
//     (Pista: Object.entries → .map(...) → .join(", "))
//     describirConIndices({ a: 1, b: 2 }) → "a=1, b=2"
export function describirConIndices(obj: Record<string, number>): string {
  return Object.entries(obj).map((entrada) => `${entrada[0]}=${entrada[1]}`).join(", ")
}

// R6) `clavesConValorMinimo` — solo las CLAVES cuyo valor llega al mínimo.
//     Aquí desestructuras DOS veces y en cada una necesitas piezas distintas:
//       · en el filter miras el `valor`  → `([clave, valor]) => ...`
//       · en el map devuelves la `clave` → te basta con `([clave]) => ...`
//     Sí: puedes desempaquetar SOLO la primera pieza y olvidarte del resto.
//     clavesConValorMinimo({ a: 1, b: 5, c: 9 }, 5) → ["b", "c"]
export function clavesConValorMinimo(obj: Record<string, number>, minimo: number): string[] {
  return Object.entries(obj).filter((entrada) => entrada[1] >= minimo).map(([clave]) => clave)
}

/* ── R4 — CAPSTONE: el drill 5, pero ordenado ── */

// R7) `describirOrdenado` — igual que `describir`, pero de MAYOR a menor valor.
//     Encadenas: entries → sort (por valor, descendente) → map → join.
//     En el `sort` el callback recibe DOS entradas (a y b), así que hay dos patrones:
//     `(a, b) => ...`. Puedes tirar de índices (`a[1]`, `b[1]`) o desestructurar las
//     dos a la vez. Empieza con índices si te enreda; lo importante es que salga.
//     describirOrdenado({ a: 1, b: 9, c: 5 }) → "b=9, c=5, a=1"
export function describirOrdenado(obj: Record<string, number>): string {
  return Object.entries(obj).sort((a, b) => b[1] - a[1]).map(formatearConIndices).join(", ")
}
describirOrdenado({ a: 1, b: 9, c: 5 }) // -> "b=9, c=5, a=1"
