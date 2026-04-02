// 04 — Window BOM
// TS: window.open con parámetros string; devuelve WindowProxy | null.

function abrirVentana(): void {
  // window.open(url, nombre, atributos)
  window.open(
    'http://www.google.cl',
    'Google',
    'scrollbar=yes, location=yes, resizable=yes, top=100, width=200, height=100'
  );
}
