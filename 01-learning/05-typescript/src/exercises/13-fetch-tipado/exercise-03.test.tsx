import { StrictMode } from "react";
import { describe, it, expect, vi, afterEach, type Mock } from "vitest";
import { act, render, screen } from "@testing-library/react";
import {
  saludoDelPortfolio,
  pedirALaVez,
  pedirPortfolio,
  CabeceraAlCerrar,
  Portada,
  type Project,
  type Profile,
} from "./exercise-03";

const PROYECTOS: Project[] = [
  { id: 1, name: "Projex", status: "Terminado" },
  { id: 2, name: "Smart Cooler", status: "En curso" },
];

const PERFIL: Profile = { name: "Nicolás", role: "Frontend Developer" };

type FetchFalso = Mock<(input: RequestInfo | URL, init?: RequestInit) => Promise<Response>>;

/* La API no existe: cada test decide con qué status responde cada ruta (200 si no
 * dice nada). La lista tarda 30 ms y el perfil 20 ms. Este fetch de mentira hace
 * caso al signal como el de verdad: si lo abortan antes de responder, rechaza. */
function responder(status: { lista?: number; perfil?: number } = {}) {
  const fetchFalso: FetchFalso = vi.fn(
    (input: RequestInfo | URL, init?: RequestInit) =>
      new Promise<Response>((resolve, reject) => {
        const esPerfil = String(input) === "/api/profile";
        const codigo = (esPerfil ? status.perfil : status.lista) ?? 200;
        const cuerpo = codigo !== 200 ? { message: "Not found" } : esPerfil ? PERFIL : PROYECTOS;
        const signal = init?.signal;
        if (signal?.aborted) {
          reject(signal.reason);
          return;
        }
        const reloj = setTimeout(
          () => {
            resolve(new Response(JSON.stringify(cuerpo), { status: codigo }));
          },
          esPerfil ? 20 : 30,
        );
        signal?.addEventListener("abort", () => {
          clearTimeout(reloj);
          reject(signal.reason);
        });
      }),
  );
  vi.stubGlobal("fetch", fetchFalso);
  return fetchFalso;
}

/* Las rutas que se han pedido hasta ahora, ordenadas. */
function rutasPedidas(fetchFalso: FetchFalso) {
  return fetchFalso.mock.calls.map(([input]) => String(input)).sort();
}

/* Cuántas peticiones a esa ruta siguen sin cancelar. */
function peticionesVivas(fetchFalso: FetchFalso, ruta: string) {
  return fetchFalso.mock.calls.filter(([input, init]) => String(input) === ruta && !init?.signal?.aborted)
    .length;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("13-fetch-tipado / exercise-03 — pedir dos cosas a la vez", () => {
  it("1) saludoDelPortfolio — «Nicolás · 2 proyectos»", async () => {
    responder();
    expect(await saludoDelPortfolio()).toBe("Nicolás · 2 proyectos");
  });

  it("2) pedirALaVez — las dos peticiones salen antes de que llegue ninguna", async () => {
    const fetchFalso = responder();
    const carga = pedirALaVez();
    // Sin esperar a nada: lo que ya ha salido al llamar a la función.
    const alLlamar = rutasPedidas(fetchFalso);
    const datos = await carga;
    expect(alLlamar).toEqual(["/api/profile", "/api/projects"]);
    expect(datos).toEqual({ projects: PROYECTOS, profile: PERFIL });
  });

  it("3) pedirPortfolio — los dos, o falla con el nombre de la que vino mal", async () => {
    responder();
    await expect(pedirPortfolio()).resolves.toEqual({ projects: PROYECTOS, profile: PERFIL });

    responder({ perfil: 404 });
    await expect(pedirPortfolio()).rejects.toThrow("HTTP error — profile:404");

    responder({ lista: 500 });
    await expect(pedirPortfolio()).rejects.toThrow("HTTP error — projects:500");
  });

  it("4) CabeceraAlCerrar — el perfil y la lista, y al cerrar no queda ninguna petición viva", async () => {
    responder();
    const abierta = render(
      <StrictMode>
        <CabeceraAlCerrar />
      </StrictMode>,
    );
    expect(screen.getByText("Cargando…")).toBeInTheDocument();
    expect(await screen.findByText("Nicolás · Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("Projex")).toBeInTheDocument();
    abierta.unmount();

    const fetchFalso = responder();
    const cerrada = render(
      <StrictMode>
        <CabeceraAlCerrar />
      </StrictMode>,
    );
    cerrada.unmount();
    expect(peticionesVivas(fetchFalso, "/api/projects")).toBe(0);
    expect(peticionesVivas(fetchFalso, "/api/profile")).toBe(0);
  });

  it("5) usePortfolio — las dos a la vez, el aviso si una falla, y nada vivo al cerrar", async () => {
    responder();
    const bien = render(
      <StrictMode>
        <Portada />
      </StrictMode>,
    );
    // Deja terminar la petición que canceló el ensayo de StrictMode.
    await act(async () => {});
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByText("Cargando…")).toBeInTheDocument();
    expect(await screen.findByText("Nicolás · Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("Smart Cooler")).toBeInTheDocument();
    bien.unmount();

    responder({ perfil: 404 });
    const conError = render(
      <StrictMode>
        <Portada />
      </StrictMode>,
    );
    expect(await screen.findByRole("alert")).toHaveTextContent("HTTP error — profile:404");
    conError.unmount();

    const fetchFalso = responder();
    const cerrada = render(
      <StrictMode>
        <Portada />
      </StrictMode>,
    );
    // Sin esperar a nada: el perfil tiene que haber salido ya, junto a la lista.
    expect(rutasPedidas(fetchFalso)).toContain("/api/profile");
    cerrada.unmount();
    expect(peticionesVivas(fetchFalso, "/api/projects")).toBe(0);
    expect(peticionesVivas(fetchFalso, "/api/profile")).toBe(0);
  });
});
