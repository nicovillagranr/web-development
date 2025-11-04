// -------------------------------------------------------------
// DOM | Document Object Model
// -------------------------------------------------------------
// Representación en memoria del HTML. Todo son nodos, 
// y puedes recorrerlos, crearlos, modificarlos o destruirlos.

// -------------------
// Tipos de nodos
// -------------------
// Document      -> Nodo raíz (document).
// Element       -> Etiquetas HTML (<div>, <p>, etc.).
// Text          -> Texto dentro de un elemento.
// Attribute     -> Atributos de una etiqueta (en JS son props).
// Comment/Otros -> Comentarios, <!DOCTYPE>, etc.

// -------------------
// Selección de elementos
// -------------------
// document.getElementById("id")           -> 1 solo.
// document.getElementsByTagName("p")      -> HTMLCollection.
// document.querySelector(".clase")        -> El primero que cumpla.
// document.querySelectorAll("li.item")    -> NodeList (se puede iterar).

// -------------------
// Atributos
// -------------------
// el.setAttribute("id","nuevoId")
// el.getAttribute("id")
// el.removeAttribute("id")

// -------------------
// Propiedades útiles
// -------------------
// el.innerHTML       -> HTML crudo dentro del elemento.
// el.textContent     -> Solo texto plano.
// el.innerText       -> Texto visible (respeta CSS).
// input.value        -> Valor de <input>, <textarea>, <select>.
// el.className       -> String con todas las clases.
// el.classList.add() -> Manejo fino de clases (add, remove, toggle…).
// el.style.color = "red" -> Cambia estilo en línea.

// -------------------
// Crear y manipular nodos
// -------------------
// document.createElement("div")
// document.createTextNode("Hola")
// padre.appendChild(hijo)
// padre.insertBefore(nuevo, referencia)
// padre.append("texto", otroNodo)
// padre.prepend("antes")
// hijo.remove()
// padre.removeChild(hijo)
// document.createDocumentFragment() // contenedor invisible para múltiples nodos

// -------------------
// Recorrer el DOM
// -------------------
// el.parentNode / parentElement
// el.childNodes / children
// el.firstChild / lastChild
// el.firstElementChild / lastElementChild
// el.nextSibling / previousSibling
// el.nextElementSibling / previousElementSibling

// -------------------
// Eventos
// -------------------
// el.addEventListener("click", fn)
// el.removeEventListener("click", fn)
// event.target         -> quién disparó el evento.
// event.preventDefault()-> cancela acción por defecto.
// event.stopPropagation()-> detiene burbujeo.

// -------------------
// Extras modernos
// -------------------
// el.dataset.id        -> <div data-id="10"> → "10".
// el.closest(".card")  -> Ancestro más cercano.
// el.matches("p.intro")-> ¿Cumple el selector? true/false.
// el.outerHTML         -> HTML completo del elemento (se puede reemplazar).

// -------------------
// Mini ejemplos
// -------------------
/*
const btn = document.querySelector("#saludar");

btn.addEventListener("click", () => {
  alert("Hola DOM!");
});

const div = document.createElement("div");
div.textContent = "Nuevo nodo";
document.body.appendChild(div);

console.log(div.closest("body")); // <body>...</body>
*/
