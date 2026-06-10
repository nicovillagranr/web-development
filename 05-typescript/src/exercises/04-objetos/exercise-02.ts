/* =============================================================================
 * EJERCICIO 02 — Actualización INMUTABLE de objetos con spread `{ ...obj, ... }`
 * =============================================================================
 *
 * ▸ CONTEXTO
 * ----------------------------------------------------------------------------
 * En `03-arrays/exercise-03` (drill 10, el capstone de `reduce`) apareció esta
 * línea y costó leerla:
 *
 *     return { ...acum, pares: acum.pares + 1 }
 *
 * Aquí aislamos ESE patrón en 7 drills cortos: copiar un objeto y devolver uno
 * NUEVO con algún cambio, SIN tocar el original. Es uno de los patrones más
 * usados en React (así se actualiza el estado), así que vale oro tenerlo en los
 * dedos.
 *
 * ▸ OBJETIVO TÉCNICO
 * ----------------------------------------------------------------------------
 * Entender `{ ...obj, prop: nuevoValor }`: el spread copia TODO lo que había, y
 * la propiedad que escribes DESPUÉS pisa la copia. El original nunca se modifica.
 *
 *
 * ════════════════════════════════════════════════════════════════════════════
 * ▸ EXPLICACIÓN — leer ANTES de tocar los drills
 * ════════════════════════════════════════════════════════════════════════════
 *
 * 🍱 LA ANALOGÍA: COPIAR UNA BANDEJA DE ALMUERZO
 * ----------------------------------------------------------------------------
 * Un objeto es una bandeja con compartimentos (las propiedades). No quieres
 * ensuciar la bandeja original, así que coges una bandeja NUEVA vacía y:
 *
 *     1º vuelcas TODO lo de la bandeja vieja  → eso es  `...obj`
 *     2º encima de un compartimento, pones otra cosa → eso es `prop: nuevoValor`
 *
 *
 * 1) LA ANATOMÍA
 * ----------------------------------------------------------------------------
 *     { ...obj , pares: obj.pares + 1 }
 *       └──┬─┘    └─────────┬────────┘
 *          │               └── pisa SOLO la propiedad `pares`
 *          └── copia aquí dentro TODAS las propiedades de `obj`
 *
 *   • `...obj`  = "trae todas las propiedades que ya tenía obj".
 *   • lo que escribes DESPUÉS con el mismo nombre = gana, pisa a la copia.
 *   • las propiedades que NO mencionas viajan intactas dentro del `...obj`.
 *
 *
 * 2) EL ORDEN MANDA (cuando hay llave repetida, gana la ÚLTIMA)
 * ----------------------------------------------------------------------------
 *   obj = { pares: 2, impares: 1 }
 *
 *   { ...obj, pares: 3 }   → { pares: 3, impares: 1 }   ✅ tu 3 pisa al 2
 *   { pares: 3, ...obj }   → { pares: 2, impares: 1 }   ❌ el ...obj pisa tu 3
 *
 *   👉 Regla: el spread va PRIMERO, el cambio va DESPUÉS.
 *
 *
 * 3) LEER LA PROPIA PROPIEDAD (`obj.prop + 1`)
 * ----------------------------------------------------------------------------
 *   `obj.edad + 1` NO modifica `obj.edad`. Solo LEE cuánto vale ahora, le suma 1,
 *   y ese número nuevo es el que metes en la copia. El original sigue igual.
 *
 *
 * 4) LO QUE NO HAY QUE HACER (mutar)
 * ----------------------------------------------------------------------------
 *   ❌ obj.edad = obj.edad + 1; return obj   → ESTO MUTA el original. Prohibido.
 *   ✅ return { ...obj, edad: obj.edad + 1 } → copia nueva, original intacto.
 *
 *
 * ▸ DRILLS — EN ORDEN. Cada cuerpo provisional está MAL a propósito (devuelve el
 *   objeto sin cambiar, o un valor cualquiera): arréglalo y corre el test.
 *     pnpm test:run src/exercises/04-objetos/exercise-02.test.ts
 *   Reglas: ❌ nada de `any`, ❌ nada de `as X`, ❌ NO MUTES el parámetro (nada de
 *   `obj.prop = ...`), ✅ devuelve SIEMPRE un objeto nuevo con `{ ...obj, ... }`.
 * ═══════════════════════════════════════════════════════════════════════════*/


type Usuario = { nombre: string; edad: number; activo: boolean }
type Producto = { nombre: string; precio: number; stock: number }


/* ── Bloque A: copiar y pisar una propiedad ───────────────────────────────── */

