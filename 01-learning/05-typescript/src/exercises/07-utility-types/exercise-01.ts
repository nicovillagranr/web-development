/* =============================================================================
 * EJERCICIO 01 — Record<Llaves, Valor>: la fábrica de formas de objeto · bloque 07
 *
 * 🎯 OBJETIVOS
 * · Fabricar tipos de objeto con Record, con una llave o con una unión de llaves.
 * · Usar el dúo con Record cuando la llave la elige quien llama.
 * · Escribir de memoria el campeón genérico: firma y cuerpo.
 *
 * 🟢 CONTEXTO — salió del E1 del parcial: la firma con Record<Clave, number> se
 * sintió «demasiado compleja». Aquí la desarmamos en peldaños chicos. El capstone
 * (drill 8) es un espejo del E1: cuando llegues, vuelve a leer
 * 00-evaluacion/parcial-01.ts línea 161 y comprueba que ya se lee sola.
 *
 * 🗺️ MAPA
 * BLOQUE A · Record fabricando tipos → drills 1–3
 * BLOQUE B · Record como portero de clave fija → drill 4
 * BLOQUE C · la clave variable: la flecha invertida → drills 5–8
 * BLOQUE D · refuerzo del drill 8, en tres tramos → D1–D6
 *
 * ▸ 8 drills + 6 de refuerzo, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/07-utility-types/exercise-01.test.ts
 * pnpm typecheck
 *
 * Como siempre: cuerpos listos, firmas y tipos flojos. pnpm typecheck está rojo
 * hasta que los aprietes todos.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE A — Record fabricando tipos (sin genéricos, sin funciones)
 *
 * DEFINICIÓN
 * Record<Llaves, Valor> fabrica un tipo de objeto: una propiedad por cada texto de
 * Llaves, todas guardando un Valor. No fabrica nada que no sepas escribir a mano.
 *
 * Ejemplos:
 * Record<"v", number>       → { v: number }
 * Record<"a" | "b", number> → { a: number; b: number }
 * Record<"nombre", string>  → { nombre: string }
 *
 * 💡 Su gracia aparece en dos situaciones: cuando las llaves son una unión larga
 * (te ahorra repetir) y, la importante, cuando el nombre de la llave no se sabe
 * todavía porque lo elige quien llama (bloque C).
 *
 * Aquí solo practicas la fábrica: mira la forma pedida y fabrícala con Record. El
 * test verifica que tu tipo es exactamente igual al escrito a mano.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) Fabrica con Record el equivalente de { clp: number }.
 * 👉 Reemplaza unknown por Record<"clp", number>.
 */
export type Moneda = Record<"clp", number>;

/* 2) Fabrica { x: number; y: number }. Una sola llamada a Record:
 * las llaves van como unión ("x" | "y").
 */
export type Coordenada = Record<"x" | "y", number>;

/* 3) Fabrica { email: string; telefono: string }. El Valor no tiene por qué
 * ser number — aquí es string.
 */
export type Contacto = Record<"email" | "telefono", string>;

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE B — Record como portero de clave fija (puente con generics, bloque B)
 *
 * Tu portero de siempre, Item extends { precio: number }, se puede escribir
 * Item extends Record<"precio", number>. Son la misma forma: compruébalo.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) conDescuento lee precio y le aplica 20% de descuento. Pon el portero
 * usando Record con la llave fija "precio" (no escribas { precio: number },
 * aunque sería idéntico — el objetivo es soltar la mano con Record).
 *   conDescuento({ precio: 100 }) → 80
 */
