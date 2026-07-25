/* =============================================================================
 * EJERCICIO 05 — COMPOSICIÓN: pasar JSX por props (`children` y slots con nombre)
 * =============================================================================
 *
 * 🟢 EL CONCEPTO
 * ----------------------------------------------------------------------------
 * En el 01 viste que `children` es una prop más: lo que escribes ENTRE la
 * apertura y el cierre llega en `props.children`, tipado como `ReactNode`.
 *
 *     <Caja><p>Hola</p></Caja>   ≡   Caja({ children: <p>Hola</p> })
 *
 * Eso resuelve UN hueco. Pero un componente real suele tener VARIAS zonas:
 * cabecera, cuerpo, pie, una barra lateral… Y `children` es solo uno.
 *
 * La respuesta no es un mecanismo nuevo: es darse cuenta de que **si `children`
 * puede llevar JSX, cualquier otra prop también puede**. Le pones nombre y ya:
 *
 *     type LayoutProps = {
 *       cabecera: ReactNode      ← un "slot" con nombre
 *       children:  ReactNode     ← el slot por defecto, el del medio
 *     }
 *
 *     <Layout cabecera={<h1>Título</h1>}>
 *       <p>Cuerpo</p>
 *     </Layout>
 *
 * A eso se le llama **slot nombrado**. `children` NO es especial: es el slot que
 * se rellena por POSICIÓN en vez de por nombre. Nada más.
 *
 * 🧠 ANALOGÍA: una mochila. `children` es el bolsillo grande — metes ahí y no
 *    hace falta decir dónde. Los slots nombrados son los bolsillos etiquetados
 *    (portátil, botella, llaves): también son bolsillos de la MISMA mochila, solo
 *    que para meter algo tienes que decir en cuál. Cuando necesitas separar
 *    contenidos que no deben mezclarse, dejas de tirar todo al bolsillo grande.
 *
 *
 * 🔁 POR QUÉ ESTO IMPORTA (y no es decoración)
 * ----------------------------------------------------------------------------
 * Componer así es lo que evita el componente-monstruo lleno de banderas:
 *
 *     <Dialogo tieneBotonCerrar mostrarIcono textoPie="..." iconoTipo="alerta" />   😖
 *     <Dialogo pie={<button>Cerrar</button>}>Contenido</Dialogo>                    🙂
 *
 * En el primero, `Dialogo` tiene que saber pintar TODAS las variantes posibles.
 * En el segundo, el que llama trae el JSX ya hecho y `Dialogo` solo decide DÓNDE
 * va. Menos props, menos condicionales dentro, y variantes infinitas gratis.
 *
 *
 * ▸ EJERCICIO — drills en escalera, del 1 al 10. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/09-react-props/exercise-05.test.tsx
 *     pnpm typecheck
 *
 * 📝 Trazado en .tsx = ejemplo de uso comentado con `//`.
 * ===========================================================================*/

import type { ReactNode } from 'react'


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 0 — CALENTAMIENTO: `children` a secas
 * ════════════════════════════════════════════════════════════════════════════
 * Repaso del 01/drill 8, para tener el gesto fresco antes de multiplicarlo.
 */

