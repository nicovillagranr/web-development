import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  solicitudReducer,
  validarSolicitud,
  FormularioSolicitud,
  inicial,
  vacios,
  type EstadoSolicitud,
} from "./exercise-10";

/* El archivo ya no tiene drills: es el formulario completo, resuelto. Estos tests
 * comprueban que cada pieza hace lo que dicen sus comentarios: primero el validador,
 * después el reducer case por case, y al final el componente como lo usaría alguien. */

const rellenos = {
  nombre: "Ana",
  apellido: "Pérez",
  correo: "ana@mail.cl",
  detalle: "Una landing para mi tienda",
};

describe("11-useState-useReducer / exercise-10 — el formulario completo", () => {
  describe("validarSolicitud", () => {
    it("con todo en regla devuelve {}", () => {
      expect(validarSolicitud(rellenos)).toStrictEqual({});
    });

    it("vacío: gana la regla de obligatorio en los cuatro campos", () => {
      expect(validarSolicitud(vacios)).toEqual({
        nombre: "El nombre es obligatorio",
        apellido: "El apellido es obligatorio",
        correo: "El correo es obligatorio",
        detalle: "El detalle es obligatorio",
      });
    });

    it("la segunda regla de cada campo, cuando la primera pasa", () => {
      expect(
        validarSolicitud({ nombre: " A ", apellido: " P ", correo: "ana@mail", detalle: "Corto" }),
      ).toEqual({
        nombre: "El nombre debe tener al menos 2 caracteres",
        apellido: "El apellido debe tener al menos 2 caracteres",
        correo: "El correo no es válido",
        detalle: "El detalle debe tener al menos 10 caracteres",
      });
    });
  });

  describe("solicitudReducer", () => {
    it("escribir — guarda el texto, quita el error del campo y el del servidor", () => {
      const conErrores: EstadoSolicitud = {
        ...inicial,
        errores: { nombre: "Muy corto", correo: "No es válido", servidor: "Sin conexión" },
      };
      const despues = solicitudReducer(conErrores, {
        tipo: "escribir",
        campo: "nombre",
        valor: "Ana",
      });
      expect(despues.datos.nombre).toBe("Ana");
      expect(despues.errores.nombre).toBeFalsy();
      expect(despues.errores.servidor).toBeFalsy();
      expect(despues.errores.correo).toBe("No es válido");
    });

    it("escribir — desde enviado o error vuelve a editando; desde enviando, no", () => {
      for (const fase of ["enviado", "error"] as const) {
        const antes: EstadoSolicitud = { ...inicial, fase };
        expect(
          solicitudReducer(antes, { tipo: "escribir", campo: "nombre", valor: "A" }).fase,
        ).toBe("editando");
      }
      const enviando: EstadoSolicitud = { ...inicial, fase: "enviando" };
      expect(
        solicitudReducer(enviando, { tipo: "escribir", campo: "nombre", valor: "A" }).fase,
      ).toBe("enviando");
    });

    it("validacionFallida — reemplaza los errores y deja editando", () => {
      const antes: EstadoSolicitud = { ...inicial, datos: rellenos, errores: { nombre: "Viejo" } };
      const despues = solicitudReducer(antes, {
        tipo: "validacionFallida",
        errores: { correo: "El correo no es válido" },
      });
      expect(despues.errores).toEqual({ correo: "El correo no es válido" });
      expect(despues.fase).toBe("editando");
      expect(despues.datos).toEqual(rellenos);
    });

    it("envioIniciado — limpia errores y pasa a enviando; si ya envía, el mismo estado", () => {
      const conErrores: EstadoSolicitud = { ...inicial, errores: { correo: "No es válido" } };
      const despues = solicitudReducer(conErrores, { tipo: "envioIniciado" });
      expect(despues.fase).toBe("enviando");
      expect(despues.errores).toEqual({});

      const enviando: EstadoSolicitud = { ...inicial, datos: rellenos, fase: "enviando" };
      expect(solicitudReducer(enviando, { tipo: "envioIniciado" })).toBe(enviando);
    });

    it("envioCompletado — enviado y vacío, y solo desde enviando", () => {
      const enviando: EstadoSolicitud = { ...inicial, datos: rellenos, fase: "enviando" };
      const despues = solicitudReducer(enviando, { tipo: "envioCompletado" });
      expect(despues.fase).toBe("enviado");
      expect(despues.datos).toEqual(vacios);

      const editando: EstadoSolicitud = { ...inicial, datos: rellenos };
      expect(solicitudReducer(editando, { tipo: "envioCompletado" })).toBe(editando);
    });

    it("envioFallido — fase error con el mensaje, conserva los datos, y solo desde enviando", () => {
      const enviando: EstadoSolicitud = { ...inicial, datos: rellenos, fase: "enviando" };
      const despues = solicitudReducer(enviando, {
        tipo: "envioFallido",
        mensaje: "No se pudo conectar con el servidor",
      });
      expect(despues.fase).toBe("error");
      expect(despues.errores).toEqual({ servidor: "No se pudo conectar con el servidor" });
      expect(despues.datos).toEqual(rellenos);

      const editando: EstadoSolicitud = { ...inicial, datos: rellenos };
      expect(solicitudReducer(editando, { tipo: "envioFallido", mensaje: "x" })).toBe(editando);
    });

    it("limpiar — devuelve inicial, el mismo objeto", () => {
      const antes: EstadoSolicitud = { ...inicial, datos: rellenos, fase: "enviado" };
      expect(solicitudReducer(antes, { tipo: "limpiar" })).toBe(inicial);
    });
  });

  describe("FormularioSolicitud", () => {
    it("enviar vacío enseña los errores y no envía", async () => {
      const user = userEvent.setup();
      render(<FormularioSolicitud />);

      await user.click(screen.getByRole("button", { name: "Enviar solicitud" }));
      expect(screen.getByText("El nombre es obligatorio")).toBeInTheDocument();
      expect(screen.getByText("El apellido es obligatorio")).toBeInTheDocument();
      expect(screen.getByText("El correo es obligatorio")).toBeInTheDocument();
      expect(screen.queryByText("Solicitud enviada correctamente.")).toBeNull();
    });

    it("un correo sin @ enseña el error propio, no lo bloquea el navegador", async () => {
      const user = userEvent.setup();
      render(<FormularioSolicitud />);

      await user.type(screen.getByLabelText("Nombre"), rellenos.nombre);
      await user.type(screen.getByLabelText("Apellido"), rellenos.apellido);
      await user.type(screen.getByLabelText("Correo"), "ana");
      await user.type(screen.getByLabelText("Detalle"), rellenos.detalle);
      await user.click(screen.getByRole("button", { name: "Enviar solicitud" }));
      expect(screen.getByText("El correo no es válido")).toBeInTheDocument();
    });

    it("con datos buenos: Enviando… bloqueado, después enviada y el formulario vacío", async () => {
      const user = userEvent.setup();
      render(<FormularioSolicitud />);

      await user.type(screen.getByLabelText("Nombre"), rellenos.nombre);
      await user.type(screen.getByLabelText("Apellido"), rellenos.apellido);
      await user.type(screen.getByLabelText("Correo"), rellenos.correo);
      await user.type(screen.getByLabelText("Detalle"), rellenos.detalle);
      await user.click(screen.getByRole("button", { name: "Enviar solicitud" }));

      expect(screen.getByRole("button", { name: /Enviando/ })).toBeDisabled();
      expect(
        await screen.findByText("Solicitud enviada correctamente.", {}, { timeout: 2000 }),
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Nombre")).toHaveValue("");
      expect(screen.getByLabelText("Apellido")).toHaveValue("");
    });

    it("Limpiar vacía los cuatro campos", async () => {
      const user = userEvent.setup();
      render(<FormularioSolicitud />);

      await user.type(screen.getByLabelText("Nombre"), rellenos.nombre);
      await user.type(screen.getByLabelText("Apellido"), rellenos.apellido);
      await user.type(screen.getByLabelText("Detalle"), rellenos.detalle);
      await user.click(screen.getByRole("button", { name: "Limpiar" }));
      expect(screen.getByLabelText("Nombre")).toHaveValue("");
      expect(screen.getByLabelText("Apellido")).toHaveValue("");
      expect(screen.getByLabelText("Detalle")).toHaveValue("");
    });
  });
});
