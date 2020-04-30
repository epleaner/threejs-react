import React, { useRef, useEffect } from "react";
import * as THREE from "three";

import { useThree, useFrame } from "react-three-fiber";

import Cube from "Mesh/Cube";
import Heart from "Mesh/Heart";

export default () => {
  const {
    gl, // WebGL renderer
    scene, // Default scene
    camera, // Default camera
    size, // Bounds of the view (which stretches 100% and auto-adjusts)
    viewport, // Bounds of the viewport in 3d units + factor (size/viewport)
    aspect, // Aspect ratio (size.width / size.height)
    mouse, // Current 2D mouse coordinates
    clock, // THREE.Clock (useful for useFrame deltas)
    invalidate, // Invalidates a single frame (for <Canvas invalidateFrameloop />)
    intersect, // Calls onMouseMove handlers for objects underneath the cursor
    setDefaultCamera // Sets the default camera
  } = useThree();

  camera.position.z = 100;
  camera.fov = 40;
  scene.background = new THREE.Color("grey");

  return (
    <>
      <directionalLight color={"#FFFFFF"} intensity={1} position={[-1, 2, 4]} />
      {/* <ambientLight intensity={0.9} />
      <pointLight intensity={1.1} position={[10, 10, 10]} /> */}
      <Heart position={[0, 0, 0]} />
    </>
  );
};
