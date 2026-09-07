import { useState } from "react";
import type { ChangeEvent } from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  conAliasCambiado,
  conCampoCambiado,
  conCampoSiEsValido,
  longitudDe,
  nombreYValor,
  datosDelCampo,
  PerfilQueEscribe,
  PerfilDosCampos,
  PerfilConBio,
  PerfilCompacto,
} from "./exercise-11";

const BASE = { alias: "nico", ciudad: "Santiago", bio: "" };

describe("10-eventos-formularios / exercise-11 — un objeto para todo el formulario", () => {
  /* ── TEORÍA 1 · pisar una clave copiando ─────────────────────────────────── */

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
    // sobra y `pnpm typecheck` lo dice.
    // @ts-expect-error "ciduad" no es una clave de Perfil
    const siguiente = conCampoCambiado(BASE, "ciduad", "x");
    expect(siguiente).toBeDefined();
  });

  it("3) conCampoSiEsValido — con una clave buena se comporta como el drill 2", () => {
    const original = { ...BASE };
    const siguiente = conCampoSiEsValido(original, "bio", "hola");

    expect(siguiente).toEqual({ alias: "nico", ciudad: "Santiago", bio: "hola" });
    expect(original).toEqual(BASE);
  });

  it("3) conCampoSiEsValido — con una clave que no existe devuelve el mismo objeto", () => {
    const original = { ...BASE };
    const siguiente = conCampoSiEsValido(original, "ciduad", "Iquique");

    expect(siguiente).toBe(original);
    expect(original).toEqual(BASE);
  });

  /* ── TEORÍA 2 · un tipo que abarca dos ───────────────────────────────────── */

  it("4) longitudDe — sirve para un texto y para una lista de textos", () => {
    expect(longitudDe("abc")).toBe(3);
    expect(longitudDe(["a", "b"])).toBe(2);
    expect(longitudDe("")).toBe(0);
    expect(longitudDe([])).toBe(0);
  });

  it("5) nombreYValor — lee name y value de un <input> y de un <textarea>", () => {
    const input = document.createElement("input");
    input.name = "alias";
    input.value = "nv";

    const textarea = document.createElement("textarea");
    textarea.name = "bio";
    textarea.value = "hola";

    expect(nombreYValor(input)).toEqual({ name: "alias", value: "nv" });
    expect(nombreYValor(textarea)).toEqual({ name: "bio", value: "hola" });
  });

  it("6) datosDelCampo — el mismo evento sirve al <input> y al <textarea>", async () => {
    // Este componente auxiliar es del test, no del ejercicio: existe solo para
    // disparar un ChangeEvent de verdad sobre los dos elementos y ver que
    // `datosDelCampo` los acepta a los dos.
    function Sonda() {
      const [visto, setVisto] = useState("");
      const mirar = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = datosDelCampo(e);
        setVisto(`${name}=${value}`);
      };
      return (
        <div>
          <input name="alias" aria-label="Alias" onChange={mirar} />
          <textarea name="bio" aria-label="Bio" onChange={mirar} />
          <p>{visto}</p>
        </div>
      );
    }

    render(<Sonda />);
    await userEvent.type(screen.getByLabelText("Alias"), "n");
    expect(screen.getByText("alias=n")).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText("Bio"), "h");
    expect(screen.getByText("bio=h")).toBeInTheDocument();
  });

  /* ── TEORÍA 3 · un manejador para todos ──────────────────────────────────── */

  it("7) PerfilQueEscribe — el estado es el perfil entero y el <p> sigue al campo", async () => {
    render(<PerfilQueEscribe />);
    await userEvent.type(screen.getByLabelText("Alias"), "nv");

    expect(screen.getByLabelText("Alias")).toHaveValue("nv");
    expect(screen.getByText("nv")).toBeInTheDocument();
  });

  it("8) PerfilDosCampos — un manejador, y cada campo escribe en su clave", async () => {
    render(<PerfilDosCampos />);
    await userEvent.type(screen.getByLabelText("Alias"), "nv");
    await userEvent.clear(screen.getByLabelText("Ciudad"));
    await userEvent.type(screen.getByLabelText("Ciudad"), "Iquique");

    expect(screen.getByLabelText("Alias")).toHaveValue("nv");
    expect(screen.getByLabelText("Ciudad")).toHaveValue("Iquique");
    expect(screen.getByText("nv")).toBeInTheDocument();
    expect(screen.getByText("Iquique")).toBeInTheDocument();
  });

  it("9) PerfilConBio — el mismo manejador sirve también al <textarea>", async () => {
    render(<PerfilConBio />);
    await userEvent.type(screen.getByLabelText("Alias"), "nv");
    await userEvent.type(screen.getByLabelText("Bio"), "hola");

    expect(screen.getByLabelText("Alias")).toHaveValue("nv");
    expect(screen.getByLabelText("Bio")).toHaveValue("hola");
    // El <textarea> también lleva "hola" dentro, así que hay que decir cuál se busca
    expect(screen.getByText("hola", { selector: "p" })).toBeInTheDocument();
  });

  it("10) PerfilCompacto — se comporta igual que el 9, con el manejador delegando", async () => {
    render(<PerfilCompacto />);
    await userEvent.type(screen.getByLabelText("Alias"), "nv");
    await userEvent.clear(screen.getByLabelText("Ciudad"));
    await userEvent.type(screen.getByLabelText("Ciudad"), "Iquique");
    await userEvent.type(screen.getByLabelText("Bio"), "hola");

    expect(screen.getByLabelText("Alias")).toHaveValue("nv");
    expect(screen.getByLabelText("Ciudad")).toHaveValue("Iquique");
    expect(screen.getByLabelText("Bio")).toHaveValue("hola");
    expect(screen.getByText("nv")).toBeInTheDocument();
    expect(screen.getByText("Iquique")).toBeInTheDocument();
    expect(screen.getByText("hola", { selector: "p" })).toBeInTheDocument();
  });
});
