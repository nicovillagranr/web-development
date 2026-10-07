import { useReducer, useState } from "react";

/* =============================================================================
 * EJERCICIO 08 — `pedir` anota, el estado llega después   ·  bloque 11
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 *   · predecir qué valor tiene el estado justo después de `pedir`
 *   · ordenar los `pedir` alrededor de un `await` para que la pantalla avise
 *   · poner en el reducer las reglas que el manejador no puede ver
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * En el drill 8 del `04` faltaba pedir "empezar" antes de la espera, y la teoría
 * avisaba de que `pedir` no devuelve el estado nuevo. Aquí esa frase se convierte
 * en drills: primero sin esperas, luego con un `await` en medio, y al final un
 * botón "Cancelar" que el manejador no consigue ver.
 *
 * 🗺️ MAPA DEL ARCHIVO
 *   TEORÍA 1 · el manejador mira la foto de su render   →  drills 1 a 3
 *   REFUERZO · el `if` del manejador mira la foto        →  demo + drills 3a a 3c
 *   TEORÍA 2 · lo que se pide antes del `await` se ve    →  drills 4 a 7
 *
 * ▸ EJERCICIO — 10 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/11-useState-useReducer/exercise-08.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito, y los 10 compilan: toda la señal
 *   está en el test. Los drills 2, 3c y 6 llevan un `// ¿Por qué?` que reviso yo.
 *   ¿Atascado? Las pistas están en `exercise-08.pistas.md`, de una en una.
 *
 * 👁️ `VotoConMeta`, la `DemoFoto`, `Carrito`, `Marcador`, `Sala` y `Transferencia` están en `src/App.tsx`.
 * ===========================================================================*/

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el manejador mira la foto de su render
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Cada render es una foto: el estado de esa foto no cambia mientras se ejecuta
 *   el manejador que se creó en ella. `pedir` no toca la foto: deja la acción en
 *   una cola, y React la aplica al preparar el render siguiente.
 *
 * SINTAXIS
 *     pedir({ tipo: "votar" });     // devuelve void: anota, no responde
 *     votos;                        // sigue siendo el de esta foto
 *
 * EJEMPLO — con `votos` en 5:
 *     pedir({ tipo: "votar" });
 *     console.log(votos);           // 5
 *     // en el render siguiente, votos ya es 6
 *
 * 🧠 ANALOGÍA — echar una carta al buzón: la carta ya va de camino, pero tu
 *    buzón no te devuelve la respuesta en el acto. Llega en el siguiente reparto.
 *
 * 🗣️ LAS PIEZAS
 *     la cola → las acciones pendientes  ·  la foto → el estado de un render
 *
 * ⚠️ TRAMPA — leer el estado justo después de `pedir` para decidir algo. Lees la
 *    foto vieja, y la decisión llega un render tarde.
 * ───────────────────────────────────────────────────────────────────────────── */

export type AccionVoto = { tipo: "votar" };

export function votosReducer(votos: number, accion: AccionVoto): number {
  switch (accion.tipo) {
    case "votar":
      return votos + 1;
    default: {
      const _exhaustivo: never = accion.tipo;
      return _exhaustivo;
    }
  }
}
// votosReducer(5, { tipo: "votar" }) -> 6

// 1) Predice: `votos` empieza en 0 y el manejador hace esto. En el primer clic,
//    ¿qué dos números salen en la consola, en orden?
//        pedir({ tipo: "votar" });
//        console.log(votos);
//        pedir({ tipo: "votar" });
//        console.log(votos);
export const respuesta1: [number, number] = [0, 0];
// Por qué?
// Porque `votos` conserva el valor del render actual durante la ejecución del manejador. Aunque `pedir` solicita actualizar el estado, el nuevo valor no está disponible inmediatamente en la variable `votos`. Por eso ambos `console.log(votos)` leen el mismo valor `0`.

// 2) Predice: ahora el manejador pide tres veces seguidas, y `votos` empieza en 0.
//    Después de UN clic, ¿qué número se ve en pantalla?
//        pedir({ tipo: "votar" });
//        pedir({ tipo: "votar" });
//        pedir({ tipo: "votar" });
export const respuesta2: number = 3;
// ¿Por qué?
// Porque las tres llamadas a `pedir` se procesan usando el estado más reciente: `0 → 1 → 2 → 3`. Aunque `votos` sigue valiendo `0` dentro del manejador actual, React acumula las tres actualizaciones y en el siguiente render el estado queda en `3`.

