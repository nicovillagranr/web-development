import { StrictMode, type ReactNode } from "react";
import { describe, it, expect, vi, afterEach, type Mock } from "vitest";
import { act, render, screen } from "@testing-library/react";
import {
  Temperatura,
  useTemperaturaConBandera,
  useTemperaturaConRef,
  useTemperaturaCancelable,
  useTemperaturaConLasDos,
  TarjetaClima,
} from "./exercise-07";

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
 * con el clima de esa ciudad, o con un 500 si caido. Hace caso al signal como el de
 * verdad: si ya viene abortado, ni sale; si lo abortan antes de responder, rechaza. */
function responder({ caido = false }: { caido?: boolean } = {}) {
  const fetchFalso: FetchFalso = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
    const signal = init?.signal;
    const clima = CLIMA[new URL(String(input)).searchParams.get("latitude") ?? ""];
    const respuesta =
      caido || !clima
        ? new Response(JSON.stringify({ error: true, reason: "Internal error" }), { status: 500 })
        : new Response(
            JSON.stringify({ current_weather: { temperature: clima.temperatura, weathercode: 1 } }),
            { status: 200 },
          );

    return new Promise<Response>((resolve, reject) => {
      if (signal?.aborted) {
        reject(signal.reason);
        return;
      }
      const reloj = setTimeout(() => resolve(respuesta), clima?.retrasoMs ?? 30);
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

/* Monta la tarjeta en Santiago y pasa a Valparaíso antes de que llegue Santiago. */
async function deSantiagoAValparaiso(Tarjeta: (props: Ciudad) => ReactNode) {
  const { rerender } = render(
    <StrictMode>
      <Tarjeta {...SANTIAGO} />
    </StrictMode>,
  );
  rerender(
    <StrictMode>
      <Tarjeta {...VALPARAISO} />
    </StrictMode>,
  );
  expect(await screen.findByText("17 °C")).toBeInTheDocument();
}

const MENSAJE_PISA = "Santiago llegó tarde y pisó a Valparaíso";
const MENSAJE_CANCELA =
  "Cuando llega Valparaíso, cada petición de Santiago tiene que estar cancelada (signal.aborted en true)";

function ConBandera({ lat, lon }: Ciudad) {
  return <Temperatura grados={useTemperaturaConBandera(lat, lon)} />;
}
function ConRef({ lat, lon }: Ciudad) {
  return <Temperatura grados={useTemperaturaConRef(lat, lon)} />;
}
function Cancelable({ lat, lon }: Ciudad) {
  return <Temperatura grados={useTemperaturaCancelable(lat, lon)} />;
}
function ConLasDos({ lat, lon }: Ciudad) {
  return <Temperatura grados={useTemperaturaConLasDos(lat, lon)} />;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("13-fetch-tipado / exercise-07 — la ciudad vieja", () => {
  it("1) useTemperaturaConBandera — la respuesta de Santiago se ignora", async () => {
    responder();
    await deSantiagoAValparaiso(ConBandera);
    await esperar(250);
    expect(screen.queryByText("24 °C"), MENSAJE_PISA).not.toBeInTheDocument();
    expect(screen.getByText("17 °C")).toBeInTheDocument();
  });

  it("2) useTemperaturaConRef — cada ejecución, su bandera", async () => {
    responder();
    await deSantiagoAValparaiso(ConRef);
    await esperar(250);
    expect(screen.queryByText("24 °C"), MENSAJE_PISA).not.toBeInTheDocument();
    expect(screen.getByText("17 °C")).toBeInTheDocument();
  });

  it("3) useTemperaturaCancelable — la petición de Santiago se cancela", async () => {
    const fetchFalso = responder();
    await deSantiagoAValparaiso(Cancelable);
    expect(cancelacionesDe(fetchFalso, SANTIAGO), MENSAJE_CANCELA).not.toContain(false);
    await esperar(250);
    expect(screen.queryByText("24 °C"), MENSAJE_PISA).not.toBeInTheDocument();
    expect(screen.getByText("17 °C")).toBeInTheDocument();
  });

  it("4) useTemperaturaConLasDos — no basta con ignorarla: se cancela", async () => {
    const fetchFalso = responder();
    await deSantiagoAValparaiso(ConLasDos);
    expect(cancelacionesDe(fetchFalso, SANTIAGO), MENSAJE_CANCELA).not.toContain(false);
    await esperar(250);
    expect(screen.queryByText("24 °C"), MENSAJE_PISA).not.toBeInTheDocument();
    expect(screen.getByText("17 °C")).toBeInTheDocument();
  });

  it("5) useClima — la temperatura, el aviso si falla y la ciudad vieja cancelada", async () => {
    responder();
    const bien = render(
      <StrictMode>
        <TarjetaClima {...VALPARAISO} />
      </StrictMode>,
    );
    expect(screen.getByText("Cargando…")).toBeInTheDocument();
    expect(await screen.findByText("17 °C")).toBeInTheDocument();
    bien.unmount();

    responder({ caido: true });
    const caido = render(
      <StrictMode>
        <TarjetaClima {...VALPARAISO} />
      </StrictMode>,
    );
    expect(await screen.findByRole("alert")).toHaveTextContent("No fue posible obtener el clima");
    caido.unmount();

    const fetchFalso = responder();
    await deSantiagoAValparaiso(TarjetaClima);
    expect(cancelacionesDe(fetchFalso, SANTIAGO), MENSAJE_CANCELA).not.toContain(false);
    await esperar(250);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByText("17 °C")).toBeInTheDocument();
  });
});
