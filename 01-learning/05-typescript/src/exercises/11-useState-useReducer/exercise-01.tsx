import { useState } from "react"

/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — `useState` devuelve SIEMPRE un par, y nunca cambia de forma:
 *
 *     const [valor, setValor] = useState(inicial)
 *            ▲       ▲                    ▲
 *            │       │                    └─ de aquí sale el TIPO del estado
 *            │       └─ el setter. Su tipo de retorno es `void`
 *            └─ el estado en este render. Es una constante, no una variable viva
 *
 * Lo que hay entre corchetes es desestructuración de un array de 2: los nombres
 * los eliges tú, el orden no.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 01 — de dónde saca `useState` el tipo del estado    ·  1/2 del bloque
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · predecir qué tipo infiere `useState` mirando solo su valor inicial
 *   · reconocer los tres iniciales que NO bastan (`null`, `{}`, `[]`) y ponerles
 *     el argumento de tipo
 *   · escribir `useState<T>(inicial)` en el sitio correcto de la línea
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * En JS `useState` no te hacía pensar: le dabas cualquier cosa y ya. En TS ese
 * valor inicial es una decisión, porque de él sale el tipo de todo lo que podrás
 * guardar después. Aquí vas a chocar con los tres iniciales que engañan — y son
 * exactamente los que te están dando errores ahora mismo en 03-projex.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 *   TEORÍA 1 · el inicial decide el tipo         →  drills 1, 2
 *   TEORÍA 2 · cuando el inicial no basta        →  drills 3, 4, 5
 *
 * ▸ EJERCICIO — 5 drills en escalera, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/11-useState-useReducer/exercise-01.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters de este archivo están rotos a propósito.
 *   2 de los 5 pasan el test con el fallo dentro — corre siempre los dos comandos.
 *   ¿Atascado? Las pistas están en `exercise-01.pistas.md`, de una en una.
 *
 * 👁️ Móntalos en `src/App.tsx` según los vayas cerrando: son componentes, y verlos
 *    vivos te va a decir más que el test.
 * ===========================================================================*/


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el valor inicial DECIDE el tipo del estado
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   `useState` es genérico: su parámetro de tipo se rellena solo, a partir del
 *   argumento que le pasas. TS mira ese valor UNA vez, en la línea donde escribes
 *   el hook, y decide ahí el tipo del estado para todo el componente. No vuelve a
 *   mirar: lo que hagas después no lo cambia.
 *
 * SINTAXIS
 *     const [n, setN] = useState(0)        // estado: number   · setN pide number
 *     const [t, setT] = useState("")       // estado: string   · setT pide string
 *     const [b, setB] = useState(false)    // estado: boolean  · setB pide boolean
 *
 * EJEMPLO
 *     setN(n + 1)        // ✅ number
 *     setN("1")          // ❌ un texto no cabe en un hueco de números
 *
 * 🧠 ANALOGÍA (de apoyo) — el molde de hielo. El primer líquido que echas decide
 *    la forma; a partir de ahí solo entra lo que tenga esa forma. No es que el
 *    molde "empiece vacío": es que ya está fabricado.
 *
 * 🗣️ LAS PIEZAS
 *     useState(0)   → la llamada al hook. `0` es el ARGUMENTO
 *     setN          → el setter, la función que pide el siguiente valor
 *     number        → el tipo inferido, que NO está escrito en ninguna parte
 *
 * ⚠️ TRAMPA — que el tipo no esté escrito no significa que no exista. Es el error
 *    de lectura número uno: "aquí no hay tipos" → sí los hay, los puso el
 *    compilador. Pon el cursor encima del nombre y el editor te lo enseña.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) `Contador` — un <p> con el número y un botón "Sumar" que lo sube de uno en
//    uno. El botón tiene que decir exactamente "Sumar" y el <p> solo el número.
//    Mira lo que le pasa el starter a `useState`: con ese inicial, el `+ 1` de
//    abajo deja de sumar y pasa a hacer otra cosa que también es válida en JS.
export function Contador() {
  const [n, setN] = useState("0")

  return (
    <div>
      <p>{n}</p>
      <button onClick={() => setN(n + 1)}>Sumar</button>
    </div>
  )
}

