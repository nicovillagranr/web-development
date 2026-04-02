// Proyecto 0 — Lista de películas con localStorage
// TS: querySelector<T> especifica el tipo esperado del elemento

const form = document.querySelector<HTMLFormElement>("#formPeli")!;
const ul = document.querySelector<HTMLUListElement>("#peliculas_list")!;

form.addEventListener("submit", function (e: SubmitEvent): void {
  e.preventDefault(); // evitar recarga de página
  const input = document.querySelector<HTMLInputElement>("#addPelicula")!;
  const titulo: string = input.value.trim();
  if (titulo.length >= 1) {
    localStorage.setItem(titulo, titulo);
    input.value = "";
  }
});

// Cargar películas guardadas al iniciar
for (let i: number = 0; i < localStorage.length; i++) {
  const key: string | null = localStorage.key(i);
  if (key === null) continue;

  const value: string | null = localStorage.getItem(key);
  if (typeof value === "string") {
    const li = document.createElement("li");
    li.textContent = value;
    ul.append(li);
  }
}

const formBorrar = document.querySelector<HTMLFormElement>("#formBorrarPeli")!;
formBorrar.addEventListener("submit", function (e: SubmitEvent): void {
  e.preventDefault();
  const input = document.querySelector<HTMLInputElement>("#borrarPelicula")!;
  const titulo: string = input.value.trim();
  if (titulo.length >= 1) {
    localStorage.removeItem(titulo);
    input.value = "";
  } else {
    console.log("Peli no encontrada");
  }
});
