import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';

import Petal from '@components/petal';

const Lotus = ({ petalCount }) => {
  const group = useRef();
  useFrame(() => (group.current.rotation.z += 0.005));

  const petals = [];

  for (let i = 1; i <= petalCount; i++) {
    petals.push(
      <Petal
        segments={5}
        height={20}
        width={5}
        rotationSpeed={0.05}
        rotatePosition={(i * (2 * Math.PI)) / petalCount}
      />
    );
  }

  return <group ref={group}>{petals}</group>;
};

export default Lotus;
