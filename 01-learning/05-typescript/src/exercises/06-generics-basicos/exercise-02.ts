/* =============================================================================
 * EJERCICIO 02 — constraints (extends) y keyof, con nombres descriptivos · bloque 06
 *
 * 🎯 OBJETIVOS
 * · Exigir con extends una forma mínima a un genérico para poder usarla dentro.
 * · Leer una propiedad sin perder su tipo con Llave extends keyof Objeto.
 * · Sacar columnas de un array con el pluck, Objeto[Llave][].
 *
 * 🟢 CONTEXTO — un <Objeto> pelado acepta cualquier cosa, y justo por eso dentro no
 * puedes asumir nada. Este archivo enseña a ponerle normas de entrada (extends) y a
 * leer propiedades por su nombre (keyof). Y llama a los genéricos con nombres que
 * se leen, en vez de letras.
 *
 * 🗺️ MAPA
 * TEORÍA 1 · nombres de genéricos y constraints (extends) → bloques A, B y refuerzo
 * BLOQUE A · extends para exigir una forma mínima → drills 1–2
 * BLOQUE B · extends para exigir una propiedad concreta → drill 3
 * REFUERZO · 10 drills solo de extends → drills 4–13
 * TEORÍA 2 · keyof y el acceso indexado → bloques C a F
 * BLOQUE C · keyof en escalera, hasta el getter → drills 14–20
 * BLOQUE D · keyof + genéricos + map → drill 21
 * BLOQUE E · keyof con un solo genérico → drills 22–26
 * BLOQUE F · refuerzo de keyof, Objeto[Llave] y pluck → drills 27–36
 *
 * ▸ 36 drills en escalera, en orden. Prohibidos any y as X. Sin bucles for: en el
 * bloque D, map.
 * pnpm test:run src/exercises/06-generics-basicos/exercise-02.test.ts
 * pnpm typecheck
 *
 * En cada drill el cuerpo ya está, pero la firma está floja (le falta el portero,
 * devuelve unknown o tipa una clave como string) y el archivo no pasa pnpm
 * typecheck. Arregla la firma sin tocar el cuerpo, con nombres descriptivos.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — nombres de genéricos y constraints (extends)
 *
 * DEFINICIÓN
 * Un genérico es un hueco con nombre, y el nombre lo eliges tú: igual que una
 * variable no tiene por qué llamarse x, un genérico no tiene por qué llamarse T. Un
 * constraint, <Objeto extends …>, es una norma de entrada: acepta cualquier tipo,
 * siempre que cumpla un mínimo. A cambio de esa garantía en la puerta, dentro ya
 * puedes usar lo garantizado sin miedo. Sigues siendo genérico, con un mínimo.
 *
 * SINTAXIS
 * function medirLargo<Item extends { length: number }>(x: Item): number {
 *   return x.length // ✅ ahora TS sabe que existe
 * }
 *
 * Ejemplos:
 * medirLargo("hola")    → 4: string tiene length
 * medirLargo([1, 2, 3]) → 3: array tiene length
 * medirLargo(42)        → ❌ number no tiene length: rechazado en la puerta
 *
 * 🗣️ LAS PIEZAS — los nombres de este archivo:
 * Objeto → el hueco para «la forma del objeto»
 * Llave  → el hueco para «el nombre de una propiedad de ese objeto»
 * Item   → el hueco para «una cosa cualquiera con cierta forma»
 *
 * 🧠 ANALOGÍA — el portero con una norma de entrada: «puedes entrar con cualquier
 * ropa, pero tienes que llevar zapatos».
 *
 * ⚠️ TRAMPA — sin portero, dentro no puedes asumir nada: si escribes x.length, TS
 * te frena con «Property 'length' does not exist», porque Objeto podría ser un
 * number, y los números no tienen .length.
 *
 * 💡 La convención profesional es usar letras: T (Type), K (Key), V (Value), E
 * (Element). Las verás siempre así en librerías y documentación. Mientras aprendes,
 * escribe nombres descriptivos, pero entrena el ojo para leer que T es «el objeto»
 * y K, «la llave»: el mismo concepto con apodo corto.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE A — extends para exigir una forma (shape) mínima */

