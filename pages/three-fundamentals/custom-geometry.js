import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Objects from '@components/three/fundamentals/customGeometry';

const Page = () => {
  return (
    <Canvas camera={{ far: 100, position: [0, 0, 5] }}>
      <directionalLight intensity={1} position={[-1, 2, 4]} />

      <OrbitControls />
      <Suspense fallback={null}>
        <Objects />
      </Suspense>
    </Canvas>
  );
};

export default Page;
