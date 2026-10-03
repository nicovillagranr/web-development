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
 *   TEORÍA 2 · lo que se pide antes del `await` se ve    →  drills 4 a 7
 *
 * ▸ EJERCICIO — 7 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/11-useState-useReducer/exercise-08.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito, y los 7 compilan: toda la señal
 *   está en el test. Los drills 2 y 6 llevan una línea `// ¿Por qué?` que reviso yo.
 *   ¿Atascado? Las pistas están en `exercise-08.pistas.md`, de una en una.
 *
 * 👁️ `VotoConMeta` (drill 3) y `Transferencia` (drills 5 y 7) están en `src/App.tsx`.
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
export const respuesta1: [number, number] = [1, 2];

// 2) Predice: ahora el manejador pide tres veces seguidas, y `votos` empieza en 0.
//    Después de UN clic, ¿qué número se ve en pantalla?
//        pedir({ tipo: "votar" });
//        pedir({ tipo: "votar" });
//        pedir({ tipo: "votar" });
export const respuesta2: number = 1;
// ¿Por qué?

// 3) `VotoConMeta` — al llegar a 3 votos tiene que salir "¡Meta alcanzada!". Hoy
//    sale un clic tarde, con 4.
export function VotoConMeta() {
  const [votos, pedir] = useReducer(votosReducer, 0);
  const [aviso, setAviso] = useState("");

  const votar = () => {
    const accion: AccionVoto = { tipo: "votar" };
    pedir(accion);
    if (votos === 3) {
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
export type FaseTransferencia = "lista" | "enviando" | "enviada" | "cancelada";
export type AccionTransferencia = { tipo: "empezar" } | { tipo: "terminar" } | { tipo: "cancelar" };

const textos: Record<FaseTransferencia, string> = {
  lista: "",
  enviando: "Enviando…",
  enviada: "Transferencia enviada",
  cancelada: "Transferencia cancelada",
};

// 4) Predice: el manejador pide "empezar", espera un segundo y pide "terminar".
//    ¿Qué texto se ve en pantalla DURANTE ese segundo?
export type TextoVisible = "" | "Enviando…" | "Transferencia enviada";
export const respuesta4: TextoVisible = "";

// Simula la espera del banco.
const esperar = (ms: number) => new Promise((resolver) => setTimeout(resolver, ms));

// 5) `transferir` — al pulsar "Transferir", "Enviando…" tiene que salir en el acto
//    y quedarse mientras el banco responde. Hoy no sale nunca.
// 6) Predice: pulsas "Transferir" con la fase en "lista", y durante la espera
//    pulsas "Cancelar". Al volver del `await`, ¿qué vale la variable `fase` dentro
//    de `transferir`?
export const respuesta6: FaseTransferencia = "cancelada";
// ¿Por qué?

export function Transferencia() {
  const [fase, pedir] = useReducer(transferenciaReducer, "lista");

  const transferir = async () => {
    await esperar(300);
    pedir({ tipo: "empezar" });
    if (fase !== "cancelada") {
      pedir({ tipo: "terminar" });
    }
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
export function transferenciaReducer(
  fase: FaseTransferencia,
  accion: AccionTransferencia,
): FaseTransferencia {
  switch (accion.tipo) {
    case "empezar":
      return fase === "lista" ? "enviando" : fase;
    case "terminar": // ← drill 7
      return "enviada";
    case "cancelar":
      return fase === "enviando" ? "cancelada" : fase;
    default: {
      const _exhaustivo: never = accion;
      return _exhaustivo;
    }
  }
}
// transferenciaReducer("cancelada", { tipo: "terminar" }) -> "cancelada"
