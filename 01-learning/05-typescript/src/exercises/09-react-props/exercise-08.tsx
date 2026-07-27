/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — recortar tipos en vez de copiarlos, sobre este ejemplo:
 *
 *     type Usuario = { id: number; nombre: string; email: string; activo: boolean }
 *
 *   Pick<Usuario, 'id' | 'nombre'>  // → { id: number; nombre: string }    QUÉDATE con estas
 *   Omit<Usuario, 'email'>          // → { id, nombre, activo }            QUITA estas
 *   Partial<Usuario>                // → { id?, nombre?, email?, activo? } todas OPCIONALES
 *   Usuario['email']                // → string     el TIPO de UNA propiedad, suelto
 *
 * Y los dos primos de la casa, que son la MISMA idea aplicada al HTML:
 *
 *   ComponentProps<'span'>          // → todas las props nativas de un <span>
 *   function X({ mia, ...resto })   // `mia` sale suelta; `resto` = lo que va al DOM
 *
 * 🧠 Una foto de carnet: `Pick` recorta y te quedas solo con la cara · `Omit` tapa
 *    lo que no quieres que salga · `Partial` dice "tráeme lo que tengas, no hace
 *    falta todo" · el acceso indexado saca UNA pieza sin el marco.
 *
 * ⚠️ Las claves van entre COMILLAS ('email'); varias se separan con `|`.
 * ⚠️ `Omit` NO te avisa si escribes mal la clave: `Omit<Usuario, 'emial'>` compila
 *    tan feliz y no quita nada. `Pick` sí protesta.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 08 — PROPS QUE SE EXCLUYEN: la unión discriminada
 * =============================================================================
 *
 * 🟢 EL CONCEPTO
 * ----------------------------------------------------------------------------
 * Hay componentes que tienen DOS MODOS y las props de cada modo no deben
 * mezclarse. El caso clásico: un botón que a veces navega (necesita `href`) y a
 * veces ejecuta algo (necesita `onClick`).
 *
 * El primer impulso es poner las dos opcionales:
 *
 *     type BotonProps = { texto: string; href?: string; onClick?: () => void }
 *
 * Y ese tipo MIENTE. Fíjate en lo que deja pasar:
 *
 *     <Boton texto="Ok" />                            ← ni href ni onClick: no hace NADA
 *     <Boton texto="Ok" href="/a" onClick={f} />      ← las DOS: ¿navega o ejecuta?
 *
 * Los dos compilan. Y ninguno de los dos existe en tu cabeza: no son casos que
 * hayas decidido soportar, son AGUJEROS. Un tipo con agujeros es un tipo que te
 * obliga a defenderte en runtime de estados que no deberían poder escribirse.
 *
 * 💡 LA REGLA DE FONDO, que vale para toda tu carrera:
 *    **el tipo debe admitir EXACTAMENTE los estados posibles. Ni uno más.**
 *
 * La herramienta es una que ya usaste en `05-unions-narrowing/07` (el patrón
 * reducer): una UNIÓN de formas exactas, con un campo que las distingue.
 *
 *     type BotonProps =
 *       | { como: 'enlace'; texto: string; href: string }
 *       | { como: 'accion'; texto: string; onClick: () => void }
 *
 * A ese campo `como` se le llama **DISCRIMINANTE**: un tipo literal que solo
 * puede valer una cosa en cada miembro. Al preguntar por él, TS estrecha
 * (narrowing) y dentro de esa rama SABE qué props hay y cuáles no.
 *
 * 🧠 ANALOGÍA: el formulario del banco. Arriba marcas una casilla: PARTICULAR o
 *    EMPRESA. Esa casilla decide qué mitad del formulario hay que rellenar — DNI
 *    o CIF, nunca los dos. Marcar la casilla no es burocracia: es lo que hace
 *    que "empresa sin CIF" sea imposible de entregar, en vez de un error que
 *    alguien detecta tres semanas después.
 *
 *
 * ⚠️ LA TRAMPA Nº1 DE ESTE EJERCICIO: NO DESESTRUCTURES EN LA FIRMA
 * ----------------------------------------------------------------------------
 * Desde el exercise-01 escribes `function X({ texto }: Props)`. Con una unión,
 * ESO SE ROMPE:
 *
 *     function Boton({ como, href, onClick }: BotonProps)   ❌ no compila
 *
 * Porque `href` no existe en TODOS los miembros de la unión, y desestructurar es
 * leer la propiedad YA, antes de haber preguntado nada.
 *
 * El narrowing necesita un OBJETO al que interrogar. Así que aquí se recibe
 * `props` entero, se pregunta, y se desestructura DENTRO de la rama si apetece:
 *
 *     function Boton(props: BotonProps) {
 *       if (props.como === 'enlace') return <a href={props.href}>{props.texto}</a>
 *       return <button onClick={props.onClick}>{props.texto}</button>
 *     }
 *
 * 🧠 No puedes abrir las dos mitades del formulario a la vez para copiar datos:
 *    primero miras la casilla, y solo entonces sabes qué campos hay delante.
 *
 *
 * ▸ EJERCICIO — drills en escalera, del 1 al 10. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/09-react-props/exercise-08.test.tsx
 *     pnpm typecheck
 *
 * 📝 Trazado en .tsx = ejemplo de uso comentado con `//`.
 * ===========================================================================*/


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 0 — CALENTAMIENTO: una unión de literales en UNA prop
 * ════════════════════════════════════════════════════════════════════════════
 * Esto ya lo hiciste (exercise-01, drill 6). Aquí la unión está DENTRO de una
 * prop: `estado` solo puede valer una de dos palabras. Todavía no hay dos formas
 * distintas de props, solo dos valores posibles de una.
 */

