/* =============================================================================
 * EJERCICIO 02 — Constraints (`extends`) y `keyof` · versión nombres descriptivos
 * =============================================================================
 *
 * 🟢 NOTA DE NOMBRES (lee esto primero)
 * ----------------------------------------------------------------------------
 * Un genérico es un HUECO con nombre. Ese nombre lo eliges TÚ: igual que una
 * variable no tiene por qué llamarse `x`, un genérico no tiene por qué llamarse
 * `T`. En este archivo usamos nombres que se leen:
 *
 *     Objeto   → el hueco para "la forma del objeto"
 *     Llave    → el hueco para "el nombre de una propiedad de ese objeto"
 *     Item     → el hueco para "una cosa cualquiera con cierta forma"
 *
 * La CONVENCIÓN profesional es usar letras: `T` (Type), `K` (Key), `V` (Value),
 * `E` (Element). Las verás SIEMPRE así en librerías y documentación. Mientras
 * aprendes, escribe nombres descriptivos; pero entrena el ojo para leer que
 * `T` = "el objeto" y `K` = "la llave". Son el mismo concepto con apodo corto.
 *
 *
 * ▸ EXPLICACIÓN — ¿qué es un constraint? (`extends`)
 * ----------------------------------------------------------------------------
 * Un `<Objeto>` pelado es una caja que ACEPTA CUALQUIER COSA. Y justo por
 * aceptar todo, dentro no puedes asumir NADA: si escribes `x.length`, TS te
 * frena con "Property 'length' does not exist", porque `Objeto` podría ser un
 * number, y los números no tienen `.length`.
 *
 * Un CONSTRAINT (`<Objeto extends ...>`) es EL PORTERO CON UNA NORMA DE ENTRADA:
 * "puedes entrar con cualquier ropa, pero tienes que llevar zapatos".
 *
 *     <Item extends { length: number }>  →  "acepto cualquier tipo, SIEMPRE QUE
 *                                            tenga un length numérico".
 *
 * A cambio de esa garantía en la puerta, DENTRO ya puedes usar `.length` sin
 * miedo. Sigues siendo genérico, pero con un mínimo garantizado.
 *
 *     function medirLargo<Item extends { length: number }>(x: Item): number {
 *       return x.length          // ✅ ahora TS sabe que existe
 *     }
 *     medirLargo("hola")    // 4   (string tiene length)
 *     medirLargo([1, 2, 3]) // 3   (array tiene length)
 *     medirLargo(42)        // ❌ number no tiene length → rechazado en la puerta
 *
 *
 * ▸ EXPLICACIÓN — `keyof` y el acceso indexado `Objeto[Llave]`
 * ----------------------------------------------------------------------------
 * 🔑 ANALOGÍA DEL VESTUARIO. Un objeto es un vestuario lleno de casilleros.
 * Cada casillero tiene una ETIQUETA por fuera (la llave) y algo GUARDADO dentro
 * (el valor):
 *
 *     type Persona = { nombre: string; edad: number }
 *     //               ↑etiqueta       ↑etiqueta
 *
 *   • `keyof Persona`     → la lista de ETIQUETAS reales: "nombre" | "edad".
 *                           OJO: NO es `string` (cualquier texto), es un MENÚ
 *                           cerrado. "patata" NO está en el menú → se rechaza.
 *   • `Persona["edad"]`   → el TIPO de lo guardado en ese casillero: number.
 *
 * Juntos son el patrón profesional para leer una propiedad SIN perder el tipo:
 *
 *     function propiedad<Objeto, Llave extends keyof Objeto>(
 *       obj: Objeto, llave: Llave
 *     ): Objeto[Llave] {
 *       return obj[llave]
 *     }
 *     propiedad({ name: "Ana", age: 30 }, "name")  // string
 *     propiedad({ name: "Ana", age: 30 }, "age")   // number
 *     propiedad({ name: "Ana" }, "edad")           // ❌ "edad" no está en el menú
 *
 * `Llave extends keyof Objeto` es el portero otra vez: "la llave que pidas tiene
 * que ser una etiqueta REAL de este objeto".
 *
 *
 * ▸ EJERCICIO — drills en escalera. Hazlos EN ORDEN.
 * ----------------------------------------------------------------------------
 * En cada drill el CUERPO ya está, pero la FIRMA está "floja" (le falta el
 * portero, o devuelve `unknown`, o tipa una clave como `string`). Sin apretarla,
 * el archivo NO pasa `pnpm typecheck`. Tu trabajo: arreglar la FIRMA sin tocar
 * el cuerpo, usando nombres descriptivos.
 *
 * Reglas:
 *   - ❌ Prohibido `any` y prohibido `as X`. Si recurres a eso, perdiste el tipo.
 *   - ❌ No uses bucles `for`: en el bloque D usa `map`.
 *   - ✅ `pnpm test:run` Y `pnpm typecheck` deben quedar limpios (ambos).
 *
 * ===========================================================================*/


