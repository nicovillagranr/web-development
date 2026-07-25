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
 * EJERCICIO 09 — PROPS-FUNCIÓN CON ARGUMENTOS: la cafetera, tercer acto
 * =============================================================================
 *
 * 🟢 EL CONCEPTO
 * ----------------------------------------------------------------------------
 * En el exercise-01 (drill 9) tipaste tu primera prop-función:
 *
 *     onAccion: () => void        →   <button onClick={onAccion}>
 *
 * Funcionaba porque `onAccion` no necesita saber NADA: se llama y ya. Pero en
 * cuanto la lista tiene diez filas, el padre necesita saber CUÁL:
 *
 *     onSeleccionar: (id: number) => void
 *
 * Y aquí aparece el problema que resuelve todo el ejercicio: **el `id` lo sabe
 * el hijo, y la función la escribió el padre.** ¿Dónde se juntan?
 *
 * No puedes entregar `onSeleccionar` a secas, porque quien la va a llamar es el
 * DOM, y el DOM llama a los manejadores con un EVENTO, no con tu id. Y no puedes
 * llamarla tú al escribirla, porque entonces se ejecuta al pintar.
 *
 * La solución es una tercera cosa: entregar una función NUEVA, envoltorio, que
 * no recibe nada y que POR DENTRO ya sabe el id.
 *
 *     onClick={onSeleccionar}          ❌ el DOM le pasaría el evento, no el id
 *     onClick={onSeleccionar(id)}      ❌ se ejecuta AL PINTAR, no al hacer clic
 *     onClick={() => onSeleccionar(id)} ✅ entregas una función que, cuando la
 *                                          llamen, llamará a la tuya con el id
 *
 * 🧠 ANALOGÍA: la nota para el camarero. No le das el café (ejecutar), ni le das
 *    la cafetera vacía sin decirle qué (entregar la función pelada). Le das una
 *    NOTA: *"cuando suene el timbre, sirve el café de la mesa 4"*. La nota no es
 *    café: es una instrucción con el número de mesa YA escrito dentro. Se
 *    escribe una vez, se ejecuta cuando toque, y cada mesa tiene la suya.
 *
 *
 * 💥 BUENA NOTICIA (y contraste con FASE 1)
 * ----------------------------------------------------------------------------
 * Las dos versiones ❌ de arriba NO COMPILAN. TS te para en seco:
 *   · la primera, porque el evento del DOM no es un `number`;
 *   · la segunda, porque `onSeleccionar(id)` vale `void`, y `void` no es una
 *     función que se pueda poner en un `onClick`.
 * En `02-funciones` la cafetera te dejaba pasar y explotaba en runtime. Aquí
 * tienes una capa más vigilando. Aprovéchala: lee el error, no adivines.
 *
 *
 * ▸ EJERCICIO — drills en escalera, del 1 al 10. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/09-react-props/exercise-09.test.tsx
 *     pnpm typecheck
 *
 * 📝 Trazado en .tsx = ejemplo de uso comentado con `//`.
 * ===========================================================================*/

/* eslint-disable @typescript-eslint/no-empty-object-type, no-empty-pattern --
 * ANDAMIAJE DEL STARTER: los huecos `{}` sin rellenar disparan estas dos reglas.
 * 🧹 Al cerrar los 10 drills, BORRA estas 4 líneas y corre `pnpm lint`. */


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 0 — CALENTAMIENTO: la prop-función SIN argumentos
 * ════════════════════════════════════════════════════════════════════════════
 * Repaso del exercise-01/drill 9, para tener el gesto fresco. Aquí sí se entrega
 * pelada, porque no hay nada que decirle.
 */

