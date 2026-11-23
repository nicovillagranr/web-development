import { useEffect, useState } from "react";
import { z } from "zod";

/* =============================================================================
 * EJERCICIO 08 — «Reintentar»: repetir el efecto a mano · bloque 13
 *
 * 📌 RECORDATORIO — del 07: el controller vive en el efecto, la limpieza lo aborta
 * y su signal.aborted calla el catch. Del 06: cada camino deja el estado tal como
 * se pinta, y el render pregunta primero por el error.
 *
 * 🎯 OBJETIVOS
 * · Repetir un efecto a mano con un contador que solo está en sus deps.
 * · Cambiar el contador de forma que React note el cambio.
 * · Dejar el estado listo para pintar al empezar y al acabar cada intento.
 *
 * 🟢 CONTEXTO — si Open-Meteo falla, tu tarjeta del clima se queda con el aviso
 * para siempre: el efecto solo se repite si cambian lat o lon. Tu useWeather lo
 * arregla con refreshTick, un contador que está en las deps, y refresh, la función
 * que lo sube (l.167, 258 y 289 de useWeather.jsx).
 *
 * 🗺️ MAPA
 * TEORÍA 1 · el contador en las deps → drills 1–2
 * TEORÍA 2 · cada intento deja el estado listo para pintar → drills 3–4
 * TU HOOK → drill 5
 *
 * ▸ 5 drills en orden. Prohibidos el tipo any, as, el ! de «confía en mí» (x!) y
 * los eslint-disable.
 * pnpm test:run src/exercises/13-fetch-tipado/exercise-08.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito: ejecuta los tres comandos. Contesta cada
 * ¿Por qué? en la línea libre de debajo.
 * Pistas: exercise-08.pistas.md. Drills 1–5: banco, pestaña 13.
 * ============================================================================= */

/* Lo mismo que en el 07: el clima de Open-Meteo, recortado, y la función que pide la
 * temperatura de lat y lon con el signal que recibe. Si algo falla, lanza. */
export const ClimaSchema = z.object({
  current_weather: z.object({ temperature: z.number(), weathercode: z.number() }),
});

export const API_CLIMA = "https://api.open-meteo.com/v1/forecast";

async function pedirTemperatura(lat: number, lon: number, signal: AbortSignal): Promise<number> {
  const res = await fetch(`${API_CLIMA}?latitude=${lat}&longitude=${lon}&current_weather=true`, {
    signal,
  });
  if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
  const data: unknown = await res.json();
  return Math.round(ClimaSchema.parse(data).current_weather.temperature);
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el contador en las deps
 *
 * DEFINICIÓN
 * Un efecto solo vuelve a correr cuando cambia algo de sus deps. Para repetirlo a
 * mano se le pone en las deps un contador que existe solo para eso, y una función
 * que lo sube. React compara con lo que ya había: si le das a un set el mismo
 * valor que ya tiene, no vuelve a pintar, y el efecto tampoco corre.
 *
 * SINTAXIS — volver a pedir la ficha del proyecto:
 * const [vez, setVez] = useState(0);
 * useEffect(() => {
 *   // … pedir la ficha con su controller, como siempre
 * }, [id, vez]); // vez no se usa dentro: está para repetir
 * const recargar = () => setVez((anterior) => anterior + 1);
 *
 * 🧠 ANALOGÍA — el efecto es un vigilante que solo actúa si cambia algo de su
 * lista. El contador es un papel que pones en esa lista para cambiarlo tú: cada
 * clic, un número nuevo. Volver a escribir el mismo número no cuenta.
 *
 * 🗣️ LAS PIEZAS
 * refreshTick → el contador de tu useWeather (l.167). Está en las deps, no dentro.
 * refresh     → tu función que lo sube (l.289).
 * intento     → el contador de este archivo; reintentar, la función.
 *
 * ⚠️ TRAMPA — el linter no avisa si intento falta en las deps: solo pide lo que el
 * efecto usa dentro, y intento no se usa dentro.
 *
 * 💡 Tu useWeather envuelve refresh en useCallback, para que sea la misma función
 * en cada render. Aquí no hace falta, porque ninguna deps la recibe, y no se usa.
 * ───────────────────────────────────────────────────────────────────────────── */

/* Lo que reciben los drills 1 y 2: apunta una línea, como el rastro del 02. */
type Apuntar = (linea: string) => void;

/* 1) useRastroDeIntentos — su efecto apunta «pide» cada vez que corre, y la función
 * que devuelve, reintentar, lo vuelve a correr. Ahora reintentar no hace nada.
 * ¿Por qué? En el starter, cuando pulsas «Reintentar», ¿con qué valor llamas a
 * setIntento, y qué hace React con él?
 * Es que setIntento(intento) no hace nada, React pinta lo mismo. Por eso mi primer
 * intuición al hacer el drill fue setIntento(intento + 1) ya que el useSate usa un type number.
 */
export function useRastroDeIntentos(apuntar: Apuntar): () => void {
  // Seteamos el estado inicial de intentos en 0
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    apuntar("pide");
  }, [apuntar, intento]);

  return () => {
    setIntento(intento + 1);
  };
}

