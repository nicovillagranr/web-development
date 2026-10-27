/* =============================================================================
 * EJERCICIO 05 — aplicar una lista de parches parciales, en orden · refuerzo del 04
 *
 * 🎯 OBJETIVOS
 * · Leer la firma parches: Partial<Punto>[] pieza a pieza.
 * · Aplicar parches sobre una base a mano, con un for y con reduce.
 *
 * 🟢 CONTEXTO — el drill 5 del 04 (aplicarCambios) junta dos cosas a la vez, y por
 * eso marea: una lista de parches Partial<T>[] que se aplican uno tras otro, y
 * hacerlo con reduce. Aquí se separan: primero a mano, sin bucle; luego con un
 * for, que ya dominas; y solo al final con reduce. Mismo problema, tres veces.
 *
 * 🗺️ MAPA
 * TEORÍA · acumular sobre una base → base de todo el archivo
 * BLOQUE A · el merge encadenado, sin bucle → drill 1
 * BLOQUE B · N parches con un bucle for → drills 2–3
 * BLOQUE C · el mismo problema con reduce → drills 4–5
 * BLOQUE D · capstone: el gemelo del drill 5 del 04 → drill 6
 *
 * ▸ 6 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/07-utility-types/exercise-05.test.ts
 * pnpm typecheck
 *
 * Cada starter va mal a propósito (tipo demasiado estricto + cuerpo que ignora los
 * parches): typecheck y test en rojo. Arregla las dos cosas y corre el test tras
 * cada drill.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — acumular sobre una base
 *
 * DEFINICIÓN
 * Tienes un objeto base y una lista de parches, y los aplicas uno encima de otro,
 * en orden. Cada parche pisa lo que toca; lo que no toca se queda como estaba. Si
 * dos parches tocan la misma propiedad, gana el último: es el orden del spread.
 *
 * Ejemplos, con base { x: 0, y: 0 } y parches [{ x: 5 }, { y: 9 }]:
 * paso 0, la base         → { x: 0, y: 0 }
 * paso 1, aplico { x: 5 } → { x: 5, y: 0 }: x pisada, y intacta
 * paso 2, aplico { y: 9 } → { x: 5, y: 9 }: y pisada, x se mantiene
 *
 * Hay un objeto «que va quedando» y se va pisando vuelta a vuelta. Esa cosa que
 * sobrevive de un paso al siguiente es el acumulador.
 *
 * 🗣️ LAS PIEZAS — parches: Partial<Punto>[] se lee «parches es una lista de
 * parches parciales de Punto»:
 * parches        → el parámetro (su nombre)
 * Partial        → el utility type, aplicado a Punto
 * Partial<Punto> → el tipo de cada elemento
 * []             → «una lista de»
 *
 * Cada elemento trae algunas propiedades de Punto (solo x, solo y, las dos o
 * ninguna). No puede traer llaves nuevas.
 * ───────────────────────────────────────────────────────────────────────────── */

type Punto = { x: number; y: number };

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE A — entender el merge encadenado (sin bucle todavía)
 *
 * Antes de meter listas y bucles, mira el merge a pelo: aplicar dos parches a
 * mano, uno tras otro. Aquí no hay magia: es spread sobre spread.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) aplicarDosParches — recibe una base y dos parches sueltos. Devuelve la
 * base con p1 encima y p2 encima de eso (p2 gana si chocan).
 * 👉 Dos arreglos: el tipo de p1/p2 (ahora exigen un Punto entero) y el
 *    cuerpo (ahora devuelve la base sin tocar). Recuerda: lo que va después pisa.
 *   aplicarDosParches({x:0,y:0}, {x:5}, {y:9}) → {x:5,y:9}
 *   aplicarDosParches({x:0,y:0}, {x:1}, {x:2}) → {x:2,y:0}  (gana el último)
 */
export function aplicarDosParches(base: Punto, p1: Partial<Punto>, p2: Partial<Punto>): Punto {
  return { ...base, ...p1, ...p2 };
}
aplicarDosParches({ x: 0, y: 0 }, { x: 5 }, { y: 9 }); // {x:5,y:9}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE B — generalizar a N parches con un bucle for
 *
 * Con 2 parches los escribes a mano (...p1, ...p2). Pero si la lista trae 5, o no
 * sabes cuántos, no puedes escribirlos uno a uno: necesitas un bucle.
 *
 * SINTAXIS — el patrón con for...of, el del 03:
 * let resultado = base // arranca en la base
 * for (const parche of parches) {
 *   resultado = { ...resultado, ...parche } // pisa lo que va quedando
 * }
 * return resultado // fuera del bucle: se devuelve una vez
 *
 * resultado es la variable que sobrevive de una vuelta a la siguiente.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 2) fusionarConFor — aplica toda la lista de parches sobre la base, con un
 * bucle for. Lista vacía → la base tal cual.
 * 👉 Dos arreglos: el tipo de parches (ahora exige Puntos enteros) y el
 *    cuerpo (ahora devuelve la base sin recorrer nada).
 *   fusionarConFor({x:0,y:0}, [{x:5},{y:9}]) → {x:5,y:9}
 *   fusionarConFor({x:1,y:1}, [])            → {x:1,y:1}
 *   fusionarConFor({x:0,y:0}, [{x:1},{x:2}]) → {x:2,y:0}  (gana el último)
 */
