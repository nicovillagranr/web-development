import { useEffect, useRef, useState } from "react";

/* =============================================================================
 * EJERCICIO 04 — `.current` y `focus()`, viéndolos correr   ·  bloque 12
 * =============================================================================
 *
 * 📌 RECORDATORIO — tu `MapaQueNaceAbierto` (drill 17 del 03), recortado:
 *     const [abierto, setAbierto] = useState(abiertoAlInicio);
 *     const abrirRef = useRef<HTMLButtonElement>(null);
 *     const cerrarRef = useRef<HTMLButtonElement>(null);
 *     useEffect(() => {
 *       if (abierto) cerrarRef.current?.focus();
 *     }, [abierto]);
 *     function cerrar() {
 *       setAbierto(false);
 *       abrirRef.current?.focus();
 *     }
 *
 * 🎯 AL TERMINAR SABRÁS
 *   · enganchar un ref al elemento correcto y abrir la caja con `.current`
 *   · decir qué hay en `.current` en el render, en un efecto y en un manejador
 *   · armar tú un componente que nace abierto y devuelve el foco al cerrarse
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * El 17 del 03 junta en 30 líneas casi toda la 12. Aquí cada pieza es un drill
 * de código: lo ves fallar en el banco, lo arreglas y lo ves funcionar.
 *
 * 🗺️ MAPA DEL ARCHIVO
 *   TEORÍA 1 · el ref es una caja                  →  drills 1 a 4
 *   TEORÍA 2 · cuándo hay algo dentro              →  drills 5 y 6
 *   ESCALERA · el efecto también corre al nacer    →  drills 7 a 11
 *   ARMARLO TÚ                                     →  drills 12 y 13
 *
 * ▸ EJERCICIO — 13 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/12-custom-hooks/exercise-04.test.tsx
 *     pnpm typecheck  ·  pnpm lint
 *   Todos los starters están rotos a propósito. Compilan 11 de 13, 1 pasa el test
 *   con un error de tipos dentro, y el lint marca 2: corre los tres comandos.
 *   Debajo de cada drill, un `// ¿Por qué?` que reviso yo. Las trazas comentadas
 *   (`console.log`) enseñan en la consola qué pasa en cada etapa: descoméntalas.
 *   ¿Atascado? Las pistas, en `exercise-04.pistas.md`. 👁️ Los 13, en el banco (pestaña 12).
 * ===========================================================================*/

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el ref es una caja
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   `useRef` te da una caja que React guarda entre renders. Lo que hay dentro
 *   está en `.current`. Si la enganchas a un elemento con `ref={…}`, React mete
 *   ese elemento dentro; si no, guarda lo que tú le pongas, como un número.
 *
 * SINTAXIS
 *     const botonRef = useRef<HTMLButtonElement>(null);   // la caja, vacía: null
 *     <button ref={botonRef}>Abrir</button>                 // React mete el botón
 *     botonRef.current?.focus();                            // abres la caja y lo usas
 *
 * 🧠 ANALOGÍA — un casillero: `ref={…}` es meter algo dentro, y `.current` es
 *    abrirlo. El casillero no es lo que guarda.
 *
 * ⚠️ TRAMPA — creer que cambiar `.current` repinta la pantalla. Un ref cambia en
 *    silencio: React no se entera y no hay render nuevo. Quien lo pide es un setter.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) `EmpezarContacto` — el botón "Empezar" de tu formulario de contacto lleva el
//    cursor al campo Nombre. El ref ya está enganchado al campo, pero el typecheck
//    se queja, y al pulsar "Empezar" la consola muestra un error.
export function EmpezarContacto() {
  // Con useRef se hace referencia a un elemento del DOM, y se inicializa con null porque al principio no hay ningún elemento asociado.
  const nombreRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      {/* Cuando el usuario haga click en este botón:
      - Este evaluará si nombreRef.current no es null (es decir, si el input o campo de texto ya ha sido renderizado y está disponible en el DOM).
      - Si nombreRef.current no es null, se llamará al método focus() del input, lo que hará que el cursor se coloque en ese campo de texto, permitiendo al usuario empezar a escribir su nombre inmediatamente.
      */}
      <button type="button" onClick={() => nombreRef.current?.focus()}>
        Empezar
      </button>
      <input ref={nombreRef} aria-label="Nombre" />
    </div>
  );
}
// <EmpezarContacto />
// ¿Por qué?
// ref={nombreRef} conecta la referencia con el input.
// Al pulsar "Empezar", nombreRef.current apunta al input.
// ?. comprueba que exista antes de llamar a focus().
// focus() coloca el foco en el campo Nombre para poder escribir.

