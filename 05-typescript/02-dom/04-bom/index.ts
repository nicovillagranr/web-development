// -------------------------------------------------------------
// BOM — Browser Object Model en TypeScript
// -------------------------------------------------------------
// Objeto Window: el jefe supremo del BOM.
// TS: todas las propiedades de window están tipadas en la lib DOM.

// -------------------
// Métodos básicos
// -------------------
// alert("Hola!")         -> void
// print()                -> void
// prompt("Tu nombre?")   -> string | null  ← TS obliga a manejar el null
// confirm("Seguro?")     -> boolean

const nombre: string | null = prompt("¿Cómo te llamas?");
if (nombre !== null) {
  console.log(`Hola, ${nombre}`);
}

const salir: boolean = confirm("¿Quieres ir a Google?");
if (salir) {
  // window.location.href = "https://google.com";
  console.log("Redirigiendo...");
}

// -------------------
// Pantalla y Scroll — tipos number
// -------------------
const scrollX: number = window.scrollX;
const scrollY: number = window.scrollY;
console.log(`Posición de scroll: X=${scrollX}, Y=${scrollY}`);

// Scroll suave a la posición 500
window.scroll({ top: 500, behavior: "smooth" });

// screen info
const anchoTotalPantalla: number = window.screen.width;
const altoTotalPantalla: number = window.screen.height;
console.log(`Pantalla: ${anchoTotalPantalla} × ${altoTotalPantalla}`);

// -------------------
// Location — todas son string
// -------------------
const href: string = window.location.href;
const hostname: string = window.location.hostname;
const pathname: string = window.location.pathname;
const protocol: string = window.location.protocol;

console.log(`URL: ${href}`);
console.log(`Hostname: ${hostname}`);
console.log(`Pathname: ${pathname}`);
console.log(`Protocolo: ${protocol}`);

// location.assign() → carga nueva página y guarda en historial
// location.replace() → igual pero sin historial
// location.reload() → recarga la página (F5)

// -------------------
// History API
// -------------------
// window.history.back()    -> void
// window.history.forward() -> void
// window.history.length    -> number
// window.history.pushState(state, title, url) -> void
// window.history.replaceState(state, title, url) -> void

// -------------------
// Navigator — información del navegador
// -------------------
const idioma: string = navigator.language;
const online: boolean = navigator.onLine;
console.log(`Idioma: ${idioma}, Online: ${online}`);

// -------------------
// Eventos de ventana
// -------------------
window.addEventListener("resize", (_event: UIEvent): void => {
  console.log(`Nueva dimensión: ${window.innerWidth} × ${window.innerHeight}`);
});

window.addEventListener("scroll", (_event: Event): void => {
  console.log("Scroll actual:", window.scrollY);
});
