import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { GroundedSkybox } from 'three/addons/objects/GroundedSkybox.js'


// Scene
const scene = new THREE.Scene()

// Loader
const glftLoader = new GLTFLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
const rgbeLoader = new RGBELoader()
const textureLoader = new THREE.TextureLoader()


// Models
glftLoader.load('models/FlightHelmet/glTF/FlightHelmet.gltf', (glft) => {
    glft.scene.scale.set(10, 10, 10)
    scene.add(glft.scene)
})

// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------
// Enviorment Maps
// LDR Cube Texture
// const enviormentMap = cubeTextureLoader.load([
    // 'environmentMaps/2/px.png',
    // 'environmentMaps/2/nx.png',
    // 'environmentMaps/2/py.png',
    // 'environmentMaps/2/ny.png',
    // 'environmentMaps/2/pz.png',
    // 'environmentMaps/2/nz.png'
// ])
// scene.environment = enviormentMap
// scene.background = enviormentMap
// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------
// HDR (RGBE) equirectangular
// rgbeLoader.load('/environmentMaps/blender-2k.hdr', (enviornmentMap) => {
    // enviornmentMap.mapping = THREE.EquirectangularReflectionMapping
    // scene.background = enviornmentMap
    // scene.environment = enviornmentMap
// })
// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------
// LDR Equirectangular
// const environmentMap = textureLoader.load('/environmentMaps/blockadesLabsSkybox/anime_art_style_japan_streets_with_cherry_blossom_.jpg')
// environmentMap.mapping = THREE.EquirectangularReflectionMapping
// environmentMap.colorSpace = THREE.SRGBColorSpace
// scene.background = environmentMap
// scene.environment = environmentMap
// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------
// Ground Projected SkyBox
// rgbeLoader.load('/environmentMaps/1/2k.hdr', (enviornmentMap) => {
    // enviornmentMap.mapping = THREE.EquirectangularReflectionMapping
    // scene.environment = enviornmentMap

    // SkyBox
    // const skybox = new GroundedSkybox(enviornmentMap , 15, 70)
    // skybox.material.wireframe = true
    // skybox.position.y = 15
    // scene.add(skybox)
// })
// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------
// Real Time EnviornmentMap
const environmentMap = textureLoader.load('/environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg')
environmentMap.mapping = THREE.EquirectangularReflectionMapping
environmentMap.colorSpace = THREE.SRGBColorSpace

scene.background = environmentMap


// Debug
const gui = new GUI()
const global = {}

// Gui Controls
gui.add(scene, 'environmentIntensity').min(0).max(10).step(0.001)
gui.add(scene, 'backgroundBlurriness').min(0).max(1).step(0.001)
gui.add(scene, 'backgroundIntensity').min(0).max(10).step(0.001)

// Background Rotation
gui.add(scene.backgroundRotation, 'y').min(0).max(Math.PI * 2).step(0.001).name('backgroundRotation Y')
gui.add(scene.backgroundRotation, 'x').min(0).max(Math.PI * 2).step(0.001).name('backgroundRotation X')

// EnviormentMap Rotation
gui.add(scene.environmentRotation, 'y').min(0).max(Math.PI * 2).step(0.001).name('environmentRotation Y')
gui.add(scene.environmentRotation, 'x').min(0).max(Math.PI * 2).step(0.001).name('environmentRotation X')


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')


// Holy Donut
const holyDonut = new THREE.Mesh(
    new THREE.TorusGeometry(8, 0.5),
    new THREE.MeshBasicMaterial({color: new THREE.Color(10, 10, 10)})
)
holyDonut.layers.enable(1)
holyDonut.position.y = 3
scene.add(holyDonut)

/**
 * Torus Knot
 */
const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
    new THREE.MeshStandardMaterial({
        roughness: 0,
        metalness: 1,
        color: '#fff'
    })
)
// torusKnot.material.envMap = enviornmentMap
torusKnot.position.x = -4
torusKnot.position.y = 3
scene.add(torusKnot)


// Cube Render Target
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256,
    {
        type: THREE.HalfFloatType
    }
)
scene.environment = cubeRenderTarget.texture

// Cube Camera
const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget)
cubeCamera.layers.set(1)

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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(15, 5, 15)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.y = 3.5
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
    // Time
    const elapsedTime = clock.getElapsedTime()

    // Real Time Environment Map
    if(holyDonut){
        holyDonut.rotation.x = Math.sin(elapsedTime) * 2

        cubeCamera.update(renderer, scene)
    }


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()