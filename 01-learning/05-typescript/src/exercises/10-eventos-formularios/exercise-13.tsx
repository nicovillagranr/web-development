/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — el estado que aparece cuando enviar deja de ser instantáneo
 *
 *     type EstadoEnvio = "idle" | "submitting" | "success"
 *
 *     idle        el formulario está quieto, esperando a que el usuario haga algo
 *     submitting  se pulsó enviar y la respuesta todavía no ha vuelto
 *     success     volvió, y volvió bien
 *
 * Son los tres nombres que usa el formulario de contacto de Projex, tal cual.
 * ───────────────────────────────────────────────────────────────────────────── */

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

/* =============================================================================
 * 13 · EL ESTADO DEL ENVÍO · ampliación 3/5
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · escribir un tipo que solo admita una lista cerrada de textos, y anotarlo en
 *     el `useState` para que una errata deje de compilar
 *   · marcar un manejador de envío como `async` y esperar dentro a que termine el
 *     viaje al servidor
 *   · pintar el botón, su bloqueo y el aviso de éxito a partir del estado
 *   · meter dos cambios de estado en un mismo evento, uno de ellos bajo condición
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * Hasta el `12b` enviar era instantáneo: pulsabas y el resultado ya estaba ahí. En un
 * formulario de verdad hay un rato en medio en el que la respuesta no ha vuelto y el
 * usuario no sabe si su clic sirvió de algo. Ese rato hay que guardarlo en algún sitio.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 *   TEORÍA 1 → drills 1-2   · la lista cerrada de textos
 *   TEORÍA 2 → drills 3-5   · el manejador que espera
 *   TEORÍA 3 → drills 5a-5d · la escalera del 5, un evento que toca dos estados
 *
 * ▸ EJERCICIO — 9 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-13.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters de este archivo están rotos a propósito, y 2 de los 9 pueden
 *   pasar el test con el fallo dentro: corre siempre los dos comandos.
 *   ¿Atascado? Las pistas están en `exercise-13.pistas.md`, de una en una.
 * ===========================================================================*/

type EstadoEnvio = "idle" | "submitting" | "success";

/* El viaje al servidor, fingido: tarda un poco y siempre sale bien. En Projex esto es
 * `await new Promise(resolve => setTimeout(resolve, 1500))`, y el día que haya API de
 * verdad será un `fetch`. Aquí no se toca. */
function enviarAlServidor(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 200));
}
// envirAlServidor().then(() => console.log("ya volvió")) Cuando haya pasado un rato, verás el mensaje en la consola. Mientras tanto, la página sigue viva.

/* ── TEORÍA 1 · la lista cerrada de textos ────────────────────────────────────
 *
 * DEFINICIÓN
 *   Un texto entre comillas también sirve como TIPO: `"rojo"` es el tipo de las
 *   cadenas cuyo único valor posible es "rojo". Uniendo varios con `|` sale un tipo
 *   que admite esos y ninguno más.
 *
 * SINTAXIS
 *   type Semaforo = "rojo" | "ambar" | "verde"
 *                     └── cada rama es un valor, no el nombre de otro tipo
 *
 * EJEMPLO
 *   let luz: Semaforo = "rojo"
 *   luz = "verde"   // ✅
 *   luz = "azul"    // ❌ te para el compilador, no el navegador
 *
 * 🧠 ANALOGÍA
 *   `string` es un campo en blanco: escribes lo que quieras. Una unión de literales
 *   es un desplegable: solo puedes elegir una de las opciones que trae.
 *
 * 🗣️ LAS PIEZAS
 *   `"rojo"` puesto donde va un tipo → tipo literal de cadena · `|` → unión ·
 *   el conjunto de los tres → unión de literales
 *
 * ⚠️ TRAMPA
 *   `let luz = "rojo"` sin anotar NO te da `Semaforo`, te da `string` — y con
 *   `string` vuelve a valer cualquier cosa. El tipo estrecho hay que pedirlo.
 * ──────────────────────────────────────────────────────────────────────────── */

// 1) `textoDelBoton` — el botón no dice lo mismo mientras espera que cuando ya
//    terminó. Traduce cada estado a su texto: "Enviar mensaje" con el formulario
//    quieto, "Enviando..." mientras va y "Enviado" cuando volvió bien.
//    Lo que le entra es un estado del envío, no un texto cualquiera, y su firma
//    todavía no lo dice.
export function textoDelBoton(estado: EstadoEnvio): string {
  switch (estado) {
    case "idle":
      return "Enviar mensaje";
    case "submitting":
      return "Enviando...";
    case "success":
      return "Enviado";
    default:
      return "";
  }
}
// textoDelBoton("idle") -> "Enviar mensaje"
// textoDelBoton("submitting") -> "Enviando..."

