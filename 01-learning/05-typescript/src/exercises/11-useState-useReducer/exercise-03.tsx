import { useReducer } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — esto lo escribiste en el `08-discriminated-unions/exercise-07`:
 *
 *     type Accion =
 *       | { tipo: "incrementar" }
 *       | { tipo: "sumar"; cantidad: number }
 *
 *     function aplicar(estado: number, accion: Accion): number {
 *       switch (accion.tipo) { … default: { const _: never = accion; return _ } }
 *     }
 *
 * Aquel archivo terminaba diciendo que lo reusarías tal cual en el bloque 11.
 * Esto es el bloque 11: el reducer no cambia, solo se enchufa.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 03 — `useReducer`: el reducer que ya sabes, enchufado   ·  3/3 del bloque
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · nombrar las cuatro piezas de `useReducer` y decir cuál escribe React
 *   · despachar una acción con datos y otra sin ellos
 *   · decir por qué un reducer no puede tocar el estado que recibe
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * El `01` y el `02` fueron `useState`: un valor y su setter. Cuando los cambios
 * dejan de ser "pon esto" y pasan a ser "ha ocurrido esto, recalcula", el setter
 * se queda corto. Lo que falta no es un hook nuevo: es el reducer que ya
 * escribiste en el `08`, con React llamándolo por ti.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 *   TEORÍA 1 · las piezas y quién llama a quién   →  drills 1, 2
 *   TEORÍA 2 · acciones con datos y estado objeto →  drills 3, 4, 5
 *
 * ▸ EJERCICIO — 5 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/11-useState-useReducer/exercise-03.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito y los cinco caen en el test. Tres
 *   además no compilan: esos te los dice `pnpm typecheck` antes de correr nada.
 *   ¿Atascado? Las pistas están en `exercise-03.pistas.md`, de una en una.
 *
 * 👁️ Los componentes están montados en `src/App.tsx`: aquí el fallo se ve pulsando.
 * ===========================================================================*/

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — las cuatro piezas, y quién llama a cada una
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   `useReducer` recibe DOS cosas —el reducer y el estado inicial— y devuelve un
 *   par: el estado de este render y `dispatch`. Tú nunca llamas al reducer: le
 *   entregas una acción a `dispatch` y React se encarga de llamarlo con el
 *   estado más reciente.
 *
 * SINTAXIS
 *     const [estado, dispatch] = useReducer(contarReducer, 0)
 *            ▲        ▲                      ▲              ▲
 *            │        │                      │              └─ estado inicial
 *            │        │                      └─ la función que TÚ escribes
 *            │        └─ con esto pides un cambio: dispatch({ tipo: "incrementar" })
 *            └─ el estado de ESTE render, igual que con useState
 *
 * EJEMPLO — el mismo gesto que ya conoces, con otro nombre:
 *     setNumero((anterior) => anterior + 1)   // useState: entregas la regla
 *     dispatch({ tipo: "incrementar" })       // useReducer: entregas QUÉ pasó
 *
 * 🧠 ANALOGÍA (de apoyo) — el cajero automático del `08`. El saldo es el estado,
 *    y tú no metes la mano: pulsas una opción del menú. `dispatch` es pulsar la
 *    opción; el cajero (el reducer) es quien calcula el saldo nuevo.
 *
 * 🗣️ LAS PIEZAS
 *     reducer    → `(estado, accion) => estadoNuevo`. La escribes tú, la llama React
 *     dispatch   → la función que recibes. Le entregas una acción, no un valor
 *     acción     → un objeto con su `tipo`. Es una unión discriminada del `08`
 *     estado     → el de este render. Constante, igual que en useState
 *
 * ⚠️ TRAMPA — `dispatch("incrementar")` con el texto suelto. La acción es un
 *    OBJETO con la propiedad `tipo`; el texto solo es su etiqueta. Es la
 *    diferencia entre pulsar el botón y gritarle el nombre al cajero.
 * ───────────────────────────────────────────────────────────────────────────── */

