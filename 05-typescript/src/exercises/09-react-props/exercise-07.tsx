/* =============================================================================
 * EJERCICIO 07 — NO REESCRIBIR EL DOM: `ComponentProps` y el rest `{...resto}`
 * =============================================================================
 *
 * 🟢 EL CONCEPTO
 * ----------------------------------------------------------------------------
 * En el 06 aprendiste la regla: **las props se DERIVAN de una fuente de la
 * verdad, no se copian**. Allí la fuente era un tipo tuyo (`Articulo`).
 *
 * Aquí la fuente es OTRA, y no la escribiste tú: **el propio HTML**.
 *
 * Piensa en un `<button>` nativo. Acepta `onClick`, `disabled`, `type`, `id`,
 * `className`, `title`, `autoFocus`, `form`, `name`, `value`, y unos cuantos
 * cientos de `aria-*` y `data-*`. Cuando tú escribes:
 *
 *     type BotonProps = { texto: string }
 *
 * tu botón acepta UNA cosa. El día que alguien necesite `disabled`, lo añades.
 * Luego `aria-label`. Luego `type="submit"`. Y acabas reescribiendo a mano —
 * peor y desactualizada — la lista que React YA tiene escrita.
 *
 *     import type { ComponentProps } from 'react'
 *     ComponentProps<'button'>   ← "el tipo exacto de props que acepta <button>"
 *
 * Eso es un tipo derivado, igual que el `Pick` del 06. Solo cambia el dueño de
 * la fuente: antes tu dominio, ahora React.
 *
 * 🧠 ANALOGÍA: la FUNDA del móvil. Tu componente es una funda que envuelve un
 *    elemento nativo. Le añades lo tuyo (color, agarre), pero NO rediseñas el
 *    teléfono: le haces AGUJEROS para que los botones y el puerto de carga de
 *    abajo sigan siendo accesibles. `ComponentProps<'button'>` es la ficha
 *    técnica del teléfono; `{...resto}` son los agujeros.
 *
 *
 * 🔧 LA SEGUNDA PIEZA: el rest `{...resto}`
 * ----------------------------------------------------------------------------
 * Tipar que aceptas 300 props no sirve de nada si luego no las PASAS al
 * elemento. Y no vas a escribirlas una a una. Para eso está el rest, que ya
 * usaste con objetos en `04-objetos`:
 *
 *     function Boton({ variante, ...resto }: BotonProps) {
 *              ↑ saco la MÍA        ↑ el resto va en un objeto, sin nombrarlo
 *       return <button {...resto} />
 *     }                     ↑ y lo derramo entero sobre el elemento
 *
 * `{ variante, ...resto }` es el MISMO gesto que `const { id, ...resto } = obj`
 * de FASE 1. No hay sintaxis nueva: solo que el objeto que desestructuras son
 * las props, y el sitio donde lo derramas es una etiqueta JSX.
 *
 *
 * ▸ EJERCICIO — drills en escalera, del 1 al 10. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/09-react-props/exercise-07.test.tsx
 *     pnpm typecheck
 *
 * 📝 Trazado en .tsx = ejemplo de uso comentado con `//`.
 * ===========================================================================*/

import type { ComponentProps, ReactNode } from 'react'


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 0 — CALENTAMIENTO: el rest en objetos, sin React de por medio
 * ════════════════════════════════════════════════════════════════════════════
 * Antes de derramar props sobre una etiqueta, recuerda el gesto en JS puro:
 * `...resto` recoge "todo lo que no nombré" en un objeto nuevo.
 */

