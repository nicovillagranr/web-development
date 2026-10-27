/* =============================================================================
 * EJERCICIO 02 — actualización inmutable de objetos con spread { ...obj, … } · bloque 04
 *
 * 📌 RECORDATORIO — los tres primos de Object, sobre obj = { a: 1, b: 5, c: 3 }:
 * Object.keys(obj)    → ["a", "b", "c"]: los nombres (siempre strings)
 * Object.values(obj)  → [1, 5, 3]: los valores
 * Object.entries(obj) → [["a", 1], ["b", 5], ["c", 3]]: los pares [nombre, valor]
 *
 * 🎯 OBJETIVOS
 * · Devolver un objeto nuevo con un cambio, sin tocar el original.
 * · Poner el spread primero y el cambio después, calculando el valor nuevo del viejo.
 *
 * 🟢 CONTEXTO — en 03-arrays/exercise-03 (drill 10, el capstone de reduce) apareció
 * return { ...acum, pares: acum.pares + 1 }, y costó leerlo. Aquí se aísla ese
 * patrón en 7 drills cortos. Es de los más usados en React (así se actualiza el
 * estado), así que vale oro tenerlo en los dedos.
 *
 * 🗺️ MAPA
 * TEORÍA · copiar y pisar con spread → base de todo el archivo
 * BLOQUE A · copiar y pisar una propiedad → drills 1–3
 * BLOQUE B · otros tipos de cambio → drills 4–6
 * BLOQUE C · capstone: el patrón dentro de un reduce → drill 7
 *
 * ▸ 7 drills en orden. Prohibidos any, as X y mutar el parámetro (nada de
 * obj.prop = …): devuelve siempre un objeto nuevo con { ...obj, … }.
 * pnpm test:run src/exercises/04-objetos/exercise-02.test.ts
 * pnpm typecheck
 *
 * Cada cuerpo provisional está mal a propósito (devuelve el objeto sin cambiar, o
 * un valor cualquiera): arréglalo y corre el test.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — copiar y pisar con spread
 *
 * DEFINICIÓN
 * En { ...obj, prop: nuevoValor }, el spread copia todo lo que había, y la
 * propiedad que escribes después pisa la copia. El original nunca se modifica.
 *
 * 🗣️ LAS PIEZAS — en { ...obj, pares: obj.pares + 1 }:
 * ...obj               → trae todas las propiedades que ya tenía obj
 * pares: obj.pares + 1 → pisa solo la propiedad pares
 * lo que no mencionas  → viaja intacto dentro del ...obj
 *
 * Ejemplos, con obj = { pares: 2, impares: 1 }:
 * { ...obj, pares: 3 } → { pares: 3, impares: 1 }: ✅ tu 3 pisa al 2
 * { pares: 3, ...obj } → { pares: 2, impares: 1 }: ❌ el ...obj pisa tu 3
 *
 * 🧠 ANALOGÍA — copiar una bandeja de almuerzo: para no ensuciar la original, coges
 * una bandeja nueva, vuelcas todo lo de la vieja (...obj), y encima de un
 * compartimento pones otra cosa (prop: nuevoValor).
 *
 * ⚠️ TRAMPA — obj.edad = obj.edad + 1; return obj muta el original, y está
 * prohibido. return { ...obj, edad: obj.edad + 1 } da una copia nueva y deja el
 * original intacto.
 *
 * 💡 Con una llave repetida gana la última: el spread va primero, el cambio
 * después. Y obj.edad + 1 no modifica obj.edad: solo lee cuánto vale ahora, le
 * suma 1, y ese número nuevo es el que metes en la copia.
 * ───────────────────────────────────────────────────────────────────────────── */

type Usuario = { nombre: string; edad: number; activo: boolean };
type Producto = { nombre: string; precio: number; stock: number };

/* ▸ BLOQUE A — copiar y pisar una propiedad */

/* 1) 📋 Copiar. copiarUsuario devuelve una copia del usuario, sin cambiar nada
 * (solo el spread). Debe ser un objeto nuevo, no el mismo (===) de entrada.
 *   copiarUsuario({ nombre: "Ana", edad: 30, activo: true })
 *     → { nombre: "Ana", edad: 30, activo: true }   (otro objeto distinto)
 */
export function copiarUsuario(u: Usuario): Usuario {
  // Se copia todo lo que tiene Usuario en un nuevo objeto, y se devuelve ese nuevo objeto.
  return { ...u };
}

