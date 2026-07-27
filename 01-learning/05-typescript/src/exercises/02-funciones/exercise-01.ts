/* =============================================================================
 * EJERCICIO 01 — Las funciones son valores (y se pueden pasar como ingrediente)
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
 * ▸ ANATOMÍA DE LA SINTAXIS (léela despacio, es TODO el truco)
 * ----------------------------------------------------------------------------
 *
 *   const   doblar   :   (n: number) => number   =   (n) => n * 2
 *    │        │      │           │                │         │
 *    │        │      │           │                │         └─ EL VALOR: la función
 *    │        │      │           │                │            REAL, la que se ejecuta.
 *    │        │      │           │                └─ el "=" separa describir de hacer.
 *    │        │      │           └─ EL TIPO: solo DESCRIBE la forma
 *    │        │      │              ("recibe un number, devuelve un number").
 *    │        │      │              No ejecuta nada, es una etiqueta.
 *    │        │      └─ ":" presenta el tipo.
 *    │        └─ nombre de la constante.
 *    └─ palabra clave.
 *
 *   IZQUIERDA del "=" → DESCRIBE qué forma tiene (no hace nada).
 *   DERECHA   del "=" → HACE el trabajo (la función de verdad).
 *
 *
 * ▸ DUDA CLÁSICA: ¿los nombres de los parámetros tienen que coincidir?
 * ----------------------------------------------------------------------------
 * NO. En el TIPO, el nombre del parámetro es DECORATIVO. Estas tres líneas
 * describen EXACTAMENTE el mismo tipo:
 *
 *   (n: number) => number
 *   (x: number) => number
 *   (loQueSea: number) => number
 *
 * Lo único que importa del tipo es: cuántos parámetros, de qué tipo, y qué
 * devuelve. El nombre real que usas en el cuerpo lo eliges en EL VALOR (derecha
 * del "="), y ese sí es el que escribes dentro de la función. Por eso
 * `transformar(5, (n) => n * 2)` y `transformar(5, (x) => x * 2)` dan lo mismo
 * (10): el 5 entra y se le pone la etiqueta interna que TÚ decidas, da igual cómo.
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
 * pasas como ingrediente.
 *
 *
 * ▸ EJEMPLO 1 — guardar una función en una variable (con su tipo a la izquierda)
 * ----------------------------------------------------------------------------
 *
 *   const doblar: (n: number) => number = (n) => n * 2;
 *
 *   doblar(5); // 10
 *
 * Como el tipo ya está a la IZQUIERDA, dentro de `(n) => n * 2` no repites el
 * tipo de `n`: TS lo deduce solo. Estructura: `const nombre: Tipo = valor`.
 *
 *
 * ▸ EJEMPLO 2 — una función que recibe OTRA función como ingrediente
 * ----------------------------------------------------------------------------
 *
 *   function transformar(numero: number, operacion: (n: number) => number): number {
 *     return operacion(numero);  // aplica el programa a la ropa y devuelve
 *   }
 *
 *   transformar(5, (n) => n * 2);  // 10
 *
 * Cómo se ejecuta por dentro:
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
 *   const sumar10 = crearSumador(10);
 *   sumar10(5);  // 15
 *
 * El tipo de retorno `(n: number) => number` significa "esta función devuelve
 * OTRA función". La función creada "recuerda" la `cantidad` con la que nació.
 *
 *
 * ▸ EJERCICIO — 10 drills en escalera (del más simple al más complejo)
 * ----------------------------------------------------------------------------
 * Hazlos EN ORDEN. Cada cuerpo provisional está MAL a propósito: arréglalo.
 *
 * Reglas:
 *   - ❌ No uses `any`, no uses `as X` (type assertions).
 *   - ✅ Anota los tipos función con la sintaxis de flecha `(...) => ...`.
 *   - ✅ `pnpm test:run` y `pnpm typecheck` limpios.
 *
 * ===========================================================================*/


/* ----------------------------------------------------------------------------
 * BLOQUE A — Guardar una función en una constante (tipo a la IZQUIERDA)
 * Aquí solo escribes el cuerpo; el TIPO ya te lo doy para que lo leas.
 * -------------------------------------------------------------------------- */

// 1) `obtenerSaludo` no recibe nada y devuelve siempre el string "hola".
//    Lee el tipo: `() => string` = "no recibe nada, devuelve un string".
//      obtenerSaludo() → "hola"
export const obtenerSaludo: () => string = () => `hola`;
obtenerSaludo();


