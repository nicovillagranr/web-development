import { useReducer } from "react";

/* =============================================================================
 * EJERCICIO 03c — la cadena de `useReducer`: tipos, reducer y pedir   ·  refuerzo del 03
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 *   · escribir la lista de acciones que acepta un reducer, con sus datos
 *   · escribir y probar un reducer suelto, sin React
 *   · decir quién llama al reducer y qué pasa con lo que devuelve
 *   · añadir una acción nueva siguiendo la cadena de punta a punta
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * `useReducer` son tres piezas encadenadas, y cuando una se ve turbia las otras
 * dos también. Aquí se sube cada eslabón por separado: primero el papel, luego el
 * cajero y al final quién le entrega el papel. El último drill las junta.
 *
 * 🗺️ MAPA DEL ARCHIVO
 *   TEORÍA 1 · ① los tipos: qué papeles existen     →  drills 1, 2, 3
 *   TEORÍA 2 · ② el reducer: el cajero, sin React   →  drills 4, 5, 6
 *   TEORÍA 3 · ③ pedir: quién entrega el papel      →  drills 7, 8, 9
 *
 * ▸ EJERCICIO — 9 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/11-useState-useReducer/exercise-03c.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito. 1 de los 9 pasa el test con el
 *   fallo dentro: corre siempre los dos comandos.
 *   ¿Atascado? Las pistas están en `exercise-03c.pistas.md`, de una en una.
 *
 * 👁️ Los drills 7, 8 y 9 están montados en `src/App.tsx`.
 * ===========================================================================*/

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — ① los tipos: qué papeles existen
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   El tipo de la acción es la lista CERRADA de pedidos que acepta el reducer:
 *   una unión discriminada, como en el `08`. Cada variante lleva su `tipo`, y
 *   las que necesitan un dato lo llevan en una propiedad propia, que solo existe
 *   en esa variante.
 *
 * SINTAXIS
 *     type Accion = { tipo: "encender" } | { tipo: "brillo"; nivel: number }
 *                   └── sin datos ────┘   └──── con su dato ────────────┘
 *
 * EJEMPLO
 *     const a: Accion = { tipo: "encender" }            // ✅
 *     const b: Accion = { tipo: "brillo", nivel: 80 }   // ✅
 *
 * 🧠 ANALOGÍA — en el banco hay un formulario por trámite. El de depósito tiene
 *    una casilla para el monto y el de consulta de saldo no. Si inventas un
 *    trámite, el cajero no lo acepta.
 *
 * 🗣️ LAS PIEZAS
 *     acción      → el papel: un objeto con su `tipo`
 *     `tipo`      → la etiqueta que dice qué papel es (el discriminante)
 *
 * ⚠️ TRAMPA — el texto suelto `"encender"` no es una acción: es solo la etiqueta.
 *    El papel es el objeto entero, `{ tipo: "encender" }`.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) `AccionVolumen` — los pedidos de un altavoz: subir uno, bajar uno, y fijar
//    el volumen en un número concreto. "fijar" tiene que llevar ese número en una
//    propiedad `valor`. La constante `pruebaFijar` no se toca: cuando el tipo
//    esté bien, deja de dar error.
export type AccionVolumen =
  { tipo: "subir" } | { tipo: "bajar" } | { tipo: "silenciar" } | { tipo: "fijar"; valor: number };

export const pruebaFijar: AccionVolumen = { tipo: "fijar", valor: 5 };

// 2) Con el `AccionVolumen` ya arreglado, ¿cuáles de estos cuatro son acciones
//    válidas? Un `true` o `false` por cada uno, en el mismo orden:
//       { tipo: "subir" }  ·  "subir"  ·  { tipo: "fijar" }  ·  { tipo: "subir", valor: 3 }
export const respuesta2: boolean[] = [true, false, false, false];
// ¿Por qué?
// 1. El tipo accion Volumen ya está definido correctamente, por lo que { tipo: "subir" } es una acción válida.
// 2. "subir" es solo un string, no un objeto con la propiedad tipo, por lo que no es una acción válida.
// 3. { tipo: "fijar" } no tiene la propiedad valor, por lo que no es una acción válida.
// 4. { tipo: "subir", valor: 3 } tiene una propiedad valor que no es necesaria para la acción subir, por lo que no es una acción válida.

