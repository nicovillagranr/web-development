/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — el gesto de toda la carpeta, en dos líneas:
 *
 *     avisar      el VALOR función. Aquí no se ejecuta nada.   ✅ esto se ENTREGA
 *     avisar()    la LLAMADA. Se ejecuta ahora mismo.          🔥 esto se COCINA
 *
 * Y el objeto que aparece en el drill 6, con su forma dibujada:
 *
 *     suceso = {              ← la caja entera es `suceso`
 *       type: "click",        ← un campo suyo. Esto sí es un string; la caja no
 *     }
 *
 * ⚠️ `suceso` y `suceso.type` NO son la misma cosa ni tienen el mismo tipo.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 01 — entregar una función no es ejecutarla        ·  1/10 del bloque
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · distinguir un VALOR función (`f`) de una LLAMADA (`f()`), y decir qué tipo
 *     tiene cada uno
 *   · pasar una función como argumento sin ejecutarla por el camino
 *   · decidir, mirando las dos firmas, si un callback encaja tal cual o hay que
 *     envolverlo
 *   · leer una firma de arriba a abajo, bajando un nivel cuando un parámetro es
 *     a su vez una función
 *   · decir qué permite y qué NO protege un retorno `void`
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * Toda la carpeta va de eventos: clics, teclas, formularios. Debajo de todos hay
 * un único gesto, y si no está automático lo de arriba se cae: le das una función
 * a otro, y NO la llamas tú. Aquí no hay React, ni JSX, ni `e` — solo funciones,
 * para que el gesto se te quede en el dedo antes de ponerle nada encima.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 *   TEORÍA 1 · la función es un valor      →  drills 1, 2, 3
 *   TEORÍA 2 · el callback: quién llama    →  drills 4, 5
 *   TEORÍA 3 · cuando llega un objeto      →  drill 6
 *   TEORÍA R · REFUERZO: leer firmas y el envoltorio  →  drills 7 al 14
 *
 * ▸ EJERCICIO — 14 drills en escalera, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-01.test.ts
 *     pnpm typecheck
 *
 *   Todos los starters de este archivo están rotos a propósito.
 *   ¿Atascado? Las pistas están en `exercise-01.pistas.md`, de una en una.
 *
 * ⚠️ EN EL BLOQUE R EL TYPECHECK DEJA DE BASTAR. De los 8 starters nuevos, **solo
 *    3 dan error de tipos; los otros 5 fallan por LÓGICA** y los caza únicamente el
 *    test. No te digo cuáles. Es el primer sitio del archivo donde el compilador no
 *    te cubre — y es a propósito, porque ese es el tema del drill 14.
 *
 * 📝 Trazado comentado bajo cada función. Descoméntalo para ver el valor.
 * ===========================================================================*/


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — la función es un VALOR
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   En JS y TS una función es un valor, igual que un número o un texto: se guarda
 *   en variables, se mete en arrays, se pasa como argumento y se devuelve.
 *   Escribir su nombre te da ese valor. Ponerle `()` es OTRA COSA: es una
 *   operación —la LLAMADA— que ejecuta el cuerpo y produce un valor distinto.
 *
 * SINTAXIS
 *     const receta = () => "café"
 *
 *     receta      // el valor función.  Su tipo es  () => string
 *     receta()    // la llamada.        Su tipo es  string
 *
 * EJEMPLO
 *     [receta]     // guardas la función:  [ () => "café" ]
 *     [receta()]   // guardas su retorno:  [ "café" ]
 *
 * 🧠 ANALOGÍA (de apoyo) — la receta y el plato. La función es un papel con
 *    instrucciones; llamarla es cocinar, y lo que sale es el plato. Los `()` son
 *    el fuego.
 *
 * 🗣️ LAS PIEZAS
 *     receta         → el identificador de la función
 *     ()             → el operador de llamada
 *     () => string   → el TIPO FUNCIÓN: "no recibe nada y retorna un string"
 *     string         → el tipo de retorno, lo que sale al llamarla
 *
 * ⚠️ TRAMPA — `() => string` no se lee "un string": se lee "una función que
 *    retorna un string". Confundir los dos es el error más repetido del archivo, y
 *    TS lo canta poniendo esos dos tipos uno a cada lado de "is not assignable to".
 *    Cuál está en cada lado cambia por completo lo que significa, así que léelos
 *    siempre enteros en vez de reconocerlos de un vistazo.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) `guardarEnLista` — mete la función `receta` en un array y devuelve el array,
