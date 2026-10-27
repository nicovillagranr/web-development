/* =============================================================================
 * EJERCICIO 07 — no reescribir el DOM: ComponentProps y el rest {...resto} · bloque 09
 *
 * 📌 RECORDATORIO — Pick<Usuario, 'id' | 'nombre'> se queda con esas claves, Omit
 * las quita, Partial las vuelve opcionales y Usuario['email'] saca el tipo de una.
 * Omit no avisa si escribes mal la clave (compila y no quita nada); Pick sí protesta.
 *
 * 🎯 OBJETIVOS
 * · Partir las props en «lo mío» y «lo que reenvío» con el rest, y derramarlo.
 * · Derivar las props de un componente de las de una etiqueta con ComponentProps.
 * · Decidir el orden del derrame, y prohibir o estrechar props nativas con Omit.
 *
 * 🟢 CONTEXTO — en el 06 las props se derivaban de una fuente de la verdad que
 * escribiste tú, Articulo. Aquí la fuente es otra, y no la escribiste tú: el propio
 * HTML. Un <button> nativo acepta onClick, disabled, type, id, className, title… y
 * cientos de aria-* y data-*. Con type BotonProps = { texto: string } tu botón
 * acepta una cosa; el día que alguien necesita disabled lo añades, luego aria-label,
 * luego type="submit", y acabas reescribiendo a mano, peor y desactualizada, la
 * lista que React ya tiene escrita.
 *
 * 🗺️ MAPA
 * TEORÍA 0 · el rest en objetos, sin React → drill 1
 * TEORÍA 1 · derramar el rest sobre una etiqueta JSX → drill 2
 * TEORÍA 2 · ComponentProps: la ficha técnica que ya existe → drills 3–4
 * ESCALERA P · el cuerpo del drill 3 → P1–P3, entre el tipo y el cuerpo del 3
 * TEORÍA 3 · el orden del derrame decide quién gana → drill 5
 * TEORÍA 4 · Omit sobre props nativas: prohibir y estrechar → drills 6–7
 * CAPSTONE · la funda completa → drills 8–10
 *
 * ▸ 10 drills + 3 peldaños, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/09-react-props/exercise-07.test.tsx
 * pnpm typecheck
 *
 * 📝 El trazado en .tsx es un ejemplo de uso comentado con //.
 * ============================================================================= */

import type { ComponentProps, ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 0 — el rest en objetos, sin React de por medio
 *
 * DEFINICIÓN
 * Tipar que aceptas 300 props no sirve de nada si luego no las pasas al elemento,
 * y no vas a escribirlas una a una. Para eso está el rest, que ya usaste en
 * 04-objetos: ...resto recoge «todo lo que no nombré» en un objeto nuevo. Antes de
 * derramar props sobre una etiqueta, el gesto en JS puro.
 *
 * SINTAXIS
 * const { id, ...resto } = obj // id sale suelto; resto se lleva todo lo demás
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) partirUsuario — recibe un objeto con id (number), nombre (string) y
 * activo (boolean). Retorna un objeto con dos claves:
 *   · id    el id suelto
 *   · resto todo lo demás, en un objeto
 * Hazlo con desestructuración + rest; no construyas nada a mano.
 * ⚠️ Anota el tipo de retorno (está escrito abajo, en la firma).
 * 💡 Esto es exactamente lo que hace { variante, ...resto } en un
 *    componente: partir las props en "lo mío" y "lo que reenvío".
 * partirUsuario({ id: 1, nombre: 'Ana', activo: true })
 *   →  { id: 1, resto: { nombre: 'Ana', activo: true } }
 */
export function partirUsuario(obj: { id: number; nombre: string; activo: boolean }): {
  id: number;
  resto: { nombre: string; activo: boolean };
} {
  const { id, ...resto } = obj;
  return { id, resto };
}
partirUsuario({ id: 1, nombre: "Ana", activo: true }); // →  { id: 1, resto: { nombre: 'Ana', activo: true } }

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — derramar el rest sobre una etiqueta JSX
 *
 * DEFINICIÓN
 * Mismo rest, nuevo destino. <div {...resto} /> significa «pon como atributos todas
 * las claves que haya en resto». Si resto vale { id: 'c1' }, sale <div id="c1">.
 * No hay sintaxis nueva: { variante, ...resto } es el mismo gesto que
 * const { id, ...resto } = obj, solo que el objeto que desestructuras son las props
 * y el sitio donde lo derramas es una etiqueta.
 *
 * SINTAXIS
 * function Boton({ variante, ...resto }: BotonProps) {
 *   return <button {...resto} />
 * }
 * variante    → la tuya: sale suelta
 * ...resto    → todo lo demás, en un objeto, sin nombrarlo
 * {...resto}  → ese objeto, derramado entero sobre el elemento
 * ───────────────────────────────────────────────────────────────────────────── */

