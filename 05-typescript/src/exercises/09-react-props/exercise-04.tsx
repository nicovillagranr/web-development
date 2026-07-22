/* =============================================================================
 * EJERCICIO 04 — LISTAS y KEYS: pintar colecciones, y por qué React pide `key`
 * =============================================================================
 *
 * 🟢 EL CONCEPTO
 * ----------------------------------------------------------------------------
 * Ya lo rozaste en el 01 (`ListaUsuarios`): para pintar una colección, `.map`
 * cada dato a un elemento JSX. Tu `.map` de FASE 1, pero devolviendo `<li>` en
 * vez de strings. Aquí lo formalizamos y añadimos la pieza propia de React: `key`.
 *
 *     {productos.map((p) => <li key={p.id}>{p.nombre}</li>)}
 *                              └─ el key identifica cada elemento de la lista
 *
 *
 * 🔑 POR QUÉ EXISTE `key` (y por qué NO va en el tipo de props)
 * ----------------------------------------------------------------------------
 * Cuando la lista cambia (se añade, se borra, se reordena), React necesita saber
 * QUÉ elemento es cuál para no repintar toda la lista de cero. El `key` es esa
 * identidad estable: "este <li> es el del producto 7, siga donde siga".
 *
 * ⚠️ CLAVE: `key` NO es una prop tuya. React la INTERCEPTA antes de construir el
 *    objeto de props, se la queda para su uso interno, y NUNCA llega a tu
 *    componente. Por eso no la declaras en el tipo, y por eso si intentaras leer
 *    `props.key` dentro del componente no habría nada. Es un canal lateral entre
 *    tú y React, aparte del contrato de props.
 *
 * 🧠 ANALOGÍA: el `key` es el número de dorsal de un corredor. No es parte del
 *    corredor (no es una prop suya); es cómo la ORGANIZACIÓN (React) lo sigue por
 *    la pista entre una foto y la siguiente. Cambia el corredor de sitio y el
 *    dorsal sigue siendo el mismo → lo reconocen sin recontar a todos.
 *
 *
 * ▸ EJERCICIO — drills en escalera, del 1 al 10. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/09-react-props/exercise-04.test.tsx
 *     pnpm typecheck
 *
 * 📝 Trazado en .tsx = ejemplo de uso comentado con `//`.
 * ===========================================================================*/

