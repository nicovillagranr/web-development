import scene from './scene.js';
import mesh from './geometry.js';
import camera from './camera.js';
import renderer from './renderer.js';
import controls from './controls.js';
import handleResize from './resize.js';
import handleFullscreen from './fullscreen.js';
import tick from './animation.js';

// Añadir objetos a la escena
scene.add(mesh);
scene.add(camera);

// Inicializar listeners
handleResize();
handleFullscreen();

// Iniciar render loop
tick();
