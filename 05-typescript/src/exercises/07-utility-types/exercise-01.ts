/* =============================================================================
 * EJERCICIO 01 — `Record<Llaves, Valor>`: la fábrica de formas de objeto
 * =============================================================================
 *
 * 🟢 POR QUÉ EXISTE ESTE ARCHIVO
 * ----------------------------------------------------------------------------
 * Salió del E1 del parcial: la firma con `Record<Clave, number>` se sintió
 * "demasiado compleja". Aquí la desarmamos en peldaños chicos. El capstone
 * final (drill 8) es un ESPEJO del E1 — cuando llegues ahí, vuelve a leer
 * `00-evaluacion/parcial-01.ts` línea 161 y comprueba que ya se lee sola.
 *
 *
 * ▸ EXPLICACIÓN — Record es una FÁBRICA de formas
 * ----------------------------------------------------------------------------
 * `Record<Llaves, Valor>` fabrica un tipo de objeto: una propiedad por cada
 * texto de `Llaves`, todas guardando un `Valor`.
 *
 *     Record<"v", number>          →  { v: number }
 *     Record<"a" | "b", number>    →  { a: number; b: number }
 *     Record<"nombre", string>     →  { nombre: string }
 *
 * OJO: no fabrica nada que no sepas escribir a mano. Su gracia aparece en dos
 * situaciones: cuando las llaves son una UNIÓN larga (te ahorra repetir), y
 * — la importante — cuando el nombre de la llave NO SE SABE todavía porque lo
 * elige quien llama (bloque C). Ahí escribirla a mano es IMPOSIBLE, porque
 * `{ clave: number }` significaría una propiedad llamada literalmente "clave"
 * (la misma trampa de la llave calculada `[id]` de 04-objetos, pero en tipos).
 *
 *
 * ▸ EXPLICACIÓN — la FLECHA INVERTIDA (léela 2 veces, es el corazón del E1)
 * ----------------------------------------------------------------------------
 * Hasta ahora la dependencia entre tus dos huecos iba en esta dirección:
 *
 *     <Objeto, Llave extends keyof Objeto>
 *      "primero sé qué objeto entra; la llave debe estar EN SU MENÚ"
 *      (Objeto manda → Llave obedece)
 *
 * Con Record la flecha se puede invertir:
 *
 *     <Clave extends string, Objeto extends Record<Clave, number>>
 *      "primero sé qué clave piden; el objeto debe TENERLA, y con number"
 *      (Clave manda → Objeto obedece)
 *
 * ¿Y para qué invertirla? Para EXIGIR EL TIPO del casillero. `keyof` solo
 * garantiza que la etiqueta existe — lo guardado podría ser string, boolean,
 * lo que sea. `Record<Clave, number>` garantiza etiqueta + CONTENIDO numérico.
 * La necesitas cuando el cuerpo hace matemática con el valor: `>`, `+`, `*`...
 *
 *
 * ▸ EJERCICIO — drills en escalera. Hazlos EN ORDEN.
 * ----------------------------------------------------------------------------
 * Igual que siempre: cuerpos listos, FIRMAS/TIPOS flojos. `pnpm typecheck`
 * está rojo hasta que aprietes todos. ❌ Prohibido `any` y `as`.
 * ===========================================================================*/


/* ---------------------------------------------------------------------------
 * BLOQUE A — Record fabricando TIPOS (sin genéricos, sin funciones)
 * ---------------------------------------------------------------------------
 * Solo practicamos la fábrica: mira la forma pedida y fabrícala con Record.
 * El test verifica que tu tipo es EXACTAMENTE igual al escrito a mano.
 * -------------------------------------------------------------------------- */

// 1) Fabrica con Record el equivalente de `{ clp: number }`.
//    👉 Reemplaza `unknown` por Record<"clp", number>.
export type Moneda = Record<"clp", number>

// 2) Fabrica `{ x: number; y: number }`. Una sola llamada a Record:
//    las llaves van como UNIÓN ("x" | "y").
export type Coordenada = Record<"x" | "y", number>

// 3) Fabrica `{ email: string; telefono: string }`. El Valor no tiene por qué
//    ser number — aquí es string.
export type Contacto = Record<"email" | "telefono", string>


