import * as THREE from 'three'
import sizes from './sizes.js'

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3

export default camera