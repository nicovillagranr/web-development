import { StrictMode } from "react";
import { describe, it, expect, vi, afterEach, type Mock } from "vitest";
import { act, render, screen } from "@testing-library/react";
import {
  pedirCancelable,
  avisoDeCarga,
  ProyectosAlCerrar,
  CancelacionSilenciosa,
  mensajeDe,
  cargarB,
  cargarC,
  cargarD,
  cargarE,
  NombreDelProyecto,
  RastroDeId,
  ProyectosQueNoLlegan,
  FichaQueNoEscucha,
  FichaProyecto,
  type Project,
} from "./exercise-02";

const PROYECTOS: Project[] = [
  { id: 1, name: "Projex", status: "Terminado" },
  { id: 2, name: "Smart Cooler", status: "En curso" },
];

type FetchFalso = Mock<(input: RequestInfo | URL, init?: RequestInit) => Promise<Response>>;

/* La API no existe: cada test decide qué responde fetch. Este fetch de mentira hace
 * caso al signal como el de verdad: si lo abortan antes de responder, rechaza. */
function responderTras(retrasoMs: (ruta: string) => number, cuerpo: (ruta: string) => unknown, status = 200) {
  const fetchFalso: FetchFalso = vi.fn(
    (input: RequestInfo | URL, init?: RequestInit) =>
      new Promise<Response>((resolve, reject) => {
        const ruta = String(input);
        const signal = init?.signal;
        if (signal?.aborted) {
          reject(signal.reason);
          return;
        }
        const reloj = setTimeout(() => {
          resolve(new Response(JSON.stringify(cuerpo(ruta)), { status }));
        }, retrasoMs(ruta));
        signal?.addEventListener("abort", () => {
          clearTimeout(reloj);
          reject(signal.reason);
        });
      }),
  );
  vi.stubGlobal("fetch", fetchFalso);
  return fetchFalso;
}

function responder(cuerpo: unknown, status = 200) {
  return responderTras(() => 20, () => cuerpo, status);
}

/* /api/projects/1 tarda 100 ms y /api/projects/2, 10 ms: Projex llega después. */
function responderPorId() {
  return responderTras(
    (ruta) => (ruta.endsWith("/1") ? 100 : 10),
    (ruta) => PROYECTOS.find((p) => ruta.endsWith(`/${p.id}`)),
  );
}

function caerLaRed() {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => {
      throw new TypeError("Failed to fetch");
    }),
  );
}

/* Cuántas peticiones a esa ruta siguen sin cancelar. */
function peticionesVivas(fetchFalso: FetchFalso, ruta = "/api/projects") {
  return fetchFalso.mock.calls.filter(([input, init]) => String(input) === ruta && !init?.signal?.aborted)
    .length;
}

