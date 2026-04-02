// ============================================================================
// COFLA 7 — TypeScript
// ============================================================================
// --------------------
// Problema A — Validar resolución de pantalla
// --------------------
// TS: window.screen.height y window.screen.width son number (tipos del DOM)
const alto = window.screen.height;
const ancho = window.screen.width;
const comprar = confirm(`El alto es de: ${alto}px y el ancho es de ${ancho}px. ¿Deseas comprar?`);
if (comprar) {
    alert("Compra realizada");
}
else {
    alert("Compra cancelada");
}
// --------------------
// Problema B — Mostrar información del sitio en pantalla completa
// --------------------
// TS: todas las propiedades de window.location son string
const href = window.location.href;
const pathname = window.location.pathname;
const hostname = window.location.hostname;
const protocol = window.location.protocol;
let html = `Protocolo: <b>${protocol}</b><br>`;
html += `Hostname: <b>${hostname}</b><br>`;
html += `Pathname: <b>${pathname}</b><br>`;
html += `Url Completa: <b>${href}</b>`;
document.writeln(html);
export {};
//# sourceMappingURL=index.js.map