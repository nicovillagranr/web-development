import { describe, it, expect } from "vitest";
import {
  soloLargos,
  soloLargosConRegla,
  sinVacios,
  esTruthy,
  sinHuecos,
  mensajesDe,
} from "./exercise-01b";

/* Todo son funciones puras: se comprueban por lo que devuelven. Varios tests miran
 * además que el array que entra NO se toque — `filter` fabrica uno nuevo, y si alguna
 * solución acaba mutando, se nota aquí y no en el resultado. */

const PALABRAS = ["sol", "luna", "mar", "cielo"];

describe("11-useState-useReducer / exercise-01b — la función que le entregas a filter", () => {
  it("1) soloLargos — deja las de más de 3 letras, en orden", () => {
    expect(soloLargos(PALABRAS)).toEqual(["luna", "cielo"]);
  });

  it("1) soloLargos — no toca el array que le dan", () => {
    soloLargos(PALABRAS);
    expect(PALABRAS).toEqual(["sol", "luna", "mar", "cielo"]);
  });

  it("2) soloLargosConRegla — mismo resultado, reutilizando la regla de arriba", () => {
    expect(soloLargosConRegla(PALABRAS)).toEqual(["luna", "cielo"]);
    expect(soloLargosConRegla([])).toEqual([]);
  });

  it("3) sinVacios — se va el vacío y se queda el que solo tiene espacios", () => {
    expect(sinVacios(["hola", "", "  ", "adios"])).toEqual(["hola", "  ", "adios"]);
  });

  it("4) esTruthy — responde por la categoría, no por el valor `true`", () => {
    expect(esTruthy("hola")).toBe(true);
    expect(esTruthy(1)).toBe(true);
    /* los que sorprenden: un array vacío y un objeto vacío son truthy */
    expect(esTruthy([])).toBe(true);
    expect(esTruthy({})).toBe(true);

    expect(esTruthy(0)).toBe(false);
    expect(esTruthy("")).toBe(false);
    expect(esTruthy(undefined)).toBe(false);
  });

  it("5) sinHuecos — descarta el undefined Y el texto vacío", () => {
    expect(sinHuecos(["hola", undefined, "", "adios"])).toEqual(["hola", "adios"]);
  });

  it("5) sinHuecos — sin huecos que quitar, devuelve lo mismo", () => {
    expect(sinHuecos(["uno", "dos"])).toEqual(["uno", "dos"]);
  });

  it("6) mensajesDe — reúne solo los errores que vienen", () => {
    expect(mensajesDe({ nombre: "Falta el nombre" })).toEqual(["Falta el nombre"]);
    expect(mensajesDe({ email: "Correo inválido" })).toEqual(["Correo inválido"]);
    expect(mensajesDe({ nombre: "A", email: "B" })).toEqual(["A", "B"]);
  });

  it("6) mensajesDe — sin errores, un array vacío y no null", () => {
    expect(mensajesDe({})).toEqual([]);
  });

  it("6) mensajesDe — un mensaje vacío no cuenta como error", () => {
    /* el caso que separa descartar `undefined` de descartar todos los falsy */
    expect(mensajesDe({ nombre: "", email: "Correo inválido" })).toEqual(["Correo inválido"]);
  });
});
