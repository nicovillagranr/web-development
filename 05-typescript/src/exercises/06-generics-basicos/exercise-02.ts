/* =============================================================================
 * EJERCICIO 02 — Constraints (`extends`) y `keyof`
 * =============================================================================
 *
 * ▸ EXPLICACIÓN — ¿qué es un constraint?
 * ----------------------------------------------------------------------------
 * Un `<T>` normal es una caja que ACEPTA CUALQUIER COSA. El problema es que,
 * justo por aceptar todo, dentro de la función no puedes asumir NADA: si
 * escribes `valor.length`, TS te frena con "Property 'length' does not exist on
 * type 'T'", porque T podría ser un number, y los números no tienen `.length`.
 *
 * Un CONSTRAINT (`<T extends ...>`) es EL PORTERO DEL LOCAL CON UNA NORMA DE
 * ENTRADA: "puedes entrar con cualquier ropa, pero tienes que llevar zapatos".
 *   <T extends { length: number }>  →  "acepto cualquier tipo, SIEMPRE QUE
 *                                       tenga una propiedad length numérica".
 * A cambio de esa garantía en la puerta, DENTRO ya puedes usar `.length` con
 * total seguridad. Sigues siendo genérico (string, array, lo que sea), pero
 * con un mínimo garantizado.
 *
 *   function medirLargo<T extends { length: number }>(x: T): number {
 *     return x.length          // ✅ ahora TS sabe que existe
 *   }
 *   medirLargo("hola")    // 4   (string tiene length)
 *   medirLargo([1, 2, 3]) // 3   (array tiene length)
 *   medirLargo(42)        // ❌ number no tiene length → rechazado en la puerta
 *
 *
 * ▸ EXPLICACIÓN — `keyof` y el acceso indexado `T[K]`
 * ----------------------------------------------------------------------------
 * `keyof` es EL LLAVERO de un objeto-tipo: te da la UNIÓN de sus claves como
 * literales.
 *
 *   type Persona = { name: string; age: number }
 *   type Claves   = keyof Persona      // "name" | "age"
 *
 * Y `T[K]` es "abrir la habitación K y ver qué hay dentro": el tipo del valor
 * que vive en esa clave. Juntos son el patrón profesional para leer una
 * propiedad SIN perder el tipo:
 *
 *   function propiedad<T, K extends keyof T>(obj: T, key: K): T[K] {
 *     return obj[key]
 *   }
 *   propiedad({ name: "Ana", age: 30 }, "name")  // string
 *   propiedad({ name: "Ana", age: 30 }, "age")   // number
 *   propiedad({ name: "Ana" }, "edad")           // ❌ "edad" no está en el llavero
 *
 * Aquí `K extends keyof T` es el portero otra vez: "la clave que pidas tiene que
 * ser una llave real de este objeto". Eso impide pedir "edad" cuando solo
 * existe "name".
 *
 *
 * ▸ EJERCICIO — drills en escalera. Hazlos EN ORDEN.
 * ----------------------------------------------------------------------------
 * En cada drill el CUERPO ya está, pero FALTA el constraint. Sin él, el archivo
 * NO pasa `pnpm typecheck` (verás errores de "propiedad no existe en T"). Tu
 * trabajo es añadir el `extends ...` correcto para que typecheck quede limpio
 * SIN perder información.
 *
 * Reglas:
 *   - ❌ Prohibido `any` y prohibido `as X`. Si recurres a eso, perdiste el tipo.
 *   - ❌ No uses bucles `for`: en el bloque D usa map del ejercicio 10.
 *   - ✅ `pnpm test:run` Y `pnpm typecheck` deben quedar limpios (ambos).
 *
 * ===========================================================================*/


/* ----------------------------------------------------------------------------
 * BLOQUE A — extends para exigir una FORMA (shape) mínima
 * -------------------------------------------------------------------------- */

// 1) `medirLargo` devuelve el `.length` de lo que reciba. Para poder leer
//    `.length`, T debe tener garantizado un `length: number`.
//    👉 Añade el constraint a <T> para que typecheck pase.
//      medirLargo("hola") → 4 ; medirLargo([1, 2, 3]) → 3
export function medirLargo<T extends { length: number }>(x: T): number {
  return x.length
}
medirLargo("hola")    // 4   (string tiene length)
medirLargo([1, 2, 3]) // 3   (array tiene length)
// medirLargo(42)        // ❌ number no tiene length → rechazado en la puerta

