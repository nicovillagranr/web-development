import { StrictMode, useState } from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FotoAmpliada, ConfirmacionDeEnvio, MensajeRapido, MapModal } from "./exercise-10";

/* Para el 2: el botón «Enviar» del formulario abre la confirmación. */
function PaginaConEnvio() {
  const [enviado, setEnviado] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setEnviado(true)}>
        Enviar
      </button>
      {enviado && <ConfirmacionDeEnvio onClose={() => setEnviado(false)} />}
    </div>
  );
}

/* Para el 3: un botón abre el mensaje rápido. */
function PaginaConMensaje() {
  const [abierto, setAbierto] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setAbierto(true)}>
        Escribir
      </button>
      {abierto && <MensajeRapido onClose={() => setAbierto(false)} />}
    </div>
  );
}

/* Para el 4: el padre pasa flechas, no useCallback, y se vuelve a pintar al copiar. */
function PaginaDeContacto() {
  const [abierto, setAbierto] = useState(false);
  const [copias, setCopias] = useState(0);

  return (
    <section>
      <button type="button" onClick={() => setAbierto(true)}>
        Ver mapa
      </button>
      <p>Copias: {copias}</p>
      {abierto && (
        <MapModal onClose={() => setAbierto(false)} onCopiar={() => setCopias(copias + 1)} />
      )}
    </section>
  );
}

afterEach(() => {
  document.body.style.overflow = "";
});

describe("12-custom-hooks / exercise-10 — tu MapModal en tres hooks", () => {
  it("1) useBloquearScroll — FotoAmpliada bloquea el scroll y, al cerrar, lo deja como estaba", () => {
    // Sin nada abierto antes: al cerrar, el fondo vuelve a moverse.
    const primero = render(
      <StrictMode>
        <FotoAmpliada onClose={() => {}} />
      </StrictMode>,
    );
    expect(document.body.style.overflow).toBe("hidden");
    primero.unmount();
    expect(document.body.style.overflow).toBe("");

    // Con otra pieza que ya lo había bloqueado: tiene que seguir bloqueado.
    document.body.style.overflow = "hidden";
    const segundo = render(
      <StrictMode>
        <FotoAmpliada onClose={() => {}} />
      </StrictMode>,
    );
    segundo.unmount();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("2) useFocoQueVuelve — el foco va a «Entendido» y, al cerrar, vuelve a «Enviar»", async () => {
    const user = userEvent.setup();
    render(
      <StrictMode>
        <PaginaConEnvio />
      </StrictMode>,
    );

    await user.click(screen.getByRole("button", { name: "Enviar" }));
    expect(screen.getByRole("button", { name: "Entendido" })).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "Entendido" }));
    expect(screen.getByRole("button", { name: "Enviar" })).toHaveFocus();
  });

  it("3) useTeclaEscape — sin texto, Escape cierra; con texto, pregunta antes", async () => {
    const user = userEvent.setup();
    render(
      <StrictMode>
        <PaginaConMensaje />
      </StrictMode>,
    );

    // Sin escribir nada: Escape cierra.
    await user.click(screen.getByRole("button", { name: "Escribir" }));
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: "Mensaje rápido" })).not.toBeInTheDocument();

    // Con algo escrito: Escape pregunta, y Descartar cierra.
    await user.click(screen.getByRole("button", { name: "Escribir" }));
    await user.type(screen.getByRole("textbox", { name: "Tu mensaje" }), "Hola");
    await user.keyboard("{Escape}");
    expect(screen.getByRole("dialog", { name: "Mensaje rápido" })).toBeInTheDocument();
    expect(screen.getByText(/¿Descartar el mensaje\?/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Descartar" }));
    expect(screen.queryByRole("dialog", { name: "Mensaje rápido" })).not.toBeInTheDocument();
  });

  it("4) MapModal — los tres préstamos, y el foco se queda en «Copiar dirección»", async () => {
    const user = userEvent.setup();
    render(
      <StrictMode>
        <PaginaDeContacto />
      </StrictMode>,
    );

    await user.click(screen.getByRole("button", { name: "Ver mapa" }));
    expect(document.body.style.overflow).toBe("hidden");
    expect(screen.getByRole("button", { name: "Cerrar mapa" })).toHaveFocus();

    // El padre se vuelve a pintar y le pasa un onClose nuevo.
    await user.click(screen.getByRole("button", { name: "Copiar dirección" }));
    expect(screen.getByText("Copias: 1")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copiar dirección" })).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: "Mapa de ubicación" })).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
    expect(screen.getByRole("button", { name: "Ver mapa" })).toHaveFocus();
  });
});
