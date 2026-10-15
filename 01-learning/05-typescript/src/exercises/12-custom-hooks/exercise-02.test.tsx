import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ModalSinScroll,
  CerrarConEscape,
  respuesta3,
  respuesta4,
  respuesta5,
  respuesta6,
  crearTablon,
  colgarYQuitar,
  colgarYQuitarClic,
  AvisarClics,
  pideMenosMovimiento,
  PreferenciaMovimiento,
  respuesta12,
  AvisoDemo,
  respuesta14,
  AvisoConLikes,
  respuesta16,
  respuesta17,
  AvisoConLimpieza,
  respuesta19,
  respuesta20,
  AvisoProyectoDemo,
} from "./exercise-02";

/* Los efectos tocan cosas de fuera de React, así que cada test deja la página como
 * la encontró. `window.matchMedia` no existe en el entorno de los tests: los drills
 * 10 y 11 usan una consulta de mentira que apunta quién la escucha. */

afterEach(() => {
  document.body.style.overflow = "";
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

type Oyente = (event: { matches: boolean }) => void;

function consultaFalsa(inicial: boolean) {
  const oyentes = new Set<Oyente>();
  const consulta = {
    matches: inicial,
    addEventListener: (_tipo: string, oyente: Oyente) => oyentes.add(oyente),
    removeEventListener: (_tipo: string, oyente: Oyente) => oyentes.delete(oyente),
  };
  vi.stubGlobal("matchMedia", () => consulta);

  return {
    oyentes,
    cambiar(valor: boolean) {
      consulta.matches = valor;
      act(() => oyentes.forEach((oyente) => oyente({ matches: valor })));
    },
  };
}

describe("12-custom-hooks / exercise-02 — la limpieza de un efecto", () => {
  it("1) ModalSinScroll — bloquea el fondo y, al desmontarse, lo devuelve", () => {
    const { unmount } = render(<ModalSinScroll />);
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("2) CerrarConEscape — Escape cierra, y al desmontarse el listener se va", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { unmount } = render(<CerrarConEscape onClose={onClose} />);

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);

    unmount();
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("3) respuesta3 — una limpieza que quita otra función", () => {
    expect(respuesta3).toBe("sí, se llama");
  });

  it("4) respuesta4 — los registros de Sala, de norte a sur", () => {
    expect(respuesta4).toEqual([
      "conecta norte",
      "desconecta norte",
      "conecta sur",
      "desconecta sur",
    ]);
  });

  it("5) respuesta5 — sin limpieza y con el ensayo de StrictMode", () => {
    expect(respuesta5).toBe(2);
  });

  it("6) respuesta6 — una función pasada a otra constante", () => {
    expect(respuesta6).toBe(true);
  });

  it("7) colgarYQuitar — cuelga un aviso y lo quita: el tablón queda vacío", () => {
    const tablon = crearTablon();
    const colgar = vi.spyOn(tablon, "colgar");
    colgarYQuitar(tablon);

    expect(colgar).toHaveBeenCalledTimes(1);
    expect(tablon.cuantos()).toBe(0);
  });

  it("8) colgarYQuitarClic — cuelga el listener y lo quita: un clic ya no llama a nadie", () => {
    const colgar = vi.spyOn(document, "addEventListener");
    const alHacerClic = vi.fn();
    colgarYQuitarClic(alHacerClic);

    expect(colgar).toHaveBeenCalledWith("click", expect.any(Function));
    document.body.click();
    expect(alHacerClic).not.toHaveBeenCalled();
  });

  it("9) AvisarClics — avisa de cada clic mientras está montado, y al desmontarse deja de hacerlo", () => {
    const alHacerClic = vi.fn();
    const { unmount } = render(<AvisarClics alHacerClic={alHacerClic} />);

    document.body.click();
    expect(alHacerClic).toHaveBeenCalledTimes(1);

    unmount();
    document.body.click();
    expect(alHacerClic).toHaveBeenCalledTimes(1);
  });

  it("10) pideMenosMovimiento — devuelve lo que dice la consulta", () => {
    consultaFalsa(true);
    expect(pideMenosMovimiento()).toBe(true);

    consultaFalsa(false);
    expect(pideMenosMovimiento()).toBe(false);
  });

  it("11) PreferenciaMovimiento — sigue la preferencia y al desmontarse deja de escuchar", () => {
    const { oyentes, cambiar } = consultaFalsa(false);
    const { unmount } = render(<PreferenciaMovimiento />);
    expect(screen.getByText("Animaciones: normales")).toBeInTheDocument();

    cambiar(true);
    expect(screen.getByText("Animaciones: reducidas")).toBeInTheDocument();

    unmount();
    expect(oyentes.size).toBe(0);
  });
});

/* Escalera 2: los temporizadores son de mentira (`vi.useFakeTimers`), así que el test
 * adelanta el reloj con `pasar(ms)` en vez de esperar de verdad. `vi.getTimerCount()`
 * cuenta los temporizadores que siguen pendientes. */

const AVISO = "AVISO: Proyecto Demo";
const pasar = (ms: number) =>
  act(() => {
    vi.advanceTimersByTime(ms);
  });

describe("12-custom-hooks / exercise-02 — escalera 2, un temporizador de principio a fin", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("12) respuesta12 — los registros al montarse", () => {
    expect(respuesta12).toEqual(["pinta", "efecto"]);
  });

  it("13) AvisoDemo — se va a los 3 segundos y no deja otro temporizador programado", () => {
    render(<AvisoDemo />);
    expect(screen.getByText(AVISO)).toBeInTheDocument();

    pasar(3000);
    expect(screen.queryByText(AVISO)).not.toBeInTheDocument();
    expect(vi.getTimerCount(), "temporizadores pendientes").toBe(0);
  });

  it("14) respuesta14 — los registros al pasar 3 segundos", () => {
    expect(respuesta14).toEqual(["pinta", "efecto", "se acaba el tiempo", "pinta"]);
  });

  it("15) AvisoConLikes — un clic en Me gusta no le da más tiempo al aviso", () => {
    render(<AvisoConLikes />);

    pasar(2000);
    fireEvent.click(screen.getByRole("button", { name: "Me gusta (0)" }));
    expect(screen.getByRole("button", { name: "Me gusta (1)" })).toBeInTheDocument();

    pasar(1000);
    expect(screen.queryByText(AVISO)).not.toBeInTheDocument();
  });

  it("16) respuesta16 — los registros si se desmonta al segundo 1", () => {
    expect(respuesta16).toEqual(["pinta", "efecto", "limpieza"]);
  });

  it("17) respuesta17 — los registros si la limpieza no cancela", () => {
    expect(respuesta17).toEqual(["pinta", "efecto", "limpieza", "se acaba el tiempo"]);
  });

  it("18) AvisoConLimpieza — se va a los 3 segundos, y si se desmonta antes cancela el temporizador", () => {
    const primero = render(<AvisoConLimpieza />);
    pasar(3000);
    expect(screen.queryByText(AVISO)).not.toBeInTheDocument();
    primero.unmount();

    const segundo = render(<AvisoConLimpieza />);
    pasar(1000);
    segundo.unmount();
    expect(vi.getTimerCount(), "temporizadores pendientes").toBe(0);
  });

  it("19) respuesta19 — el segundo en que desaparece el aviso", () => {
    expect(respuesta19).toBe(5);
  });

  it("20) respuesta20 — los registros de tu PortfolioItem", () => {
    expect(respuesta20).toEqual(["programa", "limpieza"]);
  });

  it("21) AvisoProyectoDemo — aparece al pulsar, se va a los 3 segundos aunque el padre repinte, y se cancela al desmontarse", () => {
    const { rerender, unmount } = render(<AvisoProyectoDemo />);
    const boton = screen.getByRole("button", { name: "Ver detalle" });
    expect(screen.queryByText(AVISO)).not.toBeInTheDocument();

    fireEvent.click(boton);
    expect(screen.getByText(AVISO)).toBeInTheDocument();

    pasar(2000);
    rerender(<AvisoProyectoDemo />);
    pasar(1000);
    expect(screen.queryByText(AVISO)).not.toBeInTheDocument();

    fireEvent.click(boton);
    expect(screen.getByText(AVISO)).toBeInTheDocument();

    pasar(1000);
    unmount();
    expect(vi.getTimerCount(), "temporizadores pendientes").toBe(0);
  });
});
