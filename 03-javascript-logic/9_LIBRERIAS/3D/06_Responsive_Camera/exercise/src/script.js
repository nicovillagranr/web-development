import * as THREE from 'three'
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js' 
// import gsap from 'gsap'

// Cursor
// const cursor = {
//     x: 0,
//     y: 0
// }
// window.addEventListener('mousemove', (event) => {
//     cursor.x = event.clientX / sizes.width - 0.5
//     cursor.y = - (event.clientY / sizes.height -0.5)
// })


// Canvas//
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()


// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Responsive
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update Renderer
    renderer.setSize(sizes.width, sizes.height)
})
// ---------------------------------------------------------------------------------------------------
// Doble Click | Pantalla Completa
window.addEventListener('dblclick' , () => {
    // Variable para adaptarlo en Safari
    const fullScreenElement = document.fullscreenElement || document.webkitFullScreenElement
    if(!fullScreenElement){ 
        if(canvas.requestFullscreen){
            canvas.requestFullscreen()
        }else if(canvas.webkitRequestFullScreen){
            canvas.webkitRequestFullScreen
        }
    }
    else{
        if(document.exitFullscreen){
            document.exitFullscreen()
        }
        else if(document.webkitExitFullScreen){
            document.webkitExitFullScreen()
        }
    }
})
// Doble Click | Pantalla Completa
// ---------------------------------------------------------------------------------------------------

// Camera
const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.1, 100)
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRatio
//     ,1 * aspectRatio
//     ,1
//     ,-1
//     ,0.1
//     ,100
// )
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.update()


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.render(scene, camera)


// Clock
const clock = new THREE.Clock()


// gsap | Biblioteca alternatica para dar animaciones
// gsap.to(mesh.position, {duration: 1, delay: 1, x: 2})
// gsap.to(mesh.position, {duration: 1, delay: 2, x: -2})



// Animations
const tick = () =>{
    // Clock
    const elapseTime = clock.getElapsedTime()

    // Actualización de posiciones
    // mesh.rotation.y = Math.sin(elapseTime)
    // mesh.rotation.x = Math.cos(elapseTime)

    // mesh.position.y = Math.sin(elapseTime)
    // mesh.position.x = Math.cos(elapseTime)

    // camera.position.y = Math.sin(elapseTime)
    // camera.position.x = Math.cos(elapseTime)
    // camera.lookAt(mesh.position)


    // Actualización de posición de camara
    // camera.position.x = Math.sin(cursor.x * Math.PI) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI) * 3
    // camera.position.y = cursor.y * 5
    // camera.lookAt(mesh.position)

    // Actualización de control | Dumping
    controls.update()

    // Renderización
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick();
