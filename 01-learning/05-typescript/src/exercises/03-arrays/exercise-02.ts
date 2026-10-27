/* =============================================================================
 * EJERCICIO 02 — darle una «máquina» a una función para que la aplique · bloque 03
 *
 * 🎯 OBJETIVOS
 * · Leer el tipo de una función-parámetro: lo que entra y lo que sale del =>.
 * · Aplicarla una vez, varias, sobre cada elemento de un array, y encadenada con
 *   filter y reduce.
 *
 * 🟢 CONTEXTO — en el parcial, la Parte C no salió sólida. El patrón en común: una
 * función que recibe otra función como ingrediente y la aplica (1 vez, N veces,
 * sobre arrays y objetos). Aquí se baja a 10 pasos con nombres con sentido (nada de
 * fn ni n) y analogías de la vida real.
 *
 * 🗺️ MAPA
 * TEORÍA · la máquina: leerla, aplicarla, repetirla → base de todo el archivo
 * BLOQUE A · aplicar la máquina a un valor → drills 1–3
 * BLOQUE B · la máquina sobre cada elemento de un array → drills 4–6
 * BLOQUE C · la máquina cambia el tipo o trabaja con objetos → drills 7–8
 * BLOQUE D · combinar dos máquinas, encadenar → drills 9–10
 *
 * ▸ 10 drills en escalera, en orden. Prohibidos any, as X y mutar el array de
 * entrada.
 * pnpm test:run src/exercises/03-arrays/exercise-02.test.ts
 * pnpm typecheck
 *
 * Cada cuerpo provisional está mal a propósito: arréglalo y corre el test tras
 * cada uno.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — la máquina: leerla, aplicarla, repetirla
 *
 * DEFINICIÓN
 * Una función es una máquina: le metes algo por un lado y te entrega algo por el
 * otro. Cuando una función recibe otra, el parámetro lleva un tipo con flecha, y
 * la flecha parte la máquina en «qué recibe» y «qué devuelve». El tipo del
 * resultado de transformar(loquesea) es siempre la derecha.
 *
 * SINTAXIS
 * transformar: (valor: number) => number
 *
 * 🗣️ LAS PIEZAS
 * transformar     → su nombre
 * (valor: number) → lo que entra: la izquierda del =>
 * number          → lo que sale: la derecha del =>
 *
 * Ejemplos, con transformar = (valor) => valor + 10:
 * transformar                 → la máquina guardada, apagada: no hace nada
 * transformar(1)              → 11: apretar el botón con 1 dentro
 * transformar(transformar(1)) → transformar(11) = 21: se lee de dentro hacia fuera,
 *                               como f(f(x)) en mates
 * [1, 2].map(transformar)     → [11, 12]: cada uno pasa por la máquina una vez
 * nums.map((num) => transformar(transformar(num))) → cada uno pasa dos veces
 *
 * 🧠 ANALOGÍA — un exprimidor: entra una naranja, sale jugo. Y .map es una
 * fábrica: cada producto de la cinta pasa por la misma máquina.
 *
 * 💡 La diferencia entre «tener la máquina» y «usarla» son los ( ).
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE A — aplicar la máquina a un valor (sin array) */

/* 1) 🍊 El exprimidor. aplicar recibe un número y una máquina, y devuelve el
 * resultado de pasar el número por la máquina una vez.
 *   aplicar(5, (valor) => valor + 1) → 6 ; aplicar(3, (valor) => valor * 10) → 30
 */
export function aplicar(num: number, transformar: (valor: number) => number): number {
  return transformar(num);
}
aplicar(1, (valor) => valor + 1);

/* 2) 🏷️ La etiquetadora. Lo mismo pero con texto: recibe un texto y una máquina
 * de texto, y devuelve el texto ya transformado una vez.
 *   aplicarTexto("hola", (palabra) => palabra.toUpperCase()) → "hola"
 */
export function aplicarTexto(texto: string, transformar: (palabra: string) => string): string {
  return transformar(texto);
}
aplicarTexto("nicolas", (palabra) => palabra.toUpperCase());

/* 3) 🧺 Dos lavadas seguidas. dosVeces pasa el número por la máquina dos veces
 * (el resultado de la primera entra a la segunda).
 *   dosVeces(1, (valor) => valor + 10) → 21 ; dosVeces(2, (valor) => valor * 2) → 8
 */
export function dosVeces(num: number, transformar: (valor: number) => number): number {
  return transformar(transformar(num));
}
dosVeces(1, (valor) => valor + 100);

/* ▸ BLOQUE B — aplicar la máquina sobre cada elemento de un array (fábrica) */

