import { StrictMode } from "react";
import { describe, it, expect, vi, afterEach, onTestFinished } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { HeroDeProjex, FondoDelContacto, ahorraDatos, useMediaPreferences } from "./exercise-07";

/* `window.matchMedia` y `navigator.connection` no existen en el entorno de los tests.
 * Aquí van de mentira, y apuntan quién las escucha, como en el 02. */
type Oyente = () => void;

afterEach(() => {
  vi.unstubAllGlobals();
});

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

/* Una conexión de mentira, como la de Chrome con "Ahorrar datos". Sin llamar a esta
 * función, `navigator.connection` no existe: es Safari o Firefox. */
function conexionFalsa(saveData: boolean) {
  const oyentes = new Set<Oyente>();
  const conexion = {
    saveData,
    addEventListener: (_tipo: string, oyente: Oyente) => oyentes.add(oyente),
    removeEventListener: (_tipo: string, oyente: Oyente) => oyentes.delete(oyente),
  };
  Object.defineProperty(navigator, "connection", { value: conexion, configurable: true });
  onTestFinished(() => {
    Reflect.deleteProperty(navigator, "connection");
  });

  return { oyentes };
}

/* El drill 4 apunta lo que decide el Hero en CADA render, para ver el primero. El hook
 * devuelve las dos preferencias y el Hero las junta: con cualquiera, imagen fija. */
function Espia({ alPintar }: { alPintar: (valor: boolean) => void }) {
  const { prefiereReducirMovimiento, prefiereAhorrarDatos } = useMediaPreferences();
  const valor = prefiereReducirMovimiento || prefiereAhorrarDatos;
  alPintar(valor);
  return <p>{valor ? "imagen fija" : "vídeo"}</p>;
}

describe("12-custom-hooks / exercise-07 — tu custom hook", () => {
  it("1) HeroDeProjex — imagen fija con menos movimiento, vídeo sin él, y cambia en vivo", () => {
    const consulta = consultaFalsa(true);
    render(
      <StrictMode>
        <HeroDeProjex />
      </StrictMode>,
    );

    expect(screen.getByText("Hero: imagen fija")).toBeInTheDocument();
    consulta.cambiar(false);
    expect(screen.getByText("Hero: vídeo")).toBeInTheDocument();
  });

  it("2) FondoDelContacto — cambia en vivo, y al desmontarse deja de escuchar", () => {
    const consulta = consultaFalsa(false);
    const { unmount } = render(
      <StrictMode>
        <FondoDelContacto />
      </StrictMode>,
    );

    expect(screen.getByText("Fondo: animado")).toBeInTheDocument();
    consulta.cambiar(true);
    expect(screen.getByText("Fondo: quieto")).toBeInTheDocument();

    unmount();
    expect(consulta.oyentes.size).toBe(0);
  });

  it("3) ahorraDatos — lee saveData donde hay connection, y donde no la hay da false", () => {
    expect(ahorraDatos()).toBe(false);

    conexionFalsa(true);
    expect(ahorraDatos()).toBe(true);
  });

  it("4) useMediaPreferences — bien desde el primer render, cambia en vivo y limpia al irse", () => {
    // Menos movimiento, sin connection (Safari): imagen fija desde el primer render.
    const consulta = consultaFalsa(true);
    const vistos: boolean[] = [];
    const primero = render(<Espia alPintar={(valor) => vistos.push(valor)} />);
    expect(vistos[0]).toBe(true);
    consulta.cambiar(false);
    expect(screen.getByText("vídeo")).toBeInTheDocument();
    primero.unmount();
    expect(consulta.oyentes.size).toBe(0);

    // Sin menos movimiento, pero con "Ahorrar datos": también imagen fija desde el principio.
    const otraConsulta = consultaFalsa(false);
    const conexion = conexionFalsa(true);
    const vistosConDatos: boolean[] = [];
    const segundo = render(
      <StrictMode>
        <Espia alPintar={(valor) => vistosConDatos.push(valor)} />
      </StrictMode>,
    );
    expect(vistosConDatos[0]).toBe(true);
    segundo.unmount();
    expect(otraConsulta.oyentes.size).toBe(0);
    expect(conexion.oyentes.size).toBe(0);
  });
});