// 2) `EscribirMensaje` — lo mismo con el campo Mensaje, un `<textarea>`. Este sí
//    funciona en el navegador, pero el typecheck no lo deja pasar.
//    Sin `!` detrás de `.current`: es otra forma de callar a TypeScript, como `as`.
export function EscribirMensaje() {
  const mensajeRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div>
      {/*
        El ! después de .current le dice a TypeScript:
        "Confía en mí, este valor no es null ni undefined".

        No comprueba si el elemento existe ni evita errores.
        Solo silencia la advertencia de TypeScript.

        Si current fuera null al pulsar el botón, focus()
        produciría un error en tiempo de ejecución.

        A diferencia de !, el ?. comprueba si current existe:
        si es null, no ejecuta focus() y evita el error.

        Pero en este caso, igualmente usaremos el ? porque no queremos que el código falle si el elemento no está presente.
      */}
      <button type="button" onClick={() => mensajeRef.current?.focus()}>
        Escribir mensaje
      </button>
      <textarea ref={mensajeRef} aria-label="Mensaje" />
    </div>
  );
}
// <EscribirMensaje />
// ¿Por qué? Si al pulsar el botón el campo siempre está, ¿de qué te protege TypeScript?
//  TypeScript no puede garantizar que el elemento exista en el DOM en el momento del click, por eso advierte que current podría ser null. El ! le dice a TypeScript que confíe en que no será null, pero no evita errores si el elemento no está presente.

// 3) `CorregirCorreo` — en el resumen antes de enviar, "Corregir el correo" lleva el
//    cursor al campo Correo. Hoy lo lleva a otro sitio.
export function CorregirCorreo() {
  const correoRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <p>Revisa tus datos antes de enviar.</p>
      <input aria-label="Nombre" defaultValue="Nicolás" />
      <input ref={correoRef} aria-label="Correo" defaultValue="nico@correo" />
      <button type="button" onClick={() => correoRef.current?.focus()}>
        Corregir el correo
      </button>
    </div>
  );
}
// <CorregirCorreo />
// ¿Por qué?
// onClick ejecuta una función que llama a focus() en correoRef.current, que apunta a un input. Nuestra misión es hacer que ese input sea específicamente el de correo.
// El cursor se coloca en ese campo para permitir la corrección del correo electrónico.

// 4) `MeGusta` — el botón cuenta sus clics y los muestra en su texto: "3 me gusta".
//    Hoy, al pulsarlo, el número no cambia.
//    👀 En el banco, pulsa unas cuantas veces y después "Repintar el padre".
export function MeGusta() {
  const [likes, setLikes] = useState(0);

  return (
    <button
      type="button"
      onClick={() => {
        setLikes(likes + 1);
      }}
    >
      {likes} me gusta
    </button>
  );
}
// <MeGusta />
// ¿Por qué? ¿Qué pasaba con el número cuando pulsabas "Repintar el padre"?
// useRef no causa re-render, pero useState sí. Al pulsar "Repintar el padre", el componente se vuelve a renderizar y muestra el número actualizado de likes. Sin embargo, al hacer clic en el botón, aunque se actualiza el estado, no se refleja inmediatamente en la interfaz hasta que ocurre un re-render.

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — cuándo hay algo dentro
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   `.current` solo tiene el elemento mientras el elemento está en la página. En
 *   el RENDER del montaje, todavía no: el JSX es un plano. React lo pinta después,
 *   mete el elemento en la caja, y entonces corren los EFECTOS. Un MANEJADOR corre
 *   con la página tal como está, y su setter pide un render para cuando termine.
 *
 * SINTAXIS — qué hay en `campoRef.current`, según dónde lo mires:
 *     suelto en el cuerpo, en el montaje         →  null
 *     dentro de un `useEffect`                   →  el <input>, si se pintó
 *     en un manejador, justo tras un setter      →  lo de ANTES del setter
 *
 * 🧠 ANALOGÍA — la casa: el render es el plano, el efecto es la ronda del
 *    vigilante cuando termina la obra, y el manejador es el timbre: abre puertas
 *    que ya existen, no las que llegarán con la próxima obra.
 *
 * ⚠️ TRAMPA — creer que el render corre una vez. Corre en el montaje y en cada
 *    re-render: lo que pongas suelto en el cuerpo se repite cada vez.
 *    En `pnpm dev` verás las trazas del render dos veces: es StrictMode.
 * ───────────────────────────────────────────────────────────────────────────── */

