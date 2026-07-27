/* =============================================================================
 * EJERCICIO 05 — funciones (5/?): `void` (funciones que NO devuelven valor)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * No todas las funciones devuelven algo que uses. Muchas hacen un EFECTO y ya:
 * imprimir, guardar, avisar, reaccionar a un clic. Su tipo de retorno es `void`
 * = "no devuelve nada que tengas que recoger".
 *
 *
 * ▸ EXPLICACIÓN — `void` = el retorno no importa
 * ----------------------------------------------------------------------------
 *     function avisar(msg: string): void { console.log(msg) }   // no `return valor`
 *
 *     const items = ["a", "b"]
 *     items.forEach((x) => { registro.push(x) })   // el callback es (x) => void
 *
 * Una función `void` trabaja por su EFECTO (cambia algo fuera, escribe, empuja a
 * una lista), no por lo que entrega. Quien la llama no espera un valor de vuelta.
 *
 * 🧠 ANALOGÍA: apretar el interruptor de la luz. La acción tiene un efecto (se
 *    enciende la sala), pero el interruptor no te DEVUELVE nada en la mano. Lo
 *    contrario sería una máquina de café: ahí sí esperas que te DEVUELVA un café
 *    (un valor).
 *
 * 🔧 POR DENTRO: `void` no es lo mismo que `undefined`. Es más bien "ignora el
 *    retorno": por eso un callback `(n) => void` ACEPTA una función que devuelve
 *    algo (el valor simplemente se descarta), pero al revés NO — una función que
 *    DEBE devolver `number` no acepta una que no devuelve nada.
 *
 * 💼 CASO REAL: en React, `onClick: () => void`. El handler reacciona al clic
 *    (efecto: cambia estado, navega...); no se usa lo que devuelva.
 *
 * OJO — como `void` trabaja por efecto, en los tests observamos ese efecto sobre
 *    una lista "registro" que la función va rellenando. Es la forma de "ver" lo
 *    que un void hace.
 *
 *
 * ▸ EJERCICIO — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as`.
 * ----------------------------------------------------------------------------
 * Corre el test tras cada uno:
 *     pnpm test:run src/exercises/02-funciones/exercise-05.test.ts
 * ===========================================================================*/


/* ---------------------------------------------------------------------------
 * BLOQUE A — callbacks que devuelven `void` (el patrón forEach)
 * ---------------------------------------------------------------------------
 * El starter pide un callback que devuelve `number`, así que NO acepta un
 * callback de efecto (que no devuelve nada). Aflójalo a `=> void`.
 * -------------------------------------------------------------------------- */

// 1) `porCada` — ejecuta `accion` con cada número de la lista.
//    👉 Dos arreglos: el tipo de `accion` (ahora exige `=> number`, no acepta una
//       acción de efecto) → ponlo `(n: number) => void`. Y el cuerpo (no recorre).
//      const out: number[] = []; porCada([1,2,3], (n) => { out.push(n) })  → out = [1,2,3]
export function porCada(nums: number[], accion: (n: number) => void): void {
  nums.forEach(accion)
}
porCada([1, 2, 3], (n) => {
  console.log(n)
})

// 2) `cadaTexto` — lo mismo con strings.
//      const out: string[] = []; cadaTexto(["a","b"], (t) => { out.push(t) }) → out = ["a","b"]
export function cadaTexto(textos: string[], accion: (t: string) => void): void {
  return textos.forEach(accion)
}
cadaTexto(["a", "b"], (t) => {
  console.log(t)
})


/* ---------------------------------------------------------------------------
 * BLOQUE B — funciones `void` (efecto sobre una lista que recibe)
 * ---------------------------------------------------------------------------
 * La función no DEVUELVE nada: modifica la lista "registro" que le pasan.
 * -------------------------------------------------------------------------- */

// 3) `registrar` — añade `mensaje` al final del `registro`.
//    👉 Dos arreglos: el tipo de retorno (ahora promete `string[]` y el starter
//       devuelve una copia nueva) → ponlo `void`. Y el cuerpo (haz el efecto:
//       empuja al registro que te pasan, no crees otro).
//      const r: string[] = []; registrar(r, "hola"); registrar(r, "mundo")  → r = ["hola","mundo"]
export function registrar(registro: string[], mensaje: string): void {
  registro.push(mensaje)
}
const r: string[] = []
registrar(r, "hola")
registrar(r, "mundo")
console.log(r)

// 4) `repetirAccion` — ejecuta `accion` con los índices 0, 1, ..., veces-1.
//      const out: number[] = []; repetirAccion(3, (i) => { out.push(i) }) → out = [0,1,2]
export function repetirAccion(veces: number, accion: (i: number) => void): void {
  for (let i = 0; i < veces; i++) {
    accion(i)
  }
}
// return: [0,1,2]
repetirAccion(3, (i) => {
  console.log(i)
})



/* ---------------------------------------------------------------------------
 * BLOQUE C — CAPSTONE: efecto condicional
 * -------------------------------------------------------------------------- */

// 5) `porCadaPositivo` — ejecuta `accion` solo con los números > 0.
//    👉 Combina el recorrido con un filtro dentro: si `n > 0`, llama a `accion`.
//      const out: number[] = []; porCadaPositivo([1,-2,3,0], (n) => { out.push(n) }) → out = [1,3]
export function porCadaPositivo(nums: number[], accion: (n: number) => void): void {
  nums.filter(number => number > 0).forEach(accion)
}
