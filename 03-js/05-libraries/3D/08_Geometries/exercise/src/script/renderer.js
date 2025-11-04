import * as THREE from 'three';
import canvas from './canvas.js';
import sizes from './sizes.js';

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

export default renderer;
