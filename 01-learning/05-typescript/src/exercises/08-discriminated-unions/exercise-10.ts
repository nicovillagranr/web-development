/* =============================================================================
 * EJERCICIO 10 — capstone: la máquina de estados de un pedido · bloque 08
 *
 * 🎯 OBJETIVOS
 * · Juntar en un dominio real las piezas de los ejercicios 02 a 09.
 * · Escribir transiciones que devuelven un Resultado<Pedido> en vez de lanzar.
 *
 * 🟢 CONTEXTO — este cierre no introduce nada nuevo: junta las piezas del bloque en
 * un mini dominio real, el ciclo de vida de un pedido de tienda. Las transiciones
 * válidas son carrito → pagando → confirmado. Pagar algo que no está en el carrito,
 * o confirmar algo que no se está pagando, devuelve error.
 *
 * 🗺️ MAPA
 * EL DOMINIO · de qué ejercicio sale cada pieza → antes de los drills
 * BLOQUE A · leer el pedido → drills 1–3
 * BLOQUE B · transiciones que devuelven Resultado → drills 4–5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/08-discriminated-unions/exercise-10.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ EL DOMINIO — tejer todo lo del bloque
 *
 * · una unión de estado donde cada fase lleva campos distintos (03);
 * · estados imposibles, imposibles: un pedido «confirmado» siempre tiene número (04);
 * · transiciones que devuelven un Resultado<Pedido>: una transición inválida no se
 *   lanza como excepción, se devuelve como error (05 y 06);
 * · switch exhaustivo con never para describir cada fase (02 y 07).
 *
 * 🧠 ANALOGÍA — es tu e-commerce: la cesta, la pasarela de pago, el «¡pedido
 * confirmado #1234!» y el «pedido cancelado». No puedes confirmar sin pasar por
 * pagar: la máquina de estados es ese flujo, con las puertas que no se saltan.
 * ───────────────────────────────────────────────────────────────────────────── */

export type Pedido =
  | { estado: "carrito"; items: string[] }
  | { estado: "pagando"; items: string[]; metodo: "tarjeta" | "efectivo" }
  | { estado: "confirmado"; items: string[]; numero: number }
  | { estado: "cancelado"; motivo: string };

export type Resultado<T> = { ok: true; valor: T } | { ok: false; error: string };

/* ▸ BLOQUE A — leer el pedido */

/* 1) cantidadItems — cuántos items tiene. "carrito", "pagando" y "confirmado"
 * tienen items; "cancelado" no → 0.
 * cantidadItems({ estado: "carrito", items: ["a", "b"] }) → 2
 * cantidadItems({ estado: "cancelado", motivo: "x" }) → 0
 */
export function cantidadItems(p: Pedido): number {
  if (p.estado === "carrito" || p.estado === "pagando" || p.estado === "confirmado") {
    return p.items.length;
  }
  return 0;
}

/* 2) puedeCancelar — se puede cancelar salvo si ya está "confirmado" o
 * "cancelado".
 * puedeCancelar({ estado: "carrito", items: [] }) → true
 * puedeCancelar({ estado: "confirmado", items: [], numero: 1 }) → false
 */
export function puedeCancelar(p: Pedido): boolean {
  return !(p.estado === "confirmado" || p.estado === "cancelado");
}
puedeCancelar({ estado: "confirmado", items: [], numero: 1 }); // false

/* 3) describirPedido — un texto por estado, con switch + default y el
 * guardia const _exhaustivo: never = p:
 *   "carrito"    → `Carrito (${n} items)`        (n = items.length)
 *   "pagando"    → `Pagando con ${metodo}`
 *   "confirmado" → `Pedido #${numero} confirmado`
 *   "cancelado"  → `Cancelado: ${motivo}`
 */
export function describirPedido(p: Pedido): string {
  switch (p.estado) {
    case "carrito":
      return `Carrito (${p.items.length} items)`;
    case "pagando":
      return `Pagando con ${p.metodo}`;
    case "confirmado":
      return `Pedido #${p.numero} confirmado`;
    case "cancelado":
      return `Cancelado: ${p.motivo}`;
    default: {
      const _exhaustivo: never = p;
      return _exhaustivo;
    }
  }
}

/* ▸ BLOQUE B — transiciones que devuelven Resultado */

// export type Pedido =
// | { estado: "carrito"; items: string[] }
// | { estado: "pagando"; items: string[]; metodo: "tarjeta" | "efectivo" }
// | { estado: "confirmado"; items: string[]; numero: number }
// | { estado: "cancelado"; motivo: string }

// export type Resultado<T> =
// | { ok: true; valor: T }
// | { ok: false; error: string }

/* 4) pagar — transición carrito → pagando. Si el pedido está en "carrito",
 * devuelve ok con { estado: "pagando", items, metodo }; en cualquier otro
 * estado, error "solo se puede pagar desde el carrito".
 * pagar({ estado: "carrito", items: ["a"] }, "tarjeta") → { ok: true, valor: { estado: "pagando", items: ["a"], metodo: "tarjeta" } }
 */
export function pagar(p: Pedido, metodo: "tarjeta" | "efectivo"): Resultado<Pedido> {
  // Si el estado del pedido está en cualquiera que no sea "carrito", devuelve un error
  if (p.estado !== "carrito") {
    return { ok: false, error: "Sólo se puede pagar desde el carrito" };
  }
  // Si el Pedido está en el carrito, devuelve un objeto con ok: true, el valor es un type Pedido: {estado: "pagando", items, metodo}
  return { ok: true, valor: { estado: "pagando", items: p.items, metodo } };
}
pagar({ estado: "carrito", items: ["a"] }, "tarjeta"); // { ok: true, valor: { estado: "pagando", items: ["a"], metodo: "tarjeta" } }

/* 5) Capstone confirmar — transición pagando → confirmado. Si el pedido está en
 * "pagando", devuelve ok con { estado: "confirmado", items, numero }; en
 * cualquier otro estado, error "solo se puede confirmar lo que se está pagando".
 * confirmar({ estado: "pagando", items: ["a"], metodo: "efectivo" }, 1234) → { ok: true, valor: { estado: "confirmado", items: ["a"], numero: 1234 } }
 */
export function confirmar(p: Pedido, numero: number): Resultado<Pedido> {
  if (p.estado !== "pagando") {
    return { ok: false, error: "Sólo se puede confirmar lo que se está pagando" };
  }
  return { ok: true, valor: { estado: "confirmado", items: p.items, numero } };
}