// 1) `Insignia` — recibe `estado` con el tipo `'activo' | 'inactivo'`. Retorna
//    un <span> con `className` = el estado, y dentro el texto "Activo" o
//    "Inactivo" según cuál sea.
//    <Insignia estado="activo" />  →  <span class="activo">Activo</span>
export function Insignia({ estado }: { estado: 'activo' | 'inactivo' }) {
  return (
    <span className={estado}>{estado === 'activo' ? 'Activo' : 'Inactivo'}</span>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 1 — EL PROBLEMA, para que lo veas con tus ojos antes de arreglarlo
 * ════════════════════════════════════════════════════════════════════════════
 * Este drill se escribe MAL a propósito, con las dos props opcionales. Funciona
 * en los casos buenos; el test documenta los agujeros que deja abiertos.
 */

// 2) `BotonRoto` — recibe `texto` (string), `href` (string, OPCIONAL) y
//    `onClick` (función sin argumentos que no devuelve nada, OPCIONAL).
//    Si hay `href`, retorna un <a> con ese href y el texto dentro.
//    Si no, retorna un <button> con el `onClick` puesto y el texto dentro.
//    ⚠️ Escríbelo tal cual. La lección no es el cuerpo: es leer el test y ver
//       QUÉ deja pasar este tipo que nunca deberías haber podido escribir.
//    <BotonRoto texto="Ir" href="/a" />       →  <a href="/a">Ir</a>
//    <BotonRoto texto="Ok" onClick={f} />     →  <button>Ok</button>
export function BotonRoto({ texto, href, onClick }: { texto: string, href?: string, onClick?: () => void }) {
  return (
    href ? <a href={href}>{texto}</a> : <button onClick={onClick}>{texto}</button>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 2 — LA UNIÓN DISCRIMINADA
 * ════════════════════════════════════════════════════════════════════════════
 * Dos formas EXACTAS, cada una completa por su cuenta, unidas por `|`.
 *
 * ⚠️ El discriminante tiene que ser un tipo LITERAL (`'enlace'`), no `string`.
 *    Con `como: string` no hay nada que estrechar: `props.como === 'enlace'`
 *    sería una comparación cualquiera, no una pregunta que TS sepa responder.
 */

// 3) Define y exporta los TRES tipos:
//      · `EnlaceProps` = { como: 'enlace';  texto: string; href: string }
//      · `AccionProps` = { como: 'accion';  texto: string; onClick: () => void }
//      · `BotonProps`  = la unión de los dos anteriores
//    (Los dos primeros escríbelos tal cual; el tercero es una línea con `|`.)
export type EnlaceProps = {
  como: 'enlace'
  texto: string
  href: string
}
export type AccionProps = {
  como: 'accion'
  texto: string
  onClick: () => void
}
export type BotonProps = EnlaceProps | AccionProps

// 4) `Boton` — usa `BotonProps`. Recibe `props` ENTERO (no desestructures en la
//    firma: es la trampa nº1 de la cabecera). Pregunta por `props.como`:
//      · 'enlace' → un <a> con el href y el texto dentro
//      · 'accion' → un <button> con el onClick y el texto dentro
//    <Boton como="enlace" texto="Ir" href="/a" />    →  <a href="/a">Ir</a>
//    <Boton como="accion" texto="Ok" onClick={f} />  →  <button>Ok</button>
export function Boton(props: BotonProps) {
  if (props.como === 'enlace') {
    return <a href={props.href}>{props.texto}</a>
  }
  return <button onClick={props.onClick}>{props.texto}</button>
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 3 — MÁS DE DOS MIEMBROS: el `switch`
 * ════════════════════════════════════════════════════════════════════════════
 * Con tres o más, el `if/else` encadenado se hace ilegible. El `switch` sobre el
 * discriminante es el idioma estándar — y es LITERALMENTE el reducer de
 * `05-unions-narrowing/07`, que también será `useReducer` en React.
 *
 * Fíjate en que cada rama ve props DISTINTAS: en `'error'` existe `codigo`, y en
 * `'exito'` ni siquiera se puede escribir `props.codigo` (TS lo tacha).
 */

// 5) Define y exporta `MensajeProps` como la unión de estas TRES formas:
//      · { tipo: 'exito';    detalle: string }
//      · { tipo: 'error';    codigo: number }
//      · { tipo: 'cargando' }                    ← sí: un miembro sin datos
export type MensajeProps =
  | { tipo: 'exito'; detalle: string }
  | { tipo: 'error'; codigo: number }
  | { tipo: 'cargando' }

//    `Mensaje` — usa `MensajeProps`. `switch` sobre `props.tipo`. Retorna un <p>
//    con `className` = el tipo y dentro:
//      · 'exito'    → el `detalle`
//      · 'error'    → "Error " + el `codigo`
//      · 'cargando' → "Cargando…"
//    <Mensaje tipo="error" codigo={404} />  →  <p class="error">Error 404</p>
export function Mensaje(props: MensajeProps) {
  switch (props.tipo) {
    case 'exito':
      return <p className="exito">{props.detalle}</p>
    case 'error':
      return <p className="error">Error {props.codigo}</p>
    case 'cargando':
      return <p className="cargando">Cargando…</p>
  }
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 4 — SIN DISCRIMINANTE: el operador `in`
 * ════════════════════════════════════════════════════════════════════════════
 * A veces no puedes (o no quieres) añadir un campo `tipo`. Entonces se pregunta
 * directamente si la PROPIEDAD está presente:
 *
 *     if ('onCerrar' in props) { ... }
 *          └─ el nombre entre comillas: es una CLAVE, no una variable
 *
 * `in` también estrecha, y DENTRO del componente funciona igual de bien.
 *
 * 🧠 Es preguntar "¿esta carpeta trae hoja de CIF?" en vez de mirar la casilla
 *    marcada arriba. Funciona, pero te fías de que las carpetas estén completas.
 *
 * ⚠️ Y AQUÍ ESTÁ EL PRECIO, que el test te va a enseñar en el drill 6c:
 *    **una unión SIN discriminante no impide que te manden las dos mitades.**
 *
 *        { texto: 'x', segundos: 3, onCerrar: f }   ← compila. Sí, compila.
 *
 *    Por qué: cuando escribes un objeto literal contra una unión, TS solo se
 *    queja de propiedades que no existan en NINGÚN miembro; `onCerrar` existe en
 *    uno, así que pasa. En cambio, con un DISCRIMINANTE, TS primero elige el
 *    miembro por el valor literal (`como: 'enlace'` → solo `EnlaceProps`) y
 *    luego revisa contra ESE, que sí prohíbe lo del otro.
 *
 *    Conclusión práctica, y es la del ejercicio entero: `in` sirve para LEER una
 *    unión ajena; el discriminante explícito es lo que cierra el agujero al
 *    ESCRIBIRLA. Si el tipo es tuyo, ponle discriminante.
 */

// 6) Define y exporta `AvisoProps` como la unión de estas DOS formas:
//      · { texto: string; onCerrar: () => void }   ← aviso que se cierra a mano
//      · { texto: string; segundos: number }       ← aviso que se va solo
export type AvisoProps =
  | { texto: string; onCerrar: () => void }
  | { texto: string; segundos: number }

//    `Aviso` — usa `AvisoProps`. Retorna un <div> con el `texto` y, según el
//    miembro (pregunta con `in`):
//      · si trae `onCerrar` → un <button> con el texto "Cerrar" que lo ejecute
//      · si no              → un <small> con los segundos + "s"
//    <Aviso texto="Guardado" onCerrar={f} />  →  <div>Guardado<button>Cerrar</button></div>
//    <Aviso texto="Guardado" segundos={3} />  →  <div>Guardado<small>3s</small></div>
export function Aviso(props: AvisoProps) {
  if ('onCerrar' in props) {
    return (
      <div>
        {props.texto}
        <button onClick={props.onCerrar}>Cerrar</button>
      </div>
    )
  }
  return (
    <div>
      {props.texto}
      <small>{props.segundos}s</small>
    </div>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 5 — NARROWING SIN JSX, y la GUARDIA `never`
 * ════════════════════════════════════════════════════════════════════════════
 * El narrowing no tiene nada que ver con React: es TS puro operando sobre un
 * objeto. Estos dos drills lo aíslan para que se vea desnudo.
 *
 * Y con ellos llega la pieza que hace que esto sea a prueba de futuro:
 *
 *     default: {
 *       const imposible: never = props
 *       return imposible
 *     }
 *
 * `never` es "el tipo de lo que no puede pasar". Si trataste TODOS los miembros,
 * en el `default` a TS no le queda ninguno → el tipo de `props` allí es `never` →
 * la asignación compila. El día que alguien añada un cuarto miembro y olvide su
 * `case`, ese miembro sobrevive hasta el `default`, ya NO es `never`, y **el
 * compilador te tacha esa línea**. Un error hoy, en vez de un hueco en blanco
 * en producción dentro de seis meses.
 *
 * 🧠 ANALOGÍA: el recuento de la caja al cerrar. No sirve para vender: sirve
 *    para que, si falta algo, te enteres ESTA noche y no en la auditoría.
 */

// 7) `describirBoton` — recibe `props: BotonProps` (la unión del drill 3) y
//    retorna un `string`. NO pinta nada, no hay JSX aquí.
//      · 'enlace' → "Enlace a " + el href
//      · 'accion' → "Acción: " + el texto
//    describirBoton({ como: 'enlace', texto: 'Ir', href: '/a' })  →  'Enlace a /a'
// eslint-disable-next-line react-refresh/only-export-components -- no es un componente; la regla vigila el hot-reload de Vite y aquí no aplica
export function describirBoton(props: BotonProps) {
  switch (props.como) {
    case 'enlace':
      return `Enlace a ${props.href}`
    case 'accion':
      return `Acción: ${props.texto}`
    default: {
      const imposible: never = props
      return imposible
    }
  }
}

// 8) `etiquetaDe` — recibe `props: MensajeProps` (drill 5) y retorna un `string`
//    con un `switch` sobre `props.tipo`:
//      · 'exito' → "Todo bien"   · 'error' → "Falló"   · 'cargando' → "Esperando"
//    …y un `default` con la GUARDIA `never` explicada arriba.
//    etiquetaDe({ tipo: 'cargando' })  →  'Esperando'
// eslint-disable-next-line react-refresh/only-export-components -- no es un componente; la regla vigila el hot-reload de Vite y aquí no aplica
export function etiquetaDe(props: MensajeProps) {
  switch (props.tipo) {
    case 'exito':
      return 'Todo bien'
    case 'error':
      return 'Falló'
    case 'cargando':
      return 'Esperando'
    default: {
      const imposible: never = props
      return imposible
    }
  }
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 6 — CAPSTONE: un campo de formulario con tres formas
 * ════════════════════════════════════════════════════════════════════════════
 * Aquí se junta todo lo de la carpeta: unión discriminada + narrowing + una
 * lista con `.map` y `key` (del 04) dentro de una de las ramas. Es el patrón con
 * el que se construyen los formularios por configuración en el mundo real.
 */

// 9) Define y exporta `CampoProps` como la unión de estas TRES formas. Las tres
//    comparten `etiqueta` (string), pero cada una trae lo suyo:
//      · { clase: 'texto';     etiqueta: string; valor: string }
//      · { clase: 'numero';    etiqueta: string; valor: number; maximo: number }
//      · { clase: 'seleccion'; etiqueta: string; opciones: string[] }
export type CampoProps =
  | { clase: 'texto'; etiqueta: string; valor: string }
  | { clase: 'numero'; etiqueta: string; valor: number; maximo: number }
  | { clase: 'seleccion'; etiqueta: string; opciones: string[] }

// 10) `Campo` — usa `CampoProps`. Retorna un <label> que contenga SIEMPRE la
//     `etiqueta` primero y, después, según la clase (usa `switch` + guardia
//     `never`):
//       · 'texto'     → <input type="text" defaultValue={valor} />
//       · 'numero'    → <input type="number" defaultValue={valor} max={maximo} />
//       · 'seleccion' → <select> con un <option> por cada opción; el `value` y
//                       el texto de cada uno son la opción, y la `key` también.
//     ⚠️ `defaultValue` (y no `value`) porque todavía no hay estado: eso es la
//        carpeta 11. Con `value` y sin `onChange`, React protesta en consola.
//     <Campo clase="texto" etiqueta="Nombre" valor="Ana" />
//       →  <label>Nombre<input type="text" value="Ana"></label>
//     <Campo clase="seleccion" etiqueta="Color" opciones={['rojo', 'azul']} />
//       →  <label>Color<select><option value="rojo">rojo</option>…</select></label>
export function Campo(props: CampoProps) {
  switch (props.clase) {
    case 'texto':
      return (
        <label>{props.etiqueta}<input type="text" defaultValue={props.valor} /></label>
      )
    case 'numero':
      return (
        <label>
          {props.etiqueta}
          <input type="number" defaultValue={props.valor} max={props.maximo} />
        </label>
      )
    case 'seleccion':
      return (
        <label>
          {props.etiqueta}
          <select>
            {props.opciones.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </label>
      )
    default: {
      const imposible: never = props
      return imposible
    }
  }
}
