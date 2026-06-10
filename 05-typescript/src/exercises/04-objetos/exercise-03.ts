/* =============================================================================
 * EJERCICIO 03 — Actualización inmutable ANIDADA: un objeto dentro de un array
 *                o dentro de otro objeto (diccionario)
 * =============================================================================
 *
 * ▸ CONTEXTO
 * ----------------------------------------------------------------------------
 * En `exercise-02` actualizabas UN objeto suelto con `{ ...obj, prop: ... }`.
 * Aquí subimos el nivel: ahora el objeto vive DENTRO de una colección —un array
 * de usuarios, o un diccionario por id— y hay que actualizar SOLO uno sin mutar
 * ni el resto ni la colección. Es el patrón estrella de React (estado anidado).
 *
 * ▸ OBJETIVO TÉCNICO
 * ----------------------------------------------------------------------------
 * El patrón de adentro `{ ...obj, prop: ... }` NO cambia. Lo nuevo es cómo
 * LLEGAR al objeto correcto: un `.map` para arrays, un spread + `[id]` para
 * diccionarios. Y entender que el spread es "de un solo piso" (shallow).
 *
 *
 * ════════════════════════════════════════════════════════════════════════════
 * ▸ EXPLICACIÓN — leer ANTES de tocar los drills
 * ════════════════════════════════════════════════════════════════════════════
 *
 * 🍱 EL SPREAD ES DE UN SOLO PISO (shallow)
 * ----------------------------------------------------------------------------
 * `{ ...x }` copia el PRIMER nivel. Si dentro hay otra colección, esa se
 * comparte (no se copia de verdad). Para cambiar algo anidado tienes que hacer
 * spread EN CADA PISO, desde la raíz hasta el dato que tocas. Lo de al lado
 * (hermanos) viaja solo dentro del spread; lo de adentro se copia a mano.
 *
 *
 * 1) ARRAY DE OBJETOS  → `.map` para elegir cuál
 * ----------------------------------------------------------------------------
 *   No mutes el array: recórrelo con `.map`, y SOLO al que cumple la condición
 *   le aplicas el patrón; al resto lo devuelves intacto.
 *
 *     usuarios.map((u) =>
 *       u.nombre === nombre
 *         ? { ...u, edad: u.edad + 1 }   // ← el MISMO patrón de exercise-02
 *         : u,                           // ← los demás viajan intactos
 *     )
 *
 *
 * 2) OBJETO DE OBJETOS (diccionario)  → spread + `[id]`
 * ----------------------------------------------------------------------------
 *   Los objetos viven bajo una llave (su id). Spread en DOS pisos:
 *
 *     {
 *       ...reg,                              // piso 1: copia TODAS las llaves
 *       [id]: { ...u, edad: u.edad + 1 },    // piso 2: pisa SOLO esa llave
 *     }
 *
 *   • `[id]:` con corchetes = "llave calculada": la propiedad cuyo NOMBRE está
 *     en la variable `id` (si id vale "u2", pisa la llave "u2").
 *   • acceder a uno: `reg[id]` (igual que `arr[i]`, pero por nombre).
 *
 *   ⚠️ DETALLE DE TS (noUncheckedIndexedAccess): al hacer `reg[id]` TS te da
 *   `Usuario | undefined` (la llave podría no existir). Así que NO puedes hacer
 *   `reg[id].edad` directo. Guárdalo y descarta el undefined con tu narrowing:
 *
 *     const u = reg[id]
 *     if (!u) return reg            // si esa llave no existe, no hay qué tocar
 *     return { ...reg, [id]: { ...u, edad: u.edad + 1 } }
 *
 *
 * ▸ DRILLS — EN ORDEN. Cada cuerpo provisional devuelve la colección sin tocar:
 *   arréglalo y corre el test.
 *     pnpm test:run src/exercises/04-objetos/exercise-03.test.ts
 *   Reglas: ❌ nada de `any`/`as X`, ❌ NO MUTES (ni la colección ni los objetos
 *   de dentro; nada de `arr[i].x = ...` ni `arr.push(...)`), ✅ devuelve copias
 *   nuevas con spread / `.map` / `.filter`.
 * ═══════════════════════════════════════════════════════════════════════════*/


