// 11 — Seleccionar elementos del DOM
// TS: getElementById devuelve HTMLElement | null; getElementsByClassName/TagName → HTMLCollectionOf<T>.
// Se usa ! (non-null assertion) cuando sabemos que el elemento existe en el HTML.

const titulo = document.getElementById('titulo')!;
const clase = document.getElementsByClassName('destacado');
const contenido = document.getElementsByTagName('li');
const elemento = document.getElementsByTagName('li')[0];

function seleccionar(): void {
  console.log(titulo);   // HTMLElement
  console.log(clase);    // HTMLCollectionOf<Element>
  console.log(contenido); // HTMLCollectionOf<HTMLLIElement>
  console.log(elemento); // HTMLLIElement
}
