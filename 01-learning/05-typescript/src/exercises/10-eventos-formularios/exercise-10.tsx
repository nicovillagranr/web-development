/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — los tipos de este archivo. Están escritos abajo, en código:
 *
 *   type Prioridad = 'baja' | 'media' | 'alta'
 *   type Tarea = { id: string; texto: string; prioridad: Prioridad; hecha: boolean }
 *
 *   Una `Tarea` NACE en el gestor, no en el formulario: el formulario no sabe
 *   inventar ids ni decidir si algo está hecho. Entrega lo que el usuario escribió
 *   y ya. Ese reparto es la mitad del ejercicio.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 10 — CAPSTONE: el formulario entero              ·  10/10 del bloque
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · montar una feature completa repartida en componentes con fronteras limpias
 *   · tipar el estado de una lista y cambiarlo sin romperlo
 *   · reconocer, en tu propio código, los nueve conceptos del bloque funcionando
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * Los nueve anteriores te enseñaron piezas sueltas contra componentes de juguete.
 * Aquí construyes UNA cosa que funciona de arriba abajo: un gestor de tareas con
 * su formulario, su lista, su marcar y su borrar. Nada nuevo que aprender — todo
 * lo que hace falta ya lo has escrito antes, repartido en nueve archivos.
 *
 * 🗺️ MAPA DEL ARCHIVO — se construye de abajo arriba, como en un proyecto real
 * ----------------------------------------------------------------------------
 *   TEORÍA 1 · el reparto de responsabilidades  →  drills 1, 2, 3
 *   TEORÍA 2 · el estado que es una lista       →  drills 4, 5, 6
 *   ESCALERA E · el estado vive arriba  →  E1-E6, al final del archivo
 *                (si el drill 3 se te atraganta, baja ahí y vuelve)
 *   ESCALERA F · cambiar una lista es construir otra  →  F1-F6, después de la E
 *                (para el drill 6. Los tres primeros peldaños no llevan React)
 *
 * ▸ EJERCICIO — 6 drills en escalera, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-10.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters de este archivo están rotos a propósito.
 *   ¿Atascado? Las pistas están en `exercise-10.pistas.md`, de una en una.
 *
 * ⚠️ 1 de los 6 pasa el test con el fallo dentro y 2 fallan sin que typecheck diga
 *    una palabra. Corre siempre los dos comandos.
 *
 * 📝 Las traces van comentadas: en `.tsx` escribir `<Componente />` solo fabrica
 *    un objeto que lo describe, no lo ejecuta.
 * ===========================================================================*/

import { useState } from 'react'
type Prioridad = 'baja' | 'media' | 'alta'
type Tarea = { id: string; texto: string; prioridad: Prioridad; hecha: boolean }

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el reparto de responsabilidades
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   En una feature repartida en componentes, cada uno hace UNA cosa y le pasa al
 *   de arriba lo que ha averiguado. Los de abajo son tontos a propósito: no tienen
 *   estado ni saben qué se hará con lo que entregan. El de arriba —el que sí tiene
 *   el estado— es el único que decide. A eso se le llama elevar el estado.
 *
 * SINTAXIS — la misma frontera del 09, ahora entre tres pisos:
 *     <CampoTexto texto={texto} alEscribir={setTexto} />
 *                 └ lo que debe pintar   └ a quién avisa de lo tecleado
 *
 * EJEMPLO — quién sabe qué, en este archivo:
 *     CampoTexto        → sabe pintar un <input>. Nada más
 *     FormularioTarea   → junta lo escrito y lo entrega cuando se envía
 *     GestorDeTareas    → tiene la lista, y es el único que la cambia
 *
 * 🧠 ANALOGÍA (de apoyo) — la comanda otra vez, con la cocina montada. El camarero
 *    apunta y canta el pedido; no decide el menú ni cobra. Cada uno hace lo suyo y
 *    pasa el papel al siguiente.
 *
 * 🗣️ LAS PIEZAS
 *     elevar el estado  → ponerlo en el componente de arriba, no en cada hijo
 *     componente tonto  → el que solo pinta y avisa; no guarda nada
 *
 * ⚠️ TRAMPA — un hijo controlado necesita las DOS props: la que le dice qué pintar
 *    y la que usa para avisar. Con una sola parece que funciona a medias, que es
 *    la peor forma de fallar. Ya te pasó en el 06, con el `value` y el `onChange`.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) `CampoTexto` — un <input> controlado DESDE FUERA: pinta el `texto` que le