type Usuario = { nombre: string; edad: number; activo: boolean }
type Producto = { nombre: string; precio: number; stock: number }
type Registro = { [id: string]: Usuario }
type ItemCarrito = { id: string; nombre: string; cantidad: number }


/* ── Bloque D1: el objeto vive en un ARRAY → usa .map para elegir cuál ─────── */

// 1) 🎂 `cumplirAniosDe` recibe un array de usuarios y un nombre, y devuelve un
//    array NUEVO donde SOLO el usuario con ese nombre tiene la edad +1. El resto
//    igual. (Pista: map + ternario; el que no coincide se devuelve tal cual.)
//      cumplirAniosDe([{nombre:"Ana",edad:30,activo:true},
//                      {nombre:"Eva",edad:25,activo:true}], "Ana")
//        → [{nombre:"Ana",edad:31,...}, {nombre:"Eva",edad:25,...}]
export function cumplirAniosDe(usuarios: Usuario[], nombre: string): Usuario[] {
  return (
    usuarios.map((u) => {
      if (u.nombre === nombre) {
        return { ...u, edad: u.edad + 1 }
      }
      return u
    })
  )
}
cumplirAniosDe([{ nombre: "Ana", edad: 30, activo: true }, { nombre: "Eva", edad: 25, activo: true }], "Ana") // A Ana se le suma 1 a la edad porque la condicion se cumple


// 2) 🔌 `desactivarA` devuelve un array nuevo donde SOLO el usuario con ese
//    nombre queda con `activo: false`. El resto intacto.
//      desactivarA([{nombre:"Ana",edad:30,activo:true}], "Ana")
//        → [{nombre:"Ana",edad:30,activo:false}]
export function desactivarA(usuarios: Usuario[], nombre: string): Usuario[] {
  return (
    usuarios.map((u) => {
      if (u.nombre === nombre) {
        return { ...u, activo: false }
      }
      return u
    })
  )
}

// 3) 💸 `subirPrecio` recibe productos, un nombre y un monto. Devuelve un array
//    nuevo donde SOLO ese producto tiene `precio` aumentado en `monto`.
//      subirPrecio([{nombre:"Lápiz",precio:500,stock:3}], "Lápiz", 100)
//        → [{nombre:"Lápiz",precio:600,stock:3}]
export function subirPrecio(productos: Producto[], nombre: string, monto: number): Producto[] {
  return (
    productos.map((p) => {
      if (p.nombre === nombre) {
        return { ...p, precio: p.precio + monto }
      }
      return p
    })
  )
}
subirPrecio([{ nombre: "Lápiz", precio: 500, stock: 3 }], "Lápiz", 100) // Lápiz a $600
subirPrecio([{ nombre: "Tijeras", precio: 1000, stock: 2 }], "Tijeras", 200) // Tijeras a $1200

/* ── Bloque D2: el objeto vive en un DICCIONARIO → spread + [id] (¡y guard!) ── */

// 4) 🎂 `cumplirAniosEnRegistro` recibe un registro (objeto de usuarios por id) y
//    un id. Devuelve un registro NUEVO con la edad de ESE usuario +1. Recuerda:
//    `reg[id]` es `Usuario | undefined` → guárdalo y descarta el undefined antes.
//    Si el id no existe, devuelve el registro sin cambios.
//      cumplirAniosEnRegistro({ u1: {nombre:"Ana",edad:30,activo:true} }, "u1")
//        → { u1: { nombre:"Ana", edad:31, activo:true } }
export function cumplirAniosEnRegistro(reg: Registro, id: string): Registro {
  const u = reg[id] // Definimos que u será el usuario con ese id
  if (!u) {
    return reg // Si no existe, no hacemos nada. Retorna el registro tal cual
  }
  return { ...reg, [id]: { ...u, edad: u.edad + 1 } } // Si existe, cambiamos la edad creando un nuevo objeto con la edad +1
}
cumplirAniosEnRegistro({ u1: { nombre: "Ana", edad: 30, activo: true } }, "u1") // { u1: { nombre:"Ana", edad:31, activo:true } }
cumplirAniosEnRegistro({ u1: { nombre: "Nico", edad: 23, activo: true } }, "u2") // { u1: { nombre:"Nico", edad:23, activo:true } } // Como el parámetro id no existe, no cambia el registro

