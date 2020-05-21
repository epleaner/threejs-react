import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from 'react-three-fiber';

const FadingCamera = (props) => {
  const group = useRef();
  const cameraRef = useRef();
  const { setDefaultCamera, viewport, gl } = useThree();

  // Make the camera known to the system
  useEffect(() => void setDefaultCamera(cameraRef.current), []);
  useEffect(() => {
    gl.preserveDrawingBuffer = true;
    gl.autoClearColor = false;
  }, [gl]);

  // Update it every frame
  useFrame(() => cameraRef.current.updateMatrixWorld());

  const fadeMesh = (
    <mesh position-z={49.9} renderOrder={-1}>
      <planeBufferGeometry attach='geometry' args={[1, 1]} />
      <meshBasicMaterial
        attach='material'
        color={0xffffff}
        transparent
        opacity={0.02}
      />
    </mesh>
  );

  return (
    <group ref={group}>
      <perspectiveCamera ref={cameraRef} {...props} />
      {fadeMesh}
    </group>
  );
};

export default FadingCamera;
