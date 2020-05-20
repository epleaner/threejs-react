import React, { useRef } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { Perlin2 } from 'tumult';

const Particle = ({ a, ...otherProps }) => {
  const period = 1 / 800;

  const mesh = useRef();
  const material = useRef();
  const noise = new Perlin2();

  useFrame(() => {
    const v = noise.gen(
      mesh.current.position.x * period,
      mesh.current.position.y * period
    );

    material.current.color.setHSL(v * 360, 0.95, 0.2);

    const step = v * 2 * Math.PI + a;
    mesh.current.position.x += Math.cos(step) * 0.01;
    mesh.current.position.y += Math.sin(step) * 0.1;
  });

  return (
    <mesh ref={mesh} {...otherProps}>
      <boxBufferGeometry attach='geometry' args={[0.1, 0.1, 0.1]} />
      <meshPhongMaterial ref={material} attach='material' />
    </mesh>
  );
};

const Particles = ({ count }) => {
  const { viewport } = useThree();
  const group = useRef();

  const items = [];

  for (let i = 1; i <= count; i++) {
    const x = Math.random() * viewport.width - viewport.width / 2;
    items.push(<Particle position={[x, 0, 0]} a={0} />);
    items.push(<Particle position={[x, 0, 0]} a={Math.PI} />);
  }

  return <group ref={group}>{items}</group>;
};

export default Particles;
