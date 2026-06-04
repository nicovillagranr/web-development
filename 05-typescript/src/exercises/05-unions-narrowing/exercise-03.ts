/* =============================================================================
 * EJERCICIO 03 — Refuerzo: narrowing con objetos y `null` (`typeof null`, `in`)
 * =============================================================================
 *
 * Surgió en el parcial (B3): hay tres formas de "estrechar" un tipo y no todas
 * sirven para lo mismo. En el 02 viste `typeof` para PRIMITIVOS. Aquí fijamos las
 * dos piezas que faltan: separar `null`, y distinguir objetos con el operador `in`.
 *
 *
 * ▸ RECORDATORIO — `typeof` solo distingue primitivos
 * ----------------------------------------------------------------------------
 *   typeof "hola"   // "string"
 *   typeof 42       // "number"
 *   typeof true     // "boolean"
 *   typeof { a: 1 } // "object"   ← cualquier objeto da "object"
 *
 *
 * ▸ LA TRAMPA — `typeof null` también es "object"
 * ----------------------------------------------------------------------------
 * Un bug histórico de JavaScript (lleva 30 años ahí):
 *
 *   typeof null     // "object"   😈  ¡igual que un objeto de verdad!
 *
 * Por eso `if (typeof x === "object")` NO sirve para descartar `null`: el `null`
 * se cuela por ese filtro, y al hacer `x.nombre` revienta (null no tiene props).
 *
 *   function nombre(x: { nombre: string } | null): string {
 *     if (typeof x === "object") {   // ❌ null TAMBIÉN entra aquí
 *       return x.nombre;             //    → 💥 en runtime si x era null
 *     }
 *     return "anónimo";
 *   }
 *
 * 🔑 ANALOGÍA: `typeof` es un portero que clasifica por categoría. Por el bug,
 * `null` lleva una credencial falsa que dice "object". El filtro "solo objetos"
 * deja entrar al impostor `null` igual.
 *
 * La forma CORRECTA de descartar `null` es por su valor, no por su `typeof`:
 *
 *   if (x !== null) { x.nombre }   // ✅ explícito
 *   if (x)         { x.nombre }    // ✅ truthiness (null y undefined son falsy)
 *
 *
 * ▸ EL OPERADOR `in` — distinguir objetos por sus propiedades
 * ----------------------------------------------------------------------------
 * Cuando tienes una unión de objetos SIN un campo "tag" común, los distingues
 * preguntando si tienen cierta propiedad:
 *
 *   type Contacto = { email: string } | { telefono: string };
 *   function avisar(c: Contacto): string {
 *     if ("email" in c) { return c.email; }   // ✅ aquí c es la variante con email
 *     return c.telefono;                       // ✅ aquí, la otra
 *   }
 *
 * `"email" in c` significa "¿el objeto c tiene la propiedad email?". TS lo usa
 * como type guard y estrecha igual que `typeof` lo hace con primitivos.
 *
 *
 * ▸ EJERCICIO — drills en escalera. EN ORDEN. ❌ nada de `any` ni `as`.
 *    A: separar null (truthiness)   B: la trampa typeof null   C: el operador `in`
 * ===========================================================================*/


/* ── BLOQUE A — descartar `null` con truthiness ────────────────────────────── */

// A1) Devuelve la longitud del texto, o 0 si es null. (Estrecha el null primero.)
//       largo("hola") → 4 ; largo(null) → 0
export function largo(x: string | null): number {
  if (x === null) {
    return 0
  }
  return x.length
}

// A2) Devuelve el doble del número, o 0 si es null.
//       doble(5) → 10 ; doble(null) → 0
export function doble(x: number | null): number {
  if (x === null) {
    return 0
  }
  return x * 2
}


/* ── BLOQUE B — la trampa de `typeof null` ─────────────────────────────────── */

// B1) Devuelve el nombre, o "anónimo" si es null. OJO: NO uses `typeof x ===
//     "object"` (dejaría pasar el null). Descártalo por valor (`!== null` o `if (x)`).
//       saludar({ nombre: "Ana" }) → "Ana" ; saludar(null) → "anónimo"
export function saludar(x: { nombre: string } | null): string {
  if (x === null) {
    return "anónimo"
  }
  return x.nombre
}

// B2) `x` puede ser un número, un texto, o null. Devuelve:
//     - si es number → el número como string con String(x)
//     - si es string → el texto en mayúsculas
//     - si es null   → "vacío"
//     Combina: typeof para los primitivos + un chequeo correcto para null.
//       describir(3) → "3" ; describir("hola") → "HOLA" ; describir(null) → "vacío"
export function describir(x: string | number | null): string {
  switch (typeof x) {
    case "number":
      return String(x)
    case "string":
      return x.toUpperCase()
    default: {
      return "vacío" // aquí caen null y cualquier otro tipo raro
    }
  }
}


