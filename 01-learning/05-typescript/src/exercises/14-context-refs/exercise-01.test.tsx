import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  TemaContext,
  Fondo,
  AppConUsuario,
  AppDeAdmin,
  AppConTema,
  IdiomaContext,
  Enlace,
  Pagina,
} from "./exercise-01";

describe("14-context-refs / exercise-01 — el contexto: crear, proveer y leer", () => {
  it("1) TemaContext — Fondo pinta el tema que le llega, y claro si nadie lo provee", () => {
    const sinProvider = render(<Fondo />);
    expect(screen.getByText("Tema claro")).toHaveAttribute("data-tema", "claro");
    sinProvider.unmount();

    render(
      <TemaContext value="oscuro">
        <Fondo />
      </TemaContext>,
    );
    expect(screen.getByText("Tema oscuro")).toHaveAttribute("data-tema", "oscuro");
  });

  it("2) AppConUsuario — la cabecera y el menú leen el mismo nombre", () => {
    render(<AppConUsuario nombre="Nico" />);
    expect(
      screen.getByText(/^Hola,/),
      "La cabecera también tiene que oír el nombre: tiene que estar dentro del Provider",
    ).toHaveTextContent("Hola, Nico");
    expect(screen.getByText(/^Cuenta de/)).toHaveTextContent("Cuenta de Nico");
  });

  it("3) AppDeAdmin — el Provider da la sesión entera", () => {
    render(<AppDeAdmin />);
    expect(
      screen.getByText(/^Nico ·/),
      "El rol no sale del valor por defecto: el Provider tiene que dar el objeto entero",
    ).toHaveTextContent("Nico · admin");
  });

  it("4) AppConTema — Fondo sigue al tema del estado", () => {
    render(<AppConTema />);
    expect(screen.getByText(/^Tema/)).toHaveTextContent("Tema claro");

    fireEvent.click(screen.getByRole("button", { name: "Pasar a oscuro" }));
    expect(screen.getByRole("button")).toHaveTextContent("Pasar a claro");
    expect(screen.getByText(/^Tema/), "Al pulsar, el Provider tiene que dar el tema nuevo").toHaveTextContent(
      "Tema oscuro",
    );

    fireEvent.click(screen.getByRole("button", { name: "Pasar a claro" }));
    expect(screen.getByText(/^Tema/)).toHaveTextContent("Tema claro");
  });

  it("5) Pagina — el enlace sale en el idioma de Pagina, sin pasar por Menu", () => {
    const enIngles = render(<Pagina idioma="en" />);
    expect(
      screen.getByRole("link"),
      "Pagina va en inglés: el enlace tiene que decir «Home»",
    ).toHaveTextContent("Home");
    enIngles.unmount();

    const enEspanol = render(<Pagina idioma="es" />);
    expect(screen.getByRole("link")).toHaveTextContent("Inicio");
    enEspanol.unmount();

    render(
      <IdiomaContext value="en">
        <Enlace />
      </IdiomaContext>,
    );
    expect(screen.getByRole("link"), "Enlace lee el idioma del contexto, no de una prop").toHaveTextContent(
      "Home",
    );
  });
});