// 3) Una función recibe `accion: AccionVolumen` y, sin ningún `if` ni `switch`
//    antes, hace `return accion.valor`. ¿Compila?
export const respuesta3: boolean = false;
// ¿Por qué? Para las acciones "subir" y "bajar", no existe la propiedad `valor`, por lo que TypeScript marcará un error de compilación al intentar acceder a `accion.valor` sin verificar el tipo de acción primero.

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — ② el reducer: el cajero, sin React
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   El reducer es una función pura `(estado, accion) => estadoNuevo`, con un
 *   `case` por cada variante. No recuerda nada: todo lo que sabe le llega por
 *   parámetro. Y no depende de React, así que se prueba llamándola a mano.
 *
 * SINTAXIS
 *     function reducer(estado: number, accion: Accion): number {
 *       switch (accion.tipo) {
 *         case "encender": return …          // un case por papel
 *         case "brillo":   return accion.nivel   // aquí ya existe `nivel`
 *       }
 *     }
 *
 * EJEMPLO
 *     reducer(0, { tipo: "brillo", nivel: 80 })   →  80
 *
 * 🧠 ANALOGÍA — el cajero: recibe el saldo que le das y el papel, y te devuelve
 *    el saldo nuevo. No tiene libreta propia; el saldo siempre se lo traen.
 *
 * 🗣️ LAS PIEZAS
 *     reducer   → se llama así por `Array.reduce`: junta muchas acciones, una tras
 *                 otra, en un solo estado final
 *
 * ⚠️ TRAMPA — tratar cada llamada como si empezara de cero. Lo que devuelve una
 *    llamada es el `estado` con el que empieza la siguiente.
 * ───────────────────────────────────────────────────────────────────────────── */

// 4) `volumenReducer` — "subir" suma uno, "bajar" resta uno y "fijar" deja el
//    volumen en el `valor` que trae el papel. Hoy dos de los tres se equivocan.
export function volumenReducer(estado: number, accion: AccionVolumen): number {
  switch (accion.tipo) {
    case "subir":
      if (estado < 10) {
        return estado + 1;
      } else {
        return 10;
      }
    case "bajar":
      if (estado > 0) {
        return estado - 1;
      } else {
        return 0;
      }
    case "silenciar":
      return 0;

    case "fijar":
      return accion.valor;
    default: {
      const exhaustivo: never = accion;
      return exhaustivo;
    }
  }
}
// volumenReducer(5, { tipo: "subir" }) -> 6
// volumenReducer(5, { tipo: "bajar" }) -> 4
// volumenReducer(1, pruebaFijar) -> 5

// 5) Sobre la misma función del drill 4: el altavoz va de 0 a 10. "subir" en 10
//    se queda en 10, y "bajar" en 0 se queda en 0.
// volumenReducer(10, { tipo: "subir" }) -> 10
// volumenReducer(0, { tipo: "bajar" }) -> 0

