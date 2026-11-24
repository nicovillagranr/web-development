import { StrictMode, type ComponentType } from "react";
import { describe, it, expect, vi, afterEach, type Mock } from "vitest";
import { act, render, renderHook, screen } from "@testing-library/react";
import {
  useTicQueNoPara,
  useTicQueNoArranca,
  useSegundos,
  useRelojQueSeQueda,
  useClimaQueLlegaTarde,
  useClimaQueSeCruza,
  useClimaQueSigue,
  useClimaConAvisoQueNoSeVa,
  useClimaConFalsaAlarma,
  useClimaConMandoPorVuelta,
  TarjetaClimaQueSeRefresca,
  type ClimaAlDia,
} from "./exercise-09";

type Ciudad = { lat: number; lon: number };

const SANTIAGO: Ciudad = { lat: -33.45, lon: -70.67 };
const VALPARAISO: Ciudad = { lat: -33.05, lon: -71.62 };

/* Cada cuánto vuelven a pedir los drills 4 y 5 en el test. */
const CADA_MS = 100;

/* Lo que tarda cada ciudad en contestar: Santiago, más que una vuelta entera. */
const SANTIAGO_TARDA_MS = 200;
const RETRASO_MS: Record<string, number> = {
  [String(SANTIAGO.lat)]: SANTIAGO_TARDA_MS,
  [String(VALPARAISO.lat)]: 30,
};

/* Una respuesta: la temperatura, o un 500. */
type Respuesta = number | 500;

type FetchFalso = Mock<(input: RequestInfo | URL, init?: RequestInit) => Promise<Response>>;

function latitudDe(input: RequestInfo | URL): string {
  return new URL(String(input)).searchParams.get("latitude") ?? "";
}

/* Open-Meteo no existe aquí: este fetch de mentira contesta a cada ciudad, en orden, lo
 * que diga su lista, y al acabarla repite la última. Las canceladas no gastan respuesta.
 * Hace caso al signal como el de verdad: si ya viene abortado, rechaza sin esperar. */
function responder({
  santiago = [24.3],
  valparaiso = [16.8],
}: { santiago?: Respuesta[]; valparaiso?: Respuesta[] } = {}) {
  const listas: Record<string, Respuesta[]> = {
    [String(SANTIAGO.lat)]: [...santiago],
    [String(VALPARAISO.lat)]: [...valparaiso],
  };

  const fetchFalso: FetchFalso = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
    const signal = init?.signal;
    const latitud = latitudDe(input);
    const lista = listas[latitud] ?? [500];

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
        resolve(
          new Response(JSON.stringify({ current_weather: { temperature: respuesta, weathercode: 1 } }), {
            status: 200,
          }),
        );
      }, RETRASO_MS[latitud] ?? 30);
      signal?.addEventListener("abort", () => {
        clearTimeout(reloj);
        reject(signal.reason);
      });
    });
  });
  vi.stubGlobal("fetch", fetchFalso);
  return fetchFalso;
}

/* Cuántas veces se llamó a fetch para esa ciudad, contando las que nacieron canceladas. */
function pedidasA(fetchFalso: FetchFalso, ciudad: Ciudad): number {
  return fetchFalso.mock.calls.filter(([input]) => latitudDe(input) === String(ciudad.lat)).length;
}

/* Si cada petición que se hizo a esa ciudad tiene su signal abortado ahora mismo. */
function cancelacionesDe(fetchFalso: FetchFalso, ciudad: Ciudad): boolean[] {
  return fetchFalso.mock.calls
    .filter(([input]) => latitudDe(input) === String(ciudad.lat))
    .map(([, init]) => init?.signal?.aborted ?? false);
}

function esperar(ms: number) {
  return act(() => new Promise<void>((listo) => setTimeout(listo, ms)));
}

function pasar(ms: number) {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
}

const AVISO = "No fue posible obtener el clima";

function GradosQueSiguen({ lat, lon }: Ciudad) {
  const grados = useClimaQueSigue(lat, lon, CADA_MS);
  return <p>{grados === null ? "Cargando…" : `${grados} °C`}</p>;
}

function Tarjeta({ lat, lon }: Ciudad) {
  return (
    <StrictMode>
      <TarjetaClimaQueSeRefresca lat={lat} lon={lon} cadaMs={CADA_MS} />
    </StrictMode>
  );
}

