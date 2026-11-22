import { useEffect, useState } from "react";
import { z } from "zod";

/* =============================================================================
 * EJERCICIO 07 — la ciudad vieja: ignorar su respuesta o cancelarla · bloque 13
 *
 * 📌 RECORDATORIO — del 02: si cambia algo de las deps, React corre la limpieza
 * del efecto anterior y después el efecto nuevo. Si la petición vieja llega tarde
 * y nadie la frena, pisa a la nueva.
 *
 * 🎯 OBJETIVOS
 * · Ignorar la respuesta vieja con una bandera propia de cada ejecución del efecto.
 * · Distinguir ignorar una respuesta de cancelar su petición.
 * · Crear el controller donde la limpieza lo alcanza.
 *
 * 🟢 CONTEXTO — Smart-Cooler pide a Open-Meteo el clima de lat y lon, y si cambias
 * de ciudad, el efecto se repite. Tu useWeather se protege de la ciudad vieja con
 * dos cosas a la vez: una bandera, isCancelled, y un AbortController. Este archivo
 * las separa para ver qué hace cada una (l.186-258 de useWeather.jsx).
 *
 * 🗺️ MAPA
 * TEORÍA 1 · la bandera: ignorar la respuesta vieja → drills 1–2
 * TEORÍA 2 · el mando: cancelar la petición vieja → drills 3–4
 * TU HOOK → drill 5
 *
 * ▸ 5 drills en orden. Prohibidos el tipo any, as, el ! de «confía en mí» (x!) y
 * los eslint-disable.
 * pnpm test:run src/exercises/13-fetch-tipado/exercise-07.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito: ejecuta los tres comandos. Contesta cada
 * ¿Por qué? en la línea libre de debajo.
 * Pistas: exercise-07.pistas.md. Drills 1–5: banco, pestaña 13.
 * ============================================================================= */

/* Lo que tu useWeather lee de Open-Meteo para la tarjeta, recortado: la temperatura
 * de ahora y el código del cielo. Open-Meteo existe de verdad, pero aquí los tests y
 * el banco responden por él. */
export const ClimaSchema = z.object({
  current_weather: z.object({ temperature: z.number(), weathercode: z.number() }),
});

export const API_CLIMA = "https://api.open-meteo.com/v1/forecast";

/* Pide el clima de lat y lon y devuelve la temperatura redondeada, validada. Si
 * recibe un signal, lo escucha; sin él, la petición no se puede parar. Si algo
 * falla, lanza. */

// Creamos una función asincrónica llamada pedirTemperatura que recibe latitud, longitud y un signal opcional para abortar la petición.
// Esta retornará una promesa que se resuelve con un número (la temperatura redondeada).
async function pedirTemperatura(
  lat: number,
  lon: number,
  signal: AbortSignal | null = null,
): Promise<number> {
  // Hacemos la petición a la API de Open-Meteo usando fetch, pasando la latitud y longitud como parámetros en la URL.
  // Si se proporciona un signal, lo incluimos en la configuración de fetch para poder abortar la petición si es necesario.
  const res = await fetch(`${API_CLIMA}?latitude=${lat}&longitude=${lon}&current_weather=true`, {
    signal,
  });
  // Si la respuesta no es exitosa (res.ok es false), lanzamos un error con el estado de la respuesta.
  if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
  // Todavía no sabes la estructura de la data, pero la guardamos en la variable data como unknown.
  const data: unknown = await res.json();
  // De dentro hacia fuera: La data se valida con ClimaSchema.parse, que asegura que la estructura de la respuesta es la esperada.
  // Luego accedemos a current_weather.temperature para obtener la temperatura actual.
  // Finalmente, redondeamos la temperatura usando Math.round y la retornamos.
  return Math.round(ClimaSchema.parse(data).current_weather.temperature);
}

/* La tarjeta de los drills 1–4: la temperatura que le pases, o «Cargando…» mientras
 * no hay ninguna. Ya está bien. */
