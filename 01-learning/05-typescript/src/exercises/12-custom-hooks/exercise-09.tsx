import { useEffect, useState } from "react";

/* =============================================================================
 * EJERCICIO 09 — el tema de tu portfolio: el estado manda · bloque 12
 *
 * 📌 RECORDATORIO — el orden de cada render: React llama al componente, el
 * navegador pinta y, después, corre el efecto. Lo que el primer render tiene que
 * saber no puede esperar al efecto.
 *
 * 🎯 OBJETIVOS
 * · Leer de fuera una sola vez, en el useState.
 * · Escribir hacia fuera en el efecto, cada vez que el estado cambia.
 * · Sacar el tema a un custom hook con un contrato claro.
 *
 * 🟢 CONTEXTO — el refuerzo del drill 4 del 07, sobre el cambio de tema de tu
 * portfolio (00-hosting, App.jsx): el tema se lee del localStorage o del sistema,
 * y se escribe en la clase light del <html> y en el localStorage.
 *
 * 🗺️ MAPA
 * TEORÍA 1 · leer de fuera → drills 1–3
 * TEORÍA 2 · escribir hacia fuera → drills 4–5
 * ARMARLO TÚ → drill 6
 *
 * ▸ 6 drills en orden. Prohibidos any, as y el ! de «confía en mí» (x!).
 * pnpm test:run src/exercises/12-custom-hooks/exercise-09.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito y los 6 compilan: la señal está en el test
 * (en dos, también en el lint). Contesta cada ¿Por qué? en la línea libre de
 * debajo. Pistas: exercise-09.pistas.md. Drills 1–6: banco, pestaña 12.
 * ============================================================================= */
// Creamos un tipo Tema que puede ser 2 strings literales: "light" o "dark". Esto nos permite tener un control más estricto sobre los valores que puede tomar el tema, evitando errores de tipado y asegurando que solo se utilicen estos dos valores específicos en nuestro código.
export type Tema = "light" | "dark";

// Definimos una constante CLAVE_TEMA que contiene la clave utilizada para almacenar el tema en el localStorage. Esta clave es la misma que se utiliza en el portfolio, lo que permite mantener consistencia en la forma en que se guarda y recupera el tema del usuario.
const CLAVE_TEMA = "theme:mode"; // la misma clave que tu portfolio

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — leer de fuera: una vez, en el useState
 *
 * DEFINICIÓN
 * Lo que el componente lee de fuera (localStorage, matchMedia) tiene que estar en
 * el primer render. Por eso va en el inicializador del useState: una función que
 * React llama una sola vez, al nacer, antes de pintar. Si lo de fuera puede
 * cambiar después, además se escucha en un efecto, con su limpieza.
 *
 * SINTAXIS
 * const [idioma, setIdioma] = useState(() => localStorage.getItem("idioma") ?? "es");
 *
 * 🧠 ANALOGÍA — el garzón lee la comanda antes de servir, no después. Si la lee
 * después, alcanzas a ver el plato equivocado aunque te lo cambie enseguida.
 *
 * 🗣️ LAS PIEZAS
 * el inicializador   → la función que le pasas a useState. React la llama al nacer.
 * el efecto que oye  → se suscribe a un cambio de fuera y se da de baja al morir.
 *
 * ⚠️ TRAMPA — useState(leer()), con paréntesis: leer corre en cada render, aunque
 * React solo use el valor del primero.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) useTemaGuardado — devuelve el tema que el visitante guardó la última vez con
 * la clave CLAVE_TEMA, o "dark" si no guardó ninguno. Tiene que salir bien desde
 * el primer render.
 * ¿Por qué? Si el tema se leyera en un efecto, ¿qué vería un instante quien
 * guardó el claro?
 * Si leyéramos el tema dentro de un `useEffect`, React realizaría primero el render con el valor inicial del estado (`"dark"`). Después del render se ejecutaría el efecto, que leería el tema guardado en `localStorage` y actualizaría el estado.
Por lo tanto, un visitante que había guardado el tema claro vería brevemente la interfaz oscura antes de que React actualizara el tema a `"light"`. Esto produciría un cambio visual innecesario.
Al utilizar una función inicializadora en `useState`, obtenemos el tema guardado antes del primer render y evitamos ese cambio visual.
 */
