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
procesar(null) // sin respuesta
procesar({ ok: "listo" }) // OK: listo
procesar({ error: "boom" }) // ERR: boom

/* =============================================================================
 * BLOQUE E — el `null` en la vida real: el borde de una API (escalera)
 * =============================================================================
 *
 * Hasta aquí el `null` venía "de juguete". En tus proyectos reales el `null`
 * NACE en el borde de una API: cuando haces `fetch(...).then(r => r.json())`,
 * TS no sabe qué llega — entra como `any` y deja de protegerte. Por eso el crash
 * de `null` casi siempre aparece justo después de leer datos de tu backend.
 *
 * La defensa profesional es DOBLE:
 *   1) TIPAR la respuesta (`Proyecto | null`, no `any`) → TS te OBLIGA a tratar el null.
 *   2) Descartar el null POR VALOR antes de tocar propiedades (lo del bloque A/B).
 *
 *
 * ▸ DOS HERRAMIENTAS NUEVAS — `?.` (optional chaining) y `??` (nullish coalescing)
 * ----------------------------------------------------------------------------
 * Son el atajo idiomático para "si esto es null/undefined, no sigas / usa un
 * respaldo". No reemplazan al narrowing, lo COMPLEMENTAN.
 *
 *   `obj?.prop`   → si `obj` es null o undefined, NO accede y devuelve `undefined`
 *                   (en vez de reventar). Si no, devuelve `obj.prop`.
 *
 *       sesion.usuario?.nombre
 *       // si usuario es null → undefined (no crash)
 *       // si usuario existe  → el nombre
 *
 *   `a ?? b`      → si `a` es null o undefined, usa `b`; si no, usa `a`.
 *                   (OJO: solo null/undefined disparan el respaldo. El 0 y el ""
 *                    NO — para eso `??` es mejor que `||`, que también caería con 0.)
 *
 *       const nombre = sesion.usuario?.nombre ?? "invitado"
 *       // junta las dos: "dame el nombre, y si no hay nadie, 'invitado'"
 *
 * 🔑 ANALOGÍA: `?.` es preguntar "¿estás ahí?" antes de tocar la puerta, en vez
 * de tirarla abajo. `??` es el plan B por si la respuesta fue "no hay nadie".
 *
 *
 * ▸ EJERCICIO — drills en escalera. EN ORDEN. ❌ nada de `any` ni `as`.
 *    Cada función tiene `throw new Error("TODO ...")`: bórralo y complétala.
 *    E1–E3: narrowing por valor (lo que ya sabes, ahora con datos de API).
 *    E4–E6: introduce `?.` y `??` y los combina.
 * ===========================================================================*/


/* ── Proyecto 1: PORTFOLIO (info personal + proyectos web) ──────────────────── */

// Un proyecto de tu portfolio. `repoUrl` puede venir null (proyecto privado).
type Proyecto = { nombre: string; repoUrl: string | null }

// E1) La API puede devolver `null` cuando el proyecto NO existe (GET /proyectos/999).
//     Devuelve el nombre, o "Proyecto no encontrado" si es null.
//     Descarta el null POR VALOR primero (no con typeof).
//       tituloProyecto({ nombre: "Projex", repoUrl: null }) → "Projex"
//       tituloProyecto(null)                                 → "Proyecto no encontrado"
export function tituloProyecto(p: Proyecto | null): string {
  if (p === null) {
    return "Proyecto no encontrado"
  }
  return p.nombre
}

// E2) Aquí el proyecto SÍ existe, pero el campo `repoUrl` puede ser null.
//     Devuelve la URL del repo, o "Sin repositorio" si es null.
//       enlaceRepo({ nombre: "Projex", repoUrl: "github.com/x" }) → "github.com/x"
//       enlaceRepo({ nombre: "Privado", repoUrl: null })          → "Sin repositorio"
export function enlaceRepo(p: Proyecto): string {
  if (p.repoUrl === null) {
    return "Sin repositorio"
  }
  return p.repoUrl
}

/* ── Proyecto 2: E-COMMERCE junior ─────────────────────────────────────────── */

// Un producto. `descuento` es null en la mayoría (no todos tienen oferta).
type Producto = { nombre: string; precio: number; descuento: { porcentaje: number } | null }

// E3) Devuelve el PRECIO FINAL. Si hay descuento, aplícalo; si es null, el precio
//     tal cual. Descarta el null del descuento antes de leer `.porcentaje`.
//     final = precio * (1 - porcentaje / 100)
//       precioFinal({ nombre: "X", precio: 100, descuento: { porcentaje: 20 } }) → 80
//       precioFinal({ nombre: "Y", precio: 100, descuento: null })               → 100
export function precioFinal(p: Producto): number {
  const descuento = p.descuento?.porcentaje ?? 0 // si p.descuento es null, descuento será 0
  return p.precio * (1 - descuento / 100)
}

