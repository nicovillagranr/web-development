import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import {
  respuesta1,
  respuesta2,
  respuesta3,
  respuesta4,
  respuesta5,
  PortfolioConQuitar,
  respuesta7,
  respuesta8,
  ProyectoDestacado,
} from "./exercise-00b";

/* Las predicciones solo comparan tu respuesta. Los drills 6 y 9 se prueban como los
 * usaría el usuario: pulsando "Ver detalle" y quitando o cambiando el proyecto antes de
 * que pasen los 3 segundos del aviso. En el 9 los temporizadores son de mentira
 * (`vi.useFakeTimers`), y `vi.getTimerCount()` cuenta los que siguen pendientes. */

const AVISO = "AVISO: Proyecto Demo";

function pulsar(nombre: string) {
  fireEvent.click(screen.getByRole("button", { name: nombre }));
}

describe("12-custom-hooks / exercise-00b — la identidad", () => {
  it("1) respuesta1 — qué pasa con lo escrito al cambiar de rama en el ternario", () => {
    expect(respuesta1).toBe("se conserva");
  });

  it("2) respuesta2 — qué pasa con lo escrito con dos &&", () => {
    expect(respuesta2).toBe("se borra");
  });

  it("3) respuesta3 — qué queda escrito con un componente definido dentro de otro", () => {
    expect(respuesta3).toBe("H");
  });

  it("4) respuesta4 — el número de Me gusta después de Volver a montar", () => {
    expect(respuesta4).toBe(0);
  });

  it("5) respuesta5 — en qué tarjeta se ve el aviso con el índice como key", () => {
    expect(respuesta5).toBe("Smart Cooler");
  });

  it("6) PortfolioConQuitar — cada aviso se queda con su proyecto y se va con él", () => {
    render(<PortfolioConQuitar />);

    pulsar("Ver detalle: Projex");
    pulsar("Quitar el primero");
    expect(
      screen.queryByText(AVISO),
      "el aviso de Projex ha saltado a otra tarjeta",
    ).not.toBeInTheDocument();

    pulsar("Ver detalle: Store Pulse");
    pulsar("Quitar el primero");
    expect(screen.getByText(AVISO).closest("article")).toHaveTextContent("Store Pulse");
  });

  it("7) respuesta7 — los registros al cambiar la key de la sala", () => {
    expect(respuesta7).toEqual([
      "pinta norte",
      "conecta norte",
      "pinta sur",
      "desconecta norte",
      "conecta sur",
    ]);
  });

  it("8) respuesta8 — el contador en la sala sur, sin key", () => {
    expect(respuesta8).toBe(2);
  });

  describe("9) ProyectoDestacado", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    it("9) cada proyecto llega sin aviso y no deja el temporizador del anterior", () => {
      render(<ProyectoDestacado />);

      pulsar("Ver detalle: Projex");
      expect(screen.getByText(AVISO)).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      pulsar("Siguiente proyecto");
      expect(screen.getByRole("heading", { name: "Smart Cooler" })).toBeInTheDocument();
      expect(
        screen.queryByText(AVISO),
        "el aviso de Projex ha pasado a Smart Cooler",
      ).not.toBeInTheDocument();
      expect(vi.getTimerCount(), "temporizadores pendientes").toBe(0);
    });
  });
});
