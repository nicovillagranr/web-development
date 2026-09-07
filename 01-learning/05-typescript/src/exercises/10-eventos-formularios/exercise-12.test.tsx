import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  errorDeAlias,
  errorDeCiudad,
  errorDeBio,
  hayErrores,
  mensajeDe,
  conError,
  enMayusculas,
  validar,
  AliasConError,
  PerfilValidado,
} from "./exercise-12";

const BIEN = { alias: "nico", ciudad: "Santiago", bio: "" };
const LARGA = "x".repeat(61);

describe("10-eventos-formularios / exercise-12 — el objeto de errores", () => {
  /* ── TEORÍA 1 · un objeto sin forma ──────────────────────────────────────── */

  it("1) errorDeAlias — con el alias vacío devuelve su mensaje, y si no, nada", () => {
    expect(errorDeAlias("")).toEqual({ alias: "El alias es obligatorio" });
    expect(errorDeAlias("nico")).toEqual({});
  });

  it("2) errorDeCiudad — la clave se llama `ciudad`, escrita sin erratas", () => {
    expect(errorDeCiudad("")).toEqual({ ciudad: "La ciudad es obligatoria" });
    expect(errorDeCiudad("Santiago")).toEqual({});
  });

  it("3) errorDeBio — pasando de 60 caracteres guarda el MENSAJE, no un sí/no", () => {
    expect(errorDeBio("hola")).toEqual({});
    expect(errorDeBio(LARGA)).toEqual({
      bio: "La bio no puede pasar de 60 caracteres",
    });
  });

  /* ── TEORÍA 2 · la clave que puede faltar ────────────────────────────────── */

  it("4) hayErrores — un objeto sin claves es `false`, con una es `true`", () => {
    expect(hayErrores({})).toBe(false);
    expect(hayErrores({ alias: "x" })).toBe(true);
    expect(hayErrores({ alias: "x", bio: "y" })).toBe(true);
  });

  it("5) mensajeDe — devuelve el mensaje, y texto vacío si ese campo no tiene", () => {
    expect(mensajeDe({ alias: "x" }, "alias")).toBe("x");
    expect(mensajeDe({ alias: "x" }, "ciudad")).toBe("");
    expect(mensajeDe({}, "bio")).toBe("");
  });

  it("5) mensajeDe — `campo` no admite un texto cualquiera", () => {
    // No comprueba nada en ejecución: comprueba que la línea de abajo NO compila.
    // Si `campo` acepta cualquier `string`, la directiva sobra y `pnpm typecheck`
    // lo canta.
    // @ts-expect-error "ciduad" no es una clave de Errores
    expect(mensajeDe({}, "ciduad")).toBe("");
  });

  it("6) conError — añade la clave sin tocar el objeto que le pasaron", () => {
    const original = { alias: "a" };
    const siguiente = conError(original, "bio", "muy larga");

    expect(siguiente).toEqual({ alias: "a", bio: "muy larga" });
    expect(original).toEqual({ alias: "a" });
    expect(siguiente).not.toBe(original);
  });

  /* ── TEORÍA 3 · comprobar antes de usar ──────────────────────────────────── */

  it("7) enMayusculas — sube el mensaje, y aguanta que no haya ninguno", () => {
    expect(enMayusculas("uy")).toBe("UY");
    expect(enMayusculas(undefined)).toBe("");
  });

  it("8) validar — junta los errores de los tres campos en un solo objeto", () => {
    expect(validar(BIEN)).toEqual({});

    expect(validar({ alias: "", ciudad: "", bio: "" })).toEqual({
      alias: "El alias es obligatorio",
      ciudad: "La ciudad es obligatoria",
    });

    expect(validar({ ...BIEN, bio: LARGA })).toEqual({
      bio: "La bio no puede pasar de 60 caracteres",
    });
  });

  it("9) AliasConError — el aviso aparece al vaciar el campo y se va al escribir", async () => {
    const user = userEvent.setup();
    render(<AliasConError />);
    const alias = screen.getByLabelText("Alias");

    // arranca vacío, pero todavía no se ha tocado nada: no hay aviso
    expect(screen.queryByRole("alert")).toBeNull();

    await user.type(alias, "nv");
    expect(screen.queryByRole("alert")).toBeNull();

    await user.clear(alias);
    expect(screen.getByRole("alert")).toHaveTextContent("El alias es obligatorio");
  });

  it("10) PerfilValidado — no valida al escribir, solo al enviar", async () => {
    const user = userEvent.setup();
    render(<PerfilValidado />);

    // el alias arranca vacío y aun así no hay ningún aviso en pantalla
    expect(screen.queryAllByRole("alert")).toHaveLength(0);

    await user.type(screen.getByLabelText("Bio"), "hola");
    expect(screen.queryAllByRole("alert")).toHaveLength(0);

    await user.click(screen.getByRole("button", { name: "Guardar" }));

    const avisos = screen.getAllByRole("alert");
    expect(avisos).toHaveLength(1);
    expect(avisos[0]).toHaveTextContent("El alias es obligatorio");
  });

  it("10) PerfilValidado — con los tres campos bien, enviar no deja ningún aviso", async () => {
    const user = userEvent.setup();
    render(<PerfilValidado />);

    await user.type(screen.getByLabelText("Alias"), "nico");
    await user.click(screen.getByRole("button", { name: "Guardar" }));

    expect(screen.queryAllByRole("alert")).toHaveLength(0);
  });
});