// 1) `partirUsuario` — recibe un objeto con `id` (number), `nombre` (string) y
//    `activo` (boolean). Retorna un objeto con DOS claves:
//      · `id`    el id suelto
//      · `resto` todo lo demás, en un objeto
//    Hazlo con desestructuración + rest; no construyas nada a mano.
//    ⚠️ Anota el tipo de retorno (está escrito abajo, en la firma).
//    💡 Esto es EXACTAMENTE lo que hace `{ variante, ...resto }` en un
//       componente: partir las props en "lo mío" y "lo que reenvío".
//    partirUsuario({ id: 1, nombre: 'Ana', activo: true })
//      →  { id: 1, resto: { nombre: 'Ana', activo: true } }
// eslint-disable-next-line react-refresh/only-export-components -- no es un componente; la regla vigila el hot-reload de Vite y aquí no aplica
export function partirUsuario(obj: { id: number, nombre: string, activo: boolean }): { id: number; resto: { nombre: string; activo: boolean } } {
  const { id, ...resto } = obj
  return { id, resto }
}
partirUsuario({ id: 1, nombre: 'Ana', activo: true }) // →  { id: 1, resto: { nombre: 'Ana', activo: true } }


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 1 — DERRAMAR el rest sobre una etiqueta JSX
 * ════════════════════════════════════════════════════════════════════════════
 * Mismo rest, nuevo destino. `<div {...resto} />` significa "pon como atributos
 * todas las claves que haya en `resto`". Si `resto` vale `{ id: 'c1' }`, sale
 * `<div id="c1">`.
 */

