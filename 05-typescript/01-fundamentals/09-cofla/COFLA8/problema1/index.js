// ============================================================================
// COFLA 8 — Problema A — Formulario de reinscripción
// ============================================================================
// TS: querySelector<T> especifica el tipo exacto del elemento.
// Esto evita llamar .value en un elemento que no tiene esa propiedad.
const nombre = document.getElementById("nombre");
const mail = document.getElementById("email");
const materia = document.getElementById("materia");
const btn = document.getElementById("btn-enviar");
const resultado = document.querySelector(".resultado");
function validarCampos() {
    if (nombre.value.length < 5 || nombre.value.length > 40) {
        return { esError: true, mensaje: "El nombre es inválido" };
    }
    if (mail.value.length < 5 ||
        mail.value.length > 40 ||
        !mail.value.includes("@") ||
        !mail.value.includes(".")) {
        return { esError: true, mensaje: "El mail es inválido" };
    }
    if (materia.value.length < 4 || materia.value.length > 40) {
        return { esError: true, mensaje: "La materia no existe" };
    }
    return { esError: false, mensaje: "" };
}
btn.addEventListener("click", (e) => {
    e.preventDefault();
    const validacion = validarCampos();
    if (validacion.esError) {
        resultado.innerHTML = validacion.mensaje;
        resultado.classList.add("red");
        resultado.classList.remove("green");
    }
    else {
        resultado.innerHTML = "Solicitud enviada correctamente";
        resultado.classList.add("green");
        resultado.classList.remove("red");
    }
});
export {};
//# sourceMappingURL=index.js.map