/* ── BLOQUE C — el operador `in` ───────────────────────────────────────────── */

// C1) `Contacto` es una unión de objetos SIN tag común. Devuelve el email si la
//     variante lo tiene, o el teléfono si no. Distíngue con `in`.
//       contactar({ email: "a@b.c" }) → "a@b.c" ; contactar({ telefono: "123" }) → "123"
type Contacto = { email: string } | { telefono: string }
export function contactar(c: Contacto): string {
  if ("email" in c) {
    return c.email
  }
  return c.telefono
}

// C2) `Mascota` puede ladrar o maullar (campos distintos, sin tag). Devuelve el
//     sonido correcto. Distíngue con `in` la propiedad que solo una tiene.
//       sonido({ ladrido: "Guau" }) → "Guau" ; sonido({ maullido: "Miau" }) → "Miau"
type Mascota = { ladrido: string } | { maullido: string }
export function sonido(m: Mascota): string {
  if ("maullido" in m) {
    return m.maullido
  }
  return m.ladrido

}


/* ── BLOQUE D — más práctica con `in` (escalera) ───────────────────────────────
 *
 * C1/C2 fueron el caso base: dos variantes, devolver el campo que cada una tiene.
 * Aquí subimos un peldaño por drill: usar el valor estrechado, encadenar `in` con
 * 3 variantes, distinguir objetos que COMPARTEN un campo, y cerrar combinando
 * `null` + `in` (todo el ejercicio junto). EN ORDEN. ❌ nada de `any` ni `as`.
 * ===========================================================================*/

// D1) `Caja` es un cuadrado (un `lado`) o un rectángulo (`ancho` y `alto`).
//     Devuelve el ÁREA. No basta con devolver un campo: hay que operar con él.
//     Distíngue con `in` y luego haz la cuenta.
//       area({ lado: 3 }) → 9 ; area({ ancho: 2, alto: 5 }) → 10
type Caja = { lado: number } | { ancho: number; alto: number }
export function area(c: Caja): number {
  if ("lado" in c) {
    return c.lado * c.lado
  }
  return c.ancho * c.alto
}

// D2) `Notificacion` tiene TRES variantes sin tag común. Devuelve el contenido
//     del canal que sea. Encadena `in` (if / else if / else).
//       canal({ email: "a@b.c" }) → "a@b.c"
//       canal({ sms: "hola" })    → "hola"
//       canal({ push: "ping" })   → "ping"
type Notificacion = { email: string } | { sms: string } | { push: string }
export function canal(n: Notificacion): string {
  if ("email" in n) {
    return n.email
  }
  else if ("sms" in n) {
    return n.sms
  }
  else {
    return n.push
  }
}

// D3) Las dos variantes COMPARTEN el campo `nombre`, pero solo una tiene `rolAdmin`
//     y la otra `rolCliente`. Devuelve "nombre: rol". `in` distingue igual aunque
//     haya un campo en común (lo que importa es el campo que NO comparten).
//       quien({ nombre: "Ana", rolAdmin: "root" })      → "Ana: root"
//       quien({ nombre: "Leo", rolCliente: "premium" }) → "Leo: premium"
type Cuenta =
  | { nombre: string; rolAdmin: string }
  | { nombre: string; rolCliente: string }
export function quien(c: Cuenta): string {
  if ("rolAdmin" in c) {
    return `${c.nombre}: ${c.rolAdmin}`
  }
  return `${c.nombre}: ${c.rolCliente}`
}

// D4) CAPSTONE — junta todo el ejercicio: el valor puede ser `null` O una de dos
//     variantes de objeto. Descarta el `null` PRIMERO (bloque B), y solo después
//     usa `in` (bloque C). Devuelve:
//       - null            → "sin respuesta"
//       - { ok: ... }     → "OK: " + ese texto
//       - { error: ... }  → "ERR: " + ese texto
//       procesar(null)              → "sin respuesta"
//       procesar({ ok: "listo" })   → "OK: listo"
//       procesar({ error: "boom" }) → "ERR: boom"
type Respuesta = { ok: string } | { error: string } | null
export function procesar(r: Respuesta): string {
  if (r === null) {
    return "sin respuesta"
  }
  else if ("ok" in r) {
    return "OK: " + r.ok
  }
  else {
    return "ERR: " + r.error
  }
}
