import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  puedeReservar,
  respuesta2,
  textoDeMesa,
  respuesta4,
  mesaReducer,
  etiquetaDe,
  reservaReducer,
  reservaVacia,
  FormReserva,
  respuesta9,
  respuesta10,
  soloUnCampo,
  papelComentario,
  respuesta12,
  desdePapel,
  respuesta14,
  cambiar,
  type Reserva,
} from "./exercise-07";

/* Ojo: los drills 1 y 6 son de TIPOS. Su test comprueba que la función de debajo
 * responde bien, y eso pasa también con el starter: el fallo de esos dos solo lo
 * ve `pnpm typecheck`. */

describe("11-useState-useReducer / exercise-07 — el tipo dice qué casos existen", () => {
  it("1) Mesa + puedeReservar — solo una mesa libre se reserva", () => {
    expect(puedeReservar("libre")).toBe(true);
    expect(puedeReservar("reservada")).toBe(false);
    expect(puedeReservar("ocupada")).toBe(false);
  });

  it("2) respuesta2 — ¿compila guardar un string en una Mesa?", () => {
    expect(respuesta2).toBe("no compila");
  });

  it("3) textoDeMesa — un texto por cada mesa", () => {
    expect(textoDeMesa("libre")).toBe("Mesa libre");
    expect(textoDeMesa("reservada")).toBe("Mesa reservada");
    expect(textoDeMesa("ocupada")).toBe("Mesa ocupada");
  });

  it("4) respuesta4 — ¿quién avisa del case que falta?", () => {
    expect(respuesta4).toBe("nadie");
  });

  it("5) mesaReducer, liberar — vuelve a libre desde cualquier mesa", () => {
    expect(mesaReducer("ocupada", { tipo: "liberar" })).toBe("libre");
    expect(mesaReducer("reservada", { tipo: "liberar" })).toBe("libre");
    expect(mesaReducer("libre", { tipo: "liberar" })).toBe("libre");
  });

  it("6) CampoReserva + etiquetaDe — la etiqueta de cada campo", () => {
    expect(etiquetaDe("nombre")).toBe("Nombre");
    expect(etiquetaDe("telefono")).toBe("Teléfono");
    expect(etiquetaDe("comentario")).toBe("Comentario");
  });

  it("7) reservaReducer, escribir — cambia el campo del papel, y solo ese", () => {
    const original = { ...reservaVacia, nombre: "Ana" };
    expect(
      reservaReducer(original, { tipo: "escribir", campo: "telefono", valor: "912345678" }),
    ).toEqual({ nombre: "Ana", telefono: "912345678", comentario: "" });
    expect(
      reservaReducer(original, { tipo: "escribir", campo: "comentario", valor: "Ventana" }),
    ).toEqual({ nombre: "Ana", telefono: "", comentario: "Ventana" });
    expect(original.telefono).toBe("");
  });

  it("8) FormReserva — cada campo escribe en el suyo", async () => {
    const user = userEvent.setup();
    render(<FormReserva />);

    await user.type(screen.getByLabelText("Teléfono"), "912");
    expect(screen.getByLabelText("Teléfono")).toHaveValue("912");
    expect(screen.getByLabelText("Nombre")).toHaveValue("");

    await user.type(screen.getByLabelText("Nombre"), "Ana");
    await user.type(screen.getByLabelText("Comentario"), "Ventana");
    expect(screen.getByLabelText("Nombre")).toHaveValue("Ana");
    expect(screen.getByLabelText("Comentario")).toHaveValue("Ventana");

    await user.click(screen.getByRole("button", { name: "Vaciar" }));
    expect(screen.getByLabelText("Teléfono")).toHaveValue("");
  });

  // ── REFUERZO — `[campo]: valor`, en escalera ──

  it("9) respuesta9 — el nombre de la clave, con corchetes", () => {
    expect(respuesta9).toBe("edad");
  });

  it("10) respuesta10 — el nombre de la clave, sin corchetes", () => {
    expect(respuesta10).toBe("clave");
  });

  it("11) soloUnCampo — una sola clave, la que llega en campo", () => {
    expect(soloUnCampo("telefono", "912")).toEqual({ telefono: "912" });
    expect(soloUnCampo("nombre", "Bea")).toEqual({ nombre: "Bea" });
  });

  it("12) respuesta12 — las dos piezas del papel", () => {
    expect(respuesta12).toEqual(["comentario", "Ventana"]);
  });

  it("13) desdePapel — la clave y el valor salen del papel", () => {
    expect(desdePapel(papelComentario)).toEqual({ comentario: "Ventana" });
    expect(desdePapel({ tipo: "escribir", campo: "nombre", valor: "Bea" })).toEqual({
      nombre: "Bea",
    });
  });

  it("14) respuesta14 — el objeto que sale de la sustitución", () => {
    expect(respuesta14).toEqual({ nombre: "Ana", telefono: "912", comentario: "" });
  });

  it("15) cambiar — el campo del papel, con el valor del papel", () => {
    const ana: Reserva = { nombre: "Ana", telefono: "", comentario: "" };
    expect(cambiar(ana, papelComentario)).toEqual({ ...ana, comentario: "Ventana" });
    expect(cambiar(ana, { tipo: "escribir", campo: "nombre", valor: "Bea" })).toEqual({
      ...ana,
      nombre: "Bea",
    });
    expect(ana.nombre).toBe("Ana");
  });
});
