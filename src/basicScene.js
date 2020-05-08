import * as THREE from 'three/build/three.module.js';
import '@styles/index.css';

import {
  resizeRendererToDisplaySize,
  updateCanvasAspectRatio,
} from '@helpers/responsiveCanvas';

import { perspectiveCamera } from '@factories/cameraFactory';
import { directionalLight } from '@factories/lightFactory';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas });

  const camera = perspectiveCamera();
  camera.position.z = 40;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf5f5f5);

  const light = directionalLight();
  light.position.set(-1, 2, 4);
  scene.add(light);

  const objects = makeObjects();
  scene.add(...objects);

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer))
      updateCanvasAspectRatio(renderer, camera);

    animate(objects, time);

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

function animate(objects, time) {
  objects.forEach((object, index) => {
    const speed = 0.5 + index * 0.1;
    const rotation = object.isStill ? 0 : time * speed;

    object.rotation.x = rotation;
    object.rotation.y = rotation;
  });
}

function points() {
  const radius = 7;
  const widthSegments = 12;
  const heightSegments = 8;
  const geometry = new THREE.SphereBufferGeometry(
    radius,
    widthSegments,
    heightSegments
  );
  const material = new THREE.PointsMaterial({
    color: 'red',
    size: 0.2, // in world units
  });
  const points = new THREE.Points(geometry, material);

  return points;
}

function lineGeometry() {
  const radius = 7;
  const widthSegments = 6;
  const heightSegments = 3;
  const sphereGeometry = new THREE.SphereBufferGeometry(
    radius,
    widthSegments,
    heightSegments
  );
  const thresholdAngle = 1; // ui: thresholdAngle
  const geometry = new THREE.EdgesGeometry(sphereGeometry, thresholdAngle);

  const material = new THREE.LineBasicMaterial({ color: 0x000000 });
  const mesh = new THREE.LineSegments(geometry, material);

  return mesh;
}

function makeObjects() {
  let objects = [];

  objects.push(points(), lineGeometry());

  return objects;
}

main();
