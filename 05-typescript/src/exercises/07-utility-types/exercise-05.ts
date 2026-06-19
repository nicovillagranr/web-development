/* =============================================================================
 * EJERCICIO 05 — REFUERZO del drill 5 de exercise-04:
 *                "aplicar una LISTA de parches parciales, en orden"
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE ARCHIVO
 * ----------------------------------------------------------------------------
 * El drill 5 (`aplicarCambios`) junta DOS cosas a la vez y por eso marea:
 *   (1) una LISTA de parches `Partial<T>[]` que se aplican uno tras otro, y
 *   (2) hacerlo con `reduce`.
 * Aquí las separamos y subimos en escalera. Empezamos por lo MÁS concreto
 * (aplicar parches a mano, sin bucle), luego con un `for` (que ya dominas), y
 * SOLO al final con `reduce`. Mismo problema, resuelto 3 veces.
 *
 *
 * ▸ RECORDATORIO DE VOCABULARIO (tu duda de hoy)
 * ----------------------------------------------------------------------------
 *   parches: Partial<Punto>[]
 *   ▲        ▲              ▲▲
 *   │        │              │└─ los `[]` = "una LISTA de"
 *   │        │              └── `Partial<Punto>` = el TIPO de cada elemento
 *   │        └───────────────── utility type `Partial` aplicado a `Punto`
 *   └────────────────────────── el PARÁMETRO (su nombre)
 *
 * Se lee: "`parches` es una lista de parches parciales de Punto".
 * Cada elemento es un objeto con ALGUNAS propiedades de Punto (puede traer
 * solo `x`, solo `y`, las dos, o ninguna). NO puede traer llaves nuevas.
 *
 *
 * ▸ LA IDEA DE FONDO — "acumular sobre una base"
 * ----------------------------------------------------------------------------
 * Tienes un objeto BASE y una lista de PARCHES. Quieres aplicar los parches uno
 * encima de otro, en orden, sobre la base. Cada parche pisa lo que toca; lo que
 * no toca, se queda como estaba. Si dos parches tocan la misma propiedad, gana
 * el ÚLTIMO (es el orden del spread: lo que va después pisa).
 *
 *     base = { x: 0, y: 0 }
 *     parches = [ {x: 5}, {y: 9} ]
 *
 *     paso 0 (base):        { x: 0, y: 0 }
 *     paso 1 (aplico {x:5}): { x: 5, y: 0 }   ← x pisada, y intacta
 *     paso 2 (aplico {y:9}): { x: 5, y: 9 }   ← y pisada, x se mantiene
 *     resultado:             { x: 5, y: 9 }
 *
 * La clave: hay UN objeto "que va quedando" y se va pisando vuelta a vuelta.
 * Esa cosa que SOBREVIVE de un paso al siguiente es el ACUMULADOR.
 *
 *
 * ▸ EJERCICIO — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as`.
 * ----------------------------------------------------------------------------
 * Cada starter va MAL a propósito (tipo demasiado estricto + cuerpo que ignora
 * los parches) → typecheck Y test ROJOS. Arregla las DOS cosas. Corre el test
 * tras cada drill:
 *     pnpm test:run src/exercises/07-utility-types/exercise-05.test.ts
 * ===========================================================================*/


type Punto = { x: number; y: number }

/* ---------------------------------------------------------------------------
 * BLOQUE A — entender el MERGE encadenado (sin bucle todavía)
 * ---------------------------------------------------------------------------
 * Antes de meter listas y bucles, mira el merge a pelo: aplicar DOS parches a
 * mano, uno tras otro. Aquí no hay magia: es spread sobre spread.
 * -------------------------------------------------------------------------- */

// 1) `aplicarDosParches` — recibe una base y DOS parches sueltos. Devuelve la
//    base con `p1` encima y `p2` encima de eso (p2 gana si chocan).
//    👉 Dos arreglos: el tipo de `p1`/`p2` (ahora exigen un Punto ENTERO) y el
//       cuerpo (ahora devuelve la base sin tocar). Recuerda: lo que va DESPUÉS pisa.
//      aplicarDosParches({x:0,y:0}, {x:5}, {y:9}) → {x:5,y:9}
//      aplicarDosParches({x:0,y:0}, {x:1}, {x:2}) → {x:2,y:0}  (gana el último)
export function aplicarDosParches(base: Punto, p1: Partial<Punto>, p2: Partial<Punto>): Punto {
  return { ...base, ...p1, ...p2 }
}
aplicarDosParches({ x: 0, y: 0 }, { x: 5 }, { y: 9 }) // {x:5,y:9}


/* ---------------------------------------------------------------------------
 * BLOQUE B — generalizar a N parches con un bucle `for`
 * ------------------------------------------------------------------------3---
 * Con 2 parches los escribes a mano (`...p1, ...p2`). Pero si la lista trae 5,
 * o no sabes cuántos, NO puedes escribirlos uno a uno → necesitas un bucle.
 *
 * El patrón con `for...of` (lo que ya dominas de exercise-03):
 *
 *     let resultado = base                 // arranca en la base
 *     for (const parche of parches) {      // recorre cada parche
 *       resultado = { ...resultado, ...parche }   // pisa lo que va quedando
 *     }
 *     return resultado                     // FUERA del bucle: se devuelve 1 vez
 *
 * `resultado` es la variable que SOBREVIVE de una vuelta a la siguiente.
 * -------------------------------------------------------------------------- */

