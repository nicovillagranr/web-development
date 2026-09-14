import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CONTACTO_VACIO, validarContacto, FormularioContacto } from "./exercise-14";
import type { DatosContacto, ErroresContacto } from "./exercise-14";

/* El componente se comprueba por comportamiento: qué hay en pantalla al arrancar, qué
 * avisos salen al enviar y qué queda después. Cómo lo escribas por dentro no lo mira
 * nadie, y por eso hay dos condiciones del drill 3 que este archivo no puede ver.
 *
 * Los campos se buscan por su etiqueta: vale un `<label>` o un `aria-label`. */

const BIEN: DatosContacto = {
  name: "Nico",
  email: "nico@mail.cl",
  message: "Quiero una landing",
};

describe("10-eventos-formularios / exercise-14 — el formulario de contacto, desde la hoja en blanco", () => {
  it("1) DatosContacto y ErroresContacto — la forma de las dos cajas", () => {
    /* Este test no comprueba nada al ejecutar: comprueba qué compila y qué no. Cada
     * `@ts-expect-error` avisa de que la línea de debajo NO debe compilar; si tu type
     * es demasiado ancho, compila, la directiva sobra y `pnpm typecheck` lo canta. */
    const completos: DatosContacto = { name: "Nico", email: "nico@mail.cl", message: "Hola" };
    // @ts-expect-error a los datos no les puede faltar ningún campo
    const incompletos: DatosContacto = { name: "Nico", email: "nico@mail.cl" };
    const sinErrores: ErroresContacto = {};
    // @ts-expect-error los errores solo pueden hablar de los tres campos del formulario
    const inventados: ErroresContacto = { telefono: "Falta el teléfono" };

    expect([completos, incompletos, sinErrores, inventados]).toHaveLength(4);
  });

  it("1) CONTACTO_VACIO — los tres campos, en blanco", () => {
    expect(CONTACTO_VACIO).toEqual({ name: "", email: "", message: "" });
  });

  it("2) validarContacto — en blanco, los tres son obligatorios", () => {
    const obligatorios = {
      name: "El nombre es obligatorio",
      email: "El correo es obligatorio",
      message: "El mensaje es obligatorio",
    };
    expect(validarContacto({ name: "", email: "", message: "" })).toEqual(obligatorios);
    /* solo espacios también es en blanco */
    expect(validarContacto({ name: "   ", email: " ", message: "  " })).toEqual(obligatorios);
  });

  it("2) validarContacto — cada campo da como mucho un aviso: el primero que falle", () => {
    expect(validarContacto({ name: "N", email: "nico@", message: "Hola" })).toEqual({
      name: "El nombre debe tener al menos 2 caracteres",
      email: "El correo no es válido",
      message: "El mensaje debe tener al menos 10 caracteres",
    });
  });

  it("2) validarContacto — con todo bien, un objeto sin claves", () => {
    expect(validarContacto(BIEN)).toEqual({});
  });

  it("3) FormularioContacto — arranca con los tres campos vacíos y sin avisos", () => {
    render(<FormularioContacto />);

    expect(screen.getByLabelText("Nombre")).toHaveValue("");
    expect(screen.getByLabelText("Correo")).toHaveValue("");
    expect(screen.getByLabelText("Mensaje")).toHaveValue("");
    expect(screen.queryAllByRole("alert")).toHaveLength(0);
  });

  it("3) FormularioContacto — el mensaje es un <textarea> y se escribe como los otros", async () => {
    const user = userEvent.setup();
    render(<FormularioContacto />);

    const mensaje = screen.getByLabelText("Mensaje");
    expect(mensaje.tagName).toBe("TEXTAREA");

    await user.type(mensaje, "Quiero una landing");
    expect(mensaje).toHaveValue("Quiero una landing");
  });

  it("3) FormularioContacto — no valida al escribir, solo al enviar", async () => {
    const user = userEvent.setup();
    render(<FormularioContacto />);

    await user.type(screen.getByLabelText("Nombre"), "N");
    expect(screen.queryAllByRole("alert")).toHaveLength(0);

    await user.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    expect(screen.getAllByRole("alert")).toHaveLength(3);
    expect(screen.getByText("El nombre debe tener al menos 2 caracteres")).toBeInTheDocument();
    expect(screen.getByText("El correo es obligatorio")).toBeInTheDocument();
    expect(screen.getByText("El mensaje es obligatorio")).toBeInTheDocument();
  });

  it("3) FormularioContacto — con todo bien, se vacía y no queda ningún aviso", async () => {
    const user = userEvent.setup();
    render(<FormularioContacto />);

    await user.type(screen.getByLabelText("Nombre"), BIEN.name);
    await user.type(screen.getByLabelText("Correo"), BIEN.email);
    await user.type(screen.getByLabelText("Mensaje"), BIEN.message);
    await user.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    expect(screen.queryAllByRole("alert")).toHaveLength(0);
    expect(screen.getByLabelText("Nombre")).toHaveValue("");
    expect(screen.getByLabelText("Correo")).toHaveValue("");
    expect(screen.getByLabelText("Mensaje")).toHaveValue("");
  });

  it("3) FormularioContacto — al corregir y volver a enviar, los avisos de antes se van", async () => {
    const user = userEvent.setup();
    render(<FormularioContacto />);

    await user.click(screen.getByRole("button", { name: "Enviar mensaje" }));
    expect(screen.getAllByRole("alert")).toHaveLength(3);

    await user.type(screen.getByLabelText("Nombre"), BIEN.name);
    await user.type(screen.getByLabelText("Correo"), BIEN.email);
    await user.type(screen.getByLabelText("Mensaje"), BIEN.message);
    await user.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    expect(screen.queryAllByRole("alert")).toHaveLength(0);
  });
});
