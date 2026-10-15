import { describe, it, expect, vi, afterEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
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
