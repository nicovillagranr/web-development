import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  conAliasCambiado,
  conCampoCambiado,
  PerfilQueEscribe,
  PerfilDosCampos,
  PerfilConBio,
} from "./exercise-11";

const BASE = { alias: "nico", ciudad: "Santiago", bio: "" };

describe("10-eventos-formularios / exercise-11 — un objeto para todo el formulario", () => {
  it("1) conAliasCambiado — devuelve otro perfil con el alias pisado", () => {
    const original = { ...BASE };
    const siguiente = conAliasCambiado(original, "nv");

    expect(siguiente).toEqual({ alias: "nv", ciudad: "Santiago", bio: "" });
    expect(original).toEqual(BASE);
    expect(siguiente).not.toBe(original);
  });

  it("2) conCampoCambiado — pisa la clave que le digan y no toca el original", () => {
    const original = { ...BASE };
    const siguiente = conCampoCambiado(original, "ciudad", "Iquique");

    expect(siguiente).toEqual({ alias: "nico", ciudad: "Iquique", bio: "" });
    expect(original).toEqual(BASE);
    expect(siguiente).not.toBe(original);
  });

  it("2) conCampoCambiado — `campo` no admite un texto cualquiera", () => {
    // Este test no comprueba nada en tiempo de ejecución: comprueba que la línea
    // de abajo NO compila. Si `campo` acepta cualquier `string`, la directiva
    // sobra y `pnpm typecheck` lo dice. Es el único drill del archivo cuya señal
    // está solo ahí.
    // @ts-expect-error "ciduad" no es una clave de Perfil
    const siguiente = conCampoCambiado(BASE, "ciduad", "x");
    expect(siguiente).toBeDefined();
  });

  it("3) PerfilQueEscribe — el estado es el perfil entero y el <p> sigue al campo", async () => {
    render(<PerfilQueEscribe />);
    await userEvent.type(screen.getByLabelText("Alias"), "nv");

    expect(screen.getByLabelText("Alias")).toHaveValue("nv");
    expect(screen.getByText("nv")).toBeInTheDocument();
  });

  it("4) PerfilDosCampos — un manejador, y cada campo escribe en su clave", async () => {
    render(<PerfilDosCampos />);
    await userEvent.type(screen.getByLabelText("Alias"), "nv");
    await userEvent.clear(screen.getByLabelText("Ciudad"));
    await userEvent.type(screen.getByLabelText("Ciudad"), "Iquique");

    expect(screen.getByLabelText("Alias")).toHaveValue("nv");
    expect(screen.getByLabelText("Ciudad")).toHaveValue("Iquique");
    expect(screen.getByText("nv")).toBeInTheDocument();
    expect(screen.getByText("Iquique")).toBeInTheDocument();
  });

  it("5) PerfilConBio — el mismo manejador sirve al <textarea>", async () => {
    render(<PerfilConBio />);
    await userEvent.type(screen.getByLabelText("Alias"), "nv");
    await userEvent.type(screen.getByLabelText("Bio"), "hola");

    expect(screen.getByLabelText("Alias")).toHaveValue("nv");
    expect(screen.getByLabelText("Bio")).toHaveValue("hola");
    // El <textarea> también lleva "hola" dentro, así que hay que decir cuál se busca
    expect(screen.getByText("hola", { selector: "p" })).toBeInTheDocument();
  });
});
