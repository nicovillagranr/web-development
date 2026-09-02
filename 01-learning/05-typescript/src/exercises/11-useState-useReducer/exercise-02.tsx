import { useState } from "react"

/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — la firma del setter, que es de lo que va todo el archivo:
 *
 *     const [n, setN] = useState(0)
 *
 *     setN: (nuevo: number) => void
 *            ▲                  ▲
 *            │                  └─ lo que SALE de llamarlo: nada
 *            └─ lo que le ENTREGAS
 *
 * Y `n` es una constante de ESTE render. No es una variable viva que cambie sola
 * a mitad de una función.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 02 — el setter guarda, no devuelve                 ·  2/2 del bloque
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · decir qué recibes al llamar a un setter, y por qué
 *   · explicar por qué el estado no ha cambiado en la línea siguiente
 *   · elegir entre `setN(valor)` y `setN(anterior => …)` con un criterio, no por
 *     probar cuál funciona
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * El `01` iba de la primera mitad del par: el estado y su tipo. Esta es la otra
 * mitad, y es la que se lleva por delante a más gente, porque falla en silencio:
 * el código se ejecuta, no revienta, y el número que sale es el equivocado.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 *   TEORÍA 1 · lo que el setter NO te da        →  drills 1, 2
 *   TEORÍA 2 · la forma funcional               →  drills 3, 4, 5
 *
 * ▸ EJERCICIO — 5 drills en escalera, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/11-useState-useReducer/exercise-02.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters de este archivo están rotos a propósito.
 *   ⚠️ Aquí el typecheck casi no te cubre: solo 1 de los 5 da error de tipos. Los
 *   otros 4 compilan perfectamente y hacen lo que no toca — los caza el test.
 *   ¿Atascado? Las pistas están en `exercise-02.pistas.md`, de una en una.
 *
 * 👁️ Móntalos en `src/App.tsx`: estos hay que verlos vivos, porque el fallo de
 *    casi todos es "va un paso por detrás" y en pantalla se nota al instante.
 * ===========================================================================*/


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — lo que el setter NO te da
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   El setter es una función que retorna `void`. Le entregas el próximo valor y
 *   él programa un nuevo render. No te devuelve el valor guardado, ni el anterior,
 *   ni un acuse de recibo. Y tampoco modifica la constante que tienes en la mano:
 *   `n` seguirá valiendo lo mismo hasta el final de esta función.
 *
 * SINTAXIS
 *     const guardado = setN(5)   // `guardado` es undefined, NO es 5
 *     setN(5)
 *     console.log(n)             // imprime el valor VIEJO. Todavía estás en el
 *                                // render anterior
 *
 * 🧠 ANALOGÍA (de apoyo) — el buzón. Echar la carta y recibir la respuesta son
 *    dos cosas distintas, y pasan en momentos distintos. `setN` es echar la
 *    carta: la sueltas y sigues con tu día. La respuesta llega en el siguiente
 *    render, no en la línea de abajo.
 *
 * 🗣️ LAS PIEZAS
 *     setN(5)     → una llamada. Su valor es `undefined`
 *     void        → el tipo de retorno del setter
 *     n           → una constante de este render, no una variable viva
 *
 * ⚠️ TRAMPA — tus palabras exactas de otra sesión: *"el setter devuelve el
 *    string"*. No devuelve nada, lo guarda. Y ojo con la segunda mitad, que es
 *    peor: leer `n` justo después de `setN` no da error, no avisa nadie, y te
 *    devuelve el valor de antes. Ese es el drill 2.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) `GuardarNombre` — un <input> y un botón "Guardar". Al pulsarlo, un <p> dice
//    "Guardado: Ana" y el <input> se queda vacío. Antes de pulsar el <p> dice
//    "Nada guardado".
//    El starter guarda bien, y luego le pide al setter que le devuelva lo que
//    acaba de guardar para vaciar con eso. Mira su firma antes de escribir nada.
export function GuardarNombre() {
  const [texto, setTexto] = useState("")
  const [guardado, setGuardado] = useState("")

  const guardar = () => {
    const loGuardado = setGuardado(texto)
    setTexto(loGuardado)
  }

  return (
    <div>
      <input value={texto} onChange={(e) => setTexto(e.target.value)} />
      <button onClick={guardar}>Guardar</button>
      <p>{guardado === "" ? "Nada guardado" : `Guardado: ${guardado}`}</p>
    </div>
  )
}