// 5) `FormularioQueNaceEnfocado` — cuando aparece el formulario, el cursor tiene que
//    estar ya en Nombre. Y una sola vez: si luego escribes en Correo, el cursor se
//    queda en Correo. Hoy nace sin cursor.
//    Sin `autoFocus`: en producción valdría, pero aquí se entrena el ref.
//    💡 Si descomentas la traza, el lint también se queja de ella: leer `.current`
//       en el render es justo lo que se entrena a no hacer. Para mirar, vale.
export function FormularioQueNaceEnfocado() {
  // Seteamos el valor inicial de nombre con useState
  const [nombre, setNombre] = useState("");
  // Seteamos el valor inicial de correo con useState
  const [correo, setCorreo] = useState("");
  // Creamos una referencia al input de nombre usando useRef, inicializándola con null
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Cuando el componente se monta, enfocamos el input de nombre usando la referencia inputRef. Si inputRef.current es null, no se hace nada.
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        aria-label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input aria-label="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
    </div>
  );
}
// <FormularioQueNaceEnfocado />
// ¿Por qué?
// Necesitamos que el cursor esté en el campo Nombre al montar el componente.
// Usamos useEffect para asegurarnos de que el input ya está en el DOM antes de intentar enfocarlo.
// El inputRef nos permite acceder al elemento del DOM y llamar a focus() para colocar el cursor allí.

// 6) `NotaRapida` — "Añadir nota" abre un panel con el campo Nota, y el cursor tiene
//    que caer dentro en cuanto aparece. Hoy el panel aparece y el cursor no llega.
//    Sin `autoFocus`.
//    👀 Descomenta las dos trazas y mira en qué orden salen en la consola.
export function NotaRapida() {
  // Seteamos el estado inicial de abierta con useState, indicando que el panel de nota no está abierto al inicio
  const [abierta, setAbierta] = useState(false);
  // Creamos una referencia al textarea de nota usando useRef, inicializándola con null
  const notaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Cuando el estado de abierta cambia, si el panel está abierto, enfocamos el textarea de nota usando la referencia notaRef. Si notaRef.current es null, no se hace nada.
    if (abierta) {
      notaRef.current?.focus();
    }
    // El array de dependencias [abierta] asegura que este efecto se ejecute cada vez que el estado de abierta cambie, permitiendo que el cursor se coloque en el textarea cuando el panel se abre.
  }, [abierta]);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setAbierta(true);
        }}
      >
        Añadir nota
      </button>
      {/* Cuando el estado de abierta cambia a true:
      - Se renderiza el div padre
      - Se renderiza el textarea de nota con referencia a notaRef para enfocarlo con el cursor
      - Se renderiza el botón que al hacer click, cierra el div */}
      {abierta && (
        <div role="region" aria-label="Nota rápida">
          <textarea ref={notaRef} aria-label="Nota" />
          <button type="button" onClick={() => setAbierta(false)}>
            Guardar nota
          </button>
        </div>
      )}
    </div>
  );
}
// <NotaRapida />
// ¿Por qué?
// La referencia no estaba mal: estaba mal el momento. En el manejador, setAbierta(true) solo
// pide el render (la carta al buzón), así que en la línea siguiente el textarea todavía no
// existía, notaRef.current era null y el ?. no hacía nada.
// Por eso se usa el useEffect con [abierta] en sus dependencias, para que todo vaya en orden:
// el efecto corre después del render que pinta el textarea, cuando la caja ya lo tiene dentro.

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ESCALERA — el efecto también corre al nacer (drills 7 a 11)
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Un efecto corre después del render del montaje, y otra vez cada vez que cambia
 *   algo de su array. No sabe POR QUÉ corre: solo ve el estado de ese render. Un
 *   manejador, en cambio, solo corre cuando alguien pulsa.
 *
 * SINTAXIS — lo que ve `useEffect(() => { … }, [abierto])` en un menú:
 *     el menú nace cerrado       →  el efecto corre con `abierto = false`
 *     el usuario lo abre         →  corre con `true`
 *     el usuario lo cierra       →  corre con `false`, igual que al nacer
 *
 * 🧠 ANALOGÍA — el vigilante: da una ronda al terminar la obra, y otra cada vez que
 *    cambia lo que vigila. Mira la foto: ve la puerta cerrada, pero no sabe si
 *    nunca se abrió o si la acaban de cerrar. Eso solo lo sabe el timbre.
 *
 * 🗣️ LAS PIEZAS
 *     `if (abierto)` dentro del efecto  →  guardia que lee el estado: la foto
 *     `primeraVezRef`                   →  bandera: un ref que escribe el propio
 *                                          efecto, su libreta
 *
 * ⚠️ TRAMPA — creer que la bandera "se salta el montaje". Se salta la PRIMERA
 *    pasada del efecto. Al nacer hay dos pasadas en `pnpm dev` (StrictMode) y una
 *    en producción, así que la bandera no hace lo mismo en los dos sitios.
 * ───────────────────────────────────────────────────────────────────────────── */

