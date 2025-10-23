// "Trae todo lo necesario de Three.js y además trae un escenario (scene) que ya armamos antes en otro archivo."
// Es como decir: “Voy a usar las herramientas de dibujo 3D, y también voy a seguir trabajando en el escenario que ya había preparado.”
import * as THREE from 'three'
import scene from './scene.js'

// Crea la forma de un cubo de 1 unidad por lado.
// Todavía no tiene color ni textura. Es solo el “molde” del objeto.
const geometry = new THREE.BoxGeometry(1, 1, 1)

// Pinta el objeto con un color amarillo, sin luces ni sombras.
// Es un color plano, siempre se verá igual, aunque no haya luces en la escena.
const material = new THREE.MeshBasicMaterial({ color: 'yellow' })

// Combina la forma del cubo con el material amarillo para crear un objeto 3D real.
// Esto es lo que se va a ver en pantalla.
const cube = new THREE.Mesh(geometry, material)

// Mete el cubo amarillo al escenario.
// Ahora forma parte del mundo 3D y puede ser renderizado.
scene.add(cube)

// Deja el cubo disponible para que otros archivos lo puedan usar.
// Es como decir: “Este cubo ya está listo, si alguien más lo quiere usar, que lo importe”.
// export default cube

