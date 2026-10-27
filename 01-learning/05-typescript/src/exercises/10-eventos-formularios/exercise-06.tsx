/* =============================================================================
 * EJERCICIO 06 — onChange y el texto del campo · bloque 10
 *
 * 📌 RECORDATORIO — el evento de onChange, recortado (trae ~25 campos más):
 * e = { type: "change", target: { value: "hola" } }
 * La caja entera es e. e.target es el elemento donde ha pasado la cosa, el
 * <input> entero, no un texto; lo escrito está un piso más adentro, en
 * e.target.value, y siempre es un string. Es la misma caja dentro de caja del
 * drill 10 del 01.
 *
 * 🎯 OBJETIVOS
 * · Leer lo que el usuario escribe en un campo, con su tipo correcto.
 * · Convertir ese texto cuando lo que necesitas no es texto.
 * · Guardar lo escrito en el estado y devolvérselo al campo.
 *
 * 🟢 CONTEXTO — llevas cinco archivos mirando e.type y e.key, que casi no se usan
 * en el trabajo real. Este es el evento que sí: el que te dice qué hay escrito en
 * un campo. Y con él llega la primera pieza de estado del bloque, porque un
 * formulario sin sitio donde guardar lo tecleado no sirve para nada.
 *
 * 🗺️ MAPA
 * TEORÍA 1 · el evento que trae el texto → drills 1–3
 * TEORÍA 2 · y ahora hay que guardarlo → drills 4–6
 *
 * ▸ 6 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/10-eventos-formularios/exercise-06.test.tsx
 * pnpm typecheck
 *
 * Los starters están rotos a propósito, y este archivo es el que mejor explica
 * por qué hay que correr los dos comandos: 2 de los 6 pasan el test con el fallo
 * dentro, y otros 2 fallan sin que typecheck diga una palabra. Cada comando caza
 * lo que al otro se le escapa. Pistas: exercise-06.pistas.md. Las traces van
 * comentadas: en .tsx escribir <Componente /> solo fabrica un objeto que lo
 * describe, no lo ejecuta.
 * ============================================================================= */

import { useState } from "react";
import type { ChangeEvent } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el evento que trae el texto
 *
 * DEFINICIÓN
 * onChange es el hueco que dispara cada vez que cambia el contenido de un campo.
 * Lo que te pasa es un ChangeEvent<T>, y dentro viene el elemento que ha
 * cambiado: e.target. El texto escrito es una propiedad suya, no del evento. En
 * React salta con cada tecla, no al salir del campo.
 *
 * SINTAXIS
 * import type { ChangeEvent } from 'react'
 * <input onChange={(e) => console.log(e.target.value)} />
 *
 * Ejemplos — escribes "ho" y sale, en dos disparos:
 * primer disparo  → "h"
 * segundo disparo → "ho" (value siempre trae el campo entero, no la última tecla)
 *
 * 🧠 ANALOGÍA — el aviso de la portería. No te llega la carta: te llega el aviso
 * de que hay algo en tu buzón. El buzón es e.target; para leer la carta hay que
 * abrirlo.
 *
 * 🗣️ LAS PIEZAS
 * e              → el evento.
 * ChangeEvent<T> → el tipo del evento. La T dice qué elemento cambió.
 * e.target       → el elemento. Un <input>, un <textarea>…
 * e.target.value → el contenido escrito. Su tipo es string, siempre.
 *
 * ⚠️ TRAMPA — value es un string aunque el campo sea type="number". El navegador
 * no convierte nada: escribes 21 y te llega "21". Si te hace falta el número, la
 * conversión es cosa tuya.
 *
 * 🔭 Y una nota para el 07: e.target tiene un hermano, e.currentTarget, que ya
 * usaste en el 03. Aquí son lo mismo; en el 07 verás cuándo no lo son.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) CampoAvisaTexto — un <input> de texto que, cada vez que escribes, le pasa
 * a avisar el contenido completo del campo. Escribes "hola" y el último aviso
 * dice "hola", no "a".
 * El starter se queda a un piso de distancia de lo que hay que entregar.
 */
export function CampoAvisaTexto({ avisar }: { avisar: (t: string) => void }) {
  return <input onChange={(e) => avisar(e.target.value)} />;
}
// <CampoAvisaTexto avisar={(t) => console.log(t)} />   // "h", "ho", "hol", "hola"

/* 2) CampoNumeroAvisaDoble — un <input type="number"> y un avisar que ya no
 * pide texto: pide un número, y quiere el doble de lo que hay escrito. Tecleas
 * 21 y le llega 42.
 * El campo es numérico, pero eso no cambia lo que el evento te entrega. Lee otra
 * vez la trampa de aquí arriba antes de dar nada por hecho.
 */
export function CampoNumeroAvisaDoble({ avisar }: { avisar: (n: number) => void }) {
  return (
    // <input type="number" onChange={(e) => avisar(e.target.value * 2)} /> // Solución intuitiva -> No sirve porque e.target.value siempre es string
    <input type="number" onChange={(e) => avisar(Number(e.target.value) * 2)} />
  );
}
// <CampoNumeroAvisaDoble avisar={(n) => console.log(n)} />   // 42

/* 3) AreaAvisaTexto — lo mismo sobre un <textarea>, que es otro elemento del
 * DOM aunque se use igual. Y aquí el manejador vive fuera del hueco, anotado
 * por ti, como en el 03: fuera no hay contexto que te lo regale.
 * El starter copió la anotación del <input> del drill 1.
 * Restricción: el tipo del evento se importa de 'react' y ya está arriba; el
 * nombre del elemento tendrás que buscarlo tú.
 */