// 2) `tieneContenido` dice si algo con longitud está vacío o no.
//    Mismo constraint que el drill 1.
//      tieneContenido("") → false ; tieneContenido([1]) → true
export function tieneContenido<T extends { length: number }>(x: T): boolean {
  return x.length > 0
}


/* ----------------------------------------------------------------------------
 * BLOQUE B — extends para exigir una PROPIEDAD concreta
 * -------------------------------------------------------------------------- */

// 3) `obtenerId` lee la propiedad `id` de cualquier objeto que la tenga.
//    Devuelve T sin tocar (para no perder el resto del objeto), pero necesita
//    GARANTIZAR que `id: number` existe.
//    👉 Restringe T a "cualquier objeto que tenga id: number".
//      obtenerId({ id: 7, name: "a" }) → 7
export function obtenerId<T extends { id: number }>(x: T): number {
  return x.id
}


/* ----------------------------------------------------------------------------
 * BLOQUE REFUERZO — 10 drills SOLO de `extends` (antes de tocar keyof)
 * ----------------------------------------------------------------------------
 * En TODOS el gatillo es el mismo: el cuerpo TOCA una propiedad o método de `x`,
 * así que `<T>` pelado falla y debes "require" esa forma con `extends`.
 * Recuerda leer `extends` como "es un / cumple como mínimo".
 * Sube en escalera: 1 propiedad → varias → métodos → tipo con nombre.
 * -------------------------------------------------------------------------- */

// 4) lee UNA propiedad string y la devuelve en mayúsculas.
//      nombreEnMayus({ nombre: "ana" }) → "ANA"
export function nombreEnMayus<T extends { nombre: string }>(x: T): string {
  return x.nombre.toUpperCase()
}
nombreEnMayus({ nombre: "ana" }) // "ANA"
nombreEnMayus({ nombre: "nico" })  // "NICO"

// 5) lee UNA propiedad number y calcula sobre ella.
//      precioConIva({ precio: 100 }) → 119
export function precioConIva<T extends { precio: number }>(x: T): number {
  // Calculadora de IVA: precio + 19% del precio
  return x.precio * 1.19
}
// Bicicleta Trek -> 1.000.000 -> 1.190.000
precioConIva({ precio: 1000000 })

// 6) lee UNA propiedad number y devuelve un boolean.
//      esMayorDeEdad({ edad: 20 }) → true ; esMayorDeEdad({ edad: 17 }) → false
export function esMayorDeEdad<T extends { edad: number }>(x: T): boolean {
  return x.edad >= 18
}
esMayorDeEdad({ edad: 20 }) // true
esMayorDeEdad({ edad: 17 }) // false

// 7) lee DOS propiedades number (constraint con dos campos).
//      areaRect({ ancho: 3, alto: 4 }) → 12
export function areaRect<T extends { ancho: number, alto: number }>(x: T): number {
  return x.ancho * x.alto
}
areaRect({ ancho: 3, alto: 4 }) // 12

// 8) ahora no es una propiedad, es un MÉTODO. El constraint también describe
//     métodos: { saludar(): string }.
//      presentar({ saludar: () => "hola" }) → "hola"
export function presentar<T extends { saludar(): string }>(x: T): string {
  return x.saludar()
}
presentar({ saludar: () => "hola" }) // "hola"

// 9) DOS propiedades de tipos distintos (number y string).
//      codigo({ id: 7, tipo: "user" }) → "user-7"
export function codigo<T extends { id: number, tipo: string }>(x: T): string {
  return `${x.tipo}-${x.id}`
}

// 10) reutiliza un TIPO CON NOMBRE como constraint. Define abajo el alias y
//     restringe T a él (es idéntico a escribir la forma a mano, pero con nombre).
//      borrarPorId({ id: 9, name: "x" }) → 9
type Identificable = { id: number }
export function borrarPorId<T extends Identificable>(x: T): number {
  return x.id
}

export function editarPorId<T extends Identificable>(x: T): number {
  return x.id
}

export function clonarConId<T extends Identificable>(x: T): number {
  return x.id
}

// 11) UNA propiedad number, otro cálculo booleano.
//      hayStock({ stock: 3 }) → true ; hayStock({ stock: 0 }) → false
export function hayStock<T extends { stock: number }>(x: T): boolean {
  return x.stock > 0
}
hayStock({ stock: 3 }) // true
hayStock({ stock: 0 }) // false

// 12) DOS propiedades string, combínalas.
//      nombreCompleto({ nombre: "Ana", apellido: "Paz" }) → "Ana Paz"
export function nombreCompleto<T extends { nombre: string, apellido: string }>(x: T): string {
  return `${x.nombre} ${x.apellido}`
}
nombreCompleto({ nombre: "Nicolás", apellido: "Villagrán" })

