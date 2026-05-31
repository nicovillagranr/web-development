/* =============================================================================
 * EJERCICIO 09 — Las funciones son valores (y se pueden pasar como ingrediente)
 * =============================================================================
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 * Idea central: en JavaScript, una función es UN VALOR más, igual que un número
 * o un string. Y como cualquier valor, puedes:
 *   - guardarla en una variable,
 *   - PASARLA como ingrediente a otra función,
 *   - devolverla.
 *
 * Y como es un valor, tiene un TIPO. El tipo de una función se escribe con una
 * flecha que dice "qué recibe => qué devuelve":
 *
 *   (n: number) => number     // "recibe un number y devuelve un number"
 *   (texto: string) => string // "recibe un string y devuelve un string"
 *
 * Eso NO es una función con cuerpo; es solo la DESCRIPCIÓN (la etiqueta) de qué
 * forma tiene la función.
 *
 *
 * ▸ ANALOGÍA — la lavadora con programa intercambiable
 * ----------------------------------------------------------------------------
 * Una lavadora recibe DOS cosas para funcionar:
 *   1. La ROPA          → un dato normal (ej: un número).
 *   2. El PROGRAMA       → "lavado en frío", "centrifugado"... una INSTRUCCIÓN,
 *                          algo que HACE cosas. Esto es una función.
 *
 * La lavadora no decide el programa de antemano: tú se lo entregas en el momento
 * y ella lo aplica a tu ropa. Ese "programa que entregas" es la función que
 * pasas como ingrediente. Aquí lo llamaremos `operacion` para que se lea claro.
 *
 *
 * ▸ EJEMPLO 1 — guardar una función en una variable (con su tipo a la izquierda)
 * ----------------------------------------------------------------------------
 *
 *   const doblar: (n: number) => number = (n) => n * 2;
 *         └─┬──┘  └──── tipo ─────────┘   └── valor ──┘
 *        nombre  (qué forma tiene)        (la función real)
 *
 *   doblar(5); // 10
 *
 * Como el tipo ya está a la IZQUIERDA, dentro de `(n) => n * 2` no repites el
 * tipo de `n`: TS lo deduce solo. Estructura: `const nombre: Tipo = valor`.
 * (Ojo: entre el nombre y el tipo va ":", y antes del valor va "=".)
 *
 *
 * ▸ EJEMPLO 2 — una función que recibe OTRA función como ingrediente
 * ----------------------------------------------------------------------------
 * Aquí `operacion` es un parámetro, pero su tipo es una FUNCIÓN, no un número:
 *
 *   function transformar(
 *     numero: number,                       // la "ropa"
 *     operacion: (n: number) => number       // el "programa" que aplicaremos
 *   ): number {
 *     return operacion(numero);  // aplica el programa a la ropa y devuelve
 *   }
 *
 *   transformar(5, (n) => n * 2);  // 10   → usa el programa "multiplica por 2"
 *   transformar(9, (n) => n - 1);  // 8    → usa el programa "resta 1"
 *
 * La MISMA función `transformar`, pero le entregas un programa distinto cada vez
 * y obtienes un resultado distinto. Eso es todo el truco: `transformar` no sabe
 * qué operación harás; tú se la das. (Esto es lo que hacen `map`, `filter`, y
 * los `onClick` de React: reciben una operación y la aplican.)
 *
 * Cómo se ejecuta `transformar(5, (n) => n * 2)` por dentro:
 *   1. numero = 5
 *   2. operacion = la función (n) => n * 2
 *   3. return operacion(5)  →  ejecuta (n) => n * 2 con n = 5  →  10
 *
 *
 * ▸ EJEMPLO 3 — una función que DEVUELVE una función
 * ----------------------------------------------------------------------------
 *
 *   function crearSumador(cantidad: number): (n: number) => number {
 *     return (n) => n + cantidad;   // devuelve una función ya configurada
 *   }
 *
 *   const sumar10 = crearSumador(10); // sumar10 es una función
 *   sumar10(5);  // 15
 *   sumar10(1);  // 11
 *
 * El tipo de retorno `(n: number) => number` significa "esta función devuelve
 * OTRA función". La función creada "recuerda" la `cantidad` con la que nació.
 *
 *
 * ▸ EJERCICIO
 * ----------------------------------------------------------------------------
 *
 * Reglas:
 *   - ❌ No uses `any`, no uses `as X` (type assertions).
 *   - ✅ Anota los tipos función con la sintaxis de flecha `(...) => ...`.
 *   - ✅ `pnpm test:run` y `pnpm typecheck` limpios.
 *
 * ===========================================================================*/

// 1) Declara una constante `restar` con su TIPO a la izquierda: una función que
//    recibe dos number y devuelve un number. El cuerpo resta b de a.
//    Copia la forma del EJEMPLO 1: `const nombre: Tipo = valor`.
//      restar(10, 3) → 7
export const restar: (a: number, b: number) => number = (a, b) => a - b;


// 2) `transformar(numero, operacion)` aplica `operacion` a `numero` y devuelve
//    el resultado. Es como la lavadora: `numero` es la ropa, `operacion` es el
//    programa. Copia la forma del EJEMPLO 2.
//      transformar(5, (n) => n * 2) → 10
//      transformar(9, (n) => n - 1) → 8
export function transformar(/* TODO: numero y operacion */): number {
  // TODO: aplica operacion a numero y devuélvelo
  return 0;
}


// 3) `crearMultiplicador(factor)` DEVUELVE una función que recibe un number y lo
//    multiplica por `factor`. Copia la forma del EJEMPLO 3 (anota el tipo de
//    retorno como una función `(n: number) => number`).
//      const triple = crearMultiplicador(3);
//      triple(4) → 12
export function crearMultiplicador(factor: number) /* TODO: anota el retorno */ {
  // TODO: devuelve una función que multiplica su argumento por factor
}