/* ---------------------------------------------------------------------------
 * BLOQUE A — extends para exigir una FORMA (shape) mínima
 * -------------------------------------------------------------------------- */

// 1) `medirLargo` devuelve el `.length` de lo que reciba. Para poder leer
//    `.length`, el genérico debe tener garantizado un `length: number`.
//    👉 Añade el portero a <Item> (`extends { length: number }`).
//      medirLargo("hola") → 4 ; medirLargo([1, 2, 3]) → 3
export function medirLargo<Item extends { length: number }>(x: Item): number {
  return x.length
}
medirLargo("hola")    // 4   (string tiene length)
medirLargo([1, 2, 3]) // 3   (array tiene length)
// medirLargo(42)        // ❌ number no tiene length → rechazado en la puerta

// 2) `tieneContenido` dice si algo con longitud está vacío o no.
//    Mismo portero que el drill 1.
//      tieneContenido("") → false ; tieneContenido([1]) → true
export function tieneContenido<Item extends { length: number }>(x: Item): boolean {
  return x.length > 0
}
tieneContenido("Hola buenas tardes") // true porque no es vacío
tieneContenido([1, 2, 3]) // true porque no es vacío
tieneContenido([]) // false porque es vacío

/* ----------------------------------------------------------------------------
 * BLOQUE B — extends para exigir una PROPIEDAD concreta
 * -------------------------------------------------------------------------- */

// 3) `obtenerId` lee la propiedad `id` de cualquier objeto que la tenga.
//    Devuelve el id, pero necesita GARANTIZAR que `id: number` existe.
//    👉 Restringe el genérico a "cualquier objeto que tenga id: number".
//      obtenerId({ id: 7, name: "a" }) → 7
export function obtenerId<Item extends { id: number }>(x: Item): number {
  return x.id
}
obtenerId({ id: 7, name: "Nico", edad: 23, activo: true, rol: "admin" }) // 7
// obtenerId({ name: "Nico" }) // ❌ no tiene id → rechazado en la puerta | Error durante compilación

/* ----------------------------------------------------------------------------
 * BLOQUE REFUERZO — 10 drills SOLO de `extends` (antes de tocar keyof)
 * ----------------------------------------------------------------------------
 * En TODOS el gatillo es el mismo: el cuerpo TOCA una propiedad o método de `x`,
 * así que `<Item>` pelado falla y debes "exigir" esa forma con `extends`.
 * Lee `extends` como "es un / cumple como mínimo".
 * Sube en escalera: 1 propiedad → varias → métodos → tipo con nombre.
 * -------------------------------------------------------------------------- */

// 4) lee UNA propiedad string y la devuelve en mayúsculas.
//      nombreEnMayus({ nombre: "ana" }) → "ANA"
export function nombreEnMayus<Item extends { nombre: string }>(x: Item): string {
  return x.nombre.toUpperCase()
}
nombreEnMayus({ nombre: "ana" })  // "ANA"
nombreEnMayus({ nombre: "nico" }) // "NICO"

// 5) lee UNA propiedad number y calcula sobre ella.
//      precioConIva({ precio: 100 }) → 119
export function precioConIva<Item extends { precio: number }>(x: Item): number {
  // Calculadora de IVA: precio + 19% del precio
  return x.precio * 1.19
}
precioConIva({ precio: 1000000 }) // Bicicleta Trek: 1.000.000 → 1.190.000
precioConIva({ precio: 1000 }) // Coca Cola: 1.000 → 1.190

