// 09 — DOM: document.write y propiedades heredadas de HTML
// TS: fgColor, bgColor, linkColor son propiedades deprecated no incluidas en los tipos DOM modernos.
// Se usa (document as any) para acceder a ellas — en proyectos reales se usan clases CSS en su lugar.
function escribir() {
    document.write('<h1> Hola Mundo </h1> ');
    // Propiedades de color deprecated de HTMLDocument (no están en los tipos TS modernos)
    document.fgColor = 'white'; // color texto
    document.bgColor = 'black'; // color fondo
    document.write('<a href="#"> link color </a>');
    document.linkColor = '#fff'; // color de enlace sin visitar
    document.vlinkColor = 'blue'; // color de enlace visitado
    document.alinkColor = 'gray'; // color de enlace activo
}
export {};
//# sourceMappingURL=09.dom.js.map