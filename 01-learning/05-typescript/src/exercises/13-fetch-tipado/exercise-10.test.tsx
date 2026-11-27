import { StrictMode } from "react";
import { describe, it, expect, vi, afterEach, type Mock } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import {
  HorasSchema,
  temperaturaDe,
  maximasPorDia,
  rangoDelDia,
  fechasConMaxima,
  diasConMaxima,
  armarPronostico,
  esDeDia,
  TarjetaWeather,
  API_AIRE,
  type Horas,
} from "./exercise-10";

type Ciudad = { lat: number; lon: number };

const SANTIAGO: Ciudad = { lat: -33.45, lon: -70.67 };
const VALPARAISO: Ciudad = { lat: -33.05, lon: -71.62 };

/* Cada cuánto vuelve a pedir el drill 5 en el test. */
const CADA_MS = 300;

/* Lo que tarda cada ciudad en contestar, en cada API. En Santiago, el aire tarda más que
 * el clima: da tiempo a cambiar de ciudad con el aire en camino. */
const RETRASO_MS: Record<string, { clima: number; aire: number }> = {
  [String(SANTIAGO.lat)]: { clima: 80, aire: 200 },
  [String(VALPARAISO.lat)]: { clima: 30, aire: 20 },
};

const DIAS = {
  time: ["2026-11-23", "2026-11-24", "2026-11-25"],
  temperature_2m_min: [11.6, 12.4, 10.9],
  temperature_2m_max: [24.2, 26.8, 23.5],
};

/* Una respuesta: el número que toca (la temperatura o el índice del aire), o un 500. */
type Respuesta = number | 500;
type Plan = { clima?: Respuesta[]; aire?: Respuesta[] };

type FetchFalso = Mock<(input: RequestInfo | URL, init?: RequestInit) => Promise<Response>>;

function latitudDe(input: RequestInfo | URL): string {
  return new URL(String(input)).searchParams.get("latitude") ?? "";
}

function apiDe(input: RequestInfo | URL): "clima" | "aire" {
  return String(input).startsWith(API_AIRE) ? "aire" : "clima";
}

/* Open-Meteo no existe aquí: este fetch de mentira contesta a cada ciudad y a cada API,
 * en orden, lo que diga su lista, y al acabarla repite la última. Las canceladas no gastan
 * respuesta. Hace caso al signal como el de verdad: si ya viene abortado, rechaza sin
 * esperar. */
function responder({ santiago = {}, valparaiso = {} }: { santiago?: Plan; valparaiso?: Plan } = {}) {
  const listas: Record<string, { clima: Respuesta[]; aire: Respuesta[] }> = {
    [String(SANTIAGO.lat)]: { clima: [...(santiago.clima ?? [24.3])], aire: [...(santiago.aire ?? [85])] },
    [String(VALPARAISO.lat)]: { clima: [...(valparaiso.clima ?? [16.8])], aire: [...(valparaiso.aire ?? [32])] },
  };

  const fetchFalso: FetchFalso = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
    const signal = init?.signal;
    const latitud = latitudDe(input);
    const api = apiDe(input);
    const lista = listas[latitud]?.[api] ?? [500];

    return new Promise<Response>((resolve, reject) => {
      if (signal?.aborted) {
        reject(signal.reason);
        return;
      }
      const reloj = setTimeout(() => {
        const respuesta = lista.length > 1 ? lista.shift() : lista[0];
        if (respuesta === undefined || respuesta === 500) {
          resolve(new Response(JSON.stringify({ error: true, reason: "Internal error" }), { status: 500 }));
          return;
        }
        const cuerpo =
          api === "aire"
            ? { current: { us_aqi: respuesta } }
            : { current_weather: { temperature: respuesta }, daily: DIAS };
        resolve(new Response(JSON.stringify(cuerpo), { status: 200 }));
      }, RETRASO_MS[latitud]?.[api] ?? 30);
      signal?.addEventListener("abort", () => {
        clearTimeout(reloj);
        reject(signal.reason);
      });
    });
  });
  vi.stubGlobal("fetch", fetchFalso);
  return fetchFalso;
}

/* Cuántas veces se llamó a fetch para esa ciudad (en una API, o en las dos). */
function pedidasA(fetchFalso: FetchFalso, ciudad: Ciudad, api?: "clima" | "aire"): number {
  return fetchFalso.mock.calls.filter(
    ([input]) => latitudDe(input) === String(ciudad.lat) && (api === undefined || apiDe(input) === api),
  ).length;
}

/* Si cada petición que se hizo a esa ciudad, en las dos APIs, tiene su signal abortado. */
function cancelacionesDe(fetchFalso: FetchFalso, ciudad: Ciudad): boolean[] {
  return fetchFalso.mock.calls
    .filter(([input]) => latitudDe(input) === String(ciudad.lat))
    .map(([, init]) => init?.signal?.aborted ?? false);
}