// 6) lee UNA propiedad number y devuelve un boolean.
//      esMayorDeEdad({ edad: 20 }) → true ; esMayorDeEdad({ edad: 17 }) → false
export function esMayorDeEdad<Item extends { edad: number }>(x: Item): boolean {
  return x.edad >= 18
}


// 7) lee DOS propiedades number (portero con dos campos).
//      areaRect({ ancho: 3, alto: 4 }) → 12
export function areaRect<Item extends { ancho: number, alto: number }>(x: Item): number {
  return x.ancho * x.alto
}
areaRect({ ancho: 3, alto: 4 }) // 12

// 8) ahora no es una propiedad, es un MÉTODO. El portero también describe
//     métodos: { saludar(): string }.
//      presentar({ saludar: () => "hola" }) → "hola"
export function presentar<Item extends { saludar(): string }>(x: Item): string {
  return x.saludar()
}
presentar({ saludar: () => "hola" }) // "hola"

// 9) DOS propiedades de tipos distintos (number y string).
//      codigo({ id: 7, tipo: "user" }) → "user-7"
export function codigo<Item extends { tipo: string, id: number }>(x: Item): string {
  return `${x.tipo}-${x.id}`
}
codigo({ id: 7, tipo: "user" }) // "user-7"

// 10) reutiliza un TIPO CON NOMBRE como portero. El alias `Identificable` ya
//     está definido abajo; restringe el genérico a él (es idéntico a escribir la
//     forma a mano, pero con nombre y reutilizable en varias funciones).
//      borrarPorId({ id: 9, name: "x" }) → 9
type Identificable = { id: number }
export function borrarPorId<Item extends Identificable>(x: Item): number {
  return x.id
}
borrarPorId({ id: 9, name: "x" }) // 9

export function editarPorId<Item extends Identificable>(x: Item): number {
  return x.id
}

export function clonarConId<Item extends Identificable>(x: Item): number {
  return x.id
}

// 11) UNA propiedad number, otro cálculo booleano.
//      hayStock({ stock: 3 }) → true ; hayStock({ stock: 0 }) → false
export function hayStock<Item extends { stock: number }>(x: Item): boolean {
  return x.stock > 0
}
hayStock({ stock: 3 }) // true
hayStock({ stock: 0 }) // false

// 12) DOS propiedades string, combínalas.
//      nombreCompleto({ nombre: "Ana", apellido: "Paz" }) → "Ana Paz"
export function nombreCompleto<Item extends { nombre: string, apellido: string }>(x: Item): string {
  return `${x.nombre} ${x.apellido}`
}
nombreCompleto({ nombre: "Nicolás", apellido: "Villagrán" })
nombreCompleto({ nombre: "Matías", apellido: "Larraín" })

// 13) mezcla final: string + number en el mismo portero.
//      resumen({ titulo: "Intro", minutos: 5 }) → "Intro (5 min)"
export function resumen<Item extends { titulo: string, minutos: number }>(x: Item): string {
  return `${x.titulo} (${x.minutos} min)`
}
resumen({ titulo: "Intro a TypeScript", minutos: 5 }) // "Intro a TypeScript (5 min)"


/* ----------------------------------------------------------------------------
 * BLOQUE C — keyof, en ESCALERA (de "un texto es un tipo" hasta el getter)
 * ----------------------------------------------------------------------------
 * La idea que cuesta: en TS un TEXTO EXACTO ("rojo") puede ser un tipo, no solo
 * `string`. Y `keyof` no es magia nueva: solo FABRICA la lista de esos textos a
 * partir de las etiquetas de un objeto. Subimos peldaño a peldaño.
 *
 * En cada drill hay un starter "flojo" (`string`, `unknown`...) que SÍ compila
 * pero está mal. El test lo caza y `typecheck` queda rojo hasta que lo aprietas.
 * Reglas: ❌ nada de `any` ni `as`.
 * -------------------------------------------------------------------------- */


/* ── Un TEXTO EXACTO es un tipo (literales y uniones). Aún SIN keyof. ── */