/* 1) medirLargo devuelve el .length de lo que reciba. Para poder leer
 * .length, el genérico debe tener garantizado un length: number.
 * 👉 Añade el portero a <Item> (extends { length: number }).
 *   medirLargo("hola") → 4 ; medirLargo([1, 2, 3]) → 3
 */
export function medirLargo<Item extends { length: number }>(x: Item): number {
  return x.length;
}
medirLargo("hola"); // 4   (string tiene length)
medirLargo([1, 2, 3]); // 3   (array tiene length)
// medirLargo(42)        // ❌ number no tiene length → rechazado en la puerta

/* 2) tieneContenido dice si algo con longitud está vacío o no.
 * Mismo portero que el drill 1.
 *   tieneContenido("") → false ; tieneContenido([1]) → true
 */
export function tieneContenido<Item extends { length: number }>(x: Item): boolean {
  return x.length > 0;
}
tieneContenido("Hola buenas tardes"); // true porque no es vacío
tieneContenido([1, 2, 3]); // true porque no es vacío
tieneContenido([]); // false porque es vacío

/* ▸ BLOQUE B — extends para exigir una propiedad concreta */

/* 3) obtenerId lee la propiedad id de cualquier objeto que la tenga.
 * Devuelve el id, pero necesita garantizar que id: number existe.
 * 👉 Restringe el genérico a "cualquier objeto que tenga id: number".
 *   obtenerId({ id: 7, name: "a" }) → 7
 */
export function obtenerId<Item extends { id: number }>(x: Item): number {
  return x.id;
}
obtenerId({ id: 7, name: "Nico", edad: 23, activo: true, rol: "admin" }); // 7
// obtenerId({ name: "Nico" }) // ❌ no tiene id → rechazado en la puerta | Error durante compilación

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE REFUERZO — 10 drills solo de extends (antes de tocar keyof)
 *
 * En todos el gatillo es el mismo: el cuerpo toca una propiedad o un método de x,
 * así que <Item> pelado falla, y debes exigir esa forma con extends. Lee extends
 * como «es un» o «cumple como mínimo». Se sube en escalera: una propiedad →
 * varias → métodos → tipo con nombre.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) lee una propiedad string y la devuelve en mayúsculas.
 * nombreEnMayus({ nombre: "ana" }) → "ana"
 */
export function nombreEnMayus<Item extends { nombre: string }>(x: Item): string {
  return x.nombre.toUpperCase();
}
nombreEnMayus({ nombre: "ana" }); // "ANA"
nombreEnMayus({ nombre: "nico" }); // "NICO"

/* 5) lee una propiedad number y calcula sobre ella.
 * precioConIva({ precio: 100 }) → 119
 */
export function precioConIva<Item extends { precio: number }>(x: Item): number {
  // Calculadora de IVA: precio + 19% del precio
  return x.precio * 1.19;
}
precioConIva({ precio: 1000000 }); // Bicicleta Trek: 1.000.000 → 1.190.000
precioConIva({ precio: 1000 }); // Coca Cola: 1.000 → 1.190

/* 6) lee una propiedad number y devuelve un boolean.
 * esMayorDeEdad({ edad: 20 }) → true ; esMayorDeEdad({ edad: 17 }) → false
 */
export function esMayorDeEdad<Item extends { edad: number }>(x: Item): boolean {
  return x.edad >= 18;
}

/* 7) lee dos propiedades number (portero con dos campos).
 * areaRect({ ancho: 3, alto: 4 }) → 12
 */
export function areaRect<Item extends { ancho: number; alto: number }>(x: Item): number {
  return x.ancho * x.alto;
}
areaRect({ ancho: 3, alto: 4 }); // 12

/* 8) ahora no es una propiedad, es un método. El portero también describe
 * métodos: { saludar(): string }.
 *  presentar({ saludar: () => "hola" }) → "hola"
 */
export function presentar<Item extends { saludar(): string }>(x: Item): string {
  return x.saludar();
}
presentar({ saludar: () => "hola" }); // "hola"

/* 9) Dos propiedades de tipos distintos (number y string).
 * codigo({ id: 7, tipo: "user" }) → "user-7"
 */
