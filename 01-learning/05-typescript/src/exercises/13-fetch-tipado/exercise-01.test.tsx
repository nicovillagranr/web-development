import { StrictMode } from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import {
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
