import React, { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';

import Scene from '@components/three/bird';

const Page = () => {
  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 15] }}
        style={{ background: '#000000' }}
        onCreated={({ gl }) => (
          (gl.shadowMap.enabled = true),
          (gl.shadowMap.type = THREE.PCFSoftShadowMap)
        )}>
        <ambientLight intensity={0.5} />
        <spotLight
          intensity={0.6}
          position={[30, 30, 50]}
          angle={0.2}
          penumbra={1}
          castShadow
        />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>
  );
};

export default Page;