/* Para los peldaños 4c y 5c: una vuelta más larga que lo que tarda Santiago, para que su
 * respuesta tardía se vea antes de que la vuelta siguiente de Valparaíso la tape. */
const CADA_MS_LENTO = 400;

function GradosQueLleganTarde({ lat, lon }: Ciudad) {
  const grados = useClimaQueLlegaTarde(lat, lon);
  return <p>{grados === null ? "Cargando…" : `${grados} °C`}</p>;
}

function GradosQueSeCruzan({ lat, lon }: Ciudad) {
  const grados = useClimaQueSeCruza(lat, lon, CADA_MS_LENTO);
  return <p>{grados === null ? "Cargando…" : `${grados} °C`}</p>;
}

/* Los peldaños 5a–5c pintan lo mismo que TarjetaClimaQueSeRefresca. */
function PintarClima({ grados, error }: ClimaAlDia) {
  if (error) return <p role="alert">{error}</p>;
  if (grados === null) return <p>Cargando…</p>;
  return <p>{grados} °C</p>;
}

function ClimaConAvisoQueNoSeVa({ lat, lon }: Ciudad) {
  const clima = useClimaConAvisoQueNoSeVa(lat, lon, CADA_MS);
  return <PintarClima {...clima} />;
}

function ClimaConFalsaAlarma({ lat, lon }: Ciudad) {
  const clima = useClimaConFalsaAlarma(lat, lon, CADA_MS);
  return <PintarClima {...clima} />;
}

function ClimaConMandoPorVuelta({ lat, lon }: Ciudad) {
  const clima = useClimaConMandoPorVuelta(lat, lon, CADA_MS_LENTO);
  return <PintarClima {...clima} />;
}

/* Monta el componente con Santiago y, sin esperar, pasa a Valparaíso: la petición de
 * Santiago se queda en camino. */
function deSantiagoAValparaiso(Componente: ComponentType<Ciudad>) {
  const { rerender } = render(
    <StrictMode>
      <Componente {...SANTIAGO} />
    </StrictMode>,
  );
  rerender(
    <StrictMode>
      <Componente {...VALPARAISO} />
    </StrictMode>,
  );
}

/* Primero se quita el espía del 3 y después el reloj falso: al revés, el espía dejaría
 * puesto el setInterval falso para el 4 y el 5. */
afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("13-fetch-tipado / exercise-09 — el polling", () => {
  it("1) useTicQueNoPara — al desmontar, el intervalo se para", () => {
    vi.useFakeTimers();
    const rastro: string[] = [];
    const apuntar = (linea: string) => {
      rastro.push(linea);
    };
    const { unmount } = renderHook(() => useTicQueNoPara(apuntar));

    pasar(3000);
    expect(rastro).toEqual(["tic", "tic", "tic"]);

    unmount();
    pasar(3000);
    expect(rastro, "Desmontado el componente, el intervalo tiene que estar parado: ni un «tic» más").toEqual([
      "tic",
      "tic",
      "tic",
    ]);
  });

  it("2) useTicQueNoArranca — el intervalo vive hasta desmontar", () => {
    vi.useFakeTimers();
    const rastro: string[] = [];
    const apuntar = (linea: string) => {
      rastro.push(linea);
    };
    const { unmount } = renderHook(() => useTicQueNoArranca(apuntar));

    pasar(3000);
    expect(rastro, "Montado durante 3 s, el intervalo tiene que haber apuntado tres «tic»").toEqual([
      "tic",
      "tic",
      "tic",
    ]);

    unmount();
    pasar(3000);
    expect(rastro).toHaveLength(3);
  });

  it("3) useSegundos — cuenta 1, 2, 3 con un solo intervalo", () => {
    vi.useFakeTimers();
    const espia = vi.spyOn(globalThis, "setInterval");
    const { result } = renderHook(() => useSegundos());
    expect(result.current).toBe(0);

    pasar(1000);
    pasar(1000);
    pasar(1000);
    expect(result.current, "A los 3 s, la cuenta tiene que ir en 3").toBe(3);
    expect(espia, "El intervalo nace una sola vez: setInterval no puede llamarse en cada segundo").toHaveBeenCalledTimes(
      1,
    );
  });

  it("4a) useRelojQueSeQueda — al cambiar de ciudad, el reloj viejo se para", () => {
    vi.useFakeTimers();
    const rastro: string[] = [];
    const apuntar = (linea: string) => {
      rastro.push(linea);
    };
    const { rerender, unmount } = renderHook(({ ciudad }) => useRelojQueSeQueda(ciudad, apuntar), {
      initialProps: { ciudad: "Santiago" },
    });

    pasar(2000);
    expect(rastro).toEqual(["pido Santiago", "pido Santiago"]);

    rerender({ ciudad: "Valparaíso" });
    pasar(2000);
    expect(rastro.slice(2), "Ya estás en Valparaíso: el reloj de Santiago no puede seguir apuntando").toEqual([
      "pido Valparaíso",
      "pido Valparaíso",
    ]);

    unmount();
    pasar(2000);
    expect(rastro, "Desmontado el componente, ningún reloj sigue apuntando").toHaveLength(4);
  });

  it("4b) useClimaQueLlegaTarde — la petición de la ciudad vieja no pisa a la nueva", async () => {
    const fetchFalso = responder();
    deSantiagoAValparaiso(GradosQueLleganTarde);
    expect(await screen.findByText("17 °C")).toBeInTheDocument();

    await esperar(SANTIAGO_TARDA_MS + 50);
    expect(
      screen.queryByText("24 °C"),
      "Ya estás en Valparaíso: la respuesta de Santiago, que venía en camino, no puede pisarlo",
    ).not.toBeInTheDocument();
    expect(
      cancelacionesDe(fetchFalso, SANTIAGO),
      "Al pasar a Valparaíso, cada petición de Santiago tiene que quedar cancelada",
    ).not.toContain(false);
  });

  it("4c) useClimaQueSeCruza — al cambiar de ciudad, la petición en camino tampoco pisa", async () => {
    const fetchFalso = responder();
    deSantiagoAValparaiso(GradosQueSeCruzan);
    expect(await screen.findByText("17 °C")).toBeInTheDocument();

    await esperar(SANTIAGO_TARDA_MS + 50);
    expect(
      screen.queryByText("24 °C"),
      "Ya estás en Valparaíso: la respuesta de Santiago, que venía en camino, no puede pisarlo",
    ).not.toBeInTheDocument();
    expect(
      cancelacionesDe(fetchFalso, SANTIAGO),
      "Al pasar a Valparaíso, cada petición de Santiago tiene que quedar cancelada",
    ).not.toContain(false);

    const santiago = pedidasA(fetchFalso, SANTIAGO);
    await esperar(CADA_MS_LENTO * 2);
    expect(
      pedidasA(fetchFalso, SANTIAGO),
      "El reloj de Santiago tiene que seguir parado: suma la otra línea a la limpieza, no la cambies",
    ).toBe(santiago);
  });

  it("4) useClimaQueSigue — al cambiar de ciudad, la vieja deja de pedirse", async () => {
    const fetchFalso = responder();
    const { rerender } = render(
      <StrictMode>
        <GradosQueSiguen {...SANTIAGO} />
      </StrictMode>,
    );
    rerender(
      <StrictMode>
        <GradosQueSiguen {...VALPARAISO} />
      </StrictMode>,
    );
    expect(await screen.findByText("17 °C")).toBeInTheDocument();
    expect(
      cancelacionesDe(fetchFalso, SANTIAGO),
      "Cuando llega Valparaíso, cada petición de Santiago tiene que estar cancelada",
    ).not.toContain(false);

    const santiago = pedidasA(fetchFalso, SANTIAGO);
    const valparaiso = pedidasA(fetchFalso, VALPARAISO);
    await esperar(CADA_MS * 3.5);
    expect(
      pedidasA(fetchFalso, SANTIAGO),
      "Ya estás en Valparaíso: nadie tiene que volver a pedir Santiago",
    ).toBe(santiago);
    expect(pedidasA(fetchFalso, VALPARAISO), "Valparaíso sí se sigue pidiendo en cada vuelta").toBeGreaterThan(
      valparaiso + 2,
    );
  });

  it("5a) useClimaConAvisoQueNoSeVa — una vuelta buena borra el aviso", async () => {
    responder({ valparaiso: [16.8, 500, 18.2] });
    render(
      <StrictMode>
        <ClimaConAvisoQueNoSeVa {...VALPARAISO} />
      </StrictMode>,
    );
    expect(await screen.findByText("17 °C")).toBeInTheDocument();
    expect(await screen.findByRole("alert")).toHaveTextContent(AVISO);

    await esperar(CADA_MS * 2);
    expect(screen.queryByRole("alert"), "La vuelta siguiente salió bien: el aviso tiene que irse").not.toBeInTheDocument();
    expect(screen.getByText("18 °C")).toBeInTheDocument();
  });

  it("5b) useClimaConFalsaAlarma — la cancelada no deja aviso", async () => {
    responder();
    deSantiagoAValparaiso(ClimaConFalsaAlarma);
    await esperar(5);
    expect(
      screen.queryByRole("alert"),
      "Nada falló: la limpieza canceló la petición de Santiago, y una cancelada no deja aviso",
    ).not.toBeInTheDocument();
    expect(await screen.findByText("17 °C")).toBeInTheDocument();
  });

  it("5c) useClimaConMandoPorVuelta — la limpieza alcanza la petición en camino", async () => {
    const fetchFalso = responder();
    deSantiagoAValparaiso(ClimaConMandoPorVuelta);
    expect(await screen.findByText("17 °C")).toBeInTheDocument();

    await esperar(SANTIAGO_TARDA_MS + 50);
    expect(
      screen.queryByText("24 °C"),
      "Ya estás en Valparaíso: la respuesta de Santiago, que venía en camino, no puede pisarlo",
    ).not.toBeInTheDocument();
    expect(
      cancelacionesDe(fetchFalso, SANTIAGO),
      "Al pasar a Valparaíso, cada petición de Santiago tiene que quedar cancelada",
    ).not.toContain(false);
  });

  it("5) useClimaQueSeRefresca — se pone al día, avisa y para", async () => {
    responder({ valparaiso: [16.8, 18.2] });
    const alDia = render(<Tarjeta {...VALPARAISO} />);
    expect(screen.getByText("Cargando…")).toBeInTheDocument();
    expect(await screen.findByText("17 °C")).toBeInTheDocument();
    expect(
      await screen.findByText("18 °C"),
      "Pasada una vuelta, la tarjeta tiene que haber pedido otra vez y pintar la nueva",
    ).toBeInTheDocument();
    alDia.unmount();

    responder({ valparaiso: [16.8, 500, 18.2] });
    const conFallo = render(<Tarjeta {...VALPARAISO} />);
    expect(await screen.findByText("17 °C")).toBeInTheDocument();
    expect(await screen.findByRole("alert")).toHaveTextContent(AVISO);
    expect(await screen.findByText("18 °C")).toBeInTheDocument();
    expect(screen.queryByRole("alert"), "La vuelta siguiente salió bien: el aviso tiene que irse").not.toBeInTheDocument();
    conFallo.unmount();

    const fetchFalso = responder();
    const { rerender, unmount } = render(<Tarjeta {...SANTIAGO} />);
    rerender(<Tarjeta {...VALPARAISO} />);
    await esperar(5);
    expect(screen.queryByRole("alert"), "Cambiar de ciudad no es un fallo: la cancelada no deja aviso").not.toBeInTheDocument();
    expect(await screen.findByText("17 °C")).toBeInTheDocument();
    expect(
      cancelacionesDe(fetchFalso, SANTIAGO),
      "Cuando llega Valparaíso, cada petición de Santiago tiene que estar cancelada",
    ).not.toContain(false);
    const santiago = pedidasA(fetchFalso, SANTIAGO);
    await esperar(CADA_MS * 2.5);
    expect(pedidasA(fetchFalso, SANTIAGO), "Ya estás en Valparaíso: nadie tiene que volver a pedir Santiago").toBe(
      santiago,
    );

    unmount();
    const total = fetchFalso.mock.calls.length;
    await esperar(CADA_MS * 2.5);
    expect(fetchFalso.mock.calls.length, "Desmontada la tarjeta, nadie tiene que seguir pidiendo").toBe(total);
  });
});