// E4) Sesión del usuario. `usuario` es null si nadie inició sesión.
//     Devuelve el nombre, o "invitado". Aquí SÍ usa `?.` + `??` (una sola línea).
//       saludoSesion({ usuario: { nombre: "Nico" } }) → "Nico"
//       saludoSesion({ usuario: null })                → "invitado"
type Sesion = { usuario: { nombre: string } | null }
export function saludoSesion(s: Sesion): string {
  const nombre = s.usuario?.nombre ?? "invitado"
  return nombre
}

// E5) El carrito completo puede venir null (sesión nueva sin carrito creado).
//     Devuelve CUÁNTOS items hay. Si el carrito es null → 0. Usa `?.` + `??`.
//       cantidadItems({ items: [{ precio: 10 }, { precio: 5 }] }) → 2
//       cantidadItems(null)                                       → 0
type Carrito = { items: { precio: number }[] }
export function cantidadItems(c: Carrito | null): number {
  const items = c?.items ?? []
  return items.length
}
cantidadItems({ items: [{ precio: 10 }, { precio: 5 }] }) // 2
cantidadItems(null) // 0

// E6) CAPSTONE — junta todo el bloque. El producto puede ser null (no encontrado),
//     y si existe puede o no tener descuento. Devuelve la etiqueta de precio:
//       - producto null            → "No disponible"
//       - sin descuento            → "$<precio>"        (precio con 2 decimales)
//       - con descuento            → "$<precioFinal>"   (ya rebajado, 2 decimales)
//     Descarta el null del producto PRIMERO, luego el del descuento. Puedes
//     reutilizar precioFinal si quieres (DRY), pero ojo: solo si p no es null.
//       etiquetaPrecio(null)                                                   → "No disponible"
//       etiquetaPrecio({ nombre: "X", precio: 100, descuento: null })          → "$100.00"
//       etiquetaPrecio({ nombre: "Y", precio: 100, descuento: { porcentaje: 25 } }) → "$75.00"
export function etiquetaPrecio(p: Producto | null): string {
  if (p === null) {
    return "No disponible"
  }
  const precio = precioFinal(p) // Se llama a una función que ya maneja el caso del descuento null, así que no hace falta chequearlo aquí
  return `$${precio.toFixed(2)}`
}
etiquetaPrecio(null) // "No disponible"
etiquetaPrecio({ nombre: "X", precio: 100, descuento: null }) // "$100.00"
etiquetaPrecio({ nombre: "Y", precio: 100, descuento: { porcentaje: 25 } }) // "$75.00"

/* =============================================================================
 * BLOQUE F — sintaxis fina de `?.` y `??` (escalera de mecánica)
 * =============================================================================
 *
 * Ya usaste `obj?.prop` y `a ?? b`. El `?.` tiene TRES formas según qué venga
 * después, y todas siguen la misma regla: "si lo de la IZQUIERDA del `?.` es
 * null/undefined, corta y devuelve undefined; si no, sigue".
 *
 *
 * ▸ FORMA 1 — propiedad:  `obj?.prop`        (ya la conoces)
 *     usuario?.nombre
 *
 * ▸ FORMA 2 — índice:     `obj?.[i]`         (acceso por índice/clave dinámica)
 *     Cuando lo que puede ser null es el ARRAY/objeto que vas a indexar:
 *       fotos?.[0]          // si fotos es null → undefined, si no → fotos[0]
 *     OJO la sintaxis: el punto va ANTES del corchete → `?.[` , no `?[`.
 *
 * ▸ FORMA 3 — llamada:    `fn?.()`           (llamada opcional)
 *     Cuando la función misma puede ser null/undefined:
 *       onClick?.()         // si onClick existe → la llama; si no → undefined
 *
 *
 * ▸ ENCADENAR — varios `?.` seguidos
 * ----------------------------------------------------------------------------
 * Cada `?.` protege UN salto. Si hay varios eslabones que pueden ser null,
 * pones un `?.` en cada salto peligroso. En cuanto uno corta, todo el resto
 * se salta y el resultado es `undefined`:
 *
 *   pedido.cliente?.direccion?.ciudad
 *   // si cliente es null → undefined (no llega ni a mirar direccion)
 *   // si direccion es null → undefined
 *   // si todo existe → la ciudad
 *
 *
 * ▸ RECORDATORIO — `??` reacciona SOLO a null/undefined (no al 0 ni al "")
 * ----------------------------------------------------------------------------
 *   0  ?? 99   // → 0    (0 NO es null/undefined, se respeta)
 *   0  || 99   // → 99   (0 es falsy → ❌ lo pisa: bug típico con precios/stock)
 *
 *
 * ▸ EJERCICIO — drills en escalera. EN ORDEN. ❌ nada de `any` ni `as`.
 *    Borra el `throw` de cada función y complétala. Apóyate en las 3 formas.
 * ===========================================================================*/