// 1) `BotonSimple` — recibe `texto` (string) y `onAccion` (función sin
//    argumentos que no devuelve nada). Retorna un <button> con el texto dentro
//    que, al hacer clic, ejecute `onAccion`.
//    <BotonSimple texto="Ok" onAccion={avisar} />  →  <button>Ok</button>
export function BotonSimple({ texto, onAccion }: { texto: string, onAccion: () => void }) {
  return (
    <button onClick={onAccion}>{texto}</button>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 1 — EL ENVOLTORIO, sin React de por medio
 * ════════════════════════════════════════════════════════════════════════════
 * Antes de escribirlo dentro de un `onClick`, constrúyelo desnudo. Este drill es
 * el corazón del ejercicio: una función que FABRICA otra función con un dato ya
 * metido dentro.
 *
 * ⚠️ Fíjate en la firma que se te pide: entra un `number` y una función, y sale
 *    OTRA FUNCIÓN (`() => void`). No sale un resultado: sale una instrucción.
 */

// 2) `hacerManejador` — recibe `id` (number) y `onSeleccionar` (una función que
//    recibe un number y no devuelve nada). Retorna una función SIN argumentos
//    que, cuando se la llame, ejecute `onSeleccionar` con ese `id`.
//    ⚠️ Anota el tipo de retorno: es `() => void`.
//    ⚠️ Llamar a `hacerManejador` NO debe ejecutar nada todavía. Solo fabrica.
//    const manejar = hacerManejador(7, elegir)   ← aquí no se llamó a `elegir`
//    manejar()                                   ← aquí sí: elegir(7)
// eslint-disable-next-line react-refresh/only-export-components -- no es un componente; la regla vigila el hot-reload de Vite y aquí no aplica
export function hacerManejador(id: number, onSeleccionar: (id: number) => void) {
  return () => onSeleccionar(id)
}
// hacerManejador(7, () => { })


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 2 — EL MISMO ENVOLTORIO, ahora dentro del JSX
 * ════════════════════════════════════════════════════════════════════════════
 * `onClick={() => onSeleccionar(id)}` es EXACTAMENTE lo que acabas de escribir
 * en el drill 2, solo que sin darle nombre y puesto en el sitio donde se usa.
 */

// 3) `BotonId` — recibe `id` (number), `texto` (string) y `onSeleccionar` (una
//    función que recibe un number y no devuelve nada). Retorna un <button> con
//    el texto dentro que, al hacer clic, llame a `onSeleccionar` con el `id`.
//    <BotonId id={7} texto="Elegir" onSeleccionar={elegir} />
//      →  clic  →  elegir(7)
export function BotonId({ id, texto, onSeleccionar }: { id: number, texto: string, onSeleccionar: (id: number) => void }) {
  return (
    <button onClick={() => onSeleccionar(id)}>{texto}</button>
  )
}

// 4) `BotonRenombrar` — recibe `id` (number), `nombre` (string) y `onRenombrar`
//    (una función que recibe un number Y un string, y no devuelve nada).
//    Retorna un <button> con el `nombre` dentro que, al clic, llame a
//    `onRenombrar` con el id y el nombre, EN ESE ORDEN.
//    ⚠️ TS empareja los argumentos por POSICIÓN, no por nombre (la lección de
//       `mapConIndice` en 02-funciones/06). Invertirlos aquí sí lo caza el
//       compilador: `number` y `string` no se parecen.
//    <BotonRenombrar id={7} nombre="Ana" onRenombrar={renombrar} />
//      →  clic  →  renombrar(7, 'Ana')
export function BotonRenombrar({ id, nombre, onRenombrar }: { id: number, nombre: string, onRenombrar: (id: number, nombre: string) => void }) {
  return (
    <button onClick={() => onRenombrar(id, nombre)}>{nombre}</button>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 3 — PASAR EL OBJETO ENTERO, y hacerlo dentro de un `.map`
 * ════════════════════════════════════════════════════════════════════════════
 * Un callback puede recibir lo que quieras: un id, dos datos, o el objeto de
 * dominio completo. Lo decides tú al escribir el tipo.
 *
 * Y aquí llega el sitio donde todo esto vale la pena: una LISTA. Cada `<li>`
 * fabrica SU PROPIA nota, con SU id dentro. Diez filas, diez envoltorios, cada
 * uno recordando el suyo. (Eso se llama CLAUSURA/closure; no necesitas el
 * nombre para usarlo, pero ya lo has usado.)
 */

export type Usuario = { id: number; nombre: string }

// 5) `FilaUsuario` — recibe `usuario` (Usuario) y `onElegir` (una función que
//    recibe un `Usuario` ENTERO y no devuelve nada). Retorna un <li> con un
//    <button> dentro que muestre el nombre y que, al clic, llame a `onElegir`
//    con el usuario completo.
//    <FilaUsuario usuario={{ id: 7, nombre: 'Ana' }} onElegir={elegir} />
//      →  clic  →  elegir({ id: 7, nombre: 'Ana' })
export function FilaUsuario({ usuario, onElegir }: { usuario: Usuario, onElegir: (usuario: Usuario) => void }) {
  return (
    <li>
      <button onClick={() => onElegir(usuario)}>{usuario.nombre}</button>
    </li>
  )
}

// 6) `ListaUsuarios` — recibe `usuarios` (Usuario[]) y `onElegir` (misma función
//    del drill 5). Retorna un <ul> con un `FilaUsuario` por cada usuario,
//    pasándole a cada uno su usuario y el `onElegir` TAL CUAL (aquí se entrega
//    pelado: no hay nada que meterle todavía, eso ya lo hace la fila).
//    ⚠️ La `key` va en `FilaUsuario`, que es lo que devuelve el `.map` (drill 4
//       del exercise-04: la key la intercepta React, no llega a las props).
//    <ListaUsuarios usuarios={[{ id: 7, nombre: 'Ana' }]} onElegir={elegir} />
export function ListaUsuarios({ usuarios, onElegir }: { usuarios: Usuario[], onElegir: (usuario: Usuario) => void }) {
  return (
    <ul>
      {usuarios.map((usuario) => <FilaUsuario key={usuario.id} usuario={usuario} onElegir={onElegir} />)}
    </ul>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 4 — EL CALLBACK OPCIONAL: `?.()`
 * ════════════════════════════════════════════════════════════════════════════
 * Si la prop-función es opcional, su tipo por dentro es `((id: number) => void)
 * | undefined` — y `undefined()` revienta. Hay dos formas de defenderse:
 *
 *     if (onBorrar) onBorrar(id)     ← la guardia de siempre
 *     onBorrar?.(id)                 ← lo mismo, en un símbolo
 *
 * `?.()` es "llámala SOLO si existe". Es el mismo `?.` del acceso a propiedades,
 * aplicado a la llamada. Si no existe, la expresión entera vale `undefined` y no
 * pasa nada.
 *
 * ⚠️ Ojo a los paréntesis: `onBorrar?.(id)`, con el punto ANTES. No es
 *    `onBorrar?(id)` (eso parece un ternario a medias y no compila).
 */

// 7) `BotonBorrar` — recibe `id` (number) y `onBorrar` (función que recibe un
//    number y no devuelve nada, OPCIONAL). Retorna un <button> con el texto
//    "Borrar" que, al clic, llame a `onBorrar` con el id SOLO si llegó.
//    <BotonBorrar id={7} />              →  clic  →  no pasa nada, no explota
//    <BotonBorrar id={7} onBorrar={f} /> →  clic  →  f(7)
export function BotonBorrar({ id, onBorrar }: { id: number, onBorrar?: (id: number) => void }) {
  return (
    <button onClick={() => onBorrar?.(id)}>Borrar</button>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 5 — ⚠️ NO TODA PROP-FUNCIÓN ES UN EVENTO
 * ════════════════════════════════════════════════════════════════════════════
 * Todas las de arriba devuelven `void`: el hijo las llama y NO mira el
 * resultado (el TIRADOR DE ESPALDAS del exercise-01 — dispara y no se gira).
 *
 * Pero una prop-función puede devolver algo que el hijo SÍ usa. Entonces no es
 * "avisar de que pasó algo": es "aquí tienes una pieza de comportamiento que me
 * falta". El componente no sabe cómo formatear un precio; quien lo llama, sí.
 *
 *     formatear: (n: number) => string    ← el hijo PINTA lo que esto devuelva
 *
 * 🧠 ANALOGÍA: la diferencia entre avisar al camarero de que ya has terminado
 *    (`void`: le da igual qué contestes) y pedirle la cuenta (esperas el papel,
 *    y sin él no puedes seguir).
 */

// 8) `Precio` — recibe `valor` (number) y `formatear` (una función que recibe un
//    number y devuelve un string). Retorna un <span> con el resultado de
//    formatear el valor.
//    ⚠️ Aquí el retorno SÍ importa: si `formatear` devolviera `void`, no habría
//       nada que pintar. Fíjate en que la firma lo dice.
//    <Precio valor={12} formatear={(n) => `${n} €`} />  →  <span>12 €</span>
export function Precio({ valor, formatear }: { valor: number, formatear: (n: number) => string }) {
  return (
    <span>{formatear(valor)}</span>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 6 — CAPSTONE: una lista con tres acciones distintas
 * ════════════════════════════════════════════════════════════════════════════
 * Sin concepto nuevo: callbacks con argumento + uno opcional + `.map` con `key`
 * + un formateador que devuelve string. Es una lista de tareas de verdad, a la
 * que solo le falta el estado (carpeta 11) para estar viva.
 */

export type Tarea = { id: number; titulo: string; hecha: boolean }

// 9) Define el tipo `ListaTareasProps` y expórtalo. Debe tener:
//      · `tareas`      Tarea[]
//      · `onAlternar`  función que recibe un number (el id) y no devuelve nada
//      · `onBorrar`    igual que la anterior, pero OPCIONAL
//      · `etiquetaDe`  función que recibe una `Tarea` y devuelve un string
export type ListaTareasProps = {
  tareas: Tarea[],
  onAlternar: (id: number) => void,
  onBorrar?: (id: number) => void,
  etiquetaDe: (tarea: Tarea) => string
}

// 10) `ListaTareas` — usa `ListaTareasProps`. Si no hay tareas, early return de
//     un <p>Sin tareas</p> (el estado vacío del exercise-03).
//     Si hay, retorna un <ul> con un <li> por tarea (`key` = el id), y dentro de
//     cada <li>, EN ESTE ORDEN:
//       · un <span> con `className="hecha"` si la tarea está hecha y
//         `className="pendiente"` si no, que contenga `etiquetaDe(tarea)`
//       · un <button> con el texto "Alternar" que llame a `onAlternar` con el id
//       · un <button> con el texto "Borrar" que llame a `onBorrar` con el id
//         SOLO si llegó
//     <ListaTareas tareas={[]} … />  →  <p>Sin tareas</p>
export function ListaTareas(props: ListaTareasProps) {
  if (props.tareas.length === 0) {
    return <p>Sin tareas</p>
  }
  return (
    <ul>
      {props.tareas.map(tarea => (
        <li key={tarea.id}>
          <span className={tarea.hecha ? 'hecha' : 'pendiente'}>{props.etiquetaDe(tarea)}</span>
          <button onClick={() => props.onAlternar(tarea.id)}>Alternar</button>
          <button onClick={() => props.onBorrar?.(tarea.id)}>Borrar</button>
        </li>
      ))}
    </ul>
  )
}
