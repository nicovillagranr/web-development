import { useReducer, type FormEvent } from "react";

/* =============================================================================
 * EJERCICIO 09 — el formulario entero, pieza por pieza   ·  bloque 11
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 *   · actualizar un dato anidado copiando cada nivel que tocas
 *   · seguir el recorrido de una tecla, del input al reducer y de vuelta
 *   · validar y enviar con los errores recién calculados, no con los de la foto
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * Es el `04` otra vez, pero con un formulario nuevo y por partes: primero el
 * estado, después el camino de una tecla, y al final el envío. Cada parte junta
 * algo que ya practicaste por separado del `05` al `08`.
 *
 * 🗺️ MAPA DEL ARCHIVO
 *   TEORÍA 1 · el estado anidado se copia por niveles    →  drills 1 a 3
 *   TEORÍA 2 · el texto vive en el estado, no en el input →  drills 4, 5
 *   TEORÍA 3 · validar y enviar                          →  drills 6 a 8
 *
 * ▸ EJERCICIO — 8 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/11-useState-useReducer/exercise-09.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito, y los 8 compilan: toda la señal
 *   está en el test. El drill 3 lleva una línea `// ¿Por qué?` que reviso yo.
 *   ¿Atascado? Las pistas están en `exercise-09.pistas.md`, de una en una.
 *
 * 👁️ `FormRegistro` (drills 4 y 8) está montado en `src/App.tsx`.
 * ===========================================================================*/

export type DatosRegistro = {
  usuario: string;
  correo: string;
  clave: string;
};

// Los errores que puede tener cada campo.
// Cada propiedad es opcional porque puede no existir ningún error.
export type ErroresRegistro = {
  usuario?: string;
  correo?: string;
  clave?: string;
};

// Las fases posibles del registro.
export type FaseRegistro = "editando" | "enviando" | "enviado";

// El papel que lleva cada acción al reducer.
export type AccionRegistro =
  | { tipo: "escribir"; campo: keyof DatosRegistro; valor: string }
  | { tipo: "rechazar"; errores: ErroresRegistro }
  | { tipo: "empezar" }
  | { tipo: "terminar" }
  | { tipo: "limpiar" };

// El estado completo del formulario.
export type EstadoRegistro = {
  datos: DatosRegistro;
  errores: ErroresRegistro;
  fase: FaseRegistro;
};

// Los datos iniciales del formulario.
export const vacios: DatosRegistro = {
  usuario: "",
  correo: "",
  clave: "",
};

// El estado inicial completo.
export const inicial: EstadoRegistro = {
  datos: vacios,
  errores: {},
  fase: "editando",
};

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el estado anidado se copia por niveles
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Para cambiar un dato que está DENTRO de otro objeto, se copia cada nivel del
 *   camino: el estado entero y el objeto de dentro. El spread solo copia un nivel.
 *
 * SINTAXIS
 *     return {
 *       ...estado,                                    // nivel 1: el estado
 *       datos: { ...estado.datos, usuario: "ana" },   // nivel 2: los datos
 *     };
 *
 * 🧠 ANALOGÍA — una hoja dentro de una carpeta dentro de un archivador: si cambias
 *    la hoja, la carpeta y el archivador que la contienen también son nuevos.
 *
 * 🗣️ LAS PIEZAS
 *     `estado.datos` → objeto anidado  ·  `{ ...estado.datos }` → copia de nivel 2
 *
 * ⚠️ TRAMPA — este estado tiene DOS objetos anidados, `datos` y `errores`, y cada
 *    uno se copia por su cuenta: copiar uno no copia el otro.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) y 2) son el `case "escribir"` de `registroReducer`, más abajo.
// 1) "escribir" — el texto nuevo va al campo que dice el papel, dentro de `datos`.
// 2) "escribir" — y además borra el error de ESE campo (lo deja en ""), porque el
//    usuario lo está corrigiendo. Los errores de los otros campos se quedan.

// 3) Predice: un compañero escribe el case así, sin copiar `estado.datos`:
//        return { ...estado, datos: { [accion.campo]: accion.valor } };
//    TypeScript se lo marca, pero ejecuta el test igual. Parte de `inicial` y
//    escribe "ana" en "usuario". ¿Qué vale después `datos.correo`?

// Forma incorrecta de actualizar un campo anidado:
// NO copiamos el objeto "datos" anterior.
//
// const estadoNuevo = {
//   ...inicial,
//   datos: { usuario: "ana" },
// };
//
// "datos" ahora es solamente:
// { usuario: "ana" }
//
// Por eso "correo" desaparece.
//
// console.log(estadoNuevo.datos.correo); // undefined

