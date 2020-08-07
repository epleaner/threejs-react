import * as THREE from '@three';

import Stats from '@three-libs/stats.module.js';

import { FirstPersonControls } from '@three-controls/FirstPersonControls.js';

const textureUrl =
  'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/water.jpg';

export default () => {
  let camera, controls, scene, renderer, stats;

  let mesh, geometry, material, clock;

  const worldWidth = 128,
    worldDepth = 128;

  init();
  animate();

  function init() {
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      20000
    );
    camera.position.y = 200;

    clock = new THREE.Clock();

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xaaccff);
    scene.fog = new THREE.FogExp2(0xaaccff, 0.0007);

    geometry = new THREE.PlaneBufferGeometry(
      20000,
      20000,
      worldWidth - 1,
      worldDepth - 1
    );
    geometry.rotateX(-Math.PI / 2);

    let position = geometry.attributes.position;
    position.usage = THREE.DynamicDrawUsage;

    for (let i = 0; i < position.count; i++) {
      let y = 35 * Math.sin(i / 2);
      position.setY(i, y);
    }

    let texture = new THREE.TextureLoader().load(textureUrl);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 5);

    material = new THREE.MeshBasicMaterial({ color: 0x0044ff, map: texture });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new FirstPersonControls(camera, renderer.domElement);

    controls.movementSpeed = 500;
    controls.lookSpeed = 0.1;

    stats = new Stats();
    document.body.appendChild(stats.dom);

    window.addEventListener('resize', onWindowResize, false);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    controls.handleResize();
  }

  function animate() {
    requestAnimationFrame(animate);

    render();
    stats.update();
  }

  function render() {
    let delta = clock.getDelta();
    let time = clock.getElapsedTime() * 10;

    let position = geometry.attributes.position;

    for (let i = 0; i < position.count; i++) {
      let y = 35 * Math.sin(i / 5 + (time + i) / 7);
      position.setY(i, y);
    }

    position.needsUpdate = true;

    controls.update(delta);
    renderer.render(scene, camera);
  }

  return null;
};
