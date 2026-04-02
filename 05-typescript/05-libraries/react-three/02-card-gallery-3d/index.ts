// 02 — Card Gallery 3D (Three.js)
// TS: THREE.Group tipado; KeyboardEvent con event.key; velocidad como number con decay.

import * as THREE from 'three';

const mount = document.querySelector<HTMLElement>('#canvasMount')!;
const shuffleBtn = document.querySelector<HTMLButtonElement>('#shuffle')!;

const scene: THREE.Scene = new THREE.Scene();
scene.background = new THREE.Color('#020617');

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  65,
  mount.clientWidth / 460,
  0.1,
  100
);
camera.position.set(0, 1.8, 6.2);

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(mount.clientWidth, 460);
mount.appendChild(renderer.domElement);

scene.add(new THREE.HemisphereLight('#ffffff', '#172554', 1.1));
const dir: THREE.DirectionalLight = new THREE.DirectionalLight('#ffffff', 1.0);
dir.position.set(3, 4, 2);
scene.add(dir);

// Group contiene las 6 tarjetas y rota como unidad
const group: THREE.Group = new THREE.Group();
scene.add(group);

const colors: string[] = ['#2563eb', '#7c3aed', '#dc2626', '#0ea5e9', '#16a34a', '#f97316'];

function buildCards(): void {
  group.clear();
  const radius: number = 2.8;

  for (let i: number = 0; i < 6; i++) {
    const angle: number = (i / 6) * Math.PI * 2;
    const card: THREE.Mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.2, 1.6),
      new THREE.MeshStandardMaterial({ color: colors[i], side: THREE.DoubleSide })
    );

    card.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    card.lookAt(0, 0, 0);
    group.add(card);
  }
}

buildCards();

let velocity: number = 0.012;

shuffleBtn.addEventListener('click', (): void => {
  colors.sort((): number => Math.random() - 0.5);
  buildCards();
});

window.addEventListener('keydown', (event: KeyboardEvent): void => {
  if (event.key === 'ArrowLeft') velocity -= 0.006;
  if (event.key === 'ArrowRight') velocity += 0.006;
});

function animate(): void {
  requestAnimationFrame(animate);
  group.rotation.y += velocity;
  velocity *= 0.96; // decay gradual
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
