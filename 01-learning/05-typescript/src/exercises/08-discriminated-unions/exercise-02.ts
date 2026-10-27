/* =============================================================================
 * EJERCICIO 02 — refuerzo: el discriminante es una propiedad + never · bloque 08
 *
 * 🎯 OBJETIVOS
 * · Estrechar una unión de objetos leyendo su propiedad discriminante, no con typeof.
 * · Comprobar con never que un switch cubre todas las variantes.
 *
 * 🟢 CONTEXTO — surgió en el parcial: al estrechar una unión de objetos saliste con
 * typeof figura === "circulo". Aquí lo fijamos de raíz, y de paso aprendes el
 * patrón profesional de exhaustividad con never, que aún no habías practicado.
 *
 * 🗺️ MAPA
 * BLOQUE A · el discriminante es una propiedad, no typeof → drills A1–A3
 * BLOQUE B · exhaustividad con never → drills B1–B2
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/08-discriminated-unions/exercise-02.test.ts
 * pnpm typecheck
 * ============================================================================= */

export type Figura =
  | { tipo: "circulo"; radio: number }
  | { tipo: "rectangulo"; ancho: number; alto: number }
  | { tipo: "cuadrado"; lado: number };

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE A — el discriminante es una propiedad, no typeof
 *
 * DEFINICIÓN
 * typeof solo distingue primitivos (string, number, boolean…); sobre un objeto
 * siempre devuelve "object". Para estrechar una unión de objetos se lee el campo
 * discriminante, el «tag».
 *
 * Ejemplos:
 * typeof { tipo: "circulo" } → "object": inútil para distinguir variantes
 * figura.tipo === "circulo"  → ✅ lees la propiedad .tipo, no typeof figura
 * ───────────────────────────────────────────────────────────────────────────── */

/* A1) Devuelve el valor del discriminante (la etiqueta) tal cual.
 * Calienta: confirma que .tipo existe en todas las variantes.
 *   nombreTipo({ tipo: "circulo", radio: 2 }) → "circulo"
 */
export function nombreTipo(figura: Figura): string {
  // completa aquí (una línea: lee la propiedad discriminante)
  return figura.tipo;
}
nombreTipo({ tipo: "circulo", radio: 2 }); // "circulo"  --- IGNORE ---

/* A2) Área de dos casos. Estrecha leyendo figura.tipo (no typeof).
 * Para "rectangulo" usa ancho*alto; para "cuadrado" usa lado².
 *   areaPlana({ tipo: "rectangulo", ancho: 3, alto: 4 }) → 12
 */
export function areaPlana(
  figura: { tipo: "rectangulo"; ancho: number; alto: number } | { tipo: "cuadrado"; lado: number },
): number {
  // completa aquí (if sobre figura.tipo + early return, o if/else)
  if (figura.tipo === "rectangulo") {
    return figura.ancho * figura.alto;
  }
  return figura.lado ** 2;
}

/* A3) Con switch sobre las tres variantes de Figura, devuelve una etiqueta:
 *   "circulo" → "Círculo" ; "rectangulo" → "Rectángulo" ; "cuadrado" → "Cuadrado"
 * (Sin never todavía; eso es el bloque B.)
 */
export function etiqueta(figura: Figura): string {
  // completa aquí (switch (figura.tipo) { case ... })
  switch (figura.tipo) {
    case "circulo":
      return "Círculo";
    case "rectangulo":
      return "Rectángulo";
    case "cuadrado":
      return "Cuadrado";
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE B — exhaustividad con never: el «montón de lo imposible»
 *
 * DEFINICIÓN
 * never es el tipo de algo que no puede existir: cero valores posibles. Sirve para
 * comprobar que no te dejaste ningún caso. Al estrechar una unión caso por caso, TS
 * va tachando variantes en cada rama: si las manejaste todas, lo que queda al final
 * es never; si olvidaste una, queda esa variante, todavía viva.
 *
 * SINTAXIS
 * function area(f: Figura): number {
 *   switch (f.tipo) {
 *     case "circulo":    return Math.PI * f.radio ** 2
 *     case "rectangulo": return f.ancho * f.alto
 *     case "cuadrado":   return f.lado ** 2
 *     default:
 *       const _exhaustivo: never = f // compila solo si aquí f es never
 *       return _exhaustivo
 *   }
 * }
 *
 * 🧠 ANALOGÍA — el portero con lista de invitados: tacha nombres según entran y al
 * final mira la lista. Toda tachada (never): no falta nadie. Un nombre sin tachar
 * hace saltar la alarma. El const _: never = f es esa mirada final.
 *
 * 💡 Si mañana añades { tipo: "triangulo"; … } a Figura y no agregas su case, en el
 * default f todavía puede ser el triángulo: no es never, y esa línea no compila. El
 * olvido se vuelve un error al compilar, no un bug en producción.
 * ───────────────────────────────────────────────────────────────────────────── */

/* B1) Calcula el área de las tres figuras con switch, y añade la rama default
 * con el chequeo const _exhaustivo: never = figura. Copia el patrón de la
 * explicación y entiéndelo línea por línea.
 *   areaTotal({ tipo: "circulo", radio: 2 }) → Math.PI * 4
 *   areaTotal({ tipo: "rectangulo", ancho: 3, alto: 4 }) → 12
 *   areaTotal({ tipo: "cuadrado", lado: 5 }) → 25
 */
export function areaTotal(figura: Figura): number {
  // completa aquí (switch con los 3 case + default con `never`)
  switch (figura.tipo) {
    case "circulo":
      return Math.PI * figura.radio ** 2;
    case "rectangulo":
      return figura.ancho * figura.alto;
    case "cuadrado":
      return figura.lado ** 2;
    default: {
      const _exhaustivo: never = figura;
      return _exhaustivo;
    }
  }
}

/* B2) Prueba de fuego. Esta Figura2 tiene cuatro variantes (incluye "triangulo").
 * Maneja las cuatro con switch + el never final. Si te falta una, el never
 * no compilará: esa es justo la red de seguridad que queremos sentir.
 *   perimetro({ tipo: "triangulo", a: 3, b: 4, c: 5 }) → 12
 */
export type Figura2 =
  | { tipo: "circulo"; radio: number }
  | { tipo: "rectangulo"; ancho: number; alto: number }
  | { tipo: "cuadrado"; lado: number }
  | { tipo: "triangulo"; a: number; b: number; c: number };
export function perimetro(figura: Figura2): number {
  switch (figura.tipo) {
    case "circulo":
      return 2 * Math.PI * figura.radio;
    case "rectangulo":
      return 2 * (figura.ancho + figura.alto);
    case "cuadrado":
      return 4 * figura.lado;
    case "triangulo":
      return figura.a + figura.b + figura.c;
    default: {
      const _exhaustivo: never = figura;
      return _exhaustivo;
    }
  }
}
