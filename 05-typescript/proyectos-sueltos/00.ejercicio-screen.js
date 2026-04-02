// 00 — Ejercicio Screen
// TS: screen.width / screen.height son number; función tipada con void.
// Nota: sin import/export → TypeScript trata este archivo como script global.
// La función resol() es accesible desde el atributo onLoad del <body>.
function resol() {
    const ancho = screen.width;
    const alto = screen.height;
    if (ancho > 1440 && alto > 900) {
        alert('Tienes una resolucion de 1440 x 900');
    }
    else {
        alert('Ajustar Resolución a 1440 x 900');
    }
}
export {};
//# sourceMappingURL=00.ejercicio-screen.js.map