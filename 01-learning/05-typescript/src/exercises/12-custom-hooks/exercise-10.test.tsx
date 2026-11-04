import { StrictMode, act, useState, type ComponentType, type ReactElement } from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  TituloDelMapa,
  NotaConDosCampos,
  MapaConZoom,
  MapaConEscape,
  ClicsEnLaPagina,
  MensajeConAutoguardado,
  BuscadorConRef,
  PanelDeFiltros,
  ConfirmacionDeEnvio,
  MenuQueDevuelveFoco,
  GraciasPorEscribir,
  MapModal,
} from "./exercise-10";

function pintar(pagina: ReactElement) {
  const user = userEvent.setup();
  return { user, ...render(<StrictMode>{pagina}</StrictMode>) };
}

/* El padre más simple: un botón abre el componente y su onClose lo cierra. */
function Abridor({
  texto,
  Modal,
}: {
  texto: string;
  Modal: ComponentType<{ onClose: () => void }>;
}) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setAbierto(true)}>
        {texto}
      </button>
      {abierto && <Modal onClose={() => setAbierto(false)} />}
    </div>
  );
}

/* Para el 12: el padre pasa flechas, sin useCallback, y se vuelve a pintar al copiar.
 * Al cerrar apunta las copias que llevabas: si tu Escape llama al onClose del primer
 * render, apunta 0. */
function PaginaDeContacto() {
  const [abierto, setAbierto] = useState(false);
  const [copias, setCopias] = useState(0);
  const [alCerrar, setAlCerrar] = useState<number | null>(null);

  return (
    <section>
      <button type="button" onClick={() => setAbierto(true)}>
        Ver mapa
      </button>
      <p>Copias: {copias}</p>
      {alCerrar !== null && <p>Copias al cerrar: {alCerrar}</p>}
      {abierto && (
        <MapModal
          onClose={() => {
            setAlCerrar(copias);
            setAbierto(false);
          }}
          onCopiar={() => setCopias(copias + 1)}
        />
      )}
    </section>
  );
}

const boton = (nombre: string) => screen.getByRole("button", { name: nombre });

afterEach(() => {
  vi.useRealTimers();
  document.body.style.overflow = "";
});

describe("12-custom-hooks / exercise-10 — A · useEffect y su array", () => {
  it("1) TituloDelMapa — el título sigue al zoom y, al cerrar, vuelve el de antes", async () => {
    document.title = "Projex";
    const { user } = pintar(<Abridor texto="Ver mapa" Modal={TituloDelMapa} />);

    await user.click(boton("Ver mapa"));
    expect(document.title).toBe("Mapa · zoom 1");

    await user.click(boton("Acercar"));
    expect(document.title).toBe("Mapa · zoom 2");

    await user.click(boton("Cerrar mapa"));
    expect(document.title).toBe("Projex");
  });

  it("2) NotaConDosCampos — lo que escribes en «Texto» se queda en «Texto»", async () => {
    const { user } = pintar(<NotaConDosCampos />);
    const titulo = screen.getByRole("textbox", { name: "Título" });
    const texto = screen.getByRole("textbox", { name: "Texto" });
    expect(titulo).toHaveFocus();

    await user.click(texto);
    await user.keyboard("Hola");
    expect(texto).toHaveValue("Hola");
    expect(titulo).toHaveValue("");
    expect(texto).toHaveFocus();
  });

  it("3) MapaConZoom — al acercar, el foco se queda en «Acercar»", async () => {
    const { user } = pintar(<Abridor texto="Ver mapa" Modal={MapaConZoom} />);

    await user.click(boton("Ver mapa"));
    expect(boton("Cerrar mapa")).toHaveFocus();

    await user.click(boton("Acercar"));
    expect(screen.getByText("Zoom: 2")).toBeInTheDocument();
    expect(boton("Acercar")).toHaveFocus();
  });
});