/* 2) Caja — recibe titulo (string), id (string) y className (string).
 * Saca solo el titulo por desestructuración y deja el resto en ...resto.
 * Retorna un <div> con el resto derramado encima, que contenga un <h3> con
 * el título.
 * ⚠️ Fíjate en lo que no haces: no escribes id={id} className={className}.
 * <Caja titulo="Hola" id="c1" className="caja" />
 *   →  <div id="c1" class="caja"><h3>Hola</h3></div>
 */
/* ✍️ EJEMPLO GUIADO — resuelto por el coach a petición tuya («resuélvelo tú, para entender»).
 * El gesto se practica solo, a partir del drill 3. */
export function Caja({ titulo, ...resto }: { titulo: string; id: string; className: string }) {
  return (
    // Dentro de esta etiqueta div, derrama el rest. Significa que puedes poner:
    // className="caja"
    // id="c1"
    // aria-label="caja"
    // Todo lo que quieras
    <div {...resto}>
      <h3>{titulo}</h3>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — ComponentProps<'etiqueta'>: la ficha técnica que ya existe
 *
 * DEFINICIÓN
 * ComponentProps es un tipo genérico, como Pick o Array: entre <…> le dices de qué
 * etiqueta quieres las props, y te devuelve el tipo entero. Es un tipo derivado,
 * igual que el Pick del 06; solo cambia el dueño de la fuente: antes tu dominio,
 * ahora React.
 *
 * SINTAXIS
 * import type { ComponentProps } from 'react'
 * ComponentProps<'button'> → el tipo exacto de props que acepta <button>
 *
 * Ejemplos:
 * ComponentProps<'input'>   ComponentProps<'a'>   ComponentProps<'div'>
 *
 * ⚠️ La etiqueta va entre comillas: es un tipo literal string ('button'), el mismo
 * tipo de dato que las uniones "info" | "alerta" del exercise-01.
 *
 * 💡 No es magia: Ctrl-clic (F12) sobre ComponentProps y acabas en el .d.ts de
 * @types/react, igual que hiciste con ReactNode en el 01.
 *
 * 🧠 ANALOGÍA — la funda del móvil. Tu componente envuelve un elemento nativo: le
 * añades lo tuyo (color, agarre), pero no rediseñas el teléfono; le haces agujeros
 * para que los botones y el puerto de carga sigan accesibles. ComponentProps es la
 * ficha técnica del teléfono; {...resto} son los agujeros.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 3) Define el tipo PropsDeBoton como las props nativas de <button> y
 * expórtalo. Una línea.
 */
export type PropsDeBoton = ComponentProps<"button">;

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ESCALERA P — refuerzo del cuerpo del drill 3 (montada 23 jul 2026)
 *
 * El tipo del drill 3 lo acertaste. Lo que se atascó fue el cuerpo, y siempre en el
 * mismo punto: de dónde sale el objeto que se derrama. Lo buscaste llamando a
 * partirUsuario y lo buscaste fabricando un const props = {}. Está en el paréntesis:
 * React ya te lo entrega, solo hay que ponerle nombre.
 *
 * Tres peldaños. Cada uno aísla una pieza, y el tercero las junta. Resuélvelos en
 * orden; cuando el P3 te salga, el cuerpo del drill 3 es el mismo gesto.
 * ───────────────────────────────────────────────────────────────────────────── */

/* P1) El parámetro con nombre — sin derrame todavía.
 * TituloSimple — recibe sus props con un nombre, p. No desestructures:
 * nada de { texto }, quieres el objeto entero bajo un solo nombre.
 * Retorna un <h1> con el texto dentro.
 * 💡 Dentro del cuerpo llegas al dato con p.texto, con punto, como en
 *    cualquier objeto de FASE 1. Un objeto de props no tiene nada especial.
 * <TituloSimple texto="Hola" />  →  <h1>Hola</h1>
 */
export function TituloSimple(p: { texto: string }) {
  return <h1>{p.texto}</h1>;
}

/* P2) El derrame — sobre un objeto que ya existe, sin parámetros de por medio.
 * ATRIBUTOS está escrito abajo y no se toca.
 * CajaConAtributos — no recibe nada. Retorna un <div> con ATRIBUTOS
 * derramado encima y el texto "fija" dentro.
 * 💡 El derrame se aplica al nombre de un objeto que ya tiene contenido.
 *    Si el objeto está vacío, no escribe ningún atributo (eso fue lo que te
 *    pasó con const props: PropsDeBoton = {}).
 * <CajaConAtributos />  →  <div id="x1" class="fija">fija</div>
 */
const ATRIBUTOS = { id: "x1", className: "fija" };

export function CajaConAtributos() {
  return <div {...ATRIBUTOS}>fija</div>;
}

/* P3) Los dos juntos — el gesto completo, sobre otro elemento.
 * EntradaPasarela — recibe las props nativas de <input> con un nombre
 * (como en P1) y las derrama enteras sobre un <input /> (como en P2).
 * No saca ninguna prop suelta, no declara ninguna a mano, y en el cuerpo no
 * hay ni un valor escrito por ti: todo lo que sale, entró.
 * ⚠️ Un <input> no lleva contenido: se escribe autocerrado, <input ... />.
 * <EntradaPasarela type="email" placeholder="Correo" disabled />
 *   →  <input type="email" placeholder="Correo" disabled>
 */
export function EntradaPasarela(entradas: ComponentProps<"input">) {
  return <input {...entradas} />;
}

/* BotonPasarela — usa PropsDeBoton. No añade nada: recibe las props
 * enteras y las derrama tal cual sobre un <button>. Es la funda transparente.
 * Aquí no hace falta rest: no sacas ninguna prop, se derrama el objeto entero.
 * <BotonPasarela type="submit" disabled aria-label="Enviar">Ok</BotonPasarela>
 *   →  <button type="submit" disabled aria-label="Enviar">Ok</button>
 */
export function BotonPasarela(entradas: PropsDeBoton) {
  return <button {...entradas}></button>;
}

/* 4) Define la interface BotonProps que extienda las props nativas de
 * <button> y añada:
 *   · variante con el tipo 'primario' | 'secundario'
 * Expórtala. (Es el extends del 06, con otra base.)
 */
export interface BotonProps extends ComponentProps<"button"> {
  variante: "primario" | "secundario";
}

/* Boton — usa BotonProps. Saca variante y deja el resto en ...resto.
 * Retorna un <button> con className = la variante y el resto derramado.
 * 💡 children viaja dentro de resto (es una prop más, como aprendiste en
 *    el 05), así que el <button> puede escribirse autocerrado: <button ... />.
 * <Boton variante="primario" disabled>Ok</Boton>
 *   →  <button class="primario" disabled>Ok</button>
 */
export function Boton({ variante, ...resto }: BotonProps) {
  return <button className={variante} {...resto}></button>;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — el orden del derrame decide quién gana
 *
 * DEFINICIÓN
 * No es un truco de React: es la regla de los objetos de 04-objetos. En un derrame,
 * el que se escribe después pisa al de antes.
 *
 * Ejemplos:
 * <button className="mio" {...resto} /> → si resto trae className, gana resto
 * <button {...resto} className="mio" /> → gana lo tuyo, siempre
 *
 * Ninguno es «el correcto»: son dos decisiones distintas, y hay que tomarla a
 * conciencia. ¿Quieres que quien te llame pueda personalizar? Derrama al final.
 * ¿Hay un valor tuyo innegociable (seguridad, accesibilidad)? Derrama primero.
 *
 * 🧠 ANALOGÍA — pintar una pared: el último brochazo es el que se ve.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 5) Dos componentes gemelos, idénticos salvo el orden. Los dos reciben
 * ComponentProps<'div'> y ponen un className propio con el valor "mio".
 *
 * · CajaFija    — el className "mio" gana aunque quien llame mande otro.
 * · CajaAbierta — el className de quien llama pisa al "mio".
 *
 * <CajaFija className="ajena" />     →  <div class="mio">
 * <CajaAbierta className="ajena" />  →  <div class="ajena">
 */

// export type PropsDeBoton = ComponentProps<'button'>
export type PropsDeDiv = ComponentProps<"div">;

export function CajaFija(atributos: PropsDeDiv) {
  return <div {...atributos} className="mio"></div>;
}

export function CajaAbierta(atributos: PropsDeDiv) {
  return <div className="mio" {...atributos}></div>;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 4 — Omit sobre props nativas: prohibir y estrechar
 *
 * DEFINICIÓN
 * Heredar las props nativas te da todas, incluidas las que no quieres regalar. Omit,
 * el del 06, sirve aquí para dos cosas distintas.
 *
 * Ejemplos:
 * a) Prohibir una prop: quien te llame ya no puede tocar el type, lo decides tú.
 *    Omit<ComponentProps<'input'>, 'type'>
 * b) Estrecharla: quitarla y volver a declararla con un tipo más estricto. En un <a>
 *    nativo href es opcional; en el tuyo, obligatorio.
 *    interface P extends Omit<ComponentProps<'a'>, 'href'> { href: string }
 *
 * ⚠️ La trampa del 06 sigue en pie: si escribes mal la clave en el Omit, TS calla.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 6) Define la interface EntradaProps que extienda las props nativas de
 * <input> pero sin 'type', y añada:
 *   · etiqueta string
 * Expórtala.
 */
