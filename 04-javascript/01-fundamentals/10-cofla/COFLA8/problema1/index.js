// Cofla reprovó 2 materias.
// Ahora tendrá que enviar un formulario para registrarse de nuevo para aprobarlas

// Problema A
// El formulario debe contener nombre, mail y materia adeudada
// Validar que Mails y nombres sean reales
// Enviar al servidor de manera pulida

const nombre = document.getElementById("nombre")
const mail = document.getElementById("email")
const materia = document.getElementById("materia")
const btn = document.getElementById("btn-enviar")
const resultado = document.querySelector(".resultado")

btn.addEventListener("click", (e) => {
    e.preventDefault()
    let error = validarCampos()
    if (error[0]) {
        resultado.innerHTML = error[1]
        resultado.classList.add("red")
    } else {
        resultado.innerHTML = "Solicitud enviada correctamente"
        resultado.classList.add("green")
        resultado.classList.remove("red")
    }
})

function validarCampos(){
    let error = []
    if(nombre.value.length < 5 || nombre.value.length > 40){
        error[0] = true
        error[1] = `El nombre es inválido`
        return error
    }
    else if(mail.value.length < 5 ||
                mail.value.length > 40 ||
                mail.value.indexOf("@") == -1 ||
                mail.value.indexOf(".") == -1){
        error[0] = true
        error[1] = `El mail es inválido`
        return error;
    }
    else if(materia.value < 4 || materia.value > 40){
        error[0] = true
        error[1] = `La materia no existe`
    }
    error[0] = false
    return error
}

