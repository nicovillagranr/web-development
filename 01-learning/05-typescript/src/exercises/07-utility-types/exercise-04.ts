/* =============================================================================
 * EJERCICIO 04 — utility types (1/?): `Partial<T>`
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Ya sabes FABRICAR tipos a mano con `keyof` y `Record<Clave, Valor>`. Los
 * "utility types" son transformaciones de tipos que TS ya trae HECHAS con esas
 * mismas piezas. No son magia nueva: son atajos con nombre. Empezamos por el
 * más usado en el día a día de React.
 *
 *
 * ▸ EXPLICACIÓN — qué es `Partial<T>`
 * ----------------------------------------------------------------------------
 * `Partial<T>` toma un tipo `T` y devuelve una COPIA con TODAS sus propiedades
 * marcadas como opcionales (`?`).
 *
 *     type Usuario        = { id: number; nombre: string; email: string }
 *     type Partial<Usuario> = { id?: number; nombre?: string; email?: string }
 *                                  ▲           ▲              ▲
 *                          le pega un `?` a cada propiedad
 *
 * 🧠 ANALOGÍA: un formulario de "editar perfil". El usuario NO está obligado a
 *    rellenar todos los campos: deja en blanco lo que no cambia y solo escribe
 *    lo que quiere actualizar. `Partial<Usuario>` es ese formulario: "dame
 *    cualquier subconjunto de las propiedades de Usuario, incluido NINGUNA".
 *
 * 🔧 POR DENTRO (no hace falta que lo escribas aún, solo que sepas que NO es
 *    magia): es un "mapped type" construido con tu `keyof`:
 *        type Partial<T> = { [K in keyof T]?: T[K] }
 *    "recorre cada llave K del menú `keyof T` y pégale un `?`". Lo escribirás a
 *    mano en un ejercicio más adelante; hoy solo lo USAS.
 *
 * 💼 CASO REAL: funciones de ACTUALIZACIÓN. `actualizar(usuario, cambios)` donde
 *    `cambios` es solo el trozo que cambia. Es tu update inmutable de 04-objetos
 *    (`{ ...obj, ...cambios }`), ahora con el tipo del "trozo" bien puesto.
 *
 * OJO — lo que `Partial` NO afloja: las propiedades siguen siendo las MISMAS.
 *    Puedes omitir `email`, pero NO puedes inventarte `edad` (esa llave no
 *    existe en el menú). `Partial` hace opcionales las que hay; no abre la puerta
 *    a llaves nuevas.
 *
 *
 * ▸ EJERCICIO — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as`.
 * ----------------------------------------------------------------------------
 * Cada starter va MAL a propósito (tipo demasiado estricto + cuerpo que ignora
 * los cambios) → el typecheck Y el test quedan ROJOS. Arregla las DOS cosas:
 *   (1) el TIPO del parámetro de cambios  → `Partial<...>`
 *   (2) el CUERPO                          → merge inmutable con spread
 * Corre el test tras cada uno.
 * ===========================================================================*/


type Usuario = { id: number; nombre: string; email: string }

/* ---------------------------------------------------------------------------
 * BLOQUE A — `Partial` en el parámetro: el patrón ACTUALIZAR (merge con spread)
 * -------------------------------------------------------------------------- */

// 1) `actualizarUsuario` — recibe un usuario completo y un objeto de `cambios`
//    que puede traer SOLO algunas propiedades. Devuelve un usuario NUEVO con los
//    cambios aplicados encima (sin mutar el original).
//    👉 Dos arreglos: el tipo de `cambios` (ahora exige el usuario ENTERO) y el
//       cuerpo (ahora ignora los cambios). Recuerda el orden del spread: lo que
//       va DESPUÉS pisa.
//      actualizarUsuario({id:1,nombre:"Ana",email:"a@a.com"}, {email:"b@b.com"})
//        → {id:1,nombre:"Ana",email:"b@b.com"}
export function actualizarUsuario(usuario: Usuario, cambios: Partial<Usuario>): Usuario {
  return { ...usuario, ...cambios }
}
actualizarUsuario({ id: 1, nombre: "Ana", email: "a@a.com" }, { email: "b@b.com" }) // {id:1,nombre:"Ana",email:"b@b.com"}


type Producto = { nombre: string; precio: number; stock: number }

