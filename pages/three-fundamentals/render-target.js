import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import RenderTarget from '@components/three/fundamentals/renderTarget';
import { OrbitControls } from 'drei';

const Page = () => {
  return (
    <Canvas camera={{ position: [0, 0, 2] }}>
      <OrbitControls />
      <Suspense fallback={null}>
        <RenderTarget />
      </Suspense>
    </Canvas>
  );
};

export default Page;