// 2) `doblar` recibe un number y devuelve ese number multiplicado por 2.
//    Tipo: `(n: number) => number`.
//      doblar(5) → 10
export const doblar: (n: number) => number = (n) => n * 2;
doblar(6) // 12


// 3) `enMayusculas` recibe un string y lo devuelve en MAYÚSCULAS.
//    Tipo: `(texto: string) => string`. (Pista: los string tienen .toUpperCase())
//      enMayusculas("hola") → "HOLA"
export const enMayusculas: (texto: string) => string = (texto) => texto.toUpperCase();


/* ----------------------------------------------------------------------------
 * BLOQUE B — Ahora TÚ escribes el tipo a la izquierda (no solo el cuerpo)
 * Te dejo el valor en estilo "tipo a la derecha"; reescríbelo con el TIPO A LA
 * IZQUIERDA, como en el BLOQUE A, y corrige el cuerpo.
 * -------------------------------------------------------------------------- */

// 4) `sumar` recibe dos number y devuelve su suma.
//    Reescríbelo como `export const sumar: (a: number, b: number) => number = (a, b) => ...`
//      sumar(3, 4) → 7
export const sumar = (a: number, b: number): number => a + b;
sumar(10, 20);


// 5) `esMayorDeEdad` recibe una edad (number) y devuelve un boolean: true si es
//    18 o más. Reescríbelo con el tipo a la izquierda. Tipo: (edad: number) => boolean
//      esMayorDeEdad(20) → true ; esMayorDeEdad(15) → false
export const esMayorDeEdad = (edad: number): boolean => edad >= 18;
esMayorDeEdad(20); // true
esMayorDeEdad(15); // false


/* ----------------------------------------------------------------------------
 * BLOQUE C — Recibir una función como ingrediente (callbacks / higher-order)
 * El parámetro `fn` NO es un dato: es una función. Mira su tipo entre paréntesis.
 * -------------------------------------------------------------------------- */

// 6) `aplicar(valor, fn)` aplica la función `fn` al `valor` y devuelve el resultado.
//    (Es la lavadora otra vez: `valor` es la ropa, `fn` es el programa.)
//      aplicar(10, (n) => n + 1) → 11
//      aplicar(10, (n) => n * 3) → 30
export function aplicar(valor: number, fn: (n: number) => number): number {
  return fn(valor);
}
// aplicar(10, (n) => n + 6); // 16

// 7) `describir(n, fn)` recibe un number y una función que convierte number→string,
//    y devuelve ese string. Fíjate: aquí `fn` DEVUELVE un string, no un number.
//      describir(5, (n) => "número " + n) → "número 5"
export function describir(n: number, fn: (n: number) => string): string {
  return fn(n);
}
describir(5, (n) => `número ${n}`);

// 8) `aplicarDosVeces(n, fn)` aplica `fn` al número, y luego aplica `fn` OTRA VEZ
//    al resultado. (Pista: necesitas anidar la llamada: fn( fn( ... ) ).)
//      aplicarDosVeces(3, (n) => n + 1) → 5     (3 → 4 → 5)
//      aplicarDosVeces(2, (n) => n * 2) → 8     (2 → 4 → 8)
export function aplicarDosVeces(n: number, fn: (n: number) => number): number {
  return fn(fn(n))
}
aplicarDosVeces(3, (n) => n + 1); // 5

/* ----------------------------------------------------------------------------
 * BLOQUE D — Devolver una función (la parte que faltaba antes en el 09)
 * La función NO devuelve un dato: devuelve OTRA función ya configurada.
 * -------------------------------------------------------------------------- */

// 9) `crearMultiplicador(factor)` DEVUELVE una función que multiplica lo que
//    reciba por `factor`. Tienes que: (a) anotar el RETORNO como
//    `(n: number) => number`, y (b) devolver `(n) => n * factor`.
//      const por5 = crearMultiplicador(5);
//      por5(10) → 50 ; por5(0) → 0
export function crearMultiplicador(factor: number): (n: number) => number {
  return (n: number) => n * factor;
}
// Tu máquina de "billetes": fabrica un multiplicador por 1000.
const billeteDeMil = crearMultiplicador(1000);
billeteDeMil(1); // 1000


// 10) `crearRepetidor(veces)` DEVUELVE una función que recibe un string y lo
//     repite `veces` veces. Anota el retorno `(texto: string) => string`.
//     (Pista: los string tienen .repeat(veces).)
//      const triple = crearRepetidor(3);
//      triple("ab") → "ababab"
export function crearRepetidor(veces: number): (texto: string) => string {
  return (texto: string) => texto.repeat(veces);
}
const triple = crearRepetidor(3);
triple("ab") // "ababab"