export function Temperatura({ grados }: { grados: number | null }) {
  // Si grados es null, mostramos un mensaje de "Cargando…". Esto indica que la temperatura aún no se ha cargado.
  if (grados === null) {
    return <p>Cargando…</p>;
  }
  // Si grados tiene un valor, mostramos la temperatura seguida del símbolo de grados Celsius.
  return <p>{grados} °C</p>;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — la bandera: ignorar la respuesta vieja
 *
 * DEFINICIÓN
 * Una bandera es una variable que solo vale true o false, y sirve de aviso entre
 * dos partes del código que no se hablan. Se llama así por las de verdad: está
 * bajada o levantada, y quien pasa la mira para saber qué hacer, como el letrero
 * «LIBRE» de un taxi: el taxista lo cambia y tú lo miras.
 *
 * Aquí es un let que nace en false dentro del efecto: bajada, la respuesta sirve.
 * Quien la levanta es la limpieza (true). Quien la mira es cargar, después del
 * await: si está levantada, esa respuesta se ignora. Cada ejecución del efecto
 * tiene su propia bandera, y su limpieza solo toca la suya.
 *
 * SINTAXIS — la ficha de un proyecto, que cambia con el id:
 * useEffect(() => {
 *   let ignorar = false; // nace bajada, una por ejecución
 *   async function cargar() {
 *     const proyecto = await pedirProyecto(id);
 *     if (ignorar) return; // levantada: ya cambió el id, esta respuesta sobra
 *     setProyecto(proyecto);
 *   }
 *   cargar();
 *   return () => {
 *     ignorar = true; // la limpieza la levanta
 *   };
 * }, [id]);
 *
 * 🧠 ANALOGÍA — pides una pizza de pepperoni y al rato la cambias por una
 * vegetariana. Al cambiarla, pegas un «NO» en el pedido de pepperoni: esa es la
 * bandera. Llegan las dos, miras el papel y tiras la de pepperoni sin abrirla.
 *
 * 🗣️ LAS PIEZAS
 * isCancelled → la bandera de tu useWeather (l.193).
 * ignorar     → la de este archivo, como el ignore de la doc de React: en true,
 *               la respuesta que llegue ya no se usa.
 *
 * ⚠️ TRAMPA — la limpieza corre cuando cambia la ciudad, no cuando sale la
 * petición. Mirar la bandera antes del await es mirarla cuando nadie ha podido
 * cambiarla todavía.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) useTemperaturaConBandera — devuelve la temperatura de lat y lon. Si pasas de
 * Santiago a Valparaíso antes de que llegue Santiago, se queda Valparaíso: la
 * respuesta de Santiago se ignora. Ahora Santiago llega tarde y la pisa.
 * ¿Por qué? En el starter, cuando cargar mira la bandera, ¿ya corrió la limpieza?
 * El problema con el starter es que siempre se mirará la bandera antes que
 * el await
 */

// Creamos un hook llamado useTemperaturaConBandera que recibe latitud y longitud como parámetros.
// Esta función devuelve un número (la temperatura) o null si aún no se ha cargado.
export function useTemperaturaConBandera(lat: number, lon: number): number | null {
  // Seteamos el estado inicial de grados como null, indicando que aún no se ha cargado la temperatura.
  const [grados, setGrados] = useState<number | null>(null);

  // Una vez que el componente se monta o cuando cambian lat o lon, ejecutamos el efecto.
  useEffect(() => {
    // Declaramos una variable let llamada ignorar, inicializada en false.
    // Esta variable actuará como una bandera para indicar si la ejecución actual del efecto ha sido cancelada.
    let ignorar = false;

    async function cargar() {
      // Hacemos el llamado a la función pedirTemperatura para obtener la temperatura de la latitud y longitud proporcionadas.
      const temperatura = await pedirTemperatura(lat, lon);
      // Después de obtener la temperatura, verificamos si la bandera ignorar es true.
      // Si es true, significa que la ejecución actual del efecto ha sido cancelada y no debemos actualizar el estado.
      if (ignorar) {
        return;
      }
      // Si la bandera ignorar es false, actualizamos el estado de grados con la temperatura obtenida.
      setGrados(temperatura);
    }

    cargar();
    return () => {
      ignorar = true;
    };
  }, [lat, lon]);

  return grados;
}

/* 2) useTemperaturaConRef — lo mismo que el 1, con la bandera guardada en un ref,
 * como la primeraVezRef del 12. Ahora, aunque se mira después del await, Santiago
 * llega tarde y pisa a Valparaíso.
 * ¿Por qué? En el starter, cuando llega Santiago, ¿cuánto vale ignorarRef.current,
 * y qué línea lo dejó así?
 * Pone false. La última línea que escribió en la caja fue la de Valparaíso,
 * ignorarRef.current = false al empezar su efecto
 */

