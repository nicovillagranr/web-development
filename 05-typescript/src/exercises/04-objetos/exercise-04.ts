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
 * EJERCICIO 04 — `.map` + `.filter`: transformar y depurar SIN mutar
 * =============================================================================
 *
 * ▸ CONTEXTO
 * ----------------------------------------------------------------------------
 * Este bloque nace del drill 7 de `exercise-03` (`quitarUnaUnidad`): el test
 * pasó, pero el FLUJO del `.filter` no estaba claro (qué busca, qué devuelve,
 * y por qué va encadenado DESPUÉS del `.map` y no adentro). Aquí se aísla cada
 * pieza por separado y luego se encadenan, en escalera de 10 drills.
 *
 * ▸ OBJETIVO TÉCNICO
 * ----------------------------------------------------------------------------
 * Dominar el dúo `.map` (transforma) + `.filter` (decide quién sobrevive) y
 * saber CUÁNDO encadenarlos y EN QUÉ ORDEN. Los tipos de cada drill están
 * definidos justo encima del bloque que los usa — no hay que subir a buscarlos.
 *
 *
 * ════════════════════════════════════════════════════════════════════════════
 * ▸ EXPLICACIÓN — leer ANTES de tocar los drills
 * ════════════════════════════════════════════════════════════════════════════
 *
 * 🎯 LA REGLA QUE UNE TODO — lo que importa es QUÉ DEVUELVE tu función de adentro:
 *
 *     arr.map((x) => ...)      tu función devuelve un VALOR (el item transformado)
 *                              → array del MISMO largo (entran 3, salen 3)
 *
 *     arr.filter((x) => ...)   tu función devuelve un BOOLEANO (true / false)
 *                              → array IGUAL O MÁS CORTO (conserva los true)
 *
 *   Los DOS recorren TODOS los elementos (no "buscan uno y paran"). Cambia solo
 *   qué les respondes: a map "¿en qué convierto este?", a filter "¿este se queda?".
 *
 * 🚪 ANALOGÍA — `.filter` es el PORTERO de la discoteca con la fila completa:
 *   revisa a CADA persona (no deja pasar al primero y cierra), a cada una le
 *   aplica la misma pregunta de sí/no, y NO transforma a nadie (nadie sale con
 *   otra ropa: entra o no entra). Transformar es trabajo de `.map`.
 *
 * 🔗 ENCADENAR = dos estaciones, una tras otra. El `.filter` se pega con un punto
 *   al resultado del `.map` (saltos de línea libres, el `.` es quien conecta):
 *
 *     arr
 *       .map((x) => ...)      // estación 1: transforma TODOS
 *       .filter((x) => ...)   // estación 2: sobre lo que salió, decide quién queda
 *
 * 🧭 ¿EN QUÉ ORDEN? Depende de QUÉ DATO mira el filtro:
 *   • Si el filtro mira un valor que el map ACABA DE CREAR (el precio rebajado,
 *     la vida en 0) → el filter va DESPUÉS: ese valor no existe antes del map.
 *   • Si el filtro mira un dato que YA EXISTE en el original (un campo booleano)
 *     → el filter puede ir PRIMERO (drill 7 lo practica).
 *
 * ▸ DRILLS — EN ORDEN. Cada cuerpo provisional devuelve algo que compila pero
 *   falla el test: arréglalo y corre el test.
 *     pnpm test:run src/exercises/04-objetos/exercise-04.test.ts
 *   Reglas: ❌ nada de `any`/`as X`, ❌ NO MUTES (ni la colección ni los objetos
 *   de dentro), ✅ devuelve copias nuevas con `.map` / `.filter` / spread.
 * ═══════════════════════════════════════════════════════════════════════════*/


/* ═══════════════════════════════════════════════════════════════════════════
 * ▸ BLOQUE A (1–3) — AÍSLA `.filter`: tu función devuelve true/false
 * ═══════════════════════════════════════════════════════════════════════════*/

type Usuario = { nombre: string; edad: number; activo: boolean }

// 1) 🟢 `soloActivos` devuelve un array nuevo SOLO con los usuarios que tienen
//   `activo === true`. (filter puro: el campo `activo` YA es un booleano, así
//   que tu función de adentro puede devolverlo tal cual, sin comparar nada.)
//     soloActivos([{...activo:true},{...activo:false}]) → [{...activo:true}]
export function soloActivos(usuarios: Usuario[]): Usuario[] {
  return usuarios.filter((u) => u.activo)
}

type Producto = { nombre: string; precio: number; stock: number }

