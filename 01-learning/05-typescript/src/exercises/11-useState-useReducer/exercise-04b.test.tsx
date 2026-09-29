import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  marcarEditando,
  cambiarTitulo,
  respuesta3,
  trasEscribir,
  alEscribir,
  alEscribirDentro,
  escribirTitulo,
  escribir,
  notaReducer,
  EditorNota,
  type Nota,
} from "./exercise-04b";

/* Los drills 1 al 8 son funciones puras: se llaman a mano y se mira lo que devuelven.
 * En varios se comprueba también que la nota original sigue igual después, porque
 * una copia que toca lo que recibe no es una copia. En el 5, cuando no pasa nada, la
 * función tiene que devolver EL MISMO objeto: por eso ese test usa `toBe`. */

const guardada = (): Nota => ({
  contenido: { titulo: "Lista", cuerpo: "pan" },
  estado: "guardado",
});
const conEstado = (estado: Nota["estado"]): Nota => ({ ...guardada(), estado });

describe("11-useState-useReducer / exercise-04b — una copia con una regla dentro", () => {
  it("1) marcarEditando — el estado sale en editando y el contenido igual", () => {
    const nota = guardada();
    const r = marcarEditando(nota);
    expect(r.estado).toBe("editando");
    expect(r.contenido).toEqual({ titulo: "Lista", cuerpo: "pan" });
    expect(nota.estado).toBe("guardado");
  });

  it("2) cambiarTitulo — cambia el título; cuerpo y estado salen como entraron", () => {
    const nota = guardada();
    const r = cambiarTitulo(nota, "Compra");
    expect(r.contenido.titulo).toBe("Compra");
    expect(r.contenido.cuerpo).toBe("pan");
    expect(r.estado).toBe("guardado");
    expect(nota.contenido.titulo).toBe("Lista");
  });

  it("3) respuesta3 — el estado con el que sale la copia", () => {
    expect(respuesta3).toBe("guardado");
  });

  it("4) trasEscribir — guardado pasa a editando; los otros dos se quedan", () => {
    expect(trasEscribir("guardado")).toBe("editando");
    expect(trasEscribir("guardando")).toBe("guardando");
    expect(trasEscribir("editando")).toBe("editando");
  });

  it("5) alEscribir — desde guardado, copia en editando; si no, la MISMA nota", () => {
    const nota = guardada();
    const r = alEscribir(nota);
    expect(r.estado).toBe("editando");
    expect(nota.estado).toBe("guardado");

    const guardando = conEstado("guardando");
    expect(alEscribir(guardando)).toBe(guardando);
    const editando = conEstado("editando");
    expect(alEscribir(editando)).toBe(editando);
  });

  it("6) alEscribirDentro — la misma regla, con el resultado en una copia", () => {
    expect(alEscribirDentro(guardada()).estado).toBe("editando");
    expect(alEscribirDentro(conEstado("guardando")).estado).toBe("guardando");
    expect(alEscribirDentro(conEstado("editando")).estado).toBe("editando");
    expect(alEscribirDentro(guardada()).contenido).toEqual({ titulo: "Lista", cuerpo: "pan" });
  });

  it("7) escribirTitulo — cambia el título Y aplica la regla del estado", () => {
    const nota = guardada();
    const r = escribirTitulo(nota, "Compra");
    expect(r.contenido).toEqual({ titulo: "Compra", cuerpo: "pan" });
    expect(r.estado).toBe("editando");
    expect(nota.contenido.titulo).toBe("Lista");

    expect(escribirTitulo(conEstado("guardando"), "Otra").estado).toBe("guardando");
  });

  it("8) escribir — cualquier campo del contenido, y la misma regla", () => {
    const nota = guardada();
    const r = escribir(nota, "cuerpo", "leche");
    expect(r.contenido).toEqual({ titulo: "Lista", cuerpo: "leche" });
    expect(r.estado).toBe("editando");
    expect(nota.contenido.cuerpo).toBe("pan");

    const t = escribir(conEstado("guardando"), "titulo", "Compra");
    expect(t.contenido).toEqual({ titulo: "Compra", cuerpo: "pan" });
    expect(t.estado).toBe("guardando");
  });

  it("9) notaReducer + EditorNota — escribir después de guardar quita el aviso", async () => {
    const r = notaReducer(guardada(), { tipo: "escribir", campo: "titulo", valor: "Compra" });
    expect(r.contenido.titulo).toBe("Compra");
    expect(r.estado).toBe("editando");

    const user = userEvent.setup();
    render(<EditorNota />);
    const titulo = screen.getByLabelText("Título");
    await user.type(titulo, "Lista");
    expect(titulo).toHaveValue("Lista");

    await user.click(screen.getByRole("button", { name: "Guardar" }));
    expect(screen.getByRole("status")).toHaveTextContent("Guardado");

    await user.type(titulo, "s");
    expect(titulo).toHaveValue("Listas");
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });
});