export function codigo<Item extends { tipo: string; id: number }>(x: Item): string {
  return `${x.tipo}-${x.id}`;
}
codigo({ id: 7, tipo: "user" }); // "user-7"

/* 10) reutiliza un tipo con nombre como portero. El alias Identificable ya
 * está definido abajo; restringe el genérico a él (es idéntico a escribir la
 * forma a mano, pero con nombre y reutilizable en varias funciones).
 *  borrarPorId({ id: 9, name: "x" }) → 9
 */
type Identificable = { id: number };
export function borrarPorId<Item extends Identificable>(x: Item): number {
  return x.id;
}
borrarPorId({ id: 9, name: "x" }); // 9

export function editarPorId<Item extends Identificable>(x: Item): number {
  return x.id;
}

export function clonarConId<Item extends Identificable>(x: Item): number {
  return x.id;
}

/* 11) Una propiedad number, otro cálculo booleano.
 * hayStock({ stock: 3 }) → true ; hayStock({ stock: 0 }) → false
 */
export function hayStock<Item extends { stock: number }>(x: Item): boolean {
  return x.stock > 0;
}
hayStock({ stock: 3 }); // true
hayStock({ stock: 0 }); // false

/* 12) Dos propiedades string, combínalas.
 * nombreCompleto({ nombre: "Ana", apellido: "Paz" }) → "Ana Paz"
 */
export function nombreCompleto<Item extends { nombre: string; apellido: string }>(x: Item): string {
  return `${x.nombre} ${x.apellido}`;
}
nombreCompleto({ nombre: "Nicolás", apellido: "Villagrán" });
nombreCompleto({ nombre: "Matías", apellido: "Larraín" });

/* 13) mezcla final: string + number en el mismo portero.
 * resumen({ titulo: "Intro", minutos: 5 }) → "Intro (5 min)"
 */
export function resumen<Item extends { titulo: string; minutos: number }>(x: Item): string {
  return `${x.titulo} (${x.minutos} min)`;
}
resumen({ titulo: "Intro a TypeScript", minutos: 5 }); // "Intro a TypeScript (5 min)"

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — keyof y el acceso indexado Objeto[Llave]
 *
 * DEFINICIÓN
 * keyof Tipo es la lista de etiquetas reales de un tipo, y Tipo["llave"] es el
 * tipo de lo guardado en esa etiqueta. Juntos son el patrón profesional para leer
 * una propiedad sin perder el tipo.
 *
 * Ejemplos, con type Persona = { nombre: string; edad: number }:
 * keyof Persona   → "nombre" | "edad"
 * Persona["edad"] → number
 *
 * SINTAXIS
 * function propiedad<Objeto, Llave extends keyof Objeto>(
 *   obj: Objeto, llave: Llave
 * ): Objeto[Llave] {
 *   return obj[llave]
 * }
 *
 * Ejemplos:
 * propiedad({ name: "Ana", age: 30 }, "name") → string
 * propiedad({ name: "Ana", age: 30 }, "age")  → number
 * propiedad({ name: "Ana" }, "edad")          → ❌ "edad" no está en el menú
 *
 * 🧠 ANALOGÍA — el vestuario: un objeto es un vestuario lleno de casilleros, cada
 * uno con una etiqueta por fuera (la llave) y algo guardado dentro (el valor).
 * keyof lista las etiquetas; Persona["edad"] dice qué hay en un casillero.
 *
 * ⚠️ TRAMPA — keyof Persona no es string (cualquier texto): es un menú cerrado.
 * "patata" no está en el menú, y se rechaza.
 *
 * 💡 Llave extends keyof Objeto es el portero otra vez: «la llave que pidas tiene
 * que ser una etiqueta real de este objeto».
 * ───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE C — keyof, en escalera (de «un texto es un tipo» hasta el getter)
 *
 * La idea que cuesta: en TS un texto exacto ("rojo") puede ser un tipo, no solo
 * string. Y keyof no es magia nueva: solo fabrica la lista de esos textos a partir
 * de las etiquetas de un objeto. Se sube peldaño a peldaño.
 *
 * En cada drill hay un starter flojo (string, unknown…) que sí compila, pero está
 * mal: el test lo caza, y typecheck queda rojo hasta que lo aprietas. Prohibidos
 * any y as.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ Un texto exacto es un tipo (literales y uniones). Aún sin keyof. */

