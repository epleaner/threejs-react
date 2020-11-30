import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { Controls, useControl } from 'react-three-gui';
import { OrbitControls } from 'drei';

import Juniper from '@components/three/juniper';

const JuniperPage = () => {
  const amplitude = useControl('amplitude', { type: 'number' });
  const period = useControl('period', { type: 'number' });
  const noisePeriod = useControl('noisePeriod', { type: 'number' });
  const height = useControl('height', { type: 'number' });
  const detail = useControl('detail', { type: 'number' });
  return (
    <>
      <Canvas camera={{ far: 100000, position: [0, 150, 150] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[40, 40, 40]} intensity={0.5} />
        <Suspense fallback={null}>
          <Juniper {...{ amplitude, period, noisePeriod, height, detail }} />
        </Suspense>
        <OrbitControls />
      </Canvas>
      {/* <Controls /> */}
    </>
  );
};

export default JuniperPage;
