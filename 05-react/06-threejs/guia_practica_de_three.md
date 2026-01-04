# Three.js — Guía práctica para empezar sin humo

> Objetivo: aprender Three.js para crear **proyectos reales**, no demos olvidables.

Three.js es una biblioteca que abstrae WebGL para que no tengas que sufrir como en 2009. Sirve para crear **gráficos 3D interactivos en el navegador**: escenas, animaciones, efectos visuales, visualizaciones, portfolios, productos, lo que quieras mostrar sin aburrir.

---

## 1. Qué problema resuelve Three.js

WebGL es potente, pero es hostil. Three.js te da:
- API de alto nivel
- Manejo de escenas, cámaras y luces
- Materiales y geometrías listas
- Loaders para modelos 3D

Conclusión business: **reduce fricción y tiempo de desarrollo**.

---

## 2. Conceptos fundamentales (esto es innegociable)

Si no entiendes estos cinco puntos, todo lo demás es copiar y pegar:

### Escena (Scene)
El contenedor de todo. Si no está en la escena, no existe.

### Cámara (Camera)
Define desde dónde se ve el mundo.
- PerspectiveCamera es la estándar (3D realista)

### Renderizador (Renderer)
Convierte la escena + cámara en píxeles.
- WebGLRenderer es el default

### Geometría (Geometry)
La forma. Cubos, esferas, planos, modelos importados.

### Material (Material)
Cómo se ve la geometría. Color, textura, reflejos.

Geometría + Material = **Mesh**

---

## 3. Flujo mental correcto (arquitectura básica)

Siempre piensa así:

1. Crear escena
2. Crear cámara
3. Crear renderer
4. Crear objetos (meshes)
5. Agregar luces
6. Renderizar
7. Animar

Este orden no es opcional. Es la cadena de valor.

---

## 4. Setup mínimo (sin frameworks)

```js
import * as THREE from 'three'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

camera.position.z = 5

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
```

Esto **no hace nada visible** todavía. Y está bien.

---

## 5. Tu primer objeto (el cubo inevitable)

```js
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)

scene.add(cube)
```

Sin luces, no se ve. Bienvenido al 3D.

---

## 6. Luces (la diferencia entre amateur y serio)

### Luz básica

```js
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(5, 5, 5)
scene.add(light)
```

Regla práctica:
- AmbientLight para base
- DirectionalLight para volumen

---

## 7. Render loop (animación)

```js
function animate() {
  requestAnimationFrame(animate)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  renderer.render(scene, camera)
}

animate()
```

Todo lo dinámico vive aquí. Nada fuera.

---

## 8. Manejo de resize (no seas descuidado)

```js
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
```

Esto es higiene básica, no feature premium.

---

## 9. Materiales que sí valen la pena

- MeshBasicMaterial → sin luces (debug)
- MeshStandardMaterial → PBR, realista
- MeshPhysicalMaterial → más caro, más real

Para proyectos reales: **Standard o Physical**.

---

## 10. Texturas

```js
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('/textures/wood.jpg')

const material = new THREE.MeshStandardMaterial({ map: texture })
```

Optimiza imágenes. Siempre. WebP si puedes.

---

## 11. Modelos 3D (GLTF es el estándar)

```js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const loader = new GLTFLoader()
loader.load('/model.gltf', (gltf) => {
  scene.add(gltf.scene)
})
```

Formato recomendado:
- `.gltf` / `.glb`

---

## 12. Controles de cámara

```js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
```

Útil para debug y demos. En producto final, cuidado.

---

## 13. Performance mindset

Reglas simples:
- Menos polígonos
- Menos luces dinámicas
- Texturas optimizadas
- Reutiliza geometrías y materiales

Three.js no perdona el descuido.

---

## 14. Errores comunes

- Pensar Three.js como CSS 3D
- Animar fuera del render loop
- Ignorar el tamaño del canvas
- Cargar modelos pesados sin optimizar

Todos lo hicimos. Aprende rápido.

---

## 15. Ruta de aprendizaje recomendada

1. Escena + cámara + renderer
2. Geometrías y materiales
3. Luces
4. Animaciones
5. Texturas
6. Modelos GLTF
7. Interacción
8. Optimización

Orden lógico, no emocional.

---

## 16. Cuando pasar a React Three Fiber

Hazlo cuando:
- Ya entiendes Three.js
- Quieres escalar UI + 3D
- Estás en React

R3F no reemplaza Three.js. Lo orquesta.

---

## 17. Mentalidad final

Three.js no es para hacer cubos girando.
Es para **contar algo visualmente**.

Si no hay intención, es solo ruido bonito.

---

**Fin.**

Este archivo está pensado como base viva. Se amplía con práctica, no con tutoriales infinitos.

