// 12c — Cambiar estilos con DOM
// TS: style.color y style.fontFamily son string; cast a HTMLElement para acceder a .style.
function modificarestilo() {
    const p1 = document.getElementById('p1');
    const p2 = document.getElementById('p2');
    p1.style.color = 'blue';
    p2.style.fontFamily = 'Arial';
    p2.style.fontSize = 'larger';
}
export {};
//# sourceMappingURL=12c.cambiar-styles.js.map