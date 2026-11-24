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
  guardarLista,
  guardarPerfil,
  leerLista,
  validarPortfolio,
  PortadaTodoONada,
} from "../exercises/13-fetch-tipado/exercise-04";
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
  PerfilAlMontar,
  PerfilAlCerrar,
  pedirLasDos,
  avisoDe,
  ListaConAvisos,
  ListaDeCero,
  PortadaDeCero,
} from "../exercises/13-fetch-tipado/exercise-05";
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
} from "../exercises/13-fetch-tipado/exercise-06";
import {
  API_CLIMA,
  Temperatura,
  useTemperaturaConBandera,
  useTemperaturaConRef,
  useTemperaturaCancelable,
  useTemperaturaConLasDos,
  TarjetaClima,
} from "../exercises/13-fetch-tipado/exercise-07";
import {
  useRastroDeIntentos,
  useRastroQueNoEscucha,
  TarjetaReintentable,
  useClimaConAvisoPegado,
  useClimaSinEspera,
  TarjetaClimaConReintento,
} from "../exercises/13-fetch-tipado/exercise-08";
import {
  useTicQueNoPara,
  useTicQueNoArranca,
  useSegundos,
  useRelojQueSeQueda,
  useClimaQueLlegaTarde,
  useClimaQueSeCruza,
  useClimaQueSigue,
  useClimaConAvisoQueNoSeVa,
  useClimaConFalsaAlarma,
  useClimaConMandoPorVuelta,
  TarjetaClimaQueSeRefresca,
  type ClimaAlDia,
} from "../exercises/13-fetch-tipado/exercise-09";
import {
  API_AIRE,
  HorasSchema,
  temperaturaDe,
  armarPronostico,
  esDeDia,
  TarjetaWeather,
} from "../exercises/13-fetch-tipado/exercise-10";
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
 * «lista rota» trae un proyecto sin status, y «perfil roto», un perfil sin role.
 *
 * Desde el exercise-05, «lenta» contesta bien pero a los 5 s, y «500 y luego bien» da un
 * 500 a la primera petición de la lista y contesta bien a las siguientes. Y como el fetch
 * de verdad, solo acepta un AbortSignal: con otra cosa en signal, falla sin salir.
 *
 * Desde el exercise-06 responde además a `/data-snapshot.json`, el snapshot del último
 * deploy (sin Store Pulse, que es más nuevo), en 0,3 s y sin importar lo lenta que esté la
 * API. «500 y sin snapshot» tumba la API como «500» y, además, el snapshot da 404.
 *
 * Desde el exercise-07 responde además a Open-Meteo (API_CLIMA), con la temperatura de la
 * ciudad que diga la latitud: Santiago tarda 2,5 s a propósito, y Valparaíso 0,4 s. Todas
 * sus peticiones cuentan en el contador de la tarjeta. Las tarjetas del 07 pueden tumbarlo
 * entero, y las del 08, hacer que falle las primeras veces que contesta.
 *
 * Desde el exercise-09, las tarjetas del polling hacen que cada respuesta buena de una ciudad
 * traiga 1 °C más que la anterior, y cuentan las llamadas a fetch de cada ciudad, también las
 * que nacen canceladas.
 *
 * Desde el exercise-10, el clima trae además los días del pronóstico, y responde a la API del
 * aire (API_AIRE), con su propio contador. */

type Respuesta =
  | "bien"
  | "sin red"
  | "lanza un texto"
  | "404"
  | "500"
  | "perfil 404"
  | "perfil 500"
  | "lista rota"
  | "perfil roto"
  | "lenta"
  | "500 y luego bien"
  | "500 y sin snapshot";

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
/* Para «500 y luego bien»: si la primera petición de la lista ya dio su 500. */
let yaFalloLaPrimera = false;

/* Lo que tarda todo con «lenta» (exercise-05). */
const RETRASO_LENTA_MS = 5000;

function elegirRespuesta(respuesta: Respuesta, opciones: { retrasoMs?: number; contar?: boolean } = {}) {
  respuestaElegida = respuesta;
  retrasoElegido = opciones.retrasoMs ?? RETRASO_MS;
  contarPeticiones = opciones.contar ?? false;
  yaFalloLaPrimera = false;
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

/* El snapshot del exercise-06: el del último deploy, sin Store Pulse. */
const RUTA_SNAPSHOT = "/data-snapshot.json";
const SNAPSHOT = {
  generatedAt: "2026-11-01T12:00:00.000Z",
  projects: PROYECTOS.slice(0, 2),
  profile: PERFIL,
};

function responderSnapshot(respuesta: Respuesta, signal: AbortSignal | null | undefined): Promise<Response> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }
    const reloj = setTimeout(() => {
      resolve(
        respuesta === "500 y sin snapshot" ? comoJson({ message: "Not found" }, 404) : comoJson(SNAPSHOT, 200),
      );
    }, 300);
    signal?.addEventListener("abort", () => {
      clearTimeout(reloj);
      reject(signal.reason);
    });
  });
}

function responderDeMentira(
  ruta: string,
  respuesta: Respuesta,
  signal: AbortSignal | null | undefined,
): Promise<Response> {
  if (ruta === RUTA_SNAPSHOT) return responderSnapshot(respuesta, signal);
  const suelto = /^\/api\/projects\/(\d+)$/.exec(ruta);
  const id = suelto ? Number(suelto[1]) : null;
  const esPerfil = ruta === "/api/profile";
  const retraso =
    respuesta === "lenta"
      ? RETRASO_LENTA_MS
      : esPerfil
        ? Math.round((retrasoElegido * 2) / 3)
        : id === null
          ? retrasoElegido
          : (RETRASO_POR_ID[id] ?? RETRASO_MS);
  const contar = contarPeticiones;
  const fallaAhora = respuesta === "500 y luego bien" && !esPerfil && id === null && !yaFalloLaPrimera;
  if (fallaAhora) yaFalloLaPrimera = true;

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
      if (fallaAhora) resolve(comoJson({ message: "Internal error" }, 500));
      else if (respuesta === "sin red") reject(new TypeError("Failed to fetch"));
      else if (respuesta === "lanza un texto") reject("se cayó el servidor");
      else if (respuesta === "404") resolve(comoJson({ message: "Not found" }, 404));
      else if (respuesta === "500" || respuesta === "500 y sin snapshot")
        resolve(comoJson({ message: "Internal error" }, 500));
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

/* Open-Meteo de mentira (exercise-07 y 08). Cada ciudad, su temperatura y lo que tarda. */
type Ciudad = { lat: number; lon: number; temperatura: number; retrasoMs: number };
const SANTIAGO: Ciudad = { lat: -33.45, lon: -70.67, temperatura: 24.3, retrasoMs: 2500 };
const VALPARAISO: Ciudad = { lat: -33.05, lon: -71.62, temperatura: 16.8, retrasoMs: 400 };

/* Cómo responde Open-Meteo: caido da 500 a todo; fallos, 500 a las primeras que lleguen a
 * contestar (las canceladas no gastan fallo). Se cambia desde fuera de los componentes,
 * como la respuesta de la API. */
let climaCaido = false;
let climaFallos = 0;
/* Desde el 09: con sube, cada respuesta buena de una ciudad trae 1 °C más que la anterior,
 * para que se vea el polling. */
let climaSube = false;
const buenasPorCiudad = new Map<Ciudad, number>();

function elegirClima({
  caido = false,
  fallos = 0,
  sube = false,
}: { caido?: boolean; fallos?: number; sube?: boolean } = {}) {
  climaCaido = caido;
  climaFallos = fallos;
  climaSube = sube;
  buenasPorCiudad.clear();
}

/* Para la tarjeta 5 del 09: que falle la próxima que llegue a contestar. */
function fallarLaProxima() {
  climaFallos += 1;
}

function temperaturaDeMentira(ciudad: Ciudad): number {
  const buenas = buenasPorCiudad.get(ciudad) ?? 0;
  buenasPorCiudad.set(ciudad, buenas + 1);
  return climaSube ? ciudad.temperatura + buenas : ciudad.temperatura;
}

/* Desde el 09: cuántas veces se llamó a fetch para cada ciudad, contando las que nacen ya
 * canceladas (el contador de arriba no las ve: nunca llegan a enviarse). */
type PedidasPorCiudad = { santiago: number; valparaiso: number };
const PEDIDAS_VACIAS: PedidasPorCiudad = { santiago: 0, valparaiso: 0 };
let pedidas = PEDIDAS_VACIAS;
const oyentesDePedidas = new Set<() => void>();

function cambiarPedidas(nuevas: PedidasPorCiudad) {
  pedidas = nuevas;
  oyentesDePedidas.forEach((avisar) => avisar());
}

function usePedidas() {
  return useSyncExternalStore(
    (avisar) => {
      oyentesDePedidas.add(avisar);
      return () => {
        oyentesDePedidas.delete(avisar);
      };
    },
    () => pedidas,
  );
}

function apuntarPedida(ciudad: Ciudad | undefined) {
  if (ciudad === SANTIAGO) cambiarPedidas({ ...pedidas, santiago: pedidas.santiago + 1 });
  if (ciudad === VALPARAISO) cambiarPedidas({ ...pedidas, valparaiso: pedidas.valparaiso + 1 });
}

function responderClima(url: string, signal: AbortSignal | null | undefined): Promise<Response> {
  const latitud = new URL(url).searchParams.get("latitude");
  const ciudad = [SANTIAGO, VALPARAISO].find((c) => String(c.lat) === latitud);
  apuntarPedida(ciudad);

  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }
    cambiarCuenta({ ...cuenta, enviadas: cuenta.enviadas + 1 });
    let terminada = false;

    const reloj = setTimeout(() => {
      terminada = true;
      cambiarCuenta({ ...cuenta, respondidas: cuenta.respondidas + 1 });
      if (climaCaido || climaFallos > 0 || !ciudad) {
        if (climaFallos > 0) climaFallos -= 1;
        resolve(comoJson({ error: true, reason: "Internal error" }, 500));
        return;
      }
      resolve(
        comoJson(
          { current_weather: { temperature: temperaturaDeMentira(ciudad), weathercode: 1 }, daily: DIAS_DE_MENTIRA },
          200,
        ),
      );
    }, ciudad?.retrasoMs ?? 400);

    signal?.addEventListener("abort", () => {
      if (terminada) return;
      clearTimeout(reloj);
      cambiarCuenta({ ...cuenta, canceladas: cuenta.canceladas + 1 });
      reject(signal.reason);
    });
  });
}

