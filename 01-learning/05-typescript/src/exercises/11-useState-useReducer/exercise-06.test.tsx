import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  pedidoInicial,
  siguienteFase,
  puedeCambiarCantidad,
  cambiarCantidad,
  pagar,
  respuesta5,
  faseTrasCambiarProducto,
  cambiarProducto,
  pedidoReducer,
  TiendaPedido,
  type Pedido,
  type FasePedido,
} from "./exercise-06";

/* Cuando la regla dice "no", la función tiene que devolver EL MISMO objeto que
 * recibió: por eso esos casos usan `toBe` y no `toEqual`. Una copia idéntica no
 * pasa. En los casos que sí cambian, se comprueba también que el original sigue
 * intacto. */

const enFase = (fase: FasePedido): Pedido => ({ ...pedidoInicial, fase });

describe("11-useState-useReducer / exercise-06 — una regla dentro de la copia", () => {
  it("1) siguienteFase — carrito → pagado → enviado, y enviado se queda", () => {
    expect(siguienteFase("carrito")).toBe("pagado");
    expect(siguienteFase("pagado")).toBe("enviado");
    expect(siguienteFase("enviado")).toBe("enviado");
  });

  it("2) puedeCambiarCantidad — solo en carrito", () => {
    expect(puedeCambiarCantidad("carrito")).toBe(true);
    expect(puedeCambiarCantidad("pagado")).toBe(false);
    expect(puedeCambiarCantidad("enviado")).toBe(false);
  });

  it("3) cambiarCantidad — en carrito cambia; en las otras fases, el MISMO pedido", () => {
    const carrito = enFase("carrito");
    expect(cambiarCantidad(carrito, 3)).toEqual({ ...carrito, cantidad: 3 });
    expect(carrito.cantidad).toBe(1);

    const pagado = enFase("pagado");
    expect(cambiarCantidad(pagado, 3)).toBe(pagado);
    const enviado = enFase("enviado");
    expect(cambiarCantidad(enviado, 3)).toBe(enviado);
  });

  it("4) pagar — desde carrito pasa a pagado; si no, el MISMO pedido", () => {
    const carrito = enFase("carrito");
    expect(pagar(carrito).fase).toBe("pagado");
    expect(carrito.fase).toBe("carrito");

    const pagado = enFase("pagado");
    expect(pagar(pagado)).toBe(pagado);
    const enviado = enFase("enviado");
    expect(pagar(enviado)).toBe(enviado);
  });

  it("5) respuesta5 — un objeto nuevo, aunque sea idéntico", () => {
    expect(respuesta5).toBe("repinta");
  });

  it("6) faseTrasCambiarProducto — pagado vuelve a carrito; las otras se quedan", () => {
    expect(faseTrasCambiarProducto("pagado")).toBe("carrito");
    expect(faseTrasCambiarProducto("carrito")).toBe("carrito");
    expect(faseTrasCambiarProducto("enviado")).toBe("enviado");
  });

  it("7) cambiarProducto — el producto nuevo y la fase que arrastra; en enviado, nada", () => {
    const carrito = enFase("carrito");
    expect(cambiarProducto(carrito, "Té")).toEqual({ ...carrito, producto: "Té" });

    const pagado = enFase("pagado");
    expect(cambiarProducto(pagado, "Té")).toEqual({ ...pagado, producto: "Té", fase: "carrito" });
    expect(pagado.fase).toBe("pagado");

    const enviado = enFase("enviado");
    expect(cambiarProducto(enviado, "Té")).toBe(enviado);
  });

  it("8) pedidoReducer, sumar — solo en carrito; si no, el MISMO estado", () => {
    expect(pedidoReducer(enFase("carrito"), { tipo: "sumar" }).cantidad).toBe(2);
    const pagado = enFase("pagado");
    expect(pedidoReducer(pagado, { tipo: "sumar" })).toBe(pagado);
    const enviado = enFase("enviado");
    expect(pedidoReducer(enviado, { tipo: "sumar" })).toBe(enviado);
  });

  it("9) pedidoReducer, enviar + TiendaPedido — solo desde pagado", async () => {
    const carrito = enFase("carrito");
    expect(pedidoReducer(carrito, { tipo: "enviar" })).toBe(carrito);
    expect(pedidoReducer(enFase("pagado"), { tipo: "enviar" }).fase).toBe("enviado");

    const user = userEvent.setup();
    render(<TiendaPedido />);
    const estado = () => screen.getByText(/×/);

    await user.click(screen.getByRole("button", { name: "Enviar" }));
    expect(estado()).toHaveTextContent("Café × 1 · carrito");

    await user.click(screen.getByRole("button", { name: "Pagar" }));
    await user.click(screen.getByRole("button", { name: "Enviar" }));
    expect(estado()).toHaveTextContent("Café × 1 · enviado");

    await user.click(screen.getByRole("button", { name: "+1" }));
    await user.click(screen.getByRole("button", { name: "Cambiar a Té" }));
    expect(estado()).toHaveTextContent("Café × 1 · enviado");
  });
});