/* 14) fijarTono debe aceptar exclusivamente el texto "claro". Si tipas tono
 * como string, aceptaría "oscuro", "rojo", lo que sea → mal.
 * 👉 Cambia el tipo de tono por el literal exacto: "claro".
 *   fijarTono("claro") → "tema claro" ; fijarTono("oscuro") → ❌ error
 */
export function fijarTono(tono: "claro"): string {
  return `tema ${tono}`;
}
fijarTono("claro"); // "tema claro"
// fijarTono("oscuro") // ❌ error (cuando lo aprietes)

/* 15) definirEstado acepta solo uno de tres textos. Ni más, ni menos.
 * 👉 Tipa estado como la unión de literales: "activo" | "inactivo" | "pendiente".
 *   definirEstado("activo") → ok ; definirEstado("borrado") → ❌ error
 */
export function definirEstado(estado: "activo" | "inactivo" | "pendiente"): string {
  return `Estado: ${estado}`;
}
definirEstado("activo"); // ok
// definirEstado("borrado") // ❌ error (cuando lo aprietes)

/* ▸ keyof = la lista de nombres de las etiquetas (a nivel de tipo) */

type Libro = { titulo: string; paginas: number };
type Usuario = { id: number; nombre: string; activo: boolean };

/* 16) LlavesLibro debe ser la lista de etiquetas de Libro, o sea
 * "titulo" | "paginas". No la escribas a mano: hazlo con keyof.
 * 👉 Reemplaza string por keyof Libro.
 */
export type LlavesLibro = keyof Libro;

/* 17) Lo mismo para Usuario → "id" | "nombre" | "activo".
 * 👉 Usa keyof.
 */
export type LlavesUsuario = keyof Usuario;

/* ▸ Tipo["llave"] = el tipo que vive en esa etiqueta (acceso indexado) */

/* 18) ¿Qué tipo guarda la etiqueta "titulo" de Libro? (mira su definición arriba)
 * 👉 Reemplaza unknown por el acceso indexado: Libro["titulo"].
 */
export type TipoTitulo = Libro["titulo"];

/* 19) ¿Y qué tipo guarda la etiqueta "activo" de Usuario?
 * 👉 Acceso indexado de nuevo.
 */
export type TipoActivo = Usuario["activo"];

/* ▸ Juntar todo en una función genérica */

/* 20) propiedad lee obj[llave] conservando el tipo exacto de esa propiedad.
 * Dos huecos: Objeto y Llave. Con ambos pelados TS se queja ("Llave
 * cannot index Objeto") porque no sabe que Llave es una etiqueta real.
 * 👉 Pon el portero Llave extends keyof Objeto (drills 16–17) y tipa el
 *    retorno como Objeto[Llave] (drills 18–19). El cuerpo no cambia.
 *    propiedad({ name: "Ana", age: 30 }, "name") → "Ana" (string)
 *    propiedad({ name: "Ana", age: 30 }, "age")  → 30 (number)
 */
export function propiedad<Objeto, Llave extends keyof Objeto>(
  obj: Objeto,
  llave: Llave,
): Objeto[Llave] {
  return obj[llave];
}
propiedad({ name: "Ana", age: 30 }, "name"); // "Ana" (string)
propiedad({ name: "Ana", age: 30 }, "age"); // 30 (number)
// propiedad({ name: "Ana" }, "edad")          // ❌ "edad" no está en el menú

/* ▸ BLOQUE D — juntarlo todo: keyof + genéricos + map */

/* 21) extraer (un "pluck") toma un array de objetos y una llave, y devuelve un
 * array con solo el valor de esa llave en cada objeto. El tipo del array de
 * salida es el de esa propiedad: Objeto[Llave][].
 * 👉 Mismo dúo Objeto + Llave extends keyof Objeto; el retorno es Objeto[Llave][].
 *   extraer([{ id: 1 }, { id: 2 }], "id")              → [1, 2]      (number[])
 *   extraer([{ name: "Ana" }, { name: "Lu" }], "name") → ["Ana","Lu"] (string[])
 */
