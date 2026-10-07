import { describe, it, expect } from "vitest";
import {
  solicitudReducer,
  inicial,
  vacios,
  respuesta3,
  respuesta4,
  respuesta7,
  type EstadoSolicitud,
} from "./exercise-10b";

/* Los drills 1, 2, 5 y 6 son cases de `solicitudReducer` y se prueban llamándolo a
 * mano, cada uno desde el estado que le toca. Los drills 3, 4 y 7 son predicciones. */

const rellenos = {
  nombre: "Ana",
  apellido: "Pérez",
  correo: "ana@mail.cl",
  detalle: "Una landing para mi tienda",
};

describe("11-useState-useReducer / exercise-10b — el reducer de tu 10, case por case", () => {
  it("1) escribir — borra también el error del servidor", () => {
    const conErrores: EstadoSolicitud = {
      ...inicial,
      errores: { correo: "No es válido", servidor: "Sin conexión" },
    };
    const despues = solicitudReducer(conErrores, { tipo: "escribir", campo: "nombre", valor: "A" });
    expect(despues.errores.servidor).toBeFalsy();
    expect(despues.errores.correo).toBe("No es válido");
  });

  it("2) escribir — desde error vuelve a editando; desde enviando, no", () => {
    const enError: EstadoSolicitud = { ...inicial, fase: "error" };
    expect(solicitudReducer(enError, { tipo: "escribir", campo: "nombre", valor: "A" }).fase).toBe(
      "editando",
    );
    const enviando: EstadoSolicitud = { ...inicial, fase: "enviando" };
    expect(solicitudReducer(enviando, { tipo: "escribir", campo: "nombre", valor: "A" }).fase).toBe(
      "enviando",
    );
  });

  it("3) respuesta3 — lo que cambia envioFallido", () => {
    expect([...respuesta3].sort()).toEqual(["errores", "fase"]);
  });

  it("4) respuesta4 — los errores después de envioFallido", () => {
    expect(respuesta4).toStrictEqual({ servidor: "Sin conexión" });
  });

  it("5) envioFallido — solo desde enviando; si no, el mismo estado", () => {
    const enviando: EstadoSolicitud = { ...inicial, datos: rellenos, fase: "enviando" };
    const despues = solicitudReducer(enviando, { tipo: "envioFallido", mensaje: "Sin conexión" });
    expect(despues.fase).toBe("error");

    const editando: EstadoSolicitud = { ...inicial, datos: rellenos };
    expect(solicitudReducer(editando, { tipo: "envioFallido", mensaje: "x" })).toBe(editando);
  });

  it("6) envioCompletado — enviado y con el formulario vacío", () => {
    const enviando: EstadoSolicitud = { ...inicial, datos: rellenos, fase: "enviando" };
    const despues = solicitudReducer(enviando, { tipo: "envioCompletado" });
    expect(despues.fase).toBe("enviado");
    expect(despues.datos).toEqual(vacios);
  });

  it("7) respuesta7 — el estado tras las cuatro acciones", () => {
    expect(respuesta7).toEqual({
      datos: { ...vacios, nombre: "Ana", apellido: "P" },
      errores: { servidor: "", apellido: "" },
      fase: "editando",
    });
  });
});
