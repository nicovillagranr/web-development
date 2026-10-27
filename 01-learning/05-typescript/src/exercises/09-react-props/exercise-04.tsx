/* =============================================================================
 * EJERCICIO 04 — listas y keys: pintar colecciones · bloque 09
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
 * · Pintar una colección con .map, de strings y de objetos del dominio.
 * · Elegir el key: un id estable, y el índice solo como último recurso.
 * · Filtrar, mapear y sacar un solo campo, en ese orden.
 *
 * 🟢 CONTEXTO — ya lo rozaste en el 01 con ListaUsuarios: para pintar una
 * colección, cada dato pasa por .map a un elemento JSX. Tu .map de la FASE 1, pero
 * devolviendo <li> en vez de strings. Aquí se formaliza y se añade la pieza propia
 * de React: key.
 *
 * 🗺️ MAPA
 * TEORÍA 0 · map de strings a <li>, y para qué existe key → drill 1
 * TEORÍA 1 · map de objetos, key = id → drills 2–3
 * TEORÍA 2 · key correcto: fuera de las props, e id mejor que índice → drills 4–5
 * TEORÍA 3 · lista vacía y estado vacío → drills 6–7
 * CAPSTONE · filtrar, mapear y pintar → drills 8–10
 *
 * ▸ 10 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/09-react-props/exercise-04.test.tsx
 * pnpm typecheck
 *
 * 📝 El trazado en .tsx es un ejemplo de uso comentado con //.
 * ============================================================================= */

export type Producto = {
  id: number;
  nombre: string;
  precio: number;
  enStock: boolean;
};

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 0 — map de strings a <li>, y para qué existe key
 *
 * DEFINICIÓN
 * Cuando la lista cambia (se añade, se borra, se reordena), React necesita saber
 * qué elemento es cuál para no repintar toda la lista de cero. El key es esa
 * identidad estable: «este <li> es el del producto 7, siga donde siga». Para
 * empezar, lo más simple: un array de strings, donde el key es el propio string
 * (sirve si no se repiten). En la teoría 2 verás por qué un id es mejor.
 *
 * SINTAXIS
 * {productos.map((p) => <li key={p.id}>{p.nombre}</li>)} // el key identifica cada elemento
 *
 * 🧠 ANALOGÍA — el key es el dorsal de un corredor. No es parte del corredor (no es
 * una prop suya): es cómo la organización, React, lo sigue por la pista entre una
 * foto y la siguiente. Cambia el corredor de sitio y el dorsal sigue siendo el
 * mismo, así que lo reconocen sin recontar a todos.
 *
 * ⚠️ TRAMPA — key no es una prop tuya. React la intercepta antes de construir el
 * objeto de props, se la queda para su uso interno, y nunca llega a tu componente.
 * Por eso no la declaras en el tipo, y por eso props.key dentro del componente no
 * tendría nada. Es un canal lateral entre tú y React, aparte del contrato de props.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) ListaSimple — recibe nombres (string[]). Retorna un <ul> con un <li>
 * por nombre, usando el nombre como texto y como key.
 * <ListaSimple nombres={["a", "b"]} />  →  <ul><li>a</li><li>b</li></ul>
 */
