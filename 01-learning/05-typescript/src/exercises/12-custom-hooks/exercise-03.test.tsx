import { describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  EnfocarConRef,
  CampoCiudad,
  respuesta3,
  PanelEnfocable,
  respuesta5,
  MapaConRetorno,
} from "./exercise-03";

/* El drill 4 comprueba que pulsar "Ir al mapa" con el panel cerrado no lanza
 * ningún error. Un error dentro de un manejador no rompe el test por sí solo: el
 * navegador lo avisa en la ventana. Así que el test escucha ese aviso y apunta lo
 * que llega. */

const errores: unknown[] = [];
const apuntarError = (event: ErrorEvent) => {
  errores.push(event.error);
  event.preventDefault();
};

afterEach(() => {
  window.removeEventListener("error", apuntarError);
  errores.length = 0;
});

describe("12-custom-hooks / exercise-03 — useRef: tu propia agarradera a un elemento", () => {
  it("1) EnfocarConRef — al montarse, el foco cae en la ✕", () => {
    render(<EnfocarConRef />);
    expect(screen.getByRole("button", { name: "Cerrar mapa" })).toHaveFocus();
  });

  it("2) CampoCiudad — al montarse, el texto del campo queda seleccionado entero", () => {
    render(<CampoCiudad />);
    const campo = screen.getByRole<HTMLInputElement>("textbox", { name: "Ciudad" });
    expect([campo.selectionStart, campo.selectionEnd]).toEqual([0, "Santiago".length]);
  });

  it("3) respuesta3 — .current en el primer render", () => {
    expect(respuesta3).toBe("null");
  });

  it("4) PanelEnfocable — cerrado no hace nada; abierto, enfoca el panel", async () => {
    const user = userEvent.setup();
    window.addEventListener("error", apuntarError);
    render(<PanelEnfocable />);

    await user.click(screen.getByRole("button", { name: "Ir al mapa" }));
    expect(errores).toEqual([]);

    await user.click(screen.getByRole("button", { name: "Abrir mapa" }));
    await user.click(screen.getByRole("button", { name: "Ir al mapa" }));
    expect(screen.getByRole("region", { name: "Mapa de ubicación" })).toHaveFocus();
  });

  it("5) respuesta5 — .current después de cerrar el panel", () => {
    expect(respuesta5).toBe("null");
  });

  it("6) MapaConRetorno — el foco va a la ✕ al abrir y vuelve a Abrir mapa al cerrar", async () => {
    const user = userEvent.setup();
    render(<MapaConRetorno />);

    await user.click(screen.getByRole("button", { name: "Abrir mapa" }));
    expect(screen.getByRole("button", { name: "Cerrar mapa" })).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "Cerrar mapa" }));
    expect(screen.getByRole("button", { name: "Abrir mapa" })).toHaveFocus();
  });
});