/* ---------------------------------------------------------------------------
 * BLOQUE B — Record como PORTERO de clave FIJA (puente con generics bloque B)
 * ---------------------------------------------------------------------------
 * Tu portero de siempre, `Item extends { precio: number }`, se puede escribir
 * `Item extends Record<"precio", number>`. Son LA MISMA forma — compruébalo.
 * -------------------------------------------------------------------------- */

// 4) `conDescuento` lee `precio` y le aplica 20% de descuento. Pon el portero
//    usando Record con la llave fija "precio" (no escribas { precio: number },
//    aunque sería idéntico — el objetivo es soltar la mano con Record).
//      conDescuento({ precio: 100 }) → 80
export function conDescuento<Item extends Record<"precio", number>>(x: Item): number {
  return x.precio * 0.8
}


/* ---------------------------------------------------------------------------
 * BLOQUE C — la clave VARIABLE: la flecha invertida (el patrón del E1)
 * ---------------------------------------------------------------------------
 * Ahora la llave la elige quien llama. El dúo nuevo, SIEMPRE el mismo:
 *
 *     <Clave extends string, Objeto extends Record<Clave, number>>
 *
 * Léelo en cristiano: "dime qué clave quieres (un texto), y tráeme un objeto
 * que TENGA esa clave guardando un number".
 * -------------------------------------------------------------------------- */

// 5) El más simple posible: lee la propiedad numérica que te pidan.
//    👉 Aprieta los dos huecos con el dúo de arriba. Cuerpo intacto.
//      leerNumero({ v: 7, n: "a" }, "v") → 7
//      leerNumero({ v: 7, n: "a" }, "n") → ❌ "n" guarda string, no number
export function leerNumero<Objeto extends Record<Clave, number>, Clave extends string,>(obj: Objeto, clave: Clave): number {
  return obj[clave]
}
leerNumero({ a: 1, b: 2, c: 3 }, "a") // 1

// 6) ¿La propiedad es positiva? AQUÍ está la respuesta al "Por qué" del E1:
//    el cuerpo usa `>`, y `>` solo tiene sentido entre números — por eso el
//    portero debe exigir number, no solo que la llave exista (keyof).
//    👉 Mismo dúo.
//      esPositivo({ stock: 3 }, "stock") → true ; ({ stock: 0 }, "stock") → false
export function esPositivo<Objeto extends Record<Clave, number>, Clave extends string>(obj: Objeto, clave: Clave): boolean {
  return obj[clave] > 0
}
esPositivo({ stock: 3 }, "stock") // true
esPositivo({ stock: 0 }, "stock") // false

// 7) Suma la columna `clave` de todos los objetos (tu alcancía de reduce:
//    acumulador number, inicial 0). El `+` exige números igual que el `>`.
//    👉 Mismo dúo. Fíjate que `arr` es `Objeto[]`.
//      sumarColumna([{ v: 1 }, { v: 2 }], "v") → 3
export function sumarColumna<Objeto extends Record<Clave, number>, Clave extends string>(arr: Objeto[], clave: Clave): number {
  return arr.reduce((acum, obj) => acum + obj[clave], 0)
}
sumarColumna([{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }, { v: 5 }, { v: 6 }], "v") // 21

// 8) CAPSTONE — `minimoPor`: el objeto con el MENOR valor en `clave`.
//    Es el ESPEJO del E1 del parcial (aquél buscaba el mayor, este el menor).
//    El cuerpo es idéntico salvo el `<`. Tras apretarlo, abre el parcial y
//    lee la firma de `maximoPor`: debería leerse sola.
//    👉 Mismo dúo; el retorno `Objeto | undefined` ya está (¿por qué
//       `| undefined`? — mismo motivo que tu `buscarPor`: array vacío).
//      minimoPor([{ n: "a", v: 3 }, { n: "b", v: 1 }], "v") → { n: "b", v: 1 }
export function minimoPor<Objeto extends Record<Clave, number>, Clave extends string>(arr: Objeto[], clave: Clave): Objeto | undefined {
  return arr.reduce<Objeto | undefined>((mejor, actual) => {
    if (mejor === undefined) {
      return actual
    }
    return actual[clave] < mejor[clave] ? actual : mejor
  }, undefined)
}
minimoPor([{ n: "a", v: 3 }, { n: "b", v: 1 }], "v") // { n: "b", v: 1 }
minimoPor([], "v") // undefined
minimoPor([{ n: "a", v: 3 }], "v") // undefined