//    sin llamarla por el camino. Lee el tipo de retorno que ya está escrito: dice
//    qué va dentro de ese array, y no son textos.
//    → guardarEnLista(() => "café")   →   [ () => "café" ]
export function guardarEnLista(receta: () => string): Array<() => string> {
  return [receta]
}
guardarEnLista(() => "café") // → [ () => "café" ]

// 2) `ejecutar` — te dan una receta y tú quieres el plato. El tipo de retorno es
//    `string`, así que lo que devuelvas tiene que ser el texto, no la receta.
//    → ejecutar(() => "café")   →   "café"
export function ejecutar(receta: () => string): string {
  return receta()
}
ejecutar(() => "café") // → "café"

// 3) `entregar` — la misma receta, al revés: que la llame otro más tarde. Fíjate
//    en que el tipo de retorno ya no es el mismo que el del drill 2, y que los
//    errores de los dos son el mismo par de tipos con los lados cambiados — esa
//    diferencia de lados es justo lo que separa ejecutar de entregar.
//    → entregar(() => "café")     →   la función, sin llamar
//    → entregar(() => "café")()   →   "café"   ← estos `()` de fuera sí cocinan
export function entregar(receta: () => string): () => string {
  return receta
}
entregar(() => "café")() // → "café"


/* Estos dos ayudantes ya están escritos y hacen de "el otro que llama": reciben
 * tu función y la llaman ellos. Los usas en los drills 4, 5 y 6. No los toques. */
export function llamaConTexto(fn: (t: string) => void): void {
  fn("click")
}