export function extraer<Objeto, Llave extends keyof Objeto>(
  arr: Objeto[],
  llave: Llave,
): Objeto[Llave][] {
  return arr.map((obj) => obj[llave]);
}
extraer([{ id: 1 }, { id: 2 }], "id"); // [1, 2] (number[])
extraer([{ name: "Ana" }, { name: "Lu" }], "name"); // ["Ana","Lu"] (string[])
// extraer([{ name: "Ana" }, { name: "Lu" }], "id") // ❌ "id" no esta en el menú
/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE E — keyof con un solo genérico (calentamiento: sin Llave ni Objeto[Llave])
 *
 * Antes de volver al dúo, se fija keyof Objeto a solas. Si tipas la clave como
 * keyof Objeto, le dices a TS «esta clave es una del menú de etiquetas de Objeto»,
 * y a cambio TS te deja hacer obj[clave] sin protestar.
 *
 * Aquí no se devuelve el valor con su tipo exacto (eso es Objeto[Llave], y vuelve
 * en el bloque F): se devuelve siempre un tipo concreto, boolean, string o number.
 * Un solo genérico, <Objeto>; nada de Llave todavía.
 *
 * Starter flojo: la clave está tipada como string, y obj[clave] falla (un string
 * cualquiera no garantiza ser una etiqueta de Objeto). Tu único cambio: apretar
 * clave: string → clave: keyof Objeto. Prohibidos any y as.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 22) ¿el valor de la clave es "verdadero"? Un solo genérico; la clave es keyof Objeto.
 * 👉 Cambia clave: string por clave: keyof Objeto. El retorno ya es boolean.
 *   existeValor({ nombre: "Ana", activo: true }, "activo") → true
 */
export function existeValor<Objeto>(obj: Objeto, clave: keyof Objeto): boolean {
  return Boolean(obj[clave]);
}
existeValor({ nombre: "Ana", activo: true }, "activo"); // true

/* 23) muestra el valor de la clave como texto. Mismo cambio en la firma.
 * mostrarValor({ edad: 30 }, "edad") → "30"
 */
export function mostrarValor<Objeto>(obj: Objeto, clave: keyof Objeto): string {
  return String(obj[clave]);
}
mostrarValor({ edad: 30, nombre: "Nico", activo: true }, "nombre"); // "Nico"

/* 24) compara la misma clave entre dos objetos del mismo tipo.
 * sonIguales({ id: 1 }, { id: 1 }, "id") → true
 */
export function sonIguales<Objeto>(a: Objeto, b: Objeto, clave: keyof Objeto): boolean {
  return a[clave] === b[clave];
}
sonIguales({ id: 1 }, { id: 1 }, "id"); // true
sonIguales({ id: 1 }, { id: 2 }, "id"); // false
sonIguales({ name: "Nico" }, { name: "Dani" }, "name"); // false
sonIguales({ name: "Nico" }, { name: "Nico" }, "name"); // true

/* 25) cuenta, en un array, cuántos objetos tienen valor "verdadero" en la clave.
 * contarVerdaderos([{ ok: true }, { ok: false }], "ok") → 1
 */
export function contarVerdaderos<Objeto>(arr: Objeto[], clave: keyof Objeto): number {
  return arr.filter((obj) => Boolean(obj[clave])).length;
}
contarVerdaderos([{ ok: true }, { ok: false }, { ok: true }, { ok: false }], "ok"); // 2
contarVerdaderos([{ ok: true }, { ok: false }, { ok: true }], "ok"); // 2

/* 26) saca la columna de la clave y la convierte a texto (string[]).
 * textos([{ n: 1 }, { n: 2 }], "n") → ["1", "2"]
 */
