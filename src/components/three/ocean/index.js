import React, { useRef, useMemo } from 'react';
import { useThree, useLoader, useFrame } from 'react-three-fiber';
import {
  TextureLoader,
  PlaneBufferGeometry,
  DynamicDrawUsage,
  RepeatWrapping,
} from '@three';

const textureUrl =
  'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/water.jpg';

export default () => {
  const ref = useRef();
  const texture = useLoader(TextureLoader, textureUrl);
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(5, 5);

  const worldWidth = 128;
  const worldDepth = 128;

  const geometry = useMemo(() => {
    const geometry = new PlaneBufferGeometry(
      20000,
      20000,
      worldWidth - 1,
      worldDepth - 1
    );

    geometry.rotateX(-Math.PI / 2);

    const position = geometry.attributes.position;
    position.usage = DynamicDrawUsage;

    for (let i = 0; i < position.count; i++) {
      const y = 35 * Math.sin(i / 2);
      position.setY(i, y);
    }

    return geometry;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 10;

    const position = geometry.attributes.position;

    for (let i = 0; i < position.count; i++) {
      const y = 35 * Math.sin(i / 5 + (time + i) / 7);
      position.setY(i, y);
    }

    position.needsUpdate = true;
  });

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshBasicMaterial attach='material' color={0x5c818a} map={texture} />
    </mesh>
  );
};