export function llamaConObjeto(fn: (suceso: { type: string }) => void): void {
  fn({ type: "click" })
}
llamaConObjeto((suceso) => console.log(suceso)) // → { type: 'click' }

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — el CALLBACK: tú entregas, otro llama
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Una función es de ORDEN SUPERIOR si recibe otra función como parámetro, si
 *   devuelve una función, o las dos cosas. La que le pasas es el CALLBACK. Y aquí
 *   está lo importante: quién decide CUÁNDO se llama al callback y CON QUÉ
 *   ARGUMENTOS no eres tú, es la función que lo recibe.
 *
 *   (`entregar`, del drill 3, ya era de orden superior por la otra mitad: recibe
 *   una función Y devuelve una función. Por eso admite DOS llamadas seguidas —
 *   `entregar(receta)()`, dos operadores de llamada, evaluados de izquierda a
 *   derecha. Es la forma de `multiplicador(3)(5)` de `02-funciones/exercise-07`.)
 *
 * SINTAXIS
 *     function llamaConTexto(fn: (t: string) => void): void {
 *       fn("click")                 // ← el argumento lo pone ÉL, aquí dentro
 *     }
 *
 *     llamaConTexto(avisar)         // ✅ entregas. La llamará él, con "click"
 *     llamaConTexto(avisar())       // ❌ la llamas tú y le entregas el resultado
 *
 * ⏳ POR QUÉ TIENE QUE SER UNA FUNCIÓN Y NO EL DATO YA CALCULADO
 *   Cuando tú escribes `llamaConTexto(…)`, el `"click"` TODAVÍA NO EXISTE: nace
 *   dentro, en la línea `fn("click")`, después. Por eso no puedes entregarle un
 *   valor ya hecho — no tienes con qué calcularlo. Lo único que puedes dejarle es
 *   una INSTRUCCIÓN de qué hacer con el dato cuando llegue, y una instrucción con
 *   un hueco para un dato futuro es exactamente una función. El parámetro `t` ES
 *   ese hueco: está vacío mientras lo escribes, y lo rellena él al llamar.
 *
 * ENCAJAR O ENVOLVER
 *   El callback se entrega PELADO si su firma es compatible con la que se pide.
 *   Si no lo es, lo ENVUELVES: escribes ahí mismo una función que recibe lo que
 *   él te da y llama a la tuya con lo que ella pide.
 *
 *     llamaConTexto((t) => avisarLargo(t.length))
 *                    ↑ lo que él te da     ↑ lo que la tuya pide
 *
 *   Ojo: envolver SIEMPRE funciona; pelar solo cuando las firmas encajan. Pero la
 *   regla no es "envuelve por si acaso". Pelada = aceptas TODO lo que él pase.
 *   Envuelta = tú decides qué llega, y por eso también puede mentir: nada impide
 *   escribir `(t) => avisar("otra cosa")` y TS no protesta.
 *   El caso donde pelar traiciona:  ["10","10","10"].map(parseInt) → [10, NaN, 2]
 *   porque `.map` pasa (valor, índice, array) y `parseInt` toma el índice como
 *   base. `(s) => parseInt(s, 10)` lo arregla porque el envoltorio FILTRA.
 *
 * 🗣️ LAS PIEZAS
 *     (t: string) => void  → la FIRMA que se pide: un parámetro string, sin retorno
 *     void                 → "no retorna nada". No es un valor que devuelvas:
 *                            es la promesa de que no devuelves ninguno
 *     (t) => avisarLargo() → la función ENVOLTORIO (o adaptador)
 *
 * ⚠️ TRAMPA — para saber si encaja, compara los PARÁMETROS uno a uno, no el
 *    aspecto general. Si no casan, TS te los nombra: `Types of parameters 't' and
 *    'n' are incompatible`. Cuando leas eso no te falta código: te sobra la
 *    entrega pelada, porque ahí hacía falta un envoltorio.
 * ───────────────────────────────────────────────────────────────────────────── */

// 4) `entregarPelado` — aquí aparece el OTRO que llama. `llamaConTexto` recibe una
//    función y la llama él, pasándole un texto; tu `avisar` pide un texto. Tu
//    trabajo es ponerlos en contacto y quitarte de en medio.
//    Ojo con el starter, porque este error es literalmente el `onClick={avisar()}`
//    que dentro de dos archivos vas a escribir sin verlo.
//    📌 llamaConTexto(fn: (t: string) => void)
//    → entregarPelado(espia)   →   espia recibe "click"

// export function llamaConTexto(fn: (t: string) => void): void {
// fn("click")
// }

export function entregarPelado(avisar: (t: string) => void): void {
  llamaConTexto(avisar)
}
entregarPelado((t) => console.log(t)) // → "click"

// 5) `entregarEnvuelto` — el mismo `llamaConTexto`, que sigue pasando un texto.
//    Pero `avisarLargo` no quiere el texto: quiere cuántas letras tiene. Móntalo
//    para que le llegue el número, no la palabra.
//    El starter lo entrega pelado como en el drill 4, y aquí eso ya no cuela.
//    📌 llamaConTexto(fn: (t: string) => void)
//    → entregarEnvuelto(espia)   →   espia recibe 5   ("click" tiene 5 letras)
export function entregarEnvuelto(avisarLargo: (n: number) => void): void {
  llamaConTexto((dato) => avisarLargo(dato.length))
}
entregarEnvuelto((n) => console.log(n)) // → 5


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — cuando lo que te pasan es un OBJETO
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   El que llama no siempre te pasa un dato suelto. Muchas veces te pasa un
 *   OBJETO con varios campos dentro, y lo que tú necesitas es UNO de esos campos.
 *   El objeto y su campo son cosas distintas y tienen tipos distintos.
 *
 * SINTAXISd
 *     function llamaConObjeto(fn: (suceso: { type: string }) => void): void {
 *       fn({ type: "click" })
 *     }
 *
 *     llamaConObjeto((suceso) => avisar(suceso.type))
 *                     ↑ la caja entera      ↑ el campo que necesitas
 *
 * 🗣️ LAS PIEZAS
 *     { type: string }   → el TIPO DEL OBJETO (la caja)
 *     suceso.type        → acceso a propiedad. Esto sí es un `string`; la caja no
 *
 * ⚠️ TRAMPA — la reincidente: dar la CAJA donde piden el CAMPO. TS lo canta como
 *    `Argument of type '{ type: string; }' is not assignable to parameter of type
 *    'string'`. Cuando te salga, no te falta un tipo: te falta un punto.
 *
 * 🔭 LO QUE VIENE — en el 02 el que llama es React, y el objeto que te pasa se
 *    llama EVENTO. El drill de abajo es ese, sin React todavía encima.
 * ───────────────────────────────────────────────────────────────────────────── */

