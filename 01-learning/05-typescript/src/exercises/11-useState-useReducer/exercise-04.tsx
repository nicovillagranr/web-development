import { useReducer, type FormEvent } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — tu `07-Contact/ContactForm.tsx` de Projex, recortado:
 *
 *     const [formData, setFormData] = useState({ name: "", email: "", message: "" })
 *     const [errors, setErrors]     = useState<ContactErrors>({})
 *     const [status, setStatus]     = useState<EstadoEnvio>("idle")
 *
 *     handleChange → setFormData(…), y si status era "enviado", setStatus("idle")
 *     handleSubmit → con errores: setErrors(…) + setStatus("idle")
 *                    sin errores: setErrors({}) · setStatus("enviando") · espera
 *                                 · setStatus("enviado") · setFormData(vacío)
 *
 * Tres estados que cambian juntos, y las reglas repartidas en dos manejadores.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 04 — tu formulario de contacto, con un reducer   ·  bloque 11
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 *   · juntar en un solo estado objeto lo que antes eran tres `useState`
 *   · escribir las reglas de un formulario como transiciones de un reducer
 *   · devolver el mismo estado cuando una transición no está permitida
 *   · pedir las acciones desde el formulario, en el orden en que pasan
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * En el `03c` la cadena tenía un solo número. Aquí el estado es tu formulario real,
 * y lo que gana el reducer ya no es comodidad: es que todas las reglas del
 * formulario viven en un solo sitio, y ese sitio se puede probar sin pantalla.
 *
 * 🗺️ MAPA DEL ARCHIVO
 *   TEORÍA 1 · un estado, no tres                      →  drill 1
 *   TEORÍA 2 · el reducer decide qué transiciones valen →  drills 2 a 6
 *   TEORÍA 3 · pedir en el orden en que pasan las cosas  →  drills 7, 8
 *
 * ▸ EJERCICIO — 8 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/11-useState-useReducer/exercise-04.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito. 1 de los 8 pasa el test con el
 *   fallo dentro: corre siempre los dos comandos.
 *   ¿Atascado? Las pistas están en `exercise-04.pistas.md`, de una en una.
 *
 * 👁️ `FormContacto` está montado en `src/App.tsx`.
 * ===========================================================================*/

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — un estado, no tres
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Cuando varios estados cambian siempre juntos, se agrupan en un solo objeto, y
 *   un reducer lo actualiza entero en cada transición. Cada pieza del objeto
 *   lleva su propio tipo, y la fase va como unión de textos, no como `string`.
 *
 * SINTAXIS
 *     type EstadoForm = { datos: Datos; errores: Errores; fase: Fase }
 *
 * EJEMPLO
 *     type Fase = "idle" | "enviando" | "enviado"
 *     const f: Fase = "enviado"      // ✅
 *     const g: Fase = "sucess"       // ❌ la errata no compila
 *
 * 🧠 ANALOGÍA — la ficha de un paciente: en vez de tres papeles sueltos (datos,
 *    diagnóstico, estado del trámite), una sola carpeta que se actualiza entera.
 *
 * 🗣️ LAS PIEZAS
 *     `keyof Datos` → la unión de sus claves: "name" | "email" | "message"
 *
 * ⚠️ TRAMPA — con `string`, TypeScript acepta cualquier texto como fase, y un
 *    `switch` sobre ella nunca puede estar completo.
 * ───────────────────────────────────────────────────────────────────────────── */
// 1) `Fase` — las tres fases del envío: "idle", "enviando" y "enviado". `textoDeFase`,
//    justo debajo, ya está bien escrita: cuando `Fase` lo esté, deja de dar error.
export type Fase = "idle" | "enviando" | "enviado";

