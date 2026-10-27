import { useEffect, useRef, useState } from "react";

/* =============================================================================
 * EJERCICIO 04 — .current y focus(), viéndolos correr · bloque 12
 *
 * 📌 RECORDATORIO — tu MapaQueNaceAbierto (drill 17 del 03), recortado:
 * const [abierto, setAbierto] = useState(abiertoAlInicio);
 * const abrirRef = useRef<HTMLButtonElement>(null);
 * const cerrarRef = useRef<HTMLButtonElement>(null);
 * useEffect(() => {
 *   if (abierto) cerrarRef.current?.focus();
 * }, [abierto]);
 * function cerrar() {
 *   setAbierto(false);
 *   abrirRef.current?.focus();
 * }
 *
 * 🎯 OBJETIVOS
 * · Enganchar un ref al elemento correcto y abrir la caja con .current.
 * · Decir qué hay en .current en el render, en un efecto y en un manejador.
 * · Armar tú un componente que nace abierto y devuelve el foco al cerrarse.
 *
 * 🟢 CONTEXTO — el 17 del 03 junta en 30 líneas casi toda la 12. Aquí cada pieza
 * es un drill de código: lo ves fallar en el banco, lo arreglas y lo ves funcionar.
 *
 * 🗺️ MAPA
 * TEORÍA 1 · el ref es una caja → drills 1–4
 * TEORÍA 2 · cuándo hay algo dentro → drills 5–6
 * ESCALERA · el efecto también corre al nacer → drills 7–11
 * ARMARLO TÚ → drills 12–13
 *
 * ▸ 13 drills en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/12-custom-hooks/exercise-04.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito: compilan 11 de 13, uno pasa el test con un
 * error de tipos dentro y el lint marca 2: ejecuta los tres comandos. Las trazas
 * comentadas (console.log) enseñan en la consola qué pasa en cada etapa:
 * descoméntalas. Contesta cada ¿Por qué? en la línea libre de debajo.
 * Pistas: exercise-04.pistas.md. Drills 1–13: banco, pestaña 12.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el ref es una caja
 *
 * DEFINICIÓN
 * useRef te da una caja que React guarda entre renders. Lo que hay dentro está en
 * .current. Si la enganchas a un elemento con ref={…}, React mete ese elemento
 * dentro; si no, guarda lo que tú le pongas, como un número.
 *
 * SINTAXIS
 * const botonRef = useRef<HTMLButtonElement>(null); // la caja, vacía: null
 * <button ref={botonRef}>Abrir</button> // React mete el botón
 * botonRef.current?.focus(); // abres la caja y lo usas
 *
 * 🧠 ANALOGÍA — un casillero: ref={…} es meter algo dentro, y .current es abrirlo.
 * El casillero no es lo que guarda.
 *
 * ⚠️ TRAMPA — creer que cambiar .current repinta la pantalla. Un ref cambia en
 * silencio: React no se entera y no hay render nuevo. Quien lo pide es un setter.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) EmpezarContacto — el botón "Empezar" de tu formulario de contacto lleva el
 * cursor al campo Nombre. El ref ya está enganchado al campo, pero el typecheck
 * se queja, y al pulsar "Empezar" la consola muestra un error.
 * ¿Por qué?
 * ref={nombreRef} conecta la referencia con el input.
 * Al pulsar "Empezar", nombreRef.current apunta al input.
 * ?. comprueba que exista antes de llamar a focus().
 * focus() coloca el foco en el campo Nombre para poder escribir.
 */
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

/* 2) EscribirMensaje — lo mismo con el campo Mensaje, un <textarea>. Este sí
 * funciona en el navegador, pero el typecheck no lo deja pasar.
 * Sin ! detrás de .current: es otra forma de callar a TypeScript, como as.
 * ¿Por qué? Si al pulsar el botón el campo siempre está, ¿de qué te protege TypeScript?
 *  TypeScript no puede garantizar que el elemento exista en el DOM en el momento del click, por eso advierte que current podría ser null. El ! le dice a TypeScript que confíe en que no será null, pero no evita errores si el elemento no está presente.
 */
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

