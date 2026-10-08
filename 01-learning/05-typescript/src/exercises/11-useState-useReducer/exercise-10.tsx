import { type FormEvent, useReducer } from "react";

/* =============================================================================
 * FORMULARIO COMPLETO — React + TypeScript + useReducer
 *
 * Este archivo reúne el flujo completo de un formulario real:
 *
 * 1. El usuario escribe
 * 2. Se actualizan los datos
 * 3. Se limpian los errores del campo que está corrigiendo
 * 4. Se valida el formulario
 * 5. Si hay errores → se muestran
 * 6. Si no hay errores → comienza el envío
 * 7. Se llama a una API
 * 8. Si la API responde correctamente → enviado
 * 9. Si la API falla → error de servidor
 * 10. Se puede volver a editar / limpiar
 *
 * ============================================================================= */

// 1. Define la forma de los datos que maneja el formulario.
// Cada propiedad representa un campo que el usuario puede completar.
export type DatosSolicitud = {
  nombre: string;
  apellido: string;
  correo: string;
  detalle: string;
};

// Cada campo puede tener un mensaje de error o no tenerlo.
// El "?" indica que la propiedad es opcional.
// "servidor" representa un error general proveniente del servidor.
export type ErroresSolicitud = {
  nombre?: string;
  apellido?: string;
  correo?: string;
  detalle?: string;
  servidor?: string;
};
// La fase del flujo del formulario puede ser uno de estos 4 strings literales.
// TypeScript solo permitirá estos valores.
export type FaseSolicitud = "editando" | "enviando" | "enviado" | "error";

// 2. ESTADO COMPLETO
export type EstadoSolicitud = {
  datos: DatosSolicitud;
  errores: ErroresSolicitud;
  fase: FaseSolicitud;
};

/* =============================================================================
 * 3. ACCIONES DEL REDUCERx
 * Cada acción describe algo que ocurrió.
 *
 * "escribir"
 *      → el usuario modificó un campo
 *
 * "validacionFallida"
 *      → intentamos enviar, pero los datos tienen errores
 *
 * "envioIniciado"
 *      → la validación pasó y comenzamos la petición
 *
 * "envioCompletado"
 *      → la API respondió correctamente
 *
 * "envioFallido"
 *      → la API respondió con error / falló la petición
 *
 * "limpiar"
 *      → queremos volver al formulario inicial
 *
 * ============================================================================= */

export type AccionSolicitud =
  | { tipo: "escribir"; campo: keyof DatosSolicitud; valor: string }
  | { tipo: "validacionFallida"; errores: ErroresSolicitud }
  | { tipo: "envioIniciado" }
  | { tipo: "envioCompletado" }
  | { tipo: "envioFallido"; mensaje: string }
  | { tipo: "limpiar" };

//  4. ESTADO INICIAL
export const vacios: DatosSolicitud = {
  nombre: "",
  apellido: "",
  correo: "",
  detalle: "",
};

export const inicial: EstadoSolicitud = {
  datos: vacios,
  errores: {},
  fase: "editando",
};

/* =============================================================================
 * 5. VALIDACIÓN
 *
 * IMPORTANTE:
 *
 * El reducer NO valida.
 *
 * Esta función recibe los datos y decide si son válidos.
 *
 * Devuelve:
 *
 * {} → no hay errores
 *
 * {
 *   nombre: "...",
 *   apellido: "...",
 *   correo: "..."
 * } → hay errores
 *
 * Esta separación es importante:
 *
 * VALIDAR
 *      ↓
 * produce errores
 *
 * REDUCER
 *      ↓
 * administra esos errores dentro del estado
 *
 * ============================================================================= */

// Función que recibe el objeto datos y retorna un eventual objeto de errores.
// Si no hay errores, retorna un objeto vacío.

