import React from "react";
import { Canvas } from "react-three-fiber";

export default ({ children, ...otherProps }) => (
  <Canvas {...otherProps}>
    <ambientLight intensity={0.9} />
    <pointLight intensity={1.1} position={[10, 10, 10]} />
    {children}
  </Canvas>
);