//    llega y avisa por `alEscribir` de lo que se teclea. No tiene estado propio.
//    El starter entrega el manejador sin traducir.
export function CampoTexto({ texto, alEscribir }: { texto: string; alEscribir: (valor: string) => void }) {
  return (
    // Con value guardamos el texto escrito
    // Con onChange nos avisamos de lo tecleado
    <input value={texto} onChange={(e) => alEscribir(e.target.value)} />
  )
}
// <CampoTexto texto="hola" alEscribir={(v) => console.log(v)} />   // "hola"

// 2) `SelectorPrioridad` — un <select> con las tres prioridades, controlado igual
//    que el campo: pinta la que le llega y avisa de la elegida.
//    `alElegir` pide una `Prioridad`, y el DOM no sabe nada de ese tipo.
//    Restricción: sin `as`.
export function SelectorPrioridad({ prioridad, alElegir }: { prioridad: Prioridad; alElegir: (p: Prioridad) => void }) {
  return (
    <select value={prioridad} onChange={(e) => {
      switch (e.target.value) {
        case 'baja': alElegir('baja'); break
        case 'media': alElegir('media'); break
        case 'alta': alElegir('alta'); break
      }
    }}
    >
      <option value="baja">Baja</option>
      <option value="media">Media</option>
      <option value="alta">Alta</option>
    </select>
  )
}
// <SelectorPrioridad prioridad="media" alElegir={(p) => console.log(p)} />

// 3) `FormularioTarea` — junta los dos de arriba, guarda lo que se va escribiendo
//    y, al enviarse, entrega el texto y la prioridad de una pieza. Después se
//    queda limpio: campo vacío y prioridad de vuelta en "media".
//    Con el campo vacío no entrega nada. Y no recarga la página, claro.
//    Fíjate en lo que `alAñadir` pide: ni `id` ni `hecha`. Eso no es cosa suya.
export function FormularioTarea({ alAñadir }: { alAñadir: (datos: { texto: string; prioridad: Prioridad }) => void }) {
  const [texto, setTexto] = useState('')
  const [prioridad, setPrioridad] = useState<Prioridad>('media')
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      if (texto) {
        alAñadir({ texto, prioridad })
        setTexto('')
        setPrioridad('media')
      }
    }}>
      <CampoTexto texto={texto} alEscribir={setTexto} />
      <SelectorPrioridad prioridad={prioridad} alElegir={setPrioridad} />
      <button type="submit">Añadir</button>
    </form>
  )
}
// <FormularioTarea alAñadir={(d) => console.log(d)} />


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — el estado que es una lista
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Cuando el estado es un array, cambiarlo no es meterle cosas dentro: es
 *   construir un array NUEVO y guardarlo. React compara lo que le das con lo que
 *   tenía, y si es el mismo array —aunque le hayas añadido elementos— entiende que
 *   no ha cambiado nada y no vuelve a pintar.
 *
 * SINTAXIS — las tres operaciones, y ninguna toca el array original:
 *     setTareas([...tareas, nueva])                    ← añadir
 *     setTareas(tareas.filter((t) => t.id !== id))     ← quitar
 *     setTareas(tareas.map((t) => …))                  ← cambiar una
 *
 * EJEMPLO — la diferencia que decide si se repinta o no:
 *     tareas.push(nueva)      → el array es el MISMO. React no ve el cambio
 *     [...tareas, nueva]      → array nuevo. React repinta
 *
 * 🧠 ANALOGÍA (de apoyo) — la lista de la compra pasada a limpio. No tachas sobre
 *    el papel viejo: copias la lista entera con el cambio hecho y tiras la anterior.
 *    Cuesta más papel y a cambio siempre sabes cuál es la buena.
 *
 * 🗣️ LAS PIEZAS
 *     useState<Tarea[]>([])  → estado tipado: una lista de tareas, vacía al inicio
 *     mutar                  → cambiar el array que ya tenías. Aquí, nunca
 *     `[...tareas, nueva]`   → copia con uno más al final
 *
 * ⚠️ TRAMPA — mutar no da error de tipos ni error en consola: simplemente la
 *    pantalla no se entera. Es el fallo más silencioso de todo el bloque.
 * ───────────────────────────────────────────────────────────────────────────── */