export function textos<Objeto>(arr: Objeto[], clave: keyof Objeto): string[] {
  return arr.map((obj) => String(obj[clave]));
}
textos([{ n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }], "n"); // ["1", "2", "3", "4"]

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE F — refuerzo de keyof + Objeto[Llave] + pluck (de simple a complejo)
 *
 * Misma lógica que los drills 20 y 21, repetida con variaciones para que se vuelva
 * automática. En todos, el patrón es el mismo:
 *
 * 🗣️ LAS PIEZAS
 * <Objeto, Llave extends keyof Objeto> → Llave es una etiqueta real (el portero)
 * Objeto[Llave]                        → el tipo que vive en esa etiqueta
 * Objeto[Llave][]                      → sobre arrays, un array de esos valores
 *
 * Cada función arranca floja (dúo sin portero, retorno unknown…) y el typecheck
 * queda rojo. Tu trabajo: apretar la firma sin tocar el cuerpo. Prohibidos any y as.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ Getters sobre un objeto (Objeto[Llave]) */

/* 27) El getter base (idéntico a propiedad, para arrancar en caliente):
 * devuelve el valor de clave conservando su tipo exacto.
 * 👉 Pon el portero Llave extends keyof Objeto y el retorno Objeto[Llave].
 *   valorDe({ nombre: "Ana", edad: 30 }, "edad") → 30 (number)
 */
export function valorDe<Objeto, Llave extends keyof Objeto>(
  obj: Objeto,
  clave: Llave,
): Objeto[Llave] {
  return obj[clave];
}
valorDe({ nombre: "Ana", edad: 30 }, "edad"); // 30 (number)

/* 28) Compara el valor de clave con un valor que tú pasas. Lo interesante:
 * valor debe ser del mismo tipo que esa propiedad, no cualquier cosa.
 * 👉 Portero Llave extends keyof Objeto; tipa valor como Objeto[Llave].
 *    El retorno ya es boolean.
 *   igualA({ edad: 30 }, "edad", 30) → true ; igualA(..., "edad", "x") → ❌ tipo
 */
export function igualA<Objeto, Llave extends keyof Objeto>(
  obj: Objeto,
  clave: Llave,
  valor: Objeto[Llave],
): boolean {
  return obj[clave] === valor;
}
igualA({ edad: 30, nombre: "Nico", activo: true }, "nombre", "Nico"); // true

/* 29) Compara la misma clave entre dos objetos del mismo tipo.
 * 👉 Solo falta el portero; el cuerpo ya compara a[clave] con b[clave].
 *   mismaPropiedad({ id: 1 }, { id: 1 }, "id") → true
 */
export function mismaPropiedad<Objeto, Llave extends keyof Objeto>(
  a: Objeto,
  b: Objeto,
  clave: Llave,
): boolean {
  return a[clave] === b[clave];
}
mismaPropiedad({ id: 1 }, { id: 1 }, "id"); // true
mismaPropiedad({ id: 1 }, { id: 2 }, "id"); // false
// mismaPropiedad({ id: 1 }, { id: 2 }, "name") // ❌ porque no tienen la misma clave | Error en compilación

/* ▸ «Pluck»: sacar una columna de un array (Objeto[Llave][]) */

/* 30) El pluck base (idéntico a extraer): el valor de clave en cada objeto.
 * 👉 Portero + retorno Objeto[Llave][].
 *   columna([{ precio: 100 }, { precio: 200 }], "precio") → [100, 200] (number[])
 */
export function columna<Objeto, Llave extends keyof Objeto>(
  arr: Objeto[],
  clave: Llave,
): Objeto[Llave][] {
  return arr.map((obj) => obj[clave]);
}
columna([{ precio: 100 }, { precio: 200 }], "precio"); // [100, 200]

/* 31) Cuenta cuántos objetos tienen un valor "verdadero" en esa clave (filter).
 * Aquí el retorno es number, no Objeto[Llave][]: el tipo de salida lo
 * decide lo que la función devuelve, no la clave.
 * 👉 Solo falta el portero.
 *   cuantosConValor([{ activo: true }, { activo: false }], "activo") → 1
 */
export function cuantosConValor<Objeto, Llave extends keyof Objeto>(
  arr: Objeto[],
  clave: Llave,
): number {
  return arr.filter((obj) => Boolean(obj[clave])).length;
}
cuantosConValor([{ activo: true }, { activo: false }], "activo"); // 1
cuantosConValor([{ activo: true }, { activo: false }, { activo: true }], "activo"); // 2
cuantosConValor(
  [{ activo: true }, { activo: false }, { activo: true }, { activo: true }],
  "activo",
); // 3

