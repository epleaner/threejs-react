import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';

import SandstoneParticles from '@components/sandstoneParticles';
import FadingCamera from '@components/fadingCamera';

const SandStonePage = () => {
  return (
    <Canvas gl={{ preserveDrawingBuffer: true }}>
      <FadingCamera position={[0, 0, 50]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[40, 40, 40]} />
      <Suspense fallback={null}>
        <SandstoneParticles count={200} />
      </Suspense>
    </Canvas>
  );
};

export default SandStonePage;
