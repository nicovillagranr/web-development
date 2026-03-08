import * as THREE from 'https://unpkg.com/three@0.162.0/build/three.module.js';

const mount = document.querySelector('#canvasMount');
const shuffleBtn = document.querySelector('#shuffle');

const scene = new THREE.Scene();
scene.background = new THREE.Color('#020617');

const camera = new THREE.PerspectiveCamera(65, mount.clientWidth / 460, 0.1, 100);
camera.position.set(0, 1.8, 6.2);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(mount.clientWidth, 460);
mount.appendChild(renderer.domElement);

scene.add(new THREE.HemisphereLight('#ffffff', '#172554', 1.1));
const dir = new THREE.DirectionalLight('#ffffff', 1.0);
dir.position.set(3, 4, 2);
scene.add(dir);

const group = new THREE.Group();
scene.add(group);

const colors = ['#2563eb', '#7c3aed', '#dc2626', '#0ea5e9', '#16a34a', '#f97316'];

function buildCards() {
  group.clear();
  const radius = 2.8;

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const card = new THREE.Mesh(
      new THREE.PlaneGeometry(1.2, 1.6),
      new THREE.MeshStandardMaterial({ color: colors[i], side: THREE.DoubleSide })
    );

    card.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    card.lookAt(0, 0, 0);
    group.add(card);
  }
}

buildCards();

let velocity = 0.012;

shuffleBtn.addEventListener('click', () => {
  colors.sort(() => Math.random() - 0.5);
  buildCards();
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') velocity -= 0.006;
  if (event.key === 'ArrowRight') velocity += 0.006;
});

function animate() {
  requestAnimationFrame(animate);
  group.rotation.y += velocity;
  velocity *= 0.96;
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