export function useTemaGuardado(): Tema {
  // Usamos useState con un solo argumento para inicializar el estado del tema en el primer render.
  const [tema] = useState<Tema>(() => {
    // Para obtener el tema, ejecutamos una función que nos devolverá un dato
    // Obtenemos la clave del tema guardado en el localStorage usando la constante CLAVE_TEMA.
    const temaGuardado = localStorage.getItem(CLAVE_TEMA);
    if (temaGuardado === "light") {
      return "light";
    }
    if (temaGuardado === "dark") {
      return "dark";
    }
    return "dark";
  });
  return tema;
}

/* 2) BotonDeTema — el botón alterna entre claro y oscuro. leerTema lee el tema
 * guardado; te llega por props para que el test cuente cuántas veces se llama.
 * Funciona, pero leerTema se llama cada vez que pulsas, y solo hace falta al nacer.
 *¿Por qué mi versión no vuelve a leer el tema?**
    Porque estoy pasando `leerTema` directamente a `useState`, sin ejecutarla con paréntesis.

    De esta manera, React utiliza `leerTema` como función inicializadora para obtener el estado inicial del tema al montar el componente.

    Cuando el usuario hace clic, `setTema` actualiza el estado y provoca un nuevo render. Aunque el componente vuelve a ejecutarse, React conserva el estado anterior y no vuelve a ejecutar la función inicializadora.

    **¿Qué hacen los paréntesis de `leerTema` cuando el usuario hace clic?**

    Los paréntesis ejecutan una función y permiten obtener su valor de retorno.
    - `leerTema`: entregamos la función sin ejecutarla.
    - `leerTema()`: ejecutamos la función inmediatamente y obtenemos su resultado.
Por eso utilizamos `leerTema` sin paréntesis al inicializar el estado: queremos que React la ejecute únicamente para obtener el valor inicial, no cada vez que se renderiza el componente.
 */
export function BotonDeTema({ leerTema }: { leerTema: () => Tema }) {
  // Seteamos el estado inicial del tema usando la función leerTema, que se ejecuta solo una vez al montar el componente.
  // Por lo tanto, durante el montaje y al montar, React ya sabrá si el tema del usuario es "light" o "dark", y no será necesario volver a llamar a leerTema en cada render.
  const [tema, setTema] = useState<Tema>(leerTema);

  return (
    <button
      type="button"
      onClick={() => {
        // Al hacer clic en el botón, alternamos el tema entre "light" y "dark" usando setTema.
        setTema(tema === "dark" ? "light" : "dark");
      }}
    >
      Tema: {tema}
    </button>
  );
}

/* 3) TemaDelSistema — si el visitante no eligió tema, el portfolio sigue el de su
 * sistema operativo, también cuando lo cambia con la página abierta.
 * Al irse, deja de escucharlo.
 * ¿Por qué? Si nadie cambia el tema del sistema, la escucha que no se da de baja no
 * hace nada visible. ¿Qué problema deja igual?
 * El problema es que si el componente se desmonta y la escucha no se da de baja, la función de actualización del tema seguirá existiendo en memoria y seguirá escuchando los cambios del sistema operativo. Esto puede provocar fugas de memoria y comportamientos inesperados si el componente se vuelve a montar más tarde, ya que la función de actualización podría intentar actualizar el estado de un componente que ya no está presente en el DOM.
 */
