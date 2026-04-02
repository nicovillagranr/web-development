// 12 — Manipular elementos del DOM
// TS: getElementsByClassName devuelve HTMLCollectionOf<Element>;
//     HTMLElement.innerText y style.color son string.
//     Variables de loop deben declararse con let (TypeScript no acepta i implícito).
const titulo = document.getElementById('titulo');
const subtitulo = document.getElementsByClassName('subtitulo');
const destacados = document.getElementsByClassName('destacado');
const elementos = document.getElementsByTagName('li');
const elemento = document.getElementsByTagName('li')[0];
function seleccionar() {
    console.log(titulo);
    console.log(subtitulo);
    console.log(destacados);
    console.log(elementos);
    console.log(elemento);
}
function funcionId() {
    alert(titulo.innerText); // innerText devuelve string
}
function itemsdestacados() {
    // let en el índice — en JS original faltaba la declaración (error implícito global)
    for (let i = 0; i < destacados.length; i++) {
        destacados[i].style.color = '#f00';
    }
}
function bucleLi() {
    for (let i = 0; i < elementos.length; i++) {
        alert(elementos[i].innerText);
    }
}
export {};
//# sourceMappingURL=12.manipular-elementos-dom.js.map