// 14) `fijarTono` debe aceptar EXCLUSIVAMENTE el texto "claro". Si tipas `tono`
//      como `string`, aceptaría "oscuro", "rojo", lo que sea → mal.
//      👉 Cambia el tipo de `tono` por el LITERAL exacto: "claro".
//        fijarTono("claro") → "tema claro" ; fijarTono("oscuro") → ❌ error
export function fijarTono(tono: "claro"): string {
  return `tema ${tono}`
}
fijarTono("claro") // "tema claro"
// fijarTono("oscuro") // ❌ error (cuando lo aprietes)

// 15) `definirEstado` acepta SOLO uno de tres textos. Ni más, ni menos.
//      👉 Tipa `estado` como la UNIÓN de literales: "activo" | "inactivo" | "pendiente".
//        definirEstado("activo") → ok ; definirEstado("borrado") → ❌ error
export function definirEstado(estado: "activo" | "inactivo" | "pendiente"): string {
  return `Estado: ${estado}`
}
definirEstado("activo") // ok
// definirEstado("borrado") // ❌ error (cuando lo aprietes)


/* ── keyof = la lista de NOMBRES de las etiquetas (a nivel de tipo) ──── */

type Libro = { titulo: string; paginas: number }
type Usuario = { id: number; nombre: string; activo: boolean }

// 16) `LlavesLibro` debe ser la lista de etiquetas de `Libro`, o sea
//     "titulo" | "paginas". NO la escribas a mano: hazlo con keyof.
//     👉 Reemplaza `string` por `keyof Libro`.
export type LlavesLibro = keyof Libro

// 17) Lo mismo para `Usuario` → "id" | "nombre" | "activo".
//     👉 Usa keyof.
export type LlavesUsuario = keyof Usuario


/* ── Tipo["llave"] = el TIPO que vive en esa etiqueta (acceso indexado) ── */

// 18) ¿Qué TIPO guarda la etiqueta "titulo" de `Libro`? (mira su definición arriba)
//     👉 Reemplaza `unknown` por el acceso indexado: Libro["titulo"].
export type TipoTitulo = Libro["titulo"]

// 19) ¿Y qué tipo guarda la etiqueta "activo" de `Usuario`?
//     👉 Acceso indexado de nuevo.
export type TipoActivo = Usuario["activo"]


/* ── Juntar todo en una función genérica ─────────────────────────────── */

// 20) `propiedad` lee `obj[llave]` conservando el tipo EXACTO de esa propiedad.
//     Dos huecos: `Objeto` y `Llave`. Con ambos pelados TS se queja ("Llave
//     cannot index Objeto") porque no sabe que `Llave` es una etiqueta real.
//     👉 Pon el portero `Llave extends keyof Objeto` (drills 16–17) y tipa el
//        retorno como `Objeto[Llave]` (drills 18–19). El cuerpo NO cambia.
//        propiedad({ name: "Ana", age: 30 }, "name") → "Ana" (string)
//        propiedad({ name: "Ana", age: 30 }, "age")  → 30 (number)
export function propiedad<Objeto, Llave extends keyof Objeto>(obj: Objeto, llave: Llave): Objeto[Llave] {
  return obj[llave]
}
propiedad({ name: "Ana", age: 30 }, "name") // "Ana" (string)
propiedad({ name: "Ana", age: 30 }, "age")  // 30 (number)
// propiedad({ name: "Ana" }, "edad")          // ❌ "edad" no está en el menú


/* ----------------------------------------------------------------------------
 * BLOQUE D — juntarlo todo: keyof + genéricos + map
 * -------------------------------------------------------------------------- */

