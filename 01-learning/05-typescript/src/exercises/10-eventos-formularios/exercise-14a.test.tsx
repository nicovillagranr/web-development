import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  copiaDe,
  conCorreo,
  conCampo,
  datosDelCampo,
  siguientesDatos,
  DosCamposUnManejador,
} from "./exercise-14a";
import type { Datos } from "./exercise-14a";

/* La caja de la que parten casi todos los drills. Se declara una vez y NO se toca dentro
 * de ningún test: varios drills comprueban justamente que sigue intacta al final. */
const BASE: Datos = { name: "Nico", email: "nico@mail.cl", message: "Quiero una landing" };

describe("10-eventos-formularios / exercise-14a — una caja nueva cada letra", () => {
  it("1) copiaDe — mismos campos", () => {
    expect(copiaDe(BASE)).toEqual(BASE);
  });

  it("1) copiaDe — pero no es la misma caja", () => {
    /* `toEqual` compara lo que hay dentro; `toBe` compara si son el mismo objeto.
     * Aquí lo de dentro tiene que coincidir y el objeto tiene que ser otro. */
    expect(copiaDe(BASE)).not.toBe(BASE);
  });

  it("2) conCorreo — cambia el correo y deja los otros dos", () => {
    expect(conCorreo(BASE, "otro@mail.cl")).toEqual({
      name: "Nico",
      email: "otro@mail.cl",
      message: "Quiero una landing",
    });
  });

  it("2) conCorreo — no le inventa claves a la caja", () => {
    expect(Object.keys(conCorreo(BASE, "otro@mail.cl")).sort()).toEqual([
      "email",
      "message",
      "name",
    ]);
  });

  it("3) conCampo — pisa el campo que le nombran, sea cual sea", () => {
    expect(conCampo(BASE, "email", "otro@mail.cl")).toEqual({
      name: "Nico",
      email: "otro@mail.cl",
      message: "Quiero una landing",
    });
    expect(conCampo(BASE, "message", "Hey")).toEqual({
      name: "Nico",
      email: "nico@mail.cl",
      message: "Hey",
    });
  });

  it("3) conCampo — la caja original no se entera", () => {
    conCampo(BASE, "name", "Otro");
    expect(BASE.name).toBe("Nico");
  });

  it("4) datosDelCampo — saca el nombre y el valor, cada uno el suyo", () => {
    expect(datosDelCampo({ name: "email", value: "nico@mail.cl" })).toEqual({
      name: "email",
      value: "nico@mail.cl",
    });
  });

  it("5) siguientesDatos — cambia el campo que le dicen, no siempre el mismo", () => {
    expect(siguientesDatos(BASE, { name: "message", value: "Hey" })).toEqual({
      name: "Nico",
      email: "nico@mail.cl",
      message: "Hey",
    });
    expect(siguientesDatos(BASE, { name: "name", value: "Otro" })).toEqual({
      name: "Otro",
      email: "nico@mail.cl",
      message: "Quiero una landing",
    });
  });

  it("5) siguientesDatos — se apoya en el par del drill 4 sin retocarlo", () => {
    /* La salida del 4 entra en el 5 tal cual, sin tocar nada por el camino. */
    const par = datosDelCampo({ name: "email", value: "otro@mail.cl" });
    expect(siguientesDatos(BASE, par)).toEqual({
      name: "Nico",
      email: "otro@mail.cl",
      message: "Quiero una landing",
    });
  });

  it("6) DosCamposUnManejador — arranca con los dos campos vacíos", () => {
    render(<DosCamposUnManejador />);

    expect(screen.getByLabelText("Nombre")).toHaveValue("");
    expect(screen.getByLabelText("Correo")).toHaveValue("");
  });

  it("6) DosCamposUnManejador — escribir en uno no vacía el otro", async () => {
    const user = userEvent.setup();
    render(<DosCamposUnManejador />);

    await user.type(screen.getByLabelText("Nombre"), "Nico");
    await user.type(screen.getByLabelText("Correo"), "nico@mail.cl");

    expect(screen.getByLabelText("Nombre")).toHaveValue("Nico");
    expect(screen.getByLabelText("Correo")).toHaveValue("nico@mail.cl");
  });
});
