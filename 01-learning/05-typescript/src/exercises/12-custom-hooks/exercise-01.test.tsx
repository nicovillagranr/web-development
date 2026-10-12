import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  EnfocarCerrar,
  respuesta2,
  respuesta3,
  BloqueoScroll,
  respuesta5,
  TituloMapa,
} from "./exercise-01";

/* Los efectos tocan cosas de fuera de React (el foco, el `body`, el título de la
 * pestaña), así que cada test deja la página como la encontró. */

afterEach(() => {
  document.body.style.overflow = "";
  document.title = "";
  vi.restoreAllMocks();
});

describe("12-custom-hooks / exercise-01 — useEffect: cuándo corre y cuándo se repite", () => {
  it("1) EnfocarCerrar — al montarse, el foco cae en la ✕", () => {
    render(<EnfocarCerrar />);
    expect(screen.getByRole("button", { name: "Cerrar mapa" })).toHaveFocus();
  });

  it("2) respuesta2 — el orden de los dos registros", () => {
    expect(respuesta2).toBe("pinta, efecto");
  });

  it("3) respuesta3 — un efecto sin array: montaje y dos clics", () => {
    expect(respuesta3).toBe(3);
  });

  it("4) BloqueoScroll — el fondo se bloquea al abrir y vuelve al cerrar", () => {
    const { rerender } = render(<BloqueoScroll abierto={false} />);
    expect(document.body.style.overflow).toBe("");

    rerender(<BloqueoScroll abierto={true} />);
    expect(document.body.style.overflow).toBe("hidden");

    rerender(<BloqueoScroll abierto={false} />);
    expect(document.body.style.overflow).toBe("");
  });

  it("5) respuesta5 — con [abierto], tres clics que no lo cambian", () => {
    expect(respuesta5).toBe(1);
  });

  it("6) TituloMapa — el título sigue al zoom y muestra la ★ del favorito", async () => {
    const user = userEvent.setup();
    render(<TituloMapa />);
    expect(document.title).toBe("Mapa · zoom 1");

    await user.click(screen.getByRole("button", { name: "Acercar" }));
    expect(document.title).toBe("Mapa · zoom 2");

    await user.click(screen.getByRole("button", { name: "Favorito" }));
    expect(document.title).toBe("Mapa · zoom 2 ★");
  });
});
