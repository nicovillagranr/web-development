import { useReducer, useState } from "react";

/* =============================================================================
 * EJERCICIO 03b — no toques lo que te llega: la hoja y la taquilla   ·  refuerzo del 03
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 *   · predecir qué cambios de una copia hecha con spread llegan al original
 *   · devolver un estado nuevo copiando solo los niveles que cambias
 *   · reconocer en pantalla los dos síntomas de mutar: no repinta, o pinta doble
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * Cerraste los drills 4 y 5 del `03`, pero no sabías decir por qué el
 * `{ ...estado }` no protegía al historial. Aquí se sube ese escalón de uno en
 * uno: primero predecir, luego escribir, y al final verlo en la pantalla.
 *
 * 🗺️ MAPA DEL ARCHIVO
 *   TEORÍA 1 · la hoja y la taquilla        →  drills 1, 2, 3
 *   TEORÍA 2 · copiar hasta donde toques    →  drills 4 a 8
 *   TEORÍA 3 · React solo mira la llave     →  drills 9, 10
 *
 * ▸ EJERCICIO — 10 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/11-useState-useReducer/exercise-03b.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito, y los diez compilan: aquí el
 *   typecheck no te va a avisar de nada, solo el test.
 *   ¿Atascado? Las pistas están en `exercise-03b.pistas.md`, de una en una.
 *
 * 👁️ Los drills 9 y 10 están montados en `src/App.tsx`.
 * ===========================================================================*/

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — la hoja y la taquilla
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   El spread hace una COPIA SUPERFICIAL: crea un objeto nuevo con las mismas
 *   propiedades, pero si una propiedad es un array u objeto, copia la
 *   referencia, no su contenido.
 *
 * SINTAXIS
 *     const b = { ...a }        // b !== a, pero b.gustos === a.gustos
 *
 * EJEMPLO
 *     const a = { edad: 30, notas: [1] }
 *     const b = { ...a }
 *     b.edad = 99            →  a.edad sigue en 30
 *     b.notas.push(2)        →  a.notas ahora es [1, 2]
 *
 * 🧠 ANALOGÍA — `a` es una hoja. Los números, textos y booleanos van escritos
 *    en ella. Un array u objeto no: en la hoja hay una LLAVE de la taquilla
 *    donde vive. El spread fotocopia la hoja, y la fotocopia trae otra llave
 *    de la MISMA taquilla.
 *
 * 🗣️ LAS PIEZAS
 *     copia superficial → copia la hoja, no lo que hay en las taquillas
 *     referencia        → la llave: dos variables con la misma, la misma taquilla
 *
 * ⚠️ TRAMPA — pensar que la copia arrastra TODO al original, o NADA. Depende
 *    de si escribes en tu hoja o abres una taquilla.
 * ───────────────────────────────────────────────────────────────────────────── */

// 📌 Los tres drills parten de lo mismo:
//     const a = { nombre: "Nico", gustos: ["TS"], direccion: { ciudad: "Santiago" } };
//     const b = { ...a };
// Cada uno es un caso aparte: parte siempre de este `a` recién creado.
// Escribe el valor que tendrá, y debajo, en una frase, por qué.

// 1) Se hace `b.nombre = "Otro"`. ¿Qué vale `a.nombre`?
export const respuesta1: string = "Nico";
// ¿Por qué? Porque `nombre` es un string, y al hacer `b.nombre = "Otro"` se cambia la propiedad `nombre` de la copia `b`, pero no afecta a la propiedad `nombre` del objeto original `a`, que sigue siendo "Nico".

// 2) Se hace `b.gustos = ["Nada"]`. ¿Qué vale `a.gustos`?
export const respuesta2: string[] = ["TS"];
// ¿Por qué? Porque `gustos` es un array, y al hacer `b.gustos = ["Nada"]`, se asigna un nuevo array a la propiedad `gustos` de la copia `b`. Esto no afecta al array original en `a`, que sigue siendo `["TS"]`. La referencia del array en `a` permanece intacta.

