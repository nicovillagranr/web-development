/* =============================================================================
 * EJERCICIO 01 — un componente es una función que recibe un objeto · bloque 09
 *
 * 📌 RECORDATORIO — recortar tipos en vez de copiarlos, con
 * type Usuario = { id: number; nombre: string; email: string; activo: boolean }:
 * Pick<Usuario, 'id' | 'nombre'> → { id: number; nombre: string }: quédate con estas.
 * Omit<Usuario, 'email'>         → { id, nombre, activo }: quita estas.
 * Partial<Usuario>               → { id?, nombre?, email?, activo? }: todas opcionales.
 * Usuario['email']               → string: el tipo de una propiedad, suelto.
 * La misma idea en el HTML: ComponentProps<'span'> son las props nativas de un
 * <span>, y en function X({ mia, ...resto }), resto es lo que va al DOM. Las claves
 * van entre comillas y se separan con |. Omit no avisa si escribes mal la clave
 * (Omit<Usuario, 'emial'> compila y no quita nada); Pick sí protesta.
 *
 * 🎯 OBJETIVOS
 * · Tipar las props de un componente como el parámetro-objeto que son.
 * · Desestructurar las props en la firma y darle nombre a su tipo.
 * · Tipar las props especiales: un array del dominio, children y una función.
 *
 * 🟢 CONTEXTO — <Saludo nombre="Nico" edad={30} /> no le pasa dos cosas a Saludo:
 * le pasa una sola, Saludo({ nombre: "Nico", edad: 30 }). Un componente es una
 * función normal con un parámetro objeto, así que tipar props no es nada nuevo: es
 * lo que hiciste en 04-objetos con Producto, Empleado o Item. Cambia el envoltorio
 * (JSX), no la idea.
 *
 * 🗺️ MAPA
 * TEORÍA 0 · un componente es una función que retorna JSX → drill 1
 * TEORÍA 1 · una prop: tipar el parámetro-objeto → drills 2–3
 * TEORÍA 2 · desestructurar el parámetro → drill 4
 * TEORÍA 3 · varias props, una opcional, y el tipo con nombre → drills 5–6
 * TEORÍA 4 · una prop que es un array de objetos → drill 7
 * TEORÍA 5 · children → drill 8
 * TEORÍA 6 · una prop que es una función → drill 9
 * CAPSTONE · las tres clases de prop en un solo componente → drill 10
 *
 * ▸ 10 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/09-react-props/exercise-01.test.tsx
 * pnpm typecheck
 * ============================================================================= */

import type { ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 0 — un componente es una función que retorna JSX
 *
 * DEFINICIÓN
 * React empaqueta todo lo que escribes en la etiqueta dentro de un objeto y se lo
 * entrega al componente como su único parámetro. El componente retorna JSX: no
 * imprime ni pinta nada, devuelve una descripción, y es React quien la pinta
 * después en el DOM. Es un return normal y corriente, como los de la FASE 1.
 *
 * SINTAXIS
 * <Saludo nombre="Nico" edad={30} /> // lo que escribes
 * Saludo({ nombre: "Nico", edad: 30 }) // lo que hace React con ello
 *
 * 🧠 ANALOGÍA — el componente es una cafetera. Las props son la cápsula que le
 * metes, el JSX es la ranura, y TypeScript es la etiqueta que dice qué cápsulas
 * encajan: si metes una de otro formato, te frena antes de encender la máquina, no
 * espera a que salga el café malo.
 *
 * 🗣️ LAS PIEZAS — sobre <Saludo nombre="Nico" /> y function Saludo(props: { nombre: string }):
 * nombre="Nico"      → en el JSX se escribe como atributo; lo que viaja es una prop.
 * props              → el parámetro: el hueco declarado en la función.
 * { nombre: "Nico" } → el argumento: el valor real que llega en la llamada.
 * nombre             → una propiedad de ese objeto.
 * Parámetro es el hueco; argumento, lo que metes en él. Atributo es cómo lo
 * escribes; prop, qué recibe el componente. Esto se pregunta en entrevistas.
 *
 * ⚠️ TRAMPA — dos cosas nuevas que van a molestar:
 * 1. JSX sin cerrar. <p> sin su </p> rompe el parseo del archivo entero, el mismo
 *    efecto que aquel => ) del 01-tipos-basicos/exercise-05. Si de repente todo
 *    está rojo, busca una etiqueta sin cerrar antes de dudar de tu lógica.
 * 2. TS y React son dos capas. TS vigila que las props encajen antes de ejecutar;
 *    React pinta en runtime. Un test puede fallar con los tipos perfectos (lógica
 *    mal) y los tipos pueden fallar con el test verde: el listón sigue siendo
 *    runtime + typecheck, como en toda la FASE 1.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) Hola — un componente sin props que retorna un párrafo con el texto "Hola".
 * Ojo: sin props significa que la función no declara ningún parámetro.
 * <Hola />  →  <p>Hola</p>
 */
