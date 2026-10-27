/* =============================================================================
 * EJERCICIO 02 — funciones (2/?): parámetros opcionales ? y por defecto = · bloque 02
 *
 * 🎯 OBJETIVOS
 * · Dar un valor de respaldo a un parámetro con = valor.
 * · Marcar un parámetro como opcional con ? y contemplar su undefined.
 *
 * 🟢 CONTEXTO — no siempre quien llama tiene todos los datos. A veces un argumento
 * puede faltar (opcional), y a veces quieres un valor de respaldo cuando no lo
 * pasan (por defecto). Son dos herramientas parecidas pero distintas, y aquí se
 * separan.
 *
 * 🗺️ MAPA
 * TEORÍA · ? (puede faltar) frente a = (si falta, este valor) → base de todo
 * BLOQUE A · parámetro por defecto → drills 1–2
 * BLOQUE B · parámetro opcional → drills 3–4
 * BLOQUE C · capstone: varios por defecto juntos → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/02-funciones/exercise-02.test.ts
 * pnpm typecheck
 *
 * Los starters dejan los parámetros obligatorios: llamar con menos argumentos no
 * compila (y el cuerpo da undefined). Corre el test tras cada uno.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — ? (puede faltar) frente a = (si falta, este valor)
 *
 * DEFINICIÓN
 * Con = valor, el hueco se rellena solo con valor: dentro, el parámetro es del tipo
 * normal (string) y nunca es undefined. Con ?, el hueco puede quedar vacío: dentro,
 * el parámetro es string | undefined, y tienes que contemplar el caso ausente.
 *
 * SINTAXIS
 * function saludar(nombre: string, saludo = "Hola"): string { … } // por defecto
 * function etiqueta(texto: string, sufijo?: string): string { … } // opcional
 *
 * 🧠 ANALOGÍA — un formulario: el campo «apodo» puede ir en blanco (?); el campo
 * «país» trae «España» ya escrito, y lo cambias si quieres (= "España").
 *
 * ⚠️ TRAMPA — los opcionales y los por defecto van después de los obligatorios: no
 * puedes poner (saludo = "Hola", nombre: string).
 *
 * 💡 Por dentro, los dos hacen que el argumento sea opcional al llamar. La
 * diferencia es lo que ves dentro: con = el valor ya viene resuelto; con ? te toca
 * a ti decidir qué hacer si es undefined.
 *
 * 💡 Caso real: function crearBtn(texto: string, variante = "primario"). La mayoría
 * de botones son primarios; solo pasas la variante cuando es otra.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE A — parámetro por defecto (= valor) */

/* 1) saludar — "<saludo>, <nombre>". Si no pasan saludo, usa "Hola".
 * 👉 Dos cosas: (a) dale a saludo un valor por defecto = "Hola" para que
 *    saludar("Ana") (un solo argumento) sea válido, y (b) escribe el cuerpo.
 *   saludar("Ana") → "Hola, Ana"     saludar("Ana", "Hey") → "Hey, Ana"
 */
export function saludar(nombre: string, saludo = "Hola"): string {
  return `${saludo}, ${nombre}`;
}
/* 2) potencia — base elevada a exp; si no pasan exp, eleva al cuadrado (2).
 * 👉 Dos cosas: el valor por defecto de exp y el cuerpo.
 *   potencia(3) → 9     potencia(2, 3) → 8
 */
export function potencia(base: number, exp = 2): number {
  return base ** exp;
}

/* ▸ BLOQUE B — parámetro opcional (?): hay que contemplar el undefined */

/* 3) etiqueta — el texto, y si viene sufijo, pégaselo detrás.
 * 👉 Dos arreglos: marca sufijo como opcional (?) y, en el cuerpo,
 *    contempla que pueda faltar (si no hay sufijo, devuelve solo el texto).
 *   etiqueta("Hola") → "Hola"     etiqueta("Hola", "!") → "Hola!"
 */
export function etiqueta(texto: string, sufijo?: string): string {
  return texto + (sufijo ?? "");
}

/* 4) rango — "min-max" si dan max; "min+" si no.
 * 👉 Dos cosas: marca max como opcional (?) y escribe el cuerpo (los dos casos).
 *   rango(10, 20) → "10-20"     rango(10) → "10+"
 */
export function rango(min: number, max?: number): string {
  if (max === undefined) {
    return `${min}+`;
  }
  return `${min}-${max}`;
}

/* ▸ BLOQUE C — capstone: varios por defecto juntos */

/* 5) formatearPrecio — <moneda><precio con N decimales>. Por defecto, "$" y 2
 * decimales.
 * 👉 Dos valores por defecto (moneda = "$", decimales = 2) y escribe el cuerpo.
 *   formatearPrecio(5) → "$5.00"     formatearPrecio(5, "€", 1) → "€5.0"
 */
export function formatearPrecio(precio: number, moneda = "$", decimales = 2): string {
  return `${moneda}${precio.toFixed(decimales)}`;
}