/* 2) ✏️ Renombrar. renombrar copia el usuario y cambia solo nombre por el que
 * llega como argumento. La edad y el activo viajan intactos.
 *   renombrar({ nombre: "Ana", edad: 30, activo: true }, "Eva")
 *     → { nombre: "Eva", edad: 30, activo: true }
 */
export function renombrar(u: Usuario, nuevoNombre: string): Usuario {
  return { ...u, nombre: nuevoNombre };
}
renombrar({ nombre: "Ana", edad: 30, activo: true }, "Eva"); // resultado: { nombre: "Eva", edad: 30, activo: true }

/* 3) 🎂 Cumplir años. cumplirAnios copia el usuario con la edad +1. Este es el
 * patrón del capstone: lee su propia propiedad y le suma 1.
 *   cumplirAnios({ nombre: "Ana", edad: 30, activo: true })
 *     → { nombre: "Ana", edad: 31, activo: true }
 */
export function cumplirAnios(u: Usuario): Usuario {
  return { ...u, edad: u.edad + 1 };
}
cumplirAnios({ nombre: "Ana", edad: 30, activo: true }); // resultado: { nombre: "Ana", edad: 31, activo: true }

/* ▸ BLOQUE B — otros tipos de cambio (booleano, calcular desde lo que había) */

/* 4) 🔌 Desactivar. desactivar copia el usuario con activo en false.
 * desactivar({ nombre: "Ana", edad: 30, activo: true })
 *   → { nombre: "Ana", edad: 30, activo: false }
 */
export function desactivar(u: Usuario): Usuario {
  return { ...u, activo: false };
}

/* 5) 📦 Vender uno. venderUno copia el producto con el stock en uno menos.
 * (mismo patrón que cumplirAnios, pero restando: p.stock - 1)
 *   venderUno({ nombre: "Lápiz", precio: 500, stock: 3 })
 *     → { nombre: "Lápiz", precio: 500, stock: 2 }
 */
export function venderUno(p: Producto): Producto {
  return { ...p, stock: p.stock - 1 };
}

/* 6) 💸 Aplicar IVA. aplicarIva copia el producto con el precio multiplicado por
 * (1 + iva). El iva llega como decimal: 0.19 = 19%. (precio nuevo = calculado
 * a partir del precio que ya tenía.)
 *   aplicarIva({ nombre: "Lápiz", precio: 1000, stock: 3 }, 0.19)
 *     → { nombre: "Lápiz", precio: 1190, stock: 3 }
 */
export function aplicarIva(p: Producto, iva: number): Producto {
  return { ...p, precio: p.precio * (1 + iva) };
}
aplicarIva({ nombre: "Lápiz", precio: 1000, stock: 3 }, 0.19); // resultado: { nombre: "Lápiz", precio: 1190, stock: 3 }
aplicarIva({ nombre: "Goma", precio: 500, stock: 2 }, 0.1); // resultado: { nombre: "Goma", precio: 550, stock: 2 }

/* ▸ BLOQUE C — capstone: el patrón dentro de un reduce (cierra el círculo) */

/* 7) 🐷🐷 Capstone. resumirCompra recorre los productos y devuelve un objeto
 * { total, items } con la suma de precios y cuántos productos hay. El
 * acumulador es un objeto; en cada vuelta copias el acum y actualizas las dos
 * propiedades a la vez (igual que el { ...acum, pares: ... } del ej. 03,
 * pero tocando dos). Inicial: { total: 0, items: 0 }. No mutes el acum.
 *   resumirCompra([
 *     { nombre: "Lápiz", precio: 500, stock: 3 },
 *     { nombre: "Goma",  precio: 300, stock: 1 },
 *   ]) → { total: 800, items: 2 }
 *   resumirCompra([]) → { total: 0, items: 0 }
 */
export function resumirCompra(productos: Producto[]): { total: number; items: number } {
  return productos.reduce(
    (acum, producto) => {
      return {
        total: acum.total + producto.precio,
        items: acum.items + 1,
      };
    },
    { total: 0, items: 0 },
  );
}
resumirCompra([
  { nombre: "Lápiz", precio: 500, stock: 3 },
  { nombre: "Goma", precio: 300, stock: 1 },
]); // resultado: { total: 800, items: 2 }
