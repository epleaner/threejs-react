import * as THREE from '@three';

import { resizeRendererToDisplaySize } from '@helpers/responsiveCanvas';

import { scene as newScene } from '@factories/sceneFactory';
import { orthographicCamera } from '@factories/cameraFactory';
import { flatPlane } from '@factories/shapeFactory';

import '@styles/index.css';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas });

  renderer.physicallyCorrectLights = true;

  const camera = orthographicCamera({
    left: 0,
    right: 300,
    top: 0,
    bottom: 150,
    near: -1,
    far: 1,
    zoom: 1,
  });

  const scene = newScene();

  const planeSize = 256;
  const planes = [];
  for (let i = 0; i < 5; i++) planes.push(flatPlane({ size: planeSize }));

  scene.add(...planes);

  function render(time) {
    time *= 0.001; // convert to seconds;

    if (resizeRendererToDisplaySize(renderer)) {
      camera.right = canvas.width;
      camera.bottom = canvas.height;
      camera.updateProjectionMatrix();
    }

    const xRange = Math.max(20, canvas.width - planeSize) * 2;
    const yRange = Math.max(20, canvas.height - planeSize) * 2;

    planes.forEach((plane, ndx) => {
      const speed = 180;
      const t = time * speed + ndx * 300;
      const xt = t % xRange;
      const yt = t % yRange;

      const x = xt < xRange / 2 ? xt : xRange - xt;
      const y = yt < yRange / 2 ? yt : yRange - yt;

      plane.position.set(x, y, 0);
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
