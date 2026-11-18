import { StrictMode } from "react";
import { describe, it, expect, vi, afterEach, type Mock } from "vitest";
import { act, render, screen } from "@testing-library/react";
import {
  pedirConLimite,
  cuantoTarda,
  pedirYAnular,
  pedirConAlarma,
  pedirConReloj,
  pedirConReintento,
  pedirCancelableConLimite,
  ListaConLimite,
  PortadaConLimite,
  type Project,
  type Profile,
} from "./exercise-05";

const PROYECTOS: Project[] = [
  { id: 1, name: "Projex", status: "Terminado" },
  { id: 2, name: "Smart Cooler", status: "En curso" },
];

const PERFIL: Profile = { name: "Nicolás", role: "Frontend Developer" };

type FetchFalso = Mock<(input: RequestInfo | URL, init?: RequestInit) => Promise<Response>>;

/* La API no existe: cada test decide qué trae y cuánto tarda. La lista tarda retrasoMs
 * (30 ms si no dice nada) y el perfil, dos tercios. Con fallaLaPrimera, la primera
 * petición de la lista contesta un 500 a los 100 ms, y las siguientes, bien. Este fetch
 * de mentira hace caso al signal como el de verdad: si lo abortan antes de responder,
 * rechaza con su motivo. Y como el de verdad, solo acepta un AbortSignal. */
function responder({
  lista,
  perfil,
  retrasoMs = 30,
  fallaLaPrimera = false,
}: { lista?: unknown; perfil?: unknown; retrasoMs?: number; fallaLaPrimera?: boolean } = {}) {
  let quedaPorFallar = fallaLaPrimera;
  const fetchFalso: FetchFalso = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
    const signal = init?.signal;
    if (signal != null && !(signal instanceof AbortSignal)) {
      return Promise.reject(
        new TypeError(
          "Failed to execute 'fetch' on 'Window': Failed to read the 'signal' property from 'RequestInit': Failed to convert value to 'AbortSignal'.",
        ),
      );
    }
    const esPerfil = String(input) === "/api/profile";
    const falla = !esPerfil && quedaPorFallar;
    if (falla) quedaPorFallar = false;
    const cuerpo = esPerfil ? (perfil ?? PERFIL) : (lista ?? PROYECTOS);
    const retraso = falla ? 100 : esPerfil ? Math.round((retrasoMs * 2) / 3) : retrasoMs;

    return new Promise<Response>((resolve, reject) => {
      if (signal?.aborted) {
        reject(signal.reason);
        return;
      }
      const reloj = setTimeout(() => {
        resolve(
          falla
            ? new Response(JSON.stringify({ message: "Internal error" }), { status: 500 })
            : new Response(JSON.stringify(cuerpo), { status: 200 }),
        );
      }, retraso);
      signal?.addEventListener("abort", () => {
        clearTimeout(reloj);
        reject(signal.reason);
      });
    });
  });
  vi.stubGlobal("fetch", fetchFalso);
  return fetchFalso;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("13-fetch-tipado / exercise-05 — el timeout", () => {
  it("1) pedirConLimite — la lista, o TimeoutError si la API no contesta a tiempo", async () => {
    responder();
    await expect(pedirConLimite(500)).resolves.toEqual(PROYECTOS);

    responder({ retrasoMs: 200 });
    await expect(pedirConLimite(50)).rejects.toHaveProperty("name", "TimeoutError");
  });

  it("1a) cuantoTarda — lo que tardó la API, en milisegundos", async () => {
    responder({ retrasoMs: 200 });
    const ms = await cuantoTarda();
    expect(ms).toBeGreaterThanOrEqual(150);
  });

  it("1b) pedirYAnular — la anula sin esperar a que llegue: AbortError", async () => {
    responder({ retrasoMs: 200 });
    await expect(pedirYAnular()).rejects.toHaveProperty("name", "AbortError");
  });

  it("1c) pedirConAlarma — la lista, o AbortError si no llega a tiempo", async () => {
    responder();
    await expect(pedirConAlarma(500)).resolves.toEqual(PROYECTOS);

    responder({ retrasoMs: 200 });
    await expect(pedirConAlarma(50)).rejects.toHaveProperty("name", "AbortError");
  });

  it("1d) pedirConReloj — la lista, o TimeoutError si no llega a tiempo", async () => {
    responder();
    await expect(pedirConReloj(500)).resolves.toEqual(PROYECTOS);

    responder({ retrasoMs: 200 });
    await expect(pedirConReloj(50)).rejects.toHaveProperty("name", "TimeoutError");
  });

  it("2) pedirConReintento — el segundo intento tiene su propio límite", async () => {
    responder();
    await expect(pedirConReintento(500)).resolves.toEqual(PROYECTOS);

    // El primer intento da 500 a los 100 ms; el segundo tarda 80 ms. Límite: 150 ms.
    responder({ retrasoMs: 80, fallaLaPrimera: true });
    await expect(pedirConReintento(150)).resolves.toEqual(PROYECTOS);
  });

  it("3) pedirCancelableConLimite — corta por el límite o por quien llama, lo que llegue antes", async () => {
    responder();
    await expect(pedirCancelableConLimite(new AbortController().signal, 500)).resolves.toEqual(
      PROYECTOS,
    );

    responder({ retrasoMs: 200 });
    await expect(pedirCancelableConLimite(new AbortController().signal, 50)).rejects.toHaveProperty(
      "name",
      "TimeoutError",
    );

    responder({ retrasoMs: 200 });
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 20);
    await expect(pedirCancelableConLimite(controller.signal, 1000)).rejects.toHaveProperty(
      "name",
      "AbortError",
    );
  });

  it("4) ListaConLimite — la lista, o el aviso si la API no contesta a tiempo", async () => {
    responder();
    const bien = render(
      <StrictMode>
        <ListaConLimite limiteMs={500} />
      </StrictMode>,
    );
    // Deja terminar la petición que canceló el ensayo de StrictMode.
    await act(async () => {});
    expect(await screen.findByText("Smart Cooler")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    bien.unmount();

    responder({ retrasoMs: 200 });
    render(
      <StrictMode>
        <ListaConLimite limiteMs={50} />
      </StrictMode>,
    );
    expect(await screen.findByRole("alert")).toHaveTextContent("La API tardó demasiado");
  });

  it("5) usePortfolioConLimite — la portada, el aviso del límite o el aviso de Zod", async () => {
    responder();
    const bien = render(
      <StrictMode>
        <PortadaConLimite limiteMs={500} />
      </StrictMode>,
    );
    await act(async () => {});
    expect(await screen.findByText("Nicolás · Frontend Developer")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    bien.unmount();

    responder({ retrasoMs: 200 });
    const lenta = render(
      <StrictMode>
        <PortadaConLimite limiteMs={50} />
      </StrictMode>,
    );
    expect(await screen.findByRole("alert")).toHaveTextContent("La API tardó demasiado");
    lenta.unmount();

    responder({ perfil: { name: "Nicolás" } });
    render(
      <StrictMode>
        <PortadaConLimite limiteMs={500} />
      </StrictMode>,
    );
    expect(await screen.findByRole("alert")).toHaveTextContent("role");
  });
});