/* 3) CorregirCorreo — en el resumen antes de enviar, "Corregir el correo" lleva el
 * cursor al campo Correo. Hoy lo lleva a otro sitio.
 * ¿Por qué?
 * onClick ejecuta una función que llama a focus() en correoRef.current, que apunta a un input. Nuestra misión es hacer que ese input sea específicamente el de correo.
 * El cursor se coloca en ese campo para permitir la corrección del correo electrónico.
 */
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

/* 4) MeGusta — el botón cuenta sus clics y los muestra en su texto: "3 me gusta".
 * Hoy, al pulsarlo, el número no cambia.
 * 👀 En el banco, pulsa unas cuantas veces y después "Repintar el padre".
 * ¿Por qué? ¿Qué pasaba con el número cuando pulsabas "Repintar el padre"?
 * useRef no causa re-render, pero useState sí. Al pulsar "Repintar el padre", el componente se vuelve a renderizar y muestra el número actualizado de likes. Sin embargo, al hacer clic en el botón, aunque se actualiza el estado, no se refleja inmediatamente en la interfaz hasta que ocurre un re-render.
 */
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

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — cuándo hay algo dentro
 *
 * DEFINICIÓN
 * .current solo tiene el elemento mientras el elemento está en la página. En el
 * render del montaje, todavía no: el JSX es un plano. React lo pinta después, mete
 * el elemento en la caja, y entonces corren los efectos. Un manejador corre con la
 * página tal como está, y su setter pide un render para cuando termine.
 *
 * SINTAXIS — qué hay en campoRef.current, según dónde lo mires:
 * suelto en el cuerpo, en el montaje    → null
 * dentro de un useEffect                → el <input>, si se pintó
 * en un manejador, justo tras un setter → lo de antes del setter
 *
 * 🧠 ANALOGÍA — la casa: el render es el plano, el efecto es la ronda del vigilante
 * cuando termina la obra, y el manejador es el timbre: abre puertas que ya existen,
 * no las que llegarán con la próxima obra.
 *
 * ⚠️ TRAMPA — creer que el render corre una vez. Corre en el montaje y en cada
 * re-render: lo que pongas suelto en el cuerpo se repite cada vez. En pnpm dev
 * verás las trazas del render dos veces: es StrictMode.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 5) FormularioQueNaceEnfocado — cuando aparece el formulario, el cursor tiene que
 * estar ya en Nombre. Y una sola vez: si luego escribes en Correo, el cursor se
 * queda en Correo. Hoy nace sin cursor.
 * Sin autoFocus: en producción valdría, pero aquí se entrena el ref.
 * 💡 Si descomentas la traza, el lint también se queja de ella: leer .current
 * en el render es justo lo que se entrena a no hacer. Para mirar, vale.
 * ¿Por qué?
 * Necesitamos que el cursor esté en el campo Nombre al montar el componente.
 * Usamos useEffect para asegurarnos de que el input ya está en el DOM antes de intentar enfocarlo.
 * El inputRef nos permite acceder al elemento del DOM y llamar a focus() para colocar el cursor allí.
 */
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

