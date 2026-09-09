import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  validarCredenciales,
  Login,
  validarProducto,
  AltaProducto,
  validarAlta,
  AltaConTerminos,
} from "./exercise-12b";

/* Los tres drills se comprueban por comportamiento: qué hay en pantalla antes de
 * enviar, qué avisos salen al enviar y cuáles se van. Cómo esté escrito el manejador
 * por dentro no lo mira nadie — mientras el `<p role="alert">` solo exista si ese
 * campo falla. */

describe("10-eventos-formularios / exercise-12b — los mismos formularios, sin esqueleto", () => {
  it("1) validarCredenciales — una clave de 7 no basta, una de 8 sí", () => {
    expect(validarCredenciales({ email: "", clave: "" })).toEqual({
      email: "El email es obligatorio",
      clave: "La clave necesita 8 caracteres",
    });
    expect(validarCredenciales({ email: "n@m.cl", clave: "1234567" })).toEqual({
      clave: "La clave necesita 8 caracteres",
    });
    expect(validarCredenciales({ email: "n@m.cl", clave: "12345678" })).toEqual({});
  });

  it("1) Login — no valida al escribir, solo al enviar", async () => {
    const user = userEvent.setup();
    render(<Login />);

    await user.type(screen.getByLabelText("Email"), "nico@mail.cl");
    expect(screen.queryAllByRole("alert")).toHaveLength(0);

    await user.click(screen.getByRole("button", { name: "Entrar" }));

    const avisos = screen.getAllByRole("alert");
    expect(avisos).toHaveLength(1);
    expect(avisos[0]).toHaveTextContent("La clave necesita 8 caracteres");
  });

  it("1) Login — con los dos campos vacíos, enviar deja los dos avisos", async () => {
    const user = userEvent.setup();
    render(<Login />);

    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(screen.getAllByRole("alert")).toHaveLength(2);
    expect(screen.getByText("El email es obligatorio")).toBeInTheDocument();
    expect(screen.getByText("La clave necesita 8 caracteres")).toBeInTheDocument();
  });

  it("1) Login — 8 caracteres bastan y no queda ningún aviso", async () => {
    const user = userEvent.setup();
    render(<Login />);

    await user.type(screen.getByLabelText("Email"), "nico@mail.cl");
    await user.type(screen.getByLabelText("Clave"), "12345678");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(screen.queryAllByRole("alert")).toHaveLength(0);
  });

  it("2) validarProducto — el precio en blanco y el 0 caen los dos", () => {
    expect(validarProducto({ nombre: "Teclado", precio: "" })).toEqual({
      precio: "El precio tiene que ser mayor que 0",
    });
    expect(validarProducto({ nombre: "Teclado", precio: "0" })).toEqual({
      precio: "El precio tiene que ser mayor que 0",
    });
    expect(validarProducto({ nombre: "", precio: "25" })).toEqual({
      nombre: "El nombre es obligatorio",
    });
    expect(validarProducto({ nombre: "Teclado", precio: "25" })).toEqual({});
  });

  it("2) AltaProducto — el precio en blanco también es un precio inválido", async () => {
    const user = userEvent.setup();
    render(<AltaProducto />);

    await user.type(screen.getByLabelText("Nombre"), "Teclado");
    await user.click(screen.getByRole("button", { name: "Crear" }));

    const avisos = screen.getAllByRole("alert");
    expect(avisos).toHaveLength(1);
    expect(avisos[0]).toHaveTextContent("El precio tiene que ser mayor que 0");
  });

  it("2) AltaProducto — un 0 tecleado tampoco vale", async () => {
    const user = userEvent.setup();
    render(<AltaProducto />);

    await user.type(screen.getByLabelText("Nombre"), "Teclado");
    await user.type(screen.getByLabelText("Precio"), "0");
    await user.click(screen.getByRole("button", { name: "Crear" }));

    expect(screen.getAllByRole("alert")).toHaveLength(1);
    expect(screen.getByText("El precio tiene que ser mayor que 0")).toBeInTheDocument();
  });

  it("2) AltaProducto — con nombre y un precio mayor que 0 no queda ningún aviso", async () => {
    const user = userEvent.setup();
    render(<AltaProducto />);

    await user.type(screen.getByLabelText("Nombre"), "Teclado");
    await user.type(screen.getByLabelText("Precio"), "25");
    await user.click(screen.getByRole("button", { name: "Crear" }));

    expect(screen.queryAllByRole("alert")).toHaveLength(0);
  });

  it("3) validarAlta — sin marcar la casilla no se pasa", () => {
    expect(validarAlta({ nombre: "", acepta: false })).toEqual({
      nombre: "El nombre es obligatorio",
      acepta: "Tienes que aceptar los términos",
    });
    expect(validarAlta({ nombre: "Nico", acepta: false })).toEqual({
      acepta: "Tienes que aceptar los términos",
    });
    expect(validarAlta({ nombre: "Nico", acepta: true })).toEqual({});
  });

  it("3) AltaConTerminos — la casilla arranca desmarcada y sin avisos", async () => {
    render(<AltaConTerminos />);

    expect(screen.getByLabelText("Acepto los términos")).not.toBeChecked();
    expect(screen.queryAllByRole("alert")).toHaveLength(0);
  });

  it("3) AltaConTerminos — enviar en blanco deja los dos avisos", async () => {
    const user = userEvent.setup();
    render(<AltaConTerminos />);

    await user.click(screen.getByRole("button", { name: "Registrarme" }));

    expect(screen.getAllByRole("alert")).toHaveLength(2);
    expect(screen.getByText("El nombre es obligatorio")).toBeInTheDocument();
    expect(screen.getByText("Tienes que aceptar los términos")).toBeInTheDocument();
  });

  it("3) AltaConTerminos — marcar la casilla la deja marcada y quita su aviso", async () => {
    const user = userEvent.setup();
    render(<AltaConTerminos />);

    await user.type(screen.getByLabelText("Nombre"), "Nico");
    await user.click(screen.getByLabelText("Acepto los términos"));

    expect(screen.getByLabelText("Acepto los términos")).toBeChecked();

    await user.click(screen.getByRole("button", { name: "Registrarme" }));

    expect(screen.queryAllByRole("alert")).toHaveLength(0);
  });
});