export function ListaSimple({ nombres }: { nombres: string[] }) {
  return (
    <ul>
      {nombres.map((nombre) => (
        <li key={nombre}>{nombre}</li>
      ))}
    </ul>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — map de objetos, key = id
 *
 * DEFINICIÓN
 * Lo normal: un array de objetos del dominio. El key sale del id (estable y único),
 * y el texto sale de otro campo. Reusa Producto, el de arriba.
 *
 * SINTAXIS
 * <li key={producto.id}>{producto.nombre}</li>
 * ───────────────────────────────────────────────────────────────────────────── */

/* 2) ListaProductos — recibe productos (Producto[]). Retorna un <ul> con un
 * <li> por producto, mostrando su nombre y con key={producto.id}.
 * <ListaProductos productos={[{id:1,nombre:"Pan",...}]} />  →  <ul><li>Pan</li></ul>
 */
export function ListaProductos({ productos }: { productos: Producto[] }) {
  return (
    <ul>
      {productos.map((producto) => (
        <li key={producto.id}>{producto.nombre}</li>
      ))}
    </ul>
  );
}

/* 3) TablaPrecios — recibe productos (Producto[]). Retorna un <ul> con un
 * <li> por producto que muestre nombre + ": " + precio + "€".
 * <TablaPrecios productos={[{id:1,nombre:"Pan",precio:2,...}]} />
 *   →  <ul><li>Pan: 2€</li></ul>
 */
export function TablaPrecios({ productos }: { productos: Producto[] }) {
  return (
    <ul>
      {productos.map((producto) => (
        <li key={producto.id}>
          {producto.nombre}: {producto.precio}€
        </li>
      ))}
    </ul>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — key correcto: por qué no va en las props, y por qué id es mejor que
 * el índice
 *
 * Dos drills que blindan el concepto del key: el 4 comprueba que no llega al
 * componente, y el 5 usa el índice donde el texto no sirve.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) Etiquetas — recibe tags (string[]). Retorna un <div> con un <span> por
 * tag (texto = el tag, key = el tag). Sin <ul>, solo spans dentro del div.
 * Aquí compruebas que key no llega al componente: aunque lo pongas, el
 * <span> no recibe ninguna prop rara — key se lo queda React.
 * <Etiquetas tags={["react","ts"]} />  →  <div><span>react</span><span>ts</span></div>
 */
export function Etiquetas({ tags }: { tags: string[] }) {
  return (
    <div>
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}

/* 5) Pasos — recibe pasos (string[]) que pueden repetirse (p.ej. dos "amasar").
 * Aquí el texto no sirve de key (se repetiría). Usa el índice del map como key:
 * pasos.map((paso, i) => <li key={i}>.... Retorna un <ol> con un <li> por paso.
 * ⚠️ El índice como key es el último recurso: solo vale cuando la lista no se
 * reordena ni se filtra (si no, React confunde elementos). Aquí es una lista
 * fija de pasos, así que es aceptable — pero que quede claro el matiz.
 * <Pasos pasos={["amasar","hornear"]} />  →  <ol><li>amasar</li><li>hornear</li></ol>
 */
export function Pasos({ pasos }: { pasos: string[] }) {
  return (
    <ol>
      {pasos.map((paso, i) => (
        <li key={i}>{paso}</li>
      ))}
    </ol>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — lista vacía y estado vacío (enlaza con el 03)
 * ───────────────────────────────────────────────────────────────────────────── */

/* 6) Bandeja — recibe correos (string[]). Si está vacía, retorna un
 * <p>Bandeja vacía</p> (early return, del 03). Si no, un <ul> con un <li>
 * por correo (key = el correo).
 * <Bandeja correos={[]} />               →  <p>Bandeja vacía</p>
 * <Bandeja correos={["a@b.com"]} />       →  <ul><li>a@b.com</li></ul>
 */
export function Bandeja({ correos }: { correos: string[] }) {
  if (correos.length === 0) {
    return <p>Bandeja vacía</p>;
  }
  return (
    <ul>
      {correos.map((correo) => (
        <li key={correo}>{correo}</li>
      ))}
    </ul>
  );
}

/* 7) Contador — recibe items (string[]). Retorna un <p> con el texto
 * "Total: " + la cantidad de items. Sin lista, solo el número (usa .length).
 * <Contador items={["a","b","c"]} />  →  <p>Total: 3</p>
 * <Contador items={[]} />              →  <p>Total: 0</p>
 */
export function Contador({ items }: { items: string[] }) {
  // Sin condición: si el array está vacío, `items.length` YA vale 0 y se pinta
  // "Total: 0". Un ternario cuyas dos ramas dan lo mismo es un ternario de más.
  return <p>Total: {items.length}</p>;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ CAPSTONE — filtrar, mapear y pintar
 *
 * La familia que más se te ha resistido en la FASE 1: filter, map, sacar un campo,
 * y sincronizar el tipo de retorno. Ahora el tipo de retorno es JSX, así que el
 * foco está en no devolver el objeto entero: cada <li> muestra un campo.
 *
 * ⚠️ TRAMPA — tus dos resbalones históricos:
 * · el no-op .map(p => p), olvidar extraer el campo: aquí sería <li>{producto}</li>
 *   en vez de <li>{producto.nombre}</li>, y React ni siquiera sabe pintar un
 *   objeto (te avisaría feo en runtime).
 * · el orden filter → map: filtra primero, porque necesita el objeto entero para
 *   mirar enStock, y mapea después, cuando ya solo sacas el nombre.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 8) Define el tipo EscaparateProps y expórtalo (el test lo importa). Debe tener:
 * · productos   Producto[]
 * · soloEnStock boolean
 */
export type EscaparateProps = {
  productos: Producto[];
  soloEnStock: boolean;
};

/* 9) Escaparate — usa EscaparateProps. Si soloEnStock es true, muestra solo
 * los productos con enStock === true; si es false, muestra todos. Retorna un
 * <ul> con un <li> por producto visible, mostrando su nombre (key = id).
 * Piensa el orden: primero decides la lista (filtras o no), luego mapeas.
 * productos = [{id:1,nombre:"Pan",enStock:true}, {id:2,nombre:"Sal",enStock:false}]
 * <Escaparate productos={productos} soloEnStock={false} /> →  <ul><li>Pan</li><li>Sal</li></ul>
 * <Escaparate productos={productos} soloEnStock={true}  /> →  <ul><li>Pan</li></ul>
 */
export function Escaparate({ productos, soloEnStock }: EscaparateProps) {
  // Primero decido QUÉ lista se pinta (lo único que cambia entre los dos casos),
  // y después la pinto UNA vez: el <ul>/<li>/key ya no está duplicado.
  let visibles = productos;
  if (soloEnStock) visibles = productos.filter((p) => p.enStock);

  return (
    <ul>
      {visibles.map((p) => (
        <li key={p.id}>{p.nombre}</li>
      ))}
    </ul>
  );
}

/* 10) NombresEnStock — recibe productos (Producto[]) y retorna un <ul> con
 * solo los nombres de los productos en stock. Es filter + map + sacar el
 * campo, todo encadenado. El capstone del capstone: el gesto exacto de tu
 * slip histórico, ahora devolviendo <li>. Un <li> por producto en stock,
 * texto = nombre, key = id.
 * productos = [{id:1,nombre:"Pan",enStock:true},{id:2,nombre:"Sal",enStock:false}, {id:3,nombre:"Té",enStock:true}]
 * <NombresEnStock productos={productos} />  →  <ul><li>Pan</li><li>Té</li></ul>
 */

// export type Producto = {
// id: number,
// nombre: string,
// precio: number,
// enStock: boolean
// }

export function NombresEnStock({ productos }: { productos: Producto[] }) {
  return (
    <ul>
      {productos
        .filter((producto) => producto.enStock)
        .map((producto) => (
          <li key={producto.id}>{producto.nombre}</li>
        ))}
    </ul>
  );
}
