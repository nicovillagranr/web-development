// 01 — Scene Controls (Three.js)
// TS: tipos de THREE importados desde 'three' (node_modules); importmap en HTML apunta al CDN en runtime.

import * as THREE from 'three';

// querySelector con tipo → no-null assertion porque los elementos existen en el HTML
const mount = document.querySelector<HTMLElement>('#canvasMount')!;
const colorPicker = document.querySelector<HTMLInputElement>('#colorPicker')!;
const speed = document.querySelector<HTMLInputElement>('#speed')!;

const scene: THREE.Scene = new THREE.Scene();
scene.background = new THREE.Color('#020617');

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  65,
  mount.clientWidth / mount.clientHeight,
  0.1,
  100
);
camera.position.set(0, 1, 3.2);

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(mount.clientWidth, 460);
mount.appendChild(renderer.domElement);

// MeshStandardMaterial tiene type param implícito → TypeScript infiere THREE.MeshStandardMaterial
const cube: THREE.Mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: colorPicker.value, metalness: 0.3, roughness: 0.25 })
);
scene.add(cube);

scene.add(new THREE.HemisphereLight('#ffffff', '#1f2937', 1));
const dir: THREE.DirectionalLight = new THREE.DirectionalLight('#ffffff', 1.1);
dir.position.set(2, 3, 1);
scene.add(dir);

colorPicker.addEventListener('input', (): void => {
  (cube.material as THREE.MeshStandardMaterial).color.set(colorPicker.value);
});

function animate(): void {
  requestAnimationFrame(animate);
  cube.rotation.x += Number(speed.value) * 0.6;
  cube.rotation.y += Number(speed.value);
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', (): void => {
  const w: number = mount.clientWidth;
  const h: number = 460;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
