import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber';

import { OrbitControls } from '@three-controls/OrbitControls.js';
extend({ OrbitControls });

import Lotus from '@components/three/lotus';

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const controls = useRef();

  useFrame(() => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

const LotusPage = () => {
  return (
    <Canvas camera={{ position: [0, 0, 30] }}>
      <CameraControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[40, 40, 40]} />
      <Suspense fallback={null}>
        <Lotus petalCount={5} />
      </Suspense>
    </Canvas>
  );
};

export default LotusPage;
