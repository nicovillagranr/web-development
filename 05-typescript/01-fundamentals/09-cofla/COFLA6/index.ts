// ============================================================================
// COFLA 6 — TypeScript
// Sistema de selección de llaves
// ============================================================================

// TS: querySelector<T> especifica el tipo del elemento
const contenedor = document.querySelector<HTMLDivElement>(".flex-container")!;

interface Llave {
  img: string;
  nombre: string;
  modelo: string;
  precio: string;
}

function crearLlave(nombre: string, modelo: string, precio: number): Llave {
  return {
    img: "<img class='llave-img' src='llave.png'>",
    nombre: `<h2>${nombre}</h2>`,
    modelo: `<h3>${modelo}</h3>`,
    precio: `<p>Precio: <b>$${precio}</b></p>`,
  };
}

const changeHidden = (numero: number): void => {
  const hiddenInput = document.querySelector<HTMLInputElement>(".key-data");
  if (hiddenInput !== null) {
    hiddenInput.value = String(numero);
  }
};

const documentFragment: DocumentFragment = document.createDocumentFragment();

for (let i: number = 1; i <= 20; i++) {
  const modeloRandom: number = Math.round(Math.random() * 10000);
  const precioRandom: number = Math.round(Math.random() * 10 + 30);
  const llave: Llave = crearLlave(`Llave: ${i}`, `Modelo: ${modeloRandom}`, precioRandom);

  const div = document.createElement("div");
  div.addEventListener("click", () => { changeHidden(modeloRandom); });
  div.tabIndex = i;
  div.classList.add(`item-${i}`, "flex-item");
  div.innerHTML = llave.img + llave.nombre + llave.modelo + llave.precio;

  documentFragment.appendChild(div);
}

contenedor.appendChild(documentFragment);
