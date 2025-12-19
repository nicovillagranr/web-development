import * as THREE from 'three'
import gsap from 'gsap'


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

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
// renderer.render(scene, camera)



// gsap | Biblioteca alternatica para dar animaciones
// gsap.to(mesh.position, {duration: 1, delay: 1, x: 2})
// gsap.to(mesh.position, {duration: 1, delay: 2, x: -2})

// Clock
const clock = new THREE.Clock()

// Animations
const tick = () =>{
    // Clock
    const elapseTime = clock.getElapsedTime()

    // Actualización de objetos
    mesh.rotation.y = Math.sin(elapseTime)
    mesh.rotation.x = Math.cos(elapseTime)

    mesh.position.y = Math.sin(elapseTime)
    mesh.position.x = Math.cos(elapseTime)

    // camera.position.y = Math.sin(elapseTime)
    // camera.position.x = Math.cos(elapseTime)
    // camera.lookAt(mesh.position)


    // Renderización
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}
tick();