/* 6) NotaRapida — "Añadir nota" abre un panel con el campo Nota, y el cursor tiene
 * que caer dentro en cuanto aparece. Hoy el panel aparece y el cursor no llega.
 * Sin autoFocus.
 * 👀 Descomenta las dos trazas y mira en qué orden salen en la consola.
 * ¿Por qué?
 * La referencia no estaba mal: estaba mal el momento. En el manejador, setAbierta(true) solo
 * pide el render (la carta al buzón), así que en la línea siguiente el textarea todavía no
 * existía, notaRef.current era null y el ?. no hacía nada.
 * Por eso se usa el useEffect con [abierta] en sus dependencias, para que todo vaya en orden:
 * el efecto corre después del render que pinta el textarea, cuando la caja ya lo tiene dentro.
 */
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

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ESCALERA — el efecto también corre al nacer (drills 7 a 11)
 *
 * DEFINICIÓN
 * Un efecto corre después del render del montaje, y otra vez cada vez que cambia
 * algo de su array. No sabe por qué corre: solo ve el estado de ese render. Un
 * manejador, en cambio, solo corre cuando alguien pulsa.
 *
 * SINTAXIS — lo que ve useEffect(() => { … }, [abierto]) en un menú:
 * el menú nace cerrado → el efecto corre con abierto = false
 * el usuario lo abre   → corre con true
 * el usuario lo cierra → corre con false, igual que al nacer
 *
 * 🧠 ANALOGÍA — el vigilante: da una ronda al terminar la obra, y otra cada vez que
 * cambia lo que vigila. Mira la foto: ve la puerta cerrada, pero no sabe si nunca
 * se abrió o si la acaban de cerrar. Eso solo lo sabe el timbre.
 *
 * 🗣️ LAS PIEZAS
 * if (abierto) dentro del efecto → guardia que lee el estado: la foto.
 * primeraVezRef                  → bandera: un ref que escribe el propio efecto,
 *                                  su libreta.
 *
 * ⚠️ TRAMPA — creer que la bandera «se salta el montaje». Se salta la primera
 * pasada del efecto. Al nacer hay dos pasadas en pnpm dev (StrictMode) y una en
 * producción, así que la bandera no hace lo mismo en los dos sitios.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 7) FiltrosConVuelta — en tu portfolio, "Filtrar proyectos" abre el panel de
 * filtros y "Aplicar" lo cierra. Al cerrarse, "Aplicar" desaparece con el panel
 * y el foco se pierde: tiene que volver a "Filtrar proyectos".
 * Sin useEffect: el efecto llega en el siguiente.
 * ¿Por qué? En el 6, el focus() del manejador no hacía nada. ¿Por qué aquí sí?
 * Porque el botón "Filtrar proyectos" sigue montado en el DOM cuando se ejecuta el manejador aplicarFiltros, mientras que en el drill 6, el textarea aún no estaba montado cuando se intentaba enfocar. Aquí, al cerrar el panel, el botón "Filtrar proyectos" todavía existe y puede recibir el foco correctamente.
 */
export function FiltrosConVuelta() {
  // Seteamos el estado inicial de abierto con useState, indicando que el panel de filtros no está abierto al inicio
  const [abierto, setAbierto] = useState(false);
  // Hacemos una referencia al botón "Filtrar proyectos" usando useRef, inicializándola con null
  const filtrarRef = useRef<HTMLButtonElement>(null);

  // No podemos usar useEffect, por lo tanto:
  // - Creamos la función aplicarFiltros que se ejecuta al hacer click en el botón "Aplicar"
  // 1. Solicitamos cerrar el panel cambiando abierto a false.
  // 2. Enfocamos "Filtrar proyectos", que sigue montado en el DOM.
  // 3. React procesa el cambio de estado y elimina el panel, incluido el botón "Aplicar".
  function aplicarFiltros() {
    setAbierto(false);
    filtrarRef.current?.focus();
  }

  return (
    <div>
      <button ref={filtrarRef} type="button" onClick={() => setAbierto(true)}>
        Filtrar proyectos
      </button>
      {/* Cuando el estado de abierto pasa a true, renderizamos el panel de filtros */}
      {abierto && (
        <div role="region" aria-label="Filtros">
          {/* Datos mock, esto debería venir de una fuente de datos real */}
          <p>React · TypeScript · Tailwind</p>
          <button type="button" onClick={aplicarFiltros}>
            Aplicar
          </button>
        </div>
      )}
    </div>
  );
}
// <FiltrosConVuelta />

/* 8) MenuQueRobaAlNacer — el menú móvil de Projex. Al pulsar "Cerrar menú", el
 * foco tiene que volver a "Abrir menú". Y al montarse no le quita el foco a
 * nadie: hoy se lo quita nada más nacer, sin que nadie haya cerrado nada.
 * 👀 Descomenta la traza y pulsa "Montar el menú" en el banco: mira cuántas veces
 * corre el efecto al nacer, y con qué abierto.
 * ¿Por qué? ¿Por qué el efecto del starter no podía saber si el menú acababa de cerrarse?
 * Porque el efecto solo ve el estado de abierto en el render actual. No sabe si el menú se cerró por primera vez o si simplemente está en su estado inicial. Al nacer, el efecto corre con abierto = false, y al cerrarse, también corre con abierto = false, sin distinguir entre ambos casos.
 */
