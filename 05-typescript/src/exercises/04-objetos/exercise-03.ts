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

