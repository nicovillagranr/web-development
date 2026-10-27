/* =============================================================================
 * EJERCICIO 06 — return { ...base, ...p1, ...p2 }, pieza a pieza · refuerzo del 05
 *
 * 🎯 OBJETIVOS
 * · Distinguir el spread (valores, en ejecución) del Partial (tipos, al compilar).
 * · Ver por qué base + parche parcial vuelve a dar un Punto completo.
 *
 * 🟢 CONTEXTO — el drill 1 del 05 (aplicarDosParches) mezcla dos cosas que viven
 * en pisos distintos del edificio, y por eso marea cuando las miras juntas. El
 * objetivo único de este archivo es entender esa línea, con p1 y p2 de tipo
 * Partial<Punto>: la escalera separa los dos pisos y luego los vuelve a juntar.
 *
 * 🗺️ MAPA
 * TEORÍA · los dos pisos: valores y tipos → base de todo el archivo
 * BLOQUE A · el spread a solas, con objetos completos → drills 1–3
 * BLOQUE B · el Partial a solas, con spread mínimo → drills 4–5
 * BLOQUE C · los dos pisos juntos: base + un parche → drills 6–7
 * BLOQUE D · la meta: base + dos parches → drill 8
 *
 * ▸ 8 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/07-utility-types/exercise-06.test.ts
 * pnpm typecheck
 *
 * Cada starter va mal a propósito (tipo demasiado estricto y/o cuerpo que no hace
 * el trabajo): typecheck y/o test en rojo. Arregla lo que haga falta y corre el
 * test tras cada drill.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — los dos pisos del edificio
 *
 * DEFINICIÓN
 * 🔵 Piso de los valores (en ejecución): el spread { ...a, ...b }. Una acción que
 * pasa de verdad cuando el código corre: copia las propiedades de a, luego copia
 * las de b encima, y si chocan gana el de la derecha. Es JavaScript puro: no sabe
 * nada de tipos.
 *
 * 🟡 Piso de los tipos (al compilar): Partial<Punto>. Una regla que solo existe
 * mientras escribes y compilas: «un objeto con algunas (o ninguna) de las
 * propiedades de Punto, pero ninguna inventada». Le dice a TS que deje pasar
 * { x: 5 } aunque le falte y. Cuando el código corre, Partial ya no existe.
 *
 * 💡 Regla mental: Partial decide qué objetos acepta la función (la portería); el
 * spread decide qué haces con ellos dentro.
 * ───────────────────────────────────────────────────────────────────────────── */

type Punto = { x: number; y: number };

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE A — el spread a solas (piso de los valores)
 *
 * Olvídate de Partial por ahora: todos los objetos aquí están completos. Lo único
 * que quiero que sientas: el spread copia, y en una colisión gana el de la derecha.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) copiar — devuelve una copia nueva del punto (mismo contenido, otro objeto).
 * El spread no muta ni reusa: fabrica un objeto nuevo con las mismas props.
 * 👉 El starter devuelve el mismo objeto (no copia). El test comprueba que
 *    el resultado no es el mismo objeto (otra caja, mismo contenido).
 *   copiar({ x: 3, y: 4 }) → { x: 3, y: 4 }  (pero es un objeto distinto)
 */
export function copiar(punto: Punto): Punto {
  return { ...punto };
}
copiar({ x: 3, y: 4 }); // Al usar spread devuelve una copia del original

/* 2) combinar — copia a y pisa con b encima. Si los dos traen x,
 * gana el x de b (va a la derecha).
 * 👉 El starter ignora b. Hazlo con { ...a, ...b }.
 *   combinar({ x: 0, y: 0 }, { x: 5, y: 9 }) → { x: 5, y: 9 }
 *   combinar({ x: 1, y: 1 }, { x: 2, y: 2 }) → { x: 2, y: 2 }  (gana b)
 */
export function combinar(a: Punto, b: Punto): Punto {
  return { ...a, ...b };
}
combinar({ x: 0, y: 0 }, { x: 5, y: 9 }); // En este caso la función pide recibir 2 parámetros tipo Punto que reciben 2 argumentos. Punto es un objeto.

/* 3) combinarTres — encadena tres: a, luego b encima, luego c encima.
 * Gana siempre el último que toca cada propiedad.
 * 👉 El starter ignora b y c. Encadena los tres spreads.
 *   combinarTres({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 9, y: 9 }) → { x: 9, y: 9 }
 */
export function combinarTres(a: Punto, b: Punto, c: Punto): Punto {
  return { ...a, ...b, ...c };
}
combinarTres({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 9, y: 9 });

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE B — el Partial a solas (piso de los tipos)
 *
 * Ahora al revés: casi sin spread, foco en el tipo. Partial<Punto> deja pasar
 * objetos incompletos: { x: 5 }, {}, { x: 5, y: 9 }… todos valen. Lo que no deja
 * pasar es una llave inventada ({ z: 1 }): Partial afloja las que ya existen, no
 * inventa nuevas.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) tomarParcial — recibe un parche parcial y lo devuelve tal cual.
 * Aquí el cuerpo es trivial (devuelve p). El único trabajo es el tipo del
 * parámetro: ahora exige un Punto entero, así que el test no puede pasarle
 * { x: 5 }. Aflójalo para que acepte objetos incompletos.
 * 👉 Cambia solo el tipo de p. El cuerpo ya está bien.
 *   tomarParcial({ x: 5 })       → { x: 5 }
 *   tomarParcial({})             → {}
 *   tomarParcial({ x: 5, y: 9 }) → { x: 5, y: 9 }
 */