export function MenuQueRobaAlNacer() {
  // Seteamos el estado inicial de abierto con useState, indicando que el menú no está abierto al inicio
  const [abierto, setAbierto] = useState(false);
  // Hacemos una referencia al botón "Abrir menú" usando useRef, inicializándola con null
  const abrirRef = useRef<HTMLButtonElement>(null);
  // Hacemos una referencia al botón "Cerrar menú" usando useRef, inicializándola con null
  const cerrarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    console.log("efecto · abierto =", abierto);
    if (abierto) {
      cerrarRef.current?.focus();
    }
  }, [abierto]);

  return (
    <div>
      <button
        ref={abrirRef}
        type="button"
        onClick={() => {
          setAbierto(true);
        }}
      >
        Abrir menú
      </button>

      {abierto && (
        <nav aria-label="Menú">
          <p>Inicio · Proyectos · Contacto</p>
          <button
            ref={cerrarRef}
            type="button"
            onClick={() => {
              setAbierto(false);
              abrirRef.current?.focus();
            }}
          >
            Cerrar menú
          </button>
        </nav>
      )}
    </div>
  );
}
// <MenuQueRobaAlNacer />

/* 9) MenuConBandera — el mismo menú, con el arreglo que se le ocurre a casi todo el
 * mundo: una bandera para saltarse el montaje. En producción funciona, pero en
 * pnpm dev sigue robando el foco al nacer. Tiene que funcionar en los dos.
 * 👀 Descomenta la traza y, en el banco, monta el menú de las dos maneras: mira
 * cuántas pasadas da el efecto al nacer en cada una, y qué lee en cada pasada.
 * ¿Por qué? Si la bandera no se saltaba el montaje, ¿qué se saltaba?
 * Se saltaba la PRIMERA PASADA del efecto, no el montaje. La bandera solo sabe "¿ya corrí
 * alguna vez?": cuenta pasadas, no montajes. En producción el menú nace con una sola pasada,
 * la bandera se la come y por eso parece que se salta el montaje. En pnpm dev, StrictMode
 * da dos pasadas al nacer: la bandera se come la primera, y la segunda (bandera = false,
 * abierto = false) llegaba al if (!abierto) y robaba el foco.
 * Con la vuelta en el manejador de "Cerrar menú" no hay nada que saltarse: al nacer nadie
 * pulsa nada, así que la bandera sobra.
 */
export function MenuConBandera() {
  // Seteamos el estado inicial de abierto con useState, indicando que el menú no está abierto al inicio
  const [abierto, setAbierto] = useState(false);
  // Creamos una referencia al botón "Abrir menú" usando useRef, inicializándola con null
  const abrirRef = useRef<HTMLButtonElement>(null);
  // Creamos una referencia al botón "Cerrar menú" usando useRef, inicializándola con null
  const cerrarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Al abrir el menú, enfoca el botón de cerrar.
    if (abierto) {
      cerrarRef.current?.focus();
    }
  }, [abierto]);

  return (
    <div>
      <button
        ref={abrirRef}
        type="button"
        onClick={() => {
          setAbierto(true);
        }}
      >
        Abrir menú
      </button>

      {abierto && (
        <nav aria-label="Menú">
          <p>Inicio · Proyectos · Contacto</p>

          <button
            ref={cerrarRef}
            type="button"
            onClick={() => {
              setAbierto(false);
              abrirRef.current?.focus();
            }}
          >
            Cerrar menú
          </button>
        </nav>
      )}
    </div>
  );
}
// <MenuConBandera />

/* 10) ContactoQueNaceAbierto — si el visitante llega a Projex con #contacto en la
 * dirección, el formulario nace abierto. Cuando aparece, naciendo abierto o al
 * pulsar "Escribirnos", el cursor tiene que quedar en Nombre. Si nace cerrado, no
 * le roba el foco a nadie. Hoy, naciendo abierto, en producción el cursor no llega
 * (en pnpm dev, de casualidad, sí).
 * 👀 En el banco, monta el abierto "como en producción" y luego "en pnpm dev".
 * ¿Por qué? Naciendo abierto, ¿por qué funcionaba en pnpm dev y en producción no?
 * Porque al pasar la prop abiertoAlInicio = true, el efecto corre con abierto = true y mete el foco en el input de nombre. En pnpm dev, StrictMode da dos pasadas al nacer, y en la segunda pasada abierto sigue siendo true, así que el foco se coloca correctamente. En producción, solo hay una pasada al nacer, y si abierto es false en esa pasada, el efecto no hace nada y el foco no llega al input de nombre.
 */
