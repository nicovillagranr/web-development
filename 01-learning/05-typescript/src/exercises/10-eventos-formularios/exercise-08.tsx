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
 *   ESCALERA S · el click y el envío son dos cosas  →  S1-S6, al final del archivo
 *                (si el drill 2 no se te cae solo, baja ahí antes de seguir)
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
// import type { ChangeEvent } from 'react'
import type { SubmitEvent } from 'react';


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
{/* <FormularioAvisa alEnviar={() => console.log('enviado')} /> */ }

// 2) `FormularioConDosBotones` — el mismo formulario con dos botones: "Enviar", que
//    envía, y "Limpiar", que llama a `alLimpiar` y **no debe enviar nada**.
//    Ahora mismo "Limpiar" hace las dos cosas.
//    Restricción: el `onSubmit` del <form> no se toca; el arreglo es cosa del botón.
export function FormularioConDosBotones({ alEnviar, alLimpiar }: { alEnviar: () => void; alLimpiar: () => void }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); alEnviar() }}>
      <input name="nombre" />
      {/* SOLUCIÓN: type="button" evita que este botón envíe el formulario */}
      <button type="button" onClick={alLimpiar}>Limpiar</button>

      {/* SOLUCIÓN: type="submit" (o dejarlo por defecto) para que se encargue de enviar */}
      <button type="submit">Enviar</button>
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
  const manejar = (e: SubmitEvent<HTMLFormElement>) => {
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
    <form onSubmit={(e) => { e.preventDefault(); alEnviar(nombre) }}>
      <input name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <button type="submit">Enviar</button>
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
    <form onSubmit={(e) => {
      e.preventDefault();
      alEnviar(nombre);
      setNombre('')
    }}>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <button type="submit">Enviar</button>
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
      e.preventDefault();
      if (nombre) {
        alEnviar(nombre);
        setNombre('')
      }
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


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ESCALERA S — el click y el envío son DOS cosas
 * ─────────────────────────────────────────────────────────────────────────────
 * Seis peldaños cortos para una sola frase: **son dos eventos distintos, en dos
 * elementos distintos, y uno provoca al otro.**
 *
 *   1. pulsas el botón      → evento `click`, y ocurre EN EL BOTÓN
 *   2. el botón, por ser de envío, provoca el envío del formulario
 *   3. eso dispara el evento `submit`, y ocurre EN EL <form>
 *   4. el navegador navega  ← salvo que alguien lo frene
 *
 * `onClick` escucha el paso 1. `onSubmit` escucha el paso 3. Por eso `onSubmit`
 * va en el `<form>`: es el `<form>` quien se envía, no el botón. Y por eso hay
 * dos maneras de que no se envíe nada — cortar en el paso 2 o cortar en el 4.
 *
 * 👀 Los peldaños usan una prop `registrar` que apunta lo que va pasando, para
 *    que puedas ver el orden. En un componente de verdad no existiría.
 * ───────────────────────────────────────────────────────────────────────────── */

// S1) `BotonSuelto` — un <button> que no está dentro de ningún <form>: aquí no hay
//     envío posible. Al pulsarlo registra "click".
//     El starter escucha un evento que en este botón no va a ocurrir jamás.
export function BotonSuelto({ registrar }: { registrar: (que: string) => void }) {
  return (
    <button onClick={() => registrar('click')}>
      Pulsa
    </button>
  )
}
// <BotonSuelto registrar={(q) => console.log(q)} />   // "click"

// S2) `EnvioSinManejadorEnElBoton` — ahora sí hay <form>, y el botón no lleva
//     ningún manejador. Aun así, al pulsarlo se registra "submit".
//     Restricción: el <button> tiene que acabar sin un solo manejador encima.
export function EnvioSinManejadorEnElBoton({ registrar }: { registrar: (que: string) => void }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); registrar('submit') }}>
      <button>
        Enviar
      </button>
    </form>
  )
}
// <EnvioSinManejadorEnElBoton registrar={(q) => console.log(q)} />   // "submit"

// S3) `RegistraLosDos` — el botón lleva su manejador y el formulario el suyo. Al
//     pulsar una sola vez se registran las DOS cosas, en el orden en que ocurren.
//     El starter solo tiene una de las dos.
export function RegistraLosDos({ registrar }: { registrar: (que: string) => void }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); registrar('submit') }}>
      <button onClick={() => registrar('click')}>
        Enviar
      </button>
    </form>
  )
}
// <RegistraLosDos registrar={(q) => console.log(q)} />   // "click", luego "submit"

// S4) `BotonQueNoProvoca` — el mismo de S3, pero este botón no debe provocar el
//     envío: al pulsarlo se registra "click" y nada más.
//     Restricción: el manejador del botón no se toca; el arreglo es lo que el
//     botón ES, no lo que hace.
export function BotonQueNoProvoca({ registrar }: { registrar: (que: string) => void }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); registrar('submit') }}>
      <button type="button" onClick={() => registrar('click')}>
        Pulsa
      </button>
    </form>
  )
}
// <BotonQueNoProvoca registrar={(q) => console.log(q)} />   // "click"

// S5) `EnterEnvia` — un formulario con dos campos y un botón. Sin tocar el botón:
//     escribir en un campo y pulsar Enter tiene que registrar "submit".
//     El starter dejó el formulario sin ningún botón capaz de enviarlo.
export function EnterEnvia({ registrar }: { registrar: (que: string) => void }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); registrar('submit') }}>
      <input name="nombre" />
      <input name="email" />
      {/* Cambiado a type="submit" para activar el comportamiento nativo del Enter */}
      <button type="submit">Enviar</button>
    </form>
  )
}
// <EnterEnvia registrar={(q) => console.log(q)} />   // "submit" al pulsar Enter

// S6) `CortarAntesDeNacer` — el último, y el que explica los otros cinco. Al pulsar
//     se registra "click" y el envío NO llega a ocurrir: "submit" no se registra.
//     Restricción: sin tocar el `type` del botón. El corte va en el manejador del
//     click, y es el mismo freno del drill 1 puesto un paso antes.
export function CortarAntesDeNacer({ registrar }: { registrar: (que: string) => void }) {
  return (
    <form onSubmit={() => registrar('submit')}>
      {/* Recibimos el evento 'e' y llamamos a preventDefault para cortar el submit */}
      <button onClick={(e) => { e.preventDefault(); registrar('click') }}>
        Pulsa
      </button>
    </form>
  )
}
// <CortarAntesDeNacer registrar={(q) => console.log(q)} />   // "click"

/* ─────────────────────────────────────────────────────────────────────────────
 * Con los seis en verde, la respuesta a "¿en el form o en el botón?" es una tabla:
 *
 *   quiero enterarme del envío         → onSubmit, y va en el <form>   (S2)
 *   quiero enterarme del click         → onClick, y va en el botón     (S3)
 *   quiero que ese botón no envíe      → type="button"                 (S4)
 *   quiero enviar sin ratón            → que haya un botón de envío    (S5)
 *   quiero cancelar el envío al vuelo  → preventDefault en el click    (S6)
 *   quiero enviar pero sin navegar     → preventDefault en el submit   (drill 1)
 *
 * Las dos últimas se parecen y no son lo mismo: S6 impide que el envío NAZCA —el
 * `onSubmit` no llega a saltar—, mientras que el drill 1 deja que nazca y solo le
 * quita al navegador la parte de irse de la página. Por eso el drill 2 se arregla
 * con `type` y no con S6: un botón que sigue siendo de envío es el que responde al
 * Enter, aunque le hayas cancelado el click.
 * ───────────────────────────────────────────────────────────────────────────── */