// 21) `extraer` (un "pluck") toma un array de objetos y una llave, y devuelve un
//    array con SOLO el valor de esa llave en cada objeto. El tipo del array de
//    salida es el de esa propiedad: `Objeto[Llave][]`.
//    👉 Mismo dúo Objeto + Llave extends keyof Objeto; el retorno es Objeto[Llave][].
//      extraer([{ id: 1 }, { id: 2 }], "id")              → [1, 2]      (number[])
//      extraer([{ name: "Ana" }, { name: "Lu" }], "name") → ["Ana","Lu"] (string[])
export function extraer<Objeto, Llave extends keyof Objeto>(arr: Objeto[], llave: Llave): Objeto[Llave][] {
  return arr.map((obj) => obj[llave])
}
extraer([{ id: 1 }, { id: 2 }], "id") // [1, 2] (number[])
extraer([{ name: "Ana" }, { name: "Lu" }], "name") // ["Ana","Lu"] (string[])
// extraer([{ name: "Ana" }, { name: "Lu" }], "id") // ❌ "id" no esta en el menú
/* ----------------------------------------------------------------------------
 * BLOQUE E — keyof con UN SOLO genérico (warm-up: sin Llave, sin Objeto[Llave])
 * ----------------------------------------------------------------------------
 * Antes de volver al dúo, fijamos `keyof Objeto` a solas. Idea central: si tipas
 * la clave como `keyof Objeto`, le dices a TS "esta clave es UNA del menú de
 * etiquetas de Objeto". A cambio, TS te deja hacer `obj[clave]` sin protestar.
 *
 * Aquí NO devolvemos el valor con su tipo exacto (eso es `Objeto[Llave]`, vuelve
 * en el BLOQUE F). Devolvemos siempre un tipo CONCRETO: boolean, string, number.
 * Un solo genérico `<Objeto>`. Nada de `Llave` todavía.
 *
 * Starter "flojo": la clave está tipada como `string`, y `obj[clave]` falla
 * (un string cualquiera NO es garantía de ser una etiqueta de Objeto). Tu único
 * cambio: apretar `clave: string` → `clave: keyof Objeto`. ❌ nada de `any`/`as`.
 * -------------------------------------------------------------------------- */

// 22) ¿el valor de la clave es "verdadero"? Un solo genérico; la clave es keyof Objeto.
//     👉 Cambia `clave: string` por `clave: keyof Objeto`. El retorno ya es boolean.
//       existeValor({ nombre: "Ana", activo: true }, "activo") → true
export function existeValor<Objeto>(obj: Objeto, clave: keyof Objeto): boolean {
  return Boolean(obj[clave])
}
existeValor({ nombre: "Ana", activo: true }, "activo") // true

// 23) muestra el valor de la clave como texto. Mismo cambio en la firma.
//       mostrarValor({ edad: 30 }, "edad") → "30"
export function mostrarValor<Objeto>(obj: Objeto, clave: keyof Objeto): string {
  return String(obj[clave])
}
mostrarValor({ edad: 30, nombre: "Nico", activo: true }, "nombre") // "Nico"

// 24) compara la MISMA clave entre dos objetos del mismo tipo.
//       sonIguales({ id: 1 }, { id: 1 }, "id") → true
export function sonIguales<Objeto>(a: Objeto, b: Objeto, clave: keyof Objeto): boolean {
  return a[clave] === b[clave]
}
sonIguales({ id: 1 }, { id: 1 }, "id") // true
sonIguales({ id: 1 }, { id: 2 }, "id") // false
sonIguales({ name: "Nico" }, { name: "Dani" }, "name") // false
sonIguales({ name: "Nico" }, { name: "Nico" }, "name") // true

// 25) cuenta, en un array, cuántos objetos tienen valor "verdadero" en la clave.
//       contarVerdaderos([{ ok: true }, { ok: false }], "ok") → 1
export function contarVerdaderos<Objeto>(arr: Objeto[], clave: keyof Objeto): number {
  return arr.filter((obj) => Boolean(obj[clave])).length
}
contarVerdaderos([{ ok: true }, { ok: false }, { ok: true }, { ok: false }], "ok") // 2
contarVerdaderos([{ ok: true }, { ok: false }, { ok: true }], "ok") // 2

// 26) saca la columna de la clave y la convierte a texto (string[]).
//       textos([{ n: 1 }, { n: 2 }], "n") → ["1", "2"]
export function textos<Objeto>(arr: Objeto[], clave: keyof Objeto): string[] {
  return arr.map((obj) => String(obj[clave]))
}
textos([{ n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }], "n") // ["1", "2", "3", "4"]


