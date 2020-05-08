import * as THREE from 'three/build/three.module.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';

import '@styles/index.css';
import '@styles/loading.css';
import textureImage from '@textures/1.jpg';

const SUPPORT_HD_DPI = false;

class DegRadHelper {
  constructor(obj, prop) {
    this.obj = obj;
    this.prop = prop;
  }
  get value() {
    return THREE.MathUtils.radToDeg(this.obj[this.prop]);
  }
  set value(v) {
    this.obj[this.prop] = THREE.MathUtils.degToRad(v);
  }
}

class StringToNumberHelper {
  constructor(obj, prop) {
    this.obj = obj;
    this.prop = prop;
  }
  get value() {
    return this.obj[this.prop];
  }
  set value(v) {
    this.obj[this.prop] = parseFloat(v);
  }
}

const wrapModes = {
  ClampToEdgeWrapping: THREE.ClampToEdgeWrapping,
  RepeatWrapping: THREE.RepeatWrapping,
  MirroredRepeatWrapping: THREE.MirroredRepeatWrapping,
};

function updateTexture(texture) {
  texture.needsUpdate = true;
}

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

  const objects = []; //makeObjects();
  makeLoadingTexturedCube(scene, objects);
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

function makeLoadingTexturedCube(scene, objects) {
  const loadingElem = document.querySelector('#loading');
  const progressBarElem = loadingElem.querySelector('.progressbar');

  const loadManager = new THREE.LoadingManager();
  const loader = new THREE.TextureLoader(loadManager);
  const texture = loader.load(textureImage);

  setupTextureGui(texture);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
  });

  loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
    const progress = itemsLoaded / itemsTotal;
    progressBarElem.style.transform = `scaleX(${progress})`;
  };

  loadManager.onLoad = () => {
    loadingElem.style.display = 'none';
    const geometry = new THREE.BoxGeometry(4, 4, 4);
    const shape = new THREE.Mesh(geometry, material);

    objects.push(shape);
    scene.add(shape);
    setupScaleGui(shape);
  };
}
function setupScaleGui(shape) {
  const gui = new GUI();
  gui.add(shape.scale, 'x', 1, 10, 0.1).name('scale.x');
  gui.add(shape.scale, 'y', 1, 10, 0.1).name('scale.y');
  gui.add(shape.scale, 'z', 1, 10, 0.1).name('scale.z');
}
function setupTextureGui(texture) {
  const gui = new GUI();

  gui
    .add(new StringToNumberHelper(texture, 'wrapS'), 'value', wrapModes)
    .name('texture.wrapS')
    .onChange(updateTexture.bind(this, texture));

  gui
    .add(new StringToNumberHelper(texture, 'wrapT'), 'value', wrapModes)
    .name('texture.wrapT')
    .onChange(updateTexture.bind(this, texture));

  gui.add(texture.repeat, 'x', 0, 5, 0.1).name('texture.repeat.x');
  gui.add(texture.repeat, 'y', 0, 5, 0.1).name('texture.repeat.y');
  gui.add(texture.offset, 'x', -2, 2, 0.01).name('texture.offset.x');
  gui.add(texture.offset, 'y', -2, 2, 0.01).name('texture.offset.y');
  gui.add(texture.center, 'x', -0.5, 1.5, 0.01).name('texture.center.x');
  gui.add(texture.center, 'y', -0.5, 1.5, 0.01).name('texture.center.y');
  gui
    .add(new DegRadHelper(texture, 'rotation'), 'value', -360, 360)
    .name('texture.rotation');
}

main();
