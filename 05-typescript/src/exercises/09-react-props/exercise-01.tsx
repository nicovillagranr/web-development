/* =============================================================================
 * EJERCICIO 01 — React props: un componente es una FUNCIÓN que recibe UN OBJETO
 * =============================================================================
 *
 * 🟢 EL CONCEPTO (uno solo, y ya lo tienes medio entrenado)
 * ----------------------------------------------------------------------------
 * Cuando escribes esto en JSX:
 *
 *     <Saludo nombre="Nico" edad={30} />
 *
 * React NO le pasa dos cosas a `Saludo`. Le pasa UNA SOLA:
 *
 *     Saludo({ nombre: "Nico", edad: 30 })
 *
 * Es decir: un componente es una función normal, con UN parámetro, y ese
 * parámetro es un OBJETO. React empaqueta todo lo que escribiste en la etiqueta
 * dentro de ese objeto y te lo entrega.
 *
 * 👉 Por eso TIPAR PROPS NO ES NADA NUEVO: es tipar un parámetro de tipo objeto,
 *    exactamente lo mismo que hiciste en 04-objetos con `Producto`, `Empleado`
 *    o `Item`. Cambia el envoltorio (JSX), no la idea.
 *
 * 🧠 ANALOGÍA: el componente es una cafetera. Las props son la cápsula que le
 *    metes. El JSX es la ranura, y TypeScript es la etiqueta que dice qué
 *    cápsulas encajan. Si intentas meter una cápsula de otro formato, TS te
 *    frena ANTES de encender la máquina (no espera a que salga el café malo).
 *
 *
 * 🗣️ VOCABULARIO — nombrar bien las piezas (esto se pregunta en entrevistas)
 * ----------------------------------------------------------------------------
 * Sobre  `<Saludo nombre="Nico" />`  y  `function Saludo(props: { nombre: string })`
 *
 *   · `nombre="Nico"`   en el JSX se ESCRIBE como un ATRIBUTO (eso es sintaxis),
 *                       pero lo que viaja hasta el componente es una PROP.
 *   · `props`           es el PARÁMETRO (el hueco declarado en la función).
 *   · `{ nombre: "Nico" }` es el ARGUMENTO (el valor real que llega en la llamada).
 *   · `nombre` dentro de ese objeto es una PROPIEDAD.
 *   · El componente RETORNA JSX. NO "imprime" ni "pinta" nada: devuelve una
 *     descripción, y es React quien la pinta después en el DOM.
 *
 *   Regla mnemotécnica: PARÁMETRO = el hueco · ARGUMENTO = lo que metes en el hueco.
 *   Y en JSX: ATRIBUTO = cómo lo escribes · PROP = qué recibe el componente.
 *
 *
 * ⚠️ DOS COSAS NUEVAS QUE VAN A MOLESTAR (avisado de antemano)
 * ----------------------------------------------------------------------------
 *   1. JSX SIN CERRAR. `<p>` sin su `</p>` rompe el parseo del archivo ENTERO —
 *      el mismo efecto que aquel `=> )` del 01-tipos-basicos/exercise-05. Si de
 *      repente "todo" está rojo, busca una etiqueta sin cerrar antes de dudar
 *      de tu lógica.
 *   2. TS vs React son DOS CAPAS. TS vigila que las props encajen ANTES de
 *      ejecutar. React pinta EN RUNTIME. Un test puede fallar con los tipos
 *      perfectos (lógica mal) y los tipos pueden fallar con el test verde
 *      (el listón sigue siendo runtime + typecheck, como en toda la FASE 1).
 *
 * ▸ EJERCICIO — drills en escalera, del 1 al 10. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/09-react-props/exercise-01.test.tsx
 *     pnpm typecheck
 * ===========================================================================*/

import type { ReactNode } from 'react'


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 0 — CALENTAMIENTO: un componente es una función que RETORNA JSX
 * ════════════════════════════════════════════════════════════════════════════
 * Sin props todavía. Solo para fijar la forma: función → `return` → JSX.
 * Fíjate en que es un `return` normal y corriente, como los de FASE 1.
 */