export function textoDeFase(fase: Fase): string {
  switch (fase) {
    case "idle":
      return "";
    case "enviando":
      return "Enviando…";
    case "enviado":
      return "Mensaje enviado";
    default: {
      const _exhaustivo: never = fase;
      return _exhaustivo;
    }
  }
}
/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — el reducer decide qué transiciones valen
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Cada `case` es una regla del formulario. Si la acción no tiene sentido en la
 *   fase actual, el reducer devuelve EL MISMO estado que recibió: para React, eso
 *   significa "no pasó nada", y no repinta.
 *
 * SINTAXIS
 *     case "empezar":
 *       if (estado.fase === "enviando") return estado;   // no vale: igual que estaba
 *       return { ...estado, fase: "enviando" };          // vale: estado nuevo
 *
 * 🧠 ANALOGÍA — el cajero que no te deja retirar dos veces el mismo cheque: te
 *    devuelve el papel y tu saldo queda como estaba.
 *
 * ⚠️ TRAMPA — con un objeto, `{ ...estado }` sin cambios NO es "el mismo": es
 *    una llave nueva, y React repinta. "No pasó nada" se dice con `return estado`.
 * ───────────────────────────────────────────────────────────────────────────── */

// Del 2 al 5, cada drill es un `case` de este reducer, marcado con su número.
// 2) "escribir" — cambia el campo que dice el papel. Y si el formulario ya se
//    había enviado, vuelve a "idle", como hace tu `handleChange`.
// 3) "rechazar" — guarda los errores que trae el papel y deja la fase en "idle".
// 4) "empezar" — pasa a "enviando" y borra los errores. Si ya estaba enviando, no
//    cambia nada: así no se envía dos veces.
// 5) "terminar" — solo vale si está "enviando": pasa a "enviado" y deja los datos
//    vacíos. Desde cualquier otra fase, no cambia nada.

// Las piezas del estado. No se tocan, salvo `Fase` en el drill 1.
export type Datos = { name: string; email: string; message: string };
export type Errores = { name?: string; email?: string; message?: string };
export type EstadoForm = { datos: Datos; errores: Errores; fase: Fase };

// 📌 Los papeles del formulario. `escribir` lleva qué campo cambia y su texto nuevo.
export type AccionForm =
  | { tipo: "escribir"; campo: keyof Datos; valor: string }
  | { tipo: "rechazar"; errores: Errores }
  | { tipo: "empezar" }
  | { tipo: "terminar" };

const vacios: Datos = { name: "", email: "", message: "" };
export const inicial: EstadoForm = { datos: vacios, errores: {}, fase: "idle" };

export function formReducer(estado: EstadoForm, accion: AccionForm): EstadoForm {
  switch (accion.tipo) {
    case "escribir":
      return {
        ...estado,
        datos: { ...estado.datos, [accion.campo]: accion.valor },
        fase: estado.fase === "enviado" ? "idle" : estado.fase,
      };
    case "rechazar":
      return {
        ...estado,
        errores: accion.errores,
        fase: "idle",
      };
    case "empezar":
      if (estado.fase === "enviando") {
        return estado;
      }
      return {
        ...estado,
        errores: {},
        fase: "enviando",
      };

    case "terminar":
      if (estado.fase !== "enviando") {
        return estado;
      }

      return {
        ...estado,
        datos: vacios,
        fase: "enviado",
      };
    default: {
      const _exhaustivo: never = accion;
      return _exhaustivo;
    }
  }
}
// formReducer(inicial, { tipo: "escribir", campo: "name", valor: "Ana" }) -> { datos: { name: "Ana", email: "", message: "" }, errores: {}, fase: "idle" }
// formReducer(inicial, { tipo: "rechazar", errores: { name: "Falta" } }) -> { datos: { name: "", email: "", message: "" }, errores: { name: "Falta" }, fase: "idle" }
// formReducer(inicial, { tipo: "empezar" }) -> { datos: { name: "", email: "", message: "" }, errores: {}, fase: "enviando" }
// formReducer(inicial, { tipo: "terminar" }) -> { datos: { name: "", email: "", message: "" }, errores: {}, fase: "enviado" }

