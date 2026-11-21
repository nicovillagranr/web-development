import { StrictMode } from "react";
import { describe, it, expect, vi, afterEach, type Mock } from "vitest";
import { act, render, screen } from "@testing-library/react";
import {
  leerSnapshot,
  pedirConRespaldo,
  cargarConRespaldo,
  pedirConLimiteYRespaldo,
  enVivoConReloj,
  enVivoConSalida,
  respaldoConLaQueQueda,
  PerfilConRespaldo,
  cargarConGuardias,
  ListaConRespaldo,
  PortadaConRespaldo,
  type Project,
  type Profile,
  type Snapshot,
} from "./exercise-06";

const PROYECTOS: Project[] = [
  { id: 1, name: "Projex", status: "Terminado" },
  { id: 2, name: "Smart Cooler", status: "En curso" },
];

const PERFIL: Profile = { name: "Nicolás", role: "Frontend Developer" };

/* El snapshot es del último deploy: todavía no tenía Smart Cooler. */
const SNAPSHOT: Snapshot = {
  generatedAt: "2026-11-01T12:00:00.000Z",
  projects: [{ id: 1, name: "Projex", status: "Terminado" }],
  profile: PERFIL,
};

type FetchFalso = Mock<(input: RequestInfo | URL, init?: RequestInit) => Promise<Response>>;

/* La API y el snapshot no existen: cada test decide cómo responden. La lista tarda
 * retrasoMs (30 ms si no dice nada) y el perfil, dos tercios. Con caida, las dos
 * contestan un 500. El snapshot contesta a los snapshotMs (10 ms si no dice nada), o un
 * 404 con sinSnapshot. Este fetch de mentira hace caso al signal como el de verdad: si
 * ya viene abortado, ni sale; si lo abortan antes de responder, rechaza con su motivo. */
