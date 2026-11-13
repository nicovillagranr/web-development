import { StrictMode } from "react";
import { describe, it, expect, vi, afterEach, type Mock } from "vitest";
import { act, render, screen } from "@testing-library/react";
import {
  ContactoSchema,
  leerPerfil,
  ciudadDe,
  pedirProyectosValidados,
  PortadaValidada,
  type Project,
  type Profile,
} from "./exercise-04";

const PROYECTOS: Project[] = [
  { id: 1, name: "Projex", status: "Terminado" },
  { id: 2, name: "Smart Cooler", status: "En curso" },
];

const PERFIL: Profile = { name: "Nicolás", role: "Frontend Developer" };

const CONTACTO = { email: "nico@ejemplo.com", github: "nicovillagranr", years: 2 };

type FetchFalso = Mock<(input: RequestInfo | URL, init?: RequestInit) => Promise<Response>>;

/* La API no existe: cada test decide qué cuerpo trae cada ruta (si no dice nada, el
 * bueno). La lista tarda 30 ms y el perfil 20 ms. Este fetch de mentira hace caso al
 * signal como el de verdad: si lo abortan antes de responder, rechaza. */
function responder(cuerpos: { lista?: unknown; perfil?: unknown } = {}) {
  const fetchFalso: FetchFalso = vi.fn(
    (input: RequestInfo | URL, init?: RequestInit) =>
      new Promise<Response>((resolve, reject) => {
        const esPerfil = String(input) === "/api/profile";
        const cuerpo = esPerfil ? (cuerpos.perfil ?? PERFIL) : (cuerpos.lista ?? PROYECTOS);
        const signal = init?.signal;
        if (signal?.aborted) {
          reject(signal.reason);
          return;
        }
        const reloj = setTimeout(
          () => {
            resolve(new Response(JSON.stringify(cuerpo), { status: 200 }));
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

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("13-fetch-tipado / exercise-04 — validar con Zod", () => {
  it("1) ContactoSchema — acepta el contacto que llega de /profile", () => {
    expect(ContactoSchema.parse(CONTACTO)).toEqual(CONTACTO);
    expect(() => ContactoSchema.parse({ ...CONTACTO, years: "2" })).toThrow("years");
  });

  it("2) leerPerfil — el perfil comprobado, o lanza si le falta un campo", () => {
    expect(leerPerfil(PERFIL)).toEqual(PERFIL);
    expect(() => leerPerfil({ name: "Nicolás" })).toThrow("role");
  });

  it("3) ciudadDe — «Santiago, CL», de la clave based", () => {
    expect(ciudadDe({ ...PERFIL, based: "Santiago, CL" })).toBe("Santiago, CL");
  });

  it("4) pedirProyectosValidados — la lista, o falla si un proyecto viene sin status", async () => {
    responder();
    await expect(pedirProyectosValidados()).resolves.toEqual(PROYECTOS);

    responder({ lista: [{ id: 1, name: "Projex" }] });
    await expect(pedirProyectosValidados()).rejects.toThrow("status");
  });

  it("5) usePortfolioValidado — la portada, o el aviso de Zod si el perfil no encaja", async () => {
    responder();
    const bien = render(
      <StrictMode>
        <PortadaValidada />
      </StrictMode>,
    );
    // Deja terminar la petición que canceló el ensayo de StrictMode.
    await act(async () => {});
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(await screen.findByText("Nicolás · Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("Smart Cooler")).toBeInTheDocument();
    bien.unmount();

    responder({ perfil: { name: "Nicolás" } });
    render(
      <StrictMode>
        <PortadaValidada />
      </StrictMode>,
    );
    expect(await screen.findByRole("alert")).toHaveTextContent("role");
  });
});
