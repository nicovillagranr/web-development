/* =============================================================================
 * EJERCICIO 06 — no reescribir props: interface, extends y tipos derivados · bloque 09
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
 * · Tipar props con interface y compartir una base con extends.
 * · Derivar las props del tipo del dominio con Pick, Omit y Partial.
 * · Saber que Omit no comprueba que la clave exista.
 *
 * 🟢 CONTEXTO — hasta ahora cada componente declaraba su objeto de props a mano.
 * Con 3 drills va bien; con 30 componentes sobre el mismo dominio, no: acabas
 * escribiendo nombre: string en catorce sitios, y el día que el dominio cambia se
 * te desincronizan trece. La regla del ejercicio: hay una fuente de la verdad, el
 * tipo del dominio, y las props de cada componente se derivan de ella. No se copian.
 *
 * 🗺️ MAPA
 * TEORÍA 0 · interface para tipar props → drill 1
 * TEORÍA 1 · extends: una base común y variantes → drills 2–3
 * TEORÍA 2 · extends de varias bases → drill 4
 * TEORÍA 3 · derivar del dominio: Pick, Omit, Partial → drills 5–7
 * TEORÍA 4 · la trampa: Omit no comprueba la clave → drill 8
 * CAPSTONE · derivar y extender en el mismo tipo → drills 9–10
 *
 * ▸ 10 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/09-react-props/exercise-06.test.tsx
 * pnpm typecheck
 *
 * 📝 El trazado en .tsx es un ejemplo de uso comentado con //.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 0 — interface para tipar props
 *
 * DEFINICIÓN
 * Nada nuevo respecto al 01-tipos-basicos/09: interface es otra forma de nombrar un
 * tipo de objeto. Sin = (ese fue el lío del exercise-07), y por convención en React
 * el nombre acaba en Props.
 *
 * SINTAXIS
 * interface AvatarProps { nombre: string; url: string }
 *
 * 🧠 ANALOGÍA — el tipo del dominio es el plano del edificio. Cada componente no
 * necesita el plano entero: la fontanera quiere solo las tuberías (Pick), el
 * formulario de alta quiere el plano menos el número de portal, que lo asigna el
 * ayuntamiento (Omit), y el de reformas admite que le des solo las habitaciones que
 * tocas (Partial). Todos son recortes del mismo plano: si el plano cambia, los
 * recortes cambian solos. Si los hubieras redibujado a mano, cada uno se quedaría
 * viejo por su cuenta.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) Define la interface AvatarProps y expórtala. Debe tener:
 * · nombre string
 * · url    string
 */
export interface AvatarProps {
  nombre: string;
  url: string;
}

/* Avatar — usa AvatarProps. Retorna un <img> con src = url y alt = nombre.
 * (Un <img> no lleva cierre propio: se escribe <img ... />.)
 * <Avatar nombre="Ana" url="/ana.png" />  →  <img src="/ana.png" alt="Ana">
 */
