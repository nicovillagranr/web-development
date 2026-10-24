import { StrictMode } from "react";
import { describe, it, expect, vi, afterEach, onTestFinished } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  IrAlPanel,
  PrimerResultado,
  UltimoResultado,
  MapaConVuelta,
  MapaEnLosDosSentidos,
  MapaSinAtascos,
  MapaDeProjex,
} from "./exercise-05";

/* El drill 2 comprueba que pulsar "Ir al primero" sin resultados no lanza ningún error.
 * Un error dentro de un manejador no rompe el test por sí solo: el navegador lo avisa en
 * la ventana. Así que el test escucha ese aviso y apunta lo que llega (como el 1 del 04). */
const errores: unknown[] = [];
const apuntarError = (event: ErrorEvent) => {
  errores.push(event.error);
  event.preventDefault();
};

afterEach(() => {
  window.removeEventListener("error", apuntarError);
  errores.length = 0;
});

/* Del 4 al 7 hay un campo de fuera ANTES del panel, como el resto de tu página. Si el
 * foco se escapa del panel, va a parar ahí (o a otro sitio de fuera), y el test lo ve. */
function campoDeFuera() {
  const fuera = document.createElement("input");
  fuera.setAttribute("aria-label", "Campo de fuera");
  document.body.appendChild(fuera);
  onTestFinished(() => fuera.remove());
  return fuera;
}

const CIUDADES = ["Santiago", "Valparaíso", "Concepción"];

describe("12-custom-hooks / exercise-05 — el focus trap", () => {
  it("1) IrAlPanel — Ir al panel lleva el foco a Ver en Google Maps", async () => {
    const user = userEvent.setup();
    render(<IrAlPanel />);

    await user.click(screen.getByRole("button", { name: "Ir al panel" }));
    expect(screen.getByRole("link", { name: "Ver en Google Maps" })).toHaveFocus();
  });

  it("2) PrimerResultado — con resultados enfoca el primero; sin resultados, ningún error", async () => {
    const user = userEvent.setup();
    window.addEventListener("error", apuntarError);
    const { unmount } = render(<PrimerResultado ciudades={CIUDADES} />);

    await user.click(screen.getByRole("button", { name: "Ir al primero" }));
    expect(screen.getByRole("button", { name: "Santiago" })).toHaveFocus();
    unmount();

    render(<PrimerResultado ciudades={[]} />);
    await user.click(screen.getByRole("button", { name: "Ir al primero" }));
    expect(errores).toEqual([]);
  });

  it("3) UltimoResultado — con resultados enfoca el último; sin resultados, ningún error", async () => {
    const user = userEvent.setup();
    window.addEventListener("error", apuntarError);
    const { unmount } = render(<UltimoResultado ciudades={CIUDADES} />);

    await user.click(screen.getByRole("button", { name: "Ir al último" }));
    expect(screen.getByRole("button", { name: "Concepción" })).toHaveFocus();
    unmount();

    render(<UltimoResultado ciudades={[]} />);
    await user.click(screen.getByRole("button", { name: "Ir al último" }));
    expect(errores).toEqual([]);
  });

  it("4) MapaConVuelta — Tab en la ✕ vuelve a Ver en Google Maps", async () => {
    const user = userEvent.setup();
    campoDeFuera();
    render(
      <StrictMode>
        <MapaConVuelta />
      </StrictMode>,
    );

    screen.getByRole("button", { name: "Cerrar mapa" }).focus();
    await user.tab();
    expect(screen.getByRole("link", { name: "Ver en Google Maps" })).toHaveFocus();
  });

  it("5) MapaEnLosDosSentidos — Shift+Tab en el primero va a la ✕, y en la ✕ vuelve atrás normal", async () => {
    const user = userEvent.setup();
    campoDeFuera();
    render(
      <StrictMode>
        <MapaEnLosDosSentidos />
      </StrictMode>,
    );
    const enlace = screen.getByRole("link", { name: "Ver en Google Maps" });
    const cerrar = screen.getByRole("button", { name: "Cerrar mapa" });

    enlace.focus();
    await user.tab({ shift: true });
    expect(cerrar).toHaveFocus();

    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Copiar dirección" })).toHaveFocus();

    cerrar.focus();
    await user.tab();
    expect(enlace).toHaveFocus();
  });

  it("6) MapaSinAtascos — en medio, Tab y Shift+Tab avanzan; en los bordes, dan la vuelta", async () => {
    const user = userEvent.setup();
    campoDeFuera();
    render(
      <StrictMode>
        <MapaSinAtascos />
      </StrictMode>,
    );
    const enlace = screen.getByRole("link", { name: "Ver en Google Maps" });
    const copiar = screen.getByRole("button", { name: "Copiar dirección" });
    const cerrar = screen.getByRole("button", { name: "Cerrar mapa" });

    enlace.focus();
    await user.tab();
    expect(copiar).toHaveFocus();
    await user.tab();
    expect(cerrar).toHaveFocus();
    await user.tab();
    expect(enlace).toHaveFocus();
    await user.tab({ shift: true });
    expect(cerrar).toHaveFocus();
    await user.tab({ shift: true });
    expect(copiar).toHaveFocus();
  });

  it("7) MapaDeProjex — el Tab no sale del modal en ningún sentido, ni se atasca, y el de fuera entra; Escape cierra", async () => {
    const user = userEvent.setup();
    const fuera = campoDeFuera();
    const onClose = vi.fn();
    render(
      <StrictMode>
        <MapaDeProjex onClose={onClose} />
      </StrictMode>,
    );
    const cerrar = screen.getByRole("button", { name: "Cerrar mapa" });
    const enlace = screen.getByRole("link", { name: "Abrir en Google Maps" });
    const copiar = screen.getByRole("button", { name: "Copiar dirección" });

    copiar.focus();
    await user.tab();
    expect(cerrar).toHaveFocus();
    await user.tab();
    expect(enlace).toHaveFocus();
    await user.tab({ shift: true });
    expect(cerrar).toHaveFocus();
    await user.tab({ shift: true });
    expect(copiar).toHaveFocus();
    await user.tab({ shift: true });
    expect(enlace).toHaveFocus();

    fuera.focus();
    await user.tab({ shift: true });
    expect(cerrar).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