export function conDescuento<Item extends Record<"precio", number>>(x: Item): number {
  return x.precio * 0.8;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE C — la clave variable: la flecha invertida (el patrón del E1)
 *
 * DEFINICIÓN
 * Ahora la llave la elige quien llama, y escribirla a mano es imposible:
 * { clave: number } significaría una propiedad llamada literalmente "clave" (la
 * trampa de la llave calculada [id] de 04-objetos, pero en tipos). Con Record se
 * invierte la dependencia entre los dos huecos. Léelo dos veces: es el corazón
 * del E1.
 *
 * SINTAXIS
 * <Objeto, Llave extends keyof Objeto>                         // Objeto manda
 * <Clave extends string, Objeto extends Record<Clave, number>> // Clave manda
 *
 * La primera dice «primero sé qué objeto entra; la llave debe estar en su menú».
 * La segunda, «dime qué clave quieres (un texto), y tráeme un objeto que la tenga
 * guardando un number». El dúo nuevo es siempre el mismo.
 *
 * 💡 ¿Y para qué invertirla? Para exigir el tipo del casillero. keyof solo garantiza
 * que la etiqueta existe: lo guardado podría ser string, boolean, lo que sea.
 * Record<Clave, number> garantiza etiqueta + contenido numérico. La necesitas
 * cuando el cuerpo hace matemática con el valor: >, +, *…
 * ───────────────────────────────────────────────────────────────────────────── */

/* 5) El más simple posible: lee la propiedad numérica que te pidan.
 * 👉 Aprieta los dos huecos con el dúo de arriba. Cuerpo intacto.
 *   leerNumero({ v: 7, n: "a" }, "v") → 7
 *   leerNumero({ v: 7, n: "a" }, "n") → ❌ "n" guarda string, no number
 */
export function leerNumero<Objeto extends Record<Clave, number>, Clave extends string>(
  obj: Objeto,
  clave: Clave,
): number {
  return obj[clave];
}
leerNumero({ a: 1, b: 2, c: 3 }, "a"); // 1

/* 6) ¿La propiedad es positiva? Aquí está la respuesta al "Por qué" del E1:
 * el cuerpo usa >, y > solo tiene sentido entre números — por eso el
 * portero debe exigir number, no solo que la llave exista (keyof).
 * 👉 Mismo dúo.
 *   esPositivo({ stock: 3 }, "stock") → true ; ({ stock: 0 }, "stock") → false
 */
export function esPositivo<Objeto extends Record<Clave, number>, Clave extends string>(
  obj: Objeto,
  clave: Clave,
): boolean {
  return obj[clave] > 0;
}
esPositivo({ stock: 3 }, "stock"); // true
esPositivo({ stock: 0 }, "stock"); // false

/* 7) Suma la columna clave de todos los objetos (tu alcancía de reduce:
 * acumulador number, inicial 0). El + exige números igual que el >.
 * 👉 Mismo dúo. Fíjate que arr es Objeto[].
 *   sumarColumna([{ v: 1 }, { v: 2 }], "v") → 3
 */
export function sumarColumna<Objeto extends Record<Clave, number>, Clave extends string>(
  arr: Objeto[],
  clave: Clave,
): number {
  return arr.reduce((acum, obj) => acum + obj[clave], 0);
}
sumarColumna([{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }, { v: 5 }, { v: 6 }], "v"); // 21

/* 8) Capstone — minimoPor: el objeto con el menor valor en clave.
 * Es el espejo del E1 del parcial (aquél buscaba el mayor, este el menor).
 * El cuerpo es idéntico salvo el <. Tras apretarlo, abre el parcial y
 * lee la firma de maximoPor: debería leerse sola.
 * 👉 Mismo dúo; el retorno Objeto | undefined ya está (¿por qué
 *    | undefined? — mismo motivo que tu buscarPor: array vacío).
 *   minimoPor([{ n: "a", v: 3 }, { n: "b", v: 1 }], "v") → { n: "b", v: 1 }
 */
export function minimoPor<Objeto extends Record<Clave, number>, Clave extends string>(
  arr: Objeto[],
  clave: Clave,
): Objeto | undefined {
  return arr.reduce<Objeto | undefined>((mejor, actual) => {
    if (mejor === undefined) {
      return actual;
    }
    return actual[clave] < mejor[clave] ? actual : mejor;
  }, undefined);
}
minimoPor(
  [
    { n: "a", v: 3 },
    { n: "b", v: 1 },
  ],
  "v",
); // { n: "b", v: 1 }
minimoPor([], "v"); // undefined
minimoPor([{ n: "a", v: 3 }], "v"); // { n: "a", v: 3 }

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE D — refuerzo del drill 8: el campeón-objeto genérico, en tres tramos
 *
 * El drill 8 junta dos cosas difíciles a la vez, y por eso se hace bola:
 * (1) la lógica del campeón con inicial undefined: el reduce que arrastra «el
 *     mejor hasta ahora», con portero del primer turno;
 * (2) la firma genérica: el dúo <Objeto extends Record<Clave, number>,
 *     Clave extends string>.
 *
 * Aquí se separan, y luego se reúnen:
 * D·1 (D1–D2) → tipos fijos, tú escribes el cuerpo: practicas (1) sin (2)
 * D·2 (D3–D4) → cuerpo dado, tú aprietas la firma: practicas (2) sin (1)
 * D·3 (D5–D6) → de cero, firma y cuerpo: el drill 8 entero
 *
 * SINTAXIS
 * El patrón del cuerpo, siempre el mismo (apréndetelo como un gesto):
 * arr.reduce<T | undefined>((mejor, actual) => {
 *   if (mejor === undefined) return actual // 1er turno: no hay rival aún
 *   return actual.<campo> < mejor.<campo> ? actual : mejor // o > para el máximo
 * }, undefined)
 *
 * Prohibidos any y as.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ D·1 — tipos fijos: tú escribes el cuerpo (la lógica del campeón) */

type Paquete = { codigo: string; peso: number };

/* D1) masPesado — el paquete de mayor peso, o undefined si la lista está vacía.
 * Tipos ya fijos (cero genéricos): concéntrate solo en el cuerpo campeón.
 * El starter devuelve el primero (mal). Escribe el reduce con inicial undefined.
 *   masPesado([{codigo:"a",peso:2},{codigo:"b",peso:5}]) → {codigo:"b",peso:5}
 *   masPesado([]) → undefined
 */
export function masPesado(paquetes: Paquete[]): Paquete | undefined {
  return paquetes.reduce<Paquete | undefined>((acum, paquete) => {
    if (acum === undefined) {
      return paquete;
    }
    return paquete.peso > acum.peso ? paquete : acum;
  }, undefined);
}
masPesado([
  { codigo: "a", peso: 2 },
  { codigo: "b", peso: 5 },
]); // {codigo:"b",peso:5} porque la función pide el paquete con mayor peso
masPesado([]); // undefined
masPesado([{ codigo: "solo", peso: 9 }]); // {codigo:"solo",peso:9}
masPesado([
  { codigo: "a", peso: 2 },
  { codigo: "b", peso: 5 },
  { codigo: "solo", peso: 9 },
]); // {codigo:"solo",peso:9}s

/* D2) masLigero — el de menor peso, o undefined. Espejo del D1: cambia el >
 * por <. Mismo tipo Paquete, mismo molde.
 *   masLigero([{codigo:"a",peso:2},{codigo:"b",peso:5}]) → {codigo:"a",peso:2}
 *   masLigero([]) → undefined
 */
export function masLigero(paquetes: Paquete[]): Paquete | undefined {
  return paquetes.reduce<Paquete | undefined>((acum, paquete) => {
    if (acum === undefined) {
      return paquete;
    }
    return paquete.peso < acum.peso ? paquete : acum;
  }, undefined);
}
masLigero([
  { codigo: "a", peso: 2 },
  { codigo: "b", peso: 5 },
]); // {codigo:"a",peso:2}
masLigero([]); // undefined

/* ▸ D·2 — cuerpo dado: tú aprietas la firma (el dúo genérico) */

/* D3) maximoPorD — el objeto con mayor valor en clave. El cuerpo ya está bien
 * escrito (es el campeón del D1, pero genérico). Lo único flojo es la firma:
 * <Clave, Objeto> no exige nada → typecheck rojo (TS2536, "Clave no indexa
 * Objeto"). Apriétala con el dúo y el rojo desaparece.
 *   maximoPorD([{n:"a",v:3},{n:"b",v:1}], "v") → {n:"a",v:3}
 */
export function maximoPorD<Objeto extends Record<Clave, number>, Clave extends keyof Objeto>(
  arr: Objeto[],
  clave: Clave,
): Objeto | undefined {
  return arr.reduce<Objeto | undefined>((mejor, actual) => {
    if (mejor === undefined) {
      return actual;
    }
    return actual[clave] > mejor[clave] ? actual : mejor;
  }, undefined);
}
// La función recibe un array de objetos
maximoPorD(
  [
    { n: "a", v: 3 },
    { n: "b", v: 1 },
    { n: "c", v: 2 },
  ],
  "v",
); // {n:"a",v:3} Porque el v de "a" es 3, el de "b" es 1 y el de "c" es 2
maximoPorD([], "v"); // undefined

/* D4) minimoPorD — el objeto con menor valor en clave. Mismo caso que D3 con
 * <. Aprieta la misma firma.
 *   minimoPorD([{n:"a",v:3},{n:"b",v:1}], "v") → {n:"b",v:1}
 */
export function minimoPorD<Objeto extends Record<Clave, number>, Clave extends keyof Objeto>(
  arr: Objeto[],
  clave: Clave,
): Objeto | undefined {
  return arr.reduce<Objeto | undefined>((acum, actual) => {
    if (acum === undefined) return actual;
    return actual[clave] < acum[clave] ? actual : acum;
  }, undefined);
}
minimoPorD(
  [
    { n: "a", v: 3 },
    { n: "b", v: 1 },
    { n: "c", v: 2 },
  ],
  "v",
); // {n:"b",v:1}
minimoPorD([], "v"); // undefined

/* ▸ D·3 — de cero: firma y cuerpo (el drill 8 completo) */

/* D5) maxPor — el objeto con mayor valor en clave, o undefined. Sin red:
 * escribe tú la firma (el dúo) y el cuerpo (el campeón con inicial undefined).
 * El starter devuelve el primero → test rojo hasta que lo hagas.
 *   maxPor([{n:"a",v:3},{n:"b",v:1}], "v") → {n:"a",v:3}
 *   maxPor([], "v") → undefined
 */
export function maxPor<Objeto extends Record<Clave, number>, Clave extends keyof Objeto>(
  arr: Objeto[],
  clave: Clave,
): Objeto | undefined {
  return arr.reduce<Objeto | undefined>((acum, valor) => {
    if (acum === undefined) {
      return valor;
    }
    return valor[clave] > acum[clave] ? valor : acum;
  }, undefined);
}

/* D6) Capstone — minPor — el objeto con menor valor en clave, o undefined.
 * Igual que D5 con <. Es, letra por letra, el drill 8 (minimoPor) hecho
 * de memoria. Si te sale solo, lo tienes consolidado.
 *   minPor([{n:"a",v:3},{n:"b",v:1}], "v") → {n:"b",v:1}
 *   minPor([], "v") → undefined
 */
export function minPor<Objeto extends Record<Clave, number>, Clave extends keyof Objeto>(
  arr: Objeto[],
  clave: Clave,
): Objeto | undefined {
  return arr.reduce<Objeto | undefined>((acum, valor) => {
    if (acum === undefined) {
      return valor;
    }
    return valor[clave] < acum[clave] ? valor : acum;
  }, undefined);
}
