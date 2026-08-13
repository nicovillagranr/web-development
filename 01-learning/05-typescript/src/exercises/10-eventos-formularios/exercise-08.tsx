/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — el envío de un formulario, dibujado:
 *
 *   <form onSubmit={…}>          ← el manejador vive AQUÍ, y solo puede vivir aquí
 *     <input name="nombre" />    ← pulsar Enter dentro de un campo también envía
 *     <button>Enviar</button>    ← y pulsar este botón, claro
 *   </form>
 *
 *   e = {
 *     currentTarget: <form>,        ← el formulario entero
 *     preventDefault: () => {…},    ← el freno; una función, hay que LLAMARLA
 *   }                                 (recortado: trae ~25 campos más)
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 08 — onSubmit y preventDefault                   ·  8/10 del bloque
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · parar lo que el navegador hace por su cuenta al enviar un formulario
 *   · distinguir qué botones envían y cuáles no
 *   · sacar los datos del envío del sitio correcto
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * Un formulario que no frena el envío recarga la página entera. En una SPA eso te
 * borra el estado, el router y todo lo que llevabas hecho — y ni siquiera da error:
 * la pantalla parpadea y aparece vacía. Es el primer bug serio de React que te vas
 * a encontrar, y se arregla con una línea que hay que saber que existe.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 *   TEORÍA 1 · el envío y el freno       →  drills 1, 2, 3
 *   TEORÍA 2 · de dónde salen los datos  →  drills 4, 5, 6
 *
 * ▸ EJERCICIO — 6 drills en escalera, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-08.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters de este archivo están rotos a propósito.
 *   ¿Atascado? Las pistas están en `exercise-08.pistas.md`, de una en una.
 *
 * ⚠️ Solo 2 de los 6 dan error de tipos. Los otros 4 fallan con typecheck mudo, y
 *    es el archivo que más se apoya en el test de todo el bloque: casi todo lo que
 *    se rompe en un formulario es COMPORTAMIENTO, no tipos.
 *
 * 📝 Las traces van comentadas: en `.tsx` escribir `<Componente />` solo fabrica
 *    un objeto que lo describe, no lo ejecuta.
 * ===========================================================================*/

import { useState } from 'react'
import type { ChangeEvent } from 'react'


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el envío y el freno
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   `onSubmit` es el hueco del `<form>` que salta cuando el formulario se envía.
 *   El navegador, por su cuenta y sin preguntar, responde a un envío recargando la
 *   página con los datos puestos en la URL: es su comportamiento POR DEFECTO, de
 *   cuando no existía JavaScript. `e.preventDefault()` cancela esa reacción.
 *
 * SINTAXIS
 *     import type { FormEvent } from 'react'
 *
 *     <form onSubmit={(e) => { e.preventDefault(); … }}>
 *            └ el hueco        └ el freno, lo primero de todo
 *
 * EJEMPLO — pulsas "Enviar" y pasa esto, en este orden:
 *     salta onSubmit  →  corre tu código  →  el navegador hace lo suyo
 *                                            └ salvo que le hayas puesto el freno
 *
 * 🧠 ANALOGÍA (de apoyo) — el muelle de la puerta. La puerta se cierra sola porque
 *    lleva un muelle dentro. Si la quieres abierta, le pones una cuña: el muelle
 *    sigue ahí, simplemente no llega a actuar. `preventDefault` es la cuña.
 *
 * 🗣️ LAS PIEZAS
 *     onSubmit              → el hueco, y va en el <form>
 *     FormEvent<T>          → el tipo del evento de envío
 *     e.preventDefault()    → cancela lo que iba a hacer el navegador
 *
 * ⚠️ TRAMPA — `preventDefault` y `stopPropagation` no son lo mismo y se confunden
 *    todo el rato. Uno cancela la reacción del NAVEGADOR; el otro corta el burbujeo
 *    para los ANCESTROS. Ponerlos donde no toca no da error: no hace nada.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) `FormularioAvisa` — un formulario con un campo y un botón "Enviar" que, al
//    enviarse, llama a `alEnviar` y NO deja que el navegador recargue la página.
//    El starter ya avisa; lo que no hace es lo segundo.
export function FormularioAvisa({ alEnviar }: { alEnviar: () => void }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); alEnviar() }}>
      <input name="nombre" />
      <button>Enviar</button>
    </form>
  )
}
<FormularioAvisa alEnviar={() => console.log('enviado')} />

// 2) `FormularioConDosBotones` — el mismo formulario con dos botones: "Enviar", que
//    envía, y "Limpiar", que llama a `alLimpiar` y **no debe enviar nada**.
//    Ahora mismo "Limpiar" hace las dos cosas.
//    Restricción: el `onSubmit` del <form> no se toca; el arreglo es cosa del botón.
export function FormularioConDosBotones(
  { alEnviar, alLimpiar }: { alEnviar: () => void; alLimpiar: () => void },
) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); alEnviar() }}>
      <input name="nombre" />
      <button onClick={alLimpiar}>Limpiar</button>
      <button>Enviar</button>
    </form>
  )
}
// <FormularioConDosBotones alEnviar={() => {}} alLimpiar={() => {}} />

