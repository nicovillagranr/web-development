import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PanelConDosSalidas, PanelQueEscuchaEscape, PanelConTresSalidas } from "./exercise-13c";

/* Todo se comprueba por comportamiento, y casi siempre probando una salida distinta cada
 * vez: quién cierra el panel, quién no debería y qué queda detrás.
 *
 * Cuánto tarde `guardarEnServidor` da igual: los tests que miran el rato del guardado no
 * esperan a nada, y cuando hace falta que termine se espera a que la PANTALLA cambie, no
 * a que pase un tiempo fijo. Así puedes subirle el retardo para verlo en el navegador sin
 * que nada de aquí se ponga rojo. */

/* el panel está abierto si se ve su campo, y cerrado si ese campo ya no está */
const verElPanel = () => screen.getByLabelText("Nota");
const buscarElPanel = () => screen.queryByLabelText("Nota");

/* espera a que termine un guardado que ya está en marcha */
const dejarQueTermine = () => screen.findByRole("button", { name: "Guardar" }, { timeout: 5000 });

describe("10-eventos-formularios / exercise-13c — una acción, varias puertas", () => {
  it("1) PanelConDosSalidas — 'Cancelar' cierra y no deja la nota detrás", async () => {
    const user = userEvent.setup();
    render(<PanelConDosSalidas />);

    await user.click(screen.getByRole("button", { name: "Abrir panel" }));
    await user.type(screen.getByLabelText("Nota"), "hola");
    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(buscarElPanel()).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Abrir panel" }));
    expect(screen.getByLabelText("Nota")).toHaveValue("");
  });

  it("1) PanelConDosSalidas — la ✕ cierra exactamente igual que 'Cancelar'", async () => {
    const user = userEvent.setup();
    render(<PanelConDosSalidas />);

    await user.click(screen.getByRole("button", { name: "Abrir panel" }));
    await user.type(screen.getByLabelText("Nota"), "hola");
    await user.click(screen.getByRole("button", { name: "Cerrar" }));

    expect(buscarElPanel()).not.toBeInTheDocument();

    /* la segunda salida tiene que dejar el panel como lo deja la primera */
    await user.click(screen.getByRole("button", { name: "Abrir panel" }));
    expect(screen.getByLabelText("Nota")).toHaveValue("");
  });

  it("2) PanelQueEscuchaEscape — con el panel quieto, Escape cierra", async () => {
    const user = userEvent.setup();
    render(<PanelQueEscuchaEscape />);

    await user.click(screen.getByRole("button", { name: "Abrir panel" }));
    await user.type(screen.getByLabelText("Nota"), "hola");
    await user.type(screen.getByLabelText("Nota"), "{Escape}");

    expect(buscarElPanel()).not.toBeInTheDocument();
  });

  it("2) PanelQueEscuchaEscape — durante el guardado, Escape no cierra", async () => {
    const user = userEvent.setup();
    render(<PanelQueEscuchaEscape />);

    await user.click(screen.getByRole("button", { name: "Abrir panel" }));
    await user.type(screen.getByLabelText("Nota"), "hola");
    await user.click(screen.getByRole("button", { name: "Guardar" }));

    /* el camino que no pasa por ningún botón: apagar botones no lo frena */
    await user.type(screen.getByLabelText("Nota"), "{Escape}");

    expect(verElPanel()).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Guardando..." })).toBeInTheDocument();

    await dejarQueTermine();
  });

  it("3) PanelConTresSalidas — durante el guardado, la ✕ tampoco cierra", async () => {
    const user = userEvent.setup();
    render(<PanelConTresSalidas />);

    await user.click(screen.getByRole("button", { name: "Abrir panel" }));
    await user.type(screen.getByLabelText("Nota"), "hola");
    await user.click(screen.getByRole("button", { name: "Guardar" }));

    /* la ✕ está encendida a propósito: quien tiene que frenarla es la regla, no el botón */
    await user.click(screen.getByRole("button", { name: "Cerrar" }));

    expect(verElPanel()).toBeInTheDocument();
    expect(screen.getByLabelText("Nota")).toHaveValue("hola");

    await dejarQueTermine();
  });

  it("3) PanelConTresSalidas — con el panel quieto, las tres salidas cierran", async () => {
    const user = userEvent.setup();
    render(<PanelConTresSalidas />);

    await user.click(screen.getByRole("button", { name: "Abrir panel" }));
    await user.click(screen.getByRole("button", { name: "Cerrar" }));
    expect(buscarElPanel()).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Abrir panel" }));
    await user.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(buscarElPanel()).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Abrir panel" }));
    await user.type(screen.getByLabelText("Nota"), "{Escape}");
    expect(buscarElPanel()).not.toBeInTheDocument();
  });
});