function responder({
  retrasoMs = 30,
  caida = false,
  sinSnapshot = false,
  snapshotMs = 10,
}: { retrasoMs?: number; caida?: boolean; sinSnapshot?: boolean; snapshotMs?: number } = {}) {
  const fetchFalso: FetchFalso = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
    const signal = init?.signal;
    const ruta = String(input);
    const esSnapshot = ruta === "/data-snapshot.json";
    const esPerfil = ruta === "/api/profile";

    let respuesta: Response;
    if (esSnapshot) {
      respuesta = sinSnapshot
        ? new Response(JSON.stringify({ message: "Not found" }), { status: 404 })
        : new Response(JSON.stringify(SNAPSHOT), { status: 200 });
    } else if (caida) {
      respuesta = new Response(JSON.stringify({ message: "Internal error" }), { status: 500 });
    } else {
      respuesta = new Response(JSON.stringify(esPerfil ? PERFIL : PROYECTOS), { status: 200 });
    }
    const retraso = esSnapshot ? snapshotMs : esPerfil ? Math.round((retrasoMs * 2) / 3) : retrasoMs;

    return new Promise<Response>((resolve, reject) => {
      if (signal?.aborted) {
        reject(signal.reason);
        return;
      }
      const reloj = setTimeout(() => resolve(respuesta), retraso);
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
describe("13-fetch-tipado / exercise-06 — el plan B", () => {
  it("1) leerSnapshot — la fecha, tu lista y tu perfil, validados", async () => {
    responder();
    await expect(leerSnapshot(new AbortController().signal)).resolves.toEqual(SNAPSHOT);
  });

  it("2) pedirConRespaldo — en vivo, o el snapshot con deRespaldo si falla", async () => {
    responder();
    await expect(pedirConRespaldo(new AbortController().signal)).resolves.toMatchObject({
      projects: PROYECTOS,
      profile: PERFIL,
      deRespaldo: false,
    });

    responder({ caida: true });
    await expect(pedirConRespaldo(new AbortController().signal)).resolves.toMatchObject({
      projects: SNAPSHOT.projects,
      profile: PERFIL,
      deRespaldo: true,
    });
  });

  it("3) cargarConRespaldo — apunta de dónde llegó, o el error si fallan los dos", async () => {
    const apuntes: string[] = [];
    const apuntar = (cambio: string) => {
      apuntes.push(cambio);
    };

    responder();
    await expect(cargarConRespaldo(new AbortController().signal, apuntar)).resolves.toBeUndefined();
    expect(apuntes).toEqual(["en vivo"]);

    apuntes.length = 0;
    responder({ caida: true });
    await expect(cargarConRespaldo(new AbortController().signal, apuntar)).resolves.toBeUndefined();
    expect(apuntes).toEqual(["snapshot"]);

    apuntes.length = 0;
    responder({ caida: true, sinSnapshot: true });
    await expect(cargarConRespaldo(new AbortController().signal, apuntar)).resolves.toBeUndefined();
    expect(apuntes).toEqual(["error: HTTP error — /data-snapshot.json:404"]);

    apuntes.length = 0;
    responder({ retrasoMs: 200 });
    const controller = new AbortController();
    const carga = cargarConRespaldo(controller.signal, apuntar);
    controller.abort();
    await expect(carga).resolves.toBeUndefined();
    expect(apuntes).toEqual([]);
  });

  it("4) pedirConLimiteYRespaldo — si en vivo no llega a tiempo, el snapshot", async () => {
    responder();
    await expect(
      pedirConLimiteYRespaldo(new AbortController().signal, 500),
    ).resolves.toMatchObject({ projects: PROYECTOS, deRespaldo: false });

    responder({ retrasoMs: 200 });
    await expect(
      pedirConLimiteYRespaldo(new AbortController().signal, 50),
    ).resolves.toMatchObject({ projects: SNAPSHOT.projects, deRespaldo: true });

    responder({ retrasoMs: 200 });
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 20);
    await expect(pedirConLimiteYRespaldo(controller.signal, 1000)).rejects.toHaveProperty(
      "name",
      "AbortError",
    );
  });

  it("4a) enVivoConReloj — corta si Vercel tarda, y también si el usuario se va", async () => {
    responder();
    await expect(
      enVivoConReloj(new AbortController().signal, AbortSignal.timeout(500)),
    ).resolves.toMatchObject({ projects: PROYECTOS, profile: PERFIL });

    responder({ retrasoMs: 200 });
    await expect(
      enVivoConReloj(new AbortController().signal, AbortSignal.timeout(50)),
    ).rejects.toHaveProperty("name", "TimeoutError");

    responder({ retrasoMs: 200 });
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 20);
    await expect(enVivoConReloj(controller.signal, AbortSignal.timeout(1000))).rejects.toHaveProperty(
      "name",
      "AbortError",
    );
  });

  it("4b) enVivoConSalida — corta si el usuario se va, y también si Vercel tarda", async () => {
    responder();
    await expect(
      enVivoConSalida(new AbortController().signal, AbortSignal.timeout(500)),
    ).resolves.toMatchObject({ projects: PROYECTOS, profile: PERFIL });

    responder({ retrasoMs: 200 });
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 20);
    await expect(enVivoConSalida(controller.signal, AbortSignal.timeout(1000))).rejects.toHaveProperty(
      "name",
      "AbortError",
    );

    responder({ retrasoMs: 200 });
    await expect(
      enVivoConSalida(new AbortController().signal, AbortSignal.timeout(50)),
    ).rejects.toHaveProperty("name", "TimeoutError");
  });

  it("4c) respaldoConLaQueQueda — el snapshot llega aunque el reloj ya saltó, y se corta si te vas", async () => {
    responder();
    const bien = new AbortController();
    await expect(
      respaldoConLaQueQueda(bien.signal, AbortSignal.any([bien.signal, AbortSignal.timeout(500)])),
    ).resolves.toMatchObject({ projects: PROYECTOS });

    responder({ retrasoMs: 200 });
    const lenta = new AbortController();
    await expect(
      respaldoConLaQueQueda(lenta.signal, AbortSignal.any([lenta.signal, AbortSignal.timeout(50)])),
    ).resolves.toMatchObject({ projects: SNAPSHOT.projects });

    responder({ retrasoMs: 200, snapshotMs: 100 });
    const seVa = new AbortController();
    setTimeout(() => seVa.abort(), 100);
    await expect(
      respaldoConLaQueQueda(seVa.signal, AbortSignal.any([seVa.signal, AbortSignal.timeout(50)])),
    ).rejects.toHaveProperty("name", "AbortError");
  });

  it("5a) usePerfilConRespaldo — tu perfil en vivo, el del snapshot, o el error", async () => {
    responder();
    const bien = render(
      <StrictMode>
        <PerfilConRespaldo />
      </StrictMode>,
    );
    expect(await screen.findByText("Nicolás · Frontend Developer")).toBeInTheDocument();
    bien.unmount();

    responder({ caida: true });
    const caida = render(
      <StrictMode>
        <PerfilConRespaldo />
      </StrictMode>,
    );
    expect(await screen.findByText("Nicolás · Frontend Developer")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    caida.unmount();

    responder({ caida: true, sinSnapshot: true });
    render(
      <StrictMode>
        <PerfilConRespaldo />
      </StrictMode>,
    );
    expect(await screen.findByRole("alert")).toHaveTextContent("data-snapshot.json:404");
  });

  it("5b) cargarConGuardias — nada si el usuario se va mientras se lee el snapshot", async () => {
    const apuntes: string[] = [];
    const apuntar = (cambio: string) => {
      apuntes.push(cambio);
    };

    responder({ caida: true, snapshotMs: 100 });
    const controller = new AbortController();
    const carga = cargarConGuardias(controller.signal, apuntar);
    setTimeout(() => controller.abort(), 60);
    await expect(carga).resolves.toBeUndefined();
    expect(apuntes).toEqual([]);

    apuntes.length = 0;
    responder({ caida: true, sinSnapshot: true });
    await expect(cargarConGuardias(new AbortController().signal, apuntar)).resolves.toBeUndefined();
    expect(apuntes).toEqual(["error: HTTP error — /data-snapshot.json:404"]);

    apuntes.length = 0;
    responder({ caida: true });
    await expect(cargarConGuardias(new AbortController().signal, apuntar)).resolves.toBeUndefined();
    expect(apuntes).toEqual(["snapshot"]);
  });

  it("5c) useListaConRespaldo — la lista del snapshot con su aviso, sin error", async () => {
    responder();
    const bien = render(
      <StrictMode>
        <ListaConRespaldo />
      </StrictMode>,
    );
    expect(await screen.findByText("Smart Cooler")).toBeInTheDocument();
    expect(screen.queryByText("Datos del último deploy")).not.toBeInTheDocument();
    bien.unmount();

    responder({ caida: true });
    render(
      <StrictMode>
        <ListaConRespaldo />
      </StrictMode>,
    );
    expect(await screen.findByText("Datos del último deploy")).toBeInTheDocument();
    expect(screen.getByText("Projex")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("5) usePortfolioConRespaldo — en vivo, el snapshot con aviso, o el error", async () => {
    responder();
    const bien = render(
      <StrictMode>
        <PortadaConRespaldo limiteMs={500} />
      </StrictMode>,
    );
    await act(async () => {});
    expect(await screen.findByText("Smart Cooler")).toBeInTheDocument();
    expect(screen.queryByText("Datos del último deploy")).not.toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    bien.unmount();

    responder({ retrasoMs: 200 });
    const lenta = render(
      <StrictMode>
        <PortadaConRespaldo limiteMs={50} />
      </StrictMode>,
    );
    expect(await screen.findByText("Datos del último deploy")).toBeInTheDocument();
    expect(screen.getByText("Nicolás · Frontend Developer")).toBeInTheDocument();
    lenta.unmount();

    responder({ caida: true });
    const caida = render(
      <StrictMode>
        <PortadaConRespaldo limiteMs={500} />
      </StrictMode>,
    );
    expect(await screen.findByText("Datos del último deploy")).toBeInTheDocument();
    caida.unmount();

    responder({ caida: true, sinSnapshot: true });
    render(
      <StrictMode>
        <PortadaConRespaldo limiteMs={500} />
      </StrictMode>,
    );
    expect(await screen.findByRole("alert")).toHaveTextContent("data-snapshot.json:404");
  });
});
