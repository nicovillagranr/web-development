import {
  Component,
  useCallback,
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
} from "../exercises/13-fetch-tipado/exercise-02";
import {
  saludoDelPortfolio,
  pedirALaVez,
  pedirPortfolio,
  CabeceraAlCerrar,
  Portada,
  pedirCasiALaVez,
  portfolioTipado,
  pedirConError500,
  PortadaAMedias,
  FichaConAutor,
} from "../exercises/13-fetch-tipado/exercise-03";
import {
  ContactoSchema,
  leerPerfil,
  ciudadDe,
  pedirProyectosValidados,
  PortadaValidada,
} from "../exercises/13-fetch-tipado/exercise-04";
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
 * `/api/projects/:id`, con un proyecto suelto.
 *
 * Desde el exercise-03 responde además a `/api/profile`, con tu perfil, en dos tercios de lo
 * que tarda la lista (0,6 s frente a 0,9 s). La respuesta «perfil 404» deja la lista bien y
 * tumba solo el perfil; «perfil 500» también, pero con una página de error en HTML, como un
 * servidor caído.
 *
 * Desde el exercise-04 hay dos respuestas que llegan bien (200) pero con la forma rota:
 * «lista rota» trae un proyecto sin status, y «perfil roto», un perfil sin role. */

type Respuesta =
  | "bien"
  | "sin red"
  | "lanza un texto"
  | "404"
  | "500"
  | "perfil 404"
  | "perfil 500"
  | "lista rota"
  | "perfil roto";

const PROYECTOS = [
  { id: 1, name: "Projex", status: "Terminado" },
  { id: 2, name: "Smart Cooler", status: "En curso" },
  { id: 3, name: "Store Pulse", status: "En curso" },
];

const PERFIL = { name: "Nicolás", role: "Frontend Developer" };

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
  const esPerfil = ruta === "/api/profile";
  const retraso = esPerfil
    ? Math.round((retrasoElegido * 2) / 3)
    : id === null
      ? retrasoElegido
      : (RETRASO_POR_ID[id] ?? RETRASO_MS);
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
      else if (esPerfil && respuesta === "perfil 404") resolve(comoJson({ message: "Not found" }, 404));
      else if (esPerfil && respuesta === "perfil 500")
        resolve(new Response("<!doctype html><title>500</title>", { status: 500, headers: { "Content-Type": "text/html" } }));
      else if (esPerfil && respuesta === "perfil roto") resolve(comoJson({ name: PERFIL.name }, 200));
      else if (esPerfil) resolve(comoJson(PERFIL, 200));
      else if (id === null && respuesta === "lista rota") resolve(comoJson([{ id: 1, name: "Projex" }], 200));
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

/* El texto de un error. Un ZodError trae en message un JSON con sus fallos (exercise-04):
 * aquí se resume en «campo: qué falló». */
function textoDelError(error: unknown): string {
  if (!(error instanceof Error)) return String(error);
  try {
    const fallos: unknown = JSON.parse(error.message);
    if (Array.isArray(fallos)) {
      return fallos
        .map((fallo: unknown) =>
          typeof fallo === "object" && fallo !== null && "path" in fallo && "message" in fallo && Array.isArray(fallo.path)
            ? `${fallo.path.join(".")}: ${String(fallo.message)}`
            : String(fallo),
        )
        .join(" · ");
    }
  } catch {
    // No era JSON: es un error normal.
  }
  return error.message;
}

/* Para los drills del 04 que lanzan sin promesa: devuelve lo que da la función, o el error
 * que lanzó, para que la tarjeta lo enseñe en vez de reventar. */
function intentar(funcion: () => unknown): unknown {
  try {
    return funcion();
  } catch (error) {
    return error;
  }
}

