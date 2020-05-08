import * as THREE from 'three/build/three.module.js';

export const scene = ({ color = 'black' } = {}) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(color);
  return scene;
};
