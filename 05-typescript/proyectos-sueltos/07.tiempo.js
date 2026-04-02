// 07 — Timers: setTimeout y setInterval
// TS: ReturnType<typeof setInterval> para el ID del intervalo; clearInterval necesita el ID, no la función.
function alerta() {
    alert('Hola, me retrase 2 segundos!');
}
setTimeout(alerta, 2000);
function alertaIntervalo() {
    alert('Hola, aparezco cada 3 segundos!');
}
// Guardamos el ID para poder cancelar el intervalo después
const intervalId = setInterval(alertaIntervalo, 3000);
// clearInterval recibe el ID (number), no la función — error común en JS puro
function pararIntervalo() {
    clearInterval(intervalId);
}
export {};
//# sourceMappingURL=07.tiempo.js.map