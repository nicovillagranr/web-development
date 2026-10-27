/* =============================================================================
 * EJERCICIO 07 — uniones de acciones: el patrón reducer · bloque 08
 *
 * 🎯 OBJETIVOS
 * · Describir con una unión discriminada «qué pasó» (una acción), no un estado.
 * · Escribir un reducer: (estado, acción) → estado nuevo, con switch y never.
 * · Construir un estado nuevo de dos campos sin mutar el viejo.
 *
 * 🟢 CONTEXTO — hasta ahora la unión discriminada describía un estado: en qué
 * situación estoy. Ahora describe un evento, algo que acaba de ocurrir y que
 * debería cambiar el estado. Es el patrón exacto de useReducer en React (FASE 2,
 * ejercicio 11): lo que entrenas aquí lo reusarás tal cual.
 *
 * 🗺️ MAPA
 * TEORÍA · acciones y reducer → base de todo el archivo
 * BLOQUE A · el reducer → drills 1–3
 * BLOQUE B · disparar varias acciones → drills 4–5
 * ESCALERA C · entender aplicarConHistorial desde el suelo → peldaños C1–C5, al final
 *
 * ▸ 5 drills + 5 peldaños, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/08-discriminated-unions/exercise-07.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — una unión que describe «qué pasó», y un switch que decide «y ahora qué»
 *
 * DEFINICIÓN
 * Cada acción es una variante, con su tag tipo y los datos que necesite. Un reducer
 * es una función pura (estadoActual, accion) => estadoNuevo que mira el tipo con un
 * switch y devuelve el siguiente estado. El default con const _: never = accion
 * garantiza que no olvidaste ninguna acción.
 *
 * SINTAXIS
 * type Accion =
 *   | { tipo: "incrementar" }
 *   | { tipo: "sumar"; cantidad: number } // esta sí lleva un dato extra
 *   | { tipo: "reiniciar" };
 *
 * function aplicar(n: number, a: Accion): number {
 *   switch (a.tipo) {
 *     case "incrementar": return n + 1;
 *     case "sumar":       return n + a.cantidad; // a.cantidad solo existe aquí
 *     case "reiniciar":   return 0;
 *     default: { const _: never = a; return _; }
 *   }
 * }
 *
 * 🧠 ANALOGÍA — el cajero automático: tu saldo es el estado, y cada operación
 * («ingresar 50», «sacar 20») es una acción. El cajero, el reducer, lee qué pediste
 * y te da el saldo resultante; la ranura solo acepta las del menú (la unión cerrada).
 *
 * 💡 Igual que en useReducer: el estado nunca se muta, siempre devuelves uno nuevo,
 * y cada case es una regla de transición.
 * ───────────────────────────────────────────────────────────────────────────── */

export type Accion =
  | { tipo: "incrementar" }
  | { tipo: "decrementar" }
  | { tipo: "sumar"; cantidad: number }
  | { tipo: "reiniciar" };

/* ▸ BLOQUE A — el reducer */

/* 1) aplicar — el reducer del contador. switch (accion.tipo) + default con
 * const _exhaustivo: never = accion:
 *   "incrementar" → estado + 1
 *   "decrementar" → estado - 1
 *   "sumar"       → estado + accion.cantidad
 *   "reiniciar"   → 0
 * aplicar(5, { tipo: "incrementar" }) → 6
 * aplicar(5, { tipo: "sumar", cantidad: 10 }) → 15
 */
export function aplicar(estado: number, accion: Accion): number {
  switch (accion.tipo) {
    case "incrementar":
      return estado + 1;
    case "decrementar":
      return estado - 1;
    case "sumar":
      return estado + accion.cantidad;
    case "reiniciar":
      return 0;
    default: {
      const _exhaustivo: never = accion;
      return _exhaustivo;
    }
  }
}
aplicar(5, { tipo: "incrementar" }); // 6

/* 2) etiquetaAccion — un texto legible por acción:
 * "incrementar" → "+1" ; "decrementar" → "-1"
 * "sumar"       → `+${cantidad}` ; "reiniciar" → "reset"
 */
export function etiquetaAccion(accion: Accion): string {
  switch (accion.tipo) {
    case "incrementar":
      return "+1";
    case "decrementar":
      return "-1";
    case "sumar":
      return `+${accion.cantidad}`;
    case "reiniciar":
      return "reset";
    default: {
      const _exhaustivo: never = accion;
      return _exhaustivo;
    }
  }
}
etiquetaAccion({ tipo: "sumar", cantidad: 7 }); // "+7"

