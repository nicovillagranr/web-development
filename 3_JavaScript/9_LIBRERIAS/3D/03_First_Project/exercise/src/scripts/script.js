// "Importa el escenario 3D donde están los objetos."
// Es como decir: “Ya tengo el escenario armado, tráelo.”
import scene from './scene.js'

// "Importa la cámara que define desde dónde se ve la escena."
// La cámara es como el ojo del espectador: sin esto, no hay perspectiva.
import camera from './camera.js'

// "Importa el motor que se encarga de dibujar todo en la pantalla."
// Sin renderer, no hay visualización. Es quien convierte tu mundo 3D en píxeles.
import renderer from './renderer.js'


// 👇 Esta línea es crucial
import './cube.js'


// "Dibuja la escena desde el punto de vista de la cámara y muéstrala en pantalla."
// Este es el momento en que todo se junta y se muestra. Sin esta línea, no verías absolutamente nada.
renderer.render(scene, camera)

