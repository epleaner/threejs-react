import * as THREE from '@three';
import { RectAreaLightUniformsLib } from '@three-modules/lights/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper } from '@three-modules/helpers/RectAreaLightHelper.js';

const DEFAULT_COLOR = 0xffffff;
const DEFAULT_INTENSITY = 1;

export const directionalLight = ({
  color = DEFAULT_COLOR,
  intensity = DEFAULT_INTENSITY,
} = {}) => {
  const light = new THREE.DirectionalLight(color, intensity);
  const helper = new THREE.DirectionalLightHelper(light);

  light.update = () => {
    light.target.updateMatrixWorld();
    helper.update();
  };

  light.update();
  return { light, helper };
};

export const ambientLight = ({
  color = DEFAULT_COLOR,
  intensity = DEFAULT_INTENSITY,
} = {}) => {
  const light = new THREE.AmbientLight(color, intensity);
  return { light };
};

export const hemisphereLight = ({
  skyColor = 0xb1e1ff,
  groundColor = 0xb97a20,
  intensity = DEFAULT_INTENSITY,
} = {}) => {
  const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
  const helper = new THREE.HemisphereLightHelper(light);
  return { light, helper };
};

export const pointLight = ({
  color = DEFAULT_COLOR,
  intensity = DEFAULT_INTENSITY,
  power = 800,
  decay = 2,
  distance = Infinity,
} = {}) => {
  const light = new THREE.PointLight(color, intensity);
  const helper = new THREE.PointLightHelper(light);

  light.power = power;
  light.decay = decay;
  light.distance = distance;

  light.update = () => helper.update();

  return { light, helper };
};

export const spotLight = ({
  color = DEFAULT_COLOR,
  intensity = DEFAULT_INTENSITY,
  power = 800,
  decay = 2,
  distance = Infinity,
} = {}) => {
  const light = new THREE.SpotLight(color, intensity);
  const helper = new THREE.SpotLightHelper(light);

  light.power = power;
  light.decay = decay;
  light.distance = distance;

  light.update = () => {
    light.target.updateMatrixWorld();
    helper.update();
  };

  return { light, helper };
};

export const rectAreaLight = ({
  color = DEFAULT_COLOR,
  intensity = 5,
  width = 12,
  height = 4,
} = {}) => {
  RectAreaLightUniformsLib.init();

  const light = new THREE.RectAreaLight(color, intensity, width, height);
  const helper = new RectAreaLightHelper(light);
  light.add(helper);

  light.update = () => helper.update();

  light.rotation.x = THREE.MathUtils.degToRad(-90);

  return { light, helper };
};