// 7) `FiltrosConVuelta` — en tu portfolio, "Filtrar proyectos" abre el panel de
//    filtros y "Aplicar" lo cierra. Al cerrarse, "Aplicar" desaparece con el panel
//    y el foco se pierde: tiene que volver a "Filtrar proyectos".
//    Sin `useEffect`: el efecto llega en el siguiente.
export function FiltrosConVuelta() {
  const [abierto, setAbierto] = useState(false);
  const filtrarRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <button ref={filtrarRef} type="button" onClick={() => setAbierto(true)}>
        Filtrar proyectos
      </button>
      {abierto && (
        <div role="region" aria-label="Filtros">
          <p>React · TypeScript · Tailwind</p>
          <button type="button" onClick={() => setAbierto(false)}>
            Aplicar
          </button>
        </div>
      )}
    </div>
  );
}
// <FiltrosConVuelta />
// ¿Por qué? En el 6, el `focus()` del manejador no hacía nada. ¿Por qué aquí sí?
//

// 8) `MenuQueRobaAlNacer` — el menú móvil de Projex. Al pulsar "Cerrar menú", el
//    foco tiene que volver a "Abrir menú". Y al montarse no le quita el foco a
//    nadie: hoy se lo quita nada más nacer, sin que nadie haya cerrado nada.
//    👀 Descomenta la traza y pulsa "Montar el menú" en el banco: mira cuántas veces
//       corre el efecto al nacer, y con qué `abierto`.
export function MenuQueRobaAlNacer() {
  const [abierto, setAbierto] = useState(false);
  const abrirRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // console.log("efecto · abierto =", abierto);
    if (!abierto) {
      abrirRef.current?.focus();
    }
  }, [abierto]);

  return (
    <div>
      <button ref={abrirRef} type="button" onClick={() => setAbierto(true)}>
        Abrir menú
      </button>
      {abierto && (
        <nav aria-label="Menú">
          <p>Inicio · Proyectos · Contacto</p>
          <button type="button" onClick={() => setAbierto(false)}>
            Cerrar menú
          </button>
        </nav>
      )}
    </div>
  );
}
// <MenuQueRobaAlNacer />
// ¿Por qué? ¿Por qué el efecto del starter no podía saber si el menú acababa de cerrarse?
//

