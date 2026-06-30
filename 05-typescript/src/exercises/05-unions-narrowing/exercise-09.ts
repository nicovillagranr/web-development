/* =============================================================================
 * EJERCICIO 09 — Narrowing con el operador `in` (dos formas de objeto)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Cuando la unión es de OBJETOS sin una etiqueta común, distingues por qué
 * PROPIEDAD tiene cada uno: `'lado' in figura` estrecha a la forma que tiene `lado`.
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 *     function area(f: Cuadrado | Rectangulo): number {
 *       return 'lado' in f
 *         ? f.lado * f.lado        // aquí f es Cuadrado
 *         : f.ancho * f.alto       // aquí f es Rectangulo
 *     }
 *
 * 🧠 ANALOGÍA: dos formularios distintos. Miras qué CASILLA trae rellena ("lado" vs
 *    "ancho/alto") para saber cuál es y leer los campos correctos.
 *
 * OJO — `in` mira si la propiedad EXISTE en el objeto; sirve cuando cada forma de
 *    la unión tiene una propiedad propia que la otra no.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/05-unions-narrowing/exercise-09.test.ts
 * ===========================================================================*/

export type Cuadrado = { lado: number }
export type Rectangulo = { ancho: number; alto: number }
export type Usuario = { email: string }
export type Empresa = { ruc: string }

/* --- BLOQUE A — calcular según la forma --- */

// 1) `area` — área del cuadrado (lado²) o del rectángulo (ancho*alto).
//    area({ lado: 3 }) → 9 ; area({ ancho: 2, alto: 5 }) → 10
export function area(f: Cuadrado | Rectangulo): number {
  return 0
}

// 2) `perimetro` — perímetro del cuadrado (4*lado) o del rectángulo (2*(ancho+alto)).
//    perimetro({ lado: 3 }) → 12 ; perimetro({ ancho: 2, alto: 5 }) → 14
export function perimetro(f: Cuadrado | Rectangulo): number {
  return 0
}

/* --- BLOQUE B — otra unión, y texto --- */

// 3) `identificador` — el email (usuario) o el ruc (empresa).
//    identificador({ email: "x@y" }) → "x@y" ; identificador({ ruc: "123" }) → "123"
export function identificador(e: Usuario | Empresa): string {
  return ''
}

// 4) `descripcion` — "cuadrado de N" o "rect AxB".
//    descripcion({ lado: 3 }) → "cuadrado de 3" ; descripcion({ ancho: 2, alto: 5 }) → "rect 2x5"
export function descripcion(f: Cuadrado | Rectangulo): string {
  return ''
}

/* --- BLOQUE C — CAPSTONE: sumar áreas mezcladas --- */

// 5) `areaTotal` — la suma de áreas de una lista de figuras mezcladas.
//    areaTotal([{ lado: 2 }, { ancho: 2, alto: 3 }]) → 10
export function areaTotal(figuras: (Cuadrado | Rectangulo)[]): number {
  return 0
}