function esperar(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* Para los peldaños de B: llama a la función por un camino y devuelve lo que apuntó. */
type Camino = "bien" | "sin red" | "cancelada";

async function apuntesDe(
  cargar: (signal: AbortSignal, apuntar: (cambio: string) => void) => Promise<void>,
  camino: Camino,
) {
  const apuntes: string[] = [];
  if (camino === "sin red") caerLaRed();
  else responder(PROYECTOS);
  const controller = new AbortController();
  const carga = cargar(controller.signal, (cambio) => {
    apuntes.push(cambio);
  });
  if (camino === "cancelada") controller.abort();
  await carga;
  return apuntes;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("13-fetch-tipado / exercise-02 — cancelar la petición", () => {
  it("1) pedirCancelable — la lista, o falla si la cancelan antes de que llegue", async () => {
    responder(PROYECTOS);
    await expect(pedirCancelable(new AbortController().signal)).resolves.toEqual(PROYECTOS);

    const controller = new AbortController();
    const peticion = pedirCancelable(controller.signal);
    controller.abort();
    await expect(peticion).rejects.toMatchObject({ name: "AbortError" });
  });

  it("2) avisoDeCarga — los cargados, el mensaje del error o «Carga cancelada»", async () => {
    responder(PROYECTOS);
    expect(await avisoDeCarga(new AbortController().signal)).toBe("2 proyectos cargados");

    const controller = new AbortController();
    const aviso = avisoDeCarga(controller.signal);
    controller.abort();
    expect(await aviso).toBe("Carga cancelada");

    caerLaRed();
    expect(await avisoDeCarga(new AbortController().signal)).toBe("Failed to fetch");
  });

  it("3) ProyectosAlCerrar — la lista, y al cerrar antes de tiempo no queda ninguna petición viva", async () => {
    responder(PROYECTOS);
    const abierta = render(
      <StrictMode>
        <ProyectosAlCerrar />
      </StrictMode>,
    );
    expect(screen.getByText("Cargando…")).toBeInTheDocument();
    expect(await screen.findByText("Projex")).toBeInTheDocument();
    abierta.unmount();

    const fetchFalso = responder(PROYECTOS);
    const cerrada = render(
      <StrictMode>
        <ProyectosAlCerrar />
      </StrictMode>,
    );
    cerrada.unmount();
    expect(peticionesVivas(fetchFalso)).toBe(0);
  });

  it("4) CancelacionSilenciosa — la petición del ensayo no deja rastro; la red caída sí avisa", async () => {
    responder(PROYECTOS);
    const bien = render(
      <StrictMode>
        <CancelacionSilenciosa />
      </StrictMode>,
    );
    // Deja terminar la petición que canceló el ensayo de StrictMode.
    await act(async () => {});
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByText("Cargando…")).toBeInTheDocument();
    expect(await screen.findByText("Projex")).toBeInTheDocument();
    bien.unmount();

    caerLaRed();
    render(
      <StrictMode>
        <CancelacionSilenciosa />
      </StrictMode>,
    );
    expect(await screen.findByRole("alert")).toHaveTextContent("Failed to fetch");
  });

  it("5) useProyecto — al cambiar de proyecto, la petición vieja se cancela y no pisa a la nueva", async () => {
    responderPorId();
    const sola = render(
      <StrictMode>
        <FichaProyecto id={1} />
      </StrictMode>,
    );
    expect(screen.getByText("Cargando…")).toBeInTheDocument();
    expect(await screen.findByText("Projex · Terminado")).toBeInTheDocument();
    sola.unmount();

    const fetchFalso = responderPorId();
    const ficha = render(
      <StrictMode>
        <FichaProyecto id={1} />
      </StrictMode>,
    );
    ficha.rerender(
      <StrictMode>
        <FichaProyecto id={2} />
      </StrictMode>,
    );
    expect(await screen.findByText("Smart Cooler · En curso")).toBeInTheDocument();
    // Deja pasar el tiempo que tarda Projex, por si su petición sigue viva.
    await act(() => esperar(150));
    expect(screen.getByText("Smart Cooler · En curso")).toBeInTheDocument();
    expect(peticionesVivas(fetchFalso, "/api/projects/1")).toBe(0);
    ficha.unmount();

    caerLaRed();
    render(
      <StrictMode>
        <FichaProyecto id={1} />
      </StrictMode>,
    );
    expect(await screen.findByRole("alert")).toHaveTextContent("Failed to fetch");
  });
});

describe("13-fetch-tipado / exercise-02 — escalera del 4: el catch, pieza a pieza", () => {
  it("4a) mensajeDe — el mensaje de un Error, o «Error desconocido»", () => {
    expect(mensajeDe(new Error("Failed to fetch"))).toBe("Failed to fetch");
    expect(mensajeDe("se cayó el servidor")).toBe("Error desconocido");
  });

  it("4b) cargarB — la cancelada no apunta nada", async () => {
    expect(await apuntesDe(cargarB, "cancelada")).toEqual([]);
    expect(await apuntesDe(cargarB, "sin red")).toEqual(["setError(Failed to fetch)", "setLoading(false)"]);
    expect(await apuntesDe(cargarB, "bien")).toEqual(["setProjects(2 proyectos)", "setLoading(false)"]);
  });

  it("4c) cargarC — la guardia, antes de apuntar nada", async () => {
    expect(await apuntesDe(cargarC, "cancelada")).toEqual([]);
    expect(await apuntesDe(cargarC, "sin red")).toEqual(["setError(Failed to fetch)", "setLoading(false)"]);
    expect(await apuntesDe(cargarC, "bien")).toEqual(["setProjects(2 proyectos)", "setLoading(false)"]);
  });

  it("4d) cargarD — el finally tampoco apunta por la cancelada", async () => {
    expect(await apuntesDe(cargarD, "cancelada")).toEqual([]);
    expect(await apuntesDe(cargarD, "sin red")).toEqual(["setError(Failed to fetch)", "setLoading(false)"]);
    expect(await apuntesDe(cargarD, "bien")).toEqual(["setProjects(2 proyectos)", "setLoading(false)"]);
  });

  it("4e) cargarE — los tres caminos, cada uno con lo suyo", async () => {
    expect(await apuntesDe(cargarE, "bien")).toEqual(["setProjects(2 proyectos)", "setLoading(false)"]);
    expect(await apuntesDe(cargarE, "sin red")).toEqual(["setError(Failed to fetch)", "setLoading(false)"]);
    expect(await apuntesDe(cargarE, "cancelada")).toEqual([]);
  });

  it("4f) NombreDelProyecto — si cambia el id, pide el nuevo", async () => {
    responderPorId();
    const vista = render(
      <StrictMode>
        <NombreDelProyecto id={1} />
      </StrictMode>,
    );
    expect(await screen.findByText("Projex")).toBeInTheDocument();
    vista.rerender(
      <StrictMode>
        <NombreDelProyecto id={2} />
      </StrictMode>,
    );
    expect(await screen.findByText("Smart Cooler")).toBeInTheDocument();
  });

  it("4g) RastroDeId — la limpieza suelta el id de su pasada", () => {
    const apuntes: string[] = [];
    const apuntar = (cambio: string) => {
      apuntes.push(cambio);
    };
    const vista = render(
      <StrictMode>
        <RastroDeId id={1} apuntar={apuntar} />
      </StrictMode>,
    );
    vista.rerender(
      <StrictMode>
        <RastroDeId id={2} apuntar={apuntar} />
      </StrictMode>,
    );
    expect(apuntes.slice(-2)).toEqual(["suelta 1", "pide 2"]);
    vista.unmount();
    expect(apuntes.at(-1)).toBe("suelta 2");
  });

  it("4h) ProyectosQueNoLlegan — la lista llega, y al cerrar no queda ninguna petición viva", async () => {
    responder(PROYECTOS);
    const abierta = render(
      <StrictMode>
        <ProyectosQueNoLlegan />
      </StrictMode>,
    );
    expect(await screen.findByText("Projex")).toBeInTheDocument();
    abierta.unmount();

    const fetchFalso = responder(PROYECTOS);
    const cerrada = render(
      <StrictMode>
        <ProyectosQueNoLlegan />
      </StrictMode>,
    );
    cerrada.unmount();
    expect(peticionesVivas(fetchFalso)).toBe(0);
  });

  it("4i) FichaQueNoEscucha — la petición vieja se cancela de verdad", async () => {
    const fetchFalso = responderPorId();
    const ficha = render(
      <StrictMode>
        <FichaQueNoEscucha id={1} />
      </StrictMode>,
    );
    ficha.rerender(
      <StrictMode>
        <FichaQueNoEscucha id={2} />
      </StrictMode>,
    );
    expect(await screen.findByText("Smart Cooler · En curso")).toBeInTheDocument();
    // Deja pasar el tiempo que tarda Projex, por si su petición sigue viva.
    await act(() => esperar(150));
    expect(screen.getByText("Smart Cooler · En curso")).toBeInTheDocument();
    expect(peticionesVivas(fetchFalso, "/api/projects/1")).toBe(0);
  });
});