// 6) `entregarSacandoDelObjeto` — ahora el que llama es `llamaConObjeto`, y lo que
//    reparte no es un texto sino un OBJETO. Tu `avisar` sigue pidiendo un texto, y
//    ese texto viaja dentro del objeto.
//    El starter envuelve bien; lo que falla es lo que mete en el sobre.
//    📌 llamaConObjeto(fn: (suceso: { type: string }) => void)
//    → entregarSacandoDelObjeto(espia)   →   espia recibe "click"
export function entregarSacandoDelObjeto(avisar: (t: string) => void): void {
  llamaConObjeto((suceso) => avisar(suceso.type))
}
entregarSacandoDelObjeto((t) => console.log(t)) // → "click"

/* ═════════════════════════════════════════════════════════════════════════════
 * BLOQUE R — REFUERZO: el envoltorio como ENRUTADOR        ·  drills 7 al 14
 * ═════════════════════════════════════════════════════════════════════════════
 * Los 6 de arriba ya están. Este bloque repite UNA sola forma ocho veces,
 * cambiando cada vez lo que llega y lo que hace falta:
 *
 *     llamador((x) => tuFuncion(x.loQueSea))
 *
 * ───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA R — leer una firma de arriba a abajo
 * ─────────────────────────────────────────────────────────────────────────────
 * 🔎 EL PROCEDIMIENTO, en 4 pasos y siempre el mismo
 *
 *     function llamaConUsuario(fn: (u: Usuario) => void): void
 *              ①                ②   ③            ④        ⑤
 *
 *     ① cómo se llama
 *     ② qué parámetros pide  → aquí uno, y se llama `fn`
 *     ③ de qué tipo es cada uno → `fn` es una FUNCIÓN, así que se abre un nivel
 *     ④ …y dentro se repiten los pasos: `fn` recibe un `Usuario` y retorna `void`
 *     ⑤ qué retorna la de fuera → `void`
 *
 *   La clave del paso ③: cuando un parámetro es una función, **no sigas leyendo
 *   en horizontal — baja un nivel y vuelve a empezar**. Eso es leer de arriba a
 *   abajo: una firma no es una línea, son capas.
 *
 * EL ENVOLTORIO ES UN ENRUTADOR
 *   Cuando escribes `(u) => avisar(u.nombre)` no estás calculando nada: estás
 *   diciendo por dónde va cada cosa. `u` es el paquete que llega, `u.nombre` es
 *   la pieza que sale, y `avisar` es el destino. Nada más.
 *
 * ⚠️ TRAMPA — `void` NO significa "prohibido retornar". Significa **"no voy a
 *    mirar lo que retornes"**. Por eso una función que SÍ devuelve algo encaja en
 *    un hueco `=> void` (el valor se descarta) — pero al revés no: una `=> void`
 *    no vale donde se pide `=> number`.
 *    Consecuencia cara, y es tu techo: **dentro de un envoltorio `=> void` el
 *    compilador no puede protegerte del retorno**, porque le da igual. Ahí el
 *    único que revisa eres tú. El drill 14 es exactamente eso.
 * ───────────────────────────────────────────────────────────────────────────── */