// 9) `MenuConBandera` — el mismo menú, con el arreglo que se le ocurre a casi todo el
//    mundo: una bandera para saltarse el montaje. En producción funciona, pero en
//    `pnpm dev` sigue robando el foco al nacer. Tiene que funcionar en los dos.
//    👀 Descomenta la traza y, en el banco, monta el menú de las dos maneras: mira
//       cuántas pasadas da el efecto al nacer en cada una, y qué lee en cada pasada.
export function MenuConBandera() {
  const [abierto, setAbierto] = useState(false);
  const abrirRef = useRef<HTMLButtonElement>(null);
  const primeraVezRef = useRef(true);

  useEffect(() => {
    // console.log("efecto · bandera =", primeraVezRef.current, "· abierto =", abierto);
    if (primeraVezRef.current) {
      primeraVezRef.current = false;
      return;
    }
    if (!abierto) {
      abrirRef.current?.focus();
    }
  }, [abierto]);

  return (
    <div>
      <button ref={abrirRef} type="button" onClick={() => setAbierto(true)}>
        Abrir menú
      </button>
      {abierto && (
        <nav aria-label="Menú">
          <p>Inicio · Proyectos · Contacto</p>
          <button type="button" onClick={() => setAbierto(false)}>
            Cerrar menú
          </button>
        </nav>
      )}
    </div>
  );
}
// <MenuConBandera />
// ¿Por qué? Si la bandera no se saltaba el montaje, ¿qué se saltaba?
//

// 10) `ContactoQueNaceAbierto` — si el visitante llega a Projex con `#contacto` en la
//     dirección, el formulario nace abierto. Cuando aparece, naciendo abierto o al
//     pulsar "Escribirnos", el cursor tiene que quedar en Nombre. Si nace cerrado, no
//     le roba el foco a nadie. Hoy, naciendo abierto, en producción el cursor no llega
//     (en `pnpm dev`, de casualidad, sí).
//     👀 En el banco, monta el abierto "como en producción" y luego "en pnpm dev".
export function ContactoQueNaceAbierto({ abiertoAlInicio }: { abiertoAlInicio: boolean }) {
  const [abierto, setAbierto] = useState(abiertoAlInicio);
  const nombreRef = useRef<HTMLInputElement>(null);
  const primeraVezRef = useRef(true);

  useEffect(() => {
    // console.log("efecto · bandera =", primeraVezRef.current, "· abierto =", abierto);
    if (primeraVezRef.current) {
      primeraVezRef.current = false;
      return;
    }
    if (abierto) {
      nombreRef.current?.focus();
    }
  }, [abierto]);

  return (
    <div>
      <button type="button" onClick={() => setAbierto(true)}>
        Escribirnos
      </button>
      {abierto && (
        <div role="region" aria-label="Contacto">
          <input ref={nombreRef} aria-label="Nombre" />
        </div>
      )}
    </div>
  );
}
// <ContactoQueNaceAbierto abiertoAlInicio />
// ¿Por qué? Naciendo abierto, ¿por qué funcionaba en `pnpm dev` y en producción no?
//

// 11) `ConfirmarEnvio` — antes de enviar tu formulario de contacto, Projex pregunta
//     "¿Enviamos tu mensaje?". Cuando aparece la pregunta, el foco tiene que caer en
//     "Confirmar"; al pulsar "Volver a editar", vuelve a "Enviar". Y al montarse no
//     le roba el foco a nadie. Hoy lo roba al nacer, y el foco no llega a "Confirmar".
//     ("Confirmar" todavía no envía nada: aquí solo cuenta el foco.)
export function ConfirmarEnvio() {
  const [confirmando, setConfirmando] = useState(false);
  const enviarRef = useRef<HTMLButtonElement>(null);
  const confirmarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!confirmando) {
      enviarRef.current?.focus();
    }
  }, [confirmando]);

  return (
    <div>
      <button
        ref={enviarRef}
        type="button"
        onClick={() => {
          setConfirmando(true);
          confirmarRef.current?.focus();
        }}
      >
        Enviar
      </button>
      {confirmando && (
        <div role="region" aria-label="Confirmar envío">
          <p>¿Enviamos tu mensaje?</p>
          <button ref={confirmarRef} type="button">
            Confirmar
          </button>
          <button type="button" onClick={() => setConfirmando(false)}>
            Volver a editar
          </button>
        </div>
      )}
    </div>
  );
}
// <ConfirmarEnvio />
// ¿Por qué? ¿Por qué la ida va en un sitio y la vuelta en otro?
//

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ARMARLO TÚ — las piezas de la escalera, juntas
 * ─────────────────────────────────────────────────────────────────────────────
 *   lo que aparece con un render    →  se enfoca en un efecto, no en el render
 *   lo que ya está en la página     →  se enfoca en el manejador
 *   no robar el foco al nacer       →  el `if` del efecto mira el estado, no una bandera
 *
 *   Tu 17 del recordatorio es exactamente eso: la ✕ en el efecto con `if (abierto)`,
 *   y la vuelta a "Abrir mapa" en el manejador `cerrar`.
 * ───────────────────────────────────────────────────────────────────────────── */

