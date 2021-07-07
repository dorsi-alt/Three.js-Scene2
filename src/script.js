import './style.css'
import * as three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { PointLightShadow } from 'three'


//loading
const textureLoader = new three.TextureLoader()

const normalTexture = textureLoader.load('/textures/NormalMap.png')
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new three.Scene()

// Objects
const geometry = new three.SphereGeometry(.5,64,64)

// Materials

const material = new three.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2

material.normalMap = normalTexture;
material.color = new three.Color(0x292929)

// Mesh
const sphere = new three.Mesh(geometry,material)
scene.add(sphere)

// Const Light Lights
// White Light in back of camera

const pointLight = new three.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)



//light 2
const pointLight2 = new three.PointLight(0xff0000, 2)
pointLight2.position.set(1,1,1)
pointLight2.intensity = 1
scene.add(pointLight2)

const light1 = gui.addFolder('light1')

light1.add(pointLight2.position, 'y').min(-5).max(5).step(0.1)
light1.add(pointLight2.position, 'x').min(-6).max(6).step(0.1)
light1.add(pointLight2.position, 'z').min(-6).max(6).step(0.1)
light1.add(pointLight2, 'intensity').min(0).max(10).step(0.1)

const pointLightHelper = new three.PointLightHelper(pointLight2, 1)
scene.add(pointLightHelper)

const light1Color = {
    color: 0xff000
}

light1.addColor(light1Color, 'color')
    .onChange(() => {
        pointLight2.color.set(light1Color.color)
    })


//light 3
const pointLight3 = new three.PointLight(0x0000ff, 2)
pointLight3.position.set(1,1,1)
pointLight3.intensity = 1
scene.add(pointLight3)

const light2 = gui.addFolder('light2')

light2.add(pointLight3.position, 'y').min(-5).max(5).step(0.1)
light2.add(pointLight3.position, 'x').min(-6).max(6).step(0.1)
light2.add(pointLight3.position, 'z').min(-6).max(6).step(0.1)
light2.add(pointLight3, 'intensity').min(0).max(10).step(0.1)


//ALLOWS FOR COLOR CHANGE OF LIGHT
const light2Color = {
    color: 0xff0000
}

light2.addColor(light2Color, 'color')
    .onChange(() => {
        pointLight3.color.set(light2Color.color)
    })

///////////////////////////

const pointLightHelper2 = new three.PointLightHelper(pointLight3, 1)
scene.add(pointLightHelper2)
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
const camera = new three.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new three.WebGLRenderer({
    canvas: canvas,
    alpha: true 
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new three.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()