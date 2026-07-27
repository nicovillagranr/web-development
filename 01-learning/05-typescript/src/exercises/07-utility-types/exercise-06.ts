/* =============================================================================
 * EJERCICIO 06 — REFUERZO del drill 1 de exercise-05 (`aplicarDosParches`)
 *                Objetivo único: ENTENDER, pieza a pieza, esta línea:
 *
 *                    return { ...base, ...p1, ...p2 }
 *
 *                con `p1`/`p2` de tipo `Partial<Punto>`.
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE ARCHIVO
 * ----------------------------------------------------------------------------
 * El drill 1 de exercise-05 mezcla DOS cosas que viven en pisos distintos del
 * edificio, y por eso marea cuando las miras juntas:
 *
 *   🔵 PISO DE LOS VALORES (runtime) — el SPREAD `{ ...a, ...b }`
 *      Una acción que pasa DE VERDAD cuando el código corre: copia las
 *      propiedades de `a`, luego copia las de `b` ENCIMA, y si chocan
 *      GANA EL DE LA DERECHA. Es JavaScript puro. No sabe nada de tipos.
 *
 *   🟡 PISO DE LOS TIPOS (compilación) — el `Partial<Punto>`
 *      Una REGLA que solo existe mientras escribes/compilas. Significa:
 *      "un objeto con ALGUNAS (o ninguna) de las propiedades de Punto, pero
 *      ninguna inventada". Le dice a TS: deja pasar `{ x: 5 }` aunque le falte
 *      `y`. Cuando el código corre, `Partial` YA NO EXISTE (se borró).
 *
 *   Regla mental:  Partial decide QUÉ OBJETOS acepta la función (la portería).
 *                  El spread decide QUÉ HACES con ellos dentro.
 *
 * Esta escalera los separa y luego los vuelve a juntar, capa a capa:
 *   BLOQUE A → solo SPREAD, con objetos COMPLETOS (sin Partial).
 *   BLOQUE B → solo PARTIAL (el tipo), con spread mínimo.
 *   BLOQUE C → los junto: una BASE completa + UN parche parcial.
 *   BLOQUE D → la meta: base + DOS parches = gemelo exacto del drill 1.
 *
 *
 * ▸ CÓMO TRABAJAR — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as`.
 * ----------------------------------------------------------------------------
 * Cada starter va MAL a propósito (tipo demasiado estricto y/o cuerpo que no
 * hace el trabajo) → typecheck y/o test ROJOS. Arregla lo que haga falta y
 * corre el test tras cada drill:
 *     pnpm test:run src/exercises/07-utility-types/exercise-06.test.ts
 * ===========================================================================*/


type Punto = { x: number; y: number }

/* ---------------------------------------------------------------------------
 * BLOQUE A — el SPREAD a solas (piso de los VALORES)
 * ---------------------------------------------------------------------------
 * Olvídate de `Partial` por ahora. Todos los objetos aquí están COMPLETOS.
 * Lo único que quiero que sientas: el spread COPIA, y en una colisión gana
 * el de la DERECHA.
 * -------------------------------------------------------------------------- */

// 1) `copiar` — devuelve una COPIA NUEVA del punto (mismo contenido, otro objeto).
//    El spread no muta ni reusa: fabrica un objeto nuevo con las mismas props.
//    👉 El starter devuelve el MISMO objeto (no copia). El test comprueba que
//       el resultado NO es el mismo objeto (otra caja, mismo contenido).
//      copiar({ x: 3, y: 4 }) → { x: 3, y: 4 }  (pero es un objeto distinto)
export function copiar(punto: Punto): Punto {
  return { ...punto }
}
copiar({ x: 3, y: 4 }) // Al usar spread devuelve una copia del original

// 2) `combinar` — copia `a` y pisa con `b` encima. Si los dos traen `x`,
//    gana el `x` de `b` (va a la derecha).
//    👉 El starter ignora `b`. Hazlo con `{ ...a, ...b }`.
//      combinar({ x: 0, y: 0 }, { x: 5, y: 9 }) → { x: 5, y: 9 }
//      combinar({ x: 1, y: 1 }, { x: 2, y: 2 }) → { x: 2, y: 2 }  (gana b)
export function combinar(a: Punto, b: Punto): Punto {
  return { ...a, ...b }
}
combinar({ x: 0, y: 0 }, { x: 5, y: 9 }) // En este caso la función pide recibir 2 parámetros tipo Punto que reciben 2 argumentos. Punto es un objeto.

// 3) `combinarTres` — encadena tres: `a`, luego `b` encima, luego `c` encima.
//    Gana SIEMPRE el último que toca cada propiedad.
//    👉 El starter ignora `b` y `c`. Encadena los tres spreads.
//      combinarTres({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 9, y: 9 }) → { x: 9, y: 9 }
export function combinarTres(a: Punto, b: Punto, c: Punto): Punto {
  return { ...a, ...b, ...c }
}
combinarTres({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 9, y: 9 })

/* ---------------------------------------------------------------------------
 * BLOQUE B — el `Partial` a solas (piso de los TIPOS)
 * ---------------------------------------------------------------------------
 * Ahora al revés: casi sin spread, foco en el TIPO. `Partial<Punto>` deja
 * pasar objetos INCOMPLETOS: `{ x: 5 }`, `{}`, `{ x: 5, y: 9 }`... todos valen.
 * Lo que NO deja pasar es una llave inventada (`{ z: 1 }`): Partial AFLOJA las
 * que ya existen, no INVENTA nuevas.
 * -------------------------------------------------------------------------- */