// 12) `AvisoDescartable` — al pulsar "Descartar", el aviso se va con su botón, y el
//     foco tiene que volver a "Ver aviso" para no perderse. Además, cuando el
//     componente aparece en la página, no le quita el foco a nadie. Hoy sí se lo quita.
export function AvisoDescartable() {
  // Setamos el estado inicial de visible con useState, indicando que el aviso no está visible al inicio
  const [visible, setVisible] = useState(false);
  // Creamos una referencia al botón "Ver aviso" usando useRef, inicializándola con null
  const verRef = useRef<HTMLButtonElement>(null);

  // Bandera
  const primeraVezRef = useRef(true);

  useEffect(() => {
    // Primera ejecución: no enfocamos nada.
    if (primeraVezRef.current) {
      primeraVezRef.current = false;
      return;
    }

    // Si el aviso acaba de cerrarse, devolvemos el foco.
    if (!visible) {
      verRef.current?.focus();
    }
  }, [visible]);

  return (
    <div>
      <button ref={verRef} type="button" onClick={() => setVisible(true)}>
        Ver aviso
      </button>
      {visible && (
        <div>
          <p role="status">Tu mensaje se envió.</p>
          <button type="button" onClick={() => setVisible(false)}>
            Descartar
          </button>
        </div>
      )}
    </div>
  );
}
// <AvisoDescartable />
// ¿Por qué?
//

// 13) `BuscadorQueNaceAbierto` — el buscador del drill 2 del 03, ahora como tu
//     `MapModal`: puede nacer abierto. Cuando aparece, el cursor tiene que quedar en
//     el campo Ciudad; al pulsar "Cerrar buscador", el foco vuelve a "Abrir buscador".
//     Y si nace cerrado, no le roba el foco a nadie. Hoy falla al nacer abierto, al
//     abrirlo, y al montarse cerrado en `pnpm dev`.
//     Sin `autoFocus`: en producción valdría, pero aquí se entrena armarlo tú.
export function BuscadorQueNaceAbierto({ abiertoAlInicio }: { abiertoAlInicio: boolean }) {
  const [abierto, setAbierto] = useState(abiertoAlInicio);
  const abrirRef = useRef<HTMLButtonElement>(null);
  const campoRef = useRef<HTMLInputElement>(null);
  const primeraVezRef = useRef(true);

  useEffect(() => {
    if (primeraVezRef.current) {
      primeraVezRef.current = false;
      return;
    }
    if (!abierto) {
      abrirRef.current?.focus();
    }
  }, [abierto]);

  return (
    <div>
      <button
        ref={abrirRef}
        type="button"
        onClick={() => {
          setAbierto(true);
          campoRef.current?.focus();
        }}
      >
        Abrir buscador
      </button>

      {abierto && (
        <div role="search" aria-label="Buscador de ciudades">
          <input ref={campoRef} aria-label="Ciudad" />
          <button type="button" onClick={() => setAbierto(false)}>
            Cerrar buscador
          </button>
        </div>
      )}
    </div>
  );
}
// <BuscadorQueNaceAbierto abiertoAlInicio />
// ¿Por qué?
//