// 13) mezcla final: string + number en el mismo constraint.
//      resumen({ titulo: "Intro", minutos: 5 }) → "Intro (5 min)"
export function resumen<T extends { titulo: string, minutos: number }>(x: T): string {
  return `${x.titulo} (${x.minutos} min)`
}
resumen({ titulo: "Intro a TypeScript", minutos: 5 }) // "Intro a TypeScript (5 min)"


/* ----------------------------------------------------------------------------
 * BLOQUE C — keyof, en ESCALERA (de "un texto es un tipo" hasta el getter)
 * ----------------------------------------------------------------------------
 * La idea que cuesta: en TS un TEXTO EXACTO ("rojo") puede ser un tipo, no solo
 * `string`. Y `keyof` no es magia nueva: solo FABRICA la lista de esos textos a
 * partir de las llaves de un objeto. Subimos peldaño a peldaño.
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
// fijarTono("oscuro") // ❌ error

// 15) `definirEstado` acepta SOLO uno de tres textos. Ni más, ni menos.
//      👉 Tipa `estado` como la UNIÓN de literales: "activo" | "inactivo" | "pendiente".
//        definirEstado("activo") → ok ; definirEstado("borrado") → ❌ error
export function definirEstado(estado: "activo" | "inactivo" | "pendiente"): string {
  return `Estado: ${estado}`
}
definirEstado("activo") // ok
// definirEstado("borrado") // ❌ error

/* ── keyof = la lista de NOMBRES de las llaves (a nivel de tipo) ──────── */

type Libro = { titulo: string; paginas: number }
type Usuario = { id: number; nombre: string; activo: boolean }

// 16) `LlavesLibro` debe ser la lista de nombres de las llaves de `Libro`, o
//     sea "titulo" | "paginas". NO la escribas a mano: hazlo con keyof.
//     👉 Reemplaza `string` por `keyof Libro`.
export type LlavesLibro = keyof Libro

// 17) Lo mismo para `Usuario` → "id" | "nombre" | "activo".
//     👉 Usa keyof.
export type LlavesUsuario = keyof Usuario


/* ── Tipo["llave"] = el TIPO que vive en esa llave (acceso indexado) ──── */

// 18) ¿Qué TIPO guarda la llave "titulo" de `Libro`? (mira su definición arriba)
//     👉 Reemplaza `unknown` por el acceso indexado: Libro["titulo"].
export type TipoTitulo = Libro["titulo"]

// 19) ¿Y qué tipo guarda la llave "activo" de `Usuario`?
//     👉 Acceso indexado de nuevo.
export type TipoActivo = Usuario["activo"]


/* ── Juntar todo en una función genérica ─────────────────────────────── */

// 20) `propiedad` lee `obj[key]` conservando el tipo EXACTO de esa propiedad.
//     Dos etiquetas: T (el objeto) y K (la clave). Con `<T, K>` pelado TS se
//     queja ("K cannot index T") porque no sabe que K es una llave real de T.
//     👉 Restringe K con `keyof T` (drills 16–17) y tipa el retorno como `T[K]`
//        (drills 18–19). El cuerpo NO cambia.
//        propiedad({ name: "Ana", age: 30 }, "name") → "Ana" (string)
//        propiedad({ name: "Ana", age: 30 }, "age")  → 30 (number)
export function propiedad<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
propiedad({ name: "Ana", age: 30 }, "name") // "Ana" (string)
propiedad({ name: "Ana", age: 30 }, "age")  // 30 (number)
// propiedad({ name: "Ana" }, "edad")          // ❌ "edad" no está en el llavero


/* ----------------------------------------------------------------------------
 * BLOQUE D — juntarlo todo: keyof + genéricos + map (ej. 10)
 * -------------------------------------------------------------------------- */

// 21) `extraer` (un "pluck") toma un array de objetos y una clave, y devuelve un
//    array con SOLO el valor de esa clave en cada objeto. El tipo del array de
//    salida es el de esa propiedad (T[K][]).
//    👉 Mismo dúo T + K extends keyof T; el retorno es T[K][].
//      extraer([{ id: 1 }, { id: 2 }], "id")              → [1, 2]      (number[])
//      extraer([{ name: "Ana" }, { name: "Lu" }], "name") → ["Ana","Lu"] (string[])
export function extraer<T, K extends keyof T>(arr: T[], key: K): T[K][] {
  return arr.map((obj) => obj[key])
}