// 2) `fusionarConFor` — aplica TODA la lista de parches sobre la base, con un
//    bucle `for`. Lista vacía → la base tal cual.
//    👉 Dos arreglos: el tipo de `parches` (ahora exige Puntos ENTEROS) y el
//       cuerpo (ahora devuelve la base sin recorrer nada).
//      fusionarConFor({x:0,y:0}, [{x:5},{y:9}]) → {x:5,y:9}
//      fusionarConFor({x:1,y:1}, [])            → {x:1,y:1}
//      fusionarConFor({x:0,y:0}, [{x:1},{x:2}]) → {x:2,y:0}  (gana el último)
export function fusionarConFor(base: Punto, parches: Partial<Punto>[]): Punto {
  let resultado = base
  for (const parche of parches) {
    resultado = { ...resultado, ...parche }
  }
  return resultado
}
fusionarConFor({ x: 0, y: 0 }, [{ x: 5 }, { y: 9 }, { x: 1 }, { x: 2 }, { x: 3 }]) // {x:3,y:9} Gana el último X y el último Y en ser definidos.

type Caja = { ancho: number; alto: number; color: string }

// 3) `fusionarCajasConFor` — el MISMO patrón, otro tipo (refuerzo). Fíjate en
//    el caso de dos parches que tocan `color`: gana el segundo.
//      fusionarCajasConFor({ancho:10,alto:5,color:"rojo"}, [{alto:8},{color:"azul"}]) → {ancho:10,alto:8,color:"azul"}
//      fusionarCajasConFor(caja, [{color:"rojo"},{color:"azul"}]) → color "azul"
export function fusionarCajasConFor(base: Caja, parches: Partial<Caja>[]): Caja {
  let resultado = base
  for (const parche of parches) {
    resultado = { ...resultado, ...parche }
  }
  return resultado
}
// Resultado: {ancho: 20, alto: 20, color: "Verde"}
fusionarCajasConFor({ ancho: 10, alto: 10, color: "Azul" }, [{ ancho: 20 }, { alto: 20 }, { color: "Rojo" }, { color: "Verde" }])

/* ---------------------------------------------------------------------------
 * BLOQUE C — el MISMO problema con `reduce`
 * ---------------------------------------------------------------------------
 * `reduce` es el bucle `for` de arriba EMPAQUETADO. La traducción pieza a pieza:
 *
 *     let resultado = base            →   ...el valor INICIAL del reduce (2º arg)
 *     for (const parche of parches)   →   reduce recorre la lista por ti
 *     resultado = {...resultado,...p} →   lo que DEVUELVES en el callback
 *     return resultado                →   lo que reduce te entrega al final
 *
 *     parches.reduce<Punto>((acum, parche) => ({ ...acum, ...parche }), base)
 *             ▲             ▲                   ▲                        ▲
 *             │             │                   │                        └─ inicial = base
 *             │             │                   └─ DEVUELVE el acum del turno siguiente
 *             │             └─ acum = lo que va quedando; parche = el de esta vuelta
 *             └─ <Punto>: el array es Partial<Punto>, pero el acum debe ser Punto.
 *                Como NO coinciden, hay que forzar el tipo a mano (regla del campeón).
 * -------------------------------------------------------------------------- */

// 4) `fusionarConReduce` — IDÉNTICO al drill 2, pero con `reduce` en vez de `for`.
//    👉 Tres arreglos: el tipo de `parches`, el cuerpo (usa `reduce`), y NO
//       olvides el VALOR INICIAL (`base`) ni el `<Punto>` explícito.
//      fusionarConReduce({x:0,y:0}, [{x:5},{y:9}]) → {x:5,y:9}
//      fusionarConReduce({x:1,y:1}, [])            → {x:1,y:1}
export function fusionarConReduce(base: Punto, parches: Partial<Punto>[]): Punto {
  return parches.reduce<Punto>((acum, parche) => ({ ...acum, ...parche }), base)
}
// Resultado: {x:69,y:9}
fusionarConReduce({ x: 0, y: 0 }, [{ x: 5 }, { x: 9 }, { x: 69 }, { y: 9 }])

// 5) `fusionarCajasConReduce` — el gemelo del drill 3, ahora con `reduce`.
//      fusionarCajasConReduce({ancho:10,alto:5,color:"rojo"}, [{alto:8},{color:"azul"}])
//        → {ancho:10,alto:8,color:"azul"}
export function fusionarCajasConReduce(base: Caja, parches: Partial<Caja>[]): Caja {
  return parches.reduce<Caja>((acum, parche) => ({ ...acum, ...parche }), base)
}
// Resultado: {ancho: 10, alto: 8, color: "azul"}
fusionarCajasConReduce({ ancho: 10, alto: 5, color: "rojo" }, [{ alto: 8 }, { color: "azul" }])

/* ---------------------------------------------------------------------------
 * BLOQUE D — CAPSTONE: el gemelo EXACTO del drill 5 de exercise-04
 * ---------------------------------------------------------------------------
 * Mismo cuerpo que el drill 4, otro tipo. Si este te sale solo, el drill 5 de
 * exercise-04 ya lo entiendes (es palabra por palabra lo mismo).
 * -------------------------------------------------------------------------- */

type Usuario = { id: number; nombre: string; email: string }

// 6) `aplicarParches` — parte de un usuario y aplica EN ORDEN una lista de
//    parches parciales, cada uno encima del resultado anterior.
//      aplicarParches({id:1,nombre:"Ana",email:"a@a.com"}, [{nombre:"Ani"},{email:"x@x.com"}])
//        → {id:1,nombre:"Ani",email:"x@x.com"}
//      aplicarParches(u, []) → u (sin cambios)
export function aplicarParches(usuario: Usuario, parches: Partial<Usuario>[]): Usuario {
  return parches.reduce<Usuario>((acum, parche) => ({ ...acum, ...parche }), usuario)
}
// Resultado: {id:1,nombre:"Ani",email:"x@x.com"}
aplicarParches({ id: 1, nombre: 'Ana', email: 'a@a.com' }, [{ nombre: 'Ani' }, { email: 'x@x.com' }])