export function fusionarConFor(base: Punto, parches: Partial<Punto>[]): Punto {
  let resultado = base;
  for (const parche of parches) {
    resultado = { ...resultado, ...parche };
  }
  return resultado;
}
fusionarConFor({ x: 0, y: 0 }, [{ x: 5 }, { y: 9 }, { x: 1 }, { x: 2 }, { x: 3 }]); // {x:3,y:9} Gana el último X y el último Y en ser definidos.

type Caja = { ancho: number; alto: number; color: string };

/* 3) fusionarCajasConFor — el mismo patrón, otro tipo (refuerzo). Fíjate en
 * el caso de dos parches que tocan color: gana el segundo.
 *   fusionarCajasConFor({ancho:10,alto:5,color:"rojo"}, [{alto:8},{color:"azul"}]) → {ancho:10,alto:8,color:"azul"}
 *   fusionarCajasConFor(caja, [{color:"rojo"},{color:"azul"}]) → color "azul"
 */
export function fusionarCajasConFor(base: Caja, parches: Partial<Caja>[]): Caja {
  let resultado = base;
  for (const parche of parches) {
    resultado = { ...resultado, ...parche };
  }
  return resultado;
}
// Resultado: {ancho: 20, alto: 20, color: "Verde"}
fusionarCajasConFor({ ancho: 10, alto: 10, color: "Azul" }, [
  { ancho: 20 },
  { alto: 20 },
  { color: "Rojo" },
  { color: "Verde" },
]);

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE C — el mismo problema con reduce
 *
 * reduce es el bucle for de arriba, empaquetado.
 *
 * 🗣️ LAS PIEZAS — la traducción, pieza a pieza:
 * let resultado = base               → el valor inicial del reduce (2º argumento)
 * for (const parche of parches)      → reduce recorre la lista por ti
 * resultado = { ...resultado, ...p } → lo que devuelves en el callback
 * return resultado                   → lo que reduce te entrega al final
 *
 * SINTAXIS
 * parches.reduce<Punto>((acum, parche) => ({ ...acum, ...parche }), base)
 *
 * acum es lo que va quedando; parche, el de esta vuelta; base, el inicial. Lo que
 * el callback devuelve es el acum del turno siguiente.
 *
 * ⚠️ TRAMPA — el <Punto>: el array es Partial<Punto>, pero el acum debe ser Punto.
 * Como no coinciden, hay que forzar el tipo a mano (la regla del campeón).
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) fusionarConReduce — idéntico al drill 2, pero con reduce en vez de for.
 * 👉 Tres arreglos: el tipo de parches, el cuerpo (usa reduce), y no
 *    olvides el valor inicial (base) ni el <Punto> explícito.
 *   fusionarConReduce({x:0,y:0}, [{x:5},{y:9}]) → {x:5,y:9}
 *   fusionarConReduce({x:1,y:1}, [])            → {x:1,y:1}
 */
export function fusionarConReduce(base: Punto, parches: Partial<Punto>[]): Punto {
  return parches.reduce<Punto>((acum, parche) => ({ ...acum, ...parche }), base);
}
// Resultado: {x:69,y:9}
fusionarConReduce({ x: 0, y: 0 }, [{ x: 5 }, { x: 9 }, { x: 69 }, { y: 9 }]);

/* 5) fusionarCajasConReduce — el gemelo del drill 3, ahora con reduce.
 * fusionarCajasConReduce({ancho:10,alto:5,color:"rojo"}, [{alto:8},{color:"azul"}])
 *   → {ancho:10,alto:8,color:"azul"}
 */
export function fusionarCajasConReduce(base: Caja, parches: Partial<Caja>[]): Caja {
  return parches.reduce<Caja>((acum, parche) => ({ ...acum, ...parche }), base);
}
// Resultado: {ancho: 10, alto: 8, color: "azul"}
fusionarCajasConReduce({ ancho: 10, alto: 5, color: "rojo" }, [{ alto: 8 }, { color: "azul" }]);

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE D — capstone: el gemelo exacto del drill 5 del 04
 *
 * Mismo cuerpo que el drill 4, otro tipo. Si este te sale solo, el drill 5 del 04
 * ya lo entiendes: es palabra por palabra lo mismo.
 * ───────────────────────────────────────────────────────────────────────────── */

type Usuario = { id: number; nombre: string; email: string };

/* 6) aplicarParches — parte de un usuario y aplica en orden una lista de
 * parches parciales, cada uno encima del resultado anterior.
 *   aplicarParches({id:1,nombre:"Ana",email:"a@a.com"}, [{nombre:"Ani"},{email:"x@x.com"}])
 *     → {id:1,nombre:"Ani",email:"x@x.com"}
 *   aplicarParches(u, []) → u (sin cambios)
 */
export function aplicarParches(usuario: Usuario, parches: Partial<Usuario>[]): Usuario {
  return parches.reduce<Usuario>((acum, parche) => ({ ...acum, ...parche }), usuario);
}
// Resultado: {id:1,nombre:"Ani",email:"x@x.com"}
aplicarParches({ id: 1, nombre: "Ana", email: "a@a.com" }, [
  { nombre: "Ani" },
  { email: "x@x.com" },
]);
