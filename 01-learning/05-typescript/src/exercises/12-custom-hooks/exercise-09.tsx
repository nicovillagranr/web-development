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

export type Tema = "light" | "dark";

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
 *
 */
export function useTemaGuardado(): Tema {
  const [tema, setTema] = useState<Tema>("dark");

  useEffect(() => {
    const guardado = localStorage.getItem(CLAVE_TEMA);
    if (guardado === "light" || guardado === "dark") {
      setTema(guardado);
    }
  }, []);

  return tema;
}

/* 2) BotonDeTema — el botón alterna entre claro y oscuro. leerTema lee el tema
 * guardado; te llega por props para que el test cuente cuántas veces se llama.
 * Funciona, pero leerTema se llama cada vez que pulsas, y solo hace falta al nacer.
 * ¿Por qué? Con cada clic, el componente se vuelve a ejecutar entero. ¿Por qué tu
 * versión no vuelve a leer?
 *
 */
export function BotonDeTema({ leerTema }: { leerTema: () => Tema }) {
  const [tema, setTema] = useState<Tema>(leerTema());

  return (
    <button type="button" onClick={() => setTema(tema === "dark" ? "light" : "dark")}>
      Tema: {tema}
    </button>
  );
}

/* 3) TemaDelSistema — si el visitante no eligió tema, el portfolio sigue el de su
 * sistema operativo, también cuando lo cambia con la página abierta. Al irse, deja
 * de escucharlo.
 * ¿Por qué? Si nadie cambia el tema del sistema, la escucha que no se da de baja no
 * hace nada visible. ¿Qué problema deja igual?
 *
 */
export function TemaDelSistema() {
  const [tema, setTema] = useState<Tema>(() =>
    window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark",
  );

  useEffect(() => {
    const consulta = window.matchMedia("(prefers-color-scheme: light)");
    consulta.addEventListener("change", () => setTema(consulta.matches ? "light" : "dark"));
  }, []);

  return <p>Tema del sistema: {tema}</p>;
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
 *
 */
export function TemaDelPortfolio() {
  const [tema, setTema] = useState<Tema>("dark");

  useEffect(() => {
    const raiz = document.documentElement;
    if (tema === "light") {
      raiz.classList.add("light");
    } else {
      raiz.classList.remove("light");
    }
  }, []);

  return (
    <button type="button" onClick={() => setTema(tema === "dark" ? "light" : "dark")}>
      Cambiar tema
    </button>
  );
}

/* 5) TemaQueNoVuelve — otro intento del mismo efecto, ya con el array bien. Del
 * oscuro al claro funciona; del claro al oscuro, el <html> se queda en claro.
 * ¿Por qué? ¿Qué valor del tema copiaba el efecto hacia fuera, y cuál no?
 *
 */
export function TemaQueNoVuelve() {
  const [tema, setTema] = useState<Tema>("dark");

  useEffect(() => {
    if (tema === "light") {
      document.documentElement.classList.add("light");
    }
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
 *
 */
// type Tema = "light" | "dark";
export function useTema(): { tema: Tema; alternarTema: () => void } {
  const [tema, setTema] = useState<Tema>("dark");

  return { tema, alternarTema: () => setTema("light") };
}
