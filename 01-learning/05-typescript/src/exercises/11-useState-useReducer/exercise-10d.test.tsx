import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CampoNombre,
  CampoCorreo,
  CampoDetalle,
  ErrorNombre,
  respuesta5,
  ErrorCorreo,
} from "./exercise-10d";

/* Cada drill es un componente suelto con su propio reducer. Se prueban escribiendo
 * y pulsando como lo haría el usuario. */

describe("11-useState-useReducer / exercise-10d — inputs controlados y errores en el JSX", () => {
  it("1) CampoNombre — lo que escribes se ve", async () => {
    const user = userEvent.setup();
    render(<CampoNombre />);
    await user.type(screen.getByLabelText("Nombre"), "Ana");
    expect(screen.getByLabelText("Nombre")).toHaveValue("Ana");
  });

  it("2) CampoCorreo — lo que escribes se ve", async () => {
    const user = userEvent.setup();
    render(<CampoCorreo />);
    await user.type(screen.getByLabelText("Correo"), "ana@mail.cl");
    expect(screen.getByLabelText("Correo")).toHaveValue("ana@mail.cl");
  });

  it("3) CampoDetalle — Limpiar borra el texto", async () => {
    const user = userEvent.setup();
    render(<CampoDetalle />);
    await user.type(screen.getByLabelText("Detalle"), "Una landing");
    await user.click(screen.getByRole("button", { name: "Limpiar" }));
    expect(screen.getByLabelText("Detalle")).toHaveValue("");
  });

  it("4) ErrorNombre — el alert solo existe cuando hay error", async () => {
    const user = userEvent.setup();
    render(<ErrorNombre />);
    expect(screen.queryByRole("alert")).toBeNull();
    await user.click(screen.getByRole("button", { name: "Revisar" }));
    expect(screen.getByRole("alert")).toHaveTextContent("El nombre es obligatorio");
  });

  it('5) respuesta5 — lo que pinta un error en ""', () => {
    expect(respuesta5).toBe("ningún <p>");
  });

  it("6) ErrorCorreo — aria-invalid dice true o false", async () => {
    const user = userEvent.setup();
    render(<ErrorCorreo />);
    const correo = screen.getByLabelText("Correo");
    await user.click(screen.getByRole("button", { name: "Revisar" }));
    expect(correo).toHaveAttribute("aria-invalid", "true");
    await user.type(correo, "a");
    expect(correo).toHaveAttribute("aria-invalid", "false");
  });
});
