// 12b — Cambiar imagen
// TS: getElementById devuelve HTMLElement | null; cast a HTMLImageElement para acceder a .src.

function cambiarimagen(): void {
  const img = document.getElementById('image') as HTMLImageElement;
  img.src = 'landscape.jpeg';
}