export type Usuario = { nombre: string; edad: number; cuenta: { alias: string } }

/* Dos ayudantes más, que llaman con otras formas. Tampoco se tocan. */
export function llamaConUsuario(fn: (u: Usuario) => void): void {
  fn({ nombre: "Nico", edad: 30, cuenta: { alias: "@nico" } })
}
llamaConUsuario((u) => console.log(u.edad)) // → 30


/* Y para los drills 12 y 13 no hay ayudante inventado: el que llama es `.forEach`,
 * que ya usas a diario. Su firma, que conviene tener delante:
 *
 *     COLORES.forEach(fn)   →   por CADA elemento ejecuta:
 *                               fn(valor, índice, arrayCompleto)
 *
 * O sea, `.forEach` llama a tu función con TRES argumentos, quieras o no. */
export const COLORES = ["rojo", "verde", "azul"]

// 7) `avisarEnMayusculas` — llega un texto y `avisar` pide un texto, así que los
//    tipos ya encajan. Pero no quieres el mismo texto: lo quieres en mayúsculas.
//    Aviso: typecheck va a callar en este, porque un string es un string lo pongas
//    como lo pongas. Solo el test lo caza.
//    📌 llamaConTexto(fn: (t: string) => void)
//    → avisarEnMayusculas(espia)   →   espia recibe "CLICK"

// export function llamaConTexto(fn: (t: string) => void): void {
// fn("click")
// }

export function avisarEnMayusculas(avisar: (t: string) => void): void {
  // Aquí NO retorna nadie: los tres son `void`. Lo que hay son tres LLAMADAS.
  // 1. llamaConTexto LLAMA a mi envoltorio y le pasa "click".
  // 2. mi envoltorio LLAMA a avisar y le pasa "CLICK".
  // 3. avisar hace su efecto y se acaba. Nada vuelve hacia atrás.
  llamaConTexto((t) => avisar(t.toUpperCase()))
}
// avisarEnMayusculas((t) => console.log(t))

// 8) `avisarNombre` — ahora llama `llamaConUsuario`, que reparte un `Usuario`
//    entero. De todo lo que trae dentro, `avisar` solo quiere una pieza, y su
//    firma te dice cuál puede aceptar.
//    📌 llamaConUsuario(fn: (u: Usuario) => void)
//       Usuario = { nombre: string; edad: number; cuenta: { alias: string } }
//    → avisarNombre(espia)   →   espia recibe "Nico"
export function avisarNombre(avisar: (n: string) => void): void {
  llamaConUsuario((u) => avisar(u.nombre))
}
// avisarNombre((n) => console.log(n))

// 9) `avisarEdad` — el mismo `Usuario` y el mismo enrutado, otra pieza. El objeto
//    que llega es idéntico al del drill 8: lo único que ha cambiado es la firma
//    del destino, y eso solo ya decide qué campo hay que sacar.
//    📌 llamaConUsuario(fn: (u: Usuario) => void)
//       Usuario = { nombre: string; edad: number; cuenta: { alias: string } }
//    → avisarEdad(espia)   →   espia recibe 30
export function avisarEdad(avisar: (n: number) => void): void {
  llamaConUsuario((u) => avisar(u.edad))
}
// avisarEdad((n) => console.log(n))

// 10) `avisarAlias` — la pieza que quieres esta vez no está suelta en el `Usuario`:
//     está guardada dentro de otra caja. El starter se queda a medio camino y
//     entrega la caja intermedia, que es el drill 6 otra vez un piso más abajo.
//     📌 llamaConUsuario(fn: (u: Usuario) => void)
//        Usuario = { nombre: string; edad: number; cuenta: { alias: string } }
//     → avisarAlias(espia)   →   espia recibe "@nico"
export function avisarAlias(avisar: (a: string) => void): void {
  llamaConUsuario((u) => avisar(u.cuenta.alias))
}
// avisarAlias((a) => console.log(a))

