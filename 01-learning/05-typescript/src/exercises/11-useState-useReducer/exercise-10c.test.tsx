import { describe, it, expect } from "vitest";
import {
  validarSolicitud,
  respuesta1,
  respuesta3,
  respuesta6,
  type DatosSolicitud,
} from "./exercise-10c";

/* Los drills 2, 4 y 5 son partes de `validarSolicitud` y se prueban llamándola a mano,
 * cambiando un solo campo sobre unos datos buenos. Los drills 1, 3 y 6 son predicciones. */

const buenos: DatosSolicitud = {
  nombre: "Ana",
  apellido: "Pérez",
  correo: "ana@mail.cl",
  detalle: "Una landing para mi tienda",
};

describe("11-useState-useReducer / exercise-10c — validarSolicitud, una regla a la vez", () => {
  it("1) respuesta1 — lo que devuelve con todo en regla", () => {
    expect(respuesta1).toStrictEqual({});
  });

  it("2) el nombre — sin contar los espacios del borde", () => {
    expect(validarSolicitud({ ...buenos, nombre: "   " }).nombre).toBe("El nombre es obligatorio");
    expect(validarSolicitud({ ...buenos, nombre: " A " }).nombre).toBe(
      "El nombre debe tener al menos 2 caracteres",
    );
    expect(validarSolicitud({ ...buenos, nombre: " Ana " }).nombre).toBeUndefined();
  });

  it("3) respuesta3 — el error del detalle «   Hola   »", () => {
    expect(respuesta3).toBe("El detalle debe tener al menos 10 caracteres");
  });

  it("4) el apellido — vacío es obligatorio, no corto", () => {
    expect(validarSolicitud({ ...buenos, apellido: "" }).apellido).toBe(
      "El apellido es obligatorio",
    );
    expect(validarSolicitud({ ...buenos, apellido: "P" }).apellido).toBe(
      "El apellido debe tener al menos 2 caracteres",
    );
    expect(validarSolicitud(buenos).apellido).toBeUndefined();
  });

  it("5) el detalle — vacío es obligatorio, y las otras dos reglas siguen", () => {
    expect(validarSolicitud({ ...buenos, detalle: "" }).detalle).toBe("El detalle es obligatorio");
    expect(validarSolicitud({ ...buenos, detalle: "Hola" }).detalle).toBe(
      "El detalle debe tener al menos 10 caracteres",
    );
    expect(validarSolicitud({ ...buenos, detalle: "x".repeat(501) }).detalle).toBe(
      "El detalle no puede superar los 500 caracteres",
    );
    expect(validarSolicitud({ ...buenos, detalle: "x".repeat(500) }).detalle).toBeUndefined();
  });

  it("6) respuesta6 — los errores de los cuatro campos juntos", () => {
    expect(respuesta6).toStrictEqual({
      nombre: "El nombre es obligatorio",
      correo: "El correo no es válido",
      detalle: "El detalle debe tener al menos 10 caracteres",
    });
  });
});
