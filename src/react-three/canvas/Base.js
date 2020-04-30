import React from "react";
import { Canvas } from "react-three-fiber";

export default ({ children, ...otherProps }) => (
  // Default canvas will create:
  // a translucent WebGL-renderer with the following properties: antialias, alpha, setClearAlpha(0)
  // A default perspective camera: fov: 75, near: 0.1, far: 1000, z: 5, lookAt: [0,0,0]
  // A default orthographic camera if Canvas.orthographic is true: near: 0.1, far: 1000, z: 5, lookAt: [0,0,0]
  // A default shadowMap if Canvas.shadowMap is true: type: PCFSoftShadowMap
  // A default scene (into which all the JSX is rendered) and a raycaster.
  // A wrapping container with a resize observer: scroll: true, debounce: { scroll: 50, resize: 0 }

  <Canvas {...otherProps}>{children}</Canvas>
);