/* Desde el 10: los días del pronóstico (los 07–09 no los leen: su schema los ignora) y la
 * API del aire, que tarda 1,5 s en Santiago y 0,3 s en Valparaíso. Sus peticiones van en su
 * propio contador. */
const DIAS_DE_MENTIRA = {
  time: ["2026-11-23", "2026-11-24", "2026-11-25"],
  temperature_2m_min: [11.6, 12.4, 10.9],
  temperature_2m_max: [24.2, 26.8, 23.5],
};
const AIRE_POR_CIUDAD = new Map<Ciudad, { aqi: number; retrasoMs: number }>([
  [SANTIAGO, { aqi: 85, retrasoMs: 1500 }],
  [VALPARAISO, { aqi: 32, retrasoMs: 300 }],
]);

let cuentaAire = CUENTA_VACIA;
const oyentesDelAire = new Set<() => void>();

function cambiarCuentaAire(nueva: Cuenta) {
  cuentaAire = nueva;
  oyentesDelAire.forEach((avisar) => avisar());
}

function useCuentaAire() {
  return useSyncExternalStore(
    (avisar) => {
      oyentesDelAire.add(avisar);
      return () => {
        oyentesDelAire.delete(avisar);
      };
    },
    () => cuentaAire,
  );
}

function responderAire(url: string, signal: AbortSignal | null | undefined): Promise<Response> {
  const latitud = new URL(url).searchParams.get("latitude");
  const ciudad = [SANTIAGO, VALPARAISO].find((c) => String(c.lat) === latitud);
  const aire = ciudad ? AIRE_POR_CIUDAD.get(ciudad) : undefined;

  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }
    cambiarCuentaAire({ ...cuentaAire, enviadas: cuentaAire.enviadas + 1 });
    let terminada = false;

    const reloj = setTimeout(() => {
      terminada = true;
      cambiarCuentaAire({ ...cuentaAire, respondidas: cuentaAire.respondidas + 1 });
      if (!aire) {
        resolve(comoJson({ error: true, reason: "Internal error" }, 500));
        return;
      }
      resolve(comoJson({ current: { us_aqi: aire.aqi } }, 200));
    }, aire?.retrasoMs ?? 300);

    signal?.addEventListener("abort", () => {
      if (terminada) return;
      clearTimeout(reloj);
      cambiarCuentaAire({ ...cuentaAire, canceladas: cuentaAire.canceladas + 1 });
      reject(signal.reason);
    });
  });
}

function urlDe(input: RequestInfo | URL): string {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.href;
  return input.url;
}

function rutaDe(input: RequestInfo | URL): string {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.pathname;
  return new URL(input.url).pathname;
}

