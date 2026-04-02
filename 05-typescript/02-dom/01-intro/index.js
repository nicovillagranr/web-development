// -------------------------------------------------------------
// DOM | Document Object Model — TypeScript
// -------------------------------------------------------------
// Representación en memoria del HTML. Todo son nodos,
// y puedes recorrerlos, crearlos, modificarlos o destruirlos.
// TS agrega tipos estáticos a todos los elementos del DOM.
// -------------------
// Tipos de nodos
// -------------------
// Document      -> Nodo raíz (document).
// Element       -> Etiquetas HTML (<div>, <p>, etc.).
// Text          -> Texto dentro de un elemento.
// Attribute     -> Atributos de una etiqueta (en JS son props).
// Comment/Otros -> Comentarios, <!DOCTYPE>, etc.
// -------------------
// Selección con tipos — querySelector<T>
// -------------------
// TS: especificamos el tipo del elemento para acceder a sus propiedades específicas
// getElementById devuelve HTMLElement | null — debemos verificar null
const titulo = document.getElementById("titulo");
if (titulo !== null) {
    titulo.textContent = "Hola desde TypeScript";
}
// querySelector<T> — especificamos el tipo del elemento esperado
// '!' al final = non-null assertion: le decimos a TS que estamos seguros de que existe
const btn = document.querySelector("#saludar");
const div = document.querySelector(".contenedor");
// querySelectorAll devuelve NodeListOf<T>
const items = document.querySelectorAll("li.item");
items.forEach((item) => {
    item.style.color = "red";
});
// -------------------
// Atributos
// -------------------
// el.setAttribute("id","nuevoId")
// el.getAttribute("id")          -> devuelve string | null
// el.removeAttribute("id")
// -------------------
// Propiedades útiles con tipos
// -------------------
// el.innerHTML: string
// el.textContent: string | null
// el.innerText: string
// (input as HTMLInputElement).value: string
// el.className: string
// el.classList (DOMTokenList) -> .add(), .remove(), .toggle(), .contains()
// (el as HTMLElement).style.color = "red"
// -------------------
// Crear y manipular nodos — tipos de retorno
// -------------------
const nuevoDiv = document.createElement("div"); // HTMLDivElement
const texto = document.createTextNode("Hola TypeScript"); // Text
const fragment = document.createDocumentFragment();
nuevoDiv.textContent = "Nuevo nodo creado con TS";
document.body.appendChild(nuevoDiv); // appendChild recibe Node
// -------------------
// Recorrer el DOM — tipos de nodos relacionados
// -------------------
// el.parentNode: Node | null
// el.parentElement: HTMLElement | null
// el.children: HTMLCollection
// el.firstElementChild: Element | null
// el.nextElementSibling: Element | null
// -------------------
// Eventos — tipos específicos
// -------------------
btn.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Hola DOM desde TypeScript!");
});
// event.target — es EventTarget | null en TS; necesitas cast para acceder a propiedades
document.addEventListener("click", (event) => {
    const target = event.target;
    console.log("Elemento clickeado:", target.tagName);
});
// -------------------
// Extras modernos con tipos
// -------------------
// el.dataset.id: string | undefined   <- dataset siempre es string
// el.closest(".card"): Element | null <- closest puede no encontrar nada
// el.matches("p.intro"): boolean
// el.outerHTML: string
const ejemplo = document.querySelector("[data-id]");
if (ejemplo !== null) {
    const id = ejemplo.dataset["id"]; // siempre string (o undefined)
    console.log("data-id:", id);
}
export {};
//# sourceMappingURL=index.js.map