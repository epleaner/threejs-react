import * as THREE from 'three/build/three.module.js';

const SUPPORT_HD_DPI = false;

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas });

  const camera = makeCamera();
  camera.position.z = 40;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf5f5f5);

  const light = makeLight();
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

function updateCanvasAspectRatio(renderer, camera) {
  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
}

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const pixelRatio = SUPPORT_HD_DPI ? window.devicePixelRatio : 1;
  const width = (canvas.clientWidth * pixelRatio) | 0;
  const height = (canvas.clientHeight * pixelRatio) | 0;
  const needResize = canvas.width !== width || canvas.height !== height;

  if (needResize) renderer.setSize(width, height, false);

  return needResize;
}

function makeLight() {
  const color = 0xffffff;
  const intensity = 1;
  return new THREE.DirectionalLight(color, intensity);
}

function makeCamera(fov = 40) {
  const aspect = 2; // the canvas default
  const zNear = 0.1;
  const zFar = 1000;
  return new THREE.PerspectiveCamera(fov, aspect, zNear, zFar);
}

function makeShape(material, geometry, position) {
  const shape = new THREE.Mesh(geometry, material);
  shape.position = position;

  return shape;
}

function makePoints() {
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

function makeLineGeometry() {
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

function makeSpheres() {
  const spheres = [];

  const sphereGeometry = new THREE.SphereBufferGeometry(2, 100, 100);

  const basicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const lambertMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  const phongMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
  const toonMaterial = new THREE.MeshToonMaterial({ color: 0xff0000 });
  const standarMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const physicalMaterial = new THREE.MeshPhysicalMaterial({ color: 0xff0000 });

  spheres.push(new THREE.Mesh(sphereGeometry, basicMaterial));
  spheres.push(new THREE.Mesh(sphereGeometry, lambertMaterial));
  spheres.push(new THREE.Mesh(sphereGeometry, phongMaterial));
  spheres.push(new THREE.Mesh(sphereGeometry, toonMaterial));
  spheres.push(new THREE.Mesh(sphereGeometry, standarMaterial));
  spheres.push(new THREE.Mesh(sphereGeometry, physicalMaterial));

  spheres.forEach((sphere, index) => {
    sphere.position.y = -10;
    sphere.position.x = index * 10 - ((spheres.length - 1) * 10) / 2;
    sphere.isStill = true;
  });
  return spheres;
}

function makeObjects() {
  let objects = [];

  objects.push(makePoints(), makeLineGeometry(), ...makeSpheres());

  return objects;
}

main();
