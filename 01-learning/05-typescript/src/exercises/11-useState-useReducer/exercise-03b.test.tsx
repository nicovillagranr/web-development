import { StrictMode } from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  respuesta1,
  respuesta2,
  respuesta3,
  subirContador,
  anotar,
  borrarEntrada,
  mudarse,
  alternarTarea,
  ListaCompra,
  PanelNotas,
  type EstadoPanel,
  type Perfil,
  type Tarea,
} from "./exercise-03b";

/* Del 4 al 8, cada función se comprueba dos veces: que devuelve lo pedido, y que el que
 * entró sigue EXACTAMENTE igual. La primera mitad la pasan casi todos los starters; la
 * segunda es la del ejercicio. */

describe("11-useState-useReducer / exercise-03b — no toques lo que te llega", () => {
  it("1) respuesta1 — el texto está escrito en la hoja", () => {
    expect(respuesta1).toBe("Nico");
  });

  it("2) respuesta2 — reasignar la propiedad en la copia", () => {
    expect(respuesta2).toEqual(["TS"]);
  });

  it("3) respuesta3 — un objeto dentro también es taquilla", () => {
    expect(respuesta3).toBe("Lima");
  });

  it("4) subirContador — suma uno y no toca el que entra", () => {
    const antes: EstadoPanel = { contador: 3, historial: [] };
    const despues = subirContador(antes);

    expect(despues.contador).toBe(4);
    expect(antes.contador).toBe(3);
  });

  it("5) anotar — añade al final y no toca el historial que entra", () => {
    const antes: EstadoPanel = { contador: 0, historial: ["a"] };
    const despues = anotar(antes, "b");

    expect(despues.historial).toEqual(["a", "b"]);
    expect(antes.historial).toEqual(["a"]);
  });

  it("6) borrarEntrada — quita la de esa posición y no toca el historial que entra", () => {
    const antes: EstadoPanel = { contador: 0, historial: ["a", "b", "c"] };
    const despues = borrarEntrada(antes, 1);

    expect(despues.historial).toEqual(["a", "c"]);
    expect(antes.historial).toEqual(["a", "b", "c"]);
  });

  it("7) mudarse — cambia la ciudad y no toca la dirección que entra", () => {
    const antes: Perfil = { nombre: "Ana", direccion: { ciudad: "Santiago" } };
    const despues = mudarse(antes, "Lima");

    expect(despues).toEqual({ nombre: "Ana", direccion: { ciudad: "Lima" } });
    expect(antes.direccion.ciudad).toBe("Santiago");
  });

  it("8) alternarTarea — cambia solo esa tarea y no toca las que entran", () => {
    const antes: Tarea[] = [
      { id: 1, texto: "pan", hecha: false },
      { id: 2, texto: "leche", hecha: true },
    ];
    const despues = alternarTarea(antes, 1);

    expect(despues).toEqual([
      { id: 1, texto: "pan", hecha: true },
      { id: 2, texto: "leche", hecha: true },
    ]);
    expect(antes[0]?.hecha).toBe(false);
  });

  it("9) ListaCompra — cada click añade una leche y se ve", async () => {
    const user = userEvent.setup();
    render(<ListaCompra />);

    await user.click(screen.getByRole("button", { name: "Añadir leche" }));
    await user.click(screen.getByRole("button", { name: "Añadir leche" }));

    expect(screen.getAllByRole("listitem").map((li) => li.textContent)).toEqual([
      "pan",
      "leche",
      "leche",
    ]);
  });

  it("10) PanelNotas — dentro de StrictMode, un click es UNA nota", async () => {
    const user = userEvent.setup();
    render(
      <StrictMode>
        <PanelNotas />
      </StrictMode>,
    );

    await user.click(screen.getByRole("button", { name: "Anotar" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(1);

    await user.click(screen.getByRole("button", { name: "Anotar" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
