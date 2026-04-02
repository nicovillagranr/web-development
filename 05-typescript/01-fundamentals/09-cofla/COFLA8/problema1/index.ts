// ============================================================================
// COFLA 8 — Problema A — Formulario de reinscripción
// ============================================================================
// TS: querySelector<T> especifica el tipo exacto del elemento.
// Esto evita llamar .value en un elemento que no tiene esa propiedad.

const nombre = document.getElementById("nombre") as HTMLInputElement;
const mail = document.getElementById("email") as HTMLInputElement;
const materia = document.getElementById("materia") as HTMLInputElement;
const btn = document.getElementById("btn-enviar") as HTMLButtonElement;
const resultado = document.querySelector<HTMLElement>(".resultado")!;

// Tipo de retorno de validarCampos — un objeto que describe el error
interface ResultadoValidacion {
  esError: boolean;
  mensaje: string;
}

function validarCampos(): ResultadoValidacion {
  if (nombre.value.length < 5 || nombre.value.length > 40) {
    return { esError: true, mensaje: "El nombre es inválido" };
  }

  if (
    mail.value.length < 5 ||
    mail.value.length > 40 ||
    !mail.value.includes("@") ||
    !mail.value.includes(".")
  ) {
    return { esError: true, mensaje: "El mail es inválido" };
  }

  if (materia.value.length < 4 || materia.value.length > 40) {
    return { esError: true, mensaje: "La materia no existe" };
  }

  return { esError: false, mensaje: "" };
}

btn.addEventListener("click", (e: MouseEvent): void => {
  e.preventDefault();
  const validacion: ResultadoValidacion = validarCampos();

  if (validacion.esError) {
    resultado.innerHTML = validacion.mensaje;
    resultado.classList.add("red");
    resultado.classList.remove("green");
  } else {
    resultado.innerHTML = "Solicitud enviada correctamente";
    resultado.classList.add("green");
    resultado.classList.remove("red");
  }
});
