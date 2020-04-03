import React from "react";
import { Canvas } from "react-three-fiber";

export default ({ children, ...otherProps }) => (
  <Canvas {...otherProps}>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    {children}
  </Canvas>
);