export function AreaAvisaTexto({ avisar }: { avisar: (t: string) => void }) {
  const manejar = (e: ChangeEvent<HTMLTextAreaElement>) => avisar(e.target.value);
  return <textarea onChange={manejar} />;
}
//<AreaAvisaTexto avisar={(t) => console.log(t)} />   // "hey"

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — y ahora hay que guardarlo
 *
 * DEFINICIÓN
 * Leer el texto no basta: al siguiente render se pierde. useState te da una caja
 * donde guardarlo y una función para cambiarlo. Cuando el valor del campo sale
 * del estado y el estado se actualiza desde el campo, se dice que el campo está
 * controlado: hay una sola fuente de verdad, y es el estado.
 *
 * SINTAXIS
 * const [texto, setTexto] = useState("") // el valor, la función que lo cambia y el inicial
 * <input value={texto} onChange={(e) => setTexto(e.target.value)} />
 * value es lo que se pinta; lo que hace el onChange es lo que se guarda.
 *
 * Ejemplos — el circuito completo, y va en este orden:
 * tecleas → salta onChange → setTexto(...) → React vuelve a pintar → el value del
 * input sale del estado nuevo.
 *
 * 🧠 ANALOGÍA — la pizarra de la cocina. El camarero no se fía de su memoria:
 * apunta el pedido en la pizarra y luego lee la pizarra. Si preguntas qué hay
 * pedido, se mira la pizarra, no la cabeza.
 *
 * 🗣️ LAS PIEZAS
 * useState         → el hook que guarda un valor entre renders.
 * setTexto         → la función que lo cambia. Llamarla repinta.
 * campo controlado → aquel cuyo value sale del estado.
 *
 * ⚠️ TRAMPA — las dos mitades del circuito se rompen por separado, y por eso hay
 * dos drills. Si falta el value=, el estado se actualiza y nadie lo pinta. Si el
 * onChange no guarda lo nuevo, el campo se queda congelado. Los dos fallos dejan
 * un componente que parece medio funcionar, y typecheck calla.
 *
 * 🔭 useState es de la carpeta 11 y aquí no se estudia: se usa. Lo que se entrena
 * en este archivo sigue siendo el evento.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) CampoGuardaTexto — el useState ya está puesto y el <p> de debajo ya
 * pinta lo que haya en el estado. Lo que falta es el cable del medio: que lo
 * que escribes acabe guardado. Tecleas "sol" y el <p> dice "sol".
 * El starter llama a setTexto, pero le mete la caja entera.
 */
export function CampoGuardaTexto() {
  const [texto, setTexto] = useState("");
  return (
    <div>
      {/* Cuando el usuario escribe algo dentro del input, el texto dentro del párrafo cambiará */}
      <input onChange={(e) => setTexto(e.target.value)} />
      <p>{texto}</p>
    </div>
  );
}
// <CampoGuardaTexto />

/* 5) CampoEnMayusculas — un campo que se ve siempre en mayúsculas: escribes
 * "hola" en minúsculas y dentro del campo pone "HOLA".
 * Guardar en mayúsculas ya lo hace el starter, y el <p> de al lado lo
 * demuestra. Aun así, dentro del campo siguen saliendo minúsculas: el estado va
 * por un lado y lo que ves por otro. Falta que mande el estado.
 */
export function CampoEnMayusculas() {
  const [texto, setTexto] = useState("");

  return (
    <div>
      <input
        // 1. EL "VALUE" ES LA CLAVE: Convierte el input en un campo controlado.
        // Sin esta propiedad, el navegador pinta el texto de forma nativa e independiente.
        // Al añadirla, obligas al input a mostrar EXACTAMENTE lo que guardas en el estado.
        value={texto}

        // 2. EL FLUJO: Cuando el usuario escribe:
        //    a) Se dispara el onChange.
        //    b) Capturamos el texto, lo pasamos a mayúsculas y actualizamos el estado (setTexto).
        //    c) React vuelve a renderizar el componente.
        //    d) La propiedad 'value' recibe el nuevo estado en mayúsculas y lo dibuja en la pantalla.
        onChange={(e) => setTexto(e.target.value.toUpperCase())}
      />
      <p>{texto}</p>
    </div>
  );
}

// <CampoEnMayusculas />

/* 6) FormularioNombre — el cierre, y el circuito entero funcionando. Un campo
 * controlado y, debajo, un <p> que saluda con lo que hay escrito —
 * "Hola, Nico"— o que dice "Escribe tu nombre" mientras esté vacío.
 * Ahora mismo el campo no se deja escribir: se queda vacío por mucho que
 * teclees. La mitad rota es la contraria a la del drill 5.
 */
export function FormularioNombre() {
  const [nombre, setNombre] = useState("");
  return (
    <div>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
      {/* Si no hay nombre, renderizamos "Escribe tu nombre". Si hay nombre renderizamos "Hola, ${nombre}" */}
      <p>{nombre ? `Hola, ${nombre}` : "Escribe tu nombre"}</p>
    </div>
  );
}
// <FormularioNombre />

/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 6 estén en verde: has usado e.target seis veces sin preguntarte por
 * qué no e.currentTarget, que es el que usaste en el 03. En el 07 se ven los dos
 * a la vez, y hay un caso en el que devuelven cosas distintas.
 * ───────────────────────────────────────────────────────────────────────────── */
