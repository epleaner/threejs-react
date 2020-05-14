import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';

const Torus = ({ radius, speed }) => {
  const mesh = useRef();

  const tubeRadius = 0.1;
  const radialSegments = 16;
  const tubularSegments = 12;

  useFrame((_, time) => {
    const rotation = Math.abs(Math.sin(speed * time));
    mesh.current.rotation.x += rotation;
    mesh.current.rotation.y += rotation;
  });

  return (
    <mesh ref={mesh}>
      <torusBufferGeometry
        attach='geometry'
        args={[radius, tubeRadius, radialSegments, tubularSegments]}
      />
      <meshPhongMaterial attach='material' color={0xffff00} />
    </mesh>
  );
};

const Organism = ({ ringCount }) => {
  const group = useRef();

  const rings = [];

  for (let i = 0; i < ringCount; i++) {
    const radius = 1 + i * 1.1;
    const speed = 0.01 * i + 0.05;

    rings.push(<Torus {...{ radius, speed }} />);
  }

  return <group ref={group}>{rings}</group>;
};

export default Organism;
