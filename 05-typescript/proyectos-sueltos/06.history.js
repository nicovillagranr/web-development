// 06 — History API
// TS: window.history.back/forward/go son void; go() acepta number.
function atras() {
    window.history.back();
}
function adelante() {
    window.history.forward();
}
function aleatoria() {
    // go(n): avanza n pasos en el historial (negativo = atrás)
    window.history.go(3);
}
export {};
//# sourceMappingURL=06.history.js.map