export type Accion =
  { tipo: "incrementar" } | { tipo: "reiniciar" } | { tipo: "sumar"; cantidad: number };

// El reducer del drill 1 viene dado, para que ahí solo tengas que enchufarlo.
function reducerDado(estado: number, accion: Accion): number {
  switch (accion.tipo) {
    case "incrementar":
      return estado + 1;
    case "reiniciar":
      return 0;
    case "sumar":
      return estado + accion.cantidad;
    default: {
      return 0;
    }
  }
}

// 1) `ContadorConReducer` — un <p> con el número y dos botones, "Sumar" y
//    "Reiniciar". El reducer ya está escrito arriba y no se toca.
export function ContadorConReducer() {
  // 0 es el estado inicial.
  // reducerDado contiene la lógica para calcular el nuevo estado
  // cada vez que despachamos una acción.
  const [numero, despachar] = useReducer(reducerDado, 0);

  return (
    <div>
      <p>{numero}</p>
      <button onClick={() => despachar({ tipo: "incrementar" })}>Sumar</button>
      <button onClick={() => despachar({ tipo: "reiniciar" })}>Reiniciar</button>
    </div>
  );
}
// <ContadorConReducer />

// 2) `contarReducer` — ahora el reducer lo escribes tú, y es una función pura:
//    no toca nada de fuera y devuelve el estado siguiente. `incrementar` sube
//    uno, `reiniciar` vuelve a cero y `sumar` añade lo que traiga la acción.
//    Ciérralo con el `default` exhaustivo del `08`.
export function contarReducer(estado: number, accion: Accion): number {
  switch (accion.tipo) {
    case "incrementar":
      return estado + 1;
    case "reiniciar":
      return 0;
    case "sumar":
      return estado + accion.cantidad;
    default: {
      const _exhaustivo: never = accion;
      return _exhaustivo;
    }
  }
}
// contarReducer(5, { tipo: "incrementar" }) -> 6
// contarReducer(5, { tipo: "sumar", cantidad: 3 }) -> 8
// contarReducer(5, { tipo: "reiniciar" }) -> 0

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — acciones que traen datos, y estado que es un objeto
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Una acción puede llevar datos además de su `tipo`, y solo existen dentro de
 *   su `case`. Y el estado puede ser un objeto: entonces el reducer devuelve uno
 *   NUEVO en cada transición, nunca el mismo retocado.
 *
 * SINTAXIS
 *     dispatch({ tipo: "sumar", cantidad: 3 })
 *                              └── el dato viaja CON la acción ──┘
 *
 *     case "sumar": return estado + accion.cantidad
 *                                   └─ `cantidad` solo existe en este case
 *
 * EJEMPLO — devolver uno nuevo, no retocar el que llega:
 *     return { ...estado, contador: estado.contador + 1 }   // ✅
 *     estado.contador += 1; return estado                   // ❌ misma referencia
 *
 * 🧠 ANALOGÍA (de apoyo) — el extracto del banco. Cada movimiento genera una
 *    línea nueva; no se tacha el saldo anterior. El reducer hace eso: produce el
 *    estado siguiente y deja el anterior intacto.
 *
 * 🗣️ LAS PIEZAS
 *     `{ tipo: "sumar"; cantidad: number }` → una acción CON datos
 *     `accion.cantidad`                     → solo accesible tras estrechar por `tipo`
 *     función pura                          → mismo argumento, mismo resultado, sin efectos
 *
 * ⚠️ TRAMPA — la de siempre con un array dentro del estado: `historial.push(...)`
 *    devuelve un número y muta la lista. React recibe la misma referencia y no
 *    repinta. Es el `ListaTareas` del `exercise-01`, ahora dentro de un reducer.
 * ───────────────────────────────────────────────────────────────────────────── */

