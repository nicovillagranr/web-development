// 01 — BOM DOM
// TS: window.open devuelve WindowProxy | null; window.close es void.
// Funciones globales accesibles desde atributos onclick del HTML.

function abrirVentana(): void {
  window.open('http://www.google.com');
}

function cerrarVentana(): void {
  window.close();
}