function useFetchDeMentira() {
  useEffect(() => {
    const original = window.fetch;
    window.fetch = (input, init) => {
      const url = urlDe(input);
      if (url.startsWith(API_CLIMA)) return responderClima(url, init?.signal);
      if (url.startsWith(API_AIRE)) return responderAire(url, init?.signal);
      const ruta = rutaDe(input);
      if (!ruta.startsWith("/api/") && ruta !== RUTA_SNAPSHOT) return original.call(window, input, init);
      const signal: unknown = init?.signal;
      if (signal != null && !(signal instanceof AbortSignal)) {
        return Promise.reject(
          new TypeError(
            "Failed to execute 'fetch' on 'Window': Failed to read the 'signal' property from 'RequestInit': Failed to convert value to 'AbortSignal'.",
          ),
        );
      }
      return responderDeMentira(rutaDe(input), respuestaElegida, init?.signal);
    };

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

/* Para los peldaños 4b–4e del 02, el drill 3 del 06 y el peldaño 5b del 06: la función por
 * uno de los caminos, y lo que apuntó. «Pedir y cancelar» aprieta abort() con la petición aún
 * en vuelo: por defecto con la API bien y a los 0,3 s; cancelarCon cambia las dos cosas. */
function ProbarApuntes({
  cargar,
  respuestas = ["bien", "sin red"],
  cancelarCon = { respuesta: "bien", ms: 300 },
}: {
  cargar: (signal: AbortSignal, apuntar: (cambio: string) => void) => Promise<void>;
  respuestas?: Respuesta[];
  cancelarCon?: { respuesta: Respuesta; ms: number };
}) {
  const [linea, setLinea] = useState("");
  const aLos = `${(cancelarCon.ms / 1000).toString().replace(".", ",")} s`;

  async function probar(respuesta: Respuesta, cancelar: boolean) {
    elegirRespuesta(respuesta);
    const apuntes: string[] = [];
    const controller = new AbortController();
    const carga = cargar(controller.signal, (cambio) => {
      apuntes.push(cambio);
    });
    if (cancelar) setTimeout(() => controller.abort(), cancelarCon.ms);
    setLinea(cancelar ? `Pedida. Se cancela a los ${aLos}…` : "Pedida. Esperándola…");
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
        {respuestas.map((respuesta) => (
          <button key={respuesta} type="button" onClick={() => probar(respuesta, false)}>
            API: {respuesta}
          </button>
        ))}
        <button type="button" onClick={() => probar(cancelarCon.respuesta, true)}>
          {cancelarCon.respuesta === "bien" ? "Pedir y cancelar" : `API: ${cancelarCon.respuesta} y cancelar a los ${aLos}`}
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

/* Para los drills 6 y 7 del 04: llama a la función con un guardar de mentira, que hace de
 * set y apunta lo que recibe. Enseña qué recibió guardar y si la función lanzó. */
type CasoGuardar = { etiqueta: string; llamar: (guardar: (valor: unknown) => void) => void };

function ProbarGuardar({ casos }: { casos: CasoGuardar[] }) {
  const [lineas, setLineas] = useState<string[]>([]);

  function probar({ llamar }: CasoGuardar) {
    const recibido: unknown[] = [];
    const resultado = intentar(() =>
      llamar((valor) => {
        recibido.push(valor);
      }),
    );
    setLineas([
      recibido.length === 0 ? "guardar no recibió nada" : `guardar recibió: ${mostrar(recibido[0])}`,
      resultado instanceof Error ? `Lanzó: «${textoDelError(resultado)}»` : "No lanzó",
    ]);
  }

  return (
    <div>
      <div>
        {casos.map((caso) => (
          <button key={caso.etiqueta} type="button" onClick={() => probar(caso)}>
            {caso.etiqueta}
          </button>
        ))}
      </div>
      {lineas.map((linea) => (
        <p key={linea}>{linea}</p>
      ))}
    </div>
  );
}

/* Para el drill 8 del 04: pide la lista y le pasa la respuesta a leerLista. */
async function pedirYLeer() {
  const res = await fetch("/api/projects");
  return leerLista(res);
}

/* Para los drills 1–3 del 05 y su escalera (1a–1d): un botón por prueba. Cada una elige cómo responde la API,
 * llama a la función y enseña cuánto tardó y con qué terminó. Si falla, enseña el name del
 * error, que es lo que dice quién cortó: TimeoutError, AbortError o un Error normal. */
type Prueba = { etiqueta: string; respuesta: Respuesta; probar: () => Promise<unknown> };

function segundosDesde(inicio: number): string {
  return ((performance.now() - inicio) / 1000).toFixed(1).replace(".", ",");
}

/* Fuera del componente: medir el tiempo no es cosa del render. */
async function correrPrueba({ respuesta, probar }: Prueba): Promise<string> {
  elegirRespuesta(respuesta);
  const inicio = performance.now();
  try {
    const valor = await probar();
    const resumen = Array.isArray(valor) ? `${valor.length} proyectos` : mostrar(valor);
    return `Tardó ${segundosDesde(inicio)} s · ${resumen}`;
  } catch (error) {
    const nombre = error instanceof Error ? error.name : "no es un Error";
    return `Tardó ${segundosDesde(inicio)} s · falla: ${nombre} («${textoDelError(error)}»)`;
  }
}

function ProbarConLimites({ pruebas }: { pruebas: Prueba[] }) {
  const [linea, setLinea] = useState("");

  async function ejecutar(prueba: Prueba) {
    setLinea("Pedida. Esperándola…");
    setLinea(await correrPrueba(prueba));
  }

  return (
    <div>
      <div>
        {pruebas.map((prueba) => (
          <button key={prueba.etiqueta} type="button" onClick={() => ejecutar(prueba)}>
            {prueba.etiqueta}
          </button>
        ))}
      </div>
      {linea && <p>{linea}</p>}
    </div>
  );
}

/* Para el drill 3 del 05: cancela a los 0,3 s, como quien cierra antes de que llegue. */
function pedirYCancelarPronto() {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 300);
  return pedirCancelableConLimite(controller.signal, 2000);
}

/* Para los drills 4 y 5 del 05: el componente con 2 s de límite. */
function ListaConLimiteDe2s() {
  return <ListaConLimite limiteMs={2000} />;
}

function PortadaConLimiteDe2s() {
  return <PortadaConLimite limiteMs={2000} />;
}

/* Para el peldaño 5c del 05: pide las dos (la lista tarda 3 s y el perfil 2 s) y cancela a
 * los 0,5 s. Debajo, qué fue de las dos peticiones. */
function ProbarDosYCancelar() {
  const [linea, setLinea] = useState("");
  const { enviadas, canceladas, respondidas } = useCuenta();

  async function ejecutar() {
    elegirRespuesta("bien", { retrasoMs: 3000, contar: true });
    cambiarCuenta(CUENTA_VACIA);
    const controller = new AbortController();
    const promesa = pedirLasDos(controller.signal);
    setTimeout(() => controller.abort(), 500);
    setLinea("Pedidas. Se cancela a los 0,5 s…");
    try {
      await promesa;
      setLinea("Llegaron las dos");
    } catch (error) {
      const nombre = error instanceof Error ? error.name : "no es un Error";
      setLinea(`Al esperarlas, falla: ${nombre}`);
    }
  }

  return (
    <div>
      <div>
        <button type="button" onClick={ejecutar}>
          Pedir las dos y cancelar
        </button>
      </div>
      {linea && <p>{linea}</p>}
      <p className="mt-3 font-mono text-[13px] text-[#86868b]">
        Peticiones: {enviadas} {enviadas === 1 ? "enviada" : "enviadas"} · {canceladas}{" "}
        {canceladas === 1 ? "cancelada" : "canceladas"} · {respondidas}{" "}
        {respondidas === 1 ? "respondida" : "respondidas"}
      </p>
    </div>
  );
}

/* Para el peldaño 5d del 05: avisoDe con los cuatro casos del catch. */
function casosDeAviso() {
  const seFue = new AbortController();
  seFue.abort();
  const sigue = new AbortController().signal;
  const reloj = Object.assign(new Error("signal timed out"), { name: "TimeoutError" });
  return [
    avisoDe(new Error("This operation was aborted"), seFue.signal),
    avisoDe(reloj, sigue),
    avisoDe(new Error("HTTP error — /api/projects:500"), sigue),
    avisoDe("se cayó el servidor", sigue),
  ];
}

/* Para los peldaños 5e–5g del 05: los componentes con 2 s de límite. */
function ListaConAvisosDe2s() {
  return <ListaConAvisos limiteMs={2000} />;
}

function ListaDeCeroDe2s() {
  return <ListaDeCero limiteMs={2000} />;
}

function PortadaDeCeroDe2s() {
  return <PortadaDeCero limiteMs={2000} />;
}

/* Para el drill 4 del 06: cancela a los 0,3 s, con la API lenta y 2 s de límite. */
function respaldoYCancelarPronto() {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 300);
  return pedirConLimiteYRespaldo(controller.signal, 2000);
}

/* Para los peldaños 4a y 4b del 06: cancela a los 0,3 s, con un reloj de 10 s, para que el
 * que corte sea el usuario y no el reloj. */
function relojYCancelarPronto(probar: (signal: AbortSignal, reloj: AbortSignal) => Promise<unknown>) {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 300);
  return probar(controller.signal, AbortSignal.timeout(10000));
}

/* Para el peldaño 4c del 06: la combinada con 2 s de reloj. Con cancelarMs, el usuario se va
 * a esa altura (a los 2,15 s, el snapshot va a medias). */
function respaldoConLaQueQuedaDe2s(cancelarMs?: number) {
  const controller = new AbortController();
  if (cancelarMs !== undefined) setTimeout(() => controller.abort(), cancelarMs);
  return respaldoConLaQueQueda(controller.signal, AbortSignal.any([controller.signal, AbortSignal.timeout(2000)]));
}

/* Para el drill 5 del 06: la portada con 2 s de límite. */
function PortadaConRespaldoDe2s() {
  return <PortadaConRespaldo limiteMs={2000} />;
}

/* Qué fue de las peticiones a Open-Meteo desde que se montó la tarjeta (07 y 08). */
function LineaDeCuenta() {
  const { enviadas, canceladas, respondidas } = useCuenta();
  return (
    <p className="mt-3 font-mono text-[13px] text-[#86868b]">
      Peticiones a Open-Meteo: {enviadas} {enviadas === 1 ? "enviada" : "enviadas"} · {canceladas}{" "}
      {canceladas === 1 ? "cancelada" : "canceladas"} · {respondidas}{" "}
      {respondidas === 1 ? "respondida" : "respondidas"}
    </p>
  );
}

type Coordenadas = { lat: number; lon: number };

/* Para el 07: la tarjeta se queda montada y solo cambian lat y lon, como en tu Smart-Cooler
 * al cambiar de ciudad. Con conCaida, un botón más la vuelve a montar con Open-Meteo dando
 * 500. Cerrar la desmonta. */
function ConCiudades({ Drill, conCaida = false }: { Drill: ComponentType<Coordenadas>; conCaida?: boolean }) {
  const [ciudad, setCiudad] = useState<Coordenadas | null>(null);
  const [vez, setVez] = useState(0);

  function elegir(nueva: Coordenadas) {
    elegirClima();
    if (ciudad === null) cambiarCuenta(CUENTA_VACIA);
    setCiudad(nueva);
  }

  function caer() {
    elegirClima({ caido: true });
    cambiarCuenta(CUENTA_VACIA);
    setCiudad(VALPARAISO);
    setVez(vez + 1);
  }

  return (
    <div>
      <div>
        <button type="button" onClick={() => elegir(SANTIAGO)}>
          Santiago (tarda 2,5 s)
        </button>
        <button type="button" onClick={() => elegir(VALPARAISO)}>
          Valparaíso (tarda 0,4 s)
        </button>
        {conCaida && (
          <button type="button" onClick={caer}>
            Open-Meteo: 500
          </button>
        )}
        <button type="button" onClick={() => setCiudad(null)} disabled={ciudad === null}>
          Cerrar
        </button>
      </div>
      {ciudad !== null && (
        <Atrapa key={vez}>
          <Drill lat={ciudad.lat} lon={ciudad.lon} />
        </Atrapa>
      )}
      <LineaDeCuenta />
    </div>
  );
}

function TemperaturaConBandera({ lat, lon }: Coordenadas) {
  return <Temperatura grados={useTemperaturaConBandera(lat, lon)} />;
}

function TemperaturaConRef({ lat, lon }: Coordenadas) {
  return <Temperatura grados={useTemperaturaConRef(lat, lon)} />;
}

function TemperaturaCancelable({ lat, lon }: Coordenadas) {
  return <Temperatura grados={useTemperaturaCancelable(lat, lon)} />;
}

function TemperaturaConLasDos({ lat, lon }: Coordenadas) {
  return <Temperatura grados={useTemperaturaConLasDos(lat, lon)} />;
}

/* Para los drills 1 y 2 del 08: el componente solo tiene el botón «Reintentar», y su efecto
 * apunta «pide» en el rastro cada vez que corre. */
type ConApuntar = { apuntar: (linea: string) => void };

function RastroDeIntentos({ apuntar }: ConApuntar) {
  const reintentar = useRastroDeIntentos(apuntar);
  return (
    <button type="button" onClick={reintentar}>
      Reintentar
    </button>
  );
}

function RastroQueNoEscucha({ apuntar }: ConApuntar) {
  const reintentar = useRastroQueNoEscucha(apuntar);
  return (
    <button type="button" onClick={reintentar}>
      Reintentar
    </button>
  );
}

function ConIntentos({ Drill }: { Drill: ComponentType<ConApuntar> }) {
  const [vez, setVez] = useState(0);
  const [rastro, setRastro] = useState<string[]>([]);
  const apuntar = useCallback((linea: string) => {
    setRastro((antes) => [...antes, linea]);
  }, []);

  function montar() {
    setRastro([]);
    setVez(vez + 1);
  }

  return (
    <div>
      <div>
        <button type="button" onClick={montar}>
          Montar
        </button>
      </div>
      {vez > 0 && (
        <Atrapa key={vez}>
          <Drill apuntar={apuntar} />
        </Atrapa>
      )}
      {rastro.length > 0 && (
        <p className="mt-3 font-mono text-[13px] text-[#86868b]">Rastro: {rastro.join(" · ")}</p>
      )}
    </div>
  );
}

/* Para los drills 3–5 del 08: monta la tarjeta en Valparaíso con Open-Meteo fallando las
 * primeras veces que contesta, y después bien. */
function ConFallos({ Drill, fallos }: { Drill: ComponentType; fallos: number[] }) {
  const [vez, setVez] = useState(0);

  function montar(veces: number) {
    elegirClima({ fallos: veces });
    cambiarCuenta(CUENTA_VACIA);
    setVez(vez + 1);
  }

  return (
    <div>
      <div>
        {fallos.map((veces) => (
          <button key={veces} type="button" onClick={() => montar(veces)}>
            Open-Meteo: falla {veces === 1 ? "1 vez" : `${veces} veces`}
          </button>
        ))}
      </div>
      {vez > 0 && (
        <Atrapa key={vez}>
          <Drill />
        </Atrapa>
      )}
      <LineaDeCuenta />
    </div>
  );
}

function ClimaConAvisoPegado() {
  return <TarjetaReintentable {...useClimaConAvisoPegado(VALPARAISO.lat, VALPARAISO.lon)} />;
}

function ClimaSinEspera() {
  return <TarjetaReintentable {...useClimaSinEspera(VALPARAISO.lat, VALPARAISO.lon)} />;
}

function ClimaConReintentoEnValparaiso() {
  return <TarjetaClimaConReintento lat={VALPARAISO.lat} lon={VALPARAISO.lon} />;
}

/* Para los drills 1 y 2 del 09: el componente no pinta nada propio, y su intervalo suma un
 * «tic» al rastro de la tarjeta. Desmontar lo quita; si el intervalo sigue vivo, el rastro
 * sigue sumando. */
function TicQueNoPara({ apuntar }: ConApuntar) {
  useTicQueNoPara(apuntar);
  return <p>Montado</p>;
}

function TicQueNoArranca({ apuntar }: ConApuntar) {
  useTicQueNoArranca(apuntar);
  return <p>Montado</p>;
}

function ConTics({ Drill }: { Drill: ComponentType<ConApuntar> }) {
  const [vez, setVez] = useState(0);
  const [montado, setMontado] = useState(false);
  const [tics, setTics] = useState(0);
  const apuntar = useCallback(() => {
    setTics((antes) => antes + 1);
  }, []);

  function montar() {
    setTics(0);
    setVez(vez + 1);
    setMontado(true);
  }

  return (
    <div>
      <div>
        <button type="button" onClick={montar}>
          Montar
        </button>
        <button type="button" onClick={() => setMontado(false)} disabled={!montado}>
          Desmontar
        </button>
      </div>
      {montado && (
        <Atrapa key={vez}>
          <Drill apuntar={apuntar} />
        </Atrapa>
      )}
      <p className="mt-3 font-mono text-[13px] text-[#86868b]">Rastro: {tics} «tic»</p>
    </div>
  );
}

/* Para el drill 3 del 09: la cuenta de useSegundos, con Montar y Desmontar. */
function Segundos() {
  return <p>{useSegundos()} s</p>;
}

function ConMontaje({ Drill }: { Drill: ComponentType }) {
  const [vez, setVez] = useState(0);
  const [montado, setMontado] = useState(false);

  function montar() {
    setVez(vez + 1);
    setMontado(true);
  }

  return (
    <div>
      <div>
        <button type="button" onClick={montar}>
          Montar
        </button>
        <button type="button" onClick={() => setMontado(false)} disabled={!montado}>
          Desmontar
        </button>
      </div>
      {montado && (
        <Atrapa key={vez}>
          <Drill />
        </Atrapa>
      )}
    </div>
  );
}

/* Para los drills 4 y 5 del 09: el polling del banco vuelve a pedir cada 3 s. */
const CADA_MS_BANCO = 3000;

function LineaDePedidas() {
  const { santiago, valparaiso } = usePedidas();
  return (
    <p className="font-mono text-[13px] text-[#86868b]">
      Llamadas a fetch: Santiago {santiago} · Valparaíso {valparaiso}
    </p>
  );
}

function GradosQueSiguen({ lat, lon }: Coordenadas) {
  const grados = useClimaQueSigue(lat, lon, CADA_MS_BANCO);
  return <p>{grados === null ? "Cargando…" : `${grados} °C`}</p>;
}

/* Para el peldaño 4a del 09: el reloj recibe el nombre de la ciudad y apunta en el rastro
 * de la tarjeta. Se ven las últimas ocho líneas. Al abrir de cero, el rastro empieza vacío. */
type ConCiudadYApuntar = { ciudad: string } & ConApuntar;

function RelojQueSeQueda({ ciudad, apuntar }: ConCiudadYApuntar) {
  useRelojQueSeQueda(ciudad, apuntar);
  return <p>Montado con {ciudad}</p>;
}

function ConRelojDeCiudad({ Drill }: { Drill: ComponentType<ConCiudadYApuntar> }) {
  const [ciudad, setCiudad] = useState<string | null>(null);
  const [rastro, setRastro] = useState<string[]>([]);
  const apuntar = useCallback((linea: string) => {
    setRastro((antes) => [...antes, linea].slice(-8));
  }, []);

  function elegir(nueva: string) {
    if (ciudad === null) setRastro([]);
    setCiudad(nueva);
  }

  return (
    <div>
      <div>
        <button type="button" onClick={() => elegir("Santiago")}>
          Santiago
        </button>
        <button type="button" onClick={() => elegir("Valparaíso")}>
          Valparaíso
        </button>
        <button type="button" onClick={() => setCiudad(null)} disabled={ciudad === null}>
          Cerrar
        </button>
      </div>
      {ciudad !== null && (
        <Atrapa>
          <Drill ciudad={ciudad} apuntar={apuntar} />
        </Atrapa>
      )}
      {rastro.length > 0 && (
        <p className="mt-3 font-mono text-[13px] text-[#86868b]">Rastro: {rastro.join(" · ")}</p>
      )}
    </div>
  );
}

/* Para los peldaños 4b y 4c del 09: la temperatura, como en el 4. */
function TemperaturaQueLlegaTarde({ lat, lon }: Coordenadas) {
  return <Temperatura grados={useClimaQueLlegaTarde(lat, lon)} />;
}

function GradosQueSeCruzan({ lat, lon }: Coordenadas) {
  return <Temperatura grados={useClimaQueSeCruza(lat, lon, CADA_MS_BANCO)} />;
}

/* Para los peldaños 5a–5c del 09: pintan lo mismo que TarjetaClimaQueSeRefresca. */
function PintarClima({ grados, error }: ClimaAlDia) {
  if (error) return <p role="alert">{error}</p>;
  if (grados === null) return <p>Cargando…</p>;
  return <p>{grados} °C</p>;
}

function ClimaConAvisoQueNoSeVa({ lat, lon }: Coordenadas) {
  const clima = useClimaConAvisoQueNoSeVa(lat, lon, CADA_MS_BANCO);
  return <PintarClima {...clima} />;
}

function ClimaConFalsaAlarma({ lat, lon }: Coordenadas) {
  const clima = useClimaConFalsaAlarma(lat, lon, CADA_MS_BANCO);
  return <PintarClima {...clima} />;
}

function ClimaConMandoPorVuelta({ lat, lon }: Coordenadas) {
  const clima = useClimaConMandoPorVuelta(lat, lon, CADA_MS_BANCO);
  return <PintarClima {...clima} />;
}

function ClimaQueSeRefresca({ lat, lon }: Coordenadas) {
  return <TarjetaClimaQueSeRefresca lat={lat} lon={lon} cadaMs={CADA_MS_BANCO} />;
}

function WeatherAlDia({ lat, lon }: Coordenadas) {
  return <TarjetaWeather lat={lat} lon={lon} cadaMs={CADA_MS_BANCO} />;
}

function LineaDeCuentaAire() {
  const { enviadas, canceladas, respondidas } = useCuentaAire();
  return (
    <p className="font-mono text-[13px] text-[#86868b]">
      Peticiones al aire: {enviadas} {enviadas === 1 ? "enviada" : "enviadas"} · {canceladas}{" "}
      {canceladas === 1 ? "cancelada" : "canceladas"} · {respondidas}{" "}
      {respondidas === 1 ? "respondida" : "respondidas"}
    </p>
  );
}

/* Para los drills 1–4 del 10: un botón por caso. Cada uno llama a la función del drill con
 * esos datos y enseña lo que devuelve, o el error que lanza. */
type Caso = { etiqueta: string; probar: () => unknown };

function ProbarCasos({ casos }: { casos: Caso[] }) {
  const [linea, setLinea] = useState<string | null>(null);

  return (
    <div>
      <div>
        {casos.map((caso) => (
          <button
            key={caso.etiqueta}
            type="button"
            onClick={() => setLinea(`${caso.etiqueta} → ${mostrar(intentar(caso.probar))}`)}
          >
            {caso.etiqueta}
          </button>
        ))}
      </div>
      {linea !== null && <p>{linea}</p>}
    </div>
  );
}

const HORAS_CON_IS_DAY = {
  time: ["2026-11-23T14:00", "2026-11-23T23:00"],
  temperature_2m: [24.1, 15.3],
  is_day: [1, 0],
};

/* is_day solo trae las dos primeras horas: las dos últimas las decide time. */
const HORAS_CORTAS = {
  time: ["2026-11-23T14:00", "2026-11-23T13:00", "2026-11-24T10:00", "2026-11-24T22:00"],
  temperature_2m: [24, 23, 18, 15],
  is_day: [1, 0],
};

/* La tarjeta se queda montada y solo cambian lat y lon, como en el 07. Cada respuesta buena
 * trae 1 °C más que la anterior, para que se vea cada vuelta. Con conFallo, un botón hace que
 * falle la próxima que llegue a contestar. */
function ConPolling({
  Drill,
  conFallo = false,
  conAire = false,
}: {
  Drill: ComponentType<Coordenadas>;
  conFallo?: boolean;
  conAire?: boolean;
}) {
  const [ciudad, setCiudad] = useState<Coordenadas | null>(null);

  function elegir(nueva: Coordenadas) {
    if (ciudad === null) {
      elegirClima({ sube: true });
      cambiarCuenta(CUENTA_VACIA);
      cambiarCuentaAire(CUENTA_VACIA);
      cambiarPedidas(PEDIDAS_VACIAS);
    }
    setCiudad(nueva);
  }

  return (
    <div>
      <div>
        <button type="button" onClick={() => elegir(SANTIAGO)}>
          Santiago (tarda 2,5 s)
        </button>
        <button type="button" onClick={() => elegir(VALPARAISO)}>
          Valparaíso (tarda 0,4 s)
        </button>
        {conFallo && (
          <button type="button" onClick={fallarLaProxima} disabled={ciudad === null}>
            Que falle la próxima
          </button>
        )}
        <button type="button" onClick={() => setCiudad(null)} disabled={ciudad === null}>
          Cerrar
        </button>
      </div>
      {ciudad !== null && (
        <Atrapa>
          <Drill lat={ciudad.lat} lon={ciudad.lon} />
        </Atrapa>
      )}
      <LineaDeCuenta />
      {conAire && <LineaDeCuentaAire />}
      <LineaDePedidas />
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
        estado="resuelto"
        nombre="pedirCasiALaVez"
        mirar="Pulsa Probar: tiene que tardar 0,9 s. Con el starter tarda 1,5 s, como el starter del 2, aunque ya usa Promise.all."
        campos="botón Probar · cuánto tardó y lo que devolvió"
      >
        <ProbarConReloj probar={() => resumir(pedirCasiALaVez())} />
      </Tarjeta>

      <Tarjeta
        n={7}
        estado="resuelto"
        nombre="portfolioTipado"
        mirar="Pulsa API: bien: sale «3 proyectos y el perfil de Nicolás» también con el starter. Aquí el fallo no se ve: solo lo marca pnpm typecheck."
        campos="botón API: bien · lo que devuelve portfolioTipado al esperarla"
      >
        <ProbarFuncion probar={() => resumir(portfolioTipado())} respuestas={["bien"]} />
      </Tarjeta>

      <Tarjeta
        n={8}
        estado="resuelto"
        nombre="pedirConError500"
        mirar="Pulsa API: perfil 500: tiene que fallar con «HTTP error — profile:500». Con el starter falla con el error de leer HTML como JSON («Unexpected token '<'…»)."
        campos="botones API: bien y API: perfil 500 · con qué termina o falla pedirConError500"
      >
        <ProbarFuncion probar={() => resumir(pedirConError500())} respuestas={["bien", "perfil 500"]} />
      </Tarjeta>

      <Tarjeta
        n={9}
        estado="resuelto"
        nombre="PortadaAMedias"
        mirar="Pulsa API: bien: «Cargando…» y después tu nombre con la lista, todo de una vez. Con el starter sale tu nombre con la lista vacía, y la lista aparece casi un segundo después."
        campos="botón API: bien · el componente: «Cargando…», o tu nombre y la lista"
      >
        <ConApi Drill={PortadaAMedias} respuestas={["bien"]} />
      </Tarjeta>

      <Tarjeta
        n={10}
        estado="resuelto"
        nombre="useFichaConAutor"
        mirar="Pulsa Projex y, antes de 2,5 s, Smart Cooler: tiene que quedarse «Smart Cooler · En curso — por Nicolás». Con el starter, al rato, Projex la pisa."
        campos="botones Projex y Smart Cooler · FichaConAutor con el id que pulsaste"
      >
        <ConFicha Drill={FichaConAutor} />
      </Tarjeta>

      <Seccion archivo="exercise-04" titulo="No le creas a la API: validar con Zod." />

      <Tarjeta
        n={1}
        estado="resuelto"
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
        estado="resuelto"
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
        estado="resuelto"
        nombre="ciudadDe"
        mirar="Pulsa Probar: tiene que salir «Santiago, CL». Con el starter sale undefined, aunque los datos traen based."
        campos="botón Probar · lo que devuelve ciudadDe con un perfil que trae based"
      >
        <ProbarFuncion probar={() => ciudadDe({ ...PERFIL, based: "Santiago, CL" })} />
      </Tarjeta>

      <Tarjeta
        n={4}
        estado="resuelto"
        nombre="pedirProyectosValidados"
        mirar="Pulsa API: lista rota: tiene que fallar con «0.status: Invalid input…», el proyecto 0 sin status. Con el starter, el proyecto roto llega como si nada."
        campos="botones API: bien y API: lista rota · con qué termina o falla pedirProyectosValidados"
      >
        <ProbarFuncion probar={pedirProyectosValidados} respuestas={["bien", "lista rota"]} />
      </Tarjeta>

      <Tarjeta
        n={5}
        estado="resuelto"
        nombre="usePortfolioValidado"
        mirar="Pulsa API: perfil roto: tiene que salir el aviso con el error de Zod, que nombra role. Con el starter se pinta la portada con «Nicolás · » y el rol vacío."
        campos="botones API: bien y API: perfil roto · PortadaValidada: «Cargando…», el aviso o tu cabecera con la lista"
      >
        <ConApi Drill={PortadaValidada} respuestas={["bien", "perfil roto"]} />
      </Tarjeta>

      <Tarjeta
        n={6}
        estado="resuelto"
        nombre="guardarLista"
        mirar="Pulsa Lista bien: guardar tiene que recibir tus tres proyectos, y no lanza. Pulsa Lista rota: lanza por status y guardar no recibe nada. Con el starter, guardar recibe la lista sin comprobar, también la rota, y después parse revienta con undefined."
        campos="botones Lista bien y Lista rota · qué recibió guardar y si guardarLista lanzó"
      >
        <ProbarGuardar
          casos={[
            { etiqueta: "Lista bien", llamar: (guardar) => guardarLista(PROYECTOS, guardar) },
            {
              etiqueta: "Lista rota",
              llamar: (guardar) => guardarLista([{ id: 1, name: "Projex" }], guardar),
            },
          ]}
        />
      </Tarjeta>

      <Tarjeta
        n={7}
        estado="resuelto"
        nombre="guardarPerfil"
        mirar="Pulsa Perfil bien: guardar tiene que recibir tu perfil. Pulsa Perfil sin role: lanza por role y guardar no recibe nada. Con el starter revienta hasta con el perfil bien: «expected array, received object»."
        campos="botones Perfil bien y Perfil sin role · qué recibió guardar y si guardarPerfil lanzó"
      >
        <ProbarGuardar
          casos={[
            { etiqueta: "Perfil bien", llamar: (guardar) => guardarPerfil(PERFIL, guardar) },
            { etiqueta: "Perfil sin role", llamar: (guardar) => guardarPerfil({ name: PERFIL.name }, guardar) },
          ]}
        />
      </Tarjeta>

      <Tarjeta
        n={8}
        estado="resuelto"
        nombre="leerLista"
        mirar="Pulsa API: bien: al esperarla tiene que salir tu lista. Con el starter falla con «expected array, received Promise»: a parse le llegó la promesa."
        campos="botones API: bien y API: lista rota · con qué termina o falla leerLista"
      >
        <ProbarFuncion probar={pedirYLeer} respuestas={["bien", "lista rota"]} />
      </Tarjeta>

      <Tarjeta
        n={9}
        estado="resuelto"
        nombre="validarPortfolio"
        mirar="Pulsa Probar: el primero tiene que salir con tu lista y tu perfil, y el segundo, con el perfil sin role, un Error («role: …»). Con el starter, el perfil roto sale tal cual."
        campos="botón Probar · validarPortfolio con un perfil completo y con uno sin role"
      >
        <ProbarFuncion
          probar={() => [
            intentar(() => validarPortfolio(PROYECTOS, PERFIL)),
            intentar(() => validarPortfolio(PROYECTOS, { name: PERFIL.name })),
          ]}
        />
      </Tarjeta>

      <Tarjeta
        n={10}
        estado="resuelto"
        nombre="usePortfolioTodoONada"
        mirar="Pulsa API: perfil roto: tiene que salir solo el aviso, sin lista debajo. Con API: lista rota, solo el aviso, sin tu cabecera. Con el starter, con el perfil roto sale el aviso con la lista debajo."
        campos="botones API: bien, API: perfil roto y API: lista rota · PortadaTodoONada: el aviso, tu cabecera y la lista"
      >
        <ConApi Drill={PortadaTodoONada} respuestas={["bien", "perfil roto", "lista rota"]} />
      </Tarjeta>

      <Seccion archivo="exercise-05" titulo="No esperar para siempre: el timeout." />

      <Tarjeta
        n={1}
        estado="resuelto"
        nombre="pedirConLimite"
        mirar="La lista tarda 0,9 s. Pulsa Límite 0,5 s: tiene que fallar a los 0,5 s con TimeoutError. Con el starter espera la lista entera y falla a los 0,9 s con un Error suyo, «La API tardó demasiado»."
        campos="botones Límite 2 s y Límite 0,5 s · cuánto tardó y con qué terminó o falló"
      >
        <ProbarConLimites
          pruebas={[
            { etiqueta: "Límite 2 s", respuesta: "bien", probar: () => pedirConLimite(2000) },
            { etiqueta: "Límite 0,5 s", respuesta: "bien", probar: () => pedirConLimite(500) },
          ]}
        />
      </Tarjeta>

      <Tarjeta
        n="1a"
        estado="resuelto"
        nombre="cuantoTarda"
        mirar="La lista tarda 0,9 s. Pulsa Pedir la lista: el banco mide 0,9 s, y cuantoTarda tiene que decir unos 900. Con el starter dice 0."
        campos="botón Pedir la lista · cuánto midió el banco y lo que devolvió cuantoTarda"
      >
        <ProbarConLimites pruebas={[{ etiqueta: "Pedir la lista", respuesta: "bien", probar: cuantoTarda }]} />
      </Tarjeta>

      <Tarjeta
        n="1b"
        estado="resuelto"
        nombre="pedirYAnular"
        mirar="La lista tarda 0,9 s. Pulsa Pedir y anular: tiene que fallar enseguida, a los 0,0 s, con AbortError. Con el starter espera la lista entera y devuelve su status, 200."
        campos="botón Pedir y anular · cuánto tardó y con qué terminó o falló"
      >
        <ProbarConLimites pruebas={[{ etiqueta: "Pedir y anular", respuesta: "bien", probar: pedirYAnular }]} />
      </Tarjeta>

      <Tarjeta
        n="1c"
        estado="resuelto"
        nombre="pedirConAlarma"
        mirar="La lista tarda 0,9 s. Pulsa Límite 0,5 s: tiene que fallar a los 0,5 s con AbortError. Con el starter, que es tu intento del 1, espera la lista entera y falla a los 0,9 s con un Error suyo."
        campos="botones Límite 2 s y Límite 0,5 s · cuánto tardó y con qué terminó o falló"
      >
        <ProbarConLimites
          pruebas={[
            { etiqueta: "Límite 2 s", respuesta: "bien", probar: () => pedirConAlarma(2000) },
            { etiqueta: "Límite 0,5 s", respuesta: "bien", probar: () => pedirConAlarma(500) },
          ]}
        />
      </Tarjeta>

      <Tarjeta
        n="1d"
        estado="resuelto"
        nombre="pedirConReloj"
        mirar="Pulsa Límite 0,5 s: tiene que fallar a los 0,5 s con TimeoutError. Con el starter corta igual a los 0,5 s, pero con AbortError."
        campos="botones Límite 2 s y Límite 0,5 s · cuánto tardó y con qué terminó o falló"
      >
        <ProbarConLimites
          pruebas={[
            { etiqueta: "Límite 2 s", respuesta: "bien", probar: () => pedirConReloj(2000) },
            { etiqueta: "Límite 0,5 s", respuesta: "bien", probar: () => pedirConReloj(500) },
          ]}
        />
      </Tarjeta>

      <Tarjeta
        n={2}
        estado="resuelto"
        nombre="pedirConReintento"
        mirar="Pulsa API: 500 y luego bien: el primer intento da 500 a los 0,9 s, y el segundo tiene que llegar a los 1,8 s. Con el starter, el segundo se corta a los 1,5 s con TimeoutError."
        campos="botones API: bien y API: 500 y luego bien, con límite 1,5 s · cuánto tardó y con qué terminó o falló"
      >
        <ProbarConLimites
          pruebas={[
            { etiqueta: "API: bien · límite 1,5 s", respuesta: "bien", probar: () => pedirConReintento(1500) },
            {
              etiqueta: "API: 500 y luego bien · límite 1,5 s",
              respuesta: "500 y luego bien",
              probar: () => pedirConReintento(1500),
            },
          ]}
        />
      </Tarjeta>

      <Tarjeta
        n={3}
        estado="resuelto"
        nombre="pedirCancelableConLimite"
        mirar="Pulsa Límite 0,5 s: TimeoutError a los 0,5 s. Pulsa Cancelar a los 0,3 s: AbortError a los 0,3 s. Con el starter fallan los tres al instante, con el TypeError de fetch."
        campos="botones Límite 2 s, Límite 0,5 s y Cancelar a los 0,3 s · cuánto tardó y con qué terminó o falló"
      >
        <ProbarConLimites
          pruebas={[
            {
              etiqueta: "Límite 2 s",
              respuesta: "bien",
              probar: () => pedirCancelableConLimite(new AbortController().signal, 2000),
            },
            {
              etiqueta: "Límite 0,5 s",
              respuesta: "bien",
              probar: () => pedirCancelableConLimite(new AbortController().signal, 500),
            },
            { etiqueta: "Cancelar a los 0,3 s · límite 2 s", respuesta: "bien", probar: pedirYCancelarPronto },
          ]}
        />
      </Tarjeta>

      <Tarjeta
        n={4}
        estado="resuelto"
        nombre="ListaConLimite"
        mirar="Límite: 2 s. Pulsa API: lenta (tarda 5 s): a los 2 s tiene que salir el aviso «La API tardó demasiado». Con el starter se queda en «Cargando…» para siempre."
        campos="botones API: bien y API: lenta · ListaConLimite: «Cargando…», el aviso o la lista"
      >
        <ConApi Drill={ListaConLimiteDe2s} respuestas={["bien", "lenta"]} />
      </Tarjeta>

      <Tarjeta
        n={5}
        estado="resuelto"
        nombre="usePortfolioConLimite"
        mirar="Límite: 2 s. Pulsa API: lenta: a los 2 s, el aviso «La API tardó demasiado». Con el starter espera los 5 s y pinta la portada. Con API: perfil roto, el aviso de Zod, como en el 04."
        campos="botones API: bien, API: lenta y API: perfil roto · PortadaConLimite: «Cargando…», el aviso o tu cabecera con la lista"
      >
        <ConApi Drill={PortadaConLimiteDe2s} respuestas={["bien", "lenta", "perfil roto"]} />
      </Tarjeta>

      <Tarjeta
        n="5a"
        estado="resuelto"
        nombre="PerfilAlMontar"
        mirar="Pulsa API: bien: «Cargando…» y, a los 0,6 s, tu nombre y tu rol. Con el starter se queda en «Cargando…» para siempre. Con API: sin red, el aviso «Failed to fetch»."
        campos="botones API: bien y API: sin red · PerfilAlMontar: «Cargando…», el aviso o tu perfil"
      >
        <ConApi Drill={PerfilAlMontar} respuestas={["bien", "sin red"]} />
      </Tarjeta>

      <Tarjeta
        n="5b"
        estado="resuelto"
        nombre="PerfilAlCerrar"
        mirar="Pulsa Abrir la sección y, antes de 2 s, Cerrar la sección. Abajo tienen que quedar 2 canceladas y 0 respondidas: una la cancela el ensayo de StrictMode nada más abrir. Con el starter, a los 2 s salen 2 respondidas, con la sección ya cerrada."
        campos="botones Abrir y Cerrar la sección · el componente · qué fue de las peticiones"
      >
        <ConCierre Drill={PerfilAlCerrar} />
      </Tarjeta>

      <Tarjeta
        n="5c"
        estado="resuelto"
        nombre="pedirLasDos"
        mirar="Pulsa Pedir las dos y cancelar: a los 0,5 s falla con AbortError y abajo tienen que quedar 2 canceladas. Con el starter, solo 1 cancelada, y a los 2 s el perfil sale respondido."
        campos="botón Pedir las dos y cancelar · con qué falló · qué fue de las dos peticiones"
      >
        <ProbarDosYCancelar />
      </Tarjeta>

      <Tarjeta
        n="5d"
        estado="resuelto"
        nombre="avisoDe"
        mirar="Pulsa Probar: tiene que salir [null, «La API tardó demasiado», «HTTP error — /api/projects:500», «Error desconocido»]: se fue, el reloj, un 500 y un texto suelto. Con el starter, el del reloj sale «signal timed out»."
        campos="botón Probar · lo que devuelve avisoDe en los cuatro casos"
      >
        <ProbarFuncion probar={casosDeAviso} />
      </Tarjeta>

      <Tarjeta
        n="5e"
        estado="resuelto"
        nombre="ListaConAvisos"
        mirar="Límite: 2 s. Pulsa API: lenta (tarda 5 s): a los 2 s tiene que salir el aviso «La API tardó demasiado». Con el starter se queda en «Cargando…» para siempre. Usa tu avisoDe del 5d."
        campos="botones API: bien y API: lenta · ListaConAvisos: «Cargando…», el aviso o la lista"
      >
        <ConApi Drill={ListaConAvisosDe2s} respuestas={["bien", "lenta"]} />
      </Tarjeta>

      <Tarjeta
        n="5f"
        estado="resuelto"
        nombre="useListaDeCero"
        mirar="Límite: 2 s. Con API: bien, «Cargando…» y después la lista; con API: lenta, a los 2 s el aviso «La API tardó demasiado». Con el starter se queda en «Cargando…» para siempre: el efecto está vacío."
        campos="botones API: bien y API: lenta · ListaDeCero: «Cargando…», el aviso o la lista"
      >
        <ConApi Drill={ListaDeCeroDe2s} respuestas={["bien", "lenta"]} />
      </Tarjeta>

      <Tarjeta
        n="5g"
        estado="resuelto"
        nombre="usePortadaDeCero"
        mirar="Límite: 2 s. API: bien, tu cabecera con la lista; API: lenta, a los 2 s «La API tardó demasiado»; API: perfil roto, el aviso de Zod. Con el starter se queda en «Cargando…» para siempre: el efecto está vacío."
        campos="botones API: bien, API: lenta y API: perfil roto · PortadaDeCero: «Cargando…», el aviso o tu cabecera con la lista"
      >
        <ConApi Drill={PortadaDeCeroDe2s} respuestas={["bien", "lenta", "perfil roto"]} />
      </Tarjeta>

      <Seccion archivo="exercise-06" titulo="El plan B: si falla en vivo, el snapshot." />

      <Tarjeta
        n={1}
        estado="resuelto"
        nombre="leerSnapshot"
        mirar="Pulsa API: bien: a los 0,3 s, el snapshot entero, con generatedAt, tu lista (Projex y Smart Cooler) y tu perfil. Con el starter falla con el error de Zod: esperaba una lista y llegó un objeto."
        campos="botones API: bien, API: 500 y sin snapshot y Pedir y cancelar · con qué termina o falla"
      >
        <ProbarCancelable probar={leerSnapshot} respuestas={["bien", "500 y sin snapshot"]} />
      </Tarjeta>

      <Tarjeta
        n={2}
        estado="resuelto"
        nombre="pedirConRespaldo"
        mirar="Pulsa API: 500: tienen que llegar los datos del snapshot (sin Store Pulse) con deRespaldo: true. Con el starter falla con «La API no contestó». Con API: bien, los de la API, con deRespaldo: false."
        campos="botones API: bien, API: 500 y Pedir y cancelar · con qué termina o falla"
      >
        <ProbarCancelable probar={pedirConRespaldo} respuestas={["bien", "500"]} />
      </Tarjeta>

      <Tarjeta
        n={3}
        estado="resuelto"
        nombre="cargarConRespaldo"
        mirar="Pulsa API: 500 y sin snapshot: tiene que salir «Apunta: error: HTTP error — /data-snapshot.json:404». Con el starter, «Falla sin apuntar»: el error se escapa. Con API: 500, «snapshot»; con API: bien, «en vivo»."
        campos="botones API: bien, API: 500, API: 500 y sin snapshot y Pedir y cancelar · lo que apunta"
      >
        <ProbarApuntes cargar={cargarConRespaldo} respuestas={["bien", "500", "500 y sin snapshot"]} />
      </Tarjeta>

      <Tarjeta
        n={4}
        estado="resuelto"
        nombre="pedirConLimiteYRespaldo"
        mirar="Límite: 2 s. Pulsa API: lenta (tarda 5 s): a los 2,3 s, los datos del snapshot con deRespaldo: true. Con el starter falla a los 2 s con TimeoutError. Cancelar a los 0,3 s: AbortError, sin snapshot."
        campos="botones API: bien, API: lenta y Cancelar a los 0,3 s · cuánto tardó y con qué terminó o falló"
      >
        <ProbarConLimites
          pruebas={[
            {
              etiqueta: "API: bien · límite 2 s",
              respuesta: "bien",
              probar: () => pedirConLimiteYRespaldo(new AbortController().signal, 2000),
            },
            {
              etiqueta: "API: lenta · límite 2 s",
              respuesta: "lenta",
              probar: () => pedirConLimiteYRespaldo(new AbortController().signal, 2000),
            },
            { etiqueta: "Cancelar a los 0,3 s · API: lenta", respuesta: "lenta", probar: respaldoYCancelarPronto },
          ]}
        />
      </Tarjeta>

      <Tarjeta
        n="4a"
        estado="resuelto"
        nombre="enVivoConReloj"
        mirar="Reloj: 2 s. Pulsa API: lenta (tarda 5 s): tiene que fallar a los 2 s con TimeoutError. Con el starter espera los 5 s y llegan tus datos. Cancelar a los 0,3 s ya funciona con el starter: ese es el otro motivo, el del 4b."
        campos="botones API: bien, API: lenta y Cancelar a los 0,3 s · cuánto tardó y con qué terminó o falló"
      >
        <ProbarConLimites
          pruebas={[
            {
              etiqueta: "API: bien · reloj 2 s",
              respuesta: "bien",
              probar: () => enVivoConReloj(new AbortController().signal, AbortSignal.timeout(2000)),
            },
            {
              etiqueta: "API: lenta · reloj 2 s",
              respuesta: "lenta",
              probar: () => enVivoConReloj(new AbortController().signal, AbortSignal.timeout(2000)),
            },
            {
              etiqueta: "Cancelar a los 0,3 s · API: lenta · reloj 10 s",
              respuesta: "lenta",
              probar: () => relojYCancelarPronto(enVivoConReloj),
            },
          ]}
        />
      </Tarjeta>

      <Tarjeta
        n="4b"
        estado="resuelto"
        nombre="enVivoConSalida"
        mirar="Pulsa Cancelar a los 0,3 s (API: lenta, reloj de 10 s): tiene que fallar a los 0,3 s con AbortError. Con el starter espera los 5 s y llegan tus datos. API: lenta con el reloj de 2 s ya funciona con el starter: ese es el motivo del 4a."
        campos="botones API: bien, API: lenta y Cancelar a los 0,3 s · cuánto tardó y con qué terminó o falló"
      >
        <ProbarConLimites
          pruebas={[
            {
              etiqueta: "API: bien · reloj 2 s",
              respuesta: "bien",
              probar: () => enVivoConSalida(new AbortController().signal, AbortSignal.timeout(2000)),
            },
            {
              etiqueta: "API: lenta · reloj 2 s",
              respuesta: "lenta",
              probar: () => enVivoConSalida(new AbortController().signal, AbortSignal.timeout(2000)),
            },
            {
              etiqueta: "Cancelar a los 0,3 s · API: lenta · reloj 10 s",
              respuesta: "lenta",
              probar: () => relojYCancelarPronto(enVivoConSalida),
            },
          ]}
        />
      </Tarjeta>

      <Tarjeta
        n="4c"
        estado="resuelto"
        nombre="respaldoConLaQueQueda"
        mirar="Reloj: 2 s. Pulsa API: lenta: a los 2,3 s, los datos del snapshot (sin Store Pulse). Cancelar a los 2,15 s, con el snapshot a medias: AbortError. Con el starter, los dos fallan a los 2 s con TimeoutError: el snapshot ni sale."
        campos="botones API: bien, API: lenta y Cancelar a los 2,15 s · cuánto tardó y con qué terminó o falló"
      >
        <ProbarConLimites
          pruebas={[
            { etiqueta: "API: bien · reloj 2 s", respuesta: "bien", probar: () => respaldoConLaQueQuedaDe2s() },
            { etiqueta: "API: lenta · reloj 2 s", respuesta: "lenta", probar: () => respaldoConLaQueQuedaDe2s() },
            {
              etiqueta: "Cancelar a los 2,15 s · API: lenta",
              respuesta: "lenta",
              probar: () => respaldoConLaQueQuedaDe2s(2150),
            },
          ]}
        />
      </Tarjeta>

      <Tarjeta
        n="5a"
        estado="resuelto"
        nombre="usePerfilConRespaldo"
        mirar="Pulsa API: 500: tu nombre y tu rol, sacados del snapshot. API: 500 y sin snapshot: el aviso con el 404. Con el starter, API: 500 enseña «HTTP error — /api/profile:500»."
        campos="botones API: bien, API: 500 y API: 500 y sin snapshot · PerfilConRespaldo: «Cargando…», el aviso o tu perfil"
      >
        <ConApi Drill={PerfilConRespaldo} respuestas={["bien", "500", "500 y sin snapshot"]} />
      </Tarjeta>

      <Tarjeta
        n="5b"
        estado="resuelto"
        nombre="cargarConGuardias"
        mirar="Pulsa API: 500 y cancelar a los 0,75 s: la API falla a los 0,6 s y cancelas con el snapshot a medias. Tiene que salir «Apunta: nada». Con el starter, «Apunta: error: …» con el mensaje de la cancelación."
        campos="botones API: bien, API: 500, API: 500 y sin snapshot y API: 500 y cancelar · lo que apunta"
      >
        <ProbarApuntes
          cargar={cargarConGuardias}
          respuestas={["bien", "500", "500 y sin snapshot"]}
          cancelarCon={{ respuesta: "500", ms: 750 }}
        />
      </Tarjeta>

      <Tarjeta
        n="5c"
        estado="resuelto"
        nombre="useListaConRespaldo"
        mirar="Pulsa API: 500: tu lista del snapshot (sin Store Pulse) con el aviso «Datos del último deploy». Con el starter sale «La API no contestó». Con API: bien, tu lista entera y sin aviso."
        campos="botones API: bien y API: 500 · ListaConRespaldo: «Cargando…», el aviso o tu lista"
      >
        <ConApi Drill={ListaConRespaldo} respuestas={["bien", "500"]} />
      </Tarjeta>

      <Tarjeta
        n={5}
        estado="resuelto"
        nombre="usePortfolioConRespaldo"
        mirar="Límite: 2 s. API: lenta o API: 500: tu portada con el aviso «Datos del último deploy» y sin Store Pulse. API: 500 y sin snapshot: el aviso con el 404. Con el starter, API: 500 enseña el error en vez del snapshot."
        campos="botones API: bien, API: lenta, API: 500 y API: 500 y sin snapshot · PortadaConRespaldo: «Cargando…», el aviso o tu portada"
      >
        <ConApi Drill={PortadaConRespaldoDe2s} respuestas={["bien", "lenta", "500", "500 y sin snapshot"]} />
      </Tarjeta>

      <Seccion archivo="exercise-07" titulo="La ciudad vieja: ignorar su respuesta o cancelarla." />

      <Tarjeta
        n={1}
        estado="resuelto"
        nombre="useTemperaturaConBandera"
        mirar="Pulsa Santiago y enseguida Valparaíso: se queda «17 °C», y a los 2,5 s no cambia. Con el starter, a los 2,5 s llega Santiago y pone «24 °C». Abajo verás que, aun arreglado, Santiago no se cancela: la bandera solo tira su respuesta."
        campos="botones Santiago (tarda 2,5 s), Valparaíso (tarda 0,4 s) y Cerrar · la temperatura · las peticiones a Open-Meteo"
      >
        <ConCiudades Drill={TemperaturaConBandera} />
      </Tarjeta>

      <Tarjeta
        n={2}
        estado="resuelto"
        nombre="useTemperaturaConRef"
        mirar="Lo mismo que el 1: Santiago y enseguida Valparaíso, y se queda «17 °C». Con el starter, a los 2,5 s Santiago pone «24 °C» aunque la bandera se mira después del await."
        campos="botones Santiago (tarda 2,5 s), Valparaíso (tarda 0,4 s) y Cerrar · la temperatura · las peticiones a Open-Meteo"
      >
        <ConCiudades Drill={TemperaturaConRef} />
      </Tarjeta>

      <Tarjeta
        n={3}
        estado="resuelto"
        nombre="useTemperaturaCancelable"
        mirar="Santiago y enseguida Valparaíso: se queda «17 °C», y abajo las de Santiago salen canceladas en el momento del cambio (en pnpm dev también la del ensayo). Con el starter, ninguna se cancela y a los 2,5 s Santiago pone «24 °C»."
        campos="botones Santiago (tarda 2,5 s), Valparaíso (tarda 0,4 s) y Cerrar · la temperatura · las peticiones a Open-Meteo"
      >
        <ConCiudades Drill={TemperaturaCancelable} />
      </Tarjeta>

      <Tarjeta
        n={4}
        estado="resuelto"
        nombre="useTemperaturaConLasDos"
        mirar="Santiago y enseguida Valparaíso: se queda «17 °C» también con el starter. La diferencia está abajo: con el starter, 0 canceladas y Santiago responde a los 2,5 s; arreglado, las de Santiago salen canceladas."
        campos="botones Santiago (tarda 2,5 s), Valparaíso (tarda 0,4 s) y Cerrar · la temperatura · las peticiones a Open-Meteo"
      >
        <ConCiudades Drill={TemperaturaConLasDos} />
      </Tarjeta>

      <Tarjeta
        n={5}
        estado="resuelto"
        nombre="useClima"
        mirar="Santiago y enseguida Valparaíso: «17 °C», sin aviso, y las de Santiago canceladas. Open-Meteo: 500: el aviso «No fue posible obtener el clima». Con el starter, «Cargando…» para siempre."
        campos="botones Santiago (tarda 2,5 s), Valparaíso (tarda 0,4 s), Open-Meteo: 500 y Cerrar · TarjetaClima: «Cargando…», el aviso o la temperatura · las peticiones a Open-Meteo"
      >
        <ConCiudades Drill={TarjetaClima} conCaida />
      </Tarjeta>

      <Seccion archivo="exercise-08" titulo="«Reintentar»: repetir el efecto a mano." />

      <Tarjeta
        n={1}
        estado="resuelto"
        nombre="useRastroDeIntentos"
        mirar="Pulsa Montar: el rastro dice «pide» (dos veces en pnpm dev, por el ensayo). Cada «Reintentar» tiene que añadir otro «pide». Con el starter no añade nada."
        campos="botón Montar · el botón Reintentar del drill · el rastro"
      >
        <ConIntentos Drill={RastroDeIntentos} />
      </Tarjeta>

      <Tarjeta
        n={2}
        estado="resuelto"
        nombre="useRastroQueNoEscucha"
        mirar="Lo mismo que el 1: cada «Reintentar» añade un «pide» al rastro. Con el starter, intento sube pero el rastro no cambia."
        campos="botón Montar · el botón Reintentar del drill · el rastro"
      >
        <ConIntentos Drill={RastroQueNoEscucha} />
      </Tarjeta>

      <Tarjeta
        n={3}
        estado="resuelto"
        nombre="useClimaConAvisoPegado"
        mirar="Pulsa Open-Meteo: falla 1 vez: sale el aviso con «Reintentar». Púlsalo: a los 0,4 s, «17 °C». Con el starter, el aviso no se va aunque la temperatura llegó."
        campos="botón Open-Meteo: falla 1 vez · TarjetaReintentable: «Cargando…», el aviso con Reintentar o la temperatura · las peticiones a Open-Meteo"
      >
        <ConFallos Drill={ClimaConAvisoPegado} fallos={[1]} />
      </Tarjeta>

      <Tarjeta
        n={4}
        estado="resuelto"
        nombre="useClimaSinEspera"
        mirar="Open-Meteo: falla 1 vez, y «Reintentar»: enseguida «Cargando…», y a los 0,4 s «17 °C». Con el starter, el aviso sigue ahí hasta que llega la temperatura."
        campos="botón Open-Meteo: falla 1 vez · TarjetaReintentable: «Cargando…», el aviso con Reintentar o la temperatura · las peticiones a Open-Meteo"
      >
        <ConFallos Drill={ClimaSinEspera} fallos={[1]} />
      </Tarjeta>

      <Tarjeta
        n={5}
        estado="resuelto"
        nombre="useClimaConReintento"
        mirar="Open-Meteo: falla 2 veces: el aviso, «Reintentar», «Cargando…», el aviso otra vez, «Reintentar» y «17 °C». Con el starter, «Cargando…» para siempre."
        campos="botones Open-Meteo: falla 1 vez y falla 2 veces · TarjetaClimaConReintento · las peticiones a Open-Meteo"
      >
        <ConFallos Drill={ClimaConReintentoEnValparaiso} fallos={[1, 2]} />
      </Tarjeta>

      <Seccion archivo="exercise-09" titulo="El polling: volver a pedir solo." />

      <Tarjeta
        n={1}
        estado="resuelto"
        nombre="useTicQueNoPara"
        mirar="Pulsa Montar: el rastro suma un «tic» por segundo, y Desmontar lo para. Con el starter, en pnpm dev suma dos por segundo (el ensayo dejó un intervalo vivo), y al desmontar sigue sumando."
        campos="botones Montar y Desmontar · el rastro"
      >
        <ConTics Drill={TicQueNoPara} />
      </Tarjeta>

      <Tarjeta
        n={2}
        estado="resuelto"
        nombre="useTicQueNoArranca"
        mirar="Lo mismo que el 1: un «tic» por segundo hasta que pulsas Desmontar. Con el starter, el rastro se queda en 0."
        campos="botones Montar y Desmontar · el rastro"
      >
        <ConTics Drill={TicQueNoArranca} />
      </Tarjeta>

      <Tarjeta
        n={3}
        estado="resuelto"
        nombre="useSegundos"
        mirar="Pulsa Montar: 0 s, 1 s, 2 s, 3 s… Con el starter se queda en 1 s."
        campos="botones Montar y Desmontar · la cuenta"
      >
        <ConMontaje Drill={Segundos} />
      </Tarjeta>

      <Tarjeta
        n="4a"
        estado="resuelto"
        nombre="useRelojQueSeQueda"
        mirar="Pulsa Santiago: «pido Santiago» cada segundo. Pulsa Valparaíso: desde ahí, solo «pido Valparaíso». Con el starter, el rastro intercala las dos ciudades (y en pnpm dev, cada una dos veces: el ensayo dejó otro reloj vivo)."
        campos="botones Santiago, Valparaíso y Cerrar · el rastro, con las últimas ocho líneas"
      >
        <ConRelojDeCiudad Drill={RelojQueSeQueda} />
      </Tarjeta>

      <Tarjeta
        n="4b"
        estado="resuelto"
        nombre="useClimaQueLlegaTarde"
        mirar="Pide una sola vez, sin reloj. Pulsa Santiago y, antes de 2,5 s, Valparaíso: 17 °C, y ahí se queda. Con el starter, sale 17 °C y a los 2,5 s lo pisa Santiago con 24 °C."
        campos="botones Santiago (tarda 2,5 s), Valparaíso (tarda 0,4 s) y Cerrar · la temperatura · las peticiones a Open-Meteo"
      >
        <ConCiudades Drill={TemperaturaQueLlegaTarde} />
      </Tarjeta>

      <Tarjeta
        n="4c"
        estado="resuelto"
        nombre="useClimaQueSeCruza"
        mirar="Vuelve a pedir cada 3 s, y cada respuesta trae 1 °C más. Pulsa Santiago y, antes de 2,5 s, Valparaíso: solo Valparaíso. Con el starter, sale Valparaíso, a los 2,5 s lo pisa Santiago con 24 °C, y a la vuelta siguiente vuelve Valparaíso."
        campos="botones Santiago (tarda 2,5 s), Valparaíso (tarda 0,4 s) y Cerrar · la temperatura · las peticiones a Open-Meteo · las llamadas a fetch por ciudad"
      >
        <ConPolling Drill={GradosQueSeCruzan} />
      </Tarjeta>

      <Tarjeta
        n={4}
        estado="resuelto"
        nombre="useClimaQueSigue"
        mirar="Vuelve a pedir cada 3 s, y cada respuesta trae 1 °C más. Pulsa Santiago y luego Valparaíso: las llamadas a Santiago dejan de subir. Con el starter siguen subiendo cada 3 s (de dos en dos en pnpm dev), aunque nacen canceladas."
        campos="botones Santiago (tarda 2,5 s), Valparaíso (tarda 0,4 s) y Cerrar · la temperatura · las peticiones a Open-Meteo · las llamadas a fetch por ciudad"
      >
        <ConPolling Drill={GradosQueSiguen} />
      </Tarjeta>

      <Tarjeta
        n="5a"
        estado="resuelto"
        nombre="useClimaConAvisoQueNoSeVa"
        mirar="Pulsa Valparaíso y, cuando salga la temperatura, «Que falle la próxima»: el aviso, y a la vuelta siguiente vuelve la temperatura. Con el starter, el aviso se queda para siempre."
        campos="botones Santiago (tarda 2,5 s), Valparaíso (tarda 0,4 s), Que falle la próxima y Cerrar · el aviso o la temperatura · las peticiones a Open-Meteo · las llamadas a fetch por ciudad"
      >
        <ConPolling Drill={ClimaConAvisoQueNoSeVa} conFallo />
      </Tarjeta>

      <Tarjeta
        n="5b"
        estado="resuelto"
        nombre="useClimaConFalsaAlarma"
        mirar="Pulsa Santiago y, antes de 2,5 s, Valparaíso: «Cargando…» y después Valparaíso, sin aviso. Con el starter sale el aviso aunque nada falló: al cambiar de ciudad, hasta que llega Valparaíso (y en pnpm dev, también nada más montar, por el ensayo)."
        campos="botones Santiago (tarda 2,5 s), Valparaíso (tarda 0,4 s) y Cerrar · el aviso o la temperatura · las peticiones a Open-Meteo · las llamadas a fetch por ciudad"
      >
        <ConPolling Drill={ClimaConFalsaAlarma} />
      </Tarjeta>

      <Tarjeta
        n="5c"
        estado="resuelto"
        nombre="useClimaConMandoPorVuelta"
        mirar="Pulsa Santiago y, antes de 2,5 s, Valparaíso: solo Valparaíso. Con el starter, como en el 4c: a los 2,5 s lo pisa Santiago con 24 °C."
        campos="botones Santiago (tarda 2,5 s), Valparaíso (tarda 0,4 s) y Cerrar · el aviso o la temperatura · las peticiones a Open-Meteo · las llamadas a fetch por ciudad"
      >
        <ConPolling Drill={ClimaConMandoPorVuelta} />
      </Tarjeta>

      <Tarjeta
        n={5}
        estado="resuelto"
        nombre="useClimaQueSeRefresca"
        mirar="Como el 4: «Cargando…», la temperatura y 1 °C más cada 3 s. «Que falle la próxima»: el aviso, y a la vuelta siguiente vuelve la temperatura. Cerrar: las llamadas dejan de subir. Con el starter, «Cargando…» para siempre."
        campos="botones Santiago (tarda 2,5 s), Valparaíso (tarda 0,4 s), Que falle la próxima y Cerrar · TarjetaClimaQueSeRefresca · las peticiones a Open-Meteo · las llamadas a fetch por ciudad"
      >
        <ConPolling Drill={ClimaQueSeRefresca} conFallo />
      </Tarjeta>

      <Seccion archivo="exercise-10" titulo="Tu useWeather, tipado." />

      <Tarjeta
        n={1}
        nombre="HorasSchema"
        mirar="«Con is_day» y «Sin is_day» devuelven las horas tal cual. «is_day con textos» falla y dice en qué campo. Con el starter, «Sin is_day» también falla, en is_day."
        campos="un botón por caso · lo que devuelve el parse, o su error"
      >
        <ProbarCasos
          casos={[
            { etiqueta: "Con is_day", probar: () => HorasSchema.parse(HORAS_CON_IS_DAY) },
            {
              etiqueta: "Sin is_day",
              probar: () =>
                HorasSchema.parse({ time: HORAS_CON_IS_DAY.time, temperature_2m: HORAS_CON_IS_DAY.temperature_2m }),
            },
            {
              etiqueta: "is_day con textos",
              probar: () => HorasSchema.parse({ ...HORAS_CON_IS_DAY, is_day: ["sí", "no"] }),
            },
          ]}
        />
      </Tarjeta>

      <Tarjeta
        n={2}
        nombre="temperaturaDe"
        mirar="Con [21.4, 22.9]: la hora 1 da 23 y la hora 5, null. Con [0, 22.9], la hora 0 da 0. Con el starter, la hora 5 da NaN."
        campos="un botón por caso · lo que devuelve"
      >
        <ProbarCasos
          casos={[
            { etiqueta: "Hora 1 de [21.4, 22.9]", probar: () => temperaturaDe([21.4, 22.9], 1) },
            { etiqueta: "Hora 5 de [21.4, 22.9]", probar: () => temperaturaDe([21.4, 22.9], 5) },
            { etiqueta: "Hora 0 de [0, 22.9]", probar: () => temperaturaDe([0, 22.9], 0) },
          ]}
        />
      </Tarjeta>

      <Tarjeta
        n={3}
        nombre="armarPronostico"
        mirar="«Completo»: los tres días, con su mínima y su máxima redondeadas. «Sin la última máxima»: solo los dos primeros. Con el starter salen los tres, y el último con max: NaN."
        campos="un botón por caso · lo que devuelve"
      >
        <ProbarCasos
          casos={[
            { etiqueta: "Completo", probar: () => armarPronostico(DIAS_DE_MENTIRA) },
            {
              etiqueta: "Sin la última máxima",
              probar: () => armarPronostico({ ...DIAS_DE_MENTIRA, temperature_2m_max: [24.2, 26.8] }),
            },
          ]}
        />
      </Tarjeta>

      <Tarjeta
        n={4}
        nombre="esDeDia"
        mirar="is_day solo trae las horas 0 y 1. Hora 0 (is_day 1): true. Hora 1 (is_day 0, a las 13:00): false. Hora 2 (10:00): true. Hora 3 (22:00): false. Con el starter, la hora 2 da false."
        campos="un botón por hora · lo que devuelve"
      >
        <ProbarCasos
          casos={[0, 1, 2, 3].map((i) => ({ etiqueta: `Hora ${i}`, probar: () => esDeDia(HORAS_CORTAS, i) }))}
        />
      </Tarjeta>

      <Tarjeta
        n={5}
        nombre="useWeather"
        mirar="Valparaíso: «Cargando…», la temperatura, el aire y los días, y 1 °C más cada 3 s. Santiago tarda 2,5 s en el clima y 1,5 s más en el aire: pulsa Valparaíso entre medias, y su aire sale cancelado. «Que falle la próxima»: el aviso con «Reintentar». Con el starter, «Cargando…» para siempre."
        campos="botones Santiago, Valparaíso, Que falle la próxima y Cerrar · TarjetaWeather · las peticiones al clima y al aire · las llamadas a fetch por ciudad"
      >
        <ConPolling Drill={WeatherAlDia} conFallo conAire />
      </Tarjeta>
    </>
  );
}
