import { describe, it, expect } from "vitest";
import { validarSolicitud, respuesta1, respuesta3 } from "./exercise-10b";

/* Los drills 2, 4 y 5 tocan `validarSolicitud`, y cada test mira solo el campo de su
 * drill: un drill sin resolver no tumba el test de otro. Los 1 y 3 son predicciones. */

const validos = { nombre: "Ana", correo: "ana@mail.cl", detalle: "Una landing para mi tienda" };

describe("11-useState-useReducer / exercise-10b — validar: un objeto de errores", () => {
  it("1) respuesta1 — lo que devuelve con todo en regla", () => {
    expect(respuesta1).toStrictEqual({});
  });

  it("2) correo — con espacios alrededor se acepta", () => {
    expect(validarSolicitud({ ...validos, correo: " ana@mail.cl " }).correo).toBeUndefined();
    expect(validarSolicitud({ ...validos, correo: "ana@mail" }).correo).toBe(
      "El correo no es válido",
    );
  });

  it('3) respuesta3 — el error de " A "', () => {
    expect(respuesta3).toBe("El nombre debe tener al menos 2 caracteres");
  });

  it("4) nombre — vacío da el error de obligatorio, no el de longitud", () => {
    expect(validarSolicitud({ ...validos, nombre: "" }).nombre).toBe("El nombre es obligatorio");
    expect(validarSolicitud({ ...validos, nombre: "A" }).nombre).toBe(
      "El nombre debe tener al menos 2 caracteres",
    );
  });

  it("5) detalle — menos de 20 caracteres pide más; vacío sigue siendo obligatorio", () => {
    expect(validarSolicitud({ ...validos, detalle: "Una web" }).detalle).toBe(
      "Cuéntanos un poco más: mínimo 20 caracteres",
    );
    expect(validarSolicitud({ ...validos, detalle: "   Una web          " }).detalle).toBe(
      "Cuéntanos un poco más: mínimo 20 caracteres",
    );
    expect(validarSolicitud({ ...validos, detalle: "" }).detalle).toBe("El detalle es obligatorio");
    expect(validarSolicitud(validos).detalle).toBeUndefined();
  });
});