// 1) `Marco` — recibe `children` (ReactNode). Retorna un <article> con
//    `className="marco"` y el children dentro, tal cual llega.
//    <Marco><p>Hola</p></Marco>  →  <article class="marco"><p>Hola</p></article>
export function Marco({ children }: { children: ReactNode }) {
  return (
    <article className="marco">
      {children}
    </article>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 1 — `children` CONVIVIENDO con props normales
 * ════════════════════════════════════════════════════════════════════════════
 * `children` no desplaza a las demás props: viaja en el mismo objeto. Un dato
 * por atributo y el contenido por el medio, a la vez.
 */

// 2) `Tarjeta` — recibe `titulo` (string) y `children` (ReactNode). Retorna un
//    <section> que contenga, EN ESTE ORDEN: un <h3> con el título, y el children.
//    <Tarjeta titulo="Perfil"><p>Ana</p></Tarjeta>
//      →  <section><h3>Perfil</h3><p>Ana</p></section>
export function Tarjeta({ titulo, children }: { titulo: string, children: ReactNode }) {
  return (
    <section>
      <h3>{titulo}</h3>
      {children}
    </section>
  )
}

// 3) `CajaOpcional` — recibe `children` OPCIONAL (`children?: ReactNode`).
//    Si NO llega children, early return de un <p>Vacío</p>.
//    Si llega, retorna un <div> con el children dentro.
//    Sí: `children` también admite el `?`. No es una prop privilegiada.
//    <CajaOpcional />                       →  <p>Vacío</p>
//    <CajaOpcional><b>Hola</b></CajaOpcional> →  <div><b>Hola</b></div>
export function CajaOpcional({ children }: { children?: ReactNode }) {
  return (
    children ? <div>{children}</div> : <p>Vacío</p>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 2 — SLOTS NOMBRADOS: JSX que entra por una prop con nombre
 * ════════════════════════════════════════════════════════════════════════════
 * El salto del ejercicio. Se tipa EXACTAMENTE igual que `children` — `ReactNode`
 * — porque es lo mismo: una prop que lleva algo pintable. Lo único que cambia es
 * que la rellenas por nombre, con llaves, desde la etiqueta:
 *
 *     <Layout cabecera={<h1>Hola</h1>}> ... </Layout>
 *              └─ atributo normal, cuyo VALOR resulta ser JSX
 *
 * ⚠️ Ojo a las llaves: `cabecera={<h1>Hola</h1>}` son las llaves de "aquí va una
 *    expresión JS", las mismas de `total={3}`. No es sintaxis nueva.
 */

// 4) `Layout` — recibe `cabecera` (ReactNode) y `children` (ReactNode). Retorna
//    un <div> que contenga un <header> con la cabecera dentro, y un <main> con
//    el children dentro (en ese orden).
//    <Layout cabecera={<h1>Web</h1>}><p>Cuerpo</p></Layout>
//      →  <div><header><h1>Web</h1></header><main><p>Cuerpo</p></main></div>
export function Layout({ cabecera, children }: { cabecera: ReactNode, children: ReactNode }) {
  return (
    <div>
      <header>{cabecera}</header>
      <main>{children}</main>
    </div>
  )
}

// 5) `PanelDoble` — recibe `izquierda` y `derecha` (las dos ReactNode). NO usa
//    `children`: cuando hay DOS zonas simétricas, ninguna es "la del medio", así
//    que las dos llevan nombre. Retorna un <div> con dos <div> dentro:
//    el primero con `className="izq"` y la izquierda, el segundo con
//    `className="der"` y la derecha.
//    <PanelDoble izquierda={<p>A</p>} derecha={<p>B</p>} />
//      →  <div><div class="izq"><p>A</p></div><div class="der"><p>B</p></div></div>
export function PanelDoble({ izquierda, derecha }: { izquierda: ReactNode, derecha: ReactNode }) {
  return (
    <div>
      <div className="izq">{izquierda}</div>
      <div className="der">{derecha}</div>
    </div>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 3 — SLOT OPCIONAL (aquí se junta con el ejercicio 03)
 * ════════════════════════════════════════════════════════════════════════════
 * Un slot que puede no venir es una prop opcional más: `pie?: ReactNode`. Y para
 * decidir si se pinta su envoltorio, el `&&` del 03.
 *
 * ⚠️ Aquí SÍ vale `{pie && <footer>{pie}</footer>}` sin comparación, porque `pie`
 *    es ReactNode (JSX o undefined), no un número. La trampa del `0` del 03 solo
 *    aparece con NÚMEROS. Piensa por qué antes de escribirlo.
 */

// 6) `Dialogo` — recibe `titulo` (string), `children` (ReactNode) y `pie`
//    (ReactNode, OPCIONAL). Retorna un <section> con, EN ESTE ORDEN:
//      · un <h2> con el título
//      · el children
//      · SOLO si hay `pie`, un <footer> con el pie dentro
//    <Dialogo titulo="Aviso"><p>Texto</p></Dialogo>
//      →  <section><h2>Aviso</h2><p>Texto</p></section>
//    <Dialogo titulo="Aviso" pie={<button>Ok</button>}><p>Texto</p></Dialogo>
//      →  <section><h2>Aviso</h2><p>Texto</p><footer><button>Ok</button></footer></section>
export function Dialogo({ titulo, children, pie }: { titulo: string, children: ReactNode, pie?: ReactNode }) {
  return (
    <section>
      <h2>{titulo}</h2>
      {children}
      {pie && <footer>{pie}</footer>}
    </section>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 4 — ⚠️ EL ELEMENTO vs EL COMPONENTE (vuelve la CAFETERA)
 * ════════════════════════════════════════════════════════════════════════════
 * Hay DOS cosas que puedes pasar por una prop, y NO son la misma:
 *
 *     <Estrella />   ← un ELEMENTO. Ya está construido. Es el resultado.
 *                      Tipo: `ReactNode`.       Se pinta con `{icono}`.
 *
 *     Estrella       ← el COMPONENTE. Es la función, sin llamar todavía.
 *                      Tipo: `() => ReactNode`. Se pinta con `<Icono />`.
 *
 * Es EXACTAMENTE la cafetera del 01/drill 9 (`onClick={onAccion}` vs
 * `onClick={onAccion()}`), en su otra cara: los `<... />` son el gatillo. Con
 * ellos construyes tú; sin ellos entregas la receta y construye React.
 *
 * 💥 Y si los confundes, ¿quién te avisa? Las DOS capas, cada una a su manera:
 *      · TS, al escribir: `ReactElement` no encaja en `() => ReactNode`.
 *      · React, en runtime, con este error literal (apúntalo, lo verás en la vida
 *        real): "Element type is invalid: expected a string (for built-in
 *        components) or a class/function (for composite components) but got:
 *        <Estrella />". Traducido: "te pedí la receta y me diste el plato".
 *
 * ⚠️ TRAMPA DE NOMBRADO: para usar una prop como etiqueta JSX, su nombre TIENE
 *    que empezar por MAYÚSCULA. `<Icono />` es "llama al componente que hay en la
 *    variable `Icono`"; `<icono />` sería una etiqueta HTML literal llamada
 *    "icono" (que no existe). Por eso el drill 8 llama a la prop `Icono` y no
 *    `icono` — no es capricho de estilo, cambia el significado.
 */

// Componente auxiliar YA ESCRITO, para que los drills 7 y 8 tengan algo que pasarse.
export function Estrella() {
  return <span>★</span>
}

// 7) `ConIcono` — recibe `icono` (ReactNode: un elemento YA construido) y `texto`
//    (string). Retorna un <p> con el icono primero y el texto después.
//    <ConIcono icono={<Estrella />} texto="Favorito" />  →  <p><span>★</span>Favorito</p>
//                     └─ fíjate: aquí SÍ hay `<... />`, lo construye quien llama
export function ConIcono({ icono, texto }: { icono: ReactNode, texto: string }) {
  return (
    <p>
      {icono}
      {texto}
    </p>
  )
}

// 8) `ConIconoFn` — recibe `Icono` (una FUNCIÓN sin argumentos que retorna
//    ReactNode) y `texto` (string). Retorna un <p> con el icono primero y el
//    texto después — pero aquí lo construyes TÚ dentro, con `<Icono />`.
//    <ConIconoFn Icono={Estrella} texto="Favorito" />  →  <p><span>★</span>Favorito</p>
//                        └─ sin `<... />`: entregas la función, no el resultado
export function ConIconoFn({ Icono, texto }: { Icono: () => ReactNode, texto: string }) {
  return (
    <p>
      <Icono />
      {texto}
    </p>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 5 — CAPSTONE: una página con tres slots, dos de ellos opcionales
 * ════════════════════════════════════════════════════════════════════════════
 * Sin concepto nuevo: slots nombrados + `children` + opcionales + `&&`. Es el
 * esqueleto de layout que vas a escribir en proyectos reales.
 */

// 9) Define el tipo `PaginaProps` y expórtalo (el test lo importa). Debe tener:
//      · `titulo`   string, obligatoria
//      · `cabecera` ReactNode, OPCIONAL
//      · `children` ReactNode, obligatoria
//      · `pie`      ReactNode, OPCIONAL
export type PaginaProps = {
  titulo: string
  cabecera?: ReactNode
  children: ReactNode
  pie?: ReactNode
}

// 10) `Pagina` — usa `PaginaProps`. Retorna un <div> que contenga, EN ESTE ORDEN:
//       · SOLO si hay `cabecera`, un <header> con ella dentro
//       · siempre, un <h1> con el `titulo`
//       · siempre, un <main> con el `children` dentro
//       · SOLO si hay `pie`, un <footer> con él dentro
//     <Pagina titulo="Inicio"><p>Hola</p></Pagina>
//       →  <div><h1>Inicio</h1><main><p>Hola</p></main></div>
//     <Pagina titulo="Inicio" cabecera={<nav>Menú</nav>} pie={<small>©</small>}>
//       <p>Hola</p>
//     </Pagina>
//       →  <div><header><nav>Menú</nav></header><h1>Inicio</h1>
//           <main><p>Hola</p></main><footer><small>©</small></footer></div>
export function Pagina({ titulo, cabecera, children, pie }: PaginaProps) {
  return (
    <div>
      {cabecera && <header>{cabecera}</header>}
      <h1>{titulo}</h1>
      <main>{children}</main>
      {pie && <footer>{pie}</footer>}
    </div>
  )
}
