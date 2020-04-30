import React, { useMemo, useRef } from "react";
import { useFrame } from "react-three-fiber";

import * as THREE from "three";

export default ({ start = [0, 0], paths, ...props }) => {
  const mesh = useRef();

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(...start);
    paths.forEach(path => shape.bezierCurveTo(...path));
    return shape;
  }, [start, paths]);

  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <mesh ref={mesh}>
      <extrudeBufferGeometry attach="geometry" args={[shape, props]} />
      <meshPhongMaterial attach="material" color="red" />
    </mesh>
  );
};