// 2) 📦 `conStock` devuelve SOLO los productos con `stock` mayor que 0.
//   (filter con comparación: `stock > 0` ya produce el true/false por sí solo —
//   sin if, sin ternario, sin `=== true`.)
//     conStock([{...stock:3},{...stock:0}]) → [{...stock:3}]
export function conStock(productos: Producto[]): Producto[] {
  return productos.filter((producto) => producto.stock > 0)
}

type Tarea = { titulo: string; completada: boolean }

// 3) 📋 `pendientes` devuelve SOLO las tareas NO completadas.
//   (filter con negación: si `t.completada` es el booleano "ya está hecha",
//   ¿cómo le dices al portero "déjame las que NO lo están"? Recuerda el `!`
//   de `contarVerdaderos`.)
//     pendientes([{...completada:false},{...completada:true}]) → [{...completada:false}]
export function pendientes(tareas: Tarea[]): Tarea[] {
  return tareas.filter((tarea) => !tarea.completada)
}


/* ═══════════════════════════════════════════════════════════════════════════
 * ▸ BLOQUE B (4–5) — AÍSLA `.map`: devuelve un VALOR → mismo largo, NADA de filter
 * ═══════════════════════════════════════════════════════════════════════════*/

// 4) ✖️2 `duplicarPrecios` devuelve productos nuevos con el `precio` x2. Misma
//   cantidad de productos, cada uno transformado. (Sin filter: aquí no se
//   elimina a nadie, solo se transforma. Patrón de adentro: { ...p, precio: ... }.)
//     duplicarPrecios([{...precio:100},{...precio:50}]) → [{...precio:200},{...precio:100}]
export function duplicarPrecios(productos: Producto[]): Producto[] {
  return productos.map((producto) => ({ ...producto, precio: producto.precio * 2 }))
}

// 5) 💸 `rebajarPrecios` le resta `monto` al `precio` de CADA producto, aunque
//   quede en 0 o negativo — aquí NADIE se elimina, solo se transforma. (Es la
//   MITAD del drill 6: primero domina el map solo, luego le encadenas el filter.)
//     rebajarPrecios([{...precio:100},{...precio:30}], 50) → [{...precio:50},{...precio:-20}]
export function rebajarPrecios(productos: Producto[], monto: number): Producto[] {
  return productos.map((producto) => ({ ...producto, precio: producto.precio - monto }))
}
rebajarPrecios([{ nombre: "Coca Cola", precio: 100, stock: 3 }], 50) // → [{...precio:50}]


/* ═══════════════════════════════════════════════════════════════════════════
 * ▸ BLOQUE C (6–10) — ENCADENA: dos estaciones, `.map(...).filter(...)`
 * ═══════════════════════════════════════════════════════════════════════════*/

// 6) 💸🧹 `rebajarYdepurar` = el drill 5 + una estación más: resta `monto` a
//   todos Y deja fuera los que quedaron en 0 o menos. (El precio rebajado solo
//   existe DESPUÉS del map → el filter va al final.)
//     rebajarYdepurar([{...precio:100},{...precio:30}], 50) → [{...precio:50}]
//       (el de 30 queda en -20 → se cae)
export function rebajarYdepurar(productos: Producto[], monto: number): Producto[] {
  return productos.map((producto) => ({ ...producto, precio: producto.precio - monto })).filter((product) => product.precio > 0)
}
rebajarYdepurar([{ nombre: "Coca Cola", precio: 100, stock: 3 }], 50) // → [{...precio:50}]
rebajarYdepurar([{ nombre: "Pepsi", precio: 30, stock: 3 }], 50) // → [] // No pasa el filtro por ende se cae

// 7) 🔁 ORDEN INVERSO: `nombresDeActivos` devuelve SOLO los nombres (strings)
//   de los usuarios activos. Aquí el filtro mira `activo`, que YA EXISTE en el
//   original → el filter va PRIMERO, y el map después convierte cada usuario
//   que sobrevivió en su nombre. (Ojo: el map puede CAMBIAR el tipo — entran
//   Usuario, salen string. Por eso el retorno es `string[]`.)
//     nombresDeActivos([{nombre:"Ana",activo:true},{nombre:"Eva",activo:false}]) → ["Ana"]
export function nombresDeActivos(usuarios: Usuario[]): string[] {
  return usuarios.filter((u) => u.activo).map((u) => u.nombre)
}
nombresDeActivos([{ nombre: "Ana", edad: 30, activo: true }, { nombre: "Eva", edad: 25, activo: false }]) // Resultado: ["Ana"]
nombresDeActivos([{ nombre: "Nico", edad: 23, activo: false }]) // Resultado: []


type Enemigo = { id: number; nombre: string; vida: number }

