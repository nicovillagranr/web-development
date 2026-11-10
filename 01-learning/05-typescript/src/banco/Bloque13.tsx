import {
  Component,
  useEffect,
  useState,
  useSyncExternalStore,
  type ComponentType,
  type ReactNode,
} from "react";
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
} from "../exercises/13-fetch-tipado/exercise-01";
import {
  pedirCancelable,
  avisoDeCarga,
  ProyectosAlCerrar,
  CancelacionSilenciosa,
  FichaProyecto,
} from "../exercises/13-fetch-tipado/exercise-02";
import { Seccion, Tarjeta } from "./piezas";

/* BLOQUE 13 — `13-fetch-tipado`. Cada archivo nuevo de la carpeta se AÑADE aquí, en el
 * orden de su número.
 *
 * La API de los drills no existe. Mientras esta pestaña está abierta, el banco cambia
 * `window.fetch` por uno de mentira que responde a las rutas `/api/…` (las demás van al
 * fetch de verdad). Es un préstamo, como los del 12: se cambia al montar la pestaña y se
 * devuelve al desmontarla. Cada tarjeta elige cómo va a responder la API y monta su
 * componente; la respuesta tarda un poco, para que se vea el «Cargando…».
 *
 * Desde el exercise-02, el fetch de mentira hace caso al signal como el de verdad: si lo
 * abortan antes de responder, rechaza con la cancelación. Y responde también a
 * `/api/projects/:id`, con un proyecto suelto. */

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
/* Lo que tarda la lista. Solo la tarjeta 3 del 02 lo alarga, para que dé tiempo a cerrar. */
let retrasoElegido = RETRASO_MS;
/* Si las peticiones cuentan para el contador de la tarjeta 3 del 02. */
let contarPeticiones = false;

function elegirRespuesta(respuesta: Respuesta, opciones: { retrasoMs?: number; contar?: boolean } = {}) {
  respuestaElegida = respuesta;
  retrasoElegido = opciones.retrasoMs ?? RETRASO_MS;
  contarPeticiones = opciones.contar ?? false;
}

/* Lo que tarda cada proyecto suelto en /api/projects/:id. Projex tarda mucho a propósito:
 * da tiempo a pedir otro antes de que llegue (exercise-02, drill 5). */
const RETRASO_POR_ID: Record<number, number> = { 1: 2500, 2: 400, 3: 900 };

/* El contador de la tarjeta 3 del 02: qué fue de las peticiones desde que se abrió la
 * sección. Vive fuera de React, como el fetch de mentira, y la tarjeta se suscribe. */
type Cuenta = { enviadas: number; canceladas: number; respondidas: number };
const CUENTA_VACIA: Cuenta = { enviadas: 0, canceladas: 0, respondidas: 0 };
let cuenta = CUENTA_VACIA;
const oyentes = new Set<() => void>();

function cambiarCuenta(nueva: Cuenta) {
  cuenta = nueva;
  oyentes.forEach((avisar) => avisar());
}

function useCuenta() {
  return useSyncExternalStore(
    (avisar) => {
      oyentes.add(avisar);
      return () => {
        oyentes.delete(avisar);
      };
    },
    () => cuenta,
  );
}

