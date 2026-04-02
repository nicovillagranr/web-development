// 00 — Ejercicio Screen 2
// TS: propiedades de screen tipadas (number); document.writeln acepta string.
// Este script se ejecuta al cargar — escribe la info de pantalla en el documento.

document.writeln('<pre>alto: ' + screen.height);
document.writeln('ancho: ' + screen.width);
document.writeln('color: ' + screen.colorDepth);
document.writeln('resolución: ' + screen.pixelDepth);
document.writeln('alto disponible: ' + screen.availHeight);
document.writeln('ancho disponible: ' + screen.availWidth + '</pre>');