// 2) `ContadorConAviso` — un botón "Sumar" que sube el número y, además, deja un
//    aviso con el valor YA ACTUALIZADO: tras el primer click el aviso dice
//    "Ahora vale 1". Hay un <p> para el número y otro para el aviso.
//    El starter compone el aviso leyendo el estado después de llamar al setter.
//    Compila sin una queja, y el aviso va siempre un paso por detrás.
//    Lo que necesitas ya lo has calculado una línea antes.
export function ContadorConAviso() {
  const [n, setN] = useState(0)
  const [aviso, setAviso] = useState("")

  const sumar = () => {
    setN(n + 1)
    setAviso(`Ahora vale ${n}`)
  }

  return (
    <div>
      <p>{n}</p>
      <p>{aviso}</p>
      <button onClick={sumar}>Sumar</button>
    </div>
  )
}


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — la FORMA FUNCIONAL del setter
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Al setter puedes entregarle dos cosas distintas: el valor nuevo, o una
 *   FUNCIÓN que recibe el valor más reciente y retorna el siguiente. La segunda
 *   forma existe porque React agrupa varias actualizaciones en un mismo render:
 *   si las dos leen la misma constante, la segunda pisa a la primera.
 *
 * SINTAXIS
 *     setN(n + 1)                      // le entregas un VALOR ya calculado
 *     setN((anterior) => anterior + 1)  // le entregas una FUNCIÓN. La llama él
 *
 * EJEMPLO — dos llamadas seguidas, con `n` valiendo 0:
 *     setN(n + 1); setN(n + 1)                    // las dos calculan 1  → n = 1
 *     setN(a => a + 1); setN(a => a + 1)          // 0→1, luego 1→2      → n = 2
 *
 * 🧠 ANALOGÍA (de apoyo) — la cola del banco. Pasar un valor es traer el saldo
 *    apuntado en un papel de esta mañana: si dos personas traen el mismo papel,
 *    la segunda deshace lo de la primera. Pasar una función es decir "súmale uno
 *    a lo que haya cuando me toque": entonces el orden ya no te puede traicionar.
 *
 * 🗣️ LAS PIEZAS
 *     (anterior) => anterior + 1  → la función ACTUALIZADORA
 *     anterior                    → su parámetro. Lo rellena React, no tú
 *
 *   Es el mismo gesto del bloque 10: entregas una función y la llama otro. Aquí
 *   ese otro es React, y el argumento que te pone es el estado más reciente.
 *
 * ⚠️ TRAMPA — la regla NO es "usa siempre la funcional". Es: **si el próximo
 *    valor depende del anterior, funcional; si no, el valor directo**. Poner la
 *    funcional donde no hace falta no rompe nada, pero escribir `setN(n + 1)`
 *    donde sí hacía falta tampoco rompe nada — y ahí está el problema.
 * ───────────────────────────────────────────────────────────────────────────── */

// 3) `ContadorDoble` — un botón "Sumar 2" que sube el contador de dos en dos,
//    obligatoriamente con DOS llamadas al setter, no con una sola de `+ 2`.
//    Un <p> con el número.
//    El starter ya llama dos veces y aun así sube de uno en uno.
export function ContadorDoble() {
  const [n, setN] = useState(0)

  const sumarDos = () => {
    setN(n + 1)
    setN(n + 1)
  }

  return (
    <div>
      <p>{n}</p>
      <button onClick={sumarDos}>Sumar 2</button>
    </div>
  )
}

// 4) `RegistroDoble` — un botón "Registrar 2" que mete DOS entradas de una vez,
//    con dos llamadas al setter. Tras un solo click tienen que verse "Click 1" y
//    "Click 2"; tras dos clicks, cuatro entradas.
//    El drill 3 con el mismo defecto, pero sobre un array: aquí no se pierde un
//    número, se pierde una entrada entera.
export function RegistroDoble() {
  const [clicks, setClicks] = useState<string[]>([])

  const registrarDos = () => {
    setClicks([...clicks, `Click ${clicks.length + 1}`])
    setClicks([...clicks, `Click ${clicks.length + 1}`])
  }

  return (
    <div>
      <button onClick={registrarDos}>Registrar 2</button>
      <ul>
        {clicks.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  )
}

// 5) `ContadorConTope` — un botón "Sumar 2" que sube de dos en dos, con dos
//    llamadas al setter, pero que NUNCA pasa de 3. O sea: primer click → 2,
//    segundo click → 3, y de ahí no se mueve.
//    Aquí no basta con cambiar la forma de las llamadas: el tope también tiene
//    que decidirse con el valor que llega, no con el de este render. Piensa dónde
//    cabe ese `if` cuando lo que entregas ya no es un número.
export function ContadorConTope() {
  const [n, setN] = useState(0)

  const sumarDos = () => {
    setN(n >= 3 ? n : n + 1)
    setN(n >= 3 ? n : n + 1)
  }

  return (
    <div>
      <p>{n}</p>
      <button onClick={sumarDos}>Sumar 2</button>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Con el 01 y el 02 cerrados tienes el par entero: de dónde sale el tipo del
 * estado, y qué hace de verdad la función que lo cambia. `useReducer`, que da
 * nombre a la carpeta, es el paso siguiente — y solo tiene sentido cuando estos
 * dos ya no te sorprenden.
 * ───────────────────────────────────────────────────────────────────────────── */
