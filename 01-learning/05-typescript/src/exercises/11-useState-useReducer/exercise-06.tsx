import { useReducer } from "react";

/* =============================================================================
 * EJERCICIO 06 — una regla dentro de la copia   ·  bloque 11
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 *   · escribir una regla como pregunta sobre el valor que ENTRA
 *   · devolver lo mismo que recibiste cuando la regla dice "no", y por qué
 *   · cambiar un dato y, en el mismo `return`, el campo que ese cambio arrastra
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * En el `05` copiabas sin condiciones. En un reducer casi nunca es así: cada
 * cambio depende de cómo venía el estado. Aquí las reglas son las de una tienda,
 * y cada escalón añade una sola cosa al anterior.
 *
 * 🗺️ MAPA DEL ARCHIVO
 *   TEORÍA 1 · la regla pregunta por lo que entra      →  drills 1, 2
 *   TEORÍA 2 · cuando la regla dice "no"               →  drills 3 a 5
 *   TEORÍA 3 · cuando un cambio arrastra a otro campo  →  drills 6 a 9
 *
 * ▸ EJERCICIO — 9 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/11-useState-useReducer/exercise-06.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito, y los 9 compilan: toda la señal
 *   está en el test. El drill 5 lleva una línea `// ¿Por qué?` que reviso yo.
 *   ¿Atascado? Las pistas están en `exercise-06.pistas.md`, de una en una.
 *
 * 👁️ `TiendaPedido` (drills 8 y 9) está montado en `src/App.tsx`.
 * ===========================================================================*/

// El pedido de todo el archivo. No se toca.
export type FasePedido = "carrito" | "pagado" | "enviado";
export type Pedido = { producto: string; cantidad: number; fase: FasePedido };

export const pedidoInicial: Pedido = { producto: "Café", cantidad: 1, fase: "carrito" };

/* 📌 LAS REGLAS DE LA TIENDA — todos los drills salen de aquí:
 *   · la cantidad solo se cambia en "carrito"
 *   · se paga solo desde "carrito", y se envía solo desde "pagado"
 *   · el producto se cambia en "carrito" y en "pagado"; si estaba "pagado",
 *     el pedido vuelve a "carrito", porque el cobro ya no vale
 *   · en "enviado" ya no se cambia nada */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — la regla pregunta por lo que entra
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Una regla es una pregunta sobre el valor que RECIBE la función, hecha antes
 *   de decidir qué devolver. Se escribe con un `if`, un ternario o un `switch`.
 *
 * EJEMPLO — la luz de un semáforo:
 *     function siguienteLuz(luz: Luz): Luz {
 *       if (luz === "verde") return "ámbar";
 *       if (luz === "ámbar") return "rojo";
 *       return "verde";
 *     }
 *
 * 🧠 ANALOGÍA — el guardia de la entrada mira tu pulsera al llegar, no al salir.
 *
 * ⚠️ TRAMPA — olvidar el último caso. Si la regla no dice qué pasa con la fase
 *    que no cambia, esa fase también tiene que tener su respuesta.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) `siguienteFase` — la fase que viene después: de "carrito" a "pagado", de
//    "pagado" a "enviado". "enviado" es la última y se queda donde está.
export function siguienteFase(fase: FasePedido): FasePedido {
  return fase;
}
// siguienteFase("carrito")

// 2) `puedeCambiarCantidad` — `true` si en esa fase la tienda deja cambiar la
//    cantidad, `false` si no. Mira las reglas de arriba.
export function puedeCambiarCantidad(fase: FasePedido): boolean {
  return fase !== "enviado";
}
// puedeCambiarCantidad("pagado")

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — cuando la regla dice "no"
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Si la regla no deja hacer el cambio, se devuelve EL MISMO objeto que llegó.
 *   Para React, "el mismo" significa "no pasó nada": no repinta. Un objeto
 *   nuevo, aunque sea idéntico, significa "algo cambió".
 *
 * SINTAXIS
 *     if (no se puede) return pedido;          // la misma ficha
 *     return { ...pedido, clave: valor };      // ficha nueva
 *
 * 🧠 ANALOGÍA — el botón del ascensor en el piso en el que ya estás: si está
 *    bien hecho, no hace nada. `{ ...pedido }` es un ascensor que abre y cierra
 *    la puerta igual, para nada.
 *
 * ⚠️ TRAMPA — `return { ...pedido }` "deja todo igual" a la vista, pero no es
 *    lo mismo: es una fotocopia, y el test del 3 y del 4 lo nota con `toBe`.
 * ───────────────────────────────────────────────────────────────────────────── */