export interface EntradaProps extends Omit<ComponentProps<"input">, "type"> {
  etiqueta: string;
}

/* Entrada — usa EntradaProps. Saca etiqueta, deja el resto. Retorna un
 * <label> que contenga el texto de la etiqueta y, después, un <input> con
 * type="text" fijo (nadie puede cambiarlo) y el resto derramado.
 * <Entrada etiqueta="Nombre" placeholder="Ana" />
 *   →  <label>Nombre<input type="text" placeholder="Ana"></label>
 */
export function Entrada({ etiqueta, ...resto }: EntradaProps) {
  return (
    <label>
      {etiqueta}
      <input type="text" {...resto} />
    </label>
  );
}

/* 7) Define la interface BotonAccionProps que extienda las props nativas de
 * <button> pero sin 'onClick', y vuelva a declarar:
 *   · onClick como una función sin argumentos que no devuelve nada
 * Expórtala.
 * 💡 Por qué: el onClick nativo entrega un evento del DOM a tu función. Con
 *    este estrechamiento dices "aquí el callback no recibe nada". Los tipos
 *    de eventos del DOM se trabajan en la carpeta 10; esto es el aperitivo.
 */

// Se extienden las propiedades de la etiqueta HTML Button, y luego se omite la propiedad "onClick"
// Dentro de este interface se vuelve a declarar a mano la propiedad "onClick" que es una función que no devuelve nada

