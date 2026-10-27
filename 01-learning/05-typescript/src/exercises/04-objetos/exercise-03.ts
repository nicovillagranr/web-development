/* =============================================================================
 * EJERCICIO 03 — actualización inmutable anidada: en un array o un diccionario · bloque 04
 *
 * 📌 RECORDATORIO — los tres primos de Object, sobre obj = { a: 1, b: 5, c: 3 }:
 * Object.keys(obj)    → ["a", "b", "c"]: los nombres (siempre strings)
 * Object.values(obj)  → [1, 5, 3]: los valores
 * Object.entries(obj) → [["a", 1], ["b", 5], ["c", 3]]: los pares [nombre, valor]
 *
 * 🎯 OBJETIVOS
 * · Actualizar un solo objeto de un array con .map, sin tocar los demás.
 * · Actualizar un objeto de un diccionario con spread + [id], tras descartar el
 *   undefined.
 *
 * 🟢 CONTEXTO — en el 02 actualizabas un objeto suelto con { ...obj, prop: … }. Aquí
 * el objeto vive dentro de una colección (un array de usuarios, o un diccionario
 * por id) y hay que actualizar solo uno sin mutar ni el resto ni la colección. Es
 * el patrón estrella de React: el estado anidado.
 *
 * 🗺️ MAPA
 * TEORÍA · el spread es de un solo piso → base de todo el archivo
 * BLOQUE D1 · el objeto vive en un array: .map → drills 1–3
 * BLOQUE D2 · el objeto vive en un diccionario: spread + [id] → drills 4–5
 * BLOQUE D3 · capstone: el carrito → drills 6–7
 *
 * ▸ 7 drills en orden. Prohibidos any, as X y mutar (ni la colección ni los objetos
 * de dentro: nada de arr[i].x = … ni arr.push(…)). Devuelve copias nuevas con
 * spread, .map o .filter.
 * pnpm test:run src/exercises/04-objetos/exercise-03.test.ts
 * pnpm typecheck
 *
 * Cada cuerpo provisional devuelve la colección sin tocar: arréglalo y corre el test.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — el spread es de un solo piso (shallow)
 *
 * DEFINICIÓN
 * El patrón de dentro, { ...obj, prop: … }, no cambia; lo nuevo es cómo llegar al
 * objeto correcto. { ...x } copia el primer nivel: si dentro hay otra colección,
 * esa se comparte, no se copia de verdad. Para cambiar algo anidado hay que hacer
 * spread en cada piso, desde la raíz hasta el dato que tocas. Los hermanos viajan
 * solos dentro del spread; lo de dentro se copia a mano.
 * ───────────────────────────────────────────────────────────────────────────── */

type Usuario = { nombre: string; edad: number; activo: boolean };
type Producto = { nombre: string; precio: number; stock: number };
type Registro = { [id: string]: Usuario };
type ItemCarrito = { id: string; nombre: string; cantidad: number };

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE D1 — el objeto vive en un array: .map para elegir cuál
 *
 * No mutes el array: recórrelo con .map, y solo al que cumple la condición le
 * aplicas el patrón; al resto lo devuelves intacto.
 *
 * SINTAXIS
 * usuarios.map((u) =>
 *   u.nombre === nombre
 *     ? { ...u, edad: u.edad + 1 } // el mismo patrón del 02
 *     : u,                         // los demás viajan intactos
 * )
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) 🎂 cumplirAniosDe recibe un array de usuarios y un nombre, y devuelve un
 * array nuevo donde solo el usuario con ese nombre tiene la edad +1. El resto
 * igual. (Pista: map + ternario; el que no coincide se devuelve tal cual.)
 *   cumplirAniosDe([{nombre:"Ana",edad:30,activo:true},
 *                   {nombre:"Eva",edad:25,activo:true}], "Ana")
 *     → [{nombre:"Ana",edad:31,...}, {nombre:"Eva",edad:25,...}]
 */