/* 32) Saca la columna y la convierte a texto con String(). El retorno es
 * string[] aunque la propiedad sea number: de nuevo, manda el callback.
 * 👉 Solo falta el portero (el retorno ya es string[]).
 *   etiquetar([{ precio: 100 }, { precio: 200 }], "precio") → ["100", "200"]
 */
export function etiquetar<Objeto, Llave extends keyof Objeto>(
  arr: Objeto[],
  clave: Llave,
): string[] {
  return arr.map((obj) => String(obj[clave]));
}
etiquetar([{ precio: 100 }, { precio: 200 }], "precio"); // ["100", "200"]

/* 33) Devuelve el primer valor de la columna, o undefined si el array está vacío.
 * Recuerda: leer arr[0] con noUncheckedIndexedAccess da Objeto[Llave] | undefined.
 * 👉 Portero + retorno Objeto[Llave] | undefined.
 *   primerValor([{ n: "Ana" }, { n: "Lu" }], "n") → "Ana" ; primerValor([], "n") → undefined
 */
export function primerValor<Objeto, Llave extends keyof Objeto>(
  arr: Objeto[],
  clave: Llave,
): Objeto[Llave] | undefined {
  return arr.map((obj) => obj[clave])[0];
}
primerValor([{ n: "Ana" }, { n: "Lu" }], "n"); // "Ana"
primerValor([{ n: "Nico" }, { n: "Lu" }, { n: "Lu" }], "n"); // "Nico"
primerValor([], "n"); // undefined No hay ninguno

/* 34) Saca la columna y elimina duplicados con un Set.
 * 👉 Portero + retorno Objeto[Llave][].
 *   valoresUnicos([{ t: "a" }, { t: "b" }, { t: "a" }], "t") → ["a", "b"]
 */
export function valoresUnicos<Objeto, Llave extends keyof Objeto>(
  arr: Objeto[],
  clave: Llave,
): Objeto[Llave][] {
  return [...new Set(arr.map((obj) => obj[clave]))];
}
valoresUnicos([{ t: "a" }, { t: "b" }, { t: "a" }, { t: "b" }, { t: "c" }], "t"); // ["a", "b", "c"]

/* ▸ Combinaciones (más complejas) */

/* 35) Dos claves a la vez sobre un objeto: devuelve sus dos valores como tupla.
 * Necesitas dos huecos de llave, cada uno con su propio portero.
 * 👉 <Objeto, Llave1 extends keyof Objeto, Llave2 extends keyof Objeto>;
 *    retorno [Objeto[Llave1], Objeto[Llave2]].
 *   dosValores({ nombre: "Ana", edad: 30 }, "nombre", "edad") → ["Ana", 30]
 */
export function dosValores<Objeto, Llave1 extends keyof Objeto, Llave2 extends keyof Objeto>(
  obj: Objeto,
  k1: Llave1,
  k2: Llave2,
): [Objeto[Llave1], Objeto[Llave2]] {
  return [obj[k1], obj[k2]];
}
dosValores({ nombre: "Nico", edad: 23, activo: true }, "nombre", "nombre"); // ["Nico", "Nico"]
dosValores({ nombre: "Nico", edad: 23, activo: true }, "edad", "activo"); // [23, true]

/* 36) Capstone: busca en el array el primer objeto cuya clave valga valor
 * (como buscar un usuario por id). Junta todo: portero, Objeto[Llave] en el
 * parámetro valor, y find, que devuelve el objeto completo o undefined.
 * 👉 Portero Llave extends keyof Objeto; valor: Objeto[Llave];
 *    retorno Objeto | undefined.
 *   buscarPor([{ id: 1 }, { id: 2 }], "id", 2) → { id: 2 }
 */
export function buscarPor<Objeto, Llave extends keyof Objeto>(
  arr: Objeto[],
  clave: Llave,
  valor: Objeto[Llave],
): Objeto | undefined {
  return arr.find((obj) => obj[clave] === valor);
}
buscarPor([{ id: 1 }, { id: 2 }], "id", 2); // { id: 2 }
buscarPor([{ id: 3 }], "id", 2); // undefined
