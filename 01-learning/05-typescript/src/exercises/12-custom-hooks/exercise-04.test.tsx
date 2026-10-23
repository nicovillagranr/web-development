import { StrictMode } from "react";
import { describe, it, expect, afterEach, onTestFinished } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  EmpezarContacto,
  EscribirMensaje,
  CorregirCorreo,
  MeGusta,
  FormularioQueNaceEnfocado,
  NotaRapida,
  FiltrosConVuelta,
  MenuQueRobaAlNacer,
  MenuConBandera,
  ContactoQueNaceAbierto,
  ConfirmarEnvio,
  AvisoDescartable,
  BuscadorQueNaceAbierto,
} from "./exercise-04";

/* El drill 1 comprueba que pulsar "Empezar" no lanza ningún error. Un error dentro de
 * un manejador no rompe el test por sí solo: el navegador lo avisa en la ventana. Así
 * que el test escucha ese aviso y apunta lo que llega (como el drill 4 del 03). */
const errores: unknown[] = [];
const apuntarError = (event: ErrorEvent) => {
  errores.push(event.error);
  event.preventDefault();
};

afterEach(() => {
  window.removeEventListener("error", apuntarError);
  errores.length = 0;
});

/* Del 7 al 13, los tests comprueban que el componente NO le roba el foco a la página
 * al montarse. Para eso, antes de montarlo, el foco se deja en un campo de fuera.
 *
 * El 5 y del 7 al 13 se montan dentro de `StrictMode`, como en `pnpm dev`. El 9, el 10
 * y el 13 se montan además una vez SIN él: así se comportan en producción, con una
 * sola pasada del efecto al montarse. */
function focoFuera() {
  const fuera = document.createElement("input");
  fuera.setAttribute("aria-label", "Campo de fuera");
  document.body.appendChild(fuera);
  fuera.focus();
  onTestFinished(() => fuera.remove());
  return fuera;
}

