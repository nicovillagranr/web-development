import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  respuesta1,
  respuesta2,
  VotoConMeta,
  Carrito,
  Marcador,
  Sala,
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

  it("3a) Carrito — el aviso sale justo con la quinta unidad", async () => {
    const user = userEvent.setup();
    render(<Carrito />);
    const agregar = screen.getByRole("button", { name: "Agregar" });

    for (let i = 0; i < 4; i++) await user.click(agregar);
    expect(screen.queryByText("Carrito lleno")).toBeNull();

    await user.click(agregar);
    expect(screen.getByText("Unidades: 5")).toBeInTheDocument();
    expect(screen.getByText("Carrito lleno")).toBeInTheDocument();
  });

  it("3b) Marcador — el aviso sale en el clic que llega a 50, sume lo que sume", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Marcador />);
    const acierto = screen.getByRole("button", { name: "Acierto" });

    for (let i = 0; i < 4; i++) await user.click(acierto);
    expect(screen.queryByText("¡Nivel superado!")).toBeNull();
    await user.click(acierto);
    expect(screen.getByText("Puntos: 50")).toBeInTheDocument();
    expect(screen.getByText("¡Nivel superado!")).toBeInTheDocument();
    unmount();

    render(<Marcador />);
    const bonus = screen.getByRole("button", { name: "Bonus" });
    await user.click(bonus);
    expect(screen.queryByText("¡Nivel superado!")).toBeNull();
    await user.click(bonus);
    expect(screen.getByText("Puntos: 50")).toBeInTheDocument();
    expect(screen.getByText("¡Nivel superado!")).toBeInTheDocument();
  });

  it("3c) Sala — el aviso sale con la cuarta persona y se va al vaciar", async () => {
    const user = userEvent.setup();
    render(<Sala />);
    const entrar = screen.getByRole("button", { name: "Entrar" });

    for (let i = 0; i < 3; i++) await user.click(entrar);
    expect(screen.queryByText("Sala completa")).toBeNull();
    await user.click(entrar);
    expect(screen.getByText("Sala completa")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Vaciar" }));
    expect(screen.getByText("Personas: 0")).toBeInTheDocument();
    expect(screen.queryByText("Sala completa")).toBeNull();
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
    expect(respuesta6).toBe("preparada");
  });

  it("7) terminar — solo desde enviando; cancelar durante la espera se respeta", async () => {
    expect(transferenciaReducer("enviando", { tipo: "terminar" })).toBe("enviada");
    expect(transferenciaReducer("cancelada", { tipo: "terminar" })).toBe("cancelada");
    expect(transferenciaReducer("preparada", { tipo: "terminar" })).toBe("preparada");

    const user = userEvent.setup();
    render(<Transferencia />);
    await user.click(screen.getByRole("button", { name: "Transferir" }));
    await user.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(screen.getByRole("status")).toHaveTextContent("Transferencia cancelada");

    await new Promise((r) => setTimeout(r, 500));
    expect(screen.getByRole("status")).toHaveTextContent("Transferencia cancelada");
  });
});
