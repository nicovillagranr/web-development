// Proyecto 2 — Tema oscuro/claro persistente
// Botón que cambia el tema de la web.
// Guarda la elección en LocalStorage para que al recargar la página se mantenga.

// TS: querySelector<T> especifica el tipo del elemento
const body = document.querySelector<HTMLBodyElement>("body")!;
const botonTema = document.querySelector<HTMLButtonElement>("#boton__tema")!;

// Al cargar el sitio revisamos si hay un valor de fondo guardado
// localStorage.getItem devuelve string | null
const fondoGuardado: string | null = localStorage.getItem("fondo");

if (fondoGuardado !== null) {
  body.style.background = fondoGuardado;
}

// Al hacer click, cambiamos el fondo y lo guardamos
botonTema.addEventListener("click", function (): void {
  if (body.style.background === "black") {
    body.style.background = "white";
    localStorage.setItem("fondo", "white");
  } else {
    body.style.background = "black";
    localStorage.setItem("fondo", "black");
  }
});
