import React, { useRef, useMemo } from 'react';
import { useFrame } from 'react-three-fiber';

function Lights() {
  return (
    <group>
      <pointLight intensity={0.3} />
      <ambientLight intensity={2} />
      <spotLight
        castShadow
        intensity={0.2}
        angle={Math.PI / 7}
        position={[150, 150, 250]}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </group>
  );
}

function Plane({ position }) {
  return (
    <mesh receiveShadow position={position}>
      <planeBufferGeometry attach='geometry' args={[1000, 1000]} />
      <meshPhongMaterial attach='material' color='#272727' />
    </mesh>
  );
}

function Box({ position }) {
  return (
    <mesh castShadow receiveShadow position={position}>
      <boxBufferGeometry attach='geometry' args={[2, 2, 2]} />
      <meshStandardMaterial attach='material' />
    </mesh>
  );
}

const Bird = () => {
  return (
    <>
      {/*<Lights />*/}
      <Plane position={[0, 0, -10]} />
      <Box position={[1, 0, 1]} />
      <Box position={[2, 1, 5]} />
      <Box position={[0, 0, 6]} />
      <Box position={[-1, 1, 8]} />
      <Box position={[-2, 2, 13]} />
      <Box position={[2, -1, 13]} />
    </>
  );
};

export default Bird;