// 3) `ContadorConPaso` — un <p> con el número y un botón "Sumar 5" que sube de
//    cinco en cinco. Usa `contarReducer`, el del drill 2, sin tocarlo.
export function ContadorConPaso() {
  const [numero, despachar] = useReducer(contarReducer, 0);

  return (
    <div>
      <p>{numero}</p>
      {/* Al onClick le pasamos la acción compuesta por: el tipo y la cantidad */}
      {/* El estado inicial que es 0 lo pone react */}
      {/* tú escribes:   dispatch({ tipo: "sumar", cantidad: 5 })
                          └──────────── esto ────────────┘
                                                          ↓
React hace:    contarReducer( 0 , { tipo: "sumar", cantidad: 5 })
                              ▲                  ▲
                              │                  └─ lo pusiste tú
                              └─ lo pone React: el estado más reciente */}
      <button onClick={() => despachar({ tipo: "sumar", cantidad: 5 })}>Sumar 5</button>
    </div>
  );
}
// <ContadorConPaso />

// 📌 El estado de los dos últimos drills: un número y la lista de lo que pasó.
export type EstadoPanel = { contador: number; historial: string[] };

// 4) `panelReducer` — el mismo contador, pero el estado es un objeto y además
//    guarda el historial. Cada acción suma su etiqueta al final de la lista:
//    "incrementar", "reiniciar" o "sumar". `reiniciar` pone el contador a 0 y
//    conserva el historial.
export function panelReducer(estado: EstadoPanel, accion: Accion): EstadoPanel {
  // Creamos un nuevo historial agregando la acción actual sin mutar el original
  const nuevoHistorial = [...estado.historial, accion.tipo];

  switch (accion.tipo) {
    case "incrementar": // En el caso de que accion sea "incrementar", devolvemos un nuevo estado con el contador incrementado y el historial actualizado
      return {
        ...estado,
        contador: estado.contador + 1,
        historial: nuevoHistorial,
      };
    case "reiniciar": // En el caso de que accion sea "reiniciar", devolvemos un nuevo estado con el contador en 0 y el historial actualizado
      return {
        ...estado,
        contador: 0,
        historial: nuevoHistorial,
      };
    case "sumar": // En el caso de que accion sea "sumar", devolvemos un nuevo estado con el contador incrementado por la cantidad especificada en la acción y el historial actualizado
      return {
        ...estado,
        contador: estado.contador + accion.cantidad,
        historial: nuevoHistorial,
      };
    default: {
      const _exhaustivo: never = accion;
      return _exhaustivo;
    }
  }
}
// panelReducer({ contador: 0, historial: [] }, { tipo: "incrementar" })
//   -> { contador: 1, historial: ["incrementar"] }

// 5) `PanelConHistorial` — un <p> con el contador, un <li> por cada entrada del
//    historial y dos botones: "Sumar 2" y "Reiniciar". Usa `panelReducer`.
export function PanelConHistorial() {
  const [estado, dispatch] = useReducer(panelReducer, { contador: 0, historial: [] });

  return (
    <div>
      <p>{estado.contador}</p>
      <button onClick={() => dispatch({ tipo: "sumar", cantidad: 2 })}>Sumar 2</button>
      <button onClick={() => dispatch({ tipo: "reiniciar" })}>Reiniciar</button>
      <ul>
        {estado.historial.map((entrada, i) => (
          <li key={i}>{entrada}</li>
        ))}
      </ul>
    </div>
  );
}
// <PanelConHistorial />

/* ─────────────────────────────────────────────────────────────────────────────
 * Con esto el bloque 11 queda cerrado: el estado y su tipo, el setter y lo que no
 * te da, y el reducer cuando los cambios tienen reglas. Lo que has escrito aquí es
 * el `exercise-07` del `08` con un cable a React — el reducer nunca supo que
 * estaba en un componente, y esa es justo la gracia.
 * ───────────────────────────────────────────────────────────────────────────── */
