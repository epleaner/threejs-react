import * as THREE from '@three';

export const fog = ({ color = 0xffffff, near = 10, far = 55 } = {}) =>
  new THREE.Fog(color, near, far);

export const fogExp2 = ({ color = 0xffffff, density = 0.1 } = {}) =>
  new THREE.FogExp2(color, density);