// 4) `tomarParcial` — recibe un parche parcial y lo devuelve tal cual.
//    Aquí el cuerpo es trivial (devuelve `p`). El único trabajo es el TIPO del
//    parámetro: ahora exige un Punto ENTERO, así que el test no puede pasarle
//    `{ x: 5 }`. Aflójalo para que acepte objetos incompletos.
//    👉 Cambia SOLO el tipo de `p`. El cuerpo ya está bien.
//      tomarParcial({ x: 5 })       → { x: 5 }
//      tomarParcial({})             → {}
//      tomarParcial({ x: 5, y: 9 }) → { x: 5, y: 9 }
export function tomarParcial(p: Partial<Punto>): Partial<Punto> {
  return { ...p }
}
tomarParcial({ x: 5 }) // Resultado: { x: 5 } // Partial lo acepta
tomarParcial({}) // Resultado: {} // Partial lo acepta
tomarParcial({ x: 5, y: 9 }) // Resultado: { x: 5, y: 9 } // Partial lo acepta

// 5) `combinarParciales` — junta DOS parches parciales. Fíjate bien en el
//    retorno: como NO hay base debajo, el resultado puede seguir incompleto
//    (por eso el tipo de salida también es `Partial<Punto>`, no `Punto`).
//    Esto es la semilla del BLOQUE C: sin una base que rellene los huecos,
//    dos parciales mezclados siguen siendo... parciales.
//    👉 Dos arreglos: el tipo de `p1`/`p2` (exigen Punto entero) y el cuerpo
//       (ignora `p2`).
//      combinarParciales({ x: 5 }, { y: 9 }) → { x: 5, y: 9 }
//      combinarParciales({ x: 1 }, { x: 2 }) → { x: 2 }   (gana el último)
//      combinarParciales({}, { y: 7 })       → { y: 7 }
export function combinarParciales(p1: Partial<Punto>, p2: Partial<Punto>): Partial<Punto> {
  return { ...p1, ...p2 }
}
combinarParciales({ x: 5 }, { y: 9 })


/* ---------------------------------------------------------------------------
 * BLOQUE C — juntar los dos pisos: BASE completa + UN parche parcial
 * ---------------------------------------------------------------------------
 * Aquí está el "aha" del ejercicio. La BASE está COMPLETA (es un `Punto` de
 * verdad). El parche es `Partial` (puede traer solo una propiedad). Al hacer
 * `{ ...base, ...parche }`:
 *   - la base pone TODAS las propiedades (nada queda hueco),
 *   - el parche PISA solo las que trae.
 * Por eso el resultado vuelve a ser un `Punto` COMPLETO aunque el parche fuera
 * incompleto: la base tapa los huecos. (Esto es lo que en exercise-05 hacía
 * que el `...base` fuera obligatorio.)
 * -------------------------------------------------------------------------- */

// 6) `aplicarUnParche` — base completa + UN parche parcial encima.
//    👉 Dos arreglos: el tipo de `parche` (debe aceptar parciales) y el cuerpo
//       (ahora ignora el parche).
//      aplicarUnParche({ x: 0, y: 0 }, { x: 5 }) → { x: 5, y: 0 }  (y la pone la base)
//      aplicarUnParche({ x: 3, y: 4 }, {})       → { x: 3, y: 4 }  (parche vacío: base intacta)
export function aplicarUnParche(base: Punto, parche: Partial<Punto>): Punto {
  return { ...base, ...parche }
}
// Resultado: {x: 5, y: 0}. Al aplicar un parche parcial, se pueden recibir parciales
aplicarUnParche({ x: 0, y: 0 }, { x: 5 })

type Caja = { ancho: number; alto: number; color: string }

// 7) `aplicarUnParcheCaja` — el MISMO patrón, otro tipo (refuerzo). La base
//    aporta las tres propiedades; el parche pisa las que trae.
//    👉 Mismos dos arreglos que el 6.
//      aplicarUnParcheCaja({ ancho: 10, alto: 5, color: "rojo" }, { color: "azul" })
//        → { ancho: 10, alto: 5, color: "azul" }
export function aplicarUnParcheCaja(base: Caja, parche: Partial<Caja>): Caja {
  return { ...base, ...parche }
}
// Resultado: {ancho: 20, alto: 20, color: "azul"}
aplicarUnParcheCaja({ ancho: 10, alto: 5, color: "rojo" }, { color: "azul" })


/* ---------------------------------------------------------------------------
 * BLOQUE D — LA META: base + DOS parches = gemelo exacto del drill 1
 * ---------------------------------------------------------------------------
 * Si llegaste aquí entendiendo A, B y C, este es palabra por palabra el drill 1
 * de exercise-05. Base completa, dos parches parciales, cada uno pisa encima
 * del anterior. Gana el último que toca cada propiedad.
 * -------------------------------------------------------------------------- */

// 8) `aplicarDosParchesBis` — base + `p1` encima + `p2` encima de eso.
//    👉 Mismos arreglos: tipos de `p1`/`p2` parciales + el cuerpo con los tres
//       spreads en orden.
//      aplicarDosParchesBis({ x: 0, y: 0 }, { x: 5 }, { y: 9 }) → { x: 5, y: 9 }
//      aplicarDosParchesBis({ x: 0, y: 0 }, { x: 1 }, { x: 2 }) → { x: 2, y: 0 }  (gana el último)
export function aplicarDosParchesBis(base: Punto, p1: Partial<Punto>, p2: Partial<Punto>): Punto {
  return { ...base, ...p1, ...p2 }
}
// Resultado: {x: 5, y: 9}
aplicarDosParchesBis({ x: 0, y: 0 }, { x: 5 }, { y: 9 })
