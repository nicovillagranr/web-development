import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  textoDeFase,
  formReducer,
  inicial,
  respuesta6,
  FormContacto,
  type EstadoForm,
} from "./exercise-04";

/* El drill 1 es de tipos: su señal está en `pnpm typecheck`. Del 2 al 5 se llama a
 * `formReducer` a mano, un `case` por drill. Cuando una transición no está permitida,
 * el reducer tiene que devolver EL MISMO objeto que recibió: por eso esos tests usan
 * `toBe` y no `toEqual`. */

const conDatos: EstadoForm = {
  datos: { name: "Ana", email: "ana@mail.cl", message: "Hola" },
  errores: {},
  fase: "idle",
};

describe("11-useState-useReducer / exercise-04 — el formulario con reducer", () => {
  it("1) Fase — cada fase tiene su texto", () => {
    expect(textoDeFase("idle")).toBe("");
    expect(textoDeFase("enviando")).toBe("Enviando…");
    expect(textoDeFase("enviado")).toBe("Mensaje enviado");
  });

  it("2) escribir — cambia el campo, y si ya se había enviado vuelve a idle", () => {
    const despues = formReducer(inicial, { tipo: "escribir", campo: "name", valor: "Ana" });
    expect(despues.datos.name).toBe("Ana");
    expect(despues.fase).toBe("idle");
    expect(inicial.datos.name).toBe("");

    const enviado: EstadoForm = { ...inicial, fase: "enviado" };
    const otraVez = formReducer(enviado, { tipo: "escribir", campo: "email", valor: "a" });
    expect(otraVez.fase).toBe("idle");
    expect(otraVez.datos.email).toBe("a");
  });

  it("3) rechazar — guarda los errores y deja la fase en idle", () => {
    const errores = { name: "El nombre es obligatorio" };
    const despues = formReducer(inicial, { tipo: "rechazar", errores });
    expect(despues.errores).toEqual(errores);
    expect(despues.fase).toBe("idle");
  });

  it("4) empezar — pasa a enviando y borra los errores, pero no dos veces", () => {
    const conErrores: EstadoForm = { ...conDatos, errores: { email: "mal" } };
    const despues = formReducer(conErrores, { tipo: "empezar" });
    expect(despues.fase).toBe("enviando");
    expect(despues.errores).toEqual({});

    expect(formReducer(despues, { tipo: "empezar" })).toBe(despues);
  });

  it("5) terminar — solo desde enviando, y vacía los datos", () => {
    const enviando: EstadoForm = { ...conDatos, fase: "enviando" };
    const despues = formReducer(enviando, { tipo: "terminar" });
    expect(despues.fase).toBe("enviado");
    expect(despues.datos).toEqual({ name: "", email: "", message: "" });

    expect(formReducer(conDatos, { tipo: "terminar" })).toBe(conDatos);
  });

  it("6) respuesta6 — la fase después de la secuencia", () => {
    expect(respuesta6).toBe("idle");
  });

  it("7) FormContacto — lo que escribes en Nombre se queda en el campo", async () => {
    const user = userEvent.setup();
    render(<FormContacto />);

    await user.type(screen.getByRole("textbox", { name: "Nombre" }), "Ana");
    expect(screen.getByRole("textbox", { name: "Nombre" })).toHaveValue("Ana");
  });

  it("8) FormContacto — enviar pasa por Enviando… y termina en Mensaje enviado", async () => {
    const user = userEvent.setup();
    render(<FormContacto />);

    await user.type(screen.getByRole("textbox", { name: "Nombre" }), "Ana");
    await user.type(screen.getByRole("textbox", { name: "Correo" }), "ana@mail.cl");
    await user.type(screen.getByRole("textbox", { name: "Mensaje" }), "Hola, quiero cotizar");
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(await screen.findByText("Enviando…")).toBeInTheDocument();
    expect(await screen.findByText("Mensaje enviado")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Nombre" })).toHaveValue("");
  });
});
