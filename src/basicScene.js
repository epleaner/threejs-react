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

import { cube, sphere, plane } from '@factories/shapeFactory';

import '@styles/index.css';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas });
  const gui = new GUI();
  const scene = newScene();

  renderer.physicallyCorrectLights = true;

  const camera = perspectiveCamera({
    fov: 45,
    far: 100,
  });
  camera.position.set(0, 10, 20);
  scene.add(camera.helper);

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

main();