// 4) `FilaTarea` — una <li> con la tarea: una casilla que dice si está hecha, el
//    texto y un botón "Borrar". La casilla avisa por `alMarcar` con el id y el
//    nuevo estado; el botón avisa por `alBorrar` con el id.
//    Los dos datos que hay que entregar ya los tienes en las props.

// type Prioridad = 'baja' | 'media' | 'alta'
// type Tarea = { id: string; texto: string; prioridad: Prioridad; hecha: boolean }

export function FilaTarea({ tarea, alMarcar, alBorrar }: {
  tarea: Tarea; alMarcar: (id: string, hecha: boolean) => void; alBorrar: (id: string) => void
}) {
  return (
    <li>
      <input
        type="checkbox"
        checked={tarea.hecha}
        onChange={(e) => alMarcar(tarea.id, e.target.checked)} />
      {tarea.texto}
      <button
        aria-label={`Borrar ${tarea.texto}`}
        onClick={() => alBorrar(tarea.id)}>
        Borrar
      </button>
    </li>
  )
}
// <FilaTarea tarea={…} alMarcar={…} alBorrar={…} />

// 5) `ListaTareas` — pinta una <ul> con una `FilaTarea` por cada tarea, y le pasa
//    a cada una lo que necesita para avisar hacia arriba.
//    Este componente no decide nada: solo reparte.
//    Restricción: `key` va en el elemento que devuelve el map, y sale de la tarea.
export function ListaTareas({ tareas, alMarcar, alBorrar }: {
  tareas: Tarea[]
  alMarcar: (id: string, hecha: boolean) => void
  alBorrar: (id: string) => void
}) {
  return (
    <ul>
      {tareas.map((tarea) => (
        <FilaTarea key={tarea.id} tarea={tarea} alMarcar={alMarcar} alBorrar={alBorrar} />
      ))}
    </ul>
  )
}
// <ListaTareas tareas={[]} alMarcar={…} alBorrar={…} />

// 6) `GestorDeTareas` — el de arriba del todo, y el único con la lista. Recibe del
//    formulario el texto y la prioridad, y es él quien convierte eso en una `Tarea`
//    completa: le pone el `id` (usa `crypto.randomUUID()`) y la marca sin hacer.
//    `marcar` y `borrar` ya están escritos: léelos antes de escribir `añadir`,
//    porque los tres tienen la misma forma.
//    El starter añade la tarea de la manera que parece obvia y no funciona.
export function GestorDeTareas() {
  const [tareas, setTareas] = useState<Tarea[]>([])

  const añadir = (datos: { texto: string; prioridad: Prioridad }) => {
    const nueva: Tarea = { id: crypto.randomUUID(), hecha: false, ...datos }
    tareas.push(nueva)
    setTareas(tareas)
  }

  const marcar = (id: string, hecha: boolean) => {
    setTareas(tareas.map((t) => (t.id === id ? { ...t, hecha } : t)))
  }

  const borrar = (id: string) => {
    setTareas(tareas.filter((t) => t.id !== id))
  }

  return (
    <div>
      <FormularioTarea alAñadir={añadir} />
      <ListaTareas tareas={tareas} alMarcar={marcar} alBorrar={borrar} />
    </div>
  )
}
// <GestorDeTareas />

