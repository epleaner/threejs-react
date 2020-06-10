import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber';
import { OrbitControls } from 'drei';

import Lotus from '@components/three/lotus';

const LotusPage = () => {
  return (
    <Canvas camera={{ position: [0, 0, 30] }}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[40, 40, 40]} />
      <Suspense fallback={null}>
        <Lotus petalCount={5} />
      </Suspense>
    </Canvas>
  );
};

export default LotusPage;