/* ----------------------------------------------------------------------------
 * BLOQUE F — REFUERZO de keyof + Objeto[Llave] + pluck (10 drills, simple → complejo)
 * ----------------------------------------------------------------------------
 * Misma lógica que los drills 20 y 21, repetida con variaciones para que se
 * vuelva automática. En TODOS el patrón es el mismo:
 *   - `<Objeto, Llave extends keyof Objeto>`  → Llave es una etiqueta REAL (portero).
 *   - `Objeto[Llave]`                          → el tipo que vive en esa etiqueta.
 *   - sobre arrays, `Objeto[Llave][]`          → un array de esos valores (con map).
 *
 * Cada función arranca "floja" (dúo sin portero, retorno `unknown`...) → typecheck
 * ROJO. Tu trabajo: apretar la FIRMA sin tocar el cuerpo. ❌ nada de `any` ni `as`.
 * -------------------------------------------------------------------------- */


/* ── Getters sobre UN objeto (Objeto[Llave]) ───────────────────────────── */

// 27) El getter base (idéntico a `propiedad`, para arrancar en caliente):
//     devuelve el valor de `clave` conservando su tipo exacto.
//     👉 Pon el portero `Llave extends keyof Objeto` y el retorno `Objeto[Llave]`.
//       valorDe({ nombre: "Ana", edad: 30 }, "edad") → 30 (number)
export function valorDe<Objeto, Llave extends keyof Objeto>(obj: Objeto, clave: Llave): Objeto[Llave] {
  return obj[clave]
}
valorDe({ nombre: "Ana", edad: 30 }, "edad") // 30 (number)

// 28) Compara el valor de `clave` con un `valor` que TÚ pasas. Lo interesante:
//     `valor` debe ser del MISMO tipo que esa propiedad, no cualquier cosa.
//     👉 Portero `Llave extends keyof Objeto`; tipa `valor` como `Objeto[Llave]`.
//        El retorno ya es boolean.
//       igualA({ edad: 30 }, "edad", 30) → true ; igualA(..., "edad", "x") → ❌ tipo
export function igualA<Objeto, Llave extends keyof Objeto>(obj: Objeto, clave: Llave, valor: Objeto[Llave]): boolean {
  return obj[clave] === valor
}
igualA({ edad: 30, nombre: "Nico", activo: true }, "nombre", "Nico") // true

// 29) Compara la MISMA clave entre DOS objetos del mismo tipo.
//     👉 Solo falta el portero; el cuerpo ya compara a[clave] con b[clave].
//       mismaPropiedad({ id: 1 }, { id: 1 }, "id") → true
export function mismaPropiedad<Objeto, Llave extends keyof Objeto>(a: Objeto, b: Objeto, clave: Llave): boolean {
  return a[clave] === b[clave]
}
mismaPropiedad({ id: 1 }, { id: 1 }, "id") // true
mismaPropiedad({ id: 1 }, { id: 2 }, "id") // false
// mismaPropiedad({ id: 1 }, { id: 2 }, "name") // ❌ porque no tienen la misma clave | Error en compilación

/* ── "Pluck": sacar una columna de un array (Objeto[Llave][]) ───────────── */

// 30) El pluck base (idéntico a `extraer`): el valor de `clave` en cada objeto.
//     👉 Portero + retorno `Objeto[Llave][]`.
//       columna([{ precio: 100 }, { precio: 200 }], "precio") → [100, 200] (number[])
export function columna<Objeto, Llave extends keyof Objeto>(arr: Objeto[], clave: Llave): Objeto[Llave][] {
  return arr.map((obj) => obj[clave])
}
columna([{ precio: 100 }, { precio: 200 }], "precio") // [100, 200]

// 31) Cuenta cuántos objetos tienen un valor "verdadero" en esa clave (filter).
//     Aquí el retorno es `number`, NO `Objeto[Llave][]`: el tipo de salida lo
//     decide lo que la función devuelve, no la clave.
//     👉 Solo falta el portero.
//       cuantosConValor([{ activo: true }, { activo: false }], "activo") → 1
export function cuantosConValor<Objeto, Llave extends keyof Objeto>(arr: Objeto[], clave: Llave): number {
  return arr.filter((obj) => Boolean(obj[clave])).length
}
cuantosConValor([{ activo: true }, { activo: false }], "activo") // 1
cuantosConValor([{ activo: true }, { activo: false }, { activo: true }], "activo") // 2
cuantosConValor([{ activo: true }, { activo: false }, { activo: true }, { activo: true }], "activo") // 3


