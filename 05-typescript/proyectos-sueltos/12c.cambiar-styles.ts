// 12c — Cambiar estilos con DOM
// TS: style.color y style.fontFamily son string; cast a HTMLElement para acceder a .style.

function modificarestilo(): void {
  const p1 = document.getElementById('p1') as HTMLElement;
  const p2 = document.getElementById('p2') as HTMLElement;

  p1.style.color = 'blue';
  p2.style.fontFamily = 'Arial';
  p2.style.fontSize = 'larger';
}
