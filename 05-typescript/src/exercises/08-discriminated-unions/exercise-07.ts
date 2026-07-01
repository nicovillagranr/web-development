/* =============================================================================
 * EJERCICIO 07 — Uniones de acciones: el patrón `reducer`
 * =============================================================================
 *
 * ▸ EXPLICACIÓN — una DU que describe "qué pasó", y un switch que decide "y ahora qué"
 * ----------------------------------------------------------------------------
 * Hasta ahora la DU describía un ESTADO (en qué situación estoy). Ahora la usamos
 * para describir un EVENTO o ACCIÓN: algo que acaba de ocurrir y que debería
 * cambiar el estado. Cada acción es una variante, con su tag `tipo` y los datos
 * que necesite:
 *
 *   type Accion =
 *     | { tipo: "incrementar" }
 *     | { tipo: "sumar"; cantidad: number }   // esta sí lleva un dato extra
 *     | { tipo: "reiniciar" };
 *
 * Y un "reducer" es una función pura `(estadoActual, accion) => estadoNuevo` que
 * mira el `tipo` con un `switch` y devuelve el siguiente estado. El `default` con
 * `const _: never = accion` te garantiza que no olvidaste ninguna acción.
 *
 *   function aplicar(n: number, a: Accion): number {
 *     switch (a.tipo) {
 *       case "incrementar": return n + 1;
 *       case "sumar":       return n + a.cantidad;   // a.cantidad solo existe aquí
 *       case "reiniciar":   return 0;
 *       default: { const _: never = a; return _; }
 *     }
 *   }
 *
 * ⚠️ ESTE ES EL PATRÓN EXACTO de `useReducer` en React (FASE 2, exercise 11):
 * el estado nunca se muta, siempre devuelves uno nuevo, y cada `case` es una
 * regla de transición. Lo que entrenas aquí lo reusarás tal cual.
 *
 *
 * ▸ ANALOGÍA — el cajero automático
 * ----------------------------------------------------------------------------
 * Tu saldo es el estado. Cada operación es una acción: "ingresar 50", "sacar
 * 20", "consultar". El cajero (el reducer) lee QUÉ pediste y calcula el saldo
 * nuevo; no machaca el billete viejo, te da el saldo resultante. Acciones
 * desconocidas no existen: la ranura solo acepta las del menú (la unión cerrada).
 *
 *
 * ▸ EJERCICIO — drills en escalera. EN ORDEN. ❌ nada de `any` ni `as`.
 *     pnpm test:run src/exercises/08-discriminated-unions/exercise-07.test.ts
 * ===========================================================================*/

export type Accion =
  | { tipo: "incrementar" }
  | { tipo: "decrementar" }
  | { tipo: "sumar"; cantidad: number }
  | { tipo: "reiniciar" }


/* ── BLOQUE A — el reducer ─────────────────────────────────────────────────── */

// 1) `aplicar` — el reducer del contador. `switch (accion.tipo)` + `default` con
//    `const _exhaustivo: never = accion`:
//      "incrementar" → estado + 1
//      "decrementar" → estado - 1
//      "sumar"       → estado + accion.cantidad
//      "reiniciar"   → 0
//    aplicar(5, { tipo: "incrementar" }) → 6
//    aplicar(5, { tipo: "sumar", cantidad: 10 }) → 15
export function aplicar(estado: number, accion: Accion): number {
  // completa aquí (switch con 4 case + default never)
  return estado
}

// 2) `etiquetaAccion` — un texto legible por acción:
//      "incrementar" → "+1" ; "decrementar" → "-1"
//      "sumar"       → `+${cantidad}` ; "reiniciar" → "reset"
export function etiquetaAccion(accion: Accion): string {
  // completa aquí
  return ""
}

// 3) `esDestructiva` — true solo para "reiniciar" (borra el progreso).
//    esDestructiva({ tipo: "reiniciar" }) → true
//    esDestructiva({ tipo: "sumar", cantidad: 3 }) → false
export function esDestructiva(accion: Accion): boolean {
  // completa aquí
  return false
}


/* ── BLOQUE B — disparar varias acciones ───────────────────────────────────── */

// 4) `aplicarTodas` — parte de `estado` y aplica TODAS las acciones en orden,
//    devolviendo el estado final. (Pista: `reduce` usando tu propio `aplicar`.)
//    aplicarTodas(0, [{ tipo: "incrementar" }, { tipo: "sumar", cantidad: 5 }, { tipo: "decrementar" }]) → 5
export function aplicarTodas(estado: number, acciones: Accion[]): number {
  // completa aquí
  return estado
}

// 5) CAPSTONE — un estado más rico: además del contador, un historial de
//    etiquetas. `aplicarConHistorial` aplica la acción al contador (reusa
//    `aplicar`) y AÑADE su etiqueta (reusa `etiquetaAccion`) al historial, SIN
//    mutar el estado original (devuelve uno nuevo con `...`).
//    aplicarConHistorial({ contador: 0, historial: [] }, { tipo: "incrementar" })
//      → { contador: 1, historial: ["+1"] }
export type EstadoContador = { contador: number; historial: string[] }
export function aplicarConHistorial(estado: EstadoContador, accion: Accion): EstadoContador {
  // completa aquí (devuelve un objeto nuevo: contador recalculado + historial extendido)
  return estado
}