// Forma correcta de actualizar un campo anidado:
// copiamos primero el objeto "datos" anterior.
//
// const estadoNuevoCorrecto = {
//   ...inicial,
//   datos: { ...inicial.datos, usuario: "ana" },
// };
//
// Primero copiamos:
// { usuario: "", correo: "", clave: "" }
//
// Y después reemplazamos solamente "usuario":
// { usuario: "ana", correo: "", clave: "" }
//
// console.log(estadoNuevoCorrecto.datos.correo); // ""

export const respuesta3: string | undefined = undefined;
// ¿Por qué? Al actualizar un campo de un objeto, si no copias primero el objeto anterior, reemplazas todo el objeto por uno nuevo.

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — el texto vive en el estado, no en el input
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Un input controlado no guarda nada: pinta lo que dice el estado (`value`) y
 *   avisa de cada tecla (`onChange`). Si le falta `value`, el input guarda su
 *   propio texto y deja de obedecer al estado.
 *
 * SINTAXIS
 *     <input
 *       value={estado.datos.usuario}                     // lo que se ve
 *       onChange={(e) => pedir({ … valor: e.target.value })}   // lo que avisa
 *     />
 *
 * 🧠 ANALOGÍA — la pizarra de un restaurante: el garzón no borra a mano el plato
 *    agotado; la cocina actualiza la lista y la pizarra se copia de la lista.
 *
 * ⚠️ TRAMPA — sin `value` el input PARECE funcionar: escribes y se ve. Falla
 *    cuando el estado cambia por otra vía, como un botón que limpia el formulario.
 * ───────────────────────────────────────────────────────────────────────────── */

// 4) `FormRegistro` — el botón "Limpiar" vacía Usuario y Correo, pero en Clave el
//    texto se queda. El reducer limpia bien; el fallo está en el JSX.

// 5) Predice: escribes la letra "a" en "Usuario". Ordena estos cuatro pasos:
//      "onChange"    → el input avisa de que cambió
//      "pedir"       → el manejador deja el papel en la cola
//      "formReducer" → React calcula el estado nuevo
//      "render"      → React vuelve a pintar el input con el texto del estado
export type Paso = "onChange" | "pedir" | "formReducer" | "render";
export const respuesta5: [Paso, Paso, Paso, Paso] = ["onChange", "pedir", "formReducer", "render"];

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — validar y enviar
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Al enviar, se validan los datos en el momento y se decide con ESE resultado:
 *   con errores se pide "rechazar"; sin errores, "empezar", la espera y
 *   "terminar". El reducer pone las reglas de cada paso.
 *
 * SINTAXIS
 *     const errores = validar(estado.datos);   // recién calculados
 *     if (hay errores) { pedir rechazar; return; }
 *     pedir empezar · await · pedir terminar
 *
 * 🧠 ANALOGÍA — el control del aeropuerto revisa tu maleta cuando pasas, no
 *    mira la foto de la vez anterior que viajaste.
 *
 * ⚠️ TRAMPA — `estado.errores` es la foto de este render (el `08`): todavía no
 *    tiene los errores que acabas de calcular.
 * ───────────────────────────────────────────────────────────────────────────── */

// export type DatosRegistro = {
// usuario: string;
// correo: string;
// clave: string;
// };

// Los errores que puede tener cada campo.
// Cada propiedad es opcional porque puede no existir ningún error.
// export type ErroresRegistro = {
// usuario?: string;
// correo?: string;
// clave?: string;
// };

// Las fases posibles del registro.
// export type FaseRegistro = "editando" | "enviando" | "enviado";

// El papel que lleva cada acción al reducer.
// export type AccionRegistro =
// | { tipo: "escribir"; campo: keyof DatosRegistro; valor: string }
// | { tipo: "rechazar"; errores: ErroresRegistro }
// | { tipo: "empezar" }
// | { tipo: "terminar" }
// | { tipo: "limpiar" };

// El estado completo del formulario.
// export type EstadoRegistro = {
// datos: DatosRegistro;
// errores: ErroresRegistro;
// fase: FaseRegistro;
// };

// Los datos iniciales del formulario.
// export const vacios: DatosRegistro = {
// usuario: "",
// correo: "",
// clave: "",
// };

// El estado inicial completo.
// export const inicial: EstadoRegistro = {
// datos: vacios,
// errores: {},
// fase: "editando",
// };

