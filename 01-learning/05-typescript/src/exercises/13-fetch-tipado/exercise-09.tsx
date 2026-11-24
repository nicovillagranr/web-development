import { useEffect, useState } from "react";
import { z } from "zod";

/* =============================================================================
 * EJERCICIO 09 — el polling: volver a pedir solo · bloque 13
 *
 * 📌 RECORDATORIO — del 08: el efecto se repite cuando cambia algo de sus deps.
 * Del 07: el controller vive en el efecto y la limpieza lo aborta.
 *
 * 🎯 OBJETIVOS
 * · Arrancar un intervalo en un efecto y pararlo en su limpieza.
 * · Leer el estado más nuevo desde un intervalo que nació en el primer render.
 * · Pedir cada cierto tiempo y, al cambiar de ciudad, parar el intervalo y la petición.
 *
 * 🟢 CONTEXTO — tu useWeather tiene dos relojes: uno corre cada 60 s para saber la
 * hora (l.172-179), y el otro vuelve a pedir el clima cada refreshMinutes
 * (l.250-256). Los dos son un setInterval dentro de un efecto, y los dos se paran
 * en la limpieza.
 *
 * 🗺️ MAPA
 * TEORÍA 1 · el intervalo vive en el efecto → drills 1–3
 * TEORÍA 2 · el intervalo que pide → drill 4
 * ESCALERA · lo que deja vivo cada ciudad → peldaños 4a–4c, antes del 4
 * ESCALERA · tu hook del 5, pieza a pieza → peldaños 5a–5c, antes del 5
 * TU HOOK → drill 5
 *
 * ▸ 5 drills en orden. Prohibidos el tipo any, as, el ! de «confía en mí» (x!) y
 * los eslint-disable.
 * pnpm test:run src/exercises/13-fetch-tipado/exercise-09.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito: ejecuta los tres comandos. Contesta cada
 * ¿Por qué? en la línea libre de debajo.
 * Pistas: exercise-09.pistas.md. Drills 1–5 y peldaños: banco, pestaña 13.
 * ============================================================================= */

/* Lo mismo que en el 08: el clima de Open-Meteo, recortado, y la función que pide la
 * temperatura de lat y lon con el signal que recibe. Si algo falla, lanza. */
export const ClimaSchema = z.object({
  current_weather: z.object({ temperature: z.number(), weathercode: z.number() }),
});

export const API_CLIMA = "https://api.open-meteo.com/v1/forecast";

