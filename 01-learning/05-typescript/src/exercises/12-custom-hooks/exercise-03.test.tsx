import { StrictMode } from "react";
import { describe, it, expect, afterEach, onTestFinished } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  EnfocarConRef,
  CampoCiudad,
  respuesta3,
  PanelEnfocable,
  respuesta5,
  respuesta6,
  MapaSoloIda,
  respuesta8,
  respuesta9,
  respuesta10,
  respuesta11,
  LimpiarBusqueda,
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

/* Los drills 12 y 13 comprueban que el componente NO le roba el foco a la página al
 * montarse. Para eso, antes de montarlo, el foco se deja en un campo de fuera, y el
 * componente se monta dentro de `StrictMode`, como en `pnpm dev`. */
function focoFuera() {
  const fuera = document.createElement("input");
  fuera.setAttribute("aria-label", "Campo de fuera");
  document.body.appendChild(fuera);
  fuera.focus();
  onTestFinished(() => fuera.remove());
  return fuera;
}

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

  it("6) respuesta6 — cerrarRef.current justo después de setAbierto(true)", () => {
    expect(respuesta6).toBe("null");
  });

  it("7) MapaSoloIda — al abrir el mapa, el foco cae en la ✕", async () => {
    const user = userEvent.setup();
    render(<MapaSoloIda />);

    await user.click(screen.getByRole("button", { name: "Abrir mapa" }));
    expect(screen.getByRole("button", { name: "Cerrar mapa" })).toHaveFocus();
  });

  it("8) respuesta8 — dónde queda el foco si desaparece la ✕", () => {
    expect(respuesta8).toBe("en ninguna parte: vuelve al <body>");
  });

  it("9) respuesta9 — los registros de un efecto que vigila abierto", () => {
    expect(respuesta9).toEqual(["efecto con false", "efecto con true", "efecto con false"]);
  });

  it("10) respuesta10 — la bandera del primer montaje, con StrictMode", () => {
    expect(respuesta10).toBe("sí, lo roba");
  });

  it("11) respuesta11 — manejador o efecto, caso por caso", () => {
    expect(respuesta11).toEqual({ a: "efecto", b: "manejador", c: "efecto", d: "manejador" });
  });

  it("12) LimpiarBusqueda — no roba el foco al montarse; Limpiar vacía el campo y lo enfoca", async () => {
    const user = userEvent.setup();
    const fuera = focoFuera();
    render(
      <StrictMode>
        <LimpiarBusqueda />
      </StrictMode>,
    );
    expect(fuera).toHaveFocus();

    const campo = screen.getByRole("textbox", { name: "Ciudad" });
    await user.type(campo, "Santiago");
    await user.click(screen.getByRole("button", { name: "Limpiar" }));
    expect(campo).toHaveValue("");
    expect(campo).toHaveFocus();
  });

  it("13) MapaConRetorno — no roba el foco al montarse; el foco va a la ✕ al abrir y vuelve a Abrir mapa al cerrar", async () => {
    const user = userEvent.setup();
    const fuera = focoFuera();
    render(
      <StrictMode>
        <MapaConRetorno />
      </StrictMode>,
    );
    expect(fuera).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "Abrir mapa" }));
    expect(screen.getByRole("button", { name: "Cerrar mapa" })).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "Cerrar mapa" }));
    expect(screen.getByRole("button", { name: "Abrir mapa" })).toHaveFocus();
  });
});
