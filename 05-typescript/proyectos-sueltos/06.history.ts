// 06 — History API
// TS: window.history.back/forward/go son void; go() acepta number.

function atras(): void {
  window.history.back();
}

function adelante(): void {
  window.history.forward();
}

function aleatoria(): void {
  // go(n): avanza n pasos en el historial (negativo = atrás)
  window.history.go(3);
}
