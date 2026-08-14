/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — las dos formas de entregar un manejador, y no son iguales:
 *
 *   <input onChange={alEscribir} />                    ← entregas la función
 *   <input onChange={(e) => alEscribir(e.target.value)} />  ← entregas un envoltorio
 *
 *   La primera hace que `alEscribir` reciba el EVENTO entero.
 *   La segunda hace que reciba lo que tú saques de dentro.
 *
 * ⚠️ Las dos compilan cuando la prop pide un evento. Solo una compila cuando la
 *    prop pide un dato — y eso es de lo que va el archivo.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 09 — el manejador que traduce                    ·  9/10 del bloque
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · escribir componentes cuyas props piden datos y no eventos del DOM
 *   · sacar de un evento el dato que hace falta, con su tipo correcto
 *   · pasar de un `string` del DOM a un tipo estrecho tuyo sin usar `as`
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * Hasta aquí tus manejadores han sido para ti. Ahora los va a usar otro: un padre
 * que monta tu componente y que no tiene por qué saber si dentro hay un `<input>`,
 * un `<select>` o tres botones. Lo que le entregues por esa frontera es lo único
 * que va a ver — y si le entregas eventos del DOM, le estás pasando tu fontanería.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 *   TEORÍA 1 · el manejador que traduce   →  drills 1, 2, 3
 *   TEORÍA 2 · de dónde sale cada dato    →  drills 4, 5, 6
 *
 * ▸ EJERCICIO — 6 drills en escalera, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-09.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters de este archivo están rotos a propósito.
 *   ¿Atascado? Las pistas están en `exercise-09.pistas.md`, de una en una.
 *
 * ⚠️ 1 de los 6 pasa el test con el fallo dentro y 2 fallan sin que typecheck diga
 *    una palabra. Corre siempre los dos comandos.
 *
 * 📝 Las traces van comentadas: en `.tsx` escribir `<Componente />` solo fabrica
 *    un objeto que lo describe, no lo ejecuta.
 * ===========================================================================*/


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el manejador que traduce
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   La FRONTERA de un componente es lo que enseña hacia fuera: sus props. Un
 *   componente reutilizable pide en sus props DATOS de su dominio —un texto, un
 *   número, un id— y no eventos del DOM. Quien traduce el evento en ese dato es
 *   el propio componente, dentro, en el manejador.
 *
 * SINTAXIS
 *     function CampoTexto({ alEscribir }: { alEscribir: (valor: string) => void }) {
 *       return <input onChange={(e) => alEscribir(e.target.value)} />
 *     }                                  └ el manejador traduce: evento → dato
 *
 * EJEMPLO — lo que ve quien monta tu componente:
 *     <CampoTexto alEscribir={(valor) => guardar(valor)} />
 *                              └ recibe "hola", no un ChangeEvent con 25 campos
 *
 * 🧠 ANALOGÍA (de apoyo) — el intérprete de la reunión. El de fuera no aprende tu
 *    idioma ni le enseñas el tuyo: alguien traduce en la puerta. Si le pasas el
 *    audio en bruto, le has trasladado tu problema.
 *
 * 🗣️ LAS PIEZAS
 *     prop de dominio  → la que pide un dato: `(valor: string) => void`
 *     traducir         → sacar del evento el dato y llamar con él
 *     frontera         → las props: lo único que el de fuera ve de ti
 *
 * ⚠️ TRAMPA — `onChange={alEscribir}` parece la versión limpia de la otra y es una
 *    cosa distinta: entrega la función tal cual, así que `alEscribir` acaba
 *    recibiendo el evento entero. Escribir menos no es hacer lo mismo.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) `CampoTexto` — un `<input>` cuya prop `alEscribir` pide el texto escrito, no
//    el evento. Tecleas "hola" y quien lo monta recibe "hola".
//    El starter entrega el manejador sin traducir.
export function CampoTexto({ alEscribir }: { alEscribir: (valor: string) => void }) {
  return (
    <input onChange={(e) => alEscribir(e.target.value)} />
  )
}
// <CampoTexto alEscribir={(v) => console.log(v)} />   // "hola"

// 2) `Interruptor` — una casilla `<input type="checkbox">` cuya prop `alCambiar`
//    pide si ha quedado marcada o no. La marcas y recibe `true`.
//    Una casilla también tiene `value`, pero eso no es lo que te están pidiendo.
export function Interruptor({ alCambiar }: { alCambiar: (activo: boolean) => void }) {
  return (
    <input type="checkbox" onChange={(e) => alCambiar(e.target.checked)} />
  )
}
// <Interruptor alCambiar={(a) => console.log(a)} />   // true

