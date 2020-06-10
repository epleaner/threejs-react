import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber';
import Organism from '@components/three/organism';
import { OrbitControls } from 'drei';

const OrganismPage = () => {
  return (
    <Canvas camera={{ position: [0, 0, 85] }}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[40, 40, 40]} />
      <Suspense fallback={null}>
        <Organism ringCount={50} />
      </Suspense>
    </Canvas>
  );
};

export default OrganismPage;