export type Producto = {
  id: number,
  nombre: string,
  precio: number,
  enStock: boolean
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 0 — CALENTAMIENTO: map de strings a <li>
 * ════════════════════════════════════════════════════════════════════════════
 * Empieza con lo más simple: un array de strings. El `key` aquí es el propio
 * string (sirve si no se repiten). En el bloque 2 verás por qué un id es mejor.
 */

// 1) `ListaSimple` — recibe `nombres` (string[]). Retorna un <ul> con un <li>
//    por nombre, usando el nombre como texto y como `key`.
//    <ListaSimple nombres={["a", "b"]} />  →  <ul><li>a</li><li>b</li></ul>
export function ListaSimple({ nombres }: { nombres: string[] }) {
  return (
    <ul>
      {nombres.map((nombre) => <li key={nombre}>{nombre}</li>)}
    </ul>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 1 — map de OBJETOS, key = id
 * ════════════════════════════════════════════════════════════════════════════
 * Lo normal: un array de objetos del dominio. El `key` sale del id (estable y
 * único), el texto sale de otro campo. Reusa `Producto` (arriba).
 */

// 2) `ListaProductos` — recibe `productos` (Producto[]). Retorna un <ul> con un
//    <li> por producto, mostrando su `nombre` y con `key={producto.id}`.
//    <ListaProductos productos={[{id:1,nombre:"Pan",...}]} />  →  <ul><li>Pan</li></ul>
export function ListaProductos({ productos }: { productos: Producto[] }) {
  return (
    <ul>
      {productos.map((producto) => <li key={producto.id}>{producto.nombre}</li>)}
    </ul>
  )
}

// 3) `TablaPrecios` — recibe `productos` (Producto[]). Retorna un <ul> con un
//    <li> por producto que muestre `nombre` + ": " + `precio` + "€".
//    <TablaPrecios productos={[{id:1,nombre:"Pan",precio:2,...}]} />
//      →  <ul><li>Pan: 2€</li></ul>
export function TablaPrecios({ productos }: { productos: Producto[] }) {
  return (
    <ul>
      {productos.map((producto) => <li key={producto.id}>{producto.nombre}: {producto.precio}€</li>)}
    </ul>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 2 — `key` correcto: por qué NO va en las props, y por qué id > índice
 * ════════════════════════════════════════════════════════════════════════════
 * Dos drills que blindan el concepto del `key`.
 */

// 4) `Etiquetas` — recibe `tags` (string[]). Retorna un <div> con un <span> por
//    tag (texto = el tag, key = el tag). SIN <ul>, solo spans dentro del div.
//    Aquí compruebas que `key` NO llega al componente: aunque lo pongas, el
//    <span> no recibe ninguna prop rara — key se lo queda React.
//    <Etiquetas tags={["react","ts"]} />  →  <div><span>react</span><span>ts</span></div>
export function Etiquetas({ tags }: { tags: string[] }) {
  return (
    <div>
      {tags.map((tag) => <span key={tag}>{tag}</span>)}
    </div>
  )
}

// 5) `Pasos` — recibe `pasos` (string[]) que PUEDEN REPETIRSE (p.ej. dos "amasar").
//    Aquí el texto NO sirve de key (se repetiría). Usa el ÍNDICE del map como key:
//    `pasos.map((paso, i) => <li key={i}>...`. Retorna un <ol> con un <li> por paso.
//    ⚠️ El índice como key es el ÚLTIMO recurso: solo vale cuando la lista no se
//    reordena ni se filtra (si no, React confunde elementos). Aquí es una lista
//    fija de pasos, así que es aceptable — pero que quede claro el matiz.
//    <Pasos pasos={["amasar","hornear"]} />  →  <ol><li>amasar</li><li>hornear</li></ol>
export function Pasos({ pasos }: { pasos: string[] }) {
  return (
    <ol>
      {pasos.map((paso, i) => <li key={i}>{paso}</li>)}
    </ol>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 3 — LISTA VACÍA y estado vacío (enlaza con el 03)
 * ════════════════════════════════════════════════════════════════════════════
 */

// 6) `Bandeja` — recibe `correos` (string[]). Si está vacía, retorna un
//    <p>Bandeja vacía</p> (early return, del 03). Si no, un <ul> con un <li>
//    por correo (key = el correo).
//    <Bandeja correos={[]} />               →  <p>Bandeja vacía</p>
//    <Bandeja correos={["a@b.com"]} />       →  <ul><li>a@b.com</li></ul>
export function Bandeja({ correos }: { correos: string[] }) {
  if (correos.length === 0) {
    return <p>Bandeja vacía</p>
  }
  return (
    <ul>
      {correos.map((correo) => <li key={correo}>{correo}</li>)}
    </ul>
  )
}

// 7) `Contador` — recibe `items` (string[]). Retorna un <p> con el texto
//    "Total: " + la cantidad de items. Sin lista, solo el número (usa .length).
//    <Contador items={["a","b","c"]} />  →  <p>Total: 3</p>
//    <Contador items={[]} />              →  <p>Total: 0</p>
export function Contador({ items }: { items: string[] }) {
  // Sin condición: si el array está vacío, `items.length` YA vale 0 y se pinta
  // "Total: 0". Un ternario cuyas dos ramas dan lo mismo es un ternario de más.
  return <p>Total: {items.length}</p>
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 4 — CAPSTONE: FILTRAR + MAPEAR + pintar
 * ════════════════════════════════════════════════════════════════════════════
 * La familia que más se te ha resistido en FASE 1 (filter → map → sacar UN campo,
 * y sincronizar el tipo de retorno). Ahora el "tipo de retorno" es JSX, así que
 * el foco está en NO devolver el objeto entero: cada <li> muestra UN campo.
 *
 * ⚠️ Recuerda tus dos resbalones históricos y evítalos:
 *    · el no-op `.map(p => p)` (olvidar extraer el campo) → aquí sería
 *      `<li>{producto}</li>` en vez de `<li>{producto.nombre}</li>`, y React ni
 *      siquiera sabe pintar un objeto (te avisaría feo en runtime).
 *    · el orden filter→map: filtra PRIMERO (necesita el objeto entero para mirar
 *      `enStock`), mapea DESPUÉS (ya solo sacas el nombre).
 */

// 8) Define el tipo `EscaparateProps` y expórtalo (el test lo importa). Debe tener:
//      · `productos`   Producto[]
//      · `soloEnStock` boolean
export type EscaparateProps = {
  productos: Producto[],
  soloEnStock: boolean
}

// 9) `Escaparate` — usa `EscaparateProps`. Si `soloEnStock` es true, muestra solo
//    los productos con `enStock === true`; si es false, muestra todos. Retorna un
//    <ul> con un <li> por producto visible, mostrando su `nombre` (key = id).
//    Piensa el orden: primero decides la lista (filtras o no), luego mapeas.
//    productos = [{id:1,nombre:"Pan",enStock:true}, {id:2,nombre:"Sal",enStock:false}]
//    <Escaparate productos={productos} soloEnStock={false} /> →  <ul><li>Pan</li><li>Sal</li></ul>
//    <Escaparate productos={productos} soloEnStock={true}  /> →  <ul><li>Pan</li></ul>
export function Escaparate({ productos, soloEnStock }: EscaparateProps) {
  // Primero decido QUÉ lista se pinta (lo único que cambia entre los dos casos),
  // y después la pinto UNA vez: el <ul>/<li>/key ya no está duplicado.
  let visibles = productos
  if (soloEnStock) visibles = productos.filter((p) => p.enStock)

  return (
    <ul>
      {visibles.map((p) => <li key={p.id}>{p.nombre}</li>)}
    </ul>
  )
}

// 10) `NombresEnStock` — recibe `productos` (Producto[]) y retorna un <ul> con
//     SOLO los nombres de los productos en stock. Es filter + map + sacar el
//     campo, todo encadenado. El capstone del capstone: el gesto exacto de tu
//     slip histórico, ahora devolviendo <li>. Un <li> por producto en stock,
//     texto = nombre, key = id.
//     productos = [{id:1,nombre:"Pan",enStock:true},{id:2,nombre:"Sal",enStock:false}, {id:3,nombre:"Té",enStock:true}]
//     <NombresEnStock productos={productos} />  →  <ul><li>Pan</li><li>Té</li></ul>

// export type Producto = {
// id: number,
// nombre: string,
// precio: number,
// enStock: boolean
// }

export function NombresEnStock({ productos }: { productos: Producto[] }) {
  return (
    <ul>
      {productos.filter((producto) => producto.enStock).map((producto) => <li key={producto.id}>{producto.nombre}</li>)}
    </ul>
  )
}