// 2) `PanelDeEstado` — antes de meter esto dentro de un formulario, míralo suelto:
//    guarda el estado del envío y pinta en un <p> el texto que le devuelve la
//    función de arriba. Tres botones lo mueven a mano — "Enviar" lo pone en
//    enviando, "Terminar" en enviado y "Reiniciar" lo devuelve a quieto.
export function PanelDeEstado() {
  const [estado, setEstado] = useState<EstadoEnvio>("idle");

  return (
    <>
      <div>
        <p>{textoDelBoton(estado)}</p>
        <button onClick={() => setEstado("submitting")}>Enviar</button>
        <button onClick={() => setEstado("success")}>Terminar</button>
        <button onClick={() => setEstado("idle")}>Reiniciar</button>
      </div>
    </>
  );
}
// <PanelDeEstado />

/* ── TEORÍA 2 · el manejador que espera ───────────────────────────────────────
 *
 * DEFINICIÓN
 *   `async` marca una función como "esta tarda". Por dentro puede usar `await`, que
 *   deja esa función en pausa hasta que la promesa que espera termina. El resto de
 *   la página sigue funcionando mientras tanto.
 *
 * SINTAXIS
 *   const alEnviar = async (e: FormEvent<HTMLFormElement>) => {
 *     await pedirAlServidor()
 *   //└── sin él no esperas nada: la línea de abajo se ejecuta al instante
 *   }
 *
 * EJEMPLO
 *   async function saludar() {
 *     console.log("voy")
 *     await esperar(1000)
 *     console.log("ya")   // un segundo después, y "voy" lleva un rato en pantalla
 *   }
 *
 * 🧠 ANALOGÍA
 *   Pides la comida y te dan un busca. No te quedas mirando la cocina: te sientas, y
 *   el busca suena cuando está lista. `await` es el busca.
 *
 * 🗣️ LAS PIEZAS
 *   `async` → marca la función · `await` → espera a la promesa · lo que devuelve una
 *   función `async` → una promesa, siempre
 *
 * ⚠️ TRAMPA
 *   Mientras esperas, la pantalla sigue viva y el usuario sigue pudiendo pulsar. Que
 *   tu función esté detenida en el `await` no detiene a nadie más.
 * ──────────────────────────────────────────────────────────────────────────── */

// 3) `FormularioAviso` — el viaje al servidor tarda, y durante ese rato el usuario
//    merece saber que su clic sirvió de algo. Al enviar, el formulario pasa por
//    enviando mientras `enviarAlServidor()` hace su trabajo y termina en enviado,
//    con un <p role="status"> que dice "Mensaje enviado correctamente".
//    El campo es un <input> con `aria-label` "Mensaje", y el texto del botón sale de
//    `textoDelBoton`, así que cambia solo.
export function FormularioAviso() {
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState<EstadoEnvio>("idle");

  const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
    setMensaje(e.target.value);
  };

  const alEnviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEstado("submitting");
    enviarAlServidor().then(() => {
      setEstado("success");
    });
  };

  return (
    <form onSubmit={alEnviar}>
      <input
        type="text"
        name="mensaje"
        aria-label="Mensaje"
        value={mensaje}
        onChange={alEscribir}
      />
      <button type="submit">{textoDelBoton(estado)}</button>
      {estado === "success" && <p role="status">Mensaje enviado correctamente</p>}
    </form>
  );
}
// <FormularioAviso />

