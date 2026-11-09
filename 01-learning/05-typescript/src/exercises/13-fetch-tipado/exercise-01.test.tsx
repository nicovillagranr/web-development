import { StrictMode } from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  etiquetaDe,
  contarProyectos,
  avisoDeProyectos,
  RegistrarVisita,
  pedirProyectos,
  nombresDeProyectos,
  pedirOFallar,
  mensajeDeCarga,
  cargarConAvisos,
  ListaConEspera,
  ListaDeProyectos,
  ProyectosSinRed,
  MotivoDelError,
  ProyectosQueNoEstan,
  SeccionProyectos,
  type Project,
} from "./exercise-01";

const PROYECTOS: Project[] = [
  { id: 1, name: "Projex", status: "Terminado" },
  { id: 2, name: "Smart Cooler", status: "En curso" },
];

/* La API no existe: cada test decide qué responde fetch. */
function responder(cuerpo: unknown, status = 200) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response(JSON.stringify(cuerpo), { status })),
  );
}

function caerLaRed(motivo: unknown = new TypeError("Failed to fetch")) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => {
      throw motivo;
    }),
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("13-fetch-tipado / exercise-01 — escalera del 1: tu efecto, pieza a pieza", () => {
  it("1a) etiquetaDe — «Projex · Terminado»", () => {
    expect(etiquetaDe({ id: 1, name: "Projex", status: "Terminado" })).toBe(
      "Projex · Terminado",
    );
  });

  it("1b) contarProyectos — devuelve una promesa con el número", async () => {
    const promesa = contarProyectos(PROYECTOS);
    expect(promesa).toBeInstanceOf(Promise);
    expect(await promesa).toBe(2);
  });

  it("1c) avisoDeProyectos — «Tienes 2 proyectos»", async () => {
    expect(await avisoDeProyectos(PROYECTOS)).toBe("Tienes 2 proyectos");
  });

  it("1d) RegistrarVisita — avisa a la API al montar y no revienta en StrictMode", () => {
    responder({});
    render(
      <StrictMode>
        <RegistrarVisita />
      </StrictMode>,
    );

    expect(screen.getByText("Gracias por pasarte")).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith("/api/visits", { method: "POST" });
  });

  it("1e) pedirProyectos — devuelve la lista, no la respuesta", async () => {
    responder(PROYECTOS);
    expect(await pedirProyectos()).toEqual(PROYECTOS);
  });

  it("1f) nombresDeProyectos — solo los nombres", async () => {
    responder(PROYECTOS);
    expect(await nombresDeProyectos()).toEqual(["Projex", "Smart Cooler"]);
  });

  it("1g) pedirOFallar — un 404 o un 500 fallan con «HTTP error — …»; un 200 devuelve la lista", async () => {
    responder({ message: "Not found" }, 404);
    await expect(pedirOFallar()).rejects.toThrow("HTTP error — 404");

    responder({ message: "Internal error" }, 500);
    await expect(pedirOFallar()).rejects.toThrow("HTTP error — 500");

    responder(PROYECTOS);
    expect(await pedirOFallar()).toEqual(PROYECTOS);
  });

  it("1h) mensajeDeCarga — «2 proyectos cargados», o «Sin conexión» con la red caída", async () => {
    responder(PROYECTOS);
    expect(await mensajeDeCarga()).toBe("2 proyectos cargados");

    caerLaRed();
    expect(await mensajeDeCarga()).toBe("Sin conexión");
  });

  it("1i) cargarConAvisos — «listo» llega siempre, también con la red caída", async () => {
    responder(PROYECTOS);
    const bien: string[] = [];
    await cargarConAvisos((paso) => bien.push(paso));
    expect(bien).toEqual(["cargando", "2 proyectos", "listo"]);

    caerLaRed();
    const caida: string[] = [];
    await cargarConAvisos((paso) => caida.push(paso));
    expect(caida).toEqual(["cargando", "error", "listo"]);
  });

  it("1j) ListaConEspera — «Cargando…» hasta que llegan los datos", async () => {
    responder(PROYECTOS);
    render(
      <StrictMode>
        <ListaConEspera />
      </StrictMode>,
    );

    expect(screen.getByText("Cargando…")).toBeInTheDocument();
    expect(await screen.findByText("Projex")).toBeInTheDocument();
  });
});

describe("13-fetch-tipado / exercise-01 — pedir datos en un efecto", () => {
  it("1) ListaDeProyectos — «Cargando…» y después un <li> por proyecto", async () => {
    responder(PROYECTOS);
    render(
      <StrictMode>
        <ListaDeProyectos />
      </StrictMode>,
    );

    expect(screen.getByText("Cargando…")).toBeInTheDocument();
    expect(await screen.findByText("Projex")).toBeInTheDocument();
    expect(screen.getByText("Smart Cooler")).toBeInTheDocument();
  });

  it("2) ProyectosSinRed — con la red caída, el aviso; con la red bien, la lista", async () => {
    caerLaRed();
    const caida = render(
      <StrictMode>
        <ProyectosSinRed />
      </StrictMode>,
    );
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "No se pudieron cargar los proyectos",
    );
    expect(screen.queryByText("Cargando…")).not.toBeInTheDocument();
    caida.unmount();

    responder(PROYECTOS);
    render(
      <StrictMode>
        <ProyectosSinRed />
      </StrictMode>,
    );
    expect(await screen.findByText("Projex")).toBeInTheDocument();
  });

  it("3) MotivoDelError — el mensaje del error, o «Error desconocido»", async () => {
    caerLaRed();
    const caida = render(
      <StrictMode>
        <MotivoDelError />
      </StrictMode>,
    );
    expect(await screen.findByRole("alert")).toHaveTextContent("Failed to fetch");
    caida.unmount();

    // Lo que llega al catch puede no ser un Error.
    caerLaRed("se cayó el servidor");
    render(
      <StrictMode>
        <MotivoDelError />
      </StrictMode>,
    );
    expect(await screen.findByRole("alert")).toHaveTextContent("Error desconocido");
  });

  it("4) ProyectosQueNoEstan — un 404 sale como «HTTP error — 404»", async () => {
    responder({ message: "Not found" }, 404);
    const perdida = render(
      <StrictMode>
        <ProyectosQueNoEstan />
      </StrictMode>,
    );
    expect(await screen.findByRole("alert")).toHaveTextContent("HTTP error — 404");
    perdida.unmount();

    responder(PROYECTOS);
    render(
      <StrictMode>
        <ProyectosQueNoEstan />
      </StrictMode>,
    );
    expect(await screen.findByText("Projex")).toBeInTheDocument();
  });

  it("5) useProjects — cargando, la lista, la red caída y un 500", async () => {
    responder(PROYECTOS);
    const bien = render(
      <StrictMode>
        <SeccionProyectos />
      </StrictMode>,
    );
    expect(screen.getByText("Cargando…")).toBeInTheDocument();
    expect(await screen.findByText("Projex · Terminado")).toBeInTheDocument();
    expect(screen.getByText("Smart Cooler · En curso")).toBeInTheDocument();
    bien.unmount();

    caerLaRed();
    const caida = render(
      <StrictMode>
        <SeccionProyectos />
      </StrictMode>,
    );
    expect(await screen.findByRole("alert")).toHaveTextContent("Failed to fetch");
    caida.unmount();

    responder({ message: "Internal error" }, 500);
    render(
      <StrictMode>
        <SeccionProyectos />
      </StrictMode>,
    );
    expect(await screen.findByRole("alert")).toHaveTextContent("HTTP error — 500");
  });
});