/* 3) esDestructiva — true solo para "reiniciar" (borra el progreso).
 * esDestructiva({ tipo: "reiniciar" }) → true
 * esDestructiva({ tipo: "sumar", cantidad: 3 }) → false
 */
export function esDestructiva(accion: Accion): boolean {
  switch (accion.tipo) {
    case "reiniciar":
      return true;
    case "sumar":
      return false;
    case "incrementar":
      return false;
    case "decrementar":
      return false;
    default: {
      const _exhaustivo: never = accion;
      return _exhaustivo;
    }
  }
}

/* ▸ BLOQUE B — disparar varias acciones */

/* 4) aplicarTodas — parte de estado y aplica todas las acciones en orden,
 * devolviendo el estado final. (Pista: reduce usando tu propio aplicar.)
 * aplicarTodas(0, [{ tipo: "incrementar" }, { tipo: "sumar", cantidad: 5 }, { tipo: "decrementar" }]) → 5
 */
export function aplicarTodas(estado: number, acciones: Accion[]): number {
  return acciones.reduce((acumulador, actual) => aplicar(acumulador, actual), estado);
}
aplicarTodas(0, [{ tipo: "incrementar" }, { tipo: "sumar", cantidad: 5 }, { tipo: "decrementar" }]); // 0+1+5-1=5

/* 5) Capstone — un estado más rico: además del contador, un historial de
 * etiquetas. aplicarConHistorial aplica la acción al contador (reusa
 * aplicar) y añade su etiqueta (reusa etiquetaAccion) al historial, sin
 * mutar el estado original (devuelve uno nuevo con ...).
 * aplicarConHistorial({ contador: 0, historial: [] }, { tipo: "incrementar" })
 *   → { contador: 1, historial: ["+1"] }
 */
export type EstadoContador = { contador: number; historial: string[] };

export function aplicarConHistorial(estado: EstadoContador, accion: Accion): EstadoContador {
  return {
    contador: aplicar(estado.contador, accion),
    historial: [...estado.historial, etiquetaAccion(accion)],
  };
}
aplicarConHistorial({ contador: 0, historial: [] }, { tipo: "incrementar" }); // { contador: 1, historial: ["+1"] }
aplicarConHistorial({ contador: 0, historial: [] }, { tipo: "sumar", cantidad: 4 }); // { contador: 4, historial: ["+4"] }

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ESCALERA C — entender aplicarConHistorial desde el suelo (refuerzo)
 *
 * El capstone cuesta porque hace cuatro cosas a la vez sobre un estado que es un
 * objeto de dos campos (contador + historial):
 * (a) sacar un campo de dentro del objeto       → estado.contador
 * (b) añadir a un array sin romperlo            → [...viejo, nuevo]
 * (c) construir un objeto nuevo con dos campos  → { contador: ..., historial: ... }
 * (d) reusar aplicar y etiquetaAccion para calcular esos dos campos
 *
 * Cada peldaño aísla una pieza y sube un escalón. Cuando termines C1 → C5, vuelve a
 * mirar aplicarConHistorial y lo vas a ver obvio.
 *
 * 🧠 ANALOGÍA — el estado es una cuenta bancaria: contador es el saldo, e
 * historial, el extracto. Cada acción produce la cuenta de después (saldo nuevo +
 * una línea más en el extracto), sin borrar la vieja.
 *
 * Prohibidos any y as. Resuelve en orden.
 * ───────────────────────────────────────────────────────────────────────────── */

/* C1) leerContador — sacar un campo de dentro del objeto: la pieza (a), sola.
 * Recibes un EstadoContador (la cuenta) y devuelves solo el número de dentro (el
 * saldo). Nada más: aprender a «meter la mano en el objeto y sacar un campo» con
 * la notación punto, objeto.campo.
 *   leerContador({ contador: 7, historial: ["a"] }) → 7
 *   leerContador({ contador: 0, historial: [] })    → 0
 */

// export type EstadoContador = { contador: number; historial: string[] }

export function leerContador(estado: EstadoContador): number {
  return estado.contador;
}
leerContador({ contador: 7, historial: ["a", "b", "c"] }); // → 7