// 1) `Hola` — un componente SIN props que retorna un párrafo con el texto "Hola".
//    Ojo: sin props significa que la función no declara ningún parámetro.
//    <Hola />  →  <p>Hola</p>
export function Hola() {
  return <p>Hola</p>
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 1 — UNA prop: tipar el parámetro-objeto
 * ════════════════════════════════════════════════════════════════════════════
 * Aquí es donde tipas. El parámetro se llama `props` por convención y su tipo
 * es un objeto literal, igual que cualquier parámetro de 04-objetos:
 *
 *     function Saludo(props: { nombre: string }) {
 *       return <p>Hola, {props.nombre}</p>
 *     }
 *
 * Las llaves `{ }` DENTRO del JSX son otra cosa distinta: son la ventanita para
 * meter una expresión de JavaScript en medio del marcado. `{props.nombre}` dice
 * "aquí va el valor de esa propiedad", no "aquí va un objeto".
 */

// 2) `Saludo` — recibe la prop `nombre` (string) y retorna un párrafo que dice
//    exactamente `Hola, ` + el nombre.
//    <Saludo nombre="Nico" />  →  <p>Hola, Nico</p>
export function Saludo(props: { nombre: string }) {
  return <p>Hola, {props.nombre}</p>
}

// 3) `Contador` — recibe la prop `total` (number) y retorna un <span> con el
//    texto `Total: ` + el número. Mismo patrón que el 2, pero el tipo de la
//    propiedad cambia: aquí NO es string.
//    <Contador total={3} />  →  <span>Total: 3</span>
export function Contador(props: { total: number }) {
  return <span>Total: {props.total}</span>
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 2 — DESESTRUCTURAR el parámetro (mismo tipo, otra sintaxis)
 * ════════════════════════════════════════════════════════════════════════════
 * Escribir `props.esto` y `props.aquello` todo el rato cansa. Lo habitual en
 * React real es abrir el objeto en la propia firma:
 *
 *     function Saludo({ nombre }: { nombre: string }) { ... }
 *                     └─ IZQUIERDA: qué saco    └─ DERECHA: de qué tipo es el objeto
 *
 * ⚠️ Es el mismo lío del `=` del 01-tipos-basicos/exercise-07, en otra postura:
 *    a la IZQUIERDA de los dos puntos van los NOMBRES que extraes (valores).
 *    A la DERECHA va el TIPO del objeto completo, no el de una propiedad suelta.
 *    El tipo SIEMPRE describe el objeto entero, desestructures o no.
 */

// 4) `Precio` — recibe la prop `euros` (number) y retorna un <b> con el número
//    seguido de " €" (espacio antes del símbolo). DESESTRUCTURA en la firma:
//    dentro del cuerpo debes poder escribir `euros`, no `props.euros`.
//    <Precio euros={12} />  →  <b>12 €</b>
export function Precio({ euros }: { euros: number }) {
  return <b>{euros} €</b>
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 3 — VARIAS props, una OPCIONAL, y el tipo con NOMBRE
 * ════════════════════════════════════════════════════════════════════════════
 * Cuando el objeto de props crece, se le pone nombre — igual que hiciste con
 * `interface Empleado`. Convención universal en React: `<Componente>Props`.
 *
 *     type BotonProps = { texto: string; deshabilitado?: boolean }
 *
 * El `?` significa "se puede omitir". En el JSX, `<Boton texto="Ok" />` es legal
 * y dentro del componente `deshabilitado` valdrá `undefined` — o sea que su tipo
 * real dentro del cuerpo es `boolean | undefined`, y toca guard (`??`) como en
 * 04-objetos.
 */

// 5) Define el tipo `BotonProps` con:
//      · `texto`         string, obligatoria
//      · `deshabilitado` boolean, OPCIONAL
//    Exporta el tipo (el test lo importa).
export type BotonProps = { texto: string, deshabilitado?: boolean }

//    `Boton` — retorna un <button> con `texto` dentro. El atributo `disabled` del
//    botón debe valer lo que llegue en `deshabilitado`, y `false` si no llegó
//    (recuerda `??`, del 04-objetos).
//    <Boton texto="Enviar" />                      →  <button>Enviar</button>  (habilitado)
//    <Boton texto="Enviar" deshabilitado={true} /> →  <button disabled>Enviar</button>
export function Boton({ texto, deshabilitado }: BotonProps) {
  return <button disabled={deshabilitado ?? false}>{texto}</button>
}

// 6) `Insignia` — recibe `texto` (string) y `variante`, que SOLO puede ser
//    "info" o "alerta" (unión de literales, del 01-tipos-basicos/exercise-08).
//    Retorna un <span> con el texto dentro y el `className` igual a la variante.
//    Aquí se ve la ganancia real de TS en React: <Insignia variante="rojo" />
//    ni siquiera compila. El error se caza escribiendo, no en producción.
//    <Insignia texto="Nuevo" variante="info" />  →  <span class="info">Nuevo</span>
export function Insignia({ texto, variante }: { texto: string, variante: 'info' | 'alerta' }) {
  return <span className={variante}>{texto}</span>
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 4 — CAPSTONE: una prop que es un ARRAY de objetos del dominio
 * ════════════════════════════════════════════════════════════════════════════
 * Nada nuevo de tipos: `Usuario[]` es el mismo array de objetos de 04-objetos,
 * solo que ahora entra por una prop. Lo único propio de React es el `key` del
 * `.map`: React lo pide para identificar cada elemento de la lista entre
 * repintados. NO es una prop tuya, no llega al componente hijo, y NO va tipado
 * por ti — es un canal interno de React.
 */

export type Usuario = { id: number; nombre: string }

// 7) `ListaUsuarios` — recibe la prop `usuarios` (un array de `Usuario`) y
//    retorna un <ul> con un <li> por cada usuario, mostrando su `nombre`.
//    Cada <li> lleva `key={usuario.id}`.
//    Es tu `.map` de siempre, pero devolviendo JSX en vez de strings.
//    <ListaUsuarios usuarios={[{ id: 1, nombre: "Ana" }, { id: 2, nombre: "Leo" }]} />
//      →  <ul><li>Ana</li><li>Leo</li></ul>
export function ListaUsuarios({ usuarios }: { usuarios: Usuario[] }) {
  return (
    <ul>
      {usuarios.map((usuario) => <li key={usuario.id}>{usuario.nombre}</li>)}
    </ul>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 5 — `children`: lo que va ENTRE las etiquetas también es una prop
 * ════════════════════════════════════════════════════════════════════════════
 * Hasta ahora todo lo que recibía un componente lo escribías en la etiqueta de
 * apertura (los atributos del drill 5). Pero un componente también puede recibir
 * lo que pongas ENTRE su apertura y su cierre:
 *
 *     <Caja>
 *       <p>Hola</p>     ← esto de aquí en medio
 *     </Caja>
 *
 * React empaqueta ese contenido y te lo entrega... como UNA PROP MÁS, llamada
 * `children`. No hay magia: `<Caja>algo</Caja>` es equivalente a llamar
 * `Caja({ children: "algo" })`. Es el MISMO objeto de props de siempre, solo que
 * esta propiedad se rellena por la posición en el JSX en vez de por su nombre.
 *
 * ¿Y de qué tipo es? De `ReactNode`: el tipo que engloba "cualquier cosa que
 * React sepa pintar" — JSX, texto, números, listas de esas cosas, `null`…
 * Se importa de `react` (mira el import del principio del archivo).
 *
 * 🧠 ANALOGÍA: los atributos son lo que escribes en la ETIQUETA pegada al paquete
 *    (destinatario, peso, frágil). `children` es lo que va DENTRO del paquete.
 *    Dos formas de mandar cosas, mismo camión — y las dos acaban en el mismo
 *    objeto de props cuando el paquete llega.
 */

// 8) `Caja` — recibe `children` y lo retorna envuelto en un <div> con
//    `className="caja"`. El contenido va dentro del div, tal cual llega.
//    <Caja><p>Hola</p></Caja>  →  <div class="caja"><p>Hola</p></div>
export function Caja({ children }: { children: ReactNode }) {
  return <div className="caja">{children}</div>
}
// <Caja><p>Hola</p></Caja>  →  <div class="caja"><p>Hola</p></div>


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 6 — una prop puede ser una FUNCIÓN
 * ════════════════════════════════════════════════════════════════════════════
 * Si una prop puede ser un string, un number o un array… también puede ser una
 * FUNCIÓN. Se tipa igual que cualquier otra, con la firma de la función:
 *
 *     { onAccion: () => void }
 *        │          │     └─ no devuelve nada útil
 *        │          └─ no recibe argumentos
 *        └─ convención de React: las props-función se llaman `onAlgo`
 *
 * ⚠️ AQUÍ VUELVE LA CAFETERA del 02-funciones/exercise-06 — ENTREGAR ≠ EJECUTAR:
 *
 *     onClick={onAccion}     ✅ ENTREGAS la función. React la guarda y la
 *                               dispara ÉL cuando alguien haga clic.
 *     onClick={onAccion()}   ❌ La EJECUTAS tú, ahora mismo, mientras se pinta.
 *                               React recibe el RESULTADO (aquí `undefined`),
 *                               no la función. El clic no hará nada.
 *
 * Los paréntesis son el gatillo. Sin paréntesis, entregas el arma cargada; con
 * paréntesis, disparas tú y le pasas a React el casquillo.
 *
 * (Este bloque va de TIPAR una prop-función. Los tipos de los EVENTOS del DOM
 *  —`React.ChangeEvent<HTMLInputElement>` y compañía— son el tema propio de
 *  `10-eventos-formularios`. Aquí el callback no recibe nada.)
 */

// 9) `BotonAccion` — recibe `etiqueta` (string) y `onAccion` (una función que no
//    recibe argumentos ni devuelve nada). Retorna un <button> con la etiqueta
//    como contenido, que al hacer clic ejecute `onAccion`.
//    <BotonAccion etiqueta="Borrar" onAccion={avisar} />  →  <button>Borrar</button>
//                                                            (al clic, corre `avisar`)
export function BotonAccion({ etiqueta, onAccion }: { etiqueta: string, onAccion: () => void }) {
  return <button onClick={onAccion}>{etiqueta}</button>
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 7 — CAPSTONE: las tres clases de prop en un solo componente
 * ════════════════════════════════════════════════════════════════════════════
 * Sin concepto nuevo. Es la demostración de la tesis del ejercicio: un dato, un
 * contenido y una función conviven en el MISMO objeto de props, y se tipan las
 * tres exactamente igual. Nada es especial.
 */

// 10) Define el tipo `PanelProps` con:
//       · `titulo`   string
//       · `children` el contenido (ReactNode)
//       · `onCerrar` una función sin argumentos que no devuelve nada
//     Expórtalo (el test lo importa).
export type PanelProps = { titulo: string, children: ReactNode, onCerrar: () => void }

//     `Panel` — retorna un <section> que contenga, EN ESTE ORDEN:
//       1. un <h2> con el título
//       2. un <button> con el texto "Cerrar" que al clic ejecute `onCerrar`
//       3. el `children`
//     <Panel titulo="Ajustes" onCerrar={cerrar}><p>Contenido</p></Panel>
//       →  <section><h2>Ajustes</h2><button>Cerrar</button><p>Contenido</p></section>
export function Panel({ titulo, onCerrar, children }: PanelProps) {
  return (
    <section>
      <h2>{titulo}</h2>
      <button onClick={onCerrar}>Cerrar</button>
      {children}
    </section>
  )
}
