import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { Controls as GUI, useControl } from 'react-three-gui';
import { Sky } from 'drei';
import Ocean from '@components/three/ocean';
import { FirstPerson as FirstPersonControls } from '@components/three/controls';

const Page = () => {
  const turbidity = useControl('turbidity', {
    type: 'number',
    value: 10,
    min: 1,
    max: 20,
  });

  const rayleigh = useControl('rayleigh', {
    type: 'number',
    value: 2,
    min: 0,
    max: 4,
  });

  return (
    <>
      <Canvas camera={{ fov: 60, near: 1, far: 20000, position: [0, 100, 0] }}>
        <Sky {...{ turbidity, rayleigh }} />
        <Suspense fallback={null}>
          <Ocean />
        </Suspense>
        <fog attach='fog' args={[0xaaccff, 0.0007]} />
        <FirstPersonControls />
      </Canvas>
    </>
  );
};

export default dynamic(() => Promise.resolve(Page));