// 5) ✏️ `renombrarEnRegistro` cambia SOLO el nombre del usuario en ese id, por el
//    `nuevoNombre`. Mismo esquema (guard + spread anidado + [id]).
//      renombrarEnRegistro({ u1: {nombre:"Ana",edad:30,activo:true} }, "u1", "Eva")
//        → { u1: { nombre:"Eva", edad:30, activo:true } }
export function renombrarEnRegistro(reg: Registro, id: string, nuevoNombre: string): Registro {
  const u = reg[id]
  if (!u) {
    return reg // Si no coincide, no hacemos nada. Retorna el registro tal cual
  }
  return { ...reg, [id]: { ...u, nombre: nuevoNombre } }
}
renombrarEnRegistro({ u1: { nombre: "Ana", edad: 30, activo: true } }, "u1", "Eva") // { u1: { nombre:"Eva", edad:30, activo:true } } // Cambiamos el nombre
renombrarEnRegistro({ u1: { nombre: "Nico", edad: 23, activo: true } }, "u2", "Matías") // { u1: { nombre:"Nico", edad:23, activo:true } } // Como el parámetro id no existe, no cambia el registro

/* ── Bloque D3: capstone carrito (patrón real e-commerce) ─────────────────── */

// 6) ➕ `incrementarCantidad` recibe un carrito (array de items) y un id. Devuelve
//    un carrito nuevo donde SOLO ese item tiene `cantidad` +1. (Array → map, con
//    el patrón de adentro de siempre.)
//      incrementarCantidad([{id:"a",nombre:"Lápiz",cantidad:1}], "a")
//        → [{id:"a",nombre:"Lápiz",cantidad:2}]
export function incrementarCantidad(carrito: ItemCarrito[], id: string): ItemCarrito[] {
  return (
    carrito.map((item) => {
      if (item.id === id) {
        return { ...item, cantidad: item.cantidad + 1 }
      }
      return item
    })
  )
}
incrementarCantidad([{ id: "1", nombre: "Coca Cola", cantidad: 1 }], "1") // → [{ id:"1",nombre:"Coca Cola",cantidad:2" }])

// 7) 🐷🐷 CAPSTONE — `quitarUnaUnidad` baja en 1 la `cantidad` del item con ese
//    id; y si esa cantidad llega a 0, el item DESAPARECE del carrito. Combina las
//    dos herramientas inmutables: `.map` para bajar la cantidad, y `.filter` para
//    dejar fuera los que quedaron en 0. No mutes nada.
//      quitarUnaUnidad([{id:"a",nombre:"Lápiz",cantidad:2}], "a")
//        → [{id:"a",nombre:"Lápiz",cantidad:1}]
//      quitarUnaUnidad([{id:"a",nombre:"Lápiz",cantidad:1}], "a")
//        → []   (llegó a 0 → se elimina)
export function quitarUnaUnidad(carrito: ItemCarrito[], id: string): ItemCarrito[] {
  return (
    carrito
      .map((item) => item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item)
      .filter((item) => item.cantidad > 0)
  )
}
quitarUnaUnidad([{ id: "a", nombre: "Lápiz", cantidad: 2 }], "a") // → [{ id:"a",nombre:"Lápiz",cantidad:1 }]
quitarUnaUnidad([{ id: "a", nombre: "Lápiz", cantidad: 1 }], "a") // → []
quitarUnaUnidad([{ id: "a", nombre: "Lápiz", cantidad: 0 }], "a") // → []


/* ═══════════════════════════════════════════════════════════════════════════
 * ▸ BLOQUE E — REFUERZO `.map` + `.filter` ENCADENADOS  (raíz del drill 7)
 * ═══════════════════════════════════════════════════════════════════════════
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
 * 🔗 ENCADENAR = dos estaciones, una tras otra. El `.filter` se pega con un punto
 *   al resultado del `.map` (saltos de línea libres, el `.` es quien conecta):
 *
 *     arr
 *       .map((x) => ...)      // estación 1: transforma TODOS
 *       .filter((x) => ...)   // estación 2: sobre lo que salió, decide quién queda
 *
 *   Orden obligatorio cuando el filtro mira un valor que el map acaba de crear:
 *   el `0` (o la vida en 0) NO existe antes del map → el filter va SIEMPRE al final.
 *
 * ▸ Escalera: E1–E2 aíslan `.filter`; E3 aísla `.map`; E4–E6 los encadenan.
 *   Reglas de siempre: ❌ nada de `any`/mutación; ✅ copias nuevas.
 *     pnpm test:run src/exercises/04-objetos/exercise-03.test.ts
 * ═══════════════════════════════════════════════════════════════════════════*/

