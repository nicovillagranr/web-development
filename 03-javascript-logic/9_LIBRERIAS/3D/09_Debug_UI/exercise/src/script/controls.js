import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import camera from './camera.js';
import canvas from './canvas.js';

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

export default controls;
