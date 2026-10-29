import { StrictMode } from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  useTemaGuardado,
  BotonDeTema,
  TemaDelSistema,
  TemaDelPortfolio,
  TemaQueNoVuelve,
  useTema,
  type Tema,
} from "./exercise-09";

/* `window.matchMedia` no existe en el entorno de los tests. Aquí va de mentira, y
 * apunta quién la escucha, como en el 07. */
type Oyente = () => void;

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
      act(() => oyentes.forEach((oyente) => oyente()));
    },
  };
}

const CLAVE = "theme:mode";
const html = document.documentElement;

/* El 1 y el 6 apuntan el tema de CADA render, para ver el primero. */
function EspiaGuardado({ alPintar }: { alPintar: (tema: Tema) => void }) {
  const tema = useTemaGuardado();
  alPintar(tema);
  return <p>Tema: {tema}</p>;
}

function UsaTema({ alPintar }: { alPintar: (tema: Tema) => void }) {
  const { tema, alternarTema } = useTema();
  alPintar(tema);
  return (
    <button type="button" onClick={alternarTema}>
      Cambiar tema
    </button>
  );
}

afterEach(() => {
  localStorage.clear();
  html.classList.remove("light");
  vi.unstubAllGlobals();
});

describe("12-custom-hooks / exercise-09 — el tema de tu portfolio", () => {
  it("1) useTemaGuardado — lo guardado desde el primer render, y si no hay nada, dark", () => {
    localStorage.setItem(CLAVE, "light");
    const vistos: Tema[] = [];
    const primero = render(<EspiaGuardado alPintar={(tema) => vistos.push(tema)} />);
    expect(vistos[0]).toBe("light");
    primero.unmount();

    localStorage.clear();
    const sinNada: Tema[] = [];
    render(<EspiaGuardado alPintar={(tema) => sinNada.push(tema)} />);
    expect(sinNada[0]).toBe("dark");
  });

  it("2) BotonDeTema — alterna, y leerTema se llama una sola vez", async () => {
    const user = userEvent.setup();
    const leerTema = vi.fn((): Tema => "dark");
    render(<BotonDeTema leerTema={leerTema} />);

    const boton = screen.getByRole("button");
    await user.click(boton);
    expect(boton).toHaveTextContent("Tema: light");
    await user.click(boton);
    await user.click(boton);
    expect(boton).toHaveTextContent("Tema: light");
    expect(leerTema).toHaveBeenCalledTimes(1);
  });

  it("3) TemaDelSistema — sigue al sistema en vivo, y al irse deja de escucharlo", () => {
    const consulta = consultaFalsa(false);
    const { unmount } = render(
      <StrictMode>
        <TemaDelSistema />
      </StrictMode>,
    );

    expect(screen.getByText("Tema del sistema: dark")).toBeInTheDocument();
    consulta.cambiar(true);
    expect(screen.getByText("Tema del sistema: light")).toBeInTheDocument();
    unmount();
    expect(consulta.oyentes.size).toBe(0);
  });

  it("4) TemaDelPortfolio — cada clic pone o quita la clase light del <html>", async () => {
    const user = userEvent.setup();
    render(
      <StrictMode>
        <TemaDelPortfolio />
      </StrictMode>,
    );

    expect(html).not.toHaveClass("light");
    await user.click(screen.getByRole("button", { name: "Cambiar tema" }));
    expect(html).toHaveClass("light");
    await user.click(screen.getByRole("button", { name: "Cambiar tema" }));
    expect(html).not.toHaveClass("light");
  });

  it("5) TemaQueNoVuelve — del claro al oscuro, la clase light se va", async () => {
    const user = userEvent.setup();
    render(
      <StrictMode>
        <TemaQueNoVuelve />
      </StrictMode>,
    );

    await user.click(screen.getByRole("button", { name: "Cambiar tema" }));
    expect(html).toHaveClass("light");
    await user.click(screen.getByRole("button", { name: "Cambiar tema" }));
    expect(html).not.toHaveClass("light");
  });

  it("6) useTema — bien desde el primer render, y cada cambio llega al <html> y al localStorage", async () => {
    const user = userEvent.setup();

    // Nada guardado y el sistema en claro: claro desde el primer render.
    consultaFalsa(true);
    const vistos: Tema[] = [];
    const primero = render(
      <StrictMode>
        <UsaTema alPintar={(tema) => vistos.push(tema)} />
      </StrictMode>,
    );
    expect(vistos[0]).toBe("light");
    expect(html).toHaveClass("light");
    expect(localStorage.getItem(CLAVE)).toBe("light");

    await user.click(screen.getByRole("button", { name: "Cambiar tema" }));
    expect(html).not.toHaveClass("light");
    expect(localStorage.getItem(CLAVE)).toBe("dark");
    primero.unmount();

    // Lo guardado gana al sistema.
    const conGuardado: Tema[] = [];
    render(
      <StrictMode>
        <UsaTema alPintar={(tema) => conGuardado.push(tema)} />
      </StrictMode>,
    );
    expect(conGuardado[0]).toBe("dark");
    expect(html).not.toHaveClass("light");
  });

  it("6) useTema — lo guardado que no es light ni dark cuenta como nada", () => {
    consultaFalsa(false);
    localStorage.setItem(CLAVE, "azul");
    const vistos: Tema[] = [];
    render(<UsaTema alPintar={(tema) => vistos.push(tema)} />);
    expect(vistos[0]).toBe("dark");
    expect(localStorage.getItem(CLAVE)).toBe("dark");
  });
});
