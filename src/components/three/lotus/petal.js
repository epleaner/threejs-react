import React, { useRef, useMemo } from 'react';
import { useFrame } from 'react-three-fiber';
import { Vector3, CatmullRomCurve3 } from '@three';

const PetalGroup = ({ segments, height, width, rotatePosition }) => {
  const group = useRef();

  const children = [];
  for (let i = 1; i <= segments; i++) {
    children.push(
      <Petal
        height={height}
        width={width - i / segments}
        rotationSpeed={i * 0.01}
      />
    );
  }

  useFrame(() => (group.current.rotation.z = rotatePosition));

  return <group ref={group}>{children}</group>;
};

const Petal = ({ height, width, rotationSpeed }) => {
  const mesh = useRef();

  const curve = useMemo(
    () =>
      new CatmullRomCurve3([
        new Vector3(0, 0, 0),
        new Vector3(width, height / 2, 0),
        new Vector3(0, height, 0),
        new Vector3(-width, height / 2, 0),
        new Vector3(0, 0, 0),
      ]),
    []
  );

  useFrame((_, time) => {
    mesh.current.rotation.y += rotationSpeed;
  });

  return (
    <mesh ref={mesh}>
      <tubeBufferGeometry attach='geometry' args={[curve, 64, 0.1]} />
      <meshPhongMaterial attach='material' color={0xffffff} />
    </mesh>
  );
};

export default PetalGroup;