// Pedir temperatura es un hook que devuelve una promesa de número, o lanza un error si algo falla. El signal sirve para abortar la petición si el componente se desmonta o cambia de ciudad.
async function pedirTemperatura(lat: number, lon: number, signal: AbortSignal): Promise<number> {
  // Hacemos el llamado a la API con 4 parámetros: latitud, longitud, current_weather y signal. Si la respuesta no es ok, lanzamos un error con el status. Si la respuesta es ok, parseamos los datos con ClimaSchema y devolvemos la temperatura redondeada.
  const res = await fetch(`${API_CLIMA}?latitude=${lat}&longitude=${lon}&current_weather=true`, {
    signal,
  });
  if (!res.ok) {
    throw new Error(`Weather API error: ${res.status}`);
  }
  const data: unknown = await res.json();
  return Math.round(ClimaSchema.parse(data).current_weather.temperature);
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el intervalo vive en el efecto
 *
 * DEFINICIÓN
 * setInterval corre una función cada tantos milisegundos y devuelve un id, y
 * clearInterval(id) lo para. Si el intervalo nace en un efecto, lo para la
 * limpieza: React la guarda y la llama al desmontar, o antes de repetir el efecto.
 * La función del intervalo ve las variables del render en que nació, no las de
 * después. Para leer el estado más nuevo está el set con función.
 *
 * SINTAXIS — tu reloj (l.172-179), recortado:
 * useEffect(() => {
 *   const id = setInterval(() => {
 *     setNowTick(horaEnPunto());
 *   }, 60_000);
 *   return () => clearInterval(id);
 * }, []);
 *
 * 🧠 ANALOGÍA — el intervalo es una alarma que se repite. La limpieza es apagarla
 * antes de irte: si no, sigue sonando en una casa vacía.
 *
 * 🗣️ LAS PIEZAS
 * setInterval(fn, ms)     → corre fn cada ms. Devuelve el id de ese intervalo.
 * clearInterval(id)       → para el intervalo de ese id.
 * () => clearInterval(id) → la limpieza: una función que React llama después.
 * setX((anterior) => …)   → React le pasa el valor más nuevo, aunque fn sea vieja.
 *
 * ⚠️ TRAMPA — si el intervalo lee un estado, el lint lo pide en las deps. Ponerlo
 * calla el aviso, pero el intervalo muere y vuelve a nacer en cada cambio.
 *
 * 💡 Tu reloj empieza con useState(() => …): esa función corre solo en el primer
 * render, no en cada uno. Es el inicializador perezoso.
 * ───────────────────────────────────────────────────────────────────────────── */

/* Lo que reciben los drills 1 y 2, y el peldaño 4a: apunta una línea, como el rastro
 * del 08. */
type Apuntar = (linea: string) => void;

/* 1) useTicQueNoPara — apunta «tic» cada segundo mientras el componente está
 * montado. Ahora, al desmontarlo, sigue apuntando.
 * ¿Por qué? En el starter, cuando el componente se desmonta, ¿quién para el
 * intervalo?
 * Nadie para el intervalo, el componente se desmontaría, la interfaz se limpiaría, pero
 * el intervalo seguiría ejecutandose por detrás y gastando recursos
 */
export function useTicQueNoPara(apuntar: Apuntar): void {
  useEffect(() => {
    // Creamos un intervalo que ejecuta apuntar("tic") cada 1000 ms (1 segundo).
    // Guardamos su identificador para poder detenerlo posteriormente.
    const id = setInterval(() => apuntar("tic"), 1000);
    // Función de limpieza: React la ejecuta al desmontar el componente
    // o antes de repetir el efecto. clearInterval detiene el intervalo.
    return () => clearInterval(id);
  }, [apuntar]); // El efecto se repite si cambia la referencia de apuntar.
}

/* 2) useTicQueNoArranca — lo mismo que el 1. Ahora no apunta ni un «tic».
 * ¿Por qué? En el starter, ¿en qué momento corre clearInterval(id)?
 * El return de un useEffect debe ser una función, pero en el starter se está ejecutando
 * clearInterval(id) inmediatamente, lo que hace que el intervalo se detenga antes de que
 * tenga la oportunidad de ejecutar apuntar("tic"). Le llega undefined, así que React no
 * tiene nada que llamar.
 */
export function useTicQueNoArranca(apuntar: Apuntar): void {
  useEffect(() => {
    const id = setInterval(() => apuntar("tic"), 1000);
    return () => clearInterval(id);
  }, [apuntar]);
}

/* 3) useSegundos — cuenta los segundos desde que se montó, 0, 1, 2, 3…, y devuelve
 * la cuenta. Ahora se queda en 1.
 * El intervalo nace una sola vez: las deps se quedan vacías.
 * ¿Por qué? En el starter, ¿cuánto vale segundos dentro del intervalo en cada
 * vuelta?
 * Con array de dependencias vacío segundos nunca pasa de 0, porque el intervalo se crea solo una vez y la función que ejecuta el setSegundos siempre ve el valor inicial de segundos, que es 0. Por eso, cada segundo intenta actualizar segundos a 1 (0 + 1), y nunca avanza más allá de eso.
 */
export function useSegundos(): number {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    // Usamos prev para asegurarnos de que siempre estamos incrementando el valor más reciente de segundos, evitando problemas de cierre.
    const id = setInterval(() => {
      setSegundos((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);
  return segundos;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — el intervalo que pide
 *
 * DEFINICIÓN
 * El polling es el mismo intervalo, pero lo que corre es la petición. Así, cada
 * ejecución del efecto deja dos cosas vivas: el intervalo y la petición que esté en
 * camino. Al cambiar de ciudad, la limpieza para las dos. Un solo controller por
 * ejecución sirve para todas sus vueltas.
 *
 * SINTAXIS — la ficha del proyecto, al día cada 30 s:
 * useEffect(() => {
 *   const controller = new AbortController();
 *   async function cargar() { … con controller.signal, como siempre }
 *   cargar();
 *   const id = setInterval(cargar, 30_000);
 *   return () => {
 *     clearInterval(id);
 *     controller.abort();
 *   };
 * }, [proyectoId]);
 *
 * 🧠 ANALOGÍA — el intervalo es una suscripción: cada semana sale un pedido. Abortar
 * es cancelar el pedido que viene en camino; clearInterval es darte de baja. Si
 * solo cancelas el pedido, la semana que viene sale otro.
 *
 * ⚠️ TRAMPA — tu useWeather crea el controller dentro de fetchWeather: un mando por
 * vuelta, y la limpieza no alcanza ninguno. Es el starter del drill 4 del 07.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ESCALERA — lo que deja vivo cada ciudad, pieza a pieza (antes del 4)
 *
 * Para el efecto de Santiago, pasar a Valparaíso es como desmontarse: React corre
 * su limpieza y después el efecto con Valparaíso. Lo que esa limpieza no pare
 * sigue trabajando para Santiago. Cada bloque mira una de las cosas que quedan
 * vivas: A · el reloj (4a) · B · la petición en camino (4b) · C · las dos juntas
 * (4c). Al terminar, vuelve al 4.
 *
 * 🧠 ANALOGÍA — te cambias de casa. Lo que no des de baja sigue llegando a la vieja.
 *
 * 📌 Apuntar, del drill 1: (linea: string) => void.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ A — el reloj */

/* 4a) useRelojQueSeQueda — apunta «pido Santiago» cada segundo, con la ciudad que
 * recibe, y al pasar a Valparaíso, «pido Valparaíso». Ahora, al pasar a Valparaíso,
 * el rastro sigue apuntando Santiago, intercalado con Valparaíso.
 * ¿Por qué? En el starter, al pasar a Valparaíso, ¿quién para el reloj de Santiago?
 *
 */
export function useRelojQueSeQueda(ciudad: string, apuntar: Apuntar): void {
  useEffect(() => {
    setInterval(() => apuntar(`pido ${ciudad}`), 1000);
  }, [ciudad, apuntar]);
}

/* ▸ B — la petición en camino */

/* 4b) useClimaQueLlegaTarde — la temperatura de lat y lon, pedida una sola vez, sin
 * reloj. Ahora, si pasas de Santiago a Valparaíso antes de que llegue Santiago, sale
 * Valparaíso y, al rato, Santiago lo pisa.
 * ¿Por qué? En el starter, al pasar a Valparaíso, ¿qué le pasa a la petición de
 * Santiago que venía en camino?
 *
 */
export function useClimaQueLlegaTarde(lat: number, lon: number): number | null {
  const [grados, setGrados] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function cargar() {
      try {
        setGrados(await pedirTemperatura(lat, lon, controller.signal));
      } catch {
        // si la cancelan, no hay nada que guardar
      }
    }

    cargar();
  }, [lat, lon]);

  return grados;
}

/* ▸ C — las dos juntas */

/* 4c) useClimaQueSeCruza — la temperatura de lat y lon, al día cada cadaMs, como el
 * 4. Ahora, al pasar de Santiago a Valparaíso, sale Valparaíso, al rato lo pisa
 * Santiago, y a la vuelta siguiente vuelve Valparaíso.
 * ¿Por qué? La limpieza del starter para el reloj de Santiago. ¿Qué otra cosa de
 * Santiago deja viva?
 *
 */
export function useClimaQueSeCruza(lat: number, lon: number, cadaMs: number): number | null {
  const [grados, setGrados] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function cargar() {
      try {
        setGrados(await pedirTemperatura(lat, lon, controller.signal));
      } catch {
        // si falla o la cancelan, se queda la última temperatura
      }
    }

    cargar();
    const id = setInterval(cargar, cadaMs);
    return () => clearInterval(id);
  }, [lat, lon, cadaMs]);

  return grados;
}

/* 4) useClimaQueSigue — la temperatura de lat y lon, puesta al día cada cadaMs. Si
 * una vuelta falla, se queda la última que llegó. Ahora, al pasar de Santiago a
 * Valparaíso, Santiago se sigue pidiendo.
 * ¿Por qué? En el starter, al cambiar de ciudad, ¿qué para la limpieza y qué deja
 * vivo?
 *
 */
export function useClimaQueSigue(lat: number, lon: number, cadaMs: number): number | null {
  const [grados, setGrados] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function cargar() {
      try {
        setGrados(await pedirTemperatura(lat, lon, controller.signal));
      } catch {
        // si falla o la cancelan, se queda la última temperatura
        setGrados((prev) => prev);
      }
    }

    cargar();
    setInterval(cargar, cadaMs);
    return () => controller.abort();
  }, [lat, lon, cadaMs]);

  return grados;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ESCALERA — tu hook del 5, pieza a pieza (antes del 5)
 *
 * El 5 junta el polling del 4 con un aviso de error. Cada peldaño trae el hook
 * entero con una sola pieza rota: A · el aviso que se va solo (5a) · B · la
 * cancelada no es un fallo (5b) · C · un solo mando por ejecución, el de la
 * TRAMPA de la Teoría 2 (5c). Al terminar, el 5 lo escribes tú.
 *
 * En el banco, cada peldaño pinta lo mismo que la tarjeta del 5: el aviso si hay
 * error, «Cargando…» hasta la primera temperatura, y si no, la temperatura.
 * ───────────────────────────────────────────────────────────────────────────── */

