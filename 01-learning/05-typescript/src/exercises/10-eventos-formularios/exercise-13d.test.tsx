import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  BotonQueSeApaga,
  DosBotonesUnEnvio,
  puedeEnviar,
  DosBotonesMismaAccion,
  FormularioConEnter,
  SalidaSiempreEncendida,
} from "./exercise-13d";

/* Todo se comprueba por comportamiento, y casi siempre en mitad del envío: qué se puede
 * hacer entre el clic y la respuesta.
 *
 * Cuánto tarde `mandarAlServidor` da igual: los tests que miran el rato del medio no
 * esperan a nada, y cuando hace falta que termine se espera a que la PANTALLA cambie, no
 * a que pase un tiempo fijo. Así puedes subirle el retardo para verlo en el navegador sin
 * que nada de aquí se ponga rojo. */

/* El rótulo del estado es el <p>, y se busca diciéndolo: el botón puede llevar ese mismo
 * texto encima (es lo normal, y es decisión de quien monta el componente). Sin el
 * `selector` estas búsquedas encontrarían dos elementos y fallarían por eso. */
const verRotulo = (texto: string) => screen.getByText(texto, { selector: "p" });
const buscarRotulo = (texto: string) => screen.queryByText(texto, { selector: "p" });

/* espera a que termine un envío que ya está en marcha */
const dejarQueTermine = () =>
  screen.findByText("Enviado", { selector: "p" }, { timeout: 5000 });

describe("10-eventos-formularios / exercise-13d — dónde se pone el freno", () => {
  it("1) BotonQueSeApaga — durante el envío el botón no se puede pulsar", async () => {
    const user = userEvent.setup();
    render(<BotonQueSeApaga />);

    const boton = screen.getByRole("button", { name: "Enviar" });
    await user.click(boton);

    expect(verRotulo("Enviando...")).toBeInTheDocument();
    expect(boton).toBeDisabled();

    await dejarQueTermine();
  });

  it("1) BotonQueSeApaga — al terminar vuelve a poder pulsarse", async () => {
    const user = userEvent.setup();
    render(<BotonQueSeApaga />);

    await user.click(screen.getByRole("button", { name: "Enviar" }));
    await dejarQueTermine();

    /* el freno era para el rato del medio, no para siempre */
    expect(screen.getByRole("button", { name: "Enviar" })).toBeEnabled();
  });

  it("2) DosBotonesUnEnvio — durante el envío no se puede pulsar ninguno de los dos", async () => {
    const user = userEvent.setup();
    render(<DosBotonesUnEnvio />);

    await user.click(screen.getByRole("button", { name: "Enviar" }));

    /* los dos, sin mirar qué pone encima de cada uno */
    const botones = screen.getAllByRole("button");
    expect(botones).toHaveLength(2);
    for (const boton of botones) expect(boton).toBeDisabled();

    await dejarQueTermine();
  });

  it("3) puedeEnviar — solo dice que no mientras el envío está en marcha", () => {
    expect(puedeEnviar("idle")).toBe(true);
    expect(puedeEnviar("enviando")).toBe(false);
    /* quien ya mandó un pedido tiene derecho a mandar otro */
    expect(puedeEnviar("enviado")).toBe(true);
  });

  it("4) DosBotonesMismaAccion — los dos botones dejan el pedido igual", async () => {
    const user = userEvent.setup();
    render(<DosBotonesMismaAccion />);

    await user.click(screen.getByRole("button", { name: "Enviar ahora" }));
    expect(verRotulo("Enviando...")).toBeInTheDocument();

    /* el segundo botón tiene que terminar el envío igual que el primero */
    await dejarQueTermine();
  });

  it("5) FormularioConEnter — durante el envío, Enter no arranca un segundo", async () => {
    const user = userEvent.setup();
    render(<FormularioConEnter />);

    await user.type(screen.getByLabelText("Nota"), "hola{Enter}");
    expect(verRotulo("Arrancados: 1")).toBeInTheDocument();

    /* la puerta sin interruptor: el botón está apagado y esto no pasa por él */
    await user.type(screen.getByLabelText("Nota"), "{Enter}");
    expect(verRotulo("Arrancados: 1")).toBeInTheDocument();

    await dejarQueTermine();
  });

  it("5) FormularioConEnter — con el envío terminado, Enter vuelve a mandar", async () => {
    const user = userEvent.setup();
    render(<FormularioConEnter />);

    await user.type(screen.getByLabelText("Nota"), "hola{Enter}");
    await dejarQueTermine();

    await user.type(screen.getByLabelText("Nota"), "{Enter}");
    expect(verRotulo("Arrancados: 2")).toBeInTheDocument();

    await dejarQueTermine();
  });

  it("6) SalidaSiempreEncendida — durante el envío, cancelar no cancela nada", async () => {
    const user = userEvent.setup();
    render(<SalidaSiempreEncendida />);

    await user.click(screen.getByRole("button", { name: "Enviar" }));

    /* el botón sigue encendido a propósito: quien tiene que frenar es la acción */
    const cancelar = screen.getByRole("button", { name: "Cancelar pedido" });
    expect(cancelar).toBeEnabled();
    await user.click(cancelar);

    expect(buscarRotulo("Pedido cancelado")).not.toBeInTheDocument();

    await dejarQueTermine();
  });

  it("6) SalidaSiempreEncendida — con el pedido quieto, cancelar sí cancela", async () => {
    const user = userEvent.setup();
    render(<SalidaSiempreEncendida />);

    await user.click(screen.getByRole("button", { name: "Cancelar pedido" }));

    expect(verRotulo("Pedido cancelado")).toBeInTheDocument();
  });
});