function esperar(ms: number) {
  return act(() => new Promise<void>((listo) => setTimeout(listo, ms)));
}

const AVISO = "No fue posible obtener el clima";

function Tarjeta({ lat, lon }: Ciudad) {
  return (
    <StrictMode>
      <TarjetaWeather lat={lat} lon={lon} cadaMs={CADA_MS} />
    </StrictMode>
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("13-fetch-tipado / exercise-10 — tu useWeather, tipado", () => {
  it("1) HorasSchema — is_day puede faltar, pero si viene se comprueba", () => {
    const conIsDay = {
      time: ["2026-11-23T14:00", "2026-11-23T23:00"],
      temperature_2m: [24.1, 15.3],
      is_day: [1, 0],
    };
    const sinIsDay = { time: conIsDay.time, temperature_2m: conIsDay.temperature_2m };

    expect(HorasSchema.parse(conIsDay)).toEqual(conIsDay);
    expect(() => HorasSchema.parse(sinIsDay), "Una respuesta sin is_day tiene que pasar el parse").not.toThrow();
    expect(HorasSchema.parse(sinIsDay)).toEqual(sinIsDay);
    expect(
      () => HorasSchema.parse({ ...conIsDay, is_day: ["sí", "no"] }),
      "Si is_day viene, se comprueba igual: tienen que ser números",
    ).toThrow();
    expect(() => HorasSchema.parse({ time: conIsDay.time }), "temperature_2m sigue siendo obligatorio").toThrow();
  });

  it("2) temperaturaDe — la hora i redondeada, o null si no está", () => {
    expect(temperaturaDe([21.4, 22.9], 1)).toBe(23);
    expect(temperaturaDe([21.4, 22.9], 5), "La hora 5 no está en el array: null").toBeNull();
    expect(temperaturaDe([21.4, 22.9], -1), "La hora -1 no está en el array: null").toBeNull();
    expect(temperaturaDe([0, 22.9], 0), "0 °C es un dato, no un hueco").toBe(0);
  });

  it("3a) maximasPorDia — cada fecha con la máxima de su misma posición", () => {
    expect(maximasPorDia(DIAS), "Cada fecha va con la máxima de su misma posición").toEqual([
      { fecha: "2026-11-23", max: 24 },
      { fecha: "2026-11-24", max: 27 },
      { fecha: "2026-11-25", max: 24 },
    ]);
    expect(
      maximasPorDia({ ...DIAS, temperature_2m_max: [24.2, 26.8] }),
      "Al último día le falta la máxima: sale con null",
    ).toEqual([
      { fecha: "2026-11-23", max: 24 },
      { fecha: "2026-11-24", max: 27 },
      { fecha: "2026-11-25", max: null },
    ]);
  });

  it("3b) rangoDelDia — sin la mínima o sin la máxima, «sin dato»", () => {
    expect(rangoDelDia(DIAS, 1)).toBe("12–27 °C");
    expect(
      rangoDelDia({ ...DIAS, temperature_2m_max: [24.2, 26.8] }, 2),
      "Al día 2 le falta la máxima: «sin dato»",
    ).toBe("sin dato");
    expect(
      rangoDelDia({ ...DIAS, temperature_2m_min: [11.6] }, 1),
      "Al día 1 le falta la mínima: «sin dato»",
    ).toBe("sin dato");
    expect(rangoDelDia(DIAS, 5), "El día 5 no existe: «sin dato»").toBe("sin dato");
  });

  it("3c) fechasConMaxima — el día sin máxima no sale", () => {
    expect(fechasConMaxima(DIAS)).toEqual(["2026-11-23", "2026-11-24", "2026-11-25"]);
    expect(
      fechasConMaxima({ ...DIAS, temperature_2m_max: [24.2, 26.8] }),
      "Al último día le falta la máxima: su fecha no sale",
    ).toEqual(["2026-11-23", "2026-11-24"]);
  });

  it("3d) diasConMaxima — los días con su máxima, sin los que les falta", () => {
    expect(diasConMaxima({ ...DIAS, temperature_2m_max: [24.2, 26.8] })).toEqual([
      { fecha: "2026-11-23", max: 24 },
      { fecha: "2026-11-24", max: 27 },
    ]);
  });

  it("3) armarPronostico — los días completos, sin los que tienen huecos", () => {
    expect(armarPronostico(DIAS)).toEqual([
      { fecha: "2026-11-23", min: 12, max: 24 },
      { fecha: "2026-11-24", min: 12, max: 27 },
      { fecha: "2026-11-25", min: 11, max: 24 },
    ]);
    expect(
      armarPronostico({ ...DIAS, temperature_2m_max: [24.2, 26.8] }),
      "Al último día le falta la máxima: ese día no sale",
    ).toEqual([
      { fecha: "2026-11-23", min: 12, max: 24 },
      { fecha: "2026-11-24", min: 12, max: 27 },
    ]);
    expect(
      armarPronostico({ ...DIAS, temperature_2m_min: [0] }),
      "A los días 2 y 3 les falta la mínima: solo sale el 1, con su mínima de 0 °C",
    ).toEqual([{ fecha: "2026-11-23", min: 0, max: 24 }]);
  });

  it("4) esDeDia — is_day manda; si no trae la hora, decide time", () => {
    const horas: Horas = {
      time: [
        "2026-11-23T14:00",
        "2026-11-23T13:00",
        "2026-11-24T10:00",
        "2026-11-24T22:00",
        "2026-11-24T07:00",
        "2026-11-24T20:00",
      ],
      temperature_2m: [24, 23, 18, 15, 12, 17],
      is_day: [1, 0],
    };

    expect(esDeDia(horas, 0)).toBe(true);
    expect(esDeDia(horas, 1), "is_day dice 0: es de noche, aunque sean las 13:00").toBe(false);
    expect(esDeDia(horas, 2), "is_day no trae la hora 2: decide time, y son las 10:00").toBe(true);
    expect(esDeDia(horas, 3), "is_day no trae la hora 3: decide time, y son las 22:00").toBe(false);
    expect(esDeDia(horas, 4), "Las 7:00 ya son de día").toBe(true);
    expect(esDeDia(horas, 5), "Las 20:00 ya son de noche").toBe(false);
    expect(esDeDia(horas, 9), "La hora 9 no está ni en is_day ni en time: false").toBe(false);
  });

  it("5) useWeather — pide, se pone al día, reintenta y cancela la ciudad vieja", async () => {
    responder({ valparaiso: { clima: [16.8, 18.2] } });
    const alDia = render(<Tarjeta {...VALPARAISO} />);
    expect(screen.getByText("Cargando…")).toBeInTheDocument();
    expect(await screen.findByText("17 °C")).toBeInTheDocument();
    expect(screen.getByText("Aire: 32")).toBeInTheDocument();
    expect(screen.getByText("2026-11-23: 12–24 °C")).toBeInTheDocument();
    expect(
      await screen.findByText("18 °C"),
      "Pasada una vuelta, la tarjeta tiene que haber pedido otra vez y pintar la nueva",
    ).toBeInTheDocument();
    alDia.unmount();

    responder({ valparaiso: { clima: [500, 16.8] } });
    const caido = render(<Tarjeta {...VALPARAISO} />);
    expect(await screen.findByRole("alert")).toHaveTextContent(AVISO);
    fireEvent.click(screen.getByRole("button", { name: "Reintentar" }));
    expect(screen.getByText("Cargando…")).toBeInTheDocument();
    await esperar(100);
    expect(
      screen.queryByText("17 °C"),
      "«Reintentar» tiene que pedir ya, sin esperar a la vuelta siguiente del polling",
    ).toBeInTheDocument();
    expect(screen.queryByRole("alert"), "El reintento salió bien: el aviso tiene que irse").not.toBeInTheDocument();
    caido.unmount();

    responder({ valparaiso: { aire: [500] } });
    const sinAire = render(<Tarjeta {...VALPARAISO} />);
    expect(await screen.findByText("17 °C")).toBeInTheDocument();
    expect(screen.getByText("Aire: sin dato")).toBeInTheDocument();
    expect(screen.queryByRole("alert"), "Si solo falla el aire, el clima se pinta igual").not.toBeInTheDocument();
    sinAire.unmount();

    const fetchFalso = responder();
    const { rerender, unmount } = render(<Tarjeta {...SANTIAGO} />);
    await esperar(150);
    expect(
      pedidasA(fetchFalso, SANTIAGO, "aire"),
      "El clima de Santiago ya llegó: su aire tiene que estar en camino",
    ).toBeGreaterThan(0);
    rerender(<Tarjeta {...VALPARAISO} />);
    await esperar(5);
    expect(screen.queryByRole("alert"), "Cambiar de ciudad no es un fallo: la cancelada no deja aviso").not.toBeInTheDocument();
    expect(await screen.findByText("17 °C")).toBeInTheDocument();
    expect(
      cancelacionesDe(fetchFalso, SANTIAGO),
      "Cuando llega Valparaíso, cada petición de Santiago, la del clima y la del aire, tiene que estar cancelada",
    ).not.toContain(false);
    const santiago = pedidasA(fetchFalso, SANTIAGO);
    await esperar(CADA_MS * 1.5);
    expect(pedidasA(fetchFalso, SANTIAGO), "Ya estás en Valparaíso: nadie tiene que volver a pedir Santiago").toBe(
      santiago,
    );

    unmount();
    const total = fetchFalso.mock.calls.length;
    await esperar(CADA_MS * 1.5);
    expect(fetchFalso.mock.calls.length, "Desmontada la tarjeta, nadie tiene que seguir pidiendo").toBe(total);
  });
});