// 32) Saca la columna y la convierte a texto con String(). El retorno es
//     `string[]` aunque la propiedad sea number: de nuevo, manda el callback.
//     👉 Solo falta el portero (el retorno ya es string[]).
//       etiquetar([{ precio: 100 }, { precio: 200 }], "precio") → ["100", "200"]
export function etiquetar<Objeto, Llave extends keyof Objeto>(arr: Objeto[], clave: Llave): string[] {
  return arr.map((obj) => String(obj[clave]))
}
etiquetar([{ precio: 100 }, { precio: 200 }], "precio") // ["100", "200"]

// 33) Devuelve el PRIMER valor de la columna, o undefined si el array está vacío.
//     Recuerda: leer `arr[0]` con noUncheckedIndexedAccess da `Objeto[Llave] | undefined`.
//     👉 Portero + retorno `Objeto[Llave] | undefined`.
//       primerValor([{ n: "Ana" }, { n: "Lu" }], "n") → "Ana" ; primerValor([], "n") → undefined
export function primerValor<Objeto, Llave extends keyof Objeto>(arr: Objeto[], clave: Llave): Objeto[Llave] | undefined {
  return arr.map((obj) => obj[clave])[0]
}
primerValor([{ n: "Ana" }, { n: "Lu" }], "n") // "Ana"
primerValor([{ n: "Nico" }, { n: "Lu" }, { n: "Lu" }], "n") // "Nico"
primerValor([], "n") // undefined No hay ninguno

// 34) Saca la columna y elimina duplicados con un Set.
//     👉 Portero + retorno `Objeto[Llave][]`.
//       valoresUnicos([{ t: "a" }, { t: "b" }, { t: "a" }], "t") → ["a", "b"]
export function valoresUnicos<Objeto, Llave extends keyof Objeto>(arr: Objeto[], clave: Llave): Objeto[Llave][] {
  return [...new Set(arr.map((obj) => obj[clave]))]
}
valoresUnicos([{ t: "a" }, { t: "b" }, { t: "a" }, { t: "b" }, { t: "c" }], "t") // ["a", "b", "c"]

/* ── Combinaciones (más complejas) ─────────────────────────────────────── */

// 35) DOS claves a la vez sobre un objeto: devuelve sus dos valores como tupla.
//     Necesitas DOS huecos de llave, cada uno con su propio portero.
//     👉 `<Objeto, Llave1 extends keyof Objeto, Llave2 extends keyof Objeto>`;
//        retorno `[Objeto[Llave1], Objeto[Llave2]]`.
//       dosValores({ nombre: "Ana", edad: 30 }, "nombre", "edad") → ["Ana", 30]
export function dosValores<Objeto, Llave1 extends keyof Objeto, Llave2 extends keyof Objeto>(obj: Objeto, k1: Llave1, k2: Llave2): [Objeto[Llave1], Objeto[Llave2]] {
  return [obj[k1], obj[k2]]
}
dosValores({ nombre: "Nico", edad: 23, activo: true }, "nombre", "nombre") // ["Nico", "Nico"]
dosValores({ nombre: "Nico", edad: 23, activo: true }, "edad", "activo") // [23, true]

// 36) CAPSTONE: busca en el array el primer objeto cuya `clave` valga `valor`
//     (como buscar un usuario por id). Junta TODO: portero, `Objeto[Llave]` en el
//     parámetro `valor`, y `find`, que devuelve el objeto completo o undefined.
//     👉 Portero `Llave extends keyof Objeto`; `valor: Objeto[Llave]`;
//        retorno `Objeto | undefined`.
//       buscarPor([{ id: 1 }, { id: 2 }], "id", 2) → { id: 2 }
export function buscarPor<Objeto, Llave extends keyof Objeto>(arr: Objeto[], clave: Llave, valor: Objeto[Llave]): Objeto | undefined {
  return arr.find((obj) => obj[clave] === valor)
}
buscarPor([{ id: 1 }, { id: 2 }], "id", 2) // { id: 2 }
buscarPor([{ id: 3 }], "id", 2) // undefined