const FORMA_DE_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 6) `validarRegistro` — el usuario y el correo ya se validan. Falta la clave:
//    si tiene menos de 8 caracteres, su error es
//    "La clave debe tener al menos 8 caracteres".
export function validarRegistro(datos: DatosRegistro): ErroresRegistro {
  const errores: ErroresRegistro = {};

  if (datos.usuario.trim().length < 3) {
    errores.usuario = "El usuario debe tener al menos 3 caracteres";
  }
  if (!FORMA_DE_CORREO.test(datos.correo)) {
    errores.correo = "El correo no es válido";
  }
  if (datos.clave.length < 8) {
    errores.clave = "La clave debe tener al menos 8 caracteres";
  }

  return errores;
}
// validarRegistro(vacios)

// 7) "terminar" — después de crear la cuenta, el formulario queda vacío para el
//    siguiente registro. Solo vale desde "enviando".
export function registroReducer(estado: EstadoRegistro, accion: AccionRegistro): EstadoRegistro {
  switch (accion.tipo) {
    // Cuando el usuario tiene la intención de escribir:
    // 1. Creamos un objeto nuevo
    // 2. Copiamos las propiedades de primera capa del objeto anterior
    // 3. En los campos datos, hacemos lo mismo para acceder a esa capa de datos y cambiar solo el campo que nos interesa.
    // 4. En los campos errores, hacemos lo mismo para acceder a esa capa de errores y borrar el error del campo que nos interesa.
    case "escribir":
      return {
        ...estado,
        datos: { ...estado.datos, [accion.campo]: accion.valor },
        errores: { ...estado.errores, [accion.campo]: "" },
      };
    // Cuando la intención del usuario es rechazar:
    // 1. Creamos un objeto nuevo
    // 2. Copiamos las propiedades de primera capa del objeto anterior
    // 3. En los campos errores, hacemos lo mismo para acceder a esa capa de errores y cambiar solo el campo que nos interesa.
    // 4. Cambiamos la fase a editando.
    case "rechazar":
      return { ...estado, errores: accion.errores, fase: "editando" };
    case "empezar":
      if (estado.fase === "enviando") {
        return estado;
      }
      return { ...estado, errores: {}, fase: "enviando" };
    case "terminar":
      if (estado.fase !== "enviando") {
        return estado;
      }
      return { ...estado, fase: "enviado" };
    case "limpiar":
      return { ...estado, datos: vacios, errores: {}, fase: "editando" };
    default: {
      const _exhaustivo: never = accion;
      return _exhaustivo;
    }
  }
}

// registroReducer({datos: vacios, errores: {}, fase: "editando"}, {tipo: "escribir", campo: "usuario", valor: "ana"})
// -> {datos: {usuario: "ana", correo: "", clave: ""}, errores: {usuario: ""}, fase: "editando"}

const esperar = (ms: number) => new Promise((resolver) => setTimeout(resolver, ms));

// 8) `enviar` — con el formulario vacío, "Crear cuenta" la crea igual, sin enseñar
//    ningún error. Tiene que mostrar los errores y no enviar nada.
export function FormRegistro() {
  const [estado, pedir] = useReducer(registroReducer, inicial);

  const enviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errores = validarRegistro(estado.datos);
    if (Object.keys(errores).length > 0) {
      pedir({ tipo: "rechazar", errores });
      return;
    }
    pedir({ tipo: "empezar" });
    await esperar(300);
    pedir({ tipo: "terminar" });
  };

  return (
    <form onSubmit={enviar} noValidate>
      <input
        aria-label="Usuario"
        placeholder="Usuario"
        value={estado.datos.usuario}
        onChange={(e) => pedir({ tipo: "escribir", campo: "usuario", valor: e.target.value })}
      />
      {estado.errores.usuario && <p>{estado.errores.usuario}</p>}
      <input
        aria-label="Correo"
        placeholder="Correo"
        value={estado.datos.correo}
        onChange={(e) => pedir({ tipo: "escribir", campo: "correo", valor: e.target.value })}
      />
      {estado.errores.correo && <p>{estado.errores.correo}</p>}
      <input
        aria-label="Clave"
        placeholder="Clave"
        type="password"
        value={estado.datos.clave}
        onChange={(e) => pedir({ tipo: "escribir", campo: "clave", valor: e.target.value })}
      />
      {estado.errores.clave && <p>{estado.errores.clave}</p>}
      <button type="submit" disabled={estado.fase === "enviando"}>
        Crear cuenta
      </button>
      <button type="button" onClick={() => pedir({ tipo: "limpiar" })}>
        Limpiar
      </button>
      <p role="status">{estado.fase === "enviado" ? "Cuenta creada" : ""}</p>
    </form>
  );
}
// <FormRegistro />
