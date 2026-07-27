/* =============================================================================
 * EJERCICIO 01 — Uniones discriminadas (discriminated unions)
 * =============================================================================
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 * En el 07 estrechaste uniones de PRIMITIVOS (`string | number`) con `typeof`.
 * Pero `typeof` solo sirve para primitivos: si tienes una unión de OBJETOS,
 * `typeof obj` siempre dice "object" y no te distingue nada.
 *
 *   type Figura =
 *     | { radio: number }              // círculo
 *     | { lado: number };              // cuadrado
 *
 *   function area(f: Figura) {
 *     return f.radio * ...; // ❌ TS: 'radio' no existe en '{ lado: number }'
 *   }
 *
 * ¿Cómo sabe TS, dentro de la función, cuál de los dos objetos llegó? Necesitas
 * darle una pista que pueda leer en runtime Y en compile-time. Esa pista es una
 * **propiedad discriminante**: un campo común a todas las variantes, con un
 * TIPO LITERAL distinto en cada una.
 *
 *   type Figura =
 *     | { tipo: "circulo"; radio: number }
 *     | { tipo: "cuadrado"; lado: number };
 *
 * Ahora `tipo` es la "etiqueta". Como su valor es un literal distinto en cada
 * variante ("circulo" vs "cuadrado"), TS puede estrechar mirándola:
 *
 *   function area(f: Figura): number {
 *     if (f.tipo === "circulo") {
 *       return Math.PI * f.radio ** 2;  // aquí f es la variante círculo ✅
 *     }
 *     return f.lado ** 2;               // aquí f es la variante cuadrado ✅
 *   }
 *
 * A esto se le llama **unión discriminada**: una unión de objetos que comparten
 * un campo "tag" literal, y que se estrecha comprobando ese campo.
 *
 *
 * ▸ ANALOGÍA — sobres de colores en una oficina de correos
 * ----------------------------------------------------------------------------
 * Imagina sobres que pueden ser de dos clases: "carta" (lleva un texto dentro)
 * o "paquete" (lleva un peso en kg). Por fuera todos son "sobres" (objetos), no
 * los distingues por su forma genérica.
 *
 * La solución de correos: estampar en cada sobre una ETIQUETA de color visible:
 * azul = carta, rojo = paquete. El cartero mira la etiqueta PRIMERO y entonces
 * sabe exactamente qué hay dentro y cómo tratarlo.
 *
 *   - El campo `tipo: "carta" | "paquete"` es la etiqueta de color.
 *   - El `if (sobre.tipo === "carta")` es el cartero mirando la etiqueta.
 *   - Dentro de esa rama ya sabe que hay un texto (y no un peso), sin riesgo.
 *
 *
 * ▸ EJEMPLO 1 — definir y estrechar
 * ----------------------------------------------------------------------------
 *
 *   type Pago =
 *     | { metodo: "efectivo"; monto: number }
 *     | { metodo: "tarjeta"; monto: number; ultimos4: string };
 *
 *   function recibo(p: Pago): string {
 *     if (p.metodo === "efectivo") {
 *       return `Pagaste ${p.monto} en efectivo`;
 *     }
 *     // aquí TS ya sabe que p es la variante "tarjeta"
 *     return `Pagaste ${p.monto} con tarjeta ****${p.ultimos4}`;
 *   }
 *
 * Fíjate: `ultimos4` SOLO existe en la variante tarjeta. TS te deja leerlo solo
 * después de comprobar `p.metodo === "tarjeta"`. Antes, te lo prohíbe.
 *
 *
 * ▸ EJEMPLO 2 — con `switch` (cómodo cuando hay 3+ variantes)
 * ----------------------------------------------------------------------------
 *
 *   function recibo(p: Pago): string {
 *     switch (p.metodo) {
 *       case "efectivo": return `Efectivo: ${p.monto}`;
 *       case "tarjeta":  return `Tarjeta ****${p.ultimos4}`;
 *     }
 *   }
 *
 * `if` o `switch`, los dos estrechan igual sobre la propiedad discriminante.
 *
 *
 * ▸ CUÁNDO USAR
 * ----------------------------------------------------------------------------
 *   - Cuando un dato puede ser "uno de varios casos" y cada caso lleva campos
 *     distintos: estados (cargando / ok / error), eventos, formas, métodos de
 *     pago, tipos de notificación...
 *   - Patrón: campo "tag" literal común → comprobarlo → usar los campos propios
 *     de esa variante. Es narrowing del 07, pero sobre objetos.
 *   - Lo verás constantemente en React: `{ estado: "loading" } | { estado:
 *     "success"; data: T } | { estado: "error"; mensaje: string }`.
 *
 *
 * ▸ EJERCICIO
 * ----------------------------------------------------------------------------
 *
 * Reglas:
 *   - ❌ No uses `any`, no uses `as X` (type assertions).
 *   - ✅ Estrecha SIEMPRE comprobando la propiedad discriminante antes de leer
 *        los campos propios de una variante.
 *   - ✅ `pnpm test:run` y `pnpm typecheck` limpios.
 *
 * ===========================================================================*/

// 1) Define una unión discriminada `Figura` con DOS variantes que compartan la
//    propiedad discriminante `tipo` (un literal distinto en cada una):
//      - tipo "circulo" → además: radio: number
//      - tipo "cuadrado" → además: lado: number
export type Figura = { tipo: "circulo"; radio: number } | { tipo: "cuadrado"; lado: number };

// 2) `area(figura: Figura): number`
//    - Si es "circulo"  → devuelve  Math.PI * radio²   (pista: `radio ** 2`).
//    - Si es "cuadrado" → devuelve  lado²
//    Estrecha por `figura.tipo` antes de leer `radio` o `lado`.
export function area(figura: Figura): number {
  if (figura.tipo === "circulo") {
    return Math.PI * figura.radio ** 2;
  } else {
    return figura.lado ** 2
  }
}


// 3) `describir(figura: Figura): string`
//    - "circulo"  → `Círculo de radio ${radio}`
//    - "cuadrado" → `Cuadrado de lado ${lado}`
//    Usa `if` o `switch` sobre `figura.tipo`, como prefieras.
export function describir(figura: Figura): string {
  if (figura.tipo === "circulo") {
    return `Círculo de radio ${figura.radio}`;
  }
  else {
    return `Cuadrado de lado ${figura.lado}`
  }
}
