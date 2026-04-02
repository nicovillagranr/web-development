// ============================================================================
// COFLA 7 — TypeScript
// ============================================================================

// --------------------
// Problema A — Validar resolución de pantalla
// --------------------

// TS: window.screen.height y window.screen.width son number (tipos del DOM)
const alto: number = window.screen.height;
const ancho: number = window.screen.width;

const comprar: boolean = confirm(
  `El alto es de: ${alto}px y el ancho es de ${ancho}px. ¿Deseas comprar?`
);

if (comprar) {
  alert("Compra realizada");
} else {
  alert("Compra cancelada");
}

// --------------------
// Problema B — Mostrar información del sitio en pantalla completa
// --------------------

// TS: todas las propiedades de window.location son string
const href: string = window.location.href;
const pathname: string = window.location.pathname;
const hostname: string = window.location.hostname;
const protocol: string = window.location.protocol;

let html: string = `Protocolo: <b>${protocol}</b><br>`;
html += `Hostname: <b>${hostname}</b><br>`;
html += `Pathname: <b>${pathname}</b><br>`;
html += `Url Completa: <b>${href}</b>`;

document.writeln(html);
