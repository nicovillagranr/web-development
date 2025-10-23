import * as THREE from 'three';
import mesh from './geometry.js';
import sizes from './sizes.js';

const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
camera.lookAt(mesh.position);

export default camera;