// 8) ⚔️ `recibirDanio` le resta `dano` de `vida` SOLO al enemigo con ese `id`
//   (el resto intacto), y si algún enemigo queda con `vida` 0 o menos, DESAPARECE.
//   (Es el patrón EXACTO de `quitarUnaUnidad` con otro disfraz: map + ternario
//   para pegarle solo al que coincide, filter para barrer a los caídos.)
//     recibirDanio([{id:"1",nombre:"Orco",vida:10}], "1", 3)  → [{...vida:7}]
//     recibirDanio([{id:"2",nombre:"Orco",vida:3}],  "2", 3)  → []  (cayó)
export function recibirDanio(enemigos: Enemigo[], id: number, dano: number): Enemigo[] {
  return enemigos.map((enemigo) => enemigo.id === id ? { ...enemigo, vida: enemigo.vida - dano } : enemigo).filter((enemigo) => enemigo.vida > 0)
}
recibirDanio(
  [{ id: 1, nombre: "Orco", vida: 10 },
  { id: 2, nombre: "Goblin", vida: 5 },
  { id: 3, nombre: "Troll", vida: 3 }]
  , 1, 3) // → [{...vida:7},{...vida:5},{...vida:3}] // El ternario solo toca a "Orco", pero el map devuelve a LOS TRES; nadie queda en 0 → el filter no elimina a ninguno

recibirDanio(
  [{ id: 1, nombre: "Orco", vida: 10 },
  { id: 2, nombre: "Goblin", vida: 5 },
  { id: 3, nombre: "Troll", vida: 3 }]
  , 4, 3) // Resultado: [{...vida:10},{...vida:5},{...vida:3}] // Los demás pasan el filtro, pero no se encuentra el id

recibirDanio(
  [{ id: 1, nombre: "Orco", vida: 10 },
  { id: 2, nombre: "Goblin", vida: 5 },
  { id: 3, nombre: "Troll", vida: 3 }]
  , 1, 11) // Resultado: [{id: 2, nombre: "Goblin", vida: 5},{id: 3, nombre: "Troll", vida: 3}] Orco queda con vida -1, filter lo deja fuera


// 9) 🚚 `asequiblesConEnvio` le suma el costo de `envio` al `precio` de CADA
//   producto, y devuelve SOLO los que (ya con envío) cuestan `presupuesto` o
//   menos. (El precio final solo existe después del map → filter al final.
//   Ojo al filtro: aquí sobrevivir es `<=`, no `>`.)
//     asequiblesConEnvio([{...precio:800},{...precio:950}], 100, 1000)
//       → [{...precio:900}]   (el otro queda en 1050 > 1000 → se cae)
export function asequiblesConEnvio(productos: Producto[], envio: number, presupuesto: number,): Producto[] {
  return productos.map((producto) => ({ ...producto, precio: producto.precio + envio })).filter((producto) => producto.precio <= presupuesto)
}
// ¿Pasa? Sí: el precio final ($810) NO SUPERA el presupuesto ($1000). Queda holgura, pero pasaría igual sin ella.
asequiblesConEnvio([{ nombre: "Bicicleta Trek", precio: 800, stock: 10 }], 10, 1000) // → [{nombre: "Bicicleta Trek", precio:810, stock: 10}]

// CASO LÍMITE: el precio final cae CLAVADO en el presupuesto (810 === 810).
// Sobrevive PORQUE el portero es `<=` (no supera = pasa); con `<` este mismo producto se caería.
asequiblesConEnvio([{ nombre: "Bicicleta Trek", precio: 800, stock: 10 }], 10, 810) // → [{nombre: "Bicicleta Trek", precio:810, stock: 10}]

// Contraste: presupuesto 809 → 810 SÍ lo supera (por $1) → se cae.
asequiblesConEnvio([{ nombre: "Bicicleta Trek", precio: 800, stock: 10 }], 10, 809) // → []


type ItemCarrito = { id: string; nombre: string; cantidad: number }
// 10) 🛒 CAPSTONE `depurarCarrito` le resta 1 de `cantidad` a CADA item del
//   carrito y elimina los que llegaron a 0. (Como `quitarUnaUnidad`, pero
//   aplicado a TODOS a la vez: aquí el map NO necesita ternario porque tocas
//   a todos por igual.)
//     depurarCarrito([{...cantidad:2},{...cantidad:1}]) → [{...cantidad:1}]
//       (el de 1 baja a 0 → se cae)
export function depurarCarrito(carrito: ItemCarrito[]): ItemCarrito[] {
  return carrito.map((item) => ({ ...item, cantidad: item.cantidad - 1 })).filter((item) => item.cantidad > 0)
}