// 3) Se hace `b.direccion.ciudad = "Lima"`. ¿Qué vale `a.direccion.ciudad`?
export const respuesta3: string = "Lima";
// ¿Por qué? Porque `direccion` es un objeto, y al hacer `b.direccion.ciudad = "Lima"`, se modifica la propiedad `ciudad` del objeto `direccion` que es compartido entre `a` y `b`. Ambos objetos apuntan a la misma referencia de `direccion`, por lo que el cambio se refleja en ambos, dejando `a.direccion.ciudad` como "Lima".
// En objeto anidados, un spread crea una copia superficial, pero las propiedades que son objetos siguen compartiendo la misma referencia. Por eso, al modificar `ciudad` a través de `b`, también se ve reflejado en `a`.

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — copiar hasta donde toques
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Para cambiar algo sin tocar el original, se crea una copia de cada nivel
 *   que vas a modificar, desde el de fuera hasta el dato. Los niveles que no
 *   tocas se pueden compartir tranquilamente.
 *
 * SINTAXIS
 *     { ...estado, contador: 5 }            // nivel 1 nuevo
 *     [...lista, "x"]  ·  lista.filter(…)   // array nuevo
 *     lista.map(…)                          // array nuevo, elemento a elemento
 *
 * EJEMPLO
 *     const antes = { puntos: 1, tags: ["a"] }
 *     const despues = { ...antes, tags: [...antes.tags, "b"] }
 *     antes.tags    →  ["a"]         despues.tags  →  ["a", "b"]
 *
 * 🧠 ANALOGÍA — el extracto del banco del `03`: no tachas el saldo viejo, sacas
 *    una línea nueva. Y si la línea lleva una taquilla, esa taquilla también
 *    tiene que ser nueva.
 *
 * ⚠️ TRAMPA — `push`, `pop`, `splice` y `=` sobre algo que llegó por
 *    parámetro. El spread de fuera no te salva de lo que haces dentro.
 * ───────────────────────────────────────────────────────────────────────────── */

// 📌 Ejemplo de estado: { contador: 3, historial: ["sumar", "reiniciar"] }
export type EstadoPanel = {
  contador: number;
  historial: string[];
};

// 4) `subirContador` — Devuelve un nuevo panel con el contador incrementado en uno.
// El objeto recibido como argumento no se modifica (inmutabilidad).
export function subirContador(estado: EstadoPanel): EstadoPanel {
  return { ...estado, contador: estado.contador + 1 };
}
// Ejemplos de uso correctos:
// subirContador({ contador: 3, historial: [] }) -> { contador: 4, historial: [] }
// subirContador({ contador: 3, historial: ["a"] }) -> { contador: 4, historial: ["a"] }

// 5) `anotar` — devuelve el panel con `entrada` añadida al final del historial.
//    El starter ya hace una copia, y aun así el original sale tocado.
export function anotar(estado: EstadoPanel, entrada: string): EstadoPanel {
  return { ...estado, historial: [...estado.historial, entrada] };
}
// anotar({ contador: 0, historial: ["a"] }, "b") -> { contador: 0, historial: ["a", "b"] }

// 6) `borrarEntrada` — devuelve el panel sin la entrada del historial que está
//    en la posición `indice`. El resto, en el mismo orden.
export function borrarEntrada(estado: EstadoPanel, indice: number): EstadoPanel {
  // En el filter el _ es un parámetro que para esta ocasión no nos interesa, y el i es el índice del elemento en el array. Si el índice del elemento es distinto al que queremos borrar, lo incluimos en el nuevo array.
  // filter devuelve un array nuevo, así que el historial que entra no se toca (splice, en cambio, lo modificaría).
  return { ...estado, historial: estado.historial.filter((_, i) => i !== indice) };
}
// borrarEntrada({ contador: 0, historial: ["a", "b", "c"] }, 1) -> historial ["a", "c"]

// 📌 Un perfil con un objeto dentro:  { nombre: "Ana", direccion: { ciudad: "Santiago" } }
export type Perfil = { nombre: string; direccion: { ciudad: string } };

// 7) `mudarse` — devuelve el perfil con la ciudad cambiada. Aquí la taquilla
//    no es un array, es un objeto.
export function mudarse(perfil: Perfil, ciudad: string): Perfil {
  // 1. Se crea un objeto nuevo
  // 2. Se copia todo lo que hay en perfil
  // 3. Se reemplaza la propiedad direccion por un objeto nuevo
  // 4. Se copia todo lo que hay en perfil.direccion
  // 5. Se reemplaza la propiedad ciudad por el nuevo valor
  return { ...perfil, direccion: { ...perfil.direccion, ciudad: ciudad } };
}
// mudarse({ nombre: "Ana", direccion: { ciudad: "Santiago" } }, "Lima") -> { nombre: "Ana", direccion: { ciudad: "Lima" } }

// 📌 Una lista de tareas: [{ id: 1, texto: "pan", hecha: false }, …]
export type Tarea = {
  id: number;
  texto: string;
  hecha: boolean;
};