// 3) `VotoConMeta` — al llegar a 3 votos tiene que salir "¡Meta alcanzada!". Hoy
//    sale un clic tarde, con 4.
export function VotoConMeta() {
  const [votos, pedir] = useReducer(votosReducer, 0);
  const [aviso, setAviso] = useState("");

  const votar = () => {
    const accion: AccionVoto = { tipo: "votar" };
    pedir(accion);
    if (votos === 2) {
      setAviso("¡Meta alcanzada!");
    }
  };

  return (
    <div>
      <p>Votos: {votos}</p>
      <button onClick={votar}>Votar</button>
      <p role="status">{aviso}</p>
    </div>
  );
}
// <VotoConMeta />

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ REFUERZO — el `if` del manejador mira la foto, en escalera
 * ─────────────────────────────────────────────────────────────────────────────
 * El drill 3 en una frase: el `if` vive dentro del manejador, y el manejador mira
 * la foto del render en que se creó. Decidir con la foto es decidir un clic tarde.
 *   DEMO · `DemoFoto`, ya funciona: míralo vivo antes de tocar nada
 *   A · el mismo fallo, en otros componentes            →  drills 3a, 3b
 *   B · decidir en el render, no en el manejador        →  drill 3c
 *
 * UN CLIC, por dentro — la pantalla dice 6 y el manejador hace
 * `pedir(accion); if (votos === 7) { … }`:
 *     el manejador arranca con su foto     →  votos vale 6
 *     pedir(accion)                        →  un papel a la cola; votos sigue en 6
 *     if (votos === 7)                     →  mira la foto: 6. No entra.
 *     el manejador termina                 →  React aplica la cola: 6 → 7
 *     render siguiente                     →  la pantalla dice 7, y nadie miró
 *
 * 🧠 ANALOGÍA — el marcador del estadio: gritas "¡gol!" y la foto de tu móvil
 *    sigue diciendo lo de antes. Para saber cómo va a quedar, no mires la foto:
 *    haz tú la suma que hará el operador. O espera a la foto siguiente.
 * ───────────────────────────────────────────────────────────────────────────── */

// ── DEMO · la foto contra la pantalla ──
//
// 👀 `DemoFoto` NO es un drill: ya funciona. Está en el `App.tsx` justo después de
//    `VotoConMeta`. Vota seis veces y lee la tabla fila a fila. Cada fila es un
//    clic, y apunta lo que el manejador sabía en ese momento:
//      · "el if miró"       → `votos`, la foto del render en que se creó el manejador
//      · "la pantalla pinta" → lo que saldrá del reducer cuando React aplique la cola
//    Las dos últimas columnas son las dos formas de escribir el `if` del drill 3.
//    Para empezar de cero, recarga la página.

type FilaDemo = { clic: number; miro: number; pinta: number };

