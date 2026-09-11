import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  bloqueaElBoton,
  puedeLimpiar,
  ContadorQueSigueVivo,
  EnvioConBotonApagado,
  LimpiarDesdeDosSitios,
} from "./exercise-13b";

/* Todo se comprueba por comportamiento, y casi siempre en mitad del envío: qué hay en
 * pantalla entre el clic y la respuesta.
 *
 * Cuánto tarde `enviarAlServidor` da igual: los tests que miran el rato del medio no
 * esperan a nada, y los que miran el final esperan a que la PANTALLA cambie, no a que
 * pase un tiempo fijo. Así puedes subirle el retardo para verlo en el navegador sin que
 * nada de aquí se ponga rojo. */

/* espera a que termine un envío que ya está en marcha */
const dejarQueTermine = () => screen.findByRole("button", { name: "Enviar" }, { timeout: 5000 });

describe("10-eventos-formularios / exercise-13b — el mismo envío, mirado despacio", () => {
  it("1) bloqueaElBoton — solo mientras el envío está en marcha", () => {
    expect(bloqueaElBoton("idle")).toBe(false);
    expect(bloqueaElBoton("submitting")).toBe(true);
    expect(bloqueaElBoton("success")).toBe(false);
  });

  it("2) puedeLimpiar — hace falta que haya texto y que no haya envío en marcha", () => {
    expect(puedeLimpiar("idle", "hola")).toBe(true);
    expect(puedeLimpiar("success", "hola")).toBe(true);
    expect(puedeLimpiar("submitting", "hola")).toBe(false);
    expect(puedeLimpiar("idle", "")).toBe(false);
    expect(puedeLimpiar("submitting", "")).toBe(false);
  });

  it("3) ContadorQueSigueVivo — durante el envío no hay ningún envío terminado", async () => {
    const user = userEvent.setup();
    render(<ContadorQueSigueVivo />);

    await user.type(screen.getByLabelText("Comentario"), "hola");
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    /* el clic ya ocurrió y la respuesta todavía no ha vuelto */
    expect(screen.getByRole("button", { name: "Enviando..." })).toBeInTheDocument();
    expect(screen.getByText(/Enviados:\s*0/)).toBeInTheDocument();
  });

  it("3) ContadorQueSigueVivo — el resto de la página sigue viva mientras se espera", async () => {
    const user = userEvent.setup();
    render(<ContadorQueSigueVivo />);

    await user.type(screen.getByLabelText("Comentario"), "hola");
    await user.click(screen.getByRole("button", { name: "Enviar" }));
    await user.click(screen.getByRole("button", { name: "+1" }));

    expect(screen.getByText(/Clics:\s*1/)).toBeInTheDocument();
    expect(screen.getByText(/Enviados:\s*0/)).toBeInTheDocument();
  });

  it("3) ContadorQueSigueVivo — cuando vuelve, el recuento sube una vez", async () => {
    const user = userEvent.setup();
    render(<ContadorQueSigueVivo />);

    await user.type(screen.getByLabelText("Comentario"), "hola");
    await user.click(screen.getByRole("button", { name: "Enviar" }));
    await dejarQueTermine();

    expect(screen.getByText(/Enviados:\s*1/)).toBeInTheDocument();
  });

  it("4) EnvioConBotonApagado — apagado durante el envío, encendido antes y después", async () => {
    const user = userEvent.setup();
    render(<EnvioConBotonApagado />);

    expect(screen.getByRole("button", { name: "Enviar" })).toBeEnabled();

    await user.type(screen.getByLabelText("Comentario"), "hola");
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(screen.getByRole("button", { name: "Enviando..." })).toBeDisabled();

    /* volvió: se puede mandar un segundo comentario */
    expect(await dejarQueTermine()).toBeEnabled();
  });

  it("5) LimpiarDesdeDosSitios — con el formulario quieto, el botón vacía el campo", async () => {
    const user = userEvent.setup();
    render(<LimpiarDesdeDosSitios />);

    const campo = screen.getByLabelText("Comentario");
    await user.type(campo, "hola");
    await user.click(screen.getByRole("button", { name: "Limpiar" }));

    expect(campo).toHaveValue("");
  });

  it("5) LimpiarDesdeDosSitios — con el formulario quieto, Escape vacía el campo", async () => {
    const user = userEvent.setup();
    render(<LimpiarDesdeDosSitios />);

    const campo = screen.getByLabelText("Comentario");
    await user.type(campo, "hola");
    await user.type(campo, "{Escape}");

    expect(campo).toHaveValue("");
  });

  it("5) LimpiarDesdeDosSitios — durante el envío, Escape tampoco vacía el campo", async () => {
    const user = userEvent.setup();
    render(<LimpiarDesdeDosSitios />);

    const campo = screen.getByLabelText("Comentario");
    await user.type(campo, "hola");
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    /* el segundo camino hasta la misma operación: la tecla no pasa por el botón, así que
     * apagar el botón no la frena */
    await user.type(campo, "{Escape}");

    expect(campo).toHaveValue("hola");
    expect(screen.getByRole("button", { name: "Enviando..." })).toBeInTheDocument();
  });
});
