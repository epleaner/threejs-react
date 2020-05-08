import * as THREE from '@three';
import checkerTexture from '@textures/checker.png';

export const points = () => {
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
};

export const lineGeometry = () => {
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
};

export const cube = ({ size = 4, color = '#8AC' } = {}) => {
  const geometry = new THREE.BoxBufferGeometry(size, size, size);
  const material = new THREE.MeshStandardMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(size + 1, size / 2, 0);
  return mesh;
};

export const sphere = ({
  radius = 3,
  widthSegments = 32,
  heightSegments = 16,
  color = '#CA8',
} = {}) => {
  const geometry = new THREE.SphereBufferGeometry(
    radius,
    widthSegments,
    heightSegments
  );
  const material = new THREE.MeshStandardMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(-radius - 1, radius + 2, 0);
  return mesh;
};

export const plane = (size = 40) => {
  const loader = new THREE.TextureLoader();
  const texture = loader.load(checkerTexture);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  const repeats = size / 2;
  texture.repeat.set(repeats, repeats);

  const geometry = new THREE.PlaneBufferGeometry(size, size);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = Math.PI * -0.5;

  return mesh;
};

export const flatPlane = ({ size = 256, color = '#8AC' } = {}) => {
  const planeGeo = new THREE.PlaneBufferGeometry(size, size);
  const planePivot = new THREE.Object3D();

  const loader = new THREE.TextureLoader();
  const texture = loader.load(
    'https://threejsfundamentals.org/threejs/resources/images/flower-1.jpg'
  );

  texture.magFilter = THREE.NearestFilter;

  const planeMat = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(planeGeo, planeMat);

  planePivot.add(mesh);

  // move plane so top left corner is origin
  mesh.position.set(size / 2, size / 2, 0);

  return planePivot;
};