export function Avatar({ nombre, url }: AvatarProps) {
  return <img src={url} alt={nombre} />;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — extends: una base común y variantes que añaden
 *
 * DEFINICIÓN
 * Cuando varios componentes comparten un núcleo de props, ese núcleo se escribe una
 * vez y los demás lo extienden. extends significa «todo lo de la base, más lo mío».
 *
 * SINTAXIS
 * interface Hija extends Padre { extra: string } // del 01-tipos-basicos/09
 * ───────────────────────────────────────────────────────────────────────────── */

/* Base ya escrita — la comparten los drills 2 y 3. */
export interface ElementoProps {
  id: number;
  nombre: string;
}

/* 2) Define ProductoProps extendiendo ElementoProps y añadiendo:
 *   · precio number
 * Expórtala.
 */
export interface ProductoProps extends ElementoProps {
  precio: number;
}

/* FilaProducto — usa ProductoProps. Retorna un <li> con nombre + ": " +
 * precio + "€". (El id está en el tipo aunque no lo pintes: sigue siendo
 * parte del contrato.)
 * <FilaProducto id={1} nombre="Pan" precio={2} />  →  <li>Pan: 2€</li>
 */
export function FilaProducto({ nombre, precio }: ProductoProps) {
  return (
    <li>
      {nombre}: {precio}€
    </li>
  );
}

/* 3) Define UsuarioProps extendiendo ElementoProps y añadiendo:
 *   · email string
 * Expórtala.
 */
export interface UsuarioProps extends ElementoProps {
  email: string;
}

/* FilaUsuario — usa UsuarioProps. Retorna un <li> con nombre + " (" +
 * email + ")".
 * <FilaUsuario id={1} nombre="Ana" email="a@b.com" />  →  <li>Ana (a@b.com)</li>
 */
export function FilaUsuario({ nombre, email }: UsuarioProps) {
  return (
    <li>
      {nombre} ({email})
    </li>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — extends de varias bases a la vez
 *
 * DEFINICIÓN
 * Una interface puede extender más de una, separadas por comas. Es la forma de
 * componer «capacidades» sueltas en vez de una jerarquía rígida.
 *
 * SINTAXIS
 * interface X extends A, B { propia: string }
 *
 * 💡 Un type lo haría con A & B; con interface es la coma. Las dos valen: aquí
 * practicas la de interface.
 * ───────────────────────────────────────────────────────────────────────────── */

export interface ConEstilo {
  className: string;
}

export interface Etiquetable {
  etiqueta: string;
}

/* 4) Define ChipProps extendiendo ConEstilo Y Etiquetable, y añadiendo:
 *   · onQuitar una función sin argumentos que no devuelve nada
 * Expórtala.
 */
export interface ChipProps extends ConEstilo, Etiquetable {
  onQuitar: () => void;
}

/* Chip — usa ChipProps. Retorna un <span> con el className puesto, que
 * contenga la etiqueta y después un <button> con el texto "x" que al clic
 * ejecute onQuitar.
 * ⚠️ Cafetera (01/drill 9): onClick={onQuitar}, no onClick={onQuitar()}.
 * <Chip className="tag" etiqueta="react" onQuitar={quitar} />
 *   →  <span class="tag">react<button>x</button></span>
 */
export function Chip({ className, etiqueta, onQuitar }: ChipProps) {
  return (
    <span className={className}>
      {etiqueta}
      <button onClick={onQuitar}>x</button>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — derivar del dominio: Pick, Omit, Partial
 *
 * DEFINICIÓN
 * El corazón del ejercicio. Articulo, abajo, es la fuente de la verdad: el objeto
 * tal y como existe en el dominio. Ningún componente necesita las cinco
 * propiedades, y ninguno debe redeclararlas. Las tres herramientas de
 * 07-utility-types recortan; extends, lo contrario, parte de una base y añade.
 *
 * SINTAXIS
 * interface BotonProps extends ConEstilo { texto: string } // partir de una base y añadir
 *
 * Ejemplos:
 * Pick<Articulo, 'nombre' | 'precio'> → solo esas dos propiedades
 * Omit<Articulo, 'id'>                → todas menos esa
 * Partial<Articulo>                   → todas, pero todas opcionales
 * ───────────────────────────────────────────────────────────────────────────── */

/* 📌 Recordatorio local del tipo con el que trabajan los drills 5-8:
 * interface Articulo { id: number; nombre: string; precio: number;
 *                      descripcion: string; enStock: boolean } */
export interface Articulo {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  enStock: boolean;
}

/* 5) Pick — define ResumenProps como exactamente las propiedades nombre y
 * precio de Articulo. Expórtala. (Una línea; no escribas los tipos a mano.)
 */
export type ResumenProps = Pick<Articulo, "nombre" | "precio">;

/* Resumen — usa ResumenProps. Retorna un <p> con nombre + " — " +
 * precio + "€".
 * <Resumen nombre="Pan" precio={2} />  →  <p>Pan — 2€</p>
 */
export function Resumen({ nombre, precio }: ResumenProps) {
  return (
    <p>
      {nombre} — {precio}€
    </p>
  );
}

/* 6) Omit — define AltaProps como Articulo sin la propiedad id (en un
 * alta el id todavía no existe: lo asigna el servidor). Expórtala.
 */
export type AltaProps = Omit<Articulo, "id">;

/* Alta — usa AltaProps. Retorna un <article> con un <h3> con el nombre
 * y un <p> con la descripcion.
 * <Alta nombre="Pan" precio={2} descripcion="De masa madre" enStock={true} />
 *   →  <article><h3>Pan</h3><p>De masa madre</p></article>
 */
export function Alta({ nombre, descripcion }: AltaProps) {
  return (
    <article>
      <h3>{nombre}</h3>
      <p>{descripcion}</p>
    </article>
  );
}

/* 7) Partial — define ParcheProps como Articulo con todas las propiedades
 * opcionales (es un formulario de edición: mandas solo lo que cambias).
 * Expórtala.
 */
export type ParcheProps = Partial<Articulo>;

/* Parche — usa ParcheProps. Retorna un <p> con nombre + " — " + precio
 * + "€", usando "(sin nombre)" si no llegó nombre y 0 si no llegó precio.
 * ⚠️ Aquí se decide ?? vs || (el matiz del exercise-02, y lo que usaste en
 *    el 03/drill 10). Un artículo puede llamarse "" o costar 0: son
 *    valores válidos que llegaron. Con || los tratarías como "no llegó" y
 *    los pisarías con el defecto. El test pasa nombre="" a propósito.
 * <Parche nombre="Pan" precio={2} />  →  <p>Pan — 2€</p>
 * <Parche />                          →  <p>(sin nombre) — 0€</p>
 */
export function Parche({ nombre, precio }: ParcheProps) {
  return (
    <p>
      {nombre ?? "(sin nombre)"} — {precio ?? 0}€
    </p>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 4 — la trampa: Omit no comprueba que la clave exista
 *
 * DEFINICIÓN
 * Pick<T, K> exige que K sea una clave real de T: si te equivocas escribiendo, TS
 * te lo marca al momento. Omit<T, K> no: su firma admite cualquier string.
 *
 * Ejemplos:
 * Omit<Articulo, 'idd'> → TS calla, no quita nada, y el tipo sigue pidiendo id
 *
 * ⚠️ TRAMPA — tú crees que lo quitaste. El fallo aparece luego, lejos, como un
 * «falta la propiedad id» que no entiendes.
 *
 * 🧠 ANALOGÍA — es el mismo género de mentira silenciosa que el any del
 * 01/exercise-06: no explota donde está el error, explota donde lo usas.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 8) Define los dos tipos, lado a lado, y expórtalos:
 *   · AltaRota = Articulo omitiendo 'idd'  ← el typo, a propósito
 *   · AltaSana = Articulo omitiendo 'id'   ← bien escrito
 * No cambies nada más. El test comprueba que AltaRota todavía exige id
 * (prueba de que el typo pasó desapercibido) y que AltaSana ya no.
 */
export type AltaRota = Omit<Articulo, "idd">;
export type AltaSana = Omit<Articulo, "id">;

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ CAPSTONE — derivar y extender en el mismo tipo
 *
 * El idioma que vas a ver en código real: una interface que extiende un recorte
 * del dominio y le añade lo que es puro asunto de la UI (un flag visual, un
 * callback). El dominio no sabe nada de «destacado» ni de «onComprar»: eso no
 * pertenece al Articulo, pertenece a esta tarjeta.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 9) Define TarjetaProductoProps y expórtala. Debe extender el recorte de
 * Articulo con nombre y precio (usa Pick en el extends), y añadir:
 *   · destacado boolean, opcional
 *   · onComprar una función sin argumentos que no devuelve nada
 */
export interface TarjetaProductoProps extends Pick<Articulo, "nombre" | "precio"> {
  destacado?: boolean;
  onComprar: () => void;
}

/* 10) TarjetaProducto — usa TarjetaProductoProps. Retorna un <article> con
 * className="destacada" si destacado es true, y className="normal" si
 * no (ternario sobre el atributo, del 03). Dentro, en este orden:
 *   · un <h3> con el nombre
 *   · un <b> con el precio + "€"
 *   · un <button> con el texto "Comprar" que al clic ejecute onComprar
 * <TarjetaProducto nombre="Pan" precio={2} onComprar={comprar} />
 *   →  <article class="normal"><h3>Pan</h3><b>2€</b><button>Comprar</button></article>
 * <TarjetaProducto nombre="Pan" precio={2} destacado onComprar={comprar} />
 *   →  <article class="destacada">...</article>
 */
export function TarjetaProducto({ nombre, precio, destacado, onComprar }: TarjetaProductoProps) {
  return (
    <article className={destacado ? "destacada" : "normal"}>
      <h3>{nombre}</h3>
      <b>{precio}€</b>
      <button onClick={onComprar}>Comprar</button>
    </article>
  );
}