type Enemigo = { id: string; nombre: string; vida: number }


/* ── E1–E2: AÍSLA `.filter` (tu función devuelve true/false → conserva/descarta) */

// E1) 🟢 `soloActivos` devuelve un array nuevo SOLO con los usuarios que tienen
//   `activo === true`. (filter puro: el campo `activo` YA es un booleano, así que
//   tu función de adentro puede devolverlo tal cual.)
//     soloActivos([{...activo:true},{...activo:false}]) → [{...activo:true}]
export function soloActivos(usuarios: Usuario[]): Usuario[] {
  return usuarios // ← provisional. .filter((u) => ...)  ¿qué booleano devuelves?
}

// E2) 📦 `conStock` devuelve SOLO los productos con `stock` mayor que 0.
//   (filter con comparación: `stock > 0` ya da true/false por sí solo.)
//     conStock([{...stock:3},{...stock:0}]) → [{...stock:3}]
export function conStock(productos: Producto[]): Producto[] {
  return productos // ← provisional. .filter((p) => ...)
}


/* ── E3: AÍSLA `.map` (devuelve un VALOR → mismo largo, NADA de filter) ─────── */

// E3) ✖️2 `duplicarPrecios` devuelve productos nuevos con el `precio` x2. Misma
//   cantidad de productos, cada uno transformado. (Sin filter: aquí no se elimina
//   a nadie, solo se transforma. Patrón de adentro: { ...p, precio: ... }.)
//     duplicarPrecios([{...precio:100},{...precio:50}]) → [{...precio:200},{...precio:100}]
export function duplicarPrecios(productos: Producto[]): Producto[] {
  return productos // ← provisional. .map((p) => ({ ...p, precio: ... }))
}


/* ── E4–E6: ENCADENA `.map(...).filter(...)` ──────────────────────────────── */

// E4) 💸🧹 `rebajarYdepurar` le resta `monto` al `precio` de CADA producto, y luego
//   deja fuera los que quedaron en 0 o menos. (map baja el precio de todos →
//   filter conserva precio > 0. El precio rebajado solo existe DESPUÉS del map,
//   por eso el filter va al final.)
//     rebajarYdepurar([{...precio:100},{...precio:30}], 50) → [{...precio:50}]
//       (el de 30 queda en -20 → se cae)
export function rebajarYdepurar(productos: Producto[], monto: number): Producto[] {
  return productos // ← provisional. .map(bajar precio).filter(precio > 0)
}

// E5) ⚔️ `recibirDanio` le resta `dano` de `vida` SOLO al enemigo con ese `id`
//   (el resto intacto), y si algún enemigo queda con `vida` 0 o menos, DESAPARECE.
//   (Es el patrón EXACTO del drill 7 con otro disfraz: map + ternario para pegarle
//   solo al que coincide, filter para barrer a los caídos.)
//     recibirDanio([{id:"a",nombre:"Orco",vida:10}], "a", 3)  → [{...vida:7}]
//     recibirDanio([{id:"a",nombre:"Orco",vida:3}],  "a", 3)  → []  (cayó)
export function recibirDanio(enemigos: Enemigo[], id: string, dano: number): Enemigo[] {
  return enemigos // ← provisional. .map(restar vida al que coincide).filter(vida > 0)
}

// E6) 🛒 CAPSTONE `depurarCarrito` le resta 1 de `cantidad` a CADA item del carrito
//   y elimina los que llegaron a 0. (Como `quitarUnaUnidad`, pero aplicado a TODOS
//   a la vez: aquí el map NO necesita ternario porque tocas a todos por igual.)
//     depurarCarrito([{...cantidad:2},{...cantidad:1}]) → [{...cantidad:1}]
//       (el de 1 baja a 0 → se cae)
export function depurarCarrito(carrito: ItemCarrito[]): ItemCarrito[] {
  return carrito // ← provisional. .map(bajar cantidad de TODOS).filter(cantidad > 0)
}
