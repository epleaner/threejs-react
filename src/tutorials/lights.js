import * as THREE from '@three';
import { OrbitControls } from '@three-controls/OrbitControls.js';
import { GUI } from '@three-gui';

import {
  resizeRendererToDisplaySize,
  updateCanvasAspectRatio,
} from '@helpers/responsiveCanvas';

import { scene as newScene } from '@factories/sceneFactory';

import { perspectiveCamera } from '@factories/cameraFactory';
import { cameraGui } from '@helpers/gui/cameraGui';

import { pointLight } from '@factories/lightFactory';
import { pointLightGui } from '@helpers/gui/lightGui';

import '@styles/index.css';

import checkerTexture from '@textures/checker.png';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas });
  const gui = new GUI();
  const scene = newScene();

  renderer.physicallyCorrectLights = true;

  const { camera } = perspectiveCamera({
    fov: 45,
    far: 100,
  });
  camera.position.set(0, 10, 20);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const groundPlane = plane();
  scene.add(groundPlane);

  scene.add(cube());
  scene.add(sphere());

  const { light, helper } = pointLight();
  light.position.set(0, 10, 0);
  scene.add(light);
  // scene.add(helper);

  cameraGui({ gui, camera });
  pointLightGui({ gui, light });

  function render() {
    if (resizeRendererToDisplaySize(renderer))
      updateCanvasAspectRatio(renderer, camera);

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

function cube({ size = 4, color = '#8AC' } = {}) {
  const geometry = new THREE.BoxBufferGeometry(size, size, size);
  const material = new THREE.MeshStandardMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(size + 1, size / 2, 0);
  return mesh;
}

function sphere({
  radius = 3,
  widthSegments = 32,
  heightSegments = 16,
  color = '#CA8',
} = {}) {
  const geometry = new THREE.SphereBufferGeometry(
    radius,
    widthSegments,
    heightSegments
  );
  const material = new THREE.MeshStandardMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(-radius - 1, radius + 2, 0);
  return mesh;
}

function plane(planeSize = 40) {
  const loader = new THREE.TextureLoader();
  const texture = loader.load(checkerTexture);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  const repeats = planeSize / 2;
  texture.repeat.set(repeats, repeats);

  const geometry = new THREE.PlaneBufferGeometry(planeSize, planeSize);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = Math.PI * -0.5;

  return mesh;
}

main();