export function tomarParcial(p: Partial<Punto>): Partial<Punto> {
  return { ...p };
}
tomarParcial({ x: 5 }); // Resultado: { x: 5 } // Partial lo acepta
tomarParcial({}); // Resultado: {} // Partial lo acepta
tomarParcial({ x: 5, y: 9 }); // Resultado: { x: 5, y: 9 } // Partial lo acepta

/* 5) combinarParciales — junta dos parches parciales. Fíjate bien en el
 * retorno: como no hay base debajo, el resultado puede seguir incompleto
 * (por eso el tipo de salida también es Partial<Punto>, no Punto).
 * Esto es la semilla del bloque C: sin una base que rellene los huecos,
 * dos parciales mezclados siguen siendo... parciales.
 * 👉 Dos arreglos: el tipo de p1/p2 (exigen Punto entero) y el cuerpo
 *    (ignora p2).
 *   combinarParciales({ x: 5 }, { y: 9 }) → { x: 5, y: 9 }
 *   combinarParciales({ x: 1 }, { x: 2 }) → { x: 2 }   (gana el último)
 *   combinarParciales({}, { y: 7 })       → { y: 7 }
 */
export function combinarParciales(p1: Partial<Punto>, p2: Partial<Punto>): Partial<Punto> {
  return { ...p1, ...p2 };
}
combinarParciales({ x: 5 }, { y: 9 });

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE C — juntar los dos pisos: base completa + un parche parcial
 *
 * Aquí está el «aha» del ejercicio. La base está completa (es un Punto de verdad)
 * y el parche es Partial (puede traer solo una propiedad). Al hacer
 * { ...base, ...parche }, la base pone todas las propiedades, sin huecos, y el
 * parche pisa solo las que trae. Por eso el resultado vuelve a ser un Punto
 * completo aunque el parche fuera incompleto: la base tapa los huecos. Es lo que
 * en el 05 hacía obligatorio el ...base.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 6) aplicarUnParche — base completa + un parche parcial encima.
 * 👉 Dos arreglos: el tipo de parche (debe aceptar parciales) y el cuerpo
 *    (ahora ignora el parche).
 *   aplicarUnParche({ x: 0, y: 0 }, { x: 5 }) → { x: 5, y: 0 }  (y la pone la base)
 *   aplicarUnParche({ x: 3, y: 4 }, {})       → { x: 3, y: 4 }  (parche vacío: base intacta)
 */
export function aplicarUnParche(base: Punto, parche: Partial<Punto>): Punto {
  return { ...base, ...parche };
}
// Resultado: {x: 5, y: 0}. Al aplicar un parche parcial, se pueden recibir parciales
aplicarUnParche({ x: 0, y: 0 }, { x: 5 });

type Caja = { ancho: number; alto: number; color: string };

/* 7) aplicarUnParcheCaja — el mismo patrón, otro tipo (refuerzo). La base
 * aporta las tres propiedades; el parche pisa las que trae.
 * 👉 Mismos dos arreglos que el 6.
 *   aplicarUnParcheCaja({ ancho: 10, alto: 5, color: "rojo" }, { color: "azul" })
 *     → { ancho: 10, alto: 5, color: "azul" }
 */
export function aplicarUnParcheCaja(base: Caja, parche: Partial<Caja>): Caja {
  return { ...base, ...parche };
}
// Resultado: {ancho: 20, alto: 20, color: "azul"}
aplicarUnParcheCaja({ ancho: 10, alto: 5, color: "rojo" }, { color: "azul" });

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE D — la meta: base + dos parches = gemelo exacto del drill 1 del 05
 *
 * Si llegaste aquí entendiendo A, B y C, este es palabra por palabra el drill 1
 * del 05: base completa y dos parches parciales, cada uno pisando encima del
 * anterior. Gana el último que toca cada propiedad.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 8) aplicarDosParchesBis — base + p1 encima + p2 encima de eso.
 * 👉 Mismos arreglos: tipos de p1/p2 parciales + el cuerpo con los tres
 *    spreads en orden.
 *   aplicarDosParchesBis({ x: 0, y: 0 }, { x: 5 }, { y: 9 }) → { x: 5, y: 9 }
 *   aplicarDosParchesBis({ x: 0, y: 0 }, { x: 1 }, { x: 2 }) → { x: 2, y: 0 }  (gana el último)
 */
export function aplicarDosParchesBis(base: Punto, p1: Partial<Punto>, p2: Partial<Punto>): Punto {
  return { ...base, ...p1, ...p2 };
}
// Resultado: {x: 5, y: 9}
aplicarDosParchesBis({ x: 0, y: 0 }, { x: 5 }, { y: 9 });
