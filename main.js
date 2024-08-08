import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cubeMesh3 = new THREE.Mesh(cubeGeometry, cubeMaterial);

cubeMesh2.position.x = 2;
cubeMesh3.position.x = -2;

const group = new THREE.Group();
group.add(cubeMesh);
group.add(cubeMesh2);
group.add(cubeMesh3);

scene.add(group);

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;

const aspectRatio = window.innerWidth / window.innerHeight;

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
});

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