export function TemaDelSistema() {
  // Seteamos el estado incial del tema según la preferencia del sistema operativo del usuario.
  // Usamos una función inicializadora para que React ejecute la lógica solo una vez al montar el componente.
  const [tema, setTema] = useState<Tema>(() =>
    window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark",
  );

  // Usamos useEffect para escuchar los cambios en la preferencia de tema del sistema operativo.
  useEffect(() => {
    // Hacemos una consulta a la API matchMedia para detectar si el usuario prefiere un tema claro.
    const consulta = window.matchMedia("(prefers-color-scheme: light)");

    // Definimos una función que actualiza el estado del tema según la preferencia del sistema operativo.
    const actualizarTema = () => {
      setTema(consulta.matches ? "light" : "dark");
    };
    // Agregamos un event listener para escuchar los cambios en la preferencia de tema del sistema operativo.
    consulta.addEventListener("change", actualizarTema);

    // Retornamos una función de limpieza que elimina el event listener cuando el componente se desmonta, evitando posibles fugas de memoria.
    return () => {
      consulta.removeEventListener("change", actualizarTema);
    };
    // Array de dependencias vacío: el efecto se ejecuta solo una vez al montar el componente y se limpia al desmontarlo.
  }, []);

  return (
    <>
      <p>Tema del sistema: {tema}</p>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — escribir hacia fuera: en el efecto, en cada cambio
 *
 * DEFINICIÓN
 * Cuando el estado cambia, lo de fuera tiene que enterarse: la clase del <html>, el
 * localStorage. Eso va en un efecto con el estado en su array: corre al nacer y
 * cada vez que el estado cambia, y deja fuera lo que el estado dice.
 *
 * SINTAXIS
 * useEffect(() => {
 *   document.documentElement.lang = idioma;
 *   localStorage.setItem("idioma", idioma);
 * }, [idioma]);
 *
 * 🧠 ANALOGÍA — el estado es el reloj de la sala de control; el efecto, quien pone
 * en hora los relojes de los pasillos cada vez que el de la sala cambia.
 *
 * 🗣️ LAS PIEZAS
 * classList.add(c)          → pone la clase c.
 * classList.remove(c)       → la quita.
 * classList.toggle(c, cond) → la pone si cond es true; si no, la quita.
 *
 * ⚠️ TRAMPA — el array vacío: el efecto corre al nacer y nunca más, y lo de fuera
 * se queda con el primer valor.
 *
 * 💡 Tu portfolio parpadea por esto: la clase light se pone en el efecto, después
 * de pintar, y quien usa el tema claro ve el oscuro un instante al cargar. Eso se
 * arregla fuera de React, con un script en el index.html.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) TemaDelPortfolio — tu App.jsx, recortado: el efecto pone la clase light en el
 * <html> cuando el tema es claro y la quita cuando es oscuro. Al nacer funciona;
 * al pulsar «Cambiar tema», el <html> no se entera.
 * ¿Por qué? ¿Qué le dice el array del efecto a React sobre cuándo volver a correrlo?
 * Todo el componente gira en torno al valor de tema en tiempo real, por lo tanto React debe saber en todo momento cuándo volver a ejecutar el efecto para reflejar los cambios en el DOM. Al incluir `tema` en el array de dependencias del efecto, le estamos diciendo a React que debe volver a ejecutar el efecto cada vez que `tema` cambie. Esto asegura que la clase `light` se agregue o elimine correctamente en el `<html>` según el valor actual del tema.
 */
export function TemaDelPortfolio() {
  // Seteamos el estado inicial del tema en "dark".
  //  Esto significa que al montar el componente, el tema será oscuro por defecto da igual la configuración del sistema o el valor guardado en localStorage.
  // El efecto se encargará de actualizar la clase del <html> según el valor actual del tema.
  const [tema, setTema] = useState<Tema>("dark");

  // Usamos useEffect para actualizar la clase del <html> según el valor del tema.
  useEffect(() => {
    // Guardamos una referencia al elemento raíz del documento (el <html>) para poder modificar su clase.
    const raiz = document.documentElement;
    // Si el tema es "light", agregamos la clase "light" al <html>
    if (tema === "light") {
      raiz.classList.add("light");
      // Si el tema es "dark", eliminamos la clase "light" del <html>
    } else {
      raiz.classList.remove("light");
    }
    // El array de dependencias contiene el estado 'tema', lo que indica a React que debe volver a ejecutar el efecto cada vez que 'tema' cambie. Esto asegura que la clase 'light' se agregue o elimine correctamente en el <html> según el valor actual del tema.
    // Si el array de dependencias estuviera vacío, el efecto solo se ejecutaría una vez al montar el componente y no se actualizaría cuando el usuario cambie el tema, lo que provocaría que la clase 'light' no reflejara correctamente el estado actual del tema.
  }, [tema]);

  return (
    // Cuando el usuario da clic:
    // - Si el tema actual es "dark", se cambia a "light".
    // - Si el tema actual es "light", se cambia a "dark".
    <button type="button" onClick={() => setTema(tema === "dark" ? "light" : "dark")}>
      Cambiar tema
    </button>
  );
}

/* 5) TemaQueNoVuelve — otro intento del mismo efecto, ya con el array bien. Del
 * oscuro al claro funciona; del claro al oscuro, el <html> se queda en claro.
 * ¿Por qué? ¿Qué valor del tema copiaba el efecto hacia fuera, y cuál no?
 * El problema es que el efecto estaba copiando el valor del tema en el momento en que se ejecutaba, y no se actualizaba correctamente cuando el usuario cambiaba el tema. Esto significa que cuando el usuario cambiaba de "light" a "dark", el efecto seguía utilizando el valor anterior del tema ("light") y no eliminaba la clase "light" del `<html>`, dejando la interfaz en modo claro.
 */
export function TemaQueNoVuelve() {
  // Seteamos el estado inicial del tema en "dark".
  const [tema, setTema] = useState<Tema>("dark");

  // Usamos useEffect para actualizar la clase del <html> según el valor del tema.
  useEffect(() => {
    // Si el tema es "light", agregamos la clase "light" al <html>
    if (tema === "light") {
      document.documentElement.classList.add("light");
      // Si el tema es "dark", eliminamos la clase "light" del <html>, lo que haría que el tema vuelva a ser oscuro.
    } else {
      document.documentElement.classList.remove("light");
    }
    // El array de dependencias contiene el estado 'tema', lo que indica a React que debe volver a ejecutar el efecto cada vez que 'tema' cambie. Esto asegura que la clase 'light' se agregue o elimine correctamente en el <html> según el valor actual del tema.
  }, [tema]);

  return (
    <button type="button" onClick={() => setTema(tema === "dark" ? "light" : "dark")}>
      Cambiar tema
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ARMARLO TÚ — tu tema, sacado a un custom hook
 *
 * el tema inicial → lo guardado con CLAVE_TEMA; si no hay nada, el del sistema.
 * cada cambio     → la clase light del <html> y el localStorage, en el efecto.
 * lo que devuelve → un objeto { tema, alternarTema }: ya va escrito en la firma.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 6) useTema — el tema de tu App.jsx, en un hook. tema es "light" o "dark", y
 * alternarTema() pasa de uno al otro. Tiene que salir bien desde el primer render,
 * poner o quitar la clase light del <html> y guardar cada cambio con CLAVE_TEMA.
 * Si lo guardado no es "light" ni "dark", cuenta como que no hay nada.
 * ¿Por qué? ¿Qué parte de tu hook corre una sola vez, y cuál después de cada cambio?
 * Lo que corre una sola vez es la función inicializadora del `useState`, que obtiene el tema guardado en `localStorage` o la preferencia del sistema operativo del usuario. Esto asegura que React tenga el valor correcto del tema desde el primer render.
La parte que corre después de cada cambio es el `useEffect`, que se ejecuta cada vez que el estado del tema cambia. Este efecto actualiza la clase del `<html>` y guarda el tema en `localStorage`, asegurando que los cambios se reflejen correctamente en la interfaz y se mantengan entre sesiones.
 */
// type Tema = "light" | "dark";
export function useTema(): { tema: Tema; alternarTema: () => void } {
  // Obtenemos el valor inicial de tema desde el localStorage o la preferencia del sistema operativo del usuario.
  // Esto se hace dentro de una función inicializadora para que React la ejecute solo una vez al montar el componente, evitando lecturas innecesarias en cada render.
  const [tema, setTema] = useState<Tema>(() => {
    // Obtenemos el tema guardado en el localStorage usando la clave CLAVE_TEMA.
    const temaGuardado = localStorage.getItem(CLAVE_TEMA);
    // Si el tema guardado es "light", devolvemos "light" como valor inicial del estado.
    if (temaGuardado === "light") {
      return "light";
    }
    // Si el tema guardado es "dark", devolvemos "dark" como valor inicial del estado.
    if (temaGuardado === "dark") {
      return "dark";
    }
    // Si no hay un tema guardado, obtenemos la preferencia del sistema operativo del usuario.
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  // Usamos useEffect para actualizar la clase del <html> y el localStorage cada vez que el estado del tema cambie.
  useEffect(() => {
    // Guardamos el tema actual en el localStorage usando la clave CLAVE_TEMA.
    // localStorage.setItem lo que hace es almacenar el valor del tema en el almacenamiento local del navegador,
    // lo que permite que la preferencia del usuario se mantenga incluso después de cerrar o recargar la página.
    // localStorage.setItem(CLAVE_TEMA, tema); CLAVE_TEMA = "theme:mode", tema = "light" o "dark"
    localStorage.setItem(CLAVE_TEMA, tema);

    // Si el tema es "light", agregamos la clase "light" al <html>
    if (tema === "light") {
      document.documentElement.classList.add("light");

      // Si el tema es "dark", eliminamos la clase "light" del <html>
    } else {
      document.documentElement.classList.remove("light");
    }
    // El array de dependencias contiene el estado 'tema', lo que indica a React que debe volver a ejecutar el efecto cada vez que 'tema' cambie. Esto asegura que la clase 'light' se agregue o elimine correctamente en el <html> y que el localStorage se actualice con el valor actual del tema.
  }, [tema]);

  return {
    tema,
    alternarTema: () => setTema(tema === "dark" ? "light" : "dark"),
  };
}