/* 4) 🏭 La cinta. mapear pasa cada número del array por la máquina una vez.
 * (Es tu propio .map: le entregas la máquina y él la aplica a cada uno.)
 *   mapear([1, 2, 3], (valor) => valor + 10) → [11, 12, 13]
 */
export function mapear(nums: number[], transformar: (valor: number) => number): number[] {
  return nums.map(transformar);
}
mapear([1, 2, 3], (valor) => valor + 10); // resultado: [11, 12, 13]

/* 5) 🏭🏭🏭 Tres pasadas. aplicaTresVeces pasa cada número por la máquina tres
 * veces. (Adentro del .map repites la idea del drill 3, pero una vez más.)
 *   aplicaTresVeces([1, 2], (valor) => valor + 10) → [31, 32]
 *   aplicaTresVeces([1, 2], (valor) => valor * 2)  → [8, 16]
 */
export function aplicaTresVeces(nums: number[], transformar: (valor: number) => number): number[] {
  return nums.map((num) => transformar(transformar(transformar(num))));
}
aplicaTresVeces([1], (valor) => valor + 10); // resultado 31

/* 6) 🏭 Pasadas a pedido. aplicaNVeces pasa cada número por la máquina la
 * cantidad de veces que diga cuantasVeces. Si es 0, el número sale igual.
 * (Pista: aquí un bucle for dentro del map sí vale.)
 *   aplicaNVeces([1], (valor) => valor + 1, 3) → [4]    (1 → 2 → 3 → 4)
 *   aplicaNVeces([2], (valor) => valor * 2, 2) → [8]    (2 → 4 → 8)
 */
export function aplicaNVeces(
  nums: number[],
  transformar: (valor: number) => number,
  cuantasVeces: number,
): number[] {
  return nums.map((num) => {
    let resultado = num;
    for (let i = 0; i < cuantasVeces; i++) {
      resultado = transformar(resultado);
    }
    return resultado;
  });
}
aplicaNVeces([1], (valor) => valor + 1, 3); // resultado: [4]

/* ▸ BLOQUE C — la máquina cambia el tipo o trabaja sobre objetos */

/* 7) 🔖 Código de barras. etiquetas recibe productos con id: number y le pone
 * a cada uno su código "#<id>" (de objeto sale un texto).
 *   etiquetas([{ id: 1 }, { id: 2 }]) → ["#1", "#2"]
 */
export function etiquetas(productos: { id: number }[]): string[] {
  return productos.map((producto) => String(`#${producto.id}`)); // ← provisional: le falta el "#".
}
etiquetas([{ id: 1 }, { id: 2 }]); // resultado: ["#1", "#2"]

/* 8) 📢 Cartel en mayúsculas. nombresEnMayuscula recibe usuarios con nombre y
 * devuelve cada nombre en mayúsculas.
 *   nombresEnMayuscula([{ nombre: "ana" }, { nombre: "leo" }]) → ["ana", "leo"]
 */
export function nombresEnMayuscula(usuarios: { nombre: string }[]): string[] {
  return usuarios.map((usuario) => usuario.nombre.toUpperCase()); // ← provisional: no los pone en mayúscula.
}

/* ▸ BLOQUE D — combinar dos máquinas, encadenar */

/* 9) 🏭✅ Línea + control de calidad. Primero pasa cada número por la máquina
 * transformar, y luego deja solo los que aprueban la prueba cumpleCondicion.
 * (Pista: .map(transformar) y luego .filter(cumpleCondicion), encadenados.)
 *   transformarYFiltrar([1, 2, 3], (valor) => valor * 10, (valor) => valor > 15) → [20, 30]
 */
export function transformarYFiltrar(
  nums: number[],
  transformar: (valor: number) => number,
  cumpleCondicion: (valor: number) => boolean,
): number[] {
  return nums.map(transformar).filter(cumpleCondicion);
}
transformarYFiltrar(
  [1, 2, 3],
  (valor) => valor * 10,
  (valor) => valor > 15,
); // resultado: [20, 30]

/* 10) 🧾 Caja registradora (capstone). Pasa cada número por la máquina y devuelve
 * la suma de todos los resultados (un solo número, no un array).
 * (Pista: transforma con .map(transformar) y suma con .reduce.)
 *   aplicaYSuma([1, 2, 3], (valor) => valor * 2) → 12    (2 + 4 + 6)
 *   aplicaYSuma([], (valor) => valor + 1)        → 0
 */
export function aplicaYSuma(nums: number[], transformar: (valor: number) => number): number {
  return nums.map(transformar).reduce((acum, valor) => acum + valor, 0);
}
aplicaYSuma([1, 2, 3], (valor) => valor * 2); // resultado: 12