// 4) `FormularioSinDobleEnvio` — bug real del formulario de Projex: el botón sigue
//    pulsable durante el segundo y medio que tarda el envío, así que dos clics
//    seguidos mandan el mensaje dos veces. Aquí eso se ve en el recuento
//    "Enviados: N", que sube una vez por cada envío terminado.
//    Deja el botón inutilizable mientras el envío está en marcha.
//    El `setEnviados` ya está escrito y no hay que tocarlo.
export function FormularioSinDobleEnvio() {
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState<EstadoEnvio>("idle");
  const [enviados, setEnviados] = useState(0);

  const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
    setMensaje(e.target.value);
  };

  const alEnviar = async (e: FormEvent<HTMLFormElement>) => {
    // 1. Interceptar el envío
    // Evita que el navegador recargue la página, que es lo que hace
    // por defecto un <form> al enviarse.
    e.preventDefault();

    // 2. Entrar en "enviando" (síncrono)
    // Ocurre antes del await, así que React re-renderiza y el botón
    // queda deshabilitado antes de que pueda llegar un segundo clic.
    setEstado("submitting");

    // 3. Esperar al servidor (~1,5 s)
    // La función se pausa aquí mientras el botón sigue deshabilitado.
    // Si la promesa falla, la ejecución se corta en esta línea y la
    // etapa 4 nunca ocurre, por lo que el botón se queda bloqueado.
    await enviarAlServidor();

    // 4. Cerrar con éxito
    // React agrupa estos dos setState en un solo render (el batching
    // automático también funciona después de un await). El contador
    // sube y el botón vuelve a habilitarse.
    setEnviados((n) => n + 1);
    setEstado("success");
  };

  return (
    <form onSubmit={alEnviar}>
      <input
        type="text"
        name="mensaje"
        aria-label="Mensaje"
        value={mensaje}
        onChange={alEscribir}
      />
      {/* El botón estará desactivado cuando estado esté en "submitting", osea enviando */}
      <button type="submit" disabled={estado === "submitting"}>
        {textoDelBoton(estado)}
      </button>
      <p>Enviados: {enviados}</p>
    </form>
  );
}
// <FormularioSinDobleEnvio />

// 5) `FormularioQueVuelveAIdle` — el aviso de éxito envejece: si el usuario vuelve a
//    escribir, ya no hay nada enviado, hay un mensaje nuevo a medias. Haz que el
//    aviso y el "Enviado" del botón desaparezcan en cuanto teclee, sin perder lo que
//    va escribiendo. Escribir en cualquier otro momento —antes del primer envío, o
//    con uno todavía en marcha— no cambia nada más que el texto del campo.
export function FormularioQueVuelveAIdle() {
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState<EstadoEnvio>("idle");

  const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
    setMensaje(e.target.value);
    if (estado === "success") {
      setEstado("idle");
    }
  };

  const alEnviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEstado("submitting");
    await enviarAlServidor();
    setEstado("success");
  };

  return (
    <form onSubmit={alEnviar}>
      <input
        type="text"
        name="mensaje"
        aria-label="Mensaje"
        value={mensaje}
        onChange={alEscribir}
      />
      <button type="submit">{textoDelBoton(estado)}</button>
      {estado === "success" && <p role="status">Mensaje enviado correctamente</p>}
    </form>
  );
}
// <FormularioQueVuelveAIdle />

/* ── TEORÍA 3 · un manejador puede tocar más de un estado ─────────────────────
 *
 * DEFINICIÓN
 *   Un manejador no está obligado a cambiar un solo estado. Puede llamar a varios
 *   setters en el mismo evento, y puede envolver alguno en un `if` para que ese se
 *   aplique solo cuando toque.
 *
 * SINTAXIS
 *   const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
 *     setMensaje(e.target.value)     // esto, siempre
 *     if (estado === "success") {    // └── la guardia mira el estado de AHORA
 *       setEstado("idle")            //     esto, solo a veces
 *     }
 *   }
 *
 * EJEMPLO
 *   En "success", teclear una letra deja el estado en "idle". En "submitting", teclear
 *   la misma letra lo deja en "submitting": la primera línea corre igual, la segunda
 *   no entra.
 *
 * 🧠 ANALOGÍA
 *   Al salir de casa siempre coges las llaves, y solo si llueve coges además el
 *   paraguas. Mirar el cielo no te hace olvidar las llaves.
 *
 * 🗣️ LAS PIEZAS
 *   el `if` dentro del manejador → guardia · lo que la guardia lee → el estado de este
 *   render · las dos llamadas juntas → dos actualizaciones en un mismo evento
 *
 * ⚠️ TRAMPA
 *   Sin guardia el reset se aplica siempre, y "siempre" incluye los momentos en los que
 *   no había nada que resetear. El daño no se ve en la línea que escribes, se ve en el
 *   estado que pisas sin querer.
 * ──────────────────────────────────────────────────────────────────────────── */

/* ESCALERA DEL 5 — cuatro pasos que separan lo que el drill 5 hacía todo junto: meter dos
 * setters en un evento (5a), colocar el reset donde vive (5b), ponerle la guardia (5c) y
 * pedirla desde otro evento (5d). En estos cuatro `pnpm typecheck` no va a decir nada,
 * porque no hay ningún tipo mal puesto: la señal está solo en los tests. Los dos últimos
 * usan `type EstadoEnvio = "idle" | "submitting" | "success"`, que está arriba del todo. */

