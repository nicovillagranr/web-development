import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


// Texturas
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () =>{
    console.log('onstart')
}
loadingManager.onLoad = () =>{
    console.log('On Loading')
}
loadingManager.onProgress = () =>{
    console.log('En progreso')
}
loadingManager.onError = () =>{
    console.log('Error')
}


const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png')
colorTexture.colorSpace = THREE.SRGBColorSpace // ✅ Esta línea es clave

const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
alphaTexture.colorSpace = THREE.SRGBColorSpace // ✅ Esta línea es clave

const heightTexture = textureLoader.load('/textures/door/height.jpg')
heightTexture.colorSpace = THREE.SRGBColorSpace // ✅ Esta línea es clave

const normalTexture = textureLoader.load('/textures/door/normal.jpg')
normalTexture.colorSpace = THREE.SRGBColorSpace // ✅ Esta línea es clave

const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
ambientOcclusionTexture.colorSpace = THREE.SRGBColorSpace // ✅ Esta línea es clave

const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
metalnessTexture.colorSpace = THREE.SRGBColorSpace // ✅ Esta línea es clave

const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
roughnessTexture.colorSpace = THREE.SRGBColorSpace // ✅ Esta línea es clave

const minecraftTexture = textureLoader.load('/textures/minecraft.png')
minecraftTexture.colorSpace = THREE.SRGBColorSpace // ✅ Esta línea es clave

const waterTexture = textureLoader.load('/textures/water.jpg')
waterTexture.colorSpace = THREE.SRGBColorSpace // ✅ Esta línea es clave

const lavaTexture = textureLoader.load('/textures/lava.jpg')
lavaTexture.colorSpace = THREE.SRGBColorSpace // ✅ Esta línea es clave

const lvTexture = textureLoader.load('/textures/lv.jpg')
lvTexture.colorSpace = THREE.SRGBColorSpace // ✅ Esta línea es clave

// waterTexture.repeat.x = 2
// waterTexture.repeat.x = 3
// waterTexture.wrapS = THREE.RepeatWrapping
// waterTexture.wrapT = THREE.RepeatWrapping
// waterTexture.offset.x = 0.5
// waterTexture.offset.y = 0.5
// colorTexture.rotation = Math.PI / 4
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter
// Texturas




// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()





// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ map: lavaTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


// SIzes
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(80, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()