export function DemoFoto() {
  const [votos, pedir] = useReducer(votosReducer, 0);
  const [filas, setFilas] = useState<FilaDemo[]>([]);

  const votar = () => {
    const accion: AccionVoto = { tipo: "votar" };
    pedir(accion); // el papel va a la cola; `votos` NO cambia en esta línea

    // Lo que puede saber el manejador en este momento:
    const miro = votos; // la foto: lo que había en pantalla ANTES del clic
    const pinta = votosReducer(votos, accion); // la cuenta del reducer: lo que habrá DESPUÉS

    setFilas((anterior) => [...anterior, { clic: anterior.length + 1, miro, pinta }]);
  };

  return (
    <div>
      <p>En pantalla: {votos}</p>
      <button onClick={votar}>Votar</button>
      <table className="mt-2 text-[15px] tabular-nums">
        <thead>
          <tr className="text-left text-[#86868b]">
            <th className="pr-6 font-normal">clic</th>
            <th className="pr-6 font-normal">el if miró</th>
            <th className="pr-6 font-normal">la pantalla pinta</th>
            <th className="pr-6 font-normal">¿votos === 3?</th>
            <th className="font-normal">¿votosReducer(votos, accion) === 3?</th>
          </tr>
        </thead>
        <tbody className="text-[#f5f5f7]">
          {filas.map((fila) => (
            <tr key={fila.clic}>
              <td className="pr-6">{fila.clic}</td>
              <td className="pr-6">{fila.miro}</td>
              <td className="pr-6">{fila.pinta}</td>
              <td className={fila.miro === 3 ? "pr-6 text-[#ff9f0a]" : "pr-6 text-[#6e6e73]"}>
                {fila.miro === 3 ? "entra, un clic tarde" : "no"}
              </td>
              <td className={fila.pinta === 3 ? "text-[#30d158]" : "text-[#6e6e73]"}>
                {fila.pinta === 3 ? "entra, a tiempo" : "no"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
// <DemoFoto />

// ── A · el mismo fallo, en otros sitios ──

export type AccionCarrito = { tipo: "agregar" };

export function carritoReducer(unidades: number, accion: AccionCarrito): number {
  switch (accion.tipo) {
    case "agregar":
      return unidades + 1;
    default: {
      const _exhaustivo: never = accion.tipo;
      return _exhaustivo;
    }
  }
}
// carritoReducer(4, { tipo: "agregar" }) -> 5
// carritoReducer(5, { tipo: "agregar" }) -> 6
// carritoReducer(0, { tipo: "agregar" }) -> 1

// 3a) `Carrito` — en el carrito caben 5 unidades, y al meter la quinta tiene que
//     salir "Carrito lleno". Hoy sale con la sexta. El reducer no se toca.
export function Carrito() {
  const [unidades, pedir] = useReducer(carritoReducer, 0);
  const [aviso, setAviso] = useState("");

  const agregar = () => {
    const accion: AccionCarrito = { tipo: "agregar" };
    pedir(accion);

    const nuevoUnidades = carritoReducer(unidades, accion);

    if (nuevoUnidades >= 5) {
      setAviso("Carrito lleno");
    }
  };

  return (
    <div>
      <p>Unidades: {unidades}</p>
      <button onClick={agregar}>Agregar</button>
      <p role="status">{aviso}</p>
    </div>
  );
}
// <Carrito />

export type AccionPuntos = { tipo: "acierto" } | { tipo: "bonus" };

// Un acierto suma 10 y un bonus suma 25.
export function puntosReducer(puntos: number, accion: AccionPuntos): number {
  switch (accion.tipo) {
    case "acierto":
      return puntos + 10;
    case "bonus":
      return puntos + 25;
    default: {
      const _exhaustivo: never = accion;
      return _exhaustivo;
    }
  }
}
// puntosReducer(25, { tipo: "bonus" }) -> 50

// 3b) `Marcador` — con 50 puntos o más tiene que salir "¡Nivel superado!", en el
//     mismo clic en que se llega. Hoy sale un clic tarde. Ojo: no todos los botones
//     suman lo mismo. El reducer no se toca.
export function Marcador() {
  const [puntos, pedir] = useReducer(puntosReducer, 0);
  const [aviso, setAviso] = useState("");

  const sumar = (accion: AccionPuntos) => {
    pedir(accion);
    // Cómo funciona esta variable:
    // 1. `puntos` es la foto del render actual, que todavía no ha cambiado.
    // 2. `puntosReducer(puntos, accion)` hace la cuenta que hará el reducer.
    // 3. `nuevoPuntos` es el resultado de esa cuenta, y nos permite decidir si
    //    hay que avisar o no.
    const nuevoPuntos = puntosReducer(puntos, accion);

    if (nuevoPuntos >= 50) {
      setAviso("¡Nivel superado!");
    }
  };

  return (
    <div>
      <p>Puntos: {puntos}</p>
      <button onClick={() => sumar({ tipo: "acierto" })}>Acierto</button>
      <button onClick={() => sumar({ tipo: "bonus" })}>Bonus</button>
      <p role="status">{aviso}</p>
    </div>
  );
}
// <Marcador />

// ── B · decidir en el render ──

export type AccionSala = { tipo: "entrar" } | { tipo: "vaciar" };

export function salaReducer(personas: number, accion: AccionSala): number {
  switch (accion.tipo) {
    case "entrar":
      return personas + 1;
    case "vaciar":
      return 0;
    default: {
      const _exhaustivo: never = accion;
      return _exhaustivo;
    }
  }
}
// salaReducer(3, { tipo: "entrar" }) -> 4

// 3c) `Sala` — caben 4 personas: con la cuarta tiene que salir "Sala completa", y
//     al vaciarla el aviso tiene que irse. Hoy sale tarde y, encima, no se va.
//     El aviso se deduce de `personas`: quita su `useState` y decide el texto en
//     el JSX. El reducer no se toca.
export function Sala() {
  // personas empieza en 0, y pedir anota la acción en la cola del reducer
  const [personas, pedir] = useReducer(salaReducer, 0);

  // Flujo completo.
  // Cuando carga la App, personas = 0 y aviso = "".
  // Click en Entrar -> pedir({ tipo: "entrar" }) → personas = 1, aviso = "".
  // Click en Entrar -> pedir({ tipo: "entrar" }) → personas = 2, aviso = "".
  // Click en Entrar -> pedir({ tipo: "entrar" }) → personas = 3, aviso = "".
  // Click en Entrar -> pedir({ tipo: "entrar" }) → personas = 4, aviso = "Sala completa".
  // Click en Vaciar -> pedir({ tipo: "vaciar" }) → personas = 0, aviso = "".

  const entrar = () => {
    const accion: AccionSala = { tipo: "entrar" };
    pedir(accion);
    // IMPORTANTE: `personas` todavía tiene el valor del render actual.
    //
    // ANTES DEL CLICK      pedir()      DESPUÉS DEL RENDER
    //       0                                  0 → 1                    1
    //       1                                  1 → 2                    2
    //       2                                 2 → 3                   3
    //       3                                3 → 4                   4
    //       ↑
    //       └── En el 4.º click, `personas` todavía vale 3 aquí.
    //           Por eso `personas === 3` es true y aparece el aviso.
    //
    // `pedir()` prepara el siguiente estado, pero no cambia
    // inmediatamente la variable `personas` de este render.
  };

  return (
    <div>
      <p>Personas: {personas}</p>
      <button onClick={entrar}>Entrar</button>
      <button onClick={() => pedir({ tipo: "vaciar" })}>Vaciar</button>
      <p role="status">{personas >= 4 ? "Sala completa" : ""}</p>
    </div>
  );
}
// ¿Por qué aquí no hace falta calcular el número de después?
// Porque el aviso se puede deducir directamente del número de personas en el render actual. Si `personas` es 4, entonces la sala está completa; si es 0, entonces está vacía. No necesitamos mirar el estado después de `pedir`, ya que podemos calcular el aviso basado en el estado actual que React nos proporciona en cada render.
// <Sala />

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — lo que se pide antes del `await` se ve
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   `await` pausa el manejador y le devuelve el control a React. Lo que pediste
 *   antes de la pausa se pinta durante la espera; lo que pidas después, no. Y al
 *   volver, el manejador sigue con la foto de cuando empezó.
 *
 * SINTAXIS
 *     pedir({ tipo: "empezar" });   // se pinta ya
 *     await esperar(1000);          // pausa: React repinta aquí
 *     pedir({ tipo: "terminar" });  // se pinta al volver
 *
 * 🧠 ANALOGÍA — el cartel de "vuelvo en 5 minutos": se cuelga ANTES de salir.
 *    Colgarlo al volver no le sirve a nadie.
 *
 * ⚠️ TRAMPA — creer que, al volver del `await`, las variables del estado traen lo
 *    que pasó durante la espera. Traen la foto de cuando empezó el manejador.
 *    Lo que sí ve el estado actual es el reducer: React se lo pasa en cada pedido.
 * ───────────────────────────────────────────────────────────────────────────── */

// Una transferencia bancaria, del drill 4 al 7. Los textos y el tipo no se tocan.
export type FaseTransferencia = "preparada" | "enviando" | "enviada" | "cancelada";
export type AccionTransferencia = { tipo: "empezar" } | { tipo: "terminar" } | { tipo: "cancelar" };

const textos: Record<FaseTransferencia, string> = {
  preparada: "",
  enviando: "Enviando…",
  enviada: "Transferencia enviada",
  cancelada: "Transferencia cancelada",
};

// 4) Predice: el manejador pide "empezar", espera un segundo y pide "terminar".
//    ¿Qué texto se ve en pantalla DURANTE ese segundo?

export type TextoVisible = "" | "Enviando…" | "Transferencia enviada";

export const respuesta4: TextoVisible = "Enviando…";

// Por qué? El await pausa el manejador y React pinta "Enviando..." mientras espera.

// Simula la espera del banco.

const esperar = (ms: number) => new Promise((resolver) => setTimeout(resolver, ms));

// Imaginemos que estamos en una App bancaria:

// Cuando el usuario ejecute el botón TRANSFERIR,
// esta función comenzará a ejecutarse.

// const transferir = async () => {

// Comienza la transferencia, y al usuario le avisan por la UI/UX
// que se está enviando el dinero.

// setFase("enviando");

// Se ejecuta la espera de la respuesta del banco, que tarda 1 segundo.
// Durante ese tiempo, el usuario ve "Enviando…" en pantalla.

// await esperar(1000);

// Cuando el banco responde, se actualiza la fase a "enviada",
// y el usuario ve "Transferencia enviada" en pantalla.

// setFase("enviada");

// };

// 5) `transferir` — al pulsar "Transferir", "Enviando…" tiene que salir en el acto
//    y quedarse mientras el banco responde. Hoy no sale nunca.

// 6) Predice: pulsas "Transferir" con la fase en "preparada", y durante la espera
//    pulsas "Cancelar". Al volver del `await`, ¿qué vale la variable `fase` dentro
//    de `transferir`?

export const respuesta6: FaseTransferencia = "preparada";

// ¿Por qué?
// La variable `fase` dentro de `transferir` conserva el valor de la "foto"
// del render en que se creó el manejador, que es "preparada".
// Aunque el estado actual haya cambiado a "cancelada" durante la espera,
// la variable `fase` de esa ejecución de `transferir` no cambia.
// Solo un nuevo render crea una nueva versión de `fase` con el valor actualizado.

export function Transferencia() {
  // Seteamos el componente inicial:
  // fase = "preparada" y pedir es la función que nos permite cambiar el estado.
  const [fase, pedir] = useReducer(transferenciaReducer, "preparada");

  const transferir = async () => {
    pedir({ tipo: "empezar" });
    await esperar(1000);
    pedir({ tipo: "terminar" });
  };

  return (
    <div>
      <button onClick={transferir}>Transferir</button>
      <button onClick={() => pedir({ tipo: "cancelar" })}>Cancelar</button>
      <p role="status">{textos[fase]}</p>
    </div>
  );
}
// <Transferencia />

// 7) "terminar" — Cancelar durante la espera no sirve: al acabar, sale
//    "Transferencia enviada" igual. Arréglalo en el reducer; el drill 6 explica
//    por qué el `if` de `transferir` no puede.

// Una transferencia bancaria, del drill 4 al 7. Los textos y el tipo no se tocan.

// export type FaseTransferencia = "preparada" | "enviando" | "enviada" | "cancelada";
// export type AccionTransferencia = { tipo: "empezar" } | { tipo: "terminar" } | { tipo: "cancelar" };

export function transferenciaReducer(
  fase: FaseTransferencia,
  accion: AccionTransferencia,
): FaseTransferencia {
  switch (accion.tipo) {
    // ¡Vamos a tranferir! Por lo tanto debemos revisar si el estado actual es "preparada" para poder cambiarlo a "enviando". Si no lo es, no hacemos nada.
    case "empezar":
      return fase === "preparada" ? "enviando" : fase;

    // ¡La transferencia va a acabar! (El servidor nos ha respondido). Por lo tanto debemos revisar si el estado actual es "enviando" para poder cambiarlo a "enviada". Si no lo es, no hacemos nada.
    case "terminar":
      return fase === "enviando" ? "enviada" : fase;

    // ¡Nos equivocamos de destinatario o monto!. Por lo tanto debemos revisar si el estado actual es "enviando" para poder cambiarlo a "cancelada". Si no lo es, no hacemos nada.
    case "cancelar":
      return fase === "enviando" ? "cancelada" : fase;
    default: {
      const _exhaustivo: never = accion;
      return _exhaustivo;
    }
  }
}
// transferenciaReducer("cancelada", { tipo: "terminar" }) -> "cancelada"
