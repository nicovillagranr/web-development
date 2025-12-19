import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

// Debug
const gui = new GUI

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// Textures
const TextureLoader = new THREE.TextureLoader()

const doorColorTexture = TextureLoader.load('./textures/door/color.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace // ✅ Esta línea es clave

const doorAlphaTexture = TextureLoader.load('./textures/door/alpha.jpg')
doorAlphaTexture.colorSpace = THREE.SRGBColorSpace // ✅ Esta línea es clave

const doorAmbientTexture = TextureLoader.load('./textures/door/ambientOcclusion.jpg')
doorAmbientTexture.colorSpace = THREE.SRGBColorSpace // ✅ Esta línea es clave

const doorHeightTexture = TextureLoader.load('./textures/door/height.jpg')
doorHeightTexture.colorSpace = THREE.SRGBColorSpace // ✅ Esta línea es clave

const doorNormalTexture = TextureLoader.load('./textures/door/normal.jpg')
doorNormalTexture.colorSpace = THREE.SRGBColorSpace // ✅ Esta línea es clave

const doorMetalnessTexture = TextureLoader.load('./textures/door/metalness.jpg')
doorMetalnessTexture.colorSpace = THREE.SRGBColorSpace // ✅ Esta línea es clave

const doorRoughnessTexture = TextureLoader.load('./textures/door/roughness.jpg')
doorRoughnessTexture.colorSpace = THREE.SRGBColorSpace // ✅ Esta línea es clave

const matcapTexture = TextureLoader.load('./textures/matcaps/3.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace // ✅ Esta línea es clave

const gradientTexture = TextureLoader.load('./textures/gradients/3.jpg')
gradientTexture.colorSpace = THREE.SRGBColorSpace // ✅ Esta línea es clave

const kTexture = TextureLoader.load('./textures/matcaps/3.png')
kTexture.colorSpace = THREE.SRGBColorSpace // ✅ Esta línea es clave


// Materials
// const material = new THREE.MeshBasicMaterial()
// material.side = THREE.DoubleSide
// material.map = doorNormalTexture
// material.color = new THREE.Color('#999')
// material.wireframe = true
// material.transparent = true
// material.opacity = 0.9
// material.alphaMap = doorColorTexture

// MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial()
// material.side = THREE.DoubleSide
// material.flatShading = true

// MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture
// material.side = THREE.DoubleSide

// MeshDeptMaterial | Material que da el efecto de profundidad a la escena
// const material = new THREE.MeshDepthMaterial()
// material.side = THREE.DoubleSide

// MeshLambertMaterial | Material que requiere que le agreguemos luces
// const material = new THREE.MeshLambertMaterial()
// material.side = THREE.DoubleSide

// MeshPhongMaterial | Material que requiere que le agreguemos luces
// const material = new THREE.MeshPhongMaterial()
// material.side = THREE.DoubleSide
// material.shininess = 100
// material.specular = new THREE.Color('#ccc')

// MeshToonMaterial | Material que requiere que le agreguemos luces
// const material = new THREE.MeshToonMaterial()
// material.side = THREE.DoubleSide
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// material.gradientMap = gradientTexture

// MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial()
// material.side = THREE.DoubleSide
// material.metalness = 1
// material.roughness = 1
// material.map = doorColorTexture
// material.aomap = doorAmbientTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.2
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.1, 0.1)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// gui.add(material, 'metalness').min(0).max(1).step(0.001)
// gui.add(material, 'roughness').min(0).max(1).step(0.001)

// MeshPhysicalMaterial
const material = new THREE.MeshPhysicalMaterial()
material.side = THREE.DoubleSide
material.metalness = 0
material.roughness = 0
// material.map = doorColorTexture
// material.aomap = doorAmbientTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.2
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.1, 0.1)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

// ClearCoat | Crea una capa sobre el objeto que lo hace parecer cubierto con un cristal
// material.clearcoat = 1
// material.clearcoatRoughness = 0
// gui.add(material, 'clearcoat').min(0).max(1).step(0.001)
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.001)


// Sheen | Simula que el objeto está subierto con una tela suave
// material.sheen = 1
// material.sheenRoughness = 0.25
// material.sheenColor.set(1, 1, 1)
// gui.add(material, 'sheen').min(0).max(1).step(0.001)
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.001)
// gui.addColor(material, 'sheenColor')


// Iridescence
// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [ 100, 800 ]

// gui.add(material, 'iridescence').min(0).max(1).step(0.0001)
// gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001)
// gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1)
// gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1)


// Transmision
material.transmission = 1
material.ior = 1.5
material.thickness = 0.5
gui.add(material, 'transmission').min(0).max(1).step(0.0001)
gui.add(material, 'ior').min(1).max(10).step(0.0001)
gui.add(material, 'thickness').min(0).max(1).step(0.0001)
// iorsignifica índice de refracción y depende del tipo de material que desea simular.
// Un diamante tiene un iorde 2.417, el agua tiene un iorde 1.333y el aire tiene un iorde 1.000293.
// Puedes encontrar la lista completa en Wikipedia https://en.wikipedia.org/wiki/List_of_refractive_indices
// Este thicknesses un valor fijo y no se tiene en cuenta el grosor real del objeto.







// / Light
// const ambientLights = new THREE.AmbientLight('#0xffffff', 1)
// scene.add(ambientLights)
// const pointLight = new THREE.PointLight(0xffffff, 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)


const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) =>
{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = environmentMap
    scene.environment = environmentMap
})




const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
)
torus.position.x = -1.5


scene.add(sphere, plane, torus)
// Materials


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(85, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update Objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.1 * elapsedTime
    plane.rotation.x = 0.1 * elapsedTime
    torus.rotation.x = 0.1 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()