// 2) `Interruptor` — un botón que alterna entre encendido y apagado. Muestra el
//    texto "ON" cuando está encendido y "OFF" cuando no. Arranca apagado.
//    Aquí el `useState` ya está bien: alguien lo pasó a booleano y se quedó a
//    medias. El cuerpo sigue hablando en textos, y ahora los dos lados de cada
//    comparación ya no se pueden ni encontrar.
export function Interruptor() {
  const [encendido, setEncendido] = useState(false)

  return (
    <button onClick={() => setEncendido(encendido === "no" ? "si" : "no")}>
      {encendido === "si" ? "ON" : "OFF"}
    </button>
  )
}


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — cuando el valor inicial NO basta
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   La inferencia funciona mientras el inicial sea representativo de lo que vas a
 *   guardar. Hay tres que no lo son, porque describen el hueco vacío y no lo que
 *   acabará dentro. En esos casos se lo dices tú con un ARGUMENTO DE TIPO.
 *
 *     useState(null)   → el estado sería `null`, y solo `null`, para siempre
 *     useState({})     → un objeto SIN NINGUNA propiedad
 *     useState([])     → `never[]`: un array donde no cabe ningún elemento
 *
 * SINTAXIS
 *     const [sel, setSel] = useState<string | null>(null)
 *                                   ▲             ▲
 *                                   │             └─ el argumento (el valor)
 *                                   └─ el ARGUMENTO DE TIPO, entre < >
 *
 *   Va pegado al hook, NO después del nombre. Esto de aquí es otra cosa y está mal:
 *     const [sel, setSel]: string | null = useState(null)   // ❌ tipa el par entero
 *
 * 🧠 ANALOGÍA (de apoyo) — el organizador de tornillos. Comprarlo vacío no es lo
 *    mismo que comprar una caja lisa: los compartimentos ya vienen rotulados
 *    aunque no tengan nada dentro. `{}` es la caja lisa; la interface son los
 *    rótulos, y `?` es el permiso para que un compartimento esté vacío.
 *
 * 🗣️ LAS PIEZAS
 *     <string | null>   → el argumento de tipo
 *     campo?: string    → propiedad OPCIONAL: puede no estar
 *     never[]           → array de nada. Aparece solo, y siempre es un aviso
 *
 * ⚠️ TRAMPA — vas a leer el error de `[]` como si faltara un dato y vas a intentar
 *    arreglarlo rellenando el array inicial. No es eso: el array tiene que seguir
 *    vacío en el primer render. Lo que falta es DECIR qué va a caber dentro.
 * ───────────────────────────────────────────────────────────────────────────── */

export interface Tarea {
  id: number
  titulo: string
  hecha: boolean
}

// 📌 Los errores del formulario: puede no haber ninguno, o haber solo uno.
export interface ErroresForm {
  nombre?: string
  email?: string
}

// 3) `SelectorColor` — tres botones ("rojo", "verde", "azul") y un <p> que dice
//    "Elegido: rojo" cuando hay uno elegido. Antes de elegir nada, el <p> dice
//    "Sin elegir". Al arrancar no hay ninguno seleccionado.
//    El starter tiene el inicial correcto — es el sitio donde no cabe otra cosa
//    lo que hay que arreglar.
export function SelectorColor() {
  const [elegido, setElegido] = useState(null)

  return (
    <div>
      <p>{elegido === null ? "Sin elegir" : `Elegido: ${elegido}`}</p>
      {["rojo", "verde", "azul"].map((color) => (
        <button key={color} onClick={() => setElegido(color)}>
          {color}
        </button>
      ))}
    </div>
  )
}

// 4) `AvisoErrores` — recibe por props un `ErroresForm` y pinta un <li> por cada
//    error que traiga, con su texto. Si no trae ninguno, no pinta la <ul>.
//    Este es el drill que te está bloqueando 03-projex ahora mismo, aislado.
//    Fíjate en que aquí el problema no está en un `useState`: está en la firma.
export function AvisoErrores({ errores }: { errores: {} }) {
  const mensajes = [errores.nombre, errores.email].filter(Boolean)
  if (mensajes.length === 0) return null

  return (
    <ul>
      {mensajes.map((m) => (
        <li key={m}>{m}</li>
      ))}
    </ul>
  )
}

// 5) `ListaTareas` — un botón "Añadir" que mete una `Tarea` nueva al final de la
//    lista, y un <li> por tarea con su título. La lista arranca vacía.
//    Para el título usa "Tarea 1", "Tarea 2"… según cuántas haya ya.
//    ⚠️ El starter muta el array y le pasa a React la MISMA referencia, así que
//    no repinta. Ese fallo es el mismo del capstone del bloque 10: si te suena,
//    es que ya lo has visto.
export function ListaTareas() {
  const [tareas, setTareas] = useState([])

  const anadir = () => {
    tareas.push({ id: tareas.length + 1, titulo: `Tarea ${tareas.length + 1}`, hecha: false })
    setTareas(tareas)
  }

  return (
    <div>
      <button onClick={anadir}>Añadir</button>
      <ul>
        {tareas.map((t) => (
          <li key={t.id}>{t.titulo}</li>
        ))}
      </ul>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 5 estén en verde, vuelve a `03-projex/07-Contact`: los drills 3, 4
 * y 5 son literalmente los errores que te quedan ahí, con otros nombres.
 * El `02` va a por la otra mitad del par: qué hace, y qué no hace, el setter.
 * ───────────────────────────────────────────────────────────────────────────── */