export function cumplirAniosDe(usuarios: Usuario[], nombre: string): Usuario[] {
  return usuarios.map((u) => {
    if (u.nombre === nombre) {
      return { ...u, edad: u.edad + 1 };
    }
    return u;
  });
}
cumplirAniosDe(
  [
    { nombre: "Ana", edad: 30, activo: true },
    { nombre: "Eva", edad: 25, activo: true },
  ],
  "Ana",
); // A Ana se le suma 1 a la edad porque la condicion se cumple

/* 2) 🔌 desactivarA devuelve un array nuevo donde solo el usuario con ese
 * nombre queda con activo: false. El resto intacto.
 *   desactivarA([{nombre:"Ana",edad:30,activo:true}], "Ana")
 *     → [{nombre:"Ana",edad:30,activo:false}]
 */
export function desactivarA(usuarios: Usuario[], nombre: string): Usuario[] {
  return usuarios.map((u) => {
    if (u.nombre === nombre) {
      return { ...u, activo: false };
    }
    return u;
  });
}

/* 3) 💸 subirPrecio recibe productos, un nombre y un monto. Devuelve un array
 * nuevo donde solo ese producto tiene precio aumentado en monto.
 *   subirPrecio([{nombre:"Lápiz",precio:500,stock:3}], "Lápiz", 100)
 *     → [{nombre:"Lápiz",precio:600,stock:3}]
 */
export function subirPrecio(productos: Producto[], nombre: string, monto: number): Producto[] {
  return productos.map((p) => {
    if (p.nombre === nombre) {
      return { ...p, precio: p.precio + monto };
    }
    return p;
  });
}
subirPrecio([{ nombre: "Lápiz", precio: 500, stock: 3 }], "Lápiz", 100); // Lápiz a $600
subirPrecio([{ nombre: "Tijeras", precio: 1000, stock: 2 }], "Tijeras", 200); // Tijeras a $1200

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE D2 — el objeto vive en un diccionario: spread + [id] (¡y guard!)
 *
 * Los objetos viven bajo una llave, su id, y el spread va en dos pisos.
 *
 * SINTAXIS
 * {
 *   ...reg,                           // piso 1: copia todas las llaves
 *   [id]: { ...u, edad: u.edad + 1 }, // piso 2: pisa solo esa llave
 * }
 *
 * 🗣️ LAS PIEZAS
 * [id]:   → llave calculada: la propiedad cuyo nombre está en la variable id
 *           (si id vale "u2", pisa la llave "u2")
 * reg[id] → acceder a uno, igual que arr[i] pero por nombre
 *
 * ⚠️ TRAMPA — con noUncheckedIndexedAccess, reg[id] es Usuario | undefined (la
 * llave podría no existir), así que no puedes hacer reg[id].edad directo.
 * Guárdalo y descarta el undefined con tu narrowing:
 * const u = reg[id]
 * if (!u) return reg // si esa llave no existe, no hay qué tocar
 * return { ...reg, [id]: { ...u, edad: u.edad + 1 } }
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) 🎂 cumplirAniosEnRegistro recibe un registro (objeto de usuarios por id) y
 * un id. Devuelve un registro nuevo con la edad de ese usuario +1. Recuerda:
 * reg[id] es Usuario | undefined → guárdalo y descarta el undefined antes.
 * Si el id no existe, devuelve el registro sin cambios.
 *   cumplirAniosEnRegistro({ u1: {nombre:"Ana",edad:30,activo:true} }, "u1")
 *     → { u1: { nombre:"Ana", edad:31, activo:true } }
 */