export interface BotonAccionProps extends Omit<ComponentProps<"button">, "onClick"> {
  onClick: () => void;
}

/* BotonAccion — usa BotonAccionProps. Derrama todo sobre un <button>.
 * ⚠️ Cafetera (01/drill 9): se entrega, no se ejecuta.
 * <BotonAccion onClick={guardar}>Guardar</BotonAccion>
 */
export function BotonAccion({ onClick, ...resto }: BotonAccionProps) {
  return <button onClick={onClick} {...resto}></button>;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ CAPSTONE — la funda completa
 *
 * Sin concepto nuevo: derivar del DOM + Omit + rest + slot del 05 + orden del
 * derrame decidido a conciencia. Es, literalmente, cómo se escribe un botón en una
 * librería de componentes real.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 8) Define la interface EnlaceSeguroProps que extienda las props nativas de
 * <a> sin 'href', 'target' ni 'rel', y añada:
 *   · href string, obligatoria
 * Expórtala. (En un <a> nativo las cuatro son opcionales; aquí href deja
 * de serlo, y target/rel desaparecen porque los fija el componente.)
 */
export interface EnlaceSeguroProps extends Omit<ComponentProps<"a">, "href" | "target" | "rel"> {
  href: string;
}

/* 9) EnlaceSeguro — usa EnlaceSeguroProps. Retorna un <a> con el resto
 * derramado y, innegociables (nadie puede pisarlos), target="_blank" y
 * rel="noopener noreferrer".
 * ⚠️ Piensa el orden del derrame antes de escribirlo: ¿quién debe ganar?
 * <EnlaceSeguro href="/a" className="link">Ir</EnlaceSeguro>
 *   →  <a href="/a" class="link" target="_blank" rel="noopener noreferrer">Ir</a>
 */
export function EnlaceSeguro({ href, ...resto }: EnlaceSeguroProps) {
  return <a target="_blank" rel="noopener noreferrer" href={href} {...resto}></a>;
}

/* 10) Define la interface BotonIconoProps que extienda las props nativas de
 * <button> y añada:
 *   · icono    ReactNode, obligatoria  ← el slot del 05
 *   · variante 'primario' | 'secundario', opcional
 * Expórtala.
 */
export interface BotonIconoProps extends ComponentProps<"button"> {
  icono: ReactNode;
  variante?: "primario" | "secundario";
}

/* BotonIcono — usa BotonIconoProps. Saca icono, variante, children
 * y deja lo demás en ...resto. Retorna un <button> con:
 *   · className = la variante, o "primario" si no llegó (el ?? del 02)
 *   · el resto derramado, de forma que quien llame no pueda pisar el
 *     className que acabas de calcular
 *   · dentro: un <span> con className="icono" que contenga el icono, y
 *     después el children
 * <BotonIcono icono={<b>★</b>} disabled>Guardar</BotonIcono>
 *   →  <button class="primario" disabled><span class="icono"><b>★</b></span>Guardar</button>
 */
export function BotonIcono({ icono, variante, children, ...resto }: BotonIconoProps) {
  return (
    <button {...resto} className={variante ?? "primario"}>
      <span className="icono">{icono}</span>
      {children}
    </button>
  );
}