/* Lo que devuelven los peldaños 5a–5c y el drill 5, como el useClima del 07. */
export type ClimaAlDia = { grados: number | null; error: string | null };

/* ▸ A — el aviso que se va solo */

/* 5a) useClimaConAvisoQueNoSeVa — la temperatura de lat y lon cada cadaMs. Si una
 * vuelta falla, el aviso «No fue posible obtener el clima», hasta que otra sale
 * bien. Ahora, después de un fallo, el aviso se queda para siempre, aunque las
 * vueltas siguientes salgan bien.
 * ¿Por qué? En el starter, cuando una vuelta sale bien después de un fallo, ¿cuánto
 * vale error?
 *
 */
export function useClimaConAvisoQueNoSeVa(lat: number, lon: number, cadaMs: number): ClimaAlDia {
  const [grados, setGrados] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function cargar() {
      try {
        setGrados(await pedirTemperatura(lat, lon, controller.signal));
      } catch {
        if (controller.signal.aborted) return;
        setError("No fue posible obtener el clima");
      }
    }

    cargar();
    const id = setInterval(cargar, cadaMs);
    return () => {
      clearInterval(id);
      controller.abort();
    };
  }, [lat, lon, cadaMs]);

  return { grados, error };
}

/* ▸ B — la cancelada no es un fallo */

