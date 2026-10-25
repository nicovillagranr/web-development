import { StrictMode, useState, type ComponentType } from "react";
import { describe, it, expect, afterEach, onTestFinished } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  devolverFoco,
  MenuQueSeCierraFuera,
  ContactoConDosEntradas,
  ModalDosEntradas,
  MapaConMarcapaginas,
  MapaSobreElMenu,
  MapModalDeProjex,
} from "./exercise-06";

/* Del 3 al 6, el modal se monta desde una página con DOS botones que abren el mismo
 * mapa, como tu "Ver mapa" y un segundo botón en otro sitio. El modal no tiene ningún
 * ref a ellos: si el foco vuelve al bueno, es porque el modal anotó quién lo abrió. */
function DosEntradas({ Modal }: { Modal: ComponentType<{ onClose: () => void }> }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setAbierto(true)}>
        Ver mapa
      </button>
      <button type="button" onClick={() => setAbierto(true)}>
        Cómo llegar
      </button>
      {abierto && <Modal onClose={() => setAbierto(false)} />}
    </div>
  );
}

afterEach(() => {
  document.body.style.overflow = "";
});

describe("12-custom-hooks / exercise-06 — el modal que nace abierto", () => {
  it("1) devolverFoco — enfoca lo que recibe, y con null no hace nada", () => {
    const boton = document.createElement("button");
    document.body.appendChild(boton);
    onTestFinished(() => boton.remove());

    devolverFoco(boton);
    expect(boton).toHaveFocus();
    expect(() => devolverFoco(null)).not.toThrow();
  });

  it("2) MenuQueSeCierraFuera — un clic dentro lo deja abierto; uno fuera lo cierra", async () => {
    const user = userEvent.setup();
    render(
      <StrictMode>
        <MenuQueSeCierraFuera />
      </StrictMode>,
    );

    await user.click(screen.getByRole("button", { name: "Compartir" }));
    await user.click(screen.getByRole("button", { name: "Copiar enlace" }));
    expect(screen.getByRole("group", { name: "Opciones para compartir" })).toBeInTheDocument();

    await user.click(screen.getByText("Fuera del menú"));
    expect(screen.queryByRole("group", { name: "Opciones para compartir" })).not.toBeInTheDocument();
  });

  it("3) ContactoConDosEntradas — el foco vuelve al botón que abrió el mapa, sea cual sea", async () => {
    const user = userEvent.setup();
    const { unmount } = render(
      <StrictMode>
        <ContactoConDosEntradas />
      </StrictMode>,
    );

    await user.click(screen.getByRole("button", { name: "Cómo llegar" }));
    expect(screen.getByRole("button", { name: "Cerrar mapa" })).toHaveFocus();
    await user.click(screen.getByRole("button", { name: "Cerrar mapa" }));
    expect(screen.getByRole("button", { name: "Cómo llegar" })).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "Ver mapa" }));
    await user.click(screen.getByRole("button", { name: "Cerrar mapa" }));
    expect(screen.getByRole("button", { name: "Ver mapa" })).toHaveFocus();
    unmount();

    // El mismo modal, montado desde otra página: aquí no hay `verMapaRef` que valga.
    render(
      <StrictMode>
        <DosEntradas Modal={ModalDosEntradas} />
      </StrictMode>,
    );
    await user.click(screen.getByRole("button", { name: "Cómo llegar" }));
    await user.click(screen.getByRole("button", { name: "Cerrar mapa" }));
    expect(screen.getByRole("button", { name: "Cómo llegar" })).toHaveFocus();
  });

  it("4) MapaConMarcapaginas — al cerrar, el foco vuelve al botón que lo abrió", async () => {
    const user = userEvent.setup();
    render(
      <StrictMode>
        <DosEntradas Modal={MapaConMarcapaginas} />
      </StrictMode>,
    );

    await user.click(screen.getByRole("button", { name: "Cómo llegar" }));
    expect(screen.getByRole("button", { name: "Cerrar mapa" })).toHaveFocus();
    await user.click(screen.getByRole("button", { name: "Cerrar mapa" }));
    expect(screen.getByRole("button", { name: "Cómo llegar" })).toHaveFocus();
  });

  it("5) MapaSobreElMenu — bloquea el scroll mientras vive, y al morir lo deja como estaba", async () => {
    const user = userEvent.setup();
    render(
      <StrictMode>
        <DosEntradas Modal={MapaSobreElMenu} />
      </StrictMode>,
    );

    // Sin menú: el fondo se movía, y se tiene que volver a mover.
    await user.click(screen.getByRole("button", { name: "Ver mapa" }));
    expect(document.body.style.overflow).toBe("hidden");
    await user.click(screen.getByRole("button", { name: "Cerrar mapa" }));
    expect(document.body.style.overflow).toBe("");

    // Con el menú del móvil abierto: el fondo ya estaba quieto, y se tiene que quedar así.
    document.body.style.overflow = "hidden";
    await user.click(screen.getByRole("button", { name: "Ver mapa" }));
    await user.click(screen.getByRole("button", { name: "Cerrar mapa" }));
    expect(document.body.style.overflow).toBe("hidden");
    expect(screen.getByRole("button", { name: "Ver mapa" })).toHaveFocus();
  });

  it("6) MapModalDeProjex — foco a la ✕ y scroll bloqueado al nacer; al morir, todo como estaba", async () => {
    const user = userEvent.setup();
    document.body.style.overflow = "auto";
    render(
      <StrictMode>
        <DosEntradas Modal={MapModalDeProjex} />
      </StrictMode>,
    );

    await user.click(screen.getByRole("button", { name: "Ver mapa" }));
    expect(screen.getByRole("button", { name: "Cerrar mapa" })).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ver mapa" })).toHaveFocus();
    expect(document.body.style.overflow).toBe("auto");

    await user.click(screen.getByRole("button", { name: "Cómo llegar" }));
    await user.click(screen.getByRole("button", { name: "Cerrar mapa" }));
    expect(screen.getByRole("button", { name: "Cómo llegar" })).toHaveFocus();
    expect(document.body.style.overflow).toBe("auto");

    await user.click(screen.getByRole("button", { name: "Ver mapa" }));
    await user.click(screen.getByRole("dialog"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("auto");
  });
});
