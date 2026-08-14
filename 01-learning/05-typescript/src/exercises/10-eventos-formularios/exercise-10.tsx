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
export function CampoTexto(
  { texto, alEscribir }: { texto: string; alEscribir: (valor: string) => void },
) {
  return (
    <input value={texto} onChange={alEscribir} />
  )
}
// <CampoTexto texto="hola" alEscribir={(v) => console.log(v)} />

// 2) `SelectorPrioridad` — un <select> con las tres prioridades, controlado igual
//    que el campo: pinta la que le llega y avisa de la elegida.
//    `alElegir` pide una `Prioridad`, y el DOM no sabe nada de ese tipo.
//    Restricción: sin `as`.
export function SelectorPrioridad(
  { prioridad, alElegir }: { prioridad: Prioridad; alElegir: (p: Prioridad) => void },
) {
  return (
    <select
      value={prioridad}
      onChange={(e) => alElegir(e.target.value)}
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
export function FormularioTarea(
  { alAñadir }: { alAñadir: (datos: { texto: string; prioridad: Prioridad }) => void },
) {
  const [texto, setTexto] = useState('')
  const [prioridad, setPrioridad] = useState<Prioridad>('media')
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      if (texto === '') return
      alAñadir({ texto, prioridad })
    }}>
      <CampoTexto texto={texto} alEscribir={setTexto} />
      <SelectorPrioridad prioridad={prioridad} alElegir={setPrioridad} />
      <button>Añadir</button>
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
export function FilaTarea(
  { tarea, alMarcar, alBorrar }: {
    tarea: Tarea
    alMarcar: (id: string, hecha: boolean) => void
    alBorrar: (id: string) => void
  },
) {
  return (
    <li>
      <input
        type="checkbox"
        checked={tarea.hecha}
        onChange={(e) => alMarcar(tarea.id, e.target.value)}
      />
      {tarea.texto}
      <button aria-label={`Borrar ${tarea.texto}`} onClick={() => alBorrar(tarea.id)}>
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
export function ListaTareas(
  { tareas, alMarcar, alBorrar }: {
    tareas: Tarea[]
    alMarcar: (id: string, hecha: boolean) => void
    alBorrar: (id: string) => void
  },
) {
  return (
    <ul>
      {tareas.map((tarea) => (
        <FilaTarea key={tarea.id} tarea={tarea.texto} alMarcar={alMarcar} alBorrar={alBorrar} />
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
