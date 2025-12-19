import * as THREE from 'three';

const positionsArray = new Float32Array([
    0, 0, 0,
    0, 1, 0,
    1, 0, 0
]);

const geometry = new THREE.BufferGeometry();
const positionAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute('position', positionAttribute);

const material = new THREE.MeshBasicMaterial({ 
    color: 0xff0000, 
    wireframe: true 
});

const mesh = new THREE.Mesh(geometry, material);
export default mesh;