// 6) Con el reducer del 2 al 5 terminado: parte de `inicial` y le llegan, en este
//    orden, empezar · empezar · terminar · escribir. ¿En qué fase queda?
export const respuesta6: Fase = "idle";
// ¿Por qué?  Porque el primer "empezar" pasa a "enviando", el segundo "empezar" no hace nada, el "terminar" pasa a "enviado", y el "escribir" vuelve a "idle".

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — pedir en el orden en que pasan las cosas
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   El componente ya no decide nada: solo pide lo que acaba de ocurrir, en el
 *   orden en que ocurre. Las reglas están en el reducer, y si un papel llega en
 *   un momento que no toca, el reducer lo ignora.
 *
 * EJEMPLO — tu `handleSubmit`, dicho con papeles:
 *     con errores  →  pedir rechazar
 *     sin errores  →  pedir empezar  ·  espera  ·  pedir terminar
 *
 * 🧠 ANALOGÍA — el mesero no cocina: anota el pedido y lo pasa a cocina. Si
 *    pide el postre antes que el plato de fondo, en cocina se lo devuelven.
 *
 * ⚠️ TRAMPA — `pedir` no devuelve el estado nuevo, igual que el setter del `02`.
 *    Justo después de `pedir(…)`, `estado.fase` sigue siendo la de este render:
 *    la nueva llega en el siguiente.
 * ───────────────────────────────────────────────────────────────────────────── */

// export type Errores = { name?: string; email?: string; message?: string };

// Para validar la forma de correo usamos una expresión regular. No hace falta entenderla, solo copiarla.
const FORMA_DE_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Para validar la data creamos una función
export function validarContacto(contacto: Datos): Errores {
  // Iremos metiendo los errores en un objeto vacío de tipo Errores
  const errores: Errores = {};

  switch (true) {
    case contacto.name.trim() === "":
      errores.name = "El nombre es obligatorio"; // Llenamos el objeto
      break;

    case contacto.name.trim().length < 2:
      errores.name = "El nombre debe tener al menos 2 caracteres"; // Llenamos el objeto
      break;
  }

  switch (true) {
    case contacto.email.trim() === "":
      errores.email = "El correo es obligatorio"; // Llenamos el objeto
      break;

    case !FORMA_DE_CORREO.test(contacto.email): // Si la forma de correo que pedimos NO ES VÁLIDA, entonces llenamos el objeto con el error
      errores.email = "El correo no es válido"; // Llenamos el objeto
      break;
  }

  switch (true) {
    case contacto.message.trim() === "":
      errores.message = "El mensaje es obligatorio"; // Llenamos el objeto
      break;

    case contacto.message.trim().length < 10:
      errores.message = "El mensaje debe tener al menos 10 caracteres"; // Llenamos el objeto
      break;
  }

  return errores;
}
// Simula la espera de una petición HTTP, con `await esperar(…)` en el drill 8.
const esperar = (ms: number) => new Promise((resolver) => setTimeout(resolver, ms));

// 7) y 8) `FormContacto` — tres campos, "Enviar" y un <p role="status"> con el
//    texto de la fase. Los dos drills están en este componente, marcados.
// 7) Lo que escribes en "Nombre" no se queda en el campo.
// 8) Al enviar con los tres campos bien, tiene que salir "Enviando…" y después
//    "Mensaje enviado". Hoy nunca sale "Enviando…".
export function FormContacto() {
  const [estado, pedir] = useReducer(formReducer, inicial);

  const enviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errores = validarContacto(estado.datos);
    if (Object.keys(errores).length > 0) {
      pedir({ tipo: "rechazar", errores });
      return;
    }
    pedir({ tipo: "empezar" }); // → fase: "enviando"
    await esperar(300); // Simulamos la espera del servidor
    pedir({ tipo: "terminar" }); // → fase: "enviado"
  };

  return (
    <form onSubmit={enviar} noValidate>
      <input
        placeholder="Nombre"
        aria-label="Nombre"
        value={estado.datos.name}
        onChange={(e) => pedir({ tipo: "escribir", campo: "name", valor: e.target.value })}
      />
      {estado.errores.name && <p>{estado.errores.name}</p>}
      <input
        placeholder="Correo"
        aria-label="Correo"
        value={estado.datos.email}
        onChange={(e) => pedir({ tipo: "escribir", campo: "email", valor: e.target.value })}
      />
      {estado.errores.email && <p>{estado.errores.email}</p>}
      <input
        placeholder="Mensaje"
        aria-label="Mensaje"
        value={estado.datos.message}
        onChange={(e) => pedir({ tipo: "escribir", campo: "message", valor: e.target.value })}
      />
      {estado.errores.message && <p>{estado.errores.message}</p>}
      <button type="submit" disabled={estado.fase === "enviando"}>
        Enviar
      </button>
      <p role="status">{textoDeFase(estado.fase)}</p>
    </form>
  );
}
// <FormContacto />
