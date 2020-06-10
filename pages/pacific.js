import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { Controls as GUI, useControl } from 'react-three-gui';
import { Sky, Stars } from 'drei';
import Ocean from '@components/three/ocean';
import { FirstPerson as FirstPersonControls } from '@components/three/controls';

const Page = () => {
  const stars = useControl('stars', {
    type: 'boolean',
  });

  return (
    <>
      <Canvas camera={{ fov: 60, near: 1, far: 20000, position: [0, 100, 0] }}>
        <Suspense fallback={null}>
          <Ocean />
          <Sky />
          {stars && <Stars />}
        </Suspense>
        <fog attach='fog' args={[0xaaccff, 0.0007]} />
        <FirstPersonControls />
      </Canvas>
      <GUI />
    </>
  );
};

export default dynamic(() => Promise.resolve(Page));