export function validarSolicitud(datos: DatosSolicitud): ErroresSolicitud {
  // Creamos nuestro objeto vacío para ir metiendo
  // los errores que vayamos encontrando.
  const errores: ErroresSolicitud = {};

  // VALIDACIÓN DEL NOMBRE
  if (datos.nombre.trim() === "") {
    errores.nombre = "El nombre es obligatorio";
  } else if (datos.nombre.trim().length < 2) {
    errores.nombre = "El nombre debe tener al menos 2 caracteres";
  }

  // VALIDACIÓN DEL APELLIDO
  if (datos.apellido.trim() === "") {
    errores.apellido = "El apellido es obligatorio";
  } else if (datos.apellido.trim().length < 2) {
    errores.apellido = "El apellido debe tener al menos 2 caracteres";
  }

  // VALIDACIÓN DEL CORREO
  const correoValido = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(datos.correo);

  if (datos.correo.trim() === "") {
    errores.correo = "El correo es obligatorio";
  } else if (!correoValido) {
    errores.correo = "El correo no es válido";
  }

  // VALIDACIÓN DEL DETALLE
  if (datos.detalle.trim() === "") {
    errores.detalle = "El detalle es obligatorio";
  } else if (datos.detalle.trim().length < 10) {
    errores.detalle = "El detalle debe tener al menos 10 caracteres";
  } else if (datos.detalle.trim().length > 500) {
    errores.detalle = "El detalle no puede superar los 500 caracteres";
  }
  return errores;
}

//* 6. REDUCER
export function solicitudReducer(
  estado: EstadoSolicitud,
  accion: AccionSolicitud,
): EstadoSolicitud {
  switch (accion.tipo) {
    //  * ESCRIBIR
    //  * El usuario modificó un campo.
    //  * Cambiamos:
    //  * datos
    //  * errores
    //  * fase solamente si estaba en "enviado" o "error"
    //  * El resto se conserva.
    case "escribir":
      return {
        ...estado,
        datos: {
          ...estado.datos,
          // Esto puede ser:
          // "nombre"
          // "apellido"
          // "correo"
          // "detalle"
          // porque accion.campo es keyof DatosSolicitud.
          [accion.campo]: accion.valor,
        },
        // Limpiamos el error del campo que se está escribiendo.
        errores: { ...estado.errores, [accion.campo]: "", servidor: "" },
        fase: estado.fase === "enviado" || estado.fase === "error" ? "editando" : estado.fase,
      };

    //  * VALIDACIÓN FALLIDA
    //  * La función validarSolicitud encontró errores.
    //  * Guardamos esos errores y dejamos el formulario en "editando".
    case "validacionFallida":
      return {
        ...estado,
        errores: accion.errores,
        fase: "editando",
      };

    //  * ENVÍO INICIADO
    //  * Guard:
    //  * Si YA estamos enviando, no hacemos absolutamente nada.
    //  * Esto evita que un doble click produzca dos envíos.
    //  * return estado
    //  *      ↓
    //  * devuelve exactamente el mismo objeto
    case "envioIniciado":
      if (estado.fase === "enviando") {
        return estado;
      }
      return {
        ...estado,
        errores: {},
        fase: "enviando",
      };

    //  * ENVÍO COMPLETADO
    //  * Guard:
    //  * Solo tiene sentido completar un envío si realmente estábamos enviando.
    //  * Cuando termina correctamente:
    //  * datos → formulario vacío
    //  * errores → vacíos
    //  * fase → enviado
    case "envioCompletado":
      if (estado.fase !== "enviando") {
        return estado;
      }
      return {
        ...estado,
        datos: vacios,
        errores: {},
        fase: "enviado",
      };

    /* =========================================================================
     * ENVÍO FALLIDO
     *
     * La petición llegó a la etapa de servidor pero algo falló.
     *
     * Volvemos a "error" y mostramos el mensaje.
     * ========================================================================= */

    case "envioFallido":
      if (estado.fase !== "enviando") {
        return estado;
      }
      return {
        ...estado,
        errores: {
          servidor: accion.mensaje,
        },
        fase: "error",
      };

    //  * LIMPIAR
    //  * Volvemos completamente al estado inicial.
    case "limpiar":
      return inicial;

    //  * EXHAUSTIVIDAD
    //  * TypeScript comprueba que todas las acciones hayan sido contempladas.
    default: {
      const _exhaustivo: never = accion;
      return _exhaustivo;
    }
  }
}

/* =============================================================================
 * 7. SIMULACIÓN DE UNA API
 *
 * En una aplicación real aquí tendrías algo como:
 *
 * await fetch("/api/contacto", {
 *   method: "POST",
 *   body: JSON.stringify(datos),
 * });
 *
 * Para el ejercicio simulamos esa petición.
 * ============================================================================= */