/* ----------------------------------------------------------------------------
 * BLOQUE E — keyof con UN SOLO genérico (warm-up: sin K, sin T[K])
 * ----------------------------------------------------------------------------
 * Antes de volver al dúo <T, K>, fijamos `keyof T` a solas. Idea central:
 * si tipas la clave como `keyof T`, le dices a TS "esta clave es UNA del llavero
 * de T". A cambio, TS te deja hacer `obj[clave]` sin protestar.
 *
 * Aquí NO devolvemos el valor con su tipo exacto (eso es `T[K]`, lo retomamos en
 * el BLOQUE F). Devolvemos siempre un tipo CONCRETO: boolean, string, number...
 * Un solo genérico `<T>`. Nada de `K` todavía.
 *
 * Starter "flojo": la clave está tipada como `string`, y `obj[clave]` falla
 * (TS: un string cualquiera NO es garantía de ser una llave de T). Tu único
 * cambio: apretar `clave: string` → `clave: keyof T`. ❌ nada de `any` ni `as`.
 * -------------------------------------------------------------------------- */

// 22) ¿el valor de la clave es "verdadero"? Un solo genérico; la clave es keyof T.
//     👉 Cambia `clave: string` por `clave: keyof T`. El retorno ya es boolean.
//       existeValor({ nombre: "Ana", activo: true }, "activo") → true
export function existeValor<T>(obj: T, clave: keyof T): boolean {
  return Boolean(obj[clave])
}
existeValor({ nombre: "Ana", activo: true }, "activo") // true

// 23) muestra el valor de la clave como texto. Mismo cambio en la firma.
//       mostrarValor({ edad: 30 }, "edad") → "30"
export function mostrarValor<T>(obj: T, clave: keyof T): string {
  return String(obj[clave])
}
mostrarValor({ edad: 30, nombre: "Nico", activo: true }, "nombre") // "Nico"

// 24) compara la MISMA clave entre dos objetos del mismo tipo.
//       sonIguales({ id: 1 }, { id: 1 }, "id") → true
export function sonIguales<T>(a: T, b: T, clave: keyof T): boolean {
  return a[clave] === b[clave]
}
sonIguales({ id: 1 }, { id: 1 }, "id") // true
sonIguales({ id: 1 }, { id: 2 }, "id") // false

// 25) cuenta, en un array, cuántos objetos tienen valor "verdadero" en la clave.
//       contarVerdaderos([{ ok: true }, { ok: false }], "ok") → 1
export function contarVerdaderos<T>(arr: T[], clave: keyof T): number {
  return arr.filter((obj) => Boolean(obj[clave])).length
}
contarVerdaderos([{ ok: true }, { ok: false }], "ok") // 1

// 26) saca la columna de la clave y la convierte a texto (string[]).
//       textos([{ n: 1 }, { n: 2 }], "n") → ["1", "2"]
export function textos<T>(arr: T[], clave: keyof T): string[] {
  return arr.map((obj) => String(obj[clave]))
}
textos([{ n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }], "n") // ["1", "2", "3", "4"];

/* ----------------------------------------------------------------------------
 * BLOQUE F — REFUERZO de keyof + T[K] + pluck (10 drills, simple → complejo)
 * ----------------------------------------------------------------------------
 * Misma lógica que los drills 20 y 21, repetida con variaciones para que se
 * vuelva automática. En TODOS el patrón es el mismo:
 *   - `<T, K extends keyof T>`  → K es una llave REAL de T (el portero).
 *   - `T[K]`                    → el tipo que vive en esa llave.
 *   - sobre arrays, `T[K][]`    → un array de esos valores (con map).
 *
 * Cada función arranca con un starter "flojo" (`<T, K>` sin portero, retorno
 * `unknown`...) que deja typecheck ROJO. Tu trabajo: apretar la FIRMA sin tocar
 * el cuerpo. ❌ nada de `any` ni `as`.
 * -------------------------------------------------------------------------- */


/* ── Getters sobre UN objeto (T[K]) ────────────────────────────────────── */

// 27) El getter base (idéntico a `propiedad`, para arrancar en caliente):
//     devuelve el valor de `clave` conservando su tipo exacto.
//     👉 Pon el portero `K extends keyof T` y el retorno `T[K]`.
//       valorDe({ nombre: "Ana", edad: 30 }, "edad") → 30 (number)
export function valorDe<T, K extends keyof T>(obj: T, clave: K): T[K] {
  return obj[clave]
}
valorDe({ nombre: "Ana", edad: 30 }, "edad") // 30 (number)