/* 5b) useClimaConFalsaAlarma — lo mismo que el 5a. Ahora, al pasar de Santiago a
 * Valparaíso, sale el aviso hasta que llega Valparaíso, aunque nada falló: solo
 * cambiaste de ciudad.
 * ¿Por qué? En el starter, ¿qué diferencia hace el catch entre una vuelta que falló
 * y una que canceló la limpieza?
 *
 */
export function useClimaConFalsaAlarma(lat: number, lon: number, cadaMs: number): ClimaAlDia {
  const [grados, setGrados] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function cargar() {
      try {
        setGrados(await pedirTemperatura(lat, lon, controller.signal));
        setError(null);
      } catch {
        setError("No fue posible obtener el clima");
      }
    }

    cargar();
    const id = setInterval(cargar, cadaMs);
    return () => {
      clearInterval(id);
      controller.abort();
    };
  }, [lat, lon, cadaMs]);

  return { grados, error };
}

/* ▸ C — un mando por ejecución */

/* 5c) useClimaConMandoPorVuelta — lo mismo que el 5b, con el cargar de tu useWeather.
 * Ahora, al pasar de Santiago a Valparaíso, sale Valparaíso y, al rato, Santiago lo
 * pisa.
 * ¿Por qué? En el starter, cuando React corre la limpieza, ¿a qué controller puede
 * llegar?
 *
 */
export function useClimaConMandoPorVuelta(lat: number, lon: number, cadaMs: number): ClimaAlDia {
  const [grados, setGrados] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargar() {
      const controller = new AbortController();
      try {
        setGrados(await pedirTemperatura(lat, lon, controller.signal));
        setError(null);
      } catch {
        if (controller.signal.aborted) return;
        setError("No fue posible obtener el clima");
      }
    }

    cargar();
    const id = setInterval(cargar, cadaMs);
    return () => clearInterval(id);
  }, [lat, lon, cadaMs]);

  return { grados, error };
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TU HOOK — tu useClima del 07, al día solo
 *
 * Tu useClima del 07 con el polling de la Teoría 2. Es lo que hace el segundo
 * efecto de tu useWeather (l.186-258), sin el reintento.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 📌 ClimaAlDia, de la escalera: { grados: number | null; error: string | null }. */

/* 5) useClimaQueSeRefresca — TarjetaClimaQueSeRefresca enseña la temperatura de lat
 * y lon, con «Cargando…» hasta la primera, y la vuelve a pedir cada cadaMs. Si una
 * vuelta falla, el aviso «No fue posible obtener el clima», hasta que otra sale bien.
 * Al cambiar de ciudad o desmontar, lo viejo deja de pedir. La tarjeta ya está bien.
 * ¿Por qué? Con tu arreglo, si desmontas mientras una vuelta está en camino, ¿qué
 * para cada línea de tu limpieza?
 *
 */
export function useClimaQueSeRefresca(lat: number, lon: number, cadaMs: number): ClimaAlDia {
  useEffect(() => {}, [lat, lon, cadaMs]);
  return { grados: null, error: null };
}

export function TarjetaClimaQueSeRefresca({
  lat,
  lon,
  cadaMs,
}: {
  lat: number;
  lon: number;
  cadaMs: number;
}) {
  const { grados, error } = useClimaQueSeRefresca(lat, lon, cadaMs);

  if (error) return <p role="alert">{error}</p>;
  if (grados === null) return <p>Cargando…</p>;
  return <p>{grados} °C</p>;
}