export function ContactoQueNaceAbierto({ abiertoAlInicio }: { abiertoAlInicio: boolean }) {
  // Seteamos el estado inicial de abierto con useState, indicando si el formulario de contacto está abierto al inicio según la prop abiertoAlInicio
  const [abierto, setAbierto] = useState(abiertoAlInicio);
  // Creamos una referencia al input de nombre usando useRef, inicializándola con null
  const nombreRef = useRef<HTMLInputElement>(null);

  // La cosa es simple:
  // Si la prop que recibe el componente dice que nace abierto, el efecto corre con `abierto = true` y mete el foco en el input de nombre.
  // Si la prop dice que nace cerrado, el efecto corre con `abierto = false` y no hace nada.
  useEffect(() => {
    if (abierto) {
      nombreRef.current?.focus();
    }
  }, [abierto]);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setAbierto(true);
        }}
      >
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

/* 11) ConfirmarEnvio
 *  - Antes de enviar tu formulario de contacto, Projex pregunta
 *  - "¿Enviamos tu mensaje?". Cuando aparece la pregunta, el foco tiene que caer en
 *    "Confirmar"; al pulsar "Volver a editar", vuelve a "Enviar". Y al montarse no
 *    le roba el foco a nadie. Hoy lo roba al nacer, y el foco no llega a "Confirmar".
 *    ("Confirmar" todavía no envía nada: aquí solo cuenta el foco.)
 * ¿Por qué? ¿Por qué la ida va en un sitio y la vuelta en otro?
 * Porque la ida (al pulsar "Enviar") se maneja con un efecto que corre después del render, mientras que la vuelta (al pulsar "Volver a editar") se maneja en el manejador del botón, que se ejecuta inmediatamente al hacer clic. El efecto asegura que el foco se coloque en "Confirmar" solo cuando el componente de confirmación está montado, mientras que el manejador devuelve el foco a "Enviar" cuando se cierra la confirmación.
 */
export function ConfirmarEnvio() {
  // Seteamos el estado inicial de confirmando con useState, indicando que la confirmación no está activa al inicio
  const [confirmando, setConfirmando] = useState(false);
  // Creamos una referencia al botón "Enviar" usando useRef, inicializándola con null
  const enviarRef = useRef<HTMLButtonElement>(null);
  // Creamos una referencia al botón "Confirmar" usando useRef, inicializándola con null
  const confirmarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // El efecto comienza a correr cuando el componente se monta y cada vez que cambia el estado de confirmando.
    // Si confirmando cambia a true, el efecto enfoca el botón "Confirmar" usando la referencia confirmarRef.
    if (confirmando) {
      confirmarRef.current?.focus();
    }
  }, [confirmando]);

  return (
    <div>
      <button
        ref={enviarRef}
        type="button"
        onClick={() => {
          setConfirmando(true);
        }}
      >
        Enviar
      </button>

      {confirmando && (
        <div role="region" aria-label="Confirmar envío">
          <p>¿Enviamos tu mensaje?</p>

          <button
            ref={confirmarRef}
            type="button"
            onClick={() => {
              setConfirmando(false);
              enviarRef.current?.focus();
            }}
          >
            Confirmar
          </button>

          <button
            type="button"
            onClick={() => {
              setConfirmando(false);
              enviarRef.current?.focus();
            }}
          >
            Volver a editar
          </button>
        </div>
      )}
    </div>
  );
}
// <ConfirmarEnvio />

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ARMARLO TÚ — las piezas de la escalera, juntas
 *
 * lo que aparece con un render → se enfoca en un efecto, no en el render
 * lo que ya está en la página  → se enfoca en el manejador
 * no robar el foco al nacer    → el if del efecto mira el estado, no una bandera
 *
 * Tu 17 del recordatorio es exactamente eso: la ✕ en el efecto con if (abierto), y
 * la vuelta a «Abrir mapa» en el manejador cerrar.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 12) AvisoDescartable — al pulsar "Descartar", el aviso se va con su botón, y el
 * foco tiene que volver a "Ver aviso" para no perderse. Además, cuando el
 * componente aparece en la página, no le quita el foco a nadie. Hoy sí se lo quita.
 * ¿Por qué?
 * Mi versión con bandera robaba por las 2 veces que pasa el efecto al nacer en pnpm dev
 * (StrictMode). La bandera solo se come la PRIMERA pasada (el return); la segunda llega con
 * la bandera ya en false, pasa al if (!visible) con visible = false y enfocaba "Ver aviso"
 * sin que nadie hubiera pulsado nada. Es el mismo fallo que el starter del 9.
 * Arreglo: la vuelta va en el manejador de "Descartar", porque "Ver aviso" está fuera del
 * visible && y ya existe al pulsar. La ida a "Descartar" sí va en el efecto, porque ese
 * botón aparece con el render; y al nacer, con visible = false, el if no deja pasar.
 */
