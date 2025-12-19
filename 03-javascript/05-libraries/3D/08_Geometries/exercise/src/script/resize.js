import sizes from './sizes.js';
import camera from './camera.js';
import renderer from './renderer.js';

function handleResize() {
    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        renderer.setSize(sizes.width, sizes.height);
    });
}

export default handleResize;