// 1) 📋 COPIAR. `copiarUsuario` devuelve una COPIA del usuario, sin cambiar nada
//    (solo el spread). Debe ser un objeto NUEVO, no el mismo (===) de entrada.
//      copiarUsuario({ nombre: "Ana", edad: 30, activo: true })
//        → { nombre: "Ana", edad: 30, activo: true }   (otro objeto distinto)
export function copiarUsuario(u: Usuario): Usuario {
  // Se copia todo lo que tiene Usuario en un nuevo objeto, y se devuelve ese nuevo objeto.
  return { ...u }
}

// 2) ✏️ RENOMBRAR. `renombrar` copia el usuario y cambia SOLO `nombre` por el que
//    llega como argumento. La edad y el activo viajan intactos.
//      renombrar({ nombre: "Ana", edad: 30, activo: true }, "Eva")
//        → { nombre: "Eva", edad: 30, activo: true }
export function renombrar(u: Usuario, nuevoNombre: string): Usuario {
  return { ...u, nombre: nuevoNombre }
}
renombrar({ nombre: "Ana", edad: 30, activo: true }, "Eva") // resultado: { nombre: "Eva", edad: 30, activo: true }

// 3) 🎂 CUMPLIR AÑOS. `cumplirAnios` copia el usuario con la edad +1. Este es EL
//    patrón del capstone: lee su propia propiedad y le suma 1.
//      cumplirAnios({ nombre: "Ana", edad: 30, activo: true })
//        → { nombre: "Ana", edad: 31, activo: true }
export function cumplirAnios(u: Usuario): Usuario {
  return { ...u, edad: u.edad + 1 }
}
cumplirAnios({ nombre: "Ana", edad: 30, activo: true }) // resultado: { nombre: "Ana", edad: 31, activo: true }

/* ── Bloque B: otros tipos de cambio (booleano, calcular desde lo que había) ── */

// 4) 🔌 DESACTIVAR. `desactivar` copia el usuario con `activo` en false.
//      desactivar({ nombre: "Ana", edad: 30, activo: true })
//        → { nombre: "Ana", edad: 30, activo: false }
export function desactivar(u: Usuario): Usuario {
  return { ...u, activo: false }
}

// 5) 📦 VENDER UNO. `venderUno` copia el producto con el stock en uno MENOS.
//    (mismo patrón que cumplirAnios, pero restando: p.stock - 1)
//      venderUno({ nombre: "Lápiz", precio: 500, stock: 3 })
//        → { nombre: "Lápiz", precio: 500, stock: 2 }
export function venderUno(p: Producto): Producto {
  return { ...p, stock: p.stock - 1 }
}

// 6) 💸 APLICAR IVA. `aplicarIva` copia el producto con el precio multiplicado por
//    (1 + iva). El iva llega como decimal: 0.19 = 19%. (precio nuevo = calculado
//    a partir del precio que YA tenía.)
//      aplicarIva({ nombre: "Lápiz", precio: 1000, stock: 3 }, 0.19)
//        → { nombre: "Lápiz", precio: 1190, stock: 3 }
export function aplicarIva(p: Producto, iva: number): Producto {
  return { ...p, precio: p.precio * (1 + iva) }
}
aplicarIva({ nombre: "Lápiz", precio: 1000, stock: 3 }, 0.19) // resultado: { nombre: "Lápiz", precio: 1190, stock: 3 }
aplicarIva({ nombre: "Goma", precio: 500, stock: 2 }, 0.10) // resultado: { nombre: "Goma", precio: 550, stock: 2 }

/* ── Bloque C: capstone — el patrón DENTRO de un reduce (cierra el círculo) ──── */

// 7) 🐷🐷 CAPSTONE. `resumirCompra` recorre los productos y devuelve un objeto
//    { total, items } con la suma de precios y cuántos productos hay. El
//    acumulador es un OBJETO; en cada vuelta copias el acum y actualizas LAS DOS
//    propiedades a la vez (igual que el `{ ...acum, pares: ... }` del ej. 03,
//    pero tocando dos). Inicial: { total: 0, items: 0 }. No mutes el acum.
//      resumirCompra([
//        { nombre: "Lápiz", precio: 500, stock: 3 },
//        { nombre: "Goma",  precio: 300, stock: 1 },
//      ]) → { total: 800, items: 2 }
//      resumirCompra([]) → { total: 0, items: 0 }
export function resumirCompra(productos: Producto[]): { total: number; items: number } {
  return productos.reduce((acum, producto) => {
    return {
      total: acum.total + producto.precio,
      items: acum.items + 1
    }
  }, { total: 0, items: 0 })
}
resumirCompra([{ nombre: "Lápiz", precio: 500, stock: 3 }, { nombre: "Goma", precio: 300, stock: 1 }]) // resultado: { total: 800, items: 2 }