/* C2) agregarEtiqueta — añadir a un array sin romper el viejo: la pieza (b), sola.
 * Recibes un historial (lista de textos) y una etiqueta nueva, y devuelves una
 * lista nueva con la etiqueta añadida al final. Ojo clave: no uses .push (eso muta
 * la lista original); usa el spread [...vieja, nueva], que crea una copia con el
 * elemento extra.
 * Analogía: el banco no borra tu extracto; imprime uno nuevo con la línea de hoy
 * añadida abajo. El extracto viejo sigue existiendo tal cual.
 *   agregarEtiqueta(["+1"], "+2") → ["+1", "+2"]
 *   agregarEtiqueta([], "reset")  → ["reset"]
 */
export function agregarEtiqueta(historial: string[], etiqueta: string): string[] {
  return [...historial, etiqueta];
}
agregarEtiqueta(["+1"], "+2"); // → ["+1", "+2"]
agregarEtiqueta([], "reset"); // → ["reset"]
agregarEtiqueta(["+1", "+2"], "+3"); // → ["+1", "+2", "+3"]

/* C3) nuevoEstado — construir el objeto de dos campos: la pieza (c), sola.
 * Recibes un número y una lista, y devuelves un EstadoContador nuevo metiendo cada
 * uno en su campo. Practicas el { campo: valor }: la etiqueta del campo (contador
 * o historial) a la izquierda, el valor a la derecha. Fíjate: los parámetros se
 * llaman n y lista, pero los campos se llaman contador e historial → tú decides
 * qué valor va en qué campo.
 *   nuevoEstado(5, ["+5"]) → { contador: 5, historial: ["+5"] }
 *   nuevoEstado(0, [])     → { contador: 0, historial: [] }
 */
export function nuevoEstado(n: number, lista: string[]): EstadoContador {
  return { contador: n, historial: lista };
}
nuevoEstado(5, ["+5"]); // → { contador: 5, historial: ["+5"] }
nuevoEstado(0, []); // → { contador: 0, historial: [] }

/* C4) avanzarManual — combinar (b) + (c): estado nuevo con contador dado +
 * etiqueta añadida. Juntas C2 y C3, pero los números ya te los dan (todavía sin
 * aplicar ni etiquetaAccion). Recibes el estado viejo, el nuevoContador ya
 * calculado y la etiqueta ya lista; devuelves el estado nuevo: el contador es el
 * que te dan, y el historial es el viejo con la etiqueta añadida al final (reusa
 * la idea de C2).
 * Esta es ya la forma del capstone; solo falta que los dos valores los calcule
 * otra función en vez de venir dados.
 *   avanzarManual({ contador: 1, historial: ["+1"] }, 3, "+2")
 *     → { contador: 3, historial: ["+1", "+2"] }
 */

// export type EstadoContador = { contador: number; historial: string[] }

export function avanzarManual(
  estado: EstadoContador,
  nuevoContador: number,
  etiqueta: string,
): EstadoContador {
  return { contador: nuevoContador, historial: [...estado.historial, etiqueta] };
}
// avanzarManual({ contador: 1, historial: ["+1"] }, 3, "+2") // → { contador: 3, historial: ["+1", "+2"] }

/* C5) aplicarConHistorialBis — el capstone reconstruido: ahora los valores los
 * calculan tus funciones. Idéntico a C4, pero en vez de recibir nuevoContador y
 * etiqueta ya hechos, los calculas tú reusando los drills 1 y 2:
 *   el contador nuevo = aplicar(estado.contador, accion) ← C1 + drill 1
 *   la etiqueta nueva = etiquetaAccion(accion)           ← drill 2
 * y el historial = el viejo + esa etiqueta (C2). Es exactamente aplicarConHistorial.
 *   aplicarConHistorialBis({ contador: 0, historial: [] }, { tipo: "incrementar" })
 *     → { contador: 1, historial: ["+1"] }
 *   aplicarConHistorialBis({ contador: 4, historial: ["+4"] }, { tipo: "sumar", cantidad: 3 })
 *     → { contador: 7, historial: ["+4", "+3"] }
 */

// export type EstadoContador = { contador: number; historial: string[] }

export function aplicarConHistorialBis(estado: EstadoContador, accion: Accion): EstadoContador {
  return {
    contador: aplicar(estado.contador, accion),
    historial: [...estado.historial, etiquetaAccion(accion)],
  };
}
// aplicarConHistorialBis({ contador: 0, historial: [] }, { tipo: "incrementar" }) // → { contador: 1, historial: ["+1"] }