export function Hola() {
  return <p>Hola</p>;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — una prop: tipar el parámetro-objeto
 *
 * DEFINICIÓN
 * Aquí es donde tipas. El parámetro se llama props por convención, y su tipo es un
 * objeto literal, igual que cualquier parámetro de 04-objetos.
 *
 * SINTAXIS
 * function Saludo(props: { nombre: string }) {
 *   return <p>Hola, {props.nombre}</p>
 * }
 *
 * ⚠️ TRAMPA — las llaves { } dentro del JSX son otra cosa distinta: la ventanita
 * para meter una expresión de JavaScript en medio del marcado. {props.nombre} dice
 * «aquí va el valor de esa propiedad», no «aquí va un objeto».
 * ───────────────────────────────────────────────────────────────────────────── */

/* 2) Saludo — recibe la prop nombre (string) y retorna un párrafo que dice
 * exactamente "Hola, " + el nombre.
 * <Saludo nombre="Nico" />  →  <p>Hola, Nico</p>
 */
export function Saludo(props: { nombre: string }) {
  return <p>Hola, {props.nombre}</p>;
}

/* 3) Contador — recibe la prop total (number) y retorna un <span> con el
 * texto "Total: " + el número. Mismo patrón que el 2, pero el tipo de la
 * propiedad cambia: aquí no es string.
 * <Contador total={3} />  →  <span>Total: 3</span>
 */
export function Contador(props: { total: number }) {
  return <span>Total: {props.total}</span>;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — desestructurar el parámetro
 *
 * DEFINICIÓN
 * Escribir props.esto y props.aquello todo el rato cansa. Lo habitual en React real
 * es abrir el objeto en la propia firma: mismo tipo, otra sintaxis.
 *
 * SINTAXIS
 * function Saludo({ nombre }: { nombre: string }) { ... }
 *
 * 🗣️ LAS PIEZAS
 * { nombre }         → a la izquierda de los dos puntos: qué sacas.
 * { nombre: string } → a la derecha: de qué tipo es el objeto.
 *
 * ⚠️ TRAMPA — es el mismo lío del = del 01-tipos-basicos/exercise-07, en otra
 * postura: a la izquierda van los nombres que extraes (valores); a la derecha, el
 * tipo del objeto completo, no el de una propiedad suelta. El tipo siempre describe
 * el objeto entero, desestructures o no.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) Precio — recibe la prop euros (number) y retorna un <b> con el número
 * seguido de " €" (espacio antes del símbolo). Desestructura en la firma:
 * dentro del cuerpo debes poder escribir euros, no props.euros.
 * <Precio euros={12} />  →  <b>12 €</b>
 */
export function Precio({ euros }: { euros: number }) {
  return <b>{euros} €</b>;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — varias props, una opcional, y el tipo con nombre
 *
 * DEFINICIÓN
 * Cuando el objeto de props crece, se le pone nombre, igual que hiciste con
 * interface Empleado. Convención universal en React: <Componente>Props.
 *
 * SINTAXIS
 * type BotonProps = { texto: string; deshabilitado?: boolean }
 *
 * 🗣️ LAS PIEZAS
 * BotonProps → el nombre del tipo de las props.
 * ?          → «se puede omitir».
 *
 * ⚠️ TRAMPA — en el JSX, <Boton texto="Ok" /> es legal, y dentro del componente
 * deshabilitado valdrá undefined: su tipo real en el cuerpo es boolean | undefined,
 * y toca guard (??) como en 04-objetos.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 5) Define el tipo BotonProps con:
 *   · texto         string, obligatoria
 *   · deshabilitado boolean, opcional
 * Exporta el tipo (el test lo importa).
 */
export type BotonProps = { texto: string; deshabilitado?: boolean };

/* Boton — retorna un <button> con texto dentro. El atributo disabled del
 * botón debe valer lo que llegue en deshabilitado, y false si no llegó
 * (recuerda ??, del 04-objetos).
 * <Boton texto="Enviar" />                      →  <button>Enviar</button>  (habilitado)
 * <Boton texto="Enviar" deshabilitado={true} /> →  <button disabled>Enviar</button>
 */
export function Boton({ texto, deshabilitado }: BotonProps) {
  return <button disabled={deshabilitado ?? false}>{texto}</button>;
}

/* 6) Insignia — recibe texto (string) y variante, que solo puede ser
 * "info" o "alerta" (unión de literales, del 01-tipos-basicos/exercise-08).
 * Retorna un <span> con el texto dentro y el className igual a la variante.
 * Aquí se ve la ganancia real de TS en React: <Insignia variante="rojo" />
 * ni siquiera compila. El error se caza escribiendo, no en producción.
 * <Insignia texto="Nuevo" variante="info" />  →  <span class="info">Nuevo</span>
 */
export function Insignia({ texto, variante }: { texto: string; variante: "info" | "alerta" }) {
  return <span className={variante}>{texto}</span>;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 4 — una prop que es un array de objetos del dominio
 *
 * DEFINICIÓN
 * Nada nuevo de tipos: Usuario[] es el mismo array de objetos de 04-objetos, solo
 * que ahora entra por una prop. Lo único propio de React es el key del .map.
 *
 * 🗣️ LAS PIEZAS
 * Usuario[] → el array de objetos, tipado como siempre.
 * key       → lo que React pide para identificar cada elemento de la lista entre
 *             repintados.
 *
 * ⚠️ TRAMPA — key no es una prop tuya: no llega al componente hijo, y no va tipado
 * por ti. Es un canal interno de React.
 * ───────────────────────────────────────────────────────────────────────────── */

export type Usuario = { id: number; nombre: string };

/* 7) ListaUsuarios — recibe la prop usuarios (un array de Usuario) y
 * retorna un <ul> con un <li> por cada usuario, mostrando su nombre.
 * Cada <li> lleva key={usuario.id}.
 * Es tu .map de siempre, pero devolviendo JSX en vez de strings.
 * <ListaUsuarios usuarios={[{ id: 1, nombre: "Ana" }, { id: 2, nombre: "Leo" }]} />
 *   →  <ul><li>Ana</li><li>Leo</li></ul>
 */
export function ListaUsuarios({ usuarios }: { usuarios: Usuario[] }) {
  return (
    <ul>
      {usuarios.map((usuario) => (
        <li key={usuario.id}>{usuario.nombre}</li>
      ))}
    </ul>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 5 — children: lo que va entre las etiquetas también es una prop
 *
 * DEFINICIÓN
 * Un componente también puede recibir lo que pongas entre su apertura y su cierre,
 * y React se lo entrega como una prop más, llamada children. No hay magia:
 * <Caja>algo</Caja> equivale a Caja({ children: "algo" }). Es el mismo objeto de
 * props de siempre; esta propiedad se rellena por la posición en el JSX en vez de
 * por su nombre.
 *
 * SINTAXIS
 * <Caja>
 *   <p>Hola</p> // esto de aquí en medio es children
 * </Caja>
 *
 * 🧠 ANALOGÍA — los atributos son lo que escribes en la etiqueta pegada al paquete
 * (destinatario, peso, frágil); children es lo que va dentro. Dos formas de mandar
 * cosas, mismo camión, y las dos acaban en el mismo objeto de props al llegar.
 *
 * 🗣️ LAS PIEZAS
 * children  → lo que va entre las etiquetas.
 * ReactNode → su tipo: cualquier cosa que React sepa pintar (JSX, texto, números,
 *             listas de esas cosas, null…). Se importa de react: mira el import
 *             del principio del archivo.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 8) Caja — recibe children y lo retorna envuelto en un <div> con
 * className="caja". El contenido va dentro del div, tal cual llega.
 * <Caja><p>Hola</p></Caja>  →  <div class="caja"><p>Hola</p></div>
 */
export function Caja({ children }: { children: ReactNode }) {
  return <div className="caja">{children}</div>;
}
// <Caja><p>Hola</p></Caja>  →  <div class="caja"><p>Hola</p></div>

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 6 — una prop puede ser una función
 *
 * DEFINICIÓN
 * Si una prop puede ser un string, un number o un array, también puede ser una
 * función. Se tipa igual que cualquier otra, con la firma de la función.
 *
 * SINTAXIS
 * { onAccion: () => void }
 *
 * 🗣️ LAS PIEZAS
 * onAccion → convención de React: las props-función se llaman onAlgo.
 * ()       → no recibe argumentos.
 * void     → no devuelve nada útil.
 *
 * ⚠️ TRAMPA — vuelve la cafetera del 02-funciones/exercise-06: entregar no es
 * ejecutar.
 * onClick={onAccion} // ✅ entregas la función: React la dispara él al hacer clic
 * onClick={onAccion()} // ❌ la ejecutas tú, ahora mismo, mientras se pinta
 * Con los paréntesis, React recibe el resultado (aquí undefined), no la función, y
 * el clic no hará nada. Los paréntesis son el gatillo: sin ellos entregas el arma
 * cargada; con ellos, disparas tú y le pasas a React el casquillo.
 *
 * 💡 Esto va de tipar una prop-función. Los tipos de los eventos del DOM
 * (React.ChangeEvent<HTMLInputElement> y compañía) son el tema de
 * 10-eventos-formularios. Aquí el callback no recibe nada.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 9) BotonAccion — recibe etiqueta (string) y onAccion (una función que no
 * recibe argumentos ni devuelve nada). Retorna un <button> con la etiqueta
 * como contenido, que al hacer clic ejecute onAccion.
 * <BotonAccion etiqueta="Borrar" onAccion={avisar} />  →  <button>Borrar</button>
 *                                                         (al clic, corre avisar)
 */
export function BotonAccion({ etiqueta, onAccion }: { etiqueta: string; onAccion: () => void }) {
  return <button onClick={onAccion}>{etiqueta}</button>;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ CAPSTONE — las tres clases de prop en un solo componente
 *
 * Sin concepto nuevo. Es la demostración de la tesis del ejercicio: un dato, un
 * contenido y una función conviven en el mismo objeto de props, y se tipan los
 * tres exactamente igual. Nada es especial.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 10) Define el tipo PanelProps con:
 *   · titulo   string
 *   · children el contenido (ReactNode)
 *   · onCerrar una función sin argumentos que no devuelve nada
 * Expórtalo (el test lo importa).
 */
export type PanelProps = { titulo: string; children: ReactNode; onCerrar: () => void };

/* Panel — retorna un <section> que contenga, en este orden:
 *   1. un <h2> con el título
 *   2. un <button> con el texto "Cerrar" que al clic ejecute onCerrar
 *   3. el children
 * <Panel titulo="Ajustes" onCerrar={cerrar}><p>Contenido</p></Panel>
 *   →  <section><h2>Ajustes</h2><button>Cerrar</button><p>Contenido</p></section>
 */
export function Panel({ titulo, onCerrar, children }: PanelProps) {
  return (
    <section>
      <h2>{titulo}</h2>
      <button onClick={onCerrar}>Cerrar</button>
      {children}
    </section>
  );
}
