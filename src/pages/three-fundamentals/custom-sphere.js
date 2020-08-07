import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Objects from '@components/three/fundamentals/customBufferSphere';

const Page = () => {
  return (
    <Canvas camera={{ far: 100, position: [0, 0, 3] }}>
      <directionalLight intensity={1} position={[-1, 2, 4]} />
      <directionalLight intensity={1} position={[2, -2, 3]} />

      <OrbitControls />
      <Suspense fallback={null}>
        <Objects />
      </Suspense>
    </Canvas>
  );
};

export default Page;
