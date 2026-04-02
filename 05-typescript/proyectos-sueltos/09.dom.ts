// 09 — DOM: document.write y propiedades heredadas de HTML
// TS: fgColor, bgColor, linkColor son propiedades deprecated no incluidas en los tipos DOM modernos.
// Se usa (document as any) para acceder a ellas — en proyectos reales se usan clases CSS en su lugar.

function escribir(): void {
  document.write('<h1> Hola Mundo </h1> ');

  // Propiedades de color deprecated de HTMLDocument (no están en los tipos TS modernos)
  (document as any).fgColor = 'white';  // color texto
  (document as any).bgColor = 'black';  // color fondo
  document.write('<a href="#"> link color </a>');
  (document as any).linkColor = '#fff'; // color de enlace sin visitar
  (document as any).vlinkColor = 'blue'; // color de enlace visitado
  (document as any).alinkColor = 'gray'; // color de enlace activo
}
