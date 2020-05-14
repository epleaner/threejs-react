import * as THREE from '@three';

export const perspectiveCamera = ({
  fov = 40,
  aspect = 2,
  near = 0.1,
  far = 1000,
} = {}) => {
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.helper = new THREE.CameraHelper(camera);

  camera.update = () => {
    camera.updateProjectionMatrix();
    camera.helper.update();
  };

  return camera;
};

export const orthographicCamera = ({
  left = -1,
  right = 1,
  top = 1,
  bottom = -1,
  near = 5,
  far = 50,
  zoom = 1,
} = {}) => {
  const camera = new THREE.OrthographicCamera(
    left,
    right,
    top,
    bottom,
    near,
    far,
    zoom
  );

  camera.helper = new THREE.CameraHelper(camera);
  camera.update = () => {
    camera.updateProjectionMatrix();
    camera.helper.update();
  };

  return camera;
};
