import * as THREE from 'three/build/three.module.js';

export const perspectiveCamera = ({
  fov = 40,
  aspect = 2,
  near = 0.1,
  far = 1000,
} = {}) => new THREE.PerspectiveCamera(fov, aspect, near, far);
