import { StrictMode } from "react";
import { describe, it, expect, vi, afterEach, type Mock } from "vitest";
import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import {
  useRastroDeIntentos,
  useRastroQueNoEscucha,
  TarjetaReintentable,
  useClimaConAvisoPegado,
  useClimaSinEspera,
  TarjetaClimaConReintento,
} from "./exercise-08";

type Ciudad = { lat: number; lon: number };

const SANTIAGO: Ciudad = { lat: -33.45, lon: -70.67 };
const VALPARAISO: Ciudad = { lat: -33.05, lon: -71.62 };

/* Lo que contesta el Open-Meteo de mentira en cada ciudad, y lo que tarda. Santiago
 * tarda mucho a propósito: da tiempo a pasar a Valparaíso antes de que llegue. */
const CLIMA: Record<string, { temperatura: number; retrasoMs: number }> = {
  [String(SANTIAGO.lat)]: { temperatura: 24.3, retrasoMs: 200 },
  [String(VALPARAISO.lat)]: { temperatura: 16.8, retrasoMs: 30 },
};

type FetchFalso = Mock<(input: RequestInfo | URL, init?: RequestInit) => Promise<Response>>;

/* Open-Meteo no existe aquí: este fetch de mentira lee la latitud de la URL y contesta
 * con el clima de esa ciudad. Las primeras «fallos» respuestas que llegan a contestar
 * son un 500; las canceladas no cuentan, como la del ensayo de StrictMode. Hace caso al
 * signal como el de verdad. */
function responder({ fallos = 0 }: { fallos?: number } = {}) {
  let quedan = fallos;
  const fetchFalso: FetchFalso = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
    const signal = init?.signal;
    const clima = CLIMA[new URL(String(input)).searchParams.get("latitude") ?? ""];

    return new Promise<Response>((resolve, reject) => {
      if (signal?.aborted) {
        reject(signal.reason);
        return;
      }
      const reloj = setTimeout(() => {
        if (quedan > 0 || !clima) {
          quedan -= 1;
          resolve(new Response(JSON.stringify({ error: true, reason: "Internal error" }), { status: 500 }));
          return;
        }
        resolve(
          new Response(
            JSON.stringify({ current_weather: { temperature: clima.temperatura, weathercode: 1 } }),
            { status: 200 },
          ),
        );
      }, clima?.retrasoMs ?? 30);
      signal?.addEventListener("abort", () => {
        clearTimeout(reloj);
        reject(signal.reason);
      });
    });
  });
  vi.stubGlobal("fetch", fetchFalso);
  return fetchFalso;
}

/* Si cada petición que se hizo a esa ciudad tiene su signal abortado ahora mismo. */
function cancelacionesDe(fetchFalso: FetchFalso, ciudad: Ciudad): boolean[] {
  return fetchFalso.mock.calls
    .filter(([input]) => new URL(String(input)).searchParams.get("latitude") === String(ciudad.lat))
    .map(([, init]) => init?.signal?.aborted ?? false);
}

function esperar(ms: number) {
  return act(() => new Promise<void>((listo) => setTimeout(listo, ms)));
}

function pulsarReintentar() {
  fireEvent.click(screen.getByRole("button", { name: "Reintentar" }));
}

const AVISO = "No fue posible obtener el clima";