/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 6 estén en verde has terminado el bloque, y lo que tienes delante no
 * es un ejercicio: es una feature con la misma forma que las de un proyecto de
 * verdad. Repásala y búscale los nueve archivos dentro — están todos.
 * ───────────────────────────────────────────────────────────────────────────── */


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ESCALERA E — el estado vive arriba
 * ─────────────────────────────────────────────────────────────────────────────
 * Seis peldaños para desmontar el drill 3 en sus tres piezas. La frase entera es
 * esta, y cada peldaño añade una palabra:
 *
 *   **El estado vive en el padre. El hijo lo PINTA y AVISA, y no guarda nada.**
 *
 *   E1-E2 · qué hace un hijo tonto: pintar lo que le dan, avisar de lo que pasa
 *   E3-E4 · el circuito: el padre le entrega su propia función de cambiar
 *   E5-E6 · dos estados a la vez, y cómo se juntan al enviar
 *
 * 👀 En estos peldaños los padres pintan un `<p>` con lo que llevan guardado. No
 *    es decoración: es la única forma de VER desde fuera si el dato subió o no.
 * ───────────────────────────────────────────────────────────────────────────── */

// E1) `EtiquetaTexto` — un hijo que solo pinta: recibe `texto` y lo muestra en un
//     <p>. Si el padre le cambia el texto, tiene que cambiar lo que se ve.
//     El starter se hace una copia del texto al nacer y se queda con ella.
export function EtiquetaTexto({ texto }: { texto: string }) {
  // Creamos una variable que guarde una copia del texto
  // En el primer render se crea con el texto que le llega
  const copia = texto
  return (
    <p>
      {copia}
    </p>
  )
}
// <EtiquetaTexto texto="hola" />

// E2) `BotonQueAvisa` — un hijo que solo avisa: al pulsarlo llama a `alPulsar`.
//     Ojo con lo que le entregas al hueco: entregar una función y llamarla no es
//     lo mismo, y es el primer concepto de esta carpeta.
export function BotonQueAvisa({ alPulsar }: { alPulsar: () => void }) {
  return (
    <button onClick={alPulsar}>
      Pulsa
    </button>
  )
}
// <BotonQueAvisa alPulsar={() => {}} />

// E3) `PadreQueGuarda` — el padre tiene el estado y el `<p>` que lo pinta; el hijo
//     `CajaQueAvisa` ya está escrito y avisa bien de cada tecla. Tecleas "hola" y
//     el <p> del padre tiene que decir "hola".
//     El padre está ignorando lo que el hijo le cuenta.
function CajaQueAvisa({ alEscribir }: { alEscribir: (valor: string) => void }) {
  return <input onChange={(e) => alEscribir(e.target.value)} />
}

export function PadreQueGuarda() {
  const [texto, setTexto] = useState('') // texto parte con "", cuando se usa setTexto este string cambia
  return (
    <div>
      <CajaQueAvisa alEscribir={setTexto} />
      <p>{texto}</p>
    </div>
  )
}
// <PadreQueGuarda />

// E4) `PadreQueLimpia` — el mismo circuito, y ahora el padre tiene un botón que
//     vacía el estado. Al pulsarlo, el campo tiene que quedarse vacío también.
//     Ahora el campo se queda con lo escrito, porque va por libre.
//     El starter monta la caja del peldaño anterior, que solo sabe avisar.
function CajaControlada({ texto, alEscribir }: { texto: string; alEscribir: (valor: string) => void },) {
  return <input value={texto} onChange={(e) => alEscribir(e.target.value)} />
}

export function PadreQueLimpia() {
  const [texto, setTexto] = useState('')
  return (
    <div>
      <CajaControlada texto={texto} alEscribir={setTexto} />
      <button type="button" onClick={() => setTexto('')}>Limpiar</button>
      <p>Guardado: {texto}</p>
    </div>
  )
}
// <PadreQueLimpia />

// E5) `PadreConDosCajas` — dos estados independientes en el mismo padre, cada uno
//     con su caja. Escribes en la primera y el <p> de arriba lo dice; escribes en
//     la segunda y el de abajo, sin que se pisen.
//     El starter tiene los cables cruzados: cada caja avisa al estado del otro.
export function PadreConDosCajas() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  return (
    <div>
      <CajaControlada texto={nombre} alEscribir={setNombre} />
      <CajaControlada texto={email} alEscribir={setEmail} />
      <p>nombre: {nombre}</p>
      <p>email: {email}</p>
    </div>
  )
}
// <PadreConDosCajas />

