import { describe, it, expect } from "vitest";
import {
  solicitudReducer,
  inicial,
  vacios,
  respuesta1,
  respuesta2,
  respuesta6,
  type EstadoSolicitud,
} from "./exercise-10";

/* Los drills 3, 4 y 5 son cases de `solicitudReducer` y se prueban llamándolo a mano,
 * cada uno desde el estado que le toca. Los drills 1, 2 y 6 son predicciones. */

const rellenos = { nombre: "Ana", correo: "ana@mail.cl", detalle: "Una landing para mi tienda" };

describe("11-useState-useReducer / exercise-10 — el reducer, un case a la vez", () => {
  it("1) respuesta1 — lo que cambia rechazar", () => {
    expect([...respuesta1].sort()).toEqual(["errores", "fase"]);
  });

  it("2) respuesta2 — inicial frente a la copia con todo sobrescrito", () => {
    expect(respuesta2).toBe(true);
  });

  it("3) escribir — desde enviado vuelve a editando; desde enviando, no", () => {
    const enviado: EstadoSolicitud = { ...inicial, fase: "enviado" };
    const despues = solicitudReducer(enviado, { tipo: "escribir", campo: "nombre", valor: "A" });
    expect(despues.fase).toBe("editando");
    expect(despues.datos.nombre).toBe("A");

    const enviando: EstadoSolicitud = { ...inicial, fase: "enviando" };
    expect(solicitudReducer(enviando, { tipo: "escribir", campo: "nombre", valor: "A" }).fase).toBe(
      "enviando",
    );
  });

  it("4) empezar — limpia errores y pasa a enviando; si ya envía, el mismo estado", () => {
    const conErrores: EstadoSolicitud = { ...inicial, errores: { correo: "No es válido" } };
    const despues = solicitudReducer(conErrores, { tipo: "empezar" });
    expect(despues.fase).toBe("enviando");
    expect(despues.errores).toEqual({});

    const enviando: EstadoSolicitud = { ...inicial, datos: rellenos, fase: "enviando" };
    expect(solicitudReducer(enviando, { tipo: "empezar" })).toBe(enviando);
  });

  it("5) terminar — enviado y vacío, y solo desde enviando", () => {
    const enviando: EstadoSolicitud = { ...inicial, datos: rellenos, fase: "enviando" };
    const despues = solicitudReducer(enviando, { tipo: "terminar" });
    expect(despues.fase).toBe("enviado");
    expect(despues.datos).toEqual(vacios);

    const editando: EstadoSolicitud = { ...inicial, datos: rellenos };
    expect(solicitudReducer(editando, { tipo: "terminar" })).toBe(editando);
  });

  it("6) respuesta6 — el estado tras escribir, empezar y terminar", () => {
    expect(respuesta6).toEqual({ datos: vacios, errores: {}, fase: "enviado" });
  });
});