/* 2) useRastroQueNoEscucha — lo mismo que el 1. Ahora intento sube en cada clic,
 * pero el efecto no vuelve a apuntar «pide».
 * ¿Por qué? En el starter, intento cambia en cada clic. ¿Por qué no corre el
 * efecto?
 * El efecto no corre porque intento no forma parte del array de dependencias
 */
export function useRastroQueNoEscucha(apuntar: Apuntar): () => void {
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    apuntar("pide");
  }, [intento, apuntar]);
  return () => setIntento(intento + 1);
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — cada intento deja el estado listo para pintar
 *
 * DEFINICIÓN
 * Un intento empieza con un clic y acaba con una respuesta. Lo que cambia por el
 * clic va en el manejador del clic: cargando a true. Lo que cambia por la
 * respuesta va al llegar: los datos o el aviso, y cargando a false. Si un camino
 * no borra lo que dejó el intento anterior, se queda pegado.
 *
 * SINTAXIS — la ficha del proyecto, con «Recargar»:
 * function recargar() {
 *   setCargando(true); // por el clic: se ve ya
 *   setVez((anterior) => anterior + 1);
 * }
 * // en cargar, cuando llega la ficha:
 * setProyecto(proyecto);
 * setError(null); // borra el aviso del intento anterior
 * setCargando(false);
 *
 * 🧠 ANALOGÍA — llamas a alguien y no contesta: apuntas «no contesta» en un
 * post-it. Si a la segunda contesta, el post-it se tira; si no, sigues creyendo
 * que no contesta.
 *
 * ⚠️ TRAMPA — poner cargando a true en el cuerpo del efecto: el lint de React lo
 * marca, porque obliga a pintar dos veces cada vez que el efecto corre.
 * ───────────────────────────────────────────────────────────────────────────── */

/* Lo que devuelve cada hook de los drills 3–5. */
export type ClimaReintentable = {
  grados: number | null;
  cargando: boolean;
  error: string | null;
  reintentar: () => void;
};

/* La tarjeta de los drills 3–5: recibe lo que devuelve el hook. Mientras carga,
 * «Cargando…»; si falló, el aviso y el botón «Reintentar»; si no, la temperatura.
 * Ya está bien. */
export function TarjetaReintentable({ grados, cargando, error, reintentar }: ClimaReintentable) {
  if (cargando) return <p>Cargando…</p>;
  if (error) {
    return (
      <div>
        <p role="alert">{error}</p>
        <button type="button" onClick={reintentar}>
          Reintentar
        </button>
      </div>
    );
  }
  return <p>{grados} °C</p>;
}

/* 3) useClimaConAvisoPegado — la tarjeta enseña la temperatura de lat y lon. Si
 * Open-Meteo falla, el aviso «No fue posible obtener el clima» con «Reintentar», y
 * si el reintento sale bien, la temperatura. Ahora el reintento sale bien y sigues
 * viendo el aviso.
 * ¿Por qué? En el starter, cuando llega la temperatura del reintento, ¿qué vale
 * error, y qué pregunta primero la tarjeta?
 * Nadie limpió el error del primer intento: sigue valiendo «No fue posible obtener el
 * clima» aunque la temperatura llegue bien. Y la tarjeta pinta solo el aviso, porque
 * if (error) se pregunta antes y hace return: nunca llega a {grados}.
 */
export function useClimaConAvisoPegado(lat: number, lon: number): ClimaReintentable {
  // Seteamos el estado inicial de los grados como null, a la espera de que se cargue la temperatura
  const [grados, setGrados] = useState<number | null>(null);
  // Seteamos el estado inicial de cargando como true, ya que al inicio estamos cargando la temperatura
  const [cargando, setCargando] = useState(true);
  // Seteamos el estado inicial de error como null, ya que al inicio no hay ningún error
  const [error, setError] = useState<string | null>(null);
  // Seteamos el estado inicial de intento como 0, que se usará para reintentar la carga de la temperatura
  const [intento, setIntento] = useState(0);

  // Una vez montado el componente, se ejecuta el efecto que carga la temperatura
  useEffect(() => {
    // Creamos un AbortController para poder cancelar la petición si el componente se desmonta o si se hace un reintento
    const controller = new AbortController();

    async function cargar() {
      try {
        // Hacemos la petición a la API usando el molde pedirTemperatura y pasamos la señal del controller para poder abortarla si es necesario
        setGrados(await pedirTemperatura(lat, lon, controller.signal));
        // Si es segunda petición, limpiamos cualquier error previo para que no se quede pegado el aviso
        setError(null);
      } catch {
        if (controller.signal.aborted) return;
        setError("No fue posible obtener el clima");
      }
      //Su comportamiento es parecido al de un finally:
      // - Si la petición funciona, termina el try y ejecuta setCargando(false).
      // - Si la petición falla, ejecuta el catch y después ejecuta setCargando(false).
      setCargando(false);
    }

    cargar();
    return () => controller.abort();
  }, [lat, lon, intento]);

  function reintentar() {
    setIntento(intento + 1);
  }

  return { grados, cargando, error, reintentar };
}

