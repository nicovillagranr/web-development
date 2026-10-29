import { StrictMode, useState } from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  MapaConTitulo,
  VisorDeFoto,
  EnvioConfirmado,
  BuscadorDeProjex,
  MenuDelMovil,
} from "./exercise-08";

/* Para el 4: un botón abre el buscador, como la lupa de una cabecera. */
function PaginaConBuscador() {
  const [abierto, setAbierto] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setAbierto(true)}>
        Buscar
      </button>
      {abierto && <BuscadorDeProjex onClose={() => setAbierto(false)} />}
    </div>
  );
}

/* Para el 5: la cabecera de Projex, recortada. La hamburguesa cambia de nombre
 * como la tuya, pero es el mismo botón: el menú no tiene ningún ref a ella. */
function Cabecera() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header>
      <button
        type="button"
        aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={abierto}
        onClick={() => setAbierto(!abierto)}
      >
        ☰
      </button>
      {abierto && <MenuDelMovil onClose={() => setAbierto(false)} />}
    </header>
  );
}

afterEach(() => {
  document.title = "";
  document.body.style.overflow = "";
});

describe("12-custom-hooks / exercise-08 — el efecto como préstamo", () => {
  it("1) MapaConTitulo — la pestaña dice «Mapa · Projex» y, al cerrar, vuelve a lo de antes", () => {
    document.title = "Contacto · Projex";
    const { unmount } = render(
      <StrictMode>
        <MapaConTitulo onClose={() => {}} />
      </StrictMode>,
    );

    expect(document.title).toBe("Mapa · Projex");
    unmount();
    expect(document.title).toBe("Contacto · Projex");
  });

  it("2) VisorDeFoto — bloquea el scroll y, al cerrar, lo deja como lo encontró", () => {
    // Sin nada abierto antes: al cerrar, el fondo vuelve a moverse.
    const primero = render(
      <StrictMode>
        <VisorDeFoto onClose={() => {}} />
      </StrictMode>,
    );
    expect(document.body.style.overflow).toBe("hidden");
    primero.unmount();
    expect(document.body.style.overflow).toBe("");

    // Con el menú del móvil abierto, que ya lo había bloqueado: tiene que seguir bloqueado.
    document.body.style.overflow = "hidden";
    const segundo = render(
      <StrictMode>
        <VisorDeFoto onClose={() => {}} />
      </StrictMode>,
    );
    segundo.unmount();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("3) EnvioConfirmado — la pestaña dice «Enviado · Projex» y, al cerrar, vuelve a lo de antes", () => {
    document.title = "Servicios · Projex";
    const { unmount } = render(
      <StrictMode>
        <EnvioConfirmado onClose={() => {}} />
      </StrictMode>,
    );

    expect(document.title).toBe("Enviado · Projex");
    unmount();
    expect(document.title).toBe("Servicios · Projex");
  });

  it("4) BuscadorDeProjex — el cursor va al campo y, al cerrar, vuelve a «Buscar»", async () => {
    const user = userEvent.setup();
    render(
      <StrictMode>
        <PaginaConBuscador />
      </StrictMode>,
    );

    await user.click(screen.getByRole("button", { name: "Buscar" }));
    expect(screen.getByRole("searchbox", { name: "Buscar en Projex" })).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "Cerrar buscador" }));
    expect(screen.getByRole("button", { name: "Buscar" })).toHaveFocus();
  });

  it("5) MenuDelMovil — bloquea el scroll, enfoca «Servicios» y al cerrar devuelve las dos cosas", async () => {
    const user = userEvent.setup();
    const { unmount } = render(
      <StrictMode>
        <Cabecera />
      </StrictMode>,
    );

    // Se cierra con Escape.
    await user.click(screen.getByRole("button", { name: "Abrir menú" }));
    expect(document.body.style.overflow).toBe("hidden");
    expect(screen.getByRole("link", { name: "Servicios" })).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("list", { name: "Menú del móvil" })).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
    expect(screen.getByRole("button", { name: "Abrir menú" })).toHaveFocus();
    unmount();

    // Se cierra con un enlace, y otra pieza ya había bloqueado el scroll antes.
    document.body.style.overflow = "hidden";
    render(
      <StrictMode>
        <Cabecera />
      </StrictMode>,
    );
    await user.click(screen.getByRole("button", { name: "Abrir menú" }));
    await user.click(screen.getByRole("link", { name: "Contacto" }));
    expect(screen.queryByRole("list", { name: "Menú del móvil" })).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
    expect(screen.getByRole("button", { name: "Abrir menú" })).toHaveFocus();
  });
});