// Creamos un hook llamado useTemperaturaConRef que recibe latitud y longitud como parámetros.
// Esta función devuelve un número (la temperatura) o null si aún no se ha cargado.
export function useTemperaturaConRef(lat: number, lon: number): number | null {
  // Seteamos el estado inicial de grados como null, indicando que aún no se ha cargado la temperatura.
  const [grados, setGrados] = useState<number | null>(null);

  // Una vez montado el componente o cuando cambian lat o lon, ejecutamos el efecto.
  useEffect(() => {
    let ignorar = false; // Declaramos una variable let llamada ignorar, inicializada en false.

    async function cargar() {
      // Hacemos el llamado a la función pedirTemperatura para obtener la temperatura de la latitud y longitud proporcionadas.
      const temperatura = await pedirTemperatura(lat, lon);
      // Si la bandera ignorar es true, significa que la ejecución actual del efecto ha sido cancelada y no debemos actualizar el estado.
      if (ignorar) return;
      // Si la bandera ignorar es false, actualizamos el estado de grados con la temperatura obtenida.
      setGrados(temperatura);
    }

    cargar();
    return () => {
      ignorar = true; // Cuando el efecto se limpia, establecemos la bandera ignorar en true para indicar que la ejecución actual ha sido cancelada.
    };
  }, [lat, lon]);

  return grados;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — el mando: cancelar la petición vieja
 *
 * DEFINICIÓN
 * La bandera no para la petición: solo tira su respuesta. La petición vieja viaja
 * entera y gasta red, y Open-Meteo gratis aguanta unas 10.000 al día. Para
 * pararla hace falta abort(), y la limpieza solo puede apretar un controller que
 * vea: el que se crea en el cuerpo del efecto. Su signal.aborted ya hace de
 * bandera.
 *
 * SINTAXIS — la ficha del proyecto, ahora cancelando:
 * useEffect(() => {
 *   const controller = new AbortController(); // en el efecto: la limpieza lo ve
 *   async function cargar() {
 *     try {
 *       setProyecto(await pedirProyecto(id, controller.signal));
 *     } catch {
 *       if (controller.signal.aborted) return; // la bandera, gratis
 *       setProyecto(null);
 *     }
 *   }
 *   cargar();
 *   return () => controller.abort();
 * }, [id]);
 *
 * 🧠 ANALOGÍA — la bandera es tirar la pizza de pepperoni cuando llega; el mando es
 * llamar a la pizzería para que no salga.
 *
 * ⚠️ TRAMPA — un controller creado dentro de cargar existe, pero la limpieza no lo
 * ve: vive en otra función. Y abortarlo en un finally llega tarde: la petición ya
 * terminó.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 3) useTemperaturaCancelable — devuelve la temperatura de lat y lon, o null si
 * Open-Meteo falla. Si pasas de Santiago a Valparaíso antes de que llegue Santiago,
 * su petición se cancela en ese momento y se queda Valparaíso. Ahora la de Santiago
 * no se cancela: llega tarde y pisa a Valparaíso.
 * ¿Por qué? En el starter, cuando cambias de ciudad, ¿quién puede llamar al abort()
 * de la petición de Santiago?
 * Nadie, el controller vive dentro de cargar
 */

// Creamos una función llamada useTemperaturaCancelable que recibe latitud y longitud como parámetros.
// Esta función devuelve un número (la temperatura) o null si aún no se ha cargado.
export function useTemperaturaCancelable(lat: number, lon: number): number | null {
  // Seteamos el estado inicial de grados como null, indicando que aún no se ha cargado la temperatura.
  const [grados, setGrados] = useState<number | null>(null);

  // Una vez montado el componente, ejecutamos el efecto.
  useEffect(() => {
    // Creamos un AbortController para cancelar la petición si es necesario.
    const controller = new AbortController();

    async function cargar() {
      try {
        // Hacemos el llamado a la función pedirTemperatura para obtener la temperatura de la latitud y longitud proporcionadas, pasando el signal del controller para poder abortar la petición si es necesario.
        const temperatura = await pedirTemperatura(lat, lon, controller.signal);
        setGrados(temperatura);
      } catch {
        // Si ocurre un error, verificamos si la petición fue abortada. Si fue abortada, simplemente retornamos sin hacer nada.
        if (controller.signal.aborted) return;
        // Si la petición no fue abortada, significa que ocurrió un error al obtener la temperatura, por lo que establecemos grados como null.
        setGrados(null);
      }
    }

    cargar();
    return () => controller.abort();
  }, [lat, lon]);

  return grados;
}

/* 4) useTemperaturaConLasDos — como el 3, pero con la bandera del 1 además del
 * controller. Ahora Valparaíso ya no se pisa, pero la petición de Santiago sigue
 * viajando hasta el final: no se cancela.
 * ¿Por qué? Con el starter, la tarjeta se queda bien en Valparaíso. ¿Qué hizo,
 * mientras, la petición de Santiago?
 * Nadie la abortaría porque el abort estaba mal hecho. El if (ignorar) return, la
 * bandera tira la respuesta
 */