// 2) `Caja` — recibe `titulo` (string), `id` (string) y `className` (string).
//    Saca SOLO el `titulo` por desestructuración y deja el resto en `...resto`.
//    Retorna un <div> con el resto derramado encima, que contenga un <h3> con
//    el título.
//    ⚠️ Fíjate en lo que NO haces: no escribes `id={id} className={className}`.
//    <Caja titulo="Hola" id="c1" className="caja" />
//      →  <div id="c1" class="caja"><h3>Hola</h3></div>
// ✍️ EJEMPLO GUIADO — resuelto por el coach a petición tuya ("resuélvelo tú, para entender").
//    El gesto se practica solo, a partir del drill 3.
export function Caja({ titulo, ...resto }: { titulo: string, id: string, className: string }) {
  return (
    // Dentro de esta etiqueta div, derrama el rest. Significa que puedes poner:
    // className="caja"
    // id="c1"
    // aria-label="caja"
    // Todo lo que quieras
    <div {...resto}>
      <h3>{titulo}</h3>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 2 — `ComponentProps<'etiqueta'>`: la ficha técnica que ya existe
 * ════════════════════════════════════════════════════════════════════════════
 * `ComponentProps` es un tipo GENÉRICO (como `Pick` o `Array`): entre `<...>` le
 * dices de qué etiqueta quieres las props, y te devuelve el tipo entero.
 *
 *     ComponentProps<'button'>   ComponentProps<'input'>   ComponentProps<'a'>
 *
 * ⚠️ La etiqueta va entre COMILLAS: es un tipo literal string ('button'), el
 *    mismo tipo de dato que las uniones `"info" | "alerta"` del exercise-01.
 *
 * 💡 Y no es magia: haz Ctrl-clic (F12) sobre `ComponentProps` y acabarás en el
 *    `.d.ts` de `@types/react`, igual que hiciste con `ReactNode` en el 01.
 */

// 3) Define el tipo `PropsDeBoton` como las props nativas de `<button>` y
//    expórtalo. Una línea.
export type PropsDeBoton = ComponentProps<'button'>

/* ════════════════════════════════════════════════════════════════════════════
 * ESCALERA P — REFUERZO DEL CUERPO DEL DRILL 3 (montada 23 jul 2026)
 * ════════════════════════════════════════════════════════════════════════════
 * El TIPO del drill 3 lo acertaste. Lo que se atascó fue el cuerpo, y siempre en
 * el mismo punto: de dónde sale el objeto que se derrama. Lo buscaste llamando a
 * `partirUsuario` y lo buscaste fabricando un `const props = {}`. Está en el
 * paréntesis: React ya te lo entrega, solo hay que ponerle nombre.
 *
 * Tres peldaños. Cada uno aísla UNA pieza, y el tercero las junta. Resuélvelos
 * en orden; cuando el P3 te salga, el cuerpo del drill 3 es el mismo gesto.
 *
 *     pnpm test:run src/exercises/09-react-props/exercise-07.test.tsx
 */

// P1) EL PARÁMETRO CON NOMBRE — sin derrame todavía.
//     `TituloSimple` — recibe sus props con un NOMBRE, `p`. NO desestructures:
//     nada de `{ texto }`, quieres el objeto entero bajo un solo nombre.
//     Retorna un <h1> con el texto dentro.
//     💡 Dentro del cuerpo llegas al dato con `p.texto`, con punto, como en
//        cualquier objeto de FASE 1. Un objeto de props no tiene nada especial.
//     <TituloSimple texto="Hola" />  →  <h1>Hola</h1>
export function TituloSimple(p: { texto: string }) {
  return (
    <h1>
      {p.texto}
    </h1>
  )
}

// P2) EL DERRAME — sobre un objeto que YA existe, sin parámetros de por medio.
//     `ATRIBUTOS` está escrito abajo y no se toca.
//     `CajaConAtributos` — no recibe nada. Retorna un <div> con `ATRIBUTOS`
//     derramado encima y el texto "fija" dentro.
//     💡 El derrame se aplica al NOMBRE de un objeto que ya tiene contenido.
//        Si el objeto está vacío, no escribe ningún atributo (eso fue lo que te
//        pasó con `const props: PropsDeBoton = {}`).
//     <CajaConAtributos />  →  <div id="x1" class="fija">fija</div>
const ATRIBUTOS = { id: 'x1', className: 'fija' }

export function CajaConAtributos() {
  return (
    <div {...ATRIBUTOS}>
      fija
    </div>
  )
}

// P3) LOS DOS JUNTOS — el gesto completo, sobre otro elemento.
//     `EntradaPasarela` — recibe las props nativas de `<input>` con un NOMBRE
//     (como en P1) y las derrama enteras sobre un <input /> (como en P2).
//     No saca ninguna prop suelta, no declara ninguna a mano, y en el cuerpo no
//     hay ni un valor escrito por ti: todo lo que sale, entró.
//     ⚠️ Un <input> no lleva contenido: se escribe autocerrado, `<input ... />`.
//     <EntradaPasarela type="email" placeholder="Correo" disabled />
//       →  <input type="email" placeholder="Correo" disabled>
export function EntradaPasarela(entradas: ComponentProps<'input'>) {
  return <input {...entradas} />
}


//    `BotonPasarela` — usa `PropsDeBoton`. No añade NADA: recibe las props
//    enteras y las derrama tal cual sobre un <button>. Es la funda transparente.
//    Aquí no hace falta rest: no sacas ninguna prop, se derrama el objeto entero.
//    <BotonPasarela type="submit" disabled aria-label="Enviar">Ok</BotonPasarela>
//      →  <button type="submit" disabled aria-label="Enviar">Ok</button>
export function BotonPasarela(entradas: PropsDeBoton) {
  return (
    <button {...entradas}></button>
  )
}



// 4) Define la `interface BotonProps` que EXTIENDA las props nativas de
//    `<button>` y añada:
//      · `variante` con el tipo `'primario' | 'secundario'`
//    Expórtala. (Es el `extends` del 06, con otra base.)
export interface BotonProps extends ComponentProps<'button'> {
  variante: 'primario' | 'secundario'
}

//    `Boton` — usa `BotonProps`. Saca `variante` y deja el resto en `...resto`.
//    Retorna un <button> con `className` = la variante y el resto derramado.
//    💡 `children` viaja DENTRO de `resto` (es una prop más, como aprendiste en
//       el 05), así que el <button> puede escribirse autocerrado: `<button ... />`.
//    <Boton variante="primario" disabled>Ok</Boton>
//      →  <button class="primario" disabled>Ok</button>
export function Boton({ variante, ...resto }: BotonProps) {
  return (
    <button className={variante} {...resto}></button>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 3 — ⚠️ EL ORDEN DEL DERRAME DECIDE QUIÉN GANA
 * ════════════════════════════════════════════════════════════════════════════
 * Esto no es un truco de React: es la regla de los objetos de `04-objetos`.
 * **En un derrame, el que se escribe DESPUÉS pisa al de antes.**
 *
 *     <button className="mio" {...resto} />   → si resto trae className, gana RESTO
 *     <button {...resto} className="mio" />   → gana lo TUYO, siempre
 *
 * Ninguno es "el correcto": son dos decisiones distintas, y hay que tomarla a
 * conciencia. ¿Quieres que quien te llame pueda personalizar? Derrama al final.
 * ¿Hay un valor tuyo innegociable (seguridad, accesibilidad)? Derrama primero.
 *
 * 🧠 ANALOGÍA: pintar una pared. El último brochazo es el que se ve.
 */

// 5) Dos componentes GEMELOS, idénticos salvo el orden. Los dos reciben
//    `ComponentProps<'div'>` y ponen un `className` propio con el valor "mio".
//
//    · `CajaFija`    — el className "mio" GANA aunque quien llame mande otro.
//    · `CajaAbierta` — el className de quien llama PISA al "mio".
//
//    <CajaFija className="ajena" />     →  <div class="mio">
//    <CajaAbierta className="ajena" />  →  <div class="ajena">

// export type PropsDeBoton = ComponentProps<'button'>
export type PropsDeDiv = ComponentProps<'div'>

export function CajaFija(atributos: PropsDeDiv) {
  return (
    <div {...atributos} className="mio"></div>
  )
}

export function CajaAbierta(atributos: PropsDeDiv) {
  return (
    <div className="mio" {...atributos}></div>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 4 — `Omit` sobre props NATIVAS: prohibir y estrechar
 * ════════════════════════════════════════════════════════════════════════════
 * Heredar las props nativas te da TODAS — incluidas las que no quieres regalar.
 * `Omit` (el del 06) sirve para dos cosas distintas aquí:
 *
 *   a) PROHIBIR una prop: `Omit<ComponentProps<'input'>, 'type'>`
 *      → quien te llame ya no puede tocar el `type`. Lo decides tú.
 *
 *   b) ESTRECHARLA: quitarla y volver a declararla con un tipo MÁS ESTRICTO.
 *      `interface P extends Omit<ComponentProps<'a'>, 'href'> { href: string }`
 *      → en un `<a>` nativo `href` es OPCIONAL; en el tuyo, obligatorio.
 *
 * ⚠️ Recuerda la trampa del 06: si escribes mal la clave en el `Omit`, TS calla.
 */

// 6) Define la `interface EntradaProps` que extienda las props nativas de
//    `<input>` PERO SIN `'type'`, y añada:
//      · `etiqueta` string
//    Expórtala.
export interface EntradaProps extends Omit<ComponentProps<'input'>, 'type'> {
  etiqueta: string
}

//    `Entrada` — usa `EntradaProps`. Saca `etiqueta`, deja el resto. Retorna un
//    <label> que contenga el texto de la etiqueta y, después, un <input> con
//    `type="text"` FIJO (nadie puede cambiarlo) y el resto derramado.
//    <Entrada etiqueta="Nombre" placeholder="Ana" />
//      →  <label>Nombre<input type="text" placeholder="Ana"></label>
export function Entrada({ etiqueta, ...resto }: EntradaProps) {
  return (
    <label>
      {etiqueta}
      <input type="text" {...resto} />
    </label>
  )
}

// 7) Define la `interface BotonAccionProps` que extienda las props nativas de
//    `<button>` PERO SIN `'onClick'`, y vuelva a declarar:
//      · `onClick` como una función SIN argumentos que no devuelve nada
//    Expórtala.
//    💡 POR QUÉ: el `onClick` nativo entrega un EVENTO del DOM a tu función. Con
//       este estrechamiento dices "aquí el callback no recibe nada". Los tipos
//       de eventos del DOM se trabajan en la carpeta 10; esto es el aperitivo.

// Se extienden las propiedades de la etiqueta HTML Button, y luego se omite la propiedad "onClick"
// Dentro de este interface se vuelve a declarar a mano la propiedad "onClick" que es una función que no devuelve nada

export interface BotonAccionProps extends Omit<ComponentProps<'button'>, 'onClick'> {
  onClick: () => void
}

//    `BotonAccion` — usa `BotonAccionProps`. Derrama TODO sobre un <button>.
//    ⚠️ Cafetera (01/drill 9): se entrega, no se ejecuta.
//    <BotonAccion onClick={guardar}>Guardar</BotonAccion>
export function BotonAccion({ onClick, ...resto }: BotonAccionProps) {
  return (
    <button onClick={onClick} {...resto}></button>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 5 — CAPSTONE: la funda completa
 * ════════════════════════════════════════════════════════════════════════════
 * Sin concepto nuevo: derivar del DOM + `Omit` + rest + slot del 05 + orden del
 * derrame decidido a conciencia. Es, literalmente, cómo se escribe un botón en
 * una librería de componentes real.
 */

// 8) Define la `interface EnlaceSeguroProps` que extienda las props nativas de
//    `<a>` SIN `'href'`, `'target'` ni `'rel'`, y añada:
//      · `href` string, OBLIGATORIA
//    Expórtala. (En un `<a>` nativo las cuatro son opcionales; aquí `href` deja
//    de serlo, y `target`/`rel` desaparecen porque los fija el componente.)
export interface EnlaceSeguroProps extends Omit<ComponentProps<'a'>, 'href' | 'target' | 'rel'> {
  href: string
}

// 9) `EnlaceSeguro` — usa `EnlaceSeguroProps`. Retorna un <a> con el resto
//    derramado y, INNEGOCIABLES (nadie puede pisarlos), `target="_blank"` y
//    `rel="noopener noreferrer"`.
//    ⚠️ Piensa el orden del derrame ANTES de escribirlo: ¿quién debe ganar?
//    <EnlaceSeguro href="/a" className="link">Ir</EnlaceSeguro>
//      →  <a href="/a" class="link" target="_blank" rel="noopener noreferrer">Ir</a>
export function EnlaceSeguro({ href, ...resto }: EnlaceSeguroProps) {
  return (
    <a target="_blank" rel="noopener noreferrer" href={href} {...resto}></a>
  )
}

// 10) Define la `interface BotonIconoProps` que extienda las props nativas de
//     `<button>` y añada:
//       · `icono`    ReactNode, obligatoria  ← el slot del 05
//       · `variante` `'primario' | 'secundario'`, OPCIONAL
//     Expórtala.
export interface BotonIconoProps extends ComponentProps<'button'> {
  icono: ReactNode,
  variante?: 'primario' | 'secundario'
}

//     `BotonIcono` — usa `BotonIconoProps`. Saca `icono`, `variante`, `children`
//     y deja lo demás en `...resto`. Retorna un <button> con:
//       · `className` = la variante, o "primario" si no llegó (el `??` del 02)
//       · el resto derramado, de forma que quien llame NO pueda pisar el
//         className que acabas de calcular
//       · dentro: un <span> con `className="icono"` que contenga el icono, y
//         después el children
//     <BotonIcono icono={<b>★</b>} disabled>Guardar</BotonIcono>
//       →  <button class="primario" disabled><span class="icono"><b>★</b></span>Guardar</button>
export function BotonIcono({ icono, variante, children, ...resto }: BotonIconoProps) {
  return (
    <button {...resto} className={variante ?? 'primario'}>
      <span className="icono">{icono}</span>
      {children}
    </button>
  )
}