// 3) `CampoConNombre` — un `<input name="email">` cuya prop `alCambiar` pide DOS
//    cosas: primero de qué campo se trata y después lo que hay escrito. Tecleas
//    "a" y recibe ("email", "a").
//    Los dos datos salen del mismo sitio, y el starter los tiene.
export function CampoConNombre({ alCambiar }: { alCambiar: (campo: string, valor: string) => void }) {
  return (
    // e.target.name recoge "email", e.target.value recoge lo que el usuario ha escrito
    <input name="email" onChange={(e) => alCambiar(e.target.name, e.target.value)} />
  )
}
// <CampoConNombre alCambiar={(c, v) => console.log(c, v)} />   // "email" "a"


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — de dónde sale cada dato
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   No todo dato sale del evento. Si el componente ya lo tiene en sus props, el
 *   evento no pinta nada: se llama a la prop con lo que ya se sabe. Y cuando el
 *   dato sí sale del DOM, llega siempre como `string` — si tu dominio quiere algo
 *   más estrecho, hay que COMPROBARLO, no afirmarlo.
 *
 * SINTAXIS
 *     <button onClick={() => alBorrar(id)}>Borrar</button>
 *                       └ sin `e`: el id venía por props
 *
 *     const valor = e.target.value            // string, siempre
 *     if (valor === 'rojo') alElegir(valor)   // aquí dentro ya es 'rojo'
 *
 * EJEMPLO — comparar contra un valor concreto ESTRECHA el tipo:
 *     valor            → string
 *     dentro del `if`  → 'rojo'      ← TypeScript lo sabe porque lo comprobaste
 *
 * 🧠 ANALOGÍA (de apoyo) — el portero de la discoteca. `as` es decir "déjale pasar,
 *    que es mayor de edad". La comprobación es mirarle el carnet. Las dos le dejan
 *    entrar; solo una se entera cuando no lo es.
 *
 * 🗣️ LAS PIEZAS
 *     unión de literales → `type Color = 'rojo' | 'verde' | 'azul'`
 *     estrechar          → pasar de un tipo ancho a uno concreto comprobando
 *
 * ⚠️ TRAMPA — un `<select>` con tres `<option>` te sigue dando `string` en `value`,
 *    no la unión de esas tres. El navegador no sabe nada de tus tipos: eso lo sabe
 *    tu código, y por eso el puente lo tienes que construir tú.
 * ───────────────────────────────────────────────────────────────────────────── */

// 4) `BotonBorrar` — un botón que, al pulsarlo, llama a `alBorrar` con el id del
//    elemento que hay que borrar. El id llega por props, ya escrito arriba.
//    El starter lo va a buscar a otro sitio.
export function BotonBorrar({ id, alBorrar }: { id: string; alBorrar: (id: string) => void }) {
  return (
    <button aria-label={`Borrar ${id}`} onClick={() => alBorrar(id)}>
      Borrar
    </button>
  )
}
// <BotonBorrar id="t-7" alBorrar={(id) => console.log(id)} />   // "t-7"

// 5) `CampoCantidad` — un `<input type="number">` cuya prop `alCambiar` pide un
//    número de verdad. Escribes 21 y recibe 21, no "21".
//    Ya te pasó en el 06: lo que trae el campo no cambia porque el campo sea
//    numérico.
export function CampoCantidad({ alCambiar }: { alCambiar: (cantidad: number) => void }) {
  return (
    <input type="number" onChange={(e) => alCambiar(Number(e.target.value))} />
  )
}
// <CampoCantidad alCambiar={(n) => console.log(n)} />   // 21

/* 📌 El type de aquí abajo, a mano para el drill 6:
 *      type Color = 'rojo' | 'verde' | 'azul'
 *    Tres textos concretos, no "cualquier texto". */
type Color = 'rojo' | 'verde' | 'azul'

// 6) `SelectorDeColor` — un `<select>` con las tres opciones de `Color` y una prop
//    `alElegir` que pide un `Color`, no un texto cualquiera. Eliges "verde" y
//    recibe "verde"; si por lo que sea llegara cualquier otra cosa, no se llama.
//    El starter le entrega lo que da el DOM y ahí se acaba su suerte.
//    Restricción: sin `as`, como en todo el archivo.
export function SelectorDeColor({ alElegir }: { alElegir: (color: Color) => void }) {
  return (
    <select onChange={(e) => {
      switch (e.target.value) {
        case 'rojo': alElegir('rojo'); break
        case 'verde': alElegir('verde'); break
        case 'azul': alElegir('azul'); break
      }
    }}>
      <option value="rojo">Rojo</option>
      <option value="verde">Verde</option>
      <option value="azul">Azul</option>
    </select>
  )
}
// <SelectorDeColor alElegir={(c) => console.log(c)} />   // "verde"

/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 6 estén en verde: ninguna de las seis props de este archivo menciona
 * un evento del DOM, y sin embargo los seis componentes están hechos de eventos.
 * Eso es una frontera. En el 10 se junta todo en un formulario de verdad.
 * ───────────────────────────────────────────────────────────────────────────── */
