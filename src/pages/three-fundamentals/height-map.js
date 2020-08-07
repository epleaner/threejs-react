import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Content from '@components/three/fundamentals/heightMap';

const Page = () => {
  return (
    <Canvas camera={{ far: 200, position: [20, 20, 20] }}>
      <directionalLight intensity={1} position={[-1, 2, 4]} />
      <directionalLight intensity={1} position={[1, 2, -2]} />

      <OrbitControls />

      <Suspense fallback={null}>
        <Content />
      </Suspense>
    </Canvas>
  );
};

export default Page;