describe("12-custom-hooks / exercise-04 — .current y focus(), viéndolos correr", () => {
  it("1) EmpezarContacto — Empezar lleva el cursor a Nombre, sin errores", async () => {
    const user = userEvent.setup();
    window.addEventListener("error", apuntarError);
    render(<EmpezarContacto />);

    await user.click(screen.getByRole("button", { name: "Empezar" }));
    expect(errores).toEqual([]);
    expect(screen.getByRole("textbox", { name: "Nombre" })).toHaveFocus();
  });

  it("2) EscribirMensaje — Escribir mensaje lleva el cursor a Mensaje", async () => {
    const user = userEvent.setup();
    render(<EscribirMensaje />);

    await user.click(screen.getByRole("button", { name: "Escribir mensaje" }));
    expect(screen.getByRole("textbox", { name: "Mensaje" })).toHaveFocus();
  });

  it("3) CorregirCorreo — Corregir el correo lleva el cursor a Correo", async () => {
    const user = userEvent.setup();
    render(<CorregirCorreo />);

    await user.click(screen.getByRole("button", { name: "Corregir el correo" }));
    expect(screen.getByRole("textbox", { name: "Correo" })).toHaveFocus();
  });

  it("4) MeGusta — cada clic suma uno, y el botón lo muestra", async () => {
    const user = userEvent.setup();
    render(<MeGusta />);

    await user.click(screen.getByRole("button", { name: "0 me gusta" }));
    await user.click(screen.getByRole("button", { name: /me gusta/ }));
    await user.click(screen.getByRole("button", { name: /me gusta/ }));
    expect(screen.getByRole("button", { name: /me gusta/ })).toHaveTextContent("3 me gusta");
  });

  it("5) FormularioQueNaceEnfocado — nace con el cursor en Nombre, y no lo roba al escribir en Correo", async () => {
    const user = userEvent.setup();
    render(
      <StrictMode>
        <FormularioQueNaceEnfocado />
      </StrictMode>,
    );
    expect(screen.getByRole("textbox", { name: "Nombre" })).toHaveFocus();

    const correo = screen.getByRole("textbox", { name: "Correo" });
    await user.click(correo);
    await user.type(correo, "ab");
    expect(correo).toHaveFocus();
    expect(correo).toHaveValue("ab");
  });

  it("6) NotaRapida — al abrir la nota, el cursor cae en el campo Nota", async () => {
    const user = userEvent.setup();
    render(<NotaRapida />);

    await user.click(screen.getByRole("button", { name: "Añadir nota" }));
    expect(screen.getByRole("textbox", { name: "Nota" })).toHaveFocus();
  });

  it("7) FiltrosConVuelta — al aplicar, el foco vuelve a Filtrar proyectos", async () => {
    const user = userEvent.setup();
    const fuera = focoFuera();
    render(
      <StrictMode>
        <FiltrosConVuelta />
      </StrictMode>,
    );
    expect(fuera).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "Filtrar proyectos" }));
    await user.click(screen.getByRole("button", { name: "Aplicar" }));
    expect(screen.queryByRole("region", { name: "Filtros" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Filtrar proyectos" })).toHaveFocus();
  });

  it("8) MenuQueRobaAlNacer — no roba el foco al montarse; al cerrar, vuelve a Abrir menú", async () => {
    const user = userEvent.setup();
    const fuera = focoFuera();
    render(
      <StrictMode>
        <MenuQueRobaAlNacer />
      </StrictMode>,
    );
    expect(fuera).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "Abrir menú" }));
    await user.click(screen.getByRole("button", { name: "Cerrar menú" }));
    expect(screen.queryByRole("navigation", { name: "Menú" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Abrir menú" })).toHaveFocus();
  });

  it("9) MenuConBandera — no roba el foco al montarse, ni en producción ni en pnpm dev; al cerrar, vuelve a Abrir menú", async () => {
    const user = userEvent.setup();

    // Producción: sin StrictMode.
    const fueraProduccion = focoFuera();
    const produccion = render(<MenuConBandera />);
    expect(fueraProduccion).toHaveFocus();
    await user.click(screen.getByRole("button", { name: "Abrir menú" }));
    await user.click(screen.getByRole("button", { name: "Cerrar menú" }));
    expect(screen.getByRole("button", { name: "Abrir menú" })).toHaveFocus();
    produccion.unmount();

    // `pnpm dev`: con StrictMode.
    const fuera = focoFuera();
    render(
      <StrictMode>
        <MenuConBandera />
      </StrictMode>,
    );
    expect(fuera).toHaveFocus();
    await user.click(screen.getByRole("button", { name: "Abrir menú" }));
    await user.click(screen.getByRole("button", { name: "Cerrar menú" }));
    expect(screen.getByRole("button", { name: "Abrir menú" })).toHaveFocus();
  });

  it("10) ContactoQueNaceAbierto — naciendo abierto, Nombre recibe el foco también en producción; naciendo cerrado, no roba el foco", async () => {
    const user = userEvent.setup();

    // Producción: sin StrictMode, nace abierto.
    const produccion = render(<ContactoQueNaceAbierto abiertoAlInicio />);
    expect(screen.getByRole("textbox", { name: "Nombre" })).toHaveFocus();
    produccion.unmount();

    // `pnpm dev`: con StrictMode, nace cerrado.
    const fuera = focoFuera();
    render(
      <StrictMode>
        <ContactoQueNaceAbierto abiertoAlInicio={false} />
      </StrictMode>,
    );
    expect(fuera).toHaveFocus();
    await user.click(screen.getByRole("button", { name: "Escribirnos" }));
    expect(screen.getByRole("textbox", { name: "Nombre" })).toHaveFocus();
  });

  it("11) ConfirmarEnvio — no roba el foco al montarse; la pregunta recibe el foco en Confirmar, y Volver a editar lo devuelve a Enviar", async () => {
    const user = userEvent.setup();
    const fuera = focoFuera();
    render(
      <StrictMode>
        <ConfirmarEnvio />
      </StrictMode>,
    );
    expect(fuera).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "Enviar" }));
    expect(screen.getByRole("button", { name: "Confirmar" })).toHaveFocus();
    await user.click(screen.getByRole("button", { name: "Volver a editar" }));
    expect(screen.queryByRole("region", { name: "Confirmar envío" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Enviar" })).toHaveFocus();
  });

  it("12) AvisoDescartable — no roba el foco al montarse; al descartar, vuelve a Ver aviso", async () => {
    const user = userEvent.setup();
    const fuera = focoFuera();
    render(
      <StrictMode>
        <AvisoDescartable />
      </StrictMode>,
    );
    expect(fuera).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "Ver aviso" }));
    await user.click(screen.getByRole("button", { name: "Descartar" }));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ver aviso" })).toHaveFocus();
  });

  it("13) BuscadorQueNaceAbierto — naciendo abierto, el campo recibe el foco también en producción; naciendo cerrado, no roba el foco", async () => {
    const user = userEvent.setup();

    // Producción: sin StrictMode, nace abierto.
    const produccion = render(<BuscadorQueNaceAbierto abiertoAlInicio />);
    expect(screen.getByRole("textbox", { name: "Ciudad" })).toHaveFocus();
    await user.click(screen.getByRole("button", { name: "Cerrar buscador" }));
    expect(screen.getByRole("button", { name: "Abrir buscador" })).toHaveFocus();
    produccion.unmount();

    // `pnpm dev`: con StrictMode, nace cerrado.
    const fuera = focoFuera();
    render(
      <StrictMode>
        <BuscadorQueNaceAbierto abiertoAlInicio={false} />
      </StrictMode>,
    );
    expect(fuera).toHaveFocus();
    await user.click(screen.getByRole("button", { name: "Abrir buscador" }));
    expect(screen.getByRole("textbox", { name: "Ciudad" })).toHaveFocus();
    await user.click(screen.getByRole("button", { name: "Cerrar buscador" }));
    expect(screen.getByRole("button", { name: "Abrir buscador" })).toHaveFocus();
  });
});