/* 4) useClimaSinEspera — como el 3, y al pulsar «Reintentar» se ve «Cargando…»
 * hasta que llega la respuesta. Ahora, mientras tanto, sigue el aviso con su
 * botón, como si no hubieras pulsado nada.
 * ¿Por qué? En el starter, desde el clic hasta que llega la respuesta, ¿cuánto vale
 * cargando?
 * Cargando vale false: en el starter nadie le escribe entre el clic y la respuesta,
 * así que sigue en false desde el setCargando(false) del primer intento.
 * En mi arreglo moví setCargando(true) al reintentar, para que se vea «Cargando…» mientras llega la respuesta.
 */
export function useClimaSinEspera(lat: number, lon: number): ClimaReintentable {
  const [grados, setGrados] = useState<number | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function cargar() {
      try {
        setGrados(await pedirTemperatura(lat, lon, controller.signal));
        setError(null);
      } catch {
        if (controller.signal.aborted) return;
        setError("No fue posible obtener el clima");
      }
      setCargando(false);
    }

    cargar();
    return () => controller.abort();
  }, [lat, lon, intento]);

  function reintentar() {
    setIntento((anterior) => anterior + 1);
    setCargando(true);
  }

  return { grados, cargando, error, reintentar };
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TU HOOK — tu useWeather con «Reintentar»
 *
 * El fetch del 07 con el contador en las deps, la función que lo sube y el estado
 * de cada intento. Es lo que hacen refreshTick y refresh en tu useWeather.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 5) useClimaConReintento — TarjetaClimaConReintento enseña la temperatura de lat y
 * lon, con «Cargando…» mientras pide. Si Open-Meteo falla, el aviso con
 * «Reintentar», que vuelve a pedir; si cambias de ciudad, la vieja se cancela sin
 * aviso. Es tu useClima del 07 con reintento, desde una función vacía.
 * TarjetaClimaConReintento ya está bien.
 * ¿Por qué? Con tu arreglo, si pulsas «Reintentar» y cambias de ciudad antes de que
 * conteste, ¿quién corta la petición del reintento?
 * El efecto corta la petición del reintento, porque el controller está dentro del efecto y la limpieza lo aborta. El reintento sube el contador, que hace que el efecto vuelva a correr y cree un nuevo controller.
 * El viejo controller lo aborta la limpieza, que React corre porque cambiaron lat y lon:
 * no se desmonta nada.
 */
export function useClimaConReintento(lat: number, lon: number): ClimaReintentable {
  // Seteamos el estado inicial de los grados como null, a la espera de que se cargue la temperatura
  const [grados, setGrados] = useState<number | null>(null);
  // Seteamos el estado inicial de cargando como true, ya que al inicio estamos cargando la temperatura
  const [cargando, setCargando] = useState(true);
  // Seteamos el estado inicial de error como null, ya que al inicio no hay ningún error
  const [error, setError] = useState<string | null>(null);
  // Seteamos el estado inicial de intento como 0, que se usará para reintentar la carga de la temperatura
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function cargar() {
      try {
        setGrados(await pedirTemperatura(lat, lon, controller.signal));
        setError(null);
      } catch {
        if (controller.signal.aborted) return;
        setError("No fue posible obtener el clima");
      }
      setCargando(false);
    }

    cargar();
    return () => controller.abort();
  }, [lat, lon, intento]);

  function reintentar() {
    // Aquí subimos el contador de intentos para que el efecto vuelva a correr y haga la petición de nuevo
    setIntento((anterior) => anterior + 1);
    // También ponemos cargando a true para que se vea el mensaje de "Cargando..." mientras llega la respuesta
    setCargando(true);
  }

  return { grados, cargando, error, reintentar };
}

export function TarjetaClimaConReintento({ lat, lon }: { lat: number; lon: number }) {
  return <TarjetaReintentable {...useClimaConReintento(lat, lon)} />;
}