// 28) Compara el valor de `clave` con un `valor` que TÚ pasas. Lo interesante:
//     `valor` debe ser del MISMO tipo que esa propiedad, no cualquier cosa.
//     👉 Portero `K extends keyof T`; tipa `valor` como `T[K]`. El retorno ya es boolean.
//       igualA({ edad: 30 }, "edad", 30) → true ; igualA(..., "edad", "x") → ❌ tipo
export function igualA<T, K extends keyof T>(obj: T, clave: K, valor: T[K]): boolean {
  return obj[clave] === valor
}
igualA({ edad: 30 }, "edad", 30) // true

// 29) Compara la MISMA clave entre DOS objetos del mismo tipo.
//     👉 Solo falta el portero; el cuerpo ya compara a[clave] con b[clave].
//       mismaPropiedad({ id: 1 }, { id: 1 }, "id") → true
export function mismaPropiedad<T, K>(a: T, b: T, clave: K): boolean {
  return a[clave] === b[clave]
}


/* ── "Pluck": sacar una columna de un array (T[K][]) ───────────────────── */

// 30) El pluck base (idéntico a `extraer`): el valor de `clave` en cada objeto.
//     👉 Portero + retorno `T[K][]`.
//       columna([{ precio: 100 }, { precio: 200 }], "precio") → [100, 200] (number[])
export function columna<T, K>(arr: T[], clave: K): unknown[] {
  return arr.map((obj) => obj[clave])
}

// 31) Cuenta cuántos objetos tienen un valor "verdadero" en esa clave (filter).
//     Aquí el retorno es `number`, NO `T[K][]`: el tipo de salida lo decide lo
//     que la función devuelve, no la clave.
//     👉 Solo falta el portero.
//       cuantosConValor([{ activo: true }, { activo: false }], "activo") → 1
export function cuantosConValor<T, K>(arr: T[], clave: K): number {
  return arr.filter((obj) => Boolean(obj[clave])).length
}

// 32) Saca la columna y la convierte a texto con String(). El retorno es
//     `string[]` aunque la propiedad sea number: de nuevo, manda el callback.
//     👉 Solo falta el portero (el retorno ya es string[]).
//       etiquetar([{ precio: 100 }, { precio: 200 }], "precio") → ["100", "200"]
export function etiquetar<T, K>(arr: T[], clave: K): string[] {
  return arr.map((obj) => String(obj[clave]))
}

// 33) Devuelve el PRIMER valor de la columna, o undefined si el array está vacío.
//     Recuerda (ej. 11): leer `arr[0]` con noUncheckedIndexedAccess da `T[K] | undefined`.
//     👉 Portero + retorno `T[K] | undefined`.
//       primerValor([{ n: "Ana" }, { n: "Lu" }], "n") → "Ana" ; primerValor([], "n") → undefined
export function primerValor<T, K>(arr: T[], clave: K): unknown {
  return arr.map((obj) => obj[clave])[0]
}

// 34) Saca la columna y elimina duplicados con un Set.
//     👉 Portero + retorno `T[K][]`.
//       valoresUnicos([{ t: "a" }, { t: "b" }, { t: "a" }], "t") → ["a", "b"]
export function valoresUnicos<T, K>(arr: T[], clave: K): unknown[] {
  return [...new Set(arr.map((obj) => obj[clave]))]
}


/* ── Combinaciones (más complejas) ─────────────────────────────────────── */

// 35) DOS claves a la vez sobre un objeto: devuelve sus dos valores como tupla.
//     Necesitas DOS etiquetas de clave, cada una con su propio portero.
//     👉 `<T, K1 extends keyof T, K2 extends keyof T>`; retorno `[T[K1], T[K2]]`.
//       dosValores({ nombre: "Ana", edad: 30 }, "nombre", "edad") → ["Ana", 30]
export function dosValores<T, K1, K2>(obj: T, k1: K1, k2: K2): unknown {
  return [obj[k1], obj[k2]]
}

// 36) CAPSTONE: busca en el array el primer objeto cuya `clave` valga `valor`
//     (como buscar un usuario por id). Junta TODO: portero, `T[K]` en el
//     parámetro `valor`, y `find`, que devuelve el objeto completo `T` o undefined.
//     👉 Portero `K extends keyof T`; `valor: T[K]`; retorno `T | undefined`.
//       buscarPor([{ id: 1 }, { id: 2 }], "id", 2) → { id: 2 }
export function buscarPor<T, K>(arr: T[], clave: K, valor: unknown): unknown {
  return arr.find((obj) => obj[clave] === valor)
}
