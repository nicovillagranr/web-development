import { Component, useEffect, useState, type ComponentType, type ReactNode } from "react";
import {
  ListaDeProyectos,
  ProyectosSinRed,
  MotivoDelError,
  ProyectosQueNoEstan,
  SeccionProyectos,
} from "../exercises/13-fetch-tipado/exercise-01";
import { Seccion, Tarjeta } from "./piezas";

/* BLOQUE 13 — `13-fetch-tipado`. Cada archivo nuevo de la carpeta se AÑADE aquí, en el
 * orden de su número.
 *
 * La API de los drills no existe. Mientras esta pestaña está abierta, el banco cambia
 * `window.fetch` por uno de mentira que responde a las rutas `/api/…` (las demás van al
 * fetch de verdad). Es un préstamo, como los del 12: se cambia al montar la pestaña y se
 * devuelve al desmontarla. Cada tarjeta elige cómo va a responder la API y monta su
 * componente; la respuesta tarda un poco, para que se vea el «Cargando…». */

type Respuesta = "bien" | "sin red" | "lanza un texto" | "404" | "500";

const PROYECTOS = [
  { id: 1, name: "Projex", status: "Terminado" },
  { id: 2, name: "Smart Cooler", status: "En curso" },
  { id: 3, name: "Store Pulse", status: "En curso" },
];

const RETRASO_MS = 900;

/* La respuesta que dará la próxima petición. La elige el botón de cada tarjeta justo antes
 * de montar su componente, y el fetch de mentira la lee al pedir. Se cambia desde una
 * función de fuera del componente: el lint de React no deja modificar desde dentro un
 * valor que no es suyo. */
let respuestaElegida: Respuesta = "bien";

function elegirRespuesta(respuesta: Respuesta) {
  respuestaElegida = respuesta;
}

function comoJson(cuerpo: unknown, status: number): Response {
  return new Response(JSON.stringify(cuerpo), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function responderDeMentira(respuesta: Respuesta): Promise<Response> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (respuesta === "sin red") reject(new TypeError("Failed to fetch"));
      else if (respuesta === "lanza un texto") reject("se cayó el servidor");
      else if (respuesta === "404") resolve(comoJson({ message: "Not found" }, 404));
      else if (respuesta === "500") resolve(comoJson({ message: "Internal error" }, 500));
      else resolve(comoJson(PROYECTOS, 200));
    }, RETRASO_MS);
  });
}

function rutaDe(input: RequestInfo | URL): string {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.pathname;
  return new URL(input.url).pathname;
}

function useFetchDeMentira() {
  useEffect(() => {
    const original = window.fetch;
    window.fetch = (input, init) =>
      rutaDe(input).startsWith("/api/")
        ? responderDeMentira(respuestaElegida)
        : original.call(window, input, init);

    return () => {
      window.fetch = original;
    };
  }, []);
}

/* Varios starters revientan al pintar (o, en pnpm dev, al probar su limpieza). Atrapa
 * recoge el error y lo enseña dentro de la tarjeta, en vez de dejar la página en blanco. */
class Atrapa extends Component<{ children: ReactNode }, { error: Error | null }> {
  override state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: unknown) {
    return { error: error instanceof Error ? error : new Error(String(error)) };
  }

  override render() {
    if (this.state.error) {
      return <p role="alert">El componente reventó: {this.state.error.message}</p>;
    }
    return this.props.children;
  }
}

/* Un botón por respuesta posible. Cada clic vuelve a montar el componente desde cero
 * (la key cambia), con la API respondiendo como diga el botón. */
function ConApi({ Drill, respuestas }: { Drill: ComponentType; respuestas: Respuesta[] }) {
  const [vez, setVez] = useState(0);

  function montar(respuesta: Respuesta) {
    elegirRespuesta(respuesta);
    setVez(vez + 1);
  }

  return (
    <div>
      <div>
        {respuestas.map((respuesta) => (
          <button key={respuesta} type="button" onClick={() => montar(respuesta)}>
            API: {respuesta}
          </button>
        ))}
      </div>
      {vez > 0 && (
        <Atrapa key={vez}>
          <Drill />
        </Atrapa>
      )}
    </div>
  );
}

export function Bloque13() {
  useFetchDeMentira();

  return (
    <>
      <Seccion archivo="exercise-01" titulo="Pedir datos en un efecto: cargando, listo o error." />

      <Tarjeta
        n={1}
        nombre="ListaDeProyectos"
        mirar="Pulsa API: bien. Sale «Cargando…» un momento y después la lista. Con el starter, en pnpm dev revienta al montarse: React intenta llamar a la promesa como si fuera la limpieza."
        campos="botón API: bien · el componente: «Cargando…» y la lista"
      >
        <ConApi Drill={ListaDeProyectos} respuestas={["bien"]} />
      </Tarjeta>

      <Tarjeta
        n={2}
        nombre="ProyectosSinRed"
        mirar="Pulsa API: sin red. Tras «Cargando…» tiene que salir el aviso. Con el starter se queda en «Cargando…» para siempre. Con API: bien, la lista."
        campos="botones API: bien y API: sin red · el componente: «Cargando…», el aviso o la lista"
      >
        <ConApi Drill={ProyectosSinRed} respuestas={["bien", "sin red"]} />
      </Tarjeta>

      <Tarjeta
        n={3}
        nombre="MotivoDelError"
        mirar="Pulsa API: sin red: tiene que salir «Failed to fetch». Con API: lanza un texto, «Error desconocido». Con el starter revienta: un Error no se puede pintar."
        campos="botones API: sin red y API: lanza un texto · el componente: «Cargando…» y el aviso"
      >
        <ConApi Drill={MotivoDelError} respuestas={["sin red", "lanza un texto"]} />
      </Tarjeta>

      <Tarjeta
        n={4}
        nombre="ProyectosQueNoEstan"
        mirar="Pulsa API: 404: tiene que salir «HTTP error — 404». Con el starter revienta: el cuerpo del 404 se guarda como si fuera la lista, y projects.map no existe. Con API: bien, la lista."
        campos="botones API: bien y API: 404 · el componente: «Cargando…», el aviso o la lista"
      >
        <ConApi Drill={ProyectosQueNoEstan} respuestas={["bien", "404"]} />
      </Tarjeta>

      <Tarjeta
        n={5}
        nombre="useProjects"
        mirar="Prueba los tres botones: la lista con su estado, «Failed to fetch» y «HTTP error — 500». Con el starter, los tres se quedan en «Cargando…»."
        campos="botones API: bien, API: sin red y API: 500 · la sección: «Cargando…», el aviso o la lista"
      >
        <ConApi Drill={SeccionProyectos} respuestas={["bien", "sin red", "500"]} />
      </Tarjeta>
    </>
  );
}