function AvisoPegado() {
  return <TarjetaReintentable {...useClimaConAvisoPegado(VALPARAISO.lat, VALPARAISO.lon)} />;
}
function SinEspera() {
  return <TarjetaReintentable {...useClimaSinEspera(VALPARAISO.lat, VALPARAISO.lon)} />;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("13-fetch-tipado / exercise-08 — «Reintentar»", () => {
  it("1) useRastroDeIntentos — reintentar vuelve a correr el efecto", () => {
    const rastro: string[] = [];
    const apuntar = (linea: string) => {
      rastro.push(linea);
    };
    const { result } = renderHook(() => useRastroDeIntentos(apuntar));
    expect(rastro).toEqual(["pide"]);

    act(() => result.current());
    expect(rastro, "Al pulsar «Reintentar», el efecto tiene que volver a apuntar «pide»").toEqual([
      "pide",
      "pide",
    ]);

    act(() => result.current());
    expect(rastro).toEqual(["pide", "pide", "pide"]);
  });

  it("2) useRastroQueNoEscucha — el efecto escucha al contador", () => {
    const rastro: string[] = [];
    const apuntar = (linea: string) => {
      rastro.push(linea);
    };
    const { result } = renderHook(() => useRastroQueNoEscucha(apuntar));
    expect(rastro).toEqual(["pide"]);

    act(() => result.current());
    expect(rastro, "Al pulsar «Reintentar», el efecto tiene que volver a apuntar «pide»").toEqual([
      "pide",
      "pide",
    ]);

    act(() => result.current());
    expect(rastro).toEqual(["pide", "pide", "pide"]);
  });

  it("3) useClimaConAvisoPegado — si el reintento sale bien, se va el aviso", async () => {
    responder({ fallos: 1 });
    render(
      <StrictMode>
        <AvisoPegado />
      </StrictMode>,
    );
    expect(await screen.findByRole("alert")).toHaveTextContent(AVISO);

    pulsarReintentar();
    await esperar(100);
    expect(screen.queryByRole("alert"), "El reintento salió bien: el aviso tiene que irse").not.toBeInTheDocument();
    expect(screen.getByText("17 °C")).toBeInTheDocument();
  });

  it("4) useClimaSinEspera — al pulsar, «Cargando…» hasta la respuesta", async () => {
    responder({ fallos: 1 });
    render(
      <StrictMode>
        <SinEspera />
      </StrictMode>,
    );
    expect(await screen.findByRole("alert")).toHaveTextContent(AVISO);

    pulsarReintentar();
    expect(
      screen.queryByRole("alert"),
      "Justo después de pulsar «Reintentar», el aviso deja paso a «Cargando…»",
    ).not.toBeInTheDocument();
    expect(screen.getByText("Cargando…")).toBeInTheDocument();
    expect(await screen.findByText("17 °C")).toBeInTheDocument();
  });

  it("5) useClimaConReintento — pide, reintenta y cancela la ciudad vieja", async () => {
    responder();
    const bien = render(
      <StrictMode>
        <TarjetaClimaConReintento {...VALPARAISO} />
      </StrictMode>,
    );
    expect(screen.getByText("Cargando…")).toBeInTheDocument();
    expect(await screen.findByText("17 °C")).toBeInTheDocument();
    bien.unmount();

    responder({ fallos: 2 });
    const caido = render(
      <StrictMode>
        <TarjetaClimaConReintento {...VALPARAISO} />
      </StrictMode>,
    );
    expect(await screen.findByRole("alert")).toHaveTextContent(AVISO);
    pulsarReintentar();
    expect(screen.getByText("Cargando…")).toBeInTheDocument();
    expect(await screen.findByRole("alert")).toHaveTextContent(AVISO);
    pulsarReintentar();
    expect(screen.getByText("Cargando…")).toBeInTheDocument();
    expect(await screen.findByText("17 °C")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    caido.unmount();

    const fetchFalso = responder();
    const { rerender } = render(
      <StrictMode>
        <TarjetaClimaConReintento {...SANTIAGO} />
      </StrictMode>,
    );
    rerender(
      <StrictMode>
        <TarjetaClimaConReintento {...VALPARAISO} />
      </StrictMode>,
    );
    expect(await screen.findByText("17 °C")).toBeInTheDocument();
    expect(
      cancelacionesDe(fetchFalso, SANTIAGO),
      "Cuando llega Valparaíso, cada petición de Santiago tiene que estar cancelada",
    ).not.toContain(false);
    await esperar(250);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByText("17 °C")).toBeInTheDocument();
  });
});
