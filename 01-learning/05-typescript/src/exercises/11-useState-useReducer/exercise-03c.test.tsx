import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  pruebaFijar,
  respuesta2,
  respuesta3,
  volumenReducer,
  respuesta6,
  Altavoz,
  AltavozConPreset,
  AltavozCompleto,
} from "./exercise-03c";

/* El drill 1 es de tipos: su señal está en `pnpm typecheck`, no aquí. Del 4 al 6 el
 * reducer se llama a mano, sin React, como una función cualquiera. Del 7 al 9 se
 * pulsa, y quien lo llama ya es React. */

describe("11-useState-useReducer / exercise-03c — la cadena: tipos, reducer y pedir", () => {
  it("1) AccionVolumen — el papel de fijar lleva su número", () => {
    expect(pruebaFijar).toEqual({ tipo: "fijar", valor: 5 });
  });

  it("2) respuesta2 — qué papeles acepta el cajero", () => {
    expect(respuesta2).toEqual([true, false, false, false]);
  });

  it("3) respuesta3 — `valor` fuera de su case", () => {
    expect(respuesta3).toBe(false);
  });

  it("4) volumenReducer — cada papel hace lo que dice", () => {
    expect(volumenReducer(5, { tipo: "subir" })).toBe(6);
    expect(volumenReducer(5, { tipo: "bajar" })).toBe(4);
    expect(volumenReducer(5, pruebaFijar)).toBe(5);
    expect(volumenReducer(1, pruebaFijar)).toBe(5);
  });

  it("5) volumenReducer — no pasa de 10 ni baja de 0", () => {
    expect(volumenReducer(10, { tipo: "subir" })).toBe(10);
    expect(volumenReducer(0, { tipo: "bajar" })).toBe(0);
    expect(volumenReducer(9, { tipo: "subir" })).toBe(10);
  });

  it("6) respuesta6 — la salida de una llamada es la entrada de la siguiente", () => {
    expect(respuesta6).toBe(10);
  });

  it("7) Altavoz — Subir y Bajar mueven el volumen en pantalla", async () => {
    const user = userEvent.setup();
    render(<Altavoz />);

    await user.click(screen.getByRole("button", { name: "Subir" }));
    await user.click(screen.getByRole("button", { name: "Subir" }));
    expect(screen.getByText("Volumen: 7")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Bajar" }));
    expect(screen.getByText("Volumen: 6")).toBeInTheDocument();
  });

  it("8) AltavozConPreset — el botón deja el volumen en 7", async () => {
    const user = userEvent.setup();
    render(<AltavozConPreset />);

    expect(screen.getByText("Volumen: 3")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Al 7" }));
    expect(screen.getByText("Volumen: 7")).toBeInTheDocument();
  });

  it("9) AltavozCompleto — Silencio lo deja en 0, y Bajar ya no baja más", async () => {
    const user = userEvent.setup();
    render(<AltavozCompleto />);

    await user.click(screen.getByRole("button", { name: "Subir" }));
    expect(screen.getByText("Volumen: 6")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Silencio" }));
    expect(screen.getByText("Volumen: 0")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Bajar" }));
    expect(screen.getByText("Volumen: 0")).toBeInTheDocument();
  });
});