describe("12-custom-hooks / exercise-10 — B · la limpieza", () => {
  it("4) MapaConEscape — Escape cierra una vez, y con el mapa cerrado no llama a nadie", async () => {
    const onClose = vi.fn();
    const { user, unmount } = pintar(<MapaConEscape onClose={onClose} />);

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);

    unmount();
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("5) ClicsEnLaPagina — avisa una vez por clic, y deja de avisar al desmontarse", async () => {
    const onClic = vi.fn();
    const { user, unmount } = pintar(<ClicsEnLaPagina onClic={onClic} />);

    await user.click(document.body);
    expect(onClic).toHaveBeenCalledTimes(1);

    unmount();
    await user.click(document.body);
    expect(onClic).toHaveBeenCalledTimes(1);
  });

  it("6) MensajeConAutoguardado — «Hola» de corrido se guarda una sola vez", () => {
    vi.useFakeTimers();
    const onGuardar = vi.fn();
    render(
      <StrictMode>
        <MensajeConAutoguardado onGuardar={onGuardar} />
      </StrictMode>,
    );

    // Cuatro letras seguidas, sin que pase el tiempo entre una y otra.
    const mensaje = screen.getByRole("textbox", { name: "Mensaje" });
    for (const escrito of ["H", "Ho", "Hol", "Hola"]) {
      fireEvent.change(mensaje, { target: { value: escrito } });
    }
    act(() => {
      vi.advanceTimersByTime(999);
    });
    expect(onGuardar).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(onGuardar).toHaveBeenCalledTimes(1);
    expect(onGuardar).toHaveBeenCalledWith("Hola");
  });
});

describe("12-custom-hooks / exercise-10 — C · refs: .current y focus()", () => {
  it("7) BuscadorConRef — al abrirse, el cursor queda en el campo", () => {
    pintar(<BuscadorConRef />);
    expect(screen.getByRole("searchbox", { name: "Buscar proyectos" })).toHaveFocus();
  });

  it("8) PanelDeFiltros — «Filtrar proyectos» deja el cursor en «Buscar tecnología»", async () => {
    const { user } = pintar(<PanelDeFiltros />);

    await user.click(boton("Filtrar proyectos"));
    expect(screen.getByRole("textbox", { name: "Buscar tecnología" })).toHaveFocus();
  });

  it("9) useFocoAlNacer — al abrirse la confirmación, el foco va a «Entendido»", async () => {
    const { user } = pintar(<Abridor texto="Enviar" Modal={ConfirmacionDeEnvio} />);

    await user.click(boton("Enviar"));
    expect(boton("Entendido")).toHaveFocus();
  });
});

describe("12-custom-hooks / exercise-10 — D · el préstamo del foco", () => {
  it("10) MenuQueDevuelveFoco — el foco va a «Servicios» y vuelve al cerrar", async () => {
    const { user } = pintar(<Abridor texto="Abrir menú" Modal={MenuQueDevuelveFoco} />);

    await user.click(boton("Abrir menú"));
    expect(screen.getByRole("link", { name: "Servicios" })).toHaveFocus();

    await user.click(boton("Cerrar menú"));
    expect(screen.queryByRole("navigation", { name: "Menú del móvil" })).not.toBeInTheDocument();
    expect(boton("Abrir menú")).toHaveFocus();
  });

  it("11) GraciasPorEscribir — el foco va a «Cerrar» y, al cerrar, vuelve a «Enviar»", async () => {
    const { user } = pintar(<Abridor texto="Enviar" Modal={GraciasPorEscribir} />);

    await user.click(boton("Enviar"));
    expect(boton("Cerrar")).toHaveFocus();

    await user.click(boton("Cerrar"));
    expect(boton("Enviar")).toHaveFocus();
  });
});

describe("12-custom-hooks / exercise-10 — todo junto", () => {
  it("12) MapModal — el foco se queda en «Copiar dirección», y Escape cierra al día", async () => {
    const { user } = pintar(<PaginaDeContacto />);

    await user.click(boton("Ver mapa"));
    expect(document.body.style.overflow).toBe("hidden");
    expect(boton("Cerrar mapa")).toHaveFocus();

    // El padre se vuelve a pintar y le pasa al mapa un onClose nuevo.
    await user.click(boton("Copiar dirección"));
    expect(screen.getByText("Copias: 1")).toBeInTheDocument();
    expect(boton("Copiar dirección")).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: "Mapa de ubicación" })).not.toBeInTheDocument();
    expect(screen.getByText("Copias al cerrar: 1")).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
    expect(boton("Ver mapa")).toHaveFocus();
  });
});
