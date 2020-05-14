import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber';

import { OrbitControls } from '@three-controls/OrbitControls.js';
extend({ OrbitControls });

import Organism from '@components/organism';

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const controls = useRef();

  useFrame(() => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

const OrganismPage = () => {
  return (
    <Canvas camera={{ position: [0, 0, 85] }}>
      <CameraControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[40, 40, 40]} />
      <Suspense fallback={null}>
        <Organism ringCount={50} />
      </Suspense>
    </Canvas>
  );
};

export default OrganismPage;
