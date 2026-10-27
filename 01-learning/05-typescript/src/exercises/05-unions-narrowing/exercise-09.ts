/* =============================================================================
 * EJERCICIO 09 — narrowing con el operador in (dos formas de objeto) · bloque 05
 *
 * 🎯 OBJETIVOS
 * · Distinguir dos formas de objeto por la propiedad que solo una tiene.
 * · Calcular sobre una lista de formas mezcladas.
 *
 * 🟢 CONTEXTO — cuando la unión es de objetos sin una etiqueta común, distingues
 * por qué propiedad tiene cada uno: 'lado' in figura estrecha a la forma que tiene
 * lado.
 *
 * 🗺️ MAPA
 * TEORÍA · el operador in → base de todo el archivo
 * BLOQUE A · calcular según la forma → drills 1–2
 * BLOQUE B · otra unión, y texto → drills 3–4
 * BLOQUE C · capstone: sumar áreas mezcladas → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/05-unions-narrowing/exercise-09.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — el operador in
 *
 * DEFINICIÓN
 * in mira si la propiedad existe en el objeto. Sirve cuando cada forma de la unión
 * tiene una propiedad propia que la otra no tiene.
 *
 * SINTAXIS
 * function area(f: Cuadrado | Rectangulo): number {
 *   return 'lado' in f
 *     ? f.lado * f.lado  // aquí f es Cuadrado
 *     : f.ancho * f.alto // aquí f es Rectangulo
 * }
 *
 * 🧠 ANALOGÍA — dos formularios distintos: miras qué casilla trae rellena («lado» o
 * «ancho y alto») para saber cuál es y leer los campos correctos.
 * ───────────────────────────────────────────────────────────────────────────── */

export type Cuadrado = { lado: number };
export type Rectangulo = { ancho: number; alto: number };
export type Usuario = { email: string };
export type Empresa = { ruc: string };

/* ▸ BLOQUE A — calcular según la forma */

/* 1) area — área del cuadrado (lado²) o del rectángulo (ancho*alto).
 * area({ lado: 3 }) → 9 ; area({ ancho: 2, alto: 5 }) → 10
 */
export function area(f: Cuadrado | Rectangulo): number {
  return "lado" in f ? f.lado * f.lado : f.ancho * f.alto;
}

/* 2) perimetro — perímetro del cuadrado (4*lado) o del rectángulo (2*(ancho+alto)).
 * perimetro({ lado: 3 }) → 12 ; perimetro({ ancho: 2, alto: 5 }) → 14
 */
export function perimetro(f: Cuadrado | Rectangulo): number {
  return "lado" in f ? 4 * f.lado : 2 * (f.ancho + f.alto);
}

/* ▸ BLOQUE B — otra unión, y texto */

/* 3) identificador — el email (usuario) o el ruc (empresa).
 * identificador({ email: "x@y" }) → "x@y" ; identificador({ ruc: "123" }) → "123"
 */
export function identificador(e: Usuario | Empresa): string {
  return "email" in e ? e.email : e.ruc;
}

/* 4) descripcion — "cuadrado de N" o "rect AxB".
 * descripcion({ lado: 3 }) → "cuadrado de 3" ; descripcion({ ancho: 2, alto: 5 }) → "rect 2x5"
 */
export function descripcion(f: Cuadrado | Rectangulo): string {
  return "lado" in f ? `cuadrado de ${f.lado}` : `rect ${f.ancho}x${f.alto}`;
}

/* ▸ BLOQUE C — capstone: sumar áreas mezcladas */

/* 5) areaTotal — la suma de áreas de una lista de figuras mezcladas.
 * areaTotal([{ lado: 2 }, { ancho: 2, alto: 3 }]) → 10
 */
export function areaTotal(figuras: (Cuadrado | Rectangulo)[]): number {
  return figuras.map(area).reduce((a, b) => a + b, 0);
}