/* Para la escalera del 1: cómo se ve en pantalla lo que devuelve una función. */
function mostrar(valor: unknown): string {
  if (typeof valor === "string") return `«${valor}»`;
  if (valor instanceof Response) return `un Response (status ${valor.status})`;
  if (valor instanceof Error) return `un Error («${textoDelError(valor)}»)`;
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
      setLineas(["Devuelve: una Promise", `Al esperarla, falla: «${textoDelError(error)}»`]);
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

/* Para los peldaños 4b–4e del 02: la función por uno de los tres caminos, y lo que
 * apuntó. «Pedir y cancelar» aprieta abort() con la petición aún en vuelo. */
function ProbarApuntes({
  cargar,
}: {
  cargar: (signal: AbortSignal, apuntar: (cambio: string) => void) => Promise<void>;
}) {
  const [linea, setLinea] = useState("");

  async function probar(respuesta: Respuesta, cancelar: boolean) {
    elegirRespuesta(respuesta);
    const apuntes: string[] = [];
    const controller = new AbortController();
    const carga = cargar(controller.signal, (cambio) => {
      apuntes.push(cambio);
    });
    if (cancelar) setTimeout(() => controller.abort(), 300);
    setLinea(cancelar ? "Pedida. Se cancela a los 0,3 s…" : "Pedida. Esperándola…");
    try {
      await carga;
      setLinea(`Apunta: ${apuntes.length > 0 ? apuntes.join(" · ") : "nada"}`);
    } catch (error) {
      const motivo = error instanceof Error ? error.message : String(error);
      setLinea(`Falla sin apuntar: «${motivo}»`);
    }
  }

  return (
    <div>
      <div>
        <button type="button" onClick={() => probar("bien", false)}>
          API: bien
        </button>
        <button type="button" onClick={() => probar("sin red", false)}>
          API: sin red
        </button>
        <button type="button" onClick={() => probar("bien", true)}>
          Pedir y cancelar
        </button>
      </div>
      {linea && <p>{linea}</p>}
    </div>
  );
}

/* Para el peldaño 4g del 02: cambia el id de RastroDeId, o lo cierra, y enseña lo que
 * fue apuntando. Al abrir de cero, el rastro empieza vacío. */
function ConRastro({
  Drill,
}: {
  Drill: ComponentType<{ id: number; apuntar: (cambio: string) => void }>;
}) {
  const [id, setId] = useState<number | null>(null);
  const [rastro, setRastro] = useState<string[]>([]);
  const apuntar = useCallback((cambio: string) => {
    setRastro((antes) => [...antes, cambio]);
  }, []);

  function elegir(nuevo: number) {
    if (id === null) setRastro([]);
    setId(nuevo);
  }

  return (
    <div>
      <div>
        <button type="button" onClick={() => elegir(1)}>
          Proyecto 1
        </button>
        <button type="button" onClick={() => elegir(2)}>
          Proyecto 2
        </button>
        <button type="button" onClick={() => setId(null)} disabled={id === null}>
          Cerrar
        </button>
      </div>
      {id !== null && (
        <Atrapa>
          <Drill id={id} apuntar={apuntar} />
        </Atrapa>
      )}
      {rastro.length > 0 && (
        <p className="mt-3 font-mono text-[13px] text-[#86868b]">Rastro: {rastro.join(" · ")}</p>
      )}
    </div>
  );
}

/* Para el drill 2 del 03: llama a la función y enseña cuánto tardó en devolver. Aquí la
 * lista tarda 0,9 s y el perfil, 0,6 s. */
function ProbarConReloj({ probar }: { probar: () => Promise<unknown> }) {
  const [linea, setLinea] = useState("");

  async function ejecutar() {
    elegirRespuesta("bien");
    const inicio = performance.now();
    setLinea("Pedida. Esperándola…");
    const valor: unknown = await probar();
    const segundos = ((performance.now() - inicio) / 1000).toFixed(1).replace(".", ",");
    setLinea(`Tardó ${segundos} s · ${mostrar(valor)}`);
  }

  return (
    <div>
      <div>
        <button type="button" onClick={ejecutar}>
          Probar
        </button>
      </div>
      {linea && <p>{linea}</p>}
    </div>
  );
}

/* Para los drills 2 y 3 del 03: lo que devuelven, en una frase. */
async function resumir(carga: Promise<{ projects: unknown[]; profile: { name: string } }>) {
  const { projects, profile } = await carga;
  return `${projects.length} proyectos y el perfil de ${profile.name}`;
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
        estado="resuelto"
        nombre="pedirCancelable"
        mirar="Pulsa Pedir y cancelar: al medio segundo tiene que fallar con la cancelación («signal is aborted without reason»). Con el starter, la lista llega igual. Con API: bien, la lista."
        campos="botones API: bien y Pedir y cancelar · con qué termina o falla pedirCancelable"
      >
        <ProbarCancelable probar={pedirCancelable} respuestas={["bien"]} />
      </Tarjeta>

      <Tarjeta
        n={2}
        estado="resuelto"
        nombre="avisoDeCarga"
        mirar="Pulsa Pedir y cancelar: tiene que salir «Carga cancelada». Con el starter sale el texto de la cancelación, como si fuera un error. Con API: bien, «3 proyectos cargados»; con API: sin red, «Failed to fetch»."
        campos="botones API: bien, API: sin red y Pedir y cancelar · lo que devuelve avisoDeCarga al esperarla"
      >
        <ProbarCancelable probar={avisoDeCarga} respuestas={["bien", "sin red"]} />
      </Tarjeta>

      <Tarjeta
        n={3}
        estado="resuelto"
        nombre="ProyectosAlCerrar"
        mirar="Pulsa Abrir la sección y, antes de 3 s, Cerrar la sección. Abajo tienen que quedar 2 canceladas y 0 respondidas: una la cancela el ensayo de StrictMode nada más abrir. Con el starter, a los 3 s salen 2 respondidas, con la sección ya cerrada."
        campos="botones Abrir y Cerrar la sección · el componente · qué fue de las peticiones"
      >
        <ConCierre Drill={ProyectosAlCerrar} />
      </Tarjeta>

      <Tarjeta
        n={4}
        estado="resuelto"
        nombre="CancelacionSilenciosa"
        mirar="Pulsa API: bien: «Cargando…» y después la lista. Con el starter sale enseguida un aviso rojo con el texto de la cancelación, y ya no se va. Con API: sin red, «Failed to fetch»."
        campos="botones API: bien y API: sin red · el componente: «Cargando…», el aviso o la lista"
      >
        <ConApi Drill={CancelacionSilenciosa} respuestas={["bien", "sin red"]} />
      </Tarjeta>

      <Tarjeta
        n="4a"
        estado="resuelto"
        nombre="mensajeDe"
        mirar="Pulsa Probar: tiene que salir [«Failed to fetch», «Error desconocido»], para un Error y para un texto suelto. Con el starter, el texto suelto da undefined."
        campos="botón Probar · lo que devuelve mensajeDe con un Error y con un texto"
      >
        <ProbarFuncion probar={() => [mensajeDe(new Error("Failed to fetch")), mensajeDe("se cayó el servidor")]} />
      </Tarjeta>

      <Tarjeta
        n="4b"
        estado="resuelto"
        nombre="cargarB"
        mirar="Pulsa Pedir y cancelar: tiene que salir «Apunta: nada». Con el starter apunta el error de la cancelación y apaga loading. Con API: bien y API: sin red, lo de siempre."
        campos="botones API: bien, API: sin red y Pedir y cancelar · lo que apunta cada camino"
      >
        <ProbarApuntes cargar={cargarB} />
      </Tarjeta>

      <Tarjeta
        n="4c"
        estado="resuelto"
        nombre="cargarC"
        mirar="Pulsa Pedir y cancelar: tiene que salir «Apunta: nada». Con el starter se cuela el setError de la cancelación, antes de que llegue la guardia."
        campos="botones API: bien, API: sin red y Pedir y cancelar · lo que apunta cada camino"
      >
        <ProbarApuntes cargar={cargarC} />
      </Tarjeta>

      <Tarjeta
        n="4d"
        estado="resuelto"
        nombre="cargarD"
        mirar="Pulsa Pedir y cancelar: tiene que salir «Apunta: nada». Con el starter se cuela el setLoading(false) del finally."
        campos="botones API: bien, API: sin red y Pedir y cancelar · lo que apunta cada camino"
      >
        <ProbarApuntes cargar={cargarD} />
      </Tarjeta>

      <Tarjeta
        n="4e"
        estado="resuelto"
        nombre="cargarE"
        mirar="Pulsa API: bien: tiene que salir setProjects(3 proyectos) · setLoading(false). Con el starter falta el setLoading(false)."
        campos="botones API: bien, API: sin red y Pedir y cancelar · lo que apunta cada camino"
      >
        <ProbarApuntes cargar={cargarE} />
      </Tarjeta>

      <Tarjeta
        n="4f"
        estado="resuelto"
        nombre="NombreDelProyecto"
        mirar="Pulsa Projex, espera a que salga y pulsa Smart Cooler: el nombre tiene que cambiar. Con el starter se queda en Projex."
        campos="botones Projex y Smart Cooler · el nombre del proyecto con ese id"
      >
        <ConFicha Drill={NombreDelProyecto} />
      </Tarjeta>

      <Tarjeta
        n="4g"
        estado="resuelto"
        nombre="RastroDeId"
        mirar="Pulsa Proyecto 1, después Proyecto 2 y después Cerrar. Al pasar al 2 tiene que salir «suelta 1» antes de «pide 2», y al cerrar, «suelta 2». Al abrir verás pide 1 · suelta 1 · pide 1: es el ensayo de StrictMode. Con el starter no sale ningún «suelta»."
        campos="botones Proyecto 1, Proyecto 2 y Cerrar · el componente · el rastro"
      >
        <ConRastro Drill={RastroDeId} />
      </Tarjeta>

      <Tarjeta
        n="4h"
        estado="resuelto"
        nombre="ProyectosQueNoLlegan"
        mirar="Pulsa API: bien: «Cargando…» y después la lista. Con el starter se queda en «Cargando…» para siempre."
        campos="botón API: bien · el componente: «Cargando…» o la lista"
      >
        <ConApi Drill={ProyectosQueNoLlegan} respuestas={["bien"]} />
      </Tarjeta>

      <Tarjeta
        n="4i"
        estado="resuelto"
        nombre="FichaQueNoEscucha"
        mirar="Pulsa Projex y, antes de 2,5 s, Smart Cooler: tiene que quedarse Smart Cooler. Con el starter, al rato, Projex la pisa, como en el 5."
        campos="botones Projex y Smart Cooler · la ficha con el id que pulsaste"
      >
        <ConFicha Drill={FichaQueNoEscucha} />
      </Tarjeta>

      <Tarjeta
        n={5}
        nombre="useProyecto"
        estado="resuelto"
        mirar="Pulsa Projex y, antes de 2,5 s, Smart Cooler: tiene que quedarse Smart Cooler. Con el starter sale Smart Cooler y, al rato, Projex la pisa."
        campos="botones Projex y Smart Cooler · FichaProyecto con el id que pulsaste"
      >
        <ConFicha Drill={FichaProyecto} />
      </Tarjeta>

      <Seccion archivo="exercise-03" titulo="Pedir dos cosas a la vez: Promise.all." />

      <Tarjeta
        n={1}
        estado="resuelto"
        nombre="saludoDelPortfolio"
        mirar="Pulsa API: bien: tiene que salir «Nicolás · 3 proyectos». Con el starter sale «undefined · undefined proyectos»: cada variable se llevó lo de la otra."
        campos="botón API: bien · lo que devuelve saludoDelPortfolio al esperarla"
      >
        <ProbarFuncion probar={saludoDelPortfolio} respuestas={["bien"]} />
      </Tarjeta>

      <Tarjeta
        n={2}
        estado="resuelto"
        nombre="pedirALaVez"
        mirar="Pulsa Probar: tiene que tardar 0,9 s, lo que tarda la lista. Con el starter tarda 1,5 s: el perfil no sale hasta que llega la lista."
        campos="botón Probar · cuánto tardó y lo que devolvió"
      >
        <ProbarConReloj probar={() => resumir(pedirALaVez())} />
      </Tarjeta>

      <Tarjeta
        n={3}
        estado="resuelto"
        nombre="pedirPortfolio"
        mirar="Pulsa API: perfil 404: tiene que fallar con «HTTP error — profile:404». Con el starter llega «el perfil de undefined»: el cuerpo del 404 pasó por tu perfil. Con API: 500 falla la lista, que el starter ya comprueba."
        campos="botones API: bien, API: perfil 404 y API: 500 · con qué termina o falla pedirPortfolio"
      >
        <ProbarFuncion probar={() => resumir(pedirPortfolio())} respuestas={["bien", "perfil 404", "500"]} />
      </Tarjeta>

      <Tarjeta
        n={4}
        estado="resuelto"
        nombre="CabeceraAlCerrar"
        mirar="Pulsa Abrir la sección y, antes de 2 s, Cerrar la sección. Abajo tienen que quedar 4 canceladas y 0 respondidas: dos de la lista y dos del perfil, contando el ensayo de StrictMode. Con el starter, a los 2 s salen 2 respondidas: las del perfil."
        campos="botones Abrir y Cerrar la sección · el componente · qué fue de las peticiones"
      >
        <ConCierre Drill={CabeceraAlCerrar} />
      </Tarjeta>

      <Tarjeta
        n={5}
        estado="resuelto"
        nombre="usePortfolio"
        mirar="Pulsa API: bien: «Cargando…» y después tu nombre con la lista debajo. Con el starter se queda en «Cargando…» para siempre. Con API: perfil 404, el aviso «HTTP error — profile:404» y ni rastro de la lista."
        campos="botones API: bien, API: perfil 404 y API: sin red · Portada: «Cargando…», el aviso o tu cabecera con la lista"
      >
        <ConApi Drill={Portada} respuestas={["bien", "perfil 404", "sin red"]} />
      </Tarjeta>

      <Tarjeta
        n={6}
        nombre="pedirCasiALaVez"
        mirar="Pulsa Probar: tiene que tardar 0,9 s. Con el starter tarda 1,5 s, como el starter del 2, aunque ya usa Promise.all."
        campos="botón Probar · cuánto tardó y lo que devolvió"
      >
        <ProbarConReloj probar={() => resumir(pedirCasiALaVez())} />
      </Tarjeta>

      <Tarjeta
        n={7}
        nombre="portfolioTipado"
        mirar="Pulsa API: bien: sale «3 proyectos y el perfil de Nicolás» también con el starter. Aquí el fallo no se ve: solo lo marca pnpm typecheck."
        campos="botón API: bien · lo que devuelve portfolioTipado al esperarla"
      >
        <ProbarFuncion probar={() => resumir(portfolioTipado())} respuestas={["bien"]} />
      </Tarjeta>

      <Tarjeta
        n={8}
        nombre="pedirConError500"
        mirar="Pulsa API: perfil 500: tiene que fallar con «HTTP error — profile:500». Con el starter falla con el error de leer HTML como JSON («Unexpected token '<'…»)."
        campos="botones API: bien y API: perfil 500 · con qué termina o falla pedirConError500"
      >
        <ProbarFuncion probar={() => resumir(pedirConError500())} respuestas={["bien", "perfil 500"]} />
      </Tarjeta>

      <Tarjeta
        n={9}
        nombre="PortadaAMedias"
        mirar="Pulsa API: bien: «Cargando…» y después tu nombre con la lista, todo de una vez. Con el starter sale tu nombre con la lista vacía, y la lista aparece casi un segundo después."
        campos="botón API: bien · el componente: «Cargando…», o tu nombre y la lista"
      >
        <ConApi Drill={PortadaAMedias} respuestas={["bien"]} />
      </Tarjeta>

      <Tarjeta
        n={10}
        nombre="useFichaConAutor"
        mirar="Pulsa Projex y, antes de 2,5 s, Smart Cooler: tiene que quedarse «Smart Cooler · En curso — por Nicolás». Con el starter, al rato, Projex la pisa."
        campos="botones Projex y Smart Cooler · FichaConAutor con el id que pulsaste"
      >
        <ConFicha Drill={FichaConAutor} />
      </Tarjeta>

      <Seccion archivo="exercise-04" titulo="No le creas a la API: validar con Zod." />

      <Tarjeta
        n={1}
        nombre="ContactoSchema"
        mirar="Pulsa Probar: tiene que salir el contacto tal cual, con years: 2. Con el starter sale el ZodError: «years: Invalid input: expected string, received number»."
        campos="botón Probar · lo que devuelve ContactoSchema.parse, o el error que lanza"
      >
        <ProbarFuncion
          probar={() =>
            intentar(() => ContactoSchema.parse({ email: "nico@ejemplo.com", github: "nicovillagranr", years: 2 }))
          }
        />
      </Tarjeta>

      <Tarjeta
        n={2}
        nombre="leerPerfil"
        mirar="Pulsa Probar: el perfil completo pasa, y el perfil sin role tiene que dar un Error («role: …»). Con el starter, el perfil sin role pasa sin más."
        campos="botón Probar · leerPerfil con un perfil completo y con uno sin role"
      >
        <ProbarFuncion
          probar={() => [
            intentar(() => leerPerfil(PERFIL)),
            intentar(() => leerPerfil({ name: PERFIL.name })),
          ]}
        />
      </Tarjeta>

      <Tarjeta
        n={3}
        nombre="ciudadDe"
        mirar="Pulsa Probar: tiene que salir «Santiago, CL». Con el starter sale undefined, aunque los datos traen based."
        campos="botón Probar · lo que devuelve ciudadDe con un perfil que trae based"
      >
        <ProbarFuncion probar={() => ciudadDe({ ...PERFIL, based: "Santiago, CL" })} />
      </Tarjeta>

      <Tarjeta
        n={4}
        nombre="pedirProyectosValidados"
        mirar="Pulsa API: lista rota: tiene que fallar con «0.status: Invalid input…», el proyecto 0 sin status. Con el starter, el proyecto roto llega como si nada."
        campos="botones API: bien y API: lista rota · con qué termina o falla pedirProyectosValidados"
      >
        <ProbarFuncion probar={pedirProyectosValidados} respuestas={["bien", "lista rota"]} />
      </Tarjeta>

      <Tarjeta
        n={5}
        nombre="usePortfolioValidado"
        mirar="Pulsa API: perfil roto: tiene que salir el aviso con el error de Zod, que nombra role. Con el starter se pinta la portada con «Nicolás · » y el rol vacío."
        campos="botones API: bien y API: perfil roto · PortadaValidada: «Cargando…», el aviso o tu cabecera con la lista"
      >
        <ConApi Drill={PortadaValidada} respuestas={["bien", "perfil roto"]} />
      </Tarjeta>
    </>
  );
}