export function cumplirAniosEnRegistro(reg: Registro, id: string): Registro {
  const u = reg[id]; // Definimos que u será el usuario con ese id
  if (!u) {
    return reg; // Si no existe, no hacemos nada. Retorna el registro tal cual
  }
  return { ...reg, [id]: { ...u, edad: u.edad + 1 } }; // Si existe, cambiamos la edad creando un nuevo objeto con la edad +1
}
cumplirAniosEnRegistro({ u1: { nombre: "Ana", edad: 30, activo: true } }, "u1"); // { u1: { nombre:"Ana", edad:31, activo:true } }
cumplirAniosEnRegistro({ u1: { nombre: "Nico", edad: 23, activo: true } }, "u2"); // { u1: { nombre:"Nico", edad:23, activo:true } } // Como el parámetro id no existe, no cambia el registro

/* 5) ✏️ renombrarEnRegistro cambia solo el nombre del usuario en ese id, por el
 * nuevoNombre. Mismo esquema (guard + spread anidado + [id]).
 *   renombrarEnRegistro({ u1: {nombre:"Ana",edad:30,activo:true} }, "u1", "Eva")
 *     → { u1: { nombre:"Eva", edad:30, activo:true } }
 */
export function renombrarEnRegistro(reg: Registro, id: string, nuevoNombre: string): Registro {
  const u = reg[id];
  if (!u) {
    return reg; // Si no coincide, no hacemos nada. Retorna el registro tal cual
  }
  return { ...reg, [id]: { ...u, nombre: nuevoNombre } };
}
renombrarEnRegistro({ u1: { nombre: "Ana", edad: 30, activo: true } }, "u1", "Eva"); // { u1: { nombre:"Eva", edad:30, activo:true } } // Cambiamos el nombre
renombrarEnRegistro({ u1: { nombre: "Nico", edad: 23, activo: true } }, "u2", "Matías"); // { u1: { nombre:"Nico", edad:23, activo:true } } // Como el parámetro id no existe, no cambia el registro

/* ▸ BLOQUE D3 — capstone: el carrito (patrón real de e-commerce) */

/* 6) ➕ incrementarCantidad recibe un carrito (array de items) y un id. Devuelve
 * un carrito nuevo donde solo ese item tiene cantidad +1. (Array → map, con
 * el patrón de adentro de siempre.)
 *   incrementarCantidad([{id:"a",nombre:"Lápiz",cantidad:1}], "a")
 *     → [{id:"a",nombre:"Lápiz",cantidad:2}]
 */
export function incrementarCantidad(carrito: ItemCarrito[], id: string): ItemCarrito[] {
  return carrito.map((item) => {
    if (item.id === id) {
      return { ...item, cantidad: item.cantidad + 1 };
    }
    return item;
  });
}
incrementarCantidad([{ id: "1", nombre: "Coca Cola", cantidad: 1 }], "1"); // → [{ id:"1",nombre:"Coca Cola",cantidad:2" }])

/* 7) 🐷🐷 Capstone — quitarUnaUnidad baja en 1 la cantidad del item con ese
 * id; y si esa cantidad llega a 0, el item desaparece del carrito. Combina las
 * dos herramientas inmutables: .map para bajar la cantidad, y .filter para
 * dejar fuera los que quedaron en 0. No mutes nada.
 *   quitarUnaUnidad([{id:"a",nombre:"Lápiz",cantidad:2}], "a")
 *     → [{id:"a",nombre:"Lápiz",cantidad:1}]
 *   quitarUnaUnidad([{id:"a",nombre:"Lápiz",cantidad:1}], "a")
 *     → []   (llegó a 0 → se elimina)
 */
export function quitarUnaUnidad(carrito: ItemCarrito[], id: string): ItemCarrito[] {
  return carrito
    .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item))
    .filter((item) => item.cantidad > 0);
}
quitarUnaUnidad([{ id: "a", nombre: "Lápiz", cantidad: 2 }], "a"); // → [{ id:"a",nombre:"Lápiz",cantidad:1 }]
quitarUnaUnidad([{ id: "a", nombre: "Lápiz", cantidad: 1 }], "a"); // → []
quitarUnaUnidad([{ id: "a", nombre: "Lápiz", cantidad: 0 }], "a"); // → []
