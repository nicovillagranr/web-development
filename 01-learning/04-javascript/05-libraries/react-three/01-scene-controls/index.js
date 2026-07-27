import * as THREE from 'https://unpkg.com/three@0.162.0/build/three.module.js';

const mount = document.querySelector('#canvasMount');
const colorPicker = document.querySelector('#colorPicker');
const speed = document.querySelector('#speed');

const scene = new THREE.Scene();
scene.background = new THREE.Color('#020617');

const camera = new THREE.PerspectiveCamera(65, mount.clientWidth / mount.clientHeight, 0.1, 100);
camera.position.set(0, 1, 3.2);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(mount.clientWidth, 460);
mount.appendChild(renderer.domElement);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: colorPicker.value, metalness: 0.3, roughness: 0.25 })
);
scene.add(cube);

scene.add(new THREE.HemisphereLight('#ffffff', '#1f2937', 1));
const dir = new THREE.DirectionalLight('#ffffff', 1.1);
dir.position.set(2, 3, 1);
scene.add(dir);

colorPicker.addEventListener('input', () => {
  cube.material.color.set(colorPicker.value);
});

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += Number(speed.value) * 0.6;
  cube.rotation.y += Number(speed.value);
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  const w = mount.clientWidth;
  const h = 460;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
