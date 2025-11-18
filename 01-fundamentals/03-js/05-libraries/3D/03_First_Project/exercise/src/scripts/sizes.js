// "Voy a usar Three.js por si más adelante lo necesito, aunque en este archivo no lo estás usando directamente."
// (Podría ser innecesario acá, si no se usa THREE, pero quizás es por consistencia.)
// import * as THREE from 'three'

// Calcula el tamaño de la ventana del navegador (en píxeles).
// Esto dice:
// Ancho = el ancho de la pantalla disponible ahora mismo
// Alto = el alto de la pantalla disponible ahora mismo
// Se usa para que el canvas 3D se adapte a pantalla completa. Sin esto, se vería cortado o mal escalado.
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
export default sizes
