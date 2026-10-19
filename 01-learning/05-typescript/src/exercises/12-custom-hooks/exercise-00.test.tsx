import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  respuesta1,
  respuesta2,
  respuesta3,
  respuesta4,
  respuesta5,
  ContactoConMapa,
  respuesta7,
  TarjetaProyecto,
  respuesta9,
} from "./exercise-00";

/* Las predicciones solo comparan tu respuesta. Los drills 6 y 8 se prueban como los
 * usaría el usuario: abriendo y cerrando el mapa, y cambiándole la prop a la tarjeta
 * sin desmontarla (`rerender`). */

function pulsar(nombre: string) {
  fireEvent.click(screen.getByRole("button", { name: nombre }));
}

describe("12-custom-hooks / exercise-00 — el ciclo de vida", () => {
  it("1) respuesta1 — cuántas veces pinta Contador", () => {
    expect(respuesta1).toBe(3);
  });

  it("2) respuesta2 — qué número muestra el botón con una variable", () => {
    expect(respuesta2).toBe(0);
  });

  it("3) respuesta3 — cuántas veces pinta Info", () => {
    expect(respuesta3).toBe(2);
  });

  it("4) respuesta4 — el zoom al volver a abrir", () => {
    expect(respuesta4).toBe(1);
  });

  it("5) respuesta5 — cuándo nace y cuándo pinta el mapa", () => {
    expect(respuesta5).toEqual(["nace", "pinta", "pinta", "nace", "pinta"]);
  });

  it("6) ContactoConMapa — el zoom sobrevive a cerrar el mapa, y el mapa se desmonta", () => {
    render(<ContactoConMapa />);

    pulsar("Abrir mapa");
    pulsar("Zoom 1");
    pulsar("Zoom 2");
    expect(screen.getByRole("button", { name: "Zoom 3" })).toBeInTheDocument();

    pulsar("Cerrar mapa");
    expect(screen.queryByText(/Zoom/), "el mapa sigue en la página").not.toBeInTheDocument();

    pulsar("Abrir mapa");
    expect(screen.getByRole("button", { name: "Zoom 3" })).toBeInTheDocument();
  });

  it("7) respuesta7 — qué pasa con lo escrito al abrir el mapa", () => {
    expect(respuesta7).toBe("se conserva");
  });

  it("8) TarjetaProyecto — muestra el título que recibe, también después de cambiarlo", () => {
    const { rerender } = render(<TarjetaProyecto titulo="Projex" />);
    expect(screen.getByRole("heading", { name: "Proyecto: Projex" })).toBeInTheDocument();

    rerender(<TarjetaProyecto titulo="Smart Cooler" />);
    expect(screen.getByRole("heading", { name: "Proyecto: Smart Cooler" })).toBeInTheDocument();
  });

  it("9) respuesta9 — los registros del efecto de tu PortfolioItem", () => {
    expect(respuesta9).toEqual([
      "efecto con false",
      "efecto con true",
      "programa",
      "limpieza",
      "efecto con false",
    ]);
  });
});
