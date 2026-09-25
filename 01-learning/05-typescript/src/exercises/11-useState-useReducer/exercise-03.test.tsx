import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ContadorConReducer,
  contarReducer,
  ContadorConPaso,
  panelReducer,
  PanelConHistorial,
} from "./exercise-03";

/* Los reducers son funciones puras: se comprueban llamándolos, sin montar nada. Y de los
 * dos que reciben un objeto, además se mira que NO toquen el que les llega — un reducer que
 * muta funciona en la primera llamada y deja de repintar en la segunda. */

describe("11-useState-useReducer / exercise-03 — useReducer: el reducer enchufado", () => {
  it("1) ContadorConReducer — Sumar sube de uno en uno y Reiniciar vuelve a 0", async () => {
    const user = userEvent.setup();
    render(<ContadorConReducer />);

    expect(screen.getByText("0")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Sumar" }));
    await user.click(screen.getByRole("button", { name: "Sumar" }));
    expect(screen.getByText("2")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Reiniciar" }));
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("2) contarReducer — las tres acciones, y `sumar` usa lo que trae", () => {
    expect(contarReducer(5, { tipo: "incrementar" })).toBe(6);
    expect(contarReducer(5, { tipo: "reiniciar" })).toBe(0);
    expect(contarReducer(5, { tipo: "sumar", cantidad: 3 })).toBe(8);
  });

  it("2) contarReducer — es puro: el mismo argumento da el mismo resultado", () => {
    const accion: { tipo: "incrementar" } = { tipo: "incrementar" };
    expect(contarReducer(1, accion)).toBe(2);
    expect(contarReducer(1, accion)).toBe(2);
  });

  it("3) ContadorConPaso — sube de cinco en cinco", async () => {
    const user = userEvent.setup();
    render(<ContadorConPaso />);

    await user.click(screen.getByRole("button", { name: "Sumar 5" }));
    expect(screen.getByText("5")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Sumar 5" }));
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("4) panelReducer — cambia el contador y apunta la etiqueta", () => {
    const inicial = { contador: 0, historial: [] };
    const despues = panelReducer(inicial, { tipo: "incrementar" });

    expect(despues.contador).toBe(1);
    expect(despues.historial).toEqual(["incrementar"]);
  });

  it("4) panelReducer — `reiniciar` pone el contador a 0 y conserva el historial", () => {
    const antes = { contador: 7, historial: ["incrementar"] };
    const despues = panelReducer(antes, { tipo: "reiniciar" });

    expect(despues.contador).toBe(0);
    expect(despues.historial).toEqual(["incrementar", "reiniciar"]);
  });

  it("4) panelReducer — NO toca el estado que le dan", () => {
    const antes = { contador: 0, historial: [] };
    panelReducer(antes, { tipo: "sumar", cantidad: 4 });

    /* el que entró tiene que seguir exactamente igual */
    expect(antes.contador).toBe(0);
    expect(antes.historial).toEqual([]);
  });

  it("5) PanelConHistorial — los botones suman, reinician y dejan rastro", async () => {
    const user = userEvent.setup();
    render(<PanelConHistorial />);

    await user.click(screen.getByRole("button", { name: "Sumar 2" }));
    await user.click(screen.getByRole("button", { name: "Sumar 2" }));
    expect(screen.getByText("4")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Reiniciar" }));
    expect(screen.getByText("0")).toBeInTheDocument();

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });
});
