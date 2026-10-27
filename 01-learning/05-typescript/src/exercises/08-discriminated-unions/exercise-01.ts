/* =============================================================================
 * EJERCICIO 01 — uniones discriminadas (discriminated unions) · bloque 08
 *
 * 🎯 OBJETIVOS
 * · Definir una unión de objetos con una propiedad discriminante literal.
 * · Estrechar con if o switch sobre esa propiedad antes de leer los campos propios.
 *
 * 🟢 CONTEXTO — en el 07 estrechaste uniones de primitivos (string | number) con
 * typeof. Pero typeof solo sirve para primitivos: con una unión de objetos,
 * typeof obj siempre dice "object" y no distingue nada. Si Figura es
 * { radio: number } | { lado: number }, f.radio no compila: TS no sabe cuál llegó.
 *
 * 🗺️ MAPA
 * TEORÍA 1 · la propiedad discriminante → drills 1–3
 *
 * ▸ 3 drills en orden. Prohibidos any y as X (type assertions). Estrecha siempre
 * comprobando la propiedad discriminante antes de leer los campos de una variante.
 * pnpm test:run src/exercises/08-discriminated-unions/exercise-01.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — la propiedad discriminante
 *
 * DEFINICIÓN
 * Una unión discriminada es una unión de objetos que comparten un campo «tag» con
 * un tipo literal distinto en cada variante. Ese campo se lee en ejecución y al
 * compilar: comprobándolo, TS estrecha y sabe qué variante llegó.
 *
 * SINTAXIS
 * type Pago =
 *   | { metodo: "efectivo"; monto: number }
 *   | { metodo: "tarjeta"; monto: number; ultimos4: string };
 *
 * function recibo(p: Pago): string {
 *   if (p.metodo === "efectivo") {
 *     return `Pagaste ${p.monto} en efectivo`;
 *   }
 *   return `Pagaste ${p.monto} con tarjeta ****${p.ultimos4}`; // aquí p es tarjeta
 * }
 *
 * Con switch estrecha igual, y es más cómodo cuando hay 3 variantes o más:
 * switch (p.metodo) {
 *   case "efectivo": return `Efectivo: ${p.monto}`;
 *   case "tarjeta":  return `Tarjeta ****${p.ultimos4}`;
 * }
 *
 * 🧠 ANALOGÍA — sobres en correos: por fuera todos son sobres, pero cada uno lleva
 * una etiqueta de color (azul = carta, rojo = paquete). El cartero mira la
 * etiqueta primero, y entonces sabe qué hay dentro y cómo tratarlo.
 *
 * 🗣️ LAS PIEZAS
 * propiedad discriminante → el campo común con un literal distinto (metodo, tipo)
 * variante                → cada objeto de la unión
 * campo propio            → el que solo existe en una variante (ultimos4)
 *
 * ⚠️ TRAMPA — ultimos4 solo existe en la variante tarjeta: TS te deja leerlo solo
 * después de comprobar p.metodo === "tarjeta". Antes, te lo prohíbe.
 *
 * 💡 Cuándo usarla: cuando un dato puede ser «uno de varios casos» y cada caso
 * lleva campos distintos: estados (cargando / ok / error), eventos, formas,
 * métodos de pago… En React la verás a diario:
 * { estado: "loading" } | { estado: "success"; data: T } | { estado: "error"; mensaje: string }
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) Define una unión discriminada Figura con dos variantes que compartan la
 * propiedad discriminante tipo (un literal distinto en cada una):
 *   - tipo "circulo" → además: radio: number
 *   - tipo "cuadrado" → además: lado: number
 */
export type Figura = { tipo: "circulo"; radio: number } | { tipo: "cuadrado"; lado: number };

/* 2) area(figura: Figura): number
 * - Si es "circulo"  → devuelve  Math.PI * radio²   (pista: radio ** 2).
 * - Si es "cuadrado" → devuelve  lado²
 * Estrecha por figura.tipo antes de leer radio o lado.
 */
export function area(figura: Figura): number {
  if (figura.tipo === "circulo") {
    return Math.PI * figura.radio ** 2;
  } else {
    return figura.lado ** 2;
  }
}

/* 3) describir(figura: Figura): string
 * - "circulo"  → `Círculo de radio ${radio}`
 * - "cuadrado" → `Cuadrado de lado ${lado}`
 * Usa if o switch sobre figura.tipo, como prefieras.
 */
export function describir(figura: Figura): string {
  if (figura.tipo === "circulo") {
    return `Círculo de radio ${figura.radio}`;
  } else {
    return `Cuadrado de lado ${figura.lado}`;
  }
}
