import React, { useRef, useMemo } from 'react';
import { useFrame } from 'react-three-fiber';
import { Simplex2 } from 'tumult';

import Bark from '@components/three/juniper/bark';

const Juniper = ({ count = 100 }) => {
  const group = useRef();
  useFrame(() => {});

  const simplex = useMemo(() => new Simplex2(), []);

  const children = useMemo(() => {
    const radius = 0.1;
    let children = [];

    for (let i = 0; i < count; i++) {
      const r = radius * Math.sqrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const x = r * Math.cos(theta);
      const y = 0;
      const z = r * Math.sin(theta);

      children.push(
        <Bark
          key={`${x}${y}${z}`}
          {...{ x, y, z }}
          height={100}
          noiseGen={simplex}
        />
      );
    }

    return children;
  }, []);

  return <group ref={group}>{children}</group>;
};

export default Juniper;
