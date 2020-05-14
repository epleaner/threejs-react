import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber';
import { DoubleSide } from '@three';
import { OrbitControls } from '@three-controls/OrbitControls.js';
extend({ OrbitControls });

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const controls = useRef();

  useFrame(() => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

const Ring = (props) => {
  const mesh = useRef();
  const { innerRadius, outerRadius, thetaSegments, speed } = props;

  useFrame((_, time) => {
    const rotation = Math.abs(Math.sin(speed * time));
    mesh.current.rotation.x += rotation;
    mesh.current.rotation.y += rotation;
  });

  return (
    <mesh ref={mesh}>
      <ringBufferGeometry
        attach='geometry'
        args={[innerRadius, outerRadius, thetaSegments]}
      />
      <meshPhongMaterial attach='material' color={0xffff00} side={DoubleSide} />
    </mesh>
  );
};

const Organism = ({ ringCount }) => {
  const group = useRef();

  const rings = [];

  for (let i = 0; i < ringCount; i++) {
    const innerRadius = 1 + i * 1.1;
    const outerRadius = innerRadius + 0.1;
    const thetaSegments = 50;
    const speed = 0.05 * i + 0.05;

    rings.push(
      <Ring {...{ innerRadius, outerRadius, thetaSegments, speed }} />
    );
  }

  return <group ref={group}>{rings}</group>;
};

const OrganismPage = () => {
  return (
    <Canvas camera={{ position: [0, 0, 85] }}>
      <CameraControls />
      <ambientLight intensity={2} />
      <pointLight position={[40, 40, 40]} />
      <Suspense fallback={null}>
        <Organism ringCount={50} />
      </Suspense>
    </Canvas>
  );
};

export default OrganismPage;
