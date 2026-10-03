import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  respuesta1,
  respuesta2,
  VotoConMeta,
  respuesta4,
  transferenciaReducer,
  respuesta6,
  Transferencia,
} from "./exercise-08";

/* Los drills 5 y 7 viven en el mismo componente: si el 5 no está resuelto, el 7
 * también sale rojo. Las esperas son reales (300 ms), por eso esos tests usan
 * `findByText`, que espera a que el texto aparezca. */

describe("11-useState-useReducer / exercise-08 — pedir anota, el estado llega después", () => {
  it("1) respuesta1 — los dos números de la consola en el primer clic", () => {
    expect(respuesta1).toEqual([0, 0]);
  });

  it("2) respuesta2 — lo que se ve después de un clic con tres pedidos", () => {
    expect(respuesta2).toBe(3);
  });

  it("3) VotoConMeta — el aviso sale justo con el tercer voto", async () => {
    const user = userEvent.setup();
    render(<VotoConMeta />);
    const votar = screen.getByRole("button", { name: "Votar" });

    await user.click(votar);
    await user.click(votar);
    expect(screen.queryByText("¡Meta alcanzada!")).toBeNull();

    await user.click(votar);
    expect(screen.getByText("Votos: 3")).toBeInTheDocument();
    expect(screen.getByText("¡Meta alcanzada!")).toBeInTheDocument();
  });

  it("4) respuesta4 — lo que se ve durante la espera", () => {
    expect(respuesta4).toBe("Enviando…");
  });

  it("5) Transferencia — Enviando… durante la espera, y después enviada", async () => {
    const user = userEvent.setup();
    render(<Transferencia />);

    await user.click(screen.getByRole("button", { name: "Transferir" }));
    expect(screen.getByRole("status")).toHaveTextContent("Enviando…");
    expect(await screen.findByText("Transferencia enviada")).toBeInTheDocument();
  });

  it("6) respuesta6 — lo que vale `fase` al volver del await", () => {
    expect(respuesta6).toBe("lista");
  });

  it("7) terminar — solo desde enviando; cancelar durante la espera se respeta", async () => {
    expect(transferenciaReducer("enviando", { tipo: "terminar" })).toBe("enviada");
    expect(transferenciaReducer("cancelada", { tipo: "terminar" })).toBe("cancelada");
    expect(transferenciaReducer("lista", { tipo: "terminar" })).toBe("lista");

    const user = userEvent.setup();
    render(<Transferencia />);
    await user.click(screen.getByRole("button", { name: "Transferir" }));
    await user.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(screen.getByRole("status")).toHaveTextContent("Transferencia cancelada");

    await new Promise((r) => setTimeout(r, 500));
    expect(screen.getByRole("status")).toHaveTextContent("Transferencia cancelada");
  });
});