// 8) `alternarTarea` — devuelve la lista con la tarea de ese `id` cambiada de
// hecha a pendiente o al revés. Las demás quedan igual.
export function alternarTarea(tareas: Tarea[], id: number): Tarea[] {
  // 1. Se recorre y transforma el array usando .map()
  // 2. Se evalúa si el id de la tarea actual coincide con el id recibido por argumento
  // 3. SI COINCIDE (parte antes de los :): Se crea un objeto nuevo invirtiendo 'hecha'
  // 4. SI NO COINCIDE (el ": tarea" del final): Actúa como un 'else'. Devuelve la
  //    tarea original intacta para que no se borre ni se convierta en undefined.
  return tareas.map((tarea) => (tarea.id === id ? { ...tarea, hecha: !tarea.hecha } : tarea));
}

// alternarTarea([{ id: 1, texto: "pan", hecha: false }], 1) -> [{ id: 1, …, hecha: true }]

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — React solo mira la llave
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Para decidir si repinta, React compara el estado nuevo con el anterior por
 *   referencia. Si le das la misma, no mira dentro: da por hecho que no cambió.
 *
 * EJEMPLO
 *     lista.push("x"); setLista(lista)     // misma llave → no repinta
 *     setLista([...lista, "x"])            // llave nueva → repinta
 *
 * 🧠 ANALOGÍA — el conserje no abre tu taquilla para ver si hay algo nuevo:
 *    mira si le traes otra llave.
 *
 * ⚠️ TRAMPA — el `<StrictMode>` de `main.tsx` llama DOS veces a tu reducer en
 *    desarrollo, justo para cazar esto. Un reducer que no toca lo que le llega
 *    da lo mismo las dos veces; uno que lo toca, deja rastro doble.
 * ───────────────────────────────────────────────────────────────────────────── */

// 9) `ListaCompra` — una lista <ul> que empieza con "pan" y un botón
//    "Añadir leche" que añade "leche" al final cada vez que se pulsa.
export function ListaCompra() {
  // Seteamos la lista inicial con "pan" y usamos useState para manejar el estado de la lista.
  const [lista, setLista] = useState(["pan"]);

  const agregar = () => {
    // Para agregar algo a la lista:
    // 1. Se crea un array nuevo
    // 2. Con spread copiamos todo lo que había previamente en la lista
    // 3. Se añade el nuevo elemento al final del array
    setLista([...lista, "leche"]);
  };

  return (
    <div>
      <ul>
        {lista.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <button onClick={agregar}>Añadir leche</button>
    </div>
  );
}
// <ListaCompra />

// 10) `notasReducer` y `PanelNotas` — cada click en "Anotar" añade UNA "nota"
//     a la lista. El componente está bien; el defecto está en el reducer.
//     El test lo monta dentro de <StrictMode>, igual que tu `main.tsx`.
type EstadoNotas = { notas: string[] };

export function notasReducer(estado: EstadoNotas, accion: { texto: string }): EstadoNotas {
  // 1. Se crea un objeto EstadoNotas nuevo
  // 2. Se copia todo lo que había en el objeto
  // 3 Se reemplaza la propiedad notas por un array nuevo
  // 4. Se copia todo lo que había previamente en el array notas
  // 5. Se añade el nuevo elemento al final del array
  return { ...estado, notas: [...estado.notas, accion.texto] };
}
// notasReducer({ notas: ["a"] }, { texto: "b" }) -> { notas: ["a", "b"] }
// notasReducer({ notas: [] }, { texto: "nota" }) -> { notas: ["nota"] }
// notasReducer({ notas: ["nota"] }, { texto: "nota" }) -> { notas: ["nota", "nota"] }

export function PanelNotas() {
  // useReducer recibe:
  // 1. notasReducer → función que determina cómo cambiar el estado.
  // 2. { notas: [] } → estado inicial.
  //
  // Devuelve:
  // 1. estado → estado actual.
  // 2. pedir → función que envía acciones al reducer.
  //
  // Cada vez que pedir recibe una acción, React ejecuta
  // notasReducer(estadoActual, accion) y guarda el estado que devuelve.
  const [estado, pedir] = useReducer(notasReducer, { notas: [] });

  return (
    <div>
      <button onClick={() => pedir({ texto: "nota" })}>Anotar</button>
      <ul>
        {estado.notas.map((nota, i) => (
          <li key={i}>{nota}</li>
        ))}
      </ul>
    </div>
  );
}
// <PanelNotas />
