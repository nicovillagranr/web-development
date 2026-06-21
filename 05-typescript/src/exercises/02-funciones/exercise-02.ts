/* =============================================================================
 * EJERCICIO 02 — funciones (2/?): parámetros OPCIONALES `?` y POR DEFECTO `=`
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * No siempre quien llama tiene todos los datos. A veces un argumento puede faltar
 * (opcional) y a veces quieres un VALOR DE RESPALDO cuando no lo pasan (por
 * defecto). Son dos herramientas parecidas pero distintas; aquí las separas.
 *
 *
 * ▸ EXPLICACIÓN — `?` (puede faltar) vs `=` (si falta, este valor)
 * ----------------------------------------------------------------------------
 *     function saludar(nombre: string, saludo = "Hola"): string { ... }
 *     //                                       ▲ POR DEFECTO: si no lo pasan, vale "Hola"
 *     function etiqueta(texto: string, sufijo?: string): string { ... }
 *     //                                       ▲ OPCIONAL: puede faltar → tipo string | undefined
 *
 *   - `= valor`  → el hueco se RELLENA solo con `valor`. Dentro, el parámetro es
 *                  del tipo normal (`string`): nunca es undefined.
 *   - `?`        → el hueco puede quedar VACÍO. Dentro, el parámetro es
 *                  `string | undefined`: TIENES que contemplar el caso ausente.
 *
 * 🧠 ANALOGÍA: un formulario. El campo "apodo" puede ir en blanco (`?`). El campo
 *    "país" trae "España" ya escrito y lo cambias si quieres (`= "España"`).
 *
 * 🔧 POR DENTRO: los dos hacen que el argumento sea OPCIONAL al LLAMAR. La
 *    diferencia es lo que ves DENTRO: con `=` el valor ya viene resuelto; con `?`
 *    te toca a ti decidir qué hacer si es undefined.
 *
 * 💼 CASO REAL: `function crearBtn(texto: string, variante = "primario")`. La
 *    mayoría de botones son primarios; solo pasas la variante cuando es otra.
 *
 * OJO — los opcionales/por-defecto van DESPUÉS de los obligatorios. No puedes
 *    poner `(saludo = "Hola", nombre: string)`.
 *
 *
 * ▸ EJERCICIO — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as`.
 * ----------------------------------------------------------------------------
 * Los starters dejan los parámetros OBLIGATORIOS → llamar con menos argumentos
 * no compila (y el cuerpo da undefined). Corre el test tras cada uno:
 *     pnpm test:run src/exercises/02-funciones/exercise-02.test.ts
 * ===========================================================================*/


/* ---------------------------------------------------------------------------
 * BLOQUE A — parámetro POR DEFECTO (`= valor`)
 * -------------------------------------------------------------------------- */

// 1) `saludar` — "<saludo>, <nombre>". Si no pasan saludo, usa "Hola".
//    👉 Dos cosas: (a) dale a `saludo` un valor por defecto `= "Hola"` para que
//       `saludar("Ana")` (un solo argumento) sea válido, y (b) escribe el cuerpo.
//      saludar("Ana") → "Hola, Ana"     saludar("Ana", "Hey") → "Hey, Ana"
export function saludar(nombre: string, saludo: string): string {
  return ""
}
saludar("Hola", "Nico") // → "Hola, Nico"

// 2) `potencia` — base elevada a `exp`; si no pasan exp, eleva al cuadrado (2).
//    👉 Dos cosas: el valor por defecto de `exp` y el cuerpo.
//      potencia(3) → 9     potencia(2, 3) → 8
export function potencia(base: number, exp: number): number {
  return 0
}


/* ---------------------------------------------------------------------------
 * BLOQUE B — parámetro OPCIONAL (`?`) → hay que contemplar el undefined
 * -------------------------------------------------------------------------- */

// 3) `etiqueta` — el texto, y si viene `sufijo`, pégaselo detrás.
//    👉 Dos arreglos: marca `sufijo` como opcional (`?`) y, en el cuerpo,
//       contempla que pueda faltar (si no hay sufijo, devuelve solo el texto).
//      etiqueta("Hola") → "Hola"     etiqueta("Hola", "!") → "Hola!"
export function etiqueta(texto: string, sufijo: string): string {
  return ""
}

// 4) `rango` — "min-max" si dan max; "min+" si no.
//    👉 Dos cosas: marca `max` como opcional (`?`) y escribe el cuerpo (los dos casos).
//      rango(10, 20) → "10-20"     rango(10) → "10+"
export function rango(min: number, max: number): string {
  return ""
}


/* ---------------------------------------------------------------------------
 * BLOQUE C — CAPSTONE: varios por-defecto juntos
 * -------------------------------------------------------------------------- */

// 5) `formatearPrecio` — `<moneda><precio con N decimales>`. Por defecto, "$" y 2
//    decimales.
//    👉 Dos valores por defecto (`moneda = "$"`, `decimales = 2`) y escribe el cuerpo.
//      formatearPrecio(5) → "$5.00"     formatearPrecio(5, "€", 1) → "€5.0"
export function formatearPrecio(precio: number, moneda: string, decimales: number): string {
  return ""
}