// E6) `PadreQueEntregaLosDos` — el cierre, y es la línea del drill 3. Al pulsar
//     "Enviar", `alEnviar` recibe los dos datos JUNTOS, en un objeto con las
//     claves `nombre` y `email`.
//     Lee la firma de `alEnviar`: pide una cosa, no dos.
export function PadreQueEntregaLosDos({ alEnviar }: { alEnviar: (datos: { nombre: string; email: string }) => void }) {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  return (
    <div>
      <CajaControlada texto={nombre} alEscribir={setNombre} />
      <CajaControlada texto={email} alEscribir={setEmail} />
      <button type="button" onClick={() => alEnviar({ nombre, email })}>Enviar</button>
    </div>
  )
}
// <PadreQueEntregaLosDos alEnviar={(d) => console.log(d)} />

/* ─────────────────────────────────────────────────────────────────────────────
 * Con los seis en verde, el drill 3 se lee entero:
 *
 *   texto y prioridad viven en FormularioTarea          ← E3
 *   los hijos los pintan (`texto=`, `prioridad=`)        ← E4
 *   y avisan con el setter que el padre les entregó      ← E3
 *   son dos estados independientes                       ← E5
 *   y al enviar se juntan en un objeto                   ← E6
 *
 * Y la pieza que no está en ningún peldaño —`{ texto, prioridad }` sin `id` ni
 * `hecha`— es la del 09: la frontera entrega datos del dominio, no lo que le
 * sobra a quien los tiene.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ESCALERA F — cambiar una lista es construir otra
 * ─────────────────────────────────────────────────────────────────────────────
 * Seis peldaños para desmontar el drill 6. La frase entera es esta, y cada
 * peldaño añade una pieza:
 *
 *   **Para cambiar un array de estado construyes uno NUEVO y lo guardas.
 *     El que ya tenías no se toca nunca.**
 *
 *   F1-F3 · las tres operaciones en JavaScript pelado, sin React encima
 *   F4-F5 · las mismas dentro de un componente, donde el fallo se ve en pantalla
 *   F6    · las tres juntas: el drill 6 en miniatura
 *
 * 👀 Los tres primeros no son componentes: son funciones que reciben un array y
 *    devuelven otro. Sin hooks, sin JSX. El concepto es de JavaScript, y verlo
 *    sin React delante es la mitad del trabajo.
 *
 * ⚠️ EN ESTA ESCALERA EL TYPECHECK NO TE CUBRE, en ninguno de los seis. Mutar un
 *    array es código válido, así que el compilador se calla en los seis starters y
 *    el único que los caza es el test. Es a propósito: ese silencio ES el tema.
 * ───────────────────────────────────────────────────────────────────────────── */

// F1) `conUnoMas` — recibe una lista de textos y devuelve OTRA con el nuevo al
//     final. La lista que te dan tiene que quedarse exactamente como estaba.
//     El starter usa el método que todo el mundo usa para añadir, y es justo el
//     que aquí no sirve. Mira lo que devuelve ese método, además de lo que hace.
//     → conUnoMas(["a"], "b")   →   ["a", "b"],  y la original sigue siendo ["a"]
export function conUnoMas(lista: string[], nuevo: string): string[] {
  lista.push(nuevo)
  return lista
}
// conUnoMas(["a"], "b")

// F2) `sinElQueSea` — devuelve otra lista sin el texto que te digan. La original,
//     intacta. Si el texto no está, sale una copia igual.
//     El starter recorre y va sacando del array que le pasaron.
//     → sinElQueSea(["a", "b"], "a")   →   ["b"]
export function sinElQueSea(lista: string[], quitar: string): string[] {
  const posicion = lista.indexOf(quitar)
  if (posicion !== -1) lista.splice(posicion, 1)
  return lista
}
// sinElQueSea(["a", "b"], "a")

// F3) `conUnoCambiado` — devuelve otra lista con uno de los textos sustituido por
//     otro. Los demás, igual. Y la original sin tocar.
//     El starter escribe directamente en la posición.
//     → conUnoCambiado(["a", "b"], "a", "z")   →   ["z", "b"]
export function conUnoCambiado(lista: string[], viejo: string, nuevo: string): string[] {
  const posicion = lista.indexOf(viejo)
  if (posicion !== -1) lista[posicion] = nuevo
  return lista
}
// conUnoCambiado(["a", "b"], "a", "z")

