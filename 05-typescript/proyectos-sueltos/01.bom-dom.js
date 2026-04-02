// 01 — BOM DOM
// TS: window.open devuelve WindowProxy | null; window.close es void.
// Funciones globales accesibles desde atributos onclick del HTML.
function abrirVentana() {
    window.open('http://www.google.com');
}
function cerrarVentana() {
    window.close();
}
export {};
//# sourceMappingURL=01.bom-dom.js.map