// 3) `FormularioManejadorFuera` — lo mismo del drill 1, con el manejador viviendo
//    fuera del JSX y anotado por ti. En el 07 fallaba una de las dos piezas de la
//    anotación; aquí el starter se equivocó en las dos, y typecheck es el único que
//    se va a quejar.
//    Este drill exige un import nuevo, y sale de 'react'.
export function FormularioManejadorFuera({ alEnviar }: { alEnviar: () => void }) {
  const manejar = (e: ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault()
    alEnviar()
  }
  return (
    <form onSubmit={manejar}>
      <input name="nombre" />
      <button>Enviar</button>
    </form>
  )
}
// <FormularioManejadorFuera alEnviar={() => {}} />


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — de dónde salen los datos
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Al enviar hay que juntar lo que el usuario escribió. Hay dos sitios de donde
 *   sacarlo: el DOM, preguntándole al formulario por sus campos, o el ESTADO, que
 *   es donde tú lo has ido guardando. En React se saca del estado, y no es una
 *   cuestión de gusto: el estado tiene tipos y el DOM no.
 *
 * SINTAXIS
 *     const [nombre, setNombre] = useState('')
 *
 *     <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
 *     <form onSubmit={(e) => { e.preventDefault(); alEnviar(nombre) }}>
 *                                                            └ del estado
 *
 * EJEMPLO — el circuito entero, que ya montaste en el 06 y aquí solo se cierra:
 *     tecleas → onChange → estado → el campo se pinta del estado
 *     envías  → onSubmit → freno → tu función recibe el estado
 *
 * 🧠 ANALOGÍA (de apoyo) — la comanda. Cuando llega el momento de cobrar, el
 *    camarero no vuelve a la mesa a preguntar qué pidieron: lee lo que apuntó.
 *
 * 🗣️ LAS PIEZAS
 *     e.currentTarget.elements → los campos, tal como los ve el DOM
 *     fuente de verdad         → el sitio del que se leen los datos de verdad
 *
 * ⚠️ TRAMPA — el `onSubmit` va en el `<form>`, nunca en el botón. Puesto en el
 *    botón parece funcionar con el ratón, pero pulsar Enter dentro de un campo deja
 *    de hacer nada, y el formulario se vuelve inservible sin ratón.
 * ───────────────────────────────────────────────────────────────────────────── */

// 4) `FormularioLeeElNombre` — un campo controlado, y al enviar `alEnviar` recibe
//    lo que hay escrito. El `useState` y el campo ya están montados y funcionan.
//    El starter va a buscar el dato al sitio equivocado.
export function FormularioLeeElNombre({ alEnviar }: { alEnviar: (n: string) => void }) {
  const [nombre, setNombre] = useState('')
  return (
    <form onSubmit={(e) => { e.preventDefault(); alEnviar(e.currentTarget.elements.nombre.value) }}>
      <input name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <button>Enviar</button>
    </form>
  )
}
// <FormularioLeeElNombre alEnviar={(n) => console.log(n)} />

// 5) `FormularioLimpiaAlEnviar` — el mismo formulario, pero después de enviar el
//    campo se queda vacío, listo para el siguiente. Ahora se queda con lo enviado
//    puesto.
export function FormularioLimpiaAlEnviar({ alEnviar }: { alEnviar: (n: string) => void }) {
  const [nombre, setNombre] = useState('')
  return (
    <form onSubmit={(e) => { e.preventDefault(); alEnviar(nombre) }}>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <button>Enviar</button>
    </form>
  )
}
// <FormularioLimpiaAlEnviar alEnviar={(n) => console.log(n)} />

// 6) `FormularioNoEnviaVacio` — el cierre. Igual que el 5, y además: si el campo
//    está vacío no se envía nada — ni se llama a `alEnviar`, ni pasa nada. Con el
//    campo lleno, se envía y se limpia como antes.
//    El starter envía siempre, aunque no haya nada escrito.
export function FormularioNoEnviaVacio({ alEnviar }: { alEnviar: (n: string) => void }) {
  const [nombre, setNombre] = useState('')
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      alEnviar(nombre)
      setNombre('')
    }}>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <button>Enviar</button>
    </form>
  )
}
// <FormularioNoEnviaVacio alEnviar={(n) => console.log(n)} />

/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 6 estén en verde: tienes un formulario que se envía, se frena, se
 * valida y se limpia. Lo que le falta para ser el de un proyecto real es que la
 * función de arriba reciba DATOS y no piezas del DOM — y de eso va el 09.
 * ───────────────────────────────────────────────────────────────────────────── */