/* Los tres de arriba son las tres líneas de la TEORÍA 2, sin React. Si los tienes
 * en verde, lo que viene es exactamente lo mismo con un `useState` alrededor. */

// F4) `ListaQueCrece` — un botón "Añadir" y una <ul> con un <li> por texto. Cada
//     pulsación mete uno nuevo: "item 1", "item 2"… según cuántos haya ya.
//     Aquí es donde el fallo se hace visible: el starter guarda bien el dato y la
//     pantalla no se entera. Compara lo que le entregas al setter con lo que él
//     tenía guardado antes, y pregúntate en qué se diferencian.
export function ListaQueCrece() {
  const [items, setItems] = useState<string[]>([])

  const añadir = () => {
    items.push(`item ${items.length + 1}`)
    setItems(items)
  }

  return (
    <div>
      <button type="button" onClick={añadir}>Añadir</button>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
// <ListaQueCrece />

// F5) `ListaQueMengua` — arranca con tres items ya puestos y cada uno tiene su
//     botón "Quitar". Al pulsarlo, ese item desaparece y los otros se quedan.
//     El starter tiene el mismo problema del F4 con la operación del F2.
export function ListaQueMengua() {
  const [items, setItems] = useState<string[]>(['uno', 'dos', 'tres'])

  const quitar = (item: string) => {
    const posicion = items.indexOf(item)
    items.splice(posicion, 1)
    setItems(items)
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item}>
          {item}
          <button type="button" aria-label={`Quitar ${item}`} onClick={() => quitar(item)}>
            Quitar
          </button>
        </li>
      ))}
    </ul>
  )
}
// <ListaQueMengua />

// F6) `MiniGestor` — el drill 6 sin formulario ni componentes hijos: un botón que
//     añade, y cada item con su casilla para marcarlo y su botón para borrarlo.
//     Un item marcado se pinta con <s> alrededor del texto.
//     Las tres operaciones a la vez. Si los cinco anteriores están en verde, este
//     no tiene nada nuevo: es copiarlas al sitio que toca.
type ItemMini = { id: string; texto: string; hecho: boolean }

export function MiniGestor() {
  const [items, setItems] = useState<ItemMini[]>([])

  const añadir = () => {
    const nuevo: ItemMini = { id: crypto.randomUUID(), texto: `item ${items.length + 1}`, hecho: false }
    items.push(nuevo)
    setItems(items)
  }

  const marcar = (id: string, hecho: boolean) => {
    const encontrado = items.find((i) => i.id === id)
    if (encontrado) encontrado.hecho = hecho
    setItems(items)
  }

  const borrar = (id: string) => {
    const posicion = items.findIndex((i) => i.id === id)
    if (posicion !== -1) items.splice(posicion, 1)
    setItems(items)
  }

  return (
    <div>
      <button type="button" onClick={añadir}>Añadir</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.hecho}
              aria-label={`Marcar ${item.texto}`}
              onChange={(e) => marcar(item.id, e.target.checked)} />
            {item.hecho ? <s>{item.texto}</s> : item.texto}
            <button type="button" aria-label={`Borrar ${item.texto}`} onClick={() => borrar(item.id)}>
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
// <MiniGestor />

/* ─────────────────────────────────────────────────────────────────────────────
 * Con los seis en verde, el drill 6 se lee entero:
 *
 *   la Tarea completa la arma el gestor, no el formulario   ← ya lo tenías
 *   añadir es devolver otra lista con uno más               ← F1, F4
 *   borrar es devolver otra sin ese                         ← F2, F5
 *   marcar es devolver otra con ese cambiado                ← F3, F6
 *
 * Y la pieza que hace que todo esto importe: React no mira DENTRO del array para
 * ver si cambió. Solo comprueba si es el mismo de antes. Por eso `push` te deja
 * el dato guardado y la pantalla igual — el fallo más silencioso del bloque.
 * ───────────────────────────────────────────────────────────────────────────── */