export function AvisoDescartable() {
  // Setamos el estado inicial de visible con useState, indicando que el aviso no está visible al inicio
  const [visible, setVisible] = useState(false);
  // Creamos una referencia al botón "Ver aviso" usando useRef, inicializándola con null
  const verRef = useRef<HTMLButtonElement>(null);
  // Creamos una referencia al botón "Descartar" usando useRef, inicializándola con null
  const descarteRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (visible) {
      descarteRef.current?.focus();
    }
  }, [visible]);

  return (
    <div>
      <button
        ref={verRef}
        type="button"
        onClick={() => {
          setVisible(true);
        }}
      >
        Ver aviso
      </button>

      {visible && (
        <div>
          <p role="status">Tu mensaje se envió.</p>
          <button
            ref={descarteRef}
            type="button"
            onClick={() => {
              setVisible(false);
              verRef.current?.focus();
            }}
          >
            Descartar
          </button>
        </div>
      )}
    </div>
  );
}
// <AvisoDescartable />

/* 13) BuscadorQueNaceAbierto — el buscador del drill 2 del 03, ahora como tu
 * MapModal: puede nacer abierto. Cuando aparece, el cursor tiene que quedar en
 * el campo Ciudad; al pulsar "Cerrar buscador", el foco vuelve a "Abrir buscador".
 * Y si nace cerrado, no le roba el foco a nadie. Hoy falla al nacer abierto, al
 * abrirlo, y al montarse cerrado en pnpm dev.
 * Sin autoFocus: en producción valdría, pero aquí se entrena armarlo tú.
 * ¿Por qué?
 * Al nacer abierto, el efecto corre con abierto = true y enfoca el input de búsqueda correctamente. Al abrirlo desde cerrado, el efecto también corre con abierto = true y coloca el foco en el input. Al cerrar el buscador, el manejador del botón "Cerrar buscador" devuelve el foco al botón "Abrir buscador", que sigue montado en el DOM. En pnpm dev, StrictMode da dos pasadas al nacer, pero la lógica del efecto y del manejador asegura que el foco se maneje correctamente en todas las situaciones.
 */
export function BuscadorQueNaceAbierto({ abiertoAlInicio }: { abiertoAlInicio: boolean }) {
  // El estado de abierto va a depender de la prop abiertoAlInicio, que indica si el buscador debe estar abierto al inicio o no.
  const [abierto, setAbierto] = useState(abiertoAlInicio);
  // Creamos una referencia al botón "Abrir buscador" usando useRef, inicializándola con null
  const abrirRef = useRef<HTMLButtonElement>(null);
  // Creamos una referencia al input del campo de búsqueda usando useRef, inicializándola con null
  const campoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (abierto) {
      campoRef.current?.focus();
    }
  }, [abierto]);

  return (
    <div>
      <button
        ref={abrirRef}
        type="button"
        onClick={() => {
          setAbierto(true);
        }}
      >
        Abrir buscador
      </button>

      {abierto && (
        <div role="search" aria-label="Buscador de ciudades">
          <input ref={campoRef} aria-label="Ciudad" />
          <button
            type="button"
            onClick={() => {
              setAbierto(false);
              abrirRef.current?.focus();
            }}
          >
            Cerrar buscador
          </button>
        </div>
      )}
    </div>
  );
}
// <BuscadorQueNaceAbierto abiertoAlInicio />
