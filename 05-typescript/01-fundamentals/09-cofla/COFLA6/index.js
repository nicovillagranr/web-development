// ============================================================================
// COFLA 6 — TypeScript
// Sistema de selección de llaves
// ============================================================================
// TS: querySelector<T> especifica el tipo del elemento
const contenedor = document.querySelector(".flex-container");
function crearLlave(nombre, modelo, precio) {
    return {
        img: "<img class='llave-img' src='llave.png'>",
        nombre: `<h2>${nombre}</h2>`,
        modelo: `<h3>${modelo}</h3>`,
        precio: `<p>Precio: <b>$${precio}</b></p>`,
    };
}
const changeHidden = (numero) => {
    const hiddenInput = document.querySelector(".key-data");
    if (hiddenInput !== null) {
        hiddenInput.value = String(numero);
    }
};
const documentFragment = document.createDocumentFragment();
for (let i = 1; i <= 20; i++) {
    const modeloRandom = Math.round(Math.random() * 10000);
    const precioRandom = Math.round(Math.random() * 10 + 30);
    const llave = crearLlave(`Llave: ${i}`, `Modelo: ${modeloRandom}`, precioRandom);
    const div = document.createElement("div");
    div.addEventListener("click", () => { changeHidden(modeloRandom); });
    div.tabIndex = i;
    div.classList.add(`item-${i}`, "flex-item");
    div.innerHTML = llave.img + llave.nombre + llave.modelo + llave.precio;
    documentFragment.appendChild(div);
}
contenedor.appendChild(documentFragment);
export {};
//# sourceMappingURL=index.js.map