async function enviarSolicitud(datos: DatosSolicitud): Promise<void> {
  console.log("Enviando:", datos);

  await new Promise((resolver) => {
    setTimeout(resolver, 1000);
  });

  //  * Si quisieras simular un error:
  // throw new Error("No se pudo conectar con el servidor");
}

/* =============================================================================
 * 8. COMPONENTE DEL FORMULARIO
 * ============================================================================= */

export function FormularioSolicitud() {
  const [estado, pedir] = useReducer(solicitudReducer, inicial);
  //  * HANDLE CHANGE
  //  *
  //  * El input produce un evento.
  //  *
  //  * event.currentTarget.name
  //  *      → "nombre" | "apellido" | "correo" | "detalle"
  //  *
  //  * event.currentTarget.value
  //  *      → texto escrito
  //  *
  //  * Como los nombres coinciden con las claves de DatosSolicitud,
  //  * podemos utilizar el campo dinámicamente.
  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const campo = event.currentTarget.name as keyof DatosSolicitud;

    const valor = event.currentTarget.value;

    pedir({
      tipo: "escribir",
      campo,
      valor,
    });
  }

  //  * HANDLE SUBMIT
  //  *
  //  * Este es el flujo importante.
  //  *
  //  * 1. Evitamos que el navegador recargue la página.
  //  * 2. Validamos los datos.
  //  * 3. Si existen errores:
  //  *      validacionFallida
  //  * 4. Si no existen:
  //  *      envioIniciado
  //  * 5. Esperamos la API.
  //  * 6. Si funciona:
  //  *      envioCompletado
  //  * 7. Si falla:
  //  *      envioFallido
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    //  * 1. VALIDAR
    const errores = validarSolicitud(estado.datos);

    //  * 2. SI HAY ERRORES, NO ENVIAMOS
    if (Object.keys(errores).length > 0) {
      pedir({
        tipo: "validacionFallida",
        errores,
      });
      return;
    }

    //  * 3. COMENZAMOS EL ENVÍO
    pedir({
      tipo: "envioIniciado",
    });
    try {
      //  * 4. PETICIÓN ASÍNCRONA
      await enviarSolicitud(estado.datos);
      pedir({
        tipo: "envioCompletado",
      });
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : "Ocurrió un error inesperado";
      pedir({
        tipo: "envioFallido",
        mensaje,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          value={estado.datos.nombre}
          onChange={handleChange}
          disabled={estado.fase === "enviando"}
        />
        {estado.errores.nombre && (
          <p className="text-red-600 text-sm mt-1">{estado.errores.nombre}</p>
        )}
      </div>

      <div>
        <label htmlFor="apellido">Apellido</label>
        <input
          id="apellido"
          name="apellido"
          value={estado.datos.apellido}
          onChange={handleChange}
          disabled={estado.fase === "enviando"}
        />
        {estado.errores.apellido && (
          <p className="text-red-600 text-sm mt-1">{estado.errores.apellido}</p>
        )}
      </div>

      <div>
        <label htmlFor="correo">Correo</label>
        <input
          id="correo"
          name="correo"
          type="email"
          value={estado.datos.correo}
          onChange={handleChange}
          disabled={estado.fase === "enviando"}
        />
        {estado.errores.correo && (
          <p className="text-red-600 text-sm mt-1">{estado.errores.correo}</p>
        )}
      </div>

      <div>
        <label htmlFor="detalle">Detalle</label>
        <textarea
          id="detalle"
          name="detalle"
          value={estado.datos.detalle}
          onChange={handleChange}
          disabled={estado.fase === "enviando"}
        />
        {estado.errores.detalle && (
          <p className="text-red-600 text-sm mt-1">{estado.errores.detalle}</p>
        )}
      </div>

      {estado.errores.servidor && (
        <p className="text-red-600 text-sm mt-2">{estado.errores.servidor}</p>
      )}

      <button type="submit" disabled={estado.fase === "enviando"}>
        {estado.fase === "enviando" ? "Enviando..." : "Enviar solicitud"}
      </button>

      {estado.fase === "enviado" && (
        <p className="text-green-600 text-sm mt-2">Solicitud enviada correctamente.</p>
      )}

      <button type="button" onClick={() => pedir({ tipo: "limpiar" })}>
        Limpiar
      </button>
    </form>
  );
}
