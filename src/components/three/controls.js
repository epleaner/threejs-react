import React, { useRef } from 'react';
import { extend, useFrame, useThree } from 'react-three-fiber';
import { FirstPersonControls } from '@three-controls/FirstPersonControls.js';
import { OrbitControls } from '@three-controls/OrbitControls.js';
extend({ OrbitControls, FirstPersonControls });

export const Orbit = () => {
  const controls = useRef();
  const { camera, gl } = useThree();
  useFrame(() => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.05}
      rotateSpeed={0.5}
    />
  );
};

export const FirstPerson = () => {
  const controls = useRef();
  const { camera, gl } = useThree();

  useFrame((state) => {
    const delta = state.clock.getDelta();
    controls.current.update(delta);
  });

  return (
    <firstPersonControls
      ref={controls}
      args={[camera, gl.domElement]}
      movementSpeed={1000}
      lookSpeed={1}
    />
  );
};