// 2) `editarProducto` — el MISMO patrón, otro tipo (refuerzo). Aplica los
//    `cambios` parciales sobre el producto y devuelve uno nuevo.
//      editarProducto({nombre:"Té",precio:1000,stock:5}, {precio:800})
//        → {nombre:"Té",precio:800,stock:5}
export function editarProducto(producto: Producto, cambios: Partial<Producto>): Producto {
  return { ...producto, ...cambios }
}
editarProducto({ nombre: "Té", precio: 1000, stock: 5 }, { precio: 800 }) // {nombre:"Té",precio:800,stock:5}


/* ---------------------------------------------------------------------------
 * BLOQUE B — `Partial` + valores por DEFECTO (config con base)
 * -------------------------------------------------------------------------- */

type Ajustes = { tema: string; idioma: string; notificaciones: boolean }

const ajustesPorDefecto: Ajustes = {
  tema: "claro",
  idioma: "es",
  notificaciones: true,
}

// 3) `crearAjustes` — recibe `opciones` PARCIALES y las pone encima de los
//    valores por defecto. Lo que el usuario no especifique, se queda con el
//    default. Devuelve un Ajustes COMPLETO.
//    👉 Aquí el orden del spread es CLAVE: ¿los defaults van primero o segundo?
//       Piensa quién debe pisar a quién.
//      crearAjustes({tema:"oscuro"}) → {tema:"oscuro",idioma:"es",notificaciones:true}
//      crearAjustes({})              → {tema:"claro",idioma:"es",notificaciones:true}
export function crearAjustesCompletos(opciones: Ajustes): Ajustes {
  return { ...ajustesPorDefecto, ...opciones }
}
// Al no tener un partial, se deben especificar todos los campos
crearAjustesCompletos({ tema: "oscuro", idioma: "en", notificaciones: false })


// 4) `crearAjustes` — ahora con `Partial` en el parámetro.
export function crearAjustesParciales(opciones: Partial<Ajustes>): Ajustes {
  return { ...ajustesPorDefecto, ...opciones }
}
// Ahora como los cambios pueden ser parciales, puede seleccionar los ajustes que yo quiera, o los que el usuario quiera
crearAjustesParciales({ tema: "oscuro" })


/* ---------------------------------------------------------------------------
 * BLOQUE C — CAPSTONE: una LISTA de cambios parciales (reduce + Partial)
 * ---------------------------------------------------------------------------
 * Aquí reaparece tu `reduce`. NO es el campeón (no hay portero ni `undefined`),
 * pero SÍ necesita `reduce<Usuario>` explícito: cada elemento de la lista es un
 * `Partial<Usuario>`, así que el TIPO del array (`Partial<Usuario>`) NO coincide
 * con el del acumulador (`Usuario`). Sin el genérico, TS infiere el acumulador
 * desde el array → lo toma como `Partial<Usuario>` y el retorno deja de ser
 * `Usuario`. La regla del campeón vuelve: si el acum es de distinto tipo que los
 * elementos, pon `reduce<...>` a mano. Cada parche se aplica encima del acumulado.
 * -------------------------------------------------------------------------- */

// 5) `aplicarCambios` — parte de un usuario y aplica EN ORDEN una lista de
//    cambios parciales, cada uno encima del resultado anterior. Si dos parches
//    tocan la misma propiedad, gana el ÚLTIMO (orden del spread).
//    👉 Dos arreglos: el tipo del array (ahora exige usuarios ENTEROS) y el
//       cuerpo (ahora ignora la lista). Acumulador inicial = `usuario`.
//      aplicarCambios({id:1,nombre:"Ana",email:"a@a.com"}, [{nombre:"Ani"},{email:"x@x.com"}])
//        → {id:1,nombre:"Ani",email:"x@x.com"}
//      aplicarCambios(u, []) → u (sin cambios)
export function aplicarCambios(usuario: Usuario, lista: Partial<Usuario>[]): Usuario {
  //              ┌─ recorremos la LISTA (el array), no el usuario
  //              │             ┌─ acum = el usuario tal como va quedando
  //              │             │      ┌─ parche = el Partial de esta vuelta
  return lista.reduce<Usuario>((acum, parche) => ({ ...acum, ...parche }), usuario)
  //                  ▲                  el callback DEVUELVE el acum del turno siguiente ─┘   └─ inicial: el usuario original
  //                  └─ <Usuario>: forzamos el tipo del acumulador (el array es Partial<Usuario>, distinto)
}
aplicarCambios({ id: 1, nombre: "Ana", email: "a@a.com" }, [{ nombre: "Ani" }, { email: "x@x.com" }]) // {id:1,nombre:"Ani",email:"x@x.com"}