// 11) `avisarResumen` — hasta aquí el envoltorio sacaba UNA pieza. No tiene por qué:
//     puede armar algo con varias. Monta un texto con esta forma exacta, paréntesis
//     incluidos: "Nico (30)".
//     Aviso: typecheck calla otra vez. Medio texto sigue siendo un texto válido.
//     📌 llamaConUsuario(fn: (u: Usuario) => void)
//        Usuario = { nombre: string; edad: number; cuenta: { alias: string } }
//     → avisarResumen(espia)   →   espia recibe "Nico (30)"
export function avisarResumen(avisar: (t: string) => void): void {
  llamaConUsuario((u) => avisar(`${u.nombre} (${u.edad})`))
}
// avisarResumen((t) => console.log(t))

// 12) `listarConPosicion` — recorre `COLORES` y por cada uno llama a `avisar` con
//     su posición delante, tal y como la leería una persona: "1. rojo".
//     Aviso: typecheck no te va a ayudar. Cualquier número que pongas ahí produce
//     un texto válido, así que el único que sabe contar es el test.
//     📌 COLORES.forEach(fn)  →  fn(valor, índice, arrayCompleto)
//     → listarConPosicion(espia)   →   "1. rojo", "2. verde", "3. azul"
export function listarConPosicion(avisar: (t: string) => void): void {
  COLORES.forEach((color, i) => avisar(`${i + 1}. ${color}`))
}
listarConPosicion((t) => console.log(t)) // → 1. rojo, 2. verde, 3. azul

// 13) `avisarCadaColor` — el mismo recorrido, que sigue pasando tres argumentos.
//     Pero ahora solo quieres el color, sin número ni nada más.
//     Aquí está la regla que no conocías, y es el ejercicio entero: **tu función
//     puede declarar MENOS parámetros de los que le pasan**, y los que no declares
//     se descartan solos. El starter los recoge los tres, como si hubiera que
//     quedárselo todo. Typecheck calla: no sobra un tipo, sobra trabajo.
//     💡 ESTO ES LO QUE ARREGLA TU BUG DE JULIO. `["10","10","10"].map(parseInt)`
//        da `[10, NaN, 2]` porque `.map` también pasa tres argumentos y `parseInt`
//        acepta dos, así que el índice se le cuela como base numérica. La cura es
//        este drill: `.map((s) => parseInt(s, 10))` declara UNA mano y los otros
//        dos argumentos pasan de largo.
//     📌 COLORES.forEach(fn)  →  fn(valor, índice, arrayCompleto)
//     → avisarCadaColor(espia)   →   "rojo", "verde", "azul"
export function avisarCadaColor(avisar: (t: string) => void): void {
  COLORES.forEach((color) => avisar(color))
}
avisarCadaColor((t) => console.log(t)) // → rojo, verde, azul

// 14) `entregarQueRetorna` — el cierre, y una firma que parece no encajar: `medir`
//     devuelve un `number` donde el hueco pide algo que no devuelve nada. Míralo
//     otra vez antes de dar por hecho que hay que envolver.
//     Y mira también lo que hace el starter: envuelve, y dentro del envoltorio
//     devuelve un `number` **sin que TypeScript diga una palabra**. Ese silencio es
//     el drill: en un hueco `=> void` cualquier retorno vale, así que ahí dentro el
//     compilador no te cubre. Pregúntate qué pasa si no hay dentro.
//     📌 llamaConTexto(fn: (t: string) => void)
//     → entregarQueRetorna(espia)   →   espia recibe "click" y devuelve 5
export function entregarQueRetorna(medir: (t: string) => number): void {
  llamaConTexto(medir)
}
entregarQueRetorna((t) => t.length) // → 5
/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 14 estén en verde, el 02 hace esto mismo con un botón de verdad: el
 * que llama es React y lo que te pasa es un objeto — el EVENTO. O sea, el drill 6
 * con React encima. Ahí empieza lo que dice el temario del README.
 * ───────────────────────────────────────────────────────────────────────────── */
