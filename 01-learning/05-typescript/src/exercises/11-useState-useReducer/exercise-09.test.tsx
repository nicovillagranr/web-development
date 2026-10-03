import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  registroReducer,
  inicial,
  respuesta3,
  respuesta5,
  validarRegistro,
  vacios,
  FormRegistro,
  type EstadoRegistro,
} from "./exercise-09";

/* Los drills 1, 2 y 7 son `case` de `registroReducer` y se prueban llamándolo a mano.
 * Los drills 4 y 8 viven en `FormRegistro`, que usa el reducer entero: si el 1 no
 * está resuelto, sus tests también fallan por él. */

const conErrores: EstadoRegistro = {
  ...inicial,
  errores: { usuario: "Muy corto", correo: "No es válido" },
};

const validos = { usuario: "ana", correo: "ana@mail.cl", clave: "12345678" };

describe("11-useState-useReducer / exercise-09 — el formulario entero, pieza por pieza", () => {
  it("1) escribir — el texto va al campo, dentro de datos", () => {
    const despues = registroReducer(inicial, { tipo: "escribir", campo: "usuario", valor: "ana" });
    expect(despues.datos).toEqual({ usuario: "ana", correo: "", clave: "" });
    expect(inicial.datos.usuario).toBe("");
  });

  it("2) escribir — borra el error de ese campo, y solo ese", () => {
    const despues = registroReducer(conErrores, {
      tipo: "escribir",
      campo: "usuario",
      valor: "anabel",
    });
    expect(despues.errores.usuario).toBeFalsy();
    expect(despues.errores.correo).toBe("No es válido");
    expect(conErrores.errores.usuario).toBe("Muy corto");
  });

  it("3) respuesta3 — lo que vale datos.correo", () => {
    expect(respuesta3).toBeUndefined();
  });

  it("4) FormRegistro — Limpiar vacía también la clave", async () => {
    const user = userEvent.setup();
    render(<FormRegistro />);

    await user.type(screen.getByLabelText("Usuario"), "ana");
    await user.type(screen.getByLabelText("Clave"), "secreta1");
    await user.click(screen.getByRole("button", { name: "Limpiar" }));

    expect(screen.getByLabelText("Usuario")).toHaveValue("");
    expect(screen.getByLabelText("Clave")).toHaveValue("");
  });

  it("5) respuesta5 — el recorrido de una tecla", () => {
    expect(respuesta5).toEqual(["onChange", "pedir", "formReducer", "render"]);
  });

  it("6) validarRegistro — la clave necesita 8 caracteres", () => {
    expect(validarRegistro({ ...validos, clave: "1234567" })).toEqual({
      clave: "La clave debe tener al menos 8 caracteres",
    });
    expect(validarRegistro(validos)).toEqual({});
  });

  it("7) terminar — vacía los datos, y solo desde enviando", () => {
    const enviando: EstadoRegistro = { ...inicial, datos: validos, fase: "enviando" };
    const despues = registroReducer(enviando, { tipo: "terminar" });
    expect(despues.fase).toBe("enviado");
    expect(despues.datos).toEqual(vacios);

    const editando: EstadoRegistro = { ...inicial, datos: validos };
    expect(registroReducer(editando, { tipo: "terminar" })).toBe(editando);
  });

  it("8) FormRegistro — enviar vacío enseña los errores y no crea la cuenta", async () => {
    const user = userEvent.setup();
    render(<FormRegistro />);

    await user.click(screen.getByRole("button", { name: "Crear cuenta" }));
    expect(screen.getByText("El correo no es válido")).toBeInTheDocument();
    await new Promise((r) => setTimeout(r, 400));
    expect(screen.getByRole("status")).not.toHaveTextContent("Cuenta creada");
  });
});
