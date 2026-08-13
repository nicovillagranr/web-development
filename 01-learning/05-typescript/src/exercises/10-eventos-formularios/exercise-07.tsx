/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — las dos señas del evento, sobre un click de verdad:
 *
 *   <ul id="lista">              ← el manejador está enganchado AQUÍ
 *     <li id="uno">Uno</li>      ← el dedo pulsa AQUÍ
 *   </ul>
 *
 *   e = {
 *     currentTarget: <ul id="lista">,   ← dónde vive el manejador
 *     target:        <li id="uno">,     ← dónde ocurrió el evento
 *   }                                     (recortado: trae ~25 campos más)
 *
 * ⚠️ Si el elemento del manejador no tiene nada dentro, los dos apuntan al mismo
 *    sitio. Es lo que pasaba en todo el bloque hasta ahora.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 07 — target y currentTarget                      ·  7/10 del bloque
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · distinguir dónde ocurrió un evento de dónde está enganchado el manejador
 *   · elegir cuál de las dos señas leer en cada caso
 *   · saber cuál de las dos te deja TypeScript leer, y por qué
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * En el 06 escribiste `e.target.value` seis veces y funcionó siempre. Eso fue
 * suerte de dos maneras: tus campos no tenían nada dentro, y el tipo de evento que
 * usabas era justo el único que te deja leerlo. Aquí se acaban las dos cosas.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 *   TEORÍA 1 · quién es quién cuando hay hijos  →  drills 1, 2, 3
 *   TEORÍA 2 · y por qué no están tipados igual →  drills 4, 5, 6
 *
 * ▸ EJERCICIO — 6 drills en escalera, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-07.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters de este archivo están rotos a propósito.
 *   ¿Atascado? Las pistas están en `exercise-07.pistas.md`, de una en una.
 *
 * ⚠️ 3 de los 6 pasan el test con el fallo dentro y 2 fallan sin que typecheck
 *    diga una palabra. Corre siempre los dos comandos.
 *
 * 📝 Las traces van comentadas: en `.tsx` escribir `<Componente />` solo fabrica
 *    un objeto que lo describe, no lo ejecuta.
 * ===========================================================================*/

import type { MouseEvent, ChangeEvent } from 'react'


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — quién es quién cuando hay hijos
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   `e.currentTarget` es el elemento que lleva enganchado el manejador.
 *   `e.target` es el elemento donde ocurrió el evento: el más profundo, el que
 *   recibió el click. El evento nace en `target` y SUBE hasta `currentTarget`
 *   avisando por el camino; a esa subida se le llama burbujeo.
 *
 * SINTAXIS
 *     <div onClick={(e) => …}>      ← e.currentTarget es este <div>, siempre
 *       <button>Pulsa</button>      ← e.target es este <button>, si pulsas aquí
 *     </div>
 *
 * EJEMPLO — pulsas el <button> de arriba y sale, en un solo disparo:
 *     currentTarget → <div>
 *     target        → <button>      ← el manejador salta aunque no esté en él
 *
 * 🧠 ANALOGÍA (de apoyo) — la conserjería. Llaman al telefonillo del 4ºB, pero el
 *    telefonillo suena en conserjería, que es donde está el que contesta. El 4ºB es
 *    `target`; la conserjería, `currentTarget`. El conserje sabe las dos cosas.
 *
 * 🗣️ LAS PIEZAS
 *     e.currentTarget → el elemento del manejador
 *     e.target        → el elemento donde ocurrió
 *     burbujeo        → la subida del evento de uno a otro
 *
 * ⚠️ TRAMPA — mientras el elemento no tenga hijos, los dos valen lo mismo y da
 *    igual cuál escribas. El fallo aparece el día que alguien mete un icono dentro
 *    del botón, y para entonces la línea mala lleva meses escrita.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) `BotonAvisaSuId` — un <button id="guardar"> que al pulsarlo le pasa a `avisar`
//    su propio id. El botón no lleva nada dentro, y eso hace que hoy las dos señas
//    del evento apunten al mismo elemento. El starter eligió la que no toca.
export function BotonAvisaSuId({ avisar }: { avisar: (t: string) => void }) {
  return (
    // <button id="guardar" onClick={(e) => avisar(e.target.id)}>
    <button id="guardar" onClick={(e) => avisar(e.currentTarget.id)}>
      Guardar
    </button>
  )
}
// <BotonAvisaSuId avisar={(t) => console.log(t)} />   // "guardar"

// 2) `BotonConIcono` — el mismo botón, ahora con un <span> de icono dentro. Sigue
//    teniendo que avisar con el id del BOTÓN, se pulse donde se pulse.
//    El starter es el del drill 1, sin tocar una letra.
export function BotonConIcono({ avisar }: { avisar: (t: string) => void }) {
  return (
    <button id="borrar" onClick={(e) => avisar(e.currentTarget.id)}>
      <span>🗑</span> Borrar
    </button>
  )
}
// <BotonConIcono avisar={(t) => console.log(t)} />   // "borrar"