// 6) Con el reducer del 5 ya terminado: el volumen empieza en 3 y le llegan, en
//    este orden, subir · subir · fijar 9 · subir · subir. ¿En cuánto queda?
export const respuesta6: number = 10;
// ¿Por qué? Quedará en 10, porque el volumen máximo es 10. La secuencia de acciones sería: 3 -> 4 (subir) -> 5 (subir) -> 9 (fijar) -> 10 (subir, pero se queda en 10) -> 10 (subir, pero se queda en 10). Por lo tanto, el resultado final es 10.

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — ③ pedir: quién entrega el papel
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   `useReducer(reducer, inicial)` devuelve una tupla: el estado de este render y
 *   la función para pedir un cambio. Tú le entregas un papel a `pedir`; React
 *   llama al reducer con el estado que tiene guardado, guarda lo que devuelve y
 *   repinta.
 *
 * SINTAXIS
 *     const [volumen, pedir] = useReducer(volumenReducer, 5)
 *     pedir({ tipo: "subir" })
 *       → React hace  volumenReducer(5, { tipo: "subir" })  → guarda 6 → repinta
 *
 * 🧠 ANALOGÍA — tú haces la fila y entregas el papel en ventanilla. No te metes
 *    detrás del mostrador a sacar la cuenta tú.
 *
 * 🗣️ LAS PIEZAS
 *     pedir   → el nombre lo eliges tú, porque es una tupla. En código ajeno y en
 *               la documentación lo vas a leer como `dispatch`: es lo mismo
 *
 * ⚠️ TRAMPA — llamar tú al reducer desde el botón. Compila, hace la cuenta bien y
 *    el resultado se tira: nadie lo guarda, así que la pantalla no cambia.
 * ───────────────────────────────────────────────────────────────────────────── */

// 7) `Altavoz` — "Volumen: 5" y dos botones, "Subir" y "Bajar", que mueven el
//    número con `volumenReducer`.
export function Altavoz() {
  // `useReducer` recibe:
  // 1.º → la función reducer que React usará: `volumenReducer`
  // 2.º → el estado inicial: `5`
  //
  // OJO: aquí `volumenReducer` todavía NO se está ejecutando.
  // Le estamos diciendo a React:
  // "Usa esta función para administrar un estado que comienza en 5".
  //
  // Por eso el orden es:
  // `useReducer(reducer, estadoInicial)`
  //
  // Más adelante, cuando llamemos a `pedir`, React ejecutará el reducer
  // con este orden:
  // `volumenReducer(estadoActual, accion)`
  //
  // Ejemplo:
  // pedir({ tipo: "subir" })
  // → React ejecuta `volumenReducer(5, { tipo: "subir" })`
  // → devuelve 6
  // → React guarda 6 y vuelve a renderizar.
  const [volumen, pedir] = useReducer(volumenReducer, 5);
  return (
    <div>
      <p>Volumen: {volumen}</p>

      <button onClick={() => pedir({ tipo: "subir" })}>Subir</button>

      <button onClick={() => pedir({ tipo: "bajar" })}>Bajar</button>
    </div>
  );
}
// La diferencia clave:
//
// `useReducer(volumenReducer, 5)`
//              ↑             ↑
//           función      estado inicial
//
// `volumenReducer(5, { tipo: "subir" })`
//                  ↑       ↑
//                estado   acción
// <Altavoz />

// 8) `AltavozConPreset` — empieza en 3, y el botón "Al 7" deja el volumen en 7.
//    Hoy pulsas y la pantalla no se mueve.
export function AltavozConPreset() {
  const [volumen, pedir] = useReducer(volumenReducer, 3);
  return (
    <div>
      <p>Volumen: {volumen}</p>
      <button onClick={() => pedir({ tipo: "fijar", valor: 7 })}>Al 7</button>
    </div>
  );
}
// <AltavozConPreset />

// 9) `AltavozCompleto` — el de siempre, más un botón "Silencio" que deja el
//    volumen en 0. El botón ya está escrito y pide `silenciar`, que todavía no
//    existe en ninguna parte. Añádela a la cadena: empieza por el error de
//    `pnpm typecheck` y síguelo hacia atrás.
export function AltavozCompleto() {
  const [volumen, pedir] = useReducer(volumenReducer, 5);
  return (
    <div>
      <p>Volumen: {volumen}</p>
      <button onClick={() => pedir({ tipo: "subir" })}>Subir</button>
      <button onClick={() => pedir({ tipo: "bajar" })}>Bajar</button>
      <button onClick={() => pedir({ tipo: "silenciar" })}>Silencio</button>
    </div>
  );
}
// <AltavozCompleto />
