// Proyecto 0 — Lista de películas con localStorage
// TS: querySelector<T> especifica el tipo esperado del elemento
const form = document.querySelector("#formPeli");
const ul = document.querySelector("#peliculas_list");
form.addEventListener("submit", function (e) {
    e.preventDefault(); // evitar recarga de página
    const input = document.querySelector("#addPelicula");
    const titulo = input.value.trim();
    if (titulo.length >= 1) {
        localStorage.setItem(titulo, titulo);
        input.value = "";
    }
});
// Cargar películas guardadas al iniciar
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key === null)
        continue;
    const value = localStorage.getItem(key);
    if (typeof value === "string") {
        const li = document.createElement("li");
        li.textContent = value;
        ul.append(li);
    }
}
const formBorrar = document.querySelector("#formBorrarPeli");
formBorrar.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = document.querySelector("#borrarPelicula");
    const titulo = input.value.trim();
    if (titulo.length >= 1) {
        localStorage.removeItem(titulo);
        input.value = "";
    }
    else {
        console.log("Peli no encontrada");
    }
});
export {};
//# sourceMappingURL=index.js.map