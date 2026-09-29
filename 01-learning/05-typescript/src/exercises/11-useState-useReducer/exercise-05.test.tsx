import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ana,
  respuesta1,
  respuesta2,
  respuesta3,
  respuesta4,
  respuesta5,
  mudarse,
  renombrarYMudar,
  cambiarTema,
  restablecer,
  TarjetaPerfil,
  type Perfil,
} from "./exercise-05";

/* Del 1 al 5 se comprueban tus predicciones. Del 6 al 9 se llama a cada función a
 * mano y se mira lo que devuelve, y también que `ana` sigue intacta después: una
 * copia que toca el original no es una copia. El 10 se prueba en pantalla. */

const copiaDeAna = (): Perfil => ({ ...ana, preferencias: { ...ana.preferencias } });

describe("11-useState-useReducer / exercise-05 — qué sale de un spread", () => {
  it("1) respuesta1 — el spread lo copia todo", () => {
    expect(respuesta1).toBe("Santiago");
  });

  it("2) respuesta2 — lo que no nombras sale igual", () => {
    expect(respuesta2).toBe("Ana");
  });

  it("3) respuesta3 — gana lo que está más a la derecha", () => {
    expect(respuesta3).toBe("Santiago");
  });

  it("4) respuesta4 — pisar un objeto lo cambia entero", () => {
    expect(respuesta4).toBeUndefined();
  });

  it("5) respuesta5 — una copia es otro objeto", () => {
    expect(respuesta5).toBe(false);
  });

  it("6) mudarse — cambia la ciudad y nada más", () => {
    const antes = copiaDeAna();
    const r = mudarse(ana, "Talca");
    expect(r).toEqual({ ...antes, ciudad: "Talca" });
    expect(ana).toEqual(antes);
  });

  it("7) renombrarYMudar — cambia el nombre y la ciudad, cada uno en su sitio", () => {
    const antes = copiaDeAna();
    const r = renombrarYMudar(ana, "Bea", "Talca");
    expect(r.nombre).toBe("Bea");
    expect(r.ciudad).toBe("Talca");
    expect(r.preferencias).toEqual({ tema: "claro", idioma: "Español" });
    expect(ana).toEqual(antes);
  });

  it("8) cambiarTema — cambia el tema y conserva el idioma", () => {
    const antes = copiaDeAna();
    const r = cambiarTema(ana, "oscuro");
    expect(r.preferencias).toEqual({ tema: "oscuro", idioma: "Español" });
    expect(r.nombre).toBe("Ana");
    expect(ana).toEqual(antes);
  });

  it("9) restablecer — preferencias de fábrica, nombre y ciudad intactos", () => {
    const tuneado: Perfil = {
      nombre: "Bea",
      ciudad: "Talca",
      preferencias: { tema: "oscuro", idioma: "English" },
    };
    const r = restablecer(tuneado);
    expect(r).toEqual({
      nombre: "Bea",
      ciudad: "Talca",
      preferencias: { tema: "claro", idioma: "Español" },
    });
    expect(tuneado.preferencias.idioma).toBe("English");
  });

  it("10) TarjetaPerfil — cada botón cambia lo suyo y no deshace lo de los demás", async () => {
    const user = userEvent.setup();
    render(<TarjetaPerfil />);

    await user.click(screen.getByRole("button", { name: "Modo oscuro" }));
    expect(screen.getByText("Tema: oscuro · Idioma: Español")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Mudarse de Santiago a Talca" }));
    expect(screen.getByText("Ana · Talca")).toBeInTheDocument();
    expect(screen.getByText("Tema: oscuro · Idioma: Español")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Idioma: English" }));
    expect(screen.getByText("Tema: oscuro · Idioma: English")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Restablecer preferencias" }));
    expect(screen.getByText("Tema: claro · Idioma: Español")).toBeInTheDocument();
    expect(screen.getByText("Ana · Talca")).toBeInTheDocument();
  });
});
