import renderer from './renderer.js';
import scene from './scene.js';
import camera from './camera.js';
import controls from './controls.js';
import * as THREE from 'three';

const clock = new THREE.Clock();

function tick() {
    const elapsedTime = clock.getElapsedTime();

    // Si quieres animaciones personalizadas, agrégalas acá

    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}

export default tick;
