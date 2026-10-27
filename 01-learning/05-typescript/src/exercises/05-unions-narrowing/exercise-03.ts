/* =============================================================================
 * EJERCICIO 03 — narrowing con objetos y null: typeof null, in, ?. y ?? · bloque 05
 *
 * 📌 RECORDATORIO — typeof solo distingue primitivos: typeof "hola" es "string",
 * typeof 42 "number" y typeof true "boolean"; cualquier objeto, typeof { a: 1 },
 * da "object".
 *
 * 🎯 OBJETIVOS
 * · Descartar null por su valor, nunca con typeof.
 * · Distinguir con in las variantes de una unión de objetos sin tag.
 * · Proteger accesos con ?. y poner respaldos con ??, por separado y juntos.
 *
 * 🟢 CONTEXTO — surgió en el parcial (B3): hay tres formas de estrechar un tipo, y
 * no todas sirven para lo mismo. En el 02 viste typeof para primitivos. Aquí se
 * fijan las piezas que faltan: separar null, distinguir objetos con in, y los
 * atajos ?. y ?? para el null que llega de una API.
 *
 * 🗺️ MAPA
 * BLOQUE A · descartar null con truthiness → drills A1–A2
 * BLOQUE B · la trampa de typeof null → drills B1–B2
 * BLOQUE C · el operador in → drills C1–C2
 * BLOQUE D · más práctica con in → drills D1–D4
 * BLOQUE E · el null en el borde de una API: ?. y ?? → drills E1–E6
 * BLOQUE F · sintaxis fina de ?. y ?? → drills F1–F6
 * BLOQUE G · los dos trabajos de ?. y ??, por separado → drills G1–G7
 *
 * ▸ 29 drills en escalera, en orden. Prohibidos any y as (en el bloque G, también if).
 * pnpm test:run src/exercises/05-unions-narrowing/exercise-03.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ▸ BLOQUE A — descartar null con truthiness */

/* A1) Devuelve la longitud del texto, o 0 si es null. (Estrecha el null primero.)
 * largo("hola") → 4 ; largo(null) → 0
 */
export function largo(x: string | null): number {
  if (x === null) {
    return 0;
  }
  return x.length;
}

/* A2) Devuelve el doble del número, o 0 si es null.
 * doble(5) → 10 ; doble(null) → 0
 */