function comoJson(cuerpo: unknown, status: number): Response {
  return new Response(JSON.stringify(cuerpo), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function responderDeMentira(
  ruta: string,
  respuesta: Respuesta,
  signal: AbortSignal | null | undefined,
): Promise<Response> {
  const suelto = /^\/api\/projects\/(\d+)$/.exec(ruta);
  const id = suelto ? Number(suelto[1]) : null;
  const retraso = id === null ? retrasoElegido : (RETRASO_POR_ID[id] ?? RETRASO_MS);
  const contar = contarPeticiones;

  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }
    if (contar) cambiarCuenta({ ...cuenta, enviadas: cuenta.enviadas + 1 });
    let terminada = false;

    const reloj = setTimeout(() => {
      terminada = true;
      if (contar) cambiarCuenta({ ...cuenta, respondidas: cuenta.respondidas + 1 });
      if (respuesta === "sin red") reject(new TypeError("Failed to fetch"));
      else if (respuesta === "lanza un texto") reject("se cayó el servidor");
      else if (respuesta === "404") resolve(comoJson({ message: "Not found" }, 404));
      else if (respuesta === "500") resolve(comoJson({ message: "Internal error" }, 500));
      else if (id === null) resolve(comoJson(PROYECTOS, 200));
      else {
        const proyecto = PROYECTOS.find((p) => p.id === id);
        resolve(proyecto ? comoJson(proyecto, 200) : comoJson({ message: "Not found" }, 404));
      }
    }, retraso);

    signal?.addEventListener("abort", () => {
      if (terminada) return;
      clearTimeout(reloj);
      if (contar) cambiarCuenta({ ...cuenta, canceladas: cuenta.canceladas + 1 });
      reject(signal.reason);
    });
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
        ? responderDeMentira(rutaDe(input), respuestaElegida, init?.signal)
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

/* Para la escalera del 1: cómo se ve en pantalla lo que devuelve una función. */
function mostrar(valor: unknown): string {
  if (typeof valor === "string") return `«${valor}»`;
  if (valor instanceof Response) return `un Response (status ${valor.status})`;
  if (valor instanceof Error) return `un Error («${valor.message}»)`;
  if (Array.isArray(valor)) return `[${valor.map(mostrar).join(", ")}]`;
  if (typeof valor === "object" && valor !== null) {
    const campos = Object.entries(valor).map(([clave, dentro]) => `${clave}: ${mostrar(dentro)}`);
    return `{ ${campos.join(", ")} }`;
  }
  return String(valor);
}

/* Para los peldaños sin React de la escalera del 1: un botón por respuesta de la API (o
 * uno solo, «Probar», si la función no pide nada a la API). Llama a la función del drill
 * y enseña lo que devuelve. Si es una promesa, lo dice, la espera y enseña con qué
 * termina, o con qué falla. */
function ProbarFuncion({ probar, respuestas }: { probar: () => unknown; respuestas?: Respuesta[] }) {
  const [lineas, setLineas] = useState<string[]>([]);

  async function ejecutar(respuesta: Respuesta) {
    elegirRespuesta(respuesta);
    const devuelve = probar();

    if (!(devuelve instanceof Promise)) {
      setLineas([`Devuelve: ${mostrar(devuelve)}`]);
      return;
    }

    setLineas(["Devuelve: una Promise", "Esperándola…"]);
    try {
      const valor: unknown = await devuelve;
      setLineas(["Devuelve: una Promise", `Al esperarla: ${mostrar(valor)}`]);
    } catch (error) {
      const motivo = error instanceof Error ? error.message : String(error);
      setLineas(["Devuelve: una Promise", `Al esperarla, falla: «${motivo}»`]);
    }
  }

  return (
    <div>
      <div>
        {respuestas ? (
          respuestas.map((respuesta) => (
            <button key={respuesta} type="button" onClick={() => ejecutar(respuesta)}>
              API: {respuesta}
            </button>
          ))
        ) : (
          <button type="button" onClick={() => ejecutar("bien")}>
            Probar
          </button>
        )}
      </div>
      {lineas.map((linea) => (
        <p key={linea}>{linea}</p>
      ))}
    </div>
  );
}

/* Para el 1i: los avisos de cargarConAvisos, según van llegando. */
function DemoAvisos() {
  const [avisos, setAvisos] = useState<string[]>([]);

  async function probar(respuesta: Respuesta) {
    elegirRespuesta(respuesta);
    setAvisos([]);
    try {
      await cargarConAvisos((paso) => setAvisos((antes) => [...antes, paso]));
    } catch (error) {
      const motivo = error instanceof Error ? error.message : String(error);
      setAvisos((antes) => [...antes, `(falló: ${motivo})`]);
    }
  }

  return (
    <div>
      <div>
        <button type="button" onClick={() => probar("bien")}>
          API: bien
        </button>
        <button type="button" onClick={() => probar("sin red")}>
          API: sin red
        </button>
      </div>
      {avisos.length > 0 && <p>Avisos: {avisos.join(" · ")}</p>}
    </div>
  );
}

/* Para los drills 1 y 2 del 02: llama a la función con un signal nuevo y enseña con qué
 * termina. «Pedir y cancelar» aprieta abort() medio segundo después, con la petición aún
 * en vuelo. */
function ProbarCancelable({
  probar,
  respuestas,
}: {
  probar: (signal: AbortSignal) => Promise<unknown>;
  respuestas: Respuesta[];
}) {
  const [linea, setLinea] = useState("");

  async function ejecutar(respuesta: Respuesta, cancelar: boolean) {
    elegirRespuesta(respuesta);
    const controller = new AbortController();
    const promesa = probar(controller.signal);
    if (cancelar) setTimeout(() => controller.abort(), 500);
    setLinea(cancelar ? "Pedida. Se cancela a los 0,5 s…" : "Pedida. Esperándola…");
    try {
      const valor: unknown = await promesa;
      setLinea(`Al esperarla: ${mostrar(valor)}`);
    } catch (error) {
      const motivo = error instanceof Error ? error.message : String(error);
      setLinea(`Al esperarla, falla: «${motivo}»`);
    }
  }

  return (
    <div>
      <div>
        {respuestas.map((respuesta) => (
          <button key={respuesta} type="button" onClick={() => ejecutar(respuesta, false)}>
            API: {respuesta}
          </button>
        ))}
        <button type="button" onClick={() => ejecutar("bien", true)}>
          Pedir y cancelar
        </button>
      </div>
      {linea && <p>{linea}</p>}
    </div>
  );
}

/* Para el drill 3 del 02: abrir la sección y cerrarla antes de que lleguen los proyectos
 * (aquí tardan 3 s). Debajo, qué fue de las peticiones desde que se abrió. */
function ConCierre({ Drill }: { Drill: ComponentType }) {
  const [abierta, setAbierta] = useState(false);
  const { enviadas, canceladas, respondidas } = useCuenta();

  function abrir() {
    elegirRespuesta("bien", { retrasoMs: 3000, contar: true });
    cambiarCuenta(CUENTA_VACIA);
    setAbierta(true);
  }

  return (
    <div>
      <div>
        <button type="button" onClick={abrir} disabled={abierta}>
          Abrir la sección
        </button>
        <button type="button" onClick={() => setAbierta(false)} disabled={!abierta}>
          Cerrar la sección
        </button>
      </div>
      {abierta && (
        <Atrapa>
          <Drill />
        </Atrapa>
      )}
      <p className="mt-3 font-mono text-[13px] text-[#86868b]">
        Peticiones: {enviadas} {enviadas === 1 ? "enviada" : "enviadas"} · {canceladas}{" "}
        {canceladas === 1 ? "cancelada" : "canceladas"} · {respondidas}{" "}
        {respondidas === 1 ? "respondida" : "respondidas"}
      </p>
    </div>
  );
}

/* Para el drill 5 del 02: la ficha se queda montada y solo cambia el id que recibe. */
function ConFicha({ Drill }: { Drill: ComponentType<{ id: number }> }) {
  const [id, setId] = useState<number | null>(null);

  function pedir(nuevo: number) {
    elegirRespuesta("bien");
    setId(nuevo);
  }

  return (
    <div>
      <div>
        <button type="button" onClick={() => pedir(1)}>
          Projex (tarda 2,5 s)
        </button>
        <button type="button" onClick={() => pedir(2)}>
          Smart Cooler (tarda 0,4 s)
        </button>
      </div>
      {id !== null && (
        <Atrapa>
          <Drill id={id} />
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
        n="1a"
        nombre="etiquetaDe"
        mirar="Pulsa Probar: tiene que salir una etiqueta por proyecto, como «Projex · Terminado». Con el starter salen tres undefined."
        campos="botón Probar · lo que devuelve etiquetaDe con cada uno de tus tres proyectos"
        estado="resuelto"
      >
        <ProbarFuncion probar={() => PROYECTOS.map(etiquetaDe)} />
      </Tarjeta>

      <Tarjeta
        n="1b"
        nombre="contarProyectos"
        mirar="Pulsa Probar: devuelve una Promise, y al esperarla sale 3. Esto ya funciona con el starter: el fallo solo lo ve pnpm typecheck."
        campos="botón Probar · lo que devuelve contarProyectos con tus tres proyectos, y lo que sale al esperarlo"
        estado="resuelto"
      >
        <ProbarFuncion probar={() => contarProyectos(PROYECTOS)} />
      </Tarjeta>

      <Tarjeta
        n="1c"
        nombre="avisoDeProyectos"
        mirar="Pulsa Probar: al esperarla tiene que salir «Tienes 3 proyectos». Con el starter sale «Tienes [object Promise] proyectos»."
        campos="botón Probar · lo que devuelve avisoDeProyectos y lo que sale al esperarlo"
        estado="resuelto"
      >
        <ProbarFuncion probar={() => avisoDeProyectos(PROYECTOS)} />
      </Tarjeta>

      <Tarjeta
        n="1d"
        nombre="RegistrarVisita"
        mirar="Pulsa API: bien: tiene que salir «Gracias por pasarte». Con el starter, en pnpm dev revienta al montarse: React intenta llamar a la promesa como si fuera la limpieza."
        campos="botón API: bien · el componente: «Gracias por pasarte», o el aviso de que reventó"
        estado="resuelto"
      >
        <ConApi Drill={RegistrarVisita} respuestas={["bien"]} />
      </Tarjeta>

      <Tarjeta
        n="1e"
        nombre="pedirProyectos"
        mirar="Pulsa API: bien: al esperarla tiene que salir la lista de tus tres proyectos. Con el starter sale un Response."
        campos="botón API: bien · lo que devuelve pedirProyectos y lo que sale al esperarlo"
        estado="resuelto"
      >
        <ProbarFuncion probar={pedirProyectos} respuestas={["bien"]} />
      </Tarjeta>

      <Tarjeta
        n="1f"
        estado="resuelto"
        nombre="nombresDeProyectos"
        mirar="Pulsa API: bien: al esperarla tienen que salir solo los nombres: [«Projex», «Smart Cooler», «Store Pulse»]. Con el starter salen los proyectos enteros."
        campos="botón API: bien · lo que devuelve nombresDeProyectos y lo que sale al esperarlo"
      >
        <ProbarFuncion probar={nombresDeProyectos} respuestas={["bien"]} />
      </Tarjeta>

      <Tarjeta
        n="1g"
        estado="resuelto"
        nombre="pedirOFallar"
        mirar="Pulsa API: 404: al esperarla tiene que fallar con «HTTP error — 404», y con API: 500, con «HTTP error — 500». Con el starter no falla: sale un Error como si fuera la lista. Con API: bien, la lista."
        campos="botones API: bien, API: 404 y API: 500 · lo que devuelve pedirOFallar y con qué termina o falla"
      >
        <ProbarFuncion probar={pedirOFallar} respuestas={["bien", "404", "500"]} />
      </Tarjeta>

      <Tarjeta
        n="1h"
        estado="resuelto"
        nombre="mensajeDeCarga"
        mirar="Pulsa API: sin red: al esperarla tiene que salir «Sin conexión». Con el starter falla con «Failed to fetch». Con API: bien, «3 proyectos cargados»."
        campos="botones API: bien y API: sin red · lo que devuelve mensajeDeCarga y con qué termina o falla"
      >
        <ProbarFuncion probar={mensajeDeCarga} respuestas={["bien", "sin red"]} />
      </Tarjeta>

      <Tarjeta
        n="1i"
        estado="resuelto"
        nombre="cargarConAvisos"
        mirar="Pulsa API: sin red: tienen que salir cargando · error · listo. Con el starter, «listo» no llega. Con API: bien, cargando · 3 proyectos · listo."
        campos="botones API: bien y API: sin red · los avisos, según llegan"
      >
        <DemoAvisos />
      </Tarjeta>

      <Tarjeta
        n="1j"
        estado="resuelto"
        nombre="ListaConEspera"
        mirar="Pulsa API: bien: «Cargando…» un momento y después la lista. Con el starter no sale «Cargando…»: la tarjeta se queda en blanco y, al rato, sale la lista."
        campos="botón API: bien · el componente: «Cargando…» y la lista"
      >
        <ConApi Drill={ListaConEspera} respuestas={["bien"]} />
      </Tarjeta>

      <Tarjeta
        n={1}
        nombre="ListaDeProyectos"
        mirar="Pulsa API: bien. Sale «Cargando…» un momento y después la lista. Con el starter, en pnpm dev revienta al montarse: React intenta llamar a la promesa como si fuera la limpieza."
        campos="botón API: bien · el componente: «Cargando…» y la lista"
        estado="resuelto"
      >
        <ConApi Drill={ListaDeProyectos} respuestas={["bien"]} />
      </Tarjeta>

      <Tarjeta
        n={2}
        estado="resuelto"
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
        estado="resuelto"
      >
        <ConApi Drill={MotivoDelError} respuestas={["sin red", "lanza un texto"]} />
      </Tarjeta>

      <Tarjeta
        n={4}
        nombre="ProyectosQueNoEstan"
        mirar="Pulsa API: 404: tiene que salir «HTTP error — 404». Con el starter revienta: el cuerpo del 404 se guarda como si fuera la lista, y projects.map no existe. Con API: bien, la lista."
        campos="botones API: bien y API: 404 · el componente: «Cargando…», el aviso o la lista"
        estado="resuelto"
      >
        <ConApi Drill={ProyectosQueNoEstan} respuestas={["bien", "404"]} />
      </Tarjeta>

      <Tarjeta
        n={5}
        nombre="useProjects"
        estado="resuelto"
        mirar="Prueba los tres botones: la lista con su estado, «Failed to fetch» y «HTTP error — 500». Con el starter, los tres se quedan en «Cargando…»."
        campos="botones API: bien, API: sin red y API: 500 · la sección: «Cargando…», el aviso o la lista"
      >
        <ConApi Drill={SeccionProyectos} respuestas={["bien", "sin red", "500"]} />
      </Tarjeta>

      <Seccion archivo="exercise-02" titulo="Cancelar la petición: AbortController en la limpieza." />

      <Tarjeta
        n={1}
        nombre="pedirCancelable"
        mirar="Pulsa Pedir y cancelar: al medio segundo tiene que fallar con la cancelación («signal is aborted without reason»). Con el starter, la lista llega igual. Con API: bien, la lista."
        campos="botones API: bien y Pedir y cancelar · con qué termina o falla pedirCancelable"
      >
        <ProbarCancelable probar={pedirCancelable} respuestas={["bien"]} />
      </Tarjeta>

      <Tarjeta
        n={2}
        nombre="avisoDeCarga"
        mirar="Pulsa Pedir y cancelar: tiene que salir «Carga cancelada». Con el starter sale el texto de la cancelación, como si fuera un error. Con API: bien, «3 proyectos cargados»; con API: sin red, «Failed to fetch»."
        campos="botones API: bien, API: sin red y Pedir y cancelar · lo que devuelve avisoDeCarga al esperarla"
      >
        <ProbarCancelable probar={avisoDeCarga} respuestas={["bien", "sin red"]} />
      </Tarjeta>

      <Tarjeta
        n={3}
        nombre="ProyectosAlCerrar"
        mirar="Pulsa Abrir la sección y, antes de 3 s, Cerrar la sección. Abajo tienen que quedar 2 canceladas y 0 respondidas: una la cancela el ensayo de StrictMode nada más abrir. Con el starter, a los 3 s salen 2 respondidas, con la sección ya cerrada."
        campos="botones Abrir y Cerrar la sección · el componente · qué fue de las peticiones"
      >
        <ConCierre Drill={ProyectosAlCerrar} />
      </Tarjeta>

      <Tarjeta
        n={4}
        nombre="CancelacionSilenciosa"
        mirar="Pulsa API: bien: «Cargando…» y después la lista. Con el starter sale enseguida un aviso rojo con el texto de la cancelación, y ya no se va. Con API: sin red, «Failed to fetch»."
        campos="botones API: bien y API: sin red · el componente: «Cargando…», el aviso o la lista"
      >
        <ConApi Drill={CancelacionSilenciosa} respuestas={["bien", "sin red"]} />
      </Tarjeta>

      <Tarjeta
        n={5}
        nombre="useProyecto"
        mirar="Pulsa Projex y, antes de 2,5 s, Smart Cooler: tiene que quedarse Smart Cooler. Con el starter sale Smart Cooler y, al rato, Projex la pisa."
        campos="botones Projex y Smart Cooler · FichaProyecto con el id que pulsaste"
      >
        <ConFicha Drill={FichaProyecto} />
      </Tarjeta>
    </>
  );
}