// Creamos una función llamada useTemperaturaConLasDos que recibe latitud y longitud como parámetros.
// Esta función devuelve un número (la temperatura) o null si aún no se ha cargado.
export function useTemperaturaConLasDos(lat: number, lon: number): number | null {
  // Seteamos el estado inicial de grados como null, este acepta un número o null, indicando que aún no se ha cargado la temperatura.
  const [grados, setGrados] = useState<number | null>(null);

  useEffect(() => {
    let ignorar = false; // Variable ignorar parte en false, actuando como una bandera para indicar si la ejecución actual del efecto ha sido cancelada.
    const controller = new AbortController(); // Creamos un AbortController para poder cancelar la petición si es necesario.

    async function cargar() {
      try {
        // Iniciamos la petición a la API y esperamos su respuesta con await.
        // Mientras esperamos, cargar() queda pausada en esta línea.
        const temperatura = await pedirTemperatura(lat, lon, controller.signal);
        // Cuando llega la respuesta, continuamos y comprobamos la bandera.
        // Si ignorar es true, salimos sin actualizar el estado.
        // Si es false, guardamos la temperatura recibida.
        if (ignorar) return;
        setGrados(temperatura);
      } catch {
        // Si la bandera ignorar está en true o si la petición fue abortada, salimos de la función sin actualizar el estado.
        if (ignorar || controller.signal.aborted) return;
        setGrados(null);
      }
    }

    cargar();

    return () => {
      ignorar = true; // Cuando el efecto se limpia, establecemos la bandera ignorar en true para indicar que la ejecución actual ha sido cancelada.
      controller.abort(); // También llamamos a abort() en el controller para cancelar la petición si aún está en curso.
    };
  }, [lat, lon]);
  return grados;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TU HOOK — el fetch de tu useWeather, con una sola protección
 *
 * La temperatura, el aviso si falla y la ciudad vieja cancelada, con el controller
 * en el efecto: su signal.aborted hace de bandera, y la limpieza lo aprieta.
 * 🔭 Cuando lo cierres, abre tu useWeather.jsx (l.186-258): ¿su limpieza cancela
 * la petición de la ciudad vieja?
 * ───────────────────────────────────────────────────────────────────────────── */

/* 5) useClima — TarjetaClima enseña la temperatura de lat y lon. Si Open-Meteo
 * falla, el aviso «No fue posible obtener el clima»; si cambias de ciudad antes de
 * que llegue, la vieja se cancela sin aviso. Es tu useWeather sin la bandera,
 * desde una función vacía. TarjetaClima ya está bien.
 * ¿Por qué? Con tu arreglo, cuando se cancela Santiago, ¿qué línea evita el aviso?
 * La que evita el aviso es la línea que verifica si controller.signal.aborted es true en el catch, y si lo es, simplemente retorna sin establecer el error.
 */

// Creamos un hook llamado useClima que recibe latitud y longitud como parámetros.
// Esta función devuelve un objeto con la temperatura (grados) y un mensaje de error (error).
export function useClima(
  lat: number,
  lon: number,
): { grados: number | null; error: string | null } {
  const [grados, setGrados] = useState<number | null>(null); // Seteamos el estado inicial de grados como null, indicando que aún no se ha cargado la temperatura.
  const [error, setError] = useState<string | null>(null); // Seteamos el estado inicial de error como null, indicando que no hay ningún error al inicio.

  // Una vez montado el componente o cuando cambian lat o lon, ejecutamos el efecto.
  useEffect(() => {
    const controller = new AbortController(); // Creamos un AbortController para poder cancelar la petición si es necesario.
    const cargar = async () => {
      try {
        const temperatura = await pedirTemperatura(lat, lon, controller.signal); // Hacemos la petición con los 3 parámetros: lat, lon y el signal del controller.
        setGrados(temperatura); // Si todo sale bien, actualizamos el estado de grados con la temperatura obtenida.
      } catch {
        if (controller.signal.aborted) return; // Si la petición fue abortada, simplemente retornamos sin hacer nada.
        setError("No fue posible obtener el clima"); // Si ocurre un error y la petición no fue abortada, establecemos el estado de error con un mensaje indicando que no fue posible obtener el clima.
      }
    };

    cargar();
    return () => controller.abort();
  }, [lat, lon]);
  return { grados, error };
}

export function TarjetaClima({ lat, lon }: { lat: number; lon: number }) {
  const { grados, error } = useClima(lat, lon);

  if (error) {
    return <p role="alert">{error}</p>;
  }
  if (grados === null) {
    return <p>Cargando…</p>;
  }
  return <p>{grados} °C</p>;
}
