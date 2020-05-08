import * as THREE from '@three';
import { OrbitControls } from '@three-controls/OrbitControls.js';
import { GUI } from '@three-gui';

import { resizeRendererToDisplaySize } from '@helpers/responsiveCanvas';
import splitView from '@helpers/splitView';

import { scene as newScene } from '@factories/sceneFactory';

import {
  perspectiveCamera,
  orthographicCamera,
} from '@factories/cameraFactory';
import { cameraGui } from '@helpers/gui/cameraGui';

import { directionalLight } from '@factories/lightFactory';
import { directionalLightGui } from '@helpers/gui/lightGui';

import { cube, sphere, plane } from '@factories/shapeFactory';

import '@styles/index.css';
import '@styles/split.css';

function main() {
  const canvas = document.querySelector('#c');
  const view1Elem = document.querySelector('#view1');
  const view2Elem = document.querySelector('#view2');

  const renderer = new THREE.WebGLRenderer({ canvas });
  const gui = new GUI();

  renderer.physicallyCorrectLights = true;

  const camera1 = orthographicCamera();
  camera1.position.set(0, 10, 20);

  camera1.zoom = 0.2;

  const camera1Controls = new OrbitControls(camera1, view1Elem);
  camera1Controls.target.set(0, 5, 0);
  camera1Controls.update();

  const camera2 = perspectiveCamera({
    fov: 60,
    near: 0.1,
    far: 500,
  });
  camera2.position.set(40, 10, 30);
  camera2.lookAt(0, 5, 0);

  const camera2Controls = new OrbitControls(camera2, view2Elem);
  camera2Controls.target.set(0, 5, 0);
  camera2Controls.update();

  const scene = newScene();
  scene.add(camera1.helper);

  scene.add(plane());
  scene.add(cube());
  scene.add(sphere());

  const { light } = directionalLight();
  light.position.set(0, 10, 0);
  light.target.position.set(-5, 0, 0);
  scene.add(light);
  scene.add(light.target);

  cameraGui({ gui, camera: camera1 });
  directionalLightGui({ gui, light });

  function render() {
    resizeRendererToDisplaySize(renderer);
    splitView({ renderer, scene, camera1, camera2 });

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