// 5a) `CampoQueSeMarca` — un formulario no debería regañar por un campo vacío que el
//     usuario todavía no ha rellenado, así que necesita saber si ya escribió en él.
//     Guarda dos cosas al escribir: el texto y el hecho de que el campo ya se tecleó.
//     El <p> dice "sin teclear" hasta la primera tecla y "tecleado" desde entonces, sin
//     perder lo que se vaya escribiendo. El <input> lleva `aria-label` "Nombre".
export function CampoQueSeMarca() {
  const [nombre, setNombre] = useState("");
  const [tecleado, setTecleado] = useState(false);

  const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value);
    setTecleado(true);
  };

  return (
    <div>
      <input
        type="text"
        aria-label="Nombre"
        value={nombre}
        onChange={alEscribir}
        onBlur={() => setTecleado(true)}
      />
      <p>{tecleado ? "tecleado" : "sin teclear"}</p>
    </div>
  );
}
// <CampoQueSeMarca />

// 5b) `AvisoQueSeVa` — el aviso de "Guardado" se queda en pantalla mientras el usuario
//     sigue escribiendo, y a partir de ahí está mintiendo. El botón "Marcar guardado" lo
//     enciende; consigue que se apague en cuanto se teclee, sin borrar el texto.
//     Aquí no hay envío que tarde y solo hay dos situaciones posibles, así que el
//     apagado no necesita ninguna condición. El <input> lleva `aria-label` "Nota".
export function AvisoQueSeVa() {
  const [nota, setNota] = useState("");
  const [guardado, setGuardado] = useState(false);

  const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
    setNota(e.target.value);
    if (guardado) {
      setGuardado(false);
    }
  };

  return (
    <div>
      <input type="text" aria-label="Nota" value={nota} onChange={alEscribir} />
      <button onClick={() => setGuardado(true)}>Marcar guardado</button>
      {guardado && <p role="status">Guardado</p>}
    </div>
  );
}
// <AvisoQueSeVa />

// 5c) `AvisoConEnvioLento` — el mismo aviso, pero ahora enviar tarda, y el apagado suelto
//     del 5b está copiado aquí tal cual. Con un envío de por medio ya no sirve: hay un
//     momento en el que apagar el aviso destruye información que el usuario necesita.
//     Consigue que escribir durante el envío no cambie nada más que el texto, sin perder
//     lo que ya funciona después del envío.
//     El <input> lleva `aria-label` "Mensaje" y el texto del botón sale de `textoDelBoton`.

// type EstadoEnvio = "idle" | "submitting" | "success";

export function AvisoConEnvioLento() {
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState<EstadoEnvio>("idle");

  const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
    setMensaje(e.target.value);
    if (estado !== "submitting") {
      setEstado("idle");
    }
  };

  const alEnviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEstado("submitting");
    await enviarAlServidor();
    setEstado("success");
  };

  return (
    <form onSubmit={alEnviar}>
      <input type="text" aria-label="Mensaje" value={mensaje} onChange={alEscribir} />
      <button type="submit">{textoDelBoton(estado)}</button>
      {estado === "success" && <p role="status">Guardado</p>}
    </form>
  );
}
// <AvisoConEnvioLento />

// 5d) `BotonLimpiarProtegido` — "Limpiar" vacía el campo, y pulsarlo en mitad de un envío
//     deja el formulario contando dos cosas que no encajan entre sí. Haz que "Limpiar" no
//     haga nada mientras el envío está en marcha, y que con el formulario quieto siga
//     vaciando el campo.
//     No vale apagarlo con `disabled`: la guardia va dentro del manejador, y el test
//     comprueba que ese botón se puede pulsar en todo momento.

// type EstadoEnvio = "idle" | "submitting" | "success";

export function BotonLimpiarProtegido() {
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState<EstadoEnvio>("idle");

  const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
    setMensaje(e.target.value);
  };

  const alLimpiar = () => {
    if (estado !== "submitting") {
      setMensaje("");
    }
  };

  const alEnviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEstado("submitting");
    await enviarAlServidor();
    setEstado("success");
  };

  return (
    <form onSubmit={alEnviar}>
      <input type="text" aria-label="Mensaje" value={mensaje} onChange={alEscribir} />
      <button type="submit">{textoDelBoton(estado)}</button>
      <button type="button" onClick={alLimpiar}>
        Limpiar
      </button>
    </form>
  );
}
// <BotonLimpiarProtegido />

/* ─────────────────────────────────────────────────────────────────────────────
 * Con esto ya tienes sueltas las tres piezas del formulario de contacto de verdad:
 * el estado en objeto, los errores y el envío. El `14` es juntarlas en uno solo,
 * escrito por ti desde la hoja en blanco.
 * ───────────────────────────────────────────────────────────────────────────── */
