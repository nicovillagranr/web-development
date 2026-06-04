/* =============================================================================
 * EJERCICIO 02 — Refuerzo: discriminante-por-PROPIEDAD + exhaustividad con `never`
 * =============================================================================
 *
 * Surgió en el parcial: al estrechar una unión de objetos saliste con
 * `typeof figura === "circulo"`. Aquí lo fijamos de raíz, y de paso aprendemos el
 * patrón profesional de exhaustividad con `never`, que aún no habías practicado.
 *
 *
 * ▸ RECORDATORIO 1 — el discriminante es una PROPIEDAD, no `typeof`
 * ----------------------------------------------------------------------------
 * `typeof` solo distingue PRIMITIVOS (string, number, boolean...). Sobre un
 * objeto SIEMPRE devuelve "object":
 *
 *   typeof { tipo: "circulo" }   // "object"   ← inútil para distinguir variantes
 *
 * Para estrechar una unión de objetos lees el CAMPO discriminante (el "tag"):
 *
 *   if (figura.tipo === "circulo") { ... }   // ✅ lees la propiedad .tipo
 *   //  ^^^^^^^^^^^                            no `typeof figura`
 *
 *
 * ▸ RECORDATORIO 2 — `never`: el "montón de lo imposible"
 * ----------------------------------------------------------------------------
 * `never` es el tipo de algo que NO PUEDE EXISTIR (cero valores posibles). Suena
 * raro, pero tiene un uso brillante: comprobar que NO te dejaste ningún caso.
 *
 * Cuando estrechas una unión caso por caso, en cada rama TS va "tachando"
 * variantes. Si las manejaste TODAS, lo que queda al final es `never` (no sobra
 * ninguna). Si OLVIDASTE una, lo que queda es esa variante todavía viva.
 *
 *   function area(f: Figura): number {
 *     switch (f.tipo) {
 *       case "circulo":    return Math.PI * f.radio ** 2
 *       case "rectangulo": return f.ancho * f.alto
 *       case "cuadrado":   return f.lado ** 2
 *       default:
 *         const _exhaustivo: never = f   // ✅ compila SOLO si f es `never` aquí
 *         return _exhaustivo
 *     }
 *   }
 *
 * Si mañana añades `{ tipo: "triangulo"; ... }` a `Figura` y NO agregas su `case`,
 * en el `default` `f` todavía puede ser el triángulo → NO es `never` → la línea
 * `const _exhaustivo: never = f` NO compila. El olvido se vuelve error en
 * COMPILACIÓN, no un bug en producción.
 *
 * 🔑 ANALOGÍA — el portero con lista de invitados. Va tachando nombres a medida
 * que entran. Al final mira la lista: si está toda tachada (`never`), perfecto,
 * no falta nadie. Si queda un nombre sin tachar, ese "alguien sin manejar" hace
 * saltar la alarma. El `const _: never = f` es esa mirada final a la lista.
 *
 *
 * ▸ EJERCICIO — drills en escalera. EN ORDEN. ❌ nada de `any` ni `as`.
 *    Bloque A: fija "leo la propiedad, no typeof".  Bloque B: el patrón `never`.
 * ===========================================================================*/

export type Figura =
  | { tipo: "circulo"; radio: number }
  | { tipo: "rectangulo"; ancho: number; alto: number }
  | { tipo: "cuadrado"; lado: number }


/* ── BLOQUE A — el discriminante es una propiedad ──────────────────────────── */

// A1) Devuelve el valor del discriminante (la etiqueta) tal cual.
//     Calienta: confirma que `.tipo` existe en TODAS las variantes.
//       nombreTipo({ tipo: "circulo", radio: 2 }) → "circulo"
export function nombreTipo(figura: Figura): string {
  // completa aquí (una línea: lee la propiedad discriminante)
  return figura.tipo
}
nombreTipo({ tipo: "circulo", radio: 2 }) // "circulo"  --- IGNORE ---

// A2) Área de DOS casos. Estrecha leyendo `figura.tipo` (NO `typeof`).
//     Para "rectangulo" usa ancho*alto; para "cuadrado" usa lado².
//       areaPlana({ tipo: "rectangulo", ancho: 3, alto: 4 }) → 12
export function areaPlana(figura: { tipo: "rectangulo"; ancho: number; alto: number } | { tipo: "cuadrado"; lado: number }): number {
  // completa aquí (if sobre figura.tipo + early return, o if/else)
  if (figura.tipo === "rectangulo") {
    return figura.ancho * figura.alto
  }
  return figura.lado ** 2
}

// A3) Con `switch` sobre las TRES variantes de Figura, devuelve una etiqueta:
//       "circulo" → "Círculo" ; "rectangulo" → "Rectángulo" ; "cuadrado" → "Cuadrado"
//     (Sin `never` todavía; eso es el bloque B.)
export function etiqueta(figura: Figura): string {
  // completa aquí (switch (figura.tipo) { case ... })
  switch (figura.tipo) {
    case "circulo": return "Círculo"
    case "rectangulo": return "Rectángulo"
    case "cuadrado": return "Cuadrado"
  }
}


/* ── BLOQUE B — exhaustividad con `never` ──────────────────────────────────── */

// B1) Calcula el área de las TRES figuras con `switch`, y añade la rama `default`
//     con el chequeo `const _exhaustivo: never = figura`. Copia el patrón de la
//     EXPLICACIÓN y entiéndelo línea por línea.
//       areaTotal({ tipo: "circulo", radio: 2 }) → Math.PI * 4
//       areaTotal({ tipo: "rectangulo", ancho: 3, alto: 4 }) → 12
//       areaTotal({ tipo: "cuadrado", lado: 5 }) → 25
export function areaTotal(figura: Figura): number {
  // completa aquí (switch con los 3 case + default con `never`)
  switch (figura.tipo) {
    case "circulo": return Math.PI * figura.radio ** 2
    case "rectangulo": return figura.ancho * figura.alto
    case "cuadrado": return figura.lado ** 2
    default: {
      const _exhaustivo: never = figura
      return _exhaustivo
    }
  }
}

// B2) PRUEBA DE FUEGO. Esta `Figura2` tiene CUATRO variantes (incluye "triangulo").
//     Maneja las cuatro con switch + el `never` final. Si te falta una, el `never`
//     no compilará: esa es justo la red de seguridad que queremos sentir.
//       perimetro({ tipo: "triangulo", a: 3, b: 4, c: 5 }) → 12
export type Figura2 =
  | { tipo: "circulo"; radio: number }
  | { tipo: "rectangulo"; ancho: number; alto: number }
  | { tipo: "cuadrado"; lado: number }
  | { tipo: "triangulo"; a: number; b: number; c: number }
export function perimetro(figura: Figura2): number {
  switch (figura.tipo) {
    case "circulo": return 2 * Math.PI * figura.radio
    case "rectangulo": return 2 * (figura.ancho + figura.alto)
    case "cuadrado": return 4 * figura.lado
    case "triangulo": return figura.a + figura.b + figura.c
    default: {
      const _exhaustivo: never = figura
      return _exhaustivo
    }
  }
}
