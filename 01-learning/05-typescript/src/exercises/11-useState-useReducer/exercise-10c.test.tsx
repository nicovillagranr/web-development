import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  respuesta1,
  respuesta2,
  EnvioFoto,
  EnvioSinReturn,
  EnvioTarde,
  EnvioTipado,
  vacios,
} from "./exercise-10c";

/* Los drills 3 a 6 reciben los datos ya escritos por props y se prueban pulsando
 * "Enviar solicitud". La espera del envío es de 1000 ms; los tests esperan un poco más. */

const buenos = { nombre: "Ana", correo: "ana@mail.cl", detalle: "Una landing para mi tienda" };
const pausa = (ms: number) => new Promise((r) => setTimeout(r, ms));

describe("11-useState-useReducer / exercise-10c — enviar: decidir con lo de ahora", () => {
  it("1) respuesta1 — los pasos de un envío bueno", () => {
    expect(respuesta1).toEqual(["preventDefault", "validar", "empezar", "esperar", "terminar"]);
  });

  it("2) respuesta2 — los pasos de un envío rechazado", () => {
    expect(respuesta2).toEqual(["preventDefault", "validar", "rechazar"]);
  });

  it("3) EnvioFoto — vacío enseña los errores y no envía", async () => {
    const user = userEvent.setup();
    render(<EnvioFoto datos={vacios} />);

    await user.click(screen.getByRole("button", { name: "Enviar solicitud" }));
    expect(screen.getByText("El nombre es obligatorio")).toBeInTheDocument();
    await pausa(1200);
    expect(screen.getByRole("status")).not.toHaveTextContent("Solicitud enviada");
  });

  it("4) EnvioSinReturn — vacío se queda con los errores a la vista", async () => {
    const user = userEvent.setup();
    render(<EnvioSinReturn datos={vacios} />);

    await user.click(screen.getByRole("button", { name: "Enviar solicitud" }));
    await pausa(1200);
    expect(screen.getByText("El nombre es obligatorio")).toBeInTheDocument();
    expect(screen.getByRole("status")).not.toHaveTextContent("Solicitud enviada");
  });

  it("5) EnvioTarde — Enviando… y botón bloqueado durante la espera", async () => {
    const user = userEvent.setup();
    render(<EnvioTarde datos={buenos} />);

    await user.click(screen.getByRole("button", { name: "Enviar solicitud" }));
    expect(screen.getByRole("status")).toHaveTextContent("Enviando…");
    expect(screen.getByRole("button", { name: "Enviar solicitud" })).toBeDisabled();
    expect(await screen.findByText("Solicitud enviada", {}, { timeout: 2000 })).toBeInTheDocument();
  });

  it("6) EnvioTipado — con datos buenos, se envía", async () => {
    const user = userEvent.setup();
    render(<EnvioTipado datos={buenos} />);

    await user.click(screen.getByRole("button", { name: "Enviar solicitud" }));
    expect(await screen.findByText("Solicitud enviada", {}, { timeout: 2000 })).toBeInTheDocument();
  });
});
