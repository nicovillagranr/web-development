import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { mod } from 'three/src/nodes/TSL.js'
import { gsap } from "gsap";


// Base
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// Objects
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)


// RayCaster | Línea imaginaria que atraviesa los objetos 3D de nuestra web
// Lo podemos usar para crear los mismos efectos Hover
const rayCaster = new THREE.Raycaster()










// const rayOrigin = new THREE.Vector3(-3, 0, 0)
// const rayDirection = new THREE.Vector3(10, 0, 0)
// rayDirection.normalize()

// rayCaster.set(rayOrigin, rayDirection)

// const intersect = rayCaster.intersectObject(object1)
// console.log(intersect)

// const intersects = rayCaster.intersectObjects([object1, object2, object3])
// console.log(intersects)



// Sizes
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

// Mouse position | Cursor
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height * 2 - 1)
})

// Click Event
window.addEventListener('click', () =>{
    if(currentIntersect){
        switch(currentIntersect.object){
            case object1:
                console.log("Click on the Sphere one")
                break
            case object2:
                console.log("Click on the Sphere two")
                break
            case object3:
                console.log("Click on the Sphere three")
                break
        }
    }
})


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
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


// Lights
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.position.set(1.5, 4, 0)
scene.add(directionalLight)


// Model

let model = null

const glftLoader = new GLTFLoader()
glftLoader.load('./models/Duck/glTF-Binary/Duck.glb', (gltf) => {

    model = gltf.scene
    gltf.scene.position.y = -1
    scene.add(gltf.scene)
})



/**
 * Animate
 */
const clock = new THREE.Clock()

let currentIntersect = null

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Animating Objects
    object1.position.y = Math.sin(elapsedTime * 0.5) * 1
    object2.position.y = Math.sin(elapsedTime * 0.6) * 1
    object3.position.y = Math.sin(elapsedTime * 0.9) * 1

    rayCaster.setFromCamera(mouse, camera)


    // Cast a Ray
    // const rayOrigin = new THREE.Vector3(-3, 0, 0)
    // const rayDirection = new THREE.Vector3(1, 0, 0)
    // rayDirection.normalize()
    
    // rayCaster.set(rayOrigin, rayDirection)
    
    const objectsToTest = [object1, object2, object3]
    const intersects = rayCaster.intersectObjects(objectsToTest)

    for(const object of objectsToTest){
        object.material.color.set('red')
    }

    for(const intersect of intersects){
        intersect.object.material.color.set('blue')
    }

    if(intersects.length){
        if(currentIntersect === null){
            console.log("Mouse Enter")
            currentIntersect = intersects[0]
        }
    }else{
        if(currentIntersect){
            console.log("Mouse Leave")
        }
        currentIntersect = null
    }

    if(model){
        const modelIntersects = rayCaster.intersectObject(model)
        
        if (modelIntersects.length) {
        gsap.to(model.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.3, ease: "power1.out" });
        } 
        else{
        gsap.to(model.scale, { x: 1, y: 1, z: 1, duration: 0.3, ease: "power1.out" });
        }
}

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()