export function doble(x: number | null): number {
  if (x === null) {
    return 0;
  }
  return x * 2;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE B — la trampa de typeof null
 *
 * DEFINICIÓN
 * Un bug histórico de JavaScript, que lleva 30 años ahí: typeof null es "object",
 * igual que un objeto de verdad. Por eso if (typeof x === "object") no sirve para
 * descartar null: el null se cuela por ese filtro, y al hacer x.nombre revienta
 * (null no tiene props).
 *
 * Ejemplos:
 * if (typeof x === "object") { x.nombre } → ❌ null también entra: 💥 en ejecución
 * if (x !== null) { x.nombre }            → ✅ explícito
 * if (x) { x.nombre }                     → ✅ truthiness: null y undefined son falsy
 *
 * 🧠 ANALOGÍA — typeof es un portero que clasifica por categoría, y por el bug,
 * null lleva una credencial falsa que dice "object": el filtro «solo objetos» deja
 * entrar al impostor igual.
 *
 * 💡 La forma correcta de descartar null es por su valor, no por su typeof.
 * ───────────────────────────────────────────────────────────────────────────── */

/* B1) Devuelve el nombre, o "anónimo" si es null. Ojo: no uses typeof x ===
 * "object" (dejaría pasar el null). Descártalo por valor (!== null o if (x)).
 *   saludar({ nombre: "Ana" }) → "Ana" ; saludar(null) → "anónimo"
 */
export function saludar(x: { nombre: string } | null): string {
  if (x === null) {
    return "anónimo";
  }
  return x.nombre;
}

/* B2) x puede ser un número, un texto, o null. Devuelve:
 * - si es number → el número como string con String(x)
 * - si es string → el texto en mayúsculas
 * - si es null   → "vacío"
 * Combina: typeof para los primitivos + un chequeo correcto para null.
 *   describir(3) → "3" ; describir("hola") → "hola" ; describir(null) → "vacío"
 */
export function describir(x: string | number | null): string {
  switch (typeof x) {
    case "number":
      return String(x);
    case "string":
      return x.toUpperCase();
    default: {
      return "vacío"; // aquí caen null y cualquier otro tipo raro
    }
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE C — el operador in
 *
 * DEFINICIÓN
 * Una unión de objetos sin un campo «tag» común se distingue preguntando si tienen
 * cierta propiedad. "email" in c significa «¿el objeto c tiene la propiedad
 * email?», y TS lo usa como type guard: estrecha igual que typeof lo hace con
 * primitivos.
 *
 * SINTAXIS
 * type Contacto = { email: string } | { telefono: string };
 * function avisar(c: Contacto): string {
 *   if ("email" in c) { return c.email; } // ✅ aquí c es la variante con email
 *   return c.telefono;                    // ✅ aquí, la otra
 * }
 * ───────────────────────────────────────────────────────────────────────────── */

/* C1) Contacto es una unión de objetos sin tag común. Devuelve el email si la
 * variante lo tiene, o el teléfono si no. Distíngue con in.
 *   contactar({ email: "a@b.c" }) → "a@b.c" ; contactar({ telefono: "123" }) → "123"
 */
type Contacto = { email: string } | { telefono: string };
export function contactar(c: Contacto): string {
  if ("email" in c) {
    return c.email;
  }
  return c.telefono;
}

/* C2) Mascota puede ladrar o maullar (campos distintos, sin tag). Devuelve el
 * sonido correcto. Distíngue con in la propiedad que solo una tiene.
 *   sonido({ ladrido: "Guau" }) → "Guau" ; sonido({ maullido: "Miau" }) → "Miau"
 */
type Mascota = { ladrido: string } | { maullido: string };
export function sonido(m: Mascota): string {
  if ("maullido" in m) {
    return m.maullido;
  }
  return m.ladrido;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE D — más práctica con in (escalera)
 *
 * C1 y C2 fueron el caso base: dos variantes, devolver el campo que cada una
 * tiene. Aquí se sube un peldaño por drill: usar el valor estrechado, encadenar in
 * con 3 variantes, distinguir objetos que comparten un campo, y cerrar combinando
 * null + in (todo el ejercicio junto). En orden. Prohibidos any y as.
 * ───────────────────────────────────────────────────────────────────────────── */

/* D1) Caja es un cuadrado (un lado) o un rectángulo (ancho y alto).
 * Devuelve el área. No basta con devolver un campo: hay que operar con él.
 * Distíngue con in y luego haz la cuenta.
 *   area({ lado: 3 }) → 9 ; area({ ancho: 2, alto: 5 }) → 10
 */
type Caja = { lado: number } | { ancho: number; alto: number };
export function area(c: Caja): number {
  if ("lado" in c) {
    return c.lado * c.lado;
  }
  return c.ancho * c.alto;
}

/* D2) Notificacion tiene tres variantes sin tag común. Devuelve el contenido
 * del canal que sea. Encadena in (if / else if / else).
 *   canal({ email: "a@b.c" }) → "a@b.c"
 *   canal({ sms: "hola" })    → "hola"
 *   canal({ push: "ping" })   → "ping"
 */
type Notificacion = { email: string } | { sms: string } | { push: string };
export function canal(n: Notificacion): string {
  if ("email" in n) {
    return n.email;
  } else if ("sms" in n) {
    return n.sms;
  } else {
    return n.push;
  }
}

/* D3) Las dos variantes comparten el campo nombre, pero solo una tiene rolAdmin
 * y la otra rolCliente. Devuelve "nombre: rol". in distingue igual aunque
 * haya un campo en común (lo que importa es el campo que no comparten).
 *   quien({ nombre: "Ana", rolAdmin: "root" })      → "Ana: root"
 *   quien({ nombre: "Leo", rolCliente: "premium" }) → "Leo: premium"
 */
type Cuenta = { nombre: string; rolAdmin: string } | { nombre: string; rolCliente: string };
export function quien(c: Cuenta): string {
  if ("rolAdmin" in c) {
    return `${c.nombre}: ${c.rolAdmin}`;
  }
  return `${c.nombre}: ${c.rolCliente}`;
}

/* D4) Capstone — junta todo el ejercicio: el valor puede ser null o una de dos
 * variantes de objeto. Descarta el null primero (bloque B), y solo después
 * usa in (bloque C). Devuelve:
 *   - null            → "sin respuesta"
 *   - { ok: ... }     → "OK: " + ese texto
 *   - { error: ... }  → "ERR: " + ese texto
 *   procesar(null)              → "sin respuesta"
 *   procesar({ ok: "listo" })   → "OK: listo"
 *   procesar({ error: "boom" }) → "ERR: boom"
 */
type Respuesta = { ok: string } | { error: string } | null;
export function procesar(r: Respuesta): string {
  if (r === null) {
    return "sin respuesta";
  } else if ("ok" in r) {
    return "OK: " + r.ok;
  } else {
    return "ERR: " + r.error;
  }
}
procesar(null); // sin respuesta
procesar({ ok: "listo" }); // OK: listo
procesar({ error: "boom" }); // ERR: boom

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE E — el null en la vida real: el borde de una API (escalera)
 *
 * Hasta aquí el null venía «de juguete». En tus proyectos reales nace en el borde
 * de una API: con fetch(...).then(r => r.json()), TS no sabe qué llega, entra como
 * any y deja de protegerte. Por eso el crash de null casi siempre aparece justo
 * después de leer datos de tu backend. La defensa profesional es doble:
 * 1) tipar la respuesta (Proyecto | null, no any): TS te obliga a tratar el null;
 * 2) descartar el null por valor antes de tocar propiedades (bloques A y B).
 *
 * DEFINICIÓN
 * ?. (optional chaining) y ?? (nullish coalescing) son el atajo idiomático para
 * «si esto es null o undefined, no sigas» y «usa un respaldo». No reemplazan al
 * narrowing: lo complementan.
 *
 * SINTAXIS
 * sesion.usuario?.nombre               // si usuario es null → undefined, sin crash
 * sesion.usuario?.nombre ?? "invitado" // «el nombre, y si no hay nadie, invitado»
 *
 * 🗣️ LAS PIEZAS
 * obj?.prop → si obj es null o undefined, no accede y devuelve undefined
 * a ?? b    → si a es null o undefined, usa b; si no, usa a
 *
 * 🧠 ANALOGÍA — ?. es preguntar «¿estás ahí?» antes de tocar la puerta, en vez de
 * tirarla abajo; ?? es el plan B por si la respuesta fue «no hay nadie».
 *
 * ⚠️ TRAMPA — solo null y undefined disparan el respaldo de ??. El 0 y el "" no:
 * por eso ?? es mejor que ||, que también caería con 0.
 *
 * Cada función tiene throw new Error("TODO ..."): bórralo y complétala. E1–E3,
 * narrowing por valor (lo que ya sabes, ahora con datos de API); E4–E6, ?. y ??.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ Proyecto 1: portfolio (info personal + proyectos web) */

// Un proyecto de tu portfolio. `repoUrl` puede venir null (proyecto privado).
type Proyecto = { nombre: string; repoUrl: string | null };

/* E1) La API puede devolver null cuando el proyecto no existe (GET /proyectos/999).
 * Devuelve el nombre, o "Proyecto no encontrado" si es null.
 * Descarta el null por valor primero (no con typeof).
 *   tituloProyecto({ nombre: "Projex", repoUrl: null }) → "Projex"
 *   tituloProyecto(null)                                 → "Proyecto no encontrado"
 */
export function tituloProyecto(p: Proyecto | null): string {
  if (p === null) {
    return "Proyecto no encontrado";
  }
  return p.nombre;
}

/* E2) Aquí el proyecto sí existe, pero el campo repoUrl puede ser null.
 * Devuelve la URL del repo, o "Sin repositorio" si es null.
 *   enlaceRepo({ nombre: "Projex", repoUrl: "github.com/x" }) → "github.com/x"
 *   enlaceRepo({ nombre: "Privado", repoUrl: null })          → "Sin repositorio"
 */
export function enlaceRepo(p: Proyecto): string {
  if (p.repoUrl === null) {
    return "Sin repositorio";
  }
  return p.repoUrl;
}

/* ▸ Proyecto 2: e-commerce junior */

// Un producto. `descuento` es null en la mayoría (no todos tienen oferta).
type Producto = { nombre: string; precio: number; descuento: { porcentaje: number } | null };

/* E3) Devuelve el precio final. Si hay descuento, aplícalo; si es null, el precio
 * tal cual. Descarta el null del descuento antes de leer .porcentaje.
 * final = precio * (1 - porcentaje / 100)
 *   precioFinal({ nombre: "X", precio: 100, descuento: { porcentaje: 20 } }) → 80
 *   precioFinal({ nombre: "Y", precio: 100, descuento: null })               → 100
 */
export function precioFinal(p: Producto): number {
  const descuento = p.descuento?.porcentaje ?? 0; // si p.descuento es null, descuento será 0
  return p.precio * (1 - descuento / 100);
}

/* E4) Sesión del usuario. usuario es null si nadie inició sesión.
 * Devuelve el nombre, o "invitado". Aquí sí usa ?. + ?? (una sola línea).
 *   saludoSesion({ usuario: { nombre: "Nico" } }) → "Nico"
 *   saludoSesion({ usuario: null })                → "invitado"
 */
type Sesion = { usuario: { nombre: string } | null };
export function saludoSesion(s: Sesion): string {
  const nombre = s.usuario?.nombre ?? "invitado";
  return nombre;
}

/* E5) El carrito completo puede venir null (sesión nueva sin carrito creado).
 * Devuelve cuántos items hay. Si el carrito es null → 0. Usa ?. + ??.
 *   cantidadItems({ items: [{ precio: 10 }, { precio: 5 }] }) → 2
 *   cantidadItems(null)                                       → 0
 */
type Carrito = { items: { precio: number }[] };
export function cantidadItems(c: Carrito | null): number {
  const items = c?.items ?? [];
  return items.length;
}
cantidadItems({ items: [{ precio: 10 }, { precio: 5 }] }); // 2
cantidadItems(null); // 0

/* E6) Capstone — junta todo el bloque. El producto puede ser null (no encontrado),
 * y si existe puede o no tener descuento. Devuelve la etiqueta de precio:
 *   - producto null            → "No disponible"
 *   - sin descuento            → "$<precio>"        (precio con 2 decimales)
 *   - con descuento            → "$<precioFinal>"   (ya rebajado, 2 decimales)
 * Descarta el null del producto primero, luego el del descuento. Puedes
 * reutilizar precioFinal si quieres (dry), pero ojo: solo si p no es null.
 *   etiquetaPrecio(null)                                                   → "No disponible"
 *   etiquetaPrecio({ nombre: "X", precio: 100, descuento: null })          → "$100.00"
 *   etiquetaPrecio({ nombre: "Y", precio: 100, descuento: { porcentaje: 25 } }) → "$75.00"
 */
export function etiquetaPrecio(p: Producto | null): string {
  if (p === null) {
    return "No disponible";
  }
  const precio = precioFinal(p);
  return `$${precio.toFixed(2)}`;
}
etiquetaPrecio(null); // "No disponible"
etiquetaPrecio({ nombre: "X", precio: 100, descuento: null }); // "$100.00"
etiquetaPrecio({ nombre: "Y", precio: 100, descuento: { porcentaje: 25 } }); // "$75.00"

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE F — sintaxis fina de ?. y ?? (escalera de mecánica)
 *
 * DEFINICIÓN
 * ?. tiene tres formas según lo que venga después, y todas siguen la misma regla:
 * si lo de la izquierda del ?. es null o undefined, corta y devuelve undefined; si
 * no, sigue. Cada ?. protege un salto: si hay varios eslabones que pueden ser
 * null, va un ?. en cada salto peligroso, y en cuanto uno corta, el resto se salta.
 *
 * 🗣️ LAS PIEZAS
 * obj?.prop → propiedad, la que ya conoces: usuario?.nombre
 * obj?.[i]  → índice o clave dinámica, si lo que puede ser null es el array: fotos?.[0]
 * fn?.()    → llamada opcional, si la función misma puede ser null: onClick?.()
 *
 * SINTAXIS
 * pedido.cliente?.direccion?.ciudad // undefined si cliente o direccion son null
 *
 * Ejemplos:
 * 0 ?? 99 → 0: el 0 no es null ni undefined, se respeta
 * 0 || 99 → 99: el 0 es falsy y ❌ lo pisa (bug típico con precios y stock)
 *
 * ⚠️ TRAMPA — en la forma de índice, el punto va antes del corchete: ?.[ y no ?[.
 *
 * Borra el throw de cada función y complétala. Apóyate en las tres formas.
 * ───────────────────────────────────────────────────────────────────────────── */

/* F1) Encadenar ?. dos niveles. cliente puede ser null, y su direccion
 * también. Devuelve la ciudad de envío, o "sin ciudad" si falta algún eslabón.
 *   ciudadEnvio({ cliente: { direccion: { ciudad: "Lima" } } }) → "Lima"
 *   ciudadEnvio({ cliente: { direccion: null } })               → "sin ciudad"
 *   ciudadEnvio({ cliente: null })                              → "sin ciudad"
 */
type Pedido = { cliente: { direccion: { ciudad: string } | null } | null };
export function ciudadEnvio(p: Pedido): string {
  const ciudad = p.cliente?.direccion?.ciudad ?? "sin ciudad";
  return ciudad;
}

/* F2) La trampa del 0. stock puede ser un número (incluido 0) o null. Devuelve
 * el stock tal cual, o -1 si es null. Ojo: un producto con stock 0 está
 * agotado pero existe → debe devolver 0, no -1. (Pista: ¿?? o ||?)
 *   stockMostrado({ stock: 7 })    → 7
 *   stockMostrado({ stock: 0 })    → 0    ← ¡no -1!
 *   stockMostrado({ stock: null }) → -1
 */
type Inventario = { stock: number | null };
export function stockMostrado(i: Inventario): number {
  const stock = i.stock ?? -1;
  return stock;
}
stockMostrado({ stock: 7 }); // 7 En un proyecto real puede ser mostrado con  estilos para resaltar que hay pocas unidades
stockMostrado({ stock: 0 }); // 0 En un proyecto real puede ser mostrado como "Agotado"
stockMostrado({ stock: null }); // -1 En un proyecto real puede ser mostrado como "No disponible" o algo así, para diferenciarlo del "Agotado"

/* F3) Forma ?.[]. fotos puede ser null (producto sin imágenes). Devuelve la
 * primera foto (índice 0), o "placeholder.webp" si no hay galería o está vacía.
 * Necesitas indexar un array que puede ser null → sintaxis fotos?.[0].
 *   portada({ fotos: ["a.png", "b.png"] }) → "a.png"
 *   portada({ fotos: [] })                 → "placeholder.webp"
 *   portada({ fotos: null })               → "placeholder.webp"
 */
type Galeria = { fotos: string[] | null };
export function portada(g: Galeria): string {
  const foto = g.fotos?.[0] ?? "placeholder.webp";
  return foto;
}

/* F4) Forma ?.(). onClick es un callback que puede ser null (botón deshabilitado).
 * Si existe, llámalo y devuelve lo que retorne; si es null, devuelve "sin acción".
 *   activar({ onClick: () => "guardado" }) → "guardado"
 *   activar({ onClick: null })             → "sin acción"
 */
type Boton = { onClick: (() => string) | null };
export function activar(b: Boton): string {
  const accion = b.onClick?.() ?? "sin acción";
  return accion;
}

/* F5) Encadenar + índice. carrito puede ser null; si existe, su items puede
 * estar vacío. Devuelve el nombre del primer item, o "vacío" si no hay carrito
 * o no hay items. (Encadena ?. con el acceso por índice.)
 *   primerProducto({ carrito: { items: [{ nombre: "Té" }] } }) → "Té"
 *   primerProducto({ carrito: { items: [] } })                 → "vacío"
 *   primerProducto({ carrito: null })                          → "vacío"
 */
type Cuenta2 = { carrito: { items: { nombre: string }[] } | null };
export function primerProducto(u: Cuenta2): string {
  return u.carrito?.items[0]?.nombre ?? "vacío";
}

/* F6) Capstone — junta las tres formas. La config puede tener tema null y un
 * obtenerDescuento que puede ser null. Devuelve "<color> / <desc>%":
 *   - color: el del tema, o "default" si no hay tema.
 *   - desc:  lo que devuelva obtenerDescuento(), o 0 si no hay función.
 *            (cuidado: un descuento de 0% es válido → no lo pises.)
 *   resumenConfig({ tema: { color: "rojo" }, obtenerDescuento: () => 15 }) → "rojo / 15%"
 *   resumenConfig({ tema: null, obtenerDescuento: () => 0 })               → "default / 0%"
 *   resumenConfig({ tema: { color: "azul" }, obtenerDescuento: null })     → "azul / 0%"
 */
type Configuracion = {
  tema: { color: string } | null;
  obtenerDescuento: (() => number) | null;
};
export function resumenConfig(c: Configuracion): string {
  const color = c.tema?.color ?? "default";
  const descuento = c.obtenerDescuento?.() ?? 0;
  return `${color} / ${descuento}%`;
}
resumenConfig({ tema: { color: "rojo" }, obtenerDescuento: () => 15 }); // "rojo / 15%"
resumenConfig({ tema: null, obtenerDescuento: () => 0 }); // "default / 0%"
resumenConfig({ tema: { color: "azul" }, obtenerDescuento: null }); // "azul / 0%"

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE G — los dos trabajos de ?. y ??, por separado y luego juntos
 *
 * Hasta ahora siempre los usaste pegados (s.usuario?.nombre ?? "invitado"), así
 * que tu mente los lee como un solo operador. No lo son: hacen dos trabajos
 * distintos, y aquí los usas uno sin el otro para sentir la diferencia.
 *
 * DEFINICIÓN
 * ?. es el acceso protegido: «voy a leer algo de la izquierda; si la izquierda es
 * null o undefined, no leo y dejo undefined en su lugar». Cuando corta, su
 * producto es siempre undefined: no pone respaldos.
 * ?? es el respaldo: «miro lo de mi izquierda; si es null o undefined, lo cambio
 * por el respaldo; si no, lo dejo tal cual». No accede a nada ni protege nada:
 * solo rellena huecos.
 *
 * 🧠 ANALOGÍA — el relevo: cuando van juntos, ?. corre la posta y produce un
 * undefined, y ?? lo recoge en la meta y lo cambia por el respaldo. Por eso
 * obj?.x ?? y nunca devuelve undefined.
 *
 * Borra el throw y completa. Prohibidos any, as e if. En G·1 no uses ?., y en G·2
 * no uses ??.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ G·1 — solo ?? (el respaldo)
 *
 * El valor ya puede ser null por sí mismo, y no hay nada anidado que proteger: aquí
 * ?. no pinta nada. Usa únicamente ??.
 * ───────────────────────────────────────────────────────────────────────────── */

/* G1) saludoG — recibe un nombre que puede faltar (null). Devuelve el nombre,
 * o "invitado" si es null. Una línea: nombre ?? respaldo.
 *   saludoG("Nico") → "Nico" ; saludoG(null) → "invitado"
 */
export function saludoG(nombre: string | null): string {
  // Nombre es un string o es un null? Para eso usa `??`.
  return nombre ?? "invitado";
}

/* G2) cantidadG — una cantidad que puede ser null. Devuélvela, o 0 si es null.
 * Trampa: una cantidad de 0 es un dato real (no es lo mismo que "no hay dato").
 * ?? solo reacciona a null/undefined, así que el 0 se respeta. (Con || se
 * rompería: 0 es falsy y lo pisaría.)
 *   cantidadG(7) → 7 ; cantidadG(0) → 0 ; cantidadG(null) → 0
 */
export function cantidadG(n: number | null): number {
  return n ?? 0;
}

/* G3) textoG — ahora lo que puede faltar viene como undefined (no null).
 * Devuelve el texto, o "(sin texto)". Comprueba que ?? caza undefined igual
 * que null: son los dos únicos casos que dispara.
 *   textoG("hola") → "hola" ; textoG(undefined) → "(sin texto)"
 */
export function textoG(t: string | undefined): string {
  return t ?? "(sin texto)";
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ G·2 — solo ?. (el acceso protegido), sin ??
 *
 * Mira el tipo de retorno: termina en | undefined. No es un descuido: es la prueba
 * de que, cuando ?. corta, lo que sale de la función es, literalmente, undefined.
 * ───────────────────────────────────────────────────────────────────────────── */

type UsuarioG = { nombre: string };

/* G4) inicialG — el usuario puede ser null. Devuelve su nombre... pero sin
 * respaldo. Si el usuario es null, ?. corta y la función devuelve undefined
 * (por eso el retorno es string | undefined). Esto es ?. desnudo: protege
 * el acceso y no rellena nada.
 *   inicialG({ nombre: "Ana" }) → "Ana" ; inicialG(null) → undefined
 */
export function inicialG(u: UsuarioG | null): string | undefined {
  return u?.nombre;
}

type EnvioG = { envio: { ciudad: string } | null };
/* G5) ciudadG — dos eslabones que pueden ser null: el objeto entero y su envio.
 * Encadena dos ?. (uno por salto peligroso), todavía sin ??. Si cualquier
 * eslabón corta → undefined.
 *   ciudadG({ envio: { ciudad: "Lima" } }) → "Lima"
 *   ciudadG({ envio: null })               → undefined
 *   ciudadG(null)                          → undefined
 */
export function ciudadG(p: EnvioG | null): string | undefined {
  return p?.envio?.ciudad;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ G·3 — juntos (el relevo)
 *
 * Son los gemelos de G4 y G5, pero ahora sí pones el ?? al final. Compara el tipo
 * de retorno: ya no hay | undefined, porque el ?? recoge el undefined que produce
 * el ?. y lo cambia por el respaldo.
 * ───────────────────────────────────────────────────────────────────────────── */

/* G6) inicialODefaultG — gemelo de G4 + respaldo. ?. genera el undefined cuando
 * el usuario es null; ?? lo recoge y entrega "anónimo". Retorno: string a
 * secas (ya nunca sale undefined).
 *   inicialODefaultG({ nombre: "Ana" }) → "Ana" ; inicialODefaultG(null) → "anónimo"
 */
export function inicialODefaultG(u: UsuarioG | null): string {
  return u?.nombre ?? "anónimo";
}

/* G7) ciudadODefaultG — gemelo de G5 + respaldo. La cadena de ?. puede cortar
 * en dos sitios; pase lo que pase produce undefined, y un único ?? al final
 * lo tapa con "sin ciudad".
 *   ciudadODefaultG({ envio: { ciudad: "Lima" } }) → "Lima"
 *   ciudadODefaultG({ envio: null })               → "sin ciudad"
 *   ciudadODefaultG(null)                          → "sin ciudad"
 */
export function ciudadODefaultG(p: EnvioG | null): string {
  return p?.envio?.ciudad ?? "sin ciudad";
}