// 3) `ListaDeTareas` — una <ul> con dos <li>, cada uno con su id, y `avisar` tiene
//    que recibir el id del <li> que se pulsó. Ahora avisa siempre del mismo.
//    Aviso: en este drill no hay ninguna línea mal escrita.
//    Restricción: los ids de los <li> no se tocan.
export function ListaDeTareas({ avisar }: { avisar: (t: string) => void }) {
  return (
    <ul>
      <li id="uno" onClick={(e) => avisar(e.currentTarget.id)}>
        Uno
      </li>
      <li id="dos" onClick={(e) => avisar(e.currentTarget.id)}>
        Dos
      </li>
    </ul>
  )
}
// <ListaDeTareas avisar={(t) => console.log(t)} />   // "dos"


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — y por qué no están tipados igual
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Las dos señas no traen el mismo tipo. React tipa `currentTarget` con el
 *   elemento que tú pusiste entre `<>`, y `target` con `EventTarget` pelado: la
 *   interfaz mínima de "algo que recibe eventos". `EventTarget` no tiene `id`, ni
 *   `value`, ni nada tuyo — sabe escuchar, y poco más.
 *
 * SINTAXIS
 *     const manejar = (e: MouseEvent<HTMLButtonElement>) => {
 *       e.currentTarget   // EventTarget & HTMLButtonElement  ← el botón entero
 *       e.target          // EventTarget                      ← eso y nada más
 *     }
 *
 * EJEMPLO — con esa misma anotación:
 *     e.currentTarget.className   ← compila: los botones tienen className
 *     e.target.className          ← no compila: EventTarget no sabe de eso
 *
 * 🧠 ANALOGÍA (de apoyo) — la entrada del edificio. Del que llama por el
 *    telefonillo sabes que llama y punto. Del que está en conserjería sabes su
 *    nombre, su turno y su extensión, porque de ese sí tienes la ficha.
 *
 * 🗣️ LAS PIEZAS
 *     EventTarget            → la interfaz mínima; el tipo de `target`
 *     EventTarget & T        → el tipo de `currentTarget`. La `T` la escribes tú
 *
 * ⚠️ TRAMPA — `ChangeEvent` es la excepción, y es la que te trajiste del 06: en
 *    ESE tipo React también tipa `target` con tu elemento, por eso `e.target.value`
 *    te compiló seis veces. En los demás eventos no. La costumbre no se trasplanta.
 *
 * 🔭 Para leerle propiedades a un `target` de verdad hay que estrecharlo con
 *    `instanceof`. No en este archivo: aquí se resuelve eligiendo bien.
 * ───────────────────────────────────────────────────────────────────────────── */

// 4) `BotonAvisaSuValor` — un <button value="rojo"> que al pulsarlo avisa con su
//    value. Un <button> admite `value` como cualquier campo, y en el DOM es string.
//    El manejador vive fuera del JSX y su anotación es lo único que hay que tocar.
export function BotonAvisaSuValor({ avisar }: { avisar: (t: string) => void }) {
  const manejar = (e: MouseEvent<HTMLButtonElement>) => avisar(e.currentTarget.value)
  return (
    <button value="rojo" onClick={manejar}>
      Elegir
    </button>
  )
}
// <BotonAvisaSuValor avisar={(t) => console.log(t)} />   // "rojo"

// 5) `CampoAvisaLoEscrito` — un <input> que avisa con lo escrito cada vez que
//    tecleas. El manejador vuelve a vivir fuera del JSX y otra vez lo único que se
//    toca es su anotación.
//    Este drill exige un import nuevo, y sale de 'react'.
export function CampoAvisaLoEscrito({ avisar }: { avisar: (t: string) => void }) {
  const manejar = (e: ChangeEvent<HTMLInputElement>) => avisar(e.currentTarget.value)
  return (
    <input onChange={manejar} />
  )
}
// <CampoAvisaLoEscrito avisar={(t) => console.log(t)} />   // "hey"

// 6) `TarjetaQueIgnoraElBoton` — una tarjeta entera pulsable que avisa con
//    "tarjeta", y dentro un <button> "Borrar" que va a lo suyo. Pulsar el botón NO
//    debe avisar de la tarjeta, aunque el click le pase por encima de camino arriba.
//    Aquí no sobra ni falta ningún elemento: lo que falta es distinguir un caso
//    del otro antes de avisar.
export function TarjetaQueIgnoraElBoton({ avisar }: { avisar: (t: string) => void }) {
  return (
    <article onClick={(e) => {
      if (e.target === e.currentTarget) {
        avisar('tarjeta')
      }
    }}>
      Tarjeta
      {/* <button onClick={(e) => e.stopPropagation()}>Borrar</button> Alterenativa: Mata el evento */}
      <button>Borrar</button>
    </article >
  )
}
// <TarjetaQueIgnoraElBoton avisar={(t) => console.log(t)} />   // "tarjeta", y nada al pulsar Borrar

/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 6 estén en verde: los seis manejadores de este archivo viven en el
 * elemento del que leen. No es casualidad — es la forma de que los tipos te sirvan
 * de algo. En el 08 el manejador pasa a vivir en el <form>, y ahí `target` y
 * `currentTarget` vuelven a separarse con una diferencia que sí importa.
 * ───────────────────────────────────────────────────────────────────────────── */