// 3) `cambiarCantidad` — devuelve una copia con la cantidad nueva, pero solo si la
//    tienda lo permite en la fase del pedido. Si no, no ha pasado nada.
export function cambiarCantidad(pedido: Pedido, cantidad: number): Pedido {
  return { ...pedido, cantidad };
}
// cambiarCantidad(pedidoInicial, 3)

// 4) `pagar` — pasa el pedido a "pagado", si se puede pagar desde donde está.
export function pagar(pedido: Pedido): Pedido {
  return { ...pedido, fase: "pagado" };
}
// pagar(pedidoInicial)

// 5) Predice: un reducer recibe "sumar" con el pedido ya "enviado", y en vez de
//    `return estado` hace `return { ...estado }`. En pantalla nada cambia. ¿React
//    vuelve a pintar el componente, o no?
export type Repinta = "repinta" | "no repinta";
export const respuesta5: Repinta = "no repinta";
// ¿Por qué?

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — cuando un cambio arrastra a otro campo
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   A veces cambiar un dato obliga a cambiar otro campo. Los dos cambios van en
 *   el MISMO objeto que devuelves, y el del campo arrastrado lleva su regla.
 *
 * SINTAXIS
 *     return {
 *       ...ficha,
 *       dato: nuevo,                                         // lo que pediste
 *       fase: ficha.fase === "x" ? "y" : ficha.fase,         // lo que arrastra
 *     };
 *
 * 🧠 ANALOGÍA — cambiar la fecha de un pasaje ya pagado: el pasaje cambia, y el
 *    pago se anula. Nadie te pide las dos cosas; la segunda viene con la primera.
 *
 * ⚠️ TRAMPA — es el drill 2 del `04`: cambias el dato y el spread copia la fase
 *    tal cual, así que el campo arrastrado nunca se entera.
 * ───────────────────────────────────────────────────────────────────────────── */

// 6) `faseTrasCambiarProducto` — solo la regla, sin objeto: la fase en la que
//    queda el pedido después de cambiarle el producto (sin contar "enviado", que
//    llega al 7). Si venía "pagado", vuelve a "carrito"; si no, se queda igual.
export function faseTrasCambiarProducto(fase: FasePedido): FasePedido {
  return fase;
}
// faseTrasCambiarProducto("pagado")

// 7) `cambiarProducto` — la regla entera del producto: el producto nuevo y la
//    fase que arrastra, en un solo `return`. Y en "enviado", no ha pasado nada.
export function cambiarProducto(pedido: Pedido, producto: string): Pedido {
  return { ...pedido, producto };
}
// cambiarProducto({ ...pedidoInicial, fase: "pagado" }, "Té")

export type AccionPedido =
  | { tipo: "sumar" }
  | { tipo: "pagar" }
  | { tipo: "cambiarProducto"; producto: string }
  | { tipo: "enviar" };

// 8) y 9) — dos `case` de `pedidoReducer` que se saltan las reglas de la tienda.
//    Los otros dos ya están bien. `TiendaPedido`, justo debajo, no se toca.
// 8) "sumar" — añade una unidad, pero solo donde la tienda lo permite.
// 9) "enviar" — pasa a "enviado", pero solo desde donde se puede enviar.
export function pedidoReducer(estado: Pedido, accion: AccionPedido): Pedido {
  switch (accion.tipo) {
    case "sumar": // ← drill 8
      return { ...estado, cantidad: estado.cantidad + 1 };
    case "pagar":
      return pagar(estado);
    case "cambiarProducto":
      return cambiarProducto(estado, accion.producto);
    case "enviar": // ← drill 9
      return { ...estado, fase: "enviado" };
    default: {
      const _exhaustivo: never = accion;
      return _exhaustivo;
    }
  }
}
// pedidoReducer({ ...pedidoInicial, fase: "enviado" }, { tipo: "sumar" })

export function TiendaPedido() {
  const [pedido, pedir] = useReducer(pedidoReducer, pedidoInicial);

  return (
    <div>
      <p>
        {pedido.producto} × {pedido.cantidad} · {pedido.fase}
      </p>
      <button onClick={() => pedir({ tipo: "sumar" })}>+1</button>
      <button onClick={() => pedir({ tipo: "pagar" })}>Pagar</button>
      <button onClick={() => pedir({ tipo: "cambiarProducto", producto: "Té" })}>
        Cambiar a Té
      </button>
      <button onClick={() => pedir({ tipo: "enviar" })}>Enviar</button>
    </div>
  );
}
// <TiendaPedido />
