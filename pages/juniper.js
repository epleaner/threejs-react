import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import Controls from '@components/three/controls';
import Juniper from '@components/three/juniper';

const JuniperPage = () => {
  return (
    <Canvas camera={{ far: 100000, position: [0, 150, 150] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[40, 40, 40]} intensity={0.5} />
      <Suspense fallback={null}>
        <Juniper />
      </Suspense>
      <Controls />
    </Canvas>
  );
};

export default JuniperPage;