// F1) ENCADENAR `?.` dos niveles. `cliente` puede ser null, y su `direccion`
//     también. Devuelve la ciudad de envío, o "sin ciudad" si falta algún eslabón.
//       ciudadEnvio({ cliente: { direccion: { ciudad: "Lima" } } }) → "Lima"
//       ciudadEnvio({ cliente: { direccion: null } })               → "sin ciudad"
//       ciudadEnvio({ cliente: null })                              → "sin ciudad"
type Pedido = { cliente: { direccion: { ciudad: string } | null } | null }
export function ciudadEnvio(p: Pedido): string {
  const ciudad = p.cliente?.direccion?.ciudad ?? "sin ciudad"
  return ciudad
}

// F2) LA TRAMPA DEL 0. `stock` puede ser un número (incluido 0) o null. Devuelve
//     el stock tal cual, o -1 si es null. OJO: un producto con stock 0 está
//     agotado pero EXISTE → debe devolver 0, no -1. (Pista: ¿`??` o `||`?)
//       stockMostrado({ stock: 7 })    → 7
//       stockMostrado({ stock: 0 })    → 0    ← ¡no -1!
//       stockMostrado({ stock: null }) → -1
type Inventario = { stock: number | null }
export function stockMostrado(i: Inventario): number {
  const stock = i.stock ?? -1
  return stock
}
stockMostrado({ stock: 7 })    // 7 En un proyecto real puede ser mostrado con  estilos para resaltar que hay pocas unidades
stockMostrado({ stock: 0 })    // 0 En un proyecto real puede ser mostrado como "Agotado"
stockMostrado({ stock: null }) // -1 En un proyecto real puede ser mostrado como "No disponible" o algo así, para diferenciarlo del "Agotado"

// F3) FORMA `?.[]`. `fotos` puede ser null (producto sin imágenes). Devuelve la
//     primera foto (índice 0), o "placeholder.webp" si no hay galería o está vacía.
//     Necesitas indexar un array que puede ser null → sintaxis `fotos?.[0]`.
//       portada({ fotos: ["a.png", "b.png"] }) → "a.png"
//       portada({ fotos: [] })                 → "placeholder.webp"
//       portada({ fotos: null })               → "placeholder.webp"
type Galeria = { fotos: string[] | null }
export function portada(g: Galeria): string {
  const foto = g.fotos?.[0] ?? "placeholder.webp"
  return foto
}

// F4) FORMA `?.()`. `onClick` es un callback que puede ser null (botón deshabilitado).
//     Si existe, llámalo y devuelve lo que retorne; si es null, devuelve "sin acción".
//       activar({ onClick: () => "guardado" }) → "guardado"
//       activar({ onClick: null })             → "sin acción"
type Boton = { onClick: (() => string) | null }
export function activar(b: Boton): string {
  const accion = b.onClick?.() ?? "sin acción"
  return accion
}

// F5) ENCADENAR + ÍNDICE. `carrito` puede ser null; si existe, su `items` puede
//     estar vacío. Devuelve el nombre del PRIMER item, o "vacío" si no hay carrito
//     o no hay items. (Encadena `?.` con el acceso por índice.)
//       primerProducto({ carrito: { items: [{ nombre: "Té" }] } }) → "Té"
//       primerProducto({ carrito: { items: [] } })                 → "vacío"
//       primerProducto({ carrito: null })                          → "vacío"
type Cuenta2 = { carrito: { items: { nombre: string }[] } | null }
export function primerProducto(u: Cuenta2): string {
  return u.carrito?.items[0]?.nombre ?? "vacío"
}

// F6) CAPSTONE — junta las tres formas. La config puede tener `tema` null y un
//     `obtenerDescuento` que puede ser null. Devuelve "<color> / <desc>%":
//       - color: el del tema, o "default" si no hay tema.
//       - desc:  lo que devuelva obtenerDescuento(), o 0 si no hay función.
//                (CUIDADO: un descuento de 0% es válido → no lo pises.)
//       resumenConfig({ tema: { color: "rojo" }, obtenerDescuento: () => 15 }) → "rojo / 15%"
//       resumenConfig({ tema: null, obtenerDescuento: () => 0 })               → "default / 0%"
//       resumenConfig({ tema: { color: "azul" }, obtenerDescuento: null })     → "azul / 0%"
type Configuracion = {
  tema: { color: string } | null
  obtenerDescuento: (() => number) | null
}
export function resumenConfig(c: Configuracion): string {
  const color = c.tema?.color ?? "default"
  const descuento = c.obtenerDescuento?.() ?? 0
  return `${color} / ${descuento}%`
}
resumenConfig({ tema: { color: "rojo" }, obtenerDescuento: () => 15 }) // "rojo / 15%"
resumenConfig({ tema: null, obtenerDescuento: () => 0 })               // "default / 0%"
resumenConfig({ tema: { color: "azul" }, obtenerDescuento: null })     // "